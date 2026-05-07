import { setToken } from './token'
import { setUser } from './user'
import { login } from '../api/auth'

export function isDevEnv() {
	return process.env.NODE_ENV !== 'production'
}

export async function oneClickLogin() {
	// TODO(后端)：这里需要接运营商一键登录（本机号码认证）或你的后端一键登录接口
	// 当前仅做“把手机号发给后端登录并记录”的占位实现
	const result = await login({ loginType: 'oneClick', phone: '17866832910' })

	const token = (result && result.token) || (result && result.data && result.data.token) || ''
	const user = (result && result.user) || (result && result.data && result.data.user) || null
	
	let isComplete = true;
	const resData = (result && result.data) ? result.data : result;
	if (resData && typeof resData === 'object') {
		if (resData.isComplete !== undefined) {
			isComplete = resData.isComplete;
		} else if (resData.complete !== undefined) {
			isComplete = resData.complete;
		}
	}

	if (!token) {
		throw new Error('后端未返回 token')
	}

	setToken(token)
	setUser(user)

	return { token, user, isComplete }
}
