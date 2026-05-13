<template>
	<scroll-view class="learning-scroll" scroll-y :show-scrollbar="false" @scroll="emitScroll">
		<view class="learning-page" :key="refreshSeed">
			<!-- 公告区滚动展示平台通知和功能更新提示。 -->
			<view class="animate-item" style="animation-delay: 0.1s;">
				<NoticeBar :theme="theme" />
			</view>
			<!-- 活动横幅承接当前招季的主推活动入口。 -->
			<view class="animate-item" style="animation-delay: 0.2s;">
				<Activity :theme="theme" />
			</view>
			<!-- 题库模块聚合笔试和面试两类刷题入口。 -->
			<view class="animate-item" style="animation-delay: 0.3s;">
				<QuestionBankModules :theme="theme" :refresh-seed="refreshSeed" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import NoticeBar from './NoticeBar.vue'
	import Activity from './Activity.vue'
	import QuestionBankModules from './QuestionBankModules.vue'

	export default {
		name: 'LearningZone',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			refreshSeed: {
				type: Number,
				default: 0
			}
		},
		components: {
			// 首页模块都由学习区统一编排，父页面只关心滚动和主题透传。
			NoticeBar,
			Activity,
			QuestionBankModules
		},
		methods: {
			emitScroll(event) {
				// 将 scroll-view 的滚动事件继续抛给父页面，供头部折叠计算使用。
				this.$emit('scroll', event)
			}
		}
	}
</script>

<style lang="scss">
	.learning-scroll {
		flex: 1;
		min-height: 0;
		/* H5：弱化纵向橡皮筋回弹，减轻 scrollTop 在触底附近抖动（小程序端忽略即可）。 */
		overscroll-behavior-y: none;
	}

	.learning-page {
		padding: 24rpx 24rpx calc(40rpx + env(safe-area-inset-bottom));
	}

	.animate-item {
		animation: slideUpFade 0.6s ease-out both;
	}

	@keyframes slideUpFade {
		from {
			opacity: 0;
			transform: translateY(40rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
