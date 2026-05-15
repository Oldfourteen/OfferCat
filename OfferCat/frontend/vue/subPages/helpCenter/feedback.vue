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
					<view class="faq-item" v-for="(item, index) in faqList" :key="index" @click="copyFaq(item)">
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

	const STORAGE_KEY = 'feedback_draft'

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
				faqList: [
					'希望增加深色模式定时切换功能',
					'简历导出PDF时格式错乱',
					'AI面试模拟回答评分不准确',
					'题库题目重复太多',
					'消息通知不及时'
				]
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
			submitFeedback() {
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

				uni.showLoading({ title: '提交中...' })

				setTimeout(() => {
					uni.hideLoading()
					this.deleteDraft()
					uni.showToast({ title: '反馈提交成功！感谢您的宝贵意见', icon: 'success' })
					
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}, 800)
			}
		}
	}
</script>

<style lang="scss">
	$grad-blue-a: rgba(1, 188, 255, 0.1) 0%, rgba(49, 101, 215, 0.4) 45%, rgba(0, 123, 255, 0.05) 100%;
	$grad-blue-b: rgba(0, 122, 252, 0.7) 0%, rgba(1, 188, 255, 0) 100%;

	.feedback-page {
		min-height: 100vh;
		background: linear-gradient(180deg, #e8f4f2 0%, #f6fbff 18%, #f7f8fb 100%);
		display: flex;
		flex-direction: column;
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background:
			linear-gradient(180deg, $grad-blue-a),
			linear-gradient(180deg, $grad-blue-b);
		border-bottom: 2rpx solid rgba(243, 253, 255, 0.6);
	}

	.back-btn {
		box-sizing: border-box;
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.92);
		padding: 0;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 6rpx 18rpx rgba(34, 97, 193, 0.14);
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
		font-size: 34rpx;
		font-weight: 700;
		letter-spacing: 0.5rpx;
		color: #ffffff;
		text-shadow: 0 4rpx 16rpx rgba(38, 96, 189, 0.25);
	}

	.main-content {
		padding: 30rpx;
	}

	.editor-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 60rpx;
	}

	.textarea-wrap {
		position: relative;
		margin-bottom: 30rpx;
		
		.content-input {
			width: 100%;
			height: 320rpx;
			font-size: 30rpx;
			color: #333;
			line-height: 1.6;
		}
		
		.char-counter {
			position: absolute;
			bottom: 0;
			right: 0;
			font-size: 24rpx;
			color: #999;
			
			&.error-text {
				color: #ff6b6b;
			}
		}
	}

	.placeholder-style {
		color: #999;
		font-style: italic;
	}

	.contact-section {
		.section-label {
			display: block;
			font-size: 26rpx;
			color: #666;
			margin-bottom: 16rpx;
		}
		
		.contact-input {
			width: 100%;
			height: 88rpx;
			padding: 0 24rpx;
			background: #f8f9fa;
			border-radius: 16rpx;
			font-size: 28rpx;
			color: #333;
			box-sizing: border-box;
			border: 2rpx solid transparent;
			
			&.error {
				border-color: #ff6b6b;
				background: #fff5f5;
			}
		}
		
		.input-placeholder {
			color: #999;
		}
		
		.error-tip {
			display: block;
			margin-top: 12rpx;
			font-size: 24rpx;
			color: #ff6b6b;
		}
	}

	.submit-btn-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 40rpx;
		
		.submit-btn {
			width: 100%;
			height: 96rpx;
			background: #e0e0e0;
			color: #999;
			border-radius: 48rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			font-weight: bold;
			transition: all 0.3s;
			
			&.active {
				background: linear-gradient(135deg, #4AA9FE 0%, #3d8ef7 100%);
				color: #fff;
				box-shadow: 0 8rpx 24rpx rgba(74, 169, 254, 0.4);
			}
		}
	}

	.tip-text {
		text-align: center;
		font-size: 24rpx;
		color: #999;
		line-height: 1.6;
		padding: 0 40rpx;
	}

	.faq-section {
		margin-top: 40rpx;
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		
		.faq-title {
			font-size: 28rpx;
			font-weight: 700;
			color: #24345b;
			margin-bottom: 24rpx;
		}
		
		.faq-list {
			display: flex;
			flex-direction: column;
			gap: 16rpx;
		}
		
		.faq-item {
			display: flex;
			align-items: flex-start;
			gap: 16rpx;
			padding: 20rpx;
			background: #f8f9fa;
			border-radius: 12rpx;
			border: 2rpx solid transparent;
			transition: all 0.2s ease;
			
			&:active {
				background: #e9ecef;
				border-color: #4AA9FE;
			}
			
			.faq-icon {
				width: 48rpx;
				height: 48rpx;
				background: linear-gradient(135deg, #4AA9FE, #3d8ef7);
				color: #fff;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-weight: bold;
				flex-shrink: 0;
			}
			
			.faq-content {
				font-size: 26rpx;
				color: #555;
				line-height: 1.5;
				flex: 1;
				word-break: break-all;
			}
		}
	}

	.feedback-page.theme-dark {
		background: #111216;

		.nav-bar {
			background:
				linear-gradient(180deg, rgba(77, 108, 182, 0.38) 0%, rgba(35, 42, 63, 0.55) 50%, rgba(17, 18, 22, 0.3) 100%),
				linear-gradient(180deg, rgba(74, 103, 247, 0.55) 0%, rgba(74, 103, 247, 0) 100%);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}

		.back-btn {
			background: rgba(255, 255, 255, 0.92);
			box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.2);
		}

		.editor-card {
			background: #1d1f24;
			
			.textarea-wrap {
				.content-input { color: #f4f7fb; }
				.char-counter { color: #888; &.error-text { color: #ff6b6b; } }
			}
			
			.contact-section {
				.section-label { color: #aaa; }
				.contact-input { 
					background: #2a2c33; 
					color: #f4f7fb; 
					.input-placeholder { color: #666; }
				}
			}
		}

		.submit-btn-wrap .submit-btn {
			background: #2a2c33;
			color: #666;
			&.active {
				background: linear-gradient(135deg, #5d76bd 0%, #4a63a0 100%);
				color: #fff;
			}
		}

		.faq-section {
			background: #1d1f24;
			
			.faq-title {
				color: #f4f7fb;
			}
			
			.faq-item {
				background: #2a2c33;
				
				&:active {
					background: #34363d;
				}
				
				.faq-content {
					color: #eef2f8;
				}
			}
		}
	}
</style>