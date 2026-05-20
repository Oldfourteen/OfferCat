<template>
	<view class="forum-detail-page" :class="themeClass">
		<view class="detail-overlay" :class="{ 'is-leaving': isLeaving }" @click="goBack"></view>
		<view class="detail-shell" :class="{ 'is-leaving': isLeaving }">
			<!-- 顶部导航栏 -->
			<view class="nav-bar">
				<view class="nav-left" @click="goBack">
					<text class="back-icon">‹</text>
				</view>
				<view class="nav-title-box">
					<text class="nav-title">帖子详情</text>
				</view>
				<view class="nav-right"></view>
			</view>

			<scroll-view class="detail-scroll" scroll-y :show-scrollbar="false" scroll-with-animation :scroll-into-view="scrollIntoView">
				<!-- 帖子正文块 -->
				<view class="post-card">
				<view class="author-info" @click="goToUserCard(post)">
					<image class="avatar" :src="getAvatar(post.authorAvatar, post.userId)" mode="aspectFill"></image>
					<view class="author-meta">
						<text class="name">{{ getAuthorName(post.authorName, post.userId) }}</text>
						<text class="profile-text" v-if="getAuthorProfileText(post)">{{ getAuthorProfileText(post) }}</text>
						<text class="time">{{ formatTime(post.createTime) }}</text>
					</view>
					<view class="delete-btn" v-if="isAuthor" @click.stop="deletePost">删除</view>
				</view>

				<view class="post-text text-wrap-safe">{{ post.content || '' }}</view>

				<!-- 图片展示区 -->
				<view class="post-images" :class="getImageLayoutClass(postImages)" v-if="postImages.length > 0">
					<view class="image-wrapper" v-for="(img, idx) in postImages" :key="idx" @click="previewImage(idx)">
						<image class="post-img" :src="getFullUrl(img)" :mode="postImages.length === 1 ? 'widthFix' : 'aspectFill'"></image>
					</view>
				</view>

				<view class="post-actions-line">
					<text class="view-count">浏览 {{ post.views || 0 }}</text>
					<view class="actions">
						<view class="action-btn" @click="likePost">
							<image class="icon-svg" :src="post.isLiked ? '/static/icons/like-active.svg' : '/static/icons/like.svg'"></image>
							<text class="count" :class="{ 'active-color': post.isLiked }">{{ post.likeCount || 0 }}</text>
						</view>
						<view class="action-btn" @click="scrollToComments">
							<image class="icon-svg" src="/static/icons/comment.svg"></image>
							<text class="count">{{ displayPostCommentCount }}</text>
						</view>
						<view class="action-btn" @click="toggleCollect">
							<image class="icon-svg" :src="post.isCollected ? '/static/icons/star-active.svg' : '/static/icons/star.svg'"></image>
							<text class="count" :class="{ 'collect-active-color': post.isCollected }">{{ post.favoriteCount || 0 }}</text>
						</view>
					</view>
				</view>
			</view>

				<!-- 评论区 -->
				<view class="comment-section" id="forum-detail-comment-anchor" :class="{ 'is-empty': comments.length === 0 }">
				<view class="comment-header">
					<text class="title">全部评论 {{ comments.length > 0 ? `(${comments.length})` : '' }}</text>
					<text class="sort-toggle-btn" @click="toggleCommentSortMode">{{ commentSortLabel }}</text>
				</view>
				
				<view class="empty-comment" v-if="comments.length === 0" :style="emptyCommentStyle">
					<text>暂无评论，快来抢沙发吧~</text>
				</view>

				<view class="comment-list" v-else>
					<view class="comment-item" v-for="item in sortedComments" :key="item.commentId">
						<image class="c-avatar" :src="getAvatar(item.authorAvatar, item.userId)" mode="aspectFill"></image>
						<view class="c-content">
							<view class="c-name-time">
								<text class="c-name">{{ getAuthorName(item.authorName, item.userId) }}</text>
								<text class="c-time">{{ formatTime(item.createTime) }}</text>
								<view class="delete-btn-mini" v-if="isCommentOwner(item)" @click.stop="deleteCommentConfirm(item)">删除</view>
							</view>
							<view class="expandable-text-block">
								<view class="c-text text-wrap-safe">{{ getDisplayText(item.content, getExpandKey('comment', item.commentId)) }}</view>
								<text class="expand-toggle" :style="expandToggleStyle" v-if="shouldShowExpand(item.content)" @click.stop="toggleExpanded(getExpandKey('comment', item.commentId))">
									{{ isExpanded(getExpandKey('comment', item.commentId)) ? '收起' : '展开' }}
								</text>
							</view>
							<view class="c-actions-row">
								<view class="reply-like-action" @click.stop="toggleCommentLike(item)">
									<image class="mini-like-icon" :src="isCommentLiked(item) ? '/static/icons/like-active.svg' : '/static/icons/like.svg'"></image>
									<text class="reply-like-count" :class="{ active: isCommentLiked(item) }">{{ getCommentLikeCount(item) }}</text>
								</view>
								<text class="reply-action" @click.stop="startReplyToComment(item)">回复</text>
							</view>
							<view class="reply-preview-card" v-if="getReplyCount(item) > 0" @click.stop="openReplyThread(item)">
								<view class="reply-preview-item" v-for="reply in getReplyPreview(item)" :key="getReplyId(reply)">
									<text class="reply-preview-line text-wrap-safe">
										<text class="reply-preview-name">{{ getAuthorName(reply.authorName, reply.userId) }}</text>
										<text v-if="getReplyTargetName(reply, item)"> 回复 {{ getReplyTargetName(reply, item) }}</text>
										：{{ reply.content }}
									</text>
								</view>
								<text class="reply-preview-more" v-if="getReplyCount(item) > 2">共 {{ getReplyCount(item) }} 条回复，点击查看全部</text>
							</view>
						</view>
					</view>
				</view>
				</view>
			</scroll-view>

			<view class="reply-sheet-mask" :class="{ 'is-closing': isReplySheetClosing }" v-if="activeReplyComment" @click="closeReplyThread"></view>
			<view class="reply-sheet" :class="{ dragging: isReplySheetDragging, 'is-closing': isReplySheetClosing }" :style="replySheetStyle" v-if="activeReplyComment">
				<view
					class="reply-sheet-drag-zone"
					@touchstart.stop.prevent="onReplySheetDragStart"
					@touchmove.stop.prevent="onReplySheetDragMove"
					@touchend.stop.prevent="onReplySheetDragEnd"
					@touchcancel.stop.prevent="onReplySheetDragEnd"
				>
					<view class="reply-sheet-handle"></view>
					<view class="reply-sheet-header">
						<view class="reply-sheet-actions">
							<text class="reply-sheet-close" @click="closeReplyThread">关闭</text>
						</view>
					</view>
				</view>
				<scroll-view class="reply-sheet-scroll" scroll-y :show-scrollbar="false">
					<view class="sheet-root-card">
						<view class="sheet-main-row">
							<image class="sheet-avatar" :src="getAvatar(activeReplyComment.authorAvatar, activeReplyComment.userId)" mode="aspectFill"></image>
							<view class="sheet-body">
								<view class="sheet-name-time">
									<text class="sheet-name">{{ getAuthorName(activeReplyComment.authorName, activeReplyComment.userId) }}</text>
									<text class="sheet-time">{{ formatTime(activeReplyComment.createTime) }}</text>
								</view>
								<view class="expandable-text-block">
									<view class="sheet-text text-wrap-safe">{{ getDisplayText(activeReplyComment.content, getExpandKey('sheet-root', activeReplyComment.commentId)) }}</view>
									<text class="expand-toggle" :style="expandToggleStyle" v-if="shouldShowExpand(activeReplyComment.content)" @click.stop="toggleExpanded(getExpandKey('sheet-root', activeReplyComment.commentId))">
										{{ isExpanded(getExpandKey('sheet-root', activeReplyComment.commentId)) ? '收起' : '展开' }}
									</text>
								</view>
								<view class="c-actions-row">
									<view class="reply-like-action" @click.stop="toggleCommentLike(activeReplyComment)">
										<image class="mini-like-icon" :src="isCommentLiked(activeReplyComment) ? '/static/icons/like-active.svg' : '/static/icons/like.svg'"></image>
										<text class="reply-like-count" :class="{ active: isCommentLiked(activeReplyComment) }">{{ getCommentLikeCount(activeReplyComment) }}</text>
									</view>
									<text class="reply-action" @click.stop="startReplyToComment(activeReplyComment, true)">回复</text>
								</view>
							</view>
						</view>
					</view>
					<view class="sheet-reply-wrap" v-if="getReplyCount(activeReplyComment) > 0">
						<view class="sheet-reply-section-head">
							<text class="sheet-reply-section-title">全部回复</text>
							<text class="reply-sheet-sort" @click="toggleReplySortMode">{{ replySortLabel }}</text>
						</view>
						<view class="sheet-reply-list">
						<view class="sheet-reply-item" v-for="reply in getSortedThreadReplies(activeReplyComment)" :key="getReplyId(reply)">
							<image class="sheet-avatar" :src="getAvatar(reply.authorAvatar, reply.userId)" mode="aspectFill"></image>
							<view class="sheet-body">
								<view class="sheet-name-time">
									<text class="sheet-name">{{ getAuthorName(reply.authorName, reply.userId) }}</text>
									<text class="sheet-time">{{ formatTime(reply.createTime) }}</text>
								</view>
								<view class="expandable-text-block">
									<view class="sheet-text text-wrap-safe">
										<text v-if="getReplyTargetName(reply, activeReplyComment)" class="sheet-target">回复 {{ getReplyTargetName(reply, activeReplyComment) }}：</text>{{ getDisplayText(reply.content, getExpandKey('sheet-reply', getReplyId(reply)), 45) }}
									</view>
									<text class="expand-toggle" :style="expandToggleStyle" v-if="shouldShowExpand(reply.content, 45)" @click.stop="toggleExpanded(getExpandKey('sheet-reply', getReplyId(reply)))">
										{{ isExpanded(getExpandKey('sheet-reply', getReplyId(reply))) ? '收起' : '展开' }}
									</text>
								</view>
								<view class="c-actions-row">
									<view class="reply-like-action" @click.stop="toggleCommentLike(reply, activeReplyComment)">
										<image class="mini-like-icon" :src="isCommentLiked(reply) ? '/static/icons/like-active.svg' : '/static/icons/like.svg'"></image>
										<text class="reply-like-count" :class="{ active: isCommentLiked(reply) }">{{ getCommentLikeCount(reply) }}</text>
									</view>
									<text class="reply-action" @click.stop="startReplyToReply(activeReplyComment, reply)">回复</text>
								</view>
							</view>
						</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 底部评论输入框 -->
			<view class="bottom-bar">
				<view class="replying-banner" v-if="replyContext">
					<text class="replying-label">回复 {{ replyContext.targetUserName }}</text>
					<text class="replying-cancel" @click="clearReplyContext">取消</text>
				</view>
				<view class="emoji-panel" v-if="showEmojiPanel">
					<view class="emoji-grid">
						<text
							class="emoji-item"
							v-for="emoji in emojiList"
							:key="emoji"
							@click="insertEmoji(emoji)"
						>{{ emoji }}</text>
					</view>
				</view>
				<view class="bottom-bar-row">
					<view class="emoji-trigger" @click="toggleEmojiPanel">
						<text class="emoji-trigger-icon">😀</text>
					</view>
					<input class="comment-input text-wrap-safe" type="text" :placeholder="commentPlaceholder" v-model="commentText" />
					<view class="send-btn" :class="{active: commentText.length > 0}" @click="sendComment">发送</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { BASE_URL } from '@/api/config.js'
	import {
		getForumPostDetail,
		getForumComments,
		addForumComment,
		likeForumPost,
		unlikeForumPost,
		deleteForumPost,
		recordForumPostView,
		collectForumPost,
		uncollectForumPost,
		deleteForumComment,
		likeForumComment,
		unlikeForumComment
	} from '@/api/forum.js'
	import themeMixin from '@/utils/themeMixin.js'
	import { checkContent, getRandomPoemPair } from '@/utils/sensitiveWords.js'
	import { syncForumPostViews } from '@/utils/forumViewCount.js'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				postId: null,
				post: {},
				postImages: [],
				comments: [],
				commentText: '',
				showEmojiPanel: false,
				emojiList: ['😀', '😁', '😂', '🤣', '😊', '😍', '🥰', '😘', '🤔', '😭', '😤', '🥳', '😎', '👍', '👏', '🙏', '❤️', '💯', '🎉', '✨'],
				replyContext: null,
				activeReplyCommentId: null,
				expandedTextMap: {},
				commentSortMode: 'heat',
				replySortMode: 'heat',
				replySheetDefaultHeight: 0,
				replySheetCurrentHeight: 0,
				replySheetMaxHeight: 0,
				replySheetCloseThreshold: 88,
				replySheetDragStartY: 0,
				replySheetDragStartHeight: 0,
				isReplySheetDragging: false,
				isReplySheetClosing: false,
				replySheetCloseTimer: null,
				replySheetTransitionMs: 240,
				isLeaving: false,
				viewRecorded: false,
				allowNativeBack: false,
				emptyCommentMinHeight: 0,
				scrollIntoView: ''
			}
		},
		computed: {
			isAuthor() {
				const user = uni.getStorageSync('user') || {}
				const currentUserId = user.userId || user.id
				return this.post && currentUserId && this.post.userId === currentUserId
			},
			activeReplyComment() {
				return this.findCommentById(this.activeReplyCommentId)
			},
			commentPlaceholder() {
				if (this.replyContext && this.replyContext.targetUserName) {
					return `回复 ${this.replyContext.targetUserName}...`
				}
				return '写下你的评论...'
			},
			commentSortLabel() {
				return this.commentSortMode === 'heat' ? '按热度' : '按时间'
			},
			replySortLabel() {
				return this.replySortMode === 'heat' ? '按热度' : '按时间'
			},
			replySheetStyle() {
				if (!this.replySheetCurrentHeight) {
					return {}
				}
				return {
					height: `${this.replySheetCurrentHeight}px`
				}
			},
			expandToggleStyle() {
				return this.isDarkMode
					? 'display:inline-block;margin-top:6rpx;font-size:20rpx;line-height:1.4;color:#8db6ff;font-weight:500;'
					: 'display:inline-block;margin-top:6rpx;font-size:20rpx;line-height:1.4;color:#3b82f6;font-weight:500;'
			},
			sortedComments() {
				return this.sortCommentList(this.comments, this.commentSortMode)
			},
			emptyCommentStyle() {
				if (!this.emptyCommentMinHeight) {
					return {}
				}
				return {
					minHeight: `${this.emptyCommentMinHeight}px`
				}
			},
			displayPostCommentCount() {
				const p = this.post || {}
				const fromPost = p.commentCount
				if (fromPost != null && fromPost !== '') return Number(fromPost) || 0
				return Array.isArray(this.comments) ? this.comments.length : 0
			}
		},
		onBackPress() {
			if (this.allowNativeBack) return false
			this.goBack()
			return true
		},
		onLoad(options) {
			console.log('detail onLoad options:', options)
			// 处理从不同地方跳转过来的不同参数名 (id 或 postId)
			const id = options.id || options.postId;
			if (id && id !== 'undefined' && id !== 'null') {
				this.postId = id
				const cachedPost = uni.getStorageSync('currentPost_' + id)
				if (cachedPost) {
					this.post = syncForumPostViews(Object.assign({}, cachedPost))
					this.parseImages()
				}
				this.loadPostDetail()
				this.loadComments()
			} else {
				console.error('没有获取到有效的帖子ID参数，当前 options:', options)
				uni.showToast({ title: '帖子参数错误', icon: 'none' })
			}
		},
		methods: {
			goBack() {
				if (this.isLeaving) return
				this.isLeaving = true
				setTimeout(() => {
					this.allowNativeBack = true
					uni.navigateBack({
						animationType: 'slide-out-right',
						animationDuration: 300
					})
				}, 240)
			},
			scrollToComments() {
				this.scrollIntoView = 'forum-detail-comment-anchor'
				this.$nextTick(() => {
					setTimeout(() => {
						this.scrollIntoView = ''
					}, 400)
				})
			},
			getViewerUserId() {
				const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const id = u.userId || u.id
				return id != null && id !== '' ? id : ''
			},
			async loadPostDetail() {
				const vu = this.getViewerUserId()
				try {
					const res = await getForumPostDetail(this.postId, vu || undefined)
					const raw = res && res.data
					if (raw) {
						const normalized = syncForumPostViews({
							...raw,
							views: Number(raw.views != null ? raw.views : raw.viewCount || 0),
							viewCount: Number(raw.views != null ? raw.views : raw.viewCount || 0),
							isLiked: Boolean(raw.isLiked),
							isCollected: Boolean(raw.isCollected),
							commentCount: Number(
								raw.commentCount != null ? raw.commentCount : raw.commentsCount || 0
							),
							favoriteCount: Number(
								raw.favoriteCount != null ? raw.favoriteCount : raw.collectCount || 0
							),
						})
						this.post = normalized
						this.parseImages()
						this.scheduleEmptyCommentMeasure()
						if (!this.viewRecorded) {
							this.viewRecorded = true
							try {
								await recordForumPostView(this.postId)
							} catch (_e) {}
						}
						return
					}
				} catch (_) {}
				
				if (!uni.getStorageSync('currentPost_' + this.postId)) {
					uni.showToast({ title: '帖子不存在或已被删除', icon: 'none' })
					setTimeout(() => this.goBack(), 1500)
				}
			},
			async loadComments() {
				const vu = this.getViewerUserId()
				try {
					const res = await getForumComments(this.postId, vu || undefined)
					const list = res && res.data
					if (Array.isArray(list)) {
						this.comments = this.normalizeComments(list)
						this.scheduleEmptyCommentMeasure()
						return
					}
				} catch (_) {}
				this.comments = []
				this.scheduleEmptyCommentMeasure()
			},
			scheduleEmptyCommentMeasure() {
				this.$nextTick(() => {
					this.updateEmptyCommentMinHeight()
					setTimeout(() => this.updateEmptyCommentMinHeight(), 80)
					setTimeout(() => this.updateEmptyCommentMinHeight(), 220)
				})
			},
			updateEmptyCommentMinHeight() {
				if (!this.comments || this.comments.length > 0) {
					this.emptyCommentMinHeight = 0
					return
				}
				const query = uni.createSelectorQuery().in(this)
				query.select('.detail-shell').boundingClientRect()
				query.select('.nav-bar').boundingClientRect()
				query.select('.post-card').boundingClientRect()
				query.select('.comment-header').boundingClientRect()
				query.select('.bottom-bar').boundingClientRect()
				query.exec((res) => {
					if (!Array.isArray(res) || res.length < 5) return
					const shellRect = res[0] || {}
					const navRect = res[1] || {}
					const postRect = res[2] || {}
					const headerRect = res[3] || {}
					const bottomRect = res[4] || {}
					const shellHeight = Number(shellRect.height || 0)
					const navHeight = Number(navRect.height || 0)
					const postHeight = Number(postRect.height || 0)
					const headerHeight = Number(headerRect.height || 0)
					const bottomHeight = Number(bottomRect.height || 0)
					const verticalPadding = 60
					const gapAllowance = 16
					const computedHeight = shellHeight - navHeight - postHeight - bottomHeight - headerHeight - verticalPadding - gapAllowance
					this.emptyCommentMinHeight = Math.max(220, Math.floor(computedHeight))
				})
			},
			goToUserCard(item) {
				if (!item) return
				const userId = item.userId || ''
				const name = this.getAuthorName(item.authorName, item.userId)
				const avatar = this.getAvatar(item.authorAvatar, item.userId)
				const grade = item.grade || item.authorGrade || item.graduationYear || ''
				const major = item.major || item.authorMajor || ''
				uni.navigateTo({
					url: `/subPages/userCard/userCard?userId=${encodeURIComponent(String(userId))}&name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}&grade=${encodeURIComponent(grade)}&major=${encodeURIComponent(major)}`
				})
			},
			getEntityId(item) {
				if (!item || typeof item !== 'object') return ''
				return item.commentId || item.replyId || item.id || ''
			},
			getCommentId(item) {
				return this.getEntityId(item)
			},
			getReplyId(item) {
				return this.getEntityId(item)
			},
			getExpandKey(type, id) {
				return `${type}_${id || 'default'}`
			},
			getTextVisualLength(text) {
				const normalized = String(text || '').replace(/\r/g, '')
				let total = 0
				for (const char of normalized) {
					if (char === '\n') {
						total += 0.8
						continue
					}
					if (/\s/.test(char)) {
						total += 0.35
						continue
					}
					if (/[a-zA-Z0-9]/.test(char)) {
						total += 0.55
						continue
					}
					if (/[,.!?:;'"`~\-_=+(){}\[\]\\/<>@#$%^&*|]/.test(char)) {
						total += 0.45
						continue
					}
					total += 1
				}
				return total
			},
			getTruncatedDisplayText(text, limit) {
				const normalized = String(text || '').replace(/\r/g, '')
				let total = 0
				let result = ''
				const ellipsisReserve = 2.2
				for (const char of normalized) {
					const nextTotal = total + this.getTextVisualLength(char)
					if (nextTotal > Math.max(0, limit - ellipsisReserve)) {
						break
					}
					result += char
					total = nextTotal
				}
				const trimmed = result.replace(/[\s,.;:!?"'，。；：、！？~～\-]+$/g, '')
				return `${trimmed || result}...`
			},
			shouldShowExpand(text, limit = 60) {
				if (!text) return false
				return this.getTextVisualLength(text) > limit
			},
			isExpanded(key) {
				return !!this.expandedTextMap[key]
			},
			getDisplayText(text, key, limit = 60) {
				const normalized = String(text || '').replace(/\r/g, '')
				if (!this.shouldShowExpand(normalized, limit) || this.isExpanded(key)) {
					return normalized
				}
				return this.getTruncatedDisplayText(normalized, limit)
			},
			toggleExpanded(key) {
				this.expandedTextMap = {
					...this.expandedTextMap,
					[key]: !this.expandedTextMap[key]
				}
			},
			collectReplyArrays(item) {
				if (!item || typeof item !== 'object') return []
				return [item.replies, item.replyList, item.children, item.childComments, item.replyComments]
					.filter(Array.isArray)
					.flat()
			},
			normalizeComments(rawList) {
				if (!Array.isArray(rawList)) return []
				const flat = []
				const visit = (item, inheritedRootId = null) => {
					if (!item || typeof item !== 'object') return
					const commentId = this.getEntityId(item)
					if (!commentId) return
					const normalized = {
						...item,
						commentId,
						parentCommentId: item.parentCommentId || item.parentId || inheritedRootId || null,
						replyToCommentId: item.replyToCommentId || item.replyId || item.replyToId || null,
						likeCount: Number(item.likeCount || item.likes || 0),
						isLiked: Boolean(item.isLiked),
						replies: []
					}
					flat.push(normalized)
					this.collectReplyArrays(item).forEach(child => {
						visit(child, normalized.parentCommentId || normalized.commentId)
					})
				}
				rawList.forEach(item => visit(item))
				const byId = new Map()
				flat.forEach(item => {
					byId.set(String(item.commentId), item)
				})
				const roots = []
				flat.forEach(item => {
					const rootId = item.parentCommentId ? String(item.parentCommentId) : ''
					if (rootId && byId.has(rootId) && rootId !== String(item.commentId)) {
						byId.get(rootId).replies.push(item)
					} else {
						roots.push(item)
					}
				})
				return roots
			},
			sortCommentList(list, sortMode = 'heat') {
				const cloned = Array.isArray(list) ? [...list] : []
				return cloned.sort((a, b) => {
					if (sortMode === 'heat') {
						const heatDiff = this.getCommentHeatScore(b) - this.getCommentHeatScore(a)
						if (heatDiff !== 0) return heatDiff
					}
					return this.getTimeValue(b.createTime) - this.getTimeValue(a.createTime)
				})
			},
			getCommentHeatScore(item) {
				if (!item) return 0
				return Number(item.likeCount || 0)
			},
			getTimeValue(timeValue) {
				if (!timeValue) return 0
				if (Array.isArray(timeValue)) {
					const [y, m, d, h = 0, min = 0, sec = 0] = timeValue
					return new Date(y, (m || 1) - 1, d || 1, h, min, sec).getTime()
				}
				if (typeof timeValue === 'string') {
					const normalized = timeValue.replace('T', ' ')
					const ts = new Date(normalized).getTime()
					return Number.isNaN(ts) ? 0 : ts
				}
				if (typeof timeValue === 'number') {
					return timeValue
				}
				return 0
			},
			findCommentById(commentId) {
				if (!commentId) return null
				return this.comments.find(item => String(item.commentId) === String(commentId)) || null
			},
			getThreadReplies(comment) {
				const current = this.findCommentById(this.getCommentId(comment))
				return current && Array.isArray(current.replies) ? current.replies : []
			},
			getSortedThreadReplies(comment) {
				return this.sortCommentList(this.getThreadReplies(comment), this.replySortMode)
			},
			getReplyCount(comment) {
				return this.getThreadReplies(comment).length
			},
			getReplyPreview(comment) {
				return this.getSortedThreadReplies(comment).slice(0, 2)
			},
			getReplyTargetName(reply, rootComment) {
				if (!reply) return ''
				if (reply.replyToUserName || reply.replyToAuthorName || reply.replyToName) {
					return reply.replyToUserName || reply.replyToAuthorName || reply.replyToName
				}
				if (reply.replyToCommentId) {
					const replyToId = String(reply.replyToCommentId)
					if (rootComment && String(this.getCommentId(rootComment)) === replyToId) {
						return this.getAuthorName(rootComment.authorName, rootComment.userId)
					}
					const replies = rootComment ? this.getThreadReplies(rootComment) : []
					const targetReply = replies.find(item => String(this.getReplyId(item)) === replyToId)
					if (targetReply) {
						return this.getAuthorName(targetReply.authorName, targetReply.userId)
					}
				}
				return ''
			},
			setupReplySheetMetrics(forceReset = false) {
				const systemInfo = uni.getSystemInfoSync ? uni.getSystemInfoSync() : {}
				const windowHeight = Number(systemInfo.windowHeight || 0)
				const windowWidth = Number(systemInfo.windowWidth || 375)
				const safeAreaBottom = Number((systemInfo.safeAreaInsets && systemInfo.safeAreaInsets.bottom) || 0)
				const rpxUnit = windowWidth / 750
				const bottomOffset = (124 * rpxUnit) + safeAreaBottom
				const defaultHeight = Math.round(windowHeight * 0.64)
				const maxHeight = Math.max(defaultHeight, Math.round(windowHeight - bottomOffset))
				this.replySheetDefaultHeight = defaultHeight
				this.replySheetMaxHeight = maxHeight
				if (forceReset || !this.replySheetCurrentHeight) {
					this.replySheetCurrentHeight = defaultHeight
				}
			},
			onReplySheetDragStart(event) {
				if (!this.activeReplyComment) return
				this.setupReplySheetMetrics()
				const touch = event.touches && event.touches[0]
				if (!touch) return
				this.isReplySheetDragging = true
				this.replySheetDragStartY = touch.clientY
				this.replySheetDragStartHeight = this.replySheetCurrentHeight || this.replySheetDefaultHeight
			},
			onReplySheetDragMove(event) {
				if (!this.isReplySheetDragging) return
				const touch = event.touches && event.touches[0]
				if (!touch) return
				const deltaY = touch.clientY - this.replySheetDragStartY
				const nextHeight = this.replySheetDragStartHeight - deltaY
				const minHeight = Math.max(0, this.replySheetDefaultHeight - this.replySheetCloseThreshold - 120)
				this.replySheetCurrentHeight = Math.min(this.replySheetMaxHeight, Math.max(minHeight, nextHeight))
			},
			onReplySheetDragEnd() {
				if (!this.isReplySheetDragging) return
				this.isReplySheetDragging = false
				if (this.replySheetCurrentHeight < this.replySheetDefaultHeight - this.replySheetCloseThreshold) {
					this.closeReplyThread()
					return
				}
				const midpoint = this.replySheetDefaultHeight + ((this.replySheetMaxHeight - this.replySheetDefaultHeight) / 2)
				this.replySheetCurrentHeight = this.replySheetCurrentHeight >= midpoint
					? this.replySheetMaxHeight
					: this.replySheetDefaultHeight
			},
			openReplyThread(comment) {
				if (this.getReplyCount(comment) === 0) return
				if (this.replySheetCloseTimer) {
					clearTimeout(this.replySheetCloseTimer)
					this.replySheetCloseTimer = null
				}
				this.isReplySheetClosing = false
				this.setupReplySheetMetrics(true)
				this.replyContext = this.buildRootReplyContext(comment)
				this.activeReplyCommentId = this.getCommentId(comment)
			},
			closeReplyThread() {
				if (!this.activeReplyComment || this.isReplySheetClosing) return
				this.isReplySheetDragging = false
				this.isReplySheetClosing = true
				this.showEmojiPanel = false
				this.replySheetCloseTimer = setTimeout(() => {
					this.activeReplyCommentId = null
					this.replyContext = null
					this.isReplySheetClosing = false
					this.replySheetCloseTimer = null
					this.replySheetCurrentHeight = this.replySheetDefaultHeight
				}, this.replySheetTransitionMs)
			},
			toggleEmojiPanel() {
				this.showEmojiPanel = !this.showEmojiPanel
			},
			insertEmoji(emoji) {
				this.commentText = `${this.commentText || ''}${emoji}`
			},
			buildRootReplyContext(comment) {
				if (!comment) return null
				return {
					rootCommentId: this.getCommentId(comment),
					targetCommentId: this.getCommentId(comment),
					targetUserId: comment.userId || '',
					targetUserName: this.getAuthorName(comment.authorName, comment.userId)
				}
			},
			resetReplyContextForActiveThread() {
				const activeComment = this.activeReplyComment
				this.replyContext = activeComment ? this.buildRootReplyContext(activeComment) : null
			},
			startReplyToComment(comment, keepThreadOpen = false) {
				this.replyContext = this.buildRootReplyContext(comment)
				if (keepThreadOpen) {
					this.activeReplyCommentId = this.getCommentId(comment)
				}
			},
			startReplyToReply(rootComment, reply) {
				this.replyContext = {
					rootCommentId: this.getCommentId(rootComment),
					targetCommentId: this.getCommentId(reply) || this.getReplyId(reply),
					targetUserId: reply.userId || '',
					targetUserName: this.getAuthorName(reply.authorName, reply.userId)
				}
				this.activeReplyCommentId = this.getCommentId(rootComment)
			},
			clearReplyContext() {
				if (this.activeReplyComment) {
					this.resetReplyContextForActiveThread()
					return
				}
				this.replyContext = null
			},
			toggleCommentSortMode() {
				this.commentSortMode = this.commentSortMode === 'heat' ? 'time' : 'heat'
			},
			toggleReplySortMode() {
				this.replySortMode = this.replySortMode === 'heat' ? 'time' : 'heat'
			},
			getCommentLikeCount(item) {
				return Number((item && item.likeCount) || 0)
			},
			isCommentLiked(item) {
				return Boolean(item && item.isLiked)
			},
			applyCommentLikeState(targetItem, nextLiked) {
				if (!targetItem) return
				targetItem.isLiked = nextLiked
				targetItem.likeCount = Math.max(0, Number(targetItem.likeCount || 0) + (nextLiked ? 1 : -1))
			},
			async toggleCommentLike(item) {
				if (!item) return
				const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = user.userId || user.id || user.studentId
				const cid = this.getCommentId(item)
				if (!uid) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}
				if (!cid || String(this.postId).startsWith('mock_')) {
					uni.showToast({ title: '评论点赞敬请期待', icon: 'none' })
					return
				}
				const nextLiked = !this.isCommentLiked(item)
				try {
					if (nextLiked) await likeForumComment(cid, uid)
					else await unlikeForumComment(cid, uid)
					this.applyCommentLikeState(item, nextLiked)
				} catch (e) {
					uni.showToast({ title: (e && e.message) || '操作失败', icon: 'none' })
				}
			},
			parseImages() {
				let imagesStr = this.post.images
				if (!imagesStr) {
					this.postImages = []
					return
				}
				try {
					let arr = JSON.parse(imagesStr)
					if (Array.isArray(arr)) {
						this.postImages = arr
						return
					}
				} catch (e) {}
				this.postImages = imagesStr.split(',').filter(s => s.trim())
			},
			getAvatar(avatar, postUserId) {
				const currentUser = uni.getStorageSync('user') || {}
				const currentUserId = currentUser.userId || currentUser.id
				
				// 如果是当前用户发的帖子/评论，直接用本地最新头像（无论后端是否返回）
				if (postUserId && currentUserId && postUserId === currentUserId) {
					let localAvatar = currentUser.avatar;
					if (currentUser.profile && currentUser.profile.avatar) {
						localAvatar = currentUser.profile.avatar;
					}
					if (localAvatar) {
						return this.getFullUrl(localAvatar)
					}
				}
				
				if (!avatar) return '/static/default-avatar.jpg'
				if (avatar.startsWith('http')) return avatar
				return BASE_URL + avatar
			},
			getAuthorName(name, postUserId) {
				const currentUser = uni.getStorageSync('user') || {}
				const currentUserId = currentUser.userId || currentUser.id
				
				// 如果是当前用户发的帖子/评论，直接用本地最新昵称
				if (postUserId && currentUserId && postUserId === currentUserId) {
					let localName = currentUser.nickname;
					if (currentUser.profile && currentUser.profile.nickname) {
						localName = currentUser.profile.nickname;
					}
					if (localName) {
						return localName
					}
				}
				return name || '匿名用户'
			},
			getAuthorProfileText(item) {
				const currentUser = uni.getStorageSync('user') || uni.getStorageSync('user_v2') || {}
				const currentUserId = currentUser.userId || currentUser.id
				const currentProfile = currentUser.profile || {}
				if (item.userId && currentUserId && item.userId === currentUserId) {
					const grade = currentProfile.grade || currentUser.grade || currentProfile.graduationYear || currentUser.graduationYear || ''
					const major = currentProfile.major || currentUser.major || ''
					return [grade, major].filter(Boolean).join(' · ')
				}
				const grade = item.grade || item.authorGrade || item.graduationYear || ''
				const major = item.major || item.authorMajor || ''
				return [grade, major].filter(Boolean).join(' · ')
			},
			getFullUrl(url) {
				if (!url) return ''
				if (url.startsWith('http') || url.startsWith('data:')) return url
				return BASE_URL + url
			},
			formatTime(timeStr) {
				if (!timeStr) return ''
				const targetTime = this.getTimeValue(timeStr)
				if (targetTime) {
					const diffMs = Date.now() - targetTime
					if (diffMs >= 0) {
						const minuteMs = 60 * 1000
						const hourMs = 60 * minuteMs
						const dayMs = 24 * hourMs
						if (diffMs < hourMs) {
							const minutes = Math.max(1, Math.floor(diffMs / minuteMs))
							return `${minutes}分钟前`
						}
						if (diffMs < dayMs) {
							const hours = Math.max(1, Math.floor(diffMs / hourMs))
							return `${hours}小时前`
						}
					}
				}
				if (typeof timeStr === 'string') {
					return timeStr.substring(0, 16).replace('T', ' ')
				}
				if (Array.isArray(timeStr)) {
					const [y, m, d, h, min] = timeStr
					const pad = n => (n < 10 ? '0' + n : n)
					return `${y}-${pad(m)}-${pad(d)} ${pad(h)}:${pad(min)}`
				}
				return String(timeStr)
			},
			previewImage(index) {
				let urls = this.postImages.map(img => this.getFullUrl(img))
				uni.previewImage({
					current: index,
					urls: urls
				})
			},
			getImageLayoutClass(images) {
				if (!images || images.length === 0) return '';
				if (images.length === 1) return 'layout-1';
				return 'layout-multi';
			},
			async toggleCollect() {
				const pid = this.post.postId || this.postId || this.post.id
				const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = user.userId || user.id
				if (!uid) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}
				const prevPost = JSON.parse(JSON.stringify(this.post || {}))
				const nextCol = !Boolean(this.post && this.post.isCollected)
				this.post = syncForumPostViews({
					...(this.post || {}),
					isCollected: nextCol,
					favoriteCount: Math.max(
						0,
						Number((this.post && this.post.favoriteCount) || 0) + (nextCol ? 1 : -1)
					),
				})
				try {
					if (nextCol) await collectForumPost(pid, uid)
					else await uncollectForumPost(pid, uid)
					uni.showToast({ title: nextCol ? '收藏成功' : '已取消收藏', icon: 'none' })
					uni.$emit('refreshForumList')
				} catch (e) {
					this.post = syncForumPostViews(prevPost)
					uni.showToast({ title: (e && e.message) || '操作失败', icon: 'none' })
				}
			},
			async likePost() {
				const user = uni.getStorageSync('user_v2') || {};
				const userId = user.userId || user.id;
				if (!userId) {
					uni.showToast({ title: '请先登录', icon: 'none' });
					return;
				}
				const prev = this.post
				const nextLiked = !Boolean(prev && prev.isLiked)
				this.post = syncForumPostViews({
					...(prev || {}),
					isLiked: nextLiked,
					likeCount: Math.max(0, Number((prev && prev.likeCount) || 0) + (nextLiked ? 1 : -1)),
				})
				try {
					if (nextLiked) {
						await likeForumPost(this.postId, userId)
					} else {
						await unlikeForumPost(this.postId, userId)
					}
					uni.showToast({ title: nextLiked ? '点赞成功' : '取消点赞', icon: 'none' });
					uni.$emit('refreshForumList')
				} catch (e) {
					this.post = prev
					uni.showToast({ title: (e && e.message) || '操作失败', icon: 'none' })
				}
			},
			deletePost() {
				uni.showModal({
					title: '提示',
					content: '确定要删除这条帖子吗？',
					success: (res) => {
						if (res.confirm) {
							const user = uni.getStorageSync('user') || {}
							const currentUserId = user.userId || user.id || 1
							;(async () => {
								try {
									await deleteForumPost(this.postId, currentUserId)
									uni.showToast({ title: '删除成功', icon: 'success' })
									uni.$emit('refresh')
									uni.$emit('refreshForumList')
									setTimeout(() => {
										this.goBack()
									}, 1500)
									return
								} catch (_) {}
								uni.showToast({ title: '删除失败', icon: 'none' })
							})()
						}
					}
				})
			},

			isCommentOwner(item) {
				const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const id = u.userId || u.id
				return !!(item && id != null && String(item.userId) === String(id))
			},

			deleteCommentConfirm(item) {
				const cid = this.getCommentId(item)
				const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = user.userId || user.id
				if (!cid || !uid) return
				const that = this
				uni.showModal({
					title: '删除评论',
					content: '确定删除这条评论吗？',
					success(res) {
						if (!res.confirm) return
						;(async () => {
							try {
								await deleteForumComment(cid, uid)
								await that.loadComments()
								await that.loadPostDetail()
								uni.showToast({ title: '已删除', icon: 'none' })
								uni.$emit('refreshForumList')
							} catch (e) {
								uni.showToast({ title: (e && e.message) || '删除失败', icon: 'none' })
							}
						})()
					},
				})
			},

			async sendComment() {
				if (!this.commentText.trim()) return

				const sensitiveResult = await checkContent(this.commentText)
				if (sensitiveResult.hasSensitive) {
					uni.showToast({ title: '内容包含敏感词，已自动替换为古诗', icon: 'none' })
					this.commentText = sensitiveResult.replacement || getRandomPoemPair()
				}

				// 修复：兼容本地 user_v2 缓存结构
				const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const userId = user.userId || user.id || user.studentId
				if (!userId) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}

				const currentReplyContext = this.replyContext
				const trimmed = String(this.commentText || '').trim()
				const payload = {
					postId: this.postId,
					userId: userId,
					content: trimmed,
					parentId: currentReplyContext ? Number(currentReplyContext.rootCommentId) || 0 : 0,
					mentionUserIds: [],
					replyToCommentId: currentReplyContext ? Number(currentReplyContext.targetCommentId) || null : null,
					replyToUserId: currentReplyContext ? currentReplyContext.targetUserId || null : null
				}
				if (currentReplyContext) {
					const rtc = Number(currentReplyContext.targetCommentId)
					if (rtc) payload.replyToCommentId = rtc
					const rtu = currentReplyContext.targetUserId
					if (rtu !== undefined && rtu !== null && rtu !== '')
						payload.replyToUserId = Number(rtu)
				}
				
				// 判断是 mock 数据还是真实接口
				if (String(this.postId).startsWith('mock_')) {
					uni.showToast({ title: '演示帖子不支持评论', icon: 'none' })
					return
				}

				const mockFallbackContent =
					currentReplyContext && currentReplyContext.targetUserName
						? `回复 ${currentReplyContext.targetUserName}：${trimmed}`
						: trimmed

				try {
					const res = await addForumComment(payload)
					
					// 兼容后端返回包装对象或直接返回数据的情况
					const isSuccess = (res && (res.code === 200 || res.code === 0)) || 
									  (res && typeof res === 'object' && res.commentId) ||
									  (res && typeof res === 'number')

					if (isSuccess || res == null) {
						this.commentText = ''
						this.showEmojiPanel = false
						await this.loadComments()
						await this.loadPostDetail()
						if (this.activeReplyCommentId) {
							this.resetReplyContextForActiveThread()
						} else {
							this.replyContext = null
						}
						uni.$emit('refreshForumList')
						uni.showToast({ title: currentReplyContext ? '回复成功' : '评论成功', icon: 'none' })
					} else {
						throw new Error(res ? (res.msg || res.message || '评论失败') : '评论失败')
					}
				} catch (e) {
					const errDetail = {
						message: e.message,
						statusCode: e.statusCode,
						bizCode: e.bizCode,
						requestUrl: e.requestUrl,
						forumAttemptLog: e.forumAttemptLog,
						response: e.response,
						cause: e.cause,
						stack: e.stack,
					}
					console.error('sendComment error detail:', JSON.stringify(errDetail, null, 2))
					uni.showToast({ title: e.message || '评论出错了，请检查日志', icon: 'none' })
				}
			}
		}
	}
</script>

<style lang="scss">
	.forum-detail-page {
		height: 100vh;
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		background: transparent;
		overflow: hidden;
	}

	.detail-overlay {
		position: absolute;
		inset: 0;
		background: rgba(15, 23, 42, 0.14);
		animation: detail-overlay-enter 260ms ease-out;
		will-change: opacity;

		&.is-leaving {
			animation: detail-overlay-leave 240ms ease-in forwards;
		}
	}

	.detail-shell {
		position: relative;
		z-index: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f6f6f6;
		box-shadow: 0 -12rpx 48rpx rgba(15, 23, 42, 0.18);
		animation: detail-shell-enter 260ms cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform, opacity;

		&.is-leaving {
			animation: detail-shell-leave 240ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
			pointer-events: none;
		}
	}

	@keyframes detail-overlay-enter {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes detail-overlay-leave {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes detail-shell-enter {
		from {
			transform: translateY(100%);
			opacity: 0.98;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes detail-shell-leave {
		from {
			transform: translateY(0);
			opacity: 1;
		}
		to {
			transform: translateY(100%);
			opacity: 0.98;
		}
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 20rpx) 30rpx 20rpx;
		background: #fff;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);

		.nav-left {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			.back-icon {
				font-size: 56rpx;
				color: #333;
				font-weight: 300;
				margin-top: -8rpx;
			}
		}

		.nav-title-box {
			flex: 1;
			display: flex;
			justify-content: center;
			.nav-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
		}
		
		.nav-right {
			width: 60rpx;
		}
	}

	.detail-scroll {
		flex: 1;
		min-height: 0;
	}

	.post-card {
		background: #fff;
		padding: 30rpx;
		margin-bottom: 16rpx;
		border-radius: 0;

		.author-info {
			display: flex;
			align-items: center;
			margin-bottom: 24rpx;

			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				display: block;
				flex-shrink: 0;
				background: #f0f0f0;
			}

			.author-meta {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.name {
					font-size: 30rpx;
					font-weight: bold;
					color: #333;
				}

				.profile-text {
					font-size: 22rpx;
					color: #999;
					margin-top: 4rpx;
				}

				.time {
					font-size: 24rpx;
					color: #999;
					margin-top: 6rpx;
				}
			}
			
			.delete-btn {
				font-size: 26rpx;
				color: #ff4d4f;
				border: 1rpx solid #ff4d4f;
				padding: 6rpx 24rpx;
				border-radius: 30rpx;
				font-weight: 500;
			}
		}

		.post-text {
			font-size: 32rpx;
			color: #333;
			line-height: 1.6;
			margin-bottom: 24rpx;
			display: block;
		}

	.expandable-text-block {
		margin-bottom: 8rpx;
	}

	.expand-toggle {
		display: inline-block;
		margin-top: 6rpx;
		font-size: 20rpx !important;
		line-height: 1.4;
		color: #3b82f6 !important;
		font-weight: 500;
	}

		.post-images {
			display: flex;
			flex-wrap: wrap;
			gap: 10rpx;
			margin-bottom: 30rpx;
			
			.image-wrapper {
				border-radius: 12rpx;
				overflow: hidden;
				background: #f8f8f8;
				
				.post-img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

			&.layout-1 {
				.image-wrapper {
					width: 70%;
					height: auto;
				}
			}

			&.layout-multi {
				.image-wrapper {
					width: calc((100% - 20rpx) / 3);
					height: 0;
					padding-bottom: calc((100% - 20rpx) / 3);
					position: relative;

					.post-img {
						position: absolute;
						top: 0;
						left: 0;
					}
				}
			}
		}

		.post-actions-line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 24rpx;
			border-top: 1rpx solid rgba(0,0,0,0.05);

			.view-count {
				font-size: 26rpx;
				color: #999;
			}

			.actions {
				display: flex;
				gap: 44rpx;

				.action-btn {
					display: flex;
					align-items: center;
					gap: 10rpx;

					.icon-svg {
						width: 48rpx;
						height: 48rpx;
					}

					.count {
						font-size: 28rpx;
						color: #999;
						
						&.active-color {
							color: rgb(250, 81, 81);
						}

						&.collect-active-color {
							color: rgb(255, 212, 59);
						}
					}
				}
			}
		}
	}

	.comment-section {
		background: #fff;
		padding: 30rpx;
		min-height: 500rpx;

		&.is-empty {
			min-height: 0;
		}

		.comment-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 40rpx;

			.title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333;
			}

			.sort-toggle-btn {
				padding: 8rpx 18rpx;
				border-radius: 999rpx;
				font-size: 21rpx;
				color: #7d89a3;
				background: #f5f7fb;
				font-weight: 500;
			}
		}

		.empty-comment {
			text-align: center;
			padding: 40rpx 0;
			color: #999;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.comment-list {
			.comment-item {
				display: flex;
				margin-bottom: 40rpx;

				.c-avatar {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					margin-right: 24rpx;
					display: block;
					flex-shrink: 0;
					background: #f0f0f0;
				}

				.c-content {
					flex: 1;
					display: flex;
					flex-direction: column;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.03);
					padding-bottom: 40rpx;

					.c-name-time {
						display: flex;
						flex-wrap: wrap;
						align-items: center;
						gap: 8rpx 12rpx;
						margin-bottom: 12rpx;

						.c-name {
							font-size: 28rpx;
							font-weight: bold;
							color: #333;
						}

						.c-time {
							font-size: 22rpx;
							color: #999;
						}

						.delete-btn-mini {
							margin-left: auto;
							font-size: 22rpx;
							color: #94a3b8;
						}
					}

					.c-text {
						font-size: 30rpx;
						color: #333;
						line-height: 1.5;
						display: block;
					}

					.c-actions-row {
						display: flex;
						align-items: center;
						gap: 24rpx;
						margin-top: 14rpx;
					}

					.reply-action {
						font-size: 24rpx;
						color: #5d76bd;
						font-weight: 500;
					}

					.reply-like-action {
						display: inline-flex;
						align-items: center;
						gap: 8rpx;
					}

					.mini-like-icon {
						width: 30rpx;
						height: 30rpx;
					}

					.reply-like-count {
						font-size: 23rpx;
						color: #8b95aa;
					}

					.reply-like-count.active {
						color: rgb(250, 81, 81);
						font-weight: 600;
					}

					.reply-preview-card {
						margin-top: 18rpx;
						padding: 18rpx 20rpx;
						border-radius: 18rpx;
						background: #f6f8fc;
					}

					.reply-preview-item + .reply-preview-item {
						margin-top: 10rpx;
					}

					.reply-preview-line {
						font-size: 25rpx;
						color: #5d6472;
						line-height: 1.5;
					}

					.reply-preview-name {
						color: #394a6d;
						font-weight: 600;
					}

					.reply-preview-more {
						display: block;
						margin-top: 12rpx;
						font-size: 23rpx;
						color: #7d8aa6;
					}
				}
				
				&:last-child .c-content {
					border-bottom: none;
					padding-bottom: 0;
				}
			}
		}
	}

	.bottom-bar {
		position: relative;
		z-index: 6;
		padding: 20rpx 30rpx calc(20rpx + env(safe-area-inset-bottom));
		background: #fff;
		border-top: 1rpx solid rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		gap: 16rpx;

		.replying-banner {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: 0 10rpx;
		}

		.replying-label {
			font-size: 24rpx;
			color: #5d76bd;
		}

		.replying-cancel {
			font-size: 24rpx;
			color: #999;
		}

		.bottom-bar-row {
			width: 100%;
			display: flex;
			align-items: center;
			gap: 20rpx;
		}

		.emoji-panel {
			width: 100%;
			padding: 18rpx 20rpx;
			border-radius: 24rpx;
			background: #f6f8fc;
			box-shadow: 0 8rpx 24rpx rgba(93, 118, 189, 0.12);
		}

		.emoji-grid {
			display: flex;
			flex-wrap: wrap;
			gap: 14rpx;
		}

		.emoji-item {
			width: 64rpx;
			height: 64rpx;
			border-radius: 18rpx;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 34rpx;
			line-height: 1;
		}

		.emoji-trigger {
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
			background: #f5f5f5;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		}

		.emoji-trigger-icon {
			font-size: 36rpx;
			line-height: 1;
		}

		.comment-input {
			flex: 1;
			height: 72rpx;
			background: #f5f5f5;
			border-radius: 36rpx;
			padding: 0 30rpx;
			font-size: 28rpx;
		}

		.send-btn {
			width: 120rpx;
			height: 72rpx;
			border-radius: 36rpx;
			background: #e0e0e0;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-weight: bold;
			transition: all 0.3s;

			&.active {
				background: #5d76bd;
			}
		}
	}

	.c-actions-row {
		display: flex;
		align-items: center;
		gap: 24rpx;
		margin-top: 14rpx;
		flex-wrap: wrap;
	}

	.reply-action {
		font-size: 24rpx;
		color: #5d76bd;
		font-weight: 500;
	}

	.reply-like-action {
		display: inline-flex;
		align-items: center;
		gap: 8rpx;
		flex-shrink: 0;
	}

	.mini-like-icon {
		width: 30rpx;
		height: 30rpx;
		min-width: 30rpx;
		min-height: 30rpx;
		display: block;
		opacity: 0.9;
	}

	.reply-like-count {
		font-size: 23rpx;
		color: #8b95aa;
		line-height: 1;
	}

	.reply-like-count.active {
		color: rgb(250, 81, 81);
		font-weight: 600;
	}

	.reply-sheet-mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: calc(124rpx + env(safe-area-inset-bottom));
		z-index: 4;
		background: rgba(15, 23, 42, 0.24);
		animation: reply-sheet-mask-enter 240ms ease-out;
	}

	.reply-sheet-mask.is-closing {
		animation: reply-sheet-mask-leave 220ms ease-in forwards;
	}

	.reply-sheet {
		position: absolute;
		left: 0;
		right: 0;
		bottom: calc(124rpx + env(safe-area-inset-bottom));
		z-index: 5;
		background: #fff;
		border-radius: 28rpx 28rpx 0 0;
		padding: 18rpx 24rpx calc(24rpx + env(safe-area-inset-bottom));
		box-shadow: 0 -12rpx 36rpx rgba(15, 23, 42, 0.18);
		height: 64vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: height 220ms ease;
		animation: reply-sheet-enter 260ms cubic-bezier(0.22, 1, 0.36, 1);
		transform-origin: bottom center;
		will-change: transform, opacity;
	}

	.reply-sheet.dragging {
		transition: none;
	}

	.reply-sheet.is-closing {
		animation: reply-sheet-leave 220ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
		pointer-events: none;
	}

	.reply-sheet-drag-zone {
		flex-shrink: 0;
	}

	@keyframes reply-sheet-mask-enter {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes reply-sheet-mask-leave {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes reply-sheet-enter {
		from {
			transform: translateY(100%);
			opacity: 0.92;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes reply-sheet-leave {
		from {
			transform: translateY(0);
			opacity: 1;
		}
		to {
			transform: translateY(100%);
			opacity: 0.92;
		}
	}

	.reply-sheet-handle {
		width: 72rpx;
		height: 8rpx;
		border-radius: 999rpx;
		background: rgba(0, 0, 0, 0.12);
		margin: 0 auto 18rpx;
	}

	.reply-sheet-header {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 6rpx 18rpx;
	}

	.reply-sheet-actions {
		display: flex;
		align-items: center;
		gap: 18rpx;
	}

	.reply-sheet-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
	}

	.reply-sheet-close {
		font-size: 26rpx;
		color: #999;
	}

	.reply-sheet-sort {
		padding: 8rpx 18rpx;
		border-radius: 999rpx;
		font-size: 21rpx;
		color: #7d89a3;
		background: #f5f7fb;
		font-weight: 500;
	}

	.reply-sheet-scroll {
		flex: 1;
		min-height: 0;
	}

	.sheet-root-card {
		padding: 18rpx 0 24rpx;
		border-bottom: 6rpx solid rgba(0, 0, 0, 0.12);
	}

	.sheet-reply-wrap {
		margin-top: 18rpx;
		padding: 8rpx 0 0;
	}

	.sheet-main-row {
		display: flex;
		align-items: flex-start;
		padding: 0 6rpx;
	}

	.sheet-reply-item {
		display: flex;
		align-items: flex-start;
	}

	.sheet-reply-section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;
		padding: 0 4rpx 8rpx;
	}

	.sheet-reply-section-title {
		font-size: 24rpx;
		font-weight: 600;
		color: #4d5b79;
	}

	.sheet-reply-item {
		padding: 20rpx 6rpx;
	}

	.sheet-reply-list .sheet-reply-item + .sheet-reply-item {
		border-top: 1rpx solid rgba(0, 0, 0, 0.04);
	}

	.sheet-avatar {
		width: 58rpx;
		height: 58rpx;
		border-radius: 50%;
		margin-right: 18rpx;
		background: #f0f0f0;
		flex-shrink: 0;
	}

	.sheet-body {
		flex: 1;
	}

	.sheet-name-time {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16rpx;
		margin-bottom: 10rpx;
	}

	.sheet-name {
		flex: 1;
		min-width: 0;
		font-size: 27rpx;
		font-weight: 600;
		color: #333;
		line-height: 1.4;
	}

	.sheet-time {
		flex-shrink: 0;
		font-size: 22rpx;
		color: #999;
		line-height: 1.4;
		text-align: right;
	}

	.sheet-text {
		display: block;
		font-size: 28rpx;
		color: #333;
		line-height: 1.55;
	}

	.sheet-target {
		color: #5d76bd;
	}

	/* Dark Theme */
	.theme-dark {
		&.forum-detail-page {
			background: transparent;
		}

		.detail-overlay {
			background: rgba(0, 0, 0, 0.32);
		}
		
		.detail-shell {
			background: #111216;
			box-shadow: 0 -12rpx 48rpx rgba(0, 0, 0, 0.38);
		}
		
		.nav-bar {
			background: #111216;
			border-bottom: 1rpx solid rgba(255, 255, 255, 0.05);

			.nav-left {
				.back-icon { color: #eef2f8; }
			}
			.nav-title { color: #f4f7fb; }
		}

		.post-card, .comment-section {
			background: #17191f;
		}

		.post-card {
			.author-meta {
				.name { color: #eef2f8; }
				.time-row {
					.time { color: #66758f; }
					.tag { background: #23252b; color: #8090ad; }
				}
			}
			.post-text { color: #e8ecf4; }
			.expand-toggle { color: #8db6ff !important; }
			
			.post-images .image-wrapper {
				background: #23252b;
				.post-img { opacity: 0.9; }
			}

			.post-actions-line { 
				border-top-color: rgba(255, 255, 255, 0.05); 
				.view-count { color: rgba(255, 255, 255, 0.62); }
				.actions .action-btn {
					.count { color: #8090ad; }
					.count.active-color { color: rgb(250, 81, 81); }
					.count.collect-active-color { color: rgb(255, 212, 59); }
				}
			}
		}

		.comment-section {
			.comment-header {
				.title { color: #eef2f8; }
				.sort-toggle-btn {
					background: #232834;
					color: #8c98ad;
				}
			}
			.empty-comment { color: #66758f; }
			.comment-list .comment-item .c-content {
				border-bottom-color: rgba(255, 255, 255, 0.03);
				.c-name-time {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					gap: 8rpx 12rpx;
					margin-bottom: 12rpx;
					.c-name { color: #eef2f8; }
					.c-time { color: #66758f; }
					.delete-btn-mini {
						margin-left: auto;
						font-size: 22rpx;
						color: #8090ad;
					}
				}
				.c-text { color: #d1d8e5; }
				.reply-preview-card { background: #232834; }
				.reply-preview-line { color: #aeb8ca; }
				.reply-preview-name,
				.reply-action { color: #8da4e6; }
				.reply-preview-more { color: #8090ad; }
				.reply-like-count { color: #7d8798; }
				.reply-like-count.active { color: rgb(250, 81, 81); }
			}
		}

		.reply-action { color: #8da4e6; }
		.reply-like-count { color: #7d8798; }
		.reply-like-count.active { color: rgb(250, 81, 81); }

		.bottom-bar {
			background: #17191f;
			border-top-color: rgba(255, 255, 255, 0.05);
			.emoji-panel {
				background: #20242d;
				box-shadow: none;
			}
			.emoji-item {
				background: #2a2f39;
			}
			.emoji-trigger {
				background: #23252b;
				border: 1rpx solid rgba(255, 255, 255, 0.05);
			}
			.comment-input {
				background: #23252b;
				color: #f4f7fb;
				border: 1rpx solid rgba(255, 255, 255, 0.05);
			}
			.send-btn {
				background: #2a2c33;
				color: #66758f;
				&.active {
					background: #5d76bd;
					color: #fff;
				}
			}
			.replying-label { color: #8da4e6; }
			.replying-cancel { color: #8090ad; }
		}

		.reply-sheet {
			background: #17191f;
			box-shadow: 0 -12rpx 36rpx rgba(0, 0, 0, 0.38);
		}

		.reply-sheet-title { color: #eef2f8; }
		.reply-sheet-sort {
			background: #232834;
			color: #8c98ad;
		}
		.sheet-root-card {
			border-bottom-color: rgba(255, 255, 255, 0.05);
		}
		.sheet-reply-section-title { color: #dfe8fb; }
		.sheet-reply-section-meta { color: #8c98ad; }
		.sheet-reply-list .sheet-reply-item + .sheet-reply-item {
			border-top-color: rgba(255, 255, 255, 0.05);
		}
		.sheet-name { color: #eef2f8; }
		.sheet-time { color: #66758f; }
		.sheet-text { color: #d1d8e5; }

		.reply-sheet-mask {
			background: rgba(0, 0, 0, 0.34);
		}

		.reply-sheet-handle {
			background: rgba(255, 255, 255, 0.14);
		}

		.reply-sheet-title,
		.sheet-name,
		.sheet-text {
			color: #eef2f8;
		}

		.reply-sheet-close,
		.sheet-time {
			color: #8090ad;
		}

		.sheet-root-card,
		.sheet-reply-list .sheet-reply-item + .sheet-reply-item {
			border-color: rgba(255, 255, 255, 0.05);
		}

		.sheet-target {
			color: #8da4e6;
		}
	}

	/* 部分运行时下正文仍为 #333（view/text 节点样式继承差异），用页面根抬高优先级 */
	.forum-detail-page.theme-dark .post-card .post-text {
		color: #e8ecf4;
	}

	.forum-detail-page.theme-dark .post-card .post-actions-line .view-count {
		color: rgba(255, 255, 255, 0.62);
	}
</style>
