<template>
	<!-- 欢迎区：空会话时使用通用话术；具体求职能力由底部快捷入口进入专属模式后再启用 -->
	<view class="welcome" :class="themeClass">
		<text class="welcome-title">同学，很高兴见到你</text>
		<text class="welcome-subtitle">聊聊什么都可以；需要润色简历、模拟面试等功能时，用下方快捷入口即可。</text>
	</view>
</template>

<script>
	export default {
		// 空会话时展示的欢迎区组件，没有额外交互逻辑
		name: 'AiWelcomeHero',
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		}
	}
</script>

<style lang="scss">
	.welcome {
		padding: 150rpx 18rpx 74rpx;

		.welcome-title,
		.welcome-subtitle {
			display: block;
		}

		.welcome-title {
			font-size: 68rpx;
			line-height: 1.14;
			font-weight: 800;
			letter-spacing: -1rpx;
			color: #15305e;
		}

		.welcome-subtitle {
			margin-top: 20rpx;
			font-size: 26rpx;
			line-height: 1.6;
			color: #6f7b93;
		}
	}

	.welcome.theme-dark {
		.welcome-title {
			color: #f4f7fb;
		}

		.welcome-subtitle {
			color: rgba(255, 255, 255, 0.58);
		}
	}
</style>
