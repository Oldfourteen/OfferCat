<template>
	<view class="component-wrapper">
		<!-- 表单区 -->
		<view class="form-area animate-item" :style="{ animationDelay: '0s' }">
			<!-- 账号输入框兼容手机号或邮箱两种登录目标。 -->
			<view class="input-item" :class="{'input-active': currentFocus === 'account'}">
				<input 
					type="text" 
					placeholder="请输入手机号/邮箱" 
					v-model="account" 
					@focus="handleFocus('account')" 
					@blur="handleBlur" 
				/>
			</view>
			<!-- 密码输入框支持明文/密文切换。 -->
			<view class="input-item password-row" :class="{'input-active': currentFocus === 'password'}">
				<input 
					type="text" 
					:password="!showPassword"
					placeholder="请输入密码" 
					v-model="password" 
					@focus="handleFocus('password')" 
					@blur="handleBlur" 
				/>
				<view class="toggle-btn" @click="togglePasswordVisible">
				<svg v-if="showPassword" class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
					<path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
				</svg>
				<svg v-else class="eye-icon" viewBox="0 0 1024 1024" fill="currentColor">
					<path d="M928 268.8c-137.6 169.6-272 252.8-409.6 252.8-134.4-3.2-278.4-86.4-422.4-256-19.2-19.2-51.2-22.4-70.4-3.2S0 310.4 19.2 329.6c163.2 188.8 329.6 288 499.2 288 169.6 0 332.8-99.2 486.4-288 16-22.4 12.8-54.4-9.6-70.4-19.2-16-51.2-12.8-67.2 9.6z"/>
					<path d="M163.2 470.4l-96 108.8c-12.8 16-12.8 38.4 3.2 51.2s38.4 12.8 51.2-3.2l96-108.8c12.8-16 12.8-38.4-3.2-51.2s-38.4-12.8-51.2 3.2z m192 128l-38.4 150.4c-3.2 19.2 6.4 38.4 25.6 41.6s38.4-6.4 41.6-25.6l38.4-150.4c3.2-19.2-6.4-38.4-25.6-41.6s-38.4 6.4-41.6 25.6z m275.2 6.4l54.4 150.4c6.4 19.2 28.8 28.8 44.8 22.4 19.2-6.4 28.8-25.6 22.4-44.8l-54.4-150.4c-6.4-19.2-28.8-28.8-44.8-22.4-19.2 6.4-28.8 25.6-22.4 44.8z m192-131.2l108.8 108.8c12.8 12.8 35.2 12.8 51.2 0s12.8-35.2 0-51.2l-108.8-108.8c-12.8-12.8-35.2-12.8-51.2 0s-12.8 38.4 0 51.2z"/>
				</svg>
			</view>
			</view>
			<view class="forgot-password" @click="goFindPassword">忘记密码？</view>
		</view>
		
		<!-- 登录前要求通过人机验证。 -->
		<humanVerify class="animate-item" :style="{ animationDelay: '0.15s' }" @verify="onHumanVerify"></humanVerify>
		
		<view class="agreement-wrapper animate-item" :style="{ animationDelay: '0.3s' }">
			<!-- 协议组件统一处理勾选和未勾选时的二次确认。 -->
			<confirmAgreement ref="agreementRef" :agreed="isAgreed" @change="onAgreementChange" @agreed-login="doLogin"></confirmAgreement>
		</view>
		
		<!-- 操作按钮 -->
		<view class="submit-btn animate-item" :style="{ animationDelay: '0.45s' }" @click="handleSubmit">登录</view>
		
		<!-- 切换登录/注册状态 -->
		<view class="switch-mode animate-item" :style="{ animationDelay: '0.6s' }">
			<!-- 底部切换入口支持验证码登录与立即注册。 -->
			<view class="side left">
				<text class="link" @click="switchSms">验证码登录</text>
			</view>
			<text class="divider">|</text>
			<view class="side right">
				<text class="link" @click="toggleMode">立即注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	import confirmAgreement from './confirmAgreement.vue';
	import humanVerify from './humanVerify.vue';
	import { login } from '../../../api/auth'
	import { setToken } from '../../../utils/token'
	import { setUser } from '../../../utils/user'
	
	export default {
		components: {
			confirmAgreement,
			humanVerify
		},
		data() {
			return {
				// 账号登录页维护账号、密码、协议状态和验证状态。
				account: '',
				password: '',
				currentFocus: '',
				isAgreed: false,
				showPassword: false,
				isHuman: false
			}
		},
		methods: {
			togglePasswordVisible() {
				// 在明文和密文显示之间切换密码输入框状态。
				this.showPassword = !this.showPassword;
			},
			handleFocus(field) {
				// 记录当前聚焦字段，驱动输入框高亮样式。
				this.currentFocus = field;
			},
			handleBlur() {
				this.currentFocus = '';
			},
			toggleMode() {
				// 切换到注册模式。
				this.$emit('switchMode');
			},
			switchSms() {
				// 切换到验证码登录模式。
				this.$emit('switchSms')
			},
			goFindPassword() {
				uni.navigateTo({
					url: '/pages/login/findPassword',
					animationType: 'slide-in-right',
					animationDuration: 300
				});
			},
			onAgreementChange(val) {
				// 同步协议勾选状态。
				this.isAgreed = val;
			},
			onHumanVerify(val) {
				// 记录是否已通过人机验证。
				this.isHuman = val;
			},
			handleSubmit() {
				// 登录前先校验输入完整性、人机验证和协议状态。
				if(!this.account || !this.password) {
					uni.showToast({ title: '请填写完整信息', icon: 'none' });
					return;
				}
				if (!this.isHuman) {
					uni.showToast({ title: '请先完成人机验证', icon: 'none' });
					return;
				}
				if (!this.isAgreed) {
					this.$refs.agreementRef.showModal();
					return;
				}
				this.doLogin();
			},
			async doLogin() {
				// 密码登录成功后写入 token 和用户信息，并按资料完整度分流跳转。
				uni.showLoading({ title: '登录中', mask: true })
				try {
					const result = await login({
						loginType: 'password',
						target: (this.account || '').trim(),
						password: (this.password || '').trim()
					})

					const token = (result && result.token) || (result && result.data && result.data.token) || ''
					const user = (result && result.user) || (result && result.data && result.data.user) || null

					if (!token) {
						throw new Error('后端未返回 token')
					}

					let isComplete = true;
					const resData = (result && result.data) ? result.data : result;
					if (resData && typeof resData === 'object') {
						if (resData.isComplete !== undefined) {
							isComplete = resData.isComplete;
						} else if (resData.complete !== undefined) {
							isComplete = resData.complete;
						}
					}

					setToken(token)
					setUser(user)

					uni.hideLoading()
					uni.showToast({ title: '登录成功', icon: 'success' })
					setTimeout(() => {
						if (isComplete === false) {
							uni.redirectTo({ url: '/pages/initProfile/initProfile' })
						} else {
							uni.switchTab({ url: '/pages/index/index' })
						}
					}, 600)
				} catch (e) {
					uni.hideLoading()
					uni.showToast({ title: (e && e.message) ? e.message : '登录失败', icon: 'none' })
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
	}
	
	.forgot-password {
		display: flex;
		justify-content: flex-end;
		font-size: 12px;
		color: #999;
		margin-bottom: 20px;
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
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;

		.side {
			flex: 1;
			display: flex;
			align-items: center;
		}

		.left {
			justify-content: flex-end;
			padding-right: 12px;
		}

		.right {
			justify-content: flex-start;
			padding-left: 12px;
		}
		
		.divider {
			color: #ccc;
			flex-shrink: 0;
			text-align: center;
		}
		
		.link {
			color: #5d76bd;
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
