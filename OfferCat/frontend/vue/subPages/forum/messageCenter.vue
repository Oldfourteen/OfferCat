<template>
	<view class="message-center-page" :class="themeClass">
		<view class="top-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="page-title">消息</text>
			<view class="top-bar-placeholder"></view>
		</view>

		<scroll-view class="page-scroll" scroll-y :show-scrollbar="false">
			<view class="feature-row">
				<view
					v-for="item in featureItems"
					:key="item.key"
					class="feature-card"
					@click="handleFeatureClick(item)"
				>
					<view class="feature-badge" :class="item.uiClass">
						<text class="feature-icon">{{ item.icon }}</text>
						<view class="feature-count" v-if="item.badge">
							<text class="feature-count-text">{{ item.badge }}</text>
						</view>
					</view>
					<text class="feature-name">{{ item.name }}</text>
				</view>
			</view>

			<view class="conversation-list">
				<view
					v-for="item in sortedConversations"
					:key="item.id"
					class="conversation-item"
					@click="goConversation(item)"
					@longpress="openActionSheet(item)"
				>
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<view class="conversation-main">
						<view class="conversation-head">
							<view class="head-left">
								<text class="user-name">{{ item.name }}</text>
								<text class="top-tag" v-if="item.pinned">置顶</text>
							</view>
							<text class="time-text">{{ item.time }}</text>
						</view>
						<text class="preview-text text-wrap-safe">{{ item.preview }}</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="sheet-mask" v-if="activeConversation" @click="closeActionSheet"></view>
		<view class="bottom-sheet" :class="{ visible: !!activeConversation }" v-if="activeConversation">
			<view class="sheet-handle"></view>
			<view class="sheet-title">{{ activeConversation.name }}</view>
			<view class="sheet-action" @click="togglePinConversation">
				{{ activeConversation.pinned ? '取消置顶该用户对话' : '置顶该用户对话' }}
			</view>
			<view class="sheet-action delete-action" @click="deleteConversation">删除该用户对话</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { getForumMockReplyInboxUnreadCount } from '@/utils/forumLocalData.js'

	const DEFAULT_AVATAR = '/static/default-avatar.jpg'
	const BADGE_STORAGE_KEY = 'forum_message_center_badges'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				rawReplyCount: 0,
				replySeenCount: 0,
				likeUnreadCount: 6,
				friendUnreadCount: 2,
				activeConversationId: '',
				conversations: [
					{
						id: 'u1',
						name: '小橘同学',
						avatar: DEFAULT_AVATAR,
						preview: '你昨天提到的那个面试题，我整理了一份思路给你。',
						time: '09:18',
						pinned: true
					},
					{
						id: 'u2',
						name: '北海',
						avatar: DEFAULT_AVATAR,
						preview: '晚点一起看一下论坛里那条校招信息吗？',
						time: '昨天',
						pinned: false
					},
					{
						id: 'u3',
						name: '桃子学姐',
						avatar: DEFAULT_AVATAR,
						preview: '简历项目经历那一段可以再往结果导向上改一改。',
						time: '周日',
						pinned: false
					},
					{
						id: 'u4',
						name: '银河旅人',
						avatar: DEFAULT_AVATAR,
						preview: '收到，等你把作品集链接发我，我帮你再过一遍。',
						time: '05/17',
						pinned: false
					}
				]
			}
		},
		computed: {
			featureItems() {
				const replyCount = Math.max(0, Number(this.rawReplyCount || 0) - Number(this.replySeenCount || 0))
				return [
					{ key: 'reply', name: '回复与@', icon: '@', badge: replyCount > 0 ? (replyCount > 99 ? '99+' : String(replyCount)) : '', uiClass: 'ui-reply' },
					{ key: 'like', name: '收到喜欢', icon: '*', badge: this.likeUnreadCount > 0 ? (this.likeUnreadCount > 99 ? '99+' : String(this.likeUnreadCount)) : '', uiClass: 'ui-like' },
					{ key: 'friend', name: '好友', icon: 'F', badge: this.friendUnreadCount > 0 ? (this.friendUnreadCount > 99 ? '99+' : String(this.friendUnreadCount)) : '', uiClass: 'ui-friend' }
				]
			},
			activeConversation() {
				return this.conversations.find(item => item.id === this.activeConversationId) || null
			},
			sortedConversations() {
				return [...this.conversations].sort((a, b) => {
					if (a.pinned === b.pinned) return 0
					return a.pinned ? -1 : 1
				})
			}
		},
		onShow() {
			this.loadBadgeState()
			this.rawReplyCount = getForumMockReplyInboxUnreadCount()
		},
		methods: {
			loadBadgeState() {
				const badgeState = uni.getStorageSync(BADGE_STORAGE_KEY)
				if (!badgeState || typeof badgeState !== 'object') return
				this.replySeenCount = Number(badgeState.replySeenCount || 0)
				this.likeUnreadCount = Number(badgeState.likeUnreadCount ?? 6)
				this.friendUnreadCount = Number(badgeState.friendUnreadCount ?? 2)
			},
			saveBadgeState() {
				uni.setStorageSync(BADGE_STORAGE_KEY, {
					replySeenCount: this.replySeenCount,
					likeUnreadCount: this.likeUnreadCount,
					friendUnreadCount: this.friendUnreadCount
				})
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
			handleFeatureClick(item) {
				if (item.key === 'reply') {
					this.replySeenCount = Number(this.rawReplyCount || 0)
					this.saveBadgeState()
					uni.navigateTo({
						url: '/subPages/forum/replyInbox',
						animationType: 'slide-in-right',
						animationDuration: 300
					})
					return
				}
				if (item.key === 'like') {
					this.likeUnreadCount = 0
					this.saveBadgeState()
					uni.navigateTo({
						url: '/subPages/forum/likeInbox',
						animationType: 'slide-in-right',
						animationDuration: 300
					})
					return
				}
				this.friendUnreadCount = 0
				this.saveBadgeState()
				uni.navigateTo({
					url: '/subPages/forum/friendList',
					animationType: 'slide-in-right',
					animationDuration: 300
				})
			},
			goConversation(item) {
				uni.navigateTo({
					url: `/subPages/forum/privateChat?name=${encodeURIComponent(item.name)}`,
					animationType: 'slide-in-right',
					animationDuration: 300
				})
			},
			openActionSheet(item) {
				this.activeConversationId = item.id
			},
			closeActionSheet() {
				this.activeConversationId = ''
			},
			togglePinConversation() {
				if (!this.activeConversation) return
				this.conversations = this.conversations.map(item =>
					item.id === this.activeConversation.id ? { ...item, pinned: !item.pinned } : item
				)
				this.closeActionSheet()
			},
			deleteConversation() {
				if (!this.activeConversation) return
				this.conversations = this.conversations.filter(item => item.id !== this.activeConversation.id)
				this.closeActionSheet()
			}
		}
	}
</script>

<style lang="scss">
	.message-center-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #ffffff;
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

	.page-scroll {
		flex: 1;
		min-height: 0;
	}

	.feature-row {
		padding: 38rpx 30rpx 0;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 18rpx;
	}

	.feature-card {
		width: 144rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 8rpx 0 0;
		flex-shrink: 0;
	}

	.feature-badge {
		width: 88rpx;
		height: 88rpx;
		border-radius: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.feature-icon {
		font-size: 38rpx;
		font-weight: 700;
		color: #fff;
		line-height: 1;
	}

	.feature-count {
		position: absolute;
		top: -8rpx;
		right: -12rpx;
		min-width: 32rpx;
		height: 32rpx;
		padding: 0 8rpx;
		border-radius: 999rpx;
		background: #ff4d5a;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.feature-count-text {
		font-size: 18rpx;
		font-weight: 700;
		line-height: 1;
		color: #fff;
	}

	.ui-reply {
		background: linear-gradient(135deg, #7c5cff, #5b79ff);
	}

	.ui-like {
		background: linear-gradient(135deg, #ff7a7a, #ff5b8a);
	}

	.ui-friend {
		background: linear-gradient(135deg, #34c7aa, #2ba0ff);
	}

	.feature-name {
		margin-top: 14rpx;
		font-size: 24rpx;
		font-weight: 600;
		color: #24345b;
		line-height: 1.4;
	}

	.conversation-list {
		padding: 54rpx 30rpx calc(40rpx + env(safe-area-inset-bottom));
	}

	.conversation-item {
		display: flex;
		gap: 22rpx;
		padding: 30rpx 0;
		border-bottom: 1rpx solid rgba(15, 23, 42, 0.08);
	}

	.avatar {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background: #eef2f7;
		flex-shrink: 0;
	}

	.conversation-main {
		flex: 1;
		min-width: 0;
	}

	.conversation-head {
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

	.top-tag {
		padding: 6rpx 14rpx;
		border-radius: 999rpx;
		background: rgba(91, 121, 255, 0.12);
		font-size: 20rpx;
		color: #5b79ff;
		flex-shrink: 0;
	}

	.time-text {
		font-size: 22rpx;
		color: #98a2b3;
		flex-shrink: 0;
	}

	.preview-text {
		display: block;
		margin-top: 12rpx;
		font-size: 26rpx;
		line-height: 1.6;
		color: #667085;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.sheet-mask {
		position: fixed;
		inset: 0;
		background: rgba(15, 23, 42, 0.36);
		z-index: 90;
	}

	.bottom-sheet {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 18rpx 30rpx calc(24rpx + env(safe-area-inset-bottom));
		border-radius: 28rpx 28rpx 0 0;
		background: #ffffff;
		box-shadow: 0 -10rpx 40rpx rgba(15, 23, 42, 0.16);
		z-index: 91;
	}

	.sheet-handle {
		width: 76rpx;
		height: 8rpx;
		border-radius: 999rpx;
		background: rgba(15, 23, 42, 0.12);
		margin: 0 auto;
	}

	.sheet-title {
		display: block;
		margin-top: 22rpx;
		text-align: center;
		font-size: 26rpx;
		font-weight: 700;
		color: #24345b;
	}

	.sheet-action {
		margin-top: 18rpx;
		padding: 28rpx 20rpx;
		text-align: center;
		font-size: 28rpx;
		color: #24345b;
		border-top: 1rpx solid rgba(15, 23, 42, 0.06);
	}

	.delete-action {
		color: #ff5b6b;
	}

	.theme-dark.message-center-page {
		background: #111216;
	}

	.theme-dark {
		.top-bar {
			background: rgba(17, 18, 22, 0.92);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}

		.back-icon,
		.page-title,
		.feature-name,
		.user-name,
		.sheet-title,
		.sheet-action {
			color: #f4f7fb;
		}

		.preview-text,
		.time-text {
			color: #8a96af;
		}

		.conversation-item {
			border-bottom-color: rgba(255, 255, 255, 0.08);
		}

		.avatar {
			background: #23252b;
		}

		.bottom-sheet {
			background: #1b1d23;
			box-shadow: 0 -10rpx 40rpx rgba(0, 0, 0, 0.34);
		}

		.sheet-handle {
			background: rgba(255, 255, 255, 0.14);
		}

		.sheet-action {
			border-top-color: rgba(255, 255, 255, 0.08);
		}

		.top-tag {
			background: rgba(141, 164, 230, 0.18);
			color: #a9bbf0;
		}
	}
</style>
