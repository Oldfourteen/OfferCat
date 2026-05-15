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
	export default {
		data() {
			return {
				_galaxyFrameWin: null,
			}
		},
		computed: {
			galaxyAssetVersion() {
				return '20260515-fusion-sheet-quadrant1'
			},
			galaxyUrl() {
				// #ifdef H5
				const path = '/static/galaxy-h5/iframe.html'
				// #endif
				// #ifndef H5
				const path = '/static/galaxy-h5/index.html'
				// #endif
				const qs = []
				try {
					if (typeof getApp === 'function') {
						const app = getApp()
						const remote = app && app.globalData && app.globalData.galaxyApiBase
						const trimmed = remote != null ? String(remote).trim() : ''
						if (trimmed) {
							qs.push(`apiBase=${encodeURIComponent(trimmed.replace(/\/+$/, ''))}`)
						}
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
			handleWebViewMessage(event) {
				const root = event && event.detail && event.detail.data
				if (this.findGalaxyClosePayload(root, 0)) {
					this.closeGalaxyFromChild()
				}
			},
			handleWindowPostMessage(event) {
				// #ifdef H5
				const data = (event && event.data) || {}
				if (data.type !== 'close' || data.source !== 'galaxy-h5') return
				if (this._galaxyFrameWin && event.source && event.source !== this._galaxyFrameWin) return
				this.closeGalaxyFromChild()
				// #endif
			},
		},
	}
</script>

<style lang="scss" scoped>
	.galaxy-page {
		width: 100%;
		height: 100vh;
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
