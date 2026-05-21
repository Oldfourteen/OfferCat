import { ensureApiWarmBeforeLogin } from './apiWarmup'

/**
 * 登录/注册统一前置：先连接服务器，再执行业务请求。
 * @param {{ run: () => Promise<any>, warmMaxMs?: number, busyTitle?: string }} opts
 */
export async function runWithServerWarmup(opts) {
	const run = opts && typeof opts.run === 'function' ? opts.run : null
	if (!run) {
		throw new Error('runWithServerWarmup 缺少 run')
	}
	const warmMaxMs = opts && opts.warmMaxMs != null ? opts.warmMaxMs : 20000
	const busyTitle =
		opts && opts.busyTitle != null && String(opts.busyTitle).trim()
			? String(opts.busyTitle).trim()
			: '登录中'

	uni.showLoading({ title: '正在连接服务器…', mask: true })
	try {
		await ensureApiWarmBeforeLogin(warmMaxMs)
	} catch (e) {
		uni.hideLoading()
		throw e
	}

	uni.showLoading({ title: busyTitle, mask: true })
	try {
		return await run()
	} finally {
		// 成功/失败均由调用方 hideLoading；此处不隐藏，避免闪屏
	}
}
