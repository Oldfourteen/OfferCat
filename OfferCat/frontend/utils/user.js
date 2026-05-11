// 用户信息的本地缓存键。
const USER_KEY = 'user_v2'

// 读取本地缓存中的用户信息。
export function getUser() {
	return uni.getStorageSync(USER_KEY) || null
}

// 保存用户信息到本地缓存。
export function setUser(user) {
	uni.setStorageSync(USER_KEY, user || null)
}

// 清除本地缓存中的用户信息。
export function clearUser() {
	uni.removeStorageSync(USER_KEY)
}

// 基于当前用户生成独立的打卡缓存键。
export function getCheckInKey() {
	const user = getUser() || {}
	const userId = user.userId || user.id || 'default'
	return `checkIns_${userId}`
}

