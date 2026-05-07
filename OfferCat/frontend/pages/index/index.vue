<template>
	<view class="job-page" :class="themeClass">
		<LearningHeader :collapse-progress="headerCollapseProgress" :theme="theme" :refresh-seed="refreshSeed" />
		<view class="header-spacer" :style="headerSpacerStyle"></view>

		<LearningZone :theme="theme" :refresh-seed="refreshSeed" @scroll="handleZoneScroll" />
	</view>
</template>

<script>
	import LearningHeader from './components/LearningHeader.vue'
	import LearningZone from './components/LearningZone.vue'
	import themeMixin from '@/utils/themeMixin.js'

	export default {
		mixins: [themeMixin],
		components: {
			LearningHeader,
			LearningZone
		},
		data() {
			return {
				headerCollapseProgress: 0,
				refreshSeed: 0
			}
		},
		onShow() {
			this.refreshSeed += 1
		},
		computed: {
			headerSpacerStyle() {
				const expandedHeight = 258
				const collapsedHeight = 128
				const height = expandedHeight - (expandedHeight - collapsedHeight) * this.headerCollapseProgress
				return {
					height: `${height}rpx`
				}
			}
		},
		methods: {
			handleZoneScroll(event) {
				const scrollTop = event && event.detail && event.detail.scrollTop ? event.detail.scrollTop : 0
				const start = 24
				const distance = 120
				const progress = (scrollTop - start) / distance
				this.headerCollapseProgress = Math.max(0, Math.min(progress, 1))
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f6f6f6;
	}

	.job-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f8fafd;
		background-image:
			linear-gradient(
				180deg,
				rgba(1, 188, 255, 0.1) 0%,
				rgba(49, 101, 215, 0.4) 45%,
				rgba(0, 123, 255, 0.05) 100%
			),
			linear-gradient(
				180deg,
				rgba(0, 122, 252, 0.7) 0%,
				rgba(1, 188, 255, 0) 100%
			);
		background-size: 100% 550rpx;
		background-repeat: no-repeat;
	}

	.header-spacer {
		flex-shrink: 0;
		transition: height 0.22s ease;
	}

	.job-page.theme-dark {
		background-color: #111216;
		background-image:
			linear-gradient(180deg, rgba(77, 108, 182, 0.38) 0%, rgba(35, 42, 63, 0.72) 50%, rgba(17, 18, 22, 0.96) 100%),
			linear-gradient(180deg, rgba(18, 22, 30, 0.98) 0%, rgba(18, 22, 30, 0.92) 100%);
		background-size: 100% 550rpx;
		background-repeat: no-repeat;
	}
</style>
