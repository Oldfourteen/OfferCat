import { request } from './request'

export function getGrowthRecordStats() {
	return request({
		url: '/growth/stats',
		method: 'GET'
	})
}

export function checkIn() {
	return request({
		url: '/growth/checkin',
		method: 'POST'
	})
}

export function getWeeklyCheckinStatus() {
	return request({
		url: '/growth/checkin/weekly',
		method: 'GET'
	})
}