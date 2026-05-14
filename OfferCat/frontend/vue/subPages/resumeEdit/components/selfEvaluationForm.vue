<template>
	<view class="form-wrapper" :class="themeClass">
		<view class="form-body">
			<view class="form-item">
				<view class="item-label"><text class="required">*</text>自我评价</view>
				<view class="item-content">
					<textarea class="form-textarea" v-model="formData.content" placeholder="请输入自我评价" :maxlength="800" auto-height :cursor-spacing="20"></textarea>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'

	export default {
		name: 'selfEvaluationForm',
		mixins: [themeMixin],
		props: {
			initialText: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				formData: {
					content: ''
				}
			}
		},
		watch: {
			initialText: {
				handler(val) {
					if (typeof val === 'string' && val && !this.formData.content) {
						this.formData.content = val
					}
				},
				immediate: true
			}
		},
		methods: {
			validate() {
				if (!this.formData.content.trim()) {
					uni.showToast({ title: '请填写自我评价', icon: 'none' })
					return false
				}
				return true
			},
			generateFormattedText() {
				const content = (this.formData.content || '').trim()
				const formatted = content ? content.replace(/\n/g, '<br/>') : ''
				return `<div class="resume-block-self-evaluation resume-content-box" style="font-size: 14px; color: #374151; line-height: 1.8; background: #f9fafb; border-radius: 10px; padding: 14px 16px; margin-bottom: 20px;">${formatted}</div>`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-wrapper {
		padding: 16px;

		.form-body {
			background: #fff;
			border-radius: 12px;
			padding: 20px;
			display: flex;
			flex-direction: column;
			
			.form-item {
				.item-label {
					font-size: 15px;
					color: #374151;
					font-weight: 500;
					margin-bottom: 10px;
					display: flex;
					align-items: center;

					.required {
						color: #ef4444;
						margin-right: 4px;
					}
				}

				.item-content {
					display: flex;
					align-items: center;
					
					.form-textarea {
						flex: 1;
						min-height: 180px;
						background: #f9fafb;
						border-radius: 10px;
						padding: 16px;
						font-size: 15px;
						color: #111827;
						width: 100%;
						box-sizing: border-box;

						&::placeholder {
							color: #9ca3af;
						}
					}
				}
			}
		}

		&.theme-dark {
			.form-body {
				background: #1d1f24;

				.form-item {
					.item-label {
						color: #f4f7fb;
					}

					.item-content {
						.form-textarea {
							background: #23252b;
							color: #f4f7fb;

							&::placeholder {
								color: rgba(255, 255, 255, 0.38);
							}
						}
					}
				}
			}
		}
	}
</style>
