const STORAGE_KEY = 'forum_post_view_counts'

function toSafeViewCount(value) {
	const count = Number(value)
	if (!Number.isFinite(count) || count < 0) return 0
	return Math.floor(count)
}

function getStoredViewCountMap() {
	const stored = uni.getStorageSync(STORAGE_KEY)
	if (!stored || typeof stored !== 'object') {
		return {}
	}
	return stored
}

function getPostId(post) {
	if (!post || typeof post !== 'object') return ''
	return String(post.postId || post.id || '')
}

export function getForumViewCount(postId, fallback = 0) {
	const normalizedId = String(postId || '')
	const fallbackCount = toSafeViewCount(fallback)
	if (!normalizedId) return fallbackCount

	const storedMap = getStoredViewCountMap()
	if (!Object.prototype.hasOwnProperty.call(storedMap, normalizedId)) {
		return fallbackCount
	}

	return Math.max(fallbackCount, toSafeViewCount(storedMap[normalizedId]))
}

export function syncForumPostViews(post) {
	if (!post || typeof post !== 'object') return post

	const postId = getPostId(post)
	const baseCount = post.views != null ? post.views : post.viewCount
	const resolvedCount = getForumViewCount(postId, baseCount)

	return {
		...post,
		views: resolvedCount,
		viewCount: resolvedCount
	}
}

export function syncForumPostsViews(posts = []) {
	if (!Array.isArray(posts)) return []
	return posts.map(post => syncForumPostViews(post))
}

export function incrementForumViewCount(post) {
	const postId = getPostId(post)
	const currentCount = getForumViewCount(postId, post && (post.views != null ? post.views : post.viewCount))
	const nextCount = currentCount + 1

	if (postId) {
		const storedMap = getStoredViewCountMap()
		storedMap[postId] = nextCount
		uni.setStorageSync(STORAGE_KEY, storedMap)
	}

	if (!post || typeof post !== 'object') {
		return nextCount
	}

	return {
		...post,
		views: nextCount,
		viewCount: nextCount
	}
}
