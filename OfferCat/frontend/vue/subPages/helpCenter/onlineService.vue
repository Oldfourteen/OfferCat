<template>
	<view class="online-service-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="goBack">
				<view class="back-btn">
					<text class="back-icon">&lt;</text>
				</view>
			</view>
			<text class="nav-title">智能客服</text>
			<view class="nav-right" @click="showMenu">
				<view class="menu-btn">
					<text class="menu-text">更多</text>
				</view>
			</view>
		</view>

		<!-- 菜单弹窗 -->
		<view class="menu-modal" v-if="showMenuModal" @click="closeMenu">
			<view class="menu-content" @click.stop>
				<view class="menu-item" @click="clearLocalHistory">
					<view class="menu-icon">
						<text class="icon-text">清</text>
					</view>
					<text class="menu-text">清空聊天记录</text>
				</view>
				<view class="menu-item" @click="refreshQuickQuestions">
					<view class="menu-icon">
						<text class="icon-text">刷</text>
					</view>
					<text class="menu-text">刷新推荐问题</text>
				</view>
			</view>
		</view>

		<!-- 聊天内容区域 -->
		<scroll-view 
			class="chat-content" 
			scroll-y 
			:scroll-into-view="scrollToId"
			scroll-with-animation
			@scrolltolower="loadMoreHistory"
			@refresherrefresh="onPullRefresh"
			:refresher-enabled="true"
			:refresher-triggered="isRefreshing"
		>
			<!-- 下拉刷新指示器 -->
			<view class="refresh-indicator" v-if="isRefreshing">
				<text class="refresh-text">正在刷新...</text>
			</view>

			<!-- 历史消息分隔线 -->
			<view class="history-divider" v-if="hasMoreHistory">
				<text class="divider-text">以上为历史消息</text>
			</view>

			<!-- 消息列表 -->
			<view class="message-list">
				<view 
					class="message-item" 
					v-for="(msg, index) in messageList" 
					:key="index"
					:id="'msg-' + index"
					:class="{ 'is-self': msg.isSelf, 'is-loading': msg.isLoading }"
				>
					<view class="avatar-wrapper">
						<view class="avatar" :class="{ 'self-avatar': msg.isSelf }">
							<image v-if="msg.isSelf" class="avatar-img" :src="userAvatar" mode="aspectFill"></image>
							<image v-else class="avatar-img" :src="csAvatar" mode="aspectFill"></image>
						</view>
					</view>
					<view class="message-content">
						<view v-if="msg.isLoading" class="loading-dots">
							<view class="dot"></view>
							<view class="dot"></view>
							<view class="dot"></view>
						</view>
						<text v-else class="message-text">{{ msg.content }}</text>
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
						<view class="refresh-btn" @click.stop="refreshQuickQuestions">
							<text class="btn-label">刷新</text>
						</view>
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
						placeholder="输入你想询问的事务"
						@confirm="sendMessage"
					/>
					<view class="send-btn" :class="{ active: inputMessage.trim(), disabled: isAiThinking }" @click="sendMessage">
						<text class="send-text">{{ isAiThinking ? '思考中...' : '发送' }}</text>
					</view>
				</view>
				<view class="bottom-links">
					<text class="link-text" @click="openPrivacyPolicy">隐私政策</text>
					<text class="link-divider">|</text>
					<text class="link-text-primary" @click="showContactOptions">联系管理员</text>
				</view>
			</view>
		</view>

		<!-- 隐私政策弹窗 -->
		<view class="privacy-modal" v-if="showPrivacyModal" @click="closePrivacyModal">
			<view class="privacy-content" @click.stop>
				<view class="privacy-header">
					<text class="privacy-title">隐私政策</text>
					<view class="privacy-close" @click="closePrivacyModal">
						<text class="close-icon">×</text>
					</view>
				</view>
				<scroll-view class="privacy-body" scroll-y>
					<view class="privacy-text">
						<view class="privacy-section">
							<text class="privacy-section-title">一、信息收集</text>
							<text class="privacy-section-content">
								我们重视您的隐私保护。在您使用智能客服服务时，我们可能会收集您的对话内容，用于提供更好的服务体验和优化AI模型。
							</text>
						</view>
						<view class="privacy-section">
							<text class="privacy-section-title">二、信息使用</text>
							<text class="privacy-section-content">
								收集的信息仅用于：
								1. 提供智能客服回复服务；
								2. 分析用户需求以优化服务；
								3. 保障服务安全。
							</text>
						</view>
						<view class="privacy-section">
							<text class="privacy-section-title">三、信息保护</text>
							<text class="privacy-section-content">
								我们采用严格的安全措施保护您的信息，未经您的许可，不会向第三方披露您的个人信息。
							</text>
						</view>
						<view class="privacy-section">
							<text class="privacy-section-title">四、用户权利</text>
							<text class="privacy-section-content">
								您有权查看、修改或删除您的对话记录。如需帮助，请联系管理员。
							</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { getApiBase } from '@/api/config.js'
	import { getToken } from '@/utils/token.js'
	import { getUser, resolveStoredStudentId, resolveStoredUserId } from '@/utils/user.js'
	import { getUserProfile, DEFAULT_AVATAR } from '@/utils/userProfile.js'

	const CS_BOT_ID = 0
	const DEEPSEEK_API_KEY = 'sk-e2dfa578fab841b79e8e024d269a8497'
	const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				inputMessage: '',
				messageList: [],
				showMenuModal: false,
				showContactModal: false,
				showQuickQuestions: true,
				showPrivacyModal: false,
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
				isAiThinking: false,
				isRefreshing: false,
				hasMoreHistory: false,
				historyPage: 0,
				adminPhone: '15092730328',
				userAvatar: DEFAULT_AVATAR,
				csAvatar: '/static/admin-avatars/admin-guide.jpg',
				sessionHistory: []
			}
		},
		onLoad() {
			this.loadUserAvatar()
			this.loadMessages()
		},
		onShow() {
			this.loadServerHistory()
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
			loadUserAvatar() {
				const profile = getUserProfile()
				this.userAvatar = profile.avatar || DEFAULT_AVATAR
			},
			showMenu() {
				this.showMenuModal = true
			},
			closeMenu() {
				this.showMenuModal = false
			},
			loadMessages() {
				const userId = resolveStoredUserId(getUser())
				const localMessages = uni.getStorageSync('cs_chat_messages') || []
				if (localMessages.length > 0) {
					this.messageList = localMessages
				} else {
					this.messageList = [
						{ isSelf: false, content: '您好呀！我是您的智能客服助手，请问有什么可以帮助您的？', time: this.getCurrentTime() }
					]
				}
				if (userId) {
					this.loadServerHistory(userId)
				}
			},
			async loadServerHistory(userId = null) {
				if (!userId) userId = resolveStoredUserId(getUser())
				if (!userId) return

				try {
					const token = getToken()
					const headers = { 'Content-Type': 'application/json' }
					if (token) headers['Authorization'] = `Bearer ${token}`

					const res = await new Promise((resolve, reject) => {
						uni.request({
							url: `${getApiBase()}/api/chat/history/${userId}`,
							method: 'GET',
							header: headers,
							success: resolve,
							fail: reject
						})
					})

					if (res.statusCode === 200 && Array.isArray(res.data)) {
						const serverMessages = res.data.map(msg => ({
							isSelf: msg.senderId === userId,
							content: msg.content,
							time: this.formatServerTime(msg.createTime)
						}))
						const mergedMessages = this.mergeMessages(this.messageList, serverMessages)
						this.messageList = mergedMessages
						this.saveMessages()
					}
				} catch (err) {
					console.log('加载服务器历史记录失败:', err)
				}
			},
			formatServerTime(timeStr) {
				if (!timeStr) return this.getCurrentTime()
				const date = new Date(timeStr)
				const hours = date.getHours().toString().padStart(2, '0')
				const minutes = date.getMinutes().toString().padStart(2, '0')
				return `${hours}:${minutes}`
			},
			mergeMessages(localMsgs, serverMsgs) {
				const existingKeys = new Set(localMsgs.map(m => `${m.content}_${m.time}`))
				const uniqueServerMsgs = serverMsgs.filter(m => !existingKeys.has(`${m.content}_${m.time}`))
				const allMessages = [...localMsgs, ...uniqueServerMsgs]
				return allMessages.length > 100 ? allMessages.slice(-100) : allMessages
			},
			buildChatPersistencePayload(messageList, userId) {
				const rows = []
				for (const msg of messageList || []) {
					if (!msg || typeof msg.content !== 'string' || msg.isLoading) continue
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
				uni.setStorageSync('cs_chat_messages', this.messageList)

				const userId = resolveStoredUserId(getUser())
				if (!userId) return

				const messages = this.buildChatPersistencePayload(this.messageList, userId)
				if (!messages.length) return

				const token = getToken()
				const headers = { 'Content-Type': 'application/json' }
				if (token) headers['Authorization'] = `Bearer ${token}`

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
			async sendMessage() {
				if (!this.inputMessage.trim() || this.isAiThinking) return

				const newMessage = {
					isSelf: true,
					content: this.inputMessage.trim(),
					time: this.getCurrentTime()
				}

				this.messageList.push(newMessage)
				this.inputMessage = ''
				this.saveMessages()

				this.isAiThinking = true
				this.messageList.push({
					isSelf: false,
					content: '',
					time: this.getCurrentTime(),
					isLoading: true
				})

				try {
					const reply = await this.requestDeepSeekAI(newMessage.content)
					const loadingIndex = this.messageList.findIndex(m => m.isLoading)
					if (loadingIndex !== -1) {
						this.messageList[loadingIndex] = {
							isSelf: false,
							content: reply,
							time: this.getCurrentTime()
						}
					}
					this.saveMessages()
				} catch (error) {
					console.error('AI请求失败:', error)
					const loadingIndex = this.messageList.findIndex(m => m.isLoading)
					if (loadingIndex !== -1) {
						this.messageList[loadingIndex] = {
							isSelf: false,
							content: '抱歉，我现在有点忙，请稍后再试~',
							time: this.getCurrentTime()
						}
					}
				} finally {
					this.isAiThinking = false
				}
			},
			async requestDeepSeekAI(question) {
				const systemPrompt = `
你是一个温柔、随和的智能客服助手，专门为OfferCat项目提供帮助。

请遵循以下规则：
1. 只回答与OfferCat项目相关的问题，不回答无关问题
2. 回答要友好、专业、准确，不能胡编乱造
3. 如果不知道答案，要诚实地告诉用户
4. 语气要温柔，使用自然的中文表达

项目相关信息：
- 项目名称：OfferCat
- 主要功能：简历创建、AI面试、模拟面试、数据备份、账号管理
- 管理员联系方式：15092730328

请根据用户的问题，提供准确、有用的回答。
				`.trim()

				const messages = [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: question }
				]

				return new Promise((resolve, reject) => {
					uni.request({
						url: DEEPSEEK_API_URL,
						method: 'POST',
						header: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
						},
						timeout: 60000,
						data: {
							model: 'deepseek-chat',
							messages: messages,
							temperature: 0.7,
							max_tokens: 1024
						},
						success: (res) => {
							if (res.statusCode === 200 && res.data && res.data.choices) {
								const reply = res.data.choices[0].message.content
								resolve(reply)
							} else {
								reject(new Error('AI响应格式错误'))
							}
						},
						fail: (err) => {
							reject(new Error(err.errMsg || '网络请求失败'))
						}
					})
				})
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
				const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
				if (token) headers['Authorization'] = `Bearer ${token}`

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
				const questions = [
					'如何创建简历？',
					'如何修改密码？',
					'如何联系客服？',
					'如何备份数据？',
					'如何注销账号？',
					'开始AI面试学习',
					'模拟面试练习',
					'如何使用AI助手？',
					'如何查看面试记录？',
					'如何设置个人资料？'
				]
				this.quickQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 7)
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
							uni.removeStorageSync('cs_chat_messages')
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
			},
			loadMoreHistory() {
				if (this.hasMoreHistory && !this.isAiThinking) {
					this.historyPage++
					this.loadServerHistory()
				}
			},
			async onPullRefresh() {
				this.isRefreshing = true
				await this.loadServerHistory()
				this.isRefreshing = false
				uni.showToast({ title: '已刷新', icon: 'none' })
			},
			openPrivacyPolicy() {
				this.showPrivacyModal = true
			},
			closePrivacyModal() {
				this.showPrivacyModal = false
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
		background: #f0f3f9;
		box-sizing: border-box;
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 22rpx;
		background: #ffffff;
		box-shadow:
			0 4rpx 20rpx rgba(93, 118, 189, 0.12),
			0 2rpx 8rpx rgba(93, 118, 189, 0.06);

		.nav-left,
		.nav-right {
			flex-shrink: 0;
		}

		.nav-title {
			flex: 1;
			text-align: center;
			font-size: 34rpx;
			font-weight: 700;
			color: #2d3748;
		}

		.back-btn {
			box-sizing: border-box;
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
			border: none;
			background: #f5f7fb;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow:
				0 4rpx 12rpx rgba(93, 118, 189, 0.15),
				inset 0 2rpx 0 rgba(255, 255, 255, 0.8);
			transition: all 0.2s ease;

			&:active {
				transform: scale(0.95);
				box-shadow:
					0 2rpx 6rpx rgba(93, 118, 189, 0.1),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.6);
			}
		}

		.back-icon {
			font-size: 28rpx;
			font-weight: 700;
			color: #5d76bd;
			margin-right: 2rpx;
		}

		.menu-btn {
			padding: 14rpx 24rpx;
			background: #f5f7fb;
			border-radius: 16rpx;
			box-shadow:
				0 4rpx 12rpx rgba(93, 118, 189, 0.15),
				inset 0 2rpx 0 rgba(255, 255, 255, 0.8);
			transition: all 0.2s ease;

			&:active {
				transform: scale(0.95);
				box-shadow:
					0 2rpx 6rpx rgba(93, 118, 189, 0.1),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.6);
			}
		}

		.menu-text {
			font-size: 24rpx;
			font-weight: 600;
			color: #5d76bd;
		}
	}

	.chat-content {
		flex: 1;
		min-height: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 28rpx;
	}

	.refresh-indicator {
		text-align: center;
		padding: 20rpx 0;
	}

	.refresh-text {
		font-size: 24rpx;
		color: #718096;
	}

	.bottom-sheet-stack {
		flex-shrink: 0;
		background: #ffffff;
		box-shadow:
			0 -8rpx 32rpx rgba(93, 118, 189, 0.1),
			0 -2rpx 8rpx rgba(93, 118, 189, 0.05);
		border-radius: 28rpx 28rpx 0 0;
		padding-bottom: env(safe-area-inset-bottom);
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
		background: #ffffff;
		border-radius: 28rpx 28rpx 0 0;
		padding: 28rpx 24rpx;
		padding-bottom: calc(28rpx + env(safe-area-inset-bottom));
		box-shadow: 0 -12rpx 48rpx rgba(0, 0, 0, 0.15);

		.menu-item {
			display: flex;
			align-items: center;
			gap: 16rpx;
			padding: 24rpx 20rpx;
			background: #fff1f0;
			border-radius: 20rpx;
			box-shadow:
				0 2rpx 8rpx rgba(255, 77, 79, 0.1),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.6);
			transition: all 0.2s ease;

			&:active {
				transform: scale(0.98);
				background: #ffdede;
			}

			& + .menu-item {
				margin-top: 16rpx;
				background: #f5f7fb;

				.menu-icon {
					background: #5d76bd;
				}

				.menu-text {
					color: #5d76bd;
				}
			}
		}

		.menu-icon {
			width: 44rpx;
			height: 44rpx;
			border-radius: 12rpx;
			background: #ff4d4f;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow:
				0 4rpx 10rpx rgba(255, 77, 79, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.25);

			.icon-text {
				font-size: 22rpx;
				font-weight: 700;
				color: #ffffff;
			}
		}

		.menu-text {
			font-size: 28rpx;
			color: #ff4d4f;
			font-weight: 600;
		}
	}

	.history-divider {
		text-align: center;
		margin: 8rpx 0 28rpx;

		.divider-text {
			font-size: 24rpx;
			color: #718096;
			font-weight: 500;
			padding: 10rpx 28rpx;
			background: rgba(93, 118, 189, 0.1);
			border-radius: 999rpx;
			box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.6);
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
		align-items: flex-start;
		gap: 14rpx;

		&.is-self {
			flex-direction: row-reverse;

			.avatar {
				background: #5d76bd;
				box-shadow:
					0 4rpx 12rpx rgba(93, 118, 189, 0.3),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.25);

				.avatar-text {
					color: #ffffff;
				}
			}

			.message-content {
				background: #5d76bd;
				border-radius: 22rpx 8rpx 22rpx 22rpx;
				box-shadow:
					0 8rpx 24rpx rgba(93, 118, 189, 0.3),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.15);

				.message-text {
					color: #ffffff;
				}

				.message-time {
					color: rgba(255, 255, 255, 0.75);
				}
			}
		}

		&.is-loading .message-content {
			background: #e8ecf5;
			padding: 24rpx;
		}
	}

	.avatar-wrapper {
		flex-shrink: 0;
	}

	.avatar {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: #e2e8f0;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.15),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.6);
		overflow: hidden;

		.avatar-text {
			font-size: 26rpx;
			color: #4a5568;
			font-weight: 700;
		}

		.avatar-img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.message-content {
		max-width: 72%;
		background: #ffffff;
		border-radius: 8rpx 22rpx 22rpx 22rpx;
		padding: 18rpx 22rpx;
		box-shadow:
			0 8rpx 24rpx rgba(93, 118, 189, 0.1),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);

		.message-text {
			font-size: 28rpx;
			color: #2d3748;
			display: block;
			line-height: 1.55;
			word-break: break-word;
		}

		.message-time {
			font-size: 22rpx;
			color: #718096;
			display: block;
			text-align: right;
			margin-top: 10rpx;
			font-weight: 500;
		}
	}

	.loading-dots {
		display: flex;
		gap: 12rpx;
		align-items: center;
		padding: 8rpx 0;

		.dot {
			width: 16rpx;
			height: 16rpx;
			border-radius: 50%;
			background: #5d76bd;
			animation: loading-bounce 1.4s infinite ease-in-out both;

			&:nth-child(1) { animation-delay: -0.32s; }
			&:nth-child(2) { animation-delay: -0.16s; }
			&:nth-child(3) { animation-delay: 0s; }
		}
	}

	@keyframes loading-bounce {
		0%, 80%, 100% {
			transform: scale(0);
			opacity: 0.5;
		}
		40% {
			transform: scale(1);
			opacity: 1;
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
			font-weight: 700;
			color: #2d3748;
		}

		.quick-header-right {
			display: flex;
			align-items: center;
			gap: 16rpx;
		}

		.refresh-btn {
			padding: 8rpx 16rpx;
			background: rgba(93, 118, 189, 0.1);
			border-radius: 12rpx;
			transition: all 0.2s ease;

			&:active {
				background: rgba(93, 118, 189, 0.2);
			}

			.btn-label {
				font-size: 22rpx;
				font-weight: 600;
				color: #5d76bd;
			}
		}

		.quick-arrow {
			font-size: 20rpx;
			color: #718096;
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
		background: #f7f9fc;
		border-radius: 999rpx;
		box-shadow:
			0 2rpx 8rpx rgba(93, 118, 189, 0.06),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.97);
			background: #e8ecf5;
		}

		.quick-text {
			font-size: 24rpx;
			font-weight: 600;
			color: #4a5568;
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
		background: #f7f9fc;
		border-radius: 999rpx;
		padding: 0 28rpx;
		font-size: 28rpx;
		color: #2d3748;
		box-sizing: border-box;
		border: none;
		box-shadow:
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8),
			0 4rpx 14rpx rgba(93, 118, 189, 0.08);

		&::placeholder {
			color: #a0aec0;
		}
	}

	.send-btn {
		min-width: 120rpx;
		height: 84rpx;
		padding: 0 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #e2e8f0;
		border-radius: 999rpx;
		transition: all 0.2s ease;
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.08),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.6);

		.send-text {
			font-size: 28rpx;
			font-weight: 600;
			color: #718096;
		}

		&.active:not(.disabled) {
			background: #5d76bd;
			box-shadow:
				0 8rpx 24rpx rgba(93, 118, 189, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.25);

			.send-text {
				color: #ffffff;
			}
		}

		&.disabled {
			background: #e2e8f0;

			.send-text {
				color: #a0aec0;
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
		font-size: 24rpx;
		color: #718096;
		font-weight: 500;
	}

	.link-text-primary {
		font-size: 24rpx;
		font-weight: 600;
		color: #5d76bd;
	}

	.link-divider {
		font-size: 24rpx;
		color: #cbd5e0;
	}

	.privacy-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1001;
		padding: 40rpx;
	}

	.privacy-content {
		width: 100%;
		max-height: 80vh;
		background: #ffffff;
		border-radius: 24rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.privacy-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 32rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
	}

	.privacy-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #2d3748;
	}

	.privacy-close {
		width: 56rpx;
		height: 56rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-icon {
		font-size: 40rpx;
		color: #718096;
	}

	.privacy-body {
		flex: 1;
		padding: 28rpx 32rpx;
	}

	.privacy-text {
		font-size: 28rpx;
		line-height: 1.7;
		color: #4a5568;
	}

	.privacy-section {
		margin-bottom: 28rpx;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.privacy-section-title {
		display: block;
		font-size: 30rpx;
		font-weight: 700;
		color: #2d3748;
		margin-bottom: 12rpx;
	}

	.privacy-section-content {
		display: block;
		font-size: 28rpx;
		line-height: 1.7;
		color: #4a5568;
	}

	.online-service-page.theme-dark {
		background: #1a1c23;

		.nav-bar {
			background: #252830;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.3);

			.nav-title {
				color: #f0f2f8;
			}

			.back-btn {
				background: #2e323c;
				box-shadow:
					0 4rpx 12rpx rgba(0, 0, 0, 0.25),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
			}

			.back-icon {
				color: #8ea9ff;
			}

			.menu-btn {
				background: #2e323c;
				box-shadow:
					0 4rpx 12rpx rgba(0, 0, 0, 0.25),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
			}

			.menu-text {
				color: #8ea9ff;
			}
		}

		.bottom-sheet-stack {
			background: #252830;
			box-shadow:
				0 -8rpx 32rpx rgba(0, 0, 0, 0.25),
				0 -2rpx 8rpx rgba(0, 0, 0, 0.15);
		}

		.menu-content {
			background: #252830;
			box-shadow: 0 -12rpx 48rpx rgba(0, 0, 0, 0.3);

			.menu-item {
				background: rgba(255, 77, 79, 0.15);
				box-shadow:
					0 2rpx 8rpx rgba(255, 77, 79, 0.1),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.03);

				&:active {
					background: rgba(255, 77, 79, 0.25);
				}

				& + .menu-item {
					background: #2e323c;

					.menu-icon {
						background: #5d76bd;
					}
				}
			}

			.menu-text {
				color: #ff9696;
			}
		}

		.divider-text {
			background: rgba(93, 118, 189, 0.15);
			color: #8a92a8;
			box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.03);
		}

		.message-item:not(.is-self) .message-content {
			background: #2e323c;
			box-shadow:
				0 8rpx 24rpx rgba(0, 0, 0, 0.2),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.03);

			.message-text {
				color: #e8ebf2;
			}

			.message-time {
				color: #8a92a8;
			}
		}

		.avatar:not(.self-avatar) {
			background: #3a414e;
			box-shadow:
				0 4rpx 12rpx rgba(0, 0, 0, 0.25),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);

			.avatar-text {
				color: #a0aec0;
			}
		}

		.quick-title {
			color: #f0f2f8;
		}

		.refresh-btn {
			background: rgba(93, 118, 189, 0.15);

			&:active {
				background: rgba(93, 118, 189, 0.25);
			}

			.btn-label {
				color: #8ea9ff;
			}
		}

		.quick-arrow {
			color: #8a92a8;
		}

		.quick-item {
			background: #2e323c;
			box-shadow:
				0 2rpx 8rpx rgba(0, 0, 0, 0.15),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.03);

			&:active {
				background: #363b47;
			}

			.quick-text {
				color: #e8ebf2;
			}
		}

		.message-input {
			background: #2e323c;
			color: #f0f2f8;
			box-shadow:
				inset 0 1rpx 0 rgba(255, 255, 255, 0.03),
				0 4rpx 14rpx rgba(0, 0, 0, 0.15);

			&::placeholder {
				color: #5a6270;
			}
		}

		.send-btn {
			background: #3a414e;
			box-shadow:
				0 4rpx 12rpx rgba(0, 0, 0, 0.25),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);

			.send-text {
				color: #6f7688;
			}

			&.active:not(.disabled) {
				background: #5d76bd;
				box-shadow:
					0 8rpx 24rpx rgba(93, 118, 189, 0.3),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.1);

				.send-text {
					color: #ffffff;
				}
			}
		}

		.bottom-links .link-text {
			color: #8a92a8;
		}

		.bottom-links .link-text-primary {
			color: #8ea9ff;
		}

		.privacy-content {
			background: #252830;

			.privacy-title {
				color: #f0f2f8;
			}

			.close-icon {
				color: #8a92a8;
			}

			.privacy-section-title {
				color: #f0f2f8;
			}

			.privacy-section-content {
				color: #e8ebf2;
			}
		}
	}
</style>