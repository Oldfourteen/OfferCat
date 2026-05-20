import { BASE_URL } from '@/api/config.js'
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

/** 将本地简历记录转为后端 Resume 实体字段 */
export function buildResumeApiPayload(record) {
	const storedUser = getUser() || {}
	return {
		userId: storedUser.userId || null,
		resumeName: record.resume_name,
		realName: record.real_name,
		gender: record.gender,
		phone: record.phone,
		email: record.email,
		photo: record.photo,
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
			const id = updated.resumeId || backendResumeId
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
	return { resumeId: created.resumeId, backendResumeId: created.resumeId }
}

/** GET 下载 PDF 二进制 */
export function fetchResumePdfBytes(exportPath) {
	return new Promise((resolve, reject) => {
		const hdr = {}
		const tok = getToken()
		if (tok) hdr['Authorization'] = `Bearer ${tok}`
		uni.request({
			url: `${BASE_URL}${exportPath}`,
			method: 'GET',
			responseType: 'arraybuffer',
			timeout: 120000,
			header: hdr,
			success: (res) => {
				if (res.statusCode >= 200 && res.statusCode < 300 && res.data) {
					resolve(res.data)
					return
				}
				reject(new Error(`PDF下载失败（HTTP ${res.statusCode}）`))
			},
			fail: (err) => reject(new Error(err.errMsg || '网络错误'))
		})
	})
}

/** 保存并打开/下载 PDF（H5 下载，App/小程序落盘后用系统阅读器打开） */
export function saveAndOpenPdf(data, fileName = 'resume') {
	const base = String(fileName || 'resume').replace(/[\\/:*?"<>|]/g, '_') || 'resume'
	// #ifdef H5
	const blob = new Blob([data], { type: 'application/pdf' })
	const url = window.URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = `${base}_${Date.now()}.pdf`
	document.body.appendChild(a)
	a.click()
	a.remove()
	window.URL.revokeObjectURL(url)
	// #endif

	// #ifndef H5
	const fs = uni.getFileSystemManager ? uni.getFileSystemManager() : null
	if (!fs) {
		return Promise.reject(new Error('当前环境不支持直接打开 PDF'))
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
					fail: (err) => {
						reject(new Error(err.errMsg || '无法打开 PDF，文件已保存'))
					}
				})
			},
			fail: (err) => reject(new Error(err.errMsg || '保存 PDF 失败'))
		})
	})
	// #endif

	// #ifdef H5
	return Promise.resolve()
	// #endif
}

/**
 * 完整导出流程：同步 → 生成 PDF → 保存/打开
 * @param {'plain'|'smart'} mode plain=Java，smart=C++（失败回退 plain）
 */
export async function exportResumePdf(record, mode = 'plain', backendResumeId = null) {
	const { resumeId, backendResumeId: newBackendId } = await syncResumeToBackend(record, backendResumeId)
	const plainPath = `/api/resume/export/pdf/${resumeId}`
	const smartPath = `/api/resume/export/pdf/cpp/${resumeId}`

	let pdfData
	let usedFallback = false
	if (mode === 'smart') {
		try {
			pdfData = await fetchResumePdfBytes(smartPath)
		} catch (e) {
			console.warn('智能 PDF 导出失败，回退朴素导出', e)
			usedFallback = true
			pdfData = await fetchResumePdfBytes(plainPath)
		}
	} else {
		pdfData = await fetchResumePdfBytes(plainPath)
	}

	const safeName = (record.resume_name || 'resume').replace(/[\\/:*?"<>|]/g, '_')
	await saveAndOpenPdf(pdfData, safeName)
	return { resumeId, backendResumeId: newBackendId, usedFallback }
}
