import { getApiBase } from './config'
import { getToken } from '@/utils/token'

const DEFAULT_TIMEOUT_MS = 30000

const MAX_CONCURRENT_REQUESTS = 8
let activeRequests = 0
const waitQueue = []
const inflight = new Map()

function stableStringify(value) {
	if (value == null) return ''
	if (typeof value === 'string') return value
	try {
		return JSON.stringify(value)
	} catch (_) {
		return String(value)
	}
}

function runWithConcurrency(fn) {
	return new Promise((resolve, reject) => {
		const run = () => {
			activeRequests += 1
			Promise.resolve()
				.then(fn)
				.then(resolve, reject)
				.finally(() => {
					activeRequests -= 1
					const next = waitQueue.shift()
					if (next) next()
				})
		}

		if (activeRequests < MAX_CONCURRENT_REQUESTS) run()
		else waitQueue.push(run)
	})
}

function createRequestId() {
	const rand = Math.random().toString(16).slice(2)
	return `${Date.now().toString(16)}-${rand}`
}

function getDefaultRetryTimes(method, url) {
	const m = String(method || 'GET').toUpperCase()
	const u = String(url || '')
	if (m === 'GET') return 2
	if (m === 'POST' && /^\/auth\/login(\?|$|\/)/.test(u)) return 0
	return 0
}

function isRetryableGatewayStatus(code) {
	return code === 502 || code === 503 || code === 504
}

function computeBackoffDelay(attempt, baseDelayMs) {
	const base = Number.isFinite(baseDelayMs) && baseDelayMs > 0 ? baseDelayMs : 600
	const cap = 3500
	const exp = Math.min(cap, base * Math.pow(1.8, Math.max(0, attempt)))
	const jitter = Math.floor(Math.random() * 160)
	return exp + jitter
}

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

function tryParseJsonBody(body) {
	if (body == null) return body
	if (typeof body !== 'string') return body
	const s = body.trim()
	if (!s) return body
	if (!(s.startsWith('{') || s.startsWith('['))) return body
	try {
		return JSON.parse(s)
	} catch (_) {
		return body
	}
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
	const requestId = options && options.__requestId ? String(options.__requestId) : createRequestId()
	const reqHeader = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'X-Request-Id': requestId,
		'X-Client-Timestamp': String(Date.now()),
		...(header || {}),
	}
	if (token && !reqHeader['Authorization']) {
		reqHeader['Authorization'] = `Bearer ${token}`
	}

	const timeout = options && options.timeout != null ? options.timeout : DEFAULT_TIMEOUT_MS
	const retryTimesRaw =
		options && options.retryTimes != null ? Number(options.retryTimes) : getDefaultRetryTimes(method, url)
	const retryTimes = Number.isFinite(retryTimesRaw) && retryTimesRaw > 0 ? Math.min(4, retryTimesRaw) : 0
	const retryAttempt = options && options.__retryAttempt != null ? Number(options.__retryAttempt) : 0
	const retryDelayMs = options && options.retryDelayMs != null ? Number(options.retryDelayMs) : 650

	const requestUrl = `${base}${url}`
	const dedupeEnabledRaw = options && options.dedupe != null ? !!options.dedupe : String(method).toUpperCase() === 'GET'
	const dedupeKey =
		(options && options.dedupeKey != null ? String(options.dedupeKey) : null) ||
		`${String(method || 'GET').toUpperCase()} ${requestUrl} ${stableStringify(data)} ${token ? String(token) : ''}`
	const dedupeEnabled =
		dedupeEnabledRaw && Number.isFinite(retryAttempt) && retryAttempt === 0 && typeof dedupeKey === 'string'
	if (dedupeEnabled && inflight.has(dedupeKey)) return inflight.get(dedupeKey)

	const runOnce = () =>
		new Promise((resolve, reject) => {
			let settled = false
			let timer = null

			const safeResolve = (val) => {
				if (settled) return
				settled = true
				if (timer) clearTimeout(timer)
				resolve(val)
			}

			const safeReject = (err) => {
				if (settled) return
				settled = true
				if (timer) clearTimeout(timer)
				reject(err)
			}

			const task = uni.request({
				url: requestUrl,
				method,
				timeout,
				data,
				header: reqHeader,
				success: (res) => {
					const ok = res.statusCode >= 200 && res.statusCode < 300
					if (!ok) {
						const rawBody = res && res.data
						const parsedBody = tryParseJsonBody(rawBody)
						const serverText = extractServerErrText(parsedBody, res.statusCode)
						const headline = serverText ? serverText : `请求失败（HTTP ${res.statusCode}）`
						const message = formatHttpErrorMessage(res.statusCode, headline)
						const err = new Error(message)
						err.statusCode = res.statusCode
						err.requestUrl = requestUrl
						err.response = res
						safeReject(err)
						return
					}

					const body = tryParseJsonBody(res && res.data)
					if (body && typeof body === 'object' && body.code !== undefined && body.code !== null) {
						const bizCode = typeof body.code === 'string' ? Number(body.code) : body.code
						if (bizCode !== 0 && bizCode !== 200) {
							const bizMsg = body.message || body.msg || body.error || '业务请求失败'
							const errMsg =
								bizCode === 404 || bizCode === 503
									? formatHttpErrorMessage(bizCode, String(bizMsg))
									: String(bizMsg)
							const err = new Error(errMsg)
							err.statusCode = res.statusCode
							err.bizCode = bizCode
							err.requestUrl = requestUrl
							err.response = res
							safeReject(err)
							return
						}
					}

					safeResolve(body)
				},
				fail: (e) => {
					const raw = e && (e.errMsg || e.message) ? String(e.errMsg || e.message) : '网络请求失败'
					const err = new Error(normalizeNetworkError(raw))
					err.requestUrl = requestUrl
					err.cause = e
					safeReject(err)
				},
			})

			const t = Number(timeout)
			if (Number.isFinite(t) && t > 0) {
				timer = setTimeout(() => {
					try {
						if (task && typeof task.abort === 'function') task.abort()
					} catch (_) {}
					safeReject(new Error(normalizeNetworkError('timeout')))
				}, t + 200)
			}
		})

	const runWithRetry = async (attempt) => {
		try {
			return await runOnce()
		} catch (e) {
			const msg = String((e && e.message) || '')
			const statusCode = e && (e.statusCode || e.bizCode)
			const looksLikeTimeout = /timeout|超时/i.test(msg)
			const looksLikeConnIssue =
				/connection refused|无法连接|ECONNREFUSED|failed to connect|network error|网络请求失败|request:fail/i.test(msg)
			const canRetry = retryTimes > 0 && Number.isFinite(attempt) && attempt >= 0 && attempt < retryTimes
			const shouldRetry = canRetry && (looksLikeTimeout || looksLikeConnIssue || isRetryableGatewayStatus(statusCode))
			if (!shouldRetry) throw e
			await sleep(computeBackoffDelay(attempt, retryDelayMs))
			return runWithRetry(attempt + 1)
		}
	}

	const promise = runWithConcurrency(() => runWithRetry(retryAttempt))
	if (dedupeEnabled) {
		inflight.set(dedupeKey, promise)
		promise.finally(() => inflight.delete(dedupeKey))
	}
	return promise
}
