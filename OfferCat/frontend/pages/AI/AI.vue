<template>
	<view class="ai-page" :class="themeClass" :key="refreshSeed">
		<AiSessionDrawer
			:visible="drawerVisible"
			:conversations="conversations"
			:active-id="activeConversationId"
			:theme="theme"
			@close="closeDrawer"
			@select="switchConversation"
			@create="createConversation"
			@rename="renameConversation"
			@remove="removeConversation"
		/>

		<view class="ai-shell">
			<view class="animate-fade-down" style="animation-delay: 0.1s; position: relative; z-index: 10;">
				<AiTopBar
					:title="currentConversation.title"
					:theme="theme"
					@menu="toggleDrawer"
					@create="createConversation"
				/>
			</view>

			<scroll-view
				class="ai-scroll animate-item"
				style="animation-delay: 0.2s;"
				scroll-y
				:show-scrollbar="false"
				:scroll-into-view="scrollIntoViewId"
				scroll-with-animation
				@tap="closeBottomMore"
				@scroll="onScroll"
			>
				<view class="ai-scroll-inner">
					<AiWelcomeHero v-if="!hasMessages" :theme="theme" />
					<AiMessageList :messages="currentConversation.messages" :theme="theme" @preview="skipNextOnShow = true" />
					<view id="ai-scroll-anchor" class="ai-scroll-anchor"></view>
					<view class="ai-bottom-space" :style="aiBottomSpaceStyle"></view>
				</view>
			</scroll-view>

			<view class="ai-bottom animate-slide-up" style="animation-delay: 0.3s;" @tap.stop>
				<AiBottomPanel
					ref="bottomPanel"
					v-model="draft"
					:items="quickActions"
					:images="draftImages"
					:active-mode="currentMode"
					:compact="hasMessages"
					:theme="theme"
					:interview-lock="isLocked"
					:disabled-input="isCurrentInterviewEnded"
					:sending="sending"
					@select="useQuickAction"
					@send="sendMessage"
					@before-pick="skipNextOnShow = true"
					@pick-image="handlePickImage"
					@remove-image="removeDraftImage"
					@voice-input="handleVoiceInput"
					@height-change="handleBottomLayoutChange(false)"
				/>
			</view>

			<view v-if="showGiveUpModal" class="give-up-modal-mask" @tap="cancelGiveUp">
				<view class="give-up-modal" @tap.stop>
					<view class="modal-title">确定要放弃面试吗？</view>
					<view class="modal-desc">放弃面试将结束本次模拟，你可以在结束后重新开始</view>
					<view class="modal-btns">
						<view class="modal-btn cancel" @tap="cancelGiveUp">继续面试</view>
						<view class="modal-btn confirm" @tap="confirmGiveUp">放弃面试</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AiTopBar from './components/AiTopBar.vue'
	import AiSessionDrawer from './components/AiSessionDrawer.vue'
	import AiWelcomeHero from './components/AiWelcomeHero.vue'
	import AiBottomPanel from './components/AiBottomPanel.vue'
	import AiMessageList from './components/AiMessageList.vue'
	import themeMixin from '@/utils/themeMixin.js'
	import { requestAiChat, requestAiChatStream, requestAiHistory, uploadVoiceAndTranscribe } from '@/utils/ai.js'
	import { BASE_URL } from '@/api/config.js'
	import { saveQuestionHistory } from '@/utils/questionHistory.js'

	function getTimestamp() {
		return '刚刚'
	}

	function createPendingAssistantMessage() {
		return {
			id: Date.now() + 1,
			role: 'assistant',
			text: 'AI 正在思考中，请稍等...',
			time: getTimestamp(),
			loading: true
		}
	}

	function createConversationItem(index) {
		return {
			id: Date.now() + index,
			title: index === 1 ? '求职总控台' : '新对话',
			preview: index === 1 ? '随时开始新的求职问题' : '点击开始输入你的问题',
			updatedAt: '刚刚',
			messages: [],
			isInterviewEnded: false
		}
	}

	export default {
		mixins: [themeMixin],
		components: {
			AiTopBar,
			AiSessionDrawer,
			AiWelcomeHero,
			AiBottomPanel,
			AiMessageList
		},
		data() {
			const firstConversation = createConversationItem(1)
			return {
				drawerVisible: false,
				draft: '',
				sending: false,
				bottomPanelHeight: 0,
				scrollIntoViewId: '',
				activeConversationId: firstConversation.id,
				conversations: [firstConversation],
				quickActions: [
					{ id: 1, icon: '简', text: '帮我润色简历经历', mode: 'RESUME_POLISH' },
					{ id: 4, icon: 'AI', text: '开启HR模拟面试', mode: 'AIHR' },
					{ id: 2, icon: '面', text: '模拟大厂群面场景', mode: 'GROUP_INTERVIEW' },
					{ id: 3, icon: '岗', text: '分析岗位匹配度', mode: 'JOB_MATCH' }
				],
				currentMode: '',
				keyboardHeight: 0,
				isKeyboardVisible: false,
				isInterviewMode: false,
				interviewEnded: false,
				hasRecordedInterview: false,
				showGiveUpModal: false,
				refreshSeed: 0,
				isUserScrolling: false,
				userHasScrolled: false,
				scrollClientHeight: 0,
				skipNextOnShow: false
			}
		},
		computed: {
			currentConversation() {
				return this.conversations.find(item => item.id === this.activeConversationId) || this.conversations[0]
			},
			isCurrentInterviewEnded() {
				return !!this.currentConversation.isInterviewEnded
			},
			hasMessages() {
				return this.currentConversation.messages.length > 0
			},
			aiBottomSpaceStyle() {
				const panelHeight = this.bottomPanelHeight || 220
				return {
					height: `${panelHeight + 24}px`
				}
			},
			isLocked() {
				return this.isInterviewMode && !this.interviewEnded
			}
		},
		watch: {
			activeConversationId() {
				this.handleBottomLayoutChange(true)
				this.saveLocalConversations()
			},
			hasMessages() {
				this.handleBottomLayoutChange(true)
			},
			draft() {
				this.handleBottomLayoutChange(false)
			},
			conversations: {
				deep: true,
				handler() {
					this.saveLocalConversations()
				}
			}
		},
		mounted() {
			this.handleBottomLayoutChange(true)
			this.initKeyboardListener()
		},
		beforeDestroy() {
			this.removeKeyboardListener()
			if (this.isInterviewMode && !this.interviewEnded && !this.hasRecordedInterview) {
				this.recordMockInterview('AI 模拟面试 (意外退出)')
			}
		},
		onUnload() {
			if (this.isInterviewMode && !this.interviewEnded && !this.hasRecordedInterview) {
				this.recordMockInterview('AI 模拟面试 (意外退出)')
			}
		},
		onTabItemTap() {
			if (this.isLocked) {
				this.showGiveUpModal = true
			}
		},
		onBackPress() {
			if (this.isLocked) {
				this.showGiveUpModal = true
				return true
			}
		},
		onShow() {
			if (this.skipNextOnShow) {
				this.skipNextOnShow = false
				return
			}
			this.refreshSeed += 1
		},
		onLoad() {
			const lockState = uni.getStorageSync('interview_lock_state')
			if (lockState) {
				uni.removeStorageSync('interview_lock_state')
				const state = JSON.parse(lockState)
				this.isInterviewMode = state.isInterviewMode
				this.interviewEnded = state.interviewEnded
				this.conversations = state.conversations
				this.activeConversationId = state.activeConversationId
				if (this.isInterviewMode && !this.interviewEnded) {
					this.currentMode = 'AIHR'
				}
			} else {
				this.loadLocalConversations()
				this.loadServerHistory()
			}
		},
		methods: {
			loadLocalConversations() {
				try {
					const user = uni.getStorageSync('user')
					const userId = user ? user.userId : 'guest'
					const localData = uni.getStorageSync(`ai_conversations_${userId}`)
					if (localData) {
						const parsed = JSON.parse(localData)
						if (parsed && parsed.length > 0) {
							this.conversations = parsed
							this.activeConversationId = parsed[0].id
						}
					}
				} catch (e) {
					console.error('加载本地会话失败', e)
				}
			},
			saveLocalConversations() {
				try {
					const user = uni.getStorageSync('user')
					const userId = user ? user.userId : 'guest'
					// 只保存非空消息的会话或第一个会话
					uni.setStorageSync(`ai_conversations_${userId}`, JSON.stringify(this.conversations))
				} catch (e) {
					console.error('保存本地会话失败', e)
				}
			},
			async loadServerHistory() {
				try {
					const historyData = await requestAiHistory()
					if (historyData && historyData.length > 0) {
						// 检查是否已经有云端历史对话
						let serverConv = this.conversations.find(c => c.title === '云端历史记录')
						if (!serverConv) {
							serverConv = {
								id: Date.now() + 9999,
								title: '云端历史记录',
								preview: '您之前的对话记录',
								updatedAt: '云端',
								messages: [],
								isInterviewEnded: false
							}
							this.conversations.push(serverConv)
						}

						const messages = []
						// 后端返回是 create_time DESC，我们需要 ASC
						const reversed = [...historyData].reverse()
						reversed.forEach((item, index) => {
							const timeStr = item.createTime ? item.createTime.replace('T', ' ') : '历史'
							const isHidden = ['帮我润色简历经历', '开启HR模拟面试', '开启AI模拟面试', '模拟大厂群面场景', '分析岗位匹配度'].includes(item.userContent)

							let filePaths = undefined;
							if (item.userImages) {
								try {
									const parsed = JSON.parse(item.userImages);
									if (Array.isArray(parsed)) {
										filePaths = parsed.map(url => url.startsWith('http') ? url : (BASE_URL + url));
									}
								} catch (e) {}
							}

							messages.push({
								id: `user_${item.id}_${index}`,
								role: 'user',
								text: item.userContent || '',
								time: timeStr,
								hidden: isHidden,
								filePaths: filePaths && filePaths.length > 0 ? filePaths : undefined,
								type: filePaths && filePaths.length > 0 ? 'images' : 'text'
							})
							
							let aiFilePaths = undefined;
							if (item.aiImages) {
								try {
									const parsed = JSON.parse(item.aiImages);
									if (Array.isArray(parsed)) {
										aiFilePaths = parsed.map(url => url.startsWith('http') ? url : (BASE_URL + url));
									}
								} catch (e) {}
							}

							messages.push({
								id: `ai_${item.id}_${index}`,
								role: 'assistant',
								text: item.aiContent || '',
								time: timeStr,
								loading: false,
								filePaths: aiFilePaths && aiFilePaths.length > 0 ? aiFilePaths : undefined,
								type: aiFilePaths && aiFilePaths.length > 0 ? 'images' : 'text'
							})
						})

						serverConv.messages = messages
						serverConv.preview = messages.length ? messages[messages.length - 1].text.slice(0, 15) : '无记录'
						
						this.saveLocalConversations()
					}
				} catch (e) {
					console.error('拉取云端历史失败', e)
				}
			},
			showInterviewLockedToast() {
				// 将原本简单的 Toast 提示改为直接弹窗确认
				this.showGiveUpModal = true
			},
			closeBottomMore() {
				const panel = this.$refs.bottomPanel
				if (panel && typeof panel.closeMore === 'function') {
					panel.closeMore()
				}
			},
			handleBottomLayoutChange(force = false) {
				this.$nextTick(() => {
					this.syncBottomPanelHeight(force)
					this.scrollToBottom(force)
				})
			},
			initKeyboardListener() {
				if (typeof uni.onKeyboardHeightChange !== 'function') {
					return
				}
				this.keyboardHandle = (res) => {
					this.keyboardHeight = res.height
					this.isKeyboardVisible = res.height > 0
					this.handleBottomLayoutChange(false)
				}
				uni.onKeyboardHeightChange(this.keyboardHandle)
			},
			removeKeyboardListener() {
				if (typeof uni.offKeyboardHeightChange !== 'function') {
					return
				}
				if (this.keyboardHandle) {
					uni.offKeyboardHeightChange(this.keyboardHandle)
				}
			},
			syncBottomPanelHeight(force = false) {
				const query = uni.createSelectorQuery().in(this)
				query.select('.ai-bottom').boundingClientRect(rect => {
					if (!rect || !rect.height) {
						return
					}

					const nextHeight = Math.ceil(rect.height)
					if (nextHeight !== this.bottomPanelHeight) {
						this.bottomPanelHeight = nextHeight
						this.$nextTick(() => {
							this.scrollToBottom(force)
						})
					}
				}).exec()

				const scrollQuery = uni.createSelectorQuery().in(this)
				scrollQuery.select('.ai-scroll').boundingClientRect(rect => {
					if (rect && rect.height) {
						this.scrollClientHeight = rect.height
					}
				}).exec()
			},
			toggleDrawer() {
				if (this.isLocked) {
					this.showGiveUpModal = true
					return
				}
				this.drawerVisible = !this.drawerVisible
			},
			closeDrawer() {
				this.drawerVisible = false
			},
			createConversation(silent = false) {
				if (this.isLocked) {
					this.showGiveUpModal = true
					return
				}
				const next = createConversationItem(this.conversations.length + 1)
				this.conversations.unshift(next)
				this.activeConversationId = next.id
				this.draft = ''
				this.drawerVisible = false
				this.handleBottomLayoutChange(true)
				if (!silent) {
					uni.showToast({
						title: '创建新对话成功',
						icon: 'none'
					})
				}
			},
			switchConversation(id) {
				if (this.isLocked) {
					this.showGiveUpModal = true
					return
				}
				this.activeConversationId = id
				this.drawerVisible = false
				this.handleBottomLayoutChange(true)
			},
			onLockTap() {
				this.showGiveUpModal = true
			},
			cancelGiveUp() {
				this.showGiveUpModal = false
			},
			confirmGiveUp() {
				this.showGiveUpModal = false
				this.interviewEnded = true
				this.isInterviewMode = false
				this.currentMode = ''
				this.recordMockInterview('AI 模拟面试 (中途退出)')
				if (this.currentConversation) {
					this.$set(this.currentConversation, 'isInterviewEnded', true)
				}
				uni.showToast({ title: '已放弃面试', icon: 'none' })
			},
			recordMockInterview(title = 'AI 模拟面试') {
				if (this.hasRecordedInterview) return
				this.hasRecordedInterview = true
				try {
					saveQuestionHistory({
						type: 'interview',
						title: title,
						timestamp: Date.now()
					})
				} catch (e) {
					console.error('记录面试历史失败', e)
				}
			},
			renameConversation(payload) {
				if (this.isLocked) {
					this.showGiveUpModal = true
					return
				}
				const title = payload.title.trim()
				if (!title) {
					return
				}

				this.conversations = this.conversations.map(item => {
					if (item.id !== payload.id) {
						return item
					}

					return {
						...item,
						title
					}
				})
			},
			removeConversation(id) {
				if (this.isLocked) {
					this.showGiveUpModal = true
					return
				}
				if (this.conversations.length === 1) {
					const next = createConversationItem(1)
					this.conversations = [next]
					this.activeConversationId = next.id
					this.draft = ''
					this.handleBottomLayoutChange(true)
					return
				}

				const nextConversations = this.conversations.filter(item => item.id !== id)
				this.conversations = nextConversations
				if (this.activeConversationId === id) {
					this.activeConversationId = nextConversations[0].id
				}
				this.handleBottomLayoutChange(true)
			},
			useQuickAction(text) {
				const action = this.quickActions.find(a => a.text === text)

				const isCancel = action && action.mode === this.currentMode &&
					!(
						action.mode === 'AIHR' && !this.isInterviewMode
					);

				if (isCancel) {
					this.currentMode = ''
					uni.showToast({
						title: `已退出${action.text}模式`,
						icon: 'none',
						duration: 2000
					})
					return
				}

				if (this.currentConversation && this.currentConversation.messages.length > 0) {
					this.createConversation(true)
				}

				let isHidden = false
				if (action && action.mode) {
					this.currentMode = action.mode
					isHidden = true
					uni.showToast({
						title: `已进入${action.text}模式`,
						icon: 'none',
						duration: 2000
					})
				}

				if (action && action.mode === 'RESUME_POLISH') {
					this.draft = text;
					return;
				}

				if (text === '开启HR模拟面试' || text === '开启AI模拟面试') {
					this.isInterviewMode = true
					this.interviewEnded = false
					this.hasRecordedInterview = false
					this.drawerVisible = false
				}
				this.draft = ''
				this.sendMessage(text, isHidden)
			},
			handlePickImage(filePaths) {
				const paths = (Array.isArray(filePaths) ? filePaths : [filePaths]).filter(Boolean)
				if (!paths.length) {
					return
				}
				const currentImages = this.draftImages || []
				if (currentImages.length + paths.length > 3) {
					uni.showToast({ title: '最多只能选择3张图片', icon: 'none' })
					return
				}
				this.draftImages = [...currentImages, ...paths]
				this.handleBottomLayoutChange(true)
			},
			removeDraftImage(index) {
				if (this.draftImages && this.draftImages.length > index) {
					this.draftImages.splice(index, 1)
					this.handleBottomLayoutChange(true)
				}
			},
			async handleVoiceInput(payload) {
				if (!payload || !payload.filePath) return
				
				uni.showLoading({ title: '识别中...' })
				try {
					const text = await uploadVoiceAndTranscribe(payload.filePath)
					uni.hideLoading()
					if (text) {
						this.streamTextToDraft(text)
					} else {
						uni.showToast({ title: '未能识别出文字', icon: 'none' })
					}
				} catch (e) {
					uni.hideLoading()
					uni.showToast({ title: e.message || '识别失败', icon: 'none' })
				}
			},
			streamTextToDraft(text) {
				if (!text) return
				if (this.streamTimer) {
					clearInterval(this.streamTimer)
				}
				let i = 0
				this.streamTimer = setInterval(() => {
					if (this.draft.length >= 250) {
						clearInterval(this.streamTimer)
						this.streamTimer = null
						uni.showToast({ title: '语音录入最多支持250字', icon: 'none' })
						return
					}
					this.draft += text[i]
					i++
					if (i >= text.length) {
						clearInterval(this.streamTimer)
						this.streamTimer = null
					}
				}, 30)
			},
			onScroll(e) {
				const { scrollHeight, scrollTop } = e.detail
				
				// If the user scrolls up, set the flag
				if (this.lastScrollTop !== undefined && scrollTop < this.lastScrollTop) {
					this.userHasScrolled = true
				}

				// If the user is close to the bottom, reset the flag to re-enable auto-scrolling
				if (this.scrollClientHeight) {
					if (scrollHeight - scrollTop - this.scrollClientHeight <= 80) {
						this.userHasScrolled = false
					}
				}
				
				this.lastScrollTop = scrollTop
			},
			scrollToBottom(force = false) {
				if (this.userHasScrolled && !force) return;
				this.scrollIntoViewId = ''
				this.$nextTick(() => {
					this.scrollIntoViewId = 'ai-scroll-anchor'
				})
			},
			async sendMessage(content, isHidden = false) {
				const textContent = typeof content === 'string' ? content : ''
								this.userHasScrolled = false; // Reset scroll flag
				this.isUserScrolling = false;
				const value = (textContent || this.draft).trim()
				const filePaths = [...(this.draftImages || [])]

				if ((!value && !filePaths.length) || this.sending) {
					return
				}

				if (this.streamTimer) {
					clearInterval(this.streamTimer)
					this.streamTimer = null
				}

				// Move clearing states AFTER validation checks to avoid accidental clearance when sending is blocked or empty
				this.draftImages = []
				this.draft = ''

				const current = this.currentConversation
				const timestamp = getTimestamp()
				const userMessage = { 
					id: Date.now(), 
					role: 'user', 
					text: value, 
					time: timestamp, 
					hidden: isHidden,
					filePaths: filePaths.length > 0 ? filePaths : undefined,
					type: filePaths.length > 0 ? 'images' : 'text'
				}
				
				const pendingAssistantMessage = createPendingAssistantMessage()
				const nextMessages = current.messages.concat([
					userMessage,
					pendingAssistantMessage
				])

				let previewText = value;
				if (!previewText && filePaths.length) {
					previewText = filePaths.length > 1 ? `【图片】×${filePaths.length}` : '【图片】';
				}

				this.conversations = this.conversations.map(item => {
					if (item.id !== current.id) {
						return item
					}

					return {
						...item,
						title: item.messages.length ? item.title : (isHidden ? '开启新模式' : previewText.slice(0, 8)),
						preview: isHidden ? '进入功能模式...' : previewText,
						updatedAt: timestamp,
						messages: nextMessages
					}
				})

				this.sending = true
				this.handleBottomLayoutChange(true)

				// Create a temporary messages array for AI where empty text with images is replaced by "[图片]"
				const aiMessages = current.messages.concat({
					...userMessage,
					text: value || '[图片]'
				})

				requestAiChatStream(
					aiMessages,
					{ mode: this.currentMode },
					(chunkText) => {
						// 收到流式数据块
						this.replaceAssistantReply(current.id, pendingAssistantMessage.id, chunkText)
					},
					(fullText) => {
						// 完成
						this.sending = false
						this.replaceAssistantReply(current.id, pendingAssistantMessage.id, fullText)
						this.handleBottomLayoutChange(false)
					},
					(error) => {
						// 失败
						this.sending = false
						this.replaceAssistantReply(
							current.id,
							pendingAssistantMessage.id,
							`### 接口调用失败\n\n- ${error.message}\n- 请在 \`utils/ai.js\` 或本地存储 \`ai_chat_config\` 中配置真实接口地址与密钥。`
						)
						uni.showToast({
							title: 'AI 接口调用失败',
							icon: 'none'
						})
						this.handleBottomLayoutChange(false)
					}
				)
			},
			replaceAssistantReply(conversationId, messageId, text) {
				let interviewEndedNow = false;
				if (this.isInterviewMode && !this.interviewEnded) {
					if (text.includes('面试成功') || text.includes('面试失败') || text.includes('面试结束')) {
						this.interviewEnded = true
						this.isInterviewMode = false
						this.currentMode = ''
						this.recordMockInterview('AI 模拟面试')
						uni.showToast({ title: '面试已结束', icon: 'none' })
						interviewEndedNow = true
					}
				}

				this.conversations = this.conversations.map(item => {
					if (item.id !== conversationId) {
						return item
					}

					const messages = item.messages.map(message => {
						if (message.id !== messageId) {
							return message
						}

						return {
							...message,
							text,
							loading: false,
							time: getTimestamp()
						}
					})

					return {
						...item,
						messages,
						preview: text.replace(/[#*_`>-]/g, '').slice(0, 24) || item.preview,
						updatedAt: getTimestamp(),
						isInterviewEnded: interviewEndedNow ? true : item.isInterviewEnded
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f7fc;
	}

	.ai-page {
		height: 100vh;
		min-height: 100vh;
		overflow: hidden;
		background:
			radial-gradient(circle at 50% 22%, rgba(49, 101, 215, 0.12) 0%, rgba(49, 101, 215, 0) 46%),
			linear-gradient(180deg, #f8f7f5 0%, #ffffff 58%, #f5f7fc 100%);
	}

	.ai-shell {
		height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.ai-scroll {
		flex: 1;
		min-height: 0;
	}

	.ai-scroll-inner {
		padding: calc(var(--status-bar-height) + 110rpx) 22rpx 0;
	}

	.ai-scroll-anchor {
		height: 2rpx;
	}

	.ai-bottom-space {
		height: 220px;
	}

	.ai-scroll::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}

	.ai-bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 7;
		box-shadow: 0 -10rpx 30rpx rgba(21, 48, 94, 0.05);
	}


	.give-up-modal-mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 99;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.give-up-modal {
		width: 560rpx;
		background: #ffffff;
		border-radius: 24rpx;
		padding: 48rpx 40rpx 40rpx;
		box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.15);
	}

	.modal-title {
		font-size: 34rpx;
		font-weight: 600;
		color: #1a1a2e;
		text-align: center;
		margin-bottom: 20rpx;
	}

	.modal-desc {
		font-size: 26rpx;
		color: #666666;
		text-align: center;
		line-height: 1.6;
		margin-bottom: 40rpx;
	}

	.modal-btns {
		display: flex;
		gap: 24rpx;
	}

	.modal-btn {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-weight: 500;
	}

	.modal-btn.cancel {
		background: #f5f5f5;
		color: #666666;
	}

	.modal-btn.confirm {
		background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
		color: #ffffff;
	}

	.ai-page.theme-dark {
		background:
			radial-gradient(circle at 50% 22%, rgba(74, 103, 247, 0.24) 0%, rgba(74, 103, 247, 0) 42%),
			linear-gradient(180deg, #101114 0%, #16181d 58%, #101114 100%);

		.ai-bottom {
			box-shadow: 0 -10rpx 30rpx rgba(0, 0, 0, 0.28);
		}

		.give-up-modal-mask {
			background: rgba(0, 0, 0, 0.7);
		}

		.give-up-modal {
			background: #1e1e24;
		}

		.modal-title {
			color: #e8e8e8;
		}

		.modal-desc {
			color: #999999;
		}

		.modal-btn.cancel {
			background: #2a2a32;
			color: #cccccc;
		}
	}

	.animate-item {
		animation: slideUpFade 0.6s ease-out both;
	}

	.animate-slide-up {
		animation: slideUp 0.6s ease-out both;
	}

	@keyframes slideUpFade {
		from {
			opacity: 0;
			transform: translateY(40rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	.animate-fade-down {
		animation: fadeDown 0.6s ease-out both;
	}

	@keyframes fadeDown {
		from {
			opacity: 0;
			transform: translateY(-20rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
