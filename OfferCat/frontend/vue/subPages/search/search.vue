<template>
	<!-- 全局搜索页面：仅搜索本项目论坛发布贴 -->
	<view class="search-page" :class="themeClass">
		<!-- 顶部搜索栏 -->
		<view class="search-topbar">
			<view class="back-btn" @click="goBack">
				<image
					class="back-icon-img"
					:src="forumSearchBackIcon"
					mode="aspectFit"
					style="width: 38rpx; height: 38rpx"
				/>
			</view>

			<view class="search-shell">
				<text class="search-icon">⌕</text>
				<input
					class="search-input"
					type="text"
					v-model="keyword"
					focus
					confirm-type="search"
					placeholder="搜索论坛帖子"
					placeholder-class="search-placeholder"
					@confirm="handleSearch"
				/>
			</view>

			<text class="search-action" @click="handleSearch">搜索</text>
		</view>

		<!-- 页面滚动主体 -->
		<scroll-view class="search-scroll" scroll-y :show-scrollbar="false">
			<view class="search-content">
				<!-- 历史搜索记录 -->
				<view v-if="historyList.length" class="history-section card-panel">
					<view class="section-head">
						<text class="section-title">历史搜索</text>
						<text class="section-action" @click="clearHistory">清空</text>
					</view>

					<view class="history-list">
						<view v-for="item in historyList" :key="item" class="history-item" @click="searchByHistory(item)">
							<text class="history-text">{{ item }}</text>
						</view>
					</view>
				</view>

				<!-- 搜索结果区域 -->
				<view class="result-section card-panel">
					<view class="section-head">
						<text class="section-title">搜索结果</text>
						<text class="section-tip">{{ resultSummary }}</text>
					</view>

					<!-- 未搜索时的初始状态 -->
					<view v-if="!hasSearched" class="empty-state">
						<text class="empty-title">输入关键词开始搜索</text>
						<text class="empty-desc">可搜索项目中的论坛发布贴。</text>
					</view>

					<!-- 有搜索结果 -->
					<view v-else-if="searchResults.length" class="result-list">
						<view v-for="item in searchResults" :key="`${item.type}-${item.id}`" class="result-card" @click="openResult(item)">
							<view class="result-main">
								<view class="result-top">
									<text class="result-type">论坛帖子</text>
									<text class="result-company">{{ item.company }}</text>
								</view>
								<text class="result-title">{{ item.title }}</text>
								<text class="result-desc">{{ item.summary }}</text>
								<view class="result-tags">
									<text class="tag-chip">{{ item.category }}</text>
									<text class="tag-chip">{{ item.total }} 评论</text>
								</view>
							</view>
							<text class="result-arrow">›</text>
						</view>
					</view>

					<!-- 无搜索结果 -->
					<view v-else class="empty-state">
						<text class="empty-title">没有找到相关内容</text>
						<text class="empty-desc">试试换个关键词，或搜索帖子标题与正文。</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 主题混入
	import themeMixin from '@/utils/themeMixin.js'
	import { searchForumMockPosts } from '@/utils/forumLocalData.js'

	// 搜索历史存储配置
	const SEARCH_HISTORY_KEY = 'home_search_history'
	const MAX_HISTORY_COUNT = 10

	const FORUM_SEARCH_BACK_ICON =
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
				forumSearchBackIcon: FORUM_SEARCH_BACK_ICON,
				keyword: '',
				hasSearched: false,
				historyList: [],
				searchResults: []
			}
		},
		computed: {
			// 搜索结果统计文案
			resultSummary() {
				if (!this.hasSearched) {
					return '支持论坛帖子搜索'
				}

				return `共找到 ${this.searchResults.length} 条论坛帖子`
			}
		},
		// 加载历史记录
		onLoad(options) {
			this.loadHistory()
			const initialKeyword = decodeURIComponent(options.keyword || '')
			if (initialKeyword) {
				this.keyword = initialKeyword
				this.handleSearch()
			}
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack()
			},
			// 加载本地搜索历史
			loadHistory() {
				const history = uni.getStorageSync(SEARCH_HISTORY_KEY)
				this.historyList = Array.isArray(history) ? history : []
			},
			// 保存搜索历史（去重 + 最多10条）
			saveHistory(keyword) {
				const nextKeyword = keyword.trim()
				if (!nextKeyword) {
					return
				}

				const nextHistory = [nextKeyword, ...this.historyList.filter(item => item !== nextKeyword)].slice(0, MAX_HISTORY_COUNT)
				this.historyList = nextHistory
				uni.setStorageSync(SEARCH_HISTORY_KEY, nextHistory)
			},
			// 清空搜索历史
			clearHistory() {
				this.historyList = []
				uni.removeStorageSync(SEARCH_HISTORY_KEY)
			},
			// 点击历史记录快速搜索
			searchByHistory(keyword) {
				this.keyword = keyword
				this.handleSearch()
			},
			// 执行搜索（本地论坛 mock 数据）
			async handleSearch() {
				const normalizedKeyword = this.keyword.trim().toLowerCase()
				this.hasSearched = true

				if (!normalizedKeyword) {
					this.searchResults = []
					return
				}

				uni.showLoading({ title: '搜索中...' })

				const forumResults = searchForumMockPosts(normalizedKeyword).map(post => {
					const contentPreview = post.content ? post.content.replace(/\n/g, ' ') : '暂无内容'
					return {
						id: post.postId,
						type: 'forum',
						title: contentPreview.length > 20 ? contentPreview.substring(0, 20) + '...' : contentPreview,
						summary: contentPreview,
						company: post.authorName || '匿名用户',
						category: '论坛帖子',
						total: post.commentCount || 0,
						rawPost: post
					}
				})
				uni.hideLoading()

				this.searchResults = forumResults

				// 保存到历史
				this.saveHistory(this.keyword)
			},
			// 打开搜索结果
			openResult(item) {
				if (item.rawPost) {
					uni.setStorageSync('currentPost_' + item.id, item.rawPost)
				}
				uni.navigateTo({
					url: `/subPages/forum/detail?id=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}

	.search-page {
		min-height: 100vh;
		background: #ffffff;
		display: flex;
		flex-direction: column;
	}

	.search-topbar {
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 20rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		gap: 18rpx;
		flex-shrink: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.search-scroll {
		flex: 1;
		min-height: 0;
	}

	.search-content {
		padding: 0 24rpx calc(40rpx + env(safe-area-inset-bottom));
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}

	.back-btn {
		box-sizing: border-box;
		width: 72rpx;
		height: 72rpx;
		min-width: 72rpx;
		max-width: 72rpx;
		padding: 0;
		border-radius: 50%;
		background: rgba(240, 248, 255, 0.98);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		flex-grow: 0;
		overflow: hidden;
		box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.07);
	}

	.back-icon-img {
		width: 38rpx;
		height: 38rpx;
		max-width: 38rpx;
		max-height: 38rpx;
		display: block;
		flex-shrink: 0;
	}

	.search-shell {
		flex: 1;
		min-width: 0;
		height: 76rpx;
		padding: 0 22rpx;
		border-radius: 20rpx;
		background: #f5f5f5;
		display: flex;
		align-items: center;
		gap: 14rpx;
	}

	.search-icon {
		font-size: 38rpx;
		color: #c2c2c2;
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		height: 76rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: #202020;
		background: transparent;
	}

	.search-placeholder {
		color: #b5b5b5;
		font-weight: 600;
	}

	.search-action {
		font-size: 28rpx;
		font-weight: 800;
		color: #3165d7;
		flex-shrink: 0;
	}

	.card-panel {
		padding: 28rpx;
		border-radius: 28rpx;
		background: #ffffff;
		box-shadow: 0 16rpx 38rpx rgba(67, 76, 210, 0.08);
	}

	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18rpx;
	}

	.section-title,
	.section-tip,
	.section-action,
	.empty-title,
	.empty-desc,
	.result-type,
	.result-company,
	.result-title,
	.result-desc,
	.history-text,
	.meta-text {
		display: block;
	}

	.section-title {
		font-size: 34rpx;
		font-weight: 900;
		color: #111111;
	}

	.section-tip,
	.section-action {
		font-size: 22rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.history-list {
		margin-top: 22rpx;
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
	}

	.history-item {
		padding: 18rpx 26rpx;
		border-radius: 18rpx;
		background: #f5f5f5;
	}

	.history-text {
		font-size: 24rpx;
		font-weight: 800;
		color: #1a1a1a;
	}

	.result-list {
		margin-top: 22rpx;
		display: flex;
		flex-direction: column;
		gap: 18rpx;
	}

	.result-card {
		padding: 24rpx;
		border-radius: 24rpx;
		background: #f7f9fc;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18rpx;
	}

	.result-main {
		flex: 1;
		min-width: 0;
	}

	.result-top {
		display: flex;
		align-items: center;
		gap: 14rpx;
		flex-wrap: wrap;
	}

	.result-type {
		font-size: 20rpx;
		font-weight: 800;
		color: #5d76bd;
	}

	.result-company {
		font-size: 20rpx;
		font-weight: 700;
		color: #8090ad;
	}

	.result-title {
		margin-top: 12rpx;
		font-size: 30rpx;
		line-height: 1.5;
		font-weight: 800;
		color: #1d2945;
	}

	.result-desc {
		margin-top: 10rpx;
		font-size: 22rpx;
		line-height: 1.6;
		color: #66758f;
	}

	.result-tags {
		margin-top: 16rpx;
		display: flex;
		flex-wrap: wrap;
		gap: 12rpx;
	}

	.tag-chip {
		padding: 10rpx 16rpx;
		border-radius: 999rpx;
		background: rgba(49, 101, 215, 0.08);
		font-size: 21rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.result-arrow {
		flex-shrink: 0;
		font-size: 36rpx;
		color: #a1afc7;
	}

	.empty-state {
		padding: 70rpx 12rpx 50rpx;
		text-align: center;
	}

	.empty-title {
		font-size: 30rpx;
		font-weight: 800;
		color: #1d2945;
	}

	.empty-desc {
		margin-top: 14rpx;
		font-size: 23rpx;
		line-height: 1.7;
		color: #7b88a3;
	}

	.search-page.theme-dark {
		background: linear-gradient(180deg, #111216 0%, #17191f 28%, #111216 100%);
	}

	.search-page.theme-dark .back-btn {
		background: rgba(255, 255, 255, 0.92);
		box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.22);
	}

	.search-page.theme-dark .section-title,
	.search-page.theme-dark .history-text,
	.search-page.theme-dark .result-title,
	.search-page.theme-dark .empty-title {
		color: #f4f7fb;
	}

	.search-page.theme-dark .search-shell,
	.search-page.theme-dark .history-item,
	.search-page.theme-dark .result-card {
		background: rgba(35, 37, 43, 0.96);
	}

	.search-page.theme-dark .card-panel {
		background: rgba(29, 31, 36, 0.96);
		box-shadow: 0 16rpx 38rpx rgba(0, 0, 0, 0.18);
	}

	.search-page.theme-dark .search-input {
		color: #eef2f8;
	}

	.search-page.theme-dark .search-placeholder,
	.search-page.theme-dark .search-icon,
	.search-page.theme-dark .result-company,
	.search-page.theme-dark .result-desc,
	.search-page.theme-dark .empty-desc {
		color: rgba(255, 255, 255, 0.5);
	}

	.search-page.theme-dark .tag-chip {
		background: rgba(74, 103, 247, 0.18);
		color: #8ab7ff;
	}

	.search-page.theme-dark .result-arrow {
		color: rgba(255, 255, 255, 0.28);
	}
</style>
