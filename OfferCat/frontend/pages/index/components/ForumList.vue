<template>
	<view class="forum-section" :class="themeClass">
		<view class="forum-header">
			<text class="forum-title">论坛专区</text>
		</view>
		<view class="forum-list-container">
			<view class="forum-list">
				<!-- 帖子列表 -->
				<view class="forum-card card shadow-soft" v-for="item in postList" :key="item.postId || item.id" @click="goToDetail(item)">
					<view class="forum-card-content">
						<!-- 上方信息 -->
						<view class="card-user-info">
							<image class="user-avatar" :src="getAvatar(item.authorAvatar, item.userId)" mode="aspectFill"></image>
							<view class="user-meta">
								<text class="user-name">{{ getAuthorName(item.authorName, item.userId) }}</text>
								<text class="post-time">{{ formatTime(item.createTime) }}</text>
							</view>
							<text class="post-tag">讨论</text>
						</view>
						
						<!-- 内容区域 - 固定高度产生留白 -->
						<view class="card-main">
							<text class="post-desc text-wrap-safe">{{ item.content || '' }}</text>
						</view>

						<!-- 图片展示区 (最多显示3张) - 固定高度 -->
						<view class="post-images">
							<view class="image-wrapper" v-for="(img, index) in getImagesList(item.images).slice(0, 3)" :key="index">
								<image class="post-img" :src="getFullUrl(img)" mode="aspectFill"></image>
								<view class="more-images-badge" v-if="index === 2 && getImagesList(item.images).length > 3">
									<text class="more-text">+{{ getImagesList(item.images).length - 3 }}</text>
								</view>
							</view>
						</view>

						<!-- 底部操作区 -->
						<view class="card-actions">
							<view class="action-item">
								<image class="icon-svg" src="/static/icons/comment.svg"></image>
								<text class="count">{{ item.commentCount || 0 }}</text>
							</view>
							<view class="action-item" @click.stop="likePost(item)">
								<image class="icon-svg" :src="item.isLiked ? '/static/icons/like-active.svg' : '/static/icons/like.svg'"></image>
								<text class="count" :style="{ color: item.isLiked ? 'rgb(250, 81, 81)' : '' }">{{ item.likeCount || 0 }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 空状态提示 -->
				<view class="empty-state" v-if="postList.length === 0">
					<text class="empty-text">暂无帖子可查看</text>
				</view>
			</view>
			
			<!-- 分页控件 -->
			<view class="pagination-controls" v-if="totalPages > 0">
				<view class="page-btn" :class="{ disabled: pageNum === 1 }" @click="goToFirstPage">首页</view>
				<picker class="page-picker" mode="selector" :range="pageRange" :value="pageNum - 1" @change="onPageChange">
					<view class="page-picker-text">第 {{ pageNum }} 页 / 共 {{ totalPages }} 页 ▾</view>
				</picker>
				<view class="page-btn" :class="{ disabled: pageNum === totalPages }" @click="goToLastPage">尾页</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { request } from '@/api/request.js'
	import { BASE_URL } from '@/api/config.js'

	export default {
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		data() {
			return {
				postList: [],
				pageNum: 1,
				pageSize: 3,
				total: 0,
				totalPages: 0
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			pageRange() {
				const range = []
				for (let i = 1; i <= this.totalPages; i++) {
					range.push(`第 ${i} 页`)
				}
				return range
			}
		},
		created() {
			uni.$on('refreshForumList', this.fetchPosts);
		},
		beforeDestroy() {
			uni.$off('refreshForumList', this.fetchPosts);
		},
		mounted() {
			this.fetchPosts()
		},
		methods: {
			fetchPosts() {
				request({
					url: '/api/forum/post/search',
					method: 'POST',
					data: {
						keyword: '',
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				}).then(res => {
					if (res.code === 200 && res.data) {
						this.postList = (res.data.records || []).map(item => {
							return {
								...item,
								isLiked: item.isLiked || false // 确保属性是响应式的
							}
						})
						this.total = res.data.total || 0
						this.totalPages = res.data.pages || Math.ceil(this.total / this.pageSize)
					}
				}).catch(err => {
					console.error('获取帖子列表失败', err)
				})
			},
			goToDetail(item) {
				const id = item.postId || item.id;
				// 缓存完整帖子数据，绕过后端崩溃的 detail 接口
				uni.setStorageSync('currentPost_' + id, item);
				uni.navigateTo({
					url: `/subPages/forum/detail?id=${id}`
				});
			},
			goToFirstPage() {
				if (this.pageNum > 1) {
					this.pageNum = 1
					this.fetchPosts()
				}
			},
			goToLastPage() {
				if (this.pageNum < this.totalPages) {
					this.pageNum = this.totalPages
					this.fetchPosts()
				}
			},
			onPageChange(e) {
				const index = Number(e.detail.value)
				this.pageNum = index + 1
				this.fetchPosts()
			},
			getAvatar(avatar, postUserId) {
				const currentUser = uni.getStorageSync('user') || {}
				const currentUserId = currentUser.userId || currentUser.id
				
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
			getImagesList(imagesStr) {
				if (!imagesStr) return []
				try {
					let arr = JSON.parse(imagesStr)
					if (Array.isArray(arr)) return arr
				} catch (e) {
					return imagesStr.split(',').filter(s => s.trim())
				}
				return []
			},
			getCoverImage(item) {
				let imagesStr = item.images;
				if (imagesStr) {
					try {
						let arr = JSON.parse(imagesStr)
						if (Array.isArray(arr) && arr.length > 0) return this.getFullUrl(arr[0])
					} catch (e) {
						let arr = imagesStr.split(',').filter(s => s.trim())
						if (arr.length > 0) return this.getFullUrl(arr[0])
					}
				}
				// 没图片就用头像
				return this.getFullUrl(item.authorAvatar) || '/static/default-avatar.jpg'
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
			likePost(item) {
				const user = uni.getStorageSync('user_v2') || {};
				const userId = user.userId || user.id;
				if (!userId) {
					uni.showToast({ title: '请先登录', icon: 'none' });
					return;
				}

				const postIndex = this.postList.findIndex(p => p.postId === item.postId);
				if (postIndex === -1) return;

				const post = this.postList[postIndex];
				const originalIsLiked = post.isLiked;

				// Optimistic UI update
				const updatedPost = {
					...post,
					isLiked: !post.isLiked,
					likeCount: post.isLiked ? Math.max(0, post.likeCount - 1) : post.likeCount + 1
				};
				this.$set(this.postList, postIndex, updatedPost);

				const baseUrl = originalIsLiked ? `/api/forum/post/unlike/${item.postId}` : `/api/forum/post/like/${item.postId}`;

				request({
					url: baseUrl,
					method: 'POST',
					data: {
						userId
					}
				}).then(res => {
					if (res.code === 200) {
						uni.showToast({ title: originalIsLiked ? '取消点赞' : '点赞成功', icon: 'none' });
						uni.setStorageSync('currentPost_' + item.postId, this.postList[postIndex]);
					} else {
						// Revert on failure
						this.$set(this.postList, postIndex, post);
						uni.showToast({ title: res.msg || '操作失败', icon: 'none' });
					}
				}).catch((err) => {
				// Revert on error
				this.$set(this.postList, postIndex, post);
				uni.showToast({ title: err.message || '网络错误', icon: 'none' });
			});
			}
		}
	}
</script>

<style lang="scss">
	.forum-section {
		margin-top: 40rpx;
		background: rgba(255, 255, 255, 0.45);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 40rpx;
		padding: 30rpx;
		box-shadow: 0 8rpx 32rpx 0 rgba(31, 38, 135, 0.05);
		border: 2rpx solid rgba(255, 255, 255, 0.8);
	}

	.forum-list-container {
		display: flex;
		flex-direction: column;
	}

	.forum-list {
		height: 1512rpx; /* 3个卡片的高度: 3 * (480 + 24) = 1512 */
		overflow: hidden;
	}

	.empty-state {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		
		.empty-text {
			font-size: 26rpx;
			color: #999;
		}
	}

	.forum-header {
		margin-bottom: 24rpx;
		.forum-title {
			font-size: 34rpx;
			font-weight: bold;
			color: #15305e;
		}
	}

	.forum-card {
		padding: 24rpx;
		margin-bottom: 24rpx;
		background: rgba(255, 255, 255, 0.7);
		border: 2rpx solid rgba(255, 255, 255, 1);
		border-radius: 32rpx;
		overflow: hidden;
		height: 480rpx; /* 极简高度: 头像+文字+图片+底部 */
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);
	}

	.forum-card-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		flex: 1;
		
		.card-user-info {
			display: flex;
			align-items: center;
			gap: 16rpx;
			flex-shrink: 0;
			
			.user-avatar {
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				background: #f0f0f0;
				display: block;
				flex-shrink: 0;
				overflow: hidden;
			}
			
			.user-meta {
				flex: 1;
				display: flex;
				flex-direction: column;
				
				.user-name {
					font-size: 28rpx;
					font-weight: 600;
					color: #15305e;
				}
				
				.post-time {
					font-size: 22rpx;
					color: #999;
					margin-top: 4rpx;
				}
			}
			
			.post-tag {
				font-size: 22rpx;
				color: #4AA9FE;
				background: rgba(74, 169, 254, 0.1);
				padding: 6rpx 16rpx;
				border-radius: 30rpx;
			}
		}
		
		.card-main {
			height: 42rpx; /* 仅保留一行文字高度 (28rpx * 1.5 = 42rpx) */
			margin: 16rpx 0;
			flex-shrink: 0;
			.post-desc {
				font-size: 28rpx;
				color: #555;
				line-height: 1.5;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1; /* 强制只显示一行 */
				overflow: hidden;
			}
		}
		
		.post-images {
			display: flex;
			gap: 12rpx;
			height: 210rpx; /* 固定图片区域高度 */
			flex-shrink: 0;
			
			.image-wrapper {
				position: relative;
				width: 210rpx;
				height: 210rpx;
				border-radius: 16rpx;
				overflow: hidden;
				background: #f8f8f8;
				
				.post-img {
					width: 100%;
					height: 100%;
				}
				
				.more-images-badge {
					position: absolute;
					bottom: 8rpx;
					right: 8rpx;
					background: rgba(0, 0, 0, 0.6);
					padding: 4rpx 12rpx;
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					
					.more-text {
						color: #fff;
						font-size: 24rpx;
						font-weight: bold;
					}
				}
			}
		}
		
		.card-actions {
			display: flex;
			align-items: center;
			gap: 30rpx;
			margin-top: auto; /* 自动推到容器底部 */
			padding-top: 20rpx;
			border-top: 1rpx solid rgba(0, 0, 0, 0.05);
			flex-shrink: 0;
			
			.action-item {
				display: flex;
				align-items: center;
				gap: 10rpx;
				
				.icon-svg {
					width: 32rpx;
					height: 32rpx;
				}
				
				.count {
					font-size: 26rpx;
					color: #999;
				}
			}
		}
	}

	.pagination-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20rpx;
		padding: 20rpx 0 10rpx;

		.page-btn {
			font-size: 26rpx;
			color: #5d76bd;
			padding: 10rpx 24rpx;
			border-radius: 30rpx;
			background: rgba(93, 118, 189, 0.1);
			
			&.disabled {
				color: #999;
				background: #f0f0f0;
				pointer-events: none;
			}
		}

		.page-picker {
			.page-picker-text {
				font-size: 26rpx;
				color: #333;
				padding: 10rpx 20rpx;
			}
		}
	}

	/* Dark Theme */
	.theme-dark {
		&.forum-section {
			background: rgba(30, 32, 36, 0.45);
			border-color: rgba(255, 255, 255, 0.08);
			box-shadow: 0 8rpx 32rpx 0 rgba(0, 0, 0, 0.2);
		}
		.forum-title { color: #f4f7fb; }
		.forum-card {
			background: rgba(255, 255, 255, 0.03);
			border-color: rgba(255, 255, 255, 0.05);
		}
		.forum-card-content {
			.card-user-info .user-meta .user-name { color: #f4f7fb; }
			.card-user-info .user-meta .post-time { color: rgba(255, 255, 255, 0.4); }
			.card-main .post-desc { color: rgba(255, 255, 255, 0.7); }
			.card-actions { border-top-color: rgba(255, 255, 255, 0.05); }
		}
		.empty-text { color: rgba(255, 255, 255, 0.4); }
		.pagination-controls {
			.page-btn {
				color: #8da4e6;
				background: rgba(141, 164, 230, 0.15);
				&.disabled {
					color: #666;
					background: #2a2a2a;
				}
			}
			.page-picker-text {
				color: #ccc;
			}
		}
	}
</style>
