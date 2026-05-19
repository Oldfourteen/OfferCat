<template>
	<view class="job-page" :class="themeClass">
		<!-- 顶部固定头部负责展示个人信息，并根据滚动状态做折叠过渡。 -->
		<LearningHeader :collapse-progress="headerCollapseProgress" :theme="theme" :refresh-seed="refreshSeed" />
		<!-- 占位块用于给 fixed 头部留出空间，避免内容被遮挡。 -->
		<view class="header-spacer" :style="headerSpacerStyle"></view>

		<!-- 主内容区交给滚动容器承载，并向外透传滚动事件。 -->
		<LearningZone :theme="theme" :refresh-seed="refreshSeed" @scroll="handleZoneScroll" />
		<AppLiquidTabBar tab-page-path="pages/index/index" :theme="theme" />

		<!-- 公告弹窗 -->
		<AnnouncementPopup ref="announcementPopup" />
	</view>
</template>

<script>
	import LearningHeader from './components/LearningHeader.vue'
	import LearningZone from './components/LearningZone.vue'
	import AnnouncementPopup from './components/AnnouncementPopup.vue'
	import AppLiquidTabBar from '@/components/AppLiquidTabBar.vue'
	import themeMixin from '@/utils/themeMixin.js'
	import liquidTabBarPageMixin from '@/mixins/liquidTabBarPageMixin.js'

	export default {
		mixins: [themeMixin, liquidTabBarPageMixin],
		components: {
			LearningHeader,
			LearningZone,
			AppLiquidTabBar,
			AnnouncementPopup
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
			// 通知子组件页面已显示，用于重置动画状态
			if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
				uni.$emit('pageShow')
			}
			// 检查并显示公告弹窗（内部会判断是否登录及是否今天已弹出）
			this.$nextTick(() => {
				if (this.$refs.announcementPopup) {
					this.$refs.announcementPopup.checkAndShow()
				}
			})
		},
		computed: {
			headerSpacerStyle() {
				// 头部折叠后同步缩小占位高度，让内容区自然顶上去。
				// 与 LearningHeader 文案区 max-height 调高后对齐，避免列表第一条被遮挡。
				const expandedHeight = 292
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
				const detail = event && event.detail ? event.detail : {}
				const scrollTop = typeof detail.scrollTop === 'number' ? detail.scrollTop : 0
				const start = 24
				const distance = 120
				let progress = (scrollTop - start) / distance
				progress = Math.max(0, Math.min(progress, 1))

				const prev = this.headerCollapseProgress
				// 临近完全收起时拉住进度，避免触底弹性让 scrollTop 小幅回落导致头部与占位块来回抽动。
				if (prev >= 0.92 && progress >= 0.55) {
					progress = 1
				}
				if (prev <= 0.08 && progress <= 0.45) {
					progress = 0
				}

				this.headerCollapseProgress = progress
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
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background-color: #f8fafd;
		background-image:
			linear-gradient(
				180deg,
				rgba(100, 118, 193, 0.22) 0%,
				rgba(46, 125, 245, 0.38) 45%,
				rgba(14, 165, 233, 0.1) 100%
			),
			linear-gradient(
				180deg,
				rgba(100, 118, 193, 0.58) 0%,
				rgba(37, 130, 255, 0.38) 42%,
				rgba(56, 189, 248, 0) 100%
			);
		background-size: 100% 550rpx;
		background-repeat: no-repeat;
	}

	.header-spacer {
		flex-shrink: 0;
		/* 高度必须与滚动进度同步变化：若加 transition，会与 scroll-view 布局争抢并在触底回弹时出现整块内容上抖。 */
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
