const MAX_HISTORY_COUNT = 50
export const QUESTION_HISTORY_UPDATED_EVENT = 'question-history-updated'

function getQuestionHistoryKey() {
	const user = uni.getStorageSync('user')
	const userId = user && user.userId ? user.userId : 'guest'
	return `question_bank_history_${userId}`
}

function padNumber(value) {
	return String(value).padStart(2, '0')
}

function formatDateTime(timestamp) {
	const date = new Date(Number(timestamp) || Date.now())
	const year = date.getFullYear()
	const month = padNumber(date.getMonth() + 1)
	const day = padNumber(date.getDate())
	const hour = padNumber(date.getHours())
	const minute = padNumber(date.getMinutes())
	return `${year}-${month}-${day} ${hour}:${minute}`
}

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

export function getQuestionHistory() {
	const key = getQuestionHistoryKey()
	const records = uni.getStorageSync(key)
	if (!Array.isArray(records)) {
		return []
	}
	return records.map(normalizeHistoryItem).sort((a, b) => b.timestamp - a.timestamp)
}

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

export function getQuestionHistoryBySession(sessionId = '') {
	return getQuestionHistory().find(item => item.sessionId === sessionId) || null
}

export function getQuestionHistorySummary(type = '') {
	const history = getQuestionHistory().filter(item => !type || item.type === type)
	const latest = history[0] || null
	return {
		count: history.length,
		latest
	}
}
