import { request } from './request'

// TODO(后端)：以下接口路径仅为占位，按你的后端实际路由修改
// TODO(后端/阿里云短信)：短信验证码不要在前端直连阿里云短信服务（会暴露账号/密钥）
// 由后端提供“发验证码接口”，后端再去调用阿里云短信发送短信，并把验证码写入缓存/数据库用于校验

export function sendCode(payload) {
	const phone = String((payload && payload.phone) || '').trim()
	return request({
		url: '/auth/send-code',
		method: 'POST',
		data: { phone }
	})
}

export function register(payload) {
	const phone = String(payload.phone || '').trim()
	const code = String(payload.code || '').trim()
	const password = String(payload.password || '').trim()
	const confirmPassword = String(payload.confirmPassword || payload.password || '').trim()
	const emailRaw = payload.email == null ? '' : String(payload.email).trim()
	const data = { phone, code, password, confirmPassword }
	if (emailRaw) data.email = emailRaw
	return request({
		url: '/auth/register',
		method: 'POST',
		data,
		timeout: 45000
	})
}

export function login(payload) {
	// 后端 LoginRequest 用 target 字段统一接收手机号或邮箱
	const targetRaw = payload.target || payload.phone || payload.email || ''
	const pwdRaw = payload.password
	const data = {
		loginType: payload.loginType,
		target: typeof targetRaw === 'string' ? targetRaw.trim() : targetRaw,
		password: pwdRaw == null ? '' : String(pwdRaw).trim(),
		code: payload.code == null ? '' : String(payload.code).trim()
	}
	return request({
		url: '/auth/login',
		method: 'POST',
		data,
		timeout: 28000,
		retryTimes: 1,
		retryDelayMs: 450
	})
}

export function findPassword(payload) {
	return request({
		url: '/auth/reset-password',
		method: 'POST',
		data: {
			phone: payload.phone,
			code: payload.code,
			newPassword: payload.password,
			confirmPassword: payload.confirmPassword
		}
	})
}
