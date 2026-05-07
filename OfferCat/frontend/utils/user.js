const USER_KEY = 'user_v2'

export function getUser() {
	return uni.getStorageSync(USER_KEY) || null
}

export function setUser(user) {
	uni.setStorageSync(USER_KEY, user || null)
}

export function clearUser() {
	uni.removeStorageSync(USER_KEY)
}

export function getCheckInKey() {
	const user = getUser() || {}
	const userId = user.userId || user.id || 'default'
	return `checkIns_${userId}`
}

