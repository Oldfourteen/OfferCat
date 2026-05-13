<template>
	<view class="notice-bar" :class="themeClass">
		<!-- 左侧公告配图，与文案高度协调。 -->
		<view class="notice-icon">
			<image class="icon-announcement" src="@/asset/image/Announcement.png" mode="aspectFit" />
		</view>
		<swiper class="notice-swiper" vertical autoplay circular :interval="3000">
			<!-- 轮播项循环展示公告文案。 -->
			<swiper-item class="notice-item" v-for="(item, index) in noticeList" :key="index">
				<text class="notice-text">{{ item }}</text>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'NoticeBar',
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		data() {
			return {
				// 首页公告内容当前为静态配置，后续可切换为接口下发。
				noticeList: [
					'欢迎来到 OfferCat 平台，祝你秋招春招顺利！',
					'近期新增了多套大厂笔试真题，快去练习吧。',
					'AI 面试功能升级，体验更加真实流畅。'
				]
			}
		},
		computed: {
			themeClass() {
				// 公告栏随主题切换背景和文字样式。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		}
	}
</script>

<style lang="scss">
	.notice-bar {
		display: flex;
		align-items: center;
		padding: 0 24rpx;
		height: 72rpx;
		border-radius: 36rpx;
		background: #ffffff;
		margin-top: 110rpx;
		margin-bottom: 24rpx;
		box-shadow: 0 12rpx 28rpx rgba(0, 0, 0, 0.06);
		
		.notice-icon {
			margin-right: 16rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.icon-announcement {
				width: 40rpx;
				height: 40rpx;
				flex-shrink: 0;
			}
		}
		
		.notice-swiper {
			flex: 1;
			height: 72rpx;
			
			.notice-item {
				display: flex;
				align-items: center;
				height: 72rpx;
				
				.notice-text {
					font-size: 26rpx;
					color: #333333;
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}

	.notice-bar.theme-dark {
		background: #25262b;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
		
		.notice-swiper .notice-item .notice-text {
			color: #e5e5e5;
		}
	}
</style>
