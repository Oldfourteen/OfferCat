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
			}
		},
		computed: {
			/** 静态页版本戳：修改 galaxy-h5 后递增，避免 App WebView / H5 iframe 强缓存旧 galaxy-app.js */
			galaxyAssetVersion() {
				return '20260522-apk-fix-init-v3'
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
				// #ifndef H5
				qs.push('appShell=1')
				// #endif
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
		},
		onUnload() {
			// #ifdef H5
			window.removeEventListener('message', this.handleWindowPostMessage, false)
			this._galaxyFrameWin = null
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
			/** App / 小程序：子网页 uni.postMessage 关闭星图 */
			handleWebViewMessage(event) {
				const root = event && event.detail && event.detail.data
				if (this.findGalaxyClosePayload(root, 0)) {
					this.closeGalaxyFromChild()
				}
			},
			/** H5：iframe postMessage 关闭星图 */
			handleWindowPostMessage(event) {
				// #ifdef H5
				const data = (event && event.data) || {}
				if (data.source !== 'galaxy-h5') return
				if (this._galaxyFrameWin && event.source && event.source !== this._galaxyFrameWin) return
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

</style>
