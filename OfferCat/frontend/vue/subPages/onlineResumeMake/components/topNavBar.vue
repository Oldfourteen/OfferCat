<template>
	<view class="top-nav-bar" :style="customStyle">
		<view :style="{ height: statusBarHeight + 'px' }"></view>
		<view class="nav-content">
			<view class="left" @click="handleClose">
				<image src="/static/close.png" mode="aspectFit" class="close-icon"></image>
			</view>
			<view class="center">
				<text class="title" :style="titleStyle">{{ title }}</text>
			</view>
			<view class="right" @click="handleRightClick">
				<text v-if="rightText" class="right-text">{{ rightText }}</text>
				<view v-else class="right-spacer"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'topNavBar',
		props: {
			title: {
				type: String,
				default: '简历'
			},
			rightText: {
				type: String,
				default: ''
			},
			customStyle: {
				type: Object,
				default: () => ({})
			},
			titleStyle: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				statusBarHeight: 20
			}
		},
		created() {
			const info = uni.getSystemInfoSync()
			this.statusBarHeight = info.statusBarHeight
		},
		methods: {
			handleClose() {
				uni.navigateBack({
					fail: () => {
						uni.reLaunch({ url: '/pages/index/index' })
					}
				})
			},
			handleRightClick() {
				if (this.rightText) {
					this.$emit('rightClick')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-nav-bar {
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;

		.nav-content {
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 15px;
			position: relative;

			.left, .right {
				width: 40px;
				display: flex;
				align-items: center;
				position: relative;
				z-index: 2;
				flex-shrink: 0;
			}

			.left {
				.close-icon {
					width: 20px;
					height: 20px;
				}
			}

			.center {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 1;
				max-width: calc(100% - 100px);
				pointer-events: none;

				.title {
					font-size: 18px;
					font-weight: 600;
					color: #000;
					letter-spacing: -0.02em;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.right {
				justify-content: flex-end;

				.right-text {
					font-size: 15px;
					font-weight: 600;
					color: #5d76bd;
					letter-spacing: 0.02em;
				}

				.right-spacer {
					width: 1px;
					height: 1px;
				}
			}
		}
	}
</style>
