import { getApiBase } from '@/api/config.js'

const BASE_URL = getApiBase()

/**
 * 语音合成服务
 * 提供文本转语音功能，支持流式输出和音频播放
 */

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

/**
 * 准备音频源
 * @param {ArrayBuffer} arrayBuffer - 音频数据
 * @returns {Promise<string>} 音频源URL
 */
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

/**
 * 保存MP3到本地（APP环境）
 * @param {ArrayBuffer} arrayBuffer - 音频数据
 * @returns {Promise<string>} 本地文件路径
 */
function saveTtsMp3ToLocal(arrayBuffer) {
	console.log('保存MP3到本地，数据大小:', arrayBuffer?.byteLength)
	
	return new Promise((resolve, reject) => {
		// #ifdef APP-PLUS
		try {
			// 使用 plus.io 写入文件
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
						
						// 将 ArrayBuffer 转为 Blob 写入
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
		// 非APP环境，尝试使用 base64 data URL
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

/**
 * 播放准备好的音频
 * @param {string} src - 音频源
 * @param {function} onPlay - 开始播放回调
 * @returns {Promise<void>}
 */
function playPreparedTts(src, onPlay) {
	console.log('播放准备好的音频:', src?.substring(0, 50) + '...')
	stopAiVoice()
	return playWithInnerAudio(src, onPlay)
}

/**
 * 使用 InnerAudioContext 播放音频
 * @param {string} src - 音频源
 * @param {function} onPlay - 开始播放回调
 * @returns {Promise<void>}
 */
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
		
		// 超时保护
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

/**
 * 标准化 ArrayBuffer
 * @param {any} data - 输入数据
 * @returns {ArrayBuffer|null}
 */
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

/**
 * 检查是否为 MP3 格式
 * @param {ArrayBuffer} buffer - 音频数据
 * @returns {boolean}
 */
function looksLikeMp3(buffer) {
	if (!buffer || buffer.byteLength < 3) return false
	const view = new Uint8Array(buffer)
	// MP3 文件以 ID3 标签或帧同步字开头
	const id3 = view[0] === 0x49 && view[1] === 0x44 && view[2] === 0x33
	const mp3Frame = view[0] === 0xFF && (view[1] & 0xE0) === 0xE0
	return id3 || mp3Frame
}

/**
 * 解析 TTS 错误响应
 * @param {ArrayBuffer} buffer - 错误响应数据
 * @returns {string|null}
 */
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

/**
 * 格式化 HTTP 错误信息
 * @param {number} code - HTTP 状态码
 * @param {string} msg - 错误消息
 * @returns {string}
 */
function formatHttpErrorMessage(code, msg) {
	if (code === 401) return 'TTS 认证失败，请检查 API 密钥'
	if (code === 429) return 'TTS 请求过于频繁，请稍后再试'
	if (code >= 500) return 'TTS 服务暂时不可用，请稍后重试'
	return msg || `TTS 请求失败（HTTP ${code}）`
}

/**
 * 延迟函数
 * @param {number} ms - 毫秒
 * @returns {Promise<void>}
 */
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
