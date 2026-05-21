<template>
	<view class="bank-page" :class="[themeClass, pageTypeClass]">
		<BankTopBar
			:theme="theme"
			:page-type="pageType"
			:tabs="tabs"
			:active="pageType"
			:model-value="keyword"
			:placeholder="placeholder"
			@update:modelValue="keyword = $event"
			@change-tab="handleTabChange"
			@clear="clearKeyword"
			@refresh="refreshPage"
		/>

		<scroll-view class="page-scroll" scroll-y :show-scrollbar="false">
			<view class="page-content">
				<view class="history-card" @click="openHistory">
					<view class="history-copy">
						<text class="history-label">做题历史记录</text>
						<text class="history-desc">{{ historyDescription }}</text>
					</view>
					<view class="svg-icon arrow-right-icon history-arrow"></view>
				</view>

				<view class="history-card favorite-card" @click="openFavorites">
					<view class="history-copy">
						<text class="history-label">我的收藏</text>
						<text class="history-desc">{{ favoriteDescription }}</text>
					</view>
					<view class="svg-icon arrow-right-icon history-arrow"></view>
				</view>

				<view class="list-wrap">
					<QuestionSetCard
						v-for="item in filteredSets"
						:key="item.id"
						:theme="theme"
						:item="formatSetItem(item)"
						@select="goDetail"
					/>
				</view>

				<view v-if="!filteredSets.length" class="empty-state">{{ emptyText }}</view>
			</view>
		</scroll-view>
	</view>
</template>

	<script>
	import BankTopBar from './BankTopBar.vue'
	import QuestionSetCard from './QuestionSetCard.vue'
	import { bankTabs } from '../data'
	import { getQuestionHistorySummary } from '@/utils/questionHistory.js'
	import { getQuestionFavoritesSummary } from '@/utils/questionFavorites.js'
	import { getCollectedQuestionIds } from '@/api/growth.js'

	export default {
		name: 'QuestionSetListPage',
		components: {
			BankTopBar,
			QuestionSetCard
		},
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			pageType: {
				type: String,
				required: true
			},
			placeholder: {
				type: String,
				default: '搜索题单'
			},
			emptyText: {
				type: String,
				default: '当前筛选条件下暂无题单。'
			},
			refreshText: {
				type: String,
				default: '列表已更新'
			},
			sets: {
				type: Array,
				default() {
					return []
				}
			},
			refreshSeed: {
				type: Number,
				default: 0
			}
		},
		watch: {
			pageType: {
				immediate: true,
				handler() {
					this.loadHistorySummary()
				}
			},
			refreshSeed: {
				handler() {
					this.loadHistorySummary()
				}
			}
		},
		data() {
			const defaultHistorySummary = {
				count: 0,
				latest: null
			}
			return {
				keyword: '',
				tabs: bankTabs,
				historySummary: defaultHistorySummary,
				favoriteSummary: {
					count: 0,
					latest: null,
					ids: []
				}
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			pageTypeClass() {
				return this.pageType === 'interview' ? 'page-interview' : 'page-written'
			},
			historyDescription() {
				const count = this.historySummary.count || 0
				const latest = this.historySummary.latest
				if (!count) {
					return '还没有做题记录，完成一套题后会自动收录到这里。'
				}

				if (!latest) {
					return `已累计 ${count} 条练习记录，点击查看完整历史。`
				}

				return `已累计 ${count} 条记录，最近一次得分 ${latest.score}，完成于 ${latest.submittedAt}`
			},
			favoriteDescription() {
				const count = this.favoriteSummary.count || 0
				const latest = this.favoriteSummary.latest
				if (!count) {
					return '还没有收藏题单，遇到想反复练的题单可以先收藏。'
				}

				if (!latest) {
					return `已收藏 ${count} 套题单，点击查看完整收藏列表。`
				}

				return `已收藏 ${count} 套题单，最近收藏的是${latest.type === 'interview' ? '面试真题' : '笔试真题'}，时间 ${latest.favoritedAt}`
			},
			filteredSets() {
				const keyword = this.keyword.trim().toLowerCase()
				return this.sets.filter(item => !keyword || `${item.title} ${item.companyShort} ${item.major} ${item.company} ${item.category}`.toLowerCase().includes(keyword))
			}
		},
		methods: {
			async loadHistorySummary() {
				this.historySummary = getQuestionHistorySummary(this.pageType)
				this.favoriteSummary = getQuestionFavoritesSummary(this.pageType)
				
				try {
					const qType = this.pageType === 'interview' ? 4 : 3
					const res = await getCollectedQuestionIds(qType)
					if (res && res.data && Array.isArray(res.data)) {
						const ids = res.data
						this.favoriteSummary.count = ids.length
						this.favoriteSummary.ids = ids.map(id => `set_${id}`)
						if (ids.length > 0) {
							this.favoriteSummary.latest = {
								type: this.pageType,
								favoritedAt: '最新'
							}
						} else {
							this.favoriteSummary.latest = null
						}
					}
				} catch (e) {
					console.error('Failed to load remote favorites summary', e)
				}
			},
			formatSetItem(item) {
				return {
					...item,
					type: this.pageType,
					isFavorite: this.favoriteSummary.ids.includes(item.id)
				}
			},
			handleTabChange(key) {
				if (key === this.pageType) {
					return
				}
				this.keyword = ''
				this.$emit('change-tab', key)
			},
			clearKeyword() {
				this.keyword = ''
			},
			refreshPage() {
				uni.showToast({ title: this.refreshText, icon: 'none' })
			},
			goDetail(item) {
				uni.navigateTo({
					url: `/subPages/questionBank/detail?id=${item.id}&type=${this.pageType}`
				})
			},
			openHistory() {
				uni.navigateTo({
					url: `/subPages/questionBank/history?type=${this.pageType}`
				})
			},
			openFavorites() {
				uni.navigateTo({
					url: `/subPages/questionBank/favorites?type=${this.pageType}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.bank-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.bank-page.page-written {
		background: #e6ebf7;
	}

	.bank-page.page-interview {
		background: #e8f4f0;
	}

	.page-scroll {
		flex: 1;
		min-height: 0;
	}

	.page-content {
		padding: 16rpx 24rpx calc(40rpx + env(safe-area-inset-bottom));
	}

	.history-card {
		padding: 26rpx 28rpx;
		margin-bottom: 22rpx;
		border-radius: 34rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20rpx;
	}

	.bank-page.page-written .history-card {
		background: linear-gradient(135deg, rgba(80, 115, 190, 0.24) 0%, rgba(225, 234, 255, 0.88) 42%, #ffffff 100%);
		border: 1rpx solid rgba(72, 98, 165, 0.14);
		box-shadow:
			0 14rpx 34rpx rgba(20, 40, 95, 0.12),
			0 4rpx 14rpx rgba(20, 40, 95, 0.06),
			0 1rpx 0 rgba(255, 255, 255, 0.8) inset;
	}

	.bank-page.page-interview .history-card {
		background: linear-gradient(135deg, rgba(46, 132, 118, 0.22) 0%, rgba(220, 242, 236, 0.9) 42%, #ffffff 100%);
		border: 1rpx solid rgba(42, 130, 118, 0.18);
		box-shadow:
			0 14rpx 34rpx rgba(24, 72, 64, 0.11),
			0 4rpx 14rpx rgba(24, 72, 64, 0.06),
			0 1rpx 0 rgba(255, 255, 255, 0.82) inset;
	}

	.bank-page.page-written .favorite-card {
		background: linear-gradient(135deg, rgba(70, 125, 210, 0.22) 0%, rgba(227, 235, 255, 0.88) 42%, #ffffff 100%);
	}

	.bank-page.page-interview .favorite-card {
		background: linear-gradient(135deg, rgba(38, 138, 122, 0.2) 0%, rgba(223, 244, 238, 0.9) 42%, #ffffff 100%);
	}

	.history-copy,
	.history-label,
	.history-desc {
		display: block;
	}

	.history-copy {
		flex: 1;
		min-width: 0;
	}

	.history-label {
		font-size: 28rpx;
		font-weight: 800;
		color: #22304d;
	}

	.history-desc {
		margin-top: 10rpx;
		font-size: 22rpx;
		line-height: 1.6;
		color: #688095;
	}

	.svg-icon {
		display: inline-block;
		mask-size: contain;
		-webkit-mask-size: contain;
		mask-repeat: no-repeat;
		-webkit-mask-repeat: no-repeat;
		mask-position: center;
		-webkit-mask-position: center;
	}

	.arrow-right-icon {
		mask-image: url("/static/png/inline/738baddf9948.png");
		-webkit-mask-image: url("/static/png/inline/738baddf9948.png");
	}

	.bank-page.page-written .history-arrow {
		background-color: #5d76bd;
	}

	.bank-page.page-interview .history-arrow {
		background-color: #1f8f82;
	}

	.history-arrow {
		flex-shrink: 0;
		width: 40rpx;
		height: 40rpx;
	}

	.list-wrap {
		display: flex;
		flex-direction: column;
		gap: 22rpx;
	}

	.bank-page.page-written .empty-state {
		border: 1rpx solid rgba(72, 98, 165, 0.1);
		box-shadow:
			0 10rpx 26rpx rgba(20, 40, 95, 0.07),
			0 2rpx 8rpx rgba(20, 40, 95, 0.04);
	}

	.bank-page.page-interview .empty-state {
		border: 1rpx solid rgba(42, 130, 118, 0.12);
		box-shadow:
			0 10rpx 26rpx rgba(24, 72, 64, 0.08),
			0 2rpx 8rpx rgba(24, 72, 64, 0.05);
	}

	.empty-state {
		margin-top: 28rpx;
		padding: 40rpx 28rpx;
		text-align: center;
		font-size: 24rpx;
		color: #6c7a94;
		background: rgba(255, 255, 255, 0.85);
		border-radius: 28rpx;
	}

	.bank-page.theme-dark {
		background: #14161c;
	}

	.bank-page.theme-dark.page-written .history-card {
		background: linear-gradient(135deg, rgba(93, 118, 189, 0.32) 0%, rgba(32, 38, 52, 0.96) 100%);
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow:
			0 16rpx 38rpx rgba(0, 0, 0, 0.35),
			0 4rpx 14rpx rgba(0, 0, 0, 0.2),
			0 1rpx 0 rgba(255, 255, 255, 0.06) inset;
	}

	.bank-page.theme-dark.page-written .favorite-card {
		background: linear-gradient(135deg, rgba(74, 120, 200, 0.28) 0%, rgba(32, 38, 52, 0.96) 100%);
	}

	.bank-page.theme-dark.page-interview .history-card {
		background: linear-gradient(135deg, rgba(46, 140, 125, 0.35) 0%, rgba(32, 38, 52, 0.96) 100%);
		border-color: rgba(110, 201, 184, 0.12);
		box-shadow:
			0 16rpx 38rpx rgba(0, 0, 0, 0.35),
			0 4rpx 14rpx rgba(0, 0, 0, 0.2),
			0 1rpx 0 rgba(255, 255, 255, 0.06) inset;
	}

	.bank-page.theme-dark.page-interview .favorite-card {
		background: linear-gradient(135deg, rgba(38, 120, 108, 0.32) 0%, rgba(32, 38, 52, 0.96) 100%);
	}

	.bank-page.theme-dark.page-written .history-arrow {
		background-color: #8ab7ff;
	}

	.bank-page.theme-dark.page-interview .history-arrow {
		background-color: #6ec9b8;
	}

	.bank-page.theme-dark .history-label {
		color: #f4f7fb;
	}

	.bank-page.theme-dark .history-desc {
		color: rgba(255, 255, 255, 0.62);
	}

	.bank-page.theme-dark .empty-state {
		color: rgba(255, 255, 255, 0.52);
		background: rgba(31, 35, 44, 0.92);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 12rpx 28rpx rgba(0, 0, 0, 0.28);
	}
</style>
