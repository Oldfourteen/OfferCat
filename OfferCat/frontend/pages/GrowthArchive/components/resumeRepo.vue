<template>
	<view class="resume-card resume-repo" :class="themeClass" @click="handleManage">
		<view class="card-content">
			<view class="text-content">
				<text class="title">简历仓库</text>
				<text class="subtitle">统一管理已制作/上传的简历</text>
				<view class="stats">
					<text class="stat-item">总简历数 <text class="stat-num">{{ resumeCount }}</text></text>
				</view>
			</view>
			<view class="icon-wrap">
				<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDEzMTE2MTQ3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwNDk1NiIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik01OTcuMzMzMzMzIDg1My4zMzMzMzN2ODUuMzMzMzM0aDIxMy4zMzMzMzRhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMSAwIDg1LjMzMzMzM2gtNTk3LjMzMzMzNGE0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxIDAtODUuMzMzMzMzSDQyNi42NjY2Njd2LTg1LjMzMzMzNEg4NS4zMzMzMzNhODUuMzMzMzMzIDg1LjMzMzMzMyAwIDAgMS04NS4zMzMzMzMtODUuMzMzMzMzVjg1LjMzMzMzM2E4NS4zMzMzMzMgODUuMzMzMzMzIDAgMCAxIDg1LjMzMzMzMy04NS4zMzMzMzNoODUzLjMzMzMzNGE4NS4zMzMzMzMgODUuMzMzMzMzIDAgMCAxIDg1LjMzMzMzMyA4NS4zMzMzMzN2NjgyLjY2NjY2N2E4NS4zMzMzMzMgODUuMzMzMzMzIDAgMCAxLTg1LjMzMzMzMyA4NS4zMzMzMzNINTk3LjMzMzMzM3ogbTE2My4yNDI2NjctNDQ0Ljg0MjY2Nkw1MjMuOTQ2NjY3IDE4OC4wNzQ2NjdjLTEuODc3MzMzLTEuOTYyNjY3LTMuNTg0LTMuODQtNS4yOTA2NjctMy44NC03LjA4MjY2Ny0zLjc1NDY2Ny0xNS45NTczMzMtMS44NzczMzMtMjMuMDQgNS43MTczMzNMMjYyLjQgNDA4LjQ5MDY2N2MtNy4wODI2NjcgNS43MTczMzMtOC44NzQ2NjcgMTcuMDY2NjY3LTEuNzA2NjY3IDI2LjYyNGExNy4yMzczMzMgMTcuMjM3MzMzIDAgMCAwIDIyLjg2OTMzNCA3LjU5NDY2Nmw0Mi40OTYtMzkuOTM2djIzMy44MTMzMzRjMCAxMS4zNDkzMzMgNi45OTczMzMgMTguOTQ0IDE3LjU3ODY2NiAxOC45NDRoMzM1Ljc4NjY2N2MxMC41ODEzMzMgMCAxNy42NjQtNy41OTQ2NjcgMTcuNjY0LTE4Ljk0NFY0MDQuNjUwNjY3bDQyLjQxMDY2NyAzOC4wNTg2NjZjNy4wODI2NjcgNS43MTczMzMgMTcuNjY0IDEuODc3MzMzIDI0Ljc0NjY2Ni01LjcxNzMzMyA1LjI5MDY2Ny0xMS40MzQ2NjcgNS4yOTA2NjctMjIuNzg0LTMuNTg0LTI4LjUwMTMzM3oiIGZpbGw9IiM5NTcxRTkiIHAtaWQ9IjIwNDk1NyI+PC9wYXRoPjwvc3ZnPg==" class="repo-icon" mode="aspectFit" />
			</view>
		</view>
	</view>
</template>

<script>
	import { getResumeRepoList } from '../../../utils/resumeRepo.js'

		export default {
			name: 'ResumeRepo',
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		data() {
			return {
				resumeCount: 0
			}
		},
		computed: {
		isDarkTheme() {
			return this.theme === 'dark' || this.theme === 'theme-dark'
		},
			themeClass() {
			return this.isDarkTheme ? 'theme-dark' : ''
			}
			},
			mounted() {
				// 卡片只展示当前仓库中的简历数量，初始化时读取一次本地列表。
				this.resumeCount = getResumeRepoList().length
			},
			methods: {
				syncStats() {
					// 预留给旧版统计方案的同步入口。
					this.stats = getResumeRepoStats()
				},
				handleManage() {
					// 跳转到简历仓库管理页查看和维护已有简历。
					uni.navigateTo({
					url: '/subPages/resumeRepoPage/resumeRepoPage'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.resume-card {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
		display: flex;
		height: 100%;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		
		&:active {
			background: #f9fafb;
		}
	}

	.card-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.text-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin-right: 20rpx;
	}

	.title {
		font-size: 34rpx;
		font-weight: bold;
		color: #111827;
		margin-bottom: 8rpx;
	}

	.subtitle {
		font-size: 24rpx;
		color: #6b7280;
		margin-bottom: 24rpx;
	}

	.stats {
		display: flex;
		gap: 24rpx;
	}

	.stat-item {
		font-size: 24rpx;
		color: #4b5563;
	}

	.stat-num {
		font-size: 28rpx;
		font-weight: bold;
		color: #8b5cf6;
		margin-left: 8rpx;
	}

	.icon-wrap {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background: #f5f3ff;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.repo-icon {
			width: 64rpx;
			height: 64rpx;
		}
	}

	.resume-card.theme-dark {
		background: #1d1f24;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);

		&:active {
			background: #23252b;
		}

		.title {
			color: #f4f7fb;
		}

		.subtitle, .stat-item {
			color: rgba(255, 255, 255, 0.58);
		}

		.icon-wrap {
			background: rgba(139, 92, 246, 0.15);
		}
	}
</style>
