<template>
	<view class="forum-detail-page" :class="themeClass">
		<view class="detail-overlay" :class="{ 'is-leaving': isLeaving }" @click="goBack"></view>
		<view class="detail-shell" :class="{ 'is-leaving': isLeaving }">
			<!-- 顶部导航栏 -->
			<view class="nav-bar">
				<view class="nav-left" @click="goBack">
					<text class="back-icon">‹</text>
				</view>
				<view class="nav-title-box">
					<text class="nav-title">帖子详情</text>
				</view>
				<view class="nav-right"></view>
			</view>

			<scroll-view class="detail-scroll" scroll-y>
				<!-- 帖子正文块 -->
				<view class="post-card">
				<view class="author-info">
					<image class="avatar" :src="getAvatar(post.authorAvatar, post.userId)" mode="aspectFill"></image>
					<view class="author-meta">
						<text class="name">{{ getAuthorName(post.authorName, post.userId) }}</text>
						<text class="profile-text" v-if="getAuthorProfileText(post)">{{ getAuthorProfileText(post) }}</text>
						<text class="time">{{ formatTime(post.createTime) }}</text>
					</view>
					<view class="delete-btn" v-if="isAuthor" @click="deletePost">删除</view>
				</view>

				<text class="post-text text-wrap-safe">{{ post.content }}</text>

				<!-- 图片展示区 -->
				<view class="post-images" :class="getImageLayoutClass(postImages)" v-if="postImages.length > 0">
					<view class="image-wrapper" v-for="(img, idx) in postImages" :key="idx" @click="previewImage(idx)">
						<image class="post-img" :src="getFullUrl(img)" :mode="postImages.length === 1 ? 'widthFix' : 'aspectFill'"></image>
					</view>
				</view>

				<view class="post-actions-line">
					<text class="view-count">浏览 {{ post.views || post.viewCount || Math.floor(Math.random() * 10000) }}</text>
					<view class="actions">
						<view class="action-btn" @click="likePost">
							<image class="icon-svg" :src="post.isLiked ? '/static/icons/like-active.svg' : '/static/icons/like.svg'"></image>
							<text class="count" :class="{ 'active-color': post.isLiked }">{{ post.likeCount || 0 }}</text>
						</view>
						<view class="action-btn collect-hint" @click="toggleCollect">
							<image class="icon-svg" :src="post.isCollected ? '/static/icons/star-active.svg' : '/static/icons/star.svg'"></image>
						</view>
					</view>
				</view>
			</view>

				<!-- 评论区 -->
				<view class="comment-section">
				<view class="comment-header">
					<text class="title">全部评论 {{ comments.length > 0 ? `(${comments.length})` : '' }}</text>
				</view>
				
				<view class="empty-comment" v-if="comments.length === 0">
					<text>暂无评论，快来抢沙发吧~</text>
				</view>

				<view class="comment-list" v-else>
					<view class="comment-item" v-for="item in comments" :key="item.commentId">
						<image class="c-avatar" :src="getAvatar(item.authorAvatar, item.userId)" mode="aspectFill"></image>
						<view class="c-content">
							<view class="c-name-time">
								<text class="c-name">{{ getAuthorName(item.authorName, item.userId) }}</text>
								<text class="c-time">{{ formatTime(item.createTime) }}</text>
							</view>
							<text class="c-text text-wrap-safe">{{ item.content }}</text>
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
	</view>
</template>

<script>
	import { request } from '@/api/request.js'
	import { BASE_URL } from '@/api/config.js'
	import themeMixin from '@/utils/themeMixin.js'
	import { checkContent, getRandomPoemPair } from '@/utils/sensitiveWords.js'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				postId: null,
				post: {},
				postImages: [],
				comments: [],
				commentText: '',
				isLeaving: false,
				allowNativeBack: false
			}
		},
		computed: {
			isAuthor() {
				const user = uni.getStorageSync('user') || {}
				const currentUserId = user.userId || user.id
				return this.post && currentUserId && this.post.userId === currentUserId
			}
		},
		onBackPress() {
			if (this.allowNativeBack) return false
			this.goBack()
			return true
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
				if (this.isLeaving) return
				this.isLeaving = true
				setTimeout(() => {
					this.allowNativeBack = true
					uni.navigateBack()
				}, 240)
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
						setTimeout(() => this.goBack(), 1500)
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
			getAuthorProfileText(item) {
				const currentUser = uni.getStorageSync('user') || uni.getStorageSync('user_v2') || {}
				const currentUserId = currentUser.userId || currentUser.id
				const currentProfile = currentUser.profile || {}
				if (item.userId && currentUserId && item.userId === currentUserId) {
					const grade = currentProfile.grade || currentUser.grade || currentProfile.graduationYear || currentUser.graduationYear || ''
					const major = currentProfile.major || currentUser.major || ''
					return [grade, major].filter(Boolean).join(' · ')
				}
				const grade = item.grade || item.authorGrade || item.graduationYear || ''
				const major = item.major || item.authorMajor || ''
				return [grade, major].filter(Boolean).join(' · ')
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
			getImageLayoutClass(images) {
				if (!images || images.length === 0) return '';
				if (images.length === 1) return 'layout-1';
				return 'layout-multi';
			},
			toggleCollect() {
				const originalIsCollected = this.post.isCollected;
				this.$set(this.post, 'isCollected', !originalIsCollected);
				
				uni.showToast({
					title: originalIsCollected ? '已取消收藏' : '收藏成功',
					icon: 'success'
				});
				
				let favorites = uni.getStorageSync('favorites') || [];
				if (originalIsCollected) {
					favorites = favorites.filter(fav => !(fav.isForumPost && String(fav.id) === String(this.postId)));
				} else {
					let plainText = this.post.content ? this.post.content.replace(/<[^>]+>/g, "") : '分享内容';
					let title = plainText.length > 12 ? plainText.substring(0, 12) + '...' : plainText;
					let coverImage = this.postImages.length > 0 ? this.getFullUrl(this.postImages[0]) : this.getAvatar(this.post.authorAvatar, this.post.userId);
					
					favorites.unshift({
						id: this.postId,
						isForumPost: true,
						type: '论坛',
						title: title,
						image: coverImage,
						user_avatar: this.post.authorAvatar,
						user_name: this.post.authorName,
						time: this.post.createTime,
						place: '小程序论坛',
						desc: this.post.content,
						create_time: new Date().getTime()
					});
				}
				uni.setStorageSync('favorites', favorites);
				uni.setStorageSync('currentPost_' + this.postId, this.post);
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
						uni.$emit('refreshForumList'); 
					} else {
						
						this.post = originalPost;
						uni.showToast({ title: res.msg || '操作失败', icon: 'none' });
					}
				}).catch((err) => {
			
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
										this.goBack()
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
			async sendComment() {
				if (!this.commentText.trim()) return
				
				const sensitiveResult = await checkContent(this.commentText)
				if (sensitiveResult.hasSensitive) {
					uni.showToast({ title: '内容包含敏感词，已自动替换为古诗', icon: 'none' })
					this.commentText = sensitiveResult.replacement || getRandomPoemPair()
				}
				
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
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		background: transparent;
		overflow: hidden;
	}

	.detail-overlay {
		position: absolute;
		inset: 0;
		background: rgba(15, 23, 42, 0.14);
		animation: detail-overlay-enter 260ms ease-out;
		will-change: opacity;

		&.is-leaving {
			animation: detail-overlay-leave 240ms ease-in forwards;
		}
	}

	.detail-shell {
		position: relative;
		z-index: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f6f6f6;
		box-shadow: 0 -12rpx 48rpx rgba(15, 23, 42, 0.18);
		animation: detail-shell-enter 260ms cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform, opacity;

		&.is-leaving {
			animation: detail-shell-leave 240ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
			pointer-events: none;
		}
	}

	@keyframes detail-overlay-enter {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes detail-overlay-leave {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes detail-shell-enter {
		from {
			transform: translateY(100%);
			opacity: 0.98;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes detail-shell-leave {
		from {
			transform: translateY(0);
			opacity: 1;
		}
		to {
			transform: translateY(100%);
			opacity: 0.98;
		}
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 20rpx) 30rpx 20rpx;
		background: #fff;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);

		.nav-left {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			.back-icon {
				font-size: 56rpx;
				color: #333;
				font-weight: 300;
				margin-top: -8rpx;
			}
		}

		.nav-title-box {
			flex: 1;
			display: flex;
			justify-content: center;
			.nav-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
		}
		
		.nav-right {
			width: 60rpx;
		}
	}

	.detail-scroll {
		flex: 1;
		min-height: 0;
	}

	.post-card {
		background: #fff;
		padding: 30rpx;
		margin-bottom: 16rpx;

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
				background: #f0f0f0;
			}

			.author-meta {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.name {
					font-size: 30rpx;
					font-weight: bold;
					color: #333;
				}

				.profile-text {
					font-size: 22rpx;
					color: #999;
					margin-top: 4rpx;
				}

				.time {
					font-size: 24rpx;
					color: #999;
					margin-top: 6rpx;
				}
			}
			
			.delete-btn {
				font-size: 26rpx;
				color: #ff4d4f;
				border: 1rpx solid #ff4d4f;
				padding: 6rpx 24rpx;
				border-radius: 30rpx;
				font-weight: 500;
			}
		}

		.post-text {
			font-size: 32rpx;
			color: #333;
			line-height: 1.6;
			margin-bottom: 24rpx;
			display: block;
		}

		.post-images {
			display: flex;
			flex-wrap: wrap;
			gap: 10rpx;
			margin-bottom: 30rpx;
			
			.image-wrapper {
				border-radius: 12rpx;
				overflow: hidden;
				background: #f8f8f8;
				
				.post-img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

			&.layout-1 {
				.image-wrapper {
					width: 70%;
					height: auto;
				}
			}

			&.layout-multi {
				.image-wrapper {
					width: calc((100% - 20rpx) / 3);
					height: 0;
					padding-bottom: calc((100% - 20rpx) / 3);
					position: relative;

					.post-img {
						position: absolute;
						top: 0;
						left: 0;
					}
				}
			}
		}

		.post-actions-line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 24rpx;
			border-top: 1rpx solid rgba(0,0,0,0.05);

			.view-count {
				font-size: 26rpx;
				color: #999;
			}

			.actions {
				display: flex;
				gap: 40rpx;

				.action-btn {
					display: flex;
					align-items: center;
					gap: 8rpx;

					&.collect-hint {
						/* TODO: 临时背景色提示，后期可在此处修改或删除 */
						background-color: rgba(255, 193, 7, 0.3);
						padding: 4rpx 20rpx;
						border-radius: 30rpx;
					}

					.icon-svg {
						width: 36rpx;
						height: 36rpx;
						opacity: 0.6;
					}

					.count {
						font-size: 28rpx;
						color: #999;
						
						&.active-color {
							color: rgb(250, 81, 81);
						}
					}
				}
			}
		}
	}

	.comment-section {
		background: #fff;
		padding: 30rpx;
		min-height: 500rpx;

		.comment-header {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;

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
				margin-bottom: 40rpx;

				.c-avatar {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					margin-right: 24rpx;
					display: block;
					flex-shrink: 0;
					background: #f0f0f0;
				}

				.c-content {
					flex: 1;
					display: flex;
					flex-direction: column;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.03);
					padding-bottom: 40rpx;

					.c-name-time {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 12rpx;
						
						.c-name {
							font-size: 28rpx;
							font-weight: bold;
							color: #333;
						}
						
						.c-time {
							font-size: 22rpx;
							color: #999;
						}
					}

					.c-text {
						font-size: 30rpx;
						color: #333;
						line-height: 1.5;
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
		border-top: 1rpx solid rgba(0, 0, 0, 0.05);
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
			background: #e0e0e0;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-weight: bold;
			transition: all 0.3s;

			&.active {
				background: #4AA9FE;
			}
		}
	}

	/* Dark Theme */
	.theme-dark {
		&.forum-detail-page {
			background: transparent;
		}

		.detail-overlay {
			background: rgba(0, 0, 0, 0.32);
		}
		
		.detail-shell {
			background: #111216;
			box-shadow: 0 -12rpx 48rpx rgba(0, 0, 0, 0.38);
		}
		
		.nav-bar {
			background: #111216;
			border-bottom: 1rpx solid rgba(255, 255, 255, 0.05);

			.nav-left {
				.back-icon { color: #eef2f8; }
			}
			.nav-title { color: #f4f7fb; }
		}

		.post-card, .comment-section {
			background: #17191f;
		}

		.post-card {
			.author-meta {
				.name { color: #eef2f8; }
				.time-row {
					.time { color: #66758f; }
					.tag { background: #23252b; color: #8090ad; }
				}
			}
			.post-text { color: #d1d8e5; }
			
			.post-images .image-wrapper {
				background: #23252b;
				.post-img { opacity: 0.9; }
			}

			.post-actions-line { 
				border-top-color: rgba(255, 255, 255, 0.05); 
				.view-count { color: #66758f; }
				.actions .action-btn {
					.count { color: #8090ad; }
				}
			}
		}

		.comment-section {
			.comment-header {
				.title { color: #eef2f8; }
			}
			.empty-comment { color: #66758f; }
			.comment-list .comment-item .c-content {
				border-bottom-color: rgba(255, 255, 255, 0.03);
				.c-name-time {
					.c-name { color: #eef2f8; }
					.c-time { color: #66758f; }
				}
				.c-text { color: #d1d8e5; }
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
