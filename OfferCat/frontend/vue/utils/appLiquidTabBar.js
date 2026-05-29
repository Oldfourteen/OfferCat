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
		pagePath: 'pages/AI/AI',
		text: 'AI',
		icon: '/static/tabbar/ai.png',
		iconActive: '/static/tabbar/ai_active.png'
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

/** 从当前页面栈解析 Tab 下标，解析失败返回 -1 */
export function resolveLiquidTabIndexFromPages() {
	try {
		const pages = getCurrentPages()
		if (!pages.length) {
			return -1
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
			return -1
		}
		const idx = LIQUID_TAB_ITEMS.findIndex(
			(item) => normalizePageRoute(item.pagePath) === routeNorm
		)
		return idx >= 0 ? idx : -1
	} catch (e) {
		return -1
	}
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

/** 底栏选中态变更事件（globalData 非响应式，须配合 uni.$emit 驱动各页 AppLiquidTabBar 实例） */
export const LIQUID_TAB_BAR_SELECTED_EVENT = 'liquid-tab-bar-selected-change'

let _cachedSelectedIndex = -1

/** 读取当前应高亮的 Tab 下标（内存缓存 → globalData → 页面栈） */
export function getLiquidTabSelectedIndex() {
	if (_cachedSelectedIndex >= 0 && _cachedSelectedIndex < LIQUID_TAB_ITEMS.length) {
		return _cachedSelectedIndex
	}
	try {
		const app = getApp()
		const gd = app && app.globalData
		if (gd && typeof gd.tabBarSlideTo === 'number' && gd.tabBarSlideTo >= 0) {
			return gd.tabBarSlideTo
		}
		if (gd && typeof gd.tabBarMirrorIndex === 'number' && gd.tabBarMirrorIndex >= 0) {
			return gd.tabBarMirrorIndex
		}
	} catch (e) {
		// ignore
	}
	const routeIdx = resolveLiquidTabIndexFromPages()
	return routeIdx >= 0 ? routeIdx : 0
}

/**
 * 发布底栏选中下标并广播，供 switchTab 过渡与各页自定义底栏同步。
 * @param {number} index
 * @param {{ slideFrom?: number }} [options]
 */
export function publishLiquidTabSelectedIndex(index, options = {}) {
	if (typeof index !== 'number' || index < 0 || index >= LIQUID_TAB_ITEMS.length) {
		return
	}
	_cachedSelectedIndex = index
	commitTabBarMirrorIndex(index)
	const slideFrom = options.slideFrom
	if (typeof slideFrom === 'number' && slideFrom >= 0 && slideFrom !== index) {
		setTabBarSlideIntent(slideFrom, index)
	} else {
		clearTabBarSlideStartIndex()
	}
	if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
		uni.$emit(LIQUID_TAB_BAR_SELECTED_EVENT, { index, from: slideFrom })
	}
}

/** 根据 pagePath（与 LIQUID_TAB_ITEMS 一致）解析 Tab 下标 */
export function resolveLiquidTabIndexFromPath(pagePath) {
	const norm = normalizePageRoute(pagePath)
	if (!norm) {
		return -1
	}
	const idx = LIQUID_TAB_ITEMS.findIndex(
		(item) => normalizePageRoute(item.pagePath) === norm
	)
	return idx >= 0 ? idx : -1
}

/**
 * 切换 Tab 前先更新底栏高亮，避免等新页 onShow / 页面栈刷新才跟随。
 * @param {number} index
 * @param {{ onFail?: () => void }} [options]
 */
export function switchLiquidTab(index, options = {}) {
	const item = LIQUID_TAB_ITEMS[index]
	if (!item || typeof uni === 'undefined' || typeof uni.switchTab !== 'function') {
		return
	}
	const fromIndex = getLiquidTabSelectedIndex()
	publishLiquidTabSelectedIndex(index, { slideFrom: fromIndex })
	uni.switchTab({
		url: `/${item.pagePath}`,
		fail: () => {
			if (fromIndex >= 0) {
				publishLiquidTabSelectedIndex(fromIndex)
			}
			if (typeof options.onFail === 'function') {
				options.onFail()
			}
		}
	})
}

/** 按 pages.json 路径切换 Tab（如 pages/my/my） */
export function switchLiquidTabByPath(pagePath) {
	const idx = resolveLiquidTabIndexFromPath(pagePath)
	if (idx >= 0) {
		switchLiquidTab(idx)
	}
}

/**
 * 打开成长档案 Tab 页并指定顶部分段（0 成长档案 / 1 简历工坊 / 2 AI 画像）。
 * Tab 页实例会被缓存，须写入 globalData 供 onShow 恢复分段，避免仍停在上次的简历工坊。
 */
export function openGrowthArchiveTab(tabIndex = 0) {
	const tab = typeof tabIndex === 'number' ? tabIndex : 0
	const safeTab = tab >= 0 && tab <= 2 ? tab : 0
	try {
		const app = getApp()
		app.globalData = app.globalData || {}
		app.globalData.growthArchiveInitialTab = safeTab
	} catch (e) {
		// ignore
	}
	switchLiquidTabByPath('pages/GrowthArchive/GrowthArchive')
}
