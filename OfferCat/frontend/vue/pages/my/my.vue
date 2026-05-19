<template>
	<view class="my-page" :class="themeClass">
		<!-- 顶部信息卡展示头像、简介和个人成长统计。 -->
		<UserInfoCard :theme="currentTheme" :animationKey="animationKey" />
		<!-- 个人空间区收纳好友、名片、互动消息和收藏入口。 -->
		<PersonalSpace :theme="currentTheme" :animationKey="animationKey" />
		<!-- 档案区聚合今日任务、打卡和四类核心档案入口。 -->
		<JobTools :theme="currentTheme" :animationKey="animationKey" />
		<!-- 成长区承接成长档案、复盘、收藏等延展入口。 -->
		<GrowthHub :theme="currentTheme" :animationKey="animationKey" />
		<!-- 设置区统一收纳帮助、资料编辑和系统设置入口。 -->
		<SecuritySettings :theme="currentTheme" :animationKey="animationKey" />
		<AppLiquidTabBar tab-page-path="pages/my/my" :theme="currentTheme" />
	</view>
</template>
<script>
	import UserInfoCard from './components/UserInfoCard.vue'
	import JobTools from './components/JobTools.vue'
	import GrowthHub from './components/GrowthHub.vue'
	import PersonalSpace from './components/PersonalSpace.vue'
	import SecuritySettings from './components/SecuritySettings.vue'
	import AppLiquidTabBar from '@/components/AppLiquidTabBar.vue'
	import liquidTabBarPageMixin from '@/mixins/liquidTabBarPageMixin.js'
	import { applyTheme, getTheme } from '@/utils/theme.js'
	import { getToken } from '@/utils/token.js'
	import { getUser, resolveStoredStudentId, syncUserProfileFromServer } from '@/utils/user.js'
	
	const SCROLL_KEY = 'MY_PAGE_SCROLL_TOP'
	
	export default {
		mixins: [liquidTabBarPageMixin],
		components: {
			AppLiquidTabBar,
			// 我的页由四个功能卡片自上而下拼装组成。
			UserInfoCard,
			JobTools,
			GrowthHub,
			PersonalSpace,
			SecuritySettings
			
		},
		data() {
			return {
				// 当前主题决定整页背景和子组件配色透传。
				currentTheme: 'light',
				// 记录离开页面时的滚动位置，便于返回时恢复阅读上下文。
				savedScrollTop: 0,
				shouldRestoreScroll: false,
				// 通过递增 key 触发子组件重新播放入场动画。
				animationKey: 0
			}
		},
		computed: {
			themeClass() {
				// 根节点根据主题切换浅色/深色背景。
				return this.currentTheme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		onLoad() {
			// 首次进入时同步全局主题，并读取上次离开时保存的滚动位置。
			this.currentTheme = applyTheme(getTheme())
			const saved = uni.getStorageSync(SCROLL_KEY)
			this.savedScrollTop = parseInt(saved) || 0
		},
		onShow() {
			if (getToken() && getUser() && !resolveStoredStudentId()) {
				void syncUserProfileFromServer()
			}
			// 每次回到我的页先同步最新主题，再重播卡片动画并恢复滚动位置。
			this.currentTheme = applyTheme(getTheme())
			this.animationKey += 1
			
			if (this.savedScrollTop > 0) {
				this.shouldRestoreScroll = true
				setTimeout(() => {
					if (this.shouldRestoreScroll) {
						uni.pageScrollTo({
							scrollTop: this.savedScrollTop,
							duration: 0
						})
					}
				}, 30)
			}
		},
		onHide() {
			// 页面离开时持久化当前滚动位置，供下次恢复。
			uni.setStorageSync(SCROLL_KEY, String(this.savedScrollTop))
		},
		onPageScroll(e) {
			// 实时记录滚动高度；一旦用户手动滚动就取消待恢复状态。
			this.savedScrollTop = e.scrollTop
			this.shouldRestoreScroll = false
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.my-page {
	min-height: 100vh;
	background: #F8FAFD;
	padding: 0rpx 0rpx calc(1rpx + 116rpx + env(safe-area-inset-bottom));
	box-sizing: border-box;
}

.my-page.theme-dark {
	background: linear-gradient(180deg, #111216 0%, #17181d 28%, #111216 100%);
}

</style>
