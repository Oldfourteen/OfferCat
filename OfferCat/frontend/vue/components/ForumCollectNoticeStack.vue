<template>
	<view class="collect-notice-stack" :class="themeClass">
		<view
			v-for="item in notices"
			:key="item.id"
			class="collect-notice-item"
		>
			<text class="notice-text">已收藏</text>
			<text class="notice-link" @click.stop="goFavorites">查看收藏</text>
		</view>
	</view>
</template>

<script>
	import { FORUM_COLLECT_NOTICE_EVENT } from '@/utils/forumCollectNotice.js'

	export default {
		name: 'ForumCollectNoticeStack',
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		data() {
			return {
				notices: [],
				listener: null
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		created() {
			this.listener = () => {
				const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
				const timer = setTimeout(() => {
					this.removeNotice(id)
				}, 4000)
				this.notices.unshift({ id, timer })
			}
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(FORUM_COLLECT_NOTICE_EVENT, this.listener)
			}
		},
		beforeDestroy() {
			this.cleanup()
		},
		beforeUnmount() {
			this.cleanup()
		},
		methods: {
			removeNotice(id) {
				this.notices = this.notices.filter(item => item.id !== id)
			},
			goFavorites() {
				uni.navigateTo({
					url: '/subPages/forum/favorites'
				})
			},
			cleanup() {
				this.notices.forEach(item => {
					if (item && item.timer) clearTimeout(item.timer)
				})
				this.notices = []
				if (this.listener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
					uni.$off(FORUM_COLLECT_NOTICE_EVENT, this.listener)
				}
			}
		}
	}
</script>

<style lang="scss">
	.collect-notice-stack {
		position: fixed;
		top: calc(var(--status-bar-height) + 108rpx);
		right: 24rpx;
		left: 24rpx;
		z-index: 999;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 16rpx;
	}

	.collect-notice-item {
		max-width: 520rpx;
		min-height: 76rpx;
		padding: 0 24rpx;
		border-radius: 22rpx;
		background: rgba(255, 255, 255, 0.96);
		border: 1rpx solid rgba(49, 101, 215, 0.12);
		box-shadow:
			0 10rpx 28rpx rgba(15, 23, 42, 0.1),
			0 4rpx 10rpx rgba(49, 101, 215, 0.08);
		display: flex;
		align-items: center;
		gap: 18rpx;
		pointer-events: auto;
	}

	.notice-text {
		font-size: 26rpx;
		font-weight: 600;
		color: #24345b;
	}

	.notice-link {
		font-size: 26rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.collect-notice-stack.theme-dark {
		.collect-notice-item {
			background: rgba(35, 37, 43, 0.96);
			border-color: rgba(138, 183, 255, 0.18);
			box-shadow:
				0 10rpx 28rpx rgba(0, 0, 0, 0.28),
				0 4rpx 10rpx rgba(16, 24, 40, 0.18);
		}

		.notice-text {
			color: #f4f7fb;
		}

		.notice-link {
			color: #8ab7ff;
		}
	}
</style>
