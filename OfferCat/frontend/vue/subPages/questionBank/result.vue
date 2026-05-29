<template>
	<!-- 答题评分结果页面 -->
	<view class="result-page" :class="themeClass" v-if="result">
		<!-- 顶部导航栏 -->
		<view class="result-topbar">
			<view class="back-btn" @click="goBack">
				<view class="svg-icon back-icon"></view>
			</view>
			<text class="topbar-title">评分结果</text>
			<text class="placeholder"></text>
		</view>

		<!-- 页面滚动区域 -->
		<scroll-view class="result-scroll" scroll-y :show-scrollbar="false">
			<view class="result-content">
				<!-- 头部结果卡片 -->
				<view class="hero-card">
					<view class="hero-copy">
						<text class="hero-title">练习完成</text>
						<text class="hero-subtitle">{{ result.title }}</text>
						<view class="hero-date">本次练习已生成成长评分</view>
					</view>

					<!-- 核心统计数据 -->
					<view class="stats-grid">
						<view class="stat-item">
							<text class="stat-value">{{ result.score }}</text>
							<text class="stat-label">综合得分</text>
						</view>
						<view class="stat-item">
							<text class="stat-value">{{ result.correctCount }}</text>
							<text class="stat-label">答对题数</text>
						</view>
						<view class="stat-item">
							<text class="stat-value">{{ result.wrongCount }}</text>
							<text class="stat-label">待复盘题数</text>
						</view>
					</view>

					<!-- 综合能力评估 -->
					<view class="ability-row">
						<view class="ability-ring">
							<view class="ring-inner">{{ result.accuracy }}%</view>
						</view>
						<view class="ability-copy">
							<text class="ability-title">综合求职能力</text>
							<view class="ability-bar">
								<view class="ability-fill" :style="abilityFillStyle"></view>
							</view>
							<text class="ability-desc">{{ result.abilityComment }}</text>
						</view>
					</view>
				</view>

				<!-- 答题概览面板 -->
				<view class="panel-card">
					<text class="panel-title">本次答题概览</text>
					<view class="summary-grid">
						<view class="summary-item">
							<text class="summary-value">{{ result.totalCount }}</text>
							<text class="summary-label">总题数</text>
						</view>
						<view class="summary-item">
							<text class="summary-value">{{ result.answeredCount }}</text>
							<text class="summary-label">已作答</text>
						</view>
						<view class="summary-item">
							<text class="summary-value">{{ result.accuracy }}%</text>
							<text class="summary-label">正确率</text>
						</view>
					</view>
				</view>

				<!-- 操作按钮组 -->
				<view class="action-row">
					<view class="ghost-btn" @click="retryPractice">再练一次</view>
					<view class="ghost-btn secondary-btn" @click="openHistory">查看历史</view>
					<view class="primary-btn" @click="goArchive">查看成长档案</view>
				</view>
			</view>
		</scroll-view>
	</view>

	<!-- 无结果时的空状态 -->
	<view v-else class="empty-state">未找到评分结果，请返回重新提交。</view>
</template>

<script>
	// 主题切换混入
	import themeMixin from '@/utils/themeMixin.js'
	import { openGrowthArchiveTab } from '@/utils/appLiquidTabBar.js'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				result: null,
				session: ''
			}
		},
		computed: {
			// 能力进度条宽度样式
			abilityFillStyle() {
				return {
					width: `${this.result ? this.result.accuracy : 0}%`
				}
			}
		},
		onLoad(options) {
			// 页面加载：从缓存获取本次练习结果
			this.session = options.session || ''
			this.result = uni.getStorageSync(`question_result_${this.session}`) || null
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack()
			},
			// 重新练习当前题单
			retryPractice() {
				if (!this.result) {
					return
				}
				uni.redirectTo({
					url: `/subPages/questionBank/exercise?id=${this.result.paperId}&type=${this.result.type}`
				})
			},
			// 跳转到成长档案（tabBar页面）
			goArchive() {
				openGrowthArchiveTab(0)
			},
			// 查看该类型的做题历史
			openHistory() {
				if (!this.result) {
					return
				}
				uni.navigateTo({
					url: `/subPages/questionBank/history?type=${this.result.type}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.result-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: radial-gradient(circle at top right, rgba(255, 196, 176, 0.18) 0%, rgba(255, 196, 176, 0) 24%), linear-gradient(180deg, #ffffff 0%, #f7f8fb 24%, #f5f7fb 100%);
	}

	.result-topbar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background: rgba(255, 255, 255, 0.86);
		backdrop-filter: blur(10rpx);
	}

	.back-icon {
		width: 44rpx;
		height: 44rpx;
		background-color: #314658;
		mask-image: url("/static/png/inline/16c5810c5fbd.png");
		-webkit-mask-image: url("/static/png/inline/16c5810c5fbd.png");
	}

	.back-btn,
	.placeholder {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.92);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-btn {
		font-size: 42rpx;
		line-height: 1;
		color: #30435a;
	}

	.topbar-title {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		font-weight: 800;
		color: #26334e;
	}

	.result-scroll {
		flex: 1;
		min-height: 0;
	}

	.result-content {
		padding: 20rpx 18rpx calc(40rpx + env(safe-area-inset-bottom));
		display: flex;
		flex-direction: column;
		gap: 22rpx;
	}

	.hero-card {
		padding: 28rpx;
		border-radius: 32rpx;
		background: linear-gradient(145deg, #1f64cb 0%, #3165d7 35%, #4333c8 100%);
		box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.2);
		color: #ffffff;
	}

	.hero-title,
	.hero-subtitle,
	.hero-date {
		display: block;
	}

	.hero-title {
		color: #ffffff;
		font-size: 40rpx;
		font-weight: 800;
	}

	.hero-subtitle {
		margin-top: 10rpx;
		font-size: 26rpx;
		color: rgba(255, 255, 255, 0.8);
	}

	.hero-date {
		align-self: flex-start;
		margin-top: 22rpx;
		padding: 12rpx 20rpx;
		border-radius: 999rpx;
		font-size: 22rpx;
		background: linear-gradient(360deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
		border: 2rpx solid rgba(255, 255, 255, 0.2);
	}

	.stats-grid {
		display: flex;
		gap: 20rpx;
		margin-top: 26rpx;
	}

	.stat-item {
		flex: 1;
		padding: 28rpx 20rpx;
		border-radius: 24rpx;
		background: linear-gradient(360deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
		border: 2rpx solid rgba(255, 255, 255, 0.2);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.stat-value,
	.stat-label {
		display: block;
	}

	.stat-value {
		font-size: 54rpx;
		font-weight: 800;
	}

	.stat-label {
		margin-top: 10rpx;
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.85);
	}

	.ability-row {
		display: flex;
		align-items: center;
		margin-top: 28rpx;
	}

	.ability-ring {
		width: 112rpx;
		height: 112rpx;
		border-radius: 50%;
		padding: 8rpx;
		background: conic-gradient(#ffffff 0deg 245deg, rgba(255, 255, 255, 0.2) 245deg 360deg);
		box-sizing: border-box;
		flex-shrink: 0;
	}

	.ring-inner {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #345dd4;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
		font-weight: 800;
	}

	.ability-copy {
		flex: 1;
		margin-left: 22rpx;
		display: flex;
		flex-direction: column;
	}

	.ability-title {
		font-size: 32rpx;
		font-weight: 700;
	}

	.ability-bar {
		height: 12rpx;
		margin-top: 14rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.2);
		overflow: hidden;
	}

	.ability-fill {
		height: 100%;
		border-radius: 999rpx;
		background: #ffffff;
	}

	.ability-desc {
		margin-top: 12rpx;
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.82);
	}

	.panel-card {
		padding: 28rpx;
		border-radius: 30rpx;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 14rpx 32rpx rgba(16, 51, 117, 0.07);
	}

	.panel-title {
		display: block;
		font-size: 28rpx;
		font-weight: 800;
		color: #21304f;
	}

	.summary-grid {
		margin-top: 20rpx;
		display: flex;
		gap: 16rpx;
	}

	.summary-item {
		flex: 1;
		padding: 24rpx 18rpx;
		border-radius: 22rpx;
		background: #f7f9fc;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.summary-value,
	.summary-label {
		display: block;
	}

	.summary-value {
		font-size: 36rpx;
		font-weight: 800;
		color: #20304d;
	}

	.summary-label {
		margin-top: 8rpx;
		font-size: 22rpx;
		color: #7d89a0;
	}

	.action-row {
		display: flex;
		gap: 18rpx;
	}

	.ghost-btn,
	.primary-btn {
		flex: 1;
		height: 88rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 800;
	}

	.ghost-btn {
		background: rgba(255, 255, 255, 0.9);
		color: #5f718d;
	}

	.primary-btn {
		background: #5d76bd;
		color: #ffffff;
	}

	.secondary-btn {
		background: rgba(49, 101, 215, 0.1);
		color: #3165d7;
	}

	.empty-state {
		padding: 160rpx 24rpx;
		text-align: center;
		font-size: 26rpx;
		color: #8d97aa;
	}

	.result-page.theme-dark {
		background: radial-gradient(circle at top right, rgba(74, 103, 247, 0.18) 0%, rgba(74, 103, 247, 0) 24%), linear-gradient(180deg, #111216 0%, #17191f 24%, #111216 100%);
	}

	.result-page.theme-dark .result-topbar {
		background: rgba(18, 19, 24, 0.9);
	}

	.result-page.theme-dark .back-btn,
	.result-page.theme-dark .placeholder,
	.result-page.theme-dark .ghost-btn {
		background: rgba(35, 37, 43, 0.96);
		color: #eef2f8;
	}

	.result-page.theme-dark .secondary-btn {
		background: rgba(74, 103, 247, 0.18);
		color: #8ab7ff;
	}

	.result-page.theme-dark .topbar-title,
	.result-page.theme-dark .panel-title,
	.result-page.theme-dark .summary-value {
		color: #f4f7fb;
	}

	.result-page.theme-dark .panel-card {
		background: rgba(29, 31, 36, 0.96);
		box-shadow: 0 14rpx 32rpx rgba(0, 0, 0, 0.2);
	}

	.result-page.theme-dark .summary-item {
		background: #23252b;
	}

	.result-page.theme-dark .summary-label,
	.result-page.theme-dark .empty-state {
		color: rgba(255, 255, 255, 0.56);
	}
</style>
