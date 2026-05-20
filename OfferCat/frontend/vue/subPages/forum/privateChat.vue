<template>
	<view class="private-chat-page" :class="themeClass">
		<view class="top-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<view class="title-box">
				<text class="page-title">{{ pageTitle }}</text>
			</view>
			<view class="top-bar-placeholder"></view>
		</view>

		<scroll-view class="chat-scroll" scroll-y :show-scrollbar="false" :scroll-into-view="scrollTarget">
			<view class="chat-list">
				<view
					v-for="item in messages"
					:key="item.id"
					:id="'msg-' + item.id"
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
			<view id="scroll-bottom" style="height: 10rpx;"></view>
		</scroll-view>

		<view class="input-bar">
			<view class="input-shell">
				<input
					class="chat-input"
					v-model="inputText"
					placeholder="发送私信..."
					confirm-type="send"
					@confirm="handleSend"
				/>
			</view>
			<view class="send-btn" :class="{ disabled: !inputText.trim() }" @click="handleSend">
				<text class="send-text">发送</text>
			</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { getPrivateChatHistory, sendPrivateMessage } from '@/api/forum.js'

	const DEFAULT_AVATAR = '/static/default-avatar.jpg'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				pageTitle: '私信',
				targetUserId: '',
				myUserId: '',
				messages: [],
				inputText: '',
				scrollTarget: '',
				myAvatar: DEFAULT_AVATAR,
				targetAvatar: DEFAULT_AVATAR
			}
		},
		onLoad(options) {
			if (options && options.name) {
				this.pageTitle = decodeURIComponent(options.name)
			}
			if (options && (options.userId || options.id)) {
				this.targetUserId = options.userId || options.id
			}
			if (options && options.avatar) {
				this.targetAvatar = decodeURIComponent(options.avatar) || DEFAULT_AVATAR
			}
			const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
			this.myUserId = u.userId || u.id
			this.myAvatar = u.avatar || DEFAULT_AVATAR
		},
		async onShow() {
			await this.loadHistory()
		},
		methods: {
			async loadHistory() {
				if (!this.myUserId || !this.targetUserId) return
				try {
					const res = await getPrivateChatHistory(this.myUserId, this.targetUserId)
					if (res && res.data) {
						this.messages = res.data.map(m => ({
							id: m.id,
							isSelf: String(m.senderId) === String(this.myUserId),
							avatar: String(m.senderId) === String(this.myUserId) ? this.myAvatar : this.targetAvatar,
							content: m.content,
							time: this.formatTime(m.createTime)
						}))
						this.scrollToBottom()
					}
				} catch (e) {
					console.error('获取聊天记录失败', e)
				}
			},
			formatTime(t) {
				if (!t) return ''
				return t.substring(11, 16) // e.g. "10:30" from "2023-10-10T10:30:00"
			},
			async handleSend() {
				if (!this.inputText.trim()) return
				if (!this.myUserId || !this.targetUserId) return
				const content = this.inputText.trim()
				this.inputText = '' // 先清空输入框
				try {
					await sendPrivateMessage({
						senderId: this.myUserId,
						receiverId: this.targetUserId,
						content: content
					})
					// 重新加载或者直接 push
					await this.loadHistory()
				} catch (e) {
					uni.showToast({ title: '发送失败', icon: 'none' })
					console.error('发送私信失败', e)
				}
			},
			scrollToBottom() {
				this.$nextTick(() => {
					this.scrollTarget = 'scroll-bottom'
				})
			},
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
		word-break: break-word;
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

	.chat-input {
		flex: 1;
		font-size: 28rpx;
		color: #24345b;
		background: transparent;
	}

	.send-btn {
		width: 112rpx;
		height: 84rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #5b79ff, #7c5cff);
		transition: opacity 0.2s;
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
		.message-time {
			color: #8090ad;
		}

		.avatar {
			background: #23252b;
		}

		.bubble {
			background: #23252b;
			box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.26);
		}

		.bubble-text, .chat-input {
			color: #f4f7fb;
		}

		.input-shell {
			background: #23252b;
		}
	}
</style>
