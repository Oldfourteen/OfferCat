<template>
	<!-- mianbox -->
	<view class="logoin-container">
		<!-- goBack -->
<!-- 		<goBack></goBack> -->
		<view class="content-wrapper">
			<!-- 顶部品牌区展示 logo，并承接主登录页的视觉入口。 -->
			<logoArea class="animate-item" :style="{ animationDelay: '0.1s' }"></logoArea>
			<!-- 手机号展示区回显当前设备或本地用户手机号。 -->
			<telephone class="animate-item" :style="{ animationDelay: '0.25s' }"></telephone>
			<!-- 登录操作区提供一键登录和切换其他登录方式入口。 -->
			<loginArea ref="loginAreaRef" class="animate-item" :style="{ animationDelay: '0.4s' }" @login="handleLogin" @otherLogin="handleOtherLogin"></loginArea>
			<!-- 协议区置于底部，统一处理勾选状态与未勾选时的拦截弹窗。 -->
			<confirmAgreement class="animate-item" :style="{ animationDelay: '0.55s' }" ref="agreementRef" :agreed="isAgreed" @change="onAgreementChange" @save-agreement="saveAgreementAccepted" @agreed-login="doLogin"></confirmAgreement>
		</view>
	</view>
</template>

<script>
	import telephone from './components/telephone.vue';
	import goBack from './components/goBack.vue';
	import confirmAgreement from './components/confirmAgreement.vue';
	import loginArea from './components/loginArea.vue';
	import logoArea from '../../pages/loginAndRegister/components/logoArea.vue';
	export default{
		data() {
			return {
				// 当前页只维护协议是否勾选，登录动作由按钮区和协议弹窗共同驱动。
				isAgreed: false,
				// 是否需要显示协议弹窗
				needShowAgreement: false
			}
		},
		onLoad() {
			// 页面加载时检查是否在72小时免验证期内
			this.checkAgreementExpire();
		},
		methods:{
			checkAgreementExpire() {
				// 检查本地存储中是否有协议同意记录及是否在72小时内
				const agreementInfo = uni.getStorageSync('agreement_accepted');
				if (agreementInfo) {
					try {
						const info = JSON.parse(agreementInfo);
						const expireTime = info.expireTime || 0;
						const now = Date.now();
						// 如果未过期（72小时内），自动设置为已同意
						if (now < expireTime) {
							this.isAgreed = true;
							this.needShowAgreement = false;
							return;
						}
					} catch (e) {
						// 解析失败，需要重新确认
					}
				}
				// 需要显示协议确认
				this.needShowAgreement = true;
			},
			saveAgreementAccepted() {
				// 保存协议同意记录，有效期72小时
				const expireTime = Date.now() + 72 * 60 * 60 * 1000; // 72小时后过期
				const info = {
					acceptedTime: Date.now(),
					expireTime: expireTime
				};
				uni.setStorageSync('agreement_accepted', JSON.stringify(info));
			},
			goBack(){
				// 预留返回能力，当前模板中默认隐藏返回按钮。
				uni.navigateBack()
			},
			onAgreementChange(val) {
				// 协议组件变更时同步父页面勾选状态。
				this.isAgreed = val;
			},
			handleLogin() {
				// 一键登录前检查：如果在72小时免验证期内，直接登录；否则需要确认协议
				if (this.isAgreed) {
					// 已同意或在免验证期内，直接登录
					this.doLogin();
				} else if (this.needShowAgreement) {
					// 需要显示协议确认弹窗
					this.$refs.agreementRef.showModal();
				} else {
					// 既不在免验证期内，也未显示过协议弹窗，先显示协议弹窗
					this.$refs.agreementRef.showModal();
				}
			},
			async doLogin() {
				uni.showLoading({ title: '登录中', mask: true })
				try {
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
				// 跳转到其他登录/注册页，在账号登录、验证码登录和注册间切换。
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
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		overscroll-behavior: none;
		touch-action: none;
		/* 与星图主色 #5d76bd 同色相的淡底，避免整页纯白扁平 */
		background: linear-gradient(165deg, #eef2fb 0%, #f8f9fd 38%, #ffffff 68%);
	}
	.logoin-container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		padding-top: 11vh;
		box-sizing: border-box;
		background: transparent;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
		box-shadow: 0 -8px 28px rgba(45, 58, 95, 0.06);
		
		.content-wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 30px;
			box-sizing: border-box;
		}

		.animate-item {
			opacity: 0;
			animation: fadeInUp 0.6s ease-out both;
			width: 100%;
		}

		/* logo 保持居中 */
		::v-deep .logo-area {
			display: flex;
			justify-content: center;
		}

		/* 一键登录页协议跟在「其他登录方式」后，收窄上边距避免中段留白过大 */
		.content-wrapper ::v-deep .agreement-area {
			margin-top: 16px;
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
