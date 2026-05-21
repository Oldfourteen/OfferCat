<template>
	<!-- 做题历史页面 - 展示所有练习记录 -->
	<view class="history-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="history-topbar">
			<view class="back-btn" @click="goBack">
				<image class="back-icon-img" :src="historyBackIcon" mode="aspectFit" />
			</view>
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

				<!-- DeepSeek 练习复盘建议（与 generateAiAdvice 对应） -->
				<view v-if="filteredHistory.length" class="ai-advice-card">
					<text class="ai-advice-title">AI 复盘建议</text>
					<view v-if="isGeneratingAdvice" class="ai-advice-loading">
						<text class="loading-text">正在生成建议…</text>
					</view>
					<text v-else class="ai-advice-content">{{ aiAdvice || ' ' }}</text>
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
	import { PNG_ICONS } from '@/utils/staticIcons.js'
// 主题切换混入
	import themeMixin from '@/utils/themeMixin.js'
	// 做题历史工具类
	import { getQuestionHistory, syncQuestionHistoryFromServer } from '@/utils/questionHistory.js'
	// 引入 request
	import { request } from '@/api/request.js'

	const HISTORY_BACK_ICON = PNG_ICONS.chevronLeft

	export default {
		mixins: [themeMixin],
		data() {
			return {
				activeType: 'all',
				historyList: [],
				historyBackIcon: HISTORY_BACK_ICON,
				aiAdvice: '',
			isGeneratingAdvice: false,
			adviceCache: {},
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
		watch: {
			activeType(newVal) {
				if (this.adviceCache[newVal]) {
					this.aiAdvice = this.adviceCache[newVal]
				} else {
					this.generateAiAdvice()
				}
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
			async loadHistory() {
				try {
					await syncQuestionHistoryFromServer()
				} catch (e) {
					console.warn('[history] syncQuestionHistoryFromServer 失败', e)
				}
				this.historyList = getQuestionHistory()
				this.generateAiAdvice()
			},
			// 生成 AI 建议
			async generateAiAdvice() {
				if (!this.filteredHistory.length) return
				const currentType = this.activeType
				if (this.adviceCache[currentType]) {
					this.aiAdvice = this.adviceCache[currentType]
					return
				}
				this.isGeneratingAdvice = true
				this.aiAdvice = ''
				try {
					const practiceData = `当前类型：${currentType === 'all' ? '全部' : currentType === 'interview' ? '面试真题' : '笔试真题'}，练习次数：${this.filteredHistory.length}次，平均得分：${this.averageScore}分，最高得分：${this.bestScore}分。`
					const res = await request({
						url: '/api/ai/practice-advice',
						method: 'POST',
						data: { practiceData }
					})
					const text =
						typeof res === 'string'
							? res
							: res && (res.data != null ? res.data : res.advice != null ? res.advice : '')
					this.aiAdvice = String(text || '').trim() || '暂无建议'
					this.adviceCache[currentType] = this.aiAdvice
				} catch (e) {
					console.error('获取 AI 建议失败', e)
					this.aiAdvice = 'AI 建议生成失败，请稍后再试。'
				} finally {
					this.isGeneratingAdvice = false
				}
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
		background: #e6ebf7;
	}

	.history-topbar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 22rpx;
		background: #f4f6fc;
		box-shadow: 0 6rpx 22rpx rgba(24, 42, 92, 0.1), 0 1rpx 0 rgba(255, 255, 255, 0.75) inset;
		border-bottom: 1rpx solid rgba(72, 98, 165, 0.12);
	}

	.back-btn,
	.placeholder {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: #ffffff;
		border: 1rpx solid rgba(55, 78, 130, 0.12);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.back-btn {
		box-sizing: border-box;
		box-shadow: 0 6rpx 16rpx rgba(32, 52, 110, 0.12), 0 2rpx 0 rgba(255, 255, 255, 0.9) inset;
	}

	.back-icon-img {
		width: 38rpx;
		height: 38rpx;
		flex-shrink: 0;
	}

	.topbar-title {
		flex: 1;
		text-align: center;
		font-size: 30rpx;
		font-weight: 800;
		color: #1c2a45;
		letter-spacing: 0.02em;
	}

	.placeholder {
		opacity: 0;
	}

	.history-scroll {
		flex: 1;
		min-height: 0;
	}

	.history-content {
		padding: 24rpx 20rpx calc(40rpx + env(safe-area-inset-bottom));
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}

	.summary-card,
	.history-item,
	.empty-state {
		padding: 28rpx;
		border-radius: 30rpx;
		background: #ffffff;
		border: 1rpx solid rgba(72, 98, 165, 0.11);
		box-shadow:
			0 14rpx 32rpx rgba(20, 40, 95, 0.1),
			0 4rpx 12rpx rgba(20, 40, 95, 0.05),
			0 1rpx 0 rgba(255, 255, 255, 0.85) inset;
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
		background: #f5f7fc;
		border: 1rpx solid rgba(72, 98, 165, 0.09);
		box-shadow:
			0 4rpx 10rpx rgba(24, 44, 90, 0.06),
			0 1rpx 0 rgba(255, 255, 255, 0.65) inset;
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

	.ai-advice-card {
		padding: 28rpx;
		border-radius: 30rpx;
		background: #ffffff;
		border: 1rpx solid rgba(72, 98, 165, 0.11);
		box-shadow:
			0 14rpx 32rpx rgba(20, 40, 95, 0.1),
			0 4rpx 12rpx rgba(20, 40, 95, 0.05),
			0 1rpx 0 rgba(255, 255, 255, 0.85) inset;
	}

	.ai-advice-title {
		display: block;
		font-size: 28rpx;
		font-weight: 800;
		color: #21304f;
	}

	.ai-advice-loading {
		margin-top: 16rpx;
	}

	.ai-advice-content {
		display: block;
		margin-top: 16rpx;
		font-size: 24rpx;
		line-height: 1.75;
		color: #3d4f72;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.loading-text {
		font-size: 24rpx;
		color: #72819b;
	}

	.filter-row {
		display: flex;
		gap: 16rpx;
		flex-wrap: wrap;
	}

	.filter-chip {
		padding: 16rpx 24rpx;
		border-radius: 999rpx;
		background: #ffffff;
		font-size: 24rpx;
		font-weight: 700;
		color: #3d4f72;
		border: 1rpx solid rgba(93, 118, 189, 0.28);
		box-shadow: 0 5rpx 14rpx rgba(26, 48, 100, 0.08), 0 1rpx 0 rgba(255, 255, 255, 0.85) inset;
	}

	.filter-chip.active {
		background: #5d76bd;
		color: #ffffff;
		border-color: rgba(72, 90, 150, 0.45);
		box-shadow:
			0 8rpx 22rpx rgba(73, 98, 170, 0.35),
			0 2rpx 0 rgba(255, 255, 255, 0.22) inset;
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: 22rpx;
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
		border: 1rpx solid rgba(62, 82, 140, 0.35);
		box-shadow:
			0 8rpx 18rpx rgba(70, 92, 160, 0.28),
			0 2rpx 0 rgba(255, 255, 255, 0.2) inset;
	}

	.tag-row {
		margin-top: 18rpx;
		gap: 12rpx;
		flex-wrap: wrap;
	}

	.tag-chip {
		padding: 10rpx 16rpx;
		border-radius: 999rpx;
		background: #eef2fa;
		font-size: 21rpx;
		color: #4a5d7a;
		border: 1rpx solid rgba(93, 118, 189, 0.14);
		box-shadow: 0 2rpx 6rpx rgba(28, 48, 88, 0.05);
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
		background: #e8eefb;
		color: #2e4a9e;
		border: 1rpx solid rgba(93, 118, 189, 0.22);
		box-shadow: 0 4rpx 12rpx rgba(40, 68, 140, 0.09), 0 1rpx 0 rgba(255, 255, 255, 0.75) inset;
	}

	.primary-btn {
		background: #5d76bd;
		color: #ffffff;
		border: 1rpx solid rgba(62, 82, 140, 0.4);
		box-shadow:
			0 10rpx 24rpx rgba(73, 98, 170, 0.32),
			0 2rpx 0 rgba(255, 255, 255, 0.2) inset;
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
		background: #14161c;
	}

	.history-page.theme-dark .history-topbar {
		background: #1c1f28;
		box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.35), 0 1rpx 0 rgba(255, 255, 255, 0.06) inset;
		border-bottom-color: rgba(255, 255, 255, 0.08);
	}

	.history-page.theme-dark .filter-chip {
		background: #22262f;
		color: #e8ecf4;
		border-color: rgba(120, 140, 200, 0.22);
		box-shadow: 0 5rpx 14rpx rgba(0, 0, 0, 0.25), 0 1rpx 0 rgba(255, 255, 255, 0.05) inset;
	}

	.history-page.theme-dark .back-btn {
		background: #2a2e38;
		border-color: rgba(255, 255, 255, 0.12);
		box-shadow:
			0 6rpx 18rpx rgba(0, 0, 0, 0.32),
			0 1rpx 0 rgba(255, 255, 255, 0.08) inset;
	}

	.history-page.theme-dark .back-icon-img {
		filter: brightness(0) invert(1);
		opacity: 0.88;
	}

	.history-page.theme-dark .topbar-title,
	.history-page.theme-dark .summary-title,
	.history-page.theme-dark .ai-advice-title,
	.history-page.theme-dark .summary-value,
	.history-page.theme-dark .item-title,
	.history-page.theme-dark .empty-title {
		color: #f4f7fb;
	}

	.history-page.theme-dark .summary-card,
	.history-page.theme-dark .ai-advice-card,
	.history-page.theme-dark .history-item,
	.history-page.theme-dark .empty-state {
		background: #1f232c;
		border-color: rgba(255, 255, 255, 0.09);
		box-shadow:
			0 16rpx 36rpx rgba(0, 0, 0, 0.35),
			0 4rpx 12rpx rgba(0, 0, 0, 0.22),
			0 1rpx 0 rgba(255, 255, 255, 0.06) inset;
	}

	.history-page.theme-dark .summary-desc,
	.history-page.theme-dark .summary-label,
	.history-page.theme-dark .meta-text,
	.history-page.theme-dark .empty-desc,
	.history-page.theme-dark .loading-text {
		color: rgba(255, 255, 255, 0.58);
	}

	.history-page.theme-dark .ai-advice-content {
		color: rgba(255, 255, 255, 0.85);
	}

	.history-page.theme-dark .summary-stat,
	.history-page.theme-dark .tag-chip {
		background: #262a33;
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.2), 0 1rpx 0 rgba(255, 255, 255, 0.04) inset;
	}

	.history-page.theme-dark .tag-chip {
		color: rgba(255, 255, 255, 0.64);
	}

	.history-page.theme-dark .filter-chip.active {
		background: #5d76bd;
		color: #ffffff;
		border-color: rgba(100, 120, 200, 0.45);
		box-shadow:
			0 8rpx 22rpx rgba(0, 0, 0, 0.35),
			0 2rpx 0 rgba(255, 255, 255, 0.15) inset;
	}

	.history-page.theme-dark .score-badge {
		box-shadow:
			0 8rpx 20rpx rgba(0, 0, 0, 0.35),
			0 2rpx 0 rgba(255, 255, 255, 0.12) inset;
	}

	.history-page.theme-dark .ghost-btn {
		background: rgba(74, 103, 247, 0.15);
		color: #9eb8ff;
		border-color: rgba(120, 145, 230, 0.25);
		box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.22), 0 1rpx 0 rgba(255, 255, 255, 0.05) inset;
	}

	.history-page.theme-dark .primary-btn {
		box-shadow:
			0 10rpx 26rpx rgba(0, 0, 0, 0.38),
			0 2rpx 0 rgba(255, 255, 255, 0.14) inset;
	}
	</style>
