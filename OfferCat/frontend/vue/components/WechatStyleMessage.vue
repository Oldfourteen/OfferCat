<template>
	<view class="wechat-message-container" :class="themeClass">
		<!-- 消息列表 -->
		<scroll-view 
			class="message-list" 
			scroll-y 
			:show-scrollbar="false"
			:scroll-into-view="scrollToId"
			scroll-with-animation
			@scrolltolower="loadMore"
		>
			<view class="message-wrapper">
				<!-- 消息项 -->
				<view 
					v-for="(item, index) in messages" 
					:key="item.id"
					:id="'msg-' + item.id"
					class="message-item"
					:class="{ 
						'is-self': item.isSelf,
						'is-admin': item.isAdmin
					}"
				>
					<!-- 头像 -->
					<view class="avatar-wrapper">
						<image 
							class="avatar" 
							:src="getAvatar(item)" 
							mode="aspectFill"
						></image>
						<view class="admin-badge" v-if="item.isAdmin">管理员</view>
					</view>
					
					<!-- 消息内容 -->
					<view class="message-content">
						<!-- 昵称 -->
						<text class="sender-name" v-if="!item.isSelf">{{ item.senderName }}</text>
						
						<!-- 消息气泡 -->
						<view class="bubble" :class="getBubbleClass(item)">
							<text class="message-text">{{ item.content }}</text>
							<view class="message-time">{{ formatTime(item.createTime) }}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 底部输入栏 -->
		<view class="input-bar">
			<view class="input-wrapper">
				<input 
					class="message-input" 
					v-model="inputText"
					placeholder="输入消息..."
					placeholder-class="input-placeholder"
					confirm-type="send"
					@confirm="sendMessage"
				/>
				<view class="send-btn" :class="{ active: inputText.trim() }" @click="sendMessage">
					<text class="send-text">发送</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { BASE_URL } from '@/api/config.js'

export default {
	props: {
		theme: {
			type: String,
			default: 'light'
		},
		messages: {
			type: Array,
			default: () => []
		},
		currentUserId: {
			type: [Number, String],
			default: null
		}
	},
	data() {
		return {
			inputText: '',
			scrollToId: ''
		}
	},
	computed: {
		themeClass() {
			return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
		}
	},
	methods: {
		getAvatar(item) {
			if (item.avatar) {
				if (item.avatar.startsWith('http')) return item.avatar
				return BASE_URL + item.avatar
			}
			if (item.isAdmin) {
				return '/static/default-avatar.jpg'
			}
			return '/static/default-avatar.jpg'
		},
		getBubbleClass(item) {
			const classes = []
			if (item.isSelf) classes.push('self')
			if (item.isAdmin) classes.push('admin')
			return classes
		},
		formatTime(time) {
			if (!time) return ''
			if (typeof time === 'string') {
				if (time.includes('T')) {
					return time.substring(11, 16)
				}
				return time.substring(0, 5)
			}
			return String(time)
		},
		sendMessage() {
			if (!this.inputText.trim()) return
			this.$emit('send', this.inputText.trim())
			this.inputText = ''
			this.$nextTick(() => {
				const lastMsg = this.messages[this.messages.length - 1]
				if (lastMsg) {
					this.scrollToId = 'msg-' + lastMsg.id
				}
			})
		},
		loadMore() {
			this.$emit('loadMore')
		}
	}
}
</script>

<style lang="scss">
.wechat-message-container {
	height: 100%;
	display: flex;
	flex-direction: column;
	background: #e8e8e8;
}

.message-list {
	flex: 1;
	min-height: 0;
	padding: 20rpx;
}

.message-wrapper {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.message-item {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	
	&.is-self {
		flex-direction: row-reverse;
		
		.message-content {
			align-items: flex-end;
		}
	}
	
	&.is-admin {
		.message-content {
			.bubble.admin {
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				
				.message-text {
					color: #fff;
				}
				
				.message-time {
					color: rgba(255, 255, 255, 0.7);
				}
				
				&::after {
					border-color: transparent transparent transparent #667eea;
				}
			}
		}
		
		&.is-self {
			.message-content {
				.bubble.admin {
					&::after {
						border-color: transparent #764ba2 transparent transparent;
						left: auto;
						right: -12rpx;
					}
				}
			}
		}
	}
}

.avatar-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background: #f0f0f0;
	}
	
	.admin-badge {
		font-size: 20rpx;
		color: #fff;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 2rpx 12rpx;
		border-radius: 20rpx;
		margin-top: 4rpx;
	}
}

.message-content {
	display: flex;
	flex-direction: column;
	max-width: 70%;
	
	.sender-name {
		font-size: 24rpx;
		color: #999;
		margin-bottom: 8rpx;
	}
	
	.bubble {
		position: relative;
		background: #fff;
		border-radius: 24rpx;
		padding: 20rpx 24rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
		max-width: 100%;
		display: inline-block;
		
		&.self {
			background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
			
			.message-text {
				color: #fff;
			}
			
			.message-time {
				color: rgba(255, 255, 255, 0.7);
			}
			
			&::after {
				border-left-color: transparent;
				border-right-color: #4CAF50;
				left: auto;
				right: -12rpx;
			}
		}
		
		&::after {
			content: '';
			position: absolute;
			top: 24rpx;
			left: -12rpx;
			border-width: 12rpx;
			border-style: solid;
			border-color: transparent #fff transparent transparent;
		}
		
		.message-text {
			font-size: 30rpx;
			color: #333;
			line-height: 1.5;
			word-break: break-all;
		}
		
		.message-time {
			font-size: 20rpx;
			color: #999;
			text-align: right;
			margin-top: 8rpx;
		}
	}
}

.input-bar {
	background: #fff;
	padding: 20rpx;
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	border-top: 1rpx solid rgba(0, 0, 0, 0.05);
	
	.input-wrapper {
		display: flex;
		align-items: center;
		gap: 16rpx;
		background: #f5f5f5;
		border-radius: 40rpx;
		padding: 8rpx;
		
		.message-input {
			flex: 1;
			height: 72rpx;
			font-size: 30rpx;
			background: transparent;
			padding: 0 24rpx;
		}
		
		.input-placeholder {
			color: #ccc;
		}
		
		.send-btn {
			width: 100rpx;
			height: 64rpx;
			background: #e0e0e0;
			border-radius: 32rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.3s;
			
			&.active {
				background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
				
				.send-text {
					color: #fff;
				}
			}
			
			.send-text {
				font-size: 28rpx;
				color: #999;
			}
		}
	}
}

/* 深色主题样式 */
.theme-dark {
	background: #1a1a1a;
	
	.message-item {
		.message-content {
			.sender-name {
				color: rgba(255, 255, 255, 0.5);
			}
			
			.bubble {
				background: #2d2d2d;
				box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.3);
				
				.message-text {
					color: rgba(255, 255, 255, 0.9);
				}
				
				.message-time {
					color: rgba(255, 255, 255, 0.4);
				}
				
				&::after {
					border-color: transparent #2d2d2d transparent transparent;
				}
				
				&.self {
					background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
					
					&::after {
						border-right-color: #4CAF50;
					}
				}
				
				&.admin {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					
					.message-text {
						color: #fff;
					}
					
					.message-time {
						color: rgba(255, 255, 255, 0.7);
					}
					
					&::after {
						border-color: transparent transparent transparent #667eea;
					}
					
					&.self {
						&::after {
							border-color: transparent #764ba2 transparent transparent;
						}
					}
				}
			}
		}
	}
	
	.input-bar {
		background: #1f1f1f;
		border-top-color: rgba(255, 255, 255, 0.05);
		
		.input-wrapper {
			background: #2d2d2d;
			
			.input-placeholder {
				color: rgba(255, 255, 255, 0.3);
			}
		}
	}
}
</style>
