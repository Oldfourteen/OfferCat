<template>
	<view class="job-page" :class="themeClass">
		<!-- 顶部固定头部负责展示个人信息，并根据滚动状态做折叠过渡。 -->
		<LearningHeader :collapse-progress="headerCollapseProgress" :theme="theme" :refresh-seed="refreshSeed" />
		<!-- 占位块用于给 fixed 头部留出空间，避免内容被遮挡。 -->
		<view class="header-spacer" :style="headerSpacerStyle"></view>

		<!-- 主内容区交给滚动容器承载，并向外透传滚动事件。 -->
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
				// 控制头部从展开到收起的过渡进度，范围为 0~1。
				headerCollapseProgress: 0,
				// 页面每次显示时递增，用来触发子组件重新拉取或重建视图。
				refreshSeed: 0
			}
		},
		onShow() {
			// 返回首页时刷新子组件依赖的 key，保证头部和内容区展示最新状态。
			this.refreshSeed += 1
		},
		computed: {
			headerSpacerStyle() {
				// 头部折叠后同步缩小占位高度，让内容区自然顶上去。
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
				// 根据滚动距离计算折叠进度，驱动头部透明度和高度变化。
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
