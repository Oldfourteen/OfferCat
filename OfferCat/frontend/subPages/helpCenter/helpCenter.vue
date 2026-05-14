<template>
	<view class="help-center-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="goBack">
				<text class="back-icon">‹</text>
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
					<text class="hotline-number">952899</text>
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

	export default {
		mixins: [themeMixin],
		data() {
			return {
				faqList: [
					{ question: '如何创建简历？', answer: '在首页点击"创建简历"按钮，按照提示填写个人信息即可。' },
					{ question: '如何修改密码？', answer: '进入个人中心 -> 设置 -> 修改密码。' },
					{ question: '如何联系客服？', answer: '点击底部"在线客服"按钮，即可与人工客服沟通。' },
					{ question: '数据如何备份？', answer: '系统会自动备份您的数据到云端，无需手动操作。' },
					{ question: '如何注销账号？', answer: '进入设置 -> 账号安全 -> 注销账号。' }
				]
			}
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
			width: 60rpx;
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.back-icon {
				font-size: 36rpx;
				color: #333;
				font-weight: bold;
			}
		}

		.nav-title {
			font-size: 18px;
			font-weight: 600;
			color: #333;
		}

		.nav-right {
			width: 60rpx;
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

		