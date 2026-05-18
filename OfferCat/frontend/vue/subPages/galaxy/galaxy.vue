<template>
	<view class="galaxy-page">
		<!-- #ifdef H5 -->
		<iframe
			class="galaxy-iframe"
			:src="galaxyUrl"
			title="专业交叉星图"
			referrerpolicy="strict-origin-when-cross-origin"
			@load="onGalaxyFrameLoad"
		/>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<web-view class="galaxy-webview" :src="galaxyUrl" @message="handleWebViewMessage"></web-view>
		<cover-view
			v-if="galaxyShowLbFab"
			class="galaxy-lb-cover"
			@tap="openLeaderboardInWebView"
		>
			<cover-view class="galaxy-lb-cover-inner">
				<cover-view class="galaxy-lb-cover-title">排行榜</cover-view>
			</cover-view>
		</cover-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import { getGalaxyApiBase } from '@/api/config.js'
	import { getUser, resolveStoredUserId } from '@/utils/user'

	export default {
		data() {
			return {
				_galaxyFrameWin: null,
				/** App web-view 上叠原生按钮（H5 内页 fixed 在部分机型被挡） */
				galaxyShowLbFab: false,
			}
		},
		computed: {
			/** 静态页版本戳：修改 galaxy-h5 后递增，避免 App WebView / H5 iframe 强缓存旧 galaxy-app.js */
			galaxyAssetVersion() {
				return '20260516-starlit-api-v4'
			},
			/**
			 * 星图数据根与全站网关一致：getGalaxyApiBase()（默认 getApiBase + /api/galaxy）。
			 * 仅当显式将 globalData.galaxyApiBase 设为 mock 专用地址时才走离线 mock。
			 * H5 / App 统一 iframe.html（内含 uni.webview.js，避免双入口缓存不一致）。
			 */
			galaxyUrl() {
				const path = '/static/galaxy-h5/iframe.html'
				const qs = []
				try {
					const galaxyBase = getGalaxyApiBase()
					if (galaxyBase) {
						qs.push(`apiBase=${encodeURIComponent(galaxyBase)}`)
					}
				} catch (_) {}
				try {
					const uid = resolveStoredUserId(getUser())
					if (uid != null) {
						qs.push(`userId=${encodeURIComponent(String(uid))}`)
					}
				} catch (_) {}
				qs.push(`v=${this.galaxyAssetVersion}`)
				const rel = `${path}?${qs.join('&')}`
				try {
					if (typeof window !== 'undefined' && window.location) {
						const p = String(window.location.protocol || '')
						if (p === 'http:' || p === 'https:') {
							const origin = String(window.location.origin || '').replace(/\/+$/, '')
							if (origin) return `${origin}${rel}`
						}
					}
				} catch (_) {}
				return rel
			},
		},
		onLoad() {
			// #ifdef H5
			window.addEventListener('message', this.handleWindowPostMessage, false)
			// #endif
			// #ifndef H5
			// web-view 为原生层，内页 fixed 按钮常被挡；进入星图页即显示原生「排行榜」（仅展示页内 evalJS 会打开面板）
			this.galaxyShowLbFab = true
			// #endif
		},
		onUnload() {
			// #ifdef H5
			window.removeEventListener('message', this.handleWindowPostMessage, false)
			this._galaxyFrameWin = null
			// #endif
			// #ifndef H5
			this.galaxyShowLbFab = false
			// #endif
		},
		methods: {
			onGalaxyFrameLoad(e) {
				// #ifdef H5
				try {
					const el = e && e.target
					this._galaxyFrameWin = el && el.contentWindow ? el.contentWindow : null
				} catch (_) {
					this._galaxyFrameWin = null
				}
				// #endif
			},
			closeGalaxyFromChild() {
				uni.navigateBack({
					delta: 1,
					fail: () => {
						uni.switchTab({
							url: '/pages/index/index',
						})
					},
				})
			},
			/** 从 @message 的 detail.data 里递归查找关闭载荷（各端/版本可能套一层或多层） */
			findGalaxyRoutePayload(node, depth) {
				if (depth > 6 || node == null) return null
				if (typeof node === 'string') {
					try {
						return this.findGalaxyRoutePayload(JSON.parse(node), depth + 1)
					} catch (e) {
						return null
					}
				}
				if (Array.isArray(node)) {
					for (let i = 0; i < node.length; i++) {
						const hit = this.findGalaxyRoutePayload(node[i], depth + 1)
						if (hit) return hit
					}
					return null
				}
				if (typeof node === 'object') {
					if (node.type === 'galaxy-route' && node.source === 'galaxy-h5') return node
					const keys = Object.keys(node)
					for (let k = 0; k < keys.length; k++) {
						const hit = this.findGalaxyRoutePayload(node[keys[k]], depth + 1)
						if (hit) return hit
					}
				}
				return null
			},
			findGalaxyClosePayload(node, depth) {
				if (depth > 6 || node == null) return null
				if (typeof node === 'string') {
					try {
						return this.findGalaxyClosePayload(JSON.parse(node), depth + 1)
					} catch (e) {
						return null
					}
				}
				if (Array.isArray(node)) {
					for (let i = 0; i < node.length; i++) {
						const hit = this.findGalaxyClosePayload(node[i], depth + 1)
						if (hit) return hit
					}
					return null
				}
				if (typeof node === 'object') {
					if (node.type === 'close' && node.source === 'galaxy-h5') return node
					const keys = Object.keys(node)
					for (let k = 0; k < keys.length; k++) {
						const hit = this.findGalaxyClosePayload(node[keys[k]], depth + 1)
						if (hit) return hit
					}
				}
				return null
			},
			/** App / 小程序等：子网页通过 uni.postMessage 上报，在 @message 中接收，detail.data 为数组 */
			handleWebViewMessage(event) {
				const root = event && event.detail && event.detail.data
				const routeMsg = this.findGalaxyRoutePayload(root, 0)
				if (routeMsg) {
					this.galaxyShowLbFab = routeMsg.name === 'personalShowcase'
					return
				}
				if (this.findGalaxyClosePayload(root, 0)) {
					this.closeGalaxyFromChild()
				}
			},
			/** App：原生 cover-view 点在 web-view 上，通过 evalJS 打开 H5 内排行榜 */
			openLeaderboardInWebView() {
				const js =
					"typeof window.__GALAXY_OPEN_LEADERBOARD__==='function'&&window.__GALAXY_OPEN_LEADERBOARD__()"
				try {
					const pages = getCurrentPages()
					const page = pages[pages.length - 1]
					const wv = page && page.$getAppWebview && page.$getAppWebview()
					if (!wv || !wv.children) return
					const children = wv.children()
					for (let i = 0; i < children.length; i++) {
						const child = children[i]
						if (child && typeof child.evalJS === 'function') {
							child.evalJS(js)
							return
						}
					}
				} catch (e) {
					console.warn('[galaxy] openLeaderboardInWebView failed', e)
				}
			},
			/** H5：子页 iframe 使用 window.parent.postMessage；仅处理来自当前 iframe 的关闭消息 */
			handleWindowPostMessage(event) {
				// #ifdef H5
				const data = (event && event.data) || {}
				if (data.source !== 'galaxy-h5') return
				if (this._galaxyFrameWin && event.source && event.source !== this._galaxyFrameWin) return
				if (data.type === 'galaxy-route') {
					this.galaxyShowLbFab = data.name === 'personalShowcase'
					return
				}
				if (data.type === 'close') {
					this.closeGalaxyFromChild()
				}
				// #endif
			},
		},
	}
</script>

<style lang="scss" scoped>
	.galaxy-page {
		width: 100%;
		height: 100vh;
		min-height: 100dvh;
		background: #111216;
		overflow: hidden;
	}

	.galaxy-webview {
		width: 100%;
		height: 100%;
	}

	.galaxy-iframe {
		display: block;
		width: 100%;
		height: 100vh;
		min-height: 100%;
		border: 0;
		background: #070b12;
	}

	/* App web-view 为原生层，H5 内 fixed 按钮可能被挡；用 cover-view 叠在 web-view 上 */
	.galaxy-lb-cover {
		position: fixed;
		right: 12px;
		bottom: calc(16px + env(safe-area-inset-bottom));
		z-index: 99999;
	}

	.galaxy-lb-cover-inner {
		padding: 10px 14px;
		border-radius: 14px;
		background-color: rgba(32, 24, 12, 0.92);
		border-width: 1px;
		border-style: solid;
		border-color: rgba(232, 184, 106, 0.55);
	}

	.galaxy-lb-cover-title {
		font-size: 14px;
		font-weight: 700;
		color: #f0d090;
		line-height: 1.2;
		text-align: center;
	}
</style>
