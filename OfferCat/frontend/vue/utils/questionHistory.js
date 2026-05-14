import { getUser } from '@/utils/user.js'

// 题库练习历史的最大保留条数与更新事件名。
const MAX_HISTORY_COUNT = 50
export const QUESTION_HISTORY_UPDATED_EVENT = 'question-history-updated'

// 根据当前用户生成独立的做题历史缓存键（与登录缓存 user_v2 对齐）。
function getQuestionHistoryKey() {
	const user = getUser() || {}
	const userId = user.userId || user.id || 'guest'
	return `question_bank_history_${userId}`
}

// 补零格式化时间片段。
function padNumber(value) {
	return String(value).padStart(2, '0')
}

// 将时间戳格式化为历史记录展示时间。
function formatDateTime(timestamp) {
	const date = new Date(Number(timestamp) || Date.now())
	const year = date.getFullYear()
	const month = padNumber(date.getMonth() + 1)
	const day = padNumber(date.getDate())
	const hour = padNumber(date.getHours())
	const minute = padNumber(date.getMinutes())
	return `${year}-${month}-${day} ${hour}:${minute}`
}

// 统一练习历史结构，兼容不同入口写入的字段。
function normalizeHistoryItem(item = {}) {
	const timestamp = Number(item.timestamp || Date.now())
	return {
		sessionId: item.sessionId || `${item.paperId || 'paper'}_${timestamp}`,
		paperId: item.paperId || '',
		type: item.type === 'interview' ? 'interview' : 'written',
		title: item.title || '题单练习',
		company: item.company || '',
		category: item.category || '',
		totalCount: Number(item.totalCount) || 0,
		answeredCount: Number(item.answeredCount) || 0,
		correctCount: Number(item.correctCount) || 0,
		wrongCount: Number(item.wrongCount) || 0,
		accuracy: Number(item.accuracy) || 0,
		score: Number(item.score) || 0,
		abilityComment: item.abilityComment || '',
		timestamp,
		submittedAt: item.submittedAt || formatDateTime(timestamp)
	}
}

// 读取当前用户的全部做题历史，并按最新时间排序。
export function getQuestionHistory() {
	const key = getQuestionHistoryKey()
	const records = uni.getStorageSync(key)
	if (!Array.isArray(records)) {
		return []
	}
	return records.map(normalizeHistoryItem).sort((a, b) => b.timestamp - a.timestamp)
}

// 保存一次做题结果，并限制本地历史条数。
export function saveQuestionHistory(record) {
	const nextItem = normalizeHistoryItem(record)
	const history = getQuestionHistory().filter(item => item.sessionId !== nextItem.sessionId)
	history.unshift(nextItem)
	const key = getQuestionHistoryKey()
	uni.setStorageSync(key, history.slice(0, MAX_HISTORY_COUNT))
	if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
		uni.$emit(QUESTION_HISTORY_UPDATED_EVENT)
	}
	return nextItem
}

// 根据练习会话 id 获取单条历史记录。
export function getQuestionHistoryBySession(sessionId = '') {
	return getQuestionHistory().find(item => item.sessionId === sessionId) || null
}

// 汇总做题历史数量和最近一条记录。
export function getQuestionHistorySummary(type = '') {
	const history = getQuestionHistory().filter(item => !type || item.type === type)
	const latest = history[0] || null
	return {
		count: history.length,
		latest
	}
}
