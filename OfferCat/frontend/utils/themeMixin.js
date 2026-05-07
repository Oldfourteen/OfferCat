import { applyTheme, THEME_CHANGE_EVENT } from '@/utils/theme.js'

export default {
	data() {
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
		themeClass() {
			return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
		},
		isDarkTheme() {
			return this.theme === 'dark'
		}
	},
	onShow() {
		this.syncTheme()
	},
	methods: {
		syncTheme() {
			this.theme = applyTheme()
			return this.theme
		}
	}
}
