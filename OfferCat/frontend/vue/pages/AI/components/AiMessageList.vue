<template>
	<view v-if="messages.length" class="message-list" :class="themeClass">
		<!-- 编辑用户消息：全屏半透明遮罩 + 文本域 -->
		<view v-if="editTarget" class="edit-overlay" @tap="cancelEditUserMessage">
			<view class="edit-sheet" @tap.stop>
				<text class="edit-title">修改消息</text>
				<textarea
					class="edit-textarea"
					v-model="editDraft"
					auto-height
					:maxlength="20000"
					:show-confirm-bar="false"
					placeholder="输入内容"
				/>
				<view class="edit-actions">
					<view class="edit-btn ghost" @tap="cancelEditUserMessage">取消</view>
					<view class="edit-btn primary" @tap="confirmEditUserMessage">保存</view>
				</view>
			</view>
		</view>
		<view
			v-for="item in renderedMessages"
			:key="item.id"
			class="message-row"
			:class="item.role"
		>
			<!-- 头像区：AI 固定头像，用户走通用头像组件 -->
			<view class="avatar">
				<image v-if="item.role === 'assistant'" class="avatar-img" src="@/asset/image/AIHR.png" mode="aspectFill"></image>
				<CommonAvatar v-else class="avatar-img" :src="userAvatar" image-class="avatar-img" />
			</view>
			<view class="bubble-wrap">
				<view
					class="bubble-column"
					:class="item.role === 'user' ? 'bubble-column--user' : 'bubble-column--assistant'"
				>
					<view
						class="msg-pill"
						:class="[`msg-pill--${item.role}`, { 'msg-pill--loading': item.loading }]"
					>
						<view class="msg-pill-inner">
							<view v-if="item.filePaths && item.filePaths.length">
								<view class="bubble-image-grid">
									<image
										v-for="(src, index) in item.filePaths"
										:key="index"
										class="bubble-image-row"
										:src="src"
										mode="widthFix"
										@tap="previewImages(item.filePaths, index)"
									/>
								</view>
							</view>
							<image
								v-else-if="item.filePath"
								class="bubble-image"
								:src="item.filePath"
								mode="widthFix"
								@tap="previewImages([item.filePath], 0)"
							/>
							<rich-text
								v-if="item.text"
								class="bubble-rich text-wrap-safe"
								:nodes="item.html"
							/>
						</view>
					</view>

					<view class="msg-below">
						<view v-if="item.role === 'user'" class="msg-icon-row msg-icon-row--user">
							<view
								v-if="item.text"
								class="msg-icon-hit"
								@tap.stop="copyPlain(item.text)"
							>
								<AiMessageToolbarSvg name="copy" />
							</view>
							<view class="msg-icon-hit" @tap.stop="openEditUserMessage(item)">
								<AiMessageToolbarSvg name="pen" />
							</view>
							<view v-if="retainEnabled && item.consultId" class="retain-wrap retain-wrap-inline retain-wrap-under" @tap.stop>
								<text class="retain-label">保留对话</text>
								<switch :checked="!!item.retained" color="#3165d7" @change="e => onRetainSwitch(item, e)" />
							</view>
						</view>

						<view
							v-else-if="item.role === 'assistant' && item.text && !item.loading"
							class="msg-icon-row msg-icon-row--assistant"
						>
							<view class="msg-icon-hit" @tap.stop="copyPlain(item.text)">
								<AiMessageToolbarSvg name="copy" />
							</view>
							<view
								class="msg-icon-hit"
								:class="{ 'msg-icon-hit--liked': likedMap[item.id] }"
								@tap.stop="toggleLike(item.id)"
							>
								<AiMessageToolbarSvg :name="likedMap[item.id] ? 'thumbs-up-fill' : 'thumbs-up'" />
							</view>
							<view class="msg-icon-hit" @tap.stop="$emit('regenerate', { assistantMessageId: item.id })">
								<AiMessageToolbarSvg name="arrows-rotate" />
							</view>
							<view
								class="msg-icon-hit msg-icon-hit--voice"
								@tap.stop="handlePlayVoice(item)"
							>
								<AiMessageToolbarSvg name="microphone" size="sm" />
								<text v-if="voiceStatusLabel(item)" class="toolbar-voice-label">{{ voiceStatusLabel(item) }}</text>
							</view>
						</view>

						<text class="msg-time">{{ item.displayTime }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { renderMarkdown, renderPlainText } from '@/utils/markdown.js'
	import { getUserProfile, USER_PROFILE_UPDATED_EVENT } from '@/utils/userProfile.js'
	import { playAiVoice, stopAiVoice } from '@/utils/ai.js'
	import CommonAvatar from '@/components/CommonAvatar.vue'
	import AiMessageToolbarSvg from './AiMessageToolbarSvg.vue'

	export default {
		// 消息列表组件只负责渲染消息，不直接处理发送/删除逻辑
		name: 'AiMessageList',
		components: {
			CommonAvatar,
			AiMessageToolbarSvg
		},
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			// 当前会话下的消息数组
			// 每条消息至少包含 id、role、text；展示时间由 timeMs（优先）或 time 字符串解析
			messages: {
				type: Array,
				default() {
					return []
				}
			},
			// 是否展示「保留对话」（仅云端历史会话）
			retainEnabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				userAvatar: '',
				playingId: null,
				loadingId: null,
				likedMap: {},
				editTarget: null,
				editDraft: '',
				// 依赖此计数周期性重算「刚刚」等相对时间文案
				timeTick: 0,
				timeTickTimer: null
			}
		},
		created() {
			this.updateProfile()
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(USER_PROFILE_UPDATED_EVENT, this.updateProfile)
			}
		},
		mounted() {
			this.timeTickTimer = setInterval(() => {
				this.timeTick += 1
			}, 10000)
		},
		beforeDestroy() {
			stopAiVoice();
			if (this.timeTickTimer) {
				clearInterval(this.timeTickTimer)
				this.timeTickTimer = null
			}
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.updateProfile)
			}
		},
		beforeUnmount() {
			stopAiVoice();
			if (this.timeTickTimer) {
				clearInterval(this.timeTickTimer)
				this.timeTickTimer = null
			}
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.updateProfile)
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			renderedMessages() {
				const _t = this.timeTick
				return this.messages.filter(item => !item.hidden).map(item => ({
					...item,
					html: item.role === 'assistant' ? renderMarkdown(item.text) : renderPlainText(item.text),
					displayTime: this.formatMessageTime(item)
				}))
			}
		},
		methods: {
			formatMessageClock(ms) {
				const d = new Date(ms)
				const yy = String(d.getFullYear()).slice(-2)
				const mo = d.getMonth() + 1
				const day = d.getDate()
				const pad = n => String(n).padStart(2, '0')
				const hm = `${pad(d.getHours())}:${pad(d.getMinutes())}`
				return `${yy}/${mo}/${day} ${hm}`
			},
			tryParseTimeString(str) {
				if (!str || typeof str !== 'string') return null
				if (str === '历史') return null
				const normalized = str.indexOf('T') >= 0 ? str : str.replace(' ', 'T')
				const parsed = Date.parse(normalized)
				return Number.isFinite(parsed) ? parsed : null
			},
			formatMessageTime(item) {
				const JUST_NOW_MS = 60 * 1000
				let ms = typeof item.timeMs === 'number' && Number.isFinite(item.timeMs) ? item.timeMs : null
				if (ms == null && typeof item.id === 'number' && item.id > 1e12) {
					ms = item.id
				}
				if (ms != null && Number.isFinite(ms)) {
					const elapsed = Date.now() - ms
					if (elapsed >= 0 && elapsed < JUST_NOW_MS) {
						return '刚刚'
					}
					return this.formatMessageClock(ms)
				}
				const raw = item.time
				if (!raw) return ''
				const parsed = this.tryParseTimeString(raw)
				if (parsed != null) {
					return this.formatMessageClock(parsed)
				}
				return raw
			},
			voiceStatusLabel(item) {
				if (!item || item.role !== 'assistant') return ''
				if (this.playingId === item.id) return '播放中'
				if (this.loadingId === item.id) return '生成中'
				return ''
			},
			copyPlain(text) {
				const t = typeof text === 'string' ? text : ''
				if (!t.trim()) {
					uni.showToast({ title: '暂无可复制内容', icon: 'none' })
					return
				}
				uni.setClipboardData({
					data: t,
					success: () => {
						uni.showToast({ title: '已复制', icon: 'none' })
					}
				})
			},
			toggleLike(id) {
				if (id == null) return
				const next = !this.likedMap[id]
				this.$set(this.likedMap, id, next)
				if (next) {
					uni.showToast({ title: '感谢鼓励', icon: 'none' })
				}
			},
			openEditUserMessage(item) {
				if (!item || item.role !== 'user') return
				this.editTarget = item.id
				this.editDraft = item.text ? String(item.text) : ''
			},
			cancelEditUserMessage() {
				this.editTarget = null
				this.editDraft = ''
			},
			confirmEditUserMessage() {
				if (this.editTarget == null) return
				const text = (this.editDraft || '').trim()
				this.$emit('user-message-edit', { messageId: this.editTarget, text })
				this.cancelEditUserMessage()
			},
			// 开关切换仅上报 consultId 与目标 retained，由父页面调用接口并处理失败回滚
			onRetainSwitch(item, e) {
				const retained = !!(e.detail && e.detail.value)
				this.$emit('retain-change', { consultId: item.consultId, retained })
			},
			// 同步用户头像，保证聊天页头像与个人资料保持一致。
			updateProfile() {
				const user = getUserProfile()
				this.userAvatar = user.avatar
			},
			// 父组件在流式回复结束后触发，与点击「语音播报」共用同一套 TTS 逻辑。
			playVoiceForMessage(messageId, text) {
				return this.handlePlayVoice({ id: messageId, text })
			},
			// 把 AI 文本交给语音接口播报，再维护当前播放状态。
			async handlePlayVoice(item) {
				if (this.playingId === item.id) {
					// 如果正在播放当前音频，则停止
					stopAiVoice()
					this.playingId = null
					this.loadingId = null
					return
				}
				
				// 停止其他正在播放的
				stopAiVoice()
				this.playingId = null
				
				// 清除可能带有的 markdown 标记、特殊字符、URL等
				let text = item.text.replace(/[#*_`>-]/g, '').trim()
				// 过滤掉URL
				text = text.replace(/https?:\/\/[^\s]+/g, '')
				
				if (!text) {
					uni.showToast({ title: '没有可播报的文本', icon: 'none' })
					return
				}
				
				this.loadingId = item.id
				try {
					await playAiVoice(text, () => {
						this.loadingId = null
						this.playingId = item.id
					})
					this.playingId = null
				} catch (e) {
					this.loadingId = null
					this.playingId = null
					uni.showToast({ title: e.message || '语音播报失败', icon: 'none' })
				}
			},
			// 点击图片后打开系统预览器，同时避免返回页面时误刷新聊天页。
			previewImages(urls, index = 0) {
				const list = Array.isArray(urls) ? urls.filter(Boolean) : []
				if (!list.length) {
					return
				}
				const current = list[Math.min(Math.max(index, 0), list.length - 1)]
				this.$emit('preview')
				uni.previewImage({
					urls: list,
					current
				})
			}
		}
	}
</script>

<style lang="scss">
	.message-list {
		padding-top: 6rpx;
	}

	.message-row {
		display: flex;
		align-items: flex-start;
		margin-bottom: 24rpx;
	}

	.message-row.user {
		flex-direction: row-reverse;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 24rpx;
		background: #3165d7;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 700;
		flex-shrink: 0;
		overflow: hidden;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.message-row.user .avatar {
		background: #dfe8fb;
		color: #24438f;
	}

	.bubble-wrap {
		max-width: calc(100% - 108rpx);
		margin-left: 14rpx;
		min-width: 0;
	}

	.message-row.user .bubble-wrap {
		margin-left: 0;
		margin-right: 14rpx;
	}

	/* 单列：浅色药丸气泡 + 下方灰线图标行（图标在气泡外） */
	.bubble-column {
		display: flex;
		flex-direction: column;
		max-width: 100%;
		gap: 12rpx;
		min-width: 0;
	}

	.bubble-column--assistant {
		align-items: flex-start;
	}

	.bubble-column--user {
		align-items: flex-end;
	}

	.msg-pill {
		box-sizing: border-box;
		max-width: 100%;
		min-width: 0;
		font-size: 28rpx;
		line-height: 1.55;
		border-radius: 36rpx;
		background: #eef3ff;
		color: #171c26;
		box-shadow: 0 1rpx 4rpx rgba(80, 100, 180, 0.06);
	}

	.msg-pill--assistant {
		background: #eef3ff;
	}

	.msg-pill--user {
		background: #eef3ff;
	}

	.msg-pill-inner {
		display: flex;
		flex-direction: column;
		gap: 14rpx;
		padding: 22rpx 28rpx;
		box-sizing: border-box;
	}

	.msg-pill--loading {
		opacity: 0.82;
	}

	.msg-below {
		display: flex;
		flex-direction: column;
		gap: 6rpx;
		align-self: stretch;
		max-width: 100%;
	}

	.bubble-column--user .msg-below {
		align-items: flex-end;
	}

	.bubble-column--assistant .msg-below {
		align-items: flex-start;
	}

	.msg-icon-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4rpx;
	}

	.msg-icon-row--user {
		justify-content: flex-end;
	}

	.msg-icon-row--assistant {
		justify-content: flex-start;
	}

	.msg-icon-hit {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8rpx;
		border-radius: 12rpx;
		color: #8b9199;
		background: transparent;
	}

	.msg-icon-hit:active {
		opacity: 0.55;
	}

	.msg-icon-hit--liked {
		color: #e85d8c;
	}

	.msg-icon-hit--voice {
		flex-direction: row;
		gap: 6rpx;
		min-height: auto;
	}

	.toolbar-voice-label {
		font-size: 18rpx;
		color: inherit;
		line-height: 1;
		max-width: 88rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.msg-time {
		font-size: 20rpx;
		color: #b0b6c4;
		line-height: 1.3;
	}

	.retain-wrap-under {
		margin-left: 8rpx;
	}

	.bubble-image {
		display: block;
		width: 420rpx;
		max-width: 100%;
		border-radius: 18rpx;
		overflow: hidden;
	}

	.bubble-image-grid {
		display: block;
		width: 420rpx;
		max-width: 100%;
	}

	.bubble-image-row {
		display: block;
		width: 420rpx;
		max-width: 100%;
		border-radius: 18rpx;
		overflow: hidden;
		margin-bottom: 12rpx;
	}

	.bubble-image-row:last-child {
		margin-bottom: 0;
	}

	.bubble-rich {
		display: block;
		word-break: break-all;
		word-wrap: break-word;
		white-space: pre-wrap;
	}

	.bubble-rich :deep(p) {
		margin: 0;
	}

	.bubble-rich :deep(p + p) {
		margin-top: 12rpx;
	}

	.bubble-rich :deep(h1),
	.bubble-rich :deep(h2),
	.bubble-rich :deep(h3),
	.bubble-rich :deep(h4) {
		margin: 0 0 12rpx;
		font-size: 28rpx;
		font-weight: 800;
	}

	.bubble-rich :deep(ul),
	.bubble-rich :deep(ol) {
		margin: 12rpx 0;
		padding-left: 32rpx;
	}

	.bubble-rich :deep(li) {
		margin: 8rpx 0;
	}

	.bubble-rich :deep(code) {
		padding: 2rpx 8rpx;
		border-radius: 10rpx;
		background: rgba(49, 101, 215, 0.1);
		font-size: 22rpx;
	}

	.bubble-rich :deep(pre) {
		margin: 12rpx 0 0;
		padding: 18rpx;
		border-radius: 18rpx;
		background: rgba(17, 24, 39, 0.92);
		overflow-x: auto;
	}

	.bubble-rich :deep(pre code) {
		padding: 0;
		background: transparent;
		color: #f9fafb;
	}

	.bubble-rich :deep(blockquote) {
		margin: 12rpx 0 0;
		padding-left: 16rpx;
		border-left: 6rpx solid rgba(49, 101, 215, 0.24);
		opacity: 0.9;
	}

	.bubble-rich :deep(a) {
		color: #3d56c4;
		text-decoration: underline;
	}

	.retain-wrap-inline {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.edit-overlay {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 200;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	.edit-sheet {
		width: 100%;
		box-sizing: border-box;
		padding: 36rpx 28rpx 28rpx;
		padding-bottom: calc(28rpx + env(safe-area-inset-bottom));
		border-radius: 28rpx 28rpx 0 0;
		background: #ffffff;
		box-shadow: 0 -8rpx 40rpx rgba(0, 0, 0, 0.12);
	}

	.edit-title {
		display: block;
		font-size: 32rpx;
		font-weight: 600;
		color: #1a1a2e;
		margin-bottom: 20rpx;
	}

	.edit-textarea {
		width: 100%;
		min-height: 200rpx;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		line-height: 1.55;
		border-radius: 18rpx;
		background: #f3f5fa;
		margin-bottom: 24rpx;
	}

	.edit-actions {
		display: flex;
		gap: 20rpx;
		justify-content: flex-end;
	}

	.edit-btn {
		min-width: 160rpx;
		text-align: center;
		padding: 20rpx 32rpx;
		border-radius: 40rpx;
		font-size: 28rpx;
	}

	.edit-btn.ghost {
		background: #eef1f6;
		color: #5a6478;
	}

	.edit-btn.primary {
		background: linear-gradient(135deg, #4a67f7 0%, #3165d7 100%);
		color: #ffffff;
	}

	.retain-wrap {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.retain-label {
		font-size: 20rpx;
		color: #95a0b5;
	}

	.message-list.theme-dark .msg-pill {
		background: #2f323c;
		color: #e8ebf5;
		box-shadow: none;
	}

	.message-list.theme-dark .msg-pill--user,
	.message-list.theme-dark .msg-pill--assistant {
		background: #2f323c;
	}

	.message-list.theme-dark .msg-icon-hit {
		color: #9aa3b5;
	}

	.message-list.theme-dark .msg-icon-hit--liked {
		color: #ff8cab;
	}

	.message-list.theme-dark .msg-time {
		color: rgba(255, 255, 255, 0.36);
	}

	.message-list.theme-dark .bubble-rich :deep(code) {
		background: rgba(255, 255, 255, 0.08);
	}

	.message-list.theme-dark .bubble-rich :deep(blockquote) {
		border-left-color: rgba(138, 183, 255, 0.38);
	}

	.message-list.theme-dark .bubble-rich :deep(a) {
		color: #8ab7ff;
	}

	.message-list.theme-dark .message-row.user .avatar {
		background: rgba(255, 255, 255, 0.1);
		color: #dce6f8;
	}

	.message-list.theme-dark .retain-label {
		color: rgba(255, 255, 255, 0.42);
	}

	.message-list.theme-dark .edit-sheet {
		background: #1e1e24;
		box-shadow: 0 -8rpx 40rpx rgba(0, 0, 0, 0.35);
	}

	.message-list.theme-dark .edit-title {
		color: #eef1f8;
	}

	.message-list.theme-dark .edit-textarea {
		background: #2a2c33;
		color: #eef2f8;
	}

	.message-list.theme-dark .edit-btn.ghost {
		background: #2a2c33;
		color: rgba(255, 255, 255, 0.65);
	}
</style>
