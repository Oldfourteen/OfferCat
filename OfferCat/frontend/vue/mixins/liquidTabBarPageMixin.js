import {
	hideNativeTabBar,
	resolveLiquidTabIndexFromPages,
	publishLiquidTabSelectedIndex
} from '@/utils/appLiquidTabBar.js'

// Tab 页混入：隐藏原生 tabBar，并在显示时同步底栏选中态（供 switchTab 过渡使用）
export default {
	onShow() {
		hideNativeTabBar()
		const idx = resolveLiquidTabIndexFromPages()
		if (idx >= 0) {
			publishLiquidTabSelectedIndex(idx)
		}
	}
}
