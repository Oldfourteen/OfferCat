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
			<!-- 协议区统一处理勾选状态与未勾选时的拦截弹窗。 -->
			<confirmAgreement class="animate-item" :style="{ animationDelay: '0.4s' }" ref="agreementRef" :agreed="isAgreed" @change="onAgreementChange" @save-agreement="saveAgreementAccepted" @agreed-login="doLogin"></confirmAgreement>
			<!-- 登录操作区提供一键登录和切换其他登录方式入口。 -->
			<loginArea class="animate-item" :style="{ animationDelay: '0.55s' }" @login="handleLogin" @otherLogin="handleOtherLogin"></loginArea>
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
				// 当前一键登录能力暂时关闭，统一展示不可用提示避免误操作。
				uni.showLoading({ title: '登录中', mask: true })
				try {
					// 暂时禁用
					// const { oneClickLogin } = require('../../utils/auth.js')
					// const { isComplete } = await oneClickLogin()
					
					uni.hideLoading()
					// uni.showToast({ title: '登录成功', icon: 'success' })
					// setTimeout(() => {
					// 	if (isComplete === false) {
					// 		uni.redirectTo({ url: '/pages/initProfile/initProfile' })
					// 	} else {
					// 		uni.switchTab({ url: '/pages/index/index' })
					// 	}
					// }, 600)
					uni.showToast({ title: '该功能因授权问题暂时无法使用，非常抱歉给你带来不便QAQ', icon: 'none' })

				} catch (e) {
					uni.hideLoading()
					uni.showToast({ title: '该功能因授权问题暂时无法使用，非常抱歉给你带来不便QAQ', icon: 'none' })
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
		background-color: #fff;
	}
	.logoin-container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		padding-top: 12vh;
		box-sizing: border-box;
		background-color: #fff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		box-shadow: 0 -5px 15px rgba(0,0,0,0.1);
		
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
