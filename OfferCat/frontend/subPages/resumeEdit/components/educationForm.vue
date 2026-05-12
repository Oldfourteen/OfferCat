<template>
	<view class="form-wrapper" :class="themeClass">
		<view class="form-body">
			<view class="form-item">
				<view class="item-label"><text class="required">*</text>学校名称</view>
				<view class="item-content">
					<input class="form-input" type="text" v-model="formData.school" placeholder="请输入学校名称" />
				</view>
			</view>

			<view class="form-item">
				<view class="item-label"><text class="required">*</text>学历/学位</view>
				<view class="item-content">
					<picker @change="bindDegreeChange" :range="degreeRange">
						<view class="form-picker">
							<view :class="{'placeholder': !formData.degree}">
								{{ formData.degree || '请选择学历/学位' }}
							</view>
							<text class="form-chevron">›</text>
						</view>
					</picker>
				</view>
			</view>

			<view class="form-item">
				<view class="item-label"><text class="required">*</text>专业名称</view>
				<view class="item-content">
					<input class="form-input" type="text" v-model="formData.major" placeholder="请输入专业名称" />
				</view>
			</view>

			<view class="form-item">
				<view class="item-label"><text class="required">*</text>就读时间</view>
				<view class="item-content date-range">
					<picker class="form-picker date-picker" mode="date" fields="month" @change="bindStartDateChange">
						<view :class="{'placeholder': !formData.startDate}">
							{{ formData.startDate || '入学时间' }}
						</view>
					</picker>
					<view class="separator">-</view>
					<picker class="form-picker date-picker" mode="date" fields="month" @change="bindEndDateChange">
						<view :class="{'placeholder': !formData.endDate}">
							{{ formData.endDate || '毕业时间' }}
						</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'

	export default {
		name: 'educationForm',
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
					school: '',
					degree: '',
					major: '',
					startDate: '',
					endDate: ''
				},
				degreeRange: ['初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士']
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
				if (!this.formData.school.trim()) {
					uni.showToast({ title: '请填写学校名称', icon: 'none' })
					return false
				}
				if (!this.formData.degree) {
					uni.showToast({ title: '请选择学历/学位', icon: 'none' })
					return false
				}
				if (!this.formData.major.trim()) {
					uni.showToast({ title: '请填写专业名称', icon: 'none' })
					return false
				}
				if (!this.formData.startDate || !this.formData.endDate) {
					uni.showToast({ title: '请完善就读时间', icon: 'none' })
					return false
				}
				return true
			},
			bindDegreeChange(e) {
				this.formData.degree = this.degreeRange[e.detail.value]
			},
			bindStartDateChange(e) {
				this.formData.startDate = e.detail.value
			},
			bindEndDateChange(e) {
				this.formData.endDate = e.detail.value
			},
			// 生成带样式的大字段 HTML 字符串
			generateFormattedText() {
				const { school, degree, major, startDate, endDate } = this.formData
				
				// 时间范围
				let timeStr = ''
				if (startDate || endDate) {
					timeStr = `<span class="resume-time" style="font-size: 14px; color: #6b7280; background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">${startDate || '未知'} - ${endDate || '至今'}</span>`
				}

				// 第一行：学校 (加粗大字号) 和 时间 (小字号浅色背景)
				const row1 = `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
					<span class="resume-title" style="font-size: 17px; font-weight: bold; color: #111827; letter-spacing: 0.5px;">${school || ''}</span>
					${timeStr}
				</div>`

				// 第二行：专业和学历 (常规字号)
				let subArr = [major, degree].filter(Boolean)
				const row2 = subArr.length > 0 
					? `<div class="resume-subtitle" style="font-size: 15px; color: #4b5563; line-height: 1.5;">${subArr.join(' <span style="margin: 0 10px; color: #d1d5db; font-size: 12px;">|</span> ')}</div>`
					: ''

				return `<div class="resume-block-education resume-block-item" style="margin-bottom: 20px; border-bottom: 1px dashed #f3f4f6; padding-bottom: 16px;">${row1}${row2}</div>`
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

						.form-chevron {
							font-size: 22px;
							line-height: 1;
							color: #9ca3af;
							flex-shrink: 0;
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
						.form-input, .form-picker {
							background: #23252b;
							color: #f4f7fb;

							&::placeholder {
								color: rgba(255, 255, 255, 0.38);
							}
						}

						.form-picker .placeholder {
							color: rgba(255, 255, 255, 0.38);
						}

						.form-picker .form-chevron {
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