// 用户信息的本地缓存键。
const USER_KEY = 'user_v2'

// 读取本地缓存中的用户信息。
export function getUser() {
	return uni.getStorageSync(USER_KEY) || null
}

/**
 * 从本地缓存的用户对象解析可用的数值型 userId（兼容 userId / id、字符串数字）。
 * @returns {number|null}
 */
export function resolveStoredUserId(user) {
	if (!user || typeof user !== 'object') return null
	const raw = user.userId != null ? user.userId : user.id
	if (raw === '' || raw == null) return null
	const n = typeof raw === 'number' ? raw : Number(raw)
	if (!Number.isFinite(n) || n <= 0) return null
	return n
}

// 保存用户信息到本地缓存。
export function setUser(user) {
	uni.setStorageSync(USER_KEY, user || null)
}

// 清除本地缓存中的用户信息。
export function clearUser() {
	uni.removeStorageSync(USER_KEY)
}

/**
 * 解析本地缓存用户的学生主键 ID（与后端 student 表一致）。
 * 登录响应里 studentId 通常在 user.profile.studentId，部分资料保存流程会写入根级 user.studentId。
 * @param {object|null} [user] 不传则读取本地缓存
 * @returns {number|null}
 */
export function resolveStoredStudentId(user) {
	const u = user != null ? user : getUser()
	if (!u || typeof u !== 'object') return null
	const raw =
		u.studentId != null && u.studentId !== ''
			? u.studentId
			: u.profile && u.profile.studentId != null && u.profile.studentId !== ''
				? u.profile.studentId
				: null
	if (raw === '' || raw == null) return null
	const n = typeof raw === 'number' ? raw : Number(raw)
	if (!Number.isFinite(n) || n <= 0) return null
	return n
}

// 基于当前用户生成独立的打卡缓存键。
export function getCheckInKey() {
	const user = getUser() || {}
	const userId = user.userId || user.id || 'default'
	return `checkIns_${userId}`
}

