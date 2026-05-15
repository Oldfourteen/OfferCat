import { request } from './request'
import { resolveStoredStudentId } from '@/utils/user.js'

function getStudentId() {
	return resolveStoredStudentId()
}

/**
 * 成长相关接口的网关路径（按优先级尝试，遇 HTTP 404 则换下一个）。
 * 1) `/api/student/profile/growth/**` — 与学生档案接口 `/api/student/profile/**` 同一段路由，线上最易与现有网关/Nginx 行为一致
 * 2) `/api/student/growth/**` — StripPrefix 后到 `/student/growth/**`
 * 3) `/api/growth/**` — 仓库 api_gateway 中的独立 growth 路由（旧部署可能未配置则会 404）
 */
const GROWTH_PREFIXES = ['/api/student/profile/growth', '/api/student/growth', '/api/growth']

function isHttpNotFound(err) {
	return err && (err.statusCode === 404 || err.bizCode === 404)
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
