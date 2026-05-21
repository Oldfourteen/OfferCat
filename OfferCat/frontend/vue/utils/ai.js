import { BASE_URL, getApiBase } from '@/api/config'
import { formatHttpErrorMessage } from '@/api/request'

// 获取当前缓存中的用户信息，用于补齐 AI 接口的上下文参数。
function getStoredUser() {
	try {
		return uni.getStorageSync('user_v2') || uni.getStorageSync('user') || null
	} catch (e) {
		return null
	}
}

// 将最近的对话记录整理成后端可直接消费的上下文提问文本。
function buildContextQuestion(messages) {
	if (!messages || messages.length === 0) return ''

	const valid = messages.filter(m => m && (m.text || m.content) && !m.loading)
	const lastUser = [...valid].reverse().find(m => m.role === 'user')
	if (!lastUser) return ''

	const question = lastUser.text || lastUser.content || ''

	// 把最近几条历史拼入上下文（不含最后一条用户消息）
	const history = valid.slice(0, -1).slice(-6)
	if (history.length === 0) return question

	const ctx = history.map(m => {
		const label = m.role === 'user' ? '用户' : 'AI'
		return `${label}：${m.text || m.content || ''}`
	}).join('\n')

	return `[对话记录]\n${ctx}\n\n[当前问题]\n${question}`
}

// 上传聊天中附带的图片，返回后端可访问的图片地址。
export function uploadAiChatImage(filePath) {
	if (!getApiBase()) {
		return Promise.reject(new Error('未配置后端地址，请检查 api/config.js'))
	}

	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: `${BASE_URL}/api/ai/upload-image`,
			filePath: filePath,
			name: 'file',
			timeout: 60000,
			success: res => {
				if (res.statusCode < 200 || res.statusCode >= 300) {
					reject(
						new Error(
							formatHttpErrorMessage(res.statusCode, `图片上传失败（HTTP ${res.statusCode}）`),
						),
					)
					return
				}
				try {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
					if (data && data.url) {
						resolve(data.url)
					} else {
						reject(new Error(data.message || '图片上传未返回有效URL'))
					}
				} catch (e) {
					reject(new Error('图片上传返回格式错误'))
				}
			},
			fail: error => {
				reject(new Error(error?.errMsg || '图片上传请求失败'))
			}
		})
	})
}

// 请求 AI 流式对话接口，并通过回调持续返回增量内容。
export function requestAiChatStream(messages = [], options = {}, onChunk, onComplete, onError) {
	if (!getApiBase()) {
		onError(new Error('未配置后端地址，请检查 api/config.js'))
		return null
	}

	const question = buildContextQuestion(messages)
	if (!question) {
		onError(new Error('消息内容不能为空'))
		return null
	}

	const user = getStoredUser()
	const userId = (user && user.userId) ? Number(user.userId) : 0
	const majorCode = (user && user.major) ? user.major : 'general'
	const mode = options.mode || 'GENERAL'

	let fullText = ''

	const valid = messages.filter(m => m && (m.text || m.content) && !m.loading)
	const lastUser = [...valid].reverse().find(m => m.role === 'user')
	let userImages = []
	
	// 发起真正的流式请求，图片已在进入这里前完成上传。
	const doRequest = (uploadedImages) => {
		const payload = { userId, majorCode, mode, question, userImages: uploadedImages }
		if (options.hrIdleTimeout) {
			payload.hrIdleTimeout = true
		}
		const requestTask = uni.request({
			url: `${BASE_URL}/api/ai/chat-stream`,
			method: 'POST',
			header: { 'Content-Type': 'application/json' },
			data: payload,
			enableChunked: true,
			success: res => {
				if (res.statusCode < 200 || res.statusCode >= 300) {
					onError(
						new Error(
							formatHttpErrorMessage(res.statusCode, `AI 接口请求失败（HTTP ${res.statusCode}）`),
						),
					)
					return
				}
				if (fullText.length === 0 && res.data) {
					let text = typeof res.data === 'string' ? res.data : JSON.stringify(res.data)
					let parsedText = ''
					const lines = text.split('\n')
					for (let line of lines) {
						if (line.startsWith('data:')) {
							let data = line.substring(5).trim()
							if (data === '[DONE]') continue
							if (data.startsWith('[ERROR]')) continue
							parsedText += data.replace(/\\n/g, '\n')
						}
					}
					if (parsedText) {
						let i = 0
						const timer = setInterval(() => {
							fullText += parsedText[i]
							onChunk(fullText)
							i++
							if (i >= parsedText.length) {
								clearInterval(timer)
								onComplete(fullText)
							}
						}, 30)
						return
					}
				}
				onComplete(fullText)
			},
			fail: error => {
				onError(new Error(error?.errMsg || 'AI 接口调用失败'))
			}
		})

		if (requestTask && typeof requestTask.onChunkReceived === 'function') {
			// 监听后端 SSE 分块数据，并持续拼接为完整回答。
			requestTask.onChunkReceived((res) => {
				try {
					const uint8Array = new Uint8Array(res.data)
					let text = ''
					for (let i = 0; i < uint8Array.length; i++) {
						text += String.fromCharCode(uint8Array[i])
					}
					text = decodeURIComponent(escape(text))
					
					const lines = text.split('\n')
					let newChunk = ''
					for (let line of lines) {
						if (line.startsWith('data:')) {
							let data = line.substring(5).trim()
							if (data === '[DONE]') {
								continue
							}
							if (data.startsWith('[ERROR]')) {
								onError(new Error(data))
								return
							}
							newChunk += data.replace(/\\n/g, '\n')
						}
					}
					if (newChunk) {
						fullText += newChunk
						onChunk(fullText)
					}
				} catch (e) {}
			})
		}
		return requestTask
	}

	// 如果最后一条用户消息带有图片，先上传图片再发起问答请求。
	if (lastUser && lastUser.filePaths && lastUser.filePaths.length > 0) {
		const uploadPromises = lastUser.filePaths.map(path => {
			if (path.startsWith('http') && !path.startsWith('http://localhost') && !path.startsWith('http://127.0.0.1')) {
				return Promise.resolve(path)
			}
			return uploadAiChatImage(path)
		})
		
		Promise.all(uploadPromises).then(urls => {
			doRequest(urls)
		}).catch(err => {
			onError(new Error('图片上传失败，无法发送消息: ' + err.message))
		})
		return { abort: () => {} } // Return a dummy task since it's async
	} else {
		return doRequest([])
	}
}

// 获取当前用户的 AI 历史对话记录。
export function requestAiHistory() {
	if (!getApiBase()) {
		return Promise.reject(new Error('未配置后端地址，请检查 api/config.js'))
	}

	const user = getStoredUser()
	const userId = (user && user.userId) ? Number(user.userId) : 0

	// 未登录或无效用户ID，直接返回空数组，不发送请求
	if (!userId || userId <= 0) {
		return Promise.resolve([])
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/history`,
			method: 'GET',
			data: { userId },
			timeout: 15000,
			success: res => {
				if (res.statusCode < 200 || res.statusCode >= 300) {
					reject(
						new Error(
							formatHttpErrorMessage(res.statusCode, `获取历史失败（HTTP ${res.statusCode}）`),
						),
					)
					return
				}
				resolve(res.data)
			},
			fail: error => {
				reject(new Error(error?.errMsg || '获取历史失败'))
			}
		})
	})
}

// 同步会话JSON到服务端
export function syncAiConversationsToServer(conversations) {
	if (!getApiBase()) return Promise.resolve()
	const user = getStoredUser()
	const userId = (user && user.userId) ? Number(user.userId) : 0
	if (!userId) return Promise.resolve()

	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/sessions/sync`,
			method: 'POST',
			data: {
				userId,
				conversations: JSON.stringify(conversations)
			},
			success: res => resolve(res.data),
			fail: err => reject(err)
		})
	})
}

// 从服务端获取会话JSON
export function fetchAiConversationsFromServer() {
	if (!getApiBase()) return Promise.resolve([])
	const user = getStoredUser()
	const userId = (user && user.userId) ? Number(user.userId) : 0
	if (!userId) return Promise.resolve([])

	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/sessions/sync`,
			method: 'GET',
			data: { userId },
			success: res => {
				if (res.data && res.data.conversations) {
					try {
						const parsed = JSON.parse(res.data.conversations)
						resolve(parsed)
					} catch(e) {
						resolve([])
					}
				} else {
					resolve([])
				}
			},
			fail: err => reject(err)
		})
	})
}

/**
 * 设置单条云端 AI 咨询是否保留（不参与每月 15 日清理）。每位用户最多保留 10 条。
 */
export function setAiConsultRetain(consultId, retained) {
	if (!getApiBase()) {
		return Promise.reject(new Error('未配置后端地址，请检查 api/config.js'))
	}

	const user = getStoredUser()
	const userId = (user && user.userId) ? Number(user.userId) : 0
	if (!userId) {
		return Promise.reject(new Error('请先登录'))
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/history/retain`,
			method: 'PUT',
			header: { 'Content-Type': 'application/json' },
			data: { userId, consultId: Number(consultId), retained: !!retained },
			timeout: 15000,
			success: res => {
				if (res.statusCode < 200 || res.statusCode >= 300) {
					let msg = `操作失败（HTTP ${res.statusCode}）`
					try {
						const body = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
						if (body && body.message) msg = body.message
					} catch (e) {}
					reject(new Error(formatHttpErrorMessage(res.statusCode, msg)))
					return
				}
				resolve()
			},
			fail: error => {
				reject(new Error(error?.errMsg || '网络错误'))
			}
		})
	})
}

// 请求非流式 AI 对话接口，一次性返回完整答案。
export function requestAiChat(messages = [], options = {}) {
	if (!getApiBase()) {
		return Promise.reject(new Error('未配置后端地址，请检查 api/config.js'))
	}

	const question = buildContextQuestion(messages)
	if (!question) {
		return Promise.reject(new Error('消息内容不能为空'))
	}

	const user = getStoredUser()
	const userId = (user && user.userId) ? Number(user.userId) : 0
	const majorCode = (user && user.major) ? user.major : 'general'
	const mode = options.mode || 'GENERAL'

	const valid = messages.filter(m => m && (m.text || m.content) && !m.loading)
	const lastUser = [...valid].reverse().find(m => m.role === 'user')
	
	// 发起普通问答请求，返回完整文本和原始响应数据。
	const doRequest = (uploadedImages) => {
		return new Promise((resolve, reject) => {
			uni.request({
				url: `${BASE_URL}/api/ai/chat-mode`,
				method: 'POST',
				header: { 'Content-Type': 'application/json' },
				data: { userId, majorCode, mode, question, userImages: uploadedImages },
				timeout: 30000,
				success: res => {
					if (res.statusCode < 200 || res.statusCode >= 300) {
						reject(
							new Error(
								formatHttpErrorMessage(res.statusCode, `AI 接口请求失败（HTTP ${res.statusCode}）`),
							),
						)
						return
					}
					const text = typeof res.data === 'string' ? res.data : (res.data && res.data.data) ? String(res.data.data) : JSON.stringify(res.data)
					if (!text) {
						reject(new Error('AI 接口未返回有效内容'))
						return
					}
					resolve({ text, raw: res.data })
				},
				fail: error => {
					reject(new Error(error?.errMsg || 'AI 接口调用失败'))
				}
			})
		})
	}

	// 非流式问答同样支持先上传本地图片，再携带图片地址请求后端。
	if (lastUser && lastUser.filePaths && lastUser.filePaths.length > 0) {
		const uploadPromises = lastUser.filePaths.map(path => {
			if (path.startsWith('http') && !path.startsWith('http://localhost') && !path.startsWith('http://127.0.0.1')) {
				return Promise.resolve(path)
			}
			return uploadAiChatImage(path)
		})
		return Promise.all(uploadPromises).then(urls => {
			return doRequest(urls)
		})
	} else {
		return doRequest([])
	}
}

// 缓存当前的音频播放实例，便于重复播放前先停止上一次语音。
let innerAudioContext = null
let voiceStopTimer = null

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

// 停止并销毁当前 AI 语音播放实例。
export function stopAiVoice() {
	if (voiceStopTimer) {
		clearTimeout(voiceStopTimer)
		voiceStopTimer = null
	}
	if (innerAudioContext) {
		try {
			innerAudioContext.stop()
			innerAudioContext.destroy()
		} catch (e) {}
		innerAudioContext = null
	}
}

function getTtsStorageDir() {
	if (typeof wx !== 'undefined' && wx.env && wx.env.USER_DATA_PATH) {
		return wx.env.USER_DATA_PATH
	}
	if (uni.env && uni.env.USER_DATA_PATH) {
		return uni.env.USER_DATA_PATH
	}
	return '_doc'
}

function normalizeTtsArrayBuffer(data) {
	if (!data) return null
	if (data instanceof ArrayBuffer) return data
	if (ArrayBuffer.isView(data)) {
		return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
	}
	if (typeof data === 'string') {
		try {
			if (typeof uni.base64ToArrayBuffer === 'function') {
				return uni.base64ToArrayBuffer(data)
			}
		} catch (e) {}
	}
	return null
}

function looksLikeMp3(buffer) {
	const u8 = new Uint8Array(buffer)
	if (u8.length < 4) return false
	if (u8[0] === 0x49 && u8[1] === 0x44 && u8[2] === 0x33) return true
	if (u8[0] === 0xff && (u8[1] & 0xe0) === 0xe0) return true
	return false
}

function parseTtsErrorBody(data) {
	try {
		const uint8Array = new Uint8Array(data)
		let errText = ''
		for (let i = 0; i < uint8Array.length; i++) {
			errText += String.fromCharCode(uint8Array[i])
		}
		errText = decodeURIComponent(escape(errText))
		const errData = JSON.parse(errText)
		return errData.error || errData.message || ''
	} catch (e) {
		return ''
	}
}

// App/小程序端 innerAudioContext 需要可访问的本地绝对路径，不能依赖 data: URI。
function resolveNativeAudioSrc(filePath) {
	let src = filePath
	
	// 如果是 data URL，直接返回（某些环境支持直接播放 base64 音频）
	if (src && src.startsWith('data:')) {
		return src
	}
	
	// #ifdef APP-PLUS
	if (typeof plus !== 'undefined' && plus.io && plus.io.convertLocalFileSystemURL) {
		try {
			src = plus.io.convertLocalFileSystemURL(filePath)
		} catch (e) {
			console.warn('convertLocalFileSystemURL failed', e)
		}
	}
	if (src && !/^https?:\/\//i.test(src) && !/^file:\/\//i.test(src) && src.startsWith('/')) {
		src = `file://${src}`
	}
	// #endif
	return src
}

function saveTtsMp3ToLocal(arrayBuffer) {
	return new Promise((resolve, reject) => {
		const fs = typeof uni.getFileSystemManager === 'function' ? uni.getFileSystemManager() : null
		const dir = getTtsStorageDir()
		const filePath = `${dir}/ai_voice_${Date.now()}.mp3`
		
		// 方法1: 使用 uni.getFileSystemManager (微信小程序/部分环境)
		if (fs && typeof fs.writeFile === 'function') {
			if (typeof uni.arrayBufferToBase64 !== 'function') {
				reject(new Error('当前环境不支持语音编码'))
				return
			}
			fs.writeFile({
				filePath,
				data: uni.arrayBufferToBase64(arrayBuffer),
				encoding: 'base64',
				success: () => resolve(resolveNativeAudioSrc(filePath)),
				fail: err => reject(new Error(err.errMsg || '保存语音文件失败'))
			})
			return
		}
		
		// 方法2: 使用 uni.saveFile (uni-app 通用方法，支持 App/H5/小程序)
		// 先将 ArrayBuffer 转为临时文件路径，再保存
		// #ifdef APP-PLUS
		if (typeof plus !== 'undefined' && plus.io) {
			try {
				// 使用 plus.io 写入文件
				const savePath = `_doc/ai_voice_${Date.now()}.mp3`
				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
					fs.root.getFile(savePath, { create: true }, (fileEntry) => {
						fileEntry.createWriter((writer) => {
							writer.onwrite = () => {
								const fullPath = plus.io.convertLocalFileSystemURL(savePath)
								resolve(fullPath)
							}
							writer.onerror = (e) => {
								reject(new Error('写入语音文件失败: ' + (e.message || '未知错误')))
							}
							// 将 ArrayBuffer 转为 Blob 写入
							const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' })
							writer.write(blob)
						}, (e) => {
							reject(new Error('创建文件写入器失败: ' + (e.message || '未知错误')))
						})
					}, (e) => {
						reject(new Error('创建文件失败: ' + (e.message || '未知错误')))
					})
				}, (e) => {
					reject(new Error('请求文件系统失败: ' + (e.message || '未知错误')))
				})
			} catch (e) {
				reject(new Error('保存语音文件异常: ' + (e.message || '未知错误')))
			}
			return
		}
		// #endif
		
		// 方法3: 尝试使用 uni.saveFile (将临时文件保存到本地)
		// 先将数据写入临时文件，再保存
		try {
			// 对于不支持 fileSystemManager 的环境，尝试直接使用 data URL 或 base64
			// 某些版本的 uni-app 支持直接使用 base64 作为音频源
			if (typeof uni.arrayBufferToBase64 === 'function') {
				const base64 = uni.arrayBufferToBase64(arrayBuffer)
				const dataUrl = `data:audio/mpeg;base64,${base64}`
				resolve(dataUrl)
				return
			}
		} catch (e) {
			console.warn('尝试使用 data URL 播放失败:', e)
		}
		
		reject(new Error('当前环境不支持保存语音文件'))
	})
}

function prepareTtsAudioSrc(arrayBuffer) {
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

function playWithInnerAudio(src, onPlay) {
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
			if (!innerAudioContext || settled) return
			try {
				innerAudioContext.play()
			} catch (e) {
				finish(new Error(e.message || '音频播放启动失败'))
			}
		})
		innerAudioContext.onPlay(() => {
			if (onPlay) onPlay()
		})
		innerAudioContext.onEnded(() => finish())
		innerAudioContext.onError((err) => {
			const { errMsg, errCode } = err || {}
			console.error('innerAudio 播放失败', { errMsg, errCode, src })
			const code = errCode != null ? errCode : ''
			const hint = code === -99 || code === '-99'
				? '（多为本地音频路径无效或文件未写完，请重试）'
				: ''
			finish(new Error(`音频播放失败: ${errMsg || 'MediaError'} (${code})${hint}`))
		})
		voiceStopTimer = setTimeout(() => {
			if (!settled && innerAudioContext) {
				try {
					innerAudioContext.play()
				} catch (e) {}
			}
		}, 360)
	}))
}

function playPreparedTts(src, onPlay) {
	stopAiVoice()
	return playWithInnerAudio(src, onPlay)
}

// 调用 TTS 接口并播放 AI 生成的语音结果。
export function playAiVoice(text, onPlay) {
	if (!getApiBase()) {
		return Promise.reject(new Error('未配置后端地址，请检查 api/config.js'))
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/tts/speak`,
			method: 'POST',
			header: { 'Content-Type': 'application/json' },
			responseType: 'arraybuffer',
			timeout: 60000,
			data: {
				text: text.slice(0, 500),
				responseFormat: 'mp3'
			},
			success: (res) => {
				if (res.statusCode === 200) {
					prepareTtsAudioSrc(res.data)
						.then(src => playPreparedTts(src, onPlay))
						.then(resolve)
						.catch(err => reject(err instanceof Error ? err : new Error(String(err))))
					return
				}
				const bodyMsg = parseTtsErrorBody(res.data)
				const errMsg = bodyMsg || `请求TTS失败（HTTP ${res.statusCode}）`
				reject(new Error(formatHttpErrorMessage(res.statusCode, errMsg)))
			},
			fail: (err) => reject(new Error(err.errMsg || '请求TTS失败'))
		})
	})
}

// 上传录音文件并调用语音识别接口返回文本结果。
export function uploadVoiceAndTranscribe(filePath) {
	if (!getApiBase()) {
		return Promise.reject(new Error('未配置后端地址，请检查 api/config.js'))
	}

	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: `${BASE_URL}/api/ai/asr/transcribe`,
			filePath: filePath,
			name: 'file',
			timeout: 60000,
			success: res => {
				if (res.statusCode < 200 || res.statusCode >= 300) {
					reject(
						new Error(
							formatHttpErrorMessage(res.statusCode, `语音识别失败（HTTP ${res.statusCode}）`),
						),
					)
					return
				}
				try {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
					if (data && data.text) {
						resolve(data.text)
					} else if (data.code === 200 && data.data && data.data.text) {
						resolve(data.data.text)
					} else {
						reject(new Error(data.message || '语音识别未返回有效文本'))
					}
				} catch (e) {
					reject(new Error('语音识别返回格式错误'))
				}
			},
			fail: error => {
				reject(new Error(error?.errMsg || '语音识别请求失败'))
			}
		})
	})
}
