<template>
	<view class="BasicInfo" :class="[themeClass, { 'is-guest': !isLoggedIn }]" :key="animationKey">
		<!-- 整卡蓝色渐变区背后的星系装饰，铺满 BasicInfo -->
		<!-- 矢量柔光星系：模板须与 stylesheet 中 galaxy-soft-* / galaxy-pin-star 对应 -->
		<view class="galaxy-backdrop">
			<view class="galaxy-soft-violet-wash"></view>
			<!-- 仅星点层缓慢呼吸明暗；天体球体不参与动画 -->
			<view class="galaxy-soft-stars-layer">
				<view class="galaxy-soft-stars-chunk galaxy-soft-stars-chunk--1"></view>
				<view class="galaxy-soft-stars-chunk galaxy-soft-stars-chunk--2"></view>
				<view class="galaxy-soft-stars-chunk galaxy-soft-stars-chunk--3"></view>
			</view>
			<view class="galaxy-soft-stars-fine-layer">
				<view class="galaxy-soft-stars-fine-chunk galaxy-soft-stars-fine-chunk--1"></view>
				<view class="galaxy-soft-stars-fine-chunk galaxy-soft-stars-fine-chunk--2"></view>
				<view class="galaxy-soft-stars-fine-chunk galaxy-soft-stars-fine-chunk--3"></view>
			</view>
			<view class="galaxy-soft-focus">
				<view class="galaxy-soft-orbits"></view>
				<view class="galaxy-soft-glow celestial-primary"></view>
			</view>
			<view class="galaxy-soft-glow celestial-secondary"></view>
			<view class="galaxy-pin-star pin-a"></view>
			<view class="galaxy-pin-star pin-b"></view>
			<view class="galaxy-pin-star pin-c"></view>
			<view class="galaxy-pin-star pin-d"></view>
			<view class="galaxy-pin-star pin-e"></view>
			<!-- 右上：小号恒星 + 点阵质感的卫星 -->
			<view class="galaxy-topcorner">
				<view class="galaxy-corner-sun-corona"></view>
				<view class="galaxy-corner-sun"></view>
				<view class="galaxy-dot-planet galaxy-dot-planet--a"></view>
				<view class="galaxy-dot-planet galaxy-dot-planet--b"></view>
				<view class="galaxy-dot-planet galaxy-dot-planet--c"></view>
			</view>
		</view>

		<view class="BasicInfo-content">
		<view class="PageHeader">
			<view class="logo">个人中心</view>
		</view>
		<view class="UserInfo animate-float-up">
			<!-- 头像区支持跳转到资料编辑页。 -->
			<view class="Avatar animate-float-up" :style="{ animationDelay: '0s' }" @click="goToProfile">
				<view class="avatar">
					<CommonAvatar class="avatar-img" :src="avatarUrl" image-class="avatar-img" />
				</view>
			</view>
			<view class="Profile animate-float-up" :style="{ animationDelay: '0.05s' }">
				<template v-if="isLoggedIn">
					<!-- 用户昵称、专业摘要和求职标签构成个人身份信息区。 -->
					<text class="Username">{{ userProfile.nickname }}</text>
					<view class="Major">
						<text class="major">
							{{ profileSummary }}
						</text>
					</view>
					<view class="JobInfo">
						<view class="jobInfo animate-float-up" v-for="(item, index) in tagList" 
						:key="index" :style="{ animationDelay: (0.1 + index * 0.033) + 's' }">
							{{item}}
						</view>
					</view>
				</template>
				<view v-else class="GuestState" @click="goToLogin">
					<text class="Username">未登录</text>
					<view class="Major">
						<text class="major">
							登录后查看个人资料、成长数据和个人主页
						</text>
					</view>
					<view class="login-entry">去登录</view>
				</view>
			</view>
		</view>
		<view v-if="isLoggedIn" class="PersonalBio" @click="showBioPopup = true">
			<!-- 个人简介默认单行展示，点击后展开完整弹窗。 -->
			<text class="bio-text">{{ userProfile.bio || '点击这里添加个人简介，展示更好的自己...' }}</text>
		</view>

		<view v-if="isLoggedIn" class="StatsBar animate-float-up" :style="{ animationDelay: '0.15s' }">
			<!-- 四项统计直接读取成长档案聚合数据，展示当前活跃度。 -->
			<view class="statsBar animate-float-up" v-for="(item,index) in stats" :key="item.label" :class="{ noBorder: index === 3 }" :style="{ animationDelay: (0.15 + index * 0.05) + 's' }">
				<view class="statsBar1">
					<text class="statsBar-value">{{ item.value }}</text>
					<text class="statsBar-unit">{{ item.unit }}</text>
				</view>
				<text class="statsBar-label">{{ item.label }}</text>
			</view>
		</view>
		</view>

		<!-- 简介弹窗用于完整查看较长的个人介绍内容。 -->
		<view class="bio-popup-mask" v-if="showBioPopup" @click="showBioPopup = false">
			<view class="bio-popup-container" @click.stop>
				<view class="bio-popup-header">
					<text class="bio-popup-title">个人简介</text>
					<view class="bio-popup-close" @click="showBioPopup = false">×</view>
				</view>
				<view class="bio-popup-body">
					<text class="bio-popup-text">{{ userProfile.bio || '暂无个人简介' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { getUserProfile, DEFAULT_AVATAR, DEFAULT_USER_PROFILE, USER_PROFILE_UPDATED_EVENT } from '@/utils/userProfile.js'
	import { getDashboardMetrics, ARCHIVE_DATA_UPDATED_EVENT, saveGrowthStats } from '@/utils/archiveData.js'
	import { getGrowthRecordStats } from '@/api/growth.js'
	import { resolveStoredStudentId, resolveStoredUserId, syncUserProfileFromServer, getUser } from '@/utils/user.js'
	import { QUESTION_HISTORY_UPDATED_EVENT } from '@/utils/questionHistory.js'
	import { QUESTION_FAVORITES_UPDATED_EVENT } from '@/utils/questionFavorites.js'
	import CommonAvatar from '@/components/CommonAvatar.vue'
	
	export default {
		name: 'UserInfoCard',
		components: {
			CommonAvatar
		},
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
				// 控制个人简介弹窗显隐，并维护头像、资料与统计展示数据。
				showBioPopup: false,
				avatarUrl: DEFAULT_AVATAR,
				userProfile: {
					nickname: DEFAULT_USER_PROFILE.nickname,
					school: DEFAULT_USER_PROFILE.school,
					idCard: DEFAULT_USER_PROFILE.idCard,
					major: DEFAULT_USER_PROFILE.major,
					graduationYear: DEFAULT_USER_PROFILE.graduationYear,
					jobStatus: DEFAULT_USER_PROFILE.jobStatus,
					bio: DEFAULT_USER_PROFILE.bio
				},
				tagList: [DEFAULT_USER_PROFILE.desiredPosition, DEFAULT_USER_PROFILE.desiredCity, DEFAULT_USER_PROFILE.expectedSalary].filter(Boolean),
				stats: [
					{ label: '简历优化', value: '0', unit: '次'},
					{ label: '模拟面试', value: '0', unit: '场'},
					{ label: '连续打卡', value: '0', unit: '天'},
					{ label: '收藏题库', value: '0', unit: '个'}
				]
			}
		},
		created() {
			// 监听资料、档案和题库事件，保证卡片信息始终和最新状态同步。
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(USER_PROFILE_UPDATED_EVENT, this.loadUserInfo)
				uni.$on(ARCHIVE_DATA_UPDATED_EVENT, this.refreshDashboardStats)
				uni.$on(QUESTION_HISTORY_UPDATED_EVENT, this.refreshDashboardStats)
				uni.$on(QUESTION_FAVORITES_UPDATED_EVENT, this.refreshDashboardStats)
			}
		},
		beforeDestroy() {
			// 兼容 Vue2 生命周期，销毁时清理全局事件监听。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.loadUserInfo)
				uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.refreshDashboardStats)
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.refreshDashboardStats)
				uni.$off(QUESTION_FAVORITES_UPDATED_EVENT, this.refreshDashboardStats)
			}
		},
		beforeUnmount() {
			// 兼容 Vue3 生命周期，销毁时清理全局事件监听。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.loadUserInfo)
				uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.refreshDashboardStats)
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.refreshDashboardStats)
				uni.$off(QUESTION_FAVORITES_UPDATED_EVENT, this.refreshDashboardStats)
			}
		},
		computed: {
			themeClass() {
				// 头部信息卡根据主题切换浅色/深色背景方案。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			isLoggedIn() {
				return resolveStoredUserId(getUser()) != null
			},
			profileSummary() {
				// 将专业和学校压缩成一行摘要文案，如果未填写则显示默认提示。
				const school = this.userProfile.school || '暂未填写学校'
				const major = this.userProfile.major || '暂未填写专业'
				const idCard = this.userProfile.idCard
				
				const infoList = [school, major]
				if (idCard) infoList.push(`学号${idCard}`)
				
				return infoList.join(' · ')
			}
		},
		mounted() {
			// 首次挂载时分别加载用户资料和统计数据。
			this.loadUserInfo()
			void this.refreshDashboardStats()
		},
		onShow() {
			// 页面重新展示时再次同步资料和统计，避免跨页修改后未刷新。
			this.loadUserInfo()
			void this.refreshDashboardStats()
		},
		methods: {
			async loadUserInfo() {
				if (!this.isLoggedIn) {
					this.avatarUrl = DEFAULT_AVATAR
					this.userProfile = {
						...this.userProfile,
						nickname: '',
						school: '',
						idCard: '',
						major: '',
						graduationYear: '',
						jobStatus: '',
						bio: ''
					}
					this.tagList = []
					return
				}
				await syncUserProfileFromServer({ timeout: 12000 })
				// 从本地资料缓存回填头像、昵称、简介和期望标签信息。
				const user = getUserProfile()
				this.avatarUrl = user.avatar
				this.userProfile = {
					...this.userProfile,
					nickname: user.nickname,
					school: user.school,
					idCard: user.idCard,
					major: user.major,
					graduationYear: user.graduationYear,
					jobStatus: user.jobStatus,
					bio: user.bio
				}

				const nextTagList = [user.desiredPosition, user.desiredCity, user.expectedSalary].filter(Boolean)
				if (nextTagList.length > 0) {
					this.tagList = nextTagList
				}
			},
			applyLocalDashboardStats() {
				// 接口不可用或缺少 studentId 时，回退到本地聚合（与档案页逻辑分开，易与库表不一致）。
				const metrics = getDashboardMetrics()
				this.stats = [
					{ label: '简历优化', value: String(metrics.resumeCount), unit: '次' },
					{ label: '模拟面试', value: String(metrics.interviewCount), unit: '场' },
					{ label: '连续打卡', value: String(metrics.consecutiveDays), unit: '天' },
					{ label: '收藏题库', value: String(metrics.favoritesCount), unit: '个' }
				]
			},
			async refreshDashboardStats() {
				if (!this.isLoggedIn) {
					this.stats = [
						{ label: '简历优化', value: '0', unit: '次' },
						{ label: '模拟面试', value: '0', unit: '场' },
						{ label: '连续打卡', value: '0', unit: '天' },
						{ label: '收藏题库', value: '0', unit: '个' }
					]
					return
				}
				// 与成长档案 `/growth/stats` 对齐：服务端可用 userId 反查 student_id，避免仅存 userId 时仍回退本地全 0。
				let studentId = resolveStoredStudentId()
				let userId = resolveStoredUserId(getUser())
				if (!studentId && !userId) {
					await syncUserProfileFromServer()
					studentId = resolveStoredStudentId()
					userId = resolveStoredUserId(getUser())
				}
				if (!studentId && !userId) {
					this.applyLocalDashboardStats()
					return
				}
				try {
					const res = await getGrowthRecordStats()
					const d = res && res.data
					if (!d || typeof d !== 'object') {
						this.applyLocalDashboardStats()
						return
					}
					const streak =
						d.continuousCheckinDays != null
							? d.continuousCheckinDays
							: d.consecutiveDays != null
								? d.consecutiveDays
								: 0
					saveGrowthStats({ consecutiveDays: Number(streak) || 0 })
					this.stats = [
						{ label: '简历优化', value: String(d.resumeCount ?? 0), unit: '次' },
						{ label: '模拟面试', value: String(d.interviewCount ?? 0), unit: '场' },
						{ label: '连续打卡', value: String(streak ?? 0), unit: '天' },
						{ label: '收藏题库', value: String(d.collectionCount ?? 0), unit: '个' }
					]
				} catch (e) {
					console.warn('[UserInfoCard] growth/stats 失败，使用本地统计', e)
					this.applyLocalDashboardStats()
				}
			},
			goToProfile() {
				// 未登录时头像点击跳转登录，已登录则进入个人主页。
				if (!this.isLoggedIn) {
					this.goToLogin()
					return
				}
				uni.navigateTo({
					url: '/subPages/userCard/userCard'
				})
			},
			goToLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			updateCheckInDays() {}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f8fafd; // 背景颜色
	}

	.template {
		background-color: #f8fafd;
	}

	.BasicInfo {
		position: relative;
		overflow: visible;
		padding-top: var(--status-bar-height);
		min-height: calc(480rpx + var(--status-bar-height));
		border-radius: 0 0 90rpx 90rpx;
		border-bottom: 2rpx solid #f3fdff;
		background:
			linear-gradient(
				118deg,
				rgba(170, 136, 255, 0.18) 0%,
				rgba(92, 130, 255, 0.1) 45%,
				rgba(40, 100, 220, 0.04) 100%
			),
			linear-gradient(
				180deg,
				rgba(1, 188, 255, 0.1) 0%,
				rgba(49, 101, 215, 0.4) 45%,
				rgba(0, 123, 255, 0.05) 100%
			),
			linear-gradient(
				180deg,
				rgba(0, 122, 252, 0.7) 0%,
				rgba(1, 188, 255, 0) 100%
			);
		opacity: 1;
		transform: translateY(0);
		padding-bottom: 40rpx;
	}

	.BasicInfo.is-guest {
		min-height: calc(310rpx + var(--status-bar-height));
		padding-bottom: 28rpx;

		.UserInfo {
			padding-top: 34rpx;
			padding-bottom: 8rpx;
			align-items: center;
		}

		.Profile {
			padding-top: 0;
		}

		.GuestState {
			justify-content: center;
		}

		.Major {
			margin-top: 10rpx;
		}

		.login-entry {
			margin-top: 20rpx;
		}
	}

	.BasicInfo-content {
		position: relative;
		z-index: 1;
	}

	.galaxy-backdrop {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
		overflow: hidden;
		border-radius: 0 0 90rpx 90rpx;
		pointer-events: none;
	}

	/* 插画感：左上偏紫 → 右下偏深蓝，与原蓝色底融合 */
	.galaxy-soft-violet-wash {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			118deg,
			rgba(168, 138, 255, 0.32) 0%,
			rgba(94, 128, 255, 0.18) 40%,
			rgba(36, 98, 220, 0.08) 78%,
			rgba(255, 255, 255, 0.03) 100%
		);
	}

	/* 渐变星与小颗 pin 星：慢速呼吸明暗；大天体 / 轨道仍为静态（无 animation） */
	@keyframes user-info-card-galaxy-breathe {
		0%, 100% {
			opacity: 0.48;
		}
		50% {
			opacity: 1;
		}
	}

	@keyframes user-info-card-galaxy-pin-breathe {
		0%, 100% {
			opacity: var(--pin-breathe-dim, 0.5);
		}
		50% {
			opacity: var(--pin-breathe-bright, 1);
		}
	}

	.galaxy-soft-stars-layer {
		position: absolute;
		inset: 0;
		opacity: 0.72;
		pointer-events: none;
	}

	.galaxy-soft-stars-chunk {
		position: absolute;
		inset: 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		animation: user-info-card-galaxy-breathe 5.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
		will-change: opacity;
	}

	.galaxy-soft-stars-chunk--1 {
		animation-duration: 5s;
		animation-delay: 0s;
		background-image:
			radial-gradient(3.8rpx 3.8rpx at 5.56% 27.94%, rgba(255, 252, 255, 0.88) 36%, transparent 62%),
			radial-gradient(4rpx 4rpx at 7.19% 14.4%, rgba(255, 252, 255, 0.78) 36%, transparent 62%),
			radial-gradient(2.8rpx 2.8rpx at 96.16% 29.08%, rgba(255, 252, 255, 0.76) 36%, transparent 62%),
			radial-gradient(3rpx 3rpx at 23.14% 42.92%, rgba(255, 252, 255, 0.68) 36%, transparent 62%);
	}

	.galaxy-soft-stars-chunk--2 {
		animation-duration: 6.4s;
		animation-delay: -2.05s;
		background-image:
			radial-gradient(3.8rpx 3.8rpx at 31.34% 31.21%, rgba(255, 252, 255, 0.87) 36%, transparent 62%),
			radial-gradient(4rpx 4rpx at 31.04% 83.33%, rgba(255, 252, 255, 0.92) 36%, transparent 62%),
			radial-gradient(3.5rpx 3.5rpx at 68.52% 47.57%, rgba(255, 252, 255, 0.8) 36%, transparent 62%),
			radial-gradient(4rpx 4rpx at 6.17% 7.26%, rgba(255, 252, 255, 0.88) 36%, transparent 62%);
	}

	.galaxy-soft-stars-chunk--3 {
		animation-duration: 7.6s;
		animation-delay: -4.85s;
		background-image:
			radial-gradient(2.8rpx 2.8rpx at 51.59% 15.44%, rgba(255, 252, 255, 0.82) 36%, transparent 62%),
			radial-gradient(3.5rpx 3.5rpx at 74.88% 16.18%, rgba(255, 252, 255, 0.85) 36%, transparent 62%),
			radial-gradient(4rpx 4rpx at 89.91% 37.58%, rgba(255, 252, 255, 0.72) 36%, transparent 62%),
			radial-gradient(3.2rpx 3.2rpx at 9.57% 39.11%, rgba(255, 252, 255, 0.74) 36%, transparent 62%);
	}

	.galaxy-soft-stars-fine-layer {
		position: absolute;
		inset: 0;
		opacity: 0.56;
		pointer-events: none;
	}

	.galaxy-soft-stars-fine-chunk {
		position: absolute;
		inset: 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		animation: user-info-card-galaxy-breathe 4.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
		will-change: opacity;
	}

	.galaxy-soft-stars-fine-chunk--1 {
		animation-duration: 4.2s;
		animation-delay: -0.48s;
		background-image:
			radial-gradient(2.5rpx 2.5rpx at 81.04% 81.46%, rgba(240, 248, 255, 0.62) 36%, transparent 62%),
			radial-gradient(2.2rpx 2.2rpx at 75.22% 31.02%, rgba(248, 252, 255, 0.68) 36%, transparent 62%),
			radial-gradient(2.5rpx 2.5rpx at 15.42% 12.54%, rgba(248, 252, 255, 0.68) 36%, transparent 62%),
			radial-gradient(2rpx 2rpx at 24.48% 4.79%, rgba(255, 255, 255, 0.72) 36%, transparent 62%),
			radial-gradient(2.5rpx 2.5rpx at 89.89% 27.88%, rgba(248, 252, 255, 0.74) 36%, transparent 62%),
			radial-gradient(2.2rpx 2.2rpx at 45.66% 47.24%, rgba(240, 248, 255, 0.64) 36%, transparent 62%),
			radial-gradient(2rpx 2rpx at 20.98% 71.7%, rgba(232, 244, 255, 0.72) 36%, transparent 62%),
			radial-gradient(2.2rpx 2.2rpx at 58.45% 6.65%, rgba(255, 255, 255, 0.66) 36%, transparent 62%);
	}

	.galaxy-soft-stars-fine-chunk--2 {
		animation-duration: 5.25s;
		animation-delay: -1.95s;
		background-image:
			radial-gradient(2.2rpx 2.2rpx at 40.21% 2.99%, rgba(248, 252, 255, 0.62) 36%, transparent 62%),
			radial-gradient(2.5rpx 2.5rpx at 84.14% 70.81%, rgba(232, 244, 255, 0.58) 36%, transparent 62%),
			radial-gradient(2.8rpx 2.8rpx at 54.63% 79.26%, rgba(255, 252, 255, 0.66) 36%, transparent 62%),
			radial-gradient(2.5rpx 2.5rpx at 14.37% 30.57%, rgba(232, 244, 255, 0.66) 36%, transparent 62%),
			radial-gradient(2rpx 2rpx at 64.93% 39.87%, rgba(255, 252, 255, 0.66) 36%, transparent 62%),
			radial-gradient(2.5rpx 2.5rpx at 47.26% 2.59%, rgba(232, 244, 255, 0.72) 36%, transparent 62%),
			radial-gradient(2rpx 2rpx at 75.7% 33.93%, rgba(255, 252, 255, 0.7) 36%, transparent 62%),
			radial-gradient(2rpx 2rpx at 12.46% 20.35%, rgba(228, 240, 255, 0.64) 36%, transparent 62%);
	}

	.galaxy-soft-stars-fine-chunk--3 {
		animation-duration: 6.1s;
		animation-delay: -3.55s;
		background-image:
			radial-gradient(2rpx 2rpx at 41.58% 37.37%, rgba(255, 252, 255, 0.66) 36%, transparent 62%),
			radial-gradient(2rpx 2rpx at 61.78% 11%, rgba(232, 244, 255, 0.7) 36%, transparent 62%),
			radial-gradient(2.8rpx 2.8rpx at 80.67% 56.39%, rgba(232, 244, 255, 0.69) 36%, transparent 62%),
			radial-gradient(2.8rpx 2.8rpx at 4.16% 42.26%, rgba(255, 252, 255, 0.67) 36%, transparent 62%),
			radial-gradient(2.8rpx 2.8rpx at 22.34% 45.15%, rgba(255, 252, 255, 0.62) 36%, transparent 62%),
			radial-gradient(2.8rpx 2.8rpx at 57.76% 87.66%, rgba(255, 252, 255, 0.62) 36%, transparent 62%);
	}

	/* 流体轨道 SVG + 主体柔光天体，靠右偏大，减少挡头像 */
	.galaxy-soft-focus {
		position: absolute;
		right: -40rpx;
		top: 8rpx;
		width: 580rpx;
		height: 580rpx;
		transform: rotate(-7deg);
	}

	.galaxy-soft-orbits {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.93;
		background-image: url('/static/png/icons/galaxy-soft-orbits.png');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: contain;
	}

	.galaxy-soft-glow {
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 50%;
		pointer-events: none;

		/* 参考图：左上高光 + #a9c9ff～#7ba7ed 通透冷蓝球体（无暖色） */
		&.celestial-primary {
			left: 50%;
			top: 51%;
			width: 140rpx;
			height: 140rpx;
			transform: translate(-48%, -47%);
			background:
				radial-gradient(circle at 22% 14%, rgba(255, 255, 255, 0.95) 0%, transparent 40%),
				radial-gradient(circle at 72% 76%, rgba(70, 120, 205, 0.22) 0%, transparent 48%),
				radial-gradient(
					circle at 46% 50%,
					#eaf2ff 0%,
					#a9c9ff 38%,
					#7ba7ed 72%,
					#6598e8 92%,
					rgba(90, 130, 210, 0.75) 100%
				);
			box-shadow:
				0 0 52rpx 22rpx rgba(200, 228, 255, 0.42),
				0 0 96rpx 40rpx rgba(155, 198, 255, 0.22);
			opacity: 0.93;
		}

		&.celestial-secondary {
			left: 11%;
			top: 24%;
			width: 52rpx;
			height: 52rpx;
			transform: translate(-50%, -50%);
			background:
				radial-gradient(circle at 26% 20%, rgba(255, 255, 255, 0.9) 0%, transparent 44%),
				radial-gradient(circle at 56% 60%, rgba(90, 130, 200, 0.16) 0%, transparent 50%),
				radial-gradient(circle at 50% 50%, #eaf2ff 0%, #b6d6ff 45%, rgb(137, 175, 234) 100%);
			box-shadow:
				0 0 26rpx 10rpx rgba(210, 232, 255, 0.35),
				0 0 48rpx 18rpx rgba(155, 195, 255, 0.18);
			opacity: 0.52;
		}
	}

	.galaxy-pin-star {
		position: absolute;
		border-radius: 50%;
		background: #ffffff;
		animation: user-info-card-galaxy-pin-breathe 5.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
		will-change: opacity;

		&.pin-a {
			width: 5rpx;
			height: 5rpx;
			left: 20%;
			top: 14%;
			box-shadow: 0 0 10rpx rgba(255, 255, 255, 0.4);
			--pin-breathe-dim: 0.62;
			--pin-breathe-bright: 0.94;
			animation-duration: 4.95s;
			animation-delay: 0s;
		}
		&.pin-b {
			width: 3rpx;
			height: 3rpx;
			left: 44%;
			top: 76%;
			box-shadow: 0 0 6rpx rgba(255, 255, 255, 0.28);
			--pin-breathe-dim: 0.4;
			--pin-breathe-bright: 0.72;
			animation-duration: 5.85s;
			animation-delay: -1.2s;
		}
		&.pin-c {
			width: 4rpx;
			height: 4rpx;
			left: 70%;
			top: 84%;
			box-shadow: 0 0 8rpx rgba(255, 255, 255, 0.22);
			--pin-breathe-dim: 0.32;
			--pin-breathe-bright: 0.58;
			animation-duration: 5.35s;
			animation-delay: -2.8s;
		}
		&.pin-d {
			width: 3rpx;
			height: 3rpx;
			left: 90%;
			top: 54%;
			box-shadow: 0 0 6rpx rgba(255, 255, 255, 0.2);
			--pin-breathe-dim: 0.28;
			--pin-breathe-bright: 0.52;
			animation-duration: 6.75s;
			animation-delay: -0.9s;
		}
		&.pin-e {
			width: 4rpx;
			height: 4rpx;
			left: 7%;
			top: 52%;
			box-shadow: 0 0 8rpx rgba(255, 255, 255, 0.18);
			--pin-breathe-dim: 0.26;
			--pin-breathe-bright: 0.5;
			animation-duration: 6.05s;
			animation-delay: -3.4s;
		}
	}

	/* 右上：仅恒星为暖色；点阵行星为冷蓝；位置略向左上收 */
	.galaxy-topcorner {
		position: absolute;
		right: 112rpx;
		top: calc(var(--status-bar-height, 0px) + 0rpx);
		width: 200rpx;
		height: 176rpx;
		pointer-events: none;
		z-index: 1;
		transform: translate(-48rpx, -18rpx);
	}

	.galaxy-corner-sun-corona {
		position: absolute;
		left: 50%;
		top: 32%;
		width: 120rpx;
		height: 120rpx;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 246, 220, 0.52) 0%, rgba(255, 220, 170, 0.14) 48%, transparent 74%);
		opacity: 0.82;
	}

	.galaxy-corner-sun {
		position: absolute;
		left: 50%;
		top: 32%;
		width: 36rpx;
		height: 36rpx;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background:
			radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 1) 0%, transparent 42%),
			radial-gradient(circle at 58% 58%, rgba(255, 220, 140, 0.35) 0%, transparent 52%),
			radial-gradient(circle at 50% 50%, rgba(255, 238, 200, 1) 0%, rgba(255, 185, 90, 0.92) 55%, rgba(255, 130, 40, 0.35) 100%);
		box-shadow:
			0 0 18rpx 6rpx rgba(255, 255, 255, 0.55),
			0 0 46rpx 14rpx rgba(255, 210, 150, 0.35),
			0 0 72rpx 22rpx rgba(255, 180, 100, 0.18);
		opacity: 0.96;
	}

	.galaxy-dot-planet {
		position: absolute;
		border-radius: 50%;
		overflow: hidden;
		opacity: 0.88;

		&--a {
			left: 6rpx;
			bottom: 18rpx;
			width: 38rpx;
			height: 38rpx;
			background-image:
				radial-gradient(2rpx 2rpx at 18% 22%, rgba(255, 255, 255, 0.95) 40%, transparent 55%),
				radial-gradient(1rpx 1rpx at 38% 16%, rgba(255, 255, 255, 0.75) 40%, transparent 55%),
				radial-gradient(2rpx 2rpx at 72% 24%, rgba(230, 244, 255, 0.9) 40%, transparent 55%),
				radial-gradient(1rpx 1rpx at 82% 38%, rgba(255, 255, 255, 0.55) 40%, transparent 55%),
				radial-gradient(2rpx 2rpx at 62% 68%, rgba(200, 228, 255, 0.85) 40%, transparent 55%),
				radial-gradient(1rpx 1rpx at 26% 78%, rgba(255, 255, 255, 0.6) 40%, transparent 55%),
				radial-gradient(2rpx 2rpx at 46% 48%, rgba(180, 210, 255, 0.7) 40%, transparent 55%),
				radial-gradient(1rpx 1rpx at 54% 86%, rgba(255, 255, 255, 0.5) 40%, transparent 55%),
				radial-gradient(circle at 28% 24%, rgba(255, 255, 255, 0.45) 0%, transparent 35%),
				radial-gradient(circle at 44% 46%, #eaf2ff 0%, #a9c9ff 45%, rgb(123, 167, 237) 100%);
			box-shadow: 0 0 14rpx rgba(170, 210, 255, 0.32);
		}

		&--b {
			right: -2rpx;
			top: 36rpx;
			width: 28rpx;
			height: 28rpx;
			background-image:
				radial-gradient(2rpx 2rpx at 24% 28%, rgba(255, 255, 255, 0.92) 40%, transparent 55%),
				radial-gradient(1rpx 1rpx at 76% 32%, rgba(232, 244, 255, 0.78) 40%, transparent 55%),
				radial-gradient(2rpx 2rpx at 56% 70%, rgba(220, 236, 255, 0.75) 40%, transparent 55%),
				radial-gradient(1rpx 1rpx at 14% 58%, rgba(255, 255, 255, 0.55) 40%, transparent 55%),
				radial-gradient(2rpx 2rpx at 48% 44%, rgba(200, 228, 255, 0.65) 40%, transparent 55%),
				radial-gradient(circle at 26% 22%, rgba(255, 255, 255, 0.42) 0%, transparent 32%),
				radial-gradient(circle at 50% 52%, #f2f7ff 0%, #aed3ff 48%, rgb(132, 172, 235) 100%);
			box-shadow: 0 0 12rpx rgba(170, 205, 255, 0.28);
			opacity: 0.85;
		}

		&--c {
			right: 40rpx;
			bottom: 36rpx;
			width: 22rpx;
			height: 22rpx;
			background-image:
				radial-gradient(2rpx 2rpx at 22% 30%, rgba(255, 255, 255, 0.9) 40%, transparent 55%),
				radial-gradient(1rpx 1rpx at 72% 24%, rgba(230, 242, 255, 0.78) 40%, transparent 55%),
				radial-gradient(2rpx 2rpx at 62% 66%, rgba(255, 255, 255, 0.52) 40%, transparent 55%),
				radial-gradient(1rpx 1rpx at 38% 70%, rgba(218, 234, 255, 0.65) 40%, transparent 55%),
				radial-gradient(circle at 24% 20%, rgba(255, 255, 255, 0.38) 0%, transparent 30%),
				radial-gradient(circle at 50% 54%, #f5f9ff 0%, rgb(208, 230, 255) 42%, rgb(149, 186, 240) 100%);
			box-shadow: 0 0 10rpx rgba(175, 210, 255, 0.26);
			opacity: 0.82;
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

		.PageHeader {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 15rpx 30rpx 0;

			.logo {
				height: 50rpx;
				line-height: 50rpx;
				color: #fff;
				font-weight: bold;
				text-shadow: 0 2rpx 12rpx rgba(24, 72, 140, 0.4);
			}

			.Info-Settings {
				display: flex;

				.Info {
					width: 50rpx;
					height: 50rpx;
					margin-right: 15rpx;
					border-radius: 50%;
					background-color: rgba(255, 255, 255, 0.4);
				}

				.Settings {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					background-color: rgba(255, 255, 255, 0.4);
				}
			}
		}

		.UserInfo {
			display: flex;
			align-items: center;
			padding: 24rpx 36rpx 0;
			
			.Avatar {
					flex-shrink: 0;
					width: 140rpx;
					height: 140rpx;
					padding: 6rpx;
					background-color: rgba(255, 255, 255, 0.5);
					border-radius: 50%;
					box-shadow: 0 16rpx 32rpx rgba(34, 97, 193, 0.15);
					animation: scaleIn 0.8s ease-out 0.2s both;
				}
			
			@keyframes scaleIn {
				from {
					opacity: 0;
					transform: scale(0.8);
				}
				to {
					opacity: 1;
					transform: scale(1);
				}
			}
				
				.avatar {
						position: relative;
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: transparent;
						
						.avatar-img {
							width: 100%;
							height: 100%;
							border-radius: 50%;
							display: block;
							overflow: hidden;
							background: rgba(255, 255, 255, 0.3);
						}
						
						.Level {
							position: absolute;
							left: 50%;
							bottom: -18rpx;
							transform: translateX(-6%);
							height: 35rpx;
							border: 4rpx solid rgba(255, 255, 255, 0.82);
							border-radius: 28rpx;
							background: linear-gradient(180deg, #ffe35a 0%, #ffc400 100%);
							line-height: 1;
							
							.level {
								display: block;
								padding: 0 10rpx;
								color: #fff;
								font-size: 22rpx;
								font-weight: 700;
								line-height: 35rpx;
							}
						}
				}
			}

			.Profile {
				flex: 1;
				min-width: 0;
				margin-left: 32rpx;
				padding-top: 6rpx;
				animation: slideInRight 0.8s ease-out 0.4s both;
			}

			.GuestState {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}
			
			@keyframes slideInRight {
				from {
					opacity: 0;
					transform: translateX(20rpx);
				}
				to {
					opacity: 1;
					transform: translateX(0);
				}
			}

				.Username {
					display: block;
					font-size: 46rpx;
					font-weight: 800;
					line-height: 1.2;
					color: #ffffff;
					text-shadow: 0 6rpx 20rpx rgba(38, 96, 189, 0.2);
					letter-spacing: 1rpx;
				}

				.Major {
					margin-top: 12rpx;

					.major {
						display: block;
						font-size: 24rpx;
						line-height: 1.4;
						color: rgba(255, 255, 255, 0.9);
						letter-spacing: 0.5rpx;
					}
				}

				.JobInfo {
					display: flex;
					flex-wrap: wrap;
					gap: 12rpx;
					margin-top: 16rpx;

					.jobInfo {
						padding: 8rpx 22rpx;
						border-radius: 999rpx;
						font-size: 22rpx;
						font-weight: 500;
						line-height: 1.2;
						color: #ffffff;
						background: rgba(255, 255, 255, 0.2);
						border: 2rpx solid rgba(255, 255, 255, 0.24);
						box-shadow: inset 0 2rpx 10rpx rgba(255, 255, 255, 0.16);
						backdrop-filter: blur(8rpx);
					}
				}

				.login-entry {
					margin-top: 18rpx;
					padding: 10rpx 24rpx;
					border-radius: 999rpx;
					font-size: 24rpx;
					font-weight: 600;
					line-height: 1.2;
					color: #3165d7;
					background: rgba(255, 255, 255, 0.92);
					box-shadow: 0 8rpx 18rpx rgba(34, 97, 193, 0.12);
				}

			.PersonalBio {
				margin: 32rpx 36rpx 0;
				padding: 20rpx 24rpx;
				border-radius: 24rpx;
				background: rgba(255, 255, 255, 0.1);
				border: 2rpx solid rgba(255, 255, 255, 0.15);
				backdrop-filter: blur(8rpx);
				opacity: 1;
				transform: translateY(0);
				will-change: transform, opacity;
			}

			.bio-text {
				display: block;
				font-size: 24rpx;
				line-height: 1.5;
				color: rgba(255, 255, 255, 0.85);
				text-align: center;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
		.bio-popup-mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.6);
			z-index: 999;
			display: flex;
			align-items: center;
			justify-content: center;
			animation: fadeIn 0.3s ease-out;
		}

		.bio-popup-container {
			width: 80%;
			background-color: #ffffff;
			border-radius: 24rpx;
			display: flex;
			flex-direction: column;
			box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
			overflow: hidden;
		}

		.bio-popup-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 40rpx;
			border-bottom: 2rpx solid #f0f0f0;

			.bio-popup-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}

			.bio-popup-close {
				font-size: 44rpx;
				color: #999999;
				line-height: 1;
				padding: 0 10rpx;
			}
		}

		.bio-popup-body {
			padding: 40rpx;
			max-height: 60vh;
			overflow-y: auto;
			box-sizing: border-box;

			.bio-popup-text {
				display: block;
				font-size: 28rpx;
				color: #666666;
				line-height: 1.6;
				text-align: justify;
				white-space: pre-wrap;
				word-break: break-all;
			}
		}
			
		

		.StatsBar {
			display: flex;
			flex-wrap: wrap;
			width: 92%;
			margin: 48rpx auto 0;
			border-radius: 48rpx;
			background: rgba(255, 255, 255, 0.38);
			border: 2rpx solid rgba(255, 255, 255, 0.52);
			box-shadow:
				0 24rpx 48rpx rgba(60, 110, 190, 0.14),
				inset 0 2rpx 0 rgba(255, 255, 255, 0.55);
			overflow: hidden;
			animation: slideInUp 0.8s ease-out 0.6s both;
			backdrop-filter: blur(24rpx) saturate(165%);
			-webkit-backdrop-filter: blur(24rpx) saturate(165%);
		}
		
		@keyframes slideInUp {
			from {
				opacity: 0;
				transform: translateY(30rpx);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

			.statsBar {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 24%;
				height: 160rpx;
				border-right: 2rpx solid rgba(255, 255, 255, 0.28);

				.statsBar1 {
					display: flex;
					align-items: baseline;
					gap: 6rpx;

					.statsBar-value {
						font-size: 58rpx;
						font-weight: 700;
						line-height: 1;
						color: #111111;
						font-feature-settings: 'tnum';
					}

					.statsBar-unit {
						font-size: 22rpx;
						color: #666666;
					}
				}

				.statsBar-label {
					margin-top: 20rpx;
					font-size: 20rpx;
					color: #556077;
					letter-spacing: 0.5rpx;
				}
			}

			.noBorder {
				border-right: none;
			}
		
	

	.BasicInfo.theme-dark {
		border-bottom-color: rgba(255, 255, 255, 0.04);
		background:
			linear-gradient(180deg, rgba(77, 108, 182, 0.38) 0%, rgba(35, 42, 63, 0.72) 50%, rgba(17, 18, 22, 0.96) 100%),
			linear-gradient(180deg, rgba(18, 22, 30, 0.98) 0%, rgba(18, 22, 30, 0.92) 100%);

		.galaxy-backdrop {
			.galaxy-soft-violet-wash {
				background: linear-gradient(
					118deg,
					rgba(120, 94, 200, 0.22) 0%,
					rgba(56, 78, 160, 0.12) 48%,
					rgba(18, 32, 90, 0.06) 100%
				);
			}
			.galaxy-soft-stars-layer {
				opacity: 0.76;
			}
			.galaxy-soft-stars-fine-layer {
				opacity: 0.62;
			}
			.galaxy-soft-glow.celestial-primary {
				opacity: 0.82;
				box-shadow:
					0 0 44rpx 16rpx rgba(255, 255, 255, 0.2),
					0 0 96rpx 40rpx rgba(130, 170, 255, 0.16);
			}
			.galaxy-soft-glow.celestial-secondary {
				opacity: 0.38;
			}
			.galaxy-soft-orbits {
				opacity: 0.82;
			}

			.galaxy-corner-sun,
			.galaxy-corner-sun-corona {
				opacity: 0.76;
			}
			.galaxy-corner-sun {
				box-shadow:
					0 0 14rpx 5rpx rgba(255, 255, 255, 0.28),
					0 0 38rpx 12rpx rgba(255, 200, 150, 0.18);
			}
			.galaxy-dot-planet {
				opacity: 0.72;
			}
		}

		.PersonalBio {
			background: rgba(255, 255, 255, 0.05);
			border: 2rpx solid rgba(255, 255, 255, 0.1);
		}

		.bio-text {
			color: rgba(255, 255, 255, 0.7);
		}

		.bio-popup-container {
			background-color: #23252b;
			border: 2rpx solid rgba(255, 255, 255, 0.08);

			.bio-popup-header {
				border-bottom-color: rgba(255, 255, 255, 0.08);

				.bio-popup-title {
					color: #f3f5f8;
				}

				.bio-popup-close {
					color: rgba(255, 255, 255, 0.5);
				}
			}

			.bio-popup-body {
				.bio-popup-text {
					color: rgba(255, 255, 255, 0.7);
				}
			}
		}

		.StatsBar {
			background: rgba(29, 31, 38, 0.42);
			border: 2rpx solid rgba(255, 255, 255, 0.14);
			box-shadow:
				0 18rpx 44rpx rgba(0, 0, 0, 0.22),
				inset 0 2rpx 0 rgba(255, 255, 255, 0.06);
			backdrop-filter: blur(22rpx) saturate(140%);
			-webkit-backdrop-filter: blur(22rpx) saturate(140%);

			.statsBar {
				border-right-color: rgba(255, 255, 255, 0.12);

				.statsBar1 {
					.statsBar-value,
					.statsBar-unit {
						color: #f3f5f8;
					}
				}

				.statsBar-label {
					color: rgba(255, 255, 255, 0.58);
				}
			}
		}
	}
</style>
