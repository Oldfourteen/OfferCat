import { ensureApiWarmBeforeLogin } from './apiWarmup'
import { setToken } from './token'
import { setUser, scheduleLoginProfileSync } from './user'
import { login } from '../api/auth'

// 判断当前是否为开发环境。
export function isDevEnv() {
	return process.env.NODE_ENV !== 'production'
}

/**
 * UniVerify / uniCloud 换号成功后，用已校验手机号走后端一键登录并写入本地会话。
 */
export async function completeOneClickLoginWithPhone(phone) {
	const target = String(phone || '').trim()
	if (!/^1\d{10}$/.test(target)) {
		throw new Error('手机号格式无效')
	}
	await ensureApiWarmBeforeLogin(5000)
	const result = await login({ loginType: 'oneClick', target, phone: target })

	const token = (result && result.token) || (result && result.data && result.data.token) || ''
	const user = (result && result.user) || (result && result.data && result.data.user) || null

	let isComplete = true
	const resData = result && result.data ? result.data : result
	if (resData && typeof resData === 'object') {
		if (resData.isComplete !== undefined) {
			isComplete = resData.isComplete
		} else if (resData.complete !== undefined) {
			isComplete = resData.complete
		}
	}

	if (!token) {
		throw new Error('后端未返回 token')
	}

	setToken(token)
	setUser(user)
	scheduleLoginProfileSync({ timeout: 12000 })

	return { token, user, isComplete }
}
