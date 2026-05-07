const THEME_KEY = 'app_theme_mode'

export const THEME_LIGHT = 'light'
export const THEME_DARK = 'dark'
export const THEME_SYSTEM = 'system'
export const THEME_CHANGE_EVENT = 'app-theme-updated'

let hasThemeObserver = false
let currentActiveTheme = null

function isValidThemeMode(theme) {
	return [THEME_LIGHT, THEME_DARK, THEME_SYSTEM].includes(theme)
}

function emitThemeChange(theme, mode) {
	if (typeof uni === 'undefined' || typeof uni.$emit !== 'function') {
		return
	}

	uni.$emit(THEME_CHANGE_EVENT, {
		theme,
		mode
	})
}

export function getThemeMode() {
	const theme = uni.getStorageSync(THEME_KEY)
	return isValidThemeMode(theme) ? theme : THEME_LIGHT
}

export function getSystemTheme() {
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

export function resolveTheme(themeMode = getThemeMode()) {
	if (themeMode === THEME_SYSTEM) {
		return getSystemTheme()
	}

	return themeMode === THEME_DARK ? THEME_DARK : THEME_LIGHT
}

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

export function getTheme() {
	return resolveTheme(getThemeMode())
}

export function setTheme(theme) {
	const nextMode = isValidThemeMode(theme) ? theme : THEME_LIGHT
	uni.setStorageSync(THEME_KEY, nextMode)
	return applyTheme(nextMode)
}

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

export function initThemeObserver() {
	if (hasThemeObserver || typeof uni === 'undefined' || typeof uni.onThemeChange !== 'function') {
		return
	}

	hasThemeObserver = true
	uni.onThemeChange(() => {
		if (getThemeMode() === THEME_SYSTEM) {
			applyTheme(THEME_SYSTEM)
		}
	})
}
