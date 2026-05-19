<template>
	<view class="friend-page" :class="themeClass">
		<view class="top-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="page-title">好友</text>
			<view class="top-bar-placeholder"></view>
		</view>

		<scroll-view class="page-scroll" scroll-y :show-scrollbar="false">
			<view class="section-card">
				<view class="section-head">
					<text class="section-title">好友申请</text>
				</view>
				<view
					v-for="item in pendingFriends"
					:key="item.id"
					class="request-item"
				>
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<view class="item-main">
						<view class="item-head">
							<text class="user-name">{{ item.name }}</text>
							<text class="time-text">{{ item.time }}</text>
						</view>
						<text class="item-desc text-wrap-safe">{{ item.desc }}</text>
					</view>
					<view class="pill-btn">通过</view>
				</view>
			</view>

			<view class="section-card">
				<view class="section-head">
					<text class="section-title">我的好友</text>
				</view>
				<view
					v-for="item in friends"
					:key="item.id"
					class="friend-item"
					@click="goPrivateChat(item)"
				>
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<view class="item-main">
						<view class="item-head">
							<view class="name-row">
								<text class="user-name">{{ item.name }}</text>
								<text class="tag-text" v-if="item.tag">{{ item.tag }}</text>
							</view>
							<text class="time-text">{{ item.lastSeen }}</text>
						</view>
						<text class="item-desc text-wrap-safe">{{ item.bio }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'

	const DEFAULT_AVATAR = '/static/default-avatar.jpg'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				pendingFriends: [
					{
						id: 'p1',
						name: '朝阳',
						avatar: DEFAULT_AVATAR,
						time: '3分钟前',
						desc: '通过论坛互相关注后，发来好友申请。'
					},
					{
						id: 'p2',
						name: '鹿鸣',
						avatar: DEFAULT_AVATAR,
						time: '昨天',
						desc: '想和你交流一下简历优化与实习投递经验。'
					}
				],
				friends: [
					{
						id: 'f1',
						name: '小橘同学',
						avatar: DEFAULT_AVATAR,
						tag: '互关',
						lastSeen: '刚刚在线',
						bio: '最近在准备前端面试，也在整理自己的作品集。'
					},
					{
						id: 'f2',
						name: '北海',
						avatar: DEFAULT_AVATAR,
						tag: '同专业',
						lastSeen: '5分钟前',
						bio: '主要关注校招资讯，平时会分享笔试真题和面经。'
					},
					{
						id: 'f3',
						name: '桃子学姐',
						avatar: DEFAULT_AVATAR,
						tag: '已加好友',
						lastSeen: '今天',
						bio: '简历修改和实习复盘经验很丰富，聊天很有帮助。'
					},
					{
						id: 'f4',
						name: '银河旅人',
						avatar: DEFAULT_AVATAR,
						tag: '',
						lastSeen: '昨天',
						bio: '常分享设计灵感、活动信息和作品集排版建议。'
					}
				]
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					animationType: 'slide-out-right',
					animationDuration: 300
				})
			},
			goPrivateChat(item) {
				uni.navigateTo({
					url: `/subPages/forum/privateChat?name=${encodeURIComponent(item.name)}`,
					animationType: 'slide-in-right',
					animationDuration: 300
				})
			}
		}
	}
</script>

<style lang="scss">
	.friend-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f7f8fb;
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

	.section-card {
		background: #ffffff;
		box-shadow: 0 10rpx 28rpx rgba(15, 23, 42, 0.06);
	}

	.section-card {
		margin: 28rpx 30rpx 0;
		padding: 10rpx 24rpx;
	}

	.section-head {
		padding: 20rpx 6rpx 10rpx;
	}

	.section-title {
		display: block;
		font-size: 30rpx;
		font-weight: 700;
		color: #24345b;
	}

	.request-item,
	.friend-item {
		display: flex;
		align-items: center;
		gap: 18rpx;
		padding: 24rpx 6rpx;
		border-top: 1rpx solid rgba(15, 23, 42, 0.06);
	}

	.avatar {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background: #e8edf5;
		flex-shrink: 0;
	}

	.item-main {
		flex: 1;
		min-width: 0;
	}

	.item-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
	}

	.name-row {
		display: flex;
		align-items: center;
		gap: 10rpx;
		min-width: 0;
	}

	.user-name {
		font-size: 30rpx;
		font-weight: 700;
		color: #24345b;
	}

	.tag-text {
		padding: 6rpx 12rpx;
		border-radius: 999rpx;
		background: rgba(91, 121, 255, 0.12);
		font-size: 20rpx;
		color: #5b79ff;
	}

	.time-text {
		font-size: 22rpx;
		color: #98a2b3;
		flex-shrink: 0;
	}

	.item-desc {
		display: block;
		margin-top: 10rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #667085;
	}

	.pill-btn {
		padding: 14rpx 24rpx;
		border-radius: 999rpx;
		background: linear-gradient(135deg, #5b79ff, #7c5cff);
		font-size: 22rpx;
		font-weight: 700;
		color: #ffffff;
		flex-shrink: 0;
	}

	.theme-dark.friend-page {
		background: #111216;
	}

	.theme-dark {
		.top-bar {
			background: rgba(17, 18, 22, 0.92);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}

		.back-icon,
		.page-title,
		.section-title,
		.user-name {
			color: #f4f7fb;
		}

		.section-card {
			background: #1b1d23;
			box-shadow: 0 10rpx 28rpx rgba(0, 0, 0, 0.22);
		}

		.time-text,
		.item-desc {
			color: #8090ad;
		}

		.request-item,
		.friend-item {
			border-top-color: rgba(255, 255, 255, 0.08);
		}

		.avatar {
			background: #23252b;
		}

		.tag-text {
			background: rgba(141, 164, 230, 0.18);
			color: #a9bbf0;
		}
	}
</style>
