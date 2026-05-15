<template>
	<view class="online-service-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="nav-title">在线客服</text>
			<view class="nav-right" @click="showMenu">
				<text class="menu-icon">⋮</text>
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
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
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
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f5f6f8;
	}

	.nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		padding: 0 16px;
		z-index: 100;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

		.nav-left, .nav-right {
			width: 60rpx;
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.back-icon, .menu-icon {
			font-size: 36rpx;
			color: #333;
			font-weight: bold;
		}

		.nav-title {
			font-size: 18px;
			font-weight: 600;
			color: #333;
		}
	}

	.menu-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: flex-end;
		z-index: 1000;
	}

	.menu-content {
		width: 100%;
		background: #fff;
		border-radius: 24rpx 24rpx 0 0;
		padding: 24rpx;
		padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: 16rpx;
		padding: 20rpx;
		background: #fff1f0;
		border-radius: 12rpx;
		border: 1rpx solid #ffccc7;

		.menu-icon-text {
			font-size: 32rpx;
		}

		.menu-text {
			font-size: 16px;
			color: #ff4d4f;
			font-weight: 500;
		}
	}

	.contact-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.contact-modal-content {
		width: 600rpx;
		background: #fff;
		border-radius: 24rpx;
		padding: 32rpx;
	}

	.contact-modal-title {
		font-size: 18px;
		font-weight: 600;
		color: #333;
		text-align: center;
		display: block;
		margin-bottom: 24rpx;
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
		padding: 20rpx;
		background: #f5f6f8;
		border-radius: 12rpx;
	}

	.contact-icon {
		font-size: 32rpx;
	}

	.contact-info {
		flex: 1;
	}

	.contact-label {
		font-size: 14px;
		color: #999;
		display: block;
	}

	.contact-value {
		font-size: 16px;
		color: #333;
		font-weight: 500;
		display: block;
		margin-top: 4rpx;
	}

	.contact-modal-cancel {
		margin-top: 24rpx;
		padding: 16rpx;
		background: #f5f6f8;
		border-radius: 12rpx;
		text-align: center;

		.cancel-text {
			font-size: 16px;
			color: #666;
		}
	}

	.chat-content {
		flex: 1;
		margin-top: 44px;
		padding: 16px;
		padding-bottom: 200rpx;
	}

	.history-divider {
		text-align: center;
		margin: 16rpx 0;

		.divider-text {
			font-size: 12px;
			color: #ccc;
			padding: 8rpx 24rpx;
			background: rgba(0, 0, 0, 0.05);
			border-radius: 20rpx;
		}
	}

	.message-list {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}

	.message-item {
		display: flex;
		gap: 12rpx;

		&.is-self {
			flex-direction: row-reverse;

			.message-content {
				background: #4a6cf7;
				border-radius: 20rpx 4rpx 20rpx 20rpx;

				.message-text {
					color: #fff;
				}

				.message-time {
					color: rgba(255, 255, 255, 0.7);
				}
			}

			.avatar {
				background: linear-gradient(135deg, #6b8cff 0%, #4a6cf7 100%);
			}
		}
	}

	.avatar-wrapper {
		flex-shrink: 0;
	}

	.avatar {
		width: 72rpx;
		height: 72rpx;
		background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;

		.avatar-text {
			font-size: 24rpx;
			color: #666;
			font-weight: 600;
		}
	}

	.message-content {
		max-width: 70%;
		background: #fff;
		border-radius: 4rpx 20rpx 20rpx 20rpx;
		padding: 16rpx 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.message-text {
		font-size: 15px;
		color: #333;
		display: block;
		line-height: 1.5;
	}

	.message-time {
		font-size: 11px;
		color: #999;
		display: block;
		text-align: right;
		margin-top: 8rpx;
	}

	.quick-questions {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 140rpx;
		background: #fff;
		padding: 16rpx;
		border-top: 1rpx solid #f0f0f0;
	}

	.quick-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12rpx;

		.quick-title {
			font-size: 14px;
			font-weight: 600;
			color: #333;
		}

		.quick-header-right {
			display: flex;
			align-items: center;
			gap: 12rpx;
		}

		.quick-refresh {
			font-size: 20rpx;
			color: #999;
		}

		.quick-arrow {
			font-size: 16rpx;
			color: #999;
			transition: transform 0.3s;

			&.expanded {
				transform: rotate(180deg);
			}
		}
	}

	.quick-list {
		display: flex;
		flex-wrap: wrap;
		gap: 12rpx;
	}

	.quick-item {
		padding: 10rpx 20rpx;
		background: #f5f6f8;
		border-radius: 20rpx;

		.quick-text {
			font-size: 13px;
			color: #666;
		}
	}

	.input-area {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		padding: 12rpx 16px;
		padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
		border-top: 1rpx solid #f0f0f0;
	}

	.input-wrapper {
		display: flex;
		gap: 12rpx;
		align-items: center;
	}

	.message-input {
		flex: 1;
		height: 80rpx;
		background: #f5f6f8;
		border-radius: 40rpx;
		padding: 0 24rpx;
		font-size: 15px;
	}

	.send-btn {
		padding: 16rpx 32rpx;
		background: #e0e0e0;
		border-radius: 40rpx;

		&.active {
			background: #4a6cf7;
		}

		.send-text {
			font-size: 15px;
			color: #999;

			.active & {
				color: #fff;
			}
		}
	}

	.bottom-links {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16rpx;
		margin-top: 12rpx;
	}

	.link-text {
		font-size: 12px;
		color: #999;
	}

	.link-text人工 {
		font-size: 12px;
		color: #4a6cf7;
	}

	.link-divider {
		font-size: 12px;
		color: #ddd;
	}

	.theme-dark {
		background: #1a1a1a;

		.nav-bar {
			background: #242424;

			.back-icon, .menu-icon, .nav-title {
				color: #fff;
			}
		}

		.menu-content {
			background: #242424;
		}

		.menu-item {
			background: rgba(255, 77, 79, 0.1);
			border-color: rgba(255, 77, 79, 0.3);
		}

		.chat-content {
			background: #1a1a1a;
		}

		.divider-text {
			background: rgba(255, 255, 255, 0.05);
			color: #666;
		}

		.message-content {
			background: #242424;

			.message-text {
				color: #fff;
			}
		}

		.avatar {
			background: #333;

			.avatar-text {
				color: #999;
			}
		}

		.quick-questions {
			background: #242424;
			border-top-color: #333;
		}

		.quick-title {
			color: #fff;
		}

		.quick-item {
			background: #333;

			.quick-text {
				color: #999;
			}
		}

		.input-area {
			background: #242424;
			border-top-color: #333;
		}

		.message-input {
			background: #333;
			color: #fff;
		}
	}
</style>