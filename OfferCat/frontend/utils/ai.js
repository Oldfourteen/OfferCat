import { BASE_URL } from '@/api/config'

function getStoredUser() {
	try {
		return uni.getStorageSync('user') || null
	} catch (e) {
		return null
	}
}

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

export function uploadAiChatImage(filePath) {
	if (!BASE_URL) {
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
					reject(new Error(`图片上传失败（${res.statusCode}）`))
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

export function requestAiChatStream(messages = [], options = {}, onChunk, onComplete, onError) {
	if (!BASE_URL) {
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
	
	const doRequest = (uploadedImages) => {
		const requestTask = uni.request({
			url: `${BASE_URL}/api/ai/chat-stream`,
			method: 'POST',
			header: { 'Content-Type': 'application/json' },
			data: { userId, majorCode, mode, question, userImages: uploadedImages },
			enableChunked: true,
			success: res => {
				if (res.statusCode < 200 || res.statusCode >= 300) {
					onError(new Error(`AI 接口请求失败（${res.statusCode}）`))
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
export function requestAiHistory() {
	if (!BASE_URL) {
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
					reject(new Error(`获取历史失败（${res.statusCode}）`))
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

export function requestAiChat(messages = [], options = {}) {
	if (!BASE_URL) {
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
						reject(new Error(`AI 接口请求失败（${res.statusCode}）`))
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

let innerAudioContext = null;

export function stopAiVoice() {
	if (innerAudioContext) {
		innerAudioContext.stop();
		innerAudioContext.destroy();
		innerAudioContext = null;
	}
}

export function playAiVoice(text, onPlay) {
	if (!BASE_URL) {
		return Promise.reject(new Error('未配置后端地址，请检查 api/config.js'))
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/ai/tts/speak`,
			method: 'POST',
			responseType: 'arraybuffer',
			timeout: 60000,
			data: {
				text: text.slice(0, 500),
				responseFormat: 'mp3'
			},
			success: (res) => {
				if (res.statusCode === 200) {
					try {
						stopAiVoice();
						let src = '';
						// #ifdef H5
						const blob = new Blob([res.data], { type: 'audio/mpeg' });
						src = URL.createObjectURL(blob);
						// #endif
						// #ifndef H5
						try {
							const fs = uni.getFileSystemManager();
							// 兼容不同平台的用户目录常量
							const dir = (typeof wx !== 'undefined' && wx.env && wx.env.USER_DATA_PATH) ? wx.env.USER_DATA_PATH : (uni.env && uni.env.USER_DATA_PATH) ? uni.env.USER_DATA_PATH : '_doc';
							src = `${dir}/ai_voice_${Date.now()}.mp3`;
							fs.writeFileSync(src, res.data, 'binary');
						} catch (e) {
							// 兜底方案
							const base64 = uni.arrayBufferToBase64(res.data);
							src = 'data:audio/mp3;base64,' + base64;
						}
						// #endif

						innerAudioContext = uni.createInnerAudioContext();
						
						// #ifdef APP-PLUS
						// 如果用户设备处于静音模式，仍然播放声音
						if (uni.setInnerAudioOption) {
							uni.setInnerAudioOption({
								obeyMuteSwitch: false,
								// 在iOS上，设置为 'playback' 类型，与其他 App 音频混播
								sessionCategory: 'playback'
							});
						}
						// #endif

						innerAudioContext.src = src;
						innerAudioContext.onPlay(() => {
							if (onPlay) onPlay();
						});
						innerAudioContext.onEnded(() => {
							innerAudioContext.destroy();
							innerAudioContext = null;
							resolve();
						});
						innerAudioContext.onError((err) => {
							const { errMsg, errCode } = err;
							console.error('音频播放失败', { errMsg, errCode });
							innerAudioContext.destroy();
							innerAudioContext = null;
							reject(new Error(`音频播放失败: ${errMsg} (${errCode})`));
						});
						
						// 延时播放，避免部分机型初始化失败
						setTimeout(() => {
							innerAudioContext.play();
						}, 50);
					} catch (e) {
						reject(new Error('处理音频异常: ' + e.message));
					}
				} else {
					let errMsg = `请求TTS失败 (${res.statusCode})`;
					try {
						const uint8Array = new Uint8Array(res.data);
						let errText = '';
						for (let i = 0; i < uint8Array.length; i++) {
							errText += String.fromCharCode(uint8Array[i]);
						}
						errText = decodeURIComponent(escape(errText));
						const errData = JSON.parse(errText);
						if (errData.error) errMsg = errData.error;
						else if (errData.message) errMsg = errData.message;
					} catch (e) {}
					reject(new Error(errMsg));
				}
			},
			fail: (err) => reject(new Error(err.errMsg || '请求TTS失败'))
		})
	})
}

export function uploadVoiceAndTranscribe(filePath) {
	if (!BASE_URL) {
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
					reject(new Error(`语音识别失败（${res.statusCode}）`))
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
