// 主题模式缓存键、可选主题模式和全局主题变更事件名。
const THEME_KEY = 'app_theme_mode'
const LEGACY_THEME_SYSTEM = 'system'

export const THEME_LIGHT = 'light'
export const THEME_DARK = 'dark'
export const THEME_CHANGE_EVENT = 'app-theme-updated'

let currentActiveTheme = null

// 校验主题模式是否合法。
function isValidThemeMode(theme) {
	return [THEME_LIGHT, THEME_DARK].includes(theme)
}

// 广播主题变化，通知页面重新同步主题样式。
function emitThemeChange(theme, mode) {
	if (typeof uni === 'undefined' || typeof uni.$emit !== 'function') {
		return
	}

	uni.$emit(THEME_CHANGE_EVENT, {
		theme,
		mode
	})
}

// 获取用户当前保存的主题模式。
export function getThemeMode() {
	const theme = uni.getStorageSync(THEME_KEY)
	if (theme === LEGACY_THEME_SYSTEM) {
		const migratedTheme = getLegacySystemTheme()
		uni.setStorageSync(THEME_KEY, migratedTheme)
		return migratedTheme
	}

	return isValidThemeMode(theme) ? theme : THEME_LIGHT
}

// 兼容旧版“跟随系统”配置，将其迁移为具体主题值。
function getLegacySystemTheme() {
	let systemTheme = ''

	try {
		if (typeof uni !== 'undefined' && typeof uni.getSystemInfoSync === 'function') {
			const systemInfo = uni.getSystemInfoSync() || {}
			systemTheme = systemInfo.theme || ''
		}
	} catch (error) {
		systemTheme = ''
	}

	// #ifdef H5
	if (!systemTheme && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
		systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT
	}
	// #endif

	return systemTheme === THEME_DARK ? THEME_DARK : THEME_LIGHT
}

// 将主题模式解析为最终实际应用的主题值。
export function resolveTheme(themeMode = getThemeMode()) {
	return themeMode === THEME_DARK ? THEME_DARK : THEME_LIGHT
}

// 根据明暗主题返回底部 tabBar 的配色方案。
function getTabBarTheme(theme) {
	if (theme === THEME_DARK) {
		return {
			color: '#8C96A8',
			selectedColor: '#8AB7FF',
			backgroundColor: '#16181D',
			borderStyle: 'black'
		}
	}

	return {
		color: '#8FA196',
		selectedColor: '#4AA9FE',
		backgroundColor: '#FCFEFC',
		borderStyle: 'white'
	}
}

// 将主题配色应用到底部 tabBar。
function applyTabBarTheme(theme) {
	if (typeof uni === 'undefined' || typeof uni.setTabBarStyle !== 'function') {
		return
	}

	const tabBarTheme = getTabBarTheme(theme)

	try {
		uni.setTabBarStyle(tabBarTheme)
	} catch (error) {
		console.warn('setTabBarStyle failed', error)
	}
}

// 获取当前最终生效的主题值。
export function getTheme() {
	return resolveTheme(getThemeMode())
}

// 保存主题模式并立即应用。
export function setTheme(theme) {
	const nextMode = isValidThemeMode(theme) ? theme : THEME_LIGHT
	uni.setStorageSync(THEME_KEY, nextMode)
	return applyTheme(nextMode)
}

// 应用主题到页面根节点和 tabBar，并广播变更事件。
export function applyTheme(theme = getThemeMode()) {
	const nextMode = isValidThemeMode(theme) ? theme : getThemeMode()
	const nextTheme = resolveTheme(nextMode)
	// #ifdef H5
	if (typeof document !== 'undefined' && document.documentElement) {
		document.documentElement.setAttribute('data-theme', nextTheme)
	}
	// #endif
	
	applyTabBarTheme(nextTheme)
	
	currentActiveTheme = nextTheme
	emitThemeChange(nextTheme, nextMode)
	return nextTheme
}
