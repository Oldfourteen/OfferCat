import { getApiBase } from '@/api/config'

/** 预热成功后在 TTL 内视为已就绪 */
const WARM_TTL_MS = 4 * 60 * 1000
const PROBE_TIMEOUT_MS = 16000

let warmupPromise = null
let lastWarmSuccessAt = 0

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export function isApiWarmReady() {
	return lastWarmSuccessAt > 0 && Date.now() - lastWarmSuccessAt < WARM_TTL_MS
}

/**
 * 探活：只要能收到网关/服务的 HTTP 响应（2xx/4xx）即视为链路已打通，用于冷启动预热。
 */
function probeRequest(path, method = 'GET', data) {
	const base = getApiBase()
	if (!base) {
		return Promise.reject(new Error('未配置 API 地址'))
	}
	return new Promise((resolve, reject) => {
		let settled = false
		const finish = (fn, val) => {
			if (settled) return
			settled = true
			fn(val)
		}
		const timer = setTimeout(() => {
			finish(reject, new Error('timeout'))
		}, PROBE_TIMEOUT_MS + 300)

		uni.request({
			url: `${base}${path}`,
			method,
			timeout: PROBE_TIMEOUT_MS,
			data,
			header: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			success: (res) => {
				clearTimeout(timer)
				const code = res && res.statusCode
				// 2xx/4xx：网关与用户服务已响应；5xx 继续重试
				if (code >= 200 && code < 500) {
					finish(resolve, res)
				} else {
					finish(reject, new Error(`HTTP ${code}`))
				}
			},
			fail: (e) => {
				clearTimeout(timer)
				finish(reject, e || new Error('网络请求失败'))
			},
		})
	})
}

async function runWarmupProbes() {
	const probes = [
		() => probeRequest('/auth/ping', 'GET'),
		// 未部署 ping 时，用校验失败的 send-code 拉起 user-service（不会发短信）
		() => probeRequest('/auth/send-code', 'POST', { phone: '' }),
	]
	for (const run of probes) {
		try {
			await run()
			lastWarmSuccessAt = Date.now()
			return true
		} catch (_) {
			// 尝试下一种探活
		}
	}
	return false
}

/**
 * 后台预热（App 启动、登录页 onLoad）。失败不抛错，由 ensure 在点击登录时再拉一轮。
 */
export function warmApiConnection(force = false) {
	if (!force && isApiWarmReady()) {
		return Promise.resolve(true)
	}
	if (!force && warmupPromise) {
		return warmupPromise
	}
	warmupPromise = runWarmupProbes()
		.catch(() => false)
		.finally(() => {
			warmupPromise = null
		})
	return warmupPromise
}

/**
 * 登录前必须尽量等到 user-service 链路就绪（最长 maxWaitMs，轮询探活）。
 * @param {number} [maxWaitMs=20000]
 * @returns {Promise<void>}
 */
export async function ensureApiWarmBeforeLogin(maxWaitMs = 20000) {
	if (isApiWarmReady()) return

	const deadline = Date.now() + (maxWaitMs > 0 ? maxWaitMs : 20000)
	let attempt = 0

	while (Date.now() < deadline) {
		const ok = await runWarmupProbes()
		if (ok) return
		attempt += 1
		const backoff = Math.min(1200, 350 + attempt * 180)
		await sleep(backoff)
	}

	throw new Error(
		'连接服务器超时，请确认网络正常且后端网关已启动；若刚启动服务请稍等片刻后重试'
	)
}
