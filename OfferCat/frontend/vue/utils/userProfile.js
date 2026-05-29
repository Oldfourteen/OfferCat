import { getUser, setUser, resolveStoredStudentId } from './user.js'

// 默认头像、资料变更事件以及用户资料默认结构。
export const DEFAULT_AVATAR = '/static/images/default-avatar.jpg'
export const USER_PROFILE_UPDATED_EVENT = 'user-profile-updated'

export const DEFAULT_USER_PROFILE = {
	avatar: DEFAULT_AVATAR,
	nickname: '',
	school: '',
	idCard: '',
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
	gender: '',
	cardBackgroundKey: 'ocean'
}

// 统一用户资料字段，兼容接口字段与本地字段命名差异。
function normalizeProfile(source = {}) {
	const grade = source.grade || source.graduationYear || DEFAULT_USER_PROFILE.grade
	return {
		...DEFAULT_USER_PROFILE,
		...source,
		avatar: source.avatar || DEFAULT_USER_PROFILE.avatar,
		nickname: source.nickname || DEFAULT_USER_PROFILE.nickname,
		school: source.school ?? DEFAULT_USER_PROFILE.school,
		idCard: source.idCard ?? DEFAULT_USER_PROFILE.idCard,
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
		gender: source.gender ?? DEFAULT_USER_PROFILE.gender,
		cardBackgroundKey: source.cardBackgroundKey || DEFAULT_USER_PROFILE.cardBackgroundKey
	}
}

// 获取当前用户资料，并优先兼容嵌套的 profile 字段结构。
export function getUserProfile() {
	const user = getUser() || {}
	if (!user.profile) return normalizeProfile(user)
	const userSafe = { ...user }
	delete userSafe.profile
	for (const key of Object.keys(userSafe)) {
		if (userSafe[key] === '' || userSafe[key] === null || userSafe[key] === undefined) {
			delete userSafe[key]
		}
	}
	const source = { ...user.profile, ...userSafe }
	return normalizeProfile(source)
}

// 保存用户资料并同步更新到用户缓存中。
export function saveUserProfile(profile = {}) {
	const currentUser = getUser() || {}
	const currentFlat = currentUser && currentUser.profile ? { ...currentUser.profile, ...currentUser } : currentUser
	const incomingFlat = profile && profile.profile ? { ...profile.profile, ...profile } : profile
	const incomingSafe = { ...(incomingFlat || {}) }
	delete incomingSafe.profile
	for (const key of Object.keys(incomingSafe)) {
		if (incomingSafe[key] === '' || incomingSafe[key] === null || incomingSafe[key] === undefined) {
			delete incomingSafe[key]
		}
	}
	const nextProfile = normalizeProfile({ ...(currentFlat || {}), ...incomingSafe })
	// 每次保存资料后，`profile` 会变成扁平结构；必须把 studentId 提到可视层，否则签到/成长接口读不到（原在 user.profile.studentId 的旧数据会「丢」一层）。
	const mergedForSid = { ...currentUser, ...incomingSafe, ...nextProfile }
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
