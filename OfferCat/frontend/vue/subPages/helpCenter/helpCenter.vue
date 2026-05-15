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

	const HELP_CENTER_BACK_ICON =
		'data:image/svg+xml;charset=utf-8,' +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
				'<path d="M14.5 6.5 9 12l5.5 5.5" stroke="#333333" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/>' +
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
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			loadFaqList() {
				uni.request({
					url: `${uni.getStorageSync('BASE_URL') || 'http://localhost:8080'}/api/help/faq`,
					method: 'GET',
					success: (res) => {
						if (res.data && res.data.data) {
							this.faqList = res.data.data
						} else {
							this.faqList = [
								{ question: '如何创建简历？', answer: '在首页点击"创建简历"按钮，按照提示填写个人信息即可。' },
								{ question: '如何修改密码？', answer: '进入个人中心 -> 设置 -> 修改密码。' },
								{ question: '如何联系客服？', answer: '点击底部"在线客服"按钮，即可与人工客服沟通。' },
								{ question: '数据如何备份？', answer: '系统会自动备份您的数据到云端，无需手动操作。' },
								{ question: '如何注销账号？', answer: '进入设置 -> 账号安全 -> 注销账号。' }
							]
						}
					},
					fail: () => {
						this.faqList = [
							{ question: '如何创建简历？', answer: '在首页点击"创建简历"按钮，按照提示填写个人信息即可。' },
							{ question: '如何修改密码？', answer: '进入个人中心 -> 设置 -> 修改密码。' },
							{ question: '如何联系客服？', answer: '点击底部"在线客服"按钮，即可与人工客服沟通。' },
							{ question: '数据如何备份？', answer: '系统会自动备份您的数据到云端，无需手动操作。' },
							{ question: '如何注销账号？', answer: '进入设置 -> 账号安全 -> 注销账号。' }
						]
					}
				})
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
	.page-content {
		height: calc(100vh - 44px);
		background: #f5f6f8;
	}

	.nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		padding: 0 16px;
		z-index: 100;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

		.nav-left {
			flex: 0 0 auto;
			min-width: 72rpx;
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.back-btn {
				box-sizing: border-box;
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.08);
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
			font-size: 18px;
			font-weight: 600;
			color: #333;
		}

		.nav-right {
			flex: 0 0 auto;
			min-width: 72rpx;
		}
	}

	.hotline-card {
		margin: 60px 16px 16px;
		background: linear-gradient(135deg, #4a6cf7 0%, #6b8cff 100%);
		border-radius: 16rpx;
		padding: 24rpx;

		.hotline-content {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 16rpx;
		}

		.hotline-label {
			font-size: 16px;
			color: rgba(255, 255, 255, 0.8);
		}

		.hotline-number {
			font-size: 24px;
			font-weight: 700;
			color: #fff;
		}
	}

	.function-grid {
		display: flex;
		gap: 16rpx;
		padding: 0 16px;
	}

	.function-item {
		flex: 1;
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.function-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.icon-text {
			font-size: 32rpx;
		}
	}

	.manager-icon {
		background: linear-gradient(135deg, #4a6cf7 0%, #6b8cff 100%);
	}

	.service-icon {
		background: linear-gradient(135deg, #fa8c16 0%, #ffa940 100%);
	}

	.function-name {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin-top: 12rpx;
	}

	.function-desc {
		font-size: 12px;
		color: #999;
		margin-top: 4rpx;
	}

	.faq-section {
		margin: 16px;
		background: #fff;
		border-radius: 16rpx;
		padding: 20rpx;
	}

	.section-header {
		margin-bottom: 16rpx;

		.section-title {
			font-size: 17px;
			font-weight: 600;
			color: #333;
		}
	}

	.faq-list {
		display: flex;
		flex-direction: column;
	}

	.faq-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}

		.faq-question {
			font-size: 15px;
			color: #333;
			flex: 1;
		}

		.faq-arrow {
			font-size: 24rpx;
			color: #ccc;
		}
	}
</style>