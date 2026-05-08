<template>
	<view class="resume-card online-resume" :class="themeClass" @click="handleEdit">
		<view class="card-content">
			<view class="text-content">
				<!-- 在线简历卡片展示入口说明，进度区当前预留给完善度能力。 -->
				<text class="title">在线简历</text>
				<text class="subtitle">丰富在线经历，提高匹配率</text>
				<view class="progress-wrap">
					<!-- <text class="progress-label">完善度</text> -->
<!-- <<<<<<< Updated upstream -->
<!-- 					<progress :percent="completion" stroke-width="6" activeColor="#10b981" backgroundColor="#e5e7eb" border-radius="3" />
					<text class="progress-val">{{ completion }}%</text>
				</view>
			</view>
			<view class="icon-wrap">
			<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTYyNjEwNjMwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwNzIwNyIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik05NTguOTg4NjkzIDcwNGgtMjEyLjQ1ODY2NmMtNTguNjAyNjY3IDAtMTAyLjc4NCA0NC4xNi0xMDIuNzg0IDEwMi43ODRWMTAyNEgxMjguMzk2NjkzQzg5Ljc2MjAyNyAxMDI0IDYzLjk5MTM2IDk5OC40IDYzLjk5MTM2IDk2MFY2NGMwLTM4LjQgMjUuNzcwNjY3LTY0IDY0LjQwNTMzMy02NGg3NzIuNjcyYzM4LjY1NiAwIDY0LjQwNTMzMyAyNS42IDU3Ljk0MTMzNCA2NHY2NDB6TTU0My45OTEzNiA2NDBoLTE5MmMtMTkuMiAwLTMyIDEyLjgtMzIgMzJzMTIuOCAzMiAzMiAzMmgxOTJjMTkuMiAwIDMyLTEyLjggMzItMzJzLTEyLjgtMzItMzItMzJ6IG0tNjQgMTI4aC0xMjhjLTE5LjIgMC0zMiAxMi44LTMyIDMyczEyLjggMzIgMzIgMzJoMTI4YzE5LjIgMCAzMi0xMi44IDMyLTMycy0xMi44LTMyLTMyLTMyeiBtMjI3Ljc1NDY2NyAxNzAuNjY2NjY3di0xMzEuODgyNjY3YzAtMjMuMjk2IDE1LjU1Mi0zOC43ODQgMzguNzg0LTM4Ljc4NGgxMzEuODgyNjY2bC0xNzAuNjY2NjY2IDE3MC42NjY2Njd6TTYwMS41OTEzNiAzNDUuNkM2MjcuMTkxMzYgMzIwIDYzOS45OTEzNiAyODggNjM5Ljk5MTM2IDI1NmMwLTcwLjQtNTcuNi0xMjgtMTI4LTEyOHMtMTI4IDU3LjYtMTI4IDEyOGMwIDMyIDEyLjggNjQgMzguNCA4OS42LTY0IDMyLTEwMi40IDk2LTEwMi40IDE2Ni40IDAgMTkuMiAxMi44IDMyIDMyIDMyUzM4My45OTEzNiA1MzEuMiAzODMuOTkxMzYgNTEyYzAtNzAuNCA1Ny42LTEyOCAxMjgtMTI4czEyOCA1Ny42IDEyOCAxMjhjMCAxOS4yIDEyLjggMzIgMzIgMzJTNzAzLjk5MTM2IDUzMS4yIDcwMy45OTEzNiA1MTJjMC03MC40LTM4LjQtMTM0LjQtMTAyLjQtMTY2LjR6TTUxMS45OTEzNiAzMjBjLTM4LjQgMC02NC0yNS42LTY0LTY0czI1LjYtNjQgNjQtNjQgNjQgMjUuNiA2NCA2NC0yNS42IDY0LTY0IDY0eiIgZmlsbD0iIzAwQzlDOCIgcC1pZD0iMTA3MjA4Ij48L3BhdGg+PC9zdmc+" class="resume-icon" />
		</view>
======= -->
					<!-- <progress percent="60" stroke-width="6" activeColor="#10b981" :backgroundColor="isDarkTheme ? '#374151' : '#e5e7eb'" border-radius="3" /> -->
					<!-- <text class="progress-val">{{ completion }}%</text> -->
				</view>
			</view>
			<view class="icon-wrap">
				<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDEzNTcwMzkwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwODg3NiIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik05NTguOTg4NjkzIDcwNGgtMjEyLjQ1ODY2NmMtNTguNjAyNjY3IDAtMTAyLjc4NCA0NC4xNi0xMDIuNzg0IDEwMi43ODRWMTAyNEgxMjguMzk2NjkzQzg5Ljc2MjAyNyAxMDI0IDYzLjk5MTM2IDk5OC40IDYzLjk5MTM2IDk2MFY2NGMwLTM4LjQgMjUuNzcwNjY3LTY0IDY0LjQwNTMzMy02NGg3NzIuNjcyYzM4LjY1NiAwIDY0LjQwNTMzMyAyNS42IDU3Ljk0MTMzNCA2NHY2NDB6TTU0My45OTEzNiA2NDBoLTE5MmMtMTkuMiAwLTMyIDEyLjgtMzIgMzJzMTIuOCAzMiAzMiAzMmgxOTJjMTkuMiAwIDMyLTEyLjggMzItMzJzLTEyLjgtMzItMzItMzJ6IG0tNjQgMTI4aC0xMjhjLTE5LjIgMC0zMiAxMi44LTMyIDMyczEyLjggMzIgMzIgMzJoMTI4YzE5LjIgMCAzMi0xMi44IDMyLTMycy0xMi44LTMyLTMyLTMyeiBtMjI3Ljc1NDY2NyAxNzAuNjY2NjY3di0xMzEuODgyNjY3YzAtMjMuMjk2IDE1LjU1Mi0zOC43ODQgMzguNzg0LTM4Ljc4NGgxMzEuODgyNjY2bC0xNzAuNjY2NjY2IDE3MC42NjY2Njd6TTYwMS41OTEzNiAzNDUuNkM2MjcuMTkxMzYgMzIwIDYzOS45OTEzNiAyODggNjM5Ljk5MTM2IDI1NmMwLTcwLjQtNTcuNi0xMjgtMTI4LTEyOHMtMTI4IDU3LjYtMTI4IDEyOGMwIDMyIDEyLjggNjQgMzguNCA4OS42LTY0IDMyLTEwMi40IDk2LTEwMi40IDE2Ni40IDAgMTkuMiAxMi44IDMyIDMyIDMyUzM4My45OTEzNiA1MzEuMiAzODMuOTkxMzYgNTEyYzAtNzAuNCA1Ny42LTEyOCAxMjgtMTI4czEyOCA1Ny42IDEyOCAxMjhjMCAxOS4yIDEyLjggMzIgMzIgMzJTNzAzLjk5MTM2IDUzMS4yIDcwMy45OTEzNiA1MTJjMC03MC40LTM4LjQtMTM0LjQtMTAyLjQtMTY2LjR6TTUxMS45OTEzNiAzMjBjLTM4LjQgMC02NC0yNS42LTY0LTY0czI1LjYtNjQgNjQtNjQgNjQgMjUuNiA2NCA2NC0yNS42IDY0LTY0IDY0eiIgZmlsbD0iIzAwQzlDOCIgcC1pZD0iMjA4ODc3Ij48L3BhdGg+PC9zdmc+" class="resume-icon" mode="aspectFit" />
			</view>
<!-- >>>>>>> Stashed changes -->
		</view>
	</view>
</template>

<script>
	import { getResumeRepoStats, ARCHIVE_DATA_UPDATED_EVENT } from '@/utils/archiveData.js'

	export default {
		name: 'onlineResume',
// <<<<<<< Updated upstream
		data() {
			return {
				// 完善度来源于档案统计，便于未来恢复进度展示。
				completion: getResumeRepoStats().completion
			}
		},
		created() {
			// 监听档案更新事件，保证在线简历信息与最新资料保持同步。
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(ARCHIVE_DATA_UPDATED_EVENT, this.syncCompletion)
			}
		},
		beforeDestroy() {
			// 兼容 Vue2 生命周期，避免事件监听残留。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.syncCompletion)
			}
		},
		beforeUnmount() {
			// 兼容 Vue3 生命周期，离开组件时移除监听。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.syncCompletion)
// =======
			}
		},
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		computed: {
			// 暗色状态供模板和样式类切换复用。
		isDarkTheme() {
			return this.theme === 'dark' || this.theme === 'theme-dark'
		},
			themeClass() {
				// 输出根节点主题类名，统一控制整张卡片的外观。
			return this.isDarkTheme ? 'theme-dark' : ''
// >>>>>>> Stashed changes
			}
		},
		methods: {
			syncCompletion() {
				// 在线简历完善度依赖档案事件同步刷新。
				this.completion = getResumeRepoStats().completion
			},
			handleEdit() {
				// 进入在线简历编辑器继续完善内容。
				uni.navigateTo({
					url: '/subPages/onlineResumeMake/onlineResumeMake'
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

	.progress-wrap {
		display: flex;
		align-items: center;
		gap: 16rpx;
		width: 80%;
		
		progress {
			flex: 1;
		}
	}

	// .progress-label {
	// 	font-size: 22rpx;
	// 	color: #9ca3af;
	// }

	.progress-val {
		font-size: 22rpx;
		font-weight: bold;
		color: #10b981;
	}

	.icon-wrap {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background: #ecfdf5;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.resume-icon {
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

		.subtitle, .progress-label {
			color: rgba(255, 255, 255, 0.58);
		}

		.icon-wrap {
			background: rgba(16, 185, 129, 0.15);
		}
	}
</style>
