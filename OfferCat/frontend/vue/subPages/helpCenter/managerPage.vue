<template>
	<view class="manager-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="goBack">
				<view class="back-btn">
					<text class="back-icon">&lt;</text>
				</view>
			</view>
			<text class="nav-title">管理者中心</text>
			<view class="nav-right"></view>
		</view>

		<!-- 页面内容 -->
		<scroll-view class="page-content" scroll-y @scrolltolower="loadMorePosts" refresher-enabled @refresherrefresh="onRefresh" :refresher-triggered="refreshing">
			<!-- 禁言管理区域 -->
			<view class="section-card">
				<view class="section-header">
					<text class="section-title">用户禁言管理</text>
				</view>
				
				<!-- 搜索框 -->
				<view class="search-box">
					<text class="search-label">搜</text>
					<input 
						class="search-input" 
						type="text" 
						v-model="searchKeyword" 
						placeholder="搜索用户名或ID"
						@confirm="searchUser"
					/>
					<view class="search-btn" @click="searchUser">
						<text class="btn-text">搜索</text>
					</view>
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
				postList: [],
				loading: false,
				refreshing: false
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
				this.loading = true
				const hdr = {
					'Content-Type': 'application/json'
				}
				const t = getToken()
				if (t) {
					hdr['Authorization'] = `Bearer ${t}`
				}

				uni.request({
					url: `${getApiBase()}/api/admin/forum/search-all`,
					method: 'POST',
					header: hdr,
					data: {},
					success: (res) => {
						if (res.data && res.data.code === 200 && res.data.data) {
							this.postList = res.data.data.map(post => ({
								postId: post.postId,
								title: post.title || '无标题',
								author: post.authorName || '未知用户',
								content: post.content || '',
								createTime: this.formatTime(post.createTime)
							}))
						} else {
							this.postList = []
							uni.showToast({ title: '加载帖子失败', icon: 'none' })
						}
					},
					fail: () => {
						this.postList = []
						uni.showToast({ title: '网络错误', icon: 'none' })
					},
					complete: () => {
						this.loading = false
					}
				})
			},
			formatTime(timeStr) {
				if (!timeStr) return ''
				const date = new Date(timeStr)
				const now = new Date()
				const diff = now - date

				if (diff < 60000) return '刚刚'
				if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
				if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
				if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`

				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
			},
			onRefresh() {
				this.refreshing = true
				this.loadPostList()
				setTimeout(() => {
					this.refreshing = false
				}, 1000)
			},
			loadMorePosts() {
				// 可以在这里实现分页加载更多
			},
			searchUser() {
				if (!this.searchKeyword.trim()) {
					uni.showToast({ title: '请输入搜索内容', icon: 'none' })
					return
				}

				const hdr = {
					'Content-Type': 'application/json'
				}
				const t = getToken()
				if (t) {
					hdr['Authorization'] = `Bearer ${t}`
				}

				uni.request({
					url: `${getApiBase()}/api/admin/search/user?keyword=${encodeURIComponent(this.searchKeyword.trim())}`,
					method: 'GET',
					header: hdr,
					success: (res) => {
						if (res.data && res.data.code === 200 && res.data.data) {
							const users = Array.isArray(res.data.data) ? res.data.data : [res.data.data]
							this.searchResults = users.map(user => ({
								userId: user.userId || user.id,
								username: user.username || user.nickname || '未知用户'
							}))
							if (this.searchResults.length === 0) {
								uni.showToast({ title: '未找到用户', icon: 'none' })
							}
						} else {
							this.searchResults = []
							uni.showToast({ title: '搜索失败', icon: 'none' })
						}
					},
					fail: () => {
						this.searchResults = []
						uni.showToast({ title: '网络错误', icon: 'none' })
					}
				})
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
	.manager-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f0f3f9;
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 22rpx;
		background: #ffffff;
		box-shadow:
			0 4rpx 20rpx rgba(93, 118, 189, 0.12),
			0 2rpx 8rpx rgba(93, 118, 189, 0.06);

		.nav-left {
			flex-shrink: 0;

			.back-btn {
				box-sizing: border-box;
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				border: none;
				background: #f5f7fb;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow:
					0 4rpx 12rpx rgba(93, 118, 189, 0.15),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.8);
				transition: all 0.2s ease;

				&:active {
					transform: scale(0.95);
					box-shadow:
						0 2rpx 6rpx rgba(93, 118, 189, 0.1),
						inset 0 2rpx 0 rgba(255, 255, 255, 0.6);
				}
			}

			.back-icon {
				font-size: 28rpx;
				font-weight: 700;
				color: #5d76bd;
				margin-right: 2rpx;
			}
		}

		.nav-title {
			flex: 1;
			text-align: center;
			font-size: 34rpx;
			font-weight: 700;
			color: #2d3748;
		}

		.nav-right {
			width: 72rpx;
			height: 72rpx;
			flex-shrink: 0;
		}
	}

	.page-content {
		flex: 1;
		min-height: 0;
		box-sizing: border-box;
		padding: 28rpx;
		padding-bottom: calc(28rpx + env(safe-area-inset-bottom));
	}

	.section-card {
		background: #ffffff;
		border-radius: 28rpx;
		padding: 28rpx 24rpx 32rpx;
		margin-bottom: 28rpx;
		box-shadow:
			0 8rpx 32rpx rgba(93, 118, 189, 0.1),
			0 2rpx 8rpx rgba(93, 118, 189, 0.05),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 24rpx;
			right: 24rpx;
			height: 1rpx;
			background: rgba(255, 255, 255, 0.5);
		}
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid rgba(93, 118, 189, 0.1);

		.section-title {
			font-size: 30rpx;
			font-weight: 700;
			color: #2d3748;
		}

		.post-count {
			font-size: 24rpx;
			color: #718096;
			font-weight: 500;
		}
	}

	.search-box {
		display: flex;
		align-items: center;
		background: #f7f9fc;
		border-radius: 20rpx;
		padding: 16rpx 20rpx;
		box-shadow:
			0 2rpx 8rpx rgba(93, 118, 189, 0.06),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);

		.search-label {
			width: 44rpx;
			height: 44rpx;
			border-radius: 12rpx;
			background: #5d76bd;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 22rpx;
			font-weight: 700;
			color: #ffffff;
			margin-right: 16rpx;
			flex-shrink: 0;
			box-shadow:
				0 4rpx 10rpx rgba(93, 118, 189, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.25);
		}

		.search-input {
			flex: 1;
			font-size: 28rpx;
			color: #2d3748;
			background: transparent;
			min-width: 0;

			&::placeholder {
				color: #a0aec0;
			}
		}

		.search-btn {
			padding: 12rpx 28rpx;
			background: #5d76bd;
			border-radius: 16rpx;
			margin-left: 16rpx;
			flex-shrink: 0;
			box-shadow:
				0 4rpx 12rpx rgba(93, 118, 189, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.25);
			transition: all 0.2s ease;

			&:active {
				transform: scale(0.95);
				box-shadow:
					0 2rpx 6rpx rgba(93, 118, 189, 0.2),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.15);
			}

			.btn-text {
				font-size: 26rpx;
				font-weight: 600;
				color: #ffffff;
			}
		}
	}

	.user-list {
		margin-top: 20rpx;
	}

	.user-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		border-bottom: 2rpx solid rgba(93, 118, 189, 0.08);

		&:last-child {
			border-bottom: none;
		}
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}

	.user-avatar {
		width: 72rpx;
		height: 72rpx;
		background: #5d76bd;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.3),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.25);

		.avatar-text {
			font-size: 28rpx;
			color: #ffffff;
			font-weight: 700;
		}
	}

	.user-detail {
		display: flex;
		flex-direction: column;

		.user-name {
			font-size: 30rpx;
			color: #2d3748;
			font-weight: 600;
		}

		.user-id {
			font-size: 24rpx;
			color: #718096;
			margin-top: 6rpx;
		}
	}

	.user-actions {
		.mute-btn {
			padding: 14rpx 28rpx;
			background: #fff5e6;
			border-radius: 16rpx;
			border: 2rpx solid #ffd591;
			box-shadow:
				0 2rpx 8rpx rgba(250, 140, 22, 0.1);
			transition: all 0.2s ease;

			&:active {
				transform: scale(0.95);
				background: #ffe7ba;
			}

			.btn-text {
				font-size: 26rpx;
				color: #fa8c16;
				font-weight: 600;
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
		background: #ffffff;
		border-radius: 28rpx;
		padding: 32rpx;
		box-shadow:
			0 20rpx 60rpx rgba(0, 0, 0, 0.3);
	}

	.modal-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #2d3748;
		text-align: center;
		display: block;
		margin-bottom: 28rpx;
	}

	.mute-options {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
	}

	.mute-option {
		width: calc(33.33% - 12rpx);
		padding: 20rpx;
		background: #f7f9fc;
		border-radius: 16rpx;
		text-align: center;
		box-shadow:
			0 2rpx 8rpx rgba(93, 118, 189, 0.06),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.95);
			background: #e8ecf5;
		}

		.option-text {
			font-size: 26rpx;
			color: #2d3748;
			font-weight: 500;
		}
	}

	.modal-cancel {
		margin-top: 28rpx;
		padding: 20rpx;
		background: #f7f9fc;
		border-radius: 16rpx;
		text-align: center;
		box-shadow:
			0 2rpx 8rpx rgba(93, 118, 189, 0.06),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.98);
			background: #e8ecf5;
		}

		.cancel-text {
			font-size: 28rpx;
			color: #718096;
			font-weight: 500;
		}
	}

	.post-list {
		margin-top: 8rpx;
	}

	.post-item {
		display: flex;
		justify-content: space-between;
		padding: 24rpx 0;
		border-bottom: 2rpx solid rgba(93, 118, 189, 0.08);

		&:last-child {
			border-bottom: none;
		}
	}

	.post-content {
		flex: 1;
		margin-right: 20rpx;
		min-width: 0;
	}

	.post-title {
		font-size: 30rpx;
		font-weight: 600;
		color: #2d3748;
		display: block;
		margin-bottom: 10rpx;
	}

	.post-author {
		font-size: 24rpx;
		color: #718096;
		display: block;
		margin-bottom: 10rpx;
	}

	.post-preview {
		font-size: 26rpx;
		color: #4a5568;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.5;
	}

	.post-actions {
		display: flex;
		align-items: flex-start;
	}

	.delete-btn {
		padding: 14rpx 28rpx;
		background: #fff1f0;
		border-radius: 16rpx;
		border: 2rpx solid #ffccc7;
		box-shadow:
			0 2rpx 8rpx rgba(255, 77, 79, 0.1);
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.95);
			background: #ffdede;
		}

		.delete-text {
			font-size: 26rpx;
			color: #ff4d4f;
			font-weight: 600;
		}
	}

	.theme-dark {
		background: #1a1c23;

		.nav-bar {
			background: #252830;
			box-shadow:
				0 4rpx 20rpx rgba(0, 0, 0, 0.3);

			.nav-title {
				color: #f0f2f8;
			}

			.back-btn {
				background: #2e323c;
				box-shadow:
					0 4rpx 12rpx rgba(0, 0, 0, 0.25),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
			}

			.back-icon {
				color: #8ea9ff;
			}
		}

		.section-card {
			background: #252830;
			box-shadow:
				0 8rpx 32rpx rgba(0, 0, 0, 0.25),
				0 2rpx 8rpx rgba(0, 0, 0, 0.15),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.03);
		}

		.section-header {
			border-bottom-color: rgba(255, 255, 255, 0.08);

			.section-title {
				color: #f0f2f8;
			}

			.post-count {
				color: #8a92a8;
			}
		}

		.search-box {
			background: #2e323c;
			box-shadow:
				0 2rpx 8rpx rgba(0, 0, 0, 0.15),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.03);

			.search-input {
				color: #f0f2f8;

				&::placeholder {
					color: #5a6270;
				}
			}
		}

		.user-item {
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}

		.user-avatar {
			background: #5d76bd;
			box-shadow:
				0 4rpx 12rpx rgba(0, 0, 0, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
		}

		.user-detail {
			.user-name {
				color: #f0f2f8;
			}

			.user-id {
				color: #8a92a8;
			}
		}

		.mute-btn {
			background: rgba(250, 140, 22, 0.15);
			border-color: rgba(255, 181, 107, 0.3);

			&:active {
				background: rgba(250, 140, 22, 0.25);
			}

			.btn-text {
				color: #ffb56b;
			}
		}

		.modal-content {
			background: #252830;
		}

		.modal-title {
			color: #f0f2f8;
		}

		.mute-option {
			background: #2e323c;
			box-shadow:
				0 2rpx 8rpx rgba(0, 0, 0, 0.15),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.03);

			&:active {
				background: #363b47;
			}

			.option-text {
				color: #e8ebf2;
			}
		}

		.modal-cancel {
			background: #2e323c;
			box-shadow:
				0 2rpx 8rpx rgba(0, 0, 0, 0.15),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.03);

			&:active {
				background: #363b47;
			}

			.cancel-text {
				color: #8a92a8;
			}
		}

		.post-item {
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}

		.post-title {
			color: #f0f2f8;
		}

		.post-author {
			color: #8a92a8;
		}

		.post-preview {
			color: #a0aec0;
		}

		.delete-btn {
			background: rgba(255, 77, 79, 0.15);
			border-color: rgba(255, 150, 150, 0.3);

			&:active {
				background: rgba(255, 77, 79, 0.25);
			}

			.delete-text {
				color: #ff9696;
			}
		}
	}
</style>
