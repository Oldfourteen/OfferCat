<script>
	import { applyTheme, initThemeObserver } from '@/utils/theme.js'
	import { getToken } from '@/utils/token.js'

	export default {
		globalData: {
			// 留空则使用 api/config.js 中的默认网关。真机连本机后端时请填电脑局域网 IP + 网关端口，勿用 127.0.0.1。
			apiBase: '',
			// 星图 H5：留空则用内置 static/galaxy-h5/mock；填写则 web-view 从该地址拉 manifest（一般为 网关 + /api/galaxy，无末尾 /）。
			galaxyApiBase: '',
		},
		onLaunch: function() {
			initThemeObserver()
			applyTheme()
			console.log('App Launch')
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

	/* 文本防溢出安全换行工具类（用于长串数字/字母） */
	.text-wrap-safe {
		word-break: break-all !important;
		word-wrap: break-word !important;
	}
</style>
