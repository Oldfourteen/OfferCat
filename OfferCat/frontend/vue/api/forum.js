import { request } from './request'
import { getApiBase } from './config'
import { getToken } from '@/utils/token'

const FORUM_PREFIXES = ['/api/forum', '/forum']

function isHttpNotFound(err) {
	if (!err) return false
	if (err.statusCode === 404 || err.bizCode === 404) return true
	const m = String(err.message || '')
	return /^\s*Not Found\b/i.test(m) || /\b404\b/i.test(m)
}

async function forumRequest(buildOptions) {
	const base = getApiBase()
	const attemptLog = []
	let lastErr
	for (const prefix of FORUM_PREFIXES) {
		const opts = buildOptions(prefix)
		const fullUrl = `${base}${opts.url}`
		try {
			return await request(opts)
		} catch (e) {
			lastErr = e
			attemptLog.push({
				path: opts.url,
				fullUrl: (e && e.requestUrl) || fullUrl,
				statusCode: e && e.statusCode,
				bizCode: e && e.bizCode,
			})
			if (isHttpNotFound(e) && prefix !== FORUM_PREFIXES[FORUM_PREFIXES.length - 1]) {
				continue
			}
			const err = e instanceof Error ? e : new Error(String(e))
			err.forumAttemptLog = attemptLog
			throw err
		}
	}
	if (lastErr instanceof Error) {
		lastErr.forumAttemptLog = attemptLog
	}
	throw lastErr
}

export function searchForumPosts(payload) {
	return forumRequest((prefix) => ({
		url: `${prefix}/post/search`,
		method: 'POST',
		data: payload,
	}))
}

export function getForumPostDetail(postId, viewerUserId) {
	if (String(postId).startsWith('mock_')) return Promise.reject(new Error('Mock post'))
	let q = ''
	if (viewerUserId != null && viewerUserId !== '') {
		q = `?viewerUserId=${encodeURIComponent(String(viewerUserId))}`
	}
	return forumRequest((prefix) => ({
		url: `${prefix}/post/detail/${encodeURIComponent(String(postId))}${q}`,
		method: 'GET',
	}))
}

export function recordForumPostView(postId) {
	if (!postId || String(postId).startsWith('mock_')) return Promise.resolve({ data: null })
	return forumRequest((prefix) => ({
		url: `${prefix}/post/view/${encodeURIComponent(String(postId))}`,
		method: 'POST',
	}))
}

export function likeForumPost(postId, userId) {
	if (String(postId).startsWith('mock_')) return Promise.resolve({ data: null })
	return forumRequest((prefix) => ({
		url: `${prefix}/post/like/${encodeURIComponent(String(postId))}`,
		method: 'POST',
		data: { userId },
	}))
}

export function unlikeForumPost(postId, userId) {
	if (String(postId).startsWith('mock_')) return Promise.resolve({ data: null })
	return forumRequest((prefix) => ({
		url: `${prefix}/post/unlike/${encodeURIComponent(String(postId))}`,
		method: 'POST',
		data: { userId },
	}))
}

export function collectForumPost(postId, userId) {
	if (String(postId).startsWith('mock_')) return Promise.resolve({ data: null })
	return forumRequest((prefix) => ({
		url: `${prefix}/post/collect/${encodeURIComponent(String(postId))}`,
		method: 'POST',
		data: { userId },
	}))
}

export function uncollectForumPost(postId, userId) {
	if (String(postId).startsWith('mock_')) return Promise.resolve({ data: null })
	return forumRequest((prefix) => ({
		url: `${prefix}/post/uncollect/${encodeURIComponent(String(postId))}`,
		method: 'POST',
		data: { userId },
	}))
}

export function getForumComments(postId, viewerUserId) {
	if (String(postId).startsWith('mock_')) return Promise.reject(new Error('Mock post'))
	let q = ''
	if (viewerUserId != null && viewerUserId !== '') {
		q = `?viewerUserId=${encodeURIComponent(String(viewerUserId))}`
	}
	return forumRequest((prefix) => ({
		url: `${prefix}/post/${encodeURIComponent(String(postId))}/comments${q}`,
		method: 'GET',
	}))
}

export function addForumComment(payload) {
	if (String(payload.postId).startsWith('mock_')) return Promise.resolve({ data: null })
	return forumRequest((prefix) => ({
		url: `${prefix}/post/comment`,
		method: 'POST',
		data: payload,
	}))
}

export function deleteForumComment(commentId, userId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/post/comment/${encodeURIComponent(String(commentId))}?userId=${encodeURIComponent(String(userId))}`,
		method: 'DELETE',
	}))
}

export function likeForumComment(commentId, userId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/post/comment/like/${encodeURIComponent(String(commentId))}`,
		method: 'POST',
		data: { userId },
	}))
}

export function unlikeForumComment(commentId, userId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/post/comment/unlike/${encodeURIComponent(String(commentId))}`,
		method: 'POST',
		data: { userId },
	}))
}

export function createForumPost(payload) {
	return forumRequest((prefix) => ({
		url: `${prefix}/post/create`,
		method: 'POST',
		data: payload,
	}))
}

export function deleteForumPost(postId, userId) {
	if (String(postId).startsWith('mock_')) return Promise.resolve({ data: null })
	return forumRequest((prefix) => ({
		url: `${prefix}/post/delete/${encodeURIComponent(String(postId))}?userId=${encodeURIComponent(String(userId))}`,
		method: 'DELETE',
	}))
}

export function getForumUnreadCounts(userId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/message/unread-counts?userId=${encodeURIComponent(String(userId))}`,
		method: 'GET',
	}))
}

export function forumMarkMessagesRead(payload) {
	return forumRequest((prefix) => ({
		url: `${prefix}/message/mark-read`,
		method: 'POST',
		data: payload,
	}))
}

export function getForumLikesInbox(userId, pageNum = 1, pageSize = 50) {
	return forumRequest((prefix) => ({
		url: `${prefix}/message/likes-inbox?userId=${encodeURIComponent(String(userId))}&pageNum=${encodeURIComponent(pageNum)}&pageSize=${encodeURIComponent(pageSize)}`,
		method: 'GET',
	}))
}

export function getForumRepliesInbox(userId, pageNum = 1, pageSize = 50) {
	return forumRequest((prefix) => ({
		url: `${prefix}/message/replies-inbox?userId=${encodeURIComponent(String(userId))}&pageNum=${encodeURIComponent(pageNum)}&pageSize=${encodeURIComponent(pageSize)}`,
		method: 'GET',
	}))
}

export function sendForumFriendRequest(fromUserId, toUserId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/friend/request`,
		method: 'POST',
		data: { fromUserId, toUserId },
	}))
}

export function respondForumFriendRequest(requestId, userId, accept) {
	return forumRequest((prefix) => ({
		url: `${prefix}/friend/respond`,
		method: 'POST',
		data: { requestId, userId, accept },
	}))
}

export function getForumIncomingFriendRequests(userId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/friend/incoming?userId=${encodeURIComponent(String(userId))}`,
		method: 'GET',
	}))
}

export function getForumAcceptedFriends(userId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/friend/accepted?userId=${encodeURIComponent(String(userId))}`,
		method: 'GET',
	}))
}

export function uploadForumImage(filePath) {
	const base = getApiBase()
	const token = getToken()
	const header = {
		Accept: 'application/json',
	}
	if (token) {
		header['Authorization'] = `Bearer ${token}`
	}
	const candidates = FORUM_PREFIXES.map((prefix) => `${base}${prefix}/post/uploadImage`)
	let lastErr
	const runOnce = (uploadUrl) =>
		new Promise((resolve, reject) => {
			uni.uploadFile({
				url: uploadUrl,
				filePath,
				name: 'file',
				header,
				success: (res) => {
					const ok = res.statusCode >= 200 && res.statusCode < 300
					if (!ok) {
						const err = new Error(`图片上传失败（HTTP ${res.statusCode}）`)
						err.statusCode = res.statusCode
						err.response = res
						reject(err)
						return
					}
					let body = res.data
					if (typeof body === 'string') {
						try {
							body = JSON.parse(body)
						} catch (_) {}
					}
					if (body && typeof body === 'object' && body.code !== undefined && body.code !== null) {
						const bizCode = typeof body.code === 'string' ? Number(body.code) : body.code
						if (bizCode !== 0 && bizCode !== 200) {
							reject(new Error(String(body.msg || body.message || '图片上传失败')))
							return
						}
						resolve(body.data)
						return
					}
					resolve(body)
				},
				fail: (e) => {
					reject(e instanceof Error ? e : new Error(String((e && (e.errMsg || e.message)) || '图片上传失败')))
				},
			})
		})
	return (async () => {
		for (const url of candidates) {
			try {
				return await runOnce(url)
			} catch (e) {
				lastErr = e
			}
		}
		throw lastErr || new Error('图片上传失败')
	})()
}
