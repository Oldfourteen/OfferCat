<template>
	<view class="legal-page" :class="themeClass">
		<view class="legal-topbar">
			<text class="back-btn" @click="goBack">‹</text>
			<text class="topbar-title">用户服务协议</text>
			<text class="placeholder"></text>
		</view>

		<scroll-view class="legal-scroll" scroll-y :show-scrollbar="false">
			<view class="legal-content">
				<view class="hero-card">
					<text class="hero-badge">Terms</text>
					<text class="hero-title">平台使用规则与服务说明</text>
					<text class="hero-desc">本协议用于说明演示版应用的使用边界、功能性质以及用户在使用过程中的基本约定。</text>
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
						title: '一、服务性质',
						items: [
							'本应用当前主要用于求职学习与产品演示，提供资料编辑、题库练习、成长档案、AI 页面展示等功能。',
							'部分内容为演示数据或本地模拟逻辑，页面展示和统计结果以当前版本实际能力为准。'
						]
					},
					{
						title: '二、用户使用规则',
						items: [
							'你应当以合法、正当、合理的方式使用本应用，不得利用应用进行恶意攻击、数据破坏、批量刷取或其他影响正常运行的行为。',
							'你应妥善保管自己的登录状态和本地设备，因设备共享、误操作或个人保管不当导致的信息暴露风险需自行注意。'
						]
					},
					{
						title: '三、内容与功能说明',
						items: [
							'题库、练习记录、收藏、成长统计等功能主要用于学习复盘，不构成正式考试结果、求职保证或专业建议。',
							'AI 相关页面和内容用于交互演示与体验展示，输出内容仅供参考，具体使用时应结合真实场景自行判断。'
						]
					},
					{
						title: '四、协议更新与解释',
						items: [
							'随着版本迭代，页面能力、数据处理方式和说明文案可能发生调整，更新后的内容将以应用内最新展示为准。',
							'当你继续使用相关功能时，可视为你已知悉并接受与当前版本相匹配的规则说明。'
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
		background: linear-gradient(135deg, rgba(54, 186, 174, 0.18) 0%, rgba(113, 220, 175, 0.12) 100%);
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
		background: linear-gradient(180deg, #eefcf7 0%, #f7fbfb 18%, #f8fcfb 100%);

		.legal-topbar {
			background: rgba(255, 255, 255, 0.9);
			border-bottom: 1rpx solid rgba(36, 52, 91, 0.05);
		}

		.back-btn,
		.topbar-title,
		.hero-title,
		.section-title {
			color: #1f3d39;
		}

		.hero-badge {
			color: #2c9e90;
		}

		.hero-desc,
		.section-paragraph {
			color: #6f8f89;
		}

		.section-card {
			background: #ffffff;
			box-shadow: 0 18rpx 42rpx rgba(48, 146, 124, 0.08);
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
			color: #80decf;
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
