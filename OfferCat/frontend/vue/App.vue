<script>
	import { applyTheme } from '@/utils/theme.js'
	import { warmApiConnection } from '@/utils/apiWarmup.js'
	import { getToken } from '@/utils/token.js'
	import { scheduleLoginProfileSync } from '@/utils/user.js'

	export default {
		globalData: {
			// 留空则使用 api/config.js 默认：**http://start.awacode.top:21308**（外网→内网网关 14132）。
			// 直连内网网关时填 http://内网IP:14132；真机勿用 127.0.0.1。
			apiBase: '',
			// 星图 H5：留空 → 自动 getApiBase() + /api/galaxy；填 mock → 仅用内置 static/mock。
			galaxyApiBase: '',
		},
		onLaunch: function() {
			applyTheme()
			console.log('App Launch')
			// 尽早预热网关与用户服务，减轻登录页首包冷启动耗时
			void warmApiConnection()
			// 检查是否已有有效的登录态，自动跳转首页
			this.checkAutoLogin()
		},
		onShow: function() {
			applyTheme()
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			checkAutoLogin() {
				// 检查本地存储中是否有有效的 token
				const token = getToken()
				if (token) {
					scheduleLoginProfileSync({ timeout: 12000 })
					// 已有登录态，自动跳转到首页
					console.log('已检测到登录态，自动跳转首页')
					uni.switchTab({
						url: '/pages/index/index',
						fail: (err) => {
							console.log('跳转失败', err)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		// 取消了背景和文字的 transition 以保证与底部栏瞬间换色同步
	}

	uni-page-body,
	uni-page-wrapper {
		width: 100% !important;
		left: 0 !important;
		right: 0 !important;
		margin: 0 !important;
		padding: 0 !important;
		box-sizing: border-box;
	}

	/* 文本防溢出安全换行工具类（用于长串数字/字母） */
	.text-wrap-safe {
		word-break: break-all !important;
		word-wrap: break-word !important;
	}
</style>
