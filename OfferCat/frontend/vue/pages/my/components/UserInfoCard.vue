<template>
	<view class="BasicInfo" :class="themeClass" :key="animationKey">
		<view class="PageHeader">
			<!-- 页面标题区当前仅展示“我的”作为一级入口标识。 -->
			<view class="logo">我的</view>
			
		</view>
		<view class="UserInfo animate-float-up">
			<!-- 头像区支持跳转到资料编辑页。 -->
			<view class="Avatar animate-float-up" :style="{ animationDelay: '0s' }" @click="goToProfile">
				<view class="avatar">
					<CommonAvatar class="avatar-img" :src="avatarUrl" image-class="avatar-img" />
				</view>
			</view>
			<view class="Profile animate-float-up" :style="{ animationDelay: '0.05s' }">
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
			</view>
		</view>
		<view class="PersonalBio" v-if="userProfile.bio" @click="showBioPopup = true">
			<!-- 个人简介默认单行展示，点击后展开完整弹窗。 -->
			<text class="bio-text">{{ userProfile.bio }}</text>
		</view>

		<!-- 简介弹窗用于完整查看较长的个人介绍内容。 -->
		<view class="bio-popup-mask" v-if="showBioPopup" @click="showBioPopup = false">
			<view class="bio-popup-container" @click.stop>
				<view class="bio-popup-header">
					<text class="bio-popup-title">个人简介</text>
					<view class="bio-popup-close" @click="showBioPopup = false">×</view>
				</view>
				<view class="bio-popup-body">
					<text class="bio-popup-text">{{ userProfile.bio }}</text>
				</view>
			</view>
		</view>

		<view class="StatsBar animate-float-up" :style="{ animationDelay: '0.15s' }">
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
</template>
<script>
	import { getUserProfile, DEFAULT_AVATAR, DEFAULT_USER_PROFILE, USER_PROFILE_UPDATED_EVENT } from '@/utils/userProfile.js'
	import { getDashboardMetrics, ARCHIVE_DATA_UPDATED_EVENT } from '@/utils/archiveData.js'
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
			profileSummary() {
				// 将专业、毕业年份和求职状态压缩成一行摘要文案。
				return [this.userProfile.major, this.userProfile.graduationYear, this.userProfile.jobStatus].filter(Boolean).join(' · ')
			}
		},
		mounted() {
			// 首次挂载时分别加载用户资料和统计数据。
			this.loadUserInfo()
			this.refreshDashboardStats()
		},
		onShow() {
			// 页面重新展示时再次同步资料和统计，避免跨页修改后未刷新。
			this.loadUserInfo()
			this.refreshDashboardStats()
		},
		methods: {
			loadUserInfo() {
				// 从本地资料缓存回填头像、昵称、简介和期望标签信息。
				const user = getUserProfile()
				this.avatarUrl = user.avatar
				this.userProfile = {
					...this.userProfile,
					nickname: user.nickname,
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
			refreshDashboardStats() {
				// 读取成长档案聚合指标并映射成四项头部统计卡数据。
				const metrics = getDashboardMetrics()
				this.stats = [
					{ label: '简历优化', value: String(metrics.resumeCount), unit: '次' },
					{ label: '模拟面试', value: String(metrics.interviewCount), unit: '场' },
					{ label: '连续打卡', value: String(metrics.consecutiveDays), unit: '天' },
					{ label: '收藏题库', value: String(metrics.favoritesCount), unit: '个' }
				]
			},
			goToProfile() {
				// 点击头像后进入资料页继续编辑个人信息。
				uni.navigateTo({
					url: '/subPages/profile/profile'
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
		padding-top: var(--status-bar-height);
		min-height: calc(480rpx + var(--status-bar-height));
		border-radius: 0 0 90rpx 90rpx;
		border-bottom: 2rpx solid #f3fdff;
		background:
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
			padding: 15rpx 30rpx 0;

			.logo {
				height: 50rpx;
				color: #fff;
				font-weight: bold;
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
			padding: 30rpx 36rpx 0;
			
			.Avatar {
					flex-shrink: 0;
					width: 150rpx;
					height: 150rpx;
					padding: 8rpx;
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
				margin-left: 36rpx;
				padding-top: 12rpx;
				animation: slideInRight 0.8s ease-out 0.4s both;
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
					font-size: 50rpx;
					font-weight: 800;
					line-height: 1.1;
					color: #ffffff;
					text-shadow: 0 6rpx 20rpx rgba(38, 96, 189, 0.2);
					letter-spacing: 1rpx;
				}

				.Major {
					margin-top: 24rpx;

					.major {
						display: block;
						font-size: 26rpx;
						line-height: 1.4;
						color: rgba(255, 255, 255, 0.8);
						letter-spacing: 0.5rpx;
					}
				}

				.JobInfo {
					display: flex;
					flex-wrap: wrap;
					gap: 16rpx;
					margin-top: 24rpx;

					.jobInfo {
						padding: 12rpx 28rpx;
						border-radius: 999rpx;
						font-size: 20rpx;
						font-weight: 600;
						line-height: 1.2;
						color: #ffffff;
						background: rgba(255, 255, 255, 0.2);
						border: 2rpx solid rgba(255, 255, 255, 0.24);
						box-shadow: inset 0 2rpx 10rpx rgba(255, 255, 255, 0.16);
						backdrop-filter: blur(8rpx);
					}
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
			background-color: #ffffff;
			box-shadow: 0 24rpx 48rpx rgba(104, 155, 233, 0.18);
			overflow: hidden;
			animation: slideInUp 0.8s ease-out 0.6s both;
			backdrop-filter: blur(12rpx);
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
				border-right: 2rpx solid rgba(126, 159, 204, 0.12);

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
			background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
			box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.26);

			.statsBar {
				border-right-color: rgba(255, 255, 255, 0.08);

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
