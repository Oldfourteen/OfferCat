/**
 * 后端网关根地址（不要末尾 /）。
 * 与真实部署不一致时，客户端会一直连到错误主机直至 uni.request 超时。
 *
 * 可选覆盖：在 App.vue 的 globalData.apiBase 中填写你的网关地址（如 http://公网IP:14132），
 * 便于真机调试不改此处默认值。
 */
const DEFAULT_API_BASE = 'http://start.awacode.top:21630'.replace(/\/$/, '')

export function getApiBase() {
	try {
		if (typeof getApp === 'function') {
			const app = getApp()
			const b = app && app.globalData && app.globalData.apiBase
			if (b != null && String(b).trim() !== '') {
				return String(b).trim().replace(/\/$/, '')
			}
		}
	} catch (_) {}
	return DEFAULT_API_BASE
}

/**
 * 与字符串拼接 / 模板字符串中自动解析为当前 getApiBase()，兼容全项目 `import { BASE_URL }`。
 */
export const BASE_URL = {
	[Symbol.toPrimitive]() {
		return getApiBase()
	},
	toString() {
		return getApiBase()
	},
	valueOf() {
		return getApiBase()
	},
}
