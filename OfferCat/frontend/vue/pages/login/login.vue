<template>
	<view class="login-page" :style="pageStyle">
		<view class="login-spacer"></view>
		<view class="login-main">
			<logoArea></logoArea>
			<telephone></telephone>
			<loginArea ref="loginAreaRef" @login="handleLogin" @otherLogin="handleOtherLogin"></loginArea>
			<confirmAgreement
				ref="agreementRef"
				modal-host="emit"
				:agreed="isAgreed"
				@change="onAgreementChange"
				@open-modal="openAgreementModal"
				@save-agreement="saveAgreementAccepted"
				@agreed-login="doLogin"
			></confirmAgreement>
		</view>
		<view class="login-spacer"></view>

		<view v-if="showAgreementModal" class="agreement-modal" @touchmove.stop.prevent>
			<view class="agreement-modal__mask" @click="closeAgreementModal"></view>
			<view class="agreement-modal__card">
				<view class="agreement-modal__title">服务协议与隐私政策</view>
				<view class="agreement-modal__text">
					为了保障您的合法权益，请您在登录前仔细阅读并同意
					<text class="agreement-modal__link" @click.stop="goToAgreement">《用户服务协议》</text>
					和
					<text class="agreement-modal__link" @click.stop="goToPrivacy">《隐私政策》</text>。
				</view>
				<view class="agreement-modal__btns">
					<view class="agreement-modal__btn agreement-modal__btn--cancel" @click="closeAgreementModal">不同意</view>
					<view class="agreement-modal__btn agreement-modal__btn--ok" @click="onModalAgree">同意</view>
				</view>
			</view>
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

	export default {
		data() {
			return {
				isAgreed: false,
				needShowAgreement: false,
				showAgreementModal: false,
				windowHeight: 0
			}
		},
		computed: {
			pageStyle() {
				if (!this.windowHeight) return {}
				return {
					height: `${this.windowHeight}px`,
					minHeight: `${this.windowHeight}px`
				}
			}
		},
		onLoad() {
			this.syncWindowSize()
			void warmApiConnection(true)
			this._warmTimer = setInterval(() => void warmApiConnection(true), 20000)
			this.checkAgreementExpire()
		},
		onShow() {
			this.syncWindowSize()
		},
		onResize() {
			this.syncWindowSize()
		},
		onUnload() {
			if (this._warmTimer) {
				clearInterval(this._warmTimer)
				this._warmTimer = null
			}
		},
		methods: {
			syncWindowSize() {
				try {
					const info = uni.getWindowInfo ? uni.getWindowInfo() : uni.getSystemInfoSync()
					this.windowHeight = info.windowHeight || info.screenHeight || 0
				} catch (e) {
					const info = uni.getSystemInfoSync()
					this.windowHeight = info.windowHeight || info.screenHeight || 0
				}
			},
			checkAgreementExpire() {
				const agreementInfo = uni.getStorageSync('agreement_accepted')
				if (agreementInfo) {
					try {
						const info = JSON.parse(agreementInfo)
						if (Date.now() < (info.expireTime || 0)) {
							this.isAgreed = true
							this.needShowAgreement = false
							return
						}
					} catch (e) {}
				}
				this.needShowAgreement = true
			},
			saveAgreementAccepted() {
				uni.setStorageSync('agreement_accepted', JSON.stringify({
					acceptedTime: Date.now(),
					expireTime: Date.now() + 72 * 60 * 60 * 1000
				}))
			},
			onAgreementChange(val) {
				this.isAgreed = val
			},
			openAgreementModal() {
				this.showAgreementModal = true
			},
			closeAgreementModal() {
				this.showAgreementModal = false
			},
			onModalAgree() {
				this.showAgreementModal = false
				this.isAgreed = true
				this.saveAgreementAccepted()
				this.doLogin()
			},
			handleLogin() {
				if (this.isAgreed) {
					this.doLogin()
				} else {
					this.openAgreementModal()
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
				})
			},
			goToAgreement() {
				uni.navigateTo({ url: '/subPages/settings/agreement' })
			},
			goToPrivacy() {
				uni.navigateTo({ url: '/subPages/settings/privacy' })
			}
		},
		components: {
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

	.login-page {
		width: 100%;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		background: linear-gradient(165deg, #eef2fb 0%, #f8f9fd 38%, #ffffff 68%);
	}

	.login-spacer {
		flex: 1;
		min-height: 0;
		width: 100%;
	}

	.login-main {
		width: 100%;
		padding: 0 60rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 0 0 auto;
	}

	.login-page ::v-deep .logo-area,
	.login-page ::v-deep .logo-area .logo {
		animation: none !important;
		transform: none !important;
	}

	.login-page ::v-deep .logo-area {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 36rpx;
	}

	.login-page ::v-deep .logo-area .logo {
		height: 240rpx;
		width: 240rpx;
	}

	.login-page ::v-deep .telephone-area {
		width: 100%;
		margin-top: 0;
		display: flex;
		justify-content: center;
	}

	.login-page ::v-deep .login-button-area {
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-page ::v-deep .login-button-area .btn {
		width: 86%;
		max-width: 680rpx;
	}

	.login-page ::v-deep .agreement-area {
		width: 100%;
		margin-top: 32rpx;
		display: flex;
		justify-content: center;
	}

	.login-page ::v-deep .agreement-area .radio-label {
		justify-content: center;
	}

	.agreement-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.agreement-modal__mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.agreement-modal__card {
		position: relative;
		z-index: 1;
		width: 78%;
		max-width: 640rpx;
		background-color: #fff;
		border-radius: 32rpx;
		overflow: hidden;
		box-shadow: 0 20px 50px rgba(30, 35, 55, 0.2);
	}

	.agreement-modal__title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		text-align: center;
		margin-top: 50rpx;
		margin-bottom: 30rpx;
	}

	.agreement-modal__text {
		padding: 0 40rpx;
		font-size: 28rpx;
		color: #666;
		line-height: 1.6;
		text-align: center;
		margin-bottom: 50rpx;
	}

	.agreement-modal__link {
		color: #5d76bd;
	}

	.agreement-modal__btns {
		display: flex;
		height: 90rpx;
	}

	.agreement-modal__btn {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
	}

	.agreement-modal__btn--cancel {
		background-color: #f5f5f5;
		color: #666;
	}

	.agreement-modal__btn--ok {
		background-color: #5d76bd;
		color: #fff;
		font-weight: 600;
	}
</style>
