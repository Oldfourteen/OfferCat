<template>
	<view class="search-page" :class="themeClass">
		<view class="search-topbar">
			<text class="back-icon" @click="goBack">‹</text>

			<view class="search-shell">
				<text class="search-icon">⌕</text>
				<input
					class="search-input"
					type="text"
					v-model="keyword"
					focus
					confirm-type="search"
					placeholder="搜索题单、公司、方向或帖子"
					placeholder-class="search-placeholder"
					@confirm="handleSearch"
				/>
			</view>

			<text class="search-action" @click="handleSearch">搜索</text>
		</view>

		<scroll-view class="search-scroll" scroll-y :show-scrollbar="false">
			<view class="search-content">
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

				<view class="result-section card-panel">
					<view class="section-head">
						<text class="section-title">搜索结果</text>
						<text class="section-tip">{{ resultSummary }}</text>
					</view>

					<view v-if="!hasSearched" class="empty-state">
						<text class="empty-title">输入关键词开始搜索</text>
						<text class="empty-desc">可搜索公司、题单、岗位方向以及论坛帖子。</text>
					</view>

					<view v-else-if="searchResults.length" class="result-list">
						<view v-for="item in searchResults" :key="`${item.type}-${item.id}`" class="result-card" @click="openResult(item)">
							<view class="result-main">
								<view class="result-top">
									<text class="result-type">{{ item.type === 'interview' ? '面试真题' : item.type === 'written' ? '笔试真题' : '论坛帖子' }}</text>
									<text class="result-company">{{ item.company }}</text>
								</view>
								<text class="result-title">{{ item.title }}</text>
								<text class="result-desc">{{ item.summary }}</text>
								<view class="result-tags">
									<text class="tag-chip">{{ item.category }}</text>
									<text class="tag-chip" v-if="item.type !== 'forum'">共 {{ item.total }} 题</text>
									<text class="tag-chip" v-else>{{ item.total }} 评论</text>
								</view>
							</view>
							<text class="result-arrow">›</text>
						</view>
					</view>

					<view v-else class="empty-state">
						<text class="empty-title">没有找到相关内容</text>
						<text class="empty-desc">试试换个公司名、方向关键词，或者搜索帖子内容。</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { interviewSets, writtenSets } from '@/subPages/questionBank/data.js'
	import { request } from '@/api/request.js'

	const SEARCH_HISTORY_KEY = 'home_search_history'
	const MAX_HISTORY_COUNT = 10
	const SEARCH_SOURCE = [...writtenSets, ...interviewSets]

	export default {
		mixins: [themeMixin],
		data() {
			return {
				keyword: '',
				hasSearched: false,
				historyList: [],
				searchResults: []
			}
		},
		computed: {
			resultSummary() {
				if (!this.hasSearched) {
					return '支持题单、公司、方向、帖子搜索'
				}

				return `共找到 ${this.searchResults.length} 条相关内容`
			}
		},
		onLoad(options) {
			this.loadHistory()
			const initialKeyword = decodeURIComponent(options.keyword || '')
			if (initialKeyword) {
				this.keyword = initialKeyword
				this.handleSearch()
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			loadHistory() {
				const history = uni.getStorageSync(SEARCH_HISTORY_KEY)
				this.historyList = Array.isArray(history) ? history : []
			},
			saveHistory(keyword) {
				const nextKeyword = keyword.trim()
				if (!nextKeyword) {
					return
				}

				const nextHistory = [nextKeyword, ...this.historyList.filter(item => item !== nextKeyword)].slice(0, MAX_HISTORY_COUNT)
				this.historyList = nextHistory
				uni.setStorageSync(SEARCH_HISTORY_KEY, nextHistory)
			},
			clearHistory() {
				this.historyList = []
				uni.removeStorageSync(SEARCH_HISTORY_KEY)
			},
			searchByHistory(keyword) {
				this.keyword = keyword
				this.handleSearch()
			},
			async handleSearch() {
				const normalizedKeyword = this.keyword.trim().toLowerCase()
				this.hasSearched = true

				if (!normalizedKeyword) {
					this.searchResults = []
					return
				}

				uni.showLoading({ title: '搜索中...' })

				const localResults = SEARCH_SOURCE.filter(item => {
					const searchableText = [
						item.title,
						item.company,
						item.category,
						item.summary,
						...(item.highlights || [])
					].join(' ').toLowerCase()
					return searchableText.includes(normalizedKeyword)
				}).map(item => ({
					...item,
					type: item.id.startsWith('i') ? 'interview' : 'written'
				}))

				let forumResults = []
				try {
					const res = await request({
						url: '/api/forum/post/search',
						method: 'POST',
						data: {
							keyword: normalizedKeyword,
							pageNum: 1,
							pageSize: 50
						}
					})
					if (res.code === 200 && res.data && res.data.records) {
						forumResults = res.data.records.map(post => {
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
					}
				} catch (e) {
					console.error('搜索帖子失败', e)
				} finally {
					uni.hideLoading()
				}

				this.searchResults = [...localResults, ...forumResults]

				this.saveHistory(this.keyword)
			},
			openResult(item) {
				if (item.type === 'forum') {
					if (item.rawPost) {
						uni.setStorageSync('currentPost_' + item.id, item.rawPost);
					}
					uni.navigateTo({
						url: `/subPages/forum/detail?id=${item.id}`
					})
				} else {
					uni.navigateTo({
						url: `/subPages/questionBank/detail?id=${item.id}&type=${item.type}`
					})
				}
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
		align-items: center;
		gap: 18rpx;
		flex-shrink: 0;
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

	.back-icon {
		width: 52rpx;
		height: 52rpx;
		font-size: 66rpx;
		line-height: 44rpx;
		font-weight: 400;
		color: #222222;
		text-align: center;
		flex-shrink: 0;
	}

	.search-shell {
		flex: 1;
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

	.search-page.theme-dark .back-icon,
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
