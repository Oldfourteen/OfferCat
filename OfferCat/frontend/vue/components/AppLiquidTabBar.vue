<template>
	<view
		class="liquid-tab-bar"
		:class="[{ 'is-dark': isDarkUi, 'is-slide-settling': mirrorSlideSettling }]"
	>
		<view class="liquid-tab-bar-inner">
			<view class="liquid-mirror-track">
				<view class="liquid-drop" :style="mirrorSlideStyle">
					<!-- swell：略微放大截面，模拟凸透镜鼓起的曲面 -->
					<view class="liquid-drop-swell">
						<view class="liquid-drop-base" />
						<view class="liquid-drop-lens-blur" />
						<view class="liquid-drop-milk" />
						<view class="liquid-drop-lens-core" />
						<view class="liquid-drop-shimmer liquid-drop-shimmer--drift" />
						<view class="liquid-drop-specular" />
						<view class="liquid-drop-flash" />
						<view class="liquid-drop-meniscus" />
						<view class="liquid-drop-lens-ring" />
					</view>
				</view>
			</view>

			<view
				v-for="(item, index) in items"
				:key="item.pagePath"
				class="liquid-tab-item"
				:class="{ 'is-active': routeSelected === index }"
				@click="onTap(index)"
			>
				<image class="liquid-tab-icon" :src="routeSelected === index ? item.iconActive : item.icon" mode="aspectFit" />
				<text class="liquid-tab-text" :class="{ active: routeSelected === index }">{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		LIQUID_TAB_ITEMS,
		normalizePageRoute,
		setTabBarSlideIntent,
		clearTabBarSlideStartIndex,
		commitTabBarMirrorIndex
	} from '@/utils/appLiquidTabBar.js'
	import { applyTheme, THEME_CHANGE_EVENT } from '@/utils/theme.js'

	const SLIDE_MS = 660
	/* 先快后慢、末端绵长，观感更接近系统级 Tab 切换 */
	const SLIDE_EASE = 'cubic-bezier(0.33, 1, 0.68, 1)'

	export default {
		name: 'AppLiquidTabBar',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			/** 当前 Tab 页在 pages.json 中的路径，用于忽略缓存页里隐藏的底栏实例，避免 uni.$emit 多实例抢改 transform 抖动 */
			tabPagePath: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				items: LIQUID_TAB_ITEMS,
				mirrorSlideIndex: 0,
				mirrorNoTransition: false,
				mirrorAnimToken: 0,
				mirrorSlideSettling: false,
				_mirrorTransitioning: false,
				_mirrorTransTimer: null,
				_syncRaf: null,
				_liquidTabSync: null,
				/** 与全局主题同步；缓存 Tab 实例父级 props 可能滞后，避免底栏深浅切换不及时 */
				resolvedTheme: 'light',
				_themeChangeHandler: null
			}
		},
		computed: {
			isDarkUi() {
				return this.resolvedTheme === 'dark'
			},
			routeSelected() {
				try {
					const pages = getCurrentPages()
					if (!pages.length) {
						return 0
					}
					const page = pages[pages.length - 1]
					let raw = ''
					if (page && typeof page.route === 'string') {
						raw = page.route
					} else if (page && page.$page && typeof page.$page.fullPath === 'string') {
						raw = page.$page.fullPath
					}
					const routeNorm = normalizePageRoute(raw)
					if (!routeNorm) {
						return 0
					}
					const idx = this.items.findIndex(
						(item) => normalizePageRoute(item.pagePath) === routeNorm
					)
					return idx >= 0 ? idx : 0
				} catch (e) {
					return 0
				}
			},
			/** 规范化后的本页路径，与栈顶比对判断是否应由本实例响应同步 */
			tabPageNorm() {
				return normalizePageRoute(this.tabPagePath)
			},
			mirrorSlideStyle() {
				const i = this.mirrorSlideIndex
				const style = {
					transform: `translate3d(${i * 100}%, 0, 0)`,
					transition: this.mirrorNoTransition
						? 'none'
						: `transform ${SLIDE_MS}ms ${SLIDE_EASE}`
				}
				if (this.mirrorSlideSettling && !this.mirrorNoTransition) {
					style.willChange = 'transform'
				}
				return style
			}
		},
		watch: {
			theme(next) {
				if (next === 'dark' || next === 'light') {
					this.resolvedTheme = next
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
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(THEME_CHANGE_EVENT, this._themeChangeHandler)
			}
			this._liquidTabSync = () => this.rafDedupeSyncMirrorSlideIndex()
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on('liquid-tab-bar-sync', this._liquidTabSync)
			}
			this.$nextTick(() => {
				if (!this.isActiveTabBarInstance()) {
					return
				}
				this.preflightMirrorFromPendingSwitch()
				this.syncMirrorSlideIndex(true)
			})
		},
		beforeDestroy() {
			this.teardownLiquidTabBar()
		},
		beforeUnmount() {
			this.teardownLiquidTabBar()
		},
		methods: {
			teardownLiquidTabBar() {
				if (typeof cancelAnimationFrame === 'function' && this._syncRaf != null) {
					cancelAnimationFrame(this._syncRaf)
				}
				this._syncRaf = null
				if (this._mirrorTransTimer) {
					clearTimeout(this._mirrorTransTimer)
					this._mirrorTransTimer = null
				}
				if (typeof uni !== 'undefined' && typeof uni.$off === 'function' && this._liquidTabSync) {
					uni.$off('liquid-tab-bar-sync', this._liquidTabSync)
				}
				this._liquidTabSync = null
				if (typeof uni !== 'undefined' && typeof uni.$off === 'function' && this._themeChangeHandler) {
					uni.$off(THEME_CHANGE_EVENT, this._themeChangeHandler)
				}
				this._themeChangeHandler = null
			},
			isActiveTabBarInstance() {
				if (!this.tabPageNorm) {
					return true
				}
				try {
					const pages = getCurrentPages()
					if (!pages.length) {
						return false
					}
					const page = pages[pages.length - 1]
					let raw = ''
					if (page && typeof page.route === 'string') {
						raw = page.route
					} else if (page && page.$page && typeof page.$page.fullPath === 'string') {
						raw = page.$page.fullPath
					}
					return normalizePageRoute(raw) === this.tabPageNorm
				} catch (e) {
					return true
				}
			},
			rafDedupeSyncMirrorSlideIndex() {
				if (!this.isActiveTabBarInstance()) {
					return
				}
				if (typeof cancelAnimationFrame === 'function' && this._syncRaf != null) {
					cancelAnimationFrame(this._syncRaf)
					this._syncRaf = null
				}
				const run = () => {
					this._syncRaf = null
					if (!this.isActiveTabBarInstance()) {
						return
					}
					this.syncMirrorSlideIndex(false)
				}
				if (typeof requestAnimationFrame === 'function') {
					this._syncRaf = requestAnimationFrame(run)
				} else {
					run()
				}
			},
			beginMirrorTransitionLock() {
				this._mirrorTransitioning = true
				this.mirrorSlideSettling = true
				if (this._mirrorTransTimer) {
					clearTimeout(this._mirrorTransTimer)
				}
				this._mirrorTransTimer = setTimeout(() => {
					this._mirrorTransitioning = false
					this.mirrorSlideSettling = false
					this._mirrorTransTimer = null
					// 缓存页偶发 route / intent 竞态：落定后强制与水块对齐栈顶 tab
					this.reconcileMirrorToRouteIfNeeded()
				}, SLIDE_MS + 160)
			},
			preflightMirrorFromPendingSwitch() {
				const routeIdx = this.routeSelected
				let gd = {}
				try {
					gd = getApp().globalData || {}
				} catch (e) {
					gd = {}
				}
				const from = gd.tabBarAnimFrom
				const toIntent = gd.tabBarSlideTo
				if (
					typeof from === 'number' &&
					typeof toIntent === 'number' &&
					from !== toIntent &&
					from >= 0 &&
					from < this.items.length &&
					toIntent >= 0 &&
					toIntent < this.items.length
				) {
					this.mirrorNoTransition = true
					this.mirrorSlideIndex = from
					return
				}
				if (
					typeof from === 'number' &&
					from !== routeIdx &&
					from >= 0 &&
					from < this.items.length
				) {
					this.mirrorNoTransition = true
					this.mirrorSlideIndex = from
					return
				}
				this.mirrorSlideIndex = routeIdx
			},
			reconcileMirrorToRouteIfNeeded() {
				if (!this.isActiveTabBarInstance()) {
					return
				}
				const routeIdx = this.routeSelected
				if (this.mirrorSlideIndex === routeIdx) {
					return
				}
				this.mirrorAnimToken += 1
				this.mirrorNoTransition = true
				this.mirrorSlideIndex = routeIdx
				commitTabBarMirrorIndex(routeIdx)
				this.$nextTick(() => {
					this.mirrorNoTransition = false
				})
			},
			/**
			 * 先强制布局采样再起过渡：避免同一帧内「关掉 transition → 改起点 → 开 transition → 改终点」被合成层合并，导致肉眼看不顺滑或跳变。
			 */
			flushMirrorSlideLayoutThenAnimate(destIdx, token) {
				const runAnim = () => {
					if (token !== this.mirrorAnimToken) {
						return
					}
					this.mirrorNoTransition = false
					requestAnimationFrame(() => {
						if (token !== this.mirrorAnimToken) {
							return
						}
						this.mirrorSlideIndex = destIdx
						commitTabBarMirrorIndex(destIdx)
					})
				}
				let ran = false
				const onceRunAnim = () => {
					if (ran || token !== this.mirrorAnimToken) {
						return
					}
					ran = true
					runAnim()
				}
				let fbTimer = setTimeout(() => {
					fbTimer = null
					onceRunAnim()
				}, 36)
				try {
					uni.createSelectorQuery()
						.in(this)
						.select('.liquid-drop')
						.boundingClientRect(() => {
							if (fbTimer) {
								clearTimeout(fbTimer)
								fbTimer = null
							}
							onceRunAnim()
						})
						.exec()
				} catch (e) {
					if (fbTimer) {
						clearTimeout(fbTimer)
						fbTimer = null
					}
					requestAnimationFrame(onceRunAnim)
				}
			},
			scheduleMirrorSlideTo(destIdx, token) {
				this.beginMirrorTransitionLock()
				this.$nextTick(() => {
					if (token !== this.mirrorAnimToken) {
						return
					}
					this.flushMirrorSlideLayoutThenAnimate(destIdx, token)
				})
			},
			/** @param {boolean} immediate 首次挂载不打防抖，避免和水块起点错位 */
			syncMirrorSlideIndex(immediate = false) {
				if (!this.isActiveTabBarInstance()) {
					return
				}
				const routeIdx = this.routeSelected
				let gd = {}
				try {
					gd = getApp().globalData || {}
				} catch (e) {
					gd = {}
				}
				const from = gd.tabBarAnimFrom
				const toIntent = gd.tabBarSlideTo

				const intentOk =
					typeof from === 'number' &&
					typeof toIntent === 'number' &&
					from !== toIntent &&
					from >= 0 &&
					from < this.items.length &&
					toIntent >= 0 &&
					toIntent < this.items.length

				if (intentOk) {
					delete gd.tabBarAnimFrom
					delete gd.tabBarSlideTo
					const token = ++this.mirrorAnimToken
					this.mirrorNoTransition = true
					if (this.mirrorSlideIndex !== from) {
						this.mirrorSlideIndex = from
					}
					this.scheduleMirrorSlideTo(toIntent, token)
					return
				}

				// 兼容：仅有起点、未写终点时仍用当前解析到的栈顶 tab（旧调用）
				if (
					typeof from === 'number' &&
					from !== routeIdx &&
					from >= 0 &&
					from < this.items.length
				) {
					delete gd.tabBarAnimFrom
					delete gd.tabBarSlideTo
					const token = ++this.mirrorAnimToken
					this.mirrorNoTransition = true
					if (this.mirrorSlideIndex !== from) {
						this.mirrorSlideIndex = from
					}
					this.scheduleMirrorSlideTo(routeIdx, token)
					return
				}

				// 滑动过程中忽略「纠正」类同步，防止二次改 transform 造成抖动
				if (!immediate && this._mirrorTransitioning) {
					return
				}

				if (this.mirrorSlideIndex !== routeIdx) {
					this.mirrorAnimToken += 1
					this.mirrorNoTransition = false
					this.mirrorSlideIndex = routeIdx
					commitTabBarMirrorIndex(routeIdx)
				}
			},
			onTap(index) {
				if (index === this.routeSelected) {
					return
				}
				setTabBarSlideIntent(this.routeSelected, index)
				const path = this.items[index].pagePath
				uni.switchTab({
					url: `/${path}`,
					fail: () => clearTabBarSlideStartIndex()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 浅灰底栏 + 水滴灰阶：比纯白更容易辨认轮廓 */
	.liquid-tab-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 40;
		padding-bottom: env(safe-area-inset-bottom);
		padding-bottom: constant(safe-area-inset-bottom);
		background: #e8eaee;
		border-top: 1rpx solid rgba(0, 0, 0, 0.085);
		box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
		transform: translateZ(0);
		backface-visibility: hidden;
	}

	/* 滑块位移动画期间：停掉 shimmer 与图标文字过渡，避免与 transform 合成打架产生抖动 */
	.liquid-tab-bar.is-slide-settling .liquid-drop-shimmer--drift {
		animation: none !important;
		opacity: 0.36 !important;
		transform: none !important;
	}

	.liquid-tab-bar.is-dark.is-slide-settling .liquid-drop-shimmer--drift {
		opacity: 0.22 !important;
	}

	.liquid-tab-bar.is-slide-settling .liquid-tab-icon,
	.liquid-tab-bar.is-slide-settling .liquid-tab-text {
		transition: none !important;
	}

	.liquid-tab-bar.is-dark {
		background: #16181d;
		border-top-color: rgba(255, 255, 255, 0.09);
		box-shadow: 0 -6rpx 28rpx rgba(0, 0, 0, 0.35);
	}

	.liquid-tab-bar-inner {
		position: relative;
		height: 116rpx;
		min-height: 116rpx;
		max-height: 116rpx;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: space-around;
		padding: 10rpx 8rpx 8rpx;
		box-sizing: border-box;
		flex-shrink: 0;
	}

	.liquid-mirror-track {
		position: absolute;
		left: 8rpx;
		right: 8rpx;
		top: 10rpx;
		bottom: 8rpx;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
		isolation: isolate;
		transform: translateZ(0);
	}

	/* 灰白水珠：更强明暗对比 + 内层 swell 模拟凸透镜鼓面 */
	.liquid-drop {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 20%;
		overflow: hidden;
		box-sizing: border-box;
		will-change: transform;
		transform: translateZ(0);
		backface-visibility: hidden;
		border-radius: 48% 52% 50% 50% / 58% 54% 56% 52%;
		border: 1rpx solid rgba(255, 255, 255, 0.75);
		box-shadow:
			0 8rpx 28rpx rgba(0, 0, 0, 0.14),
			0 2rpx 0 rgba(255, 255, 255, 0.85),
			inset 0 5rpx 18rpx rgba(255, 255, 255, 0.72),
			inset 0 -10rpx 26rpx rgba(72, 80, 96, 0.26);
		backdrop-filter: blur(18px) saturate(112%);
		-webkit-backdrop-filter: blur(18px) saturate(112%);
	}

	.liquid-drop-swell {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		overflow: hidden;
		transform: scale(1.07);
		transform-origin: 50% 46%;
	}

	.liquid-drop-base {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			ellipse 118% 96% at 48% 12%,
			rgba(255, 255, 255, 1) 0%,
			rgba(248, 249, 252, 0.98) 32%,
			rgba(220, 224, 232, 0.96) 58%,
			rgba(168, 176, 192, 0.94) 82%,
			rgba(138, 148, 168, 0.92) 100%
		);
		pointer-events: none;
	}

	/* 中心略强的磨砂采样：模仿放大镜底下略微「放大、聚拢」的视觉（近似透镜中心区） */
	.liquid-drop-lens-blur {
		position: absolute;
		left: 14%;
		top: 16%;
		width: 72%;
		height: 62%;
		border-radius: 50%;
		transform: scale(1.02);
		opacity: 0.55;
		background: radial-gradient(
			circle at 46% 44%,
			rgba(255, 255, 255, 0.18) 0%,
			rgba(255, 255, 255, 0) 72%
		);
		backdrop-filter: blur(8px) contrast(1.12);
		-webkit-backdrop-filter: blur(8px) contrast(1.12);
		pointer-events: none;
	}

	.liquid-drop-milk {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(
			172deg,
			rgba(255, 255, 255, 0.9) 0%,
			rgba(255, 255, 255, 0.28) 32%,
			rgba(228, 232, 240, 0.72) 58%,
			rgba(185, 194, 210, 0.52) 100%
		);
		opacity: 0.94;
		pointer-events: none;
	}

	/* 透镜光芯：中心高亮汇聚（放大镜主轴高光） */
	.liquid-drop-lens-core {
		position: absolute;
		left: 26%;
		top: 24%;
		width: 48%;
		height: 44%;
		border-radius: 50%;
		background: radial-gradient(
			circle at 42% 40%,
			rgba(255, 255, 255, 0.95) 0%,
			rgba(255, 255, 255, 0.42) 38%,
			rgba(255, 255, 255, 0.06) 68%,
			rgba(255, 255, 255, 0) 100%
		);
		opacity: 0.88;
		transform: scale(1.18);
		pointer-events: none;
	}

	.liquid-drop-shimmer {
		position: absolute;
		left: -18%;
		top: -12%;
		width: 120%;
		height: 88%;
		border-radius: inherit;
		background:
			radial-gradient(ellipse 46% 40% at 30% 36%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 58%),
			radial-gradient(ellipse 40% 44% at 72% 60%, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0) 54%);
		opacity: 0.52;
		pointer-events: none;
	}

	.liquid-drop-shimmer--drift {
		animation: liquid-soft-shimmer 6.5s ease-in-out infinite;
	}

	@keyframes liquid-soft-shimmer {
		0%,
		100% {
			opacity: 0.42;
			transform: translate3d(0, 0, 0);
		}
		50% {
			opacity: 0.62;
			transform: translate3d(1rpx, -1rpx, 0);
		}
	}

	.liquid-drop-specular {
		position: absolute;
		left: 10%;
		top: 12%;
		width: 48%;
		height: 38%;
		border-radius: 999rpx;
		background: linear-gradient(
			125deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0.78) 28%,
			rgba(255, 255, 255, 0.38) 48%,
			rgba(255, 255, 255, 0) 100%
		);
		opacity: 0.88;
		transform: rotate(-10deg);
		pointer-events: none;
		filter: blur(0.15px);
	}

	/* 锐利闪光点：强化镜面高光存在感 */
	.liquid-drop-flash {
		position: absolute;
		left: 22%;
		top: 18%;
		width: 22%;
		height: 18%;
		border-radius: 45%;
		background: radial-gradient(
			circle at 35% 35%,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0.35) 45%,
			rgba(255, 255, 255, 0) 70%
		);
		opacity: 0.75;
		pointer-events: none;
		transform: rotate(-18deg);
	}

	.liquid-drop-meniscus {
		position: absolute;
		left: 11%;
		right: 11%;
		top: 4%;
		height: 18rpx;
		border-radius: 999rpx;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 1) 42%,
			rgba(255, 255, 255, 1) 58%,
			rgba(255, 255, 255, 0) 100%
		);
		opacity: 0.92;
		filter: blur(0.35px);
		pointer-events: none;
		box-shadow:
			0 2rpx 4rpx rgba(255, 255, 255, 0.65),
			0 -1rpx 3rpx rgba(255, 255, 255, 0.25);
	}

	/* 透镜边缘暗环：屈光加厚导致的遮光带（放大镜轮廓） */
	.liquid-drop-lens-ring {
		position: absolute;
		inset: -4%;
		border-radius: inherit;
		box-shadow:
			inset 0 0 36rpx rgba(55, 64, 80, 0.38),
			inset 0 0 14rpx rgba(255, 255, 255, 0.42),
			inset 0 10rpx 22rpx rgba(255, 255, 255, 0.22);
		pointer-events: none;
	}

	/* 深色：深蓝玻璃透镜（与选中态 #8ab7ff 同色系，避免灰白水珠撞色） */
	.liquid-tab-bar.is-dark .liquid-drop {
		border-color: rgba(120, 168, 242, 0.38);
		box-shadow:
			0 12rpx 36rpx rgba(0, 8, 24, 0.52),
			0 2rpx 0 rgba(138, 183, 255, 0.12),
			inset 0 6rpx 22rpx rgba(138, 183, 255, 0.14),
			inset 0 -14rpx 28rpx rgba(10, 18, 40, 0.62),
			0 0 40rpx rgba(74, 120, 200, 0.08);
		backdrop-filter: blur(22px) saturate(118%);
		-webkit-backdrop-filter: blur(22px) saturate(118%);
	}

	.liquid-tab-bar.is-dark .liquid-drop-base {
		background: radial-gradient(
			ellipse 118% 96% at 48% 12%,
			rgba(110, 162, 232, 0.52) 0%,
			rgba(52, 92, 168, 0.82) 30%,
			rgba(32, 58, 112, 0.94) 56%,
			rgba(18, 32, 64, 0.98) 78%,
			rgba(12, 22, 42, 1) 100%
		);
	}

	.liquid-tab-bar.is-dark .liquid-drop-lens-blur {
		opacity: 0.5;
		background: radial-gradient(
			circle at 46% 42%,
			rgba(186, 214, 255, 0.28) 0%,
			rgba(90, 140, 220, 0.06) 55%,
			rgba(30, 50, 100, 0) 72%
		);
	}

	.liquid-tab-bar.is-dark .liquid-drop-milk {
		background: linear-gradient(
			172deg,
			rgba(160, 200, 255, 0.42) 0%,
			rgba(90, 130, 210, 0.28) 28%,
			rgba(45, 78, 150, 0.52) 58%,
			rgba(24, 44, 92, 0.62) 100%
		);
		opacity: 0.88;
	}

	.liquid-tab-bar.is-dark .liquid-drop-lens-core {
		opacity: 0.55;
		background: radial-gradient(
			circle at 42% 38%,
			rgba(210, 228, 255, 0.55) 0%,
			rgba(138, 183, 255, 0.22) 42%,
			rgba(80, 120, 200, 0.06) 68%,
			rgba(40, 70, 140, 0) 100%
		);
	}

	.liquid-tab-bar.is-dark .liquid-drop-shimmer {
		opacity: 0.38;
		background:
			radial-gradient(
				ellipse 46% 40% at 30% 36%,
				rgba(200, 220, 255, 0.65) 0%,
				rgba(138, 183, 255, 0.18) 48%,
				rgba(60, 100, 180, 0) 62%
			),
			radial-gradient(
				ellipse 40% 44% at 72% 58%,
				rgba(138, 183, 255, 0.38) 0%,
				rgba(80, 120, 200, 0) 56%
			);
	}

	.liquid-tab-bar.is-dark .liquid-drop-specular {
		opacity: 0.58;
		background: linear-gradient(
			125deg,
			rgba(230, 240, 255, 0.92) 0%,
			rgba(170, 200, 255, 0.45) 32%,
			rgba(100, 150, 220, 0.14) 52%,
			rgba(60, 100, 180, 0) 100%
		);
	}

	.liquid-tab-bar.is-dark .liquid-drop-flash {
		opacity: 0.48;
		background: radial-gradient(
			circle at 35% 35%,
			rgba(232, 242, 255, 0.95) 0%,
			rgba(138, 183, 255, 0.35) 48%,
			rgba(80, 120, 200, 0) 72%
		);
	}

	.liquid-tab-bar.is-dark .liquid-drop-meniscus {
		opacity: 0.78;
		background: linear-gradient(
			90deg,
			rgba(138, 183, 255, 0) 0%,
			rgba(210, 228, 255, 0.85) 42%,
			rgba(210, 228, 255, 0.85) 58%,
			rgba(138, 183, 255, 0) 100%
		);
		box-shadow:
			0 2rpx 6rpx rgba(138, 183, 255, 0.35),
			0 -1rpx 4rpx rgba(40, 80, 160, 0.2);
	}

	.liquid-tab-bar.is-dark .liquid-drop-lens-ring {
		box-shadow:
			inset 0 0 40rpx rgba(4, 10, 28, 0.58),
			inset 0 0 18rpx rgba(138, 183, 255, 0.16),
			inset 0 10rpx 26rpx rgba(120, 170, 240, 0.12);
	}

	.liquid-tab-item {
		position: relative;
		z-index: 1;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		min-width: 0;
		padding: 0 4rpx;
	}

	.liquid-tab-icon {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 4rpx;
		opacity: 1;
		transition:
			transform 0.52s cubic-bezier(0.25, 0.82, 0.36, 1),
			opacity 0.28s ease;
	}

	.liquid-tab-item.is-active .liquid-tab-icon {
		transform: scale(1.06);
	}

	.liquid-tab-text {
		position: relative;
		z-index: 2;
		font-size: 20rpx;
		line-height: 1.2;
		color: #8fa196;
		font-weight: 500;
		transition:
			color 0.32s ease,
			transform 0.52s cubic-bezier(0.25, 0.82, 0.36, 1);
	}

	.liquid-tab-text.active {
		color: #4aa9fe;
		font-weight: 600;
		transform: translateY(-2rpx);
	}

	.liquid-tab-bar.is-dark .liquid-tab-text {
		color: #8c96a8;
	}

	.liquid-tab-bar.is-dark .liquid-tab-text.active {
		color: #8ab7ff;
	}

	/* 深色下 PNG 图标：未选中略压暗，与 theme.js 原生 tabBar 配色语义一致 */
	.liquid-tab-bar.is-dark .liquid-tab-item:not(.is-active) .liquid-tab-icon {
		opacity: 0.76;
	}

	.liquid-tab-bar.is-dark .liquid-tab-item.is-active .liquid-tab-icon {
		opacity: 1;
	}
</style>
