import { request } from '@/api/request'

/** 预热结果在 TTL 内复用，避免每个页面重复打探活 */
const WARM_TTL_MS = 5 * 60 * 1000

let warmupPromise = null
let lastWarmAt = 0

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 后台预热网关与用户/学生服务连接（建立 TCP、拉 Eureka、唤醒 JVM）。
 * 登录页、欢迎页应在 onLoad/onLaunch 尽早调用；不阻塞 UI。
 */
export function warmApiConnection(force = false) {
	const now = Date.now()
	if (!force && warmupPromise && now - lastWarmAt < WARM_TTL_MS) {
		return warmupPromise
	}
	lastWarmAt = now
	warmupPromise = Promise.allSettled([
		request({
			url: '/auth/ping',
			method: 'GET',
			timeout: 12000,
			retryTimes: 1,
			retryDelayMs: 350,
		}),
		request({
			url: '/api/student/health',
			method: 'GET',
			timeout: 12000,
			retryTimes: 1,
			retryDelayMs: 350,
		}),
	]).catch(() => {})
	return warmupPromise
}

/**
 * 用户点击登录前尽量等预热完成，但不超过 maxWaitMs，避免与冷启动叠在「登录中」。
 * @param {number} [maxWaitMs=5000]
 */
export async function ensureApiWarmBeforeLogin(maxWaitMs = 5000) {
	const warm = warmApiConnection()
	if (!maxWaitMs || maxWaitMs <= 0) {
		await warm
		return
	}
	await Promise.race([warm, sleep(maxWaitMs)])
}
