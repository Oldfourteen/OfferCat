<template>
	<view v-if="messages.length" class="message-list" :class="themeClass">
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
				<view class="bubble" :class="{ loading: item.loading }">
					<!-- 图片消息：支持一张或多张图片预览 -->
					<view v-if="item.filePaths && item.filePaths.length" class="bubble-image-grid" :style="{ marginBottom: item.text ? '12rpx' : '0' }">
						<image
							v-for="(src, index) in item.filePaths"
							:key="index"
							class="bubble-image-row"
							:src="src"
							mode="widthFix"
							@tap="previewImages(item.filePaths, index)"
						/>
					</view>
					<image
						v-else-if="item.filePath"
						class="bubble-image"
						:src="item.filePath"
						mode="widthFix"
						:style="{ marginBottom: item.text ? '12rpx' : '0' }"
						@tap="previewImages([item.filePath], 0)"
					/>
					<!-- 文本消息：AI 使用 markdown 渲染，用户使用纯文本渲染 -->
					<rich-text v-if="item.text" class="bubble-rich text-wrap-safe" :nodes="item.html"></rich-text>
				</view>
				<!-- 底部信息：显示发送时间，以及 AI 语音播报按钮 -->
				<view class="message-footer">
					<text class="time">{{ item.time }}</text>
					<view v-if="item.role === 'user' && retainEnabled && item.consultId" class="retain-wrap" @tap.stop>
						<text class="retain-label">保留对话</text>
						<switch :checked="!!item.retained" color="#3165d7" @change="e => onRetainSwitch(item, e)" />
					</view>
					<view v-if="item.role === 'assistant' && item.text && !item.loading" class="voice-btn" @tap="handlePlayVoice(item)">
						<text class="voice-icon">🎤</text>
						<text class="voice-text">{{ playingId === item.id ? '播放中...' : (loadingId === item.id ? '生成中...' : '语音播报') }}</text>
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

	export default {
		// 消息列表组件只负责渲染消息，不直接处理发送/删除逻辑
		name: 'AiMessageList',
		components: {
			CommonAvatar
		},
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			// 当前会话下的消息数组
			// 每条消息至少包含 id、role、text、time
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
				loadingId: null
			}
		},
		created() {
			this.updateProfile()
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(USER_PROFILE_UPDATED_EVENT, this.updateProfile)
			}
		},
		beforeDestroy() {
			stopAiVoice();
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.updateProfile)
			}
		},
		beforeUnmount() {
			stopAiVoice();
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.updateProfile)
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			renderedMessages() {
				return this.messages.filter(item => !item.hidden).map(item => ({
					...item,
					html: item.role === 'assistant' ? renderMarkdown(item.text) : renderPlainText(item.text)
				}))
			}
		},
		methods: {
			onRetainSwitch(item, e) {
				const retained = !!(e.detail && e.detail.value)
				this.$emit('retain-change', { consultId: item.consultId, retained })
			},
			// 同步用户头像，保证聊天页头像与个人资料保持一致。
			updateProfile() {
				const user = getUserProfile()
				this.userAvatar = user.avatar
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
	}

	.message-row.user .bubble-wrap {
		margin-left: 0;
		margin-right: 14rpx;
	}

	.bubble {
		padding: 20rpx 22rpx;
		border-radius: 24rpx;
		background: #ffffff;
		color: #243456;
		font-size: 26rpx;
		line-height: 1.6;
		box-shadow: 0 10rpx 22rpx rgba(49, 101, 215, 0.06);
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

	.bubble.loading {
		opacity: 0.84;
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
		color: #4a67f7;
		text-decoration: underline;
	}

	.message-row.user .bubble {
		background: #5d76bd;
		color: #ffffff;
	}

	.message-footer {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 8rpx;
		gap: 16rpx;
	}

	.message-row.user .message-footer {
		justify-content: flex-end;
	}

	.time {
		font-size: 20rpx;
		color: #95a0b5;
	}

	.voice-btn {
		display: flex;
		align-items: center;
		gap: 4rpx;
		padding: 4rpx 12rpx;
		border-radius: 8rpx;
		background: rgba(49, 101, 215, 0.08);
		cursor: pointer;
		transition: all 0.2s;
	}

	.voice-btn:active {
		background: rgba(49, 101, 215, 0.15);
	}

	.voice-icon {
		font-size: 22rpx;
		line-height: 1;
	}

	.voice-text {
		font-size: 20rpx;
		color: #3165d7;
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

	.message-list.theme-dark .bubble {
		background: #23252b;
		color: #eef2f8;
		box-shadow: 0 10rpx 22rpx rgba(0, 0, 0, 0.18);
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

	.message-list.theme-dark .time {
		color: rgba(255, 255, 255, 0.42);
	}

	.message-list.theme-dark .retain-label {
		color: rgba(255, 255, 255, 0.42);
	}

	.message-list.theme-dark .voice-btn {
		background: rgba(138, 183, 255, 0.12);
	}

	.message-list.theme-dark .voice-text {
		color: #8ab7ff;
	}
</style>
