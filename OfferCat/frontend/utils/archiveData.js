import { getQuestionFavoritesSummary } from './questionFavorites.js'
import { getQuestionHistorySummary } from './questionHistory.js'
import { getCheckInKey } from './user.js'

export const ARCHIVE_DATA_UPDATED_EVENT = 'archive-data-updated'

const ARCHIVE_RECORDS_KEY = 'archive_records_map'
const RESUME_REPO_STATS_KEY = 'resume_repo_stats'

const DEFAULT_ARCHIVE_RECORDS_MAP = {
	awards: [],
	certificates: [],
	projects: [],
	internships: []
}

const DEFAULT_RESUME_REPO_STATS = {
	totalResumes: 0,
	recentDeliveries: 0,
	completion: 0
}

function clone(value) {
	return JSON.parse(JSON.stringify(value))
}

function emitArchiveDataUpdated() {
	if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
		uni.$emit(ARCHIVE_DATA_UPDATED_EVENT)
	}
}

export function getArchiveRecordsMap() {
	const recordsMap = uni.getStorageSync(ARCHIVE_RECORDS_KEY)
	if (!recordsMap || typeof recordsMap !== 'object') {
		return clone(DEFAULT_ARCHIVE_RECORDS_MAP)
	}

	return {
		awards: Array.isArray(recordsMap.awards) ? recordsMap.awards : clone(DEFAULT_ARCHIVE_RECORDS_MAP.awards),
		certificates: Array.isArray(recordsMap.certificates) ? recordsMap.certificates : clone(DEFAULT_ARCHIVE_RECORDS_MAP.certificates),
		projects: Array.isArray(recordsMap.projects) ? recordsMap.projects : clone(DEFAULT_ARCHIVE_RECORDS_MAP.projects),
		internships: Array.isArray(recordsMap.internships) ? recordsMap.internships : clone(DEFAULT_ARCHIVE_RECORDS_MAP.internships)
	}
}

export function getArchiveRecords(type = 'awards') {
	const recordsMap = getArchiveRecordsMap()
	return Array.isArray(recordsMap[type]) ? recordsMap[type] : []
}

export function saveArchiveRecords(type = 'awards', records = []) {
	const recordsMap = getArchiveRecordsMap()
	recordsMap[type] = Array.isArray(records) ? records : []
	uni.setStorageSync(ARCHIVE_RECORDS_KEY, recordsMap)
	emitArchiveDataUpdated()
	return recordsMap[type]
}

export function getArchiveSummary() {
	const recordsMap = getArchiveRecordsMap()
	return {
		awardsCount: recordsMap.awards.length,
		certificatesCount: recordsMap.certificates.length,
		projectsCount: recordsMap.projects.length,
		internshipsCount: recordsMap.internships.length,
		totalCount: recordsMap.awards.length + recordsMap.certificates.length + recordsMap.projects.length + recordsMap.internships.length
	}
}

export function getResumeRepoStats() {
	const localStats = uni.getStorageSync(RESUME_REPO_STATS_KEY)
	const merged = {
		...DEFAULT_RESUME_REPO_STATS,
		...(localStats && typeof localStats === 'object' ? localStats : {})
	}
	const historySummary = getQuestionHistorySummary()
	return {
		totalResumes: Number(merged.totalResumes) || DEFAULT_RESUME_REPO_STATS.totalResumes,
		recentDeliveries: historySummary.count || Number(merged.recentDeliveries) || DEFAULT_RESUME_REPO_STATS.recentDeliveries,
		completion: Number(merged.completion) || DEFAULT_RESUME_REPO_STATS.completion
	}
}

export function getDashboardMetrics() {
	const resumeStats = getResumeRepoStats()
	const favoriteSummary = getQuestionFavoritesSummary()
	const historySummary = getQuestionHistorySummary()
	const interviewSummary = getQuestionHistorySummary('interview')
	const archiveSummary = getArchiveSummary()
	const checkInKey = getCheckInKey()
	const checkIns = uni.getStorageSync(checkInKey) || {}
	const totalCheckIns = Object.values(checkIns).filter(Boolean).length

	let consecutiveDays = 0
	const today = new Date()
	for (let i = 0; i < 365; i++) {
		const currentDate = new Date(today)
		currentDate.setDate(today.getDate() - i)
		const dateStr = currentDate.toISOString().split('T')[0]
		if (checkIns[dateStr]) {
			consecutiveDays++
		} else {
			break
		}
	}

	return {
		resumeCount: resumeStats.totalResumes,
		recentDeliveries: resumeStats.recentDeliveries,
		resumeCompletion: resumeStats.completion,
		historyCount: historySummary.count,
		interviewCount: interviewSummary.count,
		favoritesCount: favoriteSummary.count,
		totalCheckIns,
		consecutiveDays,
		archiveSummary
	}
}
