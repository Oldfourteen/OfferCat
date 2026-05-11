import { getQuestionFavoritesSummary } from './questionFavorites.js'
import { getQuestionHistorySummary } from './questionHistory.js'
import { getCheckInKey } from './user.js'

// 成长档案相关数据变更时广播的全局事件名。
export const ARCHIVE_DATA_UPDATED_EVENT = 'archive-data-updated'

// 成长档案与简历仓库统计的本地缓存键。
const ARCHIVE_RECORDS_KEY = 'archive_records_map'
const RESUME_REPO_STATS_KEY = 'resume_repo_stats'

// 成长档案各类型记录的默认结构。
const DEFAULT_ARCHIVE_RECORDS_MAP = {
	awards: [],
	certificates: [],
	projects: [],
	internships: []
}

// 简历仓库统计信息的默认值。
const DEFAULT_RESUME_REPO_STATS = {
	totalResumes: 0,
	recentDeliveries: 0,
	completion: 0
}

// 深拷贝默认结构，避免引用共享导致数据串改。
function clone(value) {
	return JSON.parse(JSON.stringify(value))
}

// 通知页面重新拉取成长档案数据。
function emitArchiveDataUpdated() {
	if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
		uni.$emit(ARCHIVE_DATA_UPDATED_EVENT)
	}
}

// 读取全部成长档案记录，并兜底为完整的数据结构。
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

// 按档案类型获取对应的记录列表。
export function getArchiveRecords(type = 'awards') {
	const recordsMap = getArchiveRecordsMap()
	return Array.isArray(recordsMap[type]) ? recordsMap[type] : []
}

// 保存指定类型的成长档案记录，并触发更新事件。
export function saveArchiveRecords(type = 'awards', records = []) {
	const recordsMap = getArchiveRecordsMap()
	recordsMap[type] = Array.isArray(records) ? records : []
	uni.setStorageSync(ARCHIVE_RECORDS_KEY, recordsMap)
	emitArchiveDataUpdated()
	return recordsMap[type]
}

// 汇总成长档案各分类数量，供概览卡片展示。
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

// 获取简历仓库统计，并结合做题历史补齐近期投递数据。
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

// 聚合首页/我的成长看板所需的各类指标数据。
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
	// 从今天向前回溯，计算连续打卡天数。
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
