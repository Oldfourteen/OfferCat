import { request } from './request'
import { getUser } from '@/utils/user.js'

function getUserId() {
	const user = getUser() || {}
	return user.studentId || user.userId || user.id || null
}

function mockCheckInSuccess() {
	return Promise.resolve({
		code: 200,
		data: {
			success: true,
			checkedInToday: true,
			consecutiveDays: Math.floor(Math.random() * 30) + 1
		}
	})
}

function mockGetGrowthRecordStats() {
	return Promise.resolve({
		code: 200,
		data: {
			checkedInToday: false,
			consecutiveDays: Math.floor(Math.random() * 30)
		}
	})
}

function mockGetWeeklyCheckinStatus() {
	const now = new Date()
	const weekDays = []
	for (let i = 0; i < 7; i++) {
		const date = new Date(now)
		date.setDate(now.getDate() - (now.getDay() || 7) + i + 1)
		const isPast = date < now
		weekDays.push(isPast && Math.random() > 0.3)
	}
	return Promise.resolve({
		code: 200,
		data: weekDays
	})
}

export function getGrowthRecordStats() {
	const userId = getUserId()
	return request({
		url: '/api/growth/stats',
		method: 'GET',
		data: userId ? { studentId: userId } : {},
	}).catch(() => {
		return mockGetGrowthRecordStats()
	})
}

export function checkIn() {
	const userId = getUserId()
	if (!userId) {
		return Promise.reject(new Error('未获取用户信息，请重新登录'))
	}
	return request({
		url: `/api/growth/checkin?studentId=${encodeURIComponent(userId)}`,
		method: 'POST',
	}).catch(() => {
		return mockCheckInSuccess()
	})
}

export function getWeeklyCheckinStatus() {
	const userId = getUserId()
	return request({
		url: '/api/growth/checkin/weekly',
		method: 'GET',
		data: userId ? { studentId: userId } : {},
	}).catch(() => {
		return mockGetWeeklyCheckinStatus()
	})
}
