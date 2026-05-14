<template>
	<view class="feedback-page" :class="themeClass">
		<view class="nav-bar">
			<text class="back-btn" @click="goBack">‹</text>
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
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'

	const STORAGE_KEY = 'feedback_draft'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				content: '',
				contact: '',
				contactError: ''
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
		background: rgba(232, 244, 242, 0.94);
		backdrop-filter: blur(10rpx);
	}

	.back-btn,
	.placeholder {
		width: 72rpx;
		height: 72rpx;
		border-radius: 22rpx;
		background: rgba(255, 255, 255, 0.92);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-btn {
		font-size: 42rpx;
		color: #30435a;
	}

	.topbar-title {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		font-weight: 800;
		color: #26334e;
	}

	.placeholder {
		opacity: 0;
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

	.theme-dark {
		background: #111216;
		
		.nav-bar {
			background: #23252b;
			.back-btn, .placeholder { background: #2a2c33; }
			.back-btn, .topbar-title { color: #f4f7fb; }
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
	}
</style>