import { getApiBase } from './config'
import { getToken } from '@/utils/token'

const DEFAULT_TIMEOUT_MS = 30000

/**
 * HTTP 报错「播报」（如请求失败（404））后追加可读中文说明，便于排查网络/网关/服务问题。
 * @param {number} statusCode
 * @param {string} headline 前缀文案，含状态码播报
 */
export function formatHttpErrorMessage(statusCode, headline) {
	const head =
		headline && String(headline).trim()
			? headline.trim()
			: `请求失败（HTTP ${statusCode}）`
	if (statusCode === 404) {
		return `${head}；可能原因：网关无匹配路由或服务未注册（Eureka/Nacos）、请求的 URL 路径错误、后端未启动或服务名变更；请核对网关「${getApiBase()}」与本机网络，并确认各微服务已启动。`
	}
	if (statusCode === 503) {
		return `${head}；可能原因：下游微服务过载/重启导致暂时不可用、网关到实例连接失败、数据库或 Redis 阻塞拖慢线程池；建议稍后重试，并联系管理员排查服务与健康检查。`
	}
	return head
}

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

/**
 * JSON 正文内常见错误字段（网关/网关错误页/HTML 或非标准体）
 */
function extractServerErrText(data, statusCode) {
	if (!data) return ''
	if (typeof data === 'string') {
		const s = data.trim()
		return s.startsWith('<') ? `请求失败（HTTP ${statusCode}）` : s.slice(0, 200)
	}
	return data.message || data.msg || data.error || data.detail || ''
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
	const isRetry503 = Boolean(options.__gatewayRetry503)

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
								const bizMsg = res.data.message || res.data.msg || '业务请求失败'
								const errMsg =
									res.data.code === 404 || res.data.code === 503
										? formatHttpErrorMessage(res.data.code, String(bizMsg))
										: bizMsg
								const err = new Error(errMsg)
								if (typeof res.data.code === 'number') err.bizCode = res.data.code
								reject(err)
							}
							return
						}
						resolve(res.data)
						return
					}
					const serverText = extractServerErrText(res.data, res.statusCode)
					const headline = serverText
						? serverText
						: `请求失败（HTTP ${res.statusCode}）`
					const message = formatHttpErrorMessage(res.statusCode, headline)
					const err = new Error(message)
					err.statusCode = res.statusCode
					reject(err)
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
		if (e && e.statusCode === 503 && !isRetry503) {
			await sleep(900)
			return request({ ...options, __gatewayRetry503: true })
		}
		throw e
	})
}
