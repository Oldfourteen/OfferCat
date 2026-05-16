<template>
	<view class="find-password-container">
		<view class="nav-bar">
			<view class="back-btn" @click="goBack">
				<image class="back-icon" src="/static/close.png" mode="aspectFit"></image>
			</view>
		</view>
		
		<view class="content-box">
			<view class="title">找回密码</view>
			
			<view class="form-area">
				<view class="input-item" :class="{'input-active': currentFocus === 'phone'}">
					<input
						type="text"
						placeholder="请输入手机号"
						v-model="phone"
						@focus="handleFocus('phone')"
						@blur="handleBlur"
					/>
				</view>
				
				<view class="input-item verify-row" :class="{'input-active': currentFocus === 'code'}">
					<input
						type="text"
						placeholder="请输入验证码"
						v-model="code"
						@focus="handleFocus('code')"
						@blur="handleBlur"
					/>
					<view class="send-code-btn" :class="{ disabled: sendDisabled }" @click="onSendCode">
						{{ sendText }}
					</view>
				</view>
				
				<view class="input-item password-row" :class="{'input-active': currentFocus === 'password'}">
					<input
						type="text"
						:password="!showPassword"
						placeholder="请输入新密码"
						v-model="password"
						@focus="handleFocus('password')"
						@input="onPasswordInput"
						@blur="handlePasswordBlur"
					/>
					<view class="toggle-btn" @click="togglePasswordVisible">
						<image v-if="showPassword" class="eye-icon" src="../../asset/image/eye-solid.png" mode="aspectFit"></image>
						<image v-else class="eye-icon" src="../../asset/image/eye-slash-solid.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="error-text" v-if="passwordError">{{ passwordError }}</view>
				
				<view class="input-item password-row" :class="{'input-active': currentFocus === 'confirmPassword'}">
					<input
						type="text"
						:password="!showConfirmPassword"
						placeholder="请再次输入新密码"
						v-model="confirmPassword"
						@focus="handleFocus('confirmPassword')"
						@input="onConfirmPasswordInput"
						@blur="handleConfirmPasswordBlur"
					/>
					<view class="toggle-btn" @click="toggleConfirmPasswordVisible">
						<image v-if="showConfirmPassword" class="eye-icon" src="../../asset/image/eye-solid.png" mode="aspectFit"></image>
						<image v-else class="eye-icon" src="../../asset/image/eye-slash-solid.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="error-text" v-if="confirmPasswordError">{{ confirmPasswordError }}</view>
			</view>
			
			<humanVerify @verify="onHumanVerify"></humanVerify>
			
			<view class="submit-btn" @click="handleSubmit">确认重置</view>
			
			<view class="switch-mode">
				<text class="tips">想起密码了？</text>
				<text class="link" @click="goLogin">去登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import humanVerify from './components/humanVerify.vue';
	import { sendCode, findPassword } from '../../api/auth';
	
	export default {
		components: {
			humanVerify
		},
		data() {
			return {
				phone: '',
				code: '',
				password: '',
				confirmPassword: '',
				currentFocus: '',
				showPassword: false,
				showConfirmPassword: false,
				passwordTouched: false,
				confirmPasswordTouched: false,
				passwordError: '',
				confirmPasswordError: '',
				isHuman: false,
				secondsLeft: 0,
				timer: null
			}
		},
		computed: {
			sendDisabled() {
				return this.secondsLeft > 0;
			},
			sendText() {
				return this.secondsLeft > 0 ? `${this.secondsLeft}s` : '发送验证码';
			}
		},
		beforeUnmount() {
			this.clearTimer();
		},
		methods: {
			backToLogin() {
				const pages = getCurrentPages()
				if (Array.isArray(pages) && pages.length > 1) {
					uni.navigateBack()
					return
				}
				uni.redirectTo({
					url: '/pages/login/otherLogin'
				})
			},
			goBack() {
				this.backToLogin();
			},
			goLogin() {
				this.backToLogin();
			},
			handleFocus(field) {
				this.currentFocus = field;
			},
			handleBlur() {
				this.currentFocus = '';
			},
			onPasswordInput() {
				if (this.password) this.passwordTouched = true;
				this.validatePassword();
				if (this.confirmPasswordTouched) {
					this.validateConfirmPassword();
				}
			},
			onConfirmPasswordInput() {
				if (this.confirmPassword) this.confirmPasswordTouched = true;
				this.validateConfirmPassword();
			},
			handlePasswordBlur() {
				this.passwordTouched = true;
				this.validatePassword();
				this.handleBlur();
			},
			handleConfirmPasswordBlur() {
				this.confirmPasswordTouched = true;
				this.validateConfirmPassword();
				this.handleBlur();
			},
			validatePassword() {
				if (!this.password) {
					this.passwordError = '';
					return true;
				}
				const ok = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(this.password);
				this.passwordError = ok ? '' : '密码至少8位，且同时包含大写和小写字母';
				return ok;
			},
			validateConfirmPassword() {
				if (!this.confirmPassword || !this.password) {
					this.confirmPasswordError = '';
					return true;
				}
				const ok = this.password === this.confirmPassword;
				this.confirmPasswordError = ok ? '' : '两次密码不一致';
				return ok;
			},
			togglePasswordVisible() {
				this.showPassword = !this.showPassword;
			},
			toggleConfirmPasswordVisible() {
				this.showConfirmPassword = !this.showConfirmPassword;
			},
			onHumanVerify(val) {
				this.isHuman = val;
			},
			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
			},
			async onSendCode() {
				if (this.sendDisabled) return;
				if (!this.phone) {
					uni.showToast({ title: '请先输入手机号', icon: 'none' });
					return;
				}
				
				uni.showLoading({ title: '发送中', mask: true });
				try {
					await sendCode({ phone: this.phone, scene: 'findPassword' });
					uni.hideLoading();
					uni.showToast({ title: '验证码已发送', icon: 'none' });
					this.startCountdown();
				} catch (e) {
					uni.hideLoading();
					uni.showToast({ title: (e && e.message) ? e.message : '发送失败', icon: 'none' });
				}
			},
			startCountdown() {
				this.clearTimer();
				this.secondsLeft = 60;
				this.timer = setInterval(() => {
					if (this.secondsLeft <= 1) {
						this.secondsLeft = 0;
						this.clearTimer();
						return;
					}
					this.secondsLeft -= 1;
				}, 1000);
			},
			handleSubmit() {
				if (!this.phone || !this.code || !this.password || !this.confirmPassword) {
					uni.showToast({ title: '请填写完整信息', icon: 'none' });
					return;
				}
				if (!this.isHuman) {
					uni.showToast({ title: '请先完成人机验证', icon: 'none' });
					return;
				}
				this.passwordTouched = true;
				this.confirmPasswordTouched = true;
				const passOk = this.validatePassword();
				const confirmOk = this.validateConfirmPassword();
				if (!passOk || !confirmOk) return;
				this.doFindPassword();
			},
			async doFindPassword() {
				uni.showLoading({ title: '重置中', mask: true });
				try {
					await findPassword({
						phone: this.phone,
						code: this.code,
						password: this.password,
						confirmPassword: this.confirmPassword
					});
					uni.hideLoading();
					uni.showToast({ title: '密码重置成功', icon: 'success' });
					setTimeout(() => {
						this.backToLogin();
					}, 600);
				} catch (e) {
					uni.hideLoading();
					uni.showToast({ title: (e && e.message) ? e.message : '重置失败', icon: 'none' });
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.find-password-container {
		width: 100%;
		min-height: 100vh;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		
		.nav-bar {
			width: 100%;
			height: 88px;
			padding-top: 40px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			padding-left: 20px;
			
			.back-btn {
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				
				.back-icon {
					width: 20px;
					height: 20px;
				}
			}
		}
		
		.content-box {
			padding: 40px 30px;
			
			.title {
				font-size: 28px;
				font-weight: bold;
				color: #333;
				margin-bottom: 40px;
			}
		}
	}
	
	.form-area {
		margin-bottom: 20px;
		
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
			
			.toggle-btn {
				width: 28px;
				height: 28px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				color: #999;
				transition: color 0.2s;
				
				&:active {
					color: #5d76bd;
				}
				
				.eye-icon {
					width: 20px;
					height: 20px;
				}
			}
		}
		
		.password-row {
			position: relative;
			height: 50px;
			
			input {
				height: 100%;
			}
			
			.toggle-btn {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
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
	}
	
	.error-text {
		margin-top: -10px;
		margin-bottom: 10px;
		font-size: 12px;
		color: #ff4d4f;
	}
	
	.submit-btn {
		width: 100%;
		height: 45px;
		background-color: #5d76bd;
		color: #fff;
		border-radius: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		margin-bottom: 20px;
		transition: all 0.2s;
		
		&:active {
			transform: scale(0.98);
			background-color: #4b609a;
		}
	}
	
	.switch-mode {
		display: flex;
		justify-content: center;
		font-size: 14px;
		
		.tips {
			color: #999;
		}
		
		.link {
			color: #5d76bd;
			margin-left: 5px;
		}
	}
</style>
