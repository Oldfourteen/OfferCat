<template>
	<view class="hero-card" :class="themeClass">
		<!-- 背景装饰 -->
		<view class="hero-bg-decor decor-1"></view>
		<view class="hero-bg-decor decor-2"></view>
		
		<view class="hero-content">
			<view class="hero-copy">
				<!-- 标题区显示档案名称、重新评估入口和最近更新时间。 -->
				<view class="hero-header">
					<view class="title-wrap">
						<text class="hero-title">求职成长总览</text>
						<text class="hero-subtitle">记录你的每一步进步</text>
					</view>
					<view class="re-evaluate-btn" @tap="handleRetakeSurvey">
						<text class="btn-text">重新评估</text>
						<text class="btn-icon">></text>
					</view>
				</view>
				
				<view class="hero-date" v-if="radarData">
					<text>已更新于 {{ formattedDate }}</text>
				</view>
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
	</view>
</template>

<script>
	import { getDashboardMetrics, ARCHIVE_DATA_UPDATED_EVENT } from '@/utils/archiveData.js'
	import { QUESTION_HISTORY_UPDATED_EVENT } from '@/utils/questionHistory.js'
	import { QUESTION_FAVORITES_UPDATED_EVENT } from '@/utils/questionFavorites.js'
	import { getGrowthRecordStats } from '@/api/growth.js'
	import { getUser, resolveStoredStudentId, resolveStoredUserId, syncUserProfileFromServer } from '@/utils/user.js'

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
			formatStatValue(value) {
				const n = Number(value)
				if (!Number.isFinite(n) || n <= 0) {
					return '0'
				}
				if (n > 99) {
					return '99+'
				}
				return String(Math.floor(n))
			},
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
					{ label: '我的简历', value: this.formatStatValue(metrics.resumeCount) },
					{ label: '面试记录', value: this.formatStatValue(metrics.interviewCount) },
					{ label: '题库练习', value: this.formatStatValue(metrics.historyCount) },
					{ label: '题库收藏', value: this.formatStatValue(metrics.favoritesCount) }
				]
			},
			async fetchStats() {
				// 与「我的」页一致：走 `getGrowthRecordStats`（带 Token、多网关前缀兜底），与雷达/成长档案是否已生成无关。
				let studentId = resolveStoredStudentId()
				let userId = resolveStoredUserId(getUser())
				if (!studentId && !userId) {
					await syncUserProfileFromServer()
					studentId = resolveStoredStudentId()
					userId = resolveStoredUserId(getUser())
				}
				if (!studentId && !userId) {
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
						{ label: '我的简历', value: this.formatStatValue(d.resumeCount) },
						{ label: '面试记录', value: this.formatStatValue(d.interviewCount) },
						{ label: '题库练习', value: this.formatStatValue(d.practiceCount) },
						{ label: '题库收藏', value: this.formatStatValue(d.collectionCount) }
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
		position: relative;
		margin-top: 40rpx;
		padding: 36rpx;
		border-radius: 36rpx;
		background: linear-gradient(135deg, #6b86c7 0%, #5b7bc0 100%);
		box-shadow: 0 20rpx 40rpx rgba(91, 123, 192, 0.25);
		color: #ffffff;
		overflow: hidden;

		/* 背景装饰元素，增加卡片深度 */
		.hero-bg-decor {
			position: absolute;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.1);
			filter: blur(20px);
			z-index: 0;
			pointer-events: none;
		}
		.decor-1 {
			width: 320rpx;
			height: 320rpx;
			top: -120rpx;
			right: -60rpx;
		}
		.decor-2 {
			width: 220rpx;
			height: 220rpx;
			bottom: -80rpx;
			left: -40rpx;
		}

		.hero-content {
			position: relative;
			z-index: 1;
		}

		.hero-copy {
			display: flex;
			flex-direction: column;

			.hero-header {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
			}
			
			.title-wrap {
				display: flex;
				flex-direction: column;
			}

			.hero-title {
				font-size: 44rpx;
				font-weight: 800;
				color: #ffffff;
				letter-spacing: 2rpx;
			}

			.hero-subtitle {
				margin-top: 10rpx;
				font-size: 26rpx;
				color: rgba(255, 255, 255, 0.85);
			}

			.re-evaluate-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 4rpx;
				font-size: 24rpx;
				font-weight: 500;
				/* 使用不对称 padding：上小下大，强行把文字视觉往上推 */
				padding: 8rpx 28rpx 14rpx;
				border-radius: 40rpx;
				background: rgba(255, 255, 255, 0.15);
				border: 2rpx solid rgba(255, 255, 255, 0.3);
				backdrop-filter: blur(8px);
				color: #ffffff;
				transition: all 0.2s ease;

				&:active {
					background: rgba(255, 255, 255, 0.25);
					transform: scale(0.96);
				}

				.btn-text {
					line-height: 1.2;
				}

				.btn-icon {
					font-size: 24rpx;
					line-height: 1.2;
					transform: translateY(-1rpx);
				}
			}

			.hero-date {
				display: inline-flex;
				align-items: center;
				gap: 8rpx;
				align-self: flex-start;
				margin-top: 24rpx;
				padding: 10rpx 24rpx;
				border-radius: 40rpx;
				font-size: 22rpx;
				background: rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(4px);
				color: rgba(255, 255, 255, 0.95);
			}
		}

		.stats-grid {
			display: flex;
			gap: 16rpx;
			margin-top: 36rpx;

			.stat-item {
				flex: 1;
				padding: 24rpx 0;
				border-radius: 24rpx;
				background: rgba(255, 255, 255, 0.12);
				border: 2rpx solid rgba(255, 255, 255, 0.2);
				backdrop-filter: blur(10px);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				transition: transform 0.2s ease;

				&:active {
					transform: translateY(4rpx);
				}

				.stat-value {
					font-size: 48rpx;
					font-weight: 800;
					color: #ffffff;
					line-height: 1.2;
					font-family: 'DIN Alternate', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
				}

				.stat-label {
					margin-top: 8rpx;
					font-size: 22rpx;
					color: rgba(255, 255, 255, 0.9);
					white-space: nowrap; /* 保证文字不换行 */
					font-weight: 500;
				}
			}
		}

	}

	.hero-card.theme-dark {
		background: linear-gradient(135deg, #1C2230 0%, #252D40 100%);
		box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.4);

		.hero-bg-decor {
			background: rgba(255, 255, 255, 0.03);
		}

		.hero-title,
		.stat-value {
			color: #f4f7fb;
		}

		.hero-subtitle,
		.stat-label {
			color: rgba(255, 255, 255, 0.78);
		}

		.re-evaluate-btn {
			color: #f4f7fb;
			background: rgba(255, 255, 255, 0.08);
			border-color: rgba(255, 255, 255, 0.15);
		}
		
		.hero-date {
			background: rgba(0, 0, 0, 0.25);
			color: rgba(255, 255, 255, 0.85);
		}

		.stats-grid .stat-item {
			background: rgba(255, 255, 255, 0.06);
			border-color: rgba(255, 255, 255, 0.1);
		}
	}
</style>
