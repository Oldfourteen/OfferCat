<template>
	<!-- 我的收藏 - 题单收藏列表页面 -->
	<view class="favorites-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="favorites-topbar">
			<view class="back-btn" @click="goBack">
				<image class="back-icon-img" :src="favoritesBackIcon" mode="aspectFit" />
			</view>
			<text class="topbar-title">我的收藏</text>
			<text class="placeholder"></text>
		</view>

		<!-- 页面滚动主体 -->
		<scroll-view class="favorites-scroll" scroll-y :show-scrollbar="false">
			<view class="favorites-content">
				<!-- 收藏统计卡片 -->
				<view class="summary-card">
					<text class="summary-title">收藏题单</text>
					<text class="summary-desc">把想反复练习的题单先收起来，后面可以直接回到这里继续刷题。</text>
					<view class="summary-stats">
						<view class="summary-stat">
							<text class="summary-value">{{ filteredFavorites.length }}</text>
							<text class="summary-label">当前筛选</text>
						</view>
						<view class="summary-stat">
							<text class="summary-value">{{ writtenCount }}</text>
							<text class="summary-label">笔试收藏</text>
						</view>
						<view class="summary-stat">
							<text class="summary-value">{{ interviewCount }}</text>
							<text class="summary-label">面试收藏</text>
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

				<!-- 收藏列表 -->
				<view v-if="filteredFavorites.length" class="favorite-list">
					<view v-for="item in filteredFavorites" :key="item.paperId" class="favorite-item">
						<view class="item-head">
							<view class="item-copy">
								<text class="item-type">{{ item.type === 'interview' ? '面试真题' : '笔试真题' }}</text>
								<text class="item-title">{{ item.title }}</text>
							</view>
							<view class="item-badge">收藏</view>
						</view>

						<view class="tag-row">
							<text v-if="item.company" class="tag-chip">{{ item.company }}</text>
							<text v-if="item.category" class="tag-chip">{{ item.category }}</text>
							<text class="tag-chip">共 {{ item.total }} 题</text>
						</view>

						<text v-if="item.summary" class="item-summary">{{ item.summary }}</text>
						<text class="meta-text">收藏时间 {{ item.favoritedAt }}</text>

						<!-- 操作按钮组 -->
						<view class="item-actions">
							<view class="ghost-btn" @click="removeFavorite(item)">取消收藏</view>
							<view class="ghost-btn secondary-btn" @click="openDetail(item)">查看详情</view>
							<view class="primary-btn" @click="startPractice(item)">开始练习</view>
						</view>
					</view>
				</view>

				<!-- 空状态 -->
				<view v-else class="empty-state">
					<text class="empty-title">还没有收藏题单</text>
					<text class="empty-desc">去题库详情页点一下收藏，喜欢的题单就会自动收纳到这里。</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { PNG_ICONS } from '@/utils/staticIcons.js'
// 主题切换
	import themeMixin from '@/utils/themeMixin.js'
	// 收藏工具类
	import { getQuestionFavorites, removeQuestionFavorite } from '@/utils/questionFavorites.js'
	import { getCollectedQuestionIds, uncollectQuestion } from '@/api/growth.js'
	import { getQuestionDetail } from './data'

	const FAVORITES_BACK_ICON = PNG_ICONS.chevronLeft

	export default {
		mixins: [themeMixin],
		data() {
			return {
				activeType: 'all',
				favorites: [],
				favoritesBackIcon: FAVORITES_BACK_ICON,
				// 筛选标签配置
				filterTabs: [
					{ key: 'all', label: '全部' },
					{ key: 'written', label: '笔试真题' },
					{ key: 'interview', label: '面试真题' }
				]
			}
		},
		computed: {
			// 根据类型筛选收藏列表
			filteredFavorites() {
				if (this.activeType === 'all') {
					return this.favorites
				}
				return this.favorites.filter(item => item.type === this.activeType)
			},
			// 笔试收藏数量
			writtenCount() {
				return this.favorites.filter(item => item.type === 'written').length
			},
			// 面试收藏数量
			interviewCount() {
				return this.favorites.filter(item => item.type === 'interview').length
			}
		},
		onLoad(options) {
			// 页面加载：初始化筛选类型
			const type = options.type || 'all'
			this.activeType = ['all', 'written', 'interview'].includes(type) ? type : 'all'
		},
		onShow() {
			// 页面显示：重新加载收藏数据
			void this.loadFavorites()
		},
		methods: {
			// 加载收藏列表
			async loadFavorites() {
				const localFavorites = getQuestionFavorites()
				try {
					const tasks = []
					if (this.activeType === 'all' || this.activeType === 'written') {
						tasks.push(getCollectedQuestionIds(3))
					}
					if (this.activeType === 'all' || this.activeType === 'interview') {
						tasks.push(getCollectedQuestionIds(4))
					}
					if (!tasks.length) {
						this.favorites = localFavorites
						return
					}
					const results = await Promise.allSettled(tasks)
					const fulfilled = results.filter(r => r.status === 'fulfilled')
					if (fulfilled.length === 0) {
						this.favorites = localFavorites
						return
					}
					const ids = fulfilled
						.flatMap(r => (r.value && r.value.data) || [])
						.filter(v => v != null)
					
					const mapped = ids
						.map((qid) => {
							const setId = `set_${qid}`
							const detail = getQuestionDetail(setId)
							if (!detail) return null
							return {
								paperId: detail.id,
								type: detail.category === '面试' ? 'interview' : 'written',
								title: detail.title,
								company: detail.company,
								companyShort: detail.companyShort,
								category: detail.category,
								total: detail.total,
								summary: detail.summary,
								highlights: detail.highlights,
								timestamp: Date.now(),
								favoritedAt: ''
							}
						})
						.filter(Boolean)
					this.favorites = mapped
				} catch (e) {
					this.favorites = localFavorites
				}
			},
			// 返回上一页（智能判断路由）
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
			// 取消收藏
			removeFavorite(item) {
				removeQuestionFavorite(item.paperId)
				void uncollectQuestion(item.paperId, item.type === 'interview' ? 4 : 3).catch(() => {})
				void this.loadFavorites()
				uni.showToast({ title: '已取消收藏', icon: 'none' })
			},
			// 打开题单详情
			openDetail(item) {
				uni.navigateTo({
					url: `/subPages/questionBank/detail?id=${item.paperId}&type=${item.type}`
				})
			},
			// 开始练习
			startPractice(item) {
				uni.navigateTo({
					url: `/subPages/questionBank/exercise?id=${item.paperId}&type=${item.type}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.favorites-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #e6ebf7;
	}

	.favorites-topbar {
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

	.favorites-scroll {
		flex: 1;
		min-height: 0;
	}

	.favorites-content {
		padding: 24rpx 20rpx calc(40rpx + env(safe-area-inset-bottom));
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}

	.summary-card,
	.favorite-item,
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
	.item-summary,
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

	.favorite-list {
		display: flex;
		flex-direction: column;
		gap: 22rpx;
	}

	.item-head,
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

	.item-badge {
		min-width: 96rpx;
		height: 96rpx;
		padding: 0 18rpx;
		border-radius: 28rpx;
		background: #5d76bd;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
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

	.item-summary {
		margin-top: 18rpx;
		font-size: 23rpx;
		line-height: 1.7;
		color: #65748f;
	}

	.meta-text {
		margin-top: 14rpx;
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
		background: #fcefe6;
		color: #8f4a24;
		border: 1rpx solid rgba(200, 120, 80, 0.28);
		box-shadow: 0 4rpx 12rpx rgba(140, 72, 40, 0.1), 0 1rpx 0 rgba(255, 255, 255, 0.75) inset;
	}

	.ghost-btn.secondary-btn {
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

	.favorites-page.theme-dark {
		background: #14161c;
	}

	.favorites-page.theme-dark .favorites-topbar {
		background: #1c1f28;
		box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.35), 0 1rpx 0 rgba(255, 255, 255, 0.06) inset;
		border-bottom-color: rgba(255, 255, 255, 0.08);
	}

	.favorites-page.theme-dark .filter-chip {
		background: #22262f;
		color: #e8ecf4;
		border-color: rgba(120, 140, 200, 0.22);
		box-shadow: 0 5rpx 14rpx rgba(0, 0, 0, 0.25), 0 1rpx 0 rgba(255, 255, 255, 0.05) inset;
	}

	.favorites-page.theme-dark .back-btn {
		background: #2a2e38;
		border-color: rgba(255, 255, 255, 0.12);
		box-shadow:
			0 6rpx 18rpx rgba(0, 0, 0, 0.32),
			0 1rpx 0 rgba(255, 255, 255, 0.08) inset;
	}

	.favorites-page.theme-dark .back-icon-img {
		filter: brightness(0) invert(1);
		opacity: 0.88;
	}

	.favorites-page.theme-dark .topbar-title,
	.favorites-page.theme-dark .summary-title,
	.favorites-page.theme-dark .summary-value,
	.favorites-page.theme-dark .item-title,
	.favorites-page.theme-dark .empty-title {
		color: #f4f7fb;
	}

	.favorites-page.theme-dark .summary-card,
	.favorites-page.theme-dark .favorite-item,
	.favorites-page.theme-dark .empty-state {
		background: #1f232c;
		border-color: rgba(255, 255, 255, 0.09);
		box-shadow:
			0 16rpx 36rpx rgba(0, 0, 0, 0.35),
			0 4rpx 12rpx rgba(0, 0, 0, 0.22),
			0 1rpx 0 rgba(255, 255, 255, 0.06) inset;
	}

	.favorites-page.theme-dark .summary-desc,
	.favorites-page.theme-dark .summary-label,
	.favorites-page.theme-dark .item-summary,
	.favorites-page.theme-dark .meta-text,
	.favorites-page.theme-dark .empty-desc {
		color: rgba(255, 255, 255, 0.58);
	}

	.favorites-page.theme-dark .summary-stat,
	.favorites-page.theme-dark .tag-chip {
		background: #262a33;
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.2), 0 1rpx 0 rgba(255, 255, 255, 0.04) inset;
	}

	.favorites-page.theme-dark .tag-chip {
		color: rgba(255, 255, 255, 0.64);
	}

	.favorites-page.theme-dark .item-type {
		color: #9eb8ff;
	}

	.favorites-page.theme-dark .filter-chip.active {
		background: #5d76bd;
		color: #ffffff;
		border-color: rgba(100, 120, 200, 0.45);
		box-shadow:
			0 8rpx 22rpx rgba(0, 0, 0, 0.35),
			0 2rpx 0 rgba(255, 255, 255, 0.15) inset;
	}

	.favorites-page.theme-dark .item-badge {
		box-shadow:
			0 8rpx 20rpx rgba(0, 0, 0, 0.35),
			0 2rpx 0 rgba(255, 255, 255, 0.12) inset;
	}

	.favorites-page.theme-dark .ghost-btn {
		background: rgba(230, 130, 70, 0.18);
		color: #ffcc9e;
		border-color: rgba(230, 160, 100, 0.35);
		box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.22), 0 1rpx 0 rgba(255, 255, 255, 0.05) inset;
	}

	.favorites-page.theme-dark .ghost-btn.secondary-btn {
		background: rgba(74, 103, 247, 0.15);
		color: #9eb8ff;
		border-color: rgba(120, 145, 230, 0.25);
		box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.22), 0 1rpx 0 rgba(255, 255, 255, 0.05) inset;
	}

	.favorites-page.theme-dark .primary-btn {
		box-shadow:
			0 10rpx 26rpx rgba(0, 0, 0, 0.38),
			0 2rpx 0 rgba(255, 255, 255, 0.14) inset;
	}
</style>
