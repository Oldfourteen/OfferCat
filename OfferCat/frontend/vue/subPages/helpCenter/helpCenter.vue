<template>
	<view class="help-center-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="goBack">
				<view class="back-btn">
					<image class="back-icon-img" :src="helpCenterBackIcon" mode="aspectFit" />
				</view>
			</view>
			<text class="nav-title">帮助中心</text>
			<view class="nav-right"></view>
		</view>

		<!-- 页面内容 -->
		<scroll-view class="page-content" scroll-y>
			<!-- 客服热线区域 -->
			<view class="hotline-card">
				<view class="hotline-content">
					<text class="hotline-label">官方客服热线</text>
					<text class="hotline-number">15092730328</text>
				</view>
			</view>

			<!-- 功能入口卡片 -->
			<view class="function-grid">
				<view class="function-item" @click="navigateToManager">
					<view class="function-icon manager-icon">
						<text class="icon-text">⚙️</text>
					</view>
					<text class="function-name">管理者入口</text>
					<text class="function-desc">管理论坛与用户</text>
				</view>
				<view class="function-item" @click="navigateToOnlineService">
					<view class="function-icon service-icon">
						<text class="icon-text">💬</text>
					</view>
					<text class="function-name">在线客服</text>
					<text class="function-desc">联系人工客服</text>
				</view>
			</view>

			<!-- 常见问题 -->
			<view class="faq-section">
				<view class="section-header">
					<text class="section-title">常见问题</text>
				</view>
				<view class="faq-list">
					<view class="faq-item" v-for="(item, index) in faqList" :key="index" @click="showFaqDetail(item)">
						<text class="faq-question">{{ item.question }}</text>
						<text class="faq-arrow">›</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { request } from '@/api/request.js'

	const DEFAULT_FAQ_LIST = [
		{ question: '如何创建简历？', answer: '在首页点击"创建简历"按钮，按照提示填写个人信息即可。' },
		{ question: '如何修改密码？', answer: '进入个人中心 -> 设置 -> 修改密码。' },
		{ question: '如何联系客服？', answer: '点击底部"在线客服"按钮，即可与人工客服沟通。' },
		{ question: '数据如何备份？', answer: '系统会自动备份您的数据到云端，无需手动操作。' },
		{ question: '如何注销账号？', answer: '进入设置 -> 账号安全 -> 注销账号。' }
	]

	const HELP_CENTER_BACK_ICON =
		'data:image/svg+xml;charset=utf-8,' +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
				'<path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/>' +
				'</svg>'
		)

	export default {
		mixins: [themeMixin],
		data() {
			return {
				faqList: [],
				helpCenterBackIcon: HELP_CENTER_BACK_ICON
			}
		},
		onLoad() {
			this.loadFaqList()
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			async loadFaqList() {
				try {
					const body = await request({ url: '/api/help/faq', method: 'GET' })
					if (body && Array.isArray(body.data) && body.data.length) {
						this.faqList = body.data
					} else {
						this.faqList = DEFAULT_FAQ_LIST.slice()
					}
				} catch (_) {
					this.faqList = DEFAULT_FAQ_LIST.slice()
				}
			},
			navigateToManager() {
				uni.navigateTo({
					url: '/subPages/helpCenter/managerPage'
				})
			},
			navigateToOnlineService() {
				uni.navigateTo({
					url: '/subPages/helpCenter/onlineService'
				})
			},
			showFaqDetail(item) {
				uni.showModal({
					title: item.question,
					content: item.answer,
					showCancel: false,
					confirmText: '知道了'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.help-center-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(
			168deg,
			#e8ecf8 0%,
			#ecf0fb 26%,
			#f3f6fc 54%,
			#f8f9fe 100%
		);
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 22rpx;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(244, 246, 252, 0.9) 100%
		);
		backdrop-filter: blur(14px);
		box-shadow: 0 8rpx 28rpx rgba(38, 51, 78, 0.06);

		.nav-left {
			flex-shrink: 0;

			.back-btn {
				box-sizing: border-box;
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				border: none;
				background: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow:
					0 8rpx 22rpx rgba(93, 118, 189, 0.18),
					0 2rpx 8rpx rgba(45, 58, 95, 0.06),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.85);
			}

			.back-icon-img {
				width: 38rpx;
				height: 38rpx;
				flex-shrink: 0;
			}
		}

		.nav-title {
			flex: 1;
			text-align: center;
			font-size: 32rpx;
			font-weight: 750;
			letter-spacing: 0.06em;
			color: #1e2638;
			text-shadow: 0 1rpx 0 rgba(255, 255, 255, 0.55);
		}

		.nav-right {
			width: 72rpx;
			height: 72rpx;
			flex-shrink: 0;
		}
	}

	.page-content {
		flex: 1;
		min-height: 0;
		box-sizing: border-box;
		padding-bottom: calc(28rpx + env(safe-area-inset-bottom));
	}

	.hotline-card {
		margin: 24rpx 24rpx 20rpx;
		border-radius: 24rpx;
		overflow: hidden;
		background: linear-gradient(142deg, #5d76bd 0%, #4660a3 42%, #6b87d6 100%);
		padding: 32rpx 28rpx;
		border: none;
		box-shadow:
			0 16rpx 44rpx rgba(93, 118, 189, 0.35),
			0 4rpx 16rpx rgba(45, 58, 95, 0.15),
			inset 0 2rpx 0 rgba(255, 255, 255, 0.22);
	}

	.hotline-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
		text-align: center;
	}

	.hotline-label {
		font-size: 26rpx;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.88);
		letter-spacing: 0.08em;
	}

	.hotline-number {
		font-size: 44rpx;
		font-weight: 750;
		color: #fff;
		letter-spacing: 0.06em;
		text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.12);
	}

	.function-grid {
		display: flex;
		gap: 18rpx;
		padding: 0 24rpx;
	}

	.function-item {
		flex: 1;
		min-width: 0;
		background: linear-gradient(
			165deg,
			#ffffff 0%,
			#f8faff 52%,
			#f4f6fc 100%
		);
		border-radius: 22rpx;
		padding: 28rpx 20rpx 32rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: none;
		box-shadow:
			0 12rpx 36rpx rgba(93, 118, 189, 0.1),
			0 4rpx 14rpx rgba(38, 51, 78, 0.05),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.95);
		transition: transform 0.18s ease, opacity 0.18s ease;

		&:active {
			transform: scale(0.98);
			opacity: 0.95;
		}
	}

	.function-icon {
		width: 88rpx;
		height: 88rpx;
		border-radius: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		position: relative;
		overflow: hidden;
		box-shadow:
			0 12rpx 28rpx rgba(45, 58, 95, 0.22),
			0 3rpx 10rpx rgba(93, 118, 189, 0.12),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.42),
			inset 0 -2rpx 6rpx rgba(20, 30, 55, 0.12);

		.icon-text {
			font-size: 36rpx;
			line-height: 1;
			position: relative;
			z-index: 1;
			filter: drop-shadow(0 1rpx 3rpx rgba(0, 0, 0, 0.2));
		}
	}

	/* 管理者：深蓝靛主色 + 左上角柔高光，色相连续不脏 */
	.manager-icon {
		background:
			radial-gradient(ellipse 135% 100% at 12% -8%, rgba(255, 255, 255, 0.38) 0%, transparent 52%),
			linear-gradient(156deg, #7a8fc8 0%, #5d76bd 40%, #4a62a8 72%, #3a4f7a 100%);
	}

	/* 客服：同属冷色系，青绿起手逐步落回品牌蓝，避免橙紫撞色 */
	.service-icon {
		background:
			radial-gradient(ellipse 130% 95% at 18% -6%, rgba(255, 255, 255, 0.36) 0%, transparent 48%),
			linear-gradient(156deg, #5eb3c4 0%, #4f9aaf 34%, #4d85aa 68%, #4d6599 92%, #5d76bd 100%);
	}

	.function-name {
		font-size: 28rpx;
		font-weight: 700;
		color: #1e2638;
		margin-top: 18rpx;
		text-align: center;
	}

	.function-desc {
		font-size: 22rpx;
		font-weight: 500;
		color: #7c88a8;
		margin-top: 8rpx;
		line-height: 1.35;
		text-align: center;
	}

	.faq-section {
		margin: 28rpx 24rpx 0;
		background: linear-gradient(
			165deg,
			#ffffff 0%,
			#f8faff 52%,
			#f4f6fc 100%
		);
		border-radius: 24rpx;
		padding: 28rpx 24rpx 32rpx;
		border: none;
		box-shadow:
			0 14rpx 44rpx rgba(93, 118, 189, 0.1),
			0 4rpx 16rpx rgba(38, 51, 78, 0.04),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.95);
	}

	.section-header {
		margin-bottom: 20rpx;

		.section-title {
			font-size: 30rpx;
			font-weight: 750;
			color: #1e2638;
			letter-spacing: 0.04em;
		}
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 14rpx;
	}

	.faq-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
		padding: 22rpx 20rpx;
		border-radius: 18rpx;
		border: none;
		background: linear-gradient(
			165deg,
			rgba(93, 118, 189, 0.07) 0%,
			rgba(255, 255, 255, 0.75) 100%
		);
		box-shadow:
			0 6rpx 18rpx rgba(93, 118, 189, 0.07),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.85);
		transition: transform 0.16s ease, box-shadow 0.16s ease;

		&:active {
			transform: scale(0.99);
			box-shadow:
				0 4rpx 12rpx rgba(93, 118, 189, 0.12),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.75);
		}

		.faq-question {
			font-size: 28rpx;
			font-weight: 650;
			color: #2a3350;
			flex: 1;
			min-width: 0;
			line-height: 1.45;
		}

		.faq-arrow {
			flex-shrink: 0;
			font-size: 36rpx;
			font-weight: 300;
			color: #a8b0c8;
			line-height: 1;
		}
	}

	.help-center-page.theme-dark {
		background: linear-gradient(168deg, #0e1015 0%, #14161e 45%, #1a1c24 100%);

		.nav-bar {
			background: linear-gradient(
				180deg,
				rgba(32, 34, 42, 0.96) 0%,
				rgba(24, 26, 32, 0.94) 100%
			);
			box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.45);
		}

		.nav-left .back-btn {
			background: #2e323c;
			box-shadow:
				0 8rpx 22rpx rgba(0, 0, 0, 0.35),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
		}

		.nav-title {
			color: #f4f7fb;
			text-shadow: none;
		}

		.hotline-card {
			box-shadow:
				0 16rpx 44rpx rgba(0, 0, 0, 0.4),
				inset 0 2rpx 0 rgba(255, 255, 255, 0.12);
		}

		.function-item {
			background: linear-gradient(165deg, #282c36 0%, #22262e 100%);
			box-shadow:
				0 12rpx 36rpx rgba(0, 0, 0, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.06);
		}

		.function-name {
			color: #f4f7fb;
		}

		.function-desc {
			color: #9aa6c4;
		}

		.function-icon {
			box-shadow:
				0 12rpx 28rpx rgba(0, 0, 0, 0.42),
				0 2rpx 8rpx rgba(0, 0, 0, 0.25),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.18),
				inset 0 -2rpx 8rpx rgba(0, 0, 0, 0.22);

			.icon-text {
				filter: drop-shadow(0 1rpx 4rpx rgba(0, 0, 0, 0.35));
			}
		}

		.faq-section {
			background: linear-gradient(165deg, #282c34 0%, #21252c 100%);
			box-shadow:
				0 14rpx 44rpx rgba(0, 0, 0, 0.28),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
		}

		.section-title {
			color: #f4f7fb !important;
		}

		.faq-item {
			background: linear-gradient(
				165deg,
				rgba(93, 118, 189, 0.14) 0%,
				rgba(40, 44, 52, 0.95) 100%
			);
			box-shadow:
				0 6rpx 18rpx rgba(0, 0, 0, 0.25),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.06);

			&:active {
				box-shadow:
					0 4rpx 12rpx rgba(0, 0, 0, 0.3),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
			}

			.faq-question {
				color: #e4e9f5;
			}

			.faq-arrow {
				color: #7c8498;
			}
		}
	}
</style>