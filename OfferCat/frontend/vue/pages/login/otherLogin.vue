<template>
	<view class="other-login-container">
		<!-- 顶部导航栏 / 返回按钮 -->
		<view class="nav-bar animate-item" :style="{ animationDelay: '0.1s' }">
			<view class="back-btn" @click="goBack">
				<image class="back-icon" src="/static/close.png" mode="aspectFit"></image>
			</view>
		</view>
		
		<!-- 页面内容区 -->
		<view class="content-box">
			<!-- 标题随当前模式变化，明确用户正在使用的登录或注册流程。 -->
			<view class="title animate-item" :style="{ animationDelay: '0.25s' }">{{ title }}</view>
			
			<!-- 组件切换 -->
			<view class="form-wrapper animate-item" :style="{ animationDelay: '0.4s' }">
				<account-login v-if="mode === 'password'" @switchMode="switchToRegister" @switchSms="switchToSms"></account-login>
				<sms-login v-else-if="mode === 'sms'" @switchPassword="switchToPassword" @switchRegister="switchToRegister"></sms-login>
				<account-register v-else @switchMode="switchToPassword"></account-register>
			</view>
		</view>
	</view>
</template>

<script>
	import accountLogin from './components/accountLogin.vue';
	import accountRegister from './components/accountRegister.vue';
	import smsLogin from './components/smsLogin.vue';
	import { warmApiConnection } from '@/utils/apiWarmup.js';
	
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
		onLoad() {
			void warmApiConnection(true)
			this._warmTimer = setInterval(() => {
				void warmApiConnection(true)
			}, 20000)
		},
		onUnload() {
			if (this._warmTimer) {
				clearInterval(this._warmTimer)
				this._warmTimer = null
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
		
		.animate-item {
			opacity: 0;
			animation: fadeInUp 0.6s ease-out both;
		}
		
		.nav-bar {
			width: 100%;
			height: 88px;
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
				justify-content: center;
				
				.back-icon {
					width: 22px;
					height: 22px;
					transition: transform 0.2s ease;
				}
				
				&:active .back-icon {
					transform: scale(0.9);
				}
			}
		}
		
		.content-box {
			padding: 40px 30px;
			
			.title {
				font-size: 30px;
				font-weight: 700;
				color: #24345b;
				margin-bottom: 40px;
				letter-spacing: 1px;
			}
			
			.form-wrapper {
				width: 100%;
			}
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
