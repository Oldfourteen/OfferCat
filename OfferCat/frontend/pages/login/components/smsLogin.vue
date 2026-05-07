<template>
	<view class="component-wrapper">
		<view class="form-area">
			<phoneCode v-model:phone="phone" v-model:code="code" scene="login" />
		</view>
		
		<humanVerify @verify="onHumanVerify"></humanVerify>
		
		<view class="agreement-wrapper">
			<confirmAgreement ref="agreementRef" :agreed="isAgreed" @change="onAgreementChange" @agreed-login="doLogin"></confirmAgreement>
		</view>
		
		<view class="submit-btn" @click="handleSubmit">登录</view>
		
		<view class="switch-mode">
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
	import { setUser } from '../../../utils/user'
	
	export default {
		components: {
			confirmAgreement,
			phoneCode,
			humanVerify
		},
		data() {
			return {
				phone: '',
				code: '',
				isAgreed: false,
				isHuman: false
			}
		},
		methods: {
			onAgreementChange(val) {
				this.isAgreed = val;
			},
			onHumanVerify(val) {
				this.isHuman = val;
			},
			switchToPassword() {
				this.$emit('switchPassword')
			},
			switchToRegister() {
				this.$emit('switchRegister')
			},
			handleSubmit() {
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
