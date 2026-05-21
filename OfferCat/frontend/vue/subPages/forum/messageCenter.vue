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
			<view class="feature-row-wrap">
				<view class="feature-row">
					<view
						v-for="item in featureItems"
						:key="item.key"
						class="feature-card"
						@click="handleFeatureClick(item)"
					>
						<view class="feature-badge" :class="item.uiClass">
							<text v-if="item.key === 'reply'" class="feature-icon-symbol">@</text>
							<image
								v-else-if="item.key === 'like'"
								class="feature-icon-img"
								:src="msgIconLike"
								mode="aspectFit"
							/>
							<image
								v-else-if="item.key === 'friend'"
								class="feature-icon-img"
								:src="msgIconFriend"
								mode="aspectFit"
							/>
							<view class="feature-count" v-if="item.badge">
								<text class="feature-count-text">{{ item.badge }}</text>
							</view>
						</view>
						<text class="feature-name">{{ item.name }}</text>
					</view>
				</view>
			</view>

			<view class="hero-empty" v-if="sortedConversations.length === 0">
				<view class="empty-blobs" aria-hidden="true">
					<view class="blob blob-a"></view>
					<view class="blob blob-b"></view>
					<view class="blob blob-c"></view>
				</view>
				<text class="empty-title">私聊会话会出现在这里</text>
				<text class="empty-desc">在社区发帖、评论或与好友互动后，可在此处快速进入对话。上方的入口会聚合回复与@提醒、收到喜欢及好友动态。</text>
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
	import { getForumUnreadCounts, getPrivateConversations } from '@/api/forum.js'
	import { MSG_ICON_FRIEND, MSG_ICON_LIKE } from '@/utils/personalSpaceIcons.js'

	const BADGE_STORAGE_KEY = 'forum_message_center_badges'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				msgIconLike: MSG_ICON_LIKE,
				msgIconFriend: MSG_ICON_FRIEND,
				rawReplyCount: 0,
				replySeenCount: 0,
				badgesServerBacked: false,
				likeUnreadCount: 0,
				friendUnreadCount: 0,
				activeConversationId: '',
				conversations: []
			}
		},
		computed: {
			featureItems() {
				const replyCount = Math.max(0, Number(this.rawReplyCount || 0) - Number(this.replySeenCount || 0))
				return [
					{ key: 'reply', name: '回复与@', badge: replyCount > 0 ? (replyCount > 99 ? '99+' : String(replyCount)) : '', uiClass: 'ui-reply' },
					{
						key: 'like',
						name: '收到喜欢',
						badge: this.likeUnreadCount > 0 ? (this.likeUnreadCount > 99 ? '99+' : String(this.likeUnreadCount)) : '',
						uiClass: 'ui-like'
					},
					{
						key: 'friend',
						name: '好友',
						badge: this.friendUnreadCount > 0 ? (this.friendUnreadCount > 99 ? '99+' : String(this.friendUnreadCount)) : '',
						uiClass: 'ui-friend'
					}
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
		async onShow() {
			await this.loadUnreadCounts()
			await this.loadConversations()
		},
		methods: {
			async loadConversations() {
				const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = u.userId || u.id
				if (!uid) return
				try {
					const res = await getPrivateConversations(uid)
					if (res && res.data) {
						this.conversations = res.data.map(c => ({
							id: c.targetUserId,
							name: c.targetUserName,
							avatar: c.targetUserAvatar || '/static/default-avatar.jpg',
							time: c.lastMessageTime,
							preview: c.lastMessageContent,
							pinned: false
						}))
					}
				} catch (e) {
					console.error('获取私信列表失败', e)
				}
			},
			async loadUnreadCounts() {
				const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = u.userId || u.id
				if (uid) {
					try {
						const res = await getForumUnreadCounts(uid)
						const d = res && res.data
						if (d && typeof d === 'object') {
							this.badgesServerBacked = true
							this.replySeenCount = 0
							this.rawReplyCount = Number(d.replies != null ? d.replies : 0)
							this.likeUnreadCount = Number(d.likes != null ? d.likes : 0)
							this.friendUnreadCount = Number(d.friendRequests != null ? d.friendRequests : 0)
							return
						}
					} catch (_) {}
				}
				this.badgesServerBacked = false
				this.rawReplyCount = 0
				this.loadBadgeState()
			},
			loadBadgeState() {
				const badgeState = uni.getStorageSync(BADGE_STORAGE_KEY)
				if (!badgeState || typeof badgeState !== 'object') return
				this.replySeenCount = Number(badgeState.replySeenCount || 0)
				this.likeUnreadCount = Number(badgeState.likeUnreadCount ?? 0)
				this.friendUnreadCount = Number(badgeState.friendUnreadCount ?? 0)
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
					if (!this.badgesServerBacked) {
						this.replySeenCount = Number(this.rawReplyCount || 0)
						this.saveBadgeState()
					}
					uni.navigateTo({
						url: '/subPages/forum/replyInbox',
						animationType: 'slide-in-right',
						animationDuration: 300
					})
					return
				}
				if (item.key === 'like') {
					if (!this.badgesServerBacked) {
						this.likeUnreadCount = 0
						this.saveBadgeState()
					}
					uni.navigateTo({
						url: '/subPages/forum/likeInbox',
						animationType: 'slide-in-right',
						animationDuration: 300
					})
					return
				}
				if (!this.badgesServerBacked) {
					this.friendUnreadCount = 0
					this.saveBadgeState()
				}
				uni.navigateTo({
					url: '/subPages/forum/friendList',
					animationType: 'slide-in-right',
					animationDuration: 300
				})
			},
			goConversation(item) {
				uni.navigateTo({
					url: `/subPages/forum/privateChat?id=${item.id}&name=${encodeURIComponent(item.name)}`,
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
		background: linear-gradient(
			168deg,
			#e8ecf8 0%,
			#f0f3fb 28%,
			#f6f8fc 58%,
			#fafbfe 100%
		);
	}

	.top-bar {
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 22rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(244, 246, 252, 0.9) 100%
		);
		backdrop-filter: blur(14px);
		box-shadow: 0 8rpx 28rpx rgba(38, 51, 78, 0.06);
	}

	.back-btn,
	.top-bar-placeholder {
		width: 72rpx;
		height: 72rpx;
		flex-shrink: 0;
		box-sizing: border-box;
	}

	.back-btn {
		border-radius: 50%;
		padding: 0;
		border: none;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.back-icon {
		font-size: 40rpx;
		line-height: 1;
		color: #333333;
		font-weight: 700;
	}

	.page-title {
		flex: 1;
		text-align: center;
		font-size: 32rpx;
		font-weight: 750;
		letter-spacing: 0.06em;
		color: #1e2638;
		text-shadow: 0 1rpx 0 rgba(255, 255, 255, 0.55);
	}

	.page-scroll {
		flex: 1;
		min-height: 0;
	}

	.feature-row-wrap {
		padding: 28rpx 24rpx 8rpx;
	}

	.feature-row {
		padding: 32rpx 16rpx 36rpx;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		background: #ffffff;
		border-radius: 20rpx;
		border: 1rpx solid rgba(93, 118, 189, 0.1);
		box-shadow: 0 4rpx 20rpx rgba(38, 51, 78, 0.06);
	}

	.feature-card {
		width: 30%;
		max-width: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 4rpx 0 0;
		flex-shrink: 0;
		transition: transform 0.18s ease;

		&:active {
			transform: scale(0.97);
		}
	}

	.feature-badge {
		width: 88rpx;
		height: 88rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border: 1rpx solid rgba(93, 118, 189, 0.12);
	}

	.feature-icon-symbol {
		font-size: 36rpx;
		font-weight: 700;
		line-height: 1;
	}

	.feature-icon-img {
		width: 44rpx;
		height: 44rpx;
		display: block;
	}

	.feature-count {
		position: absolute;
		top: -8rpx;
		right: -10rpx;
		min-width: 32rpx;
		height: 32rpx;
		padding: 0 8rpx;
		border-radius: 999rpx;
		background: #e84555;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 2rpx solid #ffffff;
		box-shadow: 0 2rpx 8rpx rgba(232, 69, 85, 0.25);
	}

	.feature-count-text {
		font-size: 18rpx;
		font-weight: 700;
		line-height: 1;
		color: #fff;
	}

	/* 浅色底 + 主色图标，弱化渐变与高阴影 */
	.ui-reply {
		background: rgba(93, 118, 189, 0.1);
		color: #4a62a8;
	}

	.ui-like {
		background: rgba(232, 112, 143, 0.12);
		color: #c9546e;
	}

	.ui-friend {
		background: rgba(58, 157, 154, 0.12);
		color: #2f8a87;
	}

	.feature-name {
		margin-top: 14rpx;
		font-size: 23rpx;
		font-weight: 600;
		color: #3d4a63;
		line-height: 1.35;
		text-align: center;
	}

	.hero-empty {
		position: relative;
		margin: 28rpx 24rpx 0;
		padding: 48rpx 36rpx 52rpx;
		border-radius: 24rpx;
		border: none;
		background: linear-gradient(165deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 252, 0.88) 100%);
		box-shadow:
			0 14rpx 40rpx rgba(93, 118, 189, 0.1),
			0 4rpx 14rpx rgba(38, 51, 78, 0.04),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.9);
		overflow: hidden;
	}

	.empty-blobs {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.55;
	}

	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(0.5px);
	}

	.blob-a {
		width: 200rpx;
		height: 200rpx;
		right: -40rpx;
		top: -60rpx;
		background: radial-gradient(circle, rgba(93, 118, 189, 0.22) 0%, transparent 70%);
	}

	.blob-b {
		width: 240rpx;
		height: 240rpx;
		left: -80rpx;
		bottom: -100rpx;
		background: radial-gradient(circle, rgba(93, 118, 189, 0.12) 0%, transparent 72%);
	}

	.blob-c {
		width: 120rpx;
		height: 120rpx;
		left: 40%;
		top: 20%;
		background: radial-gradient(circle, rgba(232, 112, 143, 0.12) 0%, transparent 70%);
	}

	.empty-title {
		position: relative;
		z-index: 1;
		display: block;
		font-size: 30rpx;
		font-weight: 750;
		color: #1e2638;
		text-align: center;
		margin-bottom: 16rpx;
	}

	.empty-desc {
		position: relative;
		z-index: 1;
		display: block;
		font-size: 26rpx;
		line-height: 1.65;
		color: #5c6888;
		text-align: center;
	}

	.conversation-list {
		padding: 28rpx 24rpx calc(40rpx + env(safe-area-inset-bottom));
	}

	.conversation-item {
		display: flex;
		gap: 22rpx;
		padding: 26rpx 24rpx;
		margin-bottom: 20rpx;
		border: none;
		border-radius: 22rpx;
		background: linear-gradient(165deg, #ffffff 0%, #f9fafd 100%);
		box-shadow:
			0 10rpx 32rpx rgba(93, 118, 189, 0.08),
			0 2rpx 10rpx rgba(38, 51, 78, 0.04),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.92);

		&:active {
			opacity: 0.96;
		}
	}

	.avatar {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background: #e8ecf4;
		flex-shrink: 0;
		border: none;
		box-shadow:
			0 6rpx 16rpx rgba(93, 118, 189, 0.12),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.6);
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
		background: rgba(93, 118, 189, 0.14);
		font-size: 20rpx;
		color: #4d61a3;
		font-weight: 650;
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
		background: linear-gradient(180deg, #fdfdff 0%, #f6f8fc 100%);
		border: none;
		box-shadow:
			0 -16rpx 56rpx rgba(93, 118, 189, 0.14),
			0 -4rpx 20rpx rgba(38, 51, 78, 0.08);
		z-index: 91;
	}

	.sheet-handle {
		width: 76rpx;
		height: 8rpx;
		border-radius: 999rpx;
		background: rgba(93, 118, 189, 0.2);
		margin: 0 auto;
	}

	.sheet-title {
		display: block;
		margin-top: 22rpx;
		text-align: center;
		font-size: 26rpx;
		font-weight: 750;
		color: #1e2638;
	}

	.sheet-action {
		margin-top: 16rpx;
		padding: 26rpx 20rpx;
		text-align: center;
		font-size: 28rpx;
		font-weight: 600;
		color: #2a3350;
		border-radius: 18rpx;
		border: none;
		background: rgba(93, 118, 189, 0.06);
	}

	.delete-action {
		color: #e84555;
		font-weight: 650;
		background: rgba(232, 69, 85, 0.08);
	}

	.theme-dark.message-center-page {
		background: linear-gradient(168deg, #0e1015 0%, #13161d 42%, #181b24 100%);
	}

	.theme-dark {
		.top-bar {
			background: linear-gradient(180deg, rgba(32, 34, 42, 0.96) 0%, rgba(24, 26, 32, 0.94) 100%);
			box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.45);
			border-bottom: none;
		}

		.back-btn {
			background: #2e323c;
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
		}

		.back-icon,
		.page-title,
		.feature-name,
		.user-name,
		.sheet-title,
		.sheet-action {
			color: #f4f7fb;
		}

		.empty-title {
			color: #f4f7fb;
		}

		.empty-desc {
			color: #9aa6c4;
		}

		.feature-row {
			background: #1e2129;
			border-color: rgba(255, 255, 255, 0.08);
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.35);
		}

		.feature-badge {
			border-color: rgba(255, 255, 255, 0.1);
		}

		.feature-count {
			border-color: #1e2129;
		}

		.ui-reply {
			background: rgba(93, 118, 189, 0.22);
			color: #b8c5f0;
		}

		.ui-like {
			background: rgba(232, 112, 143, 0.18);
			color: #f0a8bc;
		}

		.ui-friend {
			background: rgba(58, 157, 154, 0.2);
			color: #7dd4d1;
		}

		.hero-empty {
			background: linear-gradient(165deg, rgba(38, 40, 48, 0.95) 0%, rgba(28, 30, 36, 0.92) 100%);
			box-shadow:
				0 14rpx 40rpx rgba(0, 0, 0, 0.32),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
		}

		.blob-a {
			background: radial-gradient(circle, rgba(93, 118, 189, 0.28) 0%, transparent 70%);
		}

		.blob-b {
			background: radial-gradient(circle, rgba(93, 118, 189, 0.14) 0%, transparent 72%);
		}

		.preview-text,
		.time-text {
			color: #8a96af;
		}

		.conversation-item {
			background: linear-gradient(165deg, #242830 0%, #1c1f26 100%);
			box-shadow:
				0 10rpx 32rpx rgba(0, 0, 0, 0.28),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
		}

		.avatar {
			background: #2c3038;
			box-shadow:
				0 6rpx 16rpx rgba(0, 0, 0, 0.35),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.06);
		}

		.bottom-sheet {
			background: linear-gradient(180deg, #2a2d36 0%, #22252c 100%);
			box-shadow:
				0 -16rpx 56rpx rgba(0, 0, 0, 0.45),
				0 -4rpx 20rpx rgba(0, 0, 0, 0.25);
		}

		.sheet-handle {
			background: rgba(255, 255, 255, 0.16);
		}

		.sheet-action {
			background: rgba(255, 255, 255, 0.06);
			color: #e8ecf4;
		}

		.delete-action {
			color: #ff8a96;
			background: rgba(232, 69, 85, 0.16);
		}

		.top-tag {
			background: rgba(93, 118, 189, 0.22);
			color: #b8c5f0;
		}
	}
</style>
