  <script>
	import { applyTheme, initThemeObserver } from '@/utils/theme.js'

	export default {
		globalData: {
			// 留空则使用 api/config.js 中的默认网关。真机连本机后端时请填电脑局域网 IP + 网关端口，勿用 127.0.0.1。
			apiBase: '',
		},
		onLaunch: function() {
			initThemeObserver()
			applyTheme()
			console.log('App Launch')
		},
		onShow: function() {
			applyTheme()
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
	
	page {
		// 取消了背景和文字的 transition 以保证与底部栏瞬间换色同步
	}

	/* 文本防溢出安全换行工具类（用于长串数字/字母） */
	.text-wrap-safe {
		word-break: break-all !important;
		word-wrap: break-word !important;
	}
</style>

