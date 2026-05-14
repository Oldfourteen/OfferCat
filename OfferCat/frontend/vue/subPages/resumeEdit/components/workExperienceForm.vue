<template>
	<view class="form-wrapper" :class="themeClass">
		<view class="form-body">
			<view class="form-item">
				<view class="item-label"><text class="required">*</text>公司名称</view>
				<view class="item-content">
					<input class="form-input" type="text" v-model="formData.company" placeholder="请输入公司名称" />
				</view>
			</view>

			<view class="form-item">
				<view class="item-label"><text class="required">*</text>担任职位</view>
				<view class="item-content">
					<input class="form-input" type="text" v-model="formData.position" placeholder="请输入您的职位" />
				</view>
			</view>

			<view class="form-item">
				<view class="item-label"><text class="required">*</text>在职时间</view>
				<view class="item-content date-range">
					<picker class="form-picker date-picker" mode="date" fields="month" @change="bindStartDateChange">
						<view :class="{'placeholder': !formData.startDate}">
							{{ formData.startDate || '入职时间' }}
						</view>
					</picker>
					<view class="separator">-</view>
					<picker class="form-picker date-picker" mode="date" fields="month" @change="bindEndDateChange">
						<view :class="{'placeholder': !formData.endDate}">
							{{ formData.endDate || '离职时间' }}
						</view>
					</picker>
				</view>
			</view>
			
			<view class="form-item">
				<view class="item-label"><text class="required">*</text>工作内容</view>
				<view class="item-content">
					<textarea class="form-textarea" v-model="formData.content" placeholder="请简要描述您的工作内容及取得的成绩" maxlength="500"></textarea>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'

	export default {
		name: 'workExperienceForm',
		mixins: [themeMixin],
		props: {
			initialData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				formData: {
					company: '',
					position: '',
					startDate: '',
					endDate: '',
					content: ''
				}
			}
		},
		watch: {
			initialData: {
				handler(val) {
					if (val && Object.keys(val).length > 0) {
						this.formData = { ...this.formData, ...val };
					}
				},
				immediate: true
			}
		},
		methods: {
			validate() {
				if (!this.formData.company.trim()) {
					uni.showToast({ title: '请填写公司名称', icon: 'none' })
					return false
				}
				if (!this.formData.position.trim()) {
					uni.showToast({ title: '请填写担任职位', icon: 'none' })
					return false
				}
				if (!this.formData.startDate || !this.formData.endDate) {
					uni.showToast({ title: '请完善在职时间', icon: 'none' })
					return false
				}
				if (!this.formData.content.trim()) {
					uni.showToast({ title: '请填写工作内容', icon: 'none' })
					return false
				}
				return true
			},
			bindStartDateChange(e) {
				this.formData.startDate = e.detail.value
			},
			bindEndDateChange(e) {
				this.formData.endDate = e.detail.value
			},
			// 生成带样式的大字段 HTML 字符串
			generateFormattedText() {
				const { company, position, startDate, endDate, content } = this.formData
				
				// 时间范围
				let timeStr = ''
				if (startDate || endDate) {
					timeStr = `<span class="resume-time" style="font-size: 14px; color: #6b7280; background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">${startDate || '未知'} - ${endDate || '至今'}</span>`
				}

				// 第一行：公司名称 (加粗大字号) 和 时间 (小字号浅色)
				const row1 = `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
					<span class="resume-title" style="font-size: 17px; font-weight: bold; color: #111827; letter-spacing: 0.5px;">${company || ''}</span>
					${timeStr}
				</div>`

				// 第二行：担任职位 (常规字号)
				const row2 = position ? `<div class="resume-subtitle" style="font-size: 15px; color: #4b5563; font-weight: 500; margin-bottom: 12px; display: flex; align-items: center;"><span style="width: 4px; height: 14px; background: #10b981; border-radius: 2px; margin-right: 8px;"></span>职位：${position}</div>` : ''

				// 第三行：工作内容 (常规字号)
				const formattedDesc = content ? content.replace(/\n/g, '<br/>') : ''
				const row3 = formattedDesc ? `<div class="resume-content-box" style="font-size: 14px; color: #6b7280; line-height: 1.6; text-align: justify; background: #f9fafb; padding: 12px; border-radius: 8px;">${formattedDesc}</div>` : ''

				return `<div class="resume-block-work resume-block-item" style="margin-bottom: 20px; border-bottom: 1px dashed #f3f4f6; padding-bottom: 16px;">${row1}${row2}${row3}</div>`
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
				margin-bottom: 24px;
				
				&:last-child {
					margin-bottom: 0;
				}

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
					
					.form-input {
						flex: 1;
						height: 48px;
						background: #f9fafb;
						border-radius: 8px;
						padding: 0 16px;
						font-size: 15px;
						color: #111827;
						
						&::placeholder {
							color: #9ca3af;
						}
					}
					
					.form-textarea {
						flex: 1;
						min-height: 120px;
						background: #f9fafb;
						border-radius: 8px;
						padding: 16px;
						font-size: 15px;
						color: #111827;
						width: 100%;
						box-sizing: border-box;

						&::placeholder {
							color: #9ca3af;
						}
					}
					
					.form-picker {
						flex: 1;
						height: 48px;
						background: #f9fafb;
						border-radius: 8px;
						padding: 0 16px;
						font-size: 15px;
						color: #111827;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.placeholder {
							color: #9ca3af;
						}
					}
				}

				.date-range {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 10px;

					.date-picker {
						flex: 1;
						justify-content: center;
					}

					.separator {
						color: #9ca3af;
						font-weight: bold;
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
						.form-input, .form-textarea, .form-picker {
							background: #23252b;
							color: #f4f7fb;

							&::placeholder {
								color: rgba(255, 255, 255, 0.38);
							}
						}

						.form-picker .placeholder {
							color: rgba(255, 255, 255, 0.38);
						}

						.separator {
							color: rgba(255, 255, 255, 0.38);
						}
					}
				}
			}
		}
	}
</style>