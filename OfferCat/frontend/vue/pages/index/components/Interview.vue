<template>
	<view class="feature-card card shadow-soft" :class="themeClass" @click="goAI">
		<!-- 模拟面试卡片突出单一功能入口和卖点说明。 -->
		<view class="feature-cover">
			<image src="/static/png/inline/0afe8370a73e.png" class="feature-icon" />
		</view>
		<view class="feature-copy">
			<view class="feature-title-row">
				<text class="feature-title">AI 模拟面试</text>
				<text class="feature-tag">Hot</text>
			</view>
			<text class="feature-desc">真实大厂题库，AI 面试官全方位追问表达与拆解能力。</text>
		</view>
		<view class="feature-arrow">→</view>
	</view>
</template>

<script>
	export default {
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		computed: {
			themeClass() {
				// 面试入口卡片按主题切换浅色/深色外观。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		methods:{
			goAI(){
				// 点击后切换到底部 AI 页面开始模拟面试。
				uni.switchTab({
					url:"/pages/AI/AI"
				})
			}
		}
	}
</script>

<style lang="scss">
	.card {
		position: relative;
		background: #ffffff;
		border: 2rpx solid rgba(75, 189, 180, 0.1);
		border-radius: 32rpx;
		overflow: hidden;
	}

	.shadow-soft {
		box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.2);
	}

	
	.feature-card {
		display: flex;
		align-items: center;
		padding: 24rpx;
		margin-bottom: 24rpx;
	}
	
	.feature-cover {
		width: 96rpx;
		height: 96rpx;
		border-radius: 24rpx;
		background: linear-gradient(135deg, #fff2d9, #ffe3b7);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 54rpx;
		margin-right: 22rpx;
	}
	
	.feature-cover .feature-icon {
		width: 64rpx;
		height: 64rpx;
	}
	
	.feature-copy {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	
	.feature-title-row {
		display: flex;
		align-items: center;
	}
	
	.feature-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #15305e;
	}
	
	.feature-tag {
		margin-left: 12rpx;
		padding: 4rpx 14rpx;
		border-radius: 999rpx;
		background: #ffe6ea;
		font-size: 20rpx;
		font-weight: 700;
		color: #ff6f83;
	}
	
	.feature-desc {
		margin-top: 10rpx;
		font-size: 24rpx;
		line-height: 1.5;
		color: #7a877d;
	}
	
	.feature-arrow {
		width: 56rpx;
		height: 56rpx;
		border-radius: 50%;
		background: #f3f6f2;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #87948a;
	}

	.feature-card.theme-dark {
		background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
		border-color: rgba(255, 255, 255, 0.06);
	}

	.feature-card.theme-dark .feature-title {
		color: #f4f7fb;
	}

	.feature-card.theme-dark .feature-desc {
		color: rgba(255, 255, 255, 0.58);
	}

	.feature-card.theme-dark .feature-arrow {
		background: rgba(255, 255, 255, 0.08);
		color: #dbe4f3;
	}
</style>
