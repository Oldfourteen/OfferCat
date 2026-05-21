<template>
	<view class="login-shell">
		<view class="login-panel">
			<logoArea></logoArea>
			<telephone></telephone>
			<loginArea ref="loginAreaRef" @login="handleLogin" @otherLogin="handleOtherLogin"></loginArea>
			<confirmAgreement
				ref="agreementRef"
				:agreed="isAgreed"
				@change="onAgreementChange"
				@save-agreement="saveAgreementAccepted"
				@agreed-login="doLogin"
			></confirmAgreement>
		</view>
	</view>
</template>

<script>
	import telephone from './components/telephone.vue';
	import goBack from './components/goBack.vue';
	import confirmAgreement from './components/confirmAgreement.vue';
	import loginArea from './components/loginArea.vue';
	import logoArea from '../../pages/loginAndRegister/components/logoArea.vue';
	import { warmApiConnection, ensureApiWarmBeforeLogin } from '@/utils/apiWarmup.js';
	export default{
		data() {
			return {
				isAgreed: false,
				needShowAgreement: false
			}
		},
		onLoad() {
			void warmApiConnection(true)
			this._warmTimer = setInterval(() => {
				void warmApiConnection(true)
			}, 20000)
			this.checkAgreementExpire();
		},
		onUnload() {
			if (this._warmTimer) {
				clearInterval(this._warmTimer)
				this._warmTimer = null
			}
		},
		methods:{
			checkAgreementExpire() {
				const agreementInfo = uni.getStorageSync('agreement_accepted');
				if (agreementInfo) {
					try {
						const info = JSON.parse(agreementInfo);
						const expireTime = info.expireTime || 0;
						const now = Date.now();
						if (now < expireTime) {
							this.isAgreed = true;
							this.needShowAgreement = false;
							return;
						}
					} catch (e) {
						// 解析失败，需要重新确认
					}
				}
				this.needShowAgreement = true;
			},
			saveAgreementAccepted() {
				const expireTime = Date.now() + 72 * 60 * 60 * 1000;
				const info = {
					acceptedTime: Date.now(),
					expireTime: expireTime
				};
				uni.setStorageSync('agreement_accepted', JSON.stringify(info));
			},
			goBack(){
				uni.navigateBack()
			},
			onAgreementChange(val) {
				this.isAgreed = val;
			},
			handleLogin() {
				if (this.isAgreed) {
					this.doLogin();
				} else if (this.needShowAgreement) {
					this.$refs.agreementRef.showModal();
				} else {
					this.$refs.agreementRef.showModal();
				}
			},
			async doLogin() {
				uni.showLoading({ title: '正在连接服务器…', mask: true })
				try {
					await ensureApiWarmBeforeLogin(22000)
					uni.showLoading({ title: '登录中', mask: true })
					const area = this.$refs.loginAreaRef
					if (!area || typeof area.runOneClickLogin !== 'function') {
						throw new Error('一键登录初始化失败')
					}
					const { isComplete } = await area.runOneClickLogin()
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
			},
			handleOtherLogin() {
				uni.navigateTo({
					url: '/pages/login/otherLogin',
					animationType: 'slide-in-right',
					animationDuration: 300
				});
			}
		},
		components:{
			logoArea,
			goBack,
			telephone,
			loginArea,
			confirmAgreement
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: #f8f9fd;
	}

	uni-page-body,
	uni-page-wrapper {
		width: 100% !important;
		height: 100% !important;
		margin: 0 !important;
		padding: 0 !important;
		left: 0 !important;
		right: 0 !important;
		transform: none !important;
		box-sizing: border-box;
		background-color: #f8f9fd;
	}

	.login-shell {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		padding-top: constant(safe-area-inset-top);
		padding-top: env(safe-area-inset-top);
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(165deg, #eef2fb 0%, #f8f9fd 38%, #ffffff 68%);
	}

	.login-panel {
		position: relative;
		width: 100%;
		margin: 0;
		padding: 0 60rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}

	.login-shell ::v-deep .logo-area {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 36rpx;
	}

	.login-shell ::v-deep .logo-area .logo {
		height: 240rpx;
		width: 240rpx;
	}

	.login-shell ::v-deep .telephone-area {
		width: 100%;
		margin-top: 0;
		display: flex;
		justify-content: center;
	}

	.login-shell ::v-deep .login-button-area {
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-shell ::v-deep .login-button-area .btn {
		width: 86%;
		max-width: 680rpx;
	}

	.login-shell ::v-deep .agreement-area {
		width: 100%;
		margin-top: 32rpx;
		flex-shrink: 0;
		background: transparent;
		display: flex;
		justify-content: center;
	}

	.login-shell ::v-deep .agreement-area .radio-label {
		max-width: 100%;
		justify-content: center;
	}
</style>
