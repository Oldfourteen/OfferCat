<template>
	<!-- mianbox -->
	<view class="logoin-container">
		<!-- goBack -->
<!-- 		<goBack></goBack> -->
		<view class="content-wrapper">
			<!-- 顶部品牌区展示 logo，并承接主登录页的视觉入口。 -->
			<logoArea></logoArea>
			<!-- 手机号展示区回显当前设备或本地用户手机号。 -->
			<telephone></telephone>
			<!-- 协议区统一处理勾选状态与未勾选时的拦截弹窗。 -->
			<confirmAgreement ref="agreementRef" :agreed="isAgreed" @change="onAgreementChange" @agreed-login="doLogin"></confirmAgreement>
			<!-- 登录操作区提供一键登录和切换其他登录方式入口。 -->
			<loginArea @login="handleLogin" @otherLogin="handleOtherLogin"></loginArea>
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
				isAgreed: false
			}
		},
		methods:{
			goBack(){
				// 预留返回能力，当前模板中默认隐藏返回按钮。
				uni.navigateBack()
			},
			onAgreementChange(val) {
				// 协议组件变更时同步父页面勾选状态。
				this.isAgreed = val;
			},
			handleLogin() {
				// 一键登录前先校验协议，未勾选则弹出协议确认框。
				if (!this.isAgreed) {
					this.$refs.agreementRef.showModal();
				} else {
					this.doLogin();
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
		background-color: transparent; /* 为了动画更流畅 */
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
		}

		/* 不修改 logoArea.vue 的情况下，通过深度选择器调整 logo 的位置 */
		::v-deep .logo-area {
			display: flex;
			justify-content: center;
			.logo {
				left: 0; /* 抵消原有的 left: 11px 偏移 */
				height: 120px;
				width: 120px;
			}
		}
	}
</style>
