<template>

	<view class="galaxy-page">

		<web-view class="galaxy-webview" :src="galaxyUrl" @message="handleWebViewMessage"></web-view>

	</view>

</template>



<script>

	export default {

		computed: {

			/**
			 * 默认不带 apiBase：星图 H5 使用同目录下 ./mock（打包在 static/galaxy-h5），无需启动 galaxy 后端。
			 * 需要走网关时：在 App.vue 的 globalData.galaxyApiBase 填写完整根路径（无末尾 /），例如 http://IP:14132/api/galaxy
			 */
			galaxyUrl() {

				try {

					if (typeof getApp === 'function') {

						const app = getApp()

						const remote = app && app.globalData && app.globalData.galaxyApiBase

						const trimmed = remote != null ? String(remote).trim() : ''

						if (trimmed) {

							const base = trimmed.replace(/\/+$/, '')

							return `/static/galaxy-h5/index.html?apiBase=${encodeURIComponent(base)}`

						}

					}

				} catch (_) {}

				return '/static/galaxy-h5/index.html'

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

			// #endif

		},

		methods: {

			closeGalaxyFromChild() {

				uni.navigateBack({

					delta: 1,

					fail: () => {

						uni.switchTab({

							url: '/pages/index/index'

						})

					}

				})

			},

			/** 从 @message 的 detail.data 里递归查找关闭载荷（各端/版本可能套一层或多层） */

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

				if (this.findGalaxyClosePayload(root, 0)) {

					this.closeGalaxyFromChild()

				}

			},

			/** H5：子页 iframe 使用 window.parent.postMessage */

			handleWindowPostMessage(event) {

				const data = (event && event.data) || {}

				if (data.type === 'close' && data.source === 'galaxy-h5') {

					this.closeGalaxyFromChild()

				}

			}

		}

	}

</script>



<style lang="scss" scoped>

	.galaxy-page {

		width: 100%;

		height: 100vh;

		background: #111216;

	}



	.galaxy-webview {

		width: 100%;

		height: 100%;

	}

</style>

