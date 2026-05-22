import { getApiBase } from '@/api/config.js'
import { request } from '@/api/request.js'
import { getToken } from '@/utils/token.js'
import { getUser } from '@/utils/user.js'

/** 去除富文本 HTML，供后端 PDF 生成使用 */
export function stripHtml(html) {
	if (!html) return ''
	let text = String(html).replace(/<br\s*\/?>/gi, '\n')
	text = text.replace(/<\/p>/gi, '\n')
	text = text.replace(/<[^>]+>/g, '')
	text = text.replace(/&nbsp;/g, ' ')
	return text.replace(/\n\s*\n/g, '\n').trim()
}

function pickResumeId(body) {
	if (!body || typeof body !== 'object') return null
	if (body.resumeId != null && body.resumeId !== '') return Number(body.resumeId)
	if (body.resume_id != null && body.resume_id !== '') return Number(body.resume_id)
	if (body.data && body.data.resumeId != null) return Number(body.data.resumeId)
	if (body.data && body.data.resume_id != null) return Number(body.data.resume_id)
	return null
}

/** 将本地简历记录转为后端 Resume 实体字段 */
export function buildResumeApiPayload(record) {
	const storedUser = getUser() || {}
	let photo = record.photo
	if (typeof photo === 'string') {
		const p = photo.trim()
		if (!p || p.startsWith('http://') || p.startsWith('https://') || p.includes('/api/resume/')) {
			photo = null
		} else {
			photo = p
		}
	}
	// 处理证书数据：转换为JSON字符串
	let certificatesJson = null
	if (record.certificates && Array.isArray(record.certificates)) {
		// 过滤掉空证书
		const validCerts = record.certificates.filter(cert => cert && cert.name && cert.name.trim())
		if (validCerts.length > 0) {
			certificatesJson = JSON.stringify(validCerts)
		}
	}
	return {
		userId: storedUser.userId || null,
		resumeName: record.resume_name,
		realName: record.real_name,
		gender: record.gender,
		phone: record.phone,
		email: record.email,
		photo,
		jobIntention: record.job_intention || '',
		certificates: certificatesJson,
		campusExperience: stripHtml(record.campus_experience),
		workExperience: stripHtml(record.work_experience),
		projectExperience: stripHtml(record.project_experience),
		selfEvaluation: stripHtml(record.self_evaluation),
		aiScore: 0.0,
		aiEvaluation: '',
		resumeStatus: 1
	}
}

/**
 * 同步简历到后端（优先 update，失败则 create）
 * @returns {{ resumeId: number, backendResumeId: number }}
 */
export async function syncResumeToBackend(record, backendResumeId) {
	const payload = buildResumeApiPayload(record)
	if (backendResumeId) {
		try {
			const updated = await request({
				url: '/api/resume/update',
				method: 'PUT',
				data: { ...payload, resumeId: backendResumeId }
			})
			const id = pickResumeId(updated) || Number(backendResumeId)
			return { resumeId: id, backendResumeId: id }
		} catch (e) {
			console.warn('更新简历失败，将重新创建', e)
		}
	}
	const created = await request({
		url: '/api/resume/create',
		method: 'POST',
		data: payload
	})
	const id = pickResumeId(created)
	if (!id) {
		throw new Error('创建简历失败：服务端未返回 resumeId，请确认 resume 服务已启动')
	}
	return { resumeId: id, backendResumeId: id }
}

function buildAuthHeader() {
	const hdr = { Accept: 'application/pdf' }
	const tok = getToken()
	if (tok) hdr['Authorization'] = `Bearer ${tok}`
	return hdr
}

function isPdfArrayBuffer(buf) {
	try {
		const u = new Uint8Array(buf)
		return u.length > 4 && u[0] === 0x25 && u[1] === 0x50 && u[2] === 0x44 && u[3] === 0x46
	} catch (_) {
		return false
	}
}

function parseErrorFromBuffer(buf) {
	try {
		const u = new Uint8Array(buf)
		let s = ''
		const len = Math.min(u.length, 400)
		for (let i = 0; i < len; i++) s += String.fromCharCode(u[i])
		const trimmed = s.trim()
		if (trimmed.startsWith('{') || trimmed.startsWith('<')) {
			try {
				const j = JSON.parse(trimmed)
				return j.message || j.msg || j.error || trimmed.slice(0, 120)
			} catch (_) {
				return trimmed.slice(0, 120)
			}
		}
		return trimmed.slice(0, 120) || '响应不是有效的 PDF 文件'
	} catch (_) {
		return '响应不是有效的 PDF 文件'
	}
}

/**
 * 下载 PDF：H5 用 arraybuffer；App/小程序用 downloadFile（更稳定）
 * @returns {Promise<{ type: 'buffer', data: ArrayBuffer } | { type: 'file', tempFilePath: string }>}
 */
export function fetchResumePdfBytes(exportPath) {
	const url = `${getApiBase()}${exportPath}`
	const header = buildAuthHeader()

	// #ifdef H5
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method: 'GET',
			responseType: 'arraybuffer',
			timeout: 120000,
			header,
			success: (res) => {
				if (res.statusCode >= 200 && res.statusCode < 300 && res.data) {
					if (!isPdfArrayBuffer(res.data)) {
						reject(new Error(parseErrorFromBuffer(res.data)))
						return
					}
					resolve({ type: 'buffer', data: res.data })
					return
				}
				reject(new Error(`PDF下载失败（HTTP ${res.statusCode}）`))
			},
			fail: (err) => reject(new Error(err.errMsg || '网络错误'))
		})
	})
	// #endif

	// #ifndef H5
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url,
			header,
			timeout: 120000,
			success: (res) => {
				if (res.statusCode >= 200 && res.statusCode < 300 && res.tempFilePath) {
					resolve({ type: 'file', tempFilePath: res.tempFilePath })
					return
				}
				reject(new Error(`PDF下载失败（HTTP ${res.statusCode}）`))
			},
			fail: (err) => reject(new Error(err.errMsg || '下载失败'))
		})
	})
	// #endif
}

/** 保存并打开/下载 PDF */
export function saveAndOpenPdf(payload, fileName = 'resume') {
	if (payload && payload.type === 'file' && payload.tempFilePath) {
		return new Promise((resolve, reject) => {
			uni.openDocument({
				filePath: payload.tempFilePath,
				fileType: 'pdf',
				showMenu: true,
				success: () => resolve(payload.tempFilePath),
				fail: (err) => reject(new Error(err.errMsg || '无法打开 PDF'))
			})
		})
	}

	const data = payload && payload.type === 'buffer' ? payload.data : payload
	const base = String(fileName || 'resume').replace(/[\\/:*?"<>|]/g, '_') || 'resume'

	// #ifdef H5
	if (!data) return Promise.reject(new Error('PDF 数据为空'))
	const blob = new Blob([data], { type: 'application/pdf' })
	const objUrl = window.URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = objUrl
	a.download = `${base}_${Date.now()}.pdf`
	document.body.appendChild(a)
	a.click()
	a.remove()
	window.URL.revokeObjectURL(objUrl)
	return Promise.resolve()
	// #endif

	// #ifndef H5
	const fs = uni.getFileSystemManager ? uni.getFileSystemManager() : null
	if (!fs || !data) {
		return Promise.reject(new Error('当前环境不支持保存 PDF'))
	}
	let userPath = '_doc'
	if (typeof uni.env !== 'undefined' && uni.env.USER_DATA_PATH) {
		userPath = uni.env.USER_DATA_PATH
	} else if (typeof wx !== 'undefined' && wx.env && wx.env.USER_DATA_PATH) {
		userPath = wx.env.USER_DATA_PATH
	}
	const filePath = `${userPath}/${base}_${Date.now()}.pdf`
	let base64Data = ''
	try {
		base64Data = uni.arrayBufferToBase64(data)
	} catch (e) {
		return Promise.reject(new Error('PDF 数据转换失败'))
	}
	return new Promise((resolve, reject) => {
		fs.writeFile({
			filePath,
			data: base64Data,
			encoding: 'base64',
			success: () => {
				uni.openDocument({
					filePath,
					fileType: 'pdf',
					showMenu: true,
					success: () => resolve(filePath),
					fail: (err) => reject(new Error(err.errMsg || '无法打开 PDF'))
				})
			},
			fail: (err) => reject(new Error(err.errMsg || '保存 PDF 失败'))
		})
	})
	// #endif
}

/**
 * 完整导出：同步 → 生成 PDF → 保存/打开
 * @param {'plain'|'smart'} mode
 */
export async function exportResumePdf(record, mode = 'plain', backendResumeId = null, keywords = []) {
	const { resumeId, backendResumeId: newBackendId } = await syncResumeToBackend(record, backendResumeId)
	const fallbackPath = `/api/resume/export/pdf/${resumeId}`
	const normalizedKeywords = Array.isArray(keywords)
		? keywords.map((k) => (k == null ? '' : String(k)).trim()).filter((k) => k)
		: []
	const keywordParam = normalizedKeywords.length > 0
		? `&keywords=${encodeURIComponent(normalizedKeywords.join(','))}`
		: ''
	const plainPath = `/api/resume/export/pdf/cpp/${resumeId}?highlightEngine=naive${keywordParam}`
	const smartPath = `/api/resume/export/pdf/cpp/${resumeId}?highlightEngine=ac${keywordParam}`

	let pdfPayload
	let usedFallback = false
	if (mode === 'smart') {
		try {
			pdfPayload = await fetchResumePdfBytes(smartPath)
		} catch (e) {
			console.warn('智能 PDF 导出失败，回退本地导出', e)
			usedFallback = true
			pdfPayload = await fetchResumePdfBytes(fallbackPath)
		}
	} else {
		try {
			pdfPayload = await fetchResumePdfBytes(plainPath)
		} catch (e) {
			console.warn('朴素 PDF 导出失败，回退本地导出', e)
			usedFallback = true
			pdfPayload = await fetchResumePdfBytes(fallbackPath)
		}
	}

	const safeName = (record.resume_name || 'resume').replace(/[\\/:*?"<>|]/g, '_')
	await saveAndOpenPdf(pdfPayload, safeName)
	return { resumeId, backendResumeId: newBackendId, usedFallback }
}
