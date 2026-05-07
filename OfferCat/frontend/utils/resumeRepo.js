const RESUME_REPO_KEY = 'resume_repo_records'
const MAX_RESUME_COUNT = 50

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

function normalizeResumeRecord(record = {}) {
	const timestamp = Number(record.timestamp || Date.now())
	const resumeId = Number(record.resume_id || record.resumeId || timestamp)
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
		student_id: Number(record.student_id || 0),
		resume_name: record.resume_name || '未命名简历',
		real_name: record.real_name || '',
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
		create_time: record.create_time || formatDateTime(timestamp),
		update_time: record.update_time || formatDateTime(timestamp),
		timestamp
	}
}

export function getResumeRepoList() {
	const records = uni.getStorageSync(RESUME_REPO_KEY)
	if (!Array.isArray(records)) {
		return []
	}
	return records.map(normalizeResumeRecord).sort((a, b) => b.timestamp - a.timestamp)
}

export function getResumeById(resumeId) {
	const id = Number(resumeId)
	if (!id) return null
	return getResumeRepoList().find(item => Number(item.resume_id) === id) || null
}

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

export function deleteResumes(resumeIds) {
	if (!Array.isArray(resumeIds)) {
		resumeIds = [resumeIds];
	}
	const idsToDelete = resumeIds.map(id => Number(id));
	const repo = getResumeRepoList().filter(item => !idsToDelete.includes(Number(item.resume_id)));
	uni.setStorageSync(RESUME_REPO_KEY, repo);
}
