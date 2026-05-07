<template>
	<view class="banner-card shadow-strong" :class="themeClass" @click="goToSpringCamp">
		<view class="banner-copy">
			<text class="banner-title">{{ currentYear }} {{ seasonText }}</text>
			<text class="banner-title">AI 冲刺营</text>
			<text class="banner-desc">提升拿到 Offer 的概率高达 80%</text>
			<view class="banner-action">开始规划 →</view>
		</view>
		<view class="banner-graphic">
			<view class="graphic-sheet"></view>
			<view class="graphic-arrow"></view>
			<view class="graphic-glow"></view>
		</view>
	</view>
</template>

<script>
	import { getRecruitmentSeason, getCurrentYear } from '@/utils/date.js'

	export default {
		name: 'Activity',
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			currentYear() {
				return getCurrentYear();
			},
			seasonText() {
				return getRecruitmentSeason();
			}
		},
		methods: {
			goToSpringCamp() {
				uni.navigateTo({
					url: '/subPages/springCamp/springCamp'
				});
			}
		}
	}
</script>

<style lang="scss">
	.shadow-strong {
		box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.2);
	}

	.banner-card {
		position: relative;
		display: flex;
		justify-content: space-between;
		padding: 34rpx 36rpx;
		margin-top: 0;
		margin-bottom: 24rpx;
		border-radius: 40rpx;
		background: linear-gradient(135deg, #2299e8 0%, #5d76bd 60%);
		
		.banner-copy {
			position: relative;
			z-index: 2;
			display: flex;
			flex-direction: column;
		}
		
		.banner-title {
			font-size: 50rpx;
			line-height: 1.12;
			font-weight: 800;
			color: #ffffff;
		}
		
		.banner-desc {
			margin-top: 14rpx;
			font-size: 24rpx;
			color: rgba(255, 255, 255, 0.88);
		}
		
		.banner-action {
			margin-top: 28rpx;
			align-self: flex-start;
			padding: 18rpx 28rpx;
			border-radius: 999rpx;
			background: #ffffff;
			font-size: 26rpx;
			font-weight: 700;
			color: #25A1F4;
		}
		
	}

	
	.banner-graphic {
		position: relative;
		width: 160rpx;
		min-width: 160rpx;
		
		.graphic-sheet {
			position: absolute;
			right: 20rpx;
			bottom: 12rpx;
			width: 180rpx;
			height: 240rpx;
			border-radius: 14rpx;
			transform: rotate(-12deg);
			background: linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.12));
			border: 2rpx solid rgba(255, 255, 255, 0.24);
		}
		
		.graphic-arrow {
			position: absolute;
			right: 8rpx;
			bottom: 42rpx;
			width: 0;
			height: 0;
			border-top: 44rpx solid transparent;
			border-bottom: 44rpx solid transparent;
			border-left: 140rpx solid #ffff21;
			transform: rotate(-35deg) translateX(20rpx);
			filter: drop-shadow(0 0 14rpx rgba(255, 248, 44, 0.4));
		}
		
		.graphic-glow {
			position: absolute;
			right: -10rpx;
			bottom: -12rpx;
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			background: radial-gradient(circle, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 72%);
		}
	}

	.banner-card.theme-dark {
		box-shadow: 0 18rpx 42rpx rgba(0, 0, 0, 0.24);
	}

	
</style>
