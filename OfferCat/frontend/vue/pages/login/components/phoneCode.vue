<template>
	<view class="phone-code">
		<!-- 手机号输入框供登录/注册页复用。 -->
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
		<!-- 验证码输入区集成发送按钮与倒计时状态。 -->
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
				// 输入聚焦状态用于切换高亮样式，倒计时状态用于控制发送按钮。
				currentFocus: '',
				secondsLeft: 0,
				timer: null
			}
		},
		computed: {
			sendDisabled() {
				// 倒计时未结束时禁止重复发送验证码。
				return this.secondsLeft > 0
			},
			sendText() {
				// 按钮文本在“发送验证码”和剩余秒数之间切换。
				return this.secondsLeft > 0 ? `${this.secondsLeft}s` : '发送验证码'
			}
		},
		beforeUnmount() {
			// 组件销毁时清理定时器，避免倒计时泄漏到页面外。
			this.clearTimer()
		},
		methods: {
			handleFocus(field) {
				// 记录当前聚焦字段，驱动输入框激活态样式。
				this.currentFocus = field
			},
			handleBlur() {
				this.currentFocus = ''
			},
			onPhoneInput(e) {
				// 通过 v-model 事件把手机号回传给父组件。
				this.$emit('update:phone', e.detail.value)
			},
			onCodeInput(e) {
				// 通过 v-model 事件把验证码回传给父组件。
				this.$emit('update:code', e.detail.value)
			},
			async onSendClick() {
				// 发送前先校验手机号，再请求后端发送验证码并启动倒计时。
				if (this.sendDisabled) return
				if (!this.phone) {
					uni.showToast({ title: '请先输入手机号', icon: 'none' })
					return
				}
				
				uni.showLoading({ title: '发送中', mask: true })
				try {
					// TODO(后端/阿里云短信)：由后端接口去调用阿里云短信发送验证码并落库/缓存
					await sendCode({ phone: (this.phone || '').trim(), scene: this.scene })
					
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
				// 用统一倒计时控制验证码按钮的可点击状态和剩余时间显示。
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
				// 多次发送或组件销毁前都先清掉旧定时器。
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
