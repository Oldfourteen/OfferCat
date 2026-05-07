const QUESTION_FAVORITES_KEY = 'question_bank_favorites'
export const QUESTION_FAVORITES_UPDATED_EVENT = 'question-favorites-updated'

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

function normalizeFavoriteItem(item = {}) {
	const timestamp = Number(item.timestamp || Date.now())
	return {
		paperId: item.paperId || item.id || '',
		type: item.type === 'interview' ? 'interview' : 'written',
		title: item.title || '题单练习',
		company: item.company || '',
		companyShort: item.companyShort || '',
		category: item.category || '',
		total: Number(item.total || item.totalCount) || 0,
		summary: item.summary || '',
		highlights: Array.isArray(item.highlights) ? item.highlights : [],
		timestamp,
		favoritedAt: item.favoritedAt || formatDateTime(timestamp)
	}
}

export function getQuestionFavorites() {
	const records = uni.getStorageSync(QUESTION_FAVORITES_KEY)
	if (!Array.isArray(records)) {
		return []
	}
	return records.map(normalizeFavoriteItem).sort((a, b) => b.timestamp - a.timestamp)
}

export function isQuestionFavorited(paperId = '') {
	return getQuestionFavorites().some(item => item.paperId === paperId)
}

export function saveQuestionFavorite(record) {
	const nextItem = normalizeFavoriteItem(record)
	const favorites = getQuestionFavorites().filter(item => item.paperId !== nextItem.paperId)
	favorites.unshift(nextItem)
	uni.setStorageSync(QUESTION_FAVORITES_KEY, favorites)
	if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
		uni.$emit(QUESTION_FAVORITES_UPDATED_EVENT)
	}
	return nextItem
}

export function removeQuestionFavorite(paperId = '') {
	const favorites = getQuestionFavorites().filter(item => item.paperId !== paperId)
	uni.setStorageSync(QUESTION_FAVORITES_KEY, favorites)
	if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
		uni.$emit(QUESTION_FAVORITES_UPDATED_EVENT)
	}
	return favorites
}

export function toggleQuestionFavorite(record) {
	if (isQuestionFavorited(record.paperId || record.id)) {
		removeQuestionFavorite(record.paperId || record.id)
		return false
	}
	saveQuestionFavorite(record)
	return true
}

export function getQuestionFavoritesSummary(type = '') {
	const favorites = getQuestionFavorites().filter(item => !type || item.type === type)
	return {
		count: favorites.length,
		latest: favorites[0] || null,
		ids: favorites.map(item => item.paperId)
	}
}
