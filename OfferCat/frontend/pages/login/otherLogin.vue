<template>
	<view class="other-login-container">
		<!-- 顶部导航栏 / 返回按钮 -->
		<view class="nav-bar">
			<view class="back-btn" @click="goBack">
				<image class="back-icon" src="/static/close.png" mode="aspectFit"></image>
			</view>
		</view>
		
		<!-- 页面内容区 -->
		<view class="content-box">
			<view class="title">{{ title }}</view>
			
			<!-- 组件切换 -->
			<account-login v-if="mode === 'password'" @switchMode="switchToRegister" @switchSms="switchToSms"></account-login>
			<sms-login v-else-if="mode === 'sms'" @switchPassword="switchToPassword" @switchRegister="switchToRegister"></sms-login>
			<account-register v-else @switchMode="switchToPassword"></account-register>
		</view>
	</view>
</template>

<script>
	import accountLogin from './components/accountLogin.vue';
	import accountRegister from './components/accountRegister.vue';
	import smsLogin from './components/smsLogin.vue';
	
	export default {
		components: {
			accountLogin,
			accountRegister,
			smsLogin
		},
		data() {
			return {
				mode: 'password'
			}
		},
		computed: {
			title() {
				if (this.mode === 'sms') return '验证码登录'
				if (this.mode === 'register') return '注册新账号'
				return '账号登录'
			}
		},
		methods: {
			goBack() {
				uni.navigateBack();
			},
			switchToPassword() {
				this.mode = 'password'
			},
			switchToSms() {
				this.mode = 'sms'
			},
			switchToRegister() {
				this.mode = 'register'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.other-login-container {
		width: 100%;
		min-height: 100vh;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		
		.nav-bar {
			width: 100%;
			height: 88px; /* 包含状态栏的高度预留 */
			padding-top: 40px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			padding-left: 20px;
			
			.back-btn {
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				
				.back-icon {
					width: 20px;
					height: 20px;
				}
			}
		}
		
		.content-box {
			padding: 40px 30px;
			
			.title {
				font-size: 28px;
				font-weight: bold;
				color: #333;
				margin-bottom: 40px;
			}
		}
	}
</style>
