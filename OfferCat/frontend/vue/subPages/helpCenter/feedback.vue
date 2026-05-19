<template>
	<view class="feedback-page" :class="themeClass">
		<view class="nav-bar">
			<view class="back-btn" @click="goBack">
				<image class="back-icon-img" :src="feedbackBackIcon" mode="aspectFit" />
			</view>
			<text class="topbar-title">意见反馈</text>
			<text class="placeholder"></text>
		</view>

		<view class="main-content">
			<view class="editor-card">
				<view class="textarea-wrap">
					<textarea class="content-input text-wrap-safe" v-model="content" placeholder="请输入您的意见或建议... (10-500字)" placeholder-class="placeholder-style" :maxlength="500"></textarea>
					<view class="char-counter" :class="{ 'error-text': content.length < 10 }">{{ content.length }}/500</view>
				</view>

				<view class="contact-section">
					<text class="section-label">联系方式（选填）</text>
					<input class="contact-input" :class="{ error: contactError }" v-model="contact" placeholder="不选填默认匿名发送哦！" placeholder-class="input-placeholder" @input="validateContact" @blur="validateContact" />
					<text v-if="contactError" class="error-tip">{{ contactError }}</text>
				</view>
			</view>

			<view class="submit-btn-wrap">
				<view class="submit-btn" :class="{ active: canSubmit }" @click="submitFeedback">
					提交反馈
				</view>
			</view>

			<view class="tip-text">
				感谢您的反馈！您的每一条建议都对我们非常重要。
			</view>

			<view class="faq-section">
				<view class="faq-title">常见问题参考</view>
				<view class="faq-list">
					<view class="faq-item" v-for="(item, index) in (faqList || DEFAULT_FAQ_LIST)" :key="index" @click="copyFaq(item)">
						<text class="faq-icon">Q</text>
						<text class="faq-content">{{ item }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { request } from '@/api/request.js'
	import { getUser, resolveStoredUserId } from '@/utils/user.js'

	const STORAGE_KEY = 'feedback_draft'

	const DEFAULT_FAQ_LIST = [
		'希望增加深色模式定时切换功能',
		'简历导出PDF时格式错乱',
		'AI面试模拟回答评分不准确',
		'题库题目重复太多',
		'消息通知不及时'
	]

	const FEEDBACK_BACK_ICON =
		'data:image/svg+xml;charset=utf-8,' +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
				'<path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/>' +
				'</svg>'
		)

	export default {
		mixins: [themeMixin],
		data() {
			return {
				content: '',
				contact: '',
				contactError: '',
				feedbackBackIcon: FEEDBACK_BACK_ICON,
				faqList: null
			}
		},
		computed: {
			canSubmit() {
				const len = this.content.trim().length
				return len >= 10 && len <= 500 && !this.contactError
			},
			hasContent() {
				return this.content.trim().length > 0 || this.contact.trim().length > 0
			}
		},
		onLoad() {
			this.loadFaqList()
			this.loadDraft()
		},
		methods: {
			isValidPhone(phone) {
				return /^1[3-9]\d{9}$/.test(phone)
			},
			isValidEmail(email) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
			},
			validateContact() {
				if (!this.contact.trim()) {
					this.contactError = ''
					return true
				}
				if (this.isValidPhone(this.contact) || this.isValidEmail(this.contact)) {
					this.contactError = ''
					return true
				}
				this.contactError = '请输入有效的手机号或邮箱'
				return false
			},
			loadDraft() {
				try {
					const draft = uni.getStorageSync(STORAGE_KEY)
					if (draft) {
						const data = JSON.parse(draft)
						this.content = data.content || ''
						this.contact = data.contact || ''
					}
				} catch (e) {
					console.error('加载草稿失败', e)
				}
			},
			loadFaqList() {
				// 与帮助中心 /api/help/faq（问答条目）不同：此处为「反馈话术参考」，暂无单独接口，使用本地模板。
				this.faqList = DEFAULT_FAQ_LIST
			},
			resolveNickname(user) {
				if (!user || typeof user !== 'object') return '用户'
				const n = user.nickname || user.username || user.name || user.phone
				if (n != null && String(n).trim()) return String(n).trim()
				return '用户'
			},
			saveDraft() {
				try {
					const draft = {
						content: this.content,
						contact: this.contact,
						saveTime: Date.now()
					}
					uni.setStorageSync(STORAGE_KEY, JSON.stringify(draft))
				} catch (e) {
					console.error('保存草稿失败', e)
				}
			},
			deleteDraft() {
				try {
					uni.removeStorageSync(STORAGE_KEY)
				} catch (e) {
					console.error('删除草稿失败', e)
				}
			},
			goBack() {
				if (!this.hasContent) {
					this.deleteDraft()
					uni.navigateBack()
					return
				}

				uni.showModal({
					title: '提示',
					content: '您已填写部分内容，是否保存到本地？',
					confirmText: '保存',
					cancelText: '不保存',
					success: (res) => {
						if (res.confirm) {
							this.saveDraft()
							uni.showToast({ title: '已保存到本地', icon: 'success' })
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						} else {
							this.deleteDraft()
							uni.navigateBack()
						}
					}
				})
			},
			copyFaq(text) {
				this.content = text
				uni.showToast({ title: '已复制到输入框', icon: 'success' })
			},
			/** uni.showToast 字数有限；错误文案过长时用省略号便于对照控制台 / 网关日志排查 */
			toastFeedbackError(rawMsg) {
				const fallback = '提交失败，请稍后重试'
				const s = rawMsg != null && String(rawMsg).trim() ? String(rawMsg).trim() : fallback
				const title = s.length > 36 ? `${s.slice(0, 33)}…` : s
				uni.showToast({ title: title.length ? title : fallback, icon: 'none', duration: 3500 })
			},
			async submitFeedback() {
				const len = this.content.trim().length
				if (len < 10) {
					uni.showToast({ title: '反馈内容最少需要10个字哦', icon: 'none' })
					return
				}
				if (len > 500) {
					uni.showToast({ title: '反馈内容最多不能超过500字哦', icon: 'none' })
					return
				}
				if (!this.validateContact()) {
					return
				}

				const userId = resolveStoredUserId(getUser())
				if (!userId) {
					uni.showToast({ title: '请先登录后再提交反馈', icon: 'none' })
					return
				}

				const user = getUser()
				const nickname = this.resolveNickname(user)
				const phone = this.contact.trim()

				uni.showLoading({ title: '提交中...', mask: true })
				try {
					await request({
						url: '/api/notification/feedback',
						method: 'POST',
						data: {
							userId,
							nickname,
							phone,
							feedback: this.content.trim(),
						},
					})
					uni.hideLoading()
					this.deleteDraft()
					uni.showToast({ title: '反馈提交成功！感谢您的宝贵意见', icon: 'success' })
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				} catch (e) {
					uni.hideLoading()
					console.error('[feedback] submit failed', e)
					this.toastFeedbackError(e && e.message ? e.message : '')
				}
			}
		}
	}
</script>

<style lang="scss">
	.feedback-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(
			168deg,
			#e8ecf8 0%,
			#ecf0fb 28%,
			#f3f6fc 52%,
			#f8f9fe 100%
		);
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 22rpx;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(244, 246, 252, 0.9) 100%
		);
		backdrop-filter: blur(14px);
		box-shadow: 0 8rpx 28rpx rgba(38, 51, 78, 0.06);
		border-bottom: none;
	}

	.back-btn {
		box-sizing: border-box;
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		border: none;
		background: #ffffff;
		padding: 0;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:
			0 8rpx 22rpx rgba(93, 118, 189, 0.18),
			0 2rpx 8rpx rgba(45, 58, 95, 0.06),
			inset 0 2rpx 0 rgba(255, 255, 255, 0.85);
	}

	.back-icon-img {
		width: 38rpx;
		height: 38rpx;
		flex-shrink: 0;
	}

	.placeholder {
		width: 72rpx;
		height: 72rpx;
		flex-shrink: 0;
		opacity: 0;
	}

	.topbar-title {
		flex: 1;
		text-align: center;
		font-size: 32rpx;
		font-weight: 750;
		letter-spacing: 0.06em;
		color: #1e2638;
		text-shadow: 0 1rpx 0 rgba(255, 255, 255, 0.55);
	}

	.main-content {
		padding: 28rpx 24rpx calc(48rpx + env(safe-area-inset-bottom));
	}

	.editor-card {
		background: linear-gradient(
			165deg,
			#ffffff 0%,
			#fbfcfe 48%,
			#f7f9fd 100%
		);
		border-radius: 24rpx;
		padding: 32rpx 28rpx 36rpx;
		margin-bottom: 40rpx;
		border: none;
		box-shadow:
			0 16rpx 48rpx rgba(93, 118, 189, 0.12),
			0 4rpx 16rpx rgba(38, 51, 78, 0.05),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.95);
	}

	.textarea-wrap {
		position: relative;
		margin-bottom: 28rpx;
		padding-bottom: 40rpx;
		border-bottom: 1rpx solid rgba(93, 118, 189, 0.08);

		.content-input {
			width: 100%;
			height: 320rpx;
			font-size: 30rpx;
			color: #1e2638;
			line-height: 1.6;
			background: transparent;
		}

		.char-counter {
			position: absolute;
			bottom: 8rpx;
			right: 0;
			font-size: 24rpx;
			font-weight: 600;
			color: #7c88a8;

			&.error-text {
				color: #e85555;
				font-weight: 700;
			}
		}
	}

	.placeholder-style {
		color: #9aa3b8;
		font-style: italic;
	}

	.contact-section {
		.section-label {
			display: block;
			font-size: 26rpx;
			font-weight: 650;
			color: #4a5468;
			margin-bottom: 14rpx;
		}

		.contact-input {
			width: 100%;
			height: 92rpx;
			padding: 0 26rpx;
			background: linear-gradient(
				165deg,
				rgba(93, 118, 189, 0.07) 0%,
				rgba(93, 118, 189, 0.03) 100%
			);
			border-radius: 18rpx;
			font-size: 28rpx;
			color: #1e2638;
			box-sizing: border-box;
			border: none;
			box-shadow:
				inset 0 1rpx 0 rgba(255, 255, 255, 0.75),
				0 4rpx 14rpx rgba(93, 118, 189, 0.06);

			&.error {
				background: rgba(232, 85, 85, 0.08);
				box-shadow:
					inset 0 0 0 2rpx rgba(232, 85, 85, 0.35),
					0 4rpx 12rpx rgba(232, 85, 85, 0.12);
			}
		}

		.input-placeholder {
			color: #8b95aa;
		}

		.error-tip {
			display: block;
			margin-top: 12rpx;
			font-size: 24rpx;
			color: #e85555;
			font-weight: 600;
		}
	}

	.submit-btn-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 32rpx;

		.submit-btn {
			width: 100%;
			max-width: 100%;
			height: 94rpx;
			background: linear-gradient(180deg, #e4e8f2 0%, #d9dee9 100%);
			color: #8b95aa;
			border-radius: 999rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			font-weight: 700;
			letter-spacing: 0.08em;
			transition:
				transform 0.2s ease,
				box-shadow 0.2s ease,
				background 0.2s ease,
				color 0.2s ease;
			border: none;
			box-shadow:
				0 4rpx 12rpx rgba(38, 51, 78, 0.08),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.65);

			&.active {
				background: #5d76bd;
				color: #fff;
				box-shadow:
					0 14rpx 36rpx rgba(93, 118, 189, 0.35),
					0 4rpx 12rpx rgba(45, 58, 95, 0.12),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.22);
			}

			&:active {
				transform: scale(0.985);
			}
		}
	}

	.tip-text {
		text-align: center;
		font-size: 24rpx;
		line-height: 1.65;
		color: #7c88a8;
		padding: 0 28rpx 8rpx;
	}

	.faq-section {
		margin-top: 36rpx;
		border-radius: 24rpx;
		padding: 32rpx 28rpx 36rpx;
		background: linear-gradient(
			165deg,
			#ffffff 0%,
			#f8faff 55%,
			#f4f6fc 100%
		);
		border: none;
		box-shadow:
			0 14rpx 44rpx rgba(93, 118, 189, 0.1),
			0 4rpx 16rpx rgba(38, 51, 78, 0.04),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.95);

		.faq-title {
			font-size: 28rpx;
			font-weight: 750;
			color: #1e2638;
			margin-bottom: 22rpx;
			text-align: left;
			letter-spacing: 0.02em;
		}

		.faq-list {
			display: flex;
			flex-direction: column;
			gap: 18rpx;
		}

		.faq-item {
			display: flex;
			align-items: flex-start;
			gap: 18rpx;
			padding: 22rpx 20rpx;
			background: linear-gradient(
				165deg,
				rgba(255, 255, 255, 0.95) 0%,
				rgba(246, 248, 252, 0.9) 100%
			);
			border-radius: 18rpx;
			border: none;
			box-shadow:
				0 8rpx 22rpx rgba(93, 118, 189, 0.08),
				0 2rpx 8rpx rgba(38, 51, 78, 0.04),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.9);
			transition: transform 0.18s ease, opacity 0.18s ease;

			&:active {
				opacity: 0.94;
				transform: scale(0.988);
				box-shadow:
					0 4rpx 14rpx rgba(93, 118, 189, 0.12),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.85);
			}

			.faq-icon {
				width: 48rpx;
				height: 48rpx;
				background: linear-gradient(145deg, #5d76bd 0%, #4660a3 48%, #6b87d6 100%);
				color: #fff;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-weight: 750;
				flex-shrink: 0;
				box-shadow:
					0 6rpx 16rpx rgba(93, 118, 189, 0.35),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.25);
			}

			.faq-content {
				font-size: 26rpx;
				color: #3d455c;
				line-height: 1.55;
				flex: 1;
				word-break: break-word;
				font-weight: 500;
				padding-top: 4rpx;
			}
		}
	}

	.feedback-page.theme-dark {
		background: linear-gradient(168deg, #0e1015 0%, #14161e 42%, #1a1c24 100%);

		.nav-bar {
			background: linear-gradient(
				180deg,
				rgba(32, 34, 42, 0.96) 0%,
				rgba(24, 26, 32, 0.94) 100%
			);
			box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.45);
			border-bottom: none;
		}

		.back-btn {
			background: #2e323c;
			box-shadow:
				0 8rpx 22rpx rgba(0, 0, 0, 0.35),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
		}

		.topbar-title {
			color: #f4f7fb;
			text-shadow: none;
		}

		.editor-card {
			background: linear-gradient(165deg, #252830 0%, #1e2129 100%);
			box-shadow:
				0 16rpx 48rpx rgba(0, 0, 0, 0.32),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);

			.textarea-wrap {
				border-bottom-color: rgba(255, 255, 255, 0.08);

				.content-input {
					color: #f4f7fb;
				}
				.char-counter {
					color: #8a96af;

					&.error-text {
						color: #ff8a92;
					}
				}
			}

			.contact-section {
				.section-label {
					color: #b4bac8;
				}
				.contact-input {
					background: linear-gradient(
						165deg,
						rgba(93, 118, 189, 0.12) 0%,
						rgba(93, 118, 189, 0.05) 100%
					);
					color: #f4f7fb;
					box-shadow:
						inset 0 1rpx 0 rgba(255, 255, 255, 0.06),
						0 4rpx 14rpx rgba(0, 0, 0, 0.2);

					&.error {
						background: rgba(232, 85, 85, 0.12);
						box-shadow:
							inset 0 0 0 2rpx rgba(255, 138, 146, 0.35),
							0 4rpx 12rpx rgba(0, 0, 0, 0.2);
					}
				}
				.input-placeholder {
					color: #6d7280;
				}
				.error-tip {
					color: #ff9aa2;
				}
			}
		}

		.submit-btn-wrap .submit-btn {
			background: linear-gradient(180deg, #343842 0%, #2a2d35 100%);
			color: #6d7280;
			box-shadow:
				0 4rpx 12rpx rgba(0, 0, 0, 0.25),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.06);

			&.active {
				background: #5d76bd;
				color: #fff;
				box-shadow:
					0 14rpx 36rpx rgba(93, 118, 189, 0.35),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.15);
			}
		}

		.tip-text {
			color: #8a96af;
		}

		.faq-section {
			background: linear-gradient(165deg, #242830 0%, #1c1f26 100%);
			box-shadow:
				0 14rpx 44rpx rgba(0, 0, 0, 0.28),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);

			.faq-title {
				color: #f4f7fb;
			}

			.faq-item {
				background: linear-gradient(165deg, #2a2d38 0%, #23262e 100%);
				box-shadow:
					0 8rpx 22rpx rgba(0, 0, 0, 0.25),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.06);

				&:active {
					box-shadow:
						0 4rpx 14rpx rgba(0, 0, 0, 0.3),
						inset 0 1rpx 0 rgba(255, 255, 255, 0.06);
				}

				.faq-content {
					color: #d8deeb;
				}
			}
		}
	}
</style>