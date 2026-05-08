<template>
	<view class="component-wrapper">
		<!-- 表单区 -->
		<view class="form-area">
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
			<view class="input-item" :class="{'input-active': currentFocus === 'password'}">
				<input 
					type="text" 
					:password="!showPassword"
					placeholder="请输入密码" 
					v-model="password" 
					@focus="handleFocus('password')" 
					@blur="handleBlur" 
				/>
				<view class="toggle-btn" @click="togglePasswordVisible">{{ showPassword ? '隐藏' : '显示' }}</view>
			</view>
		</view>
		
		<!-- 登录前要求通过人机验证。 -->
		<humanVerify @verify="onHumanVerify"></humanVerify>
		
		<view class="agreement-wrapper">
			<!-- 协议组件统一处理勾选和未勾选时的二次确认。 -->
			<confirmAgreement ref="agreementRef" :agreed="isAgreed" @change="onAgreementChange" @agreed-login="doLogin"></confirmAgreement>
		</view>
		
		<!-- 操作按钮 -->
		<view class="submit-btn" @click="handleSubmit">登录</view>
		
		<!-- 切换登录/注册状态 -->
		<view class="switch-mode">
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
						target: this.account,
						password: this.password
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
</style>
