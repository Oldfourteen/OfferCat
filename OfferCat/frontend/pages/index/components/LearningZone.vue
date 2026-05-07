<template>
	<scroll-view class="learning-scroll" scroll-y :show-scrollbar="false" @scroll="emitScroll">
		<view class="learning-page" :key="refreshSeed">
			<view class="animate-item" style="animation-delay: 0.1s;">
				<NoticeBar :theme="theme" />
			</view>
			<view class="animate-item" style="animation-delay: 0.2s;">
				<Activity :theme="theme" />
			</view>
			<view class="animate-item" style="animation-delay: 0.3s;">
				<QuestionBankModules :theme="theme" :refresh-seed="refreshSeed" />
			</view>
			<view class="animate-item" style="animation-delay: 0.4s;">
				<Interview :theme="theme" />
			</view>
			<view class="animate-item" style="animation-delay: 0.5s;">
				<ChatFooter :theme="theme" />
			</view>
			<view class="animate-item" style="animation-delay: 0.6s;">
				<ForumList :theme="theme" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import NoticeBar from './NoticeBar.vue'
	import Activity from './Activity.vue'
	import QuestionBankModules from './QuestionBankModules.vue'
	import Interview from './Interview.vue'
	import ChatFooter from './ChatFooter.vue'
	import ForumList from './ForumList.vue'

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
			NoticeBar,
			Activity,
			QuestionBankModules,
			Interview,
			ChatFooter,
			ForumList
		},
		methods: {
			emitScroll(event) {
				this.$emit('scroll', event)
			}
		}
	}
</script>

<style lang="scss">
	.learning-scroll {
		flex: 1;
		min-height: 0;
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
