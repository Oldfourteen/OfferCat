<template>
	<view class="help-center-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="goBack">
				<view class="back-btn">
					<image class="back-icon-img" :src="helpCenterBackIcon" mode="aspectFit" />
				</view>
			</view>
			<text class="nav-title">帮助中心</text>
			<view class="nav-right"></view>
		</view>

		<!-- 页面内容 -->
		<scroll-view class="page-content" scroll-y>
			<!-- 客服热线区域 -->

			<!-- 登录弹窗 -->
			<view class="login-modal-overlay" v-if="showLoginModal" @click="handleLoginCancel">
				<view class="login-modal" @click.stop>
					<view class="login-modal-header">
						<text class="login-modal-title">管理员登录</text>
					</view>
					<view class="login-modal-content">
						<view class="login-input-group">
							<text class="login-input-label">账号</text>
							<input 
								class="login-input" 
								v-model="loginAccount" 
								placeholder="请输入账号"
								confirm-type="next"
							/>
						</view>
						<view class="login-input-group">
							<text class="login-input-label">密码</text>
							<input 
								class="login-input" 
								v-model="loginPassword" 
								placeholder="请输入密码"
								type="password"
								confirm-type="done"
								@confirm="handleLoginConfirm"
							/>
						</view>
					</view>
					<view class="login-modal-footer">
						<view class="login-btn login-cancel-btn" @click="handleLoginCancel">
							<text class="login-btn-text">取消</text>
						</view>
						<view class="login-btn login-confirm-btn" @click="handleLoginConfirm">
							<text class="login-btn-text">登录</text>
						</view>
					</view>
				</view>
			</view>
			<view class="hotline-card">
				<view class="hotline-content">
					<text class="hotline-label">官方客服热线</text>
					<text class="hotline-number">15092730328</text>
					<text class="hotline-desc">工作日 9:00-18:00</text>
				</view>
			</view>

			<!-- 功能入口卡片 -->
			<view class="function-grid">
				<view class="function-item" @click="navigateToManager">
					<view class="function-tag manager-tag">管理</view>
					<text class="function-name">管理者入口</text>
					<text class="function-desc">管理论坛与用户</text>
				</view>
				<view class="function-item" @click="navigateToOnlineService">
					<view class="function-tag service-tag">客服</view>
					<text class="function-name">在线客服</text>
					<text class="function-desc">联系人工客服</text>
				</view>
			</view>

			<!-- 常见问题 -->
			<view class="faq-section">
				<view class="section-header">
					<text class="section-title">常见问题</text>
				</view>
				<view class="faq-list">
					<view class="faq-item" v-for="(item, index) in faqList" :key="index" @click="showFaqDetail(item)">
						<text class="faq-question">{{ item.question }}</text>
						<text class="faq-arrow">></text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { PNG_ICONS } from '@/utils/staticIcons.js'
import themeMixin from '@/utils/themeMixin.js'
	import { request } from '@/api/request.js'

	const DEFAULT_FAQ_LIST = [
		{ question: '如何创建简历？', answer: '在首页点击"创建简历"按钮，按照提示填写个人信息即可。' },
		{ question: '如何修改密码？', answer: '进入个人中心 -> 设置 -> 修改密码。' },
		{ question: '如何联系客服？', answer: '点击底部"在线客服"按钮，即可与人工客服沟通。' },
		{ question: '数据如何备份？', answer: '系统会自动备份您的数据到云端，无需手动操作。' },
		{ question: '如何注销账号？', answer: '进入设置 -> 账号安全 -> 注销账号。' }
	]

	const HELP_CENTER_BACK_ICON = PNG_ICONS.chevronLeft

	export default {
		mixins: [themeMixin],
		data() {
			return {
				faqList: [],
				helpCenterBackIcon: HELP_CENTER_BACK_ICON,
				showLoginModal: false,
				loginAccount: '',
				loginPassword: '',
				loginFailedCount: 0,
				lockUntil: 0,
				lockDuration: 60000
			}
		},
		onLoad() {
			this.loadFaqList()
			this.loadLockStatus()
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			loadLockStatus() {
				try {
					const saved = uni.getStorageSync('admin_login_lock')
					if (saved) {
						const data = JSON.parse(saved)
						this.lockUntil = data.lockUntil || 0
						this.loginFailedCount = data.loginFailedCount || 0
					}
				} catch (_) {
					this.lockUntil = 0
					this.loginFailedCount = 0
				}
			},
			saveLockStatus() {
				try {
					uni.setStorageSync('admin_login_lock', JSON.stringify({
						lockUntil: this.lockUntil,
						loginFailedCount: this.loginFailedCount
					}))
				} catch (_) {}
			},
			async loadFaqList() {
				try {
					const body = await request({ url: '/api/help/faq', method: 'GET' })
					if (body && Array.isArray(body.data) && body.data.length) {
						this.faqList = body.data
					} else {
						this.faqList = DEFAULT_FAQ_LIST.slice()
					}
				} catch (_) {
					this.faqList = DEFAULT_FAQ_LIST.slice()
				}
			},
			navigateToManager() {
				this.showLoginModal = true
			},
			handleLoginConfirm() {
				const now = Date.now()
				if (now < this.lockUntil) {
					const remaining = Math.ceil((this.lockUntil - now) / 1000)
					uni.showToast({
						title: `请${remaining}秒后再试`,
						icon: 'none'
					})
					return
				}
				if (this.loginAccount === 'root' && this.loginPassword === 'root') {
					this.loginFailedCount = 0
					this.lockUntil = 0
					this.saveLockStatus()
					this.showLoginModal = false
					this.loginAccount = ''
					this.loginPassword = ''
					uni.navigateTo({
						url: '/subPages/helpCenter/managerPage'
					})
				} else {
					this.loginFailedCount++
					this.lockUntil = now + this.lockDuration
					this.saveLockStatus()
					uni.showToast({
						title: '账号或密码错误，请1分钟后再试',
						icon: 'none'
					})
				}
			},
			handleLoginCancel() {
				this.showLoginModal = false
				this.loginAccount = ''
				this.loginPassword = ''
			},
			navigateToOnlineService() {
				uni.navigateTo({
					url: '/subPages/helpCenter/onlineService'
				})
			},
			showFaqDetail(item) {
				uni.showModal({
					title: item.question,
					content: item.answer,
					showCancel: false,
					confirmText: '知道了'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.help-center-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f0f3f9;
	}

	.login-modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.login-modal {
		width: 600rpx;
		background: #ffffff;
		border-radius: 28rpx;
		overflow: hidden;
		box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.3);
	}

	.login-modal-header {
		padding: 32rpx;
		text-align: center;
		border-bottom: 1rpx solid rgba(93, 118, 189, 0.1);
	}

	.login-modal-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #2d3748;
	}

	.login-modal-content {
		padding: 32rpx;
	}

	.login-input-group {
		margin-bottom: 24rpx;
	}

	.login-input-group:last-child {
		margin-bottom: 0;
	}

	.login-input-label {
		display: block;
		font-size: 26rpx;
		font-weight: 600;
		color: #4a5568;
		margin-bottom: 12rpx;
	}

	.login-input {
		width: 100%;
		height: 80rpx;
		background: #f7f9fc;
		border-radius: 16rpx;
		padding: 0 24rpx;
		font-size: 28rpx;
		color: #2d3748;
		border: 2rpx solid rgba(93, 118, 189, 0.1);
		box-sizing: border-box;
		transition: all 0.2s ease;

		&:focus {
			border-color: #5d76bd;
			background: #ffffff;
		}
	}

	.login-modal-footer {
		display: flex;
		gap: 20rpx;
		padding: 0 32rpx 32rpx;
	}

	.login-btn {
		flex: 1;
		height: 80rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.98);
		}

		.login-btn-text {
			font-size: 28rpx;
			font-weight: 600;
		}
	}

	.login-cancel-btn {
		background: #f0f4fa;
		border: 1rpx solid rgba(93, 118, 189, 0.2);

		.login-btn-text {
			color: #5d76bd;
		}

		&:active {
			background: #e0e4f0;
		}
	}

	.login-confirm-btn {
		background: #5d76bd;
		box-shadow: 0 6rpx 20rpx rgba(93, 118, 189, 0.35);

		.login-btn-text {
			color: #ffffff;
		}

		&:active {
			box-shadow: 0 4rpx 12rpx rgba(93, 118, 189, 0.25);
		}
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 22rpx;
		background: #ffffff;
		box-shadow:
			0 4rpx 20rpx rgba(93, 118, 189, 0.12),
			0 2rpx 8rpx rgba(93, 118, 189, 0.06);

		.nav-left {
			flex-shrink: 0;

			.back-btn {
				box-sizing: border-box;
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				border: none;
				background: #f5f7fb;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow:
					0 4rpx 12rpx rgba(93, 118, 189, 0.15),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.8);
				transition: all 0.2s ease;

				&:active {
					transform: scale(0.95);
					box-shadow:
						0 2rpx 6rpx rgba(93, 118, 189, 0.1),
						inset 0 2rpx 0 rgba(255, 255, 255, 0.6);
				}
			}

			.back-icon-img {
				width: 38rpx;
				height: 38rpx;
				flex-shrink: 0;
			}
		}

		.nav-title {
			flex: 1;
			text-align: center;
			font-size: 34rpx;
			font-weight: 700;
			color: #2d3748;
		}

		.nav-right {
			width: 72rpx;
			height: 72rpx;
			flex-shrink: 0;
		}
	}

	.page-content {
		flex: 1;
		min-height: 0;
		box-sizing: border-box;
		padding-bottom: calc(28rpx + env(safe-area-inset-bottom));
	}

	.hotline-card {
		margin: 28rpx 28rpx 24rpx;
		border-radius: 28rpx;
		overflow: hidden;
		background: #5d76bd;
		padding: 36rpx 32rpx;
		box-shadow:
			0 12rpx 40rpx rgba(93, 118, 189, 0.35),
			0 4rpx 12rpx rgba(93, 118, 189, 0.2),
			inset 0 2rpx 0 rgba(255, 255, 255, 0.15),
			inset 0 -4rpx 12rpx rgba(0, 0, 0, 0.08);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 1rpx;
			background: rgba(255, 255, 255, 0.2);
		}
	}

	.hotline-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
		text-align: center;
	}

	.hotline-label {
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.85);
		letter-spacing: 0.06em;
	}

	.hotline-number {
		font-size: 48rpx;
		font-weight: 700;
		color: #ffffff;
		letter-spacing: 0.04em;
		text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
	}

	.hotline-desc {
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.7);
		margin-top: 4rpx;
	}

	.function-grid {
		display: flex;
		gap: 20rpx;
		padding: 0 28rpx;
	}

	.function-item {
		flex: 1;
		min-width: 0;
		background: #ffffff;
		border-radius: 24rpx;
		padding: 32rpx 20rpx 36rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow:
			0 8rpx 28rpx rgba(93, 118, 189, 0.12),
			0 2rpx 8rpx rgba(93, 118, 189, 0.06),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 20rpx;
			right: 20rpx;
			height: 1rpx;
			background: rgba(255, 255, 255, 0.5);
		}

		&:active {
			transform: translateY(-2rpx) scale(0.98);
			box-shadow:
				0 12rpx 36rpx rgba(93, 118, 189, 0.18),
				0 4rpx 12rpx rgba(93, 118, 189, 0.1),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.6);
		}
	}

	.function-tag {
		padding: 16rpx 32rpx;
		border-radius: 16rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: #ffffff;
		box-shadow:
			0 8rpx 24rpx rgba(93, 118, 189, 0.25),
			0 2rpx 8rpx rgba(93, 118, 189, 0.12),
			inset 0 2rpx 0 rgba(255, 255, 255, 0.3);
	}

	.manager-tag {
		background: #5d76bd;
	}

	.service-tag {
		background: #4a90a4;
	}

	.function-name {
		font-size: 28rpx;
		font-weight: 700;
		color: #2d3748;
		margin-top: 20rpx;
		text-align: center;
	}

	.function-desc {
		font-size: 22rpx;
		font-weight: 500;
		color: #718096;
		margin-top: 8rpx;
		line-height: 1.4;
		text-align: center;
	}

	.faq-section {
		margin: 28rpx 28rpx 0;
		background: #ffffff;
		border-radius: 28rpx;
		padding: 28rpx 24rpx 32rpx;
		box-shadow:
			0 8rpx 32rpx rgba(93, 118, 189, 0.1),
			0 2rpx 8rpx rgba(93, 118, 189, 0.05),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 24rpx;
			right: 24rpx;
			height: 1rpx;
			background: rgba(255, 255, 255, 0.5);
		}
	}

	.section-header {
		margin-bottom: 24rpx;
		padding: 0 8rpx;

		.section-title {
			font-size: 30rpx;
			font-weight: 700;
			color: #2d3748;
		}
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}

	.faq-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
		padding: 24rpx 20rpx;
		border-radius: 20rpx;
		background: #f7f9fc;
		box-shadow:
			0 2rpx 8rpx rgba(93, 118, 189, 0.06),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		transition: all 0.2s ease;
		position: relative;

		&:active {
			transform: scale(0.99);
			background: #f0f4fa;
			box-shadow:
				0 4rpx 12rpx rgba(93, 118, 189, 0.1),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.6);
		}
	}

	.faq-question {
		font-size: 28rpx;
		font-weight: 600;
		color: #2d3748;
		flex: 1;
		min-width: 0;
		line-height: 1.4;
	}

	.faq-arrow {
		font-size: 28rpx;
		font-weight: 700;
		color: #5d76bd;
		flex-shrink: 0;
	}

	.help-center-page.theme-dark {
		background: #1a1c23;

		.nav-bar {
			background: #252830;
			box-shadow:
				0 4rpx 20rpx rgba(0, 0, 0, 0.3);

			.nav-title {
				color: #f0f2f8;
			}

			.back-btn {
				background: #2e323c;
				box-shadow:
					0 4rpx 12rpx rgba(0, 0, 0, 0.25),
					inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
			}
		}

		.hotline-card {
			background: #5d76bd;
			box-shadow:
				0 12rpx 40rpx rgba(0, 0, 0, 0.35),
				0 4rpx 12rpx rgba(0, 0, 0, 0.2),
				inset 0 2rpx 0 rgba(255, 255, 255, 0.1);
		}

		.function-item {
			background: #252830;
			box-shadow:
				0 8rpx 28rpx rgba(0, 0, 0, 0.25),
				0 2rpx 8rpx rgba(0, 0, 0, 0.15),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.03);

			&:active {
				box-shadow:
					0 12rpx 36rpx rgba(0, 0, 0, 0.3),
					0 4rpx 12rpx rgba(0, 0, 0, 0.2);
			}
		}

		.function-tag {
			box-shadow:
				0 8rpx 24rpx rgba(0, 0, 0, 0.35),
				0 2rpx 8rpx rgba(0, 0, 0, 0.2),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
		}

		.function-name {
			color: #f0f2f8;
		}

		.function-desc {
			color: #8a92a8;
		}

		.faq-section {
			background: #252830;
			box-shadow:
				0 8rpx 32rpx rgba(0, 0, 0, 0.25),
				0 2rpx 8rpx rgba(0, 0, 0, 0.15),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.03);
		}

		.section-header {
			.section-title {
				color: #f0f2f8;
			}
		}

		.faq-item {
			background: #2e323c;
			box-shadow:
				0 2rpx 8rpx rgba(0, 0, 0, 0.15),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.03);

			&:active {
				background: #363b47;
			}

			.faq-question {
				color: #e8ebf2;
			}

			.faq-arrow {
				color: #8ea9ff;
			}
		}
	}
</style>