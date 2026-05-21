<template>
	<view class="section-card" :class="themeClass">
		<view class="section-head">
			<text class="section-title">我的档案管理</text>
		</view>

		<view class="entry-grid">
			<!-- 四类档案入口展示类型说明和已录入数量。 -->
			<view v-for="item in entries" :key="item.type" class="entry-item" @click="openEntry(item)">
				<view class="entry-icon">
					<image v-if="item.iconSrc" :src="item.iconSrc" mode="aspectFit" style="width: 56rpx; height: 56rpx;" />
					<text v-else>{{ item.icon }}</text>
				</view>
				<text class="entry-title">{{ item.title }}</text>
				<text class="entry-desc">{{ item.desc }}</text>
				<view class="entry-count-badge">
					<text class="entry-count">已录入 {{ item.count }} 项</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
		import { getArchiveSummary, ARCHIVE_DATA_UPDATED_EVENT } from '@/utils/archiveData.js'
		import { getApiBase } from '@/api/config.js'
		import { getUser, resolveStoredStudentId } from '@/utils/user.js'

		export default {
			name: 'ArchiveManagerCard',
			props: {
				theme: {
					type: String,
					default: 'light'
				}
			},
			created() {
				// 进入页面先拉取四类档案数量，并监听档案更新事件。
				this.fetchEntryCounts()
				if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
					uni.$on(ARCHIVE_DATA_UPDATED_EVENT, this.fetchEntryCounts)
				}
			},
			beforeDestroy() {
				// 兼容 Vue2 生命周期，离开时移除事件监听。
				if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
					uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.fetchEntryCounts)
				}
			},
			beforeUnmount() {
				// 兼容 Vue3 生命周期，离开时移除事件监听。
				if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
					uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.fetchEntryCounts)
				}
			},
			computed: {
				themeClass() {
					// 根据主题切换档案管理模块的整体视觉风格。
					return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
				}
			},
			data() {
			return {
				// 档案入口的静态配置，数量字段会在运行时覆盖。
				entries: [
				{
					type: 'awards',
					iconSrc: '/static/png/inline/08f1e6569d36.png',
					title: '竞赛奖项',
					desc: '管理比赛经历，补充国家级/省级奖项',
					count: 0,
					iconClass: 'gold'
				},
					{
					type: 'certificates',
					iconSrc: '/static/png/inline/a49e46296dea.png',
					title: '证书资质',
					desc: '管理四六级、技能证书等',
					count: 0,
					iconClass: 'blue'
				},
					{
					type: 'projects',
					iconSrc: '/static/png/inline/be6ca109f204.png',
					title: '项目经历',
					desc: '管理课程项目、个人项目、开源项目',
					count: 0,
					iconClass: 'cyan'
				},
					{
					type: 'internships',
					iconSrc: '/static/png/inline/e8f02b4d2cdf.png',
					title: '实习经历',
					desc: '管理实习、实训、兼职工作经历',
					count: 0,
					iconClass: 'violet'
				}
				]
			}
		},
		methods: {
			applyLocalCounts() {
				// 本地汇总作为兜底，避免接口异常时计数全部为空。
				const summary = getArchiveSummary()
				const countMap = {
					awards: summary.awardsCount,
					certificates: summary.certificatesCount,
					projects: summary.projectsCount,
					internships: summary.internshipsCount
				}
				this.entries = this.entries.map(item => ({
					...item,
					count: countMap[item.type] || 0
				}))
			},
			fetchEntryCounts() {
				// 四类档案分开请求，全部返回后再一次性更新卡片数量。
				const user = getUser()
				const studentId = resolveStoredStudentId(user)
				console.log('[ArchiveManagerCard] studentId:', studentId, 'apiBase:', getApiBase())
				if (!studentId || !getApiBase()) {
					console.warn('[ArchiveManagerCard] 缺少studentId或apiBase，使用本地计数')
					this.applyLocalCounts()
					return
				}
				const paths = [
					{ type: 'awards', path: '/api/student/profile/competition/list' },
					{ type: 'certificates', path: '/api/student/profile/certificate/list' },
					{ type: 'projects', path: '/api/student/profile/project/list' },
					{ type: 'internships', path: '/api/student/profile/internship/list' }
				]
				const apiBase = getApiBase()
				const countMap = {}
				let done = 0
				paths.forEach(({ type, path }) => {
					uni.request({
						url: `${apiBase}${path}`,
						method: 'GET',
						data: { studentId },
						success: (res) => {
							if (res.statusCode === 200 && res.data && Array.isArray(res.data.data)) {
								countMap[type] = res.data.data.length
							} else {
								console.warn(`[ArchiveManagerCard] 获取${type}失败:`, res.statusCode, res.data)
							}
						},
						fail: (err) => {
							console.error(`[ArchiveManagerCard] 请求${type}失败:`, err)
						},
						complete: () => {
							done++
							if (done === paths.length) {
								this.entries = this.entries.map(item => ({
									...item,
									count: countMap[item.type] !== undefined ? countMap[item.type] : item.count
								}))
							}
						}
					})
				})
			},
			openEntry(item) {
				// 从四类档案管理页返回成长档案时，跳过当次的问卷引导弹窗（见 GrowthArchive.consumeArchiveManageReturnSkip）。
				const app = typeof getApp === 'function' ? getApp() : null
				if (app && app.globalData) {
					app.globalData.growthArchiveSkipAssessmentAfterManageNav = true
				}
				uni.navigateTo({
					url: `/subPages/archive/manage?type=${item.type}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.section-card {
		padding: 28rpx;
		border-radius: 30rpx;
		background: #ffffff;
		box-shadow: 0 12rpx 34rpx rgba(67, 76, 210, 0.06);
	}

	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		gap: 20rpx;
	}

	.section-title {
		font-size: 40rpx;
		font-weight: 800;
		color: #1f2937;
	}

	.section-link {
		font-size: 26rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.entry-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 18rpx;
	}

	.entry-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 24rpx;
		border-radius: 24rpx;
		background: linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%);
		border: 2rpx solid rgba(49, 101, 215, 0.1);
		box-shadow:
			0 10rpx 28rpx rgba(49, 101, 215, 0.12),
			0 4rpx 14rpx rgba(15, 23, 42, 0.06),
			0 1rpx 0 rgba(255, 255, 255, 0.85) inset;
	}

	.entry-icon {
		width: 72rpx;
		height: 72rpx;
		border-radius: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
	}

	.entry-icon.cyan {
		background: #eaf8ff;
	}

	.entry-icon.violet {
		background: #f2ecff;
	}

	.entry-title {
		display: block;
		margin-top: 18rpx;
		font-size: 30rpx;
		font-weight: 800;
		color: #24345b;
	}

	.entry-desc {
		display: block;
		margin-top: 10rpx;
		font-size: 22rpx;
		line-height: 1.5;
		color: #7f8ba3;
		min-height: 66rpx;
	}

	.entry-count-badge {
		margin-top: 16rpx;
		padding: 10rpx 20rpx;
		border-radius: 14rpx;
		border: 2rpx solid rgba(49, 101, 215, 0.35);
		box-shadow:
			0 6rpx 14rpx rgba(49, 101, 215, 0.12),
			0 2rpx 6rpx rgba(15, 23, 42, 0.08);
	}

	.entry-count {
		display: block;
		font-size: 22rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.section-card.theme-dark {
		background: #1d1f24;
		box-shadow: 0 12rpx 34rpx rgba(0, 0, 0, 0.2);
	}

	.section-card.theme-dark .section-title,
	.section-card.theme-dark .entry-title {
		color: #f4f7fb;
	}

	.section-card.theme-dark .entry-item {
		background: #23252b;
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow:
			0 10rpx 32rpx rgba(0, 0, 0, 0.45),
			0 4rpx 14rpx rgba(0, 0, 0, 0.25),
			0 1rpx 0 rgba(255, 255, 255, 0.06) inset;
	}

	.section-card.theme-dark .entry-desc,
	.section-card.theme-dark .entry-count {
		color: rgba(255, 255, 255, 0.58);
	}

	.section-card.theme-dark .entry-count-badge {
		border-color: rgba(148, 176, 255, 0.45);
		box-shadow:
			0 6rpx 16rpx rgba(0, 0, 0, 0.35),
			0 2rpx 6rpx rgba(0, 0, 0, 0.25);
	}
</style>
