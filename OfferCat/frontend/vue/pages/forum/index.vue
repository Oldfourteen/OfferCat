<template>
	<view class="forum-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="forum-header-sticky">
			<view class="header-content">
				<text class="page-title">校园论坛</text>
				<view class="header-actions">
					<view class="action-btn" @click="goPublish">
						<image v-if="theme === 'dark'" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmMWY0ZmEiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxsaW5lIHgxPSIxMiIgeTE9IjUiIHgyPSIxMiIgeTI9IjE5Ij48L2xpbmU+CiAgPGxpbmUgeDE9IjUiIHkxPSIxMiIgeDI9IjE5IiB5Mj0iMTIiPjwvbGluZT4KPC9zdmc+" class="icon-svg"></image>
						<image v-else src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjFiMWIiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxsaW5lIHgxPSIxMiIgeTE9IjUiIHgyPSIxMiIgeTI9IjE5Ij48L2xpbmU+CiAgPGxpbmUgeDE9IjUiIHkxPSIxMiIgeDI9IjE5IiB5Mj0iMTIiPjwvbGluZT4KPC9zdmc+" class="icon-svg"></image>
					</view>
					<view class="action-btn notification-btn" @click="toggleNotification">
						<image v-if="theme === 'dark'" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmMWY0ZmEiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjgiPjwvY2lyY2xlPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iNiIgcj0iMiI+PC9jaXJjbGU+CiAgPGxpbmUgeDE9IjEyIiB5MT0iMTgiIHgyPSIxMiIgeTI9IjEwIi48L2xpbmU+CiAgPGxpbmUgeDE9IjgiIHkxPSIxMiIgeDI9IjE2IiB5Mj0iMTIiPjwvbGluZT4KPC9zdmc+" class="icon-svg"></image>
						<image v-else src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjFiMWIiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjgiPjwvY2lyY2xlPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iNiIgcj0iMiI+PC9jaXJjbGU+CiAgPGxpbmUgeDE9IjEyIiB5MT0iMTgiIHgyPSIxMiIgeTI9IjEwIi48L2xpbmU+CiAgPGxpbmUgeDE9IjgiIHkxPSIxMiIgeDI9IjE2IiB5Mj0iMTIiPjwvbGluZT4KPC9zdmc+" class="icon-svg"></image>
						<view class="notification-badge" v-if="unreadCount > 0">
							<text class="badge-text">{{ unreadCount > 99 ? '99+' : unreadCount }}</text>
						</view>
					</view>
					<view class="action-btn" @click="goSearch">
						<image v-if="theme === 'dark'" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmMWY0ZmEiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjgiPjwvY2lyY2xlPgogIDxsaW5lIHgxPSIyMSIgeTE9IjIxIiB4Mj0iMTYuNjUiIHkyPSIxNi42NSI+PC9saW5lPgo8L3N2Zz4=" class="icon-svg"></image>
						<image v-else src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjFiMWIiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjgiPjwvY2lyY2xlPgogIDxsaW5lIHgxPSIyMSIgeTE9IjIxIiB4Mj0iMTYuNjUiIHkyPSIxNi42NSI+PC9saW5lPgo8L3N2Zz4=" class="icon-svg"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 下拉刷新区域 -->
		<view class="refresh-header" :class="{ visible: refreshVisible }">
			<view class="refresh-content">
				<view class="refresh-icon" :class="{ spinning: isRefreshing }">
					<image v-if="!isRefreshing" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjgiPjwvY2lyY2xlPgogIDxpbmUgeDE9IjEyIiB5MT0iNiIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT4KPC9zdmc+" class="icon-img"></image>
					<view class="spinner" v-else>
						<view class="spinner-ring"></view>
					</view>
				</view>
				<text class="refresh-text">{{ refreshText }}</text>
			</view>
		</view>

		<scroll-view 
			class="forum-scroll" 
			scroll-y 
			:show-scrollbar="false" 
			@scroll="handleScroll"
			@scrolltoupper="onScrollToTop"
			:scroll-top="scrollTopValue"
		>
			<view class="forum-container" :style="{ paddingTop: refreshVisible ? '80rpx' : '5rpx' }">
				<!-- 复用现有的 ForumList 组件 -->
				<ForumList :theme="theme" />
			</view>
		</scroll-view>
		
		<!-- 消息通知组件 -->
		<WechatNotification 
			:visible="showNotification"
			:notifications="notifications"
			:unread-count="unreadCount"
			:theme="theme"
			@close="showNotification = false"
			@mark-all-read="markAllNotificationsRead"
			@click="handleNotificationClick"
		/>
		
		<AppLiquidTabBar tab-page-path="pages/forum/index" :theme="theme" />
	</view>
</template>

<script>
	import ForumList from '@/pages/forum/components/ForumList.vue'
	import AppLiquidTabBar from '@/components/AppLiquidTabBar.vue'
	import WechatNotification from '@/components/WechatNotification.vue'
	import themeMixin from '@/utils/themeMixin.js'
	import liquidTabBarPageMixin from '@/mixins/liquidTabBarPageMixin.js'

	export default {
		mixins: [themeMixin, liquidTabBarPageMixin],
		components: {
			AppLiquidTabBar,
			ForumList,
			WechatNotification
		},
		data() {
			return {
				scrollTop: 0,
				scrollTopValue: 0,
				refreshVisible: false,
				isRefreshing: false,
				refreshText: '下拉刷新',
				showNotification: false,
				notifications: [],
				unreadCount: 0,
				lastRefreshTime: Date.now()
			}
		},
		created() {
			this.loadMockNotifications()
		},
		methods: {
			handleScroll(e) {
				this.scrollTop = e.detail.scrollTop
				this.handlePullRefresh(e)
			},
			handlePullRefresh(e) {
				const scrollTop = e.detail.scrollTop
				const threshold = 80
				
				if (scrollTop <= -threshold && !this.isRefreshing) {
					this.refreshVisible = true
					this.refreshText = '松开刷新'
				} else if (scrollTop > -threshold && scrollTop <= 0) {
					this.refreshVisible = true
					this.refreshText = '下拉刷新'
				} else if (scrollTop > 0) {
					this.refreshVisible = false
				}
			},
			onScrollToTop() {
				if (this.refreshVisible && !this.isRefreshing) {
					this.startRefresh()
				}
			},
			startRefresh() {
				if (this.isRefreshing) return
				
				this.isRefreshing = true
				this.refreshText = '刷新中...'
				
				setTimeout(() => {
					uni.$emit('refresh')
					this.isRefreshing = false
					this.refreshVisible = false
					this.refreshText = '下拉刷新'
					this.scrollTopValue = 0
					this.lastRefreshTime = Date.now()
					
					uni.showToast({
						title: '刷新成功',
						icon: 'success',
						duration: 1500
					})
				}, 1500)
			},
			goPublish() {
				uni.navigateTo({
					url: '/subPages/forum/publish'
				})
			},
			goSearch() {
				uni.navigateTo({
					url: '/subPages/search/search'
				})
			},
			toggleNotification() {
				this.showNotification = !this.showNotification
				console.log(`[Notification] 通知弹窗 ${this.showNotification ? '打开' : '关闭'}`)
				if (this.showNotification) {
					this.loadNotifications()
				}
			},
			loadMockNotifications() {
				console.log('[Notification] 开始加载模拟通知数据...')
				this.notifications = [
					{
						id: 1,
						type: 1,
						title: '普通用户王五',
						content: '客服在吗',
						isRead: false,
						createTime: new Date().toISOString()
					},
					{
						id: 2,
						type: 2,
						title: '意见反馈',
						content: '希望增加深色模式功能',
						isRead: false,
						createTime: new Date(Date.now() - 3600000).toISOString()
					},
					{
						id: 3,
						type: 3,
						title: '管理员-张三',
						content: '您好，问题已收到，我们会尽快处理',
						isRead: true,
						createTime: new Date(Date.now() - 7200000).toISOString()
					}
				]
				this.unreadCount = this.notifications.filter(n => !n.isRead).length
				console.log(`[Notification] 通知数据加载完成，共 ${this.notifications.length} 条，未读 ${this.unreadCount} 条`)
				this.logNotificationDetails()
			},
			logNotificationDetails() {
				console.group('[Notification] 通知详情列表')
				this.notifications.forEach((item, index) => {
					const typeName = this.getNotificationTypeName(item.type)
					console.log(`[通知${index + 1}] 类型:${typeName}, 标题:${item.title}, 内容:${item.content}, 已读:${item.isRead}, 时间:${item.createTime}`)
				})
				console.groupEnd()
			},
			getNotificationTypeName(type) {
				switch (type) {
					case 1: return '客服消息(1)'
					case 2: return '意见反馈(2)'
					case 3: return '管理员回复(3)'
					default: return `未知(${type})`
				}
			},
			loadNotifications() {
				console.log('[Notification] 刷新通知列表')
				this.unreadCount = this.notifications.filter(n => !n.isRead).length
				console.log(`[Notification] 当前未读数量: ${this.unreadCount}`)
			},
			markAllNotificationsRead() {
				console.log(`[Notification] 批量标记已读，之前未读: ${this.unreadCount} 条`)
				this.notifications.forEach(n => n.isRead = true)
				this.unreadCount = 0
				console.log('[Notification] 全部标记为已读完成')
				uni.showToast({
					title: '已全部标记为已读',
					icon: 'success'
				})
			},
			handleNotificationClick(item) {
				console.log(`[Notification] 点击通知: ID=${item.id}, 类型=${this.getNotificationTypeName(item.type)}, 标题=${item.title}`)
				item.isRead = true
				this.unreadCount = this.notifications.filter(n => !n.isRead).length
				console.log(`[Notification] 标记单条已读完成，剩余未读: ${this.unreadCount} 条`)
				uni.showToast({
					title: `查看通知: ${item.title}`,
					icon: 'none'
				})
			},
			sendCustomerServiceMessage() {
				const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const userName = user.nickname || '匿名用户'
				const userId = user.userId || user.id || 0
				
				console.log(`[Broadcast] 用户 ${userName}(ID:${userId}) 发送客服消息`)
				console.log(`[Broadcast] 开始广播消息给所有管理员...`)
				
				this.notifications.unshift({
					id: Date.now(),
					type: 1,
					title: userName,
					content: `${userName}@客服在吗`,
					isRead: false,
					createTime: new Date().toISOString(),
					senderId: userId,
					isBroadcast: true
				})
				
				this.unreadCount = this.notifications.filter(n => !n.isRead).length
				console.log(`[Broadcast] 广播完成！新增通知，当前未读: ${this.unreadCount} 条`)
				console.log(`[Broadcast] 通知已推送给所有管理员`)
				
				uni.showToast({
					title: '消息已发送给管理员',
					icon: 'success'
				})
			},
			sendFeedback(message) {
				const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const userName = user.nickname || '匿名用户'
				const userId = user.userId || user.id || 0
				
				console.log(`[Feedback] 用户 ${userName}(ID:${userId}) 提交意见反馈`)
				console.log(`[Feedback] 反馈内容: ${message}`)
				console.log(`[Feedback] 开始广播反馈给所有管理员...`)
				
				this.notifications.unshift({
					id: Date.now(),
					type: 2,
					title: '意见反馈',
					content: `${userName}@意见反馈：${message}`,
					isRead: false,
					createTime: new Date().toISOString(),
					senderId: userId,
					isBroadcast: true
				})
				
				this.unreadCount = this.notifications.filter(n => !n.isRead).length
				console.log(`[Feedback] 反馈广播完成！当前未读: ${this.unreadCount} 条`)
				
				uni.showToast({
					title: '意见反馈已提交',
					icon: 'success'
				})
			},
			adminReplyToUser(userId, content) {
				const admin = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const adminName = admin.nickname || '管理员'
				
				console.log(`[AdminReply] 管理员 ${adminName} 回复用户(ID:${userId})`)
				console.log(`[AdminReply] 回复内容: ${content}`)
				
				this.notifications.unshift({
					id: Date.now(),
					type: 3,
					title: `管理员-${adminName}`,
					content: `管理员-${adminName}@${content}`,
					isRead: false,
					createTime: new Date().toISOString(),
					targetUserId: userId,
					isAdminReply: true
				})
				
				this.unreadCount = this.notifications.filter(n => !n.isRead).length
				console.log(`[AdminReply] 管理员回复已发送，当前未读: ${this.unreadCount} 条`)
			},
			simulateBroadcastToAdmins() {
				console.log('==========================================')
				console.log('[SIMULATION] 模拟消息广播流程测试')
				console.log('==========================================')
				
				console.log('\n1. 用户发送客服消息')
				this.sendCustomerServiceMessage()
				
				console.log('\n2. 用户提交意见反馈')
				this.sendFeedback('希望能增加更多学习资源')
				
				console.log('\n3. 管理员回复用户')
				this.adminReplyToUser(1001, '您好，您的建议已收到，我们会尽快处理')
				
				console.log('\n4. 查看最终通知列表')
				this.logNotificationDetails()
				
				console.log('\n==========================================')
				console.log('[SIMULATION] 广播流程测试完成')
				console.log('==========================================')
			}
		}
	}
</script>

<style lang="scss">
	.forum-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}

	.forum-header-sticky {
		padding: calc(var(--status-bar-height) + 20rpx) 30rpx 20rpx;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
		z-index: 100;
		position: relative;
		
		.header-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.page-title {
				font-size: 40rpx;
				font-weight: bold;
				color: #15305e;
			}
			
			.header-actions {
				display: flex;
				gap: 20rpx;
				
				.action-btn {
					width: 72rpx;
					height: 72rpx;
					border-radius: 50%;
					background: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
					position: relative;
					
					.icon-svg {
						width: 40rpx;
						height: 40rpx;
					}
					
					&.notification-btn {
						.notification-badge {
							position: absolute;
							top: -4rpx;
							right: -4rpx;
							min-width: 32rpx;
							height: 32rpx;
							background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
							border-radius: 16rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 0 8rpx;
							
							.badge-text {
								font-size: 20rpx;
								color: #fff;
								font-weight: bold;
							}
						}
					}
				}
			}
		}
	}

	.forum-page.theme-dark {
		background-color: #111216;

		.forum-header-sticky {
			background: rgba(17, 18, 22, 0.8);

			.page-title {
				color: #f4f7fb;
			}

			.action-btn {
				background: rgba(255, 255, 255, 0.08);
				border: 1rpx solid rgba(255, 255, 255, 0.08);
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.35);
			}
		}
	}

	/* 下拉刷新样式 */
	.refresh-header {
		position: absolute;
		top: calc(var(--status-bar-height) + 88rpx);
		left: 0;
		right: 0;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
		pointer-events: none;
		z-index: 50;
		
		&.visible {
			opacity: 1;
			transform: translateY(0);
		}
		
		.refresh-content {
			display: flex;
			align-items: center;
			gap: 16rpx;
			
			.refresh-icon {
				width: 48rpx;
				height: 48rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: transform 0.3s;
				
				&.spinning {
					.icon-img {
						display: none;
					}
				}
				
				.icon-img {
					width: 40rpx;
					height: 40rpx;
				}
				
				.spinner {
					width: 40rpx;
					height: 40rpx;
					
					.spinner-ring {
						width: 100%;
						height: 100%;
						border: 4rpx solid rgba(0, 0, 0, 0.1);
						border-top-color: #4CAF50;
						border-radius: 50%;
						animation: spin 0.8s linear infinite;
					}
				}
			}
			
			.refresh-text {
				font-size: 26rpx;
				color: #999;
			}
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.forum-page.theme-dark {
		.refresh-header {
			.refresh-content {
				.spinner-ring {
					border-color: rgba(255, 255, 255, 0.1);
					border-top-color: #4CAF50;
				}
				
				.refresh-text {
					color: rgba(255, 255, 255, 0.5);
				}
			}
		}
	}

	.forum-scroll {
		flex: 1;
		min-height: 0;
	}

	.forum-container {
		padding: 5rpx 30rpx calc(40rpx + 116rpx + env(safe-area-inset-bottom));
		transition: padding-top 0.3s;
	}
</style>
