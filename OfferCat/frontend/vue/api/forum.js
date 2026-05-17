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

export function getForumPostDetail(postId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/post/detail/${encodeURIComponent(String(postId))}`,
		method: 'GET',
	}))
}

export function likeForumPost(postId, userId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/post/like/${encodeURIComponent(String(postId))}`,
		method: 'POST',
		data: { userId },
	}))
}

export function unlikeForumPost(postId, userId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/post/unlike/${encodeURIComponent(String(postId))}`,
		method: 'POST',
		data: { userId },
	}))
}

export function getForumComments(postId) {
	return forumRequest((prefix) => ({
		url: `${prefix}/post/${encodeURIComponent(String(postId))}/comments`,
		method: 'GET',
	}))
}

export function addForumComment(payload) {
	return forumRequest((prefix) => ({
		url: `${prefix}/post/comment`,
		method: 'POST',
		data: payload,
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
	return forumRequest((prefix) => ({
		url: `${prefix}/post/delete/${encodeURIComponent(String(postId))}?userId=${encodeURIComponent(String(userId))}`,
		method: 'DELETE',
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
