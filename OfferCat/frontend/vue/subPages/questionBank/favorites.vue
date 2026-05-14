<template>
	<!-- 我的收藏 - 题单收藏列表页面 -->
	<view class="favorites-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="favorites-topbar">
			<text class="back-btn" @click="goBack">
				<view class="svg-icon back-icon"></view>
			</text>
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
	// 主题切换
	import themeMixin from '@/utils/themeMixin.js'
	// 收藏工具类
	import { getQuestionFavorites, removeQuestionFavorite } from '@/utils/questionFavorites.js'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				activeType: 'all',
				favorites: [],
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
			this.loadFavorites()
		},
		methods: {
			// 加载收藏列表
			loadFavorites() {
				this.favorites = getQuestionFavorites()
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
				this.loadFavorites()
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
		background: linear-gradient(180deg, #cbfaf5 0%, #f6fbff 18%, #f7f8fb 100%);
	}

	.favorites-topbar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background: linear-gradient(180deg, rgba(0, 122, 252, 0.85) 0%, rgba(0, 122, 252, 0) 100%);
		backdrop-filter: blur(10rpx);
	}
	
	.back-icon {
		width: 44rpx;
		height: 44rpx;
		background-color: #314658;
		mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==");
		-webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==");
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

	.favorites-scroll {
		flex: 1;
		min-height: 0;
	}

	.favorites-content {
		padding: 20rpx 18rpx calc(40rpx + env(safe-area-inset-bottom));
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.summary-card,
	.favorite-item,
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
		background: linear-gradient(135deg, #ffb547 0%, #ff8f3d 100%);
		color: #ffffff;
	}

	.favorite-list {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
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
		color: #d2822a;
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
		background: linear-gradient(135deg, #ffb547 0%, #ff8f3d 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
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
		background: #fdf3e7;
		font-size: 21rpx;
		color: #95622d;
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
		background: rgba(255, 181, 71, 0.14);
		color: #d2822a;
	}

	.secondary-btn {
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

	.favorites-page.theme-dark {
		background: linear-gradient(180deg, #111216 0%, #17191f 24%, #111216 100%);
	}

	.favorites-page.theme-dark .favorites-topbar {
		background: linear-gradient(180deg, rgba(35, 42, 63, 0.96) 0%, rgba(35, 42, 63, 0) 100%);
	}

	.favorites-page.theme-dark .back-btn,
	.favorites-page.theme-dark .filter-chip {
		background: rgba(35, 37, 43, 0.96);
		color: #eef2f8;
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
		background: rgba(29, 31, 36, 0.96);
		box-shadow: 0 14rpx 32rpx rgba(0, 0, 0, 0.2);
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
		background: #23252b;
	}

	.favorites-page.theme-dark .tag-chip {
		color: rgba(255, 210, 138, 0.88);
	}

	.favorites-page.theme-dark .item-type,
	.favorites-page.theme-dark .ghost-btn {
		color: #ffd28a;
	}

	.favorites-page.theme-dark .ghost-btn {
		background: rgba(255, 172, 77, 0.16);
	}

	.favorites-page.theme-dark .secondary-btn {
		background: rgba(74, 103, 247, 0.18);
		color: #8ab7ff;
	}

	.favorites-page.theme-dark .filter-chip.active {
		background: linear-gradient(135deg, #ffb547 0%, #ff8f3d 100%);
		color: #ffffff;
	}
</style>
