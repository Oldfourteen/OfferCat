<template>
	<view class="user-card-page" :class="[themeClass, { 'is-leaving': isLeaving }]">
		<view class="page-header">
			<view class="header-inner">
				<view class="header-side header-left">
					<view class="back-btn" @click="goBack">
						<image class="back-icon-img" src="/static/icons/chevron-left.svg" mode="aspectFit" />
					</view>
				</view>
				<text class="header-title">个人主页</text>
				<view class="header-side header-right">
					<view v-if="shouldShowSelfMenu" class="menu-btn" @click="openSelfMenu">
						<view class="menu-dots">
							<view class="menu-dot"></view>
							<view class="menu-dot"></view>
							<view class="menu-dot"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<scroll-view class="page-scroll" scroll-y :show-scrollbar="false">
			<view class="header-placeholder"></view>

			<view class="profile-card" :style="profileCardStyle">
				<view class="profile-decor profile-decor-a"></view>
				<view class="profile-decor profile-decor-b"></view>
				<view class="profile-content">
					<view class="avatar-shell">
						<CommonAvatar
							:src="displayAvatar"
							image-class="profile-avatar"
							:sync-profile="isSelf"
						/>
					</view>
					<text class="profile-name">{{ displayName }}</text>
					<text class="profile-meta" v-if="profileSummary">{{ profileSummary }}</text>
					<text class="profile-bio" v-if="profileBio">{{ profileBio }}</text>
					<view class="profile-actions" v-if="!isSelf && targetUserId">
						<view
							class="profile-action-btn primary"
							:class="{ disabled: isPrimaryActionDisabled }"
							@click="handlePrimaryFriendAction"
						>
							{{ primaryActionText }}
						</view>
						<view class="profile-action-btn ghost" @click="goPrivateChat">发私信</view>
					</view>
				</view>
			</view>

			<view class="posts-section">
				<view class="section-header">
					<text class="section-title">{{ isSelf ? '我发过的帖子' : 'TA 发过的帖子' }}</text>
					<text class="section-count">{{ userPosts.length }} 篇</text>
				</view>

				<view class="post-list" v-if="userPosts.length > 0">
					<view
						class="post-card"
						v-for="item in userPosts"
						:key="item.postId || item.id"
						@click="goToDetail(item)"
					>
						<view class="post-card-header">
							<text class="post-time">{{ formatTime(item.createTime) }}</text>
							<text class="post-views">浏览 {{ item.views || 0 }}</text>
						</view>

						<text class="post-content">{{ item.content || '' }}</text>

						<view
							class="post-images"
							:class="getImageLayoutClass(getImagesList(item.images))"
							v-if="getImagesList(item.images).length > 0"
						>
							<view
								class="image-wrapper"
								v-for="(img, index) in getImagesList(item.images).slice(0, 3)"
								:key="`${item.postId || item.id}_${index}`"
							>
								<image
									class="post-img"
									:src="getFullUrl(img)"
									:mode="getImagesList(item.images).length === 1 ? 'widthFix' : 'aspectFill'"
								></image>
								<view
									class="more-images-badge"
									v-if="index === 2 && getImagesList(item.images).length > 3"
								>
									<text class="more-text">+{{ getImagesList(item.images).length - 3 }}</text>
								</view>
							</view>
						</view>

						<view class="post-footer">
							<text class="post-stat">点赞 {{ item.likeCount || 0 }}</text>
							<text class="post-stat">评论 {{ item.commentCount || 0 }}</text>
							<text class="post-stat">收藏 {{ item.favoriteCount || 0 }}</text>
						</view>
					</view>
				</view>

				<view class="empty-state" v-else>
					<view class="empty-title">{{ isSelf ? '你还没有发布帖子' : 'TA 还没有发布帖子' }}</view>
					<view class="empty-subtitle">去论坛发一条动态，主页这里就会自动展示。</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import CommonAvatar from '@/components/CommonAvatar.vue'
	import { BASE_URL } from '@/api/config.js'
	import { getUser } from '@/utils/user.js'
	import { getUserProfile, saveUserProfile, DEFAULT_AVATAR } from '@/utils/userProfile.js'
	import {
		searchForumPosts,
		sendForumFriendRequest,
		respondForumFriendRequest,
		getForumFriendRelationStatus,
	} from '@/api/forum.js'
	import { syncForumPostsViews } from '@/utils/forumViewCount.js'

	const CARD_BACKGROUND_PRESETS = [
		{
			key: 'ocean',
			label: '海盐蓝',
			background: 'linear-gradient(140deg, rgba(125, 176, 255, 0.95) 0%, rgba(77, 113, 231, 0.92) 55%, rgba(80, 164, 255, 0.88) 100%)'
		},
		{
			key: 'violet',
			label: '星云紫',
			background: 'linear-gradient(145deg, rgba(157, 128, 255, 0.96) 0%, rgba(103, 93, 234, 0.92) 48%, rgba(93, 152, 255, 0.86) 100%)'
		},
		{
			key: 'sunset',
			label: '落日橙',
			background: 'linear-gradient(145deg, rgba(255, 184, 115, 0.96) 0%, rgba(255, 125, 98, 0.92) 52%, rgba(255, 98, 141, 0.88) 100%)'
		},
		{
			key: 'forest',
			label: '青森绿',
			background: 'linear-gradient(145deg, rgba(95, 208, 178, 0.95) 0%, rgba(56, 160, 170, 0.92) 50%, rgba(66, 132, 214, 0.88) 100%)'
		}
	]

	export default {
		mixins: [themeMixin],
		components: {
			CommonAvatar
		},
		data() {
			return {
				targetUserId: '',
				profileName: '',
				profileAvatar: '',
				profileGrade: '',
				profileMajor: '',
				profileBio: '',
				cardBackgroundKey: 'ocean',
				friendRelationStatus: 'none',
				friendRelationRequestId: '',
				isFriendStatusLoading: false,
				isFriendActionLoading: false,
				userPosts: [],
				isLeaving: false,
				allowNativeBack: false,
				pageTransitionMs: 260,
				hasExplicitTargetUserId: false
			}
		},
		computed: {
			currentUserId() {
				const user = getUser() || uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				return String(user.userId || user.id || '')
			},
			isSelf() {
				return this.targetUserId && this.currentUserId && this.targetUserId === this.currentUserId
			},
			shouldShowSelfMenu() {
				if (!this.currentUserId) return false
				if (!this.hasExplicitTargetUserId) return true
				return this.isSelf
			},
			displayName() {
				return this.profileName || (this.isSelf ? '我自己' : '匿名用户')
			},
			displayAvatar() {
				return this.profileAvatar || DEFAULT_AVATAR
			},
			profileSummary() {
				return [this.profileGrade, this.profileMajor].filter(Boolean).join(' · ')
			},
			profileCardStyle() {
				const preset = CARD_BACKGROUND_PRESETS.find(item => item.key === this.cardBackgroundKey) || CARD_BACKGROUND_PRESETS[0]
				return {
					background: preset.background
				}
			},
			primaryActionText() {
				if (this.isFriendActionLoading) return '处理中...'
				if (this.isFriendStatusLoading) return '加载中...'
				switch (this.friendRelationStatus) {
					case 'accepted':
						return '已是好友'
					case 'outgoing_pending':
						return '已申请'
					case 'incoming_pending':
						return '通过申请'
					default:
						return '加好友'
				}
			},
			isPrimaryActionDisabled() {
				if (this.isFriendActionLoading || this.isFriendStatusLoading) return true
				return this.friendRelationStatus === 'accepted' || this.friendRelationStatus === 'outgoing_pending'
			}
		},
		onLoad(options) {
			this.hasExplicitTargetUserId = Boolean(options.userId)
			this.targetUserId = String(options.userId || this.currentUserId || '')
			this.profileName = decodeURIComponent(options.name || '')
			this.profileAvatar = decodeURIComponent(options.avatar || '')
			this.profileGrade = decodeURIComponent(options.grade || '')
			this.profileMajor = decodeURIComponent(options.major || '')
			this.loadPageData()
		},
		onShow() {
			this.loadPageData()
		},
		onBackPress() {
			if (this.allowNativeBack) return false
			this.goBack()
			return true
		},
		created() {
			uni.$on('refreshForumList', this.loadPageData)
			uni.$on('refreshForumListViews', this.refreshPostsViews)
		},
		beforeDestroy() {
			uni.$off('refreshForumList', this.loadPageData)
			uni.$off('refreshForumListViews', this.refreshPostsViews)
		},
		beforeUnmount() {
			uni.$off('refreshForumList', this.loadPageData)
			uni.$off('refreshForumListViews', this.refreshPostsViews)
		},
		methods: {
			loadPageData() {
				this.loadUserInfo()
				this.loadFriendRelation()
				this.loadUserPosts()
			},
			loadUserInfo() {
				if (this.isSelf) {
					const profile = getUserProfile()
					this.profileName = profile.nickname || this.profileName
					this.profileAvatar = profile.avatar || this.profileAvatar || DEFAULT_AVATAR
					this.profileGrade = profile.grade || profile.graduationYear || this.profileGrade
					this.profileMajor = profile.major || this.profileMajor
					this.profileBio = profile.bio || ''
					this.cardBackgroundKey = profile.cardBackgroundKey || 'ocean'
				}

				if (!this.targetUserId) {
					this.targetUserId = this.currentUserId
				}
			},
			openSelfMenu() {
				uni.showActionSheet({
					itemList: ['个人信息完善', '个人卡片背景更改'],
					success: (res) => {
						if (Number(res.tapIndex) === 0) {
							this.goToProfileEdit()
							return
						}
						this.openBackgroundPicker()
					}
				})
			},
			goToProfileEdit() {
				uni.navigateTo({
					url: '/subPages/profile/profile'
				})
			},
			openBackgroundPicker() {
				uni.showActionSheet({
					itemList: CARD_BACKGROUND_PRESETS.map(item => item.label),
					success: (res) => {
						const preset = CARD_BACKGROUND_PRESETS[Number(res.tapIndex)]
						if (!preset) return
						this.cardBackgroundKey = preset.key
						saveUserProfile({ cardBackgroundKey: preset.key })
						uni.showToast({ title: '背景已更新', icon: 'none' })
					}
				})
			},
			async loadFriendRelation() {
				if (!this.currentUserId || !this.targetUserId || this.isSelf) {
					this.friendRelationStatus = this.isSelf ? 'self' : 'none'
					this.friendRelationRequestId = ''
					return
				}
				this.isFriendStatusLoading = true
				try {
					const res = await getForumFriendRelationStatus(this.currentUserId, this.targetUserId)
					const data = (res && res.data) || {}
					this.friendRelationStatus = data.relationStatus || 'none'
					this.friendRelationRequestId = data.requestId || ''
				} catch (_) {
					this.friendRelationStatus = 'none'
					this.friendRelationRequestId = ''
				} finally {
					this.isFriendStatusLoading = false
				}
			},
			async loadUserPosts() {
				if (!this.targetUserId) return
				try {
					const tId = Number(this.targetUserId)
					const vId = Number(this.currentUserId)
					const res = await searchForumPosts({
						pageNum: 1,
						pageSize: 1000,
						viewerUserId: !isNaN(vId) && vId > 0 ? vId : undefined
					})
					const records = (res && res.data && res.data.records) || []
					let filteredPosts = Array.isArray(records) ? records : []
					
					// 本地过滤：仅保留目标用户的帖子
					if (!isNaN(tId) && tId > 0) {
						filteredPosts = filteredPosts.filter(
							(p) => Number(p.userId) === tId || Number(p.authorId) === tId
						)
					}
					
					const syncedPosts = syncForumPostsViews(filteredPosts)

					if ((!this.profileName || !this.profileAvatar || !this.profileGrade || !this.profileMajor) && syncedPosts.length > 0) {
						const latestPost = syncedPosts[0]
						this.profileName = this.profileName || latestPost.authorName || ''
						this.profileAvatar = this.profileAvatar || latestPost.authorAvatar || DEFAULT_AVATAR
						this.profileGrade = this.profileGrade || latestPost.grade || latestPost.authorGrade || latestPost.graduationYear || ''
						this.profileMajor = this.profileMajor || latestPost.major || latestPost.authorMajor || ''
					}

					this.userPosts = syncedPosts
				} catch (e) {
					this.userPosts = []
				}
			},
			refreshPostsViews() {
				this.userPosts = syncForumPostsViews(this.userPosts)
			},
			goBack() {
				if (this.isLeaving) return
				this.isLeaving = true
				setTimeout(() => {
					this.allowNativeBack = true
					uni.navigateBack()
				}, this.pageTransitionMs)
			},
			goToDetail(item) {
				const id = item.postId || item.id
				if (!id) return
				uni.navigateTo({
					url: `/subPages/forum/detail?id=${id}`
				})
			},
			handlePrimaryFriendAction() {
				if (this.isPrimaryActionDisabled) return
				if (this.friendRelationStatus === 'incoming_pending') {
					this.acceptFriendRequest()
					return
				}
				this.handleAddFriend()
			},
			async handleAddFriend() {
				if (!this.currentUserId) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}
				if (!this.targetUserId || this.isSelf) return
				this.isFriendActionLoading = true
				try {
					await sendForumFriendRequest(this.currentUserId, this.targetUserId)
					this.friendRelationStatus = 'outgoing_pending'
					uni.showToast({ title: '好友申请已发送', icon: 'none' })
				} catch (e) {
					const msg = (e && (e.message || e.errMsg)) || '发送失败'
					if (String(msg).includes('已是好友')) {
						this.friendRelationStatus = 'accepted'
					} else if (String(msg).includes('已申请')) {
						this.friendRelationStatus = 'outgoing_pending'
					}
					uni.showToast({ title: String(msg), icon: 'none' })
				} finally {
					this.isFriendActionLoading = false
				}
			},
			async acceptFriendRequest() {
				if (!this.currentUserId || !this.friendRelationRequestId) return
				this.isFriendActionLoading = true
				try {
					await respondForumFriendRequest(this.friendRelationRequestId, this.currentUserId, true)
					this.friendRelationStatus = 'accepted'
					uni.showToast({ title: '已添加好友', icon: 'none' })
				} catch (e) {
					const msg = (e && (e.message || e.errMsg)) || '操作失败'
					uni.showToast({ title: String(msg), icon: 'none' })
				} finally {
					this.isFriendActionLoading = false
				}
			},
			goPrivateChat() {
				if (!this.currentUserId) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}
				if (!this.targetUserId || this.isSelf) return
				const avatar = this.getFullUrl(this.displayAvatar) || DEFAULT_AVATAR
				uni.navigateTo({
					url: `/subPages/forum/privateChat?userId=${encodeURIComponent(String(this.targetUserId))}&name=${encodeURIComponent(this.displayName)}&avatar=${encodeURIComponent(avatar)}`
				})
			},
			getImagesList(imagesStr) {
				if (!imagesStr) return []
				try {
					const arr = JSON.parse(imagesStr)
					if (Array.isArray(arr)) return arr
				} catch (e) {
					return String(imagesStr).split(',').map(item => item.trim()).filter(Boolean)
				}
				return []
			},
			getImageLayoutClass(images) {
				if (!images || images.length === 0) return ''
				if (images.length === 1) return 'layout-1'
				return 'layout-multi'
			},
			getFullUrl(url) {
				if (!url) return ''
				if (String(url).startsWith('http') || String(url).startsWith('data:')) return url
				return `${BASE_URL}${url}`
			},
			formatTime(timeStr) {
				if (!timeStr) return ''
				if (typeof timeStr === 'string') {
					return timeStr.substring(0, 16).replace('T', ' ')
				}
				if (Array.isArray(timeStr)) {
					const [y, m, d, h, min] = timeStr
					const pad = value => (value < 10 ? `0${value}` : `${value}`)
					return `${y}-${pad(m)}-${pad(d)} ${pad(h)}:${pad(min)}`
				}
				return String(timeStr)
			}
		}
	}
</script>

<style lang="scss">
	.user-card-page {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f6f8fc;
		overflow: hidden;
		animation: user-card-page-enter 260ms cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform, opacity;
	}

	.user-card-page.is-leaving {
		animation: user-card-page-leave 240ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
		pointer-events: none;
	}

	@keyframes user-card-page-enter {
		from {
			transform: translateX(100%);
			opacity: 0.98;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes user-card-page-leave {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			transform: translateX(100%);
			opacity: 0.98;
		}
	}

	.page-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding-top: var(--status-bar-height);
		background:
			linear-gradient(180deg, rgba(1, 188, 255, 0.1) 0%, rgba(49, 101, 215, 0.4) 45%, rgba(0, 123, 255, 0.05) 100%),
			linear-gradient(180deg, rgba(0, 122, 252, 0.78) 0%, rgba(1, 188, 255, 0) 100%);
		border-bottom: 2rpx solid rgba(243, 253, 255, 0.6);
	}

	.header-inner {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 88rpx;
		padding: 12rpx 24rpx 20rpx;
	}

	.header-side {
		width: 120rpx;
		display: flex;
		align-items: center;
	}

	.header-left {
		justify-content: flex-start;
	}

	.header-right {
		justify-content: flex-end;
	}

	.header-title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 34rpx;
		font-weight: 700;
		color: #fff;
	}

	.back-btn {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.92);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menu-btn {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.92);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4rpx 14rpx rgba(34, 97, 193, 0.12);
	}

	.menu-dots {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}

	.menu-dot {
		width: 8rpx;
		height: 8rpx;
		border-radius: 50%;
		background: #3357d6;
		display: block;
	}

	.back-icon-img {
		width: 38rpx;
		height: 38rpx;
	}

	.page-scroll {
		height: 100vh;
	}

	.header-placeholder {
		height: calc(var(--status-bar-height) + 124rpx);
	}

	.profile-card {
		position: relative;
		margin: 28rpx 30rpx 0;
		padding: 44rpx 32rpx 40rpx;
		border-radius: 36rpx;
		overflow: hidden;
		background:
			linear-gradient(140deg, rgba(125, 176, 255, 0.95) 0%, rgba(77, 113, 231, 0.92) 55%, rgba(80, 164, 255, 0.88) 100%);
		box-shadow: 0 20rpx 50rpx rgba(61, 109, 212, 0.22);
	}

	.profile-decor {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.12);
	}

	.profile-decor-a {
		width: 260rpx;
		height: 260rpx;
		top: -80rpx;
		right: -60rpx;
	}

	.profile-decor-b {
		width: 180rpx;
		height: 180rpx;
		left: -40rpx;
		bottom: -70rpx;
	}

	.profile-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.avatar-shell {
		width: 168rpx;
		height: 168rpx;
		padding: 8rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.28);
		box-shadow: 0 14rpx 32rpx rgba(14, 52, 135, 0.24);
	}

	.profile-avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: block;
	}

	.profile-name {
		margin-top: 24rpx;
		font-size: 44rpx;
		font-weight: 700;
		color: #fff;
	}

	.profile-meta {
		margin-top: 12rpx;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.84);
	}

	.profile-bio {
		margin-top: 18rpx;
		padding: 16rpx 24rpx;
		border-radius: 999rpx;
		font-size: 24rpx;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.92);
		background: rgba(255, 255, 255, 0.14);
	}

	.profile-actions {
		display: flex;
		align-items: center;
		gap: 18rpx;
		width: 100%;
		margin-top: 28rpx;
	}

	.profile-action-btn {
		flex: 1;
		height: 84rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 700;
	}

	.profile-action-btn.disabled {
		opacity: 0.72;
	}

	.profile-action-btn.primary {
		background: #ffffff;
		color: #3357d6;
		box-shadow: 0 12rpx 24rpx rgba(14, 52, 135, 0.16);
	}

	.profile-action-btn.ghost {
		background: rgba(255, 255, 255, 0.16);
		border: 1rpx solid rgba(255, 255, 255, 0.32);
		color: #ffffff;
	}

	.posts-section {
		padding: 32rpx 30rpx calc(48rpx + env(safe-area-inset-bottom));
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24rpx;
	}

	.section-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #24324a;
	}

	.section-count {
		font-size: 24rpx;
		color: #7d89a3;
	}

	.post-list {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}

	.post-card {
		padding: 28rpx;
		border-radius: 28rpx;
		background: #fff;
		box-shadow: 0 10rpx 32rpx rgba(16, 24, 40, 0.06);
	}

	.post-card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20rpx;
	}

	.post-time,
	.post-views {
		font-size: 22rpx;
		color: #8b95aa;
	}

	.post-content {
		display: block;
		margin-top: 18rpx;
		font-size: 30rpx;
		line-height: 1.6;
		color: #24324a;
		word-break: break-all;
	}

	.post-images {
		display: flex;
		flex-wrap: wrap;
		gap: 10rpx;
		margin-top: 20rpx;

		.image-wrapper {
			position: relative;
			border-radius: 16rpx;
			overflow: hidden;
			background: #eef3fb;
		}

		.post-img {
			width: 100%;
			height: 100%;
			display: block;
		}

		.more-images-badge {
			position: absolute;
			right: 10rpx;
			bottom: 10rpx;
			padding: 4rpx 12rpx;
			border-radius: 999rpx;
			background: rgba(0, 0, 0, 0.58);
		}

		.more-text {
			font-size: 22rpx;
			color: #fff;
		}

		&.layout-1 {
			.image-wrapper {
				width: 66%;
				height: auto;
			}
		}

		&.layout-multi {
			.image-wrapper {
				width: calc((100% - 20rpx) / 3);
				height: 0;
				padding-bottom: calc((100% - 20rpx) / 3);
			}

			.post-img {
				position: absolute;
				left: 0;
				top: 0;
			}
		}
	}

	.post-footer {
		display: flex;
		align-items: center;
		gap: 28rpx;
		margin-top: 22rpx;
		padding-top: 18rpx;
		border-top: 1rpx solid rgba(36, 50, 74, 0.08);
	}

	.post-stat {
		font-size: 24rpx;
		color: #7d89a3;
	}

	.empty-state {
		padding: 72rpx 32rpx;
		border-radius: 28rpx;
		background: #fff;
		text-align: center;
		box-shadow: 0 10rpx 32rpx rgba(16, 24, 40, 0.05);
	}

	.empty-title {
		display: block;
		font-size: 30rpx;
		font-weight: 600;
		color: #24324a;
	}

	.empty-subtitle {
		display: block;
		margin-top: 12rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #8b95aa;
	}

	/* 深色模式：与论坛首页 (#111216 / 磨砂顶栏) 同一套表面层次，避免高饱和蓝渐变与正文区割裂 */
	.theme-dark.user-card-page {
		background-color: #111216;

		.page-header {
			background: rgba(17, 18, 22, 0.88);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}

		.header-title {
			color: #f4f7fb;
		}

		.back-btn {
			background: rgba(255, 255, 255, 0.08);
			border: 1rpx solid rgba(255, 255, 255, 0.08);
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.35);
		}

		.menu-btn {
			background: rgba(255, 255, 255, 0.08);
			border: 1rpx solid rgba(255, 255, 255, 0.08);
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.35);
		}

		.menu-dot {
			background: #f4f7fb;
		}

		.back-icon-img {
			filter: brightness(0) invert(1);
			opacity: 0.88;
		}

		.profile-card {
			background: linear-gradient(
				160deg,
				rgba(42, 45, 54, 0.98) 0%,
				rgba(30, 33, 40, 0.98) 48%,
				rgba(26, 28, 34, 0.99) 100%
			);
			border: 1rpx solid rgba(255, 255, 255, 0.07);
			box-shadow:
				0 1rpx 0 rgba(255, 255, 255, 0.05) inset,
				0 20rpx 56rpx rgba(0, 0, 0, 0.42),
				0 0 40rpx rgba(74, 103, 247, 0.06);
		}

		.profile-decor {
			background: rgba(255, 255, 255, 0.045);
		}

		.avatar-shell {
			background: rgba(255, 255, 255, 0.1);
			box-shadow: 0 14rpx 36rpx rgba(0, 0, 0, 0.4);
		}

		.profile-meta {
			color: rgba(244, 247, 251, 0.72);
		}

		.profile-bio {
			background: rgba(255, 255, 255, 0.09);
			color: rgba(244, 247, 251, 0.92);
		}

		.profile-action-btn.primary {
			background: #f4f7fb;
			color: #2f49b6;
			box-shadow: 0 12rpx 28rpx rgba(0, 0, 0, 0.22);
		}

		.profile-action-btn.ghost {
			background: rgba(255, 255, 255, 0.08);
			border-color: rgba(255, 255, 255, 0.12);
			color: #f4f7fb;
		}

		.section-title {
			color: #f4f7fb;
		}

		.section-count,
		.post-time,
		.post-views,
		.post-stat,
		.empty-subtitle {
			color: rgba(255, 255, 255, 0.5);
		}

		.post-card,
		.empty-state {
			background: rgba(35, 37, 43, 0.96);
			border: 1rpx solid rgba(255, 255, 255, 0.06);
			box-shadow: 0 16rpx 38rpx rgba(0, 0, 0, 0.22);
		}

		.post-content,
		.empty-title {
			color: #f4f7fb;
		}

		.post-images .image-wrapper {
			background: rgba(28, 31, 38, 0.95);
		}

		.post-footer {
			border-top-color: rgba(255, 255, 255, 0.06);
		}
	}
</style>
