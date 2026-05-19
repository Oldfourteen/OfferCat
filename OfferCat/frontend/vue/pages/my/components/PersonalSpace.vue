<template>
	<view class="personal-space" :class="themeClass" :key="animationKey">
		<text class="section-title animate-float-up">个人空间</text>
		<view class="space-grid">
			<view
				v-for="(item, index) in tools"
				:key="item.name"
				class="space-item animate-float-up"
				:style="{ animationDelay: (0.05 + index * 0.04) + 's' }"
				@click="handleToolClick(item)"
			>
				<view class="space-icon" :class="item.uiClass">
					<image v-if="item.iconImage" :src="item.iconImage" class="space-icon-img" mode="aspectFit"></image>
					<text v-else>{{ item.iconText }}</text>
				</view>
				<text class="space-name">{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'PersonalSpace',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			animationKey: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tools: [
					{ name: '好友', iconImage: '/static/好友.svg', desc: '查看好友关系', uiClass: 'ui-blue', action: 'friends' },
					{ name: '个人名片', iconImage: '/static/个人名片.svg', desc: '进入个人名片页', uiClass: 'ui-gold', action: 'card' },
					{ name: '消息', iconImage: '/static/消息.svg', desc: '查看互动消息', uiClass: 'ui-violet', action: 'message' },
					{ name: '收到喜欢', iconImage: '/static/点赞.svg', desc: '查看收到喜欢', uiClass: 'ui-red', action: 'likes' },
					{ name: '收藏', iconImage: '/static/收藏.svg', desc: '打开收藏列表', uiClass: 'ui-orange', action: 'favorites' }
				]
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		methods: {
			handleToolClick(item) {
				const routeMap = {
					card: () => {
						uni.navigateTo({
							url: '/subPages/userCard/userCard'
						})
					},
					message: () => {
						uni.navigateTo({
							url: '/subPages/forum/messageCenter',
							animationType: 'slide-in-right',
							animationDuration: 300
						})
					},
					likes: () => {
						uni.navigateTo({
							url: '/subPages/forum/likeInbox',
							animationType: 'slide-in-right',
							animationDuration: 300
						})
					},
					favorites: () => {
						uni.navigateTo({
							url: '/subPages/questionBank/favorites?type=all'
						})
					},
					friends: () => {
						uni.navigateTo({
							url: '/subPages/forum/friendList',
							animationType: 'slide-in-right',
							animationDuration: 300
						})
					}
				}

				const handler = routeMap[item.action]
				if (handler) {
					handler()
				}
			}
		}
	}
</script>

<style lang="scss">
	.personal-space {
		margin: 18rpx 15rpx 0;
		padding: 28rpx;
		border-radius: 32rpx;
		background: #ffffff;
		border: 1rpx solid rgba(67, 76, 210, 0.06);
		box-shadow:
			0 2rpx 10rpx rgba(15, 23, 42, 0.04),
			0 18rpx 42rpx rgba(67, 76, 210, 0.08);
	}

	.section-title,
	.space-name {
		display: block;
	}

	.section-title {
		font-size: 40rpx;
		font-weight: 800;
		color: #24345b;
	}

	.space-grid {
		margin-top: 34rpx;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 18rpx;
	}

	.space-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 8rpx 0 0;
	}

	.space-icon {
		width: 88rpx;
		height: 88rpx;
		border-radius: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 38rpx;
		font-weight: 800;

		.space-icon-img {
			width: 58rpx;
			height: 58rpx;
		}
	}

	.ui-blue {
		background: rgba(59, 130, 246, 0.14);
		color: #3b82f6;
	}

	.ui-gold {
		background: rgba(238, 192, 44, 0.16);
		color: #e0a91b;
	}

	.ui-violet {
		background: rgba(169, 87, 248, 0.14);
		color: #8b5cf6;
	}

	.ui-orange {
		background: rgba(249, 115, 22, 0.14);
		color: #f97316;
	}

	.ui-red {
		background: rgba(244, 63, 94, 0.14);
		color: #f43f5e;
	}

	.space-name {
		margin-top: 14rpx;
		font-size: 24rpx;
		font-weight: 600;
		color: #24345b;
		line-height: 1.4;
		text-align: center;
	}

	.personal-space.theme-dark {
		background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 3rpx 12rpx rgba(0, 0, 0, 0.32),
			0 18rpx 42rpx rgba(0, 0, 0, 0.26);

		.section-title,
		.space-name {
			color: #f4f7fb;
		}
	}


	.animate-float-up {
		animation: floatUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		animation-fill-mode: both;
	}

	@keyframes floatUp {
		from {
			opacity: 0;
			transform: translateY(60rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
