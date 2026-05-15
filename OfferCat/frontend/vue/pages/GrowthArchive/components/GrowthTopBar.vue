<template>
	<view class="growth-topbar" :class="themeClass">
		<!-- 顶部切换条只负责视图切换，通过 change 事件通知父页面。 -->
		<view class="segmented">
			<!-- 三个入口分别对应成长档案、简历工坊和 AI 画像。 -->
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
				// 顶部栏根据主题切换浅色/深色视觉样式。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		data() {
			return {
				// 顶部导航项配置，父组件只关心选中的下标。
				items: [
					{ key: 'archive', label: '成长档案' },
					{ key: 'resume', label: '简历工坊' },
					{ key: 'ai', label: 'AI画像' }
				]
			}
		},
		methods: {
			onSelect(index) {
				// 重复点击当前分段时不再触发父级刷新。
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
		/* 高于页面内容、低于档案弹窗(999)；独立合成层减少与内部 overflow 滚动叠层错乱 */
		z-index: 900;
		transform: translate3d(0, 0, 0);
		-webkit-transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		/* 保证在所有环境下都能有足够顶部安全区 */
		padding: calc(env(safe-area-inset-top) + var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(10rpx);
		border-bottom: 1rpx solid rgba(17, 24, 39, 0.06);
		box-shadow: 0 6rpx 20rpx rgba(15, 23, 42, 0.06);
	}

	.segmented {
		height: 78rpx;
		border-radius: 18rpx;
		background: rgba(17, 24, 39, 0.04);
		padding: 8rpx;
		display: flex;
		gap: 8rpx;
		border: 1rpx solid rgba(17, 24, 39, 0.08);
		box-shadow:
			0 1rpx 2rpx rgba(17, 24, 39, 0.05),
			0 10rpx 28rpx rgba(0, 0, 0, 0.07);
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
		border-bottom-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.35);
	}

	.growth-topbar.theme-dark .segmented {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow:
			0 1rpx 2rpx rgba(0, 0, 0, 0.25),
			0 10rpx 28rpx rgba(0, 0, 0, 0.22);
	}

	.growth-topbar.theme-dark .seg-text {
		color: rgba(255, 255, 255, 0.62);
	}
</style>
