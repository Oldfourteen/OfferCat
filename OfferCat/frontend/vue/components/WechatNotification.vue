<template>
	<view class="notification-container" :class="{ show: visible }">
		<view class="notification-badge" v-if="unreadCount > 0">
			<text class="badge-num">{{ unreadCount > 99 ? '99+' : unreadCount }}</text>
		</view>
		
		<!-- 通知弹窗 -->
		<view class="notification-popup" :class="themeClass">
			<view class="popup-header">
				<text class="popup-title">消息通知</text>
				<view class="close-btn" @click="close">
					<text class="close-icon">×</text>
				</view>
			</view>
			
			<scroll-view class="notification-list" scroll-y>
				<view 
					v-for="(item, index) in notifications" 
					:key="item.id"
					class="notification-item"
					:class="{ unread: !item.isRead }"
					@click="handleClick(item)"
				>
					<view class="notification-icon" :class="getIconClass(item.type)">
						<text class="icon-text">{{ getIconText(item.type) }}</text>
					</view>
					<view class="notification-content">
						<text class="notification-title">{{ item.title }}</text>
						<text class="notification-desc">{{ item.content }}</text>
						<text class="notification-time">{{ formatTime(item.createTime) }}</text>
					</view>
					<view class="unread-dot" v-if="!item.isRead"></view>
				</view>
				
				<view class="empty-state" v-if="notifications.length === 0">
					<text class="empty-text">暂无新消息</text>
				</view>
			</scroll-view>
			
			<view class="popup-footer">
				<view class="footer-btn" @click="markAllRead">
					<text class="btn-text">全部已读</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		notifications: {
			type: Array,
			default: () => []
		},
		unreadCount: {
			type: Number,
			default: 0
		},
		theme: {
			type: String,
			default: 'light'
		}
	},
	computed: {
		themeClass() {
			return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
		}
	},
	methods: {
		getIconClass(type) {
			switch (type) {
				case 1: return 'type-service'; // 客服消息
				case 2: return 'type-feedback'; // 意见反馈
				case 3: return 'type-reply'; // 管理员回复
				default: return 'type-default';
			}
		},
		getIconText(type) {
			switch (type) {
				case 1: return '客服';
				case 2: return '反馈';
				case 3: return '回复';
				default: return '消息';
			}
		},
		formatTime(time) {
			if (!time) return ''
			if (typeof time === 'string') {
				if (time.includes('T')) {
					return time.substring(5, 16).replace('T', ' ')
				}
				return time.substring(5, 16)
			}
			return String(time)
		},
		handleClick(item) {
			this.$emit('click', item)
		},
		close() {
			this.$emit('close')
		},
		markAllRead() {
			this.$emit('markAllRead')
		}
	}
}
</script>

<style lang="scss">
.notification-container {
	position: relative;
	
	&.show {
		.notification-popup {
			display: flex;
		}
	}
}

.notification-badge {
	position: absolute;
	top: -8rpx;
	right: -8rpx;
	min-width: 36rpx;
	height: 36rpx;
	background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
	border-radius: 18rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 10rpx;
	box-shadow: 0 2rpx 8rpx rgba(255, 71, 87, 0.5);
	
	.badge-num {
		font-size: 22rpx;
		color: #fff;
		font-weight: bold;
	}
}

.notification-popup {
	position: fixed;
	top: calc(var(--status-bar-height) + 100rpx);
	right: 20rpx;
	width: 600rpx;
	max-height: 800rpx;
	background: #fff;
	border-radius: 20rpx;
	box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.15);
	display: none;
	flex-direction: column;
	z-index: 1000;
	animation: slideIn 0.3s ease;
	
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(20rpx);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
}

.popup-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 30rpx;
	border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
	
	.popup-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}
	
	.close-btn {
		width: 48rpx;
		height: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.close-icon {
			font-size: 40rpx;
			color: #999;
		}
	}
}

.notification-list {
	flex: 1;
	min-height: 0;
	max-height: 600rpx;
}

.notification-item {
	display: flex;
	align-items: center;
	padding: 24rpx 30rpx;
	border-bottom: 1rpx solid rgba(0, 0, 0, 0.03);
	transition: background 0.2s;
	
	&:active {
		background: rgba(0, 0, 0, 0.02);
	}
	
	&:last-child {
		border-bottom: none;
	}
	
	&.unread {
		background: rgba(76, 175, 80, 0.05);
	}
	
	.notification-icon {
		width: 64rpx;
		height: 64rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
		
		.icon-text {
			font-size: 22rpx;
			color: #fff;
			font-weight: bold;
		}
		
		&.type-service {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		}
		
		&.type-feedback {
			background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
		}
		
		&.type-reply {
			background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
		}
		
		&.type-default {
			background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
		}
	}
	
	.notification-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 6rpx;
		
		.notification-title {
			font-size: 28rpx;
			font-weight: bold;
			color: #333;
		}
		
		.notification-desc {
			font-size: 24rpx;
			color: #999;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		
		.notification-time {
			font-size: 22rpx;
			color: #ccc;
		}
	}
	
	.unread-dot {
		width: 12rpx;
		height: 12rpx;
		background: #4CAF50;
		border-radius: 50%;
	}
}

.empty-state {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60rpx;
	
	.empty-text {
		font-size: 26rpx;
		color: #999;
	}
}

.popup-footer {
	padding: 20rpx;
	border-top: 1rpx solid rgba(0, 0, 0, 0.05);
	
	.footer-btn {
		width: 100%;
		height: 72rpx;
		background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
		border-radius: 36rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.btn-text {
			font-size: 28rpx;
			color: #fff;
			font-weight: bold;
		}
	}
}

/* Dark Theme */
.theme-dark {
	background: #1f1f1f;
	
	.popup-header {
		border-bottom-color: rgba(255, 255, 255, 0.05);
		
		.popup-title {
			color: #f4f7fb;
		}
		
		.close-icon {
			color: rgba(255, 255, 255, 0.5);
		}
	}
	
	.notification-item {
		border-bottom-color: rgba(255, 255, 255, 0.03);
		
		&:active {
			background: rgba(255, 255, 255, 0.02);
		}
		
		&.unread {
			background: rgba(76, 175, 80, 0.1);
		}
		
		.notification-content {
			.notification-title {
				color: #f4f7fb;
			}
			
			.notification-desc {
				color: rgba(255, 255, 255, 0.5);
			}
			
			.notification-time {
				color: rgba(255, 255, 255, 0.3);
			}
		}
	}
	
	.empty-text {
		color: rgba(255, 255, 255, 0.4);
	}
	
	.popup-footer {
		border-top-color: rgba(255, 255, 255, 0.05);
	}
}
</style>
