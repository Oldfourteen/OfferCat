// 登录 token 的本地缓存键。
const TOKEN_KEY = 'token'

// 读取本地缓存中的 token。
export function getToken() {
	return uni.getStorageSync(TOKEN_KEY) || ''
}

// 保存登录 token。
export function setToken(token) {
	uni.setStorageSync(TOKEN_KEY, token || '')
}

// 清除本地缓存中的 token。
export function clearToken() {
	uni.removeStorageSync(TOKEN_KEY)
}
