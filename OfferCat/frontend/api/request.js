import { getApiBase } from './config'
import { getToken } from '@/utils/token'

const DEFAULT_TIMEOUT_MS = 30000

function normalizeNetworkError(errMsg) {
	if (!errMsg) return '网络请求失败，请检查网络连接'
	if (/timeout|超时/i.test(errMsg)) {
		const base = getApiBase()
		return `请求超时。请确认网关「${base}」可从本机访问（端口放行、与后端实际监听一致）；或在 App.vue 的 globalData.apiBase 中改为你的服务器地址。`
	}
	if (/ssl|certificate|证书/i.test(errMsg)) {
		return 'HTTPS/证书校验失败，请检查域名与证书配置。'
	}
	if (/connection refused|无法连接|ECONNREFUSED|failed to connect/i.test(errMsg)) {
		return `无法连接服务器「${getApiBase()}」，请检查地址、端口与防火墙。`
	}
	return errMsg
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export function request(options) {
	const { url, method = 'GET', data, header } = options || {}

	const base = getApiBase()
	if (!base) {
		return Promise.reject(new Error('未配置 API 地址'))
	}
	if (!url) {
		return Promise.reject(new Error('request缺少 url'))
	}

	const token = getToken()
	const reqHeader = {
		'Content-Type': 'application/json',
		...(header || {}),
	}
	if (token && !reqHeader['Authorization']) {
		reqHeader['Authorization'] = `Bearer ${token}`
	}

	const timeout = options.timeout != null ? options.timeout : DEFAULT_TIMEOUT_MS
	const isRetry = Boolean(options.__networkRetry)

	const runOnce = () =>
		new Promise((resolve, reject) => {
			uni.request({
				url: `${base}${url}`,
				method,
				timeout,
				data,
				header: reqHeader,
				success: (res) => {
					const ok = res.statusCode >= 200 && res.statusCode < 300
					if (ok) {
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
					reject(
						new Error(
							res.data && (res.data.message || res.data.msg)
								? res.data.message || res.data.msg
								: `请求失败(${res.statusCode})`,
						),
					)
				},
				fail: (err) => {
					const raw = err && (err.errMsg || err.message || err.msg) ? err.errMsg || err.message || err.msg : ''
					reject(new Error(normalizeNetworkError(raw)))
				},
			})
		})

	return runOnce().catch(async (e) => {
		const msg = (e && e.message) || ''
		const looksLikeTimeout = /超时|timeout/i.test(msg)
		if (looksLikeTimeout && !isRetry) {
			await sleep(600)
			return request({ ...options, __networkRetry: true })
		}
		throw e
	})
}
