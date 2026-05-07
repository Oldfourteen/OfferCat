<template>
	<QuestionSetListPage
		:theme="theme"
		:page-type="currentPageType"
		:refresh-seed="refreshSeed"
		:placeholder="placeholder"
		:empty-text="currentPageCopy.emptyText"
		:refresh-text="currentPageCopy.refreshText"
		:sets="currentSets"
		@change-tab="handleChangeTab"
	/>
</template>

<script>
	import QuestionSetListPage from './QuestionSetListPage.vue'
	import { interviewSets, questionBankSearchPlaceholder, writtenSets } from '../data'

	const PAGE_COPY_MAP = {
		written: {
			emptyText: '当前筛选条件下暂无笔试真题。',
			refreshText: '真题列表已更新'
		},
		interview: {
			emptyText: '当前筛选条件下暂无面试真题。',
			refreshText: '面试题单已更新'
		}
	}

	const PAGE_SETS_MAP = {
		written: writtenSets,
		interview: interviewSets
	}

	export default {
		name: 'QuestionBankPageShell',
		components: {
			QuestionSetListPage
		},
		props: {
			theme: {
				type: String,
				default: 'light'
			},
		pageType: {
			type: String,
			default: 'written'
		},
		refreshSeed: {
			type: Number,
			default: 0
		}
	},
		data() {
			return {
				currentPageType: 'written'
			}
		},
		computed: {
			placeholder() {
				return questionBankSearchPlaceholder
			},
			currentPageCopy() {
				return PAGE_COPY_MAP[this.currentPageType] || PAGE_COPY_MAP.written
			},
			currentSets() {
				return PAGE_SETS_MAP[this.currentPageType] || PAGE_SETS_MAP.written
			}
		},
		watch: {
			pageType: {
				immediate: true,
				handler(value) {
					this.currentPageType = value || 'written'
				}
			}
		},
		methods: {
			handleChangeTab(key) {
				if (!PAGE_SETS_MAP[key] || key === this.currentPageType) {
					return
				}
				this.currentPageType = key
			}
		}
	}
</script>
