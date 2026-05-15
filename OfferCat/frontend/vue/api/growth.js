import { request } from './request'
import { resolveStoredStudentId } from '@/utils/user.js'

function getStudentId() {
	return resolveStoredStudentId()
}

/**
 * 成长相关接口的路径（遇「未命中路由」404 则换下一个；与网关 application.yml / GrowthRecordController 对齐）。
 * 1) `/api/growth/**` — 网关 growth-service 专用段（仓库默认；StripPrefix 后到 `/growth/**`）
 * 2) `/api/student/profile/growth/**` — 与 `/api/student/profile/**` 同 student-service 路由
 * 3) `/api/student/growth/**` — StripPrefix 后到 `/student/growth/**`
 * 4) `/growth/**` — 若 Nginx 等已剥掉网关前的 `/api` 前缀，仍直连「/growth/**」时用
 */
const GROWTH_PREFIXES = ['/api/growth', '/api/student/profile/growth', '/api/student/growth', '/growth']

function isHttpNotFound(err) {
	if (!err) return false
	if (err.statusCode === 404 || err.bizCode === 404) return true
	const m = String(err.message || '')
	// uni 部分运行时的 Error 未必挂 statusCode，但 formatHttpErrorMessage 会把 404 文案写进 message
	return /^\s*Not Found\b/i.test(m) || /\b404\b/i.test(m)
}

/**
 * @param {() => object} buildOptions 接收 url 前缀，返回 request 的 options（含 url/method/data 等）
 */
async function growthRequest(buildOptions) {
	let lastErr
	for (const prefix of GROWTH_PREFIXES) {
		try {
			const opts = buildOptions(prefix)
			return await request(opts)
		} catch (e) {
			lastErr = e
			if (isHttpNotFound(e) && prefix !== GROWTH_PREFIXES[GROWTH_PREFIXES.length - 1]) {
				continue
			}
			throw e
		}
	}
	throw lastErr
}

export function getGrowthRecordStats() {
	const studentId = getStudentId()
	return growthRequest((prefix) => ({
		url: `${prefix}/stats`,
		method: 'GET',
		data: studentId ? { studentId } : {},
	}))
}

export function checkIn() {
	const studentId = getStudentId()
	if (!studentId) {
		return Promise.reject(new Error('未获取学生信息（studentId），请重新登录或完善资料后再试'))
	}
	const q = `?studentId=${encodeURIComponent(String(studentId))}`
	return growthRequest((prefix) => ({
		url: `${prefix}/checkin${q}`,
		method: 'POST',
	}))
}

export function getWeeklyCheckinStatus() {
	const studentId = getStudentId()
	return growthRequest((prefix) => ({
		url: `${prefix}/checkin/weekly`,
		method: 'GET',
		data: studentId ? { studentId } : {},
	}))
}
