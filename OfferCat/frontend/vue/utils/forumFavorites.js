const STORAGE_KEY = 'forum_collected_posts_v1'

function getCurrentUserId() {
	const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
	return user.userId || user.id || ''
}

function readStore() {
	const raw = uni.getStorageSync(STORAGE_KEY)
	if (!raw || typeof raw !== 'object') return {}
	return raw
}

function writeStore(store) {
	uni.setStorageSync(STORAGE_KEY, store)
}

function normalizeImages(images) {
	if (!images) return ''
	if (typeof images === 'string') return images
	if (Array.isArray(images)) return JSON.stringify(images)
	return ''
}

function normalizeFavoritePost(post = {}, userId = '') {
	const postId = post.postId || post.id
	return {
		postId,
		id: postId,
		userId: post.userId || '',
		authorName: post.authorName || '',
		authorAvatar: post.authorAvatar || '',
		content: post.content || '',
		images: normalizeImages(post.images),
		grade: post.grade || post.authorGrade || post.graduationYear || '',
		major: post.major || post.authorMajor || '',
		createTime: post.createTime || '',
		views: Number(post.views != null ? post.views : post.viewCount || 0),
		viewCount: Number(post.views != null ? post.views : post.viewCount || 0),
		likeCount: Number(post.likeCount || 0),
		commentCount: Number(post.commentCount || 0),
		favoriteCount: Number(post.favoriteCount != null ? post.favoriteCount : post.collectCount || 0),
		isLiked: Boolean(post.isLiked),
		isCollected: true,
		favoritedAt: Date.now(),
		collectorUserId: userId || getCurrentUserId()
	}
}

export function getCollectedForumPosts(userId = '') {
	const resolvedUserId = userId || getCurrentUserId()
	if (!resolvedUserId) return []
	const store = readStore()
	const list = Array.isArray(store[resolvedUserId]) ? store[resolvedUserId] : []
	return list
		.filter(item => item && (item.postId || item.id))
		.sort((a, b) => Number(b.favoritedAt || 0) - Number(a.favoritedAt || 0))
}

export function upsertCollectedForumPost(post, userId = '') {
	const resolvedUserId = userId || getCurrentUserId()
	if (!resolvedUserId || !post) return
	const store = readStore()
	const currentList = Array.isArray(store[resolvedUserId]) ? store[resolvedUserId] : []
	const normalized = normalizeFavoritePost(post, resolvedUserId)
	const nextList = currentList.filter(item => String(item.postId || item.id) !== String(normalized.postId))
	nextList.unshift(normalized)
	store[resolvedUserId] = nextList
	writeStore(store)
}

export function removeCollectedForumPost(postId, userId = '') {
	const resolvedUserId = userId || getCurrentUserId()
	if (!resolvedUserId || !postId) return
	const store = readStore()
	const currentList = Array.isArray(store[resolvedUserId]) ? store[resolvedUserId] : []
	store[resolvedUserId] = currentList.filter(item => String(item.postId || item.id) !== String(postId))
	writeStore(store)
}

export function replaceCollectedForumPosts(posts = [], userId = '') {
	const resolvedUserId = userId || getCurrentUserId()
	if (!resolvedUserId) return
	const normalizedList = Array.isArray(posts)
		? posts
			.filter(item => item && (item.postId || item.id))
			.map(item => normalizeFavoritePost(item, resolvedUserId))
			.sort((a, b) => Number(b.favoritedAt || 0) - Number(a.favoritedAt || 0))
		: []
	const store = readStore()
	store[resolvedUserId] = normalizedList
	writeStore(store)
}
