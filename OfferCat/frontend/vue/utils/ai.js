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

	if (!userId) {
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
let innerAudioContext = null;
let plusAudioPlayer = null;

// 停止并销毁当前 AI 语音播放实例。
export function stopAiVoice() {
	if (innerAudioContext) {
		try {
			innerAudioContext.stop();
			innerAudioContext.destroy();
		} catch (e) {}
		innerAudioContext = null;
	}
	// #ifdef APP-PLUS
	if (plusAudioPlayer) {
		try {
			plusAudioPlayer.stop();
			plusAudioPlayer.close && plusAudioPlayer.close();
		} catch (e) {}
		plusAudioPlayer = null;
	}
	// #endif
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

// APP 端 innerAudioContext 需要可访问的本地绝对路径，不能依赖 data: URI。
function resolveNativeAudioSrc(filePath) {
	// #ifdef APP-PLUS
	if (typeof plus !== 'undefined' && plus.io && plus.io.convertLocalFileSystemURL) {
		try {
			return plus.io.convertLocalFileSystemURL(filePath)
		} catch (e) {
			console.warn('convertLocalFileSystemURL failed', e)
		}
	}
	// #endif
	return filePath
}

function saveTtsMp3ToLocal(arrayBuffer) {
	return new Promise((resolve, reject) => {
		const fs = typeof uni.getFileSystemManager === 'function' ? uni.getFileSystemManager() : null
		if (!fs || typeof fs.writeFile !== 'function') {
			reject(new Error('当前环境不支持保存语音文件'))
			return
		}
		const filePath = `${getTtsStorageDir()}/ai_voice_${Date.now()}.mp3`
		const done = () => resolve(resolveNativeAudioSrc(filePath))
		const base64 = typeof uni.arrayBufferToBase64 === 'function'
			? uni.arrayBufferToBase64(arrayBuffer)
			: null
		if (base64) {
			fs.writeFile({
				filePath,
				data: base64,
				encoding: 'base64',
				success: done,
				fail: () => {
					fs.writeFile({
						filePath,
						data: arrayBuffer,
						encoding: 'binary',
						success: done,
						fail: err => reject(new Error(err.errMsg || '保存语音文件失败'))
					})
				}
			})
			return
		}
		fs.writeFile({
			filePath,
			data: arrayBuffer,
			encoding: 'binary',
			success: done,
			fail: err => reject(new Error(err.errMsg || '保存语音文件失败'))
		})
	})
}

function prepareTtsAudioSrc(arrayBuffer) {
	// #ifdef H5
	const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' })
	return Promise.resolve(URL.createObjectURL(blob))
	// #endif
	// #ifndef H5
	return saveTtsMp3ToLocal(arrayBuffer)
	// #endif
}

function playWithInnerAudio(src, onPlay) {
	return new Promise((resolve, reject) => {
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
		innerAudioContext.onPlay(() => {
			if (onPlay) onPlay()
		})
		innerAudioContext.onEnded(() => finish())
		innerAudioContext.onError((err) => {
			const { errMsg, errCode } = err || {}
			console.error('innerAudio 播放失败', { errMsg, errCode, src })
			finish(new Error(`音频播放失败: ${errMsg || 'unknown'} (${errCode || ''})`))
		})
		setTimeout(() => {
			if (innerAudioContext) {
				innerAudioContext.play()
			}
		}, 120)
	})
}

function playWithPlusAudio(src, onPlay) {
	return new Promise((resolve, reject) => {
		// #ifdef APP-PLUS
		if (typeof plus !== 'undefined' && plus.audio && typeof plus.audio.createPlayer === 'function') {
			stopAiVoice()
			try {
				plusAudioPlayer = plus.audio.createPlayer(src)
				let settled = false
				const finish = (err) => {
					if (settled) return
					settled = true
					stopAiVoice()
					if (err) reject(err)
					else resolve()
				}
				const onPlayStart = () => {
					if (onPlay) onPlay()
				}
				plusAudioPlayer.addEventListener('play', onPlayStart, false)
				plusAudioPlayer.addEventListener('ended', () => finish(), false)
				plusAudioPlayer.addEventListener('error', () => {
					finish(new Error('原生播放器播放失败'))
				}, false)
				plusAudioPlayer.play(() => {}, (e) => {
					finish(new Error((e && e.message) || '原生播放器启动失败'))
				})
				return
			} catch (e) {
				console.warn('plus.audio 不可用，回退 innerAudio', e)
				plusAudioPlayer = null
			}
		}
		// #endif
		playWithInnerAudio(src, onPlay).then(resolve).catch(reject)
	})
}

function playPreparedTts(src, onPlay) {
	stopAiVoice()
	// #ifdef APP-PLUS
	return playWithPlusAudio(src, onPlay)
	// #endif
	// #ifndef APP-PLUS
	return playWithInnerAudio(src, onPlay)
	// #endif
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
				let errMsg = `请求TTS失败（HTTP ${res.statusCode}）`
				try {
					const uint8Array = new Uint8Array(res.data)
					let errText = ''
					for (let i = 0; i < uint8Array.length; i++) {
						errText += String.fromCharCode(uint8Array[i])
					}
					errText = decodeURIComponent(escape(errText))
					const errData = JSON.parse(errText)
					if (errData.error) errMsg = errData.error
					else if (errData.message) errMsg = errData.message
				} catch (e) {}
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
