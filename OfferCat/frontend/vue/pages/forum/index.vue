<template>
	<view class="forum-page" :class="themeClass">
		<ForumCollectNoticeStack v-if="noticeLayerVisible" :theme="theme" />
		<view class="forum-header-sticky">
			<view class="header-content">
				<text class="page-title">校园论坛</text>
				<view class="header-actions">
					<view class="action-btn notice-btn" @click="goMessageCenter">
						<text class="notice-symbol">@</text>
						<view class="count-badge" v-if="replyInboxCount > 0">
							<text class="badge-text">{{ replyInboxCount > 99 ? '99+' : replyInboxCount }}</text>
						</view>
					</view>
					<view class="action-btn" @click="goPublish">
						<image v-if="theme === 'dark'" src="/static/png/inline/778edc348b54.png" class="icon-svg"></image>
						<image v-else src="/static/png/inline/f7fc251f5e96.png" class="icon-svg"></image>
					</view>
					<view class="action-btn" @click="goSearch">
						<image v-if="theme === 'dark'" src="/static/png/inline/741f6949dbed.png" class="icon-svg"></image>
						<image v-else src="/static/png/inline/b173320aad74.png" class="icon-svg"></image>
					</view>
				</view>
			</view>
		</view>

		<scroll-view class="forum-scroll" scroll-y :show-scrollbar="false">
			<view class="forum-container">
				<ForumList :theme="theme" />
			</view>
		</scroll-view>

		<AppLiquidTabBar tab-page-path="pages/forum/index" :theme="theme" />
	</view>
</template>

<script>
import ForumList from '@/pages/forum/components/ForumList.vue'
import AppLiquidTabBar from '@/components/AppLiquidTabBar.vue'
import ForumCollectNoticeStack from '@/components/ForumCollectNoticeStack.vue'
import themeMixin from '@/utils/themeMixin.js'
import liquidTabBarPageMixin from '@/mixins/liquidTabBarPageMixin.js'
import { getForumUnreadCounts } from '@/api/forum.js'

export default {
	name: 'ForumIndexPage',
	mixins: [themeMixin, liquidTabBarPageMixin],
	components: {
		AppLiquidTabBar,
		ForumList,
		ForumCollectNoticeStack
	},
	data() {
		return {
			replyInboxCount: 0,
			noticeLayerVisible: false
		}
	},
	onShow() {
		this.noticeLayerVisible = true
		setTimeout(() => {
			void this.loadReplyInboxCount()
		}, 0)
	},
	onHide() {
		this.noticeLayerVisible = false
	},
	methods: {
		async loadReplyInboxCount() {
			this.replyInboxCount = 0
			const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
			const uid = u.userId || u.id
			if (uid) {
				try {
					const res = await getForumUnreadCounts(uid)
					const d = res && res.data
					if (d && typeof d === 'object') {
						const replies = Number(d.replies != null ? d.replies : 0)
						const likes = Number(d.likes != null ? d.likes : 0)
						const friendRequests = Number(d.friendRequests != null ? d.friendRequests : 0)
						const totalRaw = replies + likes + friendRequests
						const state = uni.getStorageSync('forum_badge_state') || {}
						const seenReplies = Number(state.replySeenCount || 0)
						const actualReplies = Math.max(0, replies - seenReplies)
						this.replyInboxCount = actualReplies + likes + friendRequests
						return
					}
				} catch (_) {}
			}
		},
		goMessageCenter() {
			uni.navigateTo({
				url: '/subPages/forum/messageCenter',
				animationType: 'slide-in-right',
				animationDuration: 300
			})
		},
		goPublish() {
			uni.navigateTo({
				url: '/subPages/forum/publish'
			})
		},
		goSearch() {
			uni.navigateTo({
				url: '/subPages/search/search'
			})
		}
	}
}
</script>

<style lang="scss">
	.forum-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}

	.forum-header-sticky {
		padding: calc(var(--status-bar-height) + 20rpx) 30rpx 20rpx;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
		z-index: 100;
		position: relative;

		.header-content {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.page-title {
				font-size: 40rpx;
				font-weight: bold;
				color: #15305e;
			}

			.header-actions {
				display: flex;
				gap: 20rpx;

				.action-btn {
					width: 72rpx;
					height: 72rpx;
					border-radius: 50%;
					background: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

					.icon-svg {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}

	.notice-btn {
		.notice-symbol {
			font-size: 34rpx;
			line-height: 1;
			font-weight: 700;
			color: #1b1b1b;
		}

		.count-badge {
			position: absolute;
			top: -6rpx;
			right: -4rpx;
			min-width: 30rpx;
			height: 30rpx;
			padding: 0 8rpx;
			border-radius: 999rpx;
			background: #ff5b6b;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
		}

		.badge-text {
			font-size: 18rpx;
			font-weight: 700;
			color: #fff;
			line-height: 1;
		}
	}

	.forum-page.theme-dark {
		background-color: #111216;

		.forum-header-sticky {
			background: rgba(17, 18, 22, 0.8);

			.page-title {
				color: #f4f7fb;
			}

			.action-btn {
				background: rgba(255, 255, 255, 0.08);
				border: 1rpx solid rgba(255, 255, 255, 0.08);
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.35);
			}
		}

		.notice-btn {
			.notice-symbol {
				color: #f4f7fb;
			}
		}
	}

	.forum-scroll {
		flex: 1;
		min-height: 0;
	}

	.forum-container {
		padding: 5rpx 30rpx calc(40rpx + 116rpx + env(safe-area-inset-bottom));
	}
</style>
