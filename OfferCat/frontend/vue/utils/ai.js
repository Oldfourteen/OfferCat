import { getApiBase } from '@/api/config.js'

const BASE_URL = getApiBase()

// ========== 语音合成相关 ==========

// 音频上下文
let audioContext = null
let audioSource = null
let voiceStopTimer = null
let innerAudioContext = null

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
	
	// #ifdef H5
	const blob = new Blob([buffer], { type: 'audio/mpeg' })
	return Promise.resolve(URL.createObjectURL(blob))
	// #endif
	
	// #ifndef H5
	return saveTtsMp3ToLocal(buffer)
	// #endif
}

function saveTtsMp3ToLocal(arrayBuffer) {
	console.log('保存MP3到本地，数据大小:', arrayBuffer?.byteLength)
	
	return new Promise((resolve, reject) => {
		// #ifdef APP-PLUS
		try {
			const fileName = `ai_voice_${Date.now()}.mp3`
			const savePath = `_doc/${fileName}`
			
			plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
				console.log('请求文件系统成功')
				
				fs.root.getFile(savePath, { create: true }, (fileEntry) => {
					console.log('创建文件成功:', savePath)
					
					fileEntry.createWriter((writer) => {
						writer.onwrite = () => {
							console.log('文件写入成功')
							const fullPath = plus.io.convertLocalFileSystemURL(savePath)
							console.log('转换后的路径:', fullPath)
							resolve(fullPath)
						}
						writer.onerror = (e) => {
							console.error('写入文件失败:', e)
							reject(new Error('写入语音文件失败: ' + (e.message || '未知错误')))
						}
						
						const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' })
						console.log('创建Blob成功，大小:', blob.size)
						writer.write(blob)
					}, (e) => {
						console.error('创建文件写入器失败:', e)
						reject(new Error('创建文件写入器失败: ' + (e.message || '未知错误')))
					})
				}, (e) => {
					console.error('创建文件失败:', e)
					reject(new Error('创建文件失败: ' + (e.message || '未知错误')))
				})
			}, (e) => {
				console.error('请求文件系统失败:', e)
				reject(new Error('请求文件系统失败: ' + (e.message || '未知错误')))
			})
		} catch (e) {
			console.error('保存语音文件异常:', e)
			reject(new Error('保存语音文件异常: ' + (e.message || '未知错误')))
		}
		// #endif
		
		// #ifndef APP-PLUS
		try {
			if (typeof uni.arrayBufferToBase64 === 'function') {
				const base64 = uni.arrayBufferToBase64(arrayBuffer)
				const dataUrl = `data:audio/mpeg;base64,${base64}`
				console.log('使用 base64 data URL')
				resolve(dataUrl)
				return
			}
		} catch (e) {
			console.warn('尝试使用 data URL 播放失败:', e)
		}
		reject(new Error('当前环境不支持保存语音文件'))
		// #endif
	})
}

function playPreparedTts(src, onPlay) {
	console.log('播放准备好的音频:', src?.substring(0, 50) + '...')
	stopAiVoice()
	return playWithInnerAudio(src, onPlay)
}

function playWithInnerAudio(src, onPlay) {
	console.log('使用 InnerAudioContext 播放')
	
	return sleep(220).then(() => new Promise((resolve, reject) => {
		// #ifdef APP-PLUS
		if (uni.setInnerAudioOption) {
			uni.setInnerAudioOption({
				obeyMuteSwitch: false,
				sessionCategory: 'playback'
			})
		}
		// #endif

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
				console.error('播放启动失败:', e)
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
		
		voiceStopTimer = setTimeout(() => {
			if (!settled && innerAudioContext) {
				console.log('播放超时，强制开始播放')
				try {
					innerAudioContext.play()
				} catch (e) {}
			}
		}, 1000)
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

// ========== AI对话相关 ==========

/**
 * 请求AI对话（非流式）
 * @param {Array} messages - 消息列表
 * @param {Object} options - 选项
 * @returns {Promise<string>}
 */
export function requestAiChat(messages, options = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/chat`,
			method: 'POST',
			header: { 'Content-Type': 'application/json' },
			data: { messages, ...options },
			success: (res) => {
				if (res.statusCode === 200 && res.data) {
					resolve(res.data)
				} else {
					reject(new Error(res.data?.message || 'AI对话请求失败'))
				}
			},
			fail: (err) => reject(new Error(err.errMsg || 'AI对话请求失败'))
		})
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
 * @param {Object} params - 请求参数
 * @param {number} params.userId - 用户ID
 * @param {string} params.majorCode - 专业代码
 * @param {string} params.mode - 模式
 * @param {string} params.question - 问题
 * @param {Array} params.userImages - 用户图片列表（可选）
 * @param {function} onChunk - 收到数据块时的回调
 * @returns {Promise<void>}
 */
export function requestAiChatStream(params, onChunk) {
	const { userId, majorCode, mode, question, userImages } = params
	
	return new Promise((resolve, reject) => {
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
			data: {
				userId,
				majorCode,
				mode,
				question,
				userImages: userImages || []
			},
			success: (res) => {
				if (res.statusCode === 200) {
					// 如果onChunkReceived没有触发，尝试从res.data解析
					if (res.data && accumulatedText === '') {
						const text = parseSSEChunk(res.data)
						if (text && onChunk) {
							onChunk(text)
						}
					}
					resolve()
				} else {
					reject(new Error(res.data?.message || 'AI流式对话请求失败'))
				}
			},
			fail: (err) => reject(new Error(err.errMsg || 'AI流式对话请求失败'))
		})

		// 监听数据块
		if (requestTask && requestTask.onChunkReceived) {
			requestTask.onChunkReceived((res) => {
				const chunk = new TextDecoder().decode(res.data)
				console.log('收到SSE数据块:', chunk?.substring(0, 100))
				
				if (onChunk && chunk) {
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

/**
 * 请求AI历史记录
 * @returns {Promise<Array>}
 */
export function requestAiHistory() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/history`,
			method: 'GET',
			success: (res) => {
				if (res.statusCode === 200 && res.data) {
					resolve(res.data)
				} else {
					reject(new Error(res.data?.message || '获取历史记录失败'))
				}
			},
			fail: (err) => reject(new Error(err.errMsg || '获取历史记录失败'))
		})
	})
}

/**
 * 设置AI咨询保留状态
 * @param {string} consultId - 咨询ID
 * @param {boolean} retained - 是否保留
 * @returns {Promise<void>}
 */
export function setAiConsultRetain(consultId, retained) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/consult/${consultId}/retain`,
			method: 'POST',
			header: { 'Content-Type': 'application/json' },
			data: { retained },
			success: (res) => {
				if (res.statusCode === 200) {
					resolve()
				} else {
					reject(new Error(res.data?.message || '设置保留状态失败'))
				}
			},
			fail: (err) => reject(new Error(err.errMsg || '设置保留状态失败'))
		})
	})
}

/**
 * 上传语音并转录
 * @param {string} filePath - 语音文件路径
 * @returns {Promise<string>}
 */
export function uploadVoiceAndTranscribe(filePath) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: `${BASE_URL}/api/ai/asr/transcribe`,
			filePath: filePath,
			name: 'file',
			success: (res) => {
				if (res.statusCode === 200) {
					const data = JSON.parse(res.data)
					resolve(data.text || '')
				} else {
					reject(new Error('语音转录失败'))
				}
			},
			fail: (err) => reject(new Error(err.errMsg || '语音上传失败'))
		})
	})
}

/**
 * 同步AI会话到服务器
 * @param {Array} conversations - 会话列表
 * @param {number} userId - 用户ID
 * @returns {Promise<void>}
 */
export function syncAiConversationsToServer(conversations, userId) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/sessions/sync`,
			method: 'POST',
			header: { 'Content-Type': 'application/json' },
			data: { userId, conversations },
			success: (res) => {
				if (res.statusCode === 200) {
					resolve()
				} else {
					reject(new Error(res.data?.message || '同步会话失败'))
				}
			},
			fail: (err) => reject(new Error(err.errMsg || '同步会话失败'))
		})
	})
}

/**
 * 从服务器获取AI会话
 * @param {number} userId - 用户ID
 * @returns {Promise<Array>}
 */
export function fetchAiConversationsFromServer(userId) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/sessions/sync?userId=${userId}`,
			method: 'GET',
			success: (res) => {
				if (res.statusCode === 200 && res.data) {
					// 解析返回的 conversations JSON 字符串
					try {
						const conversations = JSON.parse(res.data.conversations || '[]')
						resolve(conversations)
					} catch (e) {
						resolve([])
					}
				} else {
					reject(new Error(res.data?.message || '获取会话失败'))
				}
			},
			fail: (err) => reject(new Error(err.errMsg || '获取会话失败'))
		})
	})
}
