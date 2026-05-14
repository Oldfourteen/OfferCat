import { hideNativeTabBar } from '@/utils/appLiquidTabBar.js'

// Tab 页混入：隐藏原生 tabBar，并在每次 Tab 页显示时通知自定义底栏同步（含镜面滑动过渡）
export default {
	onShow() {
		hideNativeTabBar()
		if (typeof this.$nextTick === 'function') {
			this.$nextTick(() => {
				if (typeof requestAnimationFrame === 'function') {
					requestAnimationFrame(() => {
						requestAnimationFrame(() => {
							if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
								uni.$emit('liquid-tab-bar-sync')
							}
						})
					})
				} else if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
					uni.$emit('liquid-tab-bar-sync')
				}
			})
		} else if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
			uni.$emit('liquid-tab-bar-sync')
		}
	}
}
