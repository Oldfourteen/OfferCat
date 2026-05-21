<template>
	<view class="job-tools" :class="themeClass" :key="animationKey">
		<view class="section-head animate-float-up">
			<view>
				<!-- 标题区概括该模块用于展示当前求职档案与行动入口。 -->
				<text class="section-title">我的档案</text>
			</view>
			<text class="section-link" @click="navigateToGrowth">查看更多</text>
		</view>

		<view class="hero-banner animate-float-up" :style="{ animationDelay: '0.04s' }">
			<!-- 顶部横幅突出今日主推任务和进入行动流的快捷按钮。 -->
			<view class="banner-copy">
				<text class="banner-title">Offer 冲刺计划</text>
				<text class="banner-desc">继续保持简历优化和AI模拟面试，优先推进一面机会。</text>
				<view class="banner-btn animate-float-up" :style="{ animationDelay: '0.1s' }" @click="startDailyTask">开始今日任务</view>
			</view>

			<view class="banner-art animate-float-up" :style="{ animationDelay: '0.1s' }">
				<image :src="bannerImageSrc" mode="aspectFit" style="width: 100%; height: 100%; border-radius: 18rpx;"></image>
			</view>
		</view>

		<view class="check-in-container animate-float-up" :style="{ animationDelay: '0.12s' }">
			<!-- 打卡区展示当周状态、累计天数和今日签到按钮。 -->
			<view class="check-in-header">
				<view class="check-in-title">
					<text>每日打卡</text>
					<text class="check-in-date">{{ currentDate }}</text>
				</view>
				<view class="check-in-stats">已累计打卡 {{ totalCheckIns }} 天</view>
			</view>
			
			<view class="check-in-week">
				<view 
					v-for="(day, index) in weekDays" 
					:key="index" 
					class="check-in-day animate-float-up"
					:class="{ 'checked': day.checked, 'today': day.isToday }"
					:style="{ animationDelay: (0.14 + index * 0.02) + 's' }"
				>
					<text class="day-name">{{ day.name }}</text>
					<view class="day-status">
						<text v-if="(day.isPast || day.isToday) && day.checked" class="status-check">✓</text>
						<text v-else-if="day.isPast || day.isToday" class="status-cross">✗</text>
					</view>
				</view>
			</view>
			
			<view class="check-in-footer">
				<text class="check-in-tip">坚持每日打卡，提升求职竞争力</text>
				<view 
					class="check-in-button" 
					:class="{ 'checked': todayChecked }"
					@click="checkIn"
				>
					<text v-if="todayChecked" class="button-text">今日已打卡</text>
					<text v-else class="button-icon">✓</text>
				</view>
			</view>
		</view>
		
		<view class="tool-grid">
			<!-- 四类档案卡片展示数量并承接对应详情页跳转。 -->
			<view v-for="(item, index) in tools" :key="item.name" class="tool-item animate-float-up" :class="{
				'resume-item': item.name === '我的简历',
				'interview-item': item.name === '面试记录',
				'certificate-item': item.name === '证书资质',
				'competition-item': item.name === '竞赛奖项'
			}" :style="{ animationDelay: (0.16 + index * 0.01) + 's' }" @click="handleToolClick(item)">
				<view class="tool-icon" :class="item.uiClass">
					<image v-if="item.icon && /^data:image|^\/|^https?:\/\//.test(item.icon)" :src="item.icon" class="tool-icon-img" mode="aspectFit" />
					<text v-else>{{ item.icon }}</text>
				</view>
				<text class="tool-name">{{ item.name }}</text>
				<text class="tool-meta">{{ dynamicValues[index] }}{{ item.unit }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getDashboardMetrics, ARCHIVE_DATA_UPDATED_EVENT, saveGrowthStats } from '@/utils/archiveData.js'
	import { QUESTION_HISTORY_UPDATED_EVENT } from '@/utils/questionHistory.js'
	import { QUESTION_FAVORITES_UPDATED_EVENT } from '@/utils/questionFavorites.js'
	import { getUser, resolveStoredStudentId, resolveStoredUserId, syncUserProfileFromServer } from '@/utils/user.js'
	import { getGrowthRecordStats, checkIn, getWeeklyCheckinStatus } from '@/api/growth.js'
	import { getApiBase } from '@/api/config.js'

	export default {
		name: "JobTools",
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			animationKey: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// tools 定义四类档案卡片的文案、图标与展示单位。
				tools: [
				{ name: '我的简历', value: '3', unit: '份', icon: '/static/png/inline/cce899885b29.png', uiClass: 'ui-1' },
				{ name: '面试记录', value: '0', unit: '场', icon: '/static/png/inline/f5494d218698.png', uiClass: 'ui-2' },
				{ name: '证书资质', value: '0', unit: '项', icon: '/static/png/inline/f63c2a85a7fb.png', uiClass: 'ui-3' },
				{ name: '竞赛奖项', value: '0', unit: '项', icon: '/static/png/inline/73eb345916c2.png', uiClass: 'ui-4' }
			],
				// dynamicValues 用于承接数字动画后的实时显示值。
				dynamicValues: [0, 0, 0, 0],
				// 当前日期、周打卡状态和累计天数共同驱动打卡组件展示。
				currentDate: '',
				weekDays: [],
				todayChecked: false,
				totalCheckIns: 0
			}
		},
		created() {
			// 监听档案和题库数据变化，实时更新卡片数量。
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(ARCHIVE_DATA_UPDATED_EVENT, this.syncToolValues)
				uni.$on(QUESTION_HISTORY_UPDATED_EVENT, this.syncToolValues)
				uni.$on(QUESTION_FAVORITES_UPDATED_EVENT, this.syncToolValues)
			}
		},
		beforeDestroy() {
			// 兼容 Vue2 生命周期，移除全局事件监听。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.syncToolValues)
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.syncToolValues)
				uni.$off(QUESTION_FAVORITES_UPDATED_EVENT, this.syncToolValues)
			}
		},
		beforeUnmount() {
			// 兼容 Vue3 生命周期，移除全局事件监听。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.syncToolValues)
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.syncToolValues)
				uni.$off(QUESTION_FAVORITES_UPDATED_EVENT, this.syncToolValues)
			}
		},
		mounted() {
			// 初次挂载时初始化打卡数据、同步档案数量并播放数字动画。
			void (async () => {
				await this.initCheckInData()
				await this.syncToolValues()
				this.animateValues()
			})()
		},
		methods: {
			startDailyTask() {
				// 今日任务入口直接带用户进入题库开始刷题。
				uni.navigateTo({
					url: '/subPages/questionBank/written'
				})
			},
			async initCheckInData() {
				// 生成本周七天的打卡视图，并同步今日状态与累计天数。
				const now = new Date()
				this.currentDate = `${now.getMonth() + 1}月${now.getDate()}日`
				
				// 生成一周的日期数据
				const weekNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				this.weekDays = []
				
				for (let i = 0; i < 7; i++) {
					const date = new Date(now)
					date.setDate(now.getDate() - (now.getDay() || 7) + i + 1)
					const dateStr = date.toISOString().split('T')[0]
					const todayStr = now.toISOString().split('T')[0]
					const isToday = dateStr === todayStr
					const isPast = dateStr < todayStr
					
					this.weekDays.push({
						name: weekNames[i],
						date: date.getDate(),
						isToday,
						isPast,
						checked: false
					})
				}

				// 今日状态和周打卡状态从后端获取
				await this.fetchCheckInData()
			},
			async fetchCheckInData() {
				let sid = resolveStoredStudentId()
				let uid = resolveStoredUserId(getUser())
				if (!sid && !uid) {
					await syncUserProfileFromServer()
					sid = resolveStoredStudentId()
					uid = resolveStoredUserId(getUser())
				}
				if (!sid && !uid) return
				try {
					const [statsRes, weeklyRes] = await Promise.all([
						getGrowthRecordStats(),
						getWeeklyCheckinStatus()
					])
					
					if (statsRes && statsRes.data) {
						const sd = statsRes.data
						this.todayChecked = sd.checkedInToday || false
						this.totalCheckIns = Number(sd.totalCheckinDays) || 0
						// 后端字段为 continuousCheckinDays（兼容旧误用 consecutiveDays）
						const streak =
							sd.continuousCheckinDays != null ? sd.continuousCheckinDays : sd.consecutiveDays
						if (streak !== undefined && streak !== null) {
							saveGrowthStats({ consecutiveDays: Number(streak) || 0 })
						}
					}
					
					if (weeklyRes && weeklyRes.data) {
						const weeklyStatus = weeklyRes.data
						this.weekDays = this.weekDays.map((day, index) => ({
							...day,
							checked: weeklyStatus[index] || false
						}))
					}
				} catch (error) {
					console.error('获取打卡数据失败:', error)
				}
			},
			async checkIn() {
				if (this.todayChecked) return
				
				try {
					const res = await checkIn()
					if (res && res.data) {
						this.todayChecked = true
						this.totalCheckIns = Number(res.data.totalCheckinDays) || this.totalCheckIns
						const streak = Number(res.data.continuousCheckinDays)
						if (Number.isFinite(streak)) {
							saveGrowthStats({ consecutiveDays: streak })
						}
						
						this.weekDays = this.weekDays.map(day => {
							if (day.isToday) {
								return { ...day, checked: true }
							}
							return day
						})
						
						uni.showToast({
							title: '打卡成功！',
							icon: 'success'
						})
						if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
							uni.$emit(ARCHIVE_DATA_UPDATED_EVENT)
						}
					}
				} catch (error) {
					console.error('打卡失败:', error)
					uni.showToast({
						title: '打卡失败',
						icon: 'error'
					})
				}
			},
			navigateToGrowth() {
				// 查看更多入口切到成长档案 tab。
				uni.switchTab({
					url: '/pages/GrowthArchive/GrowthArchive'
				})
			},
			async syncToolValues() {
				const metrics = getDashboardMetrics()
				let resumeCount = metrics.resumeCount
				let interviewCount = metrics.interviewCount
				let certificatesCount = 0
				let awardsCount = 0
				const canLoadGrowth =
					Boolean(resolveStoredStudentId()) || Boolean(resolveStoredUserId(getUser()))
				if (canLoadGrowth) {
					try {
						const res = await getGrowthRecordStats()
						const d = res && res.data
						if (d && typeof d === 'object') {
							if (d.resumeCount != null) resumeCount = Number(d.resumeCount) || 0
							if (d.interviewCount != null) interviewCount = Number(d.interviewCount) || 0
						}
					} catch (e) {
						console.warn('[JobTools] growth/stats 失败，使用本地聚合', e)
					}
					// 从后端获取证书资质和竞赛奖项的真实数据
					try {
						const studentId = resolveStoredStudentId()
						if (studentId) {
							const [certRes, awardRes] = await Promise.all([
								this.fetchArchiveCount('/api/student/profile/certificate/list', studentId),
								this.fetchArchiveCount('/api/student/profile/competition/list', studentId)
							])
							certificatesCount = certRes
							awardsCount = awardRes
						}
					} catch (e) {
						console.warn('[JobTools] 获取档案数量失败，使用本地数据', e)
						certificatesCount = metrics.archiveSummary.certificatesCount
						awardsCount = metrics.archiveSummary.awardsCount
					}
				} else {
					// 未登录时使用本地数据
					certificatesCount = metrics.archiveSummary.certificatesCount
					awardsCount = metrics.archiveSummary.awardsCount
				}
				const valueMap = {
					'我的简历': resumeCount,
					'面试记录': interviewCount,
					'证书资质': certificatesCount,
					'竞赛奖项': awardsCount
				}
				this.tools = this.tools.map(item => ({
					...item,
					value: String(valueMap[item.name] || 0)
				}))
				this.dynamicValues = this.tools.map(item => Number(item.value) || 0)
			},
			// 获取档案数量
			fetchArchiveCount(path, studentId) {
				return new Promise((resolve) => {
					uni.request({
						url: `${getApiBase()}${path}`,
						method: 'GET',
						data: { studentId },
						success: (res) => {
							if (res.statusCode === 200 && res.data && res.data.code === 200 && Array.isArray(res.data.data)) {
								resolve(res.data.data.length)
							} else {
								resolve(0)
							}
						},
						fail: () => {
							resolve(0)
						}
					})
				})
			},
			animateValues() {
				// 为每个工具项实现数字累加动画。
				this.tools.forEach((tool, index) => {
					this.animateItemValue(index)
				})
			},
			animateItemValue(index) {
				// 单个卡片从 0 逐步递增到目标值，提升统计展示的动效感。
				const tool = this.tools[index]
				const targetValue = parseInt(tool.value)
				let currentValue = 0
				const duration = 1500 // 动画持续时间（毫秒）
				const steps = 30 // 动画步数
				const stepValue = targetValue / steps
				const interval = duration / steps

				let step = 0
				const timer = setInterval(() => {
					step++
					currentValue = Math.floor(step * stepValue)
					this.dynamicValues[index] = currentValue

					if (step >= steps) {
						this.dynamicValues[index] = targetValue
						clearInterval(timer)
					}
				}, interval)
			},
			handleToolClick(item) {
				// 根据卡片名称跳转到档案、历史记录或对应管理页。
				const routeMap = {
					'我的简历': () => {
						uni.setStorageSync('growth_archive_scroll_target', 'resume')
						uni.switchTab({
							url: '/pages/GrowthArchive/GrowthArchive'
						})
					},
					'面试记录': () => {
						uni.navigateTo({
							url: '/subPages/questionBank/history?type=interview'
						})
					},
					'证书资质': () => {
						uni.navigateTo({
							url: '/subPages/archive/manage?type=certificates'
						})
					},
					'竞赛奖项': () => {
						uni.navigateTo({
							url: '/subPages/archive/manage?type=awards'
						})
					}
				}

				const handler = routeMap[item.name]
				if (handler) {
					handler()
				}
			}
		},
		computed: {
			themeClass() {
				// 档案模块根据主题切换浅色/深色背景方案。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			bannerImageSrc() {
				// 横幅插图按主题切换不同资源，保证深浅色对比度一致。
				return this.theme === 'dark' ? '/static/dark-offer-plan.png' : '/static/offer_plan.png'
			}
		},
	}
</script>

<style lang="scss">
	.job-tools {
		margin: 18rpx 15rpx 0;
		padding: 28rpx;
		border-radius: 32rpx;
		background: #ffffff;
		border: 1rpx solid rgba(67, 76, 210, 0.06);
		box-shadow:
			0 2rpx 10rpx rgba(15, 23, 42, 0.04),
			0 18rpx 42rpx rgba(67, 76, 210, 0.08);

		.section-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 20rpx;
		}

		.section-title {
			font-size: 40rpx;
			font-weight: 800;
			color: #24345b;
		}

		.section-link {
			flex-shrink: 0;
			font-size: 24rpx;
			font-weight: 700;
			color: #3165d7;
		}

		.hero-banner {
			margin-top: 24rpx;
			padding: 26rpx;
			border-radius: 28rpx;
			background: linear-gradient(135deg, #edf6ff 0%, #f6f9ff 48%, #eaf0ff 100%);
			border: 1rpx solid rgba(67, 76, 210, 0.08);
			box-shadow:
				0 2rpx 8rpx rgba(15, 23, 42, 0.05),
				0 10rpx 26rpx rgba(67, 76, 210, 0.07);
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 18rpx;
			overflow: hidden;
		}

		.banner-copy {
			flex: 1;
			min-width: 0;
		}

		.banner-tag {
			display: block;
			width: fit-content;
			padding: 8rpx 16rpx;
			border-radius: 999rpx;
			background: rgba(49, 101, 215, 0.12);
			font-size: 20rpx;
			font-weight: 700;
			color: #3165d7;
		}

		.banner-title {
			display: block;
			margin-top: 12rpx;
			font-size: 32rpx;
			font-weight: 700;
			color: #24345b;
			line-height: 1.3;
		}

		.banner-desc {
			display: block;
			margin-top: 10rpx;
			font-size: 22rpx;
			line-height: 1.5;
			color: #6b7a99;
		}

		.banner-btn {
			margin-top: 24rpx;
			width: fit-content;
			padding: 16rpx 32rpx;
			border-radius: 999rpx;
			background: linear-gradient(135deg, #3165d7, #1e40af);
			font-size: 22rpx;
			font-weight: 700;
			color: #ffffff;
			line-height: 1.3;
			box-shadow: 0 14rpx 28rpx rgba(74, 103, 247, 0.2);
		}

		.banner-art {
			position: relative;
			width: 170rpx;
			height: 166rpx;
			flex-shrink: 0;
			animation: fadeInUp 0.8s ease-out 0.8s both;
		}

		.art-card {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			border-radius: 18rpx;
			box-shadow: 0 12rpx 28rpx rgba(74, 103, 247, 0.18);
		}

		.card-one {
			top: 0;
			width: 120rpx;
			height: 80rpx;
			background: linear-gradient(135deg, #93c5fd, #60a5fa);
		}

		.card-two {
			top: 50rpx;
			width: 140rpx;
			height: 90rpx;
			background: linear-gradient(135deg, #a78bfa, #8b5cf6);
		}

		.card-three {
			top: 100rpx;
			width: 120rpx;
			height: 80rpx;
			background: linear-gradient(135deg, #f472b6, #ec4899);
		}

		.art-dot {
			position: absolute;
			border-radius: 50%;
		}

		.dot-big {
			top: 30rpx;
			right: 0;
			width: 24rpx;
			height: 24rpx;
			background: rgba(255, 255, 255, 0.6);
		}

		.dot-small {
			top: 80rpx;
			right: 20rpx;
			width: 18rpx;
			height: 18rpx;
			background: rgba(255, 255, 255, 0.4);
		}

		.tool-grid {
			margin-top: 24rpx;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 18rpx;
			width: 100%;
			box-sizing: border-box;
		}

		.tool-item {
			padding: 22rpx 12rpx 18rpx;
			border-radius: 24rpx;
			background: linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%);
			border: 2rpx solid rgba(67, 76, 210, 0.1);
			box-shadow:
				0 2rpx 8rpx rgba(15, 23, 42, 0.048),
				0 8rpx 20rpx rgba(67, 76, 210, 0.065);
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.tool-icon {
			width: 72rpx;
			height: 72rpx;
			border-radius: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-weight: 800;
			
			.tool-icon-img {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.ui-1 {
			background: rgba(59, 130, 246, 0.14);
			color: #3b82f6;
		}

		.ui-2 {
			background: rgba(249, 115, 22, 0.14);
			color: #f97316;
		}

		.ui-3 {
			background: rgba(139, 92, 246, 0.14);
			color: #8b5cf6;
		}

		.ui-4 {
			background: rgba(16, 185, 129, 0.14);
			color: #10b981;
		}

		.tool-name {
			margin-top: 16rpx;
			font-size: 24rpx;
			font-weight: 700;
			color: #24345b;
			line-height: 1.3;
		}

		.tool-meta {
			margin-top: 8rpx;
			font-size: 20rpx;
			color: #8a96af;
		}

		/* 每日打卡组件样式 */
		.check-in-container {
			margin-top: 24rpx;
			padding: 26rpx;
			border-radius: 32rpx;
			background: linear-gradient(135deg, rgba(255, 248, 235, 1) 0%, rgba(255, 255, 255, 1) 55%, rgba(245, 249, 255, 1) 100%);
			border: 1rpx solid rgba(245, 158, 11, 0.22);
			box-shadow:
				0 2rpx 10rpx rgba(15, 23, 42, 0.045),
				0 14rpx 34rpx rgba(245, 158, 11, 0.1);
			position: relative;
			overflow: hidden;
		}
		
		.check-in-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
		}
		
		.check-in-title {
			display: flex;
			align-items: center;
			gap: 12rpx;
			font-size: 30rpx;
			font-weight: 800;
			color: #2a385c;
		}
		
		.check-in-date {
			padding: 6rpx 16rpx;
			background: linear-gradient(135deg, #f59e0b, #fbbf24);
			color: #fff;
			border-radius: 20rpx;
			font-size: 22rpx;
			font-weight: 600;
			box-shadow: 0 10rpx 22rpx rgba(245, 158, 11, 0.22);
		}
		
		.check-in-stats {
			font-size: 22rpx;
			font-weight: 600;
			color: rgba(42, 56, 92, 0.72);
		}
		
		.check-in-week {
			display: grid;
			grid-template-columns: repeat(7, minmax(0, 1fr));
			gap: 12rpx;
			margin-bottom: 22rpx;
		}
		
		.check-in-day {
			flex: 1;
			padding: 18rpx 10rpx;
			background: rgba(255, 255, 255, 0.76);
			border-radius: 18rpx;
			border: 1rpx solid rgba(15, 23, 42, 0.06);
			box-shadow: 0 10rpx 22rpx rgba(15, 23, 42, 0.06);
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10rpx;
			position: relative;
			transition: all 0.3s ease;
		}
		
		.check-in-day.today {
			background: linear-gradient(180deg, rgba(245, 158, 11, 0.14), rgba(255, 255, 255, 0.78));
			border-color: rgba(245, 158, 11, 0.3);
			box-shadow:
				0 10rpx 22rpx rgba(15, 23, 42, 0.06),
				0 16rpx 38rpx rgba(245, 158, 11, 0.14);
		}
		
		.check-in-day.checked {
			background: linear-gradient(180deg, rgba(5, 150, 105, 0.18), rgba(255, 255, 255, 0.78));
			border-color: rgba(5, 150, 105, 0.32);
			box-shadow:
				0 10rpx 22rpx rgba(15, 23, 42, 0.06),
				0 16rpx 38rpx rgba(5, 150, 105, 0.16);
		}
		
		.day-name {
			font-size: 20rpx;
			color: rgba(42, 56, 92, 0.78);
			font-weight: 700;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		
		.day-status {
			width: 38rpx;
			height: 38rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			font-size: 22rpx;
			font-weight: 800;
			background: rgba(148, 163, 184, 0.14);
		}
		
		.status-check {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			color: #047857;
			background: rgba(5, 150, 105, 0.18);
		}
		
		.status-cross {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			color: #ef4444;
			background: rgba(239, 68, 68, 0.14);
		}
		
		.check-in-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.check-in-tip {
			font-size: 20rpx;
			color: rgba(42, 56, 92, 0.66);
			flex: 1;
		}
		
		.check-in-button {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background: linear-gradient(135deg, #f59e0b, #fbbf24);
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 32rpx;
			font-weight: bold;
			transition: all 0.3s ease;
			cursor: pointer;
			box-shadow:
				0 10rpx 22rpx rgba(245, 158, 11, 0.18),
				0 18rpx 40rpx rgba(245, 158, 11, 0.26);
		}
		
		.check-in-button:active {
			transform: scale(0.98);
		}
		
		.check-in-button.checked {
			width: auto;
			height: 60rpx;
			padding: 0 24rpx;
			border-radius: 30rpx;
			background: linear-gradient(135deg, #059669, #047857);
			font-size: 22rpx;
			box-shadow:
				0 10rpx 22rpx rgba(5, 150, 105, 0.22),
				0 18rpx 40rpx rgba(5, 150, 105, 0.2);
		}
		
		.button-text {
			font-weight: 600;
		}

		/* 深色模式 */
		&.theme-dark {
			background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
			border: 1rpx solid rgba(255, 255, 255, 0.06);
			box-shadow:
				0 3rpx 12rpx rgba(0, 0, 0, 0.3),
				0 18rpx 42rpx rgba(0, 0, 0, 0.22);

			.section-title,
			.tool-name,
			.banner-title {
				color: #f4f7fb;
			}

			.section-link,
			.banner-tag {
				color: #8ab7ff;
			}

			.banner-desc,
			.tool-meta {
				color: rgba(255, 255, 255, 0.58);
			}

			.hero-banner {
				background: linear-gradient(135deg, #2a3140 0%, #262b36 100%);
				border-color: rgba(255, 255, 255, 0.08);
				box-shadow:
					0 3rpx 12rpx rgba(0, 0, 0, 0.35),
					0 12rpx 36rpx rgba(0, 0, 0, 0.22);
			}

			.tool-item {
				background: linear-gradient(180deg, #2d3037 0%, #262930 100%);
				border-color: rgba(255, 255, 255, 0.08);
				box-shadow:
					0 3rpx 12rpx rgba(0, 0, 0, 0.32),
					0 10rpx 28rpx rgba(0, 0, 0, 0.18);
			}


			.banner-tag {
				background: rgba(90, 139, 255, 0.16);
			}
			
			/* 深色模式下的打卡组件 */
			.check-in-container {
				background: linear-gradient(135deg, rgba(45, 42, 37, 1) 0%, rgba(35, 33, 29, 1) 55%, rgba(28, 28, 30, 1) 100%);
				border-color: rgba(245, 158, 11, 0.28);
				box-shadow:
					0 3rpx 12rpx rgba(0, 0, 0, 0.34),
					0 12rpx 32rpx rgba(0, 0, 0, 0.2);
			}
			
			.check-in-title {
				color: #f4f7fb;
			}
			
			.check-in-stats {
				color: rgba(255, 255, 255, 0.58);
			}
			
			.check-in-day {
				background: rgba(255, 255, 255, 0.06);
				border-color: rgba(255, 255, 255, 0.08);
				box-shadow: 0 10rpx 22rpx rgba(0, 0, 0, 0.2);
			}
			
			.check-in-day.today {
				background: rgba(245, 158, 11, 0.2);
				border-color: rgba(245, 158, 11, 0.4);
			}
			
			.check-in-day.checked {
				background: linear-gradient(180deg, rgba(5, 150, 105, 0.24), rgba(255, 255, 255, 0.06));
				border-color: rgba(5, 150, 105, 0.26);
			}
			
			.day-name {
				color: rgba(238, 242, 248, 0.88);
			}
			
			.check-in-tip {
				color: rgba(255, 255, 255, 0.58);
			}
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30rpx) scale(0.8);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-20rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-float-up {
		animation: floatUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		animation-fill-mode: both;
	}

	@keyframes floatUp {
		from {
			opacity: 0;
			transform: translateY(60rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style> 
