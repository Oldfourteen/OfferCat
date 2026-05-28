import { getApiBase } from '@/api/config.js'
import { request } from '@/api/request'
import { getToken } from '@/utils/token'

const getBaseUrl = () => getApiBase()

// ========== 语音合成相关 ==========

// 音频上下文
let audioContext = null
let audioSource = null
let voiceStopTimer = null
let innerAudioContext = null
let plusAudioPlayer = null
let ttsTempFileEntry = null
let ttsRequestTask = null
let ttsAbortReason = null
let lastTtsProbeAt = 0
let lastTtsProbeOk = false

function cleanupCurrentTtsFile() {
	if (!ttsTempFileEntry) return
	const entry = ttsTempFileEntry
	ttsTempFileEntry = null
	cleanupTtsFile(entry)
}

function abortTtsRequest(reason) {
	if (!ttsRequestTask) return
	const task = ttsRequestTask
	ttsRequestTask = null
	ttsAbortReason = reason || 'abort'
	try {
		if (typeof task.abort === 'function') task.abort()
	} catch (e) {}
}

function makeTtsError(message, details) {
	const err = new Error(message || 'TTS失败')
	const lines = []
	if (details && typeof details === 'object') {
		for (const k of Object.keys(details)) {
			const v = details[k]
			if (v == null || v === '') continue
			lines.push(`${k}: ${String(v)}`)
		}
	}
	if (lines.length) {
		err.debugText = `${err.message}\n${lines.join('\n')}`
	}
	return err
}

function getPlatformInfo() {
	try {
		if (typeof uni.getSystemInfoSync === 'function') {
			const info = uni.getSystemInfoSync() || {}
			return {
				platform: info.platform,
				osName: info.osName,
				osVersion: info.osVersion,
				brand: info.brand,
				model: info.model,
				networkType: info.networkType,
			}
		}
	} catch (_) {}
	return {}
}

function ensureTtsApiReachable(baseUrl) {
	const ttl = 60 * 1000
	if (lastTtsProbeOk && Date.now() - lastTtsProbeAt < ttl) return Promise.resolve(true)
	return new Promise((resolve, reject) => {
		let settled = false
		const finish = (fn, val) => {
			if (settled) return
			settled = true
			fn(val)
		}
		const timer = setTimeout(() => {
			finish(reject, makeTtsError('无法连接服务器（探活超时）', { baseUrl }))
		}, 6500)
		const probe = (path) => uni.request({
			url: `${baseUrl}${path}`,
			method: 'GET',
			timeout: 6000,
			success: (res) => {
				clearTimeout(timer)
				const code = res && res.statusCode
				if (code >= 200 && code < 500) {
					lastTtsProbeAt = Date.now()
					lastTtsProbeOk = true
					finish(resolve, true)
				} else {
					lastTtsProbeAt = Date.now()
					lastTtsProbeOk = false
					finish(reject, makeTtsError('服务器探活失败', { baseUrl, statusCode: code, path }))
				}
			},
			fail: (e) => {
				clearTimeout(timer)
				lastTtsProbeAt = Date.now()
				lastTtsProbeOk = false
				if (path === '/api/ai/tts/ping') {
					probe('/auth/ping')
					return
				}
				finish(
					reject,
					makeTtsError('无法连接服务器（网络请求失败）', {
						baseUrl,
						path,
						errMsg: e && e.errMsg,
						...getPlatformInfo(),
					})
				)
			},
		})
		const path = '/api/ai/tts/ping'
		probe(path)
	})
}

/**
 * 将文本转为语音并播放
 * @param {string} text - 要合成的文本
 * @param {function} onPlay - 开始播放时的回调
 * @returns {Promise<void>}
 */
export function playAiVoice(text, onPlay) {
	if (!getApiBase()) {
		return Promise.reject(new Error('未配置后端地址，请检查 api/config.js'))
	}

	const raw = typeof text === 'string' ? text : ''
	const chunks = splitTtsText(raw, 160).slice(0, 12)
	if (!chunks.length) return Promise.reject(new Error('没有可播报的文本'))

	return (async () => {
		const baseUrl = getBaseUrl()
		await ensureTtsApiReachable(baseUrl)
		console.log('开始TTS请求，分段数:', chunks.length, '总长度:', raw.length)
		let started = false
		for (let i = 0; i < chunks.length; i += 1) {
			const chunk = chunks[i]
			let buffer
			try {
				buffer = await requestTtsArrayBuffer(chunk)
			} catch (e) {
				if (started) return
				throw e
			}
			const src = await prepareTtsAudioSrc(buffer)
			await playPreparedTts(src, () => {
				if (started) return
				started = true
				if (onPlay) onPlay()
			})
		}
	})()
}

function requestTtsArrayBuffer(text) {
	return new Promise((resolve, reject) => {
		abortTtsRequest('switch')
		const baseUrl = getBaseUrl()
		ttsAbortReason = null
		const requestData = {
			text: (text || '').slice(0, 500),
			responseFormat: 'mp3',
		}
		const requestStartTime = Date.now()
		let settled = false
		const finish = (fn, val) => {
			if (settled) return
			settled = true
			fn(val)
		}
		const watchdog = setTimeout(() => {
			abortTtsRequest('timeout')
			finish(
				reject,
				makeTtsError('TTS生成超时（120s）', {
					baseUrl,
					...getPlatformInfo(),
				})
			)
		}, 121000)
		ttsRequestTask = uni.request({
			url: `${baseUrl}/api/ai/tts/speak`,
			method: 'POST',
			header: { 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
			responseType: 'arraybuffer',
			timeout: 120000,
			data: requestData,
			success: (res) => {
				ttsRequestTask = null
				ttsAbortReason = null
				clearTimeout(watchdog)
				const duration = Date.now() - requestStartTime
				const headers = (res && (res.header || res.headers)) || {}
				const traceId = headers['x-siliconcloud-trace-id'] || headers['X-Siliconcloud-Trace-Id']
				console.log(`TTS分段请求成功，耗时:${duration}ms，状态码:`, res.statusCode, '数据长度:', res.data?.byteLength)
				if (res.statusCode === 200) {
					finish(resolve, res.data)
					return
				}
				const bodyMsg = parseTtsErrorBody(res.data)
				const errMsg = bodyMsg || `请求TTS失败（HTTP ${res.statusCode}）`
				finish(
					reject,
					makeTtsError(formatHttpErrorMessage(res.statusCode, errMsg), {
						baseUrl,
						statusCode: res.statusCode,
						traceId,
					})
				)
			},
			fail: (err) => {
				ttsRequestTask = null
				clearTimeout(watchdog)
				const duration = Date.now() - requestStartTime
				console.error(`TTS分段请求失败，耗时:${duration}ms:`, err)
				let errorMsg = '请求TTS失败'
				if (err && err.errMsg && err.errMsg.includes('abort')) {
					errorMsg = ttsAbortReason === 'timeout' ? 'TTS生成超时（120s）' : '已取消语音生成'
				} else if (err && err.errMsg && err.errMsg.includes('timeout')) {
					errorMsg = 'TTS生成超时（120s）'
				} else if (err && err.errMsg) {
					errorMsg = err.errMsg
				}
				const reason = ttsAbortReason
				ttsAbortReason = null
				finish(
					reject,
					makeTtsError(errorMsg, {
						baseUrl,
						errMsg: err && err.errMsg,
						abortReason: reason,
						...getPlatformInfo(),
					})
				)
			},
		})
	})
}

/**
 * 停止语音播放
 */
export function stopAiVoice() {
	console.log('停止语音播放')

	abortTtsRequest('user')

	// 停止 plus.audio 播放器
	if (plusAudioPlayer) {
		try {
			plusAudioPlayer.stop()
			plusAudioPlayer.close()
		} catch (e) {}
		plusAudioPlayer = null
	}

	if (innerAudioContext) {
		try {
			innerAudioContext.stop()
			innerAudioContext.destroy()
		} catch (e) {}
		innerAudioContext = null
	}

	if (audioContext) {
		try {
			if (audioSource) {
				audioSource.stop()
				audioSource.disconnect()
				audioSource = null
			}
			audioContext.close()
		} catch (e) {}
		audioContext = null
	}

	if (voiceStopTimer) {
		clearTimeout(voiceStopTimer)
		voiceStopTimer = null
	}

	cleanupCurrentTtsFile()
}

function prepareTtsAudioSrc(arrayBuffer) {
	console.log('准备音频源，数据大小:', arrayBuffer?.byteLength)

	const buffer = normalizeTtsArrayBuffer(arrayBuffer)
	if (!buffer || buffer.byteLength < 16) {
		return Promise.reject(new Error('TTS 返回的音频数据无效'))
	}
	if (!looksLikeMp3(buffer)) {
		const msg = parseTtsErrorBody(buffer)
		return Promise.reject(new Error(msg || 'TTS 返回的不是有效 MP3 音频'))
	}

	// H5 平台使用 Blob URL
	// #ifdef H5
	const blob = new Blob([buffer], { type: 'audio/mpeg' })
	return Promise.resolve(URL.createObjectURL(blob))
	// #endif

	// App 平台使用本地临时文件
	// #ifdef APP-PLUS
	return saveToLocalFile(buffer)
	// #endif

	// 小程序使用 base64 data URL
	// #ifndef H5 || APP-PLUS
	return arrayBufferToBase64Url(buffer)
	// #endif
}

function saveToLocalFile(buffer) {
	return new Promise((resolve, reject) => {
		try {
			cleanupCurrentTtsFile()
			const fileName = `_doc/tts_${Date.now()}.mp3`
			console.log('准备保存音频到:', fileName)

			plus.io.resolveLocalFileSystemURL('_doc', (dirEntry) => {
				dirEntry.getFile(fileName.replace('_doc/', ''), { create: true }, (fileEntry) => {
					fileEntry.createWriter((writer) => {
						writer.onwriteend = () => {
							const filePath = fileEntry.toLocalURL()
							console.log('音频文件保存成功:', filePath)
							ttsTempFileEntry = fileEntry
							setTimeout(() => resolve(filePath), 120)
						}
						writer.onerror = (e) => {
							console.error('写入文件失败:', e)
							reject(new Error('保存音频文件失败'))
						}
						const blob = new Blob([buffer], { type: 'audio/mpeg' })
						writer.write(blob)
					}, (e) => {
						console.error('创建Writer失败:', e)
						reject(new Error('创建文件写入器失败'))
					})
				}, (e) => {
					console.error('获取文件失败:', e)
					reject(new Error('创建音频文件失败'))
				})
			}, (e) => {
				console.error('获取_doc目录失败:', e)
				reject(new Error('无法访问本地存储'))
			})
		} catch (e) {
			console.error('保存音频异常:', e)
			reject(new Error('保存音频失败'))
		}
	})
}

function cleanupTtsFile(fileEntry) {
	try {
		fileEntry.remove(() => {
			console.log('临时音频文件已清理')
		}, (e) => {
			console.error('清理临时文件失败:', e)
		})
	} catch (e) {
		console.error('清理临时文件异常:', e)
	}
}

function arrayBufferToBase64Url(buffer) {
	return new Promise((resolve, reject) => {
		try {
			if (typeof uni.arrayBufferToBase64 === 'function') {
				const base64 = uni.arrayBufferToBase64(buffer)
				const dataUrl = `data:audio/mpeg;base64,${base64}`
				console.log('使用 base64 data URL 播放音频，长度:', dataUrl.length)
				resolve(dataUrl)
				return
			}
		} catch (e) {
			console.error('base64 转换失败:', e)
		}
		reject(new Error('当前环境不支持播放语音'))
	})
}

function playPreparedTts(src, onPlay) {
	console.log('播放准备好的音频:', src?.substring(0, 50) + '...')
	stopAiVoice()

	// App 平台使用 plus.audio 播放 base64 data URL
	// #ifdef APP-PLUS
	return playWithInnerAudio(src, onPlay).catch(() => playWithPlusAudio(src, onPlay))
	// #endif

	// 其他平台使用 InnerAudioContext
	// #ifndef APP-PLUS
	return playWithInnerAudio(src, onPlay)
	// #endif
}

function playWithPlusAudio(src, onPlay) {
	console.log('使用 plus.audio 播放')

	return new Promise((resolve, reject) => {
		try {
			// 创建音频播放器
			plusAudioPlayer = plus.audio.createPlayer(src)

			// 播放完成回调
			plusAudioPlayer.addEventListener('ended', () => {
				console.log('plus.audio 播放结束')
				if (plusAudioPlayer) {
					try {
						plusAudioPlayer.close()
					} catch (e) {}
					plusAudioPlayer = null
				}
				cleanupCurrentTtsFile()
				resolve()
			})

			// 播放错误回调
			plusAudioPlayer.addEventListener('error', (e) => {
				console.error('plus.audio 播放失败:', e)
				if (plusAudioPlayer) {
					try {
						plusAudioPlayer.close()
					} catch (e) {}
					plusAudioPlayer = null
				}
				cleanupCurrentTtsFile()
				reject(new Error('音频播放失败'))
			})

			// 开始播放
			console.log('plus.audio 开始播放')
			if (onPlay) onPlay()
			plusAudioPlayer.play()
		} catch (e) {
			console.error('plus.audio 创建播放器失败:', e)
			reject(new Error('创建音频播放器失败'))
		}
	})
}

function playWithInnerAudio(src, onPlay) {
	console.log('使用 InnerAudioContext 播放')

	return sleep(220).then(() => new Promise((resolve, reject) => {
		innerAudioContext = uni.createInnerAudioContext()
		innerAudioContext.autoplay = false
		innerAudioContext.src = src

		console.log('设置音频源:', src?.substring(0, 50) + '...')

		let settled = false

		const finish = (err) => {
			if (settled) return
			settled = true
			if (innerAudioContext) {
				try {
					innerAudioContext.destroy()
				} catch (e) {}
				innerAudioContext = null
			}
			if (!err) cleanupCurrentTtsFile()
			if (err) reject(err)
			else resolve()
		}

		innerAudioContext.onCanplay(() => {
			console.log('音频可以播放')
			if (!innerAudioContext || settled) return
			try {
				innerAudioContext.play()
			} catch (e) {
				finish(new Error(e.message || '音频播放启动失败'))
			}
		})

		innerAudioContext.onPlay(() => {
			console.log('音频开始播放')
			if (onPlay) onPlay()
		})

		innerAudioContext.onEnded(() => {
			console.log('音频播放结束')
			finish()
		})

		innerAudioContext.onError((err) => {
			const { errMsg, errCode } = err || {}
			console.error('innerAudio 播放失败', { errMsg, errCode, src: src?.substring(0, 50) })
			const code = errCode != null ? errCode : ''
			const hint = code === -99 || code === '-99'
				? '（多为本地音频路径无效或文件未写完，请重试）'
				: ''
			finish(new Error(`音频播放失败: ${errMsg || 'MediaError'} (${code})${hint}`))
		})

		// App 平台有时不会触发 onCanplay，添加延迟自动播放
		voiceStopTimer = setTimeout(() => {
			if (!settled && innerAudioContext) {
				console.log('播放超时，强制尝试播放')
				try {
					innerAudioContext.play()
				} catch (e) {}
			}
		}, 800)

		// 额外的安全超时
		setTimeout(() => {
			if (!settled) {
				console.log('播放整体超时，强制结束')
				finish(new Error('音频播放超时'))
			}
		}, 30000)
	}))
}

function normalizeTtsArrayBuffer(data) {
	if (data instanceof ArrayBuffer) return data
	if (Array.isArray(data)) {
		try {
			return new Uint8Array(data).buffer
		} catch (e) {}
	}
	if (data && typeof data === 'object') {
		if (data.buffer instanceof ArrayBuffer) return data.buffer
	}
	return null
}

function looksLikeMp3(buffer) {
	if (!buffer || buffer.byteLength < 3) return false
	const view = new Uint8Array(buffer)
	const id3 = view[0] === 0x49 && view[1] === 0x44 && view[2] === 0x33
	const mp3Frame = view[0] === 0xFF && (view[1] & 0xE0) === 0xE0
	return id3 || mp3Frame
}

function parseTtsErrorBody(buffer) {
	try {
		const text = new TextDecoder().decode(buffer)
		if (!text) return null
		const json = JSON.parse(text)
		return json?.error || json?.message || json?.msg || null
	} catch (e) {
		return null
	}
}

function formatHttpErrorMessage(code, msg) {
	if (code === 401) return 'TTS 认证失败，请检查 API 密钥'
	if (code === 429) return 'TTS 请求过于频繁，请稍后再试'
	if (code >= 500) return 'TTS 服务暂时不可用，请稍后重试'
	return msg || `TTS 请求失败（HTTP ${code}）`
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function splitTtsText(text, maxLen) {
	const t = (text || '').trim()
	if (!t) return []
	const limit = Math.max(40, maxLen || 160)

	const parts = []
	let rest = t
	const breakRe = /[。！？!?；;，,]\s*/g
	while (rest.length > limit) {
		let cut = -1
		let match
		breakRe.lastIndex = 0
		while ((match = breakRe.exec(rest)) !== null) {
			if (match.index + match[0].length <= limit) cut = match.index + match[0].length
			else break
		}
		if (cut < 1) cut = limit
		parts.push(rest.slice(0, cut).trim())
		rest = rest.slice(cut).trim()
	}
	if (rest) parts.push(rest)
	return parts.filter(Boolean)
}

// ========== AI对话相关 ==========

function resolveAiUserMeta() {
	try {
		const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
		const userId = user.userId || user.id || user.studentId || null
		const majorCode = user.majorCode || 'GENERAL'
		return { userId, majorCode }
	} catch (e) {
		return { userId: null, majorCode: 'GENERAL' }
	}
}

function resolveAiQuestionFromMessages(messages) {
	if (!Array.isArray(messages) || messages.length === 0) return ''
	for (let i = messages.length - 1; i >= 0; i -= 1) {
		const m = messages[i]
		if (m && m.role === 'user') {
			const text = String(m.text || '').trim()
			return text
		}
	}
	return ''
}

function resolveAiUserImagesFromMessages(messages) {
	if (!Array.isArray(messages) || messages.length === 0) return []
	for (let i = messages.length - 1; i >= 0; i -= 1) {
		const m = messages[i]
		if (m && m.role === 'user') {
			const list = m.filePaths
			if (Array.isArray(list) && list.length > 0) {
				return list.filter(Boolean).map((x) => String(x))
			}
			return []
		}
	}
	return []
}

function normalizeAiMode(mode) {
	const v = mode == null ? '' : String(mode).trim()
	return v ? v : 'GENERAL'
}

export async function requestAiChat(messages, options = {}) {
	const { userId, majorCode } = resolveAiUserMeta()
	if (!userId) {
		throw new Error('请先登录后再使用 AI 对话')
	}
	const mode = normalizeAiMode(options.mode)
	let question = resolveAiQuestionFromMessages(messages)
	if (!question) {
		question = resolveAiUserImagesFromMessages(messages).length ? '[图片]' : ''
	}
	if (!question) {
		throw new Error('问题不能为空')
	}
	const userImages = resolveAiUserImagesFromMessages(messages)
	return request({
		url: '/api/ai/chat-mode',
		method: 'POST',
		timeout: 120000,
		data: {
			userId,
			majorCode,
			mode,
			question,
			userImages,
			hrIdleTimeout: options.hrIdleTimeout === true,
		},
	})
}

/**
 * 请求AI对话（流式）
 * @param {Object|Array} params - 请求参数对象或消息数组
 * @param {function} onChunk - 收到数据块时的回调
 * @returns {Promise<void>}
 */
export function requestAiChatStream(params, onChunk) {
	// 兼容两种调用方式：
	// 1. 旧版：requestAiChatStream({ userId, majorCode, mode, question }, onChunk)
	// 2. 新版：requestAiChatStream(messages, options, onChunk, onDone, onError)
	
	// 如果第一个参数是数组，说明是新版调用方式
	if (Array.isArray(params)) {
		const messages = params
		const options = onChunk || {}
		const onChunkCb = arguments[2]
		const onDone = arguments[3]
		const onError = arguments[4]
		
		return requestAiChat(messages, options)
			.then((text) => {
				const full = text == null ? '' : String(text)
				if (typeof onChunkCb === 'function') onChunkCb(full)
				if (typeof onDone === 'function') onDone(full)
			})
			.catch((e) => {
				if (typeof onError === 'function') onError(e instanceof Error ? e : new Error(String(e)))
				throw e
			})
	}
	
	// 旧版调用方式：params 是对象 { userId, majorCode, mode, question, userImages }
	const { userId, majorCode, mode, question, userImages, ...otherOptions } = params || {}
	
	console.log('AI请求开始:', { userId, majorCode, mode, question: question?.substring(0, 50) })

	return new Promise((resolve, reject) => {
		if (!userId) {
			reject(new Error('请先登录后再使用 AI 对话'))
			return
		}
		if (!question) {
			reject(new Error('问题不能为空'))
			return
		}

		// App 平台使用 /api/ai/chat-mode 接口，它使用 JSON 格式
		const requestUrl = `${getBaseUrl()}/api/ai/chat-mode`
		console.log('AI请求URL:', requestUrl)
		
		const requestData = {
			userId: userId,
			majorCode: majorCode || 'GENERAL',
			mode: mode || 'GENERAL',
			question: question,
			userImages: userImages || []
		}
		console.log('请求参数:', requestData)
		
		uni.request({
			url: requestUrl,
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			timeout: 120000,
			data: requestData,
			success: (res) => {
				console.log('AI请求成功:', res.statusCode, '数据:', res.data)
				
				if (res.statusCode === 200 && res.data) {
					// 直接返回完整文本
					const text = typeof res.data === 'string' ? res.data : (res.data.text || res.data.message || res.data.content || JSON.stringify(res.data))
					console.log('AI返回文本:', text?.substring(0, 100))
					if (typeof onChunk === 'function') {
						onChunk(text)
					}
					resolve()
				} else {
					reject(new Error(res.data?.message || `AI对话请求失败（HTTP ${res.statusCode}）`))
				}
			},
			fail: (err) => {
				console.error('AI请求失败:', err)
				reject(new Error(err.errMsg || 'AI对话请求失败'))
			}
		})
	})
}

export async function requestAiHistory() {
	const { userId } = resolveAiUserMeta()
	if (!userId) return []
	const res = await request({
		url: `/api/ai/history?userId=${encodeURIComponent(String(userId))}`,
		method: 'GET',
		timeout: 30000,
	})
	if (Array.isArray(res)) return res
	if (res && Array.isArray(res.data)) return res.data
	if (res && Array.isArray(res.list)) return res.list
	return []
}

export async function setAiConsultRetain(consultId, retained) {
	const { userId } = resolveAiUserMeta()
	if (!userId) {
		throw new Error('请先登录后再设置保留对话')
	}
	if (consultId == null) {
		throw new Error('consultId 不能为空')
	}
	await request({
		url: '/api/ai/history/retain',
		method: 'PUT',
		timeout: 30000,
		data: {
			userId,
			consultId,
			retained: !!retained,
		},
	})
}

export async function syncAiConversationsToServer(conversations) {
	const { userId } = resolveAiUserMeta()
	if (!userId) return null
	return request({
		url: '/api/ai/sessions/sync',
		method: 'POST',
		timeout: 30000,
		data: {
			userId,
			conversations: Array.isArray(conversations) ? conversations : [],
		},
	})
}

export async function fetchAiConversationsFromServer() {
	const { userId } = resolveAiUserMeta()
	if (!userId) return []
	const res = await request({
		url: `/api/ai/sessions/sync?userId=${encodeURIComponent(String(userId))}`,
		method: 'GET',
		timeout: 30000,
	})
	const raw =
		(res && res.conversations !== undefined ? res.conversations : null) ??
		(res && res.data && res.data.conversations !== undefined ? res.data.conversations : null)
	if (raw == null) return []
	if (Array.isArray(raw)) return raw
	try {
		const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
		return Array.isArray(parsed) ? parsed : []
	} catch (e) {
		return []
	}
}

export function uploadVoiceAndTranscribe(filePath) {
	const base = getApiBase()
	if (!base) {
		return Promise.reject(new Error('未配置 API 地址'))
	}
	if (!filePath) {
		return Promise.reject(new Error('音频文件路径为空'))
	}
	const token = getToken()
	const header = {}
	if (token) {
		header['Authorization'] = `Bearer ${token}`
	}
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: `${base}/api/ai/asr/transcribe`,
			filePath,
			name: 'file',
			header,
			success: (res) => {
				if (!res || (res.statusCode && res.statusCode >= 400)) {
					reject(new Error(`语音识别失败（HTTP ${res && res.statusCode ? res.statusCode : 'unknown'}）`))
					return
				}
				try {
					const body = res.data ? JSON.parse(res.data) : {}
					const text = body && body.text != null ? String(body.text) : ''
					if (!text.trim()) {
						reject(new Error('语音识别结果为空'))
						return
					}
					resolve(text)
				} catch (e) {
					reject(new Error('语音识别响应解析失败'))
				}
			},
			fail: (e) => {
				const msg = e && (e.errMsg || e.message) ? String(e.errMsg || e.message) : '语音识别请求失败'
				reject(new Error(msg))
			},
		})
	})
}
