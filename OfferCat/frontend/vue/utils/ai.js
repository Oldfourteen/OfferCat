import { getApiBase } from '@/api/config.js'
import { request } from '@/api/request'
import { getToken } from '@/utils/token'

const BASE_URL = getApiBase()

// ========== 语音合成相关 ==========

// 音频上下文
let audioContext = null
let audioSource = null
let voiceStopTimer = null
let innerAudioContext = null
// #ifdef APP-PLUS
let plusAudioPlayer = null
// #endif

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

	return new Promise((resolve, reject) => {
		console.log('开始TTS请求，文本长度:', text?.length)
		
		const requestTask = uni.request({
			url: `${BASE_URL}/api/ai/tts/speak`,
			method: 'POST',
			header: { 'Content-Type': 'application/json' },
			responseType: 'arraybuffer',
			timeout: 30000,
			data: {
				text: text.slice(0, 500),
				responseFormat: 'mp3'
			},
			success: (res) => {
				console.log('TTS请求成功，状态码:', res.statusCode, '数据长度:', res.data?.byteLength)
				
				if (res.statusCode === 200) {
					prepareTtsAudioSrc(res.data)
						.then(src => {
							console.log('音频源准备成功:', src?.substring(0, 50) + '...')
							return playPreparedTts(src, onPlay)
						})
						.then(() => {
							console.log('音频播放完成')
							resolve()
						})
						.catch(err => {
							console.error('音频处理或播放失败:', err)
							reject(err instanceof Error ? err : new Error(String(err)))
						})
					return
				}
				const bodyMsg = parseTtsErrorBody(res.data)
				const errMsg = bodyMsg || `请求TTS失败（HTTP ${res.statusCode}）`
				reject(new Error(formatHttpErrorMessage(res.statusCode, errMsg)))
			},
			fail: (err) => {
				console.error('TTS请求失败:', err)
				let errorMsg = '请求TTS失败'
				if (err.errMsg && err.errMsg.includes('timeout')) {
					errorMsg = 'TTS请求超时，请检查网络连接'
				} else if (err.errMsg) {
					errorMsg = err.errMsg
				}
				reject(new Error(errorMsg))
			}
		})
		
		// 添加超时保护
		setTimeout(() => {
			try {
				if (requestTask && typeof requestTask.abort === 'function') {
					requestTask.abort()
				}
			} catch (e) {}
		}, 35000)
	})
}

/**
 * 停止语音播放
 */
export function stopAiVoice() {
	console.log('停止语音播放')

	// #ifdef APP-PLUS
	if (plusAudioPlayer) {
		try {
			plusAudioPlayer.stop()
			plusAudioPlayer.close()
		} catch (e) {}
		plusAudioPlayer = null
	}
	// #endif

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

	// App 平台和小程序使用 base64 data URL
	// #ifndef H5
	return arrayBufferToBase64Url(buffer)
	// #endif
}

function arrayBufferToBase64Url(arrayBuffer) {
	return new Promise((resolve, reject) => {
		try {
			if (typeof uni.arrayBufferToBase64 === 'function') {
				const base64 = uni.arrayBufferToBase64(arrayBuffer)
				const dataUrl = `data:audio/mpeg;base64,${base64}`
				console.log('使用 base64 data URL 播放音频')
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

	// #ifdef APP-PLUS
	// App 平台使用 5+ Audio 播放器
	return playWithPlusAudio(src, onPlay)
	// #endif

	// #ifndef APP-PLUS
	// 其他平台使用 InnerAudioContext
	return playWithInnerAudio(src, onPlay)
	// #endif
}

// App 平台使用 5+ Audio 播放器
function playWithPlusAudio(src, onPlay) {
	console.log('使用 plus.audio 播放')

	return new Promise((resolve, reject) => {
		try {
			// 停止之前的播放器
			if (plusAudioPlayer) {
				try {
					plusAudioPlayer.stop()
					plusAudioPlayer.close()
				} catch (e) {}
			}

			// 创建音频播放器
			plusAudioPlayer = plus.audio.createPlayer(src)

			plusAudioPlayer.addEventListener('canplay', () => {
				console.log('音频可以播放')
			})

			plusAudioPlayer.addEventListener('play', () => {
				console.log('音频开始播放')
				if (onPlay) onPlay()
			})

			plusAudioPlayer.addEventListener('ended', () => {
				console.log('音频播放结束')
				if (plusAudioPlayer) {
					try {
						plusAudioPlayer.close()
					} catch (e) {}
					plusAudioPlayer = null
				}
				resolve()
			})

			plusAudioPlayer.addEventListener('error', (e) => {
				console.error('音频播放错误:', e)
				if (plusAudioPlayer) {
					try {
						plusAudioPlayer.close()
					} catch (e) {}
					plusAudioPlayer = null
				}
				reject(new Error('音频播放失败: ' + (e.message || '未知错误')))
			})

			// 开始播放
			plusAudioPlayer.play()
		} catch (e) {
			console.error('创建播放器失败:', e)
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
				tryPlay()
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
 * 解析SSE数据流，提取实际的文本内容
 * @param {string} chunk - SSE数据块
 * @returns {string} 提取的文本内容
 */
function parseSSEChunk(chunk) {
	if (!chunk) return ''
	
	const lines = chunk.split('\n')
	let result = ''
	
	for (const line of lines) {
		const trimmed = line.trim()
		// SSE格式: data: {...} 或 data: [DONE]
		if (trimmed.startsWith('data:')) {
			const data = trimmed.slice(5).trim()
			// 跳过结束标记
			if (data === '[DONE]') continue
			// 尝试解析JSON
			try {
				const json = JSON.parse(data)
				// 提取choices[0].delta.content
				if (json.choices && json.choices[0] && json.choices[0].delta) {
					result += json.choices[0].delta.content || ''
				}
			} catch (e) {
				// 如果不是JSON，直接追加
				result += data
			}
		}
	}
	
	return result
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
	
	return new Promise((resolve, reject) => {
		if (!userId) {
			reject(new Error('请先登录后再使用 AI 对话'))
			return
		}
		if (!question) {
			reject(new Error('问题不能为空'))
			return
		}
		
		let accumulatedText = ''
		
		const requestTask = uni.request({
			url: `${BASE_URL}/api/ai/chat-stream`,
			method: 'POST',
			header: { 
				'Content-Type': 'application/json',
				'Accept': 'text/event-stream'
			},
			responseType: 'text',
			enableChunked: true,
			timeout: 120000,
			data: {
				userId,
				majorCode: majorCode || 'GENERAL',
				mode: mode || 'GENERAL',
				question,
				userImages: userImages || [],
				...otherOptions
			},
			success: (res) => {
				if (res.statusCode === 200) {
					// 如果onChunkReceived没有触发，尝试从res.data解析
					if (res.data && accumulatedText === '') {
						const text = parseSSEChunk(res.data)
						if (text && typeof onChunk === 'function') {
							onChunk(text)
						}
					}
					resolve()
				} else {
					reject(new Error(res.data?.message || `AI流式对话请求失败（HTTP ${res.statusCode}）`))
				}
			},
			fail: (err) => {
				reject(new Error(err.errMsg || 'AI流式对话请求失败'))
			}
		})

		// 监听数据块
		if (requestTask && requestTask.onChunkReceived) {
			requestTask.onChunkReceived((res) => {
				const chunk = new TextDecoder().decode(res.data)
				
				if (typeof onChunk === 'function' && chunk) {
					const text = parseSSEChunk(chunk)
					if (text) {
						accumulatedText += text
						onChunk(accumulatedText)
					}
				}
			})
		}
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
