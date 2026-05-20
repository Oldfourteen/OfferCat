<template>
	<view class="reply-inbox-page" :class="themeClass">
		<view class="top-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="page-title">回复与@</text>
			<view class="top-bar-placeholder"></view>
		</view>

		<scroll-view class="inbox-scroll" scroll-y :show-scrollbar="false">
			<view class="inbox-list" v-if="items.length">
				<view
					class="reply-card"
					v-for="item in items"
					:key="`${item.postId}_${item.commentId}_${item.type}`"
					@click="goToPost(item)"
				>
					<image class="avatar" :src="getAvatar(item.authorAvatar, item.userId)" mode="aspectFill"></image>
					<view class="card-main">
						<view class="card-head">
							<view class="head-left">
								<text class="user-name">{{ getAuthorName(item.authorName, item.userId) }}</text>
								<text class="action-tag" :class="item.type">{{ item.actionText }}</text>
							</view>
							<text class="time-text">{{ formatTime(item.createTime) }}</text>
						</view>
						<text class="reply-text text-wrap-safe">{{ item.content || '暂无回复内容' }}</text>
						<view class="post-line">
							<text class="post-label">在帖子：</text>
							<text class="post-text text-wrap-safe">{{ item.postPreview }}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="empty-state" v-else>
				<text class="empty-title">暂时还没有新的回复与@</text>
				<text class="empty-desc">当别人回复你，或在帖子里 @ 你时，会显示在这里</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { BASE_URL } from '@/api/config.js'
	import themeMixin from '@/utils/themeMixin.js'
	import { getForumRepliesInbox, forumMarkMessagesRead } from '@/api/forum.js'

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
					await forumMarkMessagesRead({ userId: uid, scope: 'replies' })
				} catch (_) {}
			}
			await this.loadInbox()
		},
		methods: {
			async loadInbox() {
				const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = u.userId || u.id
				if (uid) {
					try {
						const res = await getForumRepliesInbox(uid)
						const list = res && res.data
						if (Array.isArray(list) && list.length) {
							this.items = list
						}
					} catch (_) {}
				}
			},
			goBack() {
				const pages = getCurrentPages()
				if (Array.isArray(pages) && pages.length > 1) {
					uni.navigateBack({
						animationType: 'slide-out-right',
						animationDuration: 300
					})
					return
				}
				uni.switchTab({
					url: '/pages/forum/index'
				})
			},
			goToPost(item) {
				if (!item || !item.postId) return
				uni.navigateTo({
					url: `/subPages/forum/detail?id=${encodeURIComponent(String(item.postId))}`,
					animationType: 'slide-in-right',
					animationDuration: 300
				})
			},
			getAvatar(avatar, postUserId) {
				const currentUser = uni.getStorageSync('user') || uni.getStorageSync('user_v2') || {}
				const currentUserId = currentUser.userId || currentUser.id
				if (postUserId && currentUserId && String(postUserId) === String(currentUserId)) {
					const localAvatar = (currentUser.profile && currentUser.profile.avatar) || currentUser.avatar
					if (localAvatar) {
						return this.getFullUrl(localAvatar)
					}
				}
				if (!avatar) return '/static/default-avatar.jpg'
				return this.getFullUrl(avatar)
			},
			getAuthorName(name, postUserId) {
				const currentUser = uni.getStorageSync('user') || uni.getStorageSync('user_v2') || {}
				const currentUserId = currentUser.userId || currentUser.id
				if (postUserId && currentUserId && String(postUserId) === String(currentUserId)) {
					return (currentUser.profile && currentUser.profile.nickname) || currentUser.nickname || name || '匿名用户'
				}
				return name || '匿名用户'
			},
			getFullUrl(url) {
				if (!url) return ''
				if (url.startsWith('http') || url.startsWith('data:')) return url
				return BASE_URL + url
			},
			getTimeValue(timeValue) {
				if (!timeValue) return 0
				if (Array.isArray(timeValue)) {
					const [y, m, d, h = 0, min = 0, sec = 0] = timeValue
					return new Date(y, (m || 1) - 1, d || 1, h, min, sec).getTime()
				}
				if (typeof timeValue === 'number') return timeValue
				const ts = new Date(String(timeValue).replace('T', ' ')).getTime()
				return Number.isNaN(ts) ? 0 : ts
			},
			formatTime(timeStr) {
				const targetTime = this.getTimeValue(timeStr)
				if (targetTime) {
					const diffMs = Date.now() - targetTime
					const minuteMs = 60 * 1000
					const hourMs = 60 * minuteMs
					const dayMs = 24 * hourMs
					if (diffMs >= 0 && diffMs < hourMs) {
						return `${Math.max(1, Math.floor(diffMs / minuteMs))}分钟前`
					}
					if (diffMs >= hourMs && diffMs < dayMs) {
						return `${Math.max(1, Math.floor(diffMs / hourMs))}小时前`
					}
				}
				if (typeof timeStr === 'string') {
					return timeStr.substring(0, 16).replace('T', ' ')
				}
				return String(timeStr || '')
			}
		}
	}
</script>

<style lang="scss">
	.reply-inbox-page {
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

	.inbox-list {
		padding: 0 30rpx calc(40rpx + env(safe-area-inset-bottom));
	}

	.reply-card {
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
		color: #5d76bd;
		background: rgba(93, 118, 189, 0.12);
		flex-shrink: 0;
	}

	.action-tag.mention {
		color: #b65cff;
		background: rgba(182, 92, 255, 0.12);
	}

	.time-text {
		font-size: 22rpx;
		color: #98a2b3;
		flex-shrink: 0;
	}

	.reply-text {
		display: block;
		margin-top: 14rpx;
		font-size: 28rpx;
		line-height: 1.6;
		color: #334155;
	}

	.post-line {
		margin-top: 16rpx;
		font-size: 24rpx;
		line-height: 1.5;
		color: #667085;
	}

	.post-label {
		color: #98a2b3;
	}

	.post-text {
		color: #98a2b3;
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

	.theme-dark.reply-inbox-page {
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

		.reply-card {
			border-bottom-color: rgba(255, 255, 255, 0.08);
		}

		.avatar {
			background: #23252b;
		}

		.reply-text {
			color: #d1d8e5;
		}

		.time-text,
		.post-line,
		.empty-desc {
			color: #8090ad;
		}

		.post-label {
			color: #66758f;
		}

		.post-text {
			color: #8da4e6;
		}

		.action-tag {
			background: rgba(141, 164, 230, 0.18);
			color: #a9bbf0;
		}

		.action-tag.mention {
			background: rgba(182, 92, 255, 0.16);
			color: #d4a7ff;
		}
	}
</style>
