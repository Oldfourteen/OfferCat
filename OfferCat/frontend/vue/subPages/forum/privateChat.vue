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
				<view class="avatar-wrap">
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<text class="avatar-name">{{ item.isSelf ? '我' : pageTitle }}</text>
				</view>
				<view class="bubble-wrap">
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
	import { getUser, resolveStoredUserId, resolveStoredStudentId, syncUserProfileFromServer } from '@/utils/user.js'

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
				targetAvatar: DEFAULT_AVATAR,
				cacheKey: '',
				pollTimer: null
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
		},
		async onShow() {
			await this.ensureUserContext()
			this.restoreCachedMessages()
			await this.loadHistory()
			this.startPolling()
		},
		onHide() {
			this.stopPolling()
		},
		onUnload() {
			this.stopPolling()
		},
		methods: {
			async ensureUserContext() {
				if (this.myUserId) {
					if (!this.cacheKey && this.targetUserId) {
						this.cacheKey = `forum_private_chat_${String(this.myUserId)}_${String(this.targetUserId)}`
					}
					return
				}
				const cached = getUser() || uni.getStorageSync('user') || {}
				let uid = resolveStoredUserId(cached) || resolveStoredStudentId(cached)
				let nextUser = cached
				if (uid == null) {
					const synced = await syncUserProfileFromServer({ timeout: 8000 })
					if (synced) nextUser = synced
					uid = resolveStoredUserId(nextUser) || resolveStoredStudentId(nextUser)
				}
				this.myUserId = uid || ''
				this.myAvatar = (nextUser && nextUser.avatar) || DEFAULT_AVATAR
				if (this.myUserId && this.targetUserId) {
					this.cacheKey = `forum_private_chat_${String(this.myUserId)}_${String(this.targetUserId)}`
				}
			},
			startPolling() {
				this.stopPolling()
				this.pollTimer = setInterval(() => {
					this.loadHistory({ keepLocal: true })
				}, 4000)
			},
			stopPolling() {
				if (this.pollTimer) {
					clearInterval(this.pollTimer)
					this.pollTimer = null
				}
			},
			restoreCachedMessages() {
				if (!this.cacheKey) return
				const cached = uni.getStorageSync(this.cacheKey)
				if (!cached) return
				if (Array.isArray(cached)) {
					this.messages = cached
					this.scrollToBottom()
					return
				}
				if (cached && Array.isArray(cached.messages)) {
					this.messages = cached.messages
					this.scrollToBottom()
				}
			},
			saveCachedMessages() {
				if (!this.cacheKey) return
				const list = Array.isArray(this.messages) ? this.messages.slice(-120) : []
				uni.setStorageSync(this.cacheKey, { messages: list, updatedAt: Date.now() })
			},
			async loadHistory(options = {}) {
				await this.ensureUserContext()
				if (!this.myUserId || !this.targetUserId) return
				const keepLocal = options.keepLocal !== false
				try {
					const res = await getPrivateChatHistory(this.myUserId, this.targetUserId)
					let raw = res && res.data
					for (let i = 0; i < 3; i++) {
						if (raw && typeof raw === 'object' && raw.data !== undefined && raw.code !== undefined) {
							raw = raw.data
							continue
						}
						break
					}
					const list = Array.isArray(raw)
						? raw
						: raw && Array.isArray(raw.data)
							? raw.data
							: raw && Array.isArray(raw.list)
								? raw.list
								: raw && Array.isArray(raw.records)
									? raw.records
									: []
					if (list.length) {
						const local = keepLocal ? (this.messages || []).filter(m => String(m.id || '').startsWith('local-')) : []
						const serverMessages = list.map(m => ({
							id: m.id,
							isSelf: String(m.senderId) === String(this.myUserId),
							avatar: String(m.senderId) === String(this.myUserId) ? this.myAvatar : this.targetAvatar,
							content: m.content,
							time: this.formatTime(m.createTime)
						}))
						const merged = [...serverMessages]
						for (const lm of local) {
							const duplicated = serverMessages.some(sm => sm.isSelf && sm.content === lm.content)
							if (!duplicated) merged.push(lm)
						}
						this.messages = merged
						this.saveCachedMessages()
						this.scrollToBottom()
					} else if (keepLocal) {
						this.saveCachedMessages()
						this.scrollToBottom()
					}
				} catch (e) {
					console.error('获取聊天记录失败', e)
				}
			},
			formatTime(t) {
				if (!t) return ''
				if (typeof t === 'number') {
					const d = new Date(t)
					const hh = String(d.getHours()).padStart(2, '0')
					const mm = String(d.getMinutes()).padStart(2, '0')
					return `${hh}:${mm}`
				}
				const s = String(t)
				if (s.length >= 16) return s.substring(11, 16)
				return s
			},
			getNowTime() {
				const d = new Date()
				const hh = String(d.getHours()).padStart(2, '0')
				const mm = String(d.getMinutes()).padStart(2, '0')
				return `${hh}:${mm}`
			},
			async handleSend() {
				await this.ensureUserContext()
				if (!this.inputText.trim()) return
				if (!this.myUserId || !this.targetUserId) return
				const content = this.inputText.trim()
				const localId = `local-${Date.now()}-${Math.random().toString(16).slice(2)}`
				this.messages.push({
					id: localId,
					isSelf: true,
					avatar: this.myAvatar,
					content,
					time: this.getNowTime()
				})
				this.saveCachedMessages()
				this.inputText = '' // 先清空输入框
				this.scrollToBottom()
				try {
					await sendPrivateMessage({
						senderId: this.myUserId,
						receiverId: this.targetUserId,
						content: content
					})
					await this.loadHistory({ keepLocal: true })
					this.saveCachedMessages()
				} catch (e) {
					uni.showToast({ title: '发送失败', icon: 'none' })
					console.error('发送私信失败', e)
				}
			},
			scrollToBottom() {
				this.$nextTick(() => {
					const t = 'scroll-bottom'
					this.scrollTarget = this.scrollTarget === t ? '' : t
					this.$nextTick(() => {
						this.scrollTarget = t
					})
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
		background: #f8f9fc;
	}

	.top-bar {
		padding: calc(var(--status-bar-height) + 20rpx) 30rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20rpx);
		box-shadow:
			0 2rpx 12rpx rgba(93, 118, 189, 0.08),
			0 4rpx 20rpx rgba(93, 118, 189, 0.05);
		border-bottom: 1rpx solid rgba(93, 118, 189, 0.08);
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
		color: #4a5568;
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
		color: #4a5568;
	}

	.chat-scroll {
		flex: 1;
		min-height: 0;
	}

	.chat-list {
		padding: 30rpx 24rpx;
		display: flex;
		flex-direction: column;
		gap: 32rpx;
	}

	.chat-item {
		display: flex;
		align-items: flex-start;
		gap: 16rpx;
	}

	.chat-item.is-self {
		flex-direction: row-reverse;
	}

	.avatar-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8rpx;
		flex-shrink: 0;
	}

	.avatar-name {
		font-size: 20rpx;
		color: #8a92a8;
		font-weight: 500;
		max-width: 80rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 28rpx;
		background: linear-gradient(145deg, #7a9ae0 0%, #5d76bd 100%);
		flex-shrink: 0;
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.35),
			0 8rpx 24rpx rgba(93, 118, 189, 0.2),
			inset 0 2rpx 4rpx rgba(255, 255, 255, 0.25),
			inset 0 -2rpx 4rpx rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0.4);
	}

	.bubble-wrap {
		max-width: 72%;
		display: flex;
		flex-direction: column;
	}

	.chat-item.is-self .bubble-wrap {
		align-items: flex-end;
	}

	.bubble {
		padding: 22rpx 28rpx;
		border-radius: 32rpx;
		background: #ffffff;
		box-shadow:
			0 2rpx 8rpx rgba(93, 118, 189, 0.08),
			0 4rpx 16rpx rgba(93, 118, 189, 0.06),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		border: 1rpx solid rgba(93, 118, 189, 0.12);
		word-break: break-word;
		border-bottom-left-radius: 12rpx;
	}

	.chat-item.is-self .bubble {
		background: linear-gradient(145deg, #6b8ad8 0%, #5d76bd 100%);
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.35),
			0 8rpx 24rpx rgba(93, 118, 189, 0.2),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.25);
		border: none;
		border-bottom-right-radius: 12rpx;
		border-bottom-left-radius: 32rpx;
	}

	.bubble-text {
		font-size: 28rpx;
		line-height: 1.6;
		color: #2d3748;
	}

	.chat-item.is-self .bubble-text {
		color: #ffffff;
	}

	.message-time {
		margin-top: 10rpx;
		font-size: 20rpx;
		color: #8a92a8;
	}

	.input-bar {
		padding: 18rpx 24rpx calc(18rpx + env(safe-area-inset-bottom));
		display: flex;
		align-items: center;
		gap: 18rpx;
		background: rgba(255, 255, 255, 0.95);
		border-top: 1rpx solid rgba(93, 118, 189, 0.08);
		box-shadow:
			0 -4rpx 16rpx rgba(93, 118, 189, 0.08),
			0 -8rpx 32rpx rgba(93, 118, 189, 0.05);
	}

	.input-shell {
		flex: 1;
		height: 84rpx;
		padding: 0 26rpx;
		border-radius: 999rpx;
		background: #f8f9fc;
		display: flex;
		align-items: center;
		border: 2rpx solid rgba(93, 118, 189, 0.1);
		box-shadow:
			0 2rpx 8rpx rgba(93, 118, 189, 0.06),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
	}

	.chat-input {
		flex: 1;
		font-size: 28rpx;
		color: #2d3748;
		background: transparent;
	}

	.send-btn {
		width: 112rpx;
		height: 84rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #5d76bd;
		transition: all 0.2s ease;
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.35),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.25);
	}

	.send-btn.disabled {
		opacity: 0.5;
		box-shadow: none;
	}

	.send-text {
		font-size: 26rpx;
		font-weight: 700;
		color: #ffffff;
	}

	.theme-dark.private-chat-page {
		background: #1a1c23;
	}

	.theme-dark {
		.top-bar,
		.input-bar {
			background: rgba(26, 28, 35, 0.95);
			border-color: rgba(255, 255, 255, 0.06);
			box-shadow:
				0 -4rpx 16rpx rgba(0, 0, 0, 0.3);
		}

		.back-icon,
		.page-title {
			color: #eef1f8;
		}

		.avatar-name,
		.message-time {
			color: rgba(255, 255, 255, 0.5);
		}

		.avatar {
			background: linear-gradient(145deg, #6b8ad8 0%, #5d76bd 100%);
			box-shadow:
				0 4rpx 12rpx rgba(93, 118, 189, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.15);
		}

		.bubble {
			background: #2d3038;
			box-shadow:
				0 2rpx 8rpx rgba(0, 0, 0, 0.2),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
			border-color: rgba(255, 255, 255, 0.08);
		}

		.bubble-text {
			color: #eef1f8;
		}

		.chat-input {
			color: #eef1f8;
		}

		.input-shell {
			background: #2d3038;
			border-color: rgba(255, 255, 255, 0.08);
			box-shadow:
				0 2rpx 8rpx rgba(0, 0, 0, 0.2),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
		}

		.send-btn {
			background: #5d76bd;
			box-shadow:
				0 4rpx 12rpx rgba(93, 118, 189, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.15);
		}
	}
</style>
