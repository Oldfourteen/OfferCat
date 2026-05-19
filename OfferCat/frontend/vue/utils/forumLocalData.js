const POSTS_KEY = 'forum_mock_posts_v1'
const COMMENTS_KEY = 'forum_mock_comments_v1'
const REPLY_INBOX_READ_KEY = 'forum_reply_inbox_read_keys_v1'
const DEFAULT_PAGE_SIZE = 3

function getCurrentUser() {
	const user = uni.getStorageSync('user') || uni.getStorageSync('user_v2') || {}
	const profile = user.profile || {}
	return {
		userId: String(user.userId || user.id || 'local_user'),
		authorName: profile.nickname || user.nickname || '你自己',
		authorAvatar: profile.avatar || user.avatar || '',
		grade: profile.grade || user.grade || profile.graduationYear || user.graduationYear || '大三',
		major: profile.major || user.major || '软件工程'
	}
}

function getNowTime() {
	const now = new Date()
	const pad = (value) => String(value).padStart(2, '0')
	return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
}

function getTimeValue(timeValue) {
	if (!timeValue) return 0
	if (Array.isArray(timeValue)) {
		const [y, m, d, h = 0, min = 0, sec = 0] = timeValue
		return new Date(y, (m || 1) - 1, d || 1, h, min, sec).getTime()
	}
	if (typeof timeValue === 'number') return timeValue
	const ts = new Date(String(timeValue).replace('T', ' ')).getTime()
	return Number.isNaN(ts) ? 0 : ts
}

function createReply(data) {
	return {
		commentId: data.commentId,
		userId: data.userId,
		authorName: data.authorName,
		authorAvatar: data.authorAvatar,
		grade: data.grade,
		major: data.major,
		content: data.content,
		createTime: data.createTime,
		parentCommentId: data.parentCommentId || null,
		replyToCommentId: data.replyToCommentId || null,
		replyToUserId: data.replyToUserId || null,
		replyToUserName: data.replyToUserName || '',
		likeCount: Number(data.likeCount || 0),
		isLiked: Boolean(data.isLiked)
	}
}

function createRootComment(data) {
	return {
		commentId: data.commentId,
		userId: data.userId,
		authorName: data.authorName,
		authorAvatar: data.authorAvatar,
		grade: data.grade,
		major: data.major,
		content: data.content,
		createTime: data.createTime,
		likeCount: Number(data.likeCount || 0),
		isLiked: Boolean(data.isLiked),
		replies: Array.isArray(data.replies) ? data.replies.map(reply => createReply(reply)) : []
	}
}

function buildSeedPosts() {
	const currentUser = getCurrentUser()
	return [
		{
			postId: 'mock_1',
			id: 'mock_1',
			userId: 'user_001',
			authorName: 'Wind',
			grade: '大三',
			major: '软件工程',
			authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
			createTime: '2026-05-13 10:30',
			content: '又麻烦大家帮我做选择了，这次的疑问是，我想抽扣扣酱，但是又看到这次传说级手办制作很棒，导致我很犹豫，从今天到15号我算了下大概能攒多少资源，大家觉得哪个更划算一点呢？求建议！',
			images: '["https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"]',
			views: 7640,
			commentCount: 2,
			likeCount: 3,
			favoriteCount: 1,
			isLiked: false,
			isCollected: false
		},
		{
			postId: 'mock_2',
			id: 'mock_2',
			userId: 'user_002',
			authorName: '(ฅωฅ)',
			grade: '大二',
			major: '数字媒体技术',
			authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mia',
			createTime: '2026-05-12 18:45',
			content: '雷霆*忧郁小猫不让我睡觉，还不让我发游戏，我要曝光你。每天晚上都在我键盘上跑酷，真的是太调皮了！哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
			images: '["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80"]',
			views: 3201,
			commentCount: 1,
			likeCount: 102,
			favoriteCount: 8,
			isLiked: true,
			isCollected: true
		},
		{
			postId: 'mock_3',
			id: 'mock_3',
			userId: currentUser.userId,
			authorName: currentUser.authorName,
			grade: currentUser.grade,
			major: currentUser.major,
			authorAvatar: currentUser.authorAvatar,
			createTime: '2026-05-14 09:20',
			content: '这是本地论坛自测帖。你可以在这个帖子里验证评论、回复盖楼、点赞、收藏、删除和搜索，不依赖后端也能完整走通。',
			images: '',
			views: 256,
			commentCount: 0,
			likeCount: 12,
			favoriteCount: 2,
			isLiked: false,
			isCollected: false
		}
	]
}

function buildSeedComments() {
	const currentUser = getCurrentUser()
	return {
		mock_1: [
			createRootComment({
				commentId: 'c_1001',
				userId: 'user_003',
				authorName: '小鱼',
				authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna',
				grade: '大四',
				major: '电子信息',
				content: '我觉得如果你平时更常用主 C，就优先抽角色；如果收藏党就选手办。',
				createTime: '2026-05-13 11:10',
				likeCount: 6,
				replies: [
					createReply({
						commentId: 'r_1001',
						userId: currentUser.userId,
						authorName: currentUser.authorName,
						authorAvatar: currentUser.authorAvatar,
						grade: currentUser.grade,
						major: currentUser.major,
						content: '我也是这么想的，但是这次手办质感真的很顶。',
						createTime: '2026-05-13 11:18',
						parentCommentId: 'c_1001',
						replyToCommentId: 'c_1001',
						replyToUserId: 'user_003',
						replyToUserName: '小鱼',
						likeCount: 2
					}),
					createReply({
						commentId: 'r_1002',
						userId: 'user_004',
						authorName: '阿青',
						authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Kai',
						grade: '研一',
						major: '计算机科学',
						content: '如果只是强度党，其实等复刻会更稳一点。',
						createTime: '2026-05-13 11:21',
						parentCommentId: 'c_1001',
						replyToCommentId: 'r_1001',
						replyToUserId: currentUser.userId,
						replyToUserName: currentUser.authorName,
						likeCount: 4
					}),
					createReply({
						commentId: 'r_1003',
						userId: 'user_005',
						authorName: '一只松果',
						authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nora',
						grade: '大二',
						major: '材料工程',
						content: '建议先看你这期预算，别两边都不够。',
						createTime: '2026-05-13 11:25',
						parentCommentId: 'c_1001',
						replyToCommentId: 'c_1001',
						replyToUserId: 'user_003',
						replyToUserName: '小鱼',
						likeCount: 1
					})
				]
			}),
			createRootComment({
				commentId: 'c_1002',
				userId: 'user_006',
				authorName: '橘子汽水',
				authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Rose',
				grade: '大一',
				major: '汉语言文学',
				content: '手办真的好看，但角色可能更保值一点，看你想要实用还是收藏。',
				createTime: '2026-05-13 12:00',
				likeCount: 3
			})
		],
		mock_2: [
			createRootComment({
				commentId: 'c_2001',
				userId: 'user_007',
				authorName: '月亮邮差',
				authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Skye',
				grade: '大三',
				major: '新闻传播',
				content: '这只猫一看就很有主意，建议立刻发更多照片。',
				createTime: '2026-05-12 19:10',
				likeCount: 9
			})
		],
		mock_3: []
	}
}

function clone(value) {
	return JSON.parse(JSON.stringify(value))
}

function readPosts() {
	const posts = uni.getStorageSync(POSTS_KEY)
	if (Array.isArray(posts) && posts.length) {
		return posts
	}
	const seed = buildSeedPosts()
	uni.setStorageSync(POSTS_KEY, seed)
	return seed
}

function writePosts(posts) {
	uni.setStorageSync(POSTS_KEY, posts)
}

function readCommentsMap() {
	const comments = uni.getStorageSync(COMMENTS_KEY)
	if (comments && typeof comments === 'object' && Object.keys(comments).length) {
		return comments
	}
	const seed = buildSeedComments()
	uni.setStorageSync(COMMENTS_KEY, seed)
	return seed
}

function writeCommentsMap(map) {
	uni.setStorageSync(COMMENTS_KEY, map)
}

function getPostIndex(posts, postId) {
	return posts.findIndex(item => String(item.postId || item.id) === String(postId))
}

function getFavoriteStorageList() {
	return uni.getStorageSync('favorites') || []
}

function syncFavoriteStorage(posts) {
	const favorites = getFavoriteStorageList()
	const forumIds = new Set(
		favorites
			.filter(item => item && item.isForumPost)
			.map(item => String(item.id))
	)
	return posts.map(post => ({
		...post,
		isCollected: forumIds.has(String(post.postId || post.id)),
		favoriteCount: Number(post.favoriteCount || 0)
	}))
}

function ensureData() {
	const posts = syncFavoriteStorage(readPosts())
	writePosts(posts)
	const commentsMap = readCommentsMap()
	return {
		posts,
		commentsMap
	}
}

function sortPosts(list, currentTab = 0) {
	const cloned = [...list]
	if (currentTab === 1) {
		return cloned
			.filter(item => {
				const views = Number(item.views || 0)
				const likes = Number(item.likeCount || 0)
				const favorites = Number(item.favoriteCount || 0)
				return views > 50 || likes > 20 || favorites > 20
			})
			.sort((a, b) => {
			const heatB = Number(b.likeCount || 0) + Number(b.commentCount || 0) + Number(b.favoriteCount || 0)
			const heatA = Number(a.likeCount || 0) + Number(a.commentCount || 0) + Number(a.favoriteCount || 0)
			if (heatB !== heatA) return heatB - heatA
			return getTimeValue(b.createTime) - getTimeValue(a.createTime)
			})
	}
	return cloned.sort((a, b) => getTimeValue(b.createTime) - getTimeValue(a.createTime))
}

function buildFavoriteRecord(post) {
	const plainText = post.content ? post.content.replace(/<[^>]+>/g, '') : '分享内容'
	const title = plainText.length > 12 ? plainText.substring(0, 12) + '...' : plainText
	const images = parseImages(post.images)
	return {
		id: post.postId,
		isForumPost: true,
		type: '论坛',
		title,
		image: images[0] || post.authorAvatar || '/static/default-avatar.jpg',
		user_avatar: post.authorAvatar,
		user_name: post.authorName,
		time: post.createTime,
		place: '小程序论坛',
		desc: post.content,
		create_time: new Date().getTime()
	}
}

function parseImages(images) {
	if (!images) return []
	if (Array.isArray(images)) return images
	try {
		const arr = JSON.parse(images)
		return Array.isArray(arr) ? arr : []
	} catch (err) {
		return String(images).split(',').map(item => item.trim()).filter(Boolean)
	}
}

function updateCommentCount(posts, commentsMap, postId) {
	const index = getPostIndex(posts, postId)
	if (index === -1) return
	const commentCount = (commentsMap[postId] || []).reduce((sum, item) => sum + 1 + ((item.replies || []).length), 0)
	posts[index].commentCount = commentCount
}

export function getForumMockPosts(options = {}) {
	const { posts } = ensureData()
	const currentTab = Number(options.currentTab || 0)
	const pageNum = Number(options.pageNum || 1)
	const pageSize = Number(options.pageSize || DEFAULT_PAGE_SIZE)
	const keyword = String(options.keyword || '').trim().toLowerCase()
	let list = sortPosts(posts, currentTab)
	if (keyword) {
		list = list.filter(item => {
			const bucket = [
				item.content,
				item.authorName,
				item.major,
				item.grade
			].join(' ').toLowerCase()
			return bucket.includes(keyword)
		})
	}
	const total = list.length
	const pages = Math.max(1, Math.ceil(total / pageSize))
	const start = (pageNum - 1) * pageSize
	const records = list.slice(start, start + pageSize)
	return {
		records: clone(records),
		total,
		pages
	}
}

export function getForumMockPostDetail(postId) {
	const { posts } = ensureData()
	const target = posts.find(item => String(item.postId || item.id) === String(postId))
	return target ? clone(target) : null
}

export function getForumMockComments(postId) {
	const { commentsMap } = ensureData()
	return clone(commentsMap[postId] || [])
}

export function toggleForumMockPostLike(postId) {
	const { posts } = ensureData()
	const index = getPostIndex(posts, postId)
	if (index === -1) return null
	const target = posts[index]
	target.isLiked = !target.isLiked
	target.likeCount = Math.max(0, Number(target.likeCount || 0) + (target.isLiked ? 1 : -1))
	writePosts(posts)
	uni.setStorageSync(`currentPost_${postId}`, target)
	return clone(target)
}

export function toggleForumMockPostCollect(postId) {
	const { posts } = ensureData()
	const index = getPostIndex(posts, postId)
	if (index === -1) return null
	const target = posts[index]
	target.isCollected = !target.isCollected
	target.favoriteCount = Math.max(0, Number(target.favoriteCount || 0) + (target.isCollected ? 1 : -1))
	let favorites = getFavoriteStorageList()
	if (target.isCollected) {
		favorites = favorites.filter(item => !(item && item.isForumPost && String(item.id) === String(postId)))
		favorites.unshift(buildFavoriteRecord(target))
	} else {
		favorites = favorites.filter(item => !(item && item.isForumPost && String(item.id) === String(postId)))
	}
	uni.setStorageSync('favorites', favorites)
	writePosts(posts)
	uni.setStorageSync(`currentPost_${postId}`, target)
	return clone(target)
}

export function toggleForumMockCommentLike(postId, commentId) {
	const { commentsMap } = ensureData()
	const roots = commentsMap[postId] || []
	let found = null
	roots.forEach(root => {
		if (String(root.commentId) === String(commentId)) {
			found = root
			return
		}
		;(root.replies || []).forEach(reply => {
			if (String(reply.commentId) === String(commentId)) {
				found = reply
			}
		})
	})
	if (!found) return null
	found.isLiked = !found.isLiked
	found.likeCount = Math.max(0, Number(found.likeCount || 0) + (found.isLiked ? 1 : -1))
	writeCommentsMap(commentsMap)
	return clone(found)
}

export function createForumMockComment(payload) {
	const { posts, commentsMap } = ensureData()
	const postId = String(payload.postId)
	const currentUser = getCurrentUser()
	const roots = commentsMap[postId] || []
	const content = String(payload.content || '').trim()
	if (!content) return null
	const commentId = `local_comment_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
	if (payload.parentCommentId) {
		const root = roots.find(item => String(item.commentId) === String(payload.parentCommentId))
		if (!root) return null
		root.replies.push(createReply({
			commentId,
			userId: String(payload.userId || currentUser.userId),
			authorName: currentUser.authorName,
			authorAvatar: currentUser.authorAvatar,
			grade: currentUser.grade,
			major: currentUser.major,
			content,
			createTime: getNowTime(),
			parentCommentId: String(payload.parentCommentId),
			replyToCommentId: payload.replyToCommentId ? String(payload.replyToCommentId) : String(payload.parentCommentId),
			replyToUserId: payload.replyToUserId ? String(payload.replyToUserId) : String(root.userId || ''),
			replyToUserName: resolveReplyToName(root, payload.replyToCommentId),
			likeCount: 0,
			isLiked: false
		}))
	} else {
		roots.unshift(createRootComment({
			commentId,
			userId: String(payload.userId || currentUser.userId),
			authorName: currentUser.authorName,
			authorAvatar: currentUser.authorAvatar,
			grade: currentUser.grade,
			major: currentUser.major,
			content,
			createTime: getNowTime(),
			likeCount: 0,
			isLiked: false,
			replies: []
		}))
	}
	commentsMap[postId] = roots
	updateCommentCount(posts, commentsMap, postId)
	writeCommentsMap(commentsMap)
	writePosts(posts)
	return clone(commentsMap[postId])
}

function resolveReplyToName(rootComment, replyToCommentId) {
	if (!rootComment) return ''
	if (!replyToCommentId || String(replyToCommentId) === String(rootComment.commentId)) {
		return rootComment.authorName || '匿名用户'
	}
	const reply = (rootComment.replies || []).find(item => String(item.commentId) === String(replyToCommentId))
	return reply ? (reply.authorName || '匿名用户') : (rootComment.authorName || '匿名用户')
}

export function createForumMockPost(payload) {
	const { posts, commentsMap } = ensureData()
	const currentUser = getCurrentUser()
	const postId = `mock_${Date.now()}`
	const images = Array.isArray(payload.images) ? payload.images : []
	const post = {
		postId,
		id: postId,
		userId: String(payload.userId || currentUser.userId),
		authorName: currentUser.authorName,
		grade: currentUser.grade,
		major: currentUser.major,
		authorAvatar: currentUser.authorAvatar,
		createTime: getNowTime(),
		content: payload.content,
		images: JSON.stringify(images),
		views: 0,
		commentCount: 0,
		likeCount: 0,
		favoriteCount: 0,
		isLiked: false,
		isCollected: false,
		title: payload.title || ''
	}
	posts.unshift(post)
	commentsMap[postId] = []
	writePosts(posts)
	writeCommentsMap(commentsMap)
	uni.setStorageSync(`currentPost_${postId}`, post)
	return clone(post)
}

export function deleteForumMockPost(postId, userId) {
	const { posts, commentsMap } = ensureData()
	const index = getPostIndex(posts, postId)
	if (index === -1) return false
	const target = posts[index]
	if (String(target.userId) !== String(userId)) return false
	posts.splice(index, 1)
	delete commentsMap[postId]
	writePosts(posts)
	writeCommentsMap(commentsMap)
	uni.removeStorageSync(`currentPost_${postId}`)
	let favorites = getFavoriteStorageList()
	favorites = favorites.filter(item => !(item && item.isForumPost && String(item.id) === String(postId)))
	uni.setStorageSync('favorites', favorites)
	return true
}

export function searchForumMockPosts(keyword) {
	const normalized = String(keyword || '').trim().toLowerCase()
	const { records } = getForumMockPosts({
		keyword: normalized,
		pageNum: 1,
		pageSize: 1000,
		currentTab: 0
	})
	return records
}

function buildPostPreview(content) {
	const text = String(content || '').replace(/\s+/g, ' ').trim()
	if (!text) return '帖子内容暂不可用'
	return text.length > 28 ? `${text.slice(0, 28)}...` : text
}

function includesMention(content, userName) {
	const text = String(content || '').trim()
	const name = String(userName || '').trim()
	if (!text || !name) return false
	return text.includes(`@${name}`) || text.includes(`＠${name}`)
}

function pushInboxItem(items, seen, payload) {
	const uniqueKey = `${payload.postId}_${payload.commentId}_${payload.type}`
	if (seen.has(uniqueKey)) return
	seen.add(uniqueKey)
	items.push({
		...payload,
		inboxKey: uniqueKey
	})
}

export function getForumMockReplyInbox() {
	const { posts, commentsMap } = ensureData()
	const currentUser = getCurrentUser()
	const currentUserId = String(currentUser.userId || '')
	const currentUserName = currentUser.authorName || ''
	const ownPostIds = new Set(
		posts
			.filter(post => String(post.userId || '') === currentUserId)
			.map(post => String(post.postId || post.id || ''))
	)
	const items = []
	const seen = new Set()

	posts.forEach(post => {
		const postId = String(post.postId || post.id || '')
		const roots = commentsMap[postId] || []
		roots.forEach(root => {
			if (String(root.userId || '') !== currentUserId) {
				const rootMention = includesMention(root.content, currentUserName)
				if (ownPostIds.has(postId) || rootMention) {
					pushInboxItem(items, seen, {
						type: rootMention ? 'mention' : 'reply',
						actionText: rootMention ? '@ 了你' : '回复了你的帖子',
						postId,
						postPreview: buildPostPreview(post.content),
						postAuthorId: String(post.userId || ''),
						commentId: String(root.commentId || ''),
						rootCommentId: String(root.commentId || ''),
						userId: String(root.userId || ''),
						authorName: root.authorName || '匿名用户',
						authorAvatar: root.authorAvatar || '',
						grade: root.grade || '',
						major: root.major || '',
						content: root.content || '',
						createTime: root.createTime
					})
				}
			}

			;(root.replies || []).forEach(reply => {
				if (String(reply.userId || '') === currentUserId) return
				const replyToCurrentUser = String(reply.replyToUserId || '') === currentUserId
				const mentionCurrentUser = replyToCurrentUser || includesMention(reply.content, currentUserName)
				const repliesToYourComment = String(root.userId || '') === currentUserId
				const relatedToYou = ownPostIds.has(postId) || repliesToYourComment || mentionCurrentUser
				if (!relatedToYou) return

				const type = mentionCurrentUser ? 'mention' : 'reply'
				let actionText = '@ 了你'
				if (type === 'reply') {
					actionText = ownPostIds.has(postId) && !repliesToYourComment ? '回复了你的帖子' : '回复了你'
				}

				pushInboxItem(items, seen, {
					type,
					actionText,
					postId,
					postPreview: buildPostPreview(post.content),
					postAuthorId: String(post.userId || ''),
					commentId: String(reply.commentId || ''),
					rootCommentId: String(reply.parentCommentId || root.commentId || ''),
					userId: String(reply.userId || ''),
					authorName: reply.authorName || '匿名用户',
					authorAvatar: reply.authorAvatar || '',
					grade: reply.grade || '',
					major: reply.major || '',
					content: reply.content || '',
					createTime: reply.createTime,
					replyToUserId: String(reply.replyToUserId || ''),
					replyToUserName: reply.replyToUserName || ''
				})
			})
		})
	})

	return items.sort((a, b) => getTimeValue(b.createTime) - getTimeValue(a.createTime))
}

function readReplyInboxReadKeys() {
	const stored = uni.getStorageSync(REPLY_INBOX_READ_KEY)
	return Array.isArray(stored) ? stored : []
}

function writeReplyInboxReadKeys(keys) {
	uni.setStorageSync(REPLY_INBOX_READ_KEY, Array.from(new Set(keys.filter(Boolean))))
}

export function getForumMockReplyInboxUnreadCount() {
	const items = getForumMockReplyInbox()
	const readKeys = new Set(readReplyInboxReadKeys())
	return items.filter(item => !readKeys.has(item.inboxKey)).length
}

export function markForumMockReplyInboxRead() {
	const items = getForumMockReplyInbox()
	const readKeys = new Set(readReplyInboxReadKeys())
	items.forEach(item => {
		if (item && item.inboxKey) {
			readKeys.add(item.inboxKey)
		}
	})
	writeReplyInboxReadKeys(Array.from(readKeys))
}

export function syncForumMockPostCache(post) {
	if (!post) return
	uni.setStorageSync(`currentPost_${post.postId || post.id}`, post)
}

export function hydrateForumMockData() {
	return ensureData()
}
