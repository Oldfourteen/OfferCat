<template>
	<view class="component-wrapper">
		<!-- 表单区 -->
		<view class="form-area">
			<view class="input-item" :class="{'input-active': currentFocus === 'email'}">
				<input 
					type="text" 
					placeholder="请输入邮箱 (选填)" 
					v-model="email" 
					@focus="handleFocus('email')" 
					@input="onEmailInput"
					@blur="handleEmailBlur" 
				/>
			</view>
			<view class="error-text" v-if="emailError">{{ emailError }}</view>
			<view class="input-item" :class="{'input-active': currentFocus === 'password'}">
				<input 
					type="text"
					:password="!showPassword"
					placeholder="请输入密码" 
					v-model="password" 
					@input="onPasswordInput"
					@focus="handleFocus('password')" 
					@blur="handlePasswordBlur" 
				/>
				<view class="toggle-btn" @click="togglePasswordVisible">{{ showPassword ? '隐藏' : '显示' }}</view>
			</view>
			<view class="error-text" v-if="passwordError">{{ passwordError }}</view>
			<view class="input-item" :class="{'input-active': currentFocus === 'confirmPassword'}">
				<input 
					type="text"
					:password="!showConfirmPassword"
					placeholder="请再次输入密码" 
					v-model="confirmPassword" 
					@input="onConfirmPasswordInput"
					@focus="handleFocus('confirmPassword')" 
					@blur="handleConfirmPasswordBlur" 
				/>
				<view class="toggle-btn" @click="toggleConfirmPasswordVisible">{{ showConfirmPassword ? '隐藏' : '显示' }}</view>
			</view>
			<view class="error-text" v-if="confirmPasswordError">{{ confirmPasswordError }}</view>
			<phoneCode v-model:phone="phone" v-model:code="code" scene="register" />
			
		</view>
		
		<humanVerify @verify="onHumanVerify"></humanVerify>
		
		<view class="agreement-wrapper">
			<confirmAgreement ref="agreementRef" :agreed="isAgreed" @change="onAgreementChange" @agreed-login="doRegister"></confirmAgreement>
		</view>
		
		<!-- 操作按钮 -->
		<view class="submit-btn" @click="handleSubmit">注册</view>
		
		<!-- 切换登录/注册状态 -->
		<view class="switch-mode">
			<text class="tips">已有账号？</text>
			<text class="link" @click="toggleMode">去登录</text>
		</view>
	</view>
</template>

<script>
	import confirmAgreement from './confirmAgreement.vue';
	import phoneCode from './phoneCode.vue';
	import humanVerify from './humanVerify.vue';
	import { register } from '../../../api/auth'
	
	export default {
		components: {
			confirmAgreement,
			phoneCode,
			humanVerify
		},
		data() {
			return {
				phone: '',
				email: '',
				code: '',
				password: '',
				confirmPassword: '',
				currentFocus: '',
				isAgreed: false,
				showPassword: false,
				showConfirmPassword: false,
				passwordTouched: false,
				confirmPasswordTouched: false,
				passwordError: '',
				confirmPasswordError: '',
				isHuman: false,
				emailTouched: false,
				emailError: ''
			}
		},
		methods: {
			handleFocus(field) {
				this.currentFocus = field;
			},
			handleBlur() {
				this.currentFocus = '';
			},
			onEmailInput() {
				if (this.email) this.emailTouched = true;
				this.validateEmail();
			},
			handleEmailBlur() {
				this.emailTouched = true;
				this.validateEmail();
				this.handleBlur();
			},
			validateEmail() {
				// 邮箱是选填项，如果为空，则不校验
				if (!this.email) {
					this.emailError = '';
					return true;
				}
				// 正则表达式校验邮箱格式
				const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
				this.emailError = ok ? '' : '请输入有效的邮箱地址';
				return ok;
			},
			onPasswordInput() {
				if (this.password) this.passwordTouched = true
				this.validatePassword()
				if (this.confirmPasswordTouched) {
					this.validateConfirmPassword()
				}
			},
			onConfirmPasswordInput() {
				if (this.confirmPassword) this.confirmPasswordTouched = true
				this.validateConfirmPassword()
			},
			handlePasswordBlur() {
				this.passwordTouched = true
				this.validatePassword()
				this.handleBlur()
			},
			handleConfirmPasswordBlur() {
				this.confirmPasswordTouched = true
				this.validateConfirmPassword()
				this.handleBlur()
			},
			validatePassword() {
				if (!this.password) {
					this.passwordError = ''
					return true
				}
				const ok = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(this.password)
				this.passwordError = ok ? '' : '密码至少8位，且同时包含大写和小写字母'
				return ok
			},
			validateConfirmPassword() {
				if (!this.confirmPassword || !this.password) {
					this.confirmPasswordError = ''
					return true
				}
				const ok = this.password === this.confirmPassword
				this.confirmPasswordError = ok ? '' : '两次密码不一致'
				return ok
			},
			togglePasswordVisible() {
				this.showPassword = !this.showPassword
			},
			toggleConfirmPasswordVisible() {
				this.showConfirmPassword = !this.showConfirmPassword
			},
			toggleMode() {
				this.$emit('switchMode');
			},
			onAgreementChange(val) {
				this.isAgreed = val;
			},
			onHumanVerify(val) {
				this.isHuman = val;
			},
			handleSubmit() {
				// 邮箱是选填，所以这里不检查 this.email
				if(!this.phone || !this.code || !this.password || !this.confirmPassword) {
					uni.showToast({ title: '请填写完整信息', icon: 'none' });
					return;
				}
				if (!this.isHuman) {
					uni.showToast({ title: '请先完成人机验证', icon: 'none' });
					return;
				}
				this.emailTouched = true
				this.passwordTouched = true
				this.confirmPasswordTouched = true
				const emailOk = this.validateEmail()
				const passOk = this.validatePassword()
				const confirmOk = this.validateConfirmPassword()
				if (!emailOk || !passOk || !confirmOk) return
				if (!this.isAgreed) {
					this.$refs.agreementRef.showModal();
					return;
				}
				this.doRegister();
			},
			async doRegister() {
				uni.showLoading({ title: '注册中', mask: true })
				try {
					await register({
						phone: this.phone,
						email: this.email,
						password: this.password,
						confirmPassword: this.confirmPassword,
						code: this.code
					})
					uni.hideLoading()
					uni.showToast({ title: '注册成功', icon: 'success' })
					setTimeout(() => {
						this.$emit('switchMode')
					}, 600)
				} catch (e) {
					uni.hideLoading()
					uni.showToast({ title: (e && e.message) ? e.message : '注册失败', icon: 'none' })
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
				height: 28px;
				padding: 0 10px;
				margin-left: 10px;
				border-radius: 14px;
				border: 1px solid #eee;
				color: #666;
				font-size: 12px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
			}
		}
	}

	.error-text {
		margin-top: -10px;
		margin-bottom: 10px;
		font-size: 12px;
		color: #ff4d4f;
	}
	
	.agreement-wrapper {
		margin-bottom: 10px;
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
