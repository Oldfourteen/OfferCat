<template>
	<view class="form-wrapper" :class="themeClass">
		<view class="form-body">
			<view class="form-item">
				<view class="item-label"><text class="required">*</text>姓名</view>
				<view class="item-content">
					<input class="form-input" type="text" v-model="formData.name" placeholder="请输入真实姓名" />
				</view>
			</view>
			
			<view class="form-item">
				<view class="item-label"><text class="required">*</text>性别</view>
				<view class="item-content">
					<picker class="form-picker" @change="bindGenderChange" :range="genderRange">
						<view :class="{'placeholder': !formData.gender}">
							{{ formData.gender || '请选择性别' }}
						</view>
						<uni-icons type="right" size="16" color="#9ca3af"></uni-icons>
					</picker>
				</view>
			</view>

			<view class="form-item">
				<view class="item-label"><text class="required">*</text>手机号码</view>
				<view class="item-content">
					<input class="form-input" type="number" maxlength="11" v-model="formData.phone" placeholder="请输入手机号码" />
				</view>
			</view>

			<view class="form-item">
				<view class="item-label"><text class="required">*</text>联系邮箱</view>
				<view class="item-content">
					<input class="form-input" type="text" v-model="formData.email" placeholder="请输入常用邮箱" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'

	export default {
		name: 'basicInfoForm',
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
					name: '',
					gender: '',
					phone: '',
					email: ''
				},
				genderRange: ['男', '女']
			}
		},
		watch: {
			initialData: {
				handler(val) {
					if (!val || typeof val !== 'object') return
					this.formData = {
						name: val.name || '',
						gender: val.gender || '',
						phone: val.phone || '',
						email: val.email || ''
					}
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			validate() {
				if (!this.formData.name.trim()) {
					uni.showToast({ title: '请填写姓名', icon: 'none' })
					return false
				}
				if (!this.formData.gender) {
					uni.showToast({ title: '请选择性别', icon: 'none' })
					return false
				}
				if (!this.formData.phone.trim()) {
					uni.showToast({ title: '请填写手机号码', icon: 'none' })
					return false
				}
				if (!this.formData.email.trim()) {
					uni.showToast({ title: '请填写联系邮箱', icon: 'none' })
					return false
				}
				return true
			},
			bindGenderChange(e) {
				this.formData.gender = this.genderRange[e.detail.value]
			},
			// 生成带样式的大字段 HTML 字符串，由于现在展示拆分了，此方法可只返回一个对象给父组件
			generateFormattedText() {
				// 将对象直接返回，方便父组件取值
				return this.formData;
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
					}
				}
			}
		}
	}
</style>
