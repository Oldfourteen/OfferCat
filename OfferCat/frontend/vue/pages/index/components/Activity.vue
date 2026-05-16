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
			<!-- 光晕在最底层；箭头置顶，避免被裁切与白点盖住 -->
			<view class="graphic-glow"></view>
			<view class="graphic-sheet"></view>
			<view class="graphic-arrow">
				<image class="graphic-arrow-img" mode="aspectFit" :src="springTrendArrowSvg" />
			</view>
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
			springTrendArrowSvg() {
				// 底上两段与同向向量（严格平行）+中间右下一折；整体偏下并从右侧冲出；三角与躯干 fuse 拼接（base64）
				return (
					'data:image/svg+xml;base64,' +
					'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0yOSA1MiAyODIgMjIxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNwcmluZ0Fycm93R3JhZCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMTciIHkxPSIyNTUiIHgyPSIyMjciIHkyPSI2OCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZjdhMCIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjZmZlNDVkIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZjOTI4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI3NwcmluZ0Fycm93R3JhZCkiIHN0cm9rZS13aWR0aD0iMzAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjE4IiBkPSJNIDIuMDAgMjIyLjAwIEwgNDEuNjkgMTc0LjM3IEwgNjkuNjkgMTk4LjM3IEwgMTE5LjYzIDEzOC40NSIvPjxwb2x5Z29uIGZpbGw9InVybCgjc3ByaW5nQXJyb3dHcmFkKSIgcG9pbnRzPSIxNjUuMTcgODMuNzkgMTUxLjg5IDE2MC42NSA5MS45NyAxMTAuNzIiLz48L3N2Zz4='
				)
			},
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
		// 箭头外旋会后超出卡片裁剪盒，hidden 会直接「切没」整条黄色箭头
		overflow: visible;

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
		z-index: 1;
		width: 176rpx;
		min-width: 176rpx;
		
		.graphic-sheet {
			position: absolute;
			z-index: 2;
			right: 30rpx;
			bottom: 22rpx;
			width: 158rpx;
			height: 200rpx;
			border-radius: 12rpx;
			background:
				linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.03)),
				repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0 8rpx, rgba(255, 255, 255, 0.02) 8rpx 22rpx);
			border: 2rpx solid rgba(255, 255, 255, 0.16);
			transform: rotate(-14deg);
		}
		
		.graphic-arrow {
			position: absolute;
			z-index: 4;
			right: -75rpx;
			bottom: 2rpx;
			width: 300rpx;
			height: 294rpx;
			transform: rotate(-14deg);
			filter: drop-shadow(0 12rpx 22rpx rgba(255, 210, 48, 0.32));

			&::before {
				content: '';
				position: absolute;
				left: -6rpx;
				bottom: 16rpx;
				width: 52rpx;
				height: 6rpx;
				border-radius: 3rpx;
				background: rgba(255, 240, 106, 0.42);
				box-shadow: -22rpx 8rpx 0 rgba(255, 240, 106, 0.22), -12rpx -14rpx 0 rgba(255, 240, 106, 0.14);
			}

			.graphic-arrow-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		
		.graphic-glow {
			position: absolute;
			z-index: 0;
			right: 0;
			bottom: 16rpx;
			width: 176rpx;
			height: 176rpx;
			border-radius: 50%;
			pointer-events: none;
			// 避免白点叠在黄箭头上「像没了箭头」——只保留柔光
			background: radial-gradient(circle, rgba(255, 239, 111, 0.28) 0%, rgba(255, 239, 111, 0) 68%);
			opacity: 0.92;
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
