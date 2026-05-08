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
			<!-- 标题随当前模式变化，明确用户正在使用的登录或注册流程。 -->
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
				// mode 控制账号登录、验证码登录和注册三种表单视图切换。
				mode: 'password'
			}
		},
		computed: {
			title() {
				// 根据当前模式生成页面主标题文案。
				if (this.mode === 'sms') return '验证码登录'
				if (this.mode === 'register') return '注册新账号'
				return '账号登录'
			}
		},
		methods: {
			goBack() {
				// 关闭其他登录页并返回上一层主登录页。
				uni.navigateBack();
			},
			switchToPassword() {
				// 切换回账号密码登录表单。
				this.mode = 'password'
			},
			switchToSms() {
				// 切换到短信验证码登录表单。
				this.mode = 'sms'
			},
			switchToRegister() {
				// 切换到账号注册表单。
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
