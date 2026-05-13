<template>
	<view class="forum-section" :class="themeClass">
		<!-- 标签栏 -->
		<scroll-view scroll-x class="tabs-scroll" :show-scrollbar="false">
			<view class="tabs-container">
				<view class="tab-item" v-for="(item, index) in tabs" :key="index" :class="{ active: currentTab === index }" @click="switchTab(index)">
					<text class="tab-text">{{ item }}</text>
				</view>
				<!-- 滑动指示器 -->
				<view class="indicator-wrapper" :style="{ transform: 'translateX(' + (currentTab * 100) + '%)' }">
					<view class="sliding-indicator"></view>
				</view>
			</view>
		</scroll-view>

		<view class="forum-list-container">
			<view class="forum-list">
				<!-- 帖子列表 -->
				<view class="forum-card" v-for="(item, index) in postList" :key="item.postId || item.id" @click="goToDetail(item)">
					<view class="forum-card-content">
						<!-- 上方信息 -->
						<view class="card-user-info">
							<image class="user-avatar" :src="getAvatar(item.authorAvatar, item.userId)" mode="aspectFill"></image>
							<view class="user-meta">
								<text class="user-name">{{ getAuthorName(item.authorName, item.userId) }}</text>
								<view class="user-tag-row">
									<image class="tag-icon" src="/static/icons/tag.svg" mode="aspectFit" v-if="item.tag"></image>
									<text class="user-tag">{{ item.tag || '默认分区' }}</text>
								</view>
							</view>
						</view>
						
						<!-- 内容区域 - 超出字数截断并把 ...全部 固定在同一行 -->
						<view class="card-main">
							<view class="post-desc-container">
								<text class="post-desc" v-if="item.content && item.content.length > 75">
									{{ getPreviewContent(item.content) }}<text class="suffix-inline">...<text class="expand-btn-inline" @click.stop="goToDetail(item)">全部</text></text>
								</text>
								<text class="post-desc" v-else>{{ item.content || '' }}</text>
							</view>
						</view>

						<!-- 图片展示区 -->
						<view class="post-images" :class="getImageLayoutClass(getImagesList(item.images))" v-if="getImagesList(item.images).length > 0">
							<view class="image-wrapper" v-for="(img, imgIndex) in getImagesList(item.images).slice(0, 3)" :key="imgIndex" @click.stop="previewImage(img, getImagesList(item.images))">
								<image class="post-img" :src="getFullUrl(img)" :mode="getImagesList(item.images).length === 1 ? 'widthFix' : 'aspectFill'"></image>
								<view class="more-images-badge" v-if="imgIndex === 2 && getImagesList(item.images).length > 3">
									<text class="more-text">+{{ getImagesList(item.images).length - 3 }}</text>
								</view>
							</view>
						</view>

						<!-- 底部操作区 -->
						<view class="card-actions">
							<text class="view-count">浏览 {{ item.views || Math.floor(Math.random() * 10000) }}</text>
							<view class="action-right">
								<view class="action-item" @click.stop="likePost(item)">
									<image class="icon-svg" :src="item.isLiked ? '/static/icons/like-active.svg' : '/static/icons/like.svg'"></image>
									<text class="count" :class="{ 'active-color': item.isLiked }">{{ item.likeCount || 0 }}</text>
								</view>
								<view class="action-item">
									<image class="icon-svg" src="/static/icons/comment.svg"></image>
									<text class="count">{{ item.commentCount || 0 }}</text>
								</view>
								<view class="action-item collect-hint" @click.stop="toggleCollect(item, index)">
									<image class="icon-svg" :src="item.isCollected ? '/static/icons/star-active.svg' : '/static/icons/star.svg'"></image>
								</view>
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
				<!-- 首页/页码选择/尾页三种方式共同控制分页。 -->
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
				tabs: ['全部', '热点', '好友'],
				currentTab: 0,
				// 帖子列表与分页状态一起维护当前论坛卡片展示结果。
				postList: [],
				pageNum: 1,
				pageSize: 3,
				total: 0,
				totalPages: 0
			}
		},
		computed: {
			themeClass() {
				// 论坛区整体按主题切换毛玻璃背景和文字颜色。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			pageRange() {
				// 生成 picker 使用的页码文案数组。
				const range = []
				for (let i = 1; i <= this.totalPages; i++) {
					range.push(`第 ${i} 页`)
				}
				return range
			}
		},
		created() {
			// 监听外部刷新事件，发帖或详情页操作后可主动更新首页列表。
			uni.$on('refreshForumList', this.fetchPosts);
		},
		beforeDestroy() {
			// 组件销毁时移除全局事件监听，避免重复绑定。
			uni.$off('refreshForumList', this.fetchPosts);
		},
		mounted() {
			// 首次进入首页时拉取第一页帖子数据。
			// this.fetchPosts()
			// 临时注入静态帖子数据
			this.postList = [
				{
					postId: 'mock_1',
					id: 'mock_1',
					userId: 'user_001',
					authorName: 'Wind',
					tag: '腾讯游戏筛选',
					authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
					createTime: '2026-05-13 10:30',
					content: '又麻烦大家帮我做选择了，这次的疑问是，我想抽扣扣酱，但是又看到这次传说级手办制作很棒，导致我很犹豫，从今天到15号我算了下大概能攒多少资源，大家觉得哪个更划算一点呢？求建议！',
					images: '["https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"]',
					views: 7640,
					commentCount: 48,
					likeCount: 3,
					isLiked: false,
					isCollected: false
				},
				{
					postId: 'mock_2',
					id: 'mock_2',
					userId: 'user_002',
					authorName: '(ฅωฅ)',
					tag: '三角洲行动',
					authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mia',
					createTime: '2026-05-12 18:45',
					content: '雷霆*忧郁小猫不让我睡觉，还不让我发游戏，我要曝光你。每天晚上都在我键盘上跑酷，真的是太调皮了！哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
					images: '["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80"]',
					views: 3201,
					commentCount: 15,
					likeCount: 102,
					isLiked: true,
					isCollected: true
				}
			];
		},
		methods: {
			getPreviewContent(content) {
				if (!content) return ''
				// 预留尾部“...全部”的宽度，避免末尾按钮换行。
				return content.length > 68 ? content.substring(0, 68) : content
			},
			toggleCollect(item, index) {
				const originalIsCollected = item.isCollected;
				// 乐观更新
				this.$set(this.postList, index, { ...item, isCollected: !originalIsCollected });
				
				uni.showToast({
					title: originalIsCollected ? '已取消收藏' : '收藏成功',
					icon: 'success'
				});
				
				// 同步到本地缓存，参考旧版 comment 功能
				let favorites = uni.getStorageSync('favorites') || [];
				if (originalIsCollected) {
					favorites = favorites.filter(fav => !(fav.isForumPost && String(fav.id) === String(item.postId)));
				} else {
					let plainText = item.content ? item.content.replace(/<[^>]+>/g, "") : '分享内容';
					let title = plainText.length > 12 ? plainText.substring(0, 12) + '...' : plainText;
					
					favorites.unshift({
						id: item.postId,
						isForumPost: true,
						type: '论坛',
						title: title,
						image: this.getCoverImage(item),
						user_avatar: item.authorAvatar,
						user_name: item.authorName,
						time: item.createTime,
						place: '小程序论坛',
						desc: item.content,
						create_time: new Date().getTime()
					});
				}
				uni.setStorageSync('favorites', favorites);
			},
			switchTab(index) {
				if (this.currentTab === index) return;
				if (index === 2) {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					});
					return;
				}
				this.currentTab = index;
				this.pageNum = 1;
				// this.fetchPosts();
			},
			fetchPosts() {
				// 按当前页码和页大小请求论坛帖子，并补齐点赞响应字段。
				request({
					url: '/api/forum/post/search',
					method: 'POST',
					data: {
						keyword: '',
						pageNum: this.pageNum,
						pageSize: this.currentTab === 1 ? 20 : this.pageSize, // 热点多拉一些用于本地排序
						sort: this.currentTab === 1 ? 'hot' : 'latest'
					}
				}).then(res => {
					if (res.code === 200 && res.data) {
						let records = res.data.records || [];
						if (this.currentTab === 1) {
							// 热点：前端按热度排序并取前3
							records.sort((a, b) => ((b.likeCount || 0) + (b.commentCount || 0)) - ((a.likeCount || 0) + (a.commentCount || 0)));
							records = records.slice(0, 3);
						}
						this.postList = records.map(item => {
							return {
								...item,
								isLiked: item.isLiked || false // 确保属性是响应式的
							}
						})
						this.total = this.currentTab === 1 ? records.length : (res.data.total || 0);
						this.totalPages = this.currentTab === 1 ? 1 : (res.data.pages || Math.ceil(this.total / this.pageSize));
					}
				}).catch(err => {
					console.error('获取帖子列表失败', err)
				})
			},
			goToDetail(item) {
				// 详情页先缓存完整帖子数据，规避后端详情接口异常时无法展示。
				const id = item.postId || item.id;
				// 缓存完整帖子数据，绕过后端崩溃的 detail 接口
				uni.setStorageSync('currentPost_' + id, item);
				uni.navigateTo({
					url: `/subPages/forum/detail?id=${id}`
				});
			},
			goToFirstPage() {
				// 快速回到第一页并重新拉取列表。
				if (this.pageNum > 1) {
					this.pageNum = 1
					this.fetchPosts()
				}
			},
			goToLastPage() {
				// 快速跳到最后一页并重新拉取列表。
				if (this.pageNum < this.totalPages) {
					this.pageNum = this.totalPages
					this.fetchPosts()
				}
			},
			onPageChange(e) {
				// picker 选择页码后同步更新当前页并刷新数据。
				const index = Number(e.detail.value)
				this.pageNum = index + 1
				this.fetchPosts()
			},
			getAvatar(avatar, postUserId) {
				// 当前用户自己的帖子优先使用本地资料头像，避免接口返回旧头像。
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
				// 当前用户自己的帖子优先使用本地昵称，保持和个人资料页一致。
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
			getImageLayoutClass(images) {
				if (!images || images.length === 0) return '';
				if (images.length === 1) return 'layout-1';
				return 'layout-multi';
			},
			getImagesList(imagesStr) {
				// 同时兼容 JSON 数组和逗号分隔字符串两种图片字段格式。
				if (!imagesStr) return []
				try {
					let arr = JSON.parse(imagesStr)
					if (Array.isArray(arr)) return arr
				} catch (e) {
					return imagesStr.split(',').filter(s => s.trim())
				}
				return []
			},
			previewImage(currentImg, allImages) {
				const urls = allImages.map(img => this.getFullUrl(img));
				uni.previewImage({
					current: this.getFullUrl(currentImg),
					urls: urls
				});
			},
			getCoverImage(item) {
				// 兜底封面优先取首图，没有图片时退回作者头像。
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
				// 统一补全相对路径，兼容 http 和 base64 等已完整地址。
				if (!url) return ''
				if (url.startsWith('http') || url.startsWith('data:')) return url
				return BASE_URL + url
			},
			formatTime(timeStr) {
				// 同时兼容字符串时间和数组时间格式。
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
				// 先做乐观更新提升交互速度，失败时再回滚点赞状态。
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
		background: transparent;
	}

	.tabs-scroll {
		width: 100%;
		height: 88rpx;
		white-space: nowrap;
		background: #fff;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
	}

	.tabs-container {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 20rpx;
		position: relative;
	}

	.tab-item {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 140rpx;
		padding: 0;
		
		.tab-text {
			font-size: 30rpx;
			color: #999;
			transition: all 0.3s;
		}

		&.active {
			.tab-text {
				font-weight: bold;
				color: #333;
			}
		}
	}

	.indicator-wrapper {
		position: absolute;
		bottom: 12rpx;
		left: 20rpx;
		width: 140rpx;
		height: 8rpx;
		display: flex;
		justify-content: center;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.sliding-indicator {
		width: 40rpx;
		height: 8rpx;
		background-color: #333;
		border-radius: 4rpx;
	}

	.forum-list-container {
		display: flex;
		flex-direction: column;
	}

	.forum-list {
		min-height: 480rpx;
		overflow: visible;
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

	.forum-card {
		padding: 30rpx 30rpx;
		background: #fff;
		border: 1rpx solid rgba(15, 23, 42, 0.05);
		border-radius: 24rpx;
		margin-bottom: 16rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.04);
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 30rpx;
			right: 30rpx;
			height: 2rpx;
			background: linear-gradient(90deg, rgba(93, 118, 189, 0), rgba(93, 118, 189, 0.22), rgba(93, 118, 189, 0));
		}

		&:last-child::after {
			display: none;
		}

		&:last-child {
			margin-bottom: 0;
		}
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
					font-size: 30rpx;
					font-weight: bold;
					color: #333;
				}
				
				.user-tag-row {
					display: flex;
					align-items: center;
					margin-top: 4rpx;

					.tag-icon {
						width: 20rpx;
						height: 20rpx;
						margin-right: 6rpx;
						opacity: 0.5;
					}

					.user-tag {
						font-size: 22rpx;
						color: #999;
					}
				}
			}
		}
		
		.card-main {
			margin: 20rpx 0;
			flex-shrink: 0;
			
			.post-desc-container {
				font-size: 30rpx;
				color: #333;
				line-height: 1.6;
			}
		}

		.post-desc {
			font-size: 32rpx;
			color: #333;
			line-height: 1.6;
			word-break: break-all;
		}

		.suffix-inline {
			display: inline-block;
			white-space: nowrap;
		}

		.expand-btn-inline {
			color: #5d76bd;
			font-size: 32rpx;
			font-weight: 500;
			margin-left: 8rpx;
		}
		
		.post-images {
			display: flex;
			flex-wrap: wrap;
			gap: 10rpx;
			margin-bottom: 20rpx;
			flex-shrink: 0;
			
			.image-wrapper {
				position: relative;
				border-radius: 12rpx;
				overflow: hidden;
				background: #f8f8f8;
				
				.post-img {
					width: 100%;
					height: 100%;
					display: block;
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

			&.layout-1 {
				.image-wrapper {
					width: 60%;
					height: auto;
				}
			}

			&.layout-multi {
				.image-wrapper {
					width: calc((100% - 20rpx) / 3);
					height: 0;
					padding-bottom: calc((100% - 20rpx) / 3);

					.post-img {
						position: absolute;
						top: 0;
						left: 0;
					}
				}
			}
		}
		
		.card-actions {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 10rpx;
			flex-shrink: 0;
			
			.view-count {
				font-size: 24rpx;
				color: #999;
			}

			.action-right {
				display: flex;
				align-items: center;
				gap: 36rpx;

				.action-item {
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
						font-size: 26rpx;
						color: #999;

						&.active-color {
							color: rgb(250, 81, 81);
						}
					}
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
		background: transparent;
		
		.tabs-scroll {
			border-bottom-color: rgba(255, 255, 255, 0.05);
			background: #111216;
		}
		.tab-item {
			.tab-text {
				color: rgba(255, 255, 255, 0.6);
			}
			&.active {
				.tab-text {
					color: #f4f7fb;
				}
			}
		}
		.sliding-indicator {
			background-color: #f4f7fb;
		}
		.forum-card {
			background: #111216;
			border-color: rgba(255, 255, 255, 0.06);
			box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.24);
			&::after {
				background: linear-gradient(90deg, rgba(141, 164, 230, 0), rgba(141, 164, 230, 0.28), rgba(141, 164, 230, 0));
			}
		}
		.forum-card-content {
			.card-user-info .user-meta .user-name { color: #f4f7fb; }
			.card-user-info .user-meta .user-tag-row .user-tag { color: rgba(255, 255, 255, 0.4); }
			.card-main .post-desc-container { color: rgba(255, 255, 255, 0.8); }
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
