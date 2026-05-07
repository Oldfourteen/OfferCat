<template>
	<view class="notice-bar" :class="themeClass">
		<view class="notice-icon">
			<image class="icon-horn" src="data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20fill%3D%22%2325A1F4%22%20d%3D%22M480%2032c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9%206.9L381.7%2053c-48%2048-113.1%2075-181%2075H192%20160%2064c-35.3%200-64%2028.7-64%2064v96c0%2035.3%2028.7%2064%2064%2064h96%2032%208.7c67.9%200%20133%2027%20181%2075l43.6%2043.6c9.2%209.2%2022.9%2011.9%2034.9%206.9s19.8-16.6%2019.8-29.6V300.4c18.6-8.8%2032-32.5%2032-60.4s-13.4-51.6-32-60.4V32zm-64%2076.7V240%20272v131.3l-14.5-14.5c-40.7-40.7-90.6-68.1-145.4-78.7V202.9c54.8-10.6%20104.7-38%20145.4-78.7L416%20108.7zM64%20256v-64h96v128H64v-64zm80%20144v80c0%2017.7%2014.3%2032%2032%2032h32c17.7%200%2032-14.3%2032-32V380.1c-26.3-5.8-51.5-15.6-74.6-28.7c-7-4-15-6.2-21.4-11.4z%22%2F%3E%3C%2Fsvg%3E" mode="aspectFit" />
		</view>
		<swiper class="notice-swiper" vertical autoplay circular :interval="3000">
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
				noticeList: [
					'欢迎来到 OfferCat 平台，祝你秋招春招顺利！',
					'近期新增了多套大厂笔试真题，快去练习吧。',
					'AI 面试功能升级，体验更加真实流畅。'
				]
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
			
			.icon-horn {
				width: 32rpx;
				height: 32rpx;
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
