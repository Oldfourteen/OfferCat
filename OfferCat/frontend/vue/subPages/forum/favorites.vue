<template>
	<view class="forum-favorites-page" :class="themeClass">
		<view class="favorites-topbar">
			<view class="topbar-side" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="topbar-title">我的收藏</text>
			<view class="topbar-side topbar-placeholder"></view>
		</view>

		<scroll-view class="favorites-scroll" scroll-y :show-scrollbar="false">
			<view class="favorites-content">
				<view v-if="!isLoggedIn" class="empty-card">
					<text class="empty-title">还未登录</text>
					<text class="empty-desc">登录后可查看你收藏过的论坛帖子。</text>
					<view class="empty-btn" @click="goLogin">去登录</view>
				</view>

				<template v-else>
					<view class="summary-card">
						<text class="summary-label">已收藏帖子</text>
						<text class="summary-value">{{ favorites.length }}</text>
					</view>

					<view v-if="favorites.length" class="favorite-list">
						<view
							v-for="item in favorites"
							:key="item.postId || item.id"
							class="favorite-card"
							@click="goToDetail(item)"
						>
							<view class="card-user-info" @click.stop="goToUserCard(item)">
								<image class="user-avatar" :src="getAvatar(item.authorAvatar, item.userId)" mode="aspectFill"></image>
								<view class="user-meta">
									<text class="user-name">{{ getAuthorName(item.authorName, item.userId) }}</text>
									<text class="user-tag" v-if="getAuthorProfileText(item)">{{ getAuthorProfileText(item) }}</text>
								</view>
								<text class="favorited-time">{{ formatFavoritedTime(item.favoritedAt) }}</text>
							</view>

							<text class="post-desc">{{ displayForumText(item.content) || '这条帖子暂无正文内容' }}</text>

							<view class="post-images" :class="getImageLayoutClass(getImagesList(item.images))" v-if="getImagesList(item.images).length > 0">
								<view class="image-wrapper" v-for="(img, index) in getImagesList(item.images).slice(0, 3)" :key="index">
									<image class="post-img" :src="getFullUrl(img)" :mode="getImagesList(item.images).length === 1 ? 'widthFix' : 'aspectFill'"></image>
								</view>
							</view>

							<view class="card-actions">
								<text class="view-count">浏览 {{ item.views || 0 }}</text>
								<view class="action-right">
									<text class="count">点赞 {{ item.likeCount || 0 }}</text>
									<text class="count">评论 {{ item.commentCount || 0 }}</text>
									<view class="cancel-btn" @click.stop="toggleCollect(item)">取消收藏</view>
								</view>
							</view>
						</view>
					</view>

					<view v-else class="empty-card">
						<text class="empty-title">还没有收藏帖子</text>
						<text class="empty-desc">在论坛里点一下收藏，喜欢的帖子就会自动收纳到这里。</text>
						<view class="empty-btn" @click="goForum">去逛论坛</view>
					</view>
				</template>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { BASE_URL } from '@/api/config.js'
	import { searchForumPosts, uncollectForumPost } from '@/api/forum.js'
	import themeMixin from '@/utils/themeMixin.js'
	import {
		getCollectedForumPosts,
		removeCollectedForumPost,
		replaceCollectedForumPosts
	} from '@/utils/forumFavorites.js'
	import { displayForumText } from '@/utils/sensitiveWords.js'

	export default {
		name: 'ForumFavoritesPage',
		mixins: [themeMixin],
		data() {
			return {
				favorites: []
			}
		},
		computed: {
			currentUser() {
				return uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
			},
			currentUserId() {
				return this.currentUser.userId || this.currentUser.id || ''
			},
			isLoggedIn() {
				return Boolean(this.currentUserId)
			}
		},
		onShow() {
			this.loadFavorites()
		},
		methods: {
			displayForumText,
			goBack() {
				uni.navigateBack({
					fail: () => {
						uni.switchTab({
							url: '/pages/my/my'
						})
					}
				})
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			goForum() {
				uni.switchTab({
					url: '/pages/forum/index'
				})
			},
			async loadFavorites() {
				if (!this.isLoggedIn) {
					this.favorites = []
					return
				}
				const localFavorites = getCollectedForumPosts(this.currentUserId)
				this.favorites = localFavorites
				try {
					const res = await searchForumPosts({
						keyword: '',
						pageNum: 1,
						pageSize: 1000,
						viewerUserId: this.currentUserId,
						feedTab: 'all'
					})
					const page = (res && res.data) || {}
					const records = Array.isArray(page.records) ? page.records : []
					const remoteFavorites = records
						.filter(item => Boolean(item && item.isCollected))
						.map(item => {
							const local = localFavorites.find(localItem => String(localItem.postId || localItem.id) === String(item.postId || item.id))
							return {
								...item,
								views: Number(item.views != null ? item.views : item.viewCount || 0),
								viewCount: Number(item.views != null ? item.views : item.viewCount || 0),
								favoriteCount: Number(item.favoriteCount != null ? item.favoriteCount : item.collectCount || 0),
								isCollected: true,
								favoritedAt: local && local.favoritedAt ? local.favoritedAt : Date.now()
							}
						})
					const fallbackOnly = localFavorites.filter(localItem =>
						!remoteFavorites.some(remoteItem => String(remoteItem.postId || remoteItem.id) === String(localItem.postId || localItem.id))
					)
					const merged = [...remoteFavorites, ...fallbackOnly].sort(
						(a, b) => Number(b.favoritedAt || 0) - Number(a.favoritedAt || 0)
					)
					this.favorites = merged
					replaceCollectedForumPosts(merged, this.currentUserId)
				} catch (e) {
					console.warn('[ForumFavorites] 加载远端收藏失败，回退本地缓存', e)
				}
			},
			async toggleCollect(item) {
				if (!this.currentUserId) return
				const postId = item.postId || item.id
				try {
					await uncollectForumPost(postId, this.currentUserId)
					removeCollectedForumPost(postId, this.currentUserId)
					this.favorites = this.favorites.filter(post => String(post.postId || post.id) !== String(postId))
					uni.$emit('refreshForumList')
					uni.showToast({
						title: '已取消收藏',
						icon: 'none'
					})
				} catch (e) {
					uni.showToast({
						title: (e && e.message) || '取消失败',
						icon: 'none'
					})
				}
			},
			goToDetail(item) {
				const id = item.postId || item.id
				if (!id) return
				uni.navigateTo({
					url: `/subPages/forum/detail?id=${id}`
				})
			},
			goToUserCard(item) {
				const userId = item.userId || ''
				const name = this.getAuthorName(item.authorName, item.userId)
				const avatar = this.getAvatar(item.authorAvatar, item.userId)
				const grade = item.grade || item.authorGrade || item.graduationYear || ''
				const major = item.major || item.authorMajor || ''
				uni.navigateTo({
					url: `/subPages/userCard/userCard?userId=${encodeURIComponent(String(userId))}&name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}&grade=${encodeURIComponent(grade)}&major=${encodeURIComponent(major)}`
				})
			},
			getAvatar(avatar, postUserId) {
				if (postUserId && this.currentUserId && postUserId === this.currentUserId) {
					const profile = this.currentUser.profile || {}
					const localAvatar = profile.avatar || this.currentUser.avatar
					if (localAvatar) return this.getFullUrl(localAvatar)
				}
				if (!avatar) return '/static/default-avatar.jpg'
				if (String(avatar).startsWith('http')) return avatar
				return BASE_URL + avatar
			},
			getAuthorName(name, postUserId) {
				if (postUserId && this.currentUserId && postUserId === this.currentUserId) {
					const profile = this.currentUser.profile || {}
					const localName = profile.nickname || this.currentUser.nickname
					if (localName) return localName
				}
				return name || '匿名用户'
			},
			getAuthorProfileText(item) {
				const grade = item.grade || item.authorGrade || item.graduationYear || ''
				const major = item.major || item.authorMajor || ''
				return [grade, major].filter(Boolean).join(' · ')
			},
			getImagesList(images) {
				if (!images) return []
				if (Array.isArray(images)) return images
				try {
					const parsed = JSON.parse(images)
					if (Array.isArray(parsed)) return parsed
				} catch (_) {
					return String(images).split(',').filter(Boolean)
				}
				return []
			},
			getImageLayoutClass(images) {
				if (!images || images.length === 0) return ''
				return images.length === 1 ? 'layout-1' : 'layout-multi'
			},
			getFullUrl(url) {
				if (!url) return ''
				if (String(url).startsWith('http') || String(url).startsWith('data:')) return url
				return BASE_URL + url
			},
			formatFavoritedTime(timestamp) {
				if (!timestamp) return ''
				const date = new Date(Number(timestamp))
				if (Number.isNaN(date.getTime())) return ''
				const month = `${date.getMonth() + 1}`.padStart(2, '0')
				const day = `${date.getDate()}`.padStart(2, '0')
				const hour = `${date.getHours()}`.padStart(2, '0')
				const minute = `${date.getMinutes()}`.padStart(2, '0')
				return `${month}-${day} ${hour}:${minute}`
			}
		}
	}
</script>

<style lang="scss">
	.forum-favorites-page {
		min-height: 100vh;
		background: #f6f8fc;
	}

	.favorites-topbar {
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 0.94);
		backdrop-filter: blur(18px);
		border-bottom: 1rpx solid rgba(15, 23, 42, 0.06);
	}

	.topbar-side {
		width: 72rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-icon {
		font-size: 48rpx;
		color: #24345b;
		line-height: 1;
	}

	.topbar-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #24345b;
	}

	.favorites-scroll {
		height: calc(100vh - var(--status-bar-height) - 108rpx);
	}

	.favorites-content {
		padding: 24rpx;
	}

	.summary-card,
	.favorite-card,
	.empty-card {
		border-radius: 28rpx;
		background: #ffffff;
		box-shadow:
			0 8rpx 24rpx rgba(15, 23, 42, 0.06),
			0 2rpx 8rpx rgba(67, 76, 210, 0.05);
	}

	.summary-card {
		padding: 30rpx;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.summary-label {
		font-size: 26rpx;
		color: #6b7a99;
	}

	.summary-value {
		font-size: 56rpx;
		line-height: 1;
		font-weight: 800;
		color: #24345b;
	}

	.favorite-list {
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.favorite-card {
		padding: 26rpx;
	}

	.card-user-info {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}

	.user-avatar {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: #eef2f8;
		flex-shrink: 0;
	}

	.user-meta {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 6rpx;
		min-width: 0;
	}

	.user-name {
		font-size: 28rpx;
		font-weight: 700;
		color: #24345b;
	}

	.user-tag,
	.favorited-time {
		font-size: 22rpx;
		color: #8a96af;
	}

	.post-desc {
		margin-top: 18rpx;
		font-size: 30rpx;
		line-height: 1.6;
		color: #2d3a58;
		word-break: break-all;
	}

	.post-images {
		display: flex;
		flex-wrap: wrap;
		gap: 10rpx;
		margin-top: 18rpx;
	}

	.image-wrapper {
		border-radius: 18rpx;
		overflow: hidden;
		background: #f3f5fa;
	}

	.post-img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.post-images.layout-1 .image-wrapper {
		width: 60%;
	}

	.post-images.layout-multi .image-wrapper {
		width: calc((100% - 20rpx) / 3);
		height: 0;
		padding-bottom: calc((100% - 20rpx) / 3);
		position: relative;
	}

	.post-images.layout-multi .post-img {
		position: absolute;
		top: 0;
		left: 0;
	}

	.card-actions {
		margin-top: 20rpx;
		padding-top: 18rpx;
		border-top: 1rpx solid rgba(15, 23, 42, 0.06);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
	}

	.view-count,
	.count {
		font-size: 22rpx;
		color: #8a96af;
	}

	.action-right {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.cancel-btn,
	.empty-btn {
		height: 60rpx;
		padding: 0 22rpx;
		border-radius: 18rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-weight: 600;
	}

	.cancel-btn {
		background: rgba(49, 101, 215, 0.08);
		color: #3165d7;
	}

	.empty-card {
		margin-top: 32rpx;
		padding: 44rpx 32rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.empty-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #24345b;
	}

	.empty-desc {
		margin-top: 14rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #8a96af;
	}

	.empty-btn {
		margin-top: 26rpx;
		background: linear-gradient(135deg, #3165d7, #4d8bff);
		color: #ffffff;
	}

	.forum-favorites-page.theme-dark {
		background: #14161a;

		.favorites-topbar {
			background: rgba(29, 31, 36, 0.94);
			border-color: rgba(255, 255, 255, 0.08);
		}

		.back-icon,
		.topbar-title,
		.summary-value,
		.user-name,
		.post-desc,
		.empty-title {
			color: #f4f7fb;
		}

		.summary-label,
		.user-tag,
		.favorited-time,
		.view-count,
		.count,
		.empty-desc {
			color: rgba(255, 255, 255, 0.58);
		}

		.summary-card,
		.favorite-card,
		.empty-card {
			background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
			box-shadow:
				0 10rpx 26rpx rgba(0, 0, 0, 0.24),
				0 4rpx 10rpx rgba(0, 0, 0, 0.12);
		}

		.post-images .image-wrapper {
			background: rgba(255, 255, 255, 0.06);
		}

		.card-actions,
		.favorites-topbar {
			border-color: rgba(255, 255, 255, 0.08);
		}

		.cancel-btn {
			background: rgba(138, 183, 255, 0.14);
			color: #8ab7ff;
		}
	}
</style>
