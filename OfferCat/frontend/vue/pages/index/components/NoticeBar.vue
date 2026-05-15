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
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 0 24rpx;
		height: 72rpx;
		border-radius: 36rpx;
		/* 极轻纵向渐变 + 分层阴影与顶缘内高光，略抬升胶囊立体感 */
		background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
		border: 1rpx solid rgba(255, 255, 255, 0.65);
		/* 与固定头部的间距已由首页 header-spacer 预留，仅保留贴顶后的轻间隙 */
		margin-top: 12rpx;
		margin-bottom: 24rpx;
		box-shadow:
			0 8rpx 22rpx rgba(30, 80, 140, 0.1),
			0 2rpx 8rpx rgba(30, 80, 140, 0.06),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.85);
		
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
		background: linear-gradient(180deg, #2c2d33 0%, #25262b 100%);
		border: 1rpx solid rgba(255, 255, 255, 0.06);
		box-shadow:
			0 8rpx 22rpx rgba(0, 0, 0, 0.35),
			0 2rpx 8rpx rgba(0, 0, 0, 0.22),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
		
		.notice-swiper .notice-item .notice-text {
			color: #e5e5e5;
		}
	}
</style>
