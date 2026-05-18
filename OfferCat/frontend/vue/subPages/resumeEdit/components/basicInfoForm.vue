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
					<picker @change="bindGenderChange" :range="genderRange">
						<view class="form-picker">
							<view :class="{'placeholder': !formData.gender}">
								{{ formData.gender || '请选择性别' }}
							</view>
							<text class="form-chevron">›</text>
						</view>
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

			<view class="form-item">
				<view class="item-label">求职意向</view>
				<view class="item-content">
					<input class="form-input" type="text" v-model="formData.jobIntention" placeholder="请输入求职意向，如：前端开发工程师" />
				</view>
			</view>

			<view class="form-item">
				<view class="item-label">证书</view>
				<view class="item-content certificate-content">
					<view class="certificate-fields">
						<view v-for="(cert, index) in formData.certificates" :key="index" class="certificate-field-row">
							<text class="certificate-field-label">证书{{ index + 1 }}</text>
							<input
								class="form-input certificate-input"
								type="text"
								v-model="cert.name"
								:placeholder="index === 0 ? '例如：英语六级' : index === 1 ? '例如：计算机二级' : '例如：教师资格证'"
							/>
						</view>
					</view>
					<text class="certificate-hint">最多填写 3 条，可为空</text>
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
					email: '',
					jobIntention: '',
					certificates: [
						{ name: '', url: '' },
						{ name: '', url: '' },
						{ name: '', url: '' }
					]
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
						email: val.email || '',
						jobIntention: val.jobIntention || '',
						certificates: this.normalizeCertificatesThree(val.certificates)
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
			normalizeCertificatesThree(raw) {
				const emptySlot = () => ({ name: '', url: '' })
				let list = []
				if (Array.isArray(raw) && raw.length > 0) {
					list = raw.map(item => {
						const o = item && typeof item === 'object' ? item : {}
						return {
							name: String(o.name != null ? o.name : '').trim(),
							url: String(o.url != null ? o.url : '').trim()
						}
					})
				}
				while (list.length < 3) list.push(emptySlot())
				if (list.length > 3) list = list.slice(0, 3)
				return list
			},
			generateFormattedText() {
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

						.form-chevron {
							font-size: 22px;
							line-height: 1;
							color: #5d76bd;
							flex-shrink: 0;
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

						.form-picker .form-chevron {
							color: #5d76bd;
						}
					}
				}
			}
		}
	}

	.certificate-content {
		flex-direction: column;
		align-items: flex-start;
	}

	.certificate-fields {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.certificate-field-row {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.certificate-field-label {
		font-size: 13px;
		color: #6b7280;
	}

	.certificate-input {
		width: 100%;
	}

	.certificate-hint {
		font-size: 12px;
		color: #9ca3af;
		margin-top: 8px;
	}

	.theme-dark {
		.certificate-field-label {
			color: rgba(255, 255, 255, 0.45);
		}

		.certificate-hint {
			color: rgba(255, 255, 255, 0.38);
		}
	}
</style>
