<template>
	<!-- mianbox -->
	<view class="logoin-container">
		<!-- goBack -->
<!-- 		<goBack></goBack> -->
		<view class="content-wrapper">
			<!-- logo area -->
			<logoArea></logoArea>
			<telephone></telephone>
			<confirmAgreement ref="agreementRef" :agreed="isAgreed" @change="onAgreementChange" @agreed-login="doLogin"></confirmAgreement>
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
				isAgreed: false
			}
		},
		methods:{
			goBack(){
				uni.navigateBack()
			},
			onAgreementChange(val) {
				this.isAgreed = val;
			},
			handleLogin() {
				if (!this.isAgreed) {
					this.$refs.agreementRef.showModal();
				} else {
					this.doLogin();
				}
			},
			async doLogin() {
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
				// 跳转到其他登录/注册页面
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
