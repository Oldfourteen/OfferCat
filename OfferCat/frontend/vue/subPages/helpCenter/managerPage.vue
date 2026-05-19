<template>
	<view class="manager-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="nav-title">管理者中心</text>
			<view class="nav-right"></view>
		</view>

		<!-- 页面内容 -->
		<scroll-view class="page-content" scroll-y>
			<!-- 禁言管理区域 -->
			<view class="section-card">
				<view class="section-header">
					<text class="section-title">用户禁言管理</text>
				</view>
				
				<!-- 搜索框 -->
				<view class="search-box">
					<text class="search-icon">🔍</text>
					<input 
						class="search-input" 
						type="text" 
						v-model="searchKeyword" 
						placeholder="搜索用户名或ID"
						@confirm="searchUser"
					/>
					<text class="search-btn" @click="searchUser">搜索</text>
				</view>

				<!-- 搜索结果列表 -->
				<view class="user-list" v-if="searchResults.length > 0">
					<view class="user-item" v-for="user in searchResults" :key="user.userId">
						<view class="user-info">
							<view class="user-avatar">
								<text class="avatar-text">{{ user.username.charAt(0) }}</text>
							</view>
							<view class="user-detail">
								<text class="user-name">{{ user.username }}</text>
								<text class="user-id">ID: {{ user.userId }}</text>
							</view>
						</view>
						<view class="user-actions">
							<view class="mute-btn" @click="showMuteOptions(user)">
								<text class="btn-text">禁言</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 禁言时长选择弹窗 -->
				<view class="mute-modal" v-if="showMuteModal" @click="closeMuteModal">
					<view class="modal-content" @click.stop>
						<text class="modal-title">选择禁言时长</text>
						<view class="mute-options">
							<view 
								class="mute-option" 
								v-for="option in muteOptions" 
								:key="option.value"
								@click="confirmMute(option)"
							>
								<text class="option-text">{{ option.label }}</text>
							</view>
						</view>
						<view class="modal-cancel" @click="closeMuteModal">
							<text class="cancel-text">取消</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 帖子管理区域 -->
			<view class="section-card">
				<view class="section-header">
					<text class="section-title">帖子管理</text>
					<text class="post-count">共 {{ postList.length }} 条</text>
				</view>

				<view class="post-list">
					<view class="post-item" v-for="post in postList" :key="post.postId">
						<view class="post-content">
							<text class="post-title">{{ post.title }}</text>
							<text class="post-author">作者: {{ post.author }} · {{ post.createTime }}</text>
							<text class="post-preview">{{ post.content }}</text>
						</view>
						<view class="post-actions">
							<view class="delete-btn" @click="deletePost(post.postId)">
								<text class="delete-text">删除</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { getApiBase } from '@/api/config.js'
	import { getToken } from '@/utils/token.js'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				searchKeyword: '',
				searchResults: [],
				showMuteModal: false,
				currentUser: null,
				muteOptions: [
					{ label: '1分钟', value: 60 },
					{ label: '5分钟', value: 300 },
					{ label: '10分钟', value: 600 },
					{ label: '1小时', value: 3600 },
					{ label: '1天', value: 86400 },
					{ label: '永久', value: -1 }
				],
				postList: []
			}
		},
		onLoad() {
			this.loadPostList()
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			loadPostList() {
				this.postList = []
			},
			searchUser() {
				if (!this.searchKeyword.trim()) {
					uni.showToast({ title: '请输入搜索内容', icon: 'none' })
					return
				}
				this.searchResults = []
			},
			showMuteOptions(user) {
				this.currentUser = user
				this.showMuteModal = true
			},
			closeMuteModal() {
				this.showMuteModal = false
				this.currentUser = null
			},
			confirmMute(option) {
				if (!this.currentUser) return
				const hdr = {
					'Content-Type': 'application/json'
				}
				const t = getToken()
				if (t) {
					hdr['Authorization'] = `Bearer ${t}`
				}

				uni.request({
					url: `${getApiBase()}/api/admin/mute`,
					method: 'POST',
					header: hdr,
					data: {
						userId: this.currentUser.userId,
						duration: option.value
					},
					success: (res) => {
						if (res.data.success) {
							uni.showToast({ title: `已禁言${option.label}`, icon: 'success' })
							this.closeMuteModal()
						} else {
							uni.showToast({ title: '禁言失败', icon: 'none' })
						}
					},
					fail: () => {
						uni.showToast({ title: '网络错误', icon: 'none' })
					}
				})
			},
			deletePost(postId) {
				uni.showModal({
					title: '确认删除',
					content: '确定要删除这条帖子吗？',
					confirmColor: '#ff4d4f',
					success: (res) => {
						if (res.confirm) {
							const dh = {}
							const dt = getToken()
							if (dt) {
								dh['Authorization'] = `Bearer ${dt}`
							}
							uni.request({
								url: `${getApiBase()}/api/admin/post/${postId}`,
								method: 'DELETE',
								header: dh,
								success: (result) => {
									if (result.data.success) {
										this.postList = this.postList.filter(p => p.postId !== postId)
										uni.showToast({ title: '删除成功', icon: 'success' })
									} else {
										uni.showToast({ title: '删除失败', icon: 'none' })
									}
								},
								fail: () => {
									uni.showToast({ title: '网络错误', icon: 'none' })
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-content {
		height: calc(100vh - 44px);
		background: #f5f6f8;
		padding-top: 50px;
	}

	.nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		padding: 0 16px;
		z-index: 100;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

		.nav-left {
			width: 60rpx;
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.back-icon {
				font-size: 36rpx;
				color: #333;
				font-weight: bold;
			}
		}

		.nav-title {
			font-size: 18px;
			font-weight: 600;
			color: #333;
		}

		.nav-right {
			width: 60rpx;
		}
	}

	.section-card {
		margin: 16px;
		background: #fff;
		border-radius: 16rpx;
		padding: 20rpx;
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding-bottom: 16rpx;
		border-bottom: 1rpx solid #f0f0f0;

		.section-title {
			font-size: 17px;
			font-weight: 600;
			color: #333;
		}

		.post-count {
			font-size: 14px;
			color: #999;
		}
	}

	.search-box {
		display: flex;
		align-items: center;
		background: #f5f6f8;
		border-radius: 24rpx;
		padding: 12rpx 16rpx;

		.search-icon {
			font-size: 24rpx;
			margin-right: 12rpx;
		}

		.search-input {
			flex: 1;
			font-size: 14px;
			background: transparent;
		}

		.search-btn {
			font-size: 14px;
			color: #4a6cf7;
			padding: 8rpx 16rpx;
			background: rgba(74, 108, 247, 0.1);
			border-radius: 16rpx;
		}
	}

	.user-list {
		margin-top: 16rpx;
	}

	.user-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.user-avatar {
		width: 64rpx;
		height: 64rpx;
		background: linear-gradient(135deg, #4a6cf7 0%, #6b8cff 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;

		.avatar-text {
			font-size: 24rpx;
			color: #fff;
			font-weight: 600;
		}
	}

	.user-detail {
		display: flex;
		flex-direction: column;

		.user-name {
			font-size: 16px;
			color: #333;
			font-weight: 500;
		}

		.user-id {
			font-size: 12px;
			color: #999;
			margin-top: 4rpx;
		}
	}

	.user-actions {
		.mute-btn {
			padding: 8rpx 20rpx;
			background: #fff7e6;
			border-radius: 20rpx;
			border: 1rpx solid #ffa940;

			.btn-text {
				font-size: 13px;
				color: #fa8c16;
			}
		}
	}

	.mute-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-content {
		width: 600rpx;
		background: #fff;
		border-radius: 24rpx;
		padding: 32rpx;
	}

	.modal-title {
		font-size: 18px;
		font-weight: 600;
		color: #333;
		text-align: center;
		display: block;
		margin-bottom: 24rpx;
	}

	.mute-options {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
	}

	.mute-option {
		width: calc(33.33% - 12rpx);
		padding: 16rpx;
		background: #f5f6f8;
		border-radius: 12rpx;
		text-align: center;

		.option-text {
			font-size: 14px;
			color: #333;
		}
	}

	.modal-cancel {
		margin-top: 24rpx;
		padding: 16rpx;
		background: #f5f6f8;
		border-radius: 12rpx;
		text-align: center;

		.cancel-text {
			font-size: 16px;
			color: #666;
		}
	}

	.post-list {
		margin-top: 8rpx;
	}

	.post-item {
		display: flex;
		justify-content: space-between;
		padding: 16rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}
	}

	.post-content {
		flex: 1;
		margin-right: 16rpx;
	}

	.post-title {
		font-size: 16px;
		font-weight: 500;
		color: #333;
		display: block;
		margin-bottom: 8rpx;
	}

	.post-author {
		font-size: 12px;
		color: #999;
		display: block;
		margin-bottom: 8rpx;
	}

	.post-preview {
		font-size: 14px;
		color: #666;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.post-actions {
		display: flex;
		align-items: flex-start;
	}

	.delete-btn {
		padding: 10rpx 24rpx;
		background: #fff1f0;
		border-radius: 20rpx;
		border: 1rpx solid #ffccc7;

		.delete-text {
			font-size: 13px;
			color: #ff4d4f;
			font-weight: 500;
		}
	}

	.theme-dark {
		.page-content {
			background: #1a1a1a;
		}

		.nav-bar {
			background: #242424;

			.back-icon, .nav-title {
				color: #fff;
			}
		}

		.section-card {
			background: #242424;
		}

		.section-title, .user-name, .post-title, .option-text {
			color: #fff;
		}

		.user-id, .post-author, .post-preview {
			color: #999;
		}

		.search-box {
			background: #333;
		}

		.search-input {
			color: #fff;
		}

		.modal-content {
			background: #242424;
		}

		.mute-option {
			background: #333;
		}

		.modal-cancel {
			background: #333;
		}
	}
</style>