<template>
	<view class="hero-card" :class="themeClass">
		<view class="hero-copy">
			<!-- 标题区显示档案名称、重新评估入口和最近更新时间。 -->
			<view class="hero-header">
				<text class="hero-title">求职成长总览</text>
				<view class="re-evaluate-btn" @tap="handleRetakeSurvey">重新评估</view>
			</view>
			<text class="hero-subtitle">记录你的每一步进步</text>
			<view class="hero-date" v-if="radarData">已更新于 {{ formattedDate }}</view>
			<view class="hero-date" v-else>暂未生成成长档案</view>
		</view>

		<view class="stats-grid">
			<!-- 四项核心统计展示简历、面试、练习和收藏数据。 -->
			<view v-for="item in stats" :key="item.label" class="stat-item">
				<text class="stat-value">{{ item.value }}</text>
				<text class="stat-label">{{ item.label }}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import { getDashboardMetrics, ARCHIVE_DATA_UPDATED_EVENT } from '@/utils/archiveData.js'
	import { QUESTION_HISTORY_UPDATED_EVENT } from '@/utils/questionHistory.js'
	import { QUESTION_FAVORITES_UPDATED_EVENT } from '@/utils/questionFavorites.js'
	import { getGrowthRecordStats } from '@/api/growth.js'
	import { getUser, resolveStoredStudentId } from '@/utils/user.js'

	export default {
		name: 'ArchiveHeroCard',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			radarData: {
				type: Object,
				default: null
			}
		},
		data() {
			return {
				// 先用占位值兜底，等待本地或远端统计结果覆盖。
				stats: [
					{ label: '我的简历', value: '-' },
					{ label: '面试记录', value: '-' },
					{ label: '题库练习', value: '-' },
					{ label: '题库收藏', value: '-' }
				]
			}
		},
		created() {
			// 首次进入立即拉取统计，并监听档案与题库事件刷新概览数据。
			this.fetchStats()
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(ARCHIVE_DATA_UPDATED_EVENT, this.fetchStats)
				uni.$on(QUESTION_HISTORY_UPDATED_EVENT, this.fetchStats)
				uni.$on(QUESTION_FAVORITES_UPDATED_EVENT, this.fetchStats)
			}
		},
		beforeDestroy() {
			// 兼容 Vue2 生命周期，离开时取消事件监听。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.fetchStats)
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.fetchStats)
				uni.$off(QUESTION_FAVORITES_UPDATED_EVENT, this.fetchStats)
			}
		},
		beforeUnmount() {
			// 兼容 Vue3 生命周期，离开时取消事件监听。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.fetchStats)
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.fetchStats)
				uni.$off(QUESTION_FAVORITES_UPDATED_EVENT, this.fetchStats)
			}
		},
		computed: {
			themeClass() {
				// 根据主题切换总览卡片的浅色/深色背景。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			formattedDate() {
				// 同时兼容后端数组日期和 ISO 字符串日期。
				if (this.radarData && this.radarData.createTime) {
					const ct = this.radarData.createTime
					let year, month, day
					
					if (Array.isArray(ct)) {
						year = ct[0]
						month = String(ct[1]).padStart(2, '0')
						day = String(ct[2]).padStart(2, '0')
					} else if (typeof ct === 'string') {
						const dateObj = new Date(ct)
						if (!isNaN(dateObj.getTime())) {
							year = dateObj.getFullYear()
							month = String(dateObj.getMonth() + 1).padStart(2, '0')
							day = String(dateObj.getDate()).padStart(2, '0')
						}
					}
					
					if (year && month && day) {
						return `${year}-${month}-${day}`
					}
				}
				
				// Fallback to today's date if no valid radarData or createTime
				const today = new Date()
				const y = today.getFullYear()
				const m = String(today.getMonth() + 1).padStart(2, '0')
				const d = String(today.getDate()).padStart(2, '0')
				return `${y}-${m}-${d}`
			}
		},
		methods: {
			handleRetakeSurvey() {
				// 清除已评估标记后重新进入问卷，允许用户重做能力测评。
				const user = getUser()
				const userId = user && user.userId ? user.userId : (user ? user.id : null)
				if (userId) {
					// 清除前端已评估的缓存标记
					uni.removeStorageSync('has_submitted_radar_' + userId)
				}
				// 跳转到问卷页面
				uni.navigateTo({
					url: '/subPages/searchTest/searchTest'
				})
			},
			applyLocalStats() {
				// 网络不可用时回退到本地聚合数据，保证首页有可展示内容。
				const metrics = getDashboardMetrics()
				this.stats = [
					{ label: '我的简历', value: String(metrics.resumeCount) },
					{ label: '面试记录', value: String(metrics.interviewCount) },
					{ label: '题库练习', value: String(metrics.historyCount) },
					{ label: '题库收藏', value: String(metrics.favoritesCount) }
				]
			},
			async fetchStats() {
				// 与「我的」页一致：走 `getGrowthRecordStats`（带 Token、多网关前缀兜底），与雷达/成长档案是否已生成无关。
				const studentId = resolveStoredStudentId()
				if (!studentId) {
					this.applyLocalStats()
					return
				}
				try {
					const res = await getGrowthRecordStats()
					const d = res && res.data
					if (!d || typeof d !== 'object') {
						this.applyLocalStats()
						return
					}
					this.stats = [
						{ label: '我的简历', value: String(d.resumeCount ?? 0) },
						{ label: '面试记录', value: String(d.interviewCount ?? 0) },
						{ label: '题库练习', value: String(d.practiceCount ?? 0) },
						{ label: '题库收藏', value: String(d.collectionCount ?? 0) }
					]
				} catch (e) {
					console.warn('[ArchiveHeroCard] growth/stats 失败，使用本地统计', e)
					this.applyLocalStats()
				}
			}
		}
	}
</script>

<style lang="scss">
	.hero-card {
		margin-top: 40rpx;
		padding: 28rpx;
		border-radius: 32rpx;
		background: linear-gradient(135deg, #2299e8 0%, #5d76bd 60%);
		box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.2);
		color: #ffffff;

		.hero-copy {
			display: flex;
			flex-direction: column;

			.hero-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.hero-title {
				font-size: 40rpx;
				font-weight: 800;
			}

			.re-evaluate-btn {
				font-size: 24rpx;
				padding: 10rpx 24rpx;
				border-radius: 30rpx;
				background: rgba(255, 255, 255, 0.15);
				border: 2rpx solid rgba(255, 255, 255, 0.3);
				backdrop-filter: blur(4px);
				transition: all 0.2s;
			}

			.re-evaluate-btn:active {
				background: rgba(255, 255, 255, 0.25);
				transform: scale(0.95);
			}

			.hero-subtitle {
				margin-top: 10rpx;
				font-size: 26rpx;
				color: rgba(255, 255, 255, 0.8);
			}

			.hero-date {
				align-self: flex-start;
				margin-top: 22rpx;
				padding: 12rpx 20rpx;
				border-radius: 999rpx;
				font-size: 22rpx;
				background: linear-gradient(360deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
				border: 2rpx solid rgba(255, 255, 255, 0.2);
			}
		}

		.stats-grid {
			display: flex;
			gap: 20rpx;
			margin-top: 26rpx;
			> view {
			  flex: 1;
			}

			.stat-item {
				padding: 28rpx 20rpx;
				border-radius: 24rpx;
				background: linear-gradient(360deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
				border: 2rpx solid rgba(255, 255, 255, 0.2);
				display: flex;
				flex-direction: column;
				align-items: center;

				.stat-value {
					font-size: 54rpx;
					font-weight: 800;
				}

				.stat-label {
					margin-top: 10rpx;
					font-size: 22rpx;
					color: rgba(255, 255, 255, 0.85);
				}
			}
		}

	}

	.hero-card.theme-dark {
		background: linear-gradient(145deg, #20242d 0%, #1a1d24 35%, #14161b 100%);
		box-shadow: 0 18rpx 42rpx rgba(0, 0, 0, 0.22);
	}
</style>
