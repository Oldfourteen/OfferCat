<template>
	<!-- 做题历史页面 - 展示所有练习记录 -->
	<view class="history-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="history-topbar">
			<text class="back-btn" @click="goBack">‹</text>
			<text class="topbar-title">做题历史</text>
			<text class="placeholder"></text>
		</view>

		<!-- 顶部导航栏 -->
		<scroll-view class="history-scroll" scroll-y :show-scrollbar="false">
			<view class="history-content">
				<!-- 统计概览卡片 -->
				<view class="summary-card">
					<text class="summary-title">练习沉淀</text>
					<text class="summary-desc">自动保存最近 50 次题库练习结果，方便你回看分数变化与复盘节奏。</text>
					<view class="summary-stats">
						<view class="summary-stat">
							<text class="summary-value">{{ filteredHistory.length }}</text>
							<text class="summary-label">当前筛选</text>
						</view>
						<view class="summary-stat">
							<text class="summary-value">{{ averageScore }}</text>
							<text class="summary-label">平均得分</text>
						</view>
						<view class="summary-stat">
							<text class="summary-value">{{ bestScore }}</text>
							<text class="summary-label">最高得分</text>
						</view>
					</view>
				</view>

				<!-- 筛选标签栏 -->
				<view class="filter-row">
					<view
						v-for="item in filterTabs"
						:key="item.key"
						class="filter-chip"
						:class="{ active: activeType === item.key }"
						@click="activeType = item.key"
					>
						{{ item.label }}
					</view>
				</view>

				<!-- 历史记录列表 -->
				<view v-if="filteredHistory.length" class="history-list">
					<view v-for="item in filteredHistory" :key="item.sessionId" class="history-item">
						<view class="item-head">
							<view class="item-copy">
								<text class="item-type">{{ item.type === 'interview' ? '面试真题' : '笔试真题' }}</text>
								<text class="item-title">{{ item.title }}</text>
							</view>
							<view class="score-badge">{{ item.score }}</view>
						</view>

						<view class="tag-row">
							<text v-if="item.company" class="tag-chip">{{ item.company }}</text>
							<text v-if="item.category" class="tag-chip">{{ item.category }}</text>
							<text class="tag-chip">{{ item.correctCount }}/{{ item.totalCount }} 正确</text>
						</view>

						<view class="item-meta">
							<text class="meta-text">提交时间 {{ item.submittedAt }}</text>
							<text class="meta-text">正确率 {{ item.accuracy }}%</text>
						</view>

						<!-- 操作按钮 -->
						<view class="item-actions">
							<view class="ghost-btn" @click="openResult(item)">查看结果</view>
							<view class="primary-btn" @click="retryPractice(item)">再练一次</view>
						</view>
					</view>
				</view>

				<!-- 空状态 -->
				<view v-else class="empty-state">
					<text class="empty-title">还没有做题历史</text>
					<text class="empty-desc">完成一套{{ activeType === 'interview' ? '面试真题' : activeType === 'written' ? '笔试真题' : '题库练习' }}后，这里会自动记录你的成绩与时间。</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 主题切换混入
	import themeMixin from '@/utils/themeMixin.js'
	// 做题历史工具类
	import { getQuestionHistory } from '@/utils/questionHistory.js'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				activeType: 'all',
				historyList: [],
				// 筛选标签配置
				filterTabs: [
					{ key: 'all', label: '全部' },
					{ key: 'written', label: '笔试真题' },
					{ key: 'interview', label: '面试真题' }
				]
			}
		},
		computed: {
			// 根据类型筛选历史记录
			filteredHistory() {
				if (this.activeType === 'all') {
					return this.historyList
				}
				return this.historyList.filter(item => item.type === this.activeType)
			},
			// 计算平均分数
			averageScore() {
				if (!this.filteredHistory.length) {
					return 0
				}
				const total = this.filteredHistory.reduce((sum, item) => sum + Number(item.score || 0), 0)
				return Math.round(total / this.filteredHistory.length)
			},
			// 计算最高分数
			bestScore() {
				if (!this.filteredHistory.length) {
					return 0
				}
				return Math.max(...this.filteredHistory.map(item => Number(item.score || 0)))
			}
		},
		onLoad(options) {
			// 初始化筛选类型
			const type = options.type || 'all'
			this.activeType = ['all', 'written', 'interview'].includes(type) ? type : 'all'
		},
		onShow() {
			// 页面显示时加载历史记录
			this.loadHistory()
		},
		methods: {
			// 加载做题历史
			loadHistory() {
				this.historyList = getQuestionHistory()
			},
			// 返回上一页（智能路由处理）
			goBack() {
				const pages = getCurrentPages()
				if (pages.length > 1) {
					uni.navigateBack({ delta: 1 })
					return
				}
				uni.redirectTo({
					url: `/subPages/questionBank/${this.activeType === 'interview' ? 'interview' : 'written'}`
				})
			},
			// 查看答题结果详情
			openResult(item) {
				uni.setStorageSync(`question_result_${item.sessionId}`, item)
				uni.navigateTo({
					url: `/subPages/questionBank/result?session=${item.sessionId}`
				})
			},
			// 重新练习此题单
			retryPractice(item) {
				uni.navigateTo({
					url: `/subPages/questionBank/exercise?id=${item.paperId}&type=${item.type}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.history-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #cbfaf5 0%, #f6fbff 18%, #f7f8fb 100%);
	}

	.history-topbar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background: linear-gradient(180deg, rgba(0, 122, 252, 0.85) 0%, rgba(0, 122, 252, 0) 100%);
		backdrop-filter: blur(10rpx);
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
		color: #ffffff;
	}

	.placeholder {
		opacity: 0;
	}

	.history-scroll {
		flex: 1;
		min-height: 0;
	}

	.history-content {
		padding: 20rpx 18rpx calc(40rpx + env(safe-area-inset-bottom));
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.summary-card,
	.history-item,
	.empty-state {
		padding: 28rpx;
		border-radius: 30rpx;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 14rpx 32rpx rgba(16, 51, 117, 0.07);
	}

	.summary-title,
	.summary-desc,
	.summary-value,
	.summary-label,
	.item-type,
	.item-title,
	.meta-text,
	.empty-title,
	.empty-desc {
		display: block;
	}

	.summary-title {
		font-size: 32rpx;
		font-weight: 800;
		color: #21304f;
	}

	.summary-desc {
		margin-top: 10rpx;
		font-size: 23rpx;
		line-height: 1.7;
		color: #72819b;
	}

	.summary-stats {
		margin-top: 22rpx;
		display: flex;
		gap: 16rpx;
	}

	.summary-stat {
		flex: 1;
		padding: 22rpx 18rpx;
		border-radius: 24rpx;
		background: #f7f9fc;
	}

	.summary-value {
		font-size: 36rpx;
		font-weight: 800;
		color: #20304d;
	}

	.summary-label {
		margin-top: 8rpx;
		font-size: 22rpx;
		color: #8390a8;
	}

	.filter-row {
		display: flex;
		gap: 16rpx;
		flex-wrap: wrap;
	}

	.filter-chip {
		padding: 16rpx 24rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.9);
		font-size: 24rpx;
		font-weight: 700;
		color: #5f718d;
		box-shadow: 0 10rpx 24rpx rgba(16, 51, 117, 0.06);
	}

	.filter-chip.active {
		background: #5d76bd;
		color: #ffffff;
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
	}

	.item-head,
	.item-meta,
	.item-actions,
	.tag-row {
		display: flex;
	}

	.item-head {
		align-items: flex-start;
		justify-content: space-between;
		gap: 18rpx;
	}

	.item-copy {
		flex: 1;
		min-width: 0;
	}

	.item-type {
		font-size: 22rpx;
		font-weight: 700;
		color: #5d76bd;
	}

	.item-title {
		margin-top: 12rpx;
		font-size: 30rpx;
		line-height: 1.55;
		font-weight: 800;
		color: #20304d;
	}

	.score-badge {
		min-width: 96rpx;
		height: 96rpx;
		padding: 0 18rpx;
		border-radius: 28rpx;
		background: #5d76bd;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
		font-weight: 900;
		color: #ffffff;
		flex-shrink: 0;
	}

	.tag-row {
		margin-top: 18rpx;
		gap: 12rpx;
		flex-wrap: wrap;
	}

	.tag-chip {
		padding: 10rpx 16rpx;
		border-radius: 999rpx;
		background: #f2f6fb;
		font-size: 21rpx;
		color: #60738d;
	}

	.item-meta {
		justify-content: space-between;
		gap: 18rpx;
		margin-top: 18rpx;
		flex-wrap: wrap;
	}

	.meta-text {
		font-size: 22rpx;
		color: #8a96af;
	}

	.item-actions {
		margin-top: 22rpx;
		gap: 16rpx;
	}

	.ghost-btn,
	.primary-btn {
		flex: 1;
		height: 84rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		font-weight: 800;
	}

	.ghost-btn {
		background: rgba(49, 101, 215, 0.08);
		color: #3165d7;
	}

	.primary-btn {
		background: #5d76bd;
		color: #ffffff;
	}

	.empty-state {
		text-align: center;
		padding-top: 100rpx;
		padding-bottom: 100rpx;
	}

	.empty-title {
		font-size: 34rpx;
		font-weight: 800;
		color: #21304f;
	}

	.empty-desc {
		margin-top: 16rpx;
		font-size: 24rpx;
		line-height: 1.7;
		color: #7d89a0;
	}

	.history-page.theme-dark {
		background: linear-gradient(180deg, #111216 0%, #17191f 24%, #111216 100%);
	}

	.history-page.theme-dark .history-topbar {
		background: linear-gradient(180deg, rgba(35, 42, 63, 0.96) 0%, rgba(35, 42, 63, 0) 100%);
	}

	.history-page.theme-dark .back-btn,
	.history-page.theme-dark .filter-chip {
		background: rgba(35, 37, 43, 0.96);
		color: #eef2f8;
	}

	.history-page.theme-dark .topbar-title,
	.history-page.theme-dark .summary-title,
	.history-page.theme-dark .summary-value,
	.history-page.theme-dark .item-title,
	.history-page.theme-dark .empty-title {
		color: #f4f7fb;
	}

	.history-page.theme-dark .summary-card,
	.history-page.theme-dark .history-item,
	.history-page.theme-dark .empty-state {
		background: rgba(29, 31, 36, 0.96);
		box-shadow: 0 14rpx 32rpx rgba(0, 0, 0, 0.2);
	}

	.history-page.theme-dark .summary-desc,
	.history-page.theme-dark .summary-label,
	.history-page.theme-dark .meta-text,
	.history-page.theme-dark .empty-desc {
		color: rgba(255, 255, 255, 0.58);
	}

	.history-page.theme-dark .summary-stat,
	.history-page.theme-dark .tag-chip {
		background: #23252b;
	}

	.history-page.theme-dark .tag-chip {
		color: rgba(255, 255, 255, 0.64);
	}

	.history-page.theme-dark .ghost-btn {
		background: rgba(74, 103, 247, 0.18);
		color: #8ab7ff;
	}

	.history-page.theme-dark .filter-chip.active {
		background: #5d76bd;
		color: #ffffff;
	}
	</style>
