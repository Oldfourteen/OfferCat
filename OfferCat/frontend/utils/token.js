const TOKEN_KEY = 'token'

export function getToken() {
	return uni.getStorageSync(TOKEN_KEY) || ''
}

export function setToken(token) {
	uni.setStorageSync(TOKEN_KEY, token || '')
}

export function clearToken() {
	uni.removeStorageSync(TOKEN_KEY)
}
