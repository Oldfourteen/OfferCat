<template>
	<!-- 题单详情页面 -->
	<view class="detail-page" :class="themeClass">
		<!-- 顶部导航栏：返回 + 标题 + 收藏 -->
		<view class="detail-topbar">
			<text class="back-btn" @click="goBack">‹</text>
			<text class="detail-topbar-title">题单详情</text>
			<text class="favorite-btn" :class="{ active: isFavorite }" @click="toggleFavorite">{{ isFavorite ? '已藏' : '收藏' }}</text>
		</view>

		<!-- 页面滚动区域 -->
		<scroll-view class="detail-scroll" scroll-y :show-scrollbar="false">
			<!-- 题单详情内容 -->
			<view class="detail-content" v-if="detail">
				<!-- 头部信息卡片 -->
				<view class="hero-card">
					<text class="hero-type">{{ pageTitle }}</text>
					<text class="hero-title">{{ detail.title }}</text>
					<text class="hero-summary">{{ detail.summary }}</text>
					<view class="hero-stats">
						<view class="hero-stat">
							<text class="hero-stat-value">{{ detail.total }}</text>
							<text class="hero-stat-label">题目数量</text>
						</view>
						<view class="hero-stat">
							<text class="hero-stat-value">{{ detail.difficulty || detail.category || detail.company }}</text>
							<text class="hero-stat-label">定位标签</text>
						</view>
					</view>
				</view>

				<!-- 适合人群/亮点卡片 -->
				<view class="panel-card">
					<text class="panel-title">本套题单适合你</text>
					<view class="highlight-list">
						<view class="highlight-item" v-for="(item, index) in detail.highlights" :key="index">
							<text class="highlight-dot"></text>
							<text class="highlight-text">{{ item }}</text>
						</view>
					</view>
				</view>

				<!-- 操作卡片：练习建议 + 收藏 + 开始练习 -->
				<view class="panel-card action-card">
					<text class="panel-title">练习建议</text>
					<text class="action-copy">建议你先完整做一轮题目，再结合 AI 页做错题复盘，训练表达与知识点串联。</text>
					<view class="secondary-action" @click="toggleFavorite">{{ isFavorite ? '取消收藏这套题单' : '收藏这套题单，方便下次直接回看' }}</view>
					<view class="action-btn" @click="startPractice">开始练习</view>
				</view>
			</view>

			<!-- 无数据时展示 -->
			<view v-else class="empty-state">未找到对应题单内容。</view>
		</scroll-view>
	</view>
</template>

<script>
	// 题单数据获取
	import { getQuestionDetail } from './data'
	// 收藏工具类
	import { isQuestionFavorited, saveQuestionFavorite, removeQuestionFavorite } from '@/utils/questionFavorites.js'
	// 主题混入
	import themeMixin from '@/utils/themeMixin.js'

	export default {
		mixins: [themeMixin],
		data() {
				return {
					detail: null,
					type: 'written',
					isFavorite: false
				}
			},
		computed: {
			// 根据类型动态设置页面标题
			pageTitle() {
				const map = {
					written: '笔试真题',
					interview: '面试真题'
				}
				return map[this.type] || '题库详情'
			}
		},
			onLoad(options) {
				// 页面加载：获取类型与题单ID，加载详情
				this.type = options.type || 'written'
				this.detail = getQuestionDetail(options.id)
				this.syncFavoriteState()
			},
			onShow() {
				// 页面显示时同步收藏状态
				this.syncFavoriteState()
			},
		methods: {
			// 同步收藏状态
			syncFavoriteState() {
				this.isFavorite = this.detail ? isQuestionFavorited(this.detail.id) : false
			},
			// 返回上一页
			goBack() {
				uni.navigateBack()
			},
			// 切换收藏/取消收藏
			toggleFavorite() {
				if (!this.detail) {
					return
				}

				if (this.isFavorite) {
					removeQuestionFavorite(this.detail.id)
					this.isFavorite = false
					uni.showToast({ title: '已取消收藏', icon: 'none' })
					return
				}

				// 保存收藏
				saveQuestionFavorite({
					paperId: this.detail.id,
					type: this.type,
					title: this.detail.title,
					company: this.detail.company,
					companyShort: this.detail.companyShort,
					category: this.detail.category,
					total: this.detail.total,
					summary: this.detail.summary,
					highlights: this.detail.highlights
				})
				this.isFavorite = true
				uni.showToast({ title: '已加入收藏', icon: 'none' })
			},
			// 开始练习，跳转到刷题页面
			startPractice() {
				if (!this.detail) {
					return
				}
				uni.navigateTo({
					url: `/subPages/questionBank/exercise?id=${this.detail.id}&type=${this.type}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #3165D7 0%, #f6fbff 18%, #f7f8fb 100%);
	}

	.detail-topbar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background: rgba(252, 252, 252, 0.8);
		backdrop-filter: blur(10rpx);
	}

	.back-btn,
	.detail-topbar-title,
	.favorite-btn {
		width: 72rpx;
	}

	.back-btn {
		height: 72rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.92);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 42rpx;
		line-height: 1;
		color: #30435a;
	}

	.detail-topbar-title {
		flex: 1;
		width: auto;
		text-align: center;
		font-size: 28rpx;
		font-weight: 800;
		color: #26334e;
	}

	.favorite-btn {
		height: 72rpx;
		min-width: 96rpx;
		padding: 0 18rpx;
		border-radius: 22rpx;
		background: rgba(255, 255, 255, 0.92);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-weight: 800;
		color: #30435a;
	}

	.favorite-btn.active {
		background: rgba(255, 172, 77, 0.18);
		color: #d2822a;
	}

	.detail-scroll {
		flex: 1;
		min-height: 0;
	}

	.detail-content {
		padding: 16rpx 24rpx calc(40rpx + env(safe-area-inset-bottom));
	}

	.hero-card,
	.panel-card {
		padding: 30rpx;
		border-radius: 34rpx;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 14rpx 32rpx rgba(16, 51, 117, 0.07);
	}

	.hero-type,
	.hero-title,
	.hero-summary {
		display: block;
	}

	.hero-type {
		font-size: 22rpx;
		font-weight: 700;
		color: #5d76bd;
	}

	.hero-title {
		margin-top: 18rpx;
		font-size: 42rpx;
		line-height: 1.45;
		font-weight: 900;
		color: #1d2945;
	}

	.hero-summary {
		margin-top: 14rpx;
		font-size: 24rpx;
		line-height: 1.7;
		color: #72819b;
	}

	.hero-stats {
		margin-top: 28rpx;
		display: flex;
		gap: 16rpx;
	}

	.hero-stat {
		flex: 1;
		padding: 22rpx 18rpx;
		border-radius: 24rpx;
		background: #f7f9fc;
	}

	.hero-stat-value,
	.hero-stat-label {
		display: block;
	}

	.hero-stat-value {
		font-size: 30rpx;
		font-weight: 800;
		color: #20304d;
	}

	.hero-stat-label {
		margin-top: 10rpx;
		font-size: 21rpx;
		color: #8d97aa;
	}

	.panel-card {
		margin-top: 20rpx;
	}

	.panel-title {
		display: block;
		font-size: 28rpx;
		font-weight: 800;
		color: #21304f;
	}

	.highlight-list {
		margin-top: 18rpx;
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}

	.highlight-item {
		display: flex;
		align-items: flex-start;
	}

	.highlight-dot {
		width: 12rpx;
		height: 12rpx;
		margin-top: 12rpx;
		margin-right: 14rpx;
		border-radius: 50%;
		background: #5d76bd;
	}

	.highlight-text {
		flex: 1;
		font-size: 24rpx;
		line-height: 1.7;
		color: #65748f;
	}

	.action-copy {
		display: block;
		margin-top: 16rpx;
		font-size: 24rpx;
		line-height: 1.7;
		color: #65748f;
	}

	.secondary-action {
		margin-top: 16rpx;
		padding: 20rpx 22rpx;
		border-radius: 24rpx;
		background: rgba(255, 181, 71, 0.14);
		font-size: 24rpx;
		line-height: 1.6;
		font-weight: 700;
		color: #d2822a;
	}

	.action-btn {
		margin-top: 24rpx;
		height: 88rpx;
		border-radius: 999rpx;
		background: #5d76bd;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 800;
		color: #ffffff;
	}

	.empty-state {
		padding: 140rpx 24rpx;
		text-align: center;
		font-size: 26rpx;
		color: #8d97aa;
	}

	.detail-page.theme-dark {
		background: linear-gradient(180deg, #111216 0%, #17191f 24%, #111216 100%);
	}

	.detail-page.theme-dark .detail-topbar {
		background: rgba(18, 19, 24, 0.9);
	}

	.detail-page.theme-dark .back-btn,
	.detail-page.theme-dark .favorite-btn {
		background: rgba(35, 37, 43, 0.96);
		color: #eef2f8;
	}

	.detail-page.theme-dark .favorite-btn.active {
		background: rgba(255, 172, 77, 0.16);
		color: #ffd28a;
	}

	.detail-page.theme-dark .detail-topbar-title,
	.detail-page.theme-dark .hero-title,
	.detail-page.theme-dark .hero-stat-value,
	.detail-page.theme-dark .panel-title {
		color: #f4f7fb;
	}

	.detail-page.theme-dark .hero-card,
	.detail-page.theme-dark .panel-card {
		background: rgba(29, 31, 36, 0.96);
		box-shadow: 0 14rpx 32rpx rgba(0, 0, 0, 0.2);
	}

	.detail-page.theme-dark .hero-summary,
	.detail-page.theme-dark .hero-stat-label,
	.detail-page.theme-dark .highlight-text,
	.detail-page.theme-dark .action-copy,
	.detail-page.theme-dark .secondary-action,
	.detail-page.theme-dark .empty-state {
		color: rgba(255, 255, 255, 0.56);
	}

	.detail-page.theme-dark .secondary-action {
		background: rgba(255, 172, 77, 0.12);
		color: #ffd28a;
	}

	.detail-page.theme-dark .hero-stat {
		background: #23252b;
	}
</style>
