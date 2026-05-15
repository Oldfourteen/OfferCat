<template>
	<view class="banner-card shadow-strong spring-banner" :class="themeClass" @click="goToSpringCamp">
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

	.spring-banner {
		overflow: hidden;

		&::before,
		&::after {
			content: '';
			position: absolute;
			pointer-events: none;
		}

		&::before {
			top: -26rpx;
			right: -8rpx;
			width: 220rpx;
			height: 120rpx;
			background:
				radial-gradient(circle, rgba(255, 255, 255, 0.6) 0 6rpx, transparent 7rpx) 150rpx 18rpx / 24rpx 24rpx no-repeat,
				radial-gradient(circle, rgba(244, 213, 120, 0.7) 0 5rpx, transparent 6rpx) 92rpx 42rpx / 20rpx 20rpx no-repeat,
				linear-gradient(rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.22)) 74rpx 54rpx / 44rpx 2rpx no-repeat,
				linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)) 118rpx 34rpx / 2rpx 28rpx no-repeat,
				radial-gradient(circle at top right, rgba(255, 255, 255, 0.22) 0, rgba(255, 255, 255, 0.22) 1rpx, transparent 2rpx) 0 0 / 100% 100% no-repeat;
			opacity: 0.9;
		}

		&::after {
			left: -28rpx;
			bottom: -34rpx;
			width: 110rpx;
			height: 110rpx;
			border-radius: 32rpx;
			background:
				radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.16) 0, rgba(255, 255, 255, 0.08) 56%, rgba(255, 255, 255, 0) 57%),
				linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.16));
			clip-path: polygon(8% 72%, 34% 18%, 70% 68%);
			transform: rotate(-10deg);
		}
	}

	.banner-graphic {
		position: relative;
		width: 160rpx;
		min-width: 160rpx;
		
		.graphic-sheet {
			position: absolute;
			right: 30rpx;
			bottom: 22rpx;
			width: 158rpx;
			height: 200rpx;
			border-radius: 36rpx;
			background:
				linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.03)),
				repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0 8rpx, rgba(255, 255, 255, 0.02) 8rpx 22rpx);
			border: 2rpx solid rgba(255, 255, 255, 0.16);
			transform: rotate(-14deg);
		}
		
		.graphic-arrow {
			position: absolute;
			right: 15rpx;
			bottom: 60rpx;
			width: 164rpx;
			height: 42rpx;
			border-radius: 8rpx 0 0 8rpx;
			background: linear-gradient(90deg, #fff7a0 0%, #ffe45d 55%, #ffc928 100%);
			transform: rotate(-28deg);
			box-shadow: 0 14rpx 30rpx rgba(255, 210, 48, 0.3);

			&::before,
			&::after {
				content: '';
				position: absolute;
			}

			&::before {
				left: -40rpx;
				top: 50%;
				width: 56rpx;
				height: 6rpx;
				border-radius: 2rpx;
				background: rgba(255, 240, 106, 0.42);
				box-shadow: -20rpx -12rpx 0 rgba(255, 240, 106, 0.18), -34rpx 12rpx 0 rgba(255, 240, 106, 0.12);
				transform: translateY(-50%);
			}

			&::after {
				right: -32rpx;
				top: 50%;
				width: 0;
				height: 0;
				border-top: 34rpx solid transparent;
				border-bottom: 34rpx solid transparent;
				border-left: 42rpx solid #ffc928;
				transform: translateY(-50%);
			}
		}
		
		.graphic-glow {
			position: absolute;
			right: 0;
			bottom: 20rpx;
			width: 176rpx;
			height: 176rpx;
			border-radius: 50%;
			background:
				radial-gradient(circle, rgba(255, 239, 111, 0.28) 0%, rgba(255, 239, 111, 0) 72%),
				linear-gradient(rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.22)) 18rpx 112rpx / 42rpx 2rpx no-repeat,
				linear-gradient(rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.18)) 38rpx 92rpx / 2rpx 24rpx no-repeat,
				linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)) 32rpx 128rpx / 28rpx 2rpx no-repeat,
				radial-gradient(circle, rgba(255, 255, 255, 0.9) 0 4rpx, transparent 5rpx) 16rpx 106rpx / 20rpx 20rpx no-repeat,
				radial-gradient(circle, rgba(255, 255, 255, 0.68) 0 4rpx, transparent 5rpx) 138rpx 18rpx / 20rpx 20rpx no-repeat;
			opacity: 0.9;
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
