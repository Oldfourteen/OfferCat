<template>
	<view class="online-service-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="goBack">
				<view class="nav-icon-btn">
					<text class="back-icon">‹</text>
				</view>
			</view>
			<text class="nav-title">在线客服</text>
			<view class="nav-right" @click="showMenu">
				<view class="nav-icon-btn is-menu">
					<text class="menu-icon">⋮</text>
				</view>
			</view>
		</view>

		<!-- 菜单弹窗 -->
		<view class="menu-modal" v-if="showMenuModal" @click="closeMenu">
			<view class="menu-content" @click.stop>
				<view class="menu-item" @click="clearLocalHistory">
					<text class="menu-icon-text">🗑️</text>
					<text class="menu-text">清空聊天记录</text>
				</view>
			</view>
		</view>

		<!-- 聊天内容区域 -->
		<scroll-view 
			class="chat-content" 
			scroll-y 
			:scroll-into-view="scrollToId"
			scroll-with-animation
		>
			<!-- 历史消息分隔线 -->
			<view class="history-divider">
				<text class="divider-text">—— 以上为历史消息 ——</text>
			</view>

			<!-- 消息列表 -->
			<view class="message-list">
				<view 
					class="message-item" 
					v-for="(msg, index) in messageList" 
					:key="index"
					:id="'msg-' + index"
					:class="{ 'is-self': msg.isSelf }"
				>
					<view class="avatar-wrapper">
						<view class="avatar" :class="{ 'self-avatar': msg.isSelf }">
							<text class="avatar-text">{{ msg.isSelf ? '我' : '客' }}</text>
						</view>
					</view>
					<view class="message-content">
						<text class="message-text">{{ msg.content }}</text>
						<text class="message-time">{{ msg.time }}</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="bottom-sheet-stack">
			<!-- 快捷问题区域 -->
			<view class="quick-questions">
				<view class="quick-header" @click="toggleQuickQuestions">
					<text class="quick-title">猜你想问</text>
					<view class="quick-header-right">
						<text class="quick-refresh" @click.stop="refreshQuickQuestions">↻</text>
						<text class="quick-arrow" :class="{ expanded: showQuickQuestions }">▼</text>
					</view>
				</view>
				<view class="quick-list" v-show="showQuickQuestions">
					<view
						class="quick-item"
						v-for="(item, index) in quickQuestions"
						:key="index"
						@click="sendQuickQuestion(item)"
					>
						<text class="quick-text">{{ item }}</text>
					</view>
				</view>
			</view>

			<!-- 输入区域 -->
			<view class="input-area">
				<view class="input-wrapper">
					<input
						class="message-input"
						type="text"
						v-model="inputMessage"
						placeholder="输入消息..."
						@confirm="sendMessage"
					/>
					<view class="send-btn" :class="{ active: inputMessage.trim() }" @click="sendMessage">
						<text class="send-text">发送</text>
					</view>
				</view>
				<view class="bottom-links">
					<text class="link-text">隐私政策</text>
					<text class="link-divider">|</text>
					<text class="link-text人工" @click="showContactOptions">联系管理员</text>
				</view>

				<!-- 联系选项弹窗 -->
				<view class="contact-modal" v-if="showContactModal" @click="closeContactModal">
					<view class="contact-modal-content" @click.stop>
						<text class="contact-modal-title">联系管理员</text>
						<view class="contact-options">
							<view class="contact-option" @click="callAdmin">
								<text class="contact-icon">📞</text>
								<view class="contact-info">
									<text class="contact-label">电话联系</text>
									<text class="contact-value">150-92730328</text>
								</view>
							</view>
							<view class="contact-option" @longpress="copyPhone">
								<text class="contact-icon">📋</text>
								<view class="contact-info">
									<text class="contact-label">复制号码</text>
									<text class="contact-value">长按复制</text>
								</view>
							</view>
						</view>
						<view class="contact-modal-cancel" @click="closeContactModal">
							<text class="cancel-text">取消</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { getApiBase } from '@/api/config.js'
	import { getToken } from '@/utils/token.js'
	import { getUser, resolveStoredStudentId, resolveStoredUserId } from '@/utils/user.js'

	/** 与 chat 服务约定：0 表示客服端 */
	const CS_BOT_ID = 0

	export default {
		mixins: [themeMixin],
		data() {
			return {
				inputMessage: '',
				messageList: [],
				showMenuModal: false,
				showContactModal: false,
				showQuickQuestions: true,
				scrollToId: '',
				quickQuestions: [
					'如何创建简历？',
					'如何修改密码？',
					'如何联系客服？',
					'如何备份数据？',
					'如何注销账号？',
					'开始AI面试学习',
					'模拟面试练习'
				],
				isHumanService: false,
				adminPhone: '15092730328'
			}
		},
		onLoad() {
			this.loadMessages()
		},
		watch: {
			messageList() {
				setTimeout(() => {
					this.scrollToBottom()
				}, 100)
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			showMenu() {
				this.showMenuModal = true
			},
			closeMenu() {
				this.showMenuModal = false
			},
			loadMessages() {
				const localMessages = uni.getStorageSync('chat_messages') || []
				if (localMessages.length > 0) {
					this.messageList = localMessages
				} else {
					this.messageList = [
						{ isSelf: false, content: '您好呀，我是您的智能助理，遇到的产品和购物问题，请您详细描述下，我会尽全力帮您解答的~', time: this.getCurrentTime() }
					]
					this.saveMessages()
				}
			},
			buildChatPersistencePayload(messageList, userId) {
				const rows = []
				for (const msg of messageList || []) {
					if (!msg || typeof msg.content !== 'string') continue
					if (msg.isSelf) {
						rows.push({
							senderId: userId,
							receiverId: CS_BOT_ID,
							content: msg.content,
							messageType: 0,
							isRead: 1
						})
					} else {
						rows.push({
							senderId: CS_BOT_ID,
							receiverId: userId,
							content: msg.content,
							messageType: 0,
							isRead: 1
						})
					}
				}
				return rows
			},
			saveMessages() {
				uni.setStorageSync('chat_messages', this.messageList)

				const userId = resolveStoredUserId(getUser())
				if (!userId) {
					return
				}
				const messages = this.buildChatPersistencePayload(this.messageList, userId)
				if (!messages.length) {
					return
				}

				const token = getToken()
				const headers = {
					'Content-Type': 'application/json'
				}
				if (token) {
					headers['Authorization'] = `Bearer ${token}`
				}
				uni.request({
					url: `${getApiBase()}/api/chat/save`,
					method: 'POST',
					header: headers,
					data: { messages },
					fail: () => {
						console.log('保存到服务器失败，已保存到本地')
					}
				})
			},
			sendMessage() {
				if (!this.inputMessage.trim()) return

				const newMessage = {
					isSelf: true,
					content: this.inputMessage.trim(),
					time: this.getCurrentTime()
				}

				this.messageList.push(newMessage)
				this.inputMessage = ''
				this.saveMessages()

				setTimeout(() => {
					this.receiveReply()
				}, 1000)
			},
			receiveReply() {
				const replies = [
					'好的，我明白了，我会尽快帮您处理。',
					'请稍等，我正在查询相关信息...',
					'感谢您的反馈，我们会认真处理。',
					'请问还有其他问题需要帮助吗？',
					'已收到您的消息，稍后会有专人回复。'
				]
				const randomReply = replies[Math.floor(Math.random() * replies.length)]
				
				const replyMessage = {
					isSelf: false,
					content: randomReply,
					time: this.getCurrentTime()
				}

				this.messageList.push(replyMessage)
				this.saveMessages()
			},
			sendQuickQuestion(question) {
				if (question === '开始AI面试学习' || question === '模拟面试练习') {
					this.callAiInterviewApi(question)
				} else {
					this.inputMessage = question
					this.sendMessage()
				}
			},
			callAiInterviewApi(type) {
				const studentId = resolveStoredStudentId(getUser())
				if (!studentId) {
					uni.showToast({ title: '请先登录并完成学生资料', icon: 'none' })
					return
				}
				const isLearn = type === '开始AI面试学习'
				const targetPosition = isLearn ? 'AI面试学习' : '模拟面试练习'
				const interviewMode = isLearn ? 2 : 1
				const formBody =
					`studentId=${encodeURIComponent(studentId)}` +
					`&targetPosition=${encodeURIComponent(targetPosition)}` +
					`&mode=${encodeURIComponent(interviewMode)}`

				uni.showLoading({ title: '正在连接AI...' })
				const token = getToken()
				const headers = {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
				if (token) {
					headers['Authorization'] = `Bearer ${token}`
				}
				uni.request({
					url: `${getApiBase()}/api/ai/interview/session/init`,
					method: 'POST',
					header: headers,
					data: formBody,
					success: (res) => {
						uni.hideLoading()
						const body = res.data
						const ok = res.statusCode >= 200 && res.statusCode < 300 && body && body.sessionId != null
						this.messageList.push({
							isSelf: true,
							content: type,
							time: this.getCurrentTime()
						})
						if (ok) {
							const sid = body.sessionId
							this.messageList.push({
								isSelf: false,
								content: `已为你在云端创建 AI 面试会话（编号 ${sid}）。请前往 App 内的「模拟面试」等入口继续作答。`,
								time: this.getCurrentTime()
							})
						} else {
							this.messageList.push({
								isSelf: false,
								content: 'AI面试服务暂时不可用，请稍后再试。',
								time: this.getCurrentTime()
							})
						}
						this.saveMessages()
					},
					fail: () => {
						uni.hideLoading()
						this.messageList.push({
							isSelf: true,
							content: type,
							time: this.getCurrentTime()
						})
						this.messageList.push({
							isSelf: false,
							content: '网络连接失败，请检查网络后重试。',
							time: this.getCurrentTime()
						})
						this.saveMessages()
					}
				})
			},
			refreshQuickQuestions() {
				uni.showToast({ title: '已刷新', icon: 'none' })
			},
			showContactOptions() {
				uni.showModal({
					title: '联系人工客服',
					content: '请致电：15092730328',
					showCancel: false,
					confirmText: '知道了',
					success: () => {
						uni.makePhoneCall({
							phoneNumber: this.adminPhone,
							fail: () => {}
						})
					}
				})
			},
			toggleQuickQuestions() {
				this.showQuickQuestions = !this.showQuickQuestions
			},
			closeContactModal() {
				this.showContactModal = false
			},
			callAdmin() {
				uni.makePhoneCall({
					phoneNumber: this.adminPhone,
					success: () => {
						console.log('拨打电话成功')
					},
					fail: () => {
						uni.showToast({ title: '拨打电话失败', icon: 'none' })
					}
				})
				this.closeContactModal()
			},
			copyPhone() {
				uni.setClipboardData({
					data: this.adminPhone,
					success: () => {
						uni.showToast({ title: '已复制号码', icon: 'success' })
					},
					fail: () => {
						uni.showToast({ title: '复制失败', icon: 'none' })
					}
				})
			},
			clearLocalHistory() {
				uni.showModal({
					title: '确认清空',
					content: '确定要清空本地聊天记录吗？（服务器记录不受影响）',
					confirmColor: '#ff4d4f',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('chat_messages')
							this.messageList = []
							this.showMenuModal = false
							uni.showToast({ title: '已清空本地记录', icon: 'success' })
						}
					}
				})
			},
			getCurrentTime() {
				const now = new Date()
				const hours = now.getHours().toString().padStart(2, '0')
				const minutes = now.getMinutes().toString().padStart(2, '0')
				return `${hours}:${minutes}`
			},
			scrollToBottom() {
				if (this.messageList.length > 0) {
					this.scrollToId = 'msg-' + (this.messageList.length - 1)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.online-service-page {
		min-height: 100vh;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(
			168deg,
			#e4e9f5 0%,
			#eceff8 38%,
			#f2f4fb 72%,
			#fafbfe 100%
		);
		box-sizing: border-box;
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 12rpx) 20rpx 16rpx;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.96) 0%,
			rgba(245, 247, 252, 0.94) 100%
		);
		backdrop-filter: blur(12px);
		box-shadow:
			0 8rpx 28rpx rgba(38, 51, 78, 0.07),
			inset 0 -1rpx 0 rgba(93, 118, 189, 0.06);

		.nav-left,
		.nav-right {
			width: 72rpx;
			height: 72rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		}

		.nav-title {
			flex: 1;
			text-align: center;
			font-size: 32rpx;
			font-weight: 750;
			letter-spacing: 0.04em;
			color: #1e2638;
		}

		.nav-icon-btn {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow:
				0 6rpx 18rpx rgba(93, 118, 189, 0.14),
				0 2rpx 6rpx rgba(45, 58, 95, 0.05),
				inset 0 2rpx 0 rgba(255, 255, 255, 0.88);

			&.is-menu .menu-icon {
				margin-top: -6rpx;
				letter-spacing: 2rpx;
			}
		}

		.back-icon {
			font-size: 40rpx;
			line-height: 1;
			color: #1e2638;
			font-weight: 300;
			margin-left: -4rpx;
			margin-top: -4rpx;
		}

		.menu-icon {
			font-size: 34rpx;
			font-weight: 700;
			color: #3d4760;
			line-height: 1;
		}
	}

	.chat-content {
		flex: 1;
		min-height: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 22rpx 16rpx;
	}

	.bottom-sheet-stack {
		flex-shrink: 0;
		background: linear-gradient(180deg, rgba(253, 254, 255, 0.98) 0%, #f5f7fc 100%);
		box-shadow:
			0 -10rpx 36rpx rgba(93, 118, 189, 0.1),
			0 -2rpx 12rpx rgba(38, 51, 78, 0.04);
		border-radius: 24rpx 24rpx 0 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.menu-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(15, 22, 36, 0.45);
		display: flex;
		align-items: flex-end;
		z-index: 1000;
	}

	.menu-content {
		width: 100%;
		background: linear-gradient(180deg, #ffffff 0%, #f4f6fc 100%);
		border-radius: 28rpx 28rpx 0 0;
		padding: 28rpx 24rpx;
		padding-bottom: calc(28rpx + env(safe-area-inset-bottom));
		box-shadow: 0 -12rpx 48rpx rgba(93, 118, 189, 0.12);

		.menu-item {
			display: flex;
			align-items: center;
			gap: 16rpx;
			padding: 24rpx 20rpx;
			background: linear-gradient(
				165deg,
				rgba(255, 120, 120, 0.1) 0%,
				rgba(255, 236, 236, 0.65) 100%
			);
			border-radius: 18rpx;
			border: none;
			box-shadow:
				inset 0 1rpx 0 rgba(255, 255, 255, 0.75),
				0 6rpx 18rpx rgba(232, 85, 85, 0.12);

			.menu-icon-text {
				font-size: 32rpx;
			}

			.menu-text {
				font-size: 28rpx;
				color: #d94848;
				font-weight: 650;
			}
		}
	}

	.contact-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(15, 22, 36, 0.48);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1002;
	}

	.contact-modal-content {
		width: 600rpx;
		max-width: 90vw;
		background: linear-gradient(165deg, #ffffff 0%, #f6f8fd 100%);
		border-radius: 24rpx;
		padding: 36rpx 28rpx 28rpx;
		box-shadow:
			0 24rpx 60rpx rgba(38, 51, 78, 0.2),
			0 8rpx 24rpx rgba(93, 118, 189, 0.12),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.9);

		.contact-modal-title {
			font-size: 32rpx;
			font-weight: 750;
			color: #1e2638;
			text-align: center;
			display: block;
			margin-bottom: 28rpx;
		}

		.contact-options {
			display: flex;
			flex-direction: column;
			gap: 16rpx;
		}

		.contact-option {
			display: flex;
			align-items: center;
			gap: 16rpx;
			padding: 22rpx 20rpx;
			background: linear-gradient(
				165deg,
				rgba(93, 118, 189, 0.08) 0%,
				rgba(255, 255, 255, 0.92) 100%
			);
			border-radius: 18rpx;
			box-shadow:
				0 6rpx 16rpx rgba(93, 118, 189, 0.08),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.85);

			.contact-icon {
				font-size: 32rpx;
			}

			.contact-label {
				font-size: 22rpx;
				color: #7c88a8;
				display: block;
			}

			.contact-value {
				font-size: 28rpx;
				color: #1e2638;
				font-weight: 650;
				display: block;
				margin-top: 6rpx;
			}
		}

		.contact-modal-cancel {
			margin-top: 24rpx;
			padding: 22rpx;
			background: linear-gradient(180deg, #e8ecf4 0%, #dde2ee 100%);
			border-radius: 16rpx;
			text-align: center;
			box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.85);

			.cancel-text {
				font-size: 28rpx;
				font-weight: 600;
				color: #5c6680;
			}
		}
	}

	.contact-option .contact-info {
		flex: 1;
		min-width: 0;
	}

	.history-divider {
		text-align: center;
		margin: 8rpx 0 28rpx;

		.divider-text {
			font-size: 22rpx;
			color: #7c88a8;
			font-weight: 500;
			padding: 10rpx 28rpx;
			background: rgba(93, 118, 189, 0.1);
			border-radius: 999rpx;
			box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.65);
		}
	}

	.message-list {
		display: flex;
		flex-direction: column;
		gap: 22rpx;
		padding-bottom: 16rpx;
	}

	.message-item {
		display: flex;
		align-items: flex-end;
		gap: 14rpx;

		&.is-self {
			flex-direction: row-reverse;

			.avatar {
				background:
					radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.35) 0%, transparent 55%),
					linear-gradient(145deg, #6b87d8 0%, #5d76bd 45%, #3f5590 100%);
				box-shadow:
					0 6rpx 16rpx rgba(93, 118, 189, 0.35),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.25);

				.avatar-text {
					color: #fff;
				}
			}

			.message-content {
				max-width: 72%;
				background:
					radial-gradient(120% 85% at 12% -10%, rgba(255, 255, 255, 0.32) 0%, transparent 50%),
					linear-gradient(152deg, #6f86cf 0%, #5d76bd 45%, #4a62a8 100%);
				border-radius: 22rpx 8rpx 22rpx 22rpx;
				box-shadow:
					0 10rpx 28rpx rgba(93, 118, 189, 0.32),
					0 2rpx 8rpx rgba(45, 58, 95, 0.12),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.22);

				.message-text {
					color: #fff;
				}

				.message-time {
					color: rgba(255, 255, 255, 0.78);
				}
			}
		}
	}

	.avatar-wrapper {
		flex-shrink: 0;
	}

	.avatar {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: linear-gradient(145deg, #e8ecf4 0%, #d4dae8 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:
			0 6rpx 14rpx rgba(93, 118, 189, 0.12),
			inset 0 2rpx 0 rgba(255, 255, 255, 0.75);

		.avatar-text {
			font-size: 24rpx;
			color: #4d5a78;
			font-weight: 700;
		}
	}

	.message-content {
		max-width: 72%;
		background: linear-gradient(165deg, #ffffff 0%, #f6f8fd 100%);
		border-radius: 8rpx 22rpx 22rpx 22rpx;
		padding: 18rpx 22rpx;
		box-shadow:
			0 10rpx 28rpx rgba(93, 118, 189, 0.1),
			0 2rpx 8rpx rgba(38, 51, 78, 0.05),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.95);

		.message-text {
			font-size: 28rpx;
			color: #1e2638;
			display: block;
			line-height: 1.55;
			word-break: break-word;
		}

		.message-time {
			font-size: 20rpx;
			color: #9aa3b8;
			display: block;
			text-align: right;
			margin-top: 10rpx;
			font-weight: 500;
		}
	}

	.quick-questions {
		padding: 20rpx 22rpx 12rpx;
	}

	.quick-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 14rpx;

		.quick-title {
			font-size: 28rpx;
			font-weight: 750;
			color: #1e2638;
		}

		.quick-header-right {
			display: flex;
			align-items: center;
			gap: 20rpx;
		}

		.quick-refresh {
			font-size: 34rpx;
			font-weight: 400;
			color: #5d76bd;
			padding: 8rpx;
		}

		.quick-arrow {
			font-size: 20rpx;
			color: #7c88a8;
			transition: transform 0.28s ease;

			&.expanded {
				transform: rotate(180deg);
			}
		}
	}

	.quick-list {
		display: flex;
		flex-wrap: wrap;
		gap: 14rpx;
		max-height: 280rpx;
		overflow-y: auto;
	}

	.quick-item {
		padding: 14rpx 22rpx;
		background: linear-gradient(
			165deg,
			rgba(93, 118, 189, 0.1) 0%,
			rgba(255, 255, 255, 0.9) 100%
		);
		border-radius: 999rpx;
		box-shadow:
			0 6rpx 16rpx rgba(93, 118, 189, 0.1),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.85);
		transition:
			transform 0.15s ease,
			opacity 0.15s ease;

		&:active {
			transform: scale(0.97);
			opacity: 0.94;
		}

		.quick-text {
			font-size: 24rpx;
			font-weight: 600;
			color: #3d4a62;
			line-height: 1.35;
		}
	}

	.input-area {
		padding: 12rpx 22rpx 16rpx;
		background: transparent;
		position: relative;
	}

	.input-wrapper {
		display: flex;
		gap: 14rpx;
		align-items: center;
	}

	.message-input {
		flex: 1;
		height: 84rpx;
		background: linear-gradient(
			165deg,
			rgba(93, 118, 189, 0.07) 0%,
			rgba(255, 255, 255, 0.95) 55%,
			#f8faff 100%
		);
		border-radius: 999rpx;
		padding: 0 28rpx;
		font-size: 28rpx;
		color: #1e2638;
		box-sizing: border-box;
		border: none;
		box-shadow:
			inset 0 1rpx 0 rgba(255, 255, 255, 0.85),
			0 4rpx 14rpx rgba(93, 118, 189, 0.08);
	}

	.send-btn {
		min-width: 120rpx;
		height: 84rpx;
		padding: 0 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(180deg, #dfe4ee 0%, #d4d9e5 100%);
		border-radius: 999rpx;
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease,
			background 0.18s ease;
		box-shadow:
			0 4rpx 12rpx rgba(38, 51, 78, 0.08),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.65);

		.send-text {
			font-size: 28rpx;
			font-weight: 700;
			color: #8b95aa;
			letter-spacing: 0.06em;
		}

		&.active {
			background: #5d76bd;
			box-shadow:
				0 10rpx 28rpx rgba(93, 118, 189, 0.35),
				0 2rpx 8rpx rgba(45, 58, 95, 0.1),
				inset 0 2rpx 0 rgba(255, 255, 255, 0.22);

			.send-text {
				color: #fff;
			}
		}

		&:active {
			transform: scale(0.97);
		}
	}

	.bottom-links {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16rpx;
		margin-top: 14rpx;
		padding-bottom: 8rpx;
	}

	.link-text {
		font-size: 22rpx;
		color: #8b96b0;
		font-weight: 500;
	}

	.link-text人工 {
		font-size: 22rpx;
		font-weight: 650;
		color: #5d76bd;
	}

	.link-divider {
		font-size: 22rpx;
		color: #c8cedd;
	}

	.online-service-page.theme-dark {
		background: linear-gradient(168deg, #101218 0%, #171a22 52%, #1c2030 100%);

		.nav-bar {
			background: linear-gradient(
				180deg,
				rgba(36, 38, 48, 0.98) 0%,
				rgba(28, 30, 38, 0.96) 100%
			);
			box-shadow:
				0 8rpx 32rpx rgba(0, 0, 0, 0.45),
				inset 0 -1rpx 0 rgba(255, 255, 255, 0.04);

			.nav-title {
				color: #f4f7fb;
			}

			.nav-icon-btn {
				background: #323642;
				box-shadow:
					0 6rpx 18rpx rgba(0, 0, 0, 0.35),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.07);
			}

			.back-icon,
			.menu-icon {
				color: #f4f7fb;
			}
		}

		.bottom-sheet-stack {
			background: linear-gradient(180deg, #242830 0%, #1e222a 100%);
			box-shadow:
				0 -10rpx 36rpx rgba(0, 0, 0, 0.45),
				0 -2rpx 12rpx rgba(0, 0, 0, 0.2);
		}

		.divider-text {
			background: rgba(93, 118, 189, 0.2);
			color: #b4bccf;
			box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.06);
		}

		.message-item:not(.is-self) .message-content {
			background: linear-gradient(165deg, #323642 0%, #292e38 100%);
			box-shadow:
				0 10rpx 28rpx rgba(0, 0, 0, 0.28),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.06);

			.message-text {
				color: #eceff8;
			}

			.message-time {
				color: #8892aa;
			}
		}

		.avatar:not(.self-avatar) {
			background: linear-gradient(145deg, #3a414e 0%, #2f3540 100%);
			box-shadow:
				0 6rpx 14rpx rgba(0, 0, 0, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.06);

			.avatar-text {
				color: #c5cad8;
			}
		}

		.quick-title {
			color: #f4f7fb;
		}

		.quick-refresh {
			color: #8fa8e8;
		}

		.quick-arrow {
			color: #8a93a8;
		}

		.quick-item {
			background: linear-gradient(
				165deg,
				rgba(93, 118, 189, 0.18) 0%,
				rgba(40, 44, 52, 0.95) 100%
			);
			box-shadow:
				0 6rpx 16rpx rgba(0, 0, 0, 0.25),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);

			.quick-text {
				color: #d8dee9;
			}
		}

		.message-input {
			background: linear-gradient(
				165deg,
				rgba(93, 118, 189, 0.12) 0%,
				#2f343e 55%,
				#292e36 100%
			);
			color: #f4f7fb;
			box-shadow:
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05),
				0 4rpx 14rpx rgba(0, 0, 0, 0.2);
		}

		.send-btn {
			background: linear-gradient(180deg, #383e4a 0%, #323842 100%);
			box-shadow:
				0 4rpx 12rpx rgba(0, 0, 0, 0.25),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.06);

			.send-text {
				color: #6f7688;
			}

			&.active {
				background: #5d76bd;

				.send-text {
					color: #fff;
				}

				box-shadow:
					0 10rpx 28rpx rgba(93, 118, 189, 0.35),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.12);
			}
		}

		.bottom-links .link-text {
			color: #7c8498;
		}

		.bottom-links .link-text人工 {
			color: #9eb2ec;
		}

		.menu-content {
			background: linear-gradient(180deg, #323642 0%, #292e38 100%);

			.menu-item .menu-text {
				color: #ff8f8f;
			}
		}

		.contact-modal-content {
			background: linear-gradient(165deg, #323642 0%, #292e38 100%);

			.contact-modal-title {
				color: #f4f7fb;
			}

			.contact-option .contact-value {
				color: #eef2fb;
			}

			.contact-modal-cancel {
				background: linear-gradient(180deg, #3d434e 0%, #363b46 100%);

				.cancel-text {
					color: #b4bac8;
				}
			}
		}
	}
</style>
</style>