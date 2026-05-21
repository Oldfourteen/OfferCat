<template>
	<view class="learning-header" :class="[themeClass, switchAnimClass]">
		<!-- 主题切换提示框 -->
		<view class="theme-toast" :class="{ 'toast-show': toastVisible }">
			<text class="toast-text">{{ toastMessage }}</text>
		</view>

		<view class="header-top animate-fade-down" style="animation-delay: 0.1s;">
			<!-- 左侧头像点击后跳转个人中心。 -->
			<view class="topbar-avatar" @click="goMy">
				<CommonAvatar :src="profile.avatars" image-class="growth-avatars" />
			</view>

			<text class="topbar-nickname">{{ nicknameWithTimeGreeting }}</text>

			<view class="header-actions">
				<!-- 仅保留主题切换（置于顶栏最右侧，对应原搜索按钮位置）。 -->
				<view class="header-action" @click="toggleTheme">
					<image v-if="theme === 'dark'" src="/static/png/inline/727d944378a4.png" style="width: 40rpx; height: 40rpx;" mode="aspectFit" />
					<image v-else src="/static/png/inline/7aa3ea4ec8b9.png" style="width: 40rpx; height: 40rpx;" mode="aspectFit" />
				</view>
			</view>
		</view>

		<view class="header-copy animate-fade-down" :style="copyStyle" style="animation-delay: 0.2s;">
			<!-- 展开态下展示年级、专业与学习区说明文案。 -->
			<view class="header-title learning-title">
				
				<text class="learning-grade">{{ profile.grade }}</text>
				<text class="learning-major">{{ profile.major }}</text>
			</view>
			<text class="header-subtitle">{{ headerSubtitleQuote }}</text>
		</view>
	</view>
</template>

<script>
	import { getUserProfile, USER_PROFILE_UPDATED_EVENT, DEFAULT_AVATAR } from '@/utils/userProfile.js'
	import { getUser } from '@/utils/user.js'
	import { getHeaderInspirationalQuote } from '@/utils/headerInspirationalQuotes.js'
	import CommonAvatar from '@/components/CommonAvatar.vue'
	import { setTheme } from '@/utils/theme.js'
	import { switchLiquidTabByPath } from '@/utils/appLiquidTabBar.js'

	/** 按设备本地时钟的小时段落划分问候语，全天 24 小时均有对应文案。 */
	function greetingByLocalHour(date) {
		const hour = date.getHours()
		if (hour >= 5 && hour < 12) return '早上好'
		if (hour >= 12 && hour < 14) return '中午好'
		if (hour >= 14 && hour < 18) return '下午好'
		return '晚上好'
	}

	export default {
		name: 'LearningHeader',
		components: {
			CommonAvatar
		},
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			collapseProgress: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				// 用户展示信息默认先用占位数据，待本地资料加载后覆盖。
				profile: {
					avatars: DEFAULT_AVATAR,
					nickname: '王小桃同学',
					grade: '大四',
					major: '计算机科学与技术'
				},
				// 主题切换 toast 的显示状态、文案和定时器句柄。
				toastVisible: false,
				toastMessage: '',
				toastTimer: null,
				switchAnimatingTo: '',
				switchAnimTimer: null,
				themeApplyTimer: null,
				quoteUserKey: 'guest',
				// 与设备本地时间同步的时段问候，由定时器与 onShow 刷新。
				timeGreeting: '早上好',
				greetingTimer: null
			}
		},
		created() {
			// 监听用户资料更新事件，保证首页头部展示最新头像和昵称。
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(USER_PROFILE_UPDATED_EVENT, this.loadProfile)
			}
			this.syncGreetingTick()
		},
		beforeDestroy() {
			// 兼容 Vue2 生命周期，移除资料监听并清理 toast 定时器。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.loadProfile)
			}
			if (this.toastTimer) {
				clearTimeout(this.toastTimer)
			}
			if (this.switchAnimTimer) {
				clearTimeout(this.switchAnimTimer)
			}
			if (this.themeApplyTimer) {
				clearTimeout(this.themeApplyTimer)
			}
			this.clearGreetingTimer()
		},
		beforeUnmount() {
			// 兼容 Vue3 生命周期，移除资料监听并清理 toast 定时器。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.loadProfile)
			}
			if (this.toastTimer) {
				clearTimeout(this.toastTimer)
			}
			if (this.switchAnimTimer) {
				clearTimeout(this.switchAnimTimer)
			}
			if (this.themeApplyTimer) {
				clearTimeout(this.themeApplyTimer)
			}
			this.clearGreetingTimer()
		},
		mounted() {
			// 首次挂载时读取本地用户资料。
			this.loadProfile()
			this.syncGreetingTick()
			this.greetingTimer = setInterval(() => this.syncGreetingTick(), 60 * 1000)
		},
		onShow() {
			this.syncGreetingTick()
			// 每次回到首页都再次同步资料，避免跨页修改后头部不更新。
			this.loadProfile()
		},
		computed: {
			themeClass() {
				// 根据全局主题切换头部背景和按钮样式。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			switchAnimClass() {
				if (this.switchAnimatingTo === 'dark') return 'switch-anim-to-dark'
				if (this.switchAnimatingTo === 'light') return 'switch-anim-to-light'
				return ''
			},
			copyStyle() {
				// 根据折叠进度动态调整文案区的透明度、位移和高度。
				// 展开上限需 ≥ 年级行 + 间距 + 励志词两行（原 160rpx 会裁切第二行）。
				const progress = Math.max(0, Math.min(this.collapseProgress, 1))
				const copyExpandedMax = 280
				return {
					opacity: `${1 - progress}`,
					transform: `translateY(-${progress * 28}rpx)`,
					maxHeight: `${copyExpandedMax - progress * copyExpandedMax}rpx`,
					marginTop: `${18 - progress * 18}rpx`
				}
			},
			headerSubtitleQuote() {
				return getHeaderInspirationalQuote(this.quoteUserKey)
			},
			nicknameWithTimeGreeting() {
				const nick = this.profile.nickname || ''
				const phrase = this.timeGreeting
				return nick ? `${nick} ${phrase}` : phrase
			}
		},
		methods: {
			syncGreetingTick() {
				this.timeGreeting = greetingByLocalHour(new Date())
			},
			clearGreetingTimer() {
				if (this.greetingTimer) {
					clearInterval(this.greetingTimer)
					this.greetingTimer = null
				}
			},
			toggleTheme() {
				// 在浅色/深色主题间切换，并给出短暂提示反馈。
				const nextTheme = this.theme === 'dark' ? 'light' : 'dark'
				this.switchAnimatingTo = nextTheme
				if (this.switchAnimTimer) clearTimeout(this.switchAnimTimer)
				this.switchAnimTimer = setTimeout(() => {
					this.switchAnimatingTo = ''
				}, 560)
				if (this.themeApplyTimer) clearTimeout(this.themeApplyTimer)
				this.themeApplyTimer = setTimeout(() => {
					setTheme(nextTheme)
				}, 120)
				this.showThemeToast(nextTheme === 'dark' ? '已切换至深色模式' : '已切换至浅色模式')
			},
			showThemeToast(message) {
				// 复用一个 toast 容器显示主题切换文案，重复触发时重置计时。
				if (this.toastTimer) {
					clearTimeout(this.toastTimer)
				}
				this.toastMessage = message
				this.toastVisible = true
				this.toastTimer = setTimeout(() => {
					this.toastVisible = false
				}, 2000)
			},
			loadProfile() {
				// 从本地资料工具中取值，统一整理成头部使用的数据结构。
				const profile = getUserProfile()
				this.profile = {
					avatars: profile.avatar,
					nickname: profile.nickname,
					grade: profile.grade,
					major: profile.major
				}
				const u = getUser() || {}
				this.quoteUserKey = String(u.userId || u.id || u.phone || profile.nickname || 'guest')
			},
			goMy() {
				// 头像入口跳转到底部 tab 的“我的”页面。
				switchLiquidTabByPath('pages/my/my')
			}
		}
	}
</script>

<style lang="scss">
	.learning-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 20;
		padding: calc(var(--status-bar-height) + 20rpx) 30rpx 12rpx;
		background: linear-gradient(
			180deg,
			rgba(100, 118, 193, 0.8) 0%,
			rgba(42, 128, 255, 0.4) 40%,
			rgba(56, 189, 248, 0) 100%
		);
		backdrop-filter: blur(10rpx);
	}

	.theme-toast {
		position: fixed;
		top: calc(var(--status-bar-height) + 120rpx);
		left: 50%;
		transform: translateX(-50%) translateY(-20rpx);
		background: rgba(0, 0, 0, 0.65);
		padding: 16rpx 32rpx;
		border-radius: 32rpx;
		z-index: 999;
		opacity: 0;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;

		&.toast-show {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}

		.toast-text {
			color: #ffffff;
			font-size: 24rpx;
			font-weight: 500;
			white-space: nowrap;
			letter-spacing: 1rpx;
		}
	}

	.header-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;

		.topbar-avatar {
			width: 76rpx;
			height: 76rpx;
			min-width: 76rpx;
			min-height: 76rpx;
			flex-shrink: 0;
			border-radius: 50%;
			overflow: hidden;
			// border: rgba(204, 221, 221, 0.5) solid 5rpx;
		}

		.growth-avatars {
			width: 76rpx;
			height: 76rpx;
			border-radius: 50%;
			overflow: hidden;
		}

		.topbar-nickname {
			flex: 1;
			font-size: 36rpx;
			font-weight: 600;
			color: #ffffff;
			margin-left: 8rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-shadow: 0 2rpx 8rpx rgba(38, 96, 189, 0.2);
		}
	}

	.header-actions {
		display: flex;
		justify-content: flex-end;
		gap: 18rpx;
		flex-shrink: 0;
	}

	.header-action {
		width: 112rpx;
		height: 60rpx;
		min-width: 112rpx;
		min-height: 60rpx;
		flex-shrink: 0;
		border-radius: 999rpx;
		overflow: hidden;
		position: relative;
		padding: 4rpx;
		background: linear-gradient(180deg, rgba(90, 176, 255, 0.98) 0%, rgba(170, 219, 255, 0.98) 100%);
		border: 2rpx solid rgba(255, 255, 255, 0.9);
		display: flex;
		align-items: center;
		justify-content: flex-start;
		box-shadow:
			0 12rpx 26rpx rgba(0, 0, 0, 0.1),
			inset 0 2rpx 0 rgba(255, 255, 255, 0.55);

		image {
			display: none;
		}

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: 999rpx;
			opacity: 1;
			background-image:
				radial-gradient(circle at 58% 64%, rgba(255, 255, 255, 0.92) 0 20rpx, transparent 21rpx),
				radial-gradient(circle at 74% 64%, rgba(255, 255, 255, 0.86) 0 18rpx, transparent 19rpx),
				radial-gradient(circle at 86% 60%, rgba(255, 255, 255, 0.8) 0 15rpx, transparent 16rpx),
				radial-gradient(circle at 70% 46%, rgba(255, 255, 255, 0.72) 0 10rpx, transparent 11rpx),
				linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0));
			filter: blur(0.2px);
			transform: translate3d(0, 0, 0);
			z-index: 0;
			pointer-events: none;
		}

		&::after {
			content: '';
			position: absolute;
			top: 50%;
			margin-top: -26rpx;
			left: 4rpx;
			width: 52rpx;
			height: 52rpx;
			border-radius: 50%;
			background: radial-gradient(circle at 30% 28%, rgba(255, 250, 205, 1) 0%, rgba(255, 214, 74, 1) 52%, rgba(255, 176, 40, 1) 100%);
			box-shadow:
				0 12rpx 22rpx rgba(0, 0, 0, 0.18),
				0 0 0 6rpx rgba(255, 220, 120, 0.22),
				0 0 18rpx rgba(255, 208, 80, 0.22);
			transform: translateX(0);
			transition: transform 0.22s ease;
			will-change: transform;
			z-index: 2;
		}
	}

	.learning-header.switch-anim-to-dark .header-action::after {
		animation: themeThumbToDark 560ms cubic-bezier(0.18, 1.35, 0.32, 1) both;
	}

	.learning-header.switch-anim-to-light .header-action::after {
		animation: themeThumbToLight 560ms cubic-bezier(0.18, 1.35, 0.32, 1) both;
	}

	.header-copy {
		overflow: hidden;
		transform-origin: top center;
		transition: opacity 0.22s ease, transform 0.22s ease, max-height 0.22s ease, margin-top 0.22s ease;
	}

	.header-title {
		display: block;
		margin-bottom: 14rpx;
		font-size: 68rpx;
		line-height: 1.08;
		font-weight: 900;
		color: #ffffff;
		text-shadow: 0 6rpx 20rpx rgba(38, 96, 189, 0.2);
	}

	.header-subtitle {
		display: block;
		width: 100%;
		margin-top: 8rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.8);
		white-space: normal;
		word-break: break-word;
	}

	.learning-title {
		display: flex;
		align-items: baseline;
		gap: 16rpx;
		font-size: 56rpx;

		.learning-grade {
			flex-shrink: 0;
		}

		.learning-major {
			font-size: 40rpx;
			font-weight: 700;
			color: #ffffff;
			text-shadow: 0 4rpx 12rpx rgba(38, 96, 189, 0.2);
		}
	}

	.learning-header.theme-dark {
		background: linear-gradient(180deg, rgba(35, 42, 63, 0.96) 0%, rgba(35, 42, 63, 0) 100%);

		.header-action {
			background: linear-gradient(180deg, rgba(14, 20, 42, 0.98) 0%, rgba(36, 45, 86, 0.98) 100%);
			border-color: rgba(255, 255, 255, 0.28);
			box-shadow:
				0 12rpx 26rpx rgba(0, 0, 0, 0.22),
				inset 0 2rpx 0 rgba(255, 255, 255, 0.08);
		}

		.header-action::after {
			transform: translateX(52rpx);
			background:
				radial-gradient(circle at 36% 34%, rgba(245, 247, 255, 0.98) 0%, rgba(205, 210, 226, 0.98) 55%, rgba(164, 172, 196, 0.98) 100%),
				radial-gradient(circle at 64% 50%, rgba(155, 163, 186, 0.45) 0 7rpx, transparent 8rpx),
				radial-gradient(circle at 44% 62%, rgba(155, 163, 186, 0.42) 0 6rpx, transparent 7rpx),
				radial-gradient(circle at 56% 36%, rgba(155, 163, 186, 0.4) 0 4.8rpx, transparent 6rpx);
			box-shadow:
				0 12rpx 24rpx rgba(0, 0, 0, 0.32),
				0 0 0 6rpx rgba(200, 210, 235, 0.14),
				0 0 18rpx rgba(210, 220, 245, 0.18),
				inset -3rpx -3rpx 0 rgba(255, 255, 255, 0.22),
				inset 3rpx 3rpx 0 rgba(0, 0, 0, 0.08);
		}

		.header-action::before {
			background-image:
				radial-gradient(circle at 18% 30%, rgba(255, 255, 255, 0.95) 0 2.2rpx, transparent 3rpx),
				radial-gradient(circle at 30% 54%, rgba(255, 255, 255, 0.82) 0 1.6rpx, transparent 2.4rpx),
				radial-gradient(circle at 42% 40%, rgba(255, 255, 255, 0.9) 0 1.8rpx, transparent 2.6rpx),
				radial-gradient(circle at 26% 70%, rgba(255, 255, 255, 0.76) 0 1.4rpx, transparent 2.2rpx),
				radial-gradient(circle at 46% 62%, rgba(255, 255, 255, 0.72) 0 1.3rpx, transparent 2.2rpx),
				radial-gradient(circle at 10% 58%, rgba(255, 255, 255, 0.7) 0 1.2rpx, transparent 2.1rpx),
				radial-gradient(circle at 52% 26%, rgba(255, 255, 255, 0.66) 0 1.3rpx, transparent 2.2rpx),
				radial-gradient(circle at 36% 22%, rgba(255, 255, 255, 0.78) 0 1.4rpx, transparent 2.2rpx),
				linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
			opacity: 1;
		}

		.header-title,
		.topbar-nickname {
			color: #f5f7fb;
			text-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.4);
		}

		.header-subtitle,
		.learning-title .learning-major {
			color: rgba(255, 255, 255, 0.62);
			text-shadow: none;
		}

		.menu-line {
			background: #f1f4fa;
		}
	}

	@keyframes themeThumbToDark {
		0% {
			transform: translateX(0);
		}
		58% {
			transform: translateX(60rpx);
		}
		78% {
			transform: translateX(48rpx);
		}
		100% {
			transform: translateX(52rpx);
		}
	}

	@keyframes themeThumbToLight {
		0% {
			transform: translateX(52rpx);
		}
		58% {
			transform: translateX(-8rpx);
		}
		78% {
			transform: translateX(6rpx);
		}
		100% {
			transform: translateX(0);
		}
	}

	.animate-fade-down {
		animation: fadeDown 0.6s ease-out both;
	}

	@keyframes fadeDown {
		from {
			opacity: 0;
			transform: translateY(-20rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
