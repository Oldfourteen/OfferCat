<template>
	<view class="my-page" :class="themeClass" :key="refreshSeed">
		<UserInfoCard :theme="theme" />
		<JobTools :theme="theme" />
		<GrowthHub :theme="theme" />
		<SecuritySettings :theme="theme" />
	</view>
</template>
<script>
	import UserInfoCard from './components/UserInfoCard.vue'
	import JobTools from './components/JobTools.vue'
	import GrowthHub from './components/GrowthHub.vue'
	import SecuritySettings from './components/SecuritySettings.vue'
	import { applyTheme, getTheme } from '@/utils/theme.js'
	export default {
		components: {
			UserInfoCard,
			JobTools,
			GrowthHub,
			SecuritySettings
			
		},
		data() {
			return {
				theme: 'light',
				refreshSeed: 0
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		onShow() {
			this.theme = applyTheme(getTheme())
			this.refreshSeed += 1 // 每次进入页面更新 key，重新触发动效
			// 每次进入页面时滚动到顶部
			setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			}, 100)
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
