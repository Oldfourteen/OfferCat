// 自定义底部 Tab 配置（须与 pages.json 中 tabBar.list 顺序、路径一致）

/**
 * 统一路由字符串：App/小程序里可能出现全小写（如 pages/ai/ai），与 pages.json 大小写不一致；
 * 去掉开头的 / 与 query，用于和 LIQUID_TAB_ITEMS[].pagePath 对齐。
 */
export function normalizePageRoute(route) {
	if (!route || typeof route !== 'string') {
		return ''
	}
	const pathOnly = route.split('?')[0].split('#')[0]
	return pathOnly.replace(/^\//, '').trim().toLowerCase()
}

export const LIQUID_TAB_ITEMS = [
	{
		pagePath: 'pages/index/index',
		text: '首页',
		icon: '/static/tabbar/home.png',
		iconActive: '/static/tabbar/home_active.png'
	},
	{
		pagePath: 'pages/GrowthArchive/GrowthArchive',
		text: '档案',
		icon: '/static/tabbar/archive.png',
		iconActive: '/static/tabbar/archive_active.png'
	},
	{
		pagePath: 'pages/forum/index',
		text: '论坛',
		icon: '/static/tabbar/forum.png',
		iconActive: '/static/tabbar/forum_active.png'
	},
	{
		pagePath: 'pages/my/my',
		text: '我的',
		icon: '/static/tabbar/my.png',
		iconActive: '/static/tabbar/my_active.png'
	},
	{
		pagePath: 'pages/AI/AI',
		text: 'AI',
		icon: '/static/tabbar/ai.png',
		iconActive: '/static/tabbar/ai_active.png'
	}
]

// 与 AppLiquidTabBar 主栏高度（图标 + 文案 + 上下留白）对齐，用于页面底部避让
export const LIQUID_TAB_BAR_INNER_UPX = 116

export function getLiquidTabBarOverlapPx() {
	let safe = 0
	try {
		const si = uni.getSystemInfoSync()
		safe = (si.safeAreaInsets && si.safeAreaInsets.bottom) || 0
	} catch (e) {
		safe = 0
	}
	const inner =
		typeof uni !== 'undefined' && typeof uni.upx2px === 'function'
			? uni.upx2px(LIQUID_TAB_BAR_INNER_UPX)
			: 58
	return inner + safe
}

export function hideNativeTabBar() {
	if (typeof uni === 'undefined' || typeof uni.hideTabBar !== 'function') {
		return
	}
	try {
		uni.hideTabBar({ animation: false })
	} catch (e) {
		// 非 Tab 页或未就绪时忽略
	}
}

/** switchTab 前写入滑动意图：起点 + 终点（均用 tab 下标），不依赖下一帧 route 解析，避免缓存页栈顶未及时更新时动画被跳过 */
export function setTabBarSlideIntent(fromIndex, toIndex) {
	try {
		const app = getApp()
		app.globalData = app.globalData || {}
		app.globalData.tabBarAnimFrom = fromIndex
		app.globalData.tabBarSlideTo = toIndex
	} catch (e) {
		// ignore
	}
}

/** @deprecated 请使用 setTabBarSlideIntent(from, to)；仅写起点时终点依赖 route，缓存场景易丢动画 */
export function setTabBarSlideStartIndex(index) {
	try {
		const app = getApp()
		app.globalData = app.globalData || {}
		app.globalData.tabBarAnimFrom = index
	} catch (e) {
		// ignore
	}
}

export function clearTabBarSlideStartIndex() {
	try {
		const app = getApp()
		if (!app.globalData) {
			return
		}
		delete app.globalData.tabBarAnimFrom
		delete app.globalData.tabBarSlideTo
	} catch (e) {
		// ignore
	}
}

/** 水块落定后的索引，用于减少换页实例不一致时的跳动（仅辅助，仍以 route 为准） */
export function commitTabBarMirrorIndex(index) {
	try {
		const app = getApp()
		app.globalData = app.globalData || {}
		app.globalData.tabBarMirrorIndex = index
	} catch (e) {
		// ignore
	}
}
