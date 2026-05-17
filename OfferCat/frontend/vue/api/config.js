/**
 * 后端 API 网关根地址（勿带末尾 /）。
 *
 * OfferCat（TCP）：内网网关 listening **14132**；经 NAT/防火墙映射到外网端口 **21308**。
 * 客户端（App / H5）请使用可与设备互通的入口，例如：**http://start.awacode.top:21308**。
 * 同机房或 VPN 内需直连网关进程时再用内网主机 + **14132**。
 *
 * 与真实部署不一致时，会一直请求错误地址直至超时。
 *
 * 可选覆盖：`App.vue` → `globalData.apiBase`，便于真机或内网调试而不改此处默认值。
 */
const DEFAULT_API_BASE = 'http://start.awacode.top:21308'.replace(/\/$/, '')

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

/**
 * 星图 H5（iframe）用的 Galaxy 服务前缀，勿带末尾 /。
 * 优先 `App.vue` → `globalData.galaxyApiBase`；未配置时与全站一致：`getApiBase() + /api/galaxy`。
 */
export function getGalaxyApiBase() {
	try {
		if (typeof getApp === 'function') {
			const app = getApp()
			const raw = app && app.globalData && app.globalData.galaxyApiBase
			if (raw != null && String(raw).trim() !== '') {
				const t = String(raw).trim().replace(/\/+$/, '')
				// 显式 mock：不注入 apiBase，星图 H5 使用 static/galaxy-h5/mock
				if (t.toLowerCase() === 'mock') return ''
				return t
			}
		}
	} catch (_) {}
	return `${getApiBase()}/api/galaxy`
}
