// 简历仓库本地缓存键与最大保留数量。
import { request } from '@/api/request'
import { getUser, resolveStoredUserId } from '@/utils/user.js'

const RESUME_REPO_KEY = 'resume_repo_records'
const MAX_RESUME_COUNT = 50

// 补零格式化时间片段。
function padNumber(value) {
	return String(value).padStart(2, '0')
}

// 将时间戳格式化为简历记录展示时间。
function formatDateTime(timestamp) {
	const date = new Date(Number(timestamp) || Date.now())
	const year = date.getFullYear()
	const month = padNumber(date.getMonth() + 1)
	const day = padNumber(date.getDate())
	const hour = padNumber(date.getHours())
	const minute = padNumber(date.getMinutes())
	return `${year}-${month}-${day} ${hour}:${minute}`
}

function parseTimeToTimestamp(value) {
	if (!value) return null
	if (typeof value === 'number') return Number.isFinite(value) ? value : null
	const n = Number(value)
	if (Number.isFinite(n) && n > 0) return n
	const t = Date.parse(String(value))
	return Number.isFinite(t) ? t : null
}

// 统一简历记录结构，并兼容技能字段的字符串/数组格式。
function normalizeResumeRecord(record = {}) {
	const timestamp =
		parseTimeToTimestamp(record.timestamp) ||
		parseTimeToTimestamp(record.update_time || record.updateTime) ||
		parseTimeToTimestamp(record.create_time || record.createTime) ||
		Date.now()
	const resumeId = Number(record.resume_id || record.resumeId || timestamp)
	const backendResumeIdRaw = record.backend_resume_id || record.backendResumeId || record.backendResumeID
	const backendResumeId =
		backendResumeIdRaw != null && backendResumeIdRaw !== '' && Number.isFinite(Number(backendResumeIdRaw))
			? Number(backendResumeIdRaw)
			: null
	let skillsItems = record.skills_items || record.skillsItems || []
	if (typeof skillsItems === 'string') {
		const trimmed = skillsItems.trim()
		if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
			try {
				skillsItems = JSON.parse(trimmed)
			} catch (e) {
				skillsItems = []
			}
		} else {
			skillsItems = []
		}
	}
	if (!Array.isArray(skillsItems)) {
		skillsItems = []
	}
	return {
		resume_id: resumeId,
		backend_resume_id: backendResumeId,
		student_id: Number(record.student_id || 0),
		resume_name: record.resume_name || record.resumeName || '未命名简历',
		real_name: record.real_name || record.realName || '',
		photo: record.photo || '',
		gender: record.gender !== undefined ? Number(record.gender) : 0,
		phone: record.phone || '',
		email: record.email || '',
		education: record.education || '',
		skills: record.skills || '',
		skills_items: skillsItems,
		campus_experience: record.campus_experience || '',
		work_experience: record.work_experience || '',
		project_experience: record.project_experience || '',
		self_evaluation: record.self_evaluation || '',
		ai_score: record.ai_score || '',
		ai_evaluation: record.ai_evaluation || '',
		resume_status: Number(record.resume_status || 1),
		create_time: record.create_time || record.createTime || formatDateTime(timestamp),
		update_time: record.update_time || record.updateTime || formatDateTime(timestamp),
		timestamp
	}
}

// 获取简历仓库列表，并按最近更新时间倒序返回。
export function getResumeRepoList() {
	const records = uni.getStorageSync(RESUME_REPO_KEY)
	if (!Array.isArray(records)) {
		return []
	}
	return records.map(normalizeResumeRecord).sort((a, b) => b.timestamp - a.timestamp)
}

// 根据简历 id 获取单份简历详情。
export function getResumeById(resumeId) {
	const id = Number(resumeId)
	if (!id) return null
	return getResumeRepoList().find(item => Number(item.resume_id) === id) || null
}

export async function fetchResumeRepoListPreferServer() {
	try {
		const userId = resolveStoredUserId(getUser())
		if (!userId) return getResumeRepoList()
		const res = await request({
			url: `/api/resume/list/${encodeURIComponent(String(userId))}`,
			method: 'GET',
		})
		const serverList = Array.isArray(res) ? res : res && Array.isArray(res.data) ? res.data : []
		const serverNormalized = serverList.map(normalizeResumeRecord)
		const local = getResumeRepoList()
		const map = new Map()
		for (const item of [...serverNormalized, ...local]) {
			map.set(Number(item.resume_id), item)
		}
		const merged = Array.from(map.values()).sort((a, b) => b.timestamp - a.timestamp)
		uni.setStorageSync(RESUME_REPO_KEY, merged.slice(0, MAX_RESUME_COUNT))
		return merged
	} catch (e) {
		console.warn('[resumeRepo] 拉取服务端简历失败，回退本地', e)
		return getResumeRepoList()
	}
}

// 保存或更新一份简历记录，并控制本地缓存数量上限。
export function saveResumeRecord(record) {
	const nextItem = normalizeResumeRecord(record)
	const repo = getResumeRepoList().filter(item => Number(item.resume_id) !== Number(nextItem.resume_id))
	repo.unshift({
		...nextItem,
		update_time: formatDateTime(Date.now()),
		timestamp: Date.now()
	})
	uni.setStorageSync(RESUME_REPO_KEY, repo.slice(0, MAX_RESUME_COUNT))
	return nextItem
}

// 删除一个或多个简历记录。
export async function deleteResumes(resumeIds) {
	if (!Array.isArray(resumeIds)) {
		resumeIds = [resumeIds];
	}
	const idsToDelete = resumeIds.map(id => Number(id));
	try {
		await Promise.all(
			idsToDelete
				.filter((id) => Number.isFinite(id) && id > 0)
				.map((id) =>
					request({
						url: `/api/resume/delete/${encodeURIComponent(String(id))}`,
						method: 'DELETE',
					})
				)
		)
	} catch (e) {
		console.warn('[resumeRepo] 服务端删除失败，继续本地删除', e)
	}
	const repo = getResumeRepoList().filter(item => !idsToDelete.includes(Number(item.resume_id)));
	uni.setStorageSync(RESUME_REPO_KEY, repo);
}
