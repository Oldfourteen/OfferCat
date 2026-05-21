<template>
	<view class="liquid-tab-bar" :class="{ 'is-dark': isDarkUi }">
		<view class="liquid-tab-bar-bg"></view>
		<view class="liquid-tab-bar-inner">
			<view
				v-for="(item, index) in items"
				:key="item.pagePath"
				class="liquid-tab-item"
				:class="{ 'is-active': displaySelected === index, 'is-center': index === 2 }"
				@click="index !== 2 ? onTap(index) : null"
			>
				<view class="liquid-tab-item-content">
					<image class="liquid-tab-icon" :src="displaySelected === index ? item.iconActive : item.icon" mode="aspectFit" />
					<text class="liquid-tab-text" :class="{ active: displaySelected === index }">{{ item.text }}</text>
				</view>
			</view>

			<!-- Center Floating Button -->
			<view class="center-btn-wrapper" @click="onTap(2)">
				<image class="center-icon" :src="items[2] ? items[2].iconActive : ''" mode="aspectFit" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		LIQUID_TAB_ITEMS,
		LIQUID_TAB_BAR_SELECTED_EVENT,
		resolveLiquidTabIndexFromPath,
		getLiquidTabSelectedIndex,
		publishLiquidTabSelectedIndex,
		switchLiquidTab
	} from '@/utils/appLiquidTabBar.js'
	import { applyTheme, THEME_CHANGE_EVENT } from '@/utils/theme.js'

	export default {
		name: 'AppLiquidTabBar',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			tabPagePath: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				items: LIQUID_TAB_ITEMS,
				resolvedTheme: 'light',
				_themeChangeHandler: null,
				_tabSelectedHandler: null,
				// 点击瞬间更新，避免等 switchTab 完成才高亮
				pendingSelected: -1,
				// 跨页 switchTab（非本栏点击）时的全局选中下标；-1 表示尚未同步
				syncedSelected: -1
			}
		},
		computed: {
			isDarkUi() {
				return this.resolvedTheme === 'dark'
			},
			/** 本页挂载的底栏对应 Tab 下标（不依赖 getCurrentPages，避免缓存页栈延迟） */
			hostTabIndex() {
				const idx = resolveLiquidTabIndexFromPath(this.tabPagePath)
				return idx >= 0 ? idx : -1
			},
			displaySelected() {
				if (this.pendingSelected >= 0) {
					return this.pendingSelected
				}
				if (this.syncedSelected >= 0 && this.syncedSelected < this.items.length) {
					return this.syncedSelected
				}
				if (this.hostTabIndex >= 0) {
					return this.hostTabIndex
				}
				const fallback = getLiquidTabSelectedIndex()
				return fallback >= 0 ? fallback : 0
			}
		},
		watch: {
			theme(next) {
				if (next === 'dark' || next === 'light') {
					this.resolvedTheme = next
				}
			},
			hostTabIndex(next) {
				if (next >= 0 && this.pendingSelected === next) {
					this.pendingSelected = -1
				}
				if (next >= 0 && this.syncedSelected === next) {
					this.syncedSelected = next
				}
			}
		},
		created() {
			try {
				this.resolvedTheme = applyTheme()
			} catch (e) {
				this.resolvedTheme = this.theme === 'dark' ? 'dark' : 'light'
			}
		},
		mounted() {
			try {
				this.resolvedTheme = applyTheme()
			} catch (e) {
				this.resolvedTheme = this.theme === 'dark' ? 'dark' : 'light'
			}
			this._themeChangeHandler = (payload) => {
				const t = payload && payload.theme
				if (t === 'dark' || t === 'light') {
					this.resolvedTheme = t
				}
			}
			this._tabSelectedHandler = (payload) => {
				const index = payload && payload.index
				if (typeof index !== 'number' || index < 0 || index >= this.items.length) {
					return
				}
				this.syncedSelected = index
				if (this.hostTabIndex >= 0 && index === this.hostTabIndex) {
					this.pendingSelected = -1
				}
			}
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(THEME_CHANGE_EVENT, this._themeChangeHandler)
				uni.$on(LIQUID_TAB_BAR_SELECTED_EVENT, this._tabSelectedHandler)
			}
			if (this.hostTabIndex >= 0) {
				this.syncedSelected = this.hostTabIndex
			}
		},
		beforeDestroy() {
			this.teardownLiquidTabBar()
		},
		beforeUnmount() {
			this.teardownLiquidTabBar()
		},
		methods: {
			teardownLiquidTabBar() {
				if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
					if (this._themeChangeHandler) {
						uni.$off(THEME_CHANGE_EVENT, this._themeChangeHandler)
					}
					if (this._tabSelectedHandler) {
						uni.$off(LIQUID_TAB_BAR_SELECTED_EVENT, this._tabSelectedHandler)
					}
				}
				this._themeChangeHandler = null
				this._tabSelectedHandler = null
			},
			onTap(index) {
				if (index === this.displaySelected) return
				this.pendingSelected = index
				this.syncedSelected = index
				switchLiquidTab(index, {
					onFail: () => {
						this.pendingSelected = -1
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.liquid-tab-bar {
		position: fixed;
		left: 32rpx;
		right: 32rpx;
		bottom: calc(32rpx + env(safe-area-inset-bottom));
		bottom: calc(32rpx + constant(safe-area-inset-bottom));
		z-index: 40;
		pointer-events: none;
	}

	.liquid-tab-bar-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(228, 232, 238, 0.65); /* Grayer glass effect */
		backdrop-filter: blur(28px);
		border-radius: 100rpx;
		box-shadow: 
			0 20rpx 48rpx rgba(74, 169, 254, 0.25), /* Stronger blueish shadow */
			0 8rpx 16rpx rgba(0, 0, 0, 0.08),
			inset 0 3rpx 6rpx rgba(255, 255, 255, 0.95); /* Stronger inner glow */
		border: 1.5rpx solid rgba(255, 255, 255, 0.85); /* More visible border glow */
		pointer-events: auto;
	}

	.liquid-tab-bar.is-dark .liquid-tab-bar-bg {
		background: rgba(24, 26, 32, 0.65);
		box-shadow: 
			0 20rpx 48rpx rgba(0, 0, 0, 0.5),
			inset 0 3rpx 6rpx rgba(255, 255, 255, 0.15);
		border: 1.5rpx solid rgba(255, 255, 255, 0.2);
	}

	.liquid-tab-bar-inner {
		position: relative;
		height: 116rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding: 0 24rpx;
		box-sizing: border-box;
		pointer-events: auto;
		z-index: 3;
	}

	.liquid-tab-item {
		position: relative;
		z-index: 1;
		flex: 1;
		width: 20%; /* Force exact width to prevent flex-basis shifting */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 0;
		height: 100%;
	}

	.liquid-tab-item-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		transition: transform 0.12s ease-out;
	}

	.liquid-tab-item.is-active .liquid-tab-item-content {
		transform: scale(1.1);
	}

	.liquid-tab-item.is-center {
		visibility: hidden;
		pointer-events: none;
	}

	.liquid-tab-icon {
		width: 44rpx;
		height: 44rpx;
		margin-bottom: 6rpx;
	}

	.liquid-tab-text {
		font-size: 20rpx;
		line-height: 1.2;
		color: #8fa196;
		font-weight: 500;
		transition: color 0.12s ease;
	}

	.liquid-tab-text.active {
		color: #4aa9fe;
		text-shadow: 0 0 0.2px #4aa9fe; /* Use text-shadow instead of font-weight to prevent layout shift */
	}

	.liquid-tab-bar.is-dark .liquid-tab-text {
		color: #8c96a8;
	}

	.liquid-tab-bar.is-dark .liquid-tab-text.active {
		color: #8ab7ff;
		text-shadow: 0 0 0.2px #8ab7ff;
	}

	.center-btn-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 124rpx;
		height: 124rpx;
		border-radius: 50%;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 24rpx rgba(74, 169, 254, 0.25);
		border: 8rpx solid #f8f8f8; /* Creates the ring effect from the image */
		z-index: 10;
		transition: transform 0.2s;
		pointer-events: auto;
	}

	.center-btn-wrapper:active {
		transform: translate(-50%, -50%) scale(0.95);
	}

	.liquid-tab-bar.is-dark .center-btn-wrapper {
		background: #2a2d36;
		border-color: #1c1e26;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.4);
	}

	.center-icon {
		width: 68rpx;
		height: 68rpx;
	}
</style>
