<template><!-- //顶部 -->
	<view class="topbar" :class="themeClass">
		<view class="icon-btn" @click="$emit('menu')">
			<view class="menu-line"></view>
			<view class="menu-line short"></view>
		</view>
		<text class="topbar-title">{{ title }}</text>
		<view class="icon-btn create" @click="$emit('create')">+</view>
	</view>
</template>

<script>
		export default {
		// 顶部栏组件本身不保存状态，只负责展示标题和抛出点击事件
		name: 'AiTopBar',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			// 当前会话标题，由父组件传入
			title: {
				type: String,
				default: '新对话'
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		}
	}
</script>

<style lang="scss">
	.topbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 22rpx 24rpx;
		background: linear-gradient(180deg, rgba(248, 247, 245, 0.96) 0%, rgba(248, 247, 245, 0.88) 68%, rgba(248, 247, 245, 0) 100%);
		backdrop-filter: blur(8rpx);

		.topbar-title {
			font-size: 26rpx;
			font-weight: 700;
			color: #1a2e56;
		}

		.icon-btn {
			width: 64rpx;
			height: 64rpx;
			border-radius: 20rpx;
			background: rgba(255, 255, 255, 0.76);
			border: 2rpx solid rgba(49, 101, 215, 0.08);
			box-shadow: 0 10rpx 24rpx rgba(49, 101, 215, 0.08);
			display: flex;
			align-items: center;
			justify-content: center;

			.menu-line {
				width: 28rpx;
				height: 4rpx;
				border-radius: 999rpx;
				background: #243b68;
				position: absolute;
			}

			.menu-line.short {
				width: 18rpx;
				transform: translateY(12rpx);
			}
		}

		.create {
			font-size: 42rpx;
			line-height: 1;
			color: #3165d7;
		}
	}

	.topbar.theme-dark {
		background: linear-gradient(180deg, rgba(18, 19, 24, 0.96) 0%, rgba(18, 19, 24, 0.88) 68%, rgba(18, 19, 24, 0) 100%);

		.topbar-title {
			color: #f4f7fb;
		}

		.icon-btn {
			background: rgba(39, 41, 49, 0.92);
			border-color: rgba(255, 255, 255, 0.06);
			box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.2);
		}

		.menu-line {
			background: #f4f7fb;
		}
	}
</style>
