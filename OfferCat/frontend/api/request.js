import { BASE_URL } from '@/api/config'
import { getToken } from '@/utils/token'

export function request(options) {
	const { url, method = 'GET', data, header } = options || {}

	if (!BASE_URL) {
		return Promise.reject(new Error('BASE_URL not configured'))
	}
	if (!url) {
		return Promise.reject(new Error('request缺 少 url'))
	}

	const token = getToken()
	const reqHeader = {
		'Content-Type': 'application/json',
		...(header || {})
	}
	if (token && !reqHeader['Authorization']) {
		reqHeader['Authorization'] = `Bearer ${token}`
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}${url}`,
			method,
			timeout: options.timeout || 15000,
			data,
			header: reqHeader,
			success: (res) => {
				const ok = res.statusCode >= 200 && res.statusCode < 300
				if (ok) {
					// 兼容后端统一响应格式 ResponseResult
					if (res.data && typeof res.data === 'object' && res.data.code !== undefined) {
						if (res.data.code === 200) {
							resolve(res.data)
						} else {
							reject(new Error(res.data.message || res.data.msg || '业务请求失败'))
						}
						return
					}
					resolve(res.data)
					return
				}
				reject(new Error((res.data && (res.data.message || res.data.msg)) ? (res.data.message || res.data.msg) : `请求失败(${res.statusCode})`))
			},
			fail: (err) => {
				const errorMsg = err && (err.errMsg || err.message || err.msg) ? (err.errMsg || err.message || err.msg) : '网络请求失败，请检查网络连接'
				reject(new Error(errorMsg))
			}
		})
	})
}
