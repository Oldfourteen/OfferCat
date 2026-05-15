import { getUser, setUser, resolveStoredStudentId } from './user.js'
import defaultAvatar from '@/asset/image/avatar.png'

// 默认头像、资料变更事件以及用户资料默认结构。
export const DEFAULT_AVATAR = defaultAvatar
export const USER_PROFILE_UPDATED_EVENT = 'user-profile-updated'

export const DEFAULT_USER_PROFILE = {
	avatar: DEFAULT_AVATAR,
	nickname: '',
	major: '',
	graduationYear: '',
	grade: '',
	jobStatus: '',
	bio: '',
	desiredPosition: '',
	desiredCity: '',
	expectedSalary: '',
	phone: '',
	realName: '',
	email: '',
	gender: ''
}

// 统一用户资料字段，兼容接口字段与本地字段命名差异。
function normalizeProfile(source = {}) {
	const grade = source.grade || source.graduationYear || DEFAULT_USER_PROFILE.grade
	return {
		...DEFAULT_USER_PROFILE,
		...source,
		avatar: source.avatar || DEFAULT_USER_PROFILE.avatar,
		nickname: source.nickname || DEFAULT_USER_PROFILE.nickname,
		major: source.major || DEFAULT_USER_PROFILE.major,
		graduationYear: grade,
		grade,
		jobStatus: source.jobStatus || DEFAULT_USER_PROFILE.jobStatus,
		bio: source.bio ?? DEFAULT_USER_PROFILE.bio,
		desiredPosition: source.desiredPosition || source.jobDirection || DEFAULT_USER_PROFILE.desiredPosition,
		desiredCity: source.desiredCity || source.intentCity || DEFAULT_USER_PROFILE.desiredCity,
		expectedSalary: source.expectedSalary || DEFAULT_USER_PROFILE.expectedSalary,
		phone: source.phone || DEFAULT_USER_PROFILE.phone,
		realName: source.realName || DEFAULT_USER_PROFILE.realName,
		email: source.email || DEFAULT_USER_PROFILE.email,
		gender: source.gender || DEFAULT_USER_PROFILE.gender
	}
}

// 获取当前用户资料，并优先兼容嵌套的 profile 字段结构。
export function getUserProfile() {
	const user = getUser() || {}
	const source = user.profile ? { ...user, ...user.profile } : user
	return normalizeProfile(source)
}

// 保存用户资料并同步更新到用户缓存中。
export function saveUserProfile(profile = {}) {
	const currentUser = getUser() || {}
	const nextProfile = normalizeProfile({ ...currentUser, ...profile })
	// 每次保存资料后，`profile` 会变成扁平结构；必须把 studentId 提到可视层，否则签到/成长接口读不到（原在 user.profile.studentId 的旧数据会「丢」一层）。
	const mergedForSid = { ...currentUser, ...profile, ...nextProfile }
	const sid = resolveStoredStudentId(mergedForSid)
	const profileForStore = {
		...nextProfile,
		...(sid != null ? { studentId: sid } : {})
	}
	setUser({
		...currentUser,
		...profileForStore,
		profile: profileForStore
	})
	if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
		uni.$emit(USER_PROFILE_UPDATED_EVENT, nextProfile)
	}
	return nextProfile
}
