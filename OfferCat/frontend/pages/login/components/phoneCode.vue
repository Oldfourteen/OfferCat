<template>
	<view class="phone-code">
		<view class="input-item" :class="{'input-active': currentFocus === 'phone'}">
			<input
				type="text"
				placeholder="请输入手机号"
				:value="phone"
				@input="onPhoneInput"
				@focus="handleFocus('phone')"
				@blur="handleBlur"
			/>
		</view>
		<view class="input-item verify-row" :class="{'input-active': currentFocus === 'code'}">
			<input
				type="text"
				placeholder="请输入验证码"
				:value="code"
				@input="onCodeInput"
				@focus="handleFocus('code')"
				@blur="handleBlur"
			/>
			<view class="send-code-btn" :class="{ disabled: sendDisabled }" @click="onSendClick">
				{{ sendText }}
			</view>
		</view>
	</view>
</template>

<script>
	import { sendCode } from '../../../api/auth'
	
	export default {
		props: {
			phone: {
				type: String,
				default: ''
			},
			code: {
				type: String,
				default: ''
			},
			scene: {
				type: String,
				default: 'register'
			},
			countdown: {
				type: Number,
				default: 60
			}
		},
		emits: ['update:phone', 'update:code', 'send'],
		data() {
			return {
				currentFocus: '',
				secondsLeft: 0,
				timer: null
			}
		},
		computed: {
			sendDisabled() {
				return this.secondsLeft > 0
			},
			sendText() {
				return this.secondsLeft > 0 ? `${this.secondsLeft}s` : '发送验证码'
			}
		},
		beforeUnmount() {
			this.clearTimer()
		},
		methods: {
			handleFocus(field) {
				this.currentFocus = field
			},
			handleBlur() {
				this.currentFocus = ''
			},
			onPhoneInput(e) {
				this.$emit('update:phone', e.detail.value)
			},
			onCodeInput(e) {
				this.$emit('update:code', e.detail.value)
			},
			async onSendClick() {
				if (this.sendDisabled) return
				if (!this.phone) {
					uni.showToast({ title: '请先输入手机号', icon: 'none' })
					return
				}
				
				uni.showLoading({ title: '发送中', mask: true })
				try {
					// TODO(后端/短信宝)：由后端接口去调用短信宝发送短信并落库/缓存验证码
					await sendCode({ phone: this.phone, scene: this.scene })
					
					uni.hideLoading()
					uni.showToast({ title: '验证码已发送', icon: 'none' })
					this.$emit('send', { phone: this.phone, scene: this.scene })
					this.startCountdown()
				} catch (e) {
					uni.hideLoading()
					uni.showToast({ title: (e && e.message) ? e.message : '发送失败', icon: 'none' })
				}
			},
			startCountdown() {
				this.clearTimer()
				this.secondsLeft = Number(this.countdown) || 60
				this.timer = setInterval(() => {
					if (this.secondsLeft <= 1) {
						this.secondsLeft = 0
						this.clearTimer()
						return
					}
					this.secondsLeft -= 1
				}, 1000)
			},
			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer)
					this.timer = null
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.phone-code {
		width: 100%;
	}

	.input-item {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #eee;
		margin-bottom: 20px;
		display: flex;
		align-items: center;
		transition: border-color 0.3s ease;

		&.input-active {
			border-bottom-color: #5d76bd;
		}

		input {
			flex: 1;
			width: 100%;
			height: 100%;
			font-size: 16px;
			color: #333;
		}
	}

	.verify-row {
		.send-code-btn {
			height: 28px;
			padding: 0 10px;
			margin-left: 10px;
			border-radius: 14px;
			border: 1px solid #5d76bd;
			color: #5d76bd;
			font-size: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;

			&.disabled {
				opacity: 0.6;
			}
		}
	}
</style>
