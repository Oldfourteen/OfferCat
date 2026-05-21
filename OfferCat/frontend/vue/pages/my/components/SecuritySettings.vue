<template>
	<view class="security-settings" :class="themeClass" :key="animationKey">
		<view class="section-head animate-float-up">
			<view>
				<!-- 标题区说明该模块聚合设置、帮助和反馈入口。 -->
				<text class="section-title">设置与帮助</text>
			</view>
		</view>

		<view class="settings-grid">
			<!-- 两列网格渲染帮助、资料编辑、反馈和系统设置四类入口。 -->
			<view v-for="(item, index) in tools" :key="item.name" class="setting-item animate-float-up" :style="{ animationDelay: (0.05 + index * 0.05) + 's' }" @click="handleToolClick(item)">
				<view class="setting-icon" :class="item.uiClass">
					<image v-if="item.icon.startsWith('data:image')" :src="item.icon" class="setting-icon-img" mode="aspectFit" />
					<text v-else>{{ item.icon }}</text>
				</view>
				<text class="setting-name">{{ item.name }}</text>
				<text class="setting-desc">{{ item.desc }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'SecuritySettings',
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
				// tools 定义设置区各入口的图标、描述和行为类型。
				tools: [
					{ name: '帮助中心', icon: '/static/png/inline/fc872dbd8861.png', uiClass: 'ui-gold', desc: '使用说明与版本信息', action: 'help' },
					{ name: '资料编辑', icon: '/static/png/inline/5a4e56dcaa0b.png', uiClass: 'ui-orange', desc: '编辑资料与头像', action: 'profile' },
					{ name: '意见反馈', icon: '/static/png/inline/fe390e71155e.png', uiClass: 'ui-violet', desc: '提交建议与问题', action: 'feedback' },
					{ name: '系统设置', icon: '/static/png/inline/d6bb4ce42ea5.png', uiClass: 'ui-green', desc: '通知、主题与通用', action: 'settings' }
				]
			}
		},
		computed: {
			themeClass() {
				// 设置模块按主题切换模块底色与文案颜色。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		methods: {
			handleToolClick(item) {
				// 根据 action 类型跳转页面，或弹出帮助与反馈说明。
				if (item.action === 'settings') {
					uni.navigateTo({
						url: '/subPages/settings/system'
					})
					return
				}

				if (item.action === 'profile') {
					uni.navigateTo({
						url: '/subPages/profile/profile'
					})
					return
				}

				if (item.action === 'help') {
					uni.navigateTo({
						url: '/subPages/helpCenter/helpCenter'
					})
					return
				}

				if (item.action === 'feedback') {
					uni.navigateTo({
						url: '/subPages/helpCenter/feedback'
					})
					return
				}

				uni.showModal({
					title: '意见反馈',
					content: '当前为演示版本，你可以整理问题现象、复现步骤和截图后反馈给开发同学。',
					showCancel: false,
					confirmText: '知道了',
					...(this.theme === 'dark' && {
						confirmColor: '#8AB7FF'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.security-settings {
		margin: 18rpx 15rpx 100rpx;
		padding: 28rpx;
		border-radius: 32rpx;
		background: #ffffff;
		border: 1rpx solid rgba(67, 76, 210, 0.06);
		box-shadow:
			0 2rpx 10rpx rgba(15, 23, 42, 0.04),
			0 18rpx 42rpx rgba(67, 76, 210, 0.08);
	}

	.section-title,
	.setting-name {
		display: block;
	}

	.section-title {
		font-size: 40rpx;
		font-weight: 800;
		color: #24345b;
	}

	.settings-grid {
		margin-top: 34rpx;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 18rpx;
	}

	.setting-item {
			padding: 8rpx 0 0;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

	.setting-icon {
		width: 88rpx;
		height: 88rpx;
		border-radius: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 38rpx;
		font-weight: 800;
		
		.setting-icon-img {
			width: 58rpx;
			height: 58rpx;
		}
	}

	.ui-gold {
		background: rgba(238, 192, 44, 0.16);
		color: #e0a91b;
	}

	.ui-orange {
		background: rgba(249, 115, 22, 0.14);
		color: #f97316;
	}

	.ui-violet {
		background: rgba(169, 87, 248, 0.14);
		color: #8b5cf6;
	}

	.ui-green {
		background: rgba(48, 185, 99, 0.14);
		color: #30b963;
	}

	.setting-name {
		margin-top: 14rpx;
		font-size: 24rpx;
		font-weight: 600;
		color: #24345b;
		line-height: 1.4;
		text-align: center;
	}

	.setting-desc {
		display: none;
	}

	.security-settings.theme-dark {
		background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 3rpx 12rpx rgba(0, 0, 0, 0.32),
			0 18rpx 42rpx rgba(0, 0, 0, 0.26);

		.section-title {
			color: #f4f7fb;
		}

		.setting-name {
			color: #f5f7fa;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-20rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
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
