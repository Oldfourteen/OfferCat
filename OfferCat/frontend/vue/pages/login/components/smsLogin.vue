<template>
	<view class="component-wrapper">
		<view class="form-area animate-item" :style="{ animationDelay: '0s' }">
			<!-- 短信登录表单复用手机号+验证码输入组件。 -->
			<phoneCode v-model:phone="phone" v-model:code="code" scene="login" />
		</view>
		
		<!-- 登录前需要先通过人机验证。 -->
		<humanVerify class="animate-item" :style="{ animationDelay: '0.15s' }" @verify="onHumanVerify"></humanVerify>
		
		<view class="agreement-wrapper animate-item" :style="{ animationDelay: '0.3s' }">
			<!-- 协议勾选与弹窗确认逻辑复用公共协议组件。 -->
			<confirmAgreement ref="agreementRef" :agreed="isAgreed" @change="onAgreementChange" @agreed-login="doLogin"></confirmAgreement>
		</view>
		
		<view class="submit-btn animate-item" :style="{ animationDelay: '0.45s' }" @click="handleSubmit">登录</view>
		
		<view class="switch-mode animate-item" :style="{ animationDelay: '0.6s' }">
			<!-- 底部切换入口支持返回密码登录或进入注册。 -->
			<view class="side left">
				<text class="link" @click="switchToPassword">密码登录</text>
			</view>
			<text class="divider">|</text>
			<view class="side right">
				<text class="link" @click="switchToRegister">去注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	import confirmAgreement from './confirmAgreement.vue';
	import phoneCode from './phoneCode.vue';
	import humanVerify from './humanVerify.vue';
	import { login } from '../../../api/auth'
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
				// 短信登录页维护输入值、协议状态和人机验证状态。
				phone: '',
				code: '',
				isAgreed: false,
				isHuman: false
			}
		},
		methods: {
			onAgreementChange(val) {
				// 同步协议勾选状态。
				this.isAgreed = val;
			},
			onHumanVerify(val) {
				// 接收人机验证结果，控制是否允许提交。
				this.isHuman = val;
			},
			switchToPassword() {
				// 切换回账号密码登录模式。
				this.$emit('switchPassword')
			},
			switchToRegister() {
				// 切换到注册模式。
				this.$emit('switchRegister')
			},
			handleSubmit() {
				// 先校验必填项、人机验证和协议状态，再真正发起登录。
				if(!this.phone || !this.code) {
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
				// 验证码登录成功后写入 token 和用户信息，并按资料完整度跳转。
				uni.showLoading({ title: '登录中', mask: true })
				try {
					const result = await login({
						loginType: 'code',
						phone: this.phone,
						code: this.code
					})
					
					const token = (result && result.token) || (result && result.data && result.data.token) || ''
					const user = (result && result.user) || (result && result.data && result.data.user) || null
					
					let isComplete = true;
					const resData = (result && result.data) ? result.data : result;
					if (resData && typeof resData === 'object') {
						if (resData.isComplete !== undefined) {
							isComplete = resData.isComplete;
						} else if (resData.complete !== undefined) {
							isComplete = resData.complete;
						}
					}
					
					if (!token) {
						throw new Error('后端未返回 token')
					}
					
					setToken(token)
					setUser(user)
					scheduleLoginProfileSync({ timeout: 12000 })
					
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
