<template>
	<view class="like-inbox-page" :class="themeClass">
		<view class="top-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="page-title">收到喜欢</text>
			<view class="top-bar-placeholder"></view>
		</view>

		<scroll-view class="inbox-scroll" scroll-y :show-scrollbar="false">
			<view class="like-list" v-if="items.length">
				<view
					class="like-card"
					v-for="item in items"
					:key="item.msgId || item.id"
					@click="goToPost(item)"
				>
					<image class="avatar" :src="getAvatarUrl(item)" mode="aspectFill"></image>
					<view class="card-main">
						<view class="card-head">
							<view class="head-left">
								<text class="user-name">{{ item.userName || item.senderName }}</text>
								<text class="action-tag">{{ item.actionText }}</text>
							</view>
							<text class="time-text">{{ formatListTime(item) }}</text>
						</view>
						<text class="post-line">帖子：{{ item.postPreview }}</text>
					</view>
				</view>
			</view>

			<view class="empty-state" v-else>
				<text class="empty-title">暂时还没有新的喜欢</text>
				<text class="empty-desc">当别人给你的帖子点赞或收藏时，会显示在这里</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { BASE_URL } from '@/api/config.js'
	import { getForumLikesInbox, forumMarkMessagesRead } from '@/api/forum.js'

	const DEFAULT_AVATAR = '/static/default-avatar.jpg'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				items: []
			}
		},
		async onShow() {
			const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
			const uid = u.userId || u.id
			if (uid) {
				try {
					await forumMarkMessagesRead({ userId: uid, scope: 'likes' })
				} catch (_) {}
			}
			await this.loadItems()
		},
		methods: {
			getAvatarUrl(item) {
				const a = (item && (item.avatar || item.senderAvatar)) || ''
				if (!a) return DEFAULT_AVATAR
				if (a.startsWith('http') || a.startsWith('data:')) return a
				return BASE_URL + a
			},
			formatListTime(item) {
				const t = item && item.createTime
				if (typeof t === 'string') {
					return t.substring(0, 16).replace('T', ' ')
				}
				return String((item && item.time) || '')
			},
			async loadItems() {
				const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = u.userId || u.id
				if (uid) {
					try {
						const res = await getForumLikesInbox(uid)
						const list = res && res.data
						if (Array.isArray(list)) {
							this.items = list.map((it) => ({
								...it,
								id: it.msgId,
								postId: it.postId,
								userName: it.userName || it.senderName,
								avatar: it.avatar || it.senderAvatar || DEFAULT_AVATAR,
								postPreview: it.postPreview || it.snippet || '',
							}))
						}
					} catch (_) {}
				}
			},
			goBack() {
				uni.navigateBack({
					animationType: 'slide-out-right',
					animationDuration: 300
				})
			},
			goToPost(item) {
				if (!item || !item.postId) return
				const post = getForumMockPostDetail(item.postId)
				if (post) {
					uni.setStorageSync(`currentPost_${item.postId}`, post)
				}
				uni.navigateTo({
					url: `/subPages/forum/detail?id=${encodeURIComponent(String(item.postId))}`,
					animationType: 'slide-in-right',
					animationDuration: 300
				})
			}
		}
	}
</script>

<style lang="scss">
	.like-inbox-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #fff;
	}

	.top-bar {
		padding: calc(var(--status-bar-height) + 20rpx) 30rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(20px);
		border-bottom: 1rpx solid rgba(15, 23, 42, 0.06);
	}

	.back-btn,
	.top-bar-placeholder {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
	}

	.back-icon {
		font-size: 56rpx;
		line-height: 1;
		color: #24345b;
		margin-top: -8rpx;
	}

	.page-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #15305e;
	}

	.inbox-scroll {
		flex: 1;
		min-height: 0;
	}

	.like-list {
		padding: 0 30rpx calc(40rpx + env(safe-area-inset-bottom));
	}

	.like-card {
		display: flex;
		gap: 20rpx;
		padding: 28rpx 0;
		border-bottom: 1rpx solid rgba(15, 23, 42, 0.08);
	}

	.avatar {
		width: 76rpx;
		height: 76rpx;
		border-radius: 50%;
		flex-shrink: 0;
		background: #f2f4f8;
	}

	.card-main {
		flex: 1;
		min-width: 0;
	}

	.card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20rpx;
	}

	.head-left {
		display: flex;
		align-items: center;
		gap: 12rpx;
		min-width: 0;
	}

	.user-name {
		font-size: 30rpx;
		font-weight: 700;
		color: #24345b;
	}

	.action-tag {
		padding: 6rpx 14rpx;
		border-radius: 999rpx;
		font-size: 22rpx;
		color: #ff6b88;
		background: rgba(255, 107, 136, 0.12);
		flex-shrink: 0;
	}

	.time-text {
		font-size: 22rpx;
		color: #98a2b3;
		flex-shrink: 0;
	}

	.post-line {
		display: -webkit-box;
		margin-top: 14rpx;
		font-size: 24rpx;
		line-height: 1.5;
		color: #98a2b3;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		word-break: break-all;
	}

	.empty-state {
		padding: 180rpx 60rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.empty-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #24345b;
	}

	.empty-desc {
		margin-top: 18rpx;
		font-size: 26rpx;
		line-height: 1.6;
		color: #98a2b3;
	}

	.theme-dark.like-inbox-page {
		background: #111216;
	}

	.theme-dark {
		.top-bar {
			background: rgba(17, 18, 22, 0.9);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}

		.back-icon,
		.page-title,
		.user-name,
		.empty-title {
			color: #f4f7fb;
		}

		.like-card {
			border-bottom-color: rgba(255, 255, 255, 0.08);
		}

		.avatar {
			background: #23252b;
		}

		.time-text,
		.post-line,
		.empty-desc {
			color: #8090ad;
		}

		.action-tag {
			background: rgba(255, 107, 136, 0.18);
			color: #ff9bb0;
		}
	}
</style>
