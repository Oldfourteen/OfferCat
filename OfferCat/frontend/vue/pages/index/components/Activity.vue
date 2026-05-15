<template>
	<view class="banner-card shadow-strong" :class="themeClass" @click="goToSpringCamp">
		<!-- 左侧文案区展示当前招季和活动主标题。 -->
		<view class="banner-copy">
			<text class="banner-title">{{ currentYear }} {{ seasonText }}</text>
			<text class="banner-title">AI 冲刺营</text>
			<text class="banner-desc">提升拿到 Offer 的概率高达 80%</text>
			<view class="banner-action">开始规划 →</view>
		</view>
		<view class="banner-graphic">
			<!-- 右侧装饰图形只承担视觉强调作用。 -->
			<view class="graphic-sheet"></view>
			<view class="graphic-arrow"></view>
			<view class="graphic-glow"></view>
		</view>
	</view>
	<view class="banner-card shadow-strong galaxy-banner" :class="themeClass" @click="goToGalaxy">
		<view class="banner-copy">
			<text class="banner-title">专业交叉星图</text>
			<text class="banner-title">Galaxy H5</text>
			<text class="banner-desc">选择主修与交叉意向，进入你的专属星域</text>
			<view class="banner-action galaxy-action">开启星图 →</view>
		</view>
		<view class="banner-graphic">
			<view class="graphic-orbit orbit-1"></view>
			<view class="graphic-orbit orbit-2"></view>
			<view class="graphic-planet"></view>
			<view class="graphic-star star-1"></view>
			<view class="graphic-star star-2"></view>
			<view class="graphic-star star-3"></view>
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
				// 横幅卡片根据主题切换整体视觉风格。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			currentYear() {
				// 使用统一日期工具生成当前年份文案。
				return getCurrentYear();
			},
			seasonText() {
				// 根据当前时间判断春招/秋招等招季描述。
				return getRecruitmentSeason();
			}
		},
		methods: {
			goToSpringCamp() {
				// 点击横幅后进入冲刺营活动页。
				uni.navigateTo({
					url: '/subPages/springCamp/springCamp'
				});
			},
			goToGalaxy() {
				if (this.__galaxyNavigating) {
					return
				}
				this.__galaxyNavigating = true
				// 首页新增星图入口，跳转并入后的 galaxy 页面。
				uni.navigateTo({
					url: '/subPages/galaxy/galaxy'
				});
				setTimeout(() => {
					this.__galaxyNavigating = false
				}, 800)
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
			border: 1rpx solid #e5e7eb;
			font-size: 26rpx;
			font-weight: 700;
			color: #25A1F4;
			box-shadow: 0 10rpx 26rpx rgba(25, 45, 110, 0.24), 0 4rpx 10rpx rgba(25, 45, 110, 0.14);
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

	.galaxy-banner {
		background: linear-gradient(135deg, #2a2d7f 0%, #5d32a8 55%, #3b83f7 100%);
	}

	.galaxy-action {
		color: #4c38b6;
	}

	.graphic-orbit {
		position: absolute;
		border-radius: 999rpx;
		border: 2rpx solid rgba(255, 255, 255, 0.35);
	}

	.orbit-1 {
		right: 10rpx;
		bottom: 22rpx;
		width: 170rpx;
		height: 95rpx;
		transform: rotate(-22deg);
	}

	.orbit-2 {
		right: 24rpx;
		bottom: 10rpx;
		width: 130rpx;
		height: 72rpx;
		transform: rotate(16deg);
	}

	.graphic-planet {
		position: absolute;
		right: 72rpx;
		bottom: 46rpx;
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		background: radial-gradient(circle at 30% 30%, #fff8ff 0%, #b9ccff 35%, #7a89ff 100%);
		box-shadow: 0 0 18rpx rgba(201, 214, 255, 0.75);
	}

	.graphic-star {
		position: absolute;
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.95);
	}

	.star-1 {
		right: 132rpx;
		bottom: 124rpx;
	}

	.star-2 {
		right: 26rpx;
		bottom: 152rpx;
	}

	.star-3 {
		right: 24rpx;
		bottom: 56rpx;
	}

	.banner-card.theme-dark {
		box-shadow: 0 18rpx 42rpx rgba(0, 0, 0, 0.24);
	}

	
</style>
