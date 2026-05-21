<template>
	<view class="legal-page" :class="themeClass">
		<view class="legal-topbar">
			<view class="back-btn" @click="goBack">
				<image class="back-icon-img" :src="legalTopBackIcon" mode="aspectFit" />
			</view>
			<text class="topbar-title">鸣谢</text>
			<text class="placeholder"></text>
		</view>

		<scroll-view class="legal-scroll" scroll-y :show-scrollbar="false">
			<view class="legal-content">
				<view class="hero-card">
					<text class="hero-badge">Credits</text>
					<text class="hero-title">致敬每一位创作者</text>
					<text class="hero-desc">感谢以下团队成员为本项目的辛勤付出与无私贡献，排名不分先后。</text>
				</view>

				<view class="section-card">
					<text class="section-title">制作团队名单</text>
					<view class="creator-list">
						<view class="creator-item" v-for="(creator, index) in creators" :key="index">
							<image class="creator-avatar-img" :src="creator.avatar" mode="aspectFill"></image>
							<view class="creator-info">
								<text class="creator-name">{{ creator.name }}</text>
								<text class="creator-role">{{ creator.role }}</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="section-card">
					<text class="section-title">特别感谢</text>
					<text class="section-paragraph">感谢剑客云剑客网络提供的vps后端+数据库服务器支持，以及开源社区提供的优秀技术支持。</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { PNG_ICONS } from '@/utils/staticIcons.js'
import { applyTheme, THEME_CHANGE_EVENT, THEME_DARK, THEME_LIGHT } from '@/utils/theme.js'

	const LEGAL_TOP_BACK_ICON = PNG_ICONS.chevronLeft
	
	import avatarQklym from '@/asset/thanks/avatar_qklym.png'
import avatarDaoketa from '@/asset/thanks/avatar_daoketa.png'
import avatarOfteen from '@/asset/thanks/avatar_ofteen.png'
import avatarYueying from '@/asset/thanks/avatar_yueying.png'
import avatarBublue from '@/asset/thanks/avatar_bublue.png'
import avatarGmaj7 from '@/asset/thanks/avatar_gmaj7.png'
import avatarSir from '@/asset/thanks/avatar_sir.png'

	export default {
		data() {
			return {
				currentTheme: THEME_LIGHT,
				themeListener: null,
				legalTopBackIcon: LEGAL_TOP_BACK_ICON,
				creators: [
					{ name: '巧克力意面', role: '前端开发 & 页面设计', avatar: avatarQklym },
					{ name: 'ARona233', role: '前端开发 & 页面设计', avatar: avatarDaoketa },
					{ name: 'OFteen', role: '后端开发 & AI核心', avatar: avatarOfteen },
					{ name: '月萤', role: '后端开发 & 核心算法编程', avatar: avatarYueying },
					{ name: '布blue', role: '后端开发 & 数据库搭建', avatar: avatarBublue },
					{ name: '#Gmaj7', role: '后端开发 & 微服务框架', avatar: avatarGmaj7 },
					{ name: 'Sir.', role: 'UI设计挑选 & 文档撰写', avatar: avatarSir },
				]
			}
		},
		computed: {
			themeClass() {
				return this.currentTheme === THEME_DARK ? 'theme-dark' : 'theme-light'
			}
		},
		created() {
			this.currentTheme = applyTheme()
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				this.themeListener = payload => {
					this.currentTheme = payload && payload.theme ? payload.theme : applyTheme()
				}
				uni.$on(THEME_CHANGE_EVENT, this.themeListener)
			}
		},
		beforeDestroy() {
			if (this.themeListener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(THEME_CHANGE_EVENT, this.themeListener)
			}
		},
		beforeUnmount() {
			if (this.themeListener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(THEME_CHANGE_EVENT, this.themeListener)
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({ delta: 1 })
			}
		}
	}
</script>

<style lang="scss">
	$grad-teal-a: rgba(54, 186, 174, 0.12) 0%, rgba(44, 158, 144, 0.38) 45%, rgba(113, 220, 175, 0.06) 100%;
	$grad-teal-b: rgba(44, 158, 144, 0.72) 0%, rgba(113, 220, 175, 0) 100%;

	.legal-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.legal-topbar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 22rpx) 28rpx 18rpx;
		background:
			linear-gradient(180deg, $grad-teal-a),
			linear-gradient(180deg, $grad-teal-b);
		border-bottom: 2rpx solid rgba(233, 252, 248, 0.65);
	}

	.back-btn {
		box-sizing: border-box;
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.94);
		padding: 0;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 6rpx 18rpx rgba(30, 110, 98, 0.14);
	}

	.back-icon-img {
		width: 38rpx;
		height: 38rpx;
		flex-shrink: 0;
	}

	.placeholder {
		width: 72rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
	}

	.topbar-title {
		flex: 1;
		text-align: center;
		font-size: 34rpx;
		font-weight: 700;
		letter-spacing: 0.5rpx;
		color: #ffffff;
		text-shadow: 0 4rpx 16rpx rgba(30, 110, 98, 0.28);
	}

	.legal-scroll {
		flex: 1;
		min-height: 0;
	}

	.legal-content {
		padding: 22rpx 24rpx calc(56rpx + env(safe-area-inset-bottom));
	}

	.hero-card,
	.section-card {
		border-radius: 28rpx;
		padding: 28rpx 24rpx;
	}

	.hero-card {
		background: linear-gradient(135deg, rgba(54, 186, 174, 0.18) 0%, rgba(113, 220, 175, 0.12) 100%);
	}

	.hero-badge,
	.hero-title,
	.hero-desc,
	.section-title,
	.section-paragraph {
		display: block;
	}

	.hero-badge {
		font-size: 20rpx;
		font-weight: 800;
		letter-spacing: 2rpx;
		text-transform: uppercase;
	}

	.hero-title {
		margin-top: 16rpx;
		font-size: 38rpx;
		font-weight: 800;
		line-height: 1.35;
	}

	.hero-desc {
		margin-top: 14rpx;
		font-size: 24rpx;
		line-height: 1.7;
	}

	.section-card {
		margin-top: 20rpx;
		background: #ffffff;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
	}

	.section-title {
		font-size: 28rpx;
		font-weight: 800;
		line-height: 1.4;
		margin-bottom: 20rpx;
	}

	.section-paragraph {
		margin-top: 14rpx;
		font-size: 24rpx;
		line-height: 1.8;
	}

	.creator-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.creator-item {
		display: flex;
		align-items: center;
		padding: 16rpx;
		background: #f7f8fa;
		border-radius: 16rpx;
	}

	.creator-avatar-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		background-color: #eee;
	}

	.creator-info {
		display: flex;
		flex-direction: column;
	}

	.creator-name {
		font-size: 28rpx;
		font-weight: 800;
		color: #333333;
	}

	.creator-role {
		font-size: 24rpx;
		color: #666666;
		margin-top: 6rpx;
	}

	.legal-page.theme-light {
		background-color: #f7f8fa;

		.hero-title,
		.section-title {
			color: #333;
		}

		.hero-badge {
			color: #2b998a;
		}

		.hero-desc,
		.section-paragraph {
			color: #666;
		}
	}

	.legal-page.theme-dark {
		background-color: #1a1b1e;

		.legal-topbar {
			background:
				linear-gradient(180deg, rgba(48, 120, 112, 0.4) 0%, rgba(32, 48, 46, 0.55) 50%, rgba(17, 18, 22, 0.3) 100%),
				linear-gradient(180deg, rgba(54, 186, 174, 0.52) 0%, rgba(54, 186, 174, 0) 100%);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}

		.back-btn {
			background: rgba(255, 255, 255, 0.92);
			box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.22);
		}

		.hero-title,
		.section-title {
			color: #f7f8fa;
		}

		.hero-badge {
			color: #80decf;
		}

		.hero-desc,
		.section-paragraph {
			color: rgba(255, 255, 255, 0.62);
		}

		.section-card {
			background: linear-gradient(180deg, #2a2b2f 0%, #25262a 100%);
			border: 1rpx solid rgba(255, 255, 255, 0.04);
			box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.28);
		}

		.creator-item {
			background: #333333;
		}

		.creator-name {
			color: #f7f8fa;
		}

		.creator-role {
			color: rgba(255, 255, 255, 0.62);
		}
	}
</style>
