<template>
	<view class="component-wrapper">
		<!-- 表单区 -->
		<view class="form-area animate-item" :style="{ animationDelay: '0s' }">
			<!-- 邮箱输入为选填项，仅在填写时校验格式。 -->
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
			<!-- 密码输入框要求满足注册密码复杂度规则。 -->
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
				<view class="toggle-btn" @click="togglePasswordVisible">
					<image v-if="showPassword" class="eye-icon" src="../../../asset/image/eye-solid.png" mode="aspectFit"></image>
					<image v-else class="eye-icon" src="../../../asset/image/eye-slash-solid.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="error-text" v-if="passwordError">{{ passwordError }}</view>
			<!-- 确认密码输入框用于二次校验两次密码是否一致。 -->
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
				<view class="toggle-btn" @click="toggleConfirmPasswordVisible">
					<image v-if="showConfirmPassword" class="eye-icon" src="../../../asset/image/eye-solid.png" mode="aspectFit"></image>
					<image v-else class="eye-icon" src="../../../asset/image/eye-slash-solid.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="error-text" v-if="confirmPasswordError">{{ confirmPasswordError }}</view>
			<!-- 手机号和验证码输入复用公共组件，负责发送验证码与倒计时。 -->
			<phoneCode v-model:phone="phone" v-model:code="code" scene="register" />
			
		</view>
		
		<!-- 注册前同样要求通过人机验证。 -->
		<humanVerify class="animate-item" :style="{ animationDelay: '0.2s' }" @verify="onHumanVerify"></humanVerify>
		
		<view class="agreement-wrapper animate-item" :style="{ animationDelay: '0.35s' }">
			<!-- 协议组件统一处理勾选和弹窗确认。 -->
			<confirmAgreement ref="agreementRef" :agreed="isAgreed" @change="onAgreementChange" @agreed-login="doRegister"></confirmAgreement>
		</view>
		
		<!-- 操作按钮 -->
		<view class="submit-btn animate-item" :style="{ animationDelay: '0.5s' }" @click="handleSubmit">注册</view>
		
		<!-- 切换登录/注册状态 -->
		<view class="switch-mode animate-item" :style="{ animationDelay: '0.65s' }">
			<!-- 底部入口允许用户返回已有账号登录。 -->
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
	import { ensureApiWarmBeforeLogin } from '../../../utils/apiWarmup'
	import { setToken } from '../../../utils/token'
	import { setUser, scheduleLoginProfileSync } from '../../../utils/user'
	
	export default {
		components: {
			confirmAgreement,
			phoneCode,
			humanVerify
		},
		data() {
			return {
				// 注册页维护账号资料、密码校验状态、协议状态和人机验证状态。
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
				// 记录当前聚焦字段，驱动输入框高亮样式。
				this.currentFocus = field;
			},
			handleBlur() {
				this.currentFocus = '';
			},
			onEmailInput() {
				// 邮箱输入过程中实时执行选填格式校验。
				if (this.email) this.emailTouched = true;
				this.validateEmail();
			},
			handleEmailBlur() {
				// 邮箱失焦时标记为已触达并补一次校验。
				this.emailTouched = true;
				this.validateEmail();
				this.handleBlur();
			},
			validateEmail() {
				// 邮箱是选填项，只有输入后才检查是否合法。
				if (!this.email) {
					this.emailError = '';
					return true;
				}
				// 使用简单邮箱正则校验基础格式。
				const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
				this.emailError = ok ? '' : '请输入有效的邮箱地址';
				return ok;
			},
			onPasswordInput() {
				// 密码变化后实时刷新密码强度和确认密码一致性结果。
				if (this.password) this.passwordTouched = true
				this.validatePassword()
				if (this.confirmPasswordTouched) {
					this.validateConfirmPassword()
				}
			},
			onConfirmPasswordInput() {
				// 确认密码变化时实时校验两次密码是否一致。
				if (this.confirmPassword) this.confirmPasswordTouched = true
				this.validateConfirmPassword()
			},
			handlePasswordBlur() {
				// 密码失焦后补做一次完整校验。
				this.passwordTouched = true
				this.validatePassword()
				this.handleBlur()
			},
			handleConfirmPasswordBlur() {
				// 确认密码失焦后补做一次一致性校验。
				this.confirmPasswordTouched = true
				this.validateConfirmPassword()
				this.handleBlur()
			},
			validatePassword() {
				// 密码要求至少 8 位且同时包含大小写字母。
				if (!this.password) {
					this.passwordError = ''
					return true
				}
				const ok = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(this.password)
				this.passwordError = ok ? '' : '密码至少8位，且同时包含大写和小写字母'
				return ok
			},
			validateConfirmPassword() {
				// 只有两项都填写后才比较密码是否一致。
				if (!this.confirmPassword || !this.password) {
					this.confirmPasswordError = ''
					return true
				}
				const ok = this.password === this.confirmPassword
				this.confirmPasswordError = ok ? '' : '两次密码不一致'
				return ok
			},
			togglePasswordVisible() {
				// 切换主密码输入框的明文/密文状态。
				this.showPassword = !this.showPassword
			},
			toggleConfirmPasswordVisible() {
				// 切换确认密码输入框的明文/密文状态。
				this.showConfirmPassword = !this.showConfirmPassword
			},
			toggleMode() {
				// 注册成功后或用户主动切换时返回登录模式。
				this.$emit('switchMode');
			},
			onAgreementChange(val) {
				// 同步协议勾选状态。
				this.isAgreed = val;
			},
			onHumanVerify(val) {
				// 记录人机验证是否已通过。
				this.isHuman = val;
			},
			handleSubmit() {
				// 提交前先校验必填项、人机验证、协议状态和密码规则。
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
					await ensureApiWarmBeforeLogin(5000)
					const result = await register({
						phone: (this.phone || '').trim(),
						email: (this.email || '').trim(),
						password: (this.password || '').trim(),
						confirmPassword: (this.confirmPassword || '').trim(),
						code: (this.code || '').trim()
					})

					const token = (result && result.token) || (result && result.data && result.data.token) || ''
					const user = (result && result.user) || (result && result.data && result.data.user) || null
					if (!token) {
						throw new Error('后端未返回 token')
					}

					let isComplete = true
					const resData = (result && result.data) ? result.data : result
					if (resData && typeof resData === 'object' && resData.isComplete !== undefined) {
						isComplete = resData.isComplete
					}

					setToken(token)
					setUser(user)
					scheduleLoginProfileSync({ timeout: 12000 })

					uni.hideLoading()
					uni.showToast({ title: '注册成功', icon: 'success' })
					setTimeout(() => {
						if (isComplete === false) {
							uni.redirectTo({ url: '/pages/initProfile/initProfile' })
						} else {
							uni.switchTab({ url: '/pages/index/index' })
						}
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
	.component-wrapper {
		.animate-item {
			opacity: 0;
			animation: fadeInUp 0.6s ease-out both;
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
	
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(40px);
			filter: blur(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}
</style>
