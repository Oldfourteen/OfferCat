import { applyTheme, THEME_CHANGE_EVENT } from '@/utils/theme.js'

// 页面级主题 mixin：负责同步主题值并派生通用主题 class。
export default {
	data() {
		// 保存当前主题以及事件监听器引用，方便销毁时解绑。
		return {
			theme: 'light',
			themeListener: null
		}
	},
	created() {
		if (typeof uni === 'undefined' || typeof uni.$on !== 'function') {
			return
		}

		this.syncTheme()

		// 监听全局主题变化事件，更新当前页面主题状态。
		this.themeListener = payload => {
			this.theme = payload && payload.theme ? payload.theme : 'light'
		}
		uni.$on(THEME_CHANGE_EVENT, this.themeListener)
	},
	beforeDestroy() {
		if (this.themeListener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
			uni.$off(THEME_CHANGE_EVENT, this.themeListener)
		}
	},
	beforeUnmount() {
		if (this.themeListener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
			uni.$off(THEME_CHANGE_EVENT, this.themeListener)
		}
	},
	computed: {
		// 输出页面可直接绑定的主题 class。
		themeClass() {
			return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
		},
		// 标识当前是否为深色主题，便于模板条件判断。
		isDarkTheme() {
			return this.theme === 'dark'
		}
	},
	onShow() {
		this.syncTheme()
	},
	methods: {
		// 重新应用主题并同步到当前页面状态。
		syncTheme() {
			this.theme = applyTheme()
			return this.theme
		}
	}
}
