<template>
	<view class="bank-page" :class="[themeClass, pageTypeClass]">
		<BankTopBar
			:theme="theme"
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
		background: linear-gradient(180deg, #cbfaf5 0%, #f6fbff 16%, #f7f8fb 100%);
	}

	.bank-page.page-interview {
		background: linear-gradient(180deg, #cbfaf5 0%, #f6fbff 16%, #f7f8fb 100%);
	}

	.page-scroll {
		flex: 1;
		min-height: 0;
	}

	.page-content {
		padding: 12rpx 24rpx calc(40rpx + env(safe-area-inset-bottom));
	}

	.history-card {
		padding: 24rpx;
		margin-bottom: 18rpx;
		border-radius: 34rpx;
		background: rgba(93, 118, 189, 0.1);
		box-shadow: 0 14rpx 32rpx rgba(16, 51, 117, 0.06);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20rpx;
	}

	.favorite-card {
		background: linear-gradient(135deg, rgba(255, 181, 71, 0.16) 0%, rgba(255, 255, 255, 0.82) 100%);
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
		mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iOSAxOCAxNSAxMiA5IDYiPjwvcG9seWxpbmU+PC9zdmc+");
		-webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iOSAxOCAxNSAxMiA5IDYiPjwvcG9seWxpbmU+PC9zdmc+");
	}

	.history-arrow {
		flex-shrink: 0;
		width: 40rpx;
		height: 40rpx;
		background-color: #2b658f;
	}

	.list-wrap {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
	}

	.empty-state {
		margin-top: 24rpx;
		padding: 36rpx 24rpx;
		text-align: center;
		font-size: 24rpx;
		color: #8d97aa;
	}

	.bank-page.theme-dark {
		background: linear-gradient(180deg, #111216 0%, #17191f 24%, #111216 100%);
	}

	.bank-page.theme-dark .history-card {
		background: linear-gradient(135deg, rgba(74, 103, 247, 0.18) 0%, rgba(33, 163, 242, 0.12) 100%);
		box-shadow: 0 14rpx 32rpx rgba(0, 0, 0, 0.2);
	}

	.bank-page.theme-dark .favorite-card {
		background: linear-gradient(135deg, rgba(255, 172, 77, 0.18) 0%, rgba(74, 103, 247, 0.12) 100%);
	}

	.bank-page.theme-dark .history-label {
		color: #f4f7fb;
	}

	.bank-page.theme-dark .history-desc {
		color: rgba(255, 255, 255, 0.62);
	}

	.bank-page.theme-dark .history-arrow {
		background-color: #8ab7ff;
	}

	.bank-page.theme-dark .empty-state {
		color: rgba(255, 255, 255, 0.5);
	}
</style>
