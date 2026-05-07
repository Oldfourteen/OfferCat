<template>
	<view class="legal-page" :class="themeClass">
		<view class="legal-topbar">
			<text class="back-btn" @click="goBack">‹</text>
			<text class="topbar-title">隐私政策</text>
			<text class="placeholder"></text>
		</view>

		<scroll-view class="legal-scroll" scroll-y :show-scrollbar="false">
			<view class="legal-content">
				<view class="hero-card">
					<text class="hero-badge">Privacy</text>
					<text class="hero-title">我们如何使用和保护你的信息</text>
					<text class="hero-desc">本页面用于说明演示版应用在账号资料、题库练习、打卡记录等场景下的数据处理方式。</text>
				</view>

				<view v-for="section in sections" :key="section.title" class="section-card">
					<text class="section-title">{{ section.title }}</text>
					<text v-for="item in section.items" :key="item" class="section-paragraph">{{ item }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { applyTheme, THEME_CHANGE_EVENT, THEME_DARK, THEME_LIGHT } from '@/utils/theme.js'

	export default {
		data() {
			return {
				currentTheme: THEME_LIGHT,
				themeListener: null,
				sections: [
					{
						title: '一、信息收集范围',
						items: [
							'当你使用资料编辑功能时，我们会保存你主动填写的昵称、头像、专业、求职方向、城市、薪资等资料信息。',
							'当你使用题库、收藏、成长档案、打卡等功能时，系统会记录对应的本地练习结果、收藏状态、档案统计和打卡状态。'
						]
					},
					{
						title: '二、信息使用方式',
						items: [
							'收集到的信息仅用于完成页面展示、资料联动、练习统计、成长档案汇总和功能体验优化。',
							'例如你在编辑页修改头像后，首页、我的页、设置页会同步展示；你完成题库练习后，历史记录和统计卡片会自动更新。'
						]
					},
					{
						title: '三、信息存储与保护',
						items: [
							'当前演示版本以内存与本地存储为主，不会主动向第三方公开你的个人资料和练习数据。',
							'我们会尽量采用最小必要原则处理信息，仅在实现相关功能时读取对应数据。'
						]
					},
					{
						title: '四、你的管理权利',
						items: [
							'你可以随时在资料编辑页修改个人信息，也可以通过继续使用功能覆盖本地练习和收藏记录。',
							'如果你退出当前账号，登录态会被清除，但本地已保存的演示数据可能仍保留在设备中，除非后续手动清理。'
						]
					}
				]
			}
		},
		computed: {
			themeClass() {
				return this.currentTheme === THEME_DARK ? 'theme-dark' : 'theme-light'
			}
		},
		created() {
			this.currentTheme = applyTheme()
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				this.themeListener = payload => {
					this.currentTheme = payload && payload.theme ? payload.theme : applyTheme()
				}
				uni.$on(THEME_CHANGE_EVENT, this.themeListener)
			}
		},
		beforeDestroy() {
			if (this.themeListener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(THEME_CHANGE_EVENT, this.themeListener)
			}
		},
		beforeUnmount() {
			if (this.themeListener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(THEME_CHANGE_EVENT, this.themeListener)
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({ delta: 1 })
			}
		}
	}
</script>

<style lang="scss">
	.legal-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.legal-topbar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 22rpx) 28rpx 18rpx;
	}

	.back-btn,
	.placeholder {
		width: 72rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-btn {
		font-size: 50rpx;
		font-weight: 300;
	}

	.placeholder {
		opacity: 0;
	}

	.topbar-title {
		flex: 1;
		text-align: center;
		font-size: 34rpx;
		font-weight: 800;
		letter-spacing: 1rpx;
	}

	.legal-scroll {
		flex: 1;
		min-height: 0;
	}

	.legal-content {
		padding: 22rpx 24rpx calc(56rpx + env(safe-area-inset-bottom));
	}

	.hero-card,
	.section-card {
		border-radius: 28rpx;
		padding: 28rpx 24rpx;
	}

	.hero-card {
		background: linear-gradient(135deg, rgba(98, 142, 255, 0.18) 0%, rgba(74, 209, 255, 0.12) 100%);
	}

	.hero-badge,
	.hero-title,
	.hero-desc,
	.section-title,
	.section-paragraph {
		display: block;
	}

	.hero-badge {
		font-size: 20rpx;
		font-weight: 800;
		letter-spacing: 2rpx;
		text-transform: uppercase;
	}

	.hero-title {
		margin-top: 16rpx;
		font-size: 38rpx;
		font-weight: 800;
		line-height: 1.35;
	}

	.hero-desc {
		margin-top: 14rpx;
		font-size: 24rpx;
		line-height: 1.7;
	}

	.section-card {
		margin-top: 20rpx;
	}

	.section-title {
		font-size: 28rpx;
		font-weight: 800;
		line-height: 1.4;
	}

	.section-paragraph {
		margin-top: 14rpx;
		font-size: 24rpx;
		line-height: 1.8;
	}

	.legal-page.theme-light {
		background: linear-gradient(180deg, #eef6ff 0%, #f7f9fe 18%, #f8fbff 100%);

		.legal-topbar {
			background: rgba(255, 255, 255, 0.88);
			border-bottom: 1rpx solid rgba(36, 52, 91, 0.05);
		}

		.back-btn,
		.topbar-title,
		.hero-title,
		.section-title {
			color: #23345a;
		}

		.hero-badge {
			color: #5078df;
		}

		.hero-desc,
		.section-paragraph {
			color: #6f85a5;
		}

		.section-card {
			background: #ffffff;
			box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.08);
		}
	}

	.legal-page.theme-dark {
		background: linear-gradient(180deg, #121214 0%, #151518 18%, #0f1012 100%);

		.legal-topbar {
			background: linear-gradient(180deg, rgba(18, 18, 20, 0.98) 0%, rgba(18, 18, 20, 0.9) 100%);
			border-bottom: 1rpx solid rgba(255, 255, 255, 0.04);
		}

		.back-btn,
		.topbar-title,
		.hero-title,
		.section-title {
			color: #f7f8fa;
		}

		.hero-badge {
			color: #89a9ff;
		}

		.hero-desc,
		.section-paragraph {
			color: rgba(255, 255, 255, 0.62);
		}

		.section-card {
			background: linear-gradient(180deg, #2a2b2f 0%, #25262a 100%);
			border: 1rpx solid rgba(255, 255, 255, 0.04);
			box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.28);
		}
	}
</style>
