import { request } from '@/api/request'

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

/**
 * 从用户对象各层结构解析 student 主键（兼容根级、profile 嵌套、以及 saveUserProfile 误产生的 profile.profile）。
 * @returns {string|number|null}
 */
function pickRawStudentId(u) {
	if (!u || typeof u !== 'object') return null
	const ok = (v) => (v !== undefined && v !== null && v !== '' ? v : null)
	return (
		ok(u.studentId) ??
		ok(u.profile && u.profile.studentId) ??
		ok(u.profile && u.profile.profile && u.profile.profile.studentId)
	)
}

// 保存用户信息到本地缓存。
export function setUser(user) {
	if (user == null || typeof user !== 'object') {
		uni.setStorageSync(USER_KEY, user || null)
		return
	}
	const raw = pickRawStudentId(user)
	let next = user
	if (raw != null) {
		const n = typeof raw === 'number' ? raw : Number(raw)
		if (Number.isFinite(n) && n > 0 && (user.studentId == null || user.studentId === '')) {
			next = { ...user, studentId: n }
		}
	}
	uni.setStorageSync(USER_KEY, next)
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
	const raw = pickRawStudentId(u)
	if (raw === '' || raw == null) return null
	const n = typeof raw === 'number' ? raw : Number(raw)
	if (!Number.isFinite(n) || n <= 0) return null
	return n
}

/**
 * 从网关拉取最新的用户与学生档案并 merge 到本地缓存。
 * 用于：内置浏览器/H5 登录包体不完整、旧版缓存缺 studentId、切账号后需与库表 student 主键对齐。
 */
export async function syncUserProfileFromServer() {
	const u = getUser()
	const userId = resolveStoredUserId(u)
	if (userId == null) return null
	try {
		const res = await request({
			url: `/user/profile?userId=${encodeURIComponent(String(userId))}`,
			method: 'GET',
		})
		const serverUser =
			res && typeof res === 'object' && res.data && typeof res.data === 'object' ? res.data : null
		if (!serverUser || serverUser.userId == null) return null

		const merged = {
			...(u && typeof u === 'object' ? u : {}),
			...serverUser,
			profile: serverUser.profile != null ? serverUser.profile : u && u.profile,
		}
		setUser(merged)
		return merged
	} catch (e) {
		console.warn('[user] syncUserProfileFromServer 失败', e)
		return null
	}
}

// 基于当前用户生成独立的打卡缓存键。
export function getCheckInKey() {
	const user = getUser() || {}
	const userId = user.userId || user.id || 'default'
	return `checkIns_${userId}`
}

