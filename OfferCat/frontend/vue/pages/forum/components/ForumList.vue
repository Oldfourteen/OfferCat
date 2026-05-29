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
								<text class="post-desc" v-else>{{ displayForumText(item.content) || '' }}</text>
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
									<image class="icon-svg" :src="item.isLiked ? '/static/png/icons/like-active.png' : '/static/png/icons/like.png'"></image>
									<text class="count" :class="{ 'count--like-on': item.isLiked }">{{ item.likeCount || 0 }}</text>
								</view>
								<view class="action-item">
									<image class="icon-svg" src="/static/png/icons/comment.png"></image>
									<text class="count count--muted">{{ item.commentCount || 0 }}</text>
								</view>
								<view class="action-item" @click.stop="toggleCollect(item, index)">
									<image class="icon-svg" :src="item.isCollected ? '/static/png/icons/star-active.png' : '/static/png/icons/star.png'"></image>
									<text class="count" :class="{ 'count--star-on': item.isCollected }">{{ item.favoriteCount || 0 }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 空状态提示 -->
				<view class="empty-state" v-if="postList.length === 0">
					<text class="empty-text">{{ emptyPlaceholderText }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { displayForumText } from '@/utils/sensitiveWords.js'
	import { BASE_URL } from '@/api/config.js'
	import {
		searchForumPosts,
		likeForumPost,
		unlikeForumPost,
		collectForumPost,
		uncollectForumPost,
		getForumAcceptedFriends
	} from '@/api/forum.js'
	import { emitForumCollectNotice } from '@/utils/forumCollectNotice.js'
	import { removeCollectedForumPost, upsertCollectedForumPost } from '@/utils/forumFavorites.js'
	import { incrementForumViewCount, syncForumPostViews, syncForumPostsViews } from '@/utils/forumViewCount.js'

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
				total: 0,
				// 好友 Tab：已拉取好友列表且长度为 0（与「好友无发帖」区分）
				friendListEmpty: false,
				// 防止快速切换 Tab / 重复刷新时旧请求晚返回触发误报
				fetchSeq: 0
			}
		},
		computed: {
			themeClass() {
				// 论坛区整体按主题切换毛玻璃背景和文字颜色。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			emptyPlaceholderText() {
				if (this.currentTab === 2 && this.friendListEmpty) return '暂无好友'
				return '暂无帖子可查看'
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
			displayForumText,
			getPreviewContent(content) {
				const safe = displayForumText(content)
				if (!safe) return ''
				// 预留尾部“...全部”的宽度，避免末尾按钮换行。
				return safe.length > 68 ? safe.substring(0, 68) : safe
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
			async toggleCollect(item, index) {
				const pid = item.postId || item.id
				const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = user.userId || user.id
				if (!uid) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}
				const current = this.postList[index] || item
				const nextCol = !Boolean(current.isCollected)
				const next = syncForumPostViews({
					...current,
					isCollected: nextCol,
					favoriteCount: Math.max(
						0,
						Number(current.favoriteCount || 0) + (nextCol ? 1 : -1)
					),
				})
				this.$set(this.postList, index, next)
				try {
					if (nextCol) {
						await collectForumPost(pid, uid)
						upsertCollectedForumPost(next, uid)
						emitForumCollectNotice()
					} else {
						await uncollectForumPost(pid, uid)
						removeCollectedForumPost(pid, uid)
						uni.showToast({
							title: '已取消收藏',
							icon: 'none'
						})
					}
				} catch (e) {
					this.$set(this.postList, index, current)
					uni.showToast({ title: (e && e.message) || '操作失败', icon: 'none' })
				}
			},
			switchTab(index) {
				if (this.currentTab === index) return
				this.currentTab = index
				// 切换 Tab 立即清空，避免接口失败时仍展示其它 Tab 的帖子并误报「获取失败」
				this.postList = []
				this.total = 0
				this.friendListEmpty = false
				this.fetchPosts()
			},
			/** 兼容不同端上 ResponseResult.data 形态 */
			normalizeFriendList(res) {
				const d = res && res.data
				if (Array.isArray(d)) return d
				if (d && Array.isArray(d.list)) return d.list
				if (d && Array.isArray(d.records)) return d.records
				return []
			},
			async resolveFriendTabEmptyState(viewerUserId, gen) {
				try {
					const fr = await getForumAcceptedFriends(viewerUserId)
					if (gen !== this.fetchSeq) return
					this.friendListEmpty = this.normalizeFriendList(fr).length === 0
				} catch (_) {
					if (gen !== this.fetchSeq) return
					this.friendListEmpty = false
				}
			},
			async fetchPosts() {
				const gen = ++this.fetchSeq
				const pageNum = 1
				const pageSize = 1000
				const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const viewerUserId = user.userId || user.id

				if (this.currentTab !== 2) {
					this.friendListEmpty = false
				}

				const payload = {
					keyword: '',
					pageNum,
					pageSize,
					feedTab: this.currentTab === 2 ? 'friends' : 'all',
				}
				if (viewerUserId) payload.viewerUserId = viewerUserId
				if (this.currentTab === 1) {
					payload.sortBy = 'like_count'
					payload.sortDirection = 'desc'
				}

				if (this.currentTab === 2 && !viewerUserId) {
					if (gen !== this.fetchSeq) return
					this.postList = []
					this.total = 0
					this.friendListEmpty = false
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}

				try {
					const res = await searchForumPosts(payload)
					if (gen !== this.fetchSeq) return
					const page = (res && res.data) || {}
					const records = Array.isArray(page.records) ? page.records : []
					this.postList = syncForumPostsViews(
						records.map((item) => ({
							...item,
							views: Number(item.views != null ? item.views : item.viewCount || 0),
							viewCount: Number(item.views != null ? item.views : item.viewCount || 0),
							isLiked: Boolean(item.isLiked),
							isCollected: Boolean(item.isCollected),
							favoriteCount: Number(
								item.favoriteCount != null ? item.favoriteCount : item.collectCount || 0
							),
						}))
					)
					this.total = page.total != null ? page.total : records.length
					if (this.currentTab === 2 && viewerUserId && records.length === 0) {
						await this.resolveFriendTabEmptyState(viewerUserId, gen)
					} else if (this.currentTab === 2) {
						this.friendListEmpty = false
					}
				} catch (e) {
					if (gen !== this.fetchSeq) return
					this.postList = []
					this.total = 0
					// 好友 Tab：按你的要求 —— 这里不再弹「获取帖子失败」；仅靠文案区分「暂无好友 / 暂无帖子」
					if (this.currentTab === 2) {
						if (viewerUserId) {
							try {
								const fr = await getForumAcceptedFriends(viewerUserId)
								if (gen !== this.fetchSeq) return
								this.friendListEmpty = this.normalizeFriendList(fr).length === 0
							} catch (_) {
								if (gen !== this.fetchSeq) return
								// 帖子与好友接口都失败时无法判断，只展示「暂无帖子可查看」，不弹 Toast
								this.friendListEmpty = false
							}
						} else {
							this.friendListEmpty = false
						}
						return
					}
					this.friendListEmpty = false
					uni.showToast({ title: '获取帖子失败', icon: 'none' })
				}
			},
			goToDetail(item) {
				// 详情页先缓存完整帖子数据，规避后端详情接口异常时无法展示。
				const id = item.postId || item.id;
				const postIndex = this.postList.findIndex(post => String(post.postId || post.id) === String(id))
				const updatedPost = incrementForumViewCount(item)
				if (postIndex !== -1) {
					this.$set(this.postList, postIndex, updatedPost)
				}
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
		width: 100%;
		box-sizing: border-box;
		/* 父级无固定高度时 height:100% 不生效；用可视区域高度占位，便于在列表区垂直居中 */
		min-height: calc(100vh - var(--status-bar-height, 0px) - 210rpx);
		padding: 32rpx 24rpx 0;

		.empty-text {
			font-size: 28rpx;
			color: #999;
			line-height: 1.5;
			text-align: center;
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
			margin-top: 8rpx;
			padding-top: 18rpx;
			flex-shrink: 0;
			border-top: 1rpx solid rgba(0, 0, 0, 0.06);
			
			.view-count {
				font-size: 24rpx;
				color: #999;
			}

			.action-right {
				display: flex;
				align-items: center;
				gap: 48rpx;

				.action-item {
					display: flex;
					align-items: center;
					gap: 10rpx;
					padding: 8rpx 4rpx;
					box-sizing: border-box;

					.icon-svg {
						width: 44rpx;
						height: 44rpx;
						display: block;
						flex-shrink: 0;
					}

					.count {
						font-size: 28rpx;
						font-weight: 500;
						line-height: 1;
						color: rgb(153, 153, 153);
					}

					.count--like-on {
						color: rgb(250, 81, 81);
						font-weight: 600;
					}

					.count--muted {
						color: rgb(153, 153, 153);
						font-weight: 500;
					}

					/* 与 star-active.svg 填充 rgb(255, 212, 59) 一致 */
					.count--star-on {
						color: rgb(255, 212, 59);
						font-weight: 600;
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
			.card-main .post-desc-container { color: rgba(244, 247, 251, 0.94); }

			/* <text> 在部分端上不继承父级 color，需覆盖组件内写死的 #333 */
			.post-desc,
			.suffix-inline {
				color: rgba(244, 247, 251, 0.94);
			}

			.expand-btn-inline {
				color: #8ab7ff;
			}

			.card-actions {
				border-top-color: rgba(255, 255, 255, 0.08);

				.view-count {
					color: rgba(255, 255, 255, 0.62);
				}

				.action-right .action-item {
					.icon-svg {
						opacity: 1;
					}

					.count {
						color: rgba(255, 255, 255, 0.5);
					}

					.count--like-on {
						color: rgb(250, 81, 81);
					}

					.count--muted {
						color: rgba(255, 255, 255, 0.5);
					}

					.count--star-on {
						color: rgb(255, 212, 59);
					}
				}
			}
		}
		.empty-text { color: rgba(255, 255, 255, 0.4); }
	}
</style>
