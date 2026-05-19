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
				<view class="header-side header-right"></view>
			</view>
		</view>

		<scroll-view class="page-scroll" scroll-y :show-scrollbar="false">
			<view class="header-placeholder"></view>

			<view class="profile-card">
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
					<text class="empty-title">{{ isSelf ? '你还没有发布帖子' : 'TA 还没有发布帖子' }}</text>
					<text class="empty-subtitle">去论坛发一条动态，主页这里就会自动展示。</text>
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
	import { getUserProfile, DEFAULT_AVATAR } from '@/utils/userProfile.js'
	import { getForumMockPosts, syncForumMockPostCache } from '@/utils/forumLocalData.js'
	import { syncForumPostsViews } from '@/utils/forumViewCount.js'

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
				userPosts: [],
				isLeaving: false,
				allowNativeBack: false,
				pageTransitionMs: 260
			}
		},
		computed: {
			currentUserId() {
				const user = getUser() || uni.getStorageSync('user') || {}
				return String(user.userId || user.id || '')
			},
			isSelf() {
				return this.targetUserId && this.currentUserId && this.targetUserId === this.currentUserId
			},
			displayName() {
				return this.profileName || (this.isSelf ? '我自己' : '匿名用户')
			},
			displayAvatar() {
				return this.profileAvatar || DEFAULT_AVATAR
			},
			profileSummary() {
				return [this.profileGrade, this.profileMajor].filter(Boolean).join(' · ')
			}
		},
		onLoad(options) {
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
				}

				if (!this.targetUserId) {
					this.targetUserId = this.currentUserId
				}
			},
			loadUserPosts() {
				const result = getForumMockPosts({
					pageNum: 1,
					pageSize: 1000,
					currentTab: 0
				})
				const records = Array.isArray(result.records) ? result.records : []
				const filteredPosts = records.filter(item => String(item.userId || '') === String(this.targetUserId || ''))
				const syncedPosts = syncForumPostsViews(filteredPosts)

				if ((!this.profileName || !this.profileAvatar || !this.profileGrade || !this.profileMajor) && syncedPosts.length > 0) {
					const latestPost = syncedPosts[0]
					this.profileName = this.profileName || latestPost.authorName || ''
					this.profileAvatar = this.profileAvatar || latestPost.authorAvatar || DEFAULT_AVATAR
					this.profileGrade = this.profileGrade || latestPost.grade || latestPost.authorGrade || latestPost.graduationYear || ''
					this.profileMajor = this.profileMajor || latestPost.major || latestPost.authorMajor || ''
				}

				this.userPosts = syncedPosts
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
				syncForumMockPostCache(item)
				uni.navigateTo({
					url: `/subPages/forum/detail?id=${id}`
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

	.theme-dark.user-card-page {
		background: linear-gradient(180deg, #111216 0%, #17181d 28%, #111216 100%);

		.page-header {
			background:
				linear-gradient(180deg, rgba(77, 108, 182, 0.38) 0%, rgba(35, 42, 63, 0.55) 50%, rgba(17, 18, 22, 0.3) 100%),
				linear-gradient(180deg, rgba(74, 103, 247, 0.55) 0%, rgba(74, 103, 247, 0) 100%);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}

		.back-btn {
			background: rgba(35, 37, 43, 0.96);
		}

		.profile-card {
			background:
				linear-gradient(145deg, rgba(59, 82, 145, 0.96) 0%, rgba(43, 61, 118, 0.94) 55%, rgba(38, 96, 156, 0.9) 100%);
			box-shadow: 0 20rpx 50rpx rgba(0, 0, 0, 0.28);
		}

		.section-title {
			color: #eef2f8;
		}

		.section-count,
		.post-time,
		.post-views,
		.post-stat,
		.empty-subtitle {
			color: #8090ad;
		}

		.post-card,
		.empty-state {
			background: #17191f;
			box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.2);
		}

		.post-content,
		.empty-title {
			color: #eef2f8;
		}

		.post-images .image-wrapper {
			background: #232834;
		}

		.post-footer {
			border-top-color: rgba(255, 255, 255, 0.06);
		}
	}
</style>
