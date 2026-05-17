import { request } from './request'

// TODO(后端)：以下接口路径仅为占位，按你的后端实际路由修改
// TODO(后端/短信宝)：短信验证码不要在前端直连短信宝（会暴露账号/密钥）
// 由后端提供 “发验证码接口”，后端再去调用短信宝发送短信，并把验证码写入缓存/数据库用于校验

export function sendCode(payload) {
	// payload: { phone?, email?, scene: 'register'|'login' }
	return request({
		url: '/auth/send-code',
		method: 'POST',
		data: payload
	})
}

export function register(payload) {
	// payload: { phone, email, password, code }
	return request({
		url: '/auth/register',
		method: 'POST',
		data: payload
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
		timeout: 45000,
		retryTimes: 2,
		retryDelayMs: 700
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
