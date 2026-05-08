<template>
	<view class="my-page" :class="themeClass">
		<UserInfoCard :theme="currentTheme" :animationKey="animationKey" />
		<JobTools :theme="currentTheme" :animationKey="animationKey" />
		<GrowthHub :theme="currentTheme" :animationKey="animationKey" />
		<SecuritySettings :theme="currentTheme" :animationKey="animationKey" />
	</view>
</template>
<script>
	import UserInfoCard from './components/UserInfoCard.vue'
	import JobTools from './components/JobTools.vue'
	import GrowthHub from './components/GrowthHub.vue'
	import SecuritySettings from './components/SecuritySettings.vue'
	import { applyTheme, getTheme } from '@/utils/theme.js'
	
	const SCROLL_KEY = 'MY_PAGE_SCROLL_TOP'
	
	export default {
		components: {
			UserInfoCard,
			JobTools,
			GrowthHub,
			SecuritySettings
			
		},
		data() {
			return {
				currentTheme: 'light',
				savedScrollTop: 0,
				shouldRestoreScroll: false,
				animationKey: 0
			}
		},
		computed: {
			themeClass() {
				return this.currentTheme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		onLoad() {
			this.currentTheme = applyTheme(getTheme())
			const saved = uni.getStorageSync(SCROLL_KEY)
			this.savedScrollTop = parseInt(saved) || 0
		},
		onShow() {
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
			uni.setStorageSync(SCROLL_KEY, String(this.savedScrollTop))
		},
		onPageScroll(e) {
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
	padding: 0rpx 0rpx 1rpx;
	box-sizing: border-box;
}

.my-page.theme-dark {
	background: linear-gradient(180deg, #111216 0%, #17181d 28%, #111216 100%);
}

</style>
