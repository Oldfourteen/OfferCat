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
				<uni-icons v-else type="more-filled" size="24" color="#000"></uni-icons>
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
				uni.navigateBack()
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

				.title {
					font-size: 18px;
					font-weight: bold;
					color: #000;
				}
			}

			.right {
				justify-content: flex-end;

				.right-text {
					font-size: 15px;
					font-weight: 600;
					color: #1677ff;
				}
			}
		}
	}
</style>
