<template>
	<view class="growth-topbar" :class="themeClass">
		<view class="segmented">
			<view
				v-for="(item, index) in items"
				:key="item.key"
				class="seg-item"
				:class="{ active: index === activeIndex }"
				@click="onSelect(index)"
			>
				<text class="seg-text">{{ item.label }}</text>
			</view>
		</view>
	</view>
</template>

<script>
		export default {
			name: 'GrowthTopBar',
			props: {
				theme: {
					type: String,
					default: 'light'
				},
				activeIndex: {
				type: Number,
				default: 0
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		data() {
			return {
				items: [
					{ key: 'archive', label: '成长档案' },
					{ key: 'resume', label: '简历工坊' },
					{ key: 'ai', label: 'AI画像' }
				]
			}
		},
		methods: {
			onSelect(index) {
				if (index === this.activeIndex) return
				this.$emit('change', index)
			}
		}
	}
</script>

<style lang="scss">
	.growth-topbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 20;
		/* 保证在所有环境下都能有足够顶部安全区 */
		padding: calc(env(safe-area-inset-top) + var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(10rpx);
	}

	.segmented {
		height: 78rpx;
		border-radius: 18rpx;
		background: rgba(17, 24, 39, 0.04);
		padding: 8rpx;
		display: flex;
		gap: 8rpx;
		box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.06);
	}

	.seg-item {
		flex: 1;
		height: 62rpx;
		border-radius: 14rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		transition: background-color 0.18s ease, color 0.18s ease;
	}

	.seg-text {
		font-size: 26rpx;
		font-weight: 700;
		color: rgba(17, 24, 39, 0.72);
	}

	.seg-item.active {
		background: #5d76bd;
	}

	.seg-item.active .seg-text {
		color: #ffffff;
	}

	.growth-topbar.theme-dark {
		background: rgba(18, 19, 24, 0.92);
	}

	.growth-topbar.theme-dark .segmented {
		background: rgba(255, 255, 255, 0.06);
		box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.18);
	}

	.growth-topbar.theme-dark .seg-text {
		color: rgba(255, 255, 255, 0.62);
	}
</style>
