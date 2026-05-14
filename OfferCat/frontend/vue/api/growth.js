import { request } from './request'
import { getUser } from '@/utils/user.js'

function getStudentId() {
	const user = getUser()
	return user && user.studentId ? user.studentId : null
}

/** 网关路由为 `/api/growth/**`（见 api_gateway application.yml）；勿写 `/growth/...`，否则返回 404。 */
export function getGrowthRecordStats() {
	const studentId = getStudentId()
	return request({
		url: '/api/growth/stats',
		method: 'GET',
		data: studentId ? { studentId } : {},
	})
}

export function checkIn() {
	const studentId = getStudentId()
	if (!studentId) {
		return Promise.reject(new Error('未获取学生信息（studentId），请重新登录或完善资料后再试'))
	}
	return request({
		url: `/api/growth/checkin?studentId=${encodeURIComponent(studentId)}`,
		method: 'POST',
	})
}

export function getWeeklyCheckinStatus() {
	const studentId = getStudentId()
	return request({
		url: '/api/growth/checkin/weekly',
		method: 'GET',
		data: studentId ? { studentId } : {},
	})
}
