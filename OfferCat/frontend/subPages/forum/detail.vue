<template>
	<view class="forum-detail-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<view class="nav-title-box">
				<text class="nav-title">小程序论坛区</text>
				<text class="nav-subtitle">欢迎参与讨论~</text>
			</view>
			<view class="nav-right"></view>
		</view>

		<scroll-view class="detail-scroll" scroll-y>
			<!-- 帖子正文块 -->
			<view class="post-card">
				<view class="author-info">
					<image class="avatar" :src="getAvatar(post.authorAvatar, post.userId)" mode="aspectFill"></image>
					<view class="author-meta">
						<view class="name-line">
							<text class="name">{{ getAuthorName(post.authorName, post.userId) }}</text>
							<text class="tag" v-if="post.userId === 1">开发者</text>
						</view>
						<text class="time">{{ formatTime(post.createTime) }}</text>
					</view>
				</view>

				<text class="post-text text-wrap-safe">{{ post.content }}</text>

				<!-- 图片网格 -->
				<view class="image-grid" v-if="postImages.length > 0">
					<image 
						class="grid-img" 
						v-for="(img, idx) in postImages" 
						:key="idx" 
						:src="getFullUrl(img)" 
						mode="aspectFill"
						@click="previewImage(idx)">
					</image>
				</view>

				<view class="post-actions-line">
					<text class="view-count">浏览 {{ post.viewCount || 0 }}</text>
					<view class="actions">
						<view class="action-btn delete-btn" v-if="isAuthor" @click="deletePost">
							<text class="icon">🗑️</text>
							<text class="text">删除</text>
						</view>
						<view class="action-btn" @click="likePost">
							<image class="icon-svg" :src="post.isLiked ? '/static/icons/like-active.svg' : '/static/icons/like.svg'"></image>
							<text class="text">点赞 {{ post.likeCount || 0 }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 评论区 -->
			<view class="comment-section">
				<view class="comment-header">
					<view class="line-marker"></view>
					<text class="title">全部评论 ({{ comments.length }})</text>
				</view>
				
				<view class="empty-comment" v-if="comments.length === 0">
					<text>暂无评论，快来抢沙发吧~</text>
				</view>

				<view class="comment-list" v-else>
					<view class="comment-item" v-for="item in comments" :key="item.commentId">
						<image class="c-avatar" :src="getAvatar(item.authorAvatar, item.userId)" mode="aspectFill"></image>
						<view class="c-content">
							<text class="c-name">{{ getAuthorName(item.authorName, item.userId) }}</text>
							<text class="c-text text-wrap-safe">{{ item.content }}</text>
							<text class="c-time">{{ formatTime(item.createTime) }}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部评论输入框 -->
		<view class="bottom-bar">
			<input class="comment-input text-wrap-safe" type="text" placeholder="写下你的评论..." v-model="commentText" />
			<view class="send-btn" :class="{active: commentText.length > 0}" @click="sendComment">发送</view>
		</view>
	</view>
</template>

<script>
	import { request } from '@/api/request.js'
	import { BASE_URL } from '@/api/config.js'
	import themeMixin from '@/utils/themeMixin.js'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				postId: null,
				post: {},
				postImages: [],
				comments: [],
				commentText: ''
			}
		},
		computed: {
			isAuthor() {
				const user = uni.getStorageSync('user') || {}
				const currentUserId = user.userId || user.id
				return this.post && currentUserId && this.post.userId === currentUserId
			}
		},
		onLoad(options) {
			console.log('detail onLoad options:', options)
			// 处理从不同地方跳转过来的不同参数名 (id 或 postId)
			const id = options.id || options.postId;
			if (id && id !== 'undefined' && id !== 'null') {
				this.postId = id
				// 尝试从缓存读取帖子详情，绕开后端崩溃的 /detail 接口
				const cachedPost = uni.getStorageSync('currentPost_' + id)
				if (cachedPost) {
					this.post = Object.assign({}, cachedPost)
					this.parseImages()
				}
				// 为了彻底屏蔽线上 500 弹出的“网络错误”，如果缓存里有数据，就不再去请求坏掉的后端接口
				if (!cachedPost) {
					this.loadPostDetail()
				}
				this.loadComments()
			} else {
				console.error('没有获取到有效的帖子ID参数，当前 options:', options)
				uni.showToast({ title: '帖子参数错误', icon: 'none' })
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			loadPostDetail() {
				console.log('正在请求帖子详情，ID:', this.postId)
				request({
					url: `/api/forum/post/detail/${this.postId}`,
					method: 'GET'
				}).then(res => {
					console.log('详情接口返回:', res)
					if (res && res.code === 200 && res.data) {
						// 确保触发响应式更新
						this.post = Object.assign({}, res.data)
						this.parseImages()
					} else if (!uni.getStorageSync('currentPost_' + this.postId)) {
						uni.showToast({ title: '帖子不存在或已被删除', icon: 'none' })
						setTimeout(() => uni.navigateBack(), 1500)
					}
				}).catch(err => {
				console.error('请求详情失败:', err)
				if (!uni.getStorageSync('currentPost_' + this.postId)) {
					uni.showToast({ title: err.message || '网络错误', icon: 'none' })
				}
			})
			},
			loadComments() {
				request({
					url: `/api/forum/post/${this.postId}/comments`,
					method: 'GET'
				}).then(res => {
					if (res.code === 200 && res.data) {
						this.comments = res.data
					}
				})
			},
			parseImages() {
				let imagesStr = this.post.images
				if (!imagesStr) {
					this.postImages = []
					return
				}
				try {
					let arr = JSON.parse(imagesStr)
					if (Array.isArray(arr)) {
						this.postImages = arr
						return
					}
				} catch (e) {}
				this.postImages = imagesStr.split(',').filter(s => s.trim())
			},
			getAvatar(avatar, postUserId) {
				const currentUser = uni.getStorageSync('user') || {}
				const currentUserId = currentUser.userId || currentUser.id
				
				// 如果是当前用户发的帖子/评论，直接用本地最新头像（无论后端是否返回）
				if (postUserId && currentUserId && postUserId === currentUserId) {
					let localAvatar = currentUser.avatar;
					if (currentUser.profile && currentUser.profile.avatar) {
						localAvatar = currentUser.profile.avatar;
					}
					if (localAvatar) {
						return this.getFullUrl(localAvatar)
					}
				}
				
				if (!avatar) return '/static/default-avatar.jpg'
				if (avatar.startsWith('http')) return avatar
				return BASE_URL + avatar
			},
			getAuthorName(name, postUserId) {
				const currentUser = uni.getStorageSync('user') || {}
				const currentUserId = currentUser.userId || currentUser.id
				
				// 如果是当前用户发的帖子/评论，直接用本地最新昵称
				if (postUserId && currentUserId && postUserId === currentUserId) {
					let localName = currentUser.nickname;
					if (currentUser.profile && currentUser.profile.nickname) {
						localName = currentUser.profile.nickname;
					}
					if (localName) {
						return localName
					}
				}
				return name || '匿名用户'
			},
			getFullUrl(url) {
				if (!url) return ''
				if (url.startsWith('http') || url.startsWith('data:')) return url
				return BASE_URL + url
			},
			formatTime(timeStr) {
				if (!timeStr) return ''
				if (typeof timeStr === 'string') {
					return timeStr.substring(0, 16).replace('T', ' ')
				}
				if (Array.isArray(timeStr)) {
					const [y, m, d, h, min] = timeStr
					const pad = n => (n < 10 ? '0' + n : n)
					return `${y}-${pad(m)}-${pad(d)} ${pad(h)}:${pad(min)}`
				}
				return String(timeStr)
			},
			previewImage(index) {
				let urls = this.postImages.map(img => this.getFullUrl(img))
				uni.previewImage({
					current: index,
					urls: urls
				})
			},
			likePost() {
				const user = uni.getStorageSync('user_v2') || {};
				const userId = user.userId || user.id;
				if (!userId) {
					uni.showToast({ title: '请先登录', icon: 'none' });
					return;
				}

				const originalPost = { ...this.post };
				const originalIsLiked = originalPost.isLiked;

				// Optimistic UI update
				this.post.isLiked = !this.post.isLiked;
				if (this.post.isLiked) {
					this.post.likeCount++;
				} else {
					this.post.likeCount = Math.max(0, this.post.likeCount - 1);
				}

				const baseUrl = originalIsLiked ? `/api/forum/post/unlike/${this.postId}` : `/api/forum/post/like/${this.postId}`;
				request({
					url: baseUrl,
					method: 'POST',
					data: {
						userId
					},
				}).then(res => {
					if (res.code === 200) {
						uni.showToast({ title: originalIsLiked ? '取消点赞' : '点赞成功', icon: 'none' });
						uni.setStorageSync('currentPost_' + this.postId, this.post);
						uni.$emit('refreshForumList'); // Notify list page
					} else {
						// Revert on failure
						this.post = originalPost;
						uni.showToast({ title: res.msg || '操作失败', icon: 'none' });
					}
				}).catch((err) => {
				// Revert on error
				this.post = originalPost;
				uni.showToast({ title: err.message || '网络错误', icon: 'none' });
			});
			},
			deletePost() {
				uni.showModal({
					title: '提示',
					content: '确定要删除这条帖子吗？',
					success: (res) => {
						if (res.confirm) {
							const user = uni.getStorageSync('user') || {}
							const currentUserId = user.userId || user.id || 1
							
							request({
								url: `/api/forum/post/delete/${this.postId}?userId=${currentUserId}`,
								method: 'DELETE'
							}).then(res => {
								if (res.code === 200) {
									uni.showToast({ title: '删除成功', icon: 'success' })
									uni.$emit('refresh')
									setTimeout(() => {
										uni.navigateBack()
									}, 1500)
								} else {
									uni.showToast({ title: res.msg || '删除失败', icon: 'none' })
								}
							}).catch(err => {
							uni.showToast({ title: err.message || '网络错误', icon: 'none' })
						})
						}
					}
				})
			},
			sendComment() {
				if (!this.commentText.trim()) return
				const user = uni.getStorageSync('user') || {}
				const userId = user.userId || user.id || 1
				
				request({
					url: '/api/forum/post/comment',
					method: 'POST',
					data: {
						postId: this.postId,
						content: this.commentText,
						userId: userId
					}
				}).then(res => {
					if (res.code === 200) {
						this.commentText = ''
						uni.showToast({ title: '评论成功', icon: 'none' })
						this.loadComments()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.forum-detail-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #cbfaf5 0%, #f6fbff 18%, #f7f8fb 100%);
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background: rgba(236, 252, 250, 0.94);
		backdrop-filter: blur(10rpx);

		.nav-left {
			width: 72rpx;
			height: 72rpx;
			border-radius: 22rpx;
			background: rgba(255, 255, 255, 0.92);
			display: flex;
			align-items: center;
			justify-content: center;
			.back-icon {
				font-size: 42rpx;
				color: #30435a;
			}
		}

		.nav-title-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			.nav-title {
				font-size: 28rpx;
				font-weight: 800;
				color: #26334e;
			}

			.nav-subtitle {
				font-size: 22rpx;
				color: #666;
				margin-top: 4rpx;
			}
		}
		
		.nav-right {
			width: 72rpx;
			height: 72rpx;
		}
	}

	.detail-scroll {
		flex: 1;
		min-height: 0;
		padding: 24rpx;
	}

	.post-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 24rpx;

		.author-info {
			display: flex;
			align-items: center;
			margin-bottom: 24rpx;

			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				display: block;
				flex-shrink: 0;
				overflow: hidden;
			}

			.author-meta {
				display: flex;
				flex-direction: column;

				.name-line {
					display: flex;
					align-items: center;
					gap: 10rpx;

					.name {
						font-size: 30rpx;
						font-weight: bold;
						color: #333;
					}

					.tag {
						font-size: 20rpx;
						color: #fff;
						background: #ff4d4f;
						padding: 2rpx 10rpx;
						border-radius: 6rpx;
					}
				}

				.time {
					font-size: 24rpx;
					color: #999;
					margin-top: 6rpx;
				}
			}
		}

		.post-title {
			font-size: 34rpx;
			font-weight: bold;
			color: #15305e;
			margin-bottom: 16rpx;
			display: block;
			line-height: 1.4;
		}

		.post-text {
			font-size: 30rpx;
			color: #333;
			line-height: 1.6;
			margin-bottom: 20rpx;
			display: block;
		}

		.image-grid {
			display: flex;
			flex-wrap: wrap;
			gap: 12rpx;
			margin-bottom: 30rpx;

			.grid-img {
				width: calc((100% - 24rpx) / 3);
				height: 200rpx;
				border-radius: 12rpx;
			}
		}

		.post-actions-line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20rpx;
			border-top: 1rpx solid #eee;

			.view-count {
				font-size: 24rpx;
				color: #999;
			}

			.actions {
				display: flex;
				gap: 30rpx;

				.action-btn {
					display: flex;
					align-items: center;
					gap: 8rpx;

					.icon-svg {
						width: 32rpx;
						height: 32rpx;
					}

					.icon {
						font-size: 32rpx;
						color: #999;
					}

					.text {
						font-size: 26rpx;
						color: #999;
					}

					&.delete-btn {
						.icon, .text {
							color: #ff4d4f;
						}
					}
				}
			}
		}
	}

	.comment-section {
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 40rpx;

		.comment-header {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;

			.line-marker {
				width: 6rpx;
				height: 30rpx;
				background: #4AA9FE;
				margin-right: 16rpx;
				border-radius: 4rpx;
			}

			.title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333;
			}
		}

		.empty-comment {
			text-align: center;
			padding: 40rpx 0;
			color: #999;
			font-size: 28rpx;
		}

		.comment-list {
			.comment-item {
				display: flex;
				margin-bottom: 30rpx;

				.c-avatar {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					margin-right: 20rpx;
					display: block;
					flex-shrink: 0;
					overflow: hidden;
				}

				.c-content {
					flex: 1;
					display: flex;
					flex-direction: column;
					border-bottom: 1rpx solid #f5f5f5;
					padding-bottom: 30rpx;

					.c-name {
						font-size: 28rpx;
						color: #666;
						margin-bottom: 10rpx;
					}

					.c-text {
						font-size: 28rpx;
						color: #333;
						line-height: 1.5;
						margin-bottom: 12rpx;
					}

					.c-time {
						font-size: 22rpx;
						color: #999;
					}
				}
				
				&:last-child .c-content {
					border-bottom: none;
					padding-bottom: 0;
				}
			}
		}
	}

	.bottom-bar {
		padding: 20rpx 30rpx calc(20rpx + env(safe-area-inset-bottom));
		background: #fff;
		border-top: 1rpx solid #eee;
		display: flex;
		align-items: center;
		gap: 20rpx;

		.comment-input {
			flex: 1;
			height: 72rpx;
			background: #f5f5f5;
			border-radius: 36rpx;
			padding: 0 30rpx;
			font-size: 28rpx;
		}

		.send-btn {
			width: 120rpx;
			height: 72rpx;
			border-radius: 36rpx;
			background: #ccc;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			transition: all 0.3s;

			&.active {
				background: #4AA9FE;
			}
		}
	}

	/* Dark Theme */
	.theme-dark {
		&.forum-detail-page {
			background: #111216;
		}
		
		.nav-bar {
			background: rgba(30, 32, 36, 0.85);
			backdrop-filter: blur(20px);
			border-bottom: 1rpx solid rgba(255, 255, 255, 0.05);

			.nav-left {
				background: rgba(255, 255, 255, 0.05);
				.back-icon { color: #eef2f8; }
			}
			.nav-title { color: #f4f7fb; }
			.nav-subtitle { color: #8090ad; }
		}

		.post-card, .comment-section {
			background: #17191f;
			border: 1rpx solid rgba(255, 255, 255, 0.03);
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
		}

		.post-card {
			.author-meta {
				.name { color: #eef2f8; }
				.time { color: #66758f; }
			}
			.post-text { color: #d1d8e5; }
			
			.image-grid .grid-img {
				opacity: 0.9;
			}

			.post-actions-line { 
				border-top-color: rgba(255, 255, 255, 0.05); 
				.view-count { color: #66758f; }
				.actions .action-btn {
					.icon, .text { color: #8090ad; }
					&.delete-btn {
						.icon, .text { color: #ff4d4f; }
					}
				}
			}
		}

		.comment-section {
			.comment-header {
				.line-marker { background: #5d76bd; }
				.title { color: #eef2f8; }
			}
			.empty-comment { color: #66758f; }
			.comment-list .comment-item .c-content {
				border-bottom-color: rgba(255, 255, 255, 0.03);
				.c-name { color: #8090ad; }
				.c-text { color: #d1d8e5; }
				.c-time { color: #66758f; }
			}
		}

		.bottom-bar {
			background: #17191f;
			border-top-color: rgba(255, 255, 255, 0.05);
			.comment-input {
				background: #23252b;
				color: #f4f7fb;
				border: 1rpx solid rgba(255, 255, 255, 0.05);
			}
			.send-btn {
				background: #2a2c33;
				color: #66758f;
				&.active {
					background: #5d76bd;
					color: #fff;
				}
			}
		}
	}
</style>