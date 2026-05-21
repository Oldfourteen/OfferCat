<template>
	<view class="settings-page" :class="themeClass">
		<view class="settings-topbar">
			<view class="back-btn" @click="goBack">
				<image class="back-icon-img" :src="settingsTopBackIcon" mode="aspectFit" />
			</view>
			<text class="topbar-title">设置</text>
			<text class="placeholder"></text>
		</view>

		<scroll-view class="settings-scroll" scroll-y :show-scrollbar="false">
			<view class="settings-content">
				<view class="account-card" @click="openAccountSecurity">
					<view class="account-main">
						<view class="account-icon">
						<image src="/static/png/inline/b46e73f9afaa.png" class="account-icon-img" mode="aspectFit" />
					</view>
						<view class="account-copy">
							<text class="account-title">资料编辑</text>
							<text class="account-desc">{{ accountSummary }}</text>
						</view>
					</view>
					<view class="account-side">
						<CommonAvatar :src="avatarUrl" image-class="account-avatar" />
						<text class="row-arrow">›</text>
					</view>
				</view>

				<view class="group-block">
					<text class="group-title">功能</text>
					<view class="list-card">
						<view class="setting-row clickable no-border" @click="openThemeModeSheet">
							<view class="row-main">
								<view class="row-icon icon-cyan">
									<image src="/static/png/inline/09355b3307e7.png" class="row-icon-img" mode="aspectFit" />
								</view>
								<view class="row-copy">
									<text class="row-title">主题模式</text>
									<text class="row-desc">{{ themeModeLabel }} · {{ themeStatusText }}</text>
								</view>
							</view>
							<view class="row-side">
								<text class="side-meta">{{ themeModeShortLabel }}</text>
								<text class="row-arrow">›</text>
							</view>
						</view>
					</view>
				</view>

				<view class="single-action-card clickable" @click="openHelpCenter">
					<view class="row-main">
						<view class="row-icon icon-violet">
							<image src="/static/png/inline/ab1a3abd7c37.png" class="row-icon-img" mode="aspectFit" />
						</view>
						<view class="row-copy">
							<text class="row-title">关于与帮助</text>
							<text class="row-desc">查看使用说明、反馈入口和版本信息。</text>
						</view>
					</view>
					<text class="row-arrow">›</text>
				</view>

				<view class="single-action-card clickable" @click="openPrivacyPolicy">
					<view class="row-main">
						<view class="row-icon icon-indigo">
							<image src="/static/png/inline/bbb8acf9fc1e.png" class="row-icon-img" mode="aspectFit" />
						</view>
						<view class="row-copy">
							<text class="row-title">隐私政策</text>
							<text class="row-desc">查看个人信息收集、使用与保护说明。</text>
						</view>
					</view>
					<text class="row-arrow">›</text>
				</view>

				<view class="single-action-card clickable" @click="openUserAgreement">
					<view class="row-main">
						<view class="row-icon icon-emerald">
							<image src="/static/png/inline/94fe33f9f207.png" class="row-icon-img" mode="aspectFit" />
						</view>
						<view class="row-copy">
							<text class="row-title">用户服务协议</text>
							<text class="row-desc">查看平台使用规则、账号约定与服务说明。</text>
						</view>
					</view>
					<text class="row-arrow">›</text>
				</view>

				<view class="single-action-card clickable" @click="openAcknowledgment">
					<view class="row-main">
						<view class="row-icon icon-cyan">
							<image src="/static/png/inline/9f351b07b1ba.png" class="row-icon-img" mode="aspectFit" />
						</view>
						<view class="row-copy">
							<text class="row-title">鸣谢</text>
							<text class="row-desc">查看制作团队名单，致敬每一位创作者。</text>
						</view>
					</view>
					<text class="row-arrow">›</text>
				</view>

				<view class="logout-card clickable" @click="handleLogout">
					<view class="row-main">
						<view class="row-icon icon-red">
							<image src="/static/png/inline/15310c62a896.png" class="row-icon-img" mode="aspectFit" />
						</view>
						<view class="row-copy">
							<text class="row-title">退出当前账号</text>
							<text class="row-desc">退出后将返回登录页，已保存资料不会丢失。</text>
						</view>
					</view>
					<text class="row-arrow">›</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

	<script>
	import { PNG_ICONS } from '@/utils/staticIcons.js'
import { clearUser } from '@/utils/user.js'
	import { clearToken } from '@/utils/token.js'
	import { getUserProfile, DEFAULT_AVATAR, DEFAULT_USER_PROFILE, USER_PROFILE_UPDATED_EVENT } from '@/utils/userProfile.js'
	import { applyTheme, getThemeMode, setTheme, THEME_CHANGE_EVENT, THEME_DARK, THEME_LIGHT } from '@/utils/theme.js'
	import CommonAvatar from '@/components/CommonAvatar.vue'

	const SETTINGS_KEY = 'my_security_settings'
	// 返回箭头使用 PNG，Android 部分机型不支持 SVG
	const SETTINGS_TOP_BACK_ICON = PNG_ICONS.chevronLeft
	const THEME_MODE_OPTIONS = [
		{ label: '浅色模式', value: THEME_LIGHT },
		{ label: '深色模式', value: THEME_DARK }
	]

	export default {
		components: {
			CommonAvatar
		},
		data() {
			return {
				currentTheme: THEME_LIGHT,
				themeMode: THEME_LIGHT,
				themeListener: null,
				avatarUrl: DEFAULT_AVATAR,
				userInfo: {
					nickname: DEFAULT_USER_PROFILE.nickname,
					phone: ''
				},
				settings: {},
				settingsTopBackIcon: SETTINGS_TOP_BACK_ICON
			}
		},
		computed: {
			themeClass() {
				return this.currentTheme === THEME_DARK ? 'theme-dark' : 'theme-light'
			},
			isDarkTheme() {
				return this.currentTheme === THEME_DARK
			},
			themeModeLabel() {
				const current = THEME_MODE_OPTIONS.find(item => item.value === this.themeMode)
				return current ? current.label : '浅色模式'
			},
			themeModeShortLabel() {
				return this.isDarkTheme ? '深色' : '浅色'
			},
			themeStatusText() {
				return this.isDarkTheme ? '已开启深色模式' : '当前为正常白色主题'
			},
			accountSummary() {
				const nickname = this.userInfo.nickname || '当前账号'
				const phone = this.maskPhone(this.userInfo.phone)
				return phone ? `${nickname} · ${phone}` : `${nickname} · 点击管理账号资料`
			}
		},
		created() {
			if (typeof uni === 'undefined' || typeof uni.$on !== 'function') {
				return
			}

			this.themeListener = payload => {
				this.currentTheme = payload && payload.theme ? payload.theme : THEME_LIGHT
				this.themeMode = getThemeMode()
			}
			uni.$on(THEME_CHANGE_EVENT, this.themeListener)
			uni.$on(USER_PROFILE_UPDATED_EVENT, this.loadUserInfo)
		},
		beforeDestroy() {
			if (this.themeListener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(THEME_CHANGE_EVENT, this.themeListener)
			}
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.loadUserInfo)
			}
		},
		beforeUnmount() {
			if (this.themeListener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(THEME_CHANGE_EVENT, this.themeListener)
			}
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.loadUserInfo)
			}
		},
		onShow() {
			this.currentTheme = applyTheme()
			this.themeMode = getThemeMode()
			this.loadUserInfo()
			this.loadSettings()
		},
		methods: {
			goBack() {
				const pages = getCurrentPages()
				if (pages.length > 1) {
					uni.navigateBack({
						delta: 1
					})
					return
				}

				uni.switchTab({
					url: '/pages/my/my'
				})
			},
			loadUserInfo() {
				const user = getUserProfile()
				this.avatarUrl = user.avatar || DEFAULT_AVATAR
				this.userInfo.nickname = user.nickname || DEFAULT_USER_PROFILE.nickname
				this.userInfo.phone = user.phone || ''
			},
			loadSettings() {
				const localSettings = uni.getStorageSync(SETTINGS_KEY)
				if (localSettings && typeof localSettings === 'object') {
					this.settings = {
						...this.settings,
						...localSettings
					}
				}
			},
			saveSettings() {
				uni.setStorageSync(SETTINGS_KEY, this.settings)
			},
			maskPhone(phone) {
				if (!phone || phone.length < 7) {
					return ''
				}
				return `${phone.slice(0, 3)}****${phone.slice(-4)}`
			},
			openAccountSecurity() {
				uni.navigateTo({
					url: '/subPages/profile/profile'
				})
			},
			openThemeModeSheet() {
				uni.showActionSheet({
					itemList: THEME_MODE_OPTIONS.map(item => item.label),
					success: res => {
						const selected = THEME_MODE_OPTIONS[res.tapIndex]
						if (!selected || selected.value === this.themeMode) {
							return
						}

						this.themeMode = selected.value
						this.currentTheme = setTheme(selected.value)
						uni.showToast({
							title: selected.value === THEME_DARK ? '已切换深色模式' : '已切换正常白色主题',
							icon: 'none'
						})
					}
				})
			},
			toggleTheme(themeMode) {
				this.themeMode = themeMode
				this.currentTheme = setTheme(themeMode)
				uni.showToast({
					title: themeMode === THEME_DARK ? '已切换深色模式' : '已切换正常白色主题',
					icon: 'none'
				})
			},
			openHelpCenter() {
				uni.showActionSheet({
					itemList: ['使用说明', '意见反馈', '当前版本'],
					success: res => {
						const actions = [
							() => this.showHelpDetail('使用说明', '你可以在首页查看推荐任务，在题库中完成练习，在成长档案中查看评分与阶段变化。'),
							() => this.showHelpDetail('意见反馈', '当前为本地演示版本，如需反馈建议，可整理问题场景、复现步骤和截图后提交给开发同学。'),
							() => this.showHelpDetail('当前版本', '演示版 v1.0.0，已支持题库练习、成长档案和个人资料维护。')
						]
						actions[res.tapIndex]()
					}
				})
			},
			openPrivacyPolicy() {
				uni.navigateTo({
					url: '/subPages/settings/privacy'
				})
			},
			openUserAgreement() {
				uni.navigateTo({
					url: '/subPages/settings/agreement'
				})
			},
			openAcknowledgment() {
				uni.navigateTo({
					url: '/subPages/settings/acknowledgment'
				})
			},
			showHelpDetail(title, content) {
				uni.showModal({
					title,
					content,
					showCancel: false,
					confirmText: '知道了'
				})
			},
			handleLogout() {
				uni.showModal({
					title: '退出当前账号',
					content: '退出后将回到登录页，是否继续？',
					confirmColor: '#4AA9FE',
					success: res => {
						if (!res.confirm) {
							return
						}
						clearUser()
						clearToken()
						uni.removeStorageSync(SETTINGS_KEY)
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 与资料编辑页 `.header` 同源双层品牌蓝渐变 */
	$grad-blue-a: rgba(1, 188, 255, 0.1) 0%, rgba(49, 101, 215, 0.4) 45%, rgba(0, 123, 255, 0.05) 100%;
	$grad-blue-b: rgba(0, 122, 252, 0.7) 0%, rgba(1, 188, 255, 0) 100%;

	.settings-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background:
			radial-gradient(circle at top center, rgba(67, 112, 255, 0.12) 0%, rgba(67, 112, 255, 0) 24%),
			linear-gradient(180deg, #121214 0%, #151518 18%, #0f1012 100%);
	}

	.settings-topbar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 22rpx) 28rpx 18rpx;
		background:
			linear-gradient(180deg, $grad-blue-a),
			linear-gradient(180deg, $grad-blue-b);
		border-bottom: 2rpx solid rgba(243, 253, 255, 0.6);
	}

	.back-btn {
		box-sizing: border-box;
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.92);
		padding: 0;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
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
		text-shadow: 0 4rpx 16rpx rgba(38, 96, 189, 0.25);
	}

	.settings-scroll {
		flex: 1;
		min-height: 0;
	}

	.settings-content {
		padding: 20rpx 24rpx calc(56rpx + env(safe-area-inset-bottom));
	}

	.account-card,
	.list-card,
	.single-action-card,
	.logout-card {
		margin-top: 22rpx;
		border-radius: 28rpx;
		background: linear-gradient(180deg, #2a2b2f 0%, #25262a 100%);
		border: 1rpx solid rgba(255, 255, 255, 0.04);
		box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.28);
	}

	.account-card,
	.single-action-card,
	.logout-card {
		padding: 28rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18rpx;
	}

	.account-main,
	.row-main,
	.account-side,
	.row-side {
		display: flex;
		align-items: center;
	}

	.account-main,
	.row-main {
		flex: 1;
		min-width: 0;
		gap: 18rpx;
	}

	.account-copy,
	.row-copy {
		flex: 1;
		min-width: 0;
	}

	.group-title,
	.account-title,
	.account-desc,
	.row-title,
	.row-desc,
	.side-meta {
		display: block;
	}

	.group-title {
		margin-top: 40rpx;
		margin-left: 8rpx;
		font-size: 26rpx;
		font-weight: 800;
		letter-spacing: 1rpx;
		color: rgba(255, 255, 255, 0.72);
	}

	.account-icon {
		width: 68rpx;
		height: 68rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-weight: 800;
		flex-shrink: 0;
	}

	.account-icon-img {
		width: 44rpx;
		height: 44rpx;
	}

	.row-icon-img {
		width: 44rpx;
		height: 44rpx;
	}

	.account-title,
	.row-title {
		font-size: 28rpx;
		font-weight: 800;
		line-height: 1.3;
		color: #f7f8fa;
	}

	.account-desc,
	.row-desc {
		margin-top: 8rpx;
		font-size: 22rpx;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.46);
	}

	.account-side,
	.row-side {
		flex-shrink: 0;
		gap: 12rpx;
	}

	.account-avatar {
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
		border: 2rpx solid rgba(255, 255, 255, 0.08);
	}

	.list-card {
		padding: 0 24rpx;
	}

	.setting-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18rpx;
		padding: 28rpx 0;
		border-bottom: 1rpx solid rgba(255, 255, 255, 0.08);
	}

	.no-border {
		border-bottom: none;
	}

	.side-meta {
		font-size: 22rpx;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.72);
	}

	.row-arrow {
		font-size: 38rpx;
		line-height: 1;
		color: rgba(255, 255, 255, 0.38);
	}

	.icon-blue {
		background: rgba(255, 255, 255, 0.08);
		color: #f3f5f8;
	}

	.icon-cyan {
		background: transparent;
		color: #f3f5f8;
	}

	.icon-gold {
		background: rgba(255, 255, 255, 0.08);
		color: #f3f5f8;
	}

	.icon-green {
		background: rgba(255, 255, 255, 0.08);
		color: #f3f5f8;
	}

	.icon-violet {
		background: transparent;
		color: #f3f5f8;
	}

	.icon-red {
		background: transparent;
		color: #ffffffff;
	}

	.icon-indigo {
		background: transparent;
		color: #f3f5f8;
	}

	.icon-emerald {
		background: transparent;
		color: #f3f5f8;
	}

	.clickable:active {
		transform: scale(0.995);
		opacity: 0.96;
	}

	:deep(switch) {
		transform: scale(0.84);
		transform-origin: right center;
	}

	.settings-page.theme-light {
		background: linear-gradient(180deg, #edf6ff 0%, #f7f9fe 16%, #f8fafd 100%);

		.group-title {
			color: #30496f;
		}

		.account-card,
		.list-card,
		.single-action-card,
		.logout-card {
			background: #ffffff;
			border-color: rgba(67, 76, 210, 0.04);
			box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.08);
		}

		.account-icon,
		.row-icon {
			background: transparent;
			color: #3165d7;
		}

		.account-title,
		.row-title {
			color: #23345a;
		}

		.account-desc,
		.row-desc {
			color: #8090ad;
		}

		.setting-row {
			border-bottom-color: rgba(125, 149, 190, 0.12);
		}

		.side-meta {
			color: #4a89d9;
		}

		.row-arrow {
			color: #9dafcc;
		}

		.account-avatar {
			border-color: rgba(88, 117, 184, 0.1);
		}
	}

	.settings-page.theme-dark {
		.settings-topbar {
			background:
				linear-gradient(180deg, rgba(77, 108, 182, 0.38) 0%, rgba(35, 42, 63, 0.55) 50%, rgba(17, 18, 22, 0.3) 100%),
				linear-gradient(180deg, rgba(74, 103, 247, 0.55) 0%, rgba(74, 103, 247, 0) 100%);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}
	}
</style>
