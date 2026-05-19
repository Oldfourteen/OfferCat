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
						<view class="card-user-info" @click.stop="goToUserCard(item)">
							<image class="user-avatar" :src="getAvatar(item.authorAvatar, item.userId)" mode="aspectFill"></image>
							<view class="user-meta">
								<text class="user-name">{{ getAuthorName(item.authorName, item.userId) }}</text>
								<view class="user-tag-row" v-if="getAuthorProfileText(item)">
									<text class="user-tag">{{ getAuthorProfileText(item) }}</text>
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
							<text class="view-count">浏览 {{ item.views || 0 }}</text>
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
									<text class="count" :class="{ 'active-color': item.isCollected }">{{ item.favoriteCount || 0 }}</text>
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
		</view>
	</view>
</template>

<script>
	import { BASE_URL } from '@/api/config.js'
	import { searchForumPosts, likeForumPost, unlikeForumPost } from '@/api/forum.js'
	import { incrementForumViewCount, syncForumPostViews, syncForumPostsViews } from '@/utils/forumViewCount.js'
	import {
		getForumMockPosts,
		toggleForumMockPostCollect,
		syncForumMockPostCache
	} from '@/utils/forumLocalData.js'

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
				// 论坛帖子直接在当前页完整渲染，靠页面滚动浏览，不再做首页/尾页分页切换。
				postList: [],
				total: 0
			}
		},
		computed: {
			themeClass() {
				// 论坛区整体按主题切换毛玻璃背景和文字颜色。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		created() {
			// 监听外部刷新事件，发帖或详情页操作后可主动更新首页列表。
			uni.$on('refreshForumList', this.fetchPosts);
			uni.$on('refresh', this.fetchPosts);
			uni.$on('refreshForumListViews', this.refreshViewCounts);
		},
		beforeDestroy() {
			// 组件销毁时移除全局事件监听，避免重复绑定。
			uni.$off('refreshForumList', this.fetchPosts);
			uni.$off('refresh', this.fetchPosts);
			uni.$off('refreshForumListViews', this.refreshViewCounts);
		},
		mounted() {
			// 首次进入首页时读取本地论坛 mock 数据。
			this.fetchPosts()
		},
		methods: {
			getPreviewContent(content) {
				if (!content) return ''
				// 预留尾部“...全部”的宽度，避免末尾按钮换行。
				return content.length > 68 ? content.substring(0, 68) : content
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
			toggleCollect(item, index) {
				const updatedPost = toggleForumMockPostCollect(item.postId || item.id)
				if (!updatedPost) return
				this.$set(this.postList, index, syncForumPostViews(updatedPost))
				uni.showToast({
					title: updatedPost.isCollected ? '收藏成功' : '已取消收藏',
					icon: 'success'
				})
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
				this.fetchPosts();
			},
			async fetchPosts() {
				const pageNum = 1
				const pageSize = 1000
				const payload = {
					keyword: '',
					pageNum,
					pageSize,
				}
				if (this.currentTab === 1) {
					payload.sortBy = 'like_count'
					payload.sortDirection = 'desc'
				}
				try {
					const res = await searchForumPosts(payload)
					const page = (res && res.data) || {}
					const records = Array.isArray(page.records) ? page.records : []
					this.postList = syncForumPostsViews(
						records.map((item) => ({
							...item,
							views: Number(item.views != null ? item.views : item.viewCount || 0),
							viewCount: Number(item.views != null ? item.views : item.viewCount || 0),
							isLiked: Boolean(item.isLiked),
							isCollected: Boolean(item.isCollected),
							favoriteCount: Number(item.favoriteCount || 0),
						}))
					)
					this.total = page.total || records.length
					return
				} catch (_) {}

				const result = getForumMockPosts({
					pageNum,
					pageSize,
					currentTab: this.currentTab,
				})
				const records = result.records || []
				this.postList = syncForumPostsViews(
					records.map((item) => ({
						...item,
						isLiked: Boolean(item.isLiked),
						isCollected: Boolean(item.isCollected),
						favoriteCount: Number(item.favoriteCount || 0),
					}))
				)
				this.total = result.total || records.length
			},
			goToDetail(item) {
				// 详情页先缓存完整帖子数据，规避后端详情接口异常时无法展示。
				const id = item.postId || item.id;
				const postIndex = this.postList.findIndex(post => String(post.postId || post.id) === String(id))
				const updatedPost = incrementForumViewCount(item)
				if (postIndex !== -1) {
					this.$set(this.postList, postIndex, updatedPost)
				}
				// 缓存完整帖子数据，绕过后端崩溃的 detail 接口
				syncForumMockPostCache(updatedPost)
				uni.navigateTo({
					url: `/subPages/forum/detail?id=${id}&viewIncremented=1`
				});
			},
			refreshViewCounts() {
				this.postList = syncForumPostsViews(this.postList)
			},
			goToUserCard(item) {
				if (!item) return
				const userId = item.userId || ''
				const name = this.getAuthorName(item.authorName, item.userId)
				const avatar = this.getAvatar(item.authorAvatar, item.userId)
				const grade = item.grade || item.authorGrade || item.graduationYear || ''
				const major = item.major || item.authorMajor || ''
				uni.navigateTo({
					url: `/subPages/userCard/userCard?userId=${encodeURIComponent(String(userId))}&name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}&grade=${encodeURIComponent(grade)}&major=${encodeURIComponent(major)}`
				})
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
			async likePost(item) {
				const user = uni.getStorageSync('user_v2') || {};
				const userId = user.userId || user.id;
				if (!userId) {
					uni.showToast({ title: '请先登录', icon: 'none' });
					return;
				}

				const postId = item.postId || item.id
				const postIndex = this.postList.findIndex(p => String(p.postId || p.id) === String(postId));
				if (postIndex === -1) return;
				const current = this.postList[postIndex] || item
				const nextLiked = !current.isLiked
				const next = syncForumPostViews({
					...current,
					isLiked: nextLiked,
					likeCount: Math.max(0, Number(current.likeCount || 0) + (nextLiked ? 1 : -1)),
				})
				this.$set(this.postList, postIndex, next)
				try {
					if (nextLiked) {
						await likeForumPost(postId, userId)
					} else {
						await unlikeForumPost(postId, userId)
					}
					uni.showToast({ title: nextLiked ? '点赞成功' : '取消点赞', icon: 'none' })
				} catch (e) {
					this.$set(this.postList, postIndex, current)
					uni.showToast({ title: (e && e.message) || '操作失败', icon: 'none' })
				}
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
		position: fixed;
		top: calc(var(--status-bar-height) + 112rpx);
		left: 0;
		right: 0;
		z-index: 120;
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
		padding-top: 88rpx;
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
		background: transparent;
		border: none;
		border-bottom: 1rpx solid rgba(15, 23, 42, 0.08);
		border-radius: 0;
		margin-bottom: 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		box-shadow: none;
		position: relative;
		overflow: visible;

		&:last-child {
			border-bottom: none;
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
			background: transparent;
			border-bottom-color: rgba(255, 255, 255, 0.08);
			box-shadow: none;
		}
		.forum-card-content {
			.card-user-info .user-meta .user-name { color: #f4f7fb; }
			.card-user-info .user-meta .user-tag-row .user-tag { color: rgba(255, 255, 255, 0.4); }
			.card-main .post-desc-container { color: rgba(255, 255, 255, 0.8); }
		}
		.empty-text { color: rgba(255, 255, 255, 0.4); }
	}
</style>
