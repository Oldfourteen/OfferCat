import { getUser, setUser } from './user.js'
import defaultAvatar from '@/asset/image/avatar.png'

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

export function getUserProfile() {
	const user = getUser() || {}
	const source = user.profile ? { ...user, ...user.profile } : user
	return normalizeProfile(source)
}

export function saveUserProfile(profile = {}) {
	const currentUser = getUser() || {}
	const nextProfile = normalizeProfile({ ...currentUser, ...profile })
	setUser({
		...currentUser,
		...nextProfile,
		profile: nextProfile
	})
	if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
		uni.$emit(USER_PROFILE_UPDATED_EVENT, nextProfile)
	}
	return nextProfile
}
