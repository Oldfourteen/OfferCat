<template>
	<view class="ai-page" :class="[themeClass, { 'keyboard-open': isKeyboardVisible }]">
		<!-- 会话抽屉：管理历史对话、切换会话、重命名和删除 -->
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
			<!-- 顶部栏：展示当前会话标题，并提供菜单/新建入口 -->
			<view class="animate-fade-down" style="animation-delay: 0.1s; position: relative; z-index: 10;">
				<AiTopBar
					:title="currentConversation.title"
					:theme="theme"
					:auto-voice-broadcast="autoVoiceBroadcast"
					@menu="toggleDrawer"
					@create="createConversation"
					@auto-voice-change="setAutoVoiceBroadcast"
				/>
			</view>

			<view v-if="hrRespondSecondsRemaining > 0" class="hr-respond-timer" :class="themeClass">
				<text class="hr-respond-timer__label">限时作答</text>
				<text class="hr-respond-timer__value">{{ hrRespondTimerDisplay }}</text>
			</view>

			<!-- 主滚动区：承载欢迎区、消息流和底部留白，保证聊天区可滚动 -->
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
					<!-- 空会话欢迎区：当前没有消息时给用户一个功能入口提示 -->
					<AiWelcomeHero v-if="!hasMessages" :theme="theme" />
					<!-- 消息列表：统一渲染用户消息、AI 回复、图片和语音播报入口 -->
					<AiMessageList
						ref="messageList"
						:messages="currentConversation.messages"
						:theme="theme"
						:retain-enabled="isCloudHistoryConversation"
						@preview="skipNextOnShow = true"
						@retain-change="onConsultRetainChange"
						@regenerate="onRegenerateAssistant"
						@user-message-edit="onUserMessageEdit"
					/>
					<!-- 底部锚点：用于自动滚动到最新消息 -->
					<view id="ai-scroll-anchor" class="ai-scroll-anchor"></view>
					<!-- 底部占位：避免输入面板遮挡最后一条消息 -->
					<view class="ai-bottom-space" :style="aiBottomSpaceStyle"></view>
				</view>
			</scroll-view>

			<!-- 底部输入面板：快捷模式、图文输入、录音输入都在这里完成 -->
			<view class="ai-bottom animate-slide-up" style="animation-delay: 0.3s;" :style="aiBottomLiftStyle" @tap.stop>
				<AiBottomPanel
					ref="bottomPanel"
					v-model="draft"
					:items="quickActions"
					:images="draftImages"
					:active-mode="currentMode"
					:compact="hasMessages"
					:theme="theme"
					:keyboard-visible="isKeyboardVisible"
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
					@keyboard-change="onComposerKeyboardChange"
				/>
			</view>

			<!-- 面试锁定弹窗：模拟面试进行中时拦截退出和切换操作 -->
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
		<AppLiquidTabBar v-if="!isKeyboardVisible" tab-page-path="pages/AI/AI" :theme="theme" />
	</view>
</template>

<script>
	import AiTopBar from './components/AiTopBar.vue'
	import AiSessionDrawer from './components/AiSessionDrawer.vue'
	import AiWelcomeHero from './components/AiWelcomeHero.vue'
	import AiBottomPanel from './components/AiBottomPanel.vue'
	import AiMessageList from './components/AiMessageList.vue'
	import AppLiquidTabBar from '@/components/AppLiquidTabBar.vue'
	import themeMixin from '@/utils/themeMixin.js'
	import liquidTabBarPageMixin from '@/mixins/liquidTabBarPageMixin.js'
	import { getLiquidTabBarOverlapPx } from '@/utils/appLiquidTabBar.js'
	import { requestAiChat, requestAiChatStream, requestAiHistory, setAiConsultRetain, uploadVoiceAndTranscribe, syncAiConversationsToServer, fetchAiConversationsFromServer } from '@/utils/ai.js'
	import { BASE_URL } from '@/api/config.js'
	import { saveQuestionHistory } from '@/utils/questionHistory.js'

	function newMessageTimeMs() {
		return Date.now()
	}

	function formatDrawerUpdatedAt(ms = Date.now()) {
		const d = new Date(ms)
		const pad = n => String(n).padStart(2, '0')
		return `${pad(d.getHours())}:${pad(d.getMinutes())}`
	}

	function parseHistoryTimeMs(createTime) {
		if (!createTime || typeof createTime !== 'string') return null
		const normalized = createTime.indexOf('T') >= 0 ? createTime : createTime.replace(' ', 'T')
		const parsed = Date.parse(normalized)
		return Number.isFinite(parsed) ? parsed : null
	}

	/** AIHR：面试官明确要求在时限内作答时，才启动客户端 5 分钟倒计时 */
	const HR_RESPOND_WINDOW_MS = 5 * 60 * 1000

	function assistantRequestsTimedAnswer(text) {
		if (!text || typeof text !== 'string') return false
		const compact = text.replace(/\s/g, '')
		if (!/(回答|作答|回复|补充说明|说一下|谈谈)/.test(compact)) return false
		if (/时间限制/.test(compact)) return true
		if (/限时/.test(compact)) return true
		if (/(分钟|秒钟|秒|分)(内|里).{0,20}(回答|作答|回复)/.test(compact)) return true
		if (/(回答|作答|回复).{0,24}(分钟|秒钟|秒|分)/.test(compact)) return true
		if (/请.{0,8}(在|于).{0,12}(分钟|秒钟|秒|分)/.test(compact)) return true
		return false
	}

	// 占位中的 AI 消息，先渲染 loading，再用流式结果替换。
	function createPendingAssistantMessage() {
		const ts = newMessageTimeMs()
		return {
			id: ts + 1,
			role: 'assistant',
			text: 'AI 正在思考中，请稍等...',
			timeMs: ts,
			loading: true
		}
	}

	function createConversationItem(index) {
		return {
			id: Date.now() + index,
			title: '新对话',
			preview: index === 1 ? '随时开始新的求职问题' : '点击开始输入你的问题',
			updatedAt: formatDrawerUpdatedAt(),
			messages: [],
			isInterviewEnded: false
		}
	}

	export default {
		mixins: [themeMixin, liquidTabBarPageMixin],
		components: {
			AiTopBar,
			AiSessionDrawer,
			AiWelcomeHero,
			AiBottomPanel,
			AiMessageList,
			AppLiquidTabBar
		},
		data() {
			const firstConversation = createConversationItem(1)
			return {
				// 自定义底栏占位（隐藏原生 tab 后输入区整体上移）
				tabBarOverlapPx: typeof uni !== 'undefined' && typeof uni.upx2px === 'function' ? uni.upx2px(116) : 58,
				// 抽屉与输入状态
				drawerVisible: false,
				draft: '',
				draftImages: [],
				sending: false,
				// 布局与滚动状态
				bottomPanelHeight: 0,
				scrollIntoViewId: '',
				// 会话数据
				activeConversationId: firstConversation.id,
				conversations: [firstConversation],
				// 快捷功能模式
				quickActions: [
					{ id: 1, icon: '简', text: '帮我润色简历经历', mode: 'RESUME_POLISH' },
					{ id: 4, icon: 'AI', text: '开启HR模拟面试', mode: 'AIHR' },
					{ id: 2, icon: '面', text: '模拟大厂群面场景', mode: 'GROUP_INTERVIEW' },
					{ id: 3, icon: '岗', text: '分析岗位匹配度', mode: 'JOB_MATCH' }
				],
				currentMode: '',
				// 键盘与面试流程控制
				keyboardHeight: 0,
				isKeyboardVisible: false,
				isInterviewMode: false,
				interviewEnded: false,
				hasRecordedInterview: false,
				showGiveUpModal: false,
				// 页面刷新与自动滚动控制
				isUserScrolling: false,
				userHasScrolled: false,
				scrollClientHeight: 0,
				skipNextOnShow: false,
				autoVoiceBroadcast: false,
				hrRespondSecondsRemaining: 0,
				hrRespondDeadlineMs: null,
				hrRespondTimeoutTimer: null,
				hrRespondTickTimer: null
			}
		},
		computed: {
			// 当前正在查看的会话对象，所有消息发送/展示都以它为准。
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
				// adjustResize 下可视区已避开键盘，仅需为输入面板 +（无键盘时）底栏留白
				const bottomReserve = this.isKeyboardVisible ? 16 : this.tabBarOverlapPx
				return {
					height: `${panelHeight + 24 + bottomReserve}px`
				}
			},
			aiBottomLiftStyle() {
				// 键盘弹起：窗口已缩小，输入区贴底（紧贴键盘上沿）；收起：为自定义底栏让位
				if (this.isKeyboardVisible) {
					return { bottom: '0px' }
				}
				return { bottom: `${this.tabBarOverlapPx}px` }
			},
			isLocked() {
				return this.isInterviewMode && !this.interviewEnded
			},
			// 当前会话是否为从服务端拉取的「云端历史记录」（仅此会话展示「保留对话」开关）
			isCloudHistoryConversation() {
				return this.currentConversation && this.currentConversation.title === '云端历史记录'
			},
			hrRespondTimerDisplay() {
				const s = this.hrRespondSecondsRemaining
				const m = Math.floor(s / 60)
				const r = s % 60
				return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
			}
		},
		watch: {
			// 切换会话或消息区状态变化后，重新同步底部布局。
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
			},
			currentMode(mode) {
				if (mode !== 'AIHR') {
					this.clearHrRespondWindow()
				}
			}
		},
		// 生命周期：负责恢复会话、监听键盘以及处理中断中的面试状态。
		mounted() {
			this.handleBottomLayoutChange(true)
			this.initKeyboardListener()
		},
		beforeDestroy() {
			this.clearHrRespondWindow()
			this.removeKeyboardListener()
			if (this.isInterviewMode && !this.interviewEnded && !this.hasRecordedInterview) {
				this.recordMockInterview('AI 模拟面试 (意外退出)')
			}
		},
		onUnload() {
			this.clearHrRespondWindow()
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
			this.handleBottomLayoutChange(true)
		},
		onLoad() {
			this.tabBarOverlapPx = getLiquidTabBarOverlapPx()
			try {
				const saved = uni.getStorageSync('ai_auto_voice_broadcast')
				this.autoVoiceBroadcast = saved === true || saved === 'true' || saved === 1
			} catch (e) {}
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
			clearHrRespondWindow() {
				if (this.hrRespondTimeoutTimer) {
					clearTimeout(this.hrRespondTimeoutTimer)
					this.hrRespondTimeoutTimer = null
				}
				if (this.hrRespondTickTimer) {
					clearInterval(this.hrRespondTickTimer)
					this.hrRespondTickTimer = null
				}
				this.hrRespondDeadlineMs = null
				this.hrRespondSecondsRemaining = 0
			},
			maybeArmHrTimedRespondWindow(fullText) {
				if (this.currentMode !== 'AIHR' || !this.isInterviewMode || this.interviewEnded || this.isCurrentInterviewEnded) {
					this.clearHrRespondWindow()
					return
				}
				if (!assistantRequestsTimedAnswer(fullText)) {
					this.clearHrRespondWindow()
					return
				}
				this.armHrRespondWindow()
			},
			armHrRespondWindow() {
				this.clearHrRespondWindow()
				const deadline = Date.now() + HR_RESPOND_WINDOW_MS
				this.hrRespondDeadlineMs = deadline
				const tick = () => {
					const sec = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
					this.hrRespondSecondsRemaining = sec
					if (sec <= 0 && this.hrRespondTickTimer) {
						clearInterval(this.hrRespondTickTimer)
						this.hrRespondTickTimer = null
					}
				}
				tick()
				this.hrRespondTickTimer = setInterval(tick, 1000)
				this.hrRespondTimeoutTimer = setTimeout(() => {
					this.onHrRespondTimeout()
				}, HR_RESPOND_WINDOW_MS)
			},
			onHrRespondTimeout() {
				this.hrRespondTimeoutTimer = null
				if (this.hrRespondTickTimer) {
					clearInterval(this.hrRespondTickTimer)
					this.hrRespondTickTimer = null
				}
				this.hrRespondDeadlineMs = null
				this.hrRespondSecondsRemaining = 0

				if (this.currentMode !== 'AIHR' || !this.isInterviewMode || this.interviewEnded || this.isCurrentInterviewEnded) {
					return
				}
				if (this.sending) {
					return
				}

				this.sendMessage(
					'【面试计时·系统】候选人未在你要求的限时内回复，已超过5分钟无有效作答。请继续面试并据此调整你的沟通方式与专业判断。',
					true,
					{ hrIdleTimeout: true }
				)
			},
			// 本地/云端历史：优先恢复缓存，再补充云端聊天记录。
			async loadLocalConversations() {
				try {
					const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
					const userId = user.userId || user.id || user.studentId || 'guest'
					
					// 1. 先读取本地缓存作为兜底
					const localData = uni.getStorageSync(`ai_conversations_${userId}`)
					if (localData) {
						const parsed = JSON.parse(localData)
						if (parsed && parsed.length > 0) {
							this.conversations = parsed
							this.activeConversationId = parsed[0].id
						}
					}
					
					// 2. 从服务端拉取同步的会话状态
					if (userId !== 'guest') {
						const serverData = await fetchAiConversationsFromServer()
						if (serverData && serverData.length > 0) {
							this.conversations = serverData
							this.activeConversationId = serverData[0].id
						}
					}
				} catch (e) {
					console.error('加载本地/云端会话失败', e)
				}
			},
			saveLocalConversations() {
				try {
					const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
					const userId = user.userId || user.id || user.studentId || 'guest'
					// 只保存非空消息的会话或第一个会话
					uni.setStorageSync(`ai_conversations_${userId}`, JSON.stringify(this.conversations))
					
					// 同步到服务端（跨设备漫游）
					if (userId !== 'guest') {
						syncAiConversationsToServer(this.conversations).catch(e => console.error('同步会话到服务端失败', e))
					}
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
						// 每条 ai_consult 拆成用户气泡与 AI 气泡，并挂上 consultId、retained 供「保留对话」使用
						// 后端返回是 create_time DESC，我们需要 ASC
						const reversed = [...historyData].reverse()
						reversed.forEach((item, index) => {
							const timeStr = item.createTime ? item.createTime.replace('T', ' ') : '历史'
							const historyMs = parseHistoryTimeMs(item.createTime)
							const isHidden = ['帮我润色简历经历', '开启HR模拟面试', '开启AI模拟面试', '模拟大厂群面场景', '分析岗位匹配度'].includes(item.userContent)
							const consultId = item.id != null ? Number(item.id) : null
							const retained = item.retained === 1 || item.retained === true

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
								timeMs: historyMs != null ? historyMs : undefined,
								hidden: isHidden,
								filePaths: filePaths && filePaths.length > 0 ? filePaths : undefined,
								type: filePaths && filePaths.length > 0 ? 'images' : 'text',
								consultId,
								retained
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
								timeMs: historyMs != null ? historyMs : undefined,
								loading: false,
								filePaths: aiFilePaths && aiFilePaths.length > 0 ? aiFilePaths : undefined,
								type: aiFilePaths && aiFilePaths.length > 0 ? 'images' : 'text',
								consultId,
								retained
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
			// 用户切换「保留对话」：先乐观更新本地消息，再调用后端；失败则回滚并 Toast
			async onConsultRetainChange({ consultId, retained }) {
				if (consultId == null) return
				const prev = !retained
				this.applyConsultRetainedFlag(consultId, retained)
				try {
					await setAiConsultRetain(consultId, retained)
					this.saveLocalConversations()
				} catch (e) {
					this.applyConsultRetainedFlag(consultId, prev)
					uni.showToast({
						title: e.message || '设置失败',
						icon: 'none'
					})
				}
			},
			// 将指定 consultId 在用户/助手成对消息上的 retained 标记同步为同一布尔值（仅改云端历史会话）
			applyConsultRetainedFlag(consultId, retained) {
				const cloud = this.conversations.find(c => c.title === '云端历史记录')
				if (!cloud || !cloud.messages) return
				cloud.messages = cloud.messages.map(m => {
					if (m.consultId !== consultId) return m
					return { ...m, retained: !!retained }
				})
			},
			// 将 prefix 转成请求体中的消息列表，保证「仅图」用户对模型仍有问题文案
			buildAiMessagesPrefix(rawSlice) {
				const aiMessages = rawSlice.map(m => ({ ...m }))
				const last = aiMessages[aiMessages.length - 1]
				if (
					last &&
					last.role === 'user' &&
					!(last.loading) &&
					!(String(last.text || '').trim()) &&
					last.filePaths &&
					last.filePaths.length > 0
				) {
					last.text = '[图片]'
				}
				return aiMessages
			},
			// 对已有一条 AI 气泡重新拉流（沿用紧前一条用户消息）
			onRegenerateAssistant({ assistantMessageId }) {
				if (this.isLocked) {
					this.showGiveUpModal = true
					return
				}
				this.clearHrRespondWindow()
				if (this.sending) {
					uni.showToast({ title: '请等待当前回复完成', icon: 'none' })
					return
				}
				const current = this.currentConversation
				const raw = current.messages || []
				const idx = raw.findIndex(m => m.id === assistantMessageId && m.role === 'assistant')
				if (idx <= 0) return
				const prev = raw[idx - 1]
				if (!prev || prev.role !== 'user') {
					uni.showToast({ title: '无法重新生成', icon: 'none' })
					return
				}
				const userText = String(prev.text || '').trim()
				const hasImages = prev.filePaths && prev.filePaths.length > 0
				if (!userText && !hasImages) {
					uni.showToast({ title: '上一条用户消息为空', icon: 'none' })
					return
				}

				const aiMessages = this.buildAiMessagesPrefix(raw.slice(0, idx))
				const convId = current.id

				this.sending = true
				this.conversations = this.conversations.map(item => {
					if (item.id !== convId) return item
					const messages = item.messages.map(m => {
						if (m.id !== assistantMessageId) return m
						return {
							...m,
							text: 'AI 正在思考中，请稍等...',
							loading: true
						}
					})
					return { ...item, messages }
				})
				this.handleBottomLayoutChange(true)
				this.userHasScrolled = false

				requestAiChatStream(
					aiMessages,
					{ mode: this.currentMode },
					chunkText => {
						this.replaceAssistantReply(convId, assistantMessageId, chunkText)
					},
					fullText => {
						this.sending = false
						this.replaceAssistantReply(convId, assistantMessageId, fullText)
						this.handleBottomLayoutChange(false)
						this.maybeAutoPlayAiVoice(assistantMessageId, fullText)
						this.maybeArmHrTimedRespondWindow(fullText)
					},
					error => {
						this.sending = false
						this.replaceAssistantReply(
							convId,
							assistantMessageId,
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
			// 修改用户气泡：截断其后消息并按新正文重新生成 AI 回复
			onUserMessageEdit({ messageId, text }) {
				if (this.isLocked) {
					this.showGiveUpModal = true
					return
				}
				this.clearHrRespondWindow()
				if (this.sending) {
					uni.showToast({ title: '请等待当前回复完成', icon: 'none' })
					return
				}
				const current = this.currentConversation
				const raw = current.messages || []
				const idx = raw.findIndex(m => m.id === messageId && m.role === 'user')
				if (idx < 0) return

				const prev = raw[idx]
				const imgCount = prev.filePaths && prev.filePaths.length ? prev.filePaths.length : 0
				const hasImages = imgCount > 0
				const nextText = typeof text === 'string' ? text.trim() : ''
				if (!nextText && !hasImages) {
					uni.showToast({ title: '内容不能为空', icon: 'none' })
					return
				}

				const prefix = raw.slice(0, idx)
				const editTs = newMessageTimeMs()
				const updatedUser = {
					...prev,
					text: nextText,
					timeMs: editTs
				}
				const pendingId = Date.now() + 1
				const pendingAssistant = createPendingAssistantMessage()
				pendingAssistant.id = pendingId

				const nextMessages = prefix.concat([updatedUser, pendingAssistant])
				const convId = current.id

				const previewSlice = nextText || (imgCount > 1 ? `【图片】×${imgCount}` : imgCount ? '【图片】' : '')
				this.conversations = this.conversations.map(item => {
					if (item.id !== convId) return item
					return {
						...item,
						messages: nextMessages,
						preview: previewSlice.replace(/[#*_`>-]/g, '').slice(0, 24) || item.preview,
						updatedAt: formatDrawerUpdatedAt(editTs)
					}
				})

				const aiMessages = this.buildAiMessagesPrefix(prefix.concat([updatedUser]))
				this.sending = true
				this.handleBottomLayoutChange(true)
				this.userHasScrolled = false

				requestAiChatStream(
					aiMessages,
					{ mode: this.currentMode },
					chunkText => {
						this.replaceAssistantReply(convId, pendingId, chunkText)
					},
					fullText => {
						this.sending = false
						this.replaceAssistantReply(convId, pendingId, fullText)
						this.handleBottomLayoutChange(false)
						this.maybeAutoPlayAiVoice(pendingId, fullText)
						this.maybeArmHrTimedRespondWindow(fullText)
					},
					error => {
						this.sending = false
						this.replaceAssistantReply(
							convId,
							pendingId,
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
			showInterviewLockedToast() {
				// 将原本简单的 Toast 提示改为直接弹窗确认
				this.showGiveUpModal = true
			},
			setAutoVoiceBroadcast(enabled) {
				this.autoVoiceBroadcast = !!enabled
				try {
					uni.setStorageSync('ai_auto_voice_broadcast', this.autoVoiceBroadcast)
				} catch (e) {}
			},
			maybeAutoPlayAiVoice(messageId, fullText) {
				if (!this.autoVoiceBroadcast || !fullText || typeof fullText !== 'string') {
					return
				}
				const trimmed = fullText.replace(/\s/g, '')
				if (!trimmed) {
					return
				}
				this.$nextTick(() => {
					const list = this.$refs.messageList
					if (list && typeof list.playVoiceForMessage === 'function') {
						list.playVoiceForMessage(messageId, fullText)
					}
				})
			},
			// 底部布局与键盘：保证输入区高度变化后，消息区仍能保持在可读位置。
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
			onComposerKeyboardChange(visible) {
				if (typeof uni.onKeyboardHeightChange === 'function') {
					return
				}
				this.isKeyboardVisible = !!visible
				this.keyboardHeight = visible ? 1 : 0
				this.handleBottomLayoutChange(false)
			},
			initKeyboardListener() {
				if (typeof uni.onKeyboardHeightChange !== 'function') {
					return
				}
				this.keyboardHandle = (res) => {
					const h = res && res.height ? res.height : 0
					this.keyboardHeight = h
					this.isKeyboardVisible = h > 0
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
			// 会话管理：新建、切换、重命名、删除都统一在父页面处理。
			createConversation(silent = false) {
				if (this.isLocked) {
					this.showGiveUpModal = true
					return
				}
				this.clearHrRespondWindow()
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
				this.clearHrRespondWindow()
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
				this.clearHrRespondWindow()
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
				this.clearHrRespondWindow()
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
			// 快捷模式：负责切换简历润色、HR 面试、群面、岗位匹配等入口状态。
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
			// 多模态输入：处理图片草稿、录音转文字和逐字填充输入框。
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
			// 消息滚动：用户手动上滑时暂停自动滚到底，避免打断阅读。
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
			// 发送消息：组装用户消息、插入 AI 占位、并发起流式回复请求。
			async sendMessage(content, isHidden = false, streamOptions = {}) {
				const textContent = typeof content === 'string' ? content : ''
								this.userHasScrolled = false; // Reset scroll flag
				this.isUserScrolling = false;
				const value = (textContent || this.draft).trim()
				const filePaths = [...(this.draftImages || [])]

				if ((!value && !filePaths.length) || this.sending) {
					return
				}

				this.clearHrRespondWindow()

				if (this.streamTimer) {
					clearInterval(this.streamTimer)
					this.streamTimer = null
				}

				// Move clearing states AFTER validation checks to avoid accidental clearance when sending is blocked or empty
				this.draftImages = []
				this.draft = ''

				const current = this.currentConversation
				const userTs = newMessageTimeMs()
				const userMessage = { 
					id: userTs, 
					role: 'user', 
					text: value, 
					timeMs: userTs,
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
						updatedAt: formatDrawerUpdatedAt(userTs),
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
					{ mode: this.currentMode, ...streamOptions },
					(chunkText) => {
						// 收到流式数据块
						this.replaceAssistantReply(current.id, pendingAssistantMessage.id, chunkText)
					},
					(fullText) => {
						// 完成
						this.sending = false
						this.replaceAssistantReply(current.id, pendingAssistantMessage.id, fullText)
						this.handleBottomLayoutChange(false)
						this.maybeAutoPlayAiVoice(pendingAssistantMessage.id, fullText)
						this.maybeArmHrTimedRespondWindow(fullText)
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
			// AI 回复回填：流式更新文本，同时判断模拟面试是否已经结束。
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
						this.clearHrRespondWindow()
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
							loading: false
						}
					})

					return {
						...item,
						messages,
						preview: text.replace(/[#*_`>-]/g, '').slice(0, 24) || item.preview,
						updatedAt: formatDrawerUpdatedAt(),
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
		background: #f8f9fc;
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
		z-index: 7;
		box-shadow:
			0 -4rpx 16rpx rgba(93, 118, 189, 0.08),
			0 -8rpx 32rpx rgba(93, 118, 189, 0.05);
		transition: bottom 0.2s ease;
		background: rgba(248, 249, 252, 0.95);
		backdrop-filter: blur(12rpx);
	}

	.ai-page.keyboard-open .ai-bottom {
		z-index: 50;
	}

	.hr-respond-timer {
		position: fixed;
		left: 32rpx;
		right: 32rpx;
		z-index: 9;
		top: calc(var(--status-bar-height) + 102rpx);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 16rpx;
		padding: 16rpx 28rpx;
		border-radius: 999rpx;
		background: rgba(93, 118, 189, 0.12);
		border: 1rpx solid rgba(93, 118, 189, 0.25);
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.15),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.4);
		pointer-events: none;
	}

	.hr-respond-timer__label {
		font-size: 26rpx;
		font-weight: 600;
		color: #5d76bd;
	}

	.hr-respond-timer__value {
		font-size: 30rpx;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: #5d76bd;
		letter-spacing: 2rpx;
	}

	.hr-respond-timer.theme-dark {
		background: rgba(74, 103, 247, 0.2);
		border-color: rgba(142, 169, 255, 0.35);
		box-shadow: 0 8rpx 28rpx rgba(0, 0, 0, 0.35);
	}

	.hr-respond-timer.theme-dark .hr-respond-timer__label {
		color: #c8d4ff;
	}

	.hr-respond-timer.theme-dark .hr-respond-timer__value {
		color: #aebfff;
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
		background: #1a1c23;

		.ai-bottom {
			box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.3);
			background: rgba(26, 28, 35, 0.95);
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
