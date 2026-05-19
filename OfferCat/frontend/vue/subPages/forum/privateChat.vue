<template>
	<view class="private-chat-page" :class="themeClass">
		<view class="top-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<view class="title-box">
				<text class="page-title">{{ pageTitle }}</text>
				<text class="page-subtitle">私信功能暂未接通，仅展示样式</text>
			</view>
			<view class="top-bar-placeholder"></view>
		</view>

		<scroll-view class="chat-scroll" scroll-y :show-scrollbar="false">
			<view class="chat-list">
				<view
					v-for="item in mockMessages"
					:key="item.id"
					class="chat-item"
					:class="{ 'is-self': item.isSelf }"
				>
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<view class="bubble-wrap">
						<text class="sender-name" v-if="!item.isSelf">{{ pageTitle }}</text>
						<view class="bubble">
							<text class="bubble-text">{{ item.content }}</text>
						</view>
						<text class="message-time">{{ item.time }}</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="input-bar">
			<view class="input-shell">
				<text class="placeholder-text">私信发送功能开发中...</text>
			</view>
			<view class="send-btn disabled">
				<text class="send-text">发送</text>
			</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'

	const DEFAULT_AVATAR = '/static/default-avatar.jpg'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				pageTitle: '私信',
				mockMessages: [
					{
						id: 'm1',
						isSelf: false,
						avatar: DEFAULT_AVATAR,
						content: '看到你发的帖子了，那个项目经历写得很有意思。',
						time: '09:02'
					},
					{
						id: 'm2',
						isSelf: true,
						avatar: DEFAULT_AVATAR,
						content: '谢谢呀，我还想再优化一下结尾那段。',
						time: '09:05'
					},
					{
						id: 'm3',
						isSelf: false,
						avatar: DEFAULT_AVATAR,
						content: '等私信功能接上后，我们可以继续在这里细聊。',
						time: '09:06'
					}
				]
			}
		},
		onLoad(options) {
			if (options && options.name) {
				this.pageTitle = decodeURIComponent(options.name)
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					animationType: 'slide-out-right',
					animationDuration: 300
				})
			}
		}
	}
</script>

<style lang="scss">
	.private-chat-page {
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
		background: rgba(255, 255, 255, 0.92);
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

	.title-box {
		flex: 1;
		min-width: 0;
		text-align: center;
	}

	.page-title {
		display: block;
		font-size: 32rpx;
		font-weight: 700;
		color: #15305e;
	}

	.page-subtitle {
		display: block;
		margin-top: 8rpx;
		font-size: 20rpx;
		color: #98a2b3;
	}

	.chat-scroll {
		flex: 1;
		min-height: 0;
	}

	.chat-list {
		padding: 30rpx 24rpx;
		display: flex;
		flex-direction: column;
		gap: 28rpx;
	}

	.chat-item {
		display: flex;
		align-items: flex-start;
		gap: 16rpx;
	}

	.chat-item.is-self {
		flex-direction: row-reverse;
	}

	.avatar {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: #e8edf5;
		flex-shrink: 0;
	}

	.bubble-wrap {
		max-width: 72%;
		display: flex;
		flex-direction: column;
	}

	.chat-item.is-self .bubble-wrap {
		align-items: flex-end;
	}

	.sender-name {
		font-size: 22rpx;
		color: #98a2b3;
		margin-bottom: 10rpx;
	}

	.bubble {
		padding: 22rpx 24rpx;
		border-radius: 24rpx;
		background: #ffffff;
		box-shadow: 0 6rpx 20rpx rgba(15, 23, 42, 0.06);
	}

	.chat-item.is-self .bubble {
		background: linear-gradient(135deg, #5b79ff, #7c5cff);
	}

	.bubble-text {
		font-size: 28rpx;
		line-height: 1.6;
		color: #24345b;
	}

	.chat-item.is-self .bubble-text {
		color: #ffffff;
	}

	.message-time {
		margin-top: 10rpx;
		font-size: 20rpx;
		color: #98a2b3;
	}

	.input-bar {
		padding: 18rpx 24rpx calc(18rpx + env(safe-area-inset-bottom));
		display: flex;
		align-items: center;
		gap: 18rpx;
		background: rgba(255, 255, 255, 0.94);
		border-top: 1rpx solid rgba(15, 23, 42, 0.06);
	}

	.input-shell {
		flex: 1;
		height: 84rpx;
		padding: 0 26rpx;
		border-radius: 999rpx;
		background: #f2f4f8;
		display: flex;
		align-items: center;
	}

	.placeholder-text {
		font-size: 24rpx;
		color: #98a2b3;
	}

	.send-btn {
		width: 112rpx;
		height: 84rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #5b79ff, #7c5cff);
	}

	.send-btn.disabled {
		opacity: 0.5;
	}

	.send-text {
		font-size: 26rpx;
		font-weight: 700;
		color: #ffffff;
	}

	.theme-dark.private-chat-page {
		background: #111216;
	}

	.theme-dark {
		.top-bar,
		.input-bar {
			background: rgba(17, 18, 22, 0.94);
			border-color: rgba(255, 255, 255, 0.06);
		}

		.back-icon,
		.page-title {
			color: #f4f7fb;
		}

		.page-subtitle,
		.sender-name,
		.message-time,
		.placeholder-text {
			color: #8090ad;
		}

		.avatar {
			background: #23252b;
		}

		.bubble {
			background: #23252b;
			box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.26);
		}

		.bubble-text {
			color: #f4f7fb;
		}

		.input-shell {
			background: #23252b;
		}
	}
</style>
