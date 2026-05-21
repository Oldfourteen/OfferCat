<template>
	<view class="resume-card resume-repo" :class="themeClass" @click="handleManage">
		<view class="card-content">
			<view class="text-content">
				<text class="title">在线简历仓库</text>
				<text class="subtitle">统一管理已制作/上传的简历</text>
				<view class="desc-box">
					<text class="desc">在线编辑保存的简历与上传附件都会集中在此，便于区分版本。支持查看详情、重命名、删除或再次打开编辑，避免文件散落在各处。</text>
				</view>
			</view>
			<view class="icon-wrap">
				<image src="/static/png/inline/8ee3fe0c47fb.png" class="repo-icon" mode="aspectFit" />
			</view>
		</view>
		<view class="card-footer">
			<view class="stat-badge">
				<text class="stat-item">总简历数 <text class="stat-num">{{ resumeCount }}</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import { fetchResumeRepoListPreferServer, getResumeRepoList } from '../../../utils/resumeRepo.js'

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
				void this.refreshCount()
			},
			methods: {
				async refreshCount() {
					const list = await fetchResumeRepoListPreferServer()
					this.resumeCount = Array.isArray(list) ? list.length : getResumeRepoList().length
				},
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
		border: 1rpx solid #e5e7eb;
		box-shadow:
			0 1rpx 2rpx rgba(15, 23, 42, 0.06),
			0 4rpx 16rpx rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;

		&:active {
			background: #f9fafb;
		}
	}

	.card-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex: 0 1 auto;
		width: 100%;
	}

	.text-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
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
		margin-bottom: 10rpx;
	}

	.desc-box {
		margin-bottom: 0;
		padding: 18rpx 20rpx;
		background: #f9fafb;
		border: 1rpx solid #e5e7eb;
		border-radius: 12rpx;
		box-shadow:
			0 1rpx 2rpx rgba(15, 23, 42, 0.06),
			0 4rpx 10rpx rgba(15, 23, 42, 0.05);
	}

	.desc {
		font-size: 22rpx;
		line-height: 1.55;
		color: #9ca3af;
		display: block;
		margin-bottom: 0;
	}

	.card-footer {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		margin-top: auto;
		padding-top: 12rpx;
	}

	.stat-badge {
		display: inline-flex;
		align-items: center;
		padding: 10rpx 20rpx;
		border-radius: 999rpx;
		border: 1rpx solid #e5e7eb;
		background: linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%);
		box-shadow:
			0 2rpx 8rpx rgba(15, 23, 42, 0.08),
			0 1rpx 2rpx rgba(15, 23, 42, 0.04),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.95);
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
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow:
			0 2rpx 6rpx rgba(0, 0, 0, 0.35),
			0 8rpx 24rpx rgba(0, 0, 0, 0.22);

		&:active {
			background: #23252b;
		}

		.title {
			color: #f4f7fb;
		}

		.subtitle, .stat-item {
			color: rgba(255, 255, 255, 0.58);
		}

		.stat-badge {
			border-color: rgba(255, 255, 255, 0.14);
			background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
			box-shadow:
				0 2rpx 10rpx rgba(0, 0, 0, 0.35),
				0 1rpx 2rpx rgba(0, 0, 0, 0.2),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.12);
		}

		.desc {
			color: rgba(255, 255, 255, 0.45);
		}

		.desc-box {
			background: rgba(255, 255, 255, 0.04);
			border-color: rgba(255, 255, 255, 0.1);
			box-shadow:
				0 1rpx 3rpx rgba(0, 0, 0, 0.35),
				0 6rpx 14rpx rgba(0, 0, 0, 0.22);
		}

		.icon-wrap {
			background: rgba(139, 92, 246, 0.15);
		}
	}
</style>
