<template>
	<view class="growth-page" :class="themeClass">
		<!-- 顶部栏固定，内容区按 tab 切换不同的成长模块。 -->
		<view class="animate-fade-down" style="animation-delay: 0.1s;">
			<GrowthTopBar :active-index="activeIndex" :theme="theme" @change="onTabChange" />
		</view>
		<view class="topbar-spacer"></view>
		<view class="page">
			<template v-if="activeIndex === 0">
				<!-- 成长档案页：总览、档案管理、趋势图、AI 分析按顺序展开。 -->
				<view class="animate-item" style="animation-delay: 0.2s;">
					<ArchiveHeroCard :theme="theme" :radarData="radarData" />
				</view>
				<view class="animate-item" style="animation-delay: 0.3s;">
					<ArchiveManagerCard :theme="theme" />
				</view>
				<view id="growth-trend-section" class="animate-item" style="animation-delay: 0.4s;">
					<ArchiveTrendCard :theme="theme" :radarData="radarData" />
				</view>
				<view class="animate-item" style="animation-delay: 0.5s;">
					<AIJobGapCard :theme="theme" :radarData="radarData" />
				</view>
			</template>
			<template v-else-if="activeIndex === 1">
				<!-- 简历工坊页：聚合附件简历、在线简历、简历仓库三个入口。 -->
				<view class="animate-item" style="animation-delay: 0.2s;">
					<ResumeWorkshop :theme="theme" />
				</view>
			</template>
			<template v-else>
				<!-- AI 画像页：上传照片并生成职业形象照。 -->
				<view class="animate-item" style="animation-delay: 0.2s;">
					<AISelfImage :theme="theme" />
				</view>
			</template>
		</view>

		<!-- 首次进入成长档案时的问卷引导弹窗。 -->
		<view v-if="showAssessmentModal" class="assessment-modal-mask" @tap="handleAssessmentCancel">
			<view class="assessment-modal" @tap.stop>
				<view class="modal-title">档案评估</view>
				<view class="modal-desc">欢迎使用档案功能！为了更精准地了解您的能力模型，请先完成一份调查问卷。</view>
				<view class="modal-btns">
					<view v-if="showAssessmentCancel" class="modal-btn cancel" @tap="handleAssessmentCancel">稍后</view>
					<view class="modal-btn confirm" :class="{'full': !showAssessmentCancel}" @tap="handleAssessmentConfirm">去填写</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import GrowthTopBar from './components/GrowthTopBar.vue'
	import ArchiveHeroCard from './components/ArchiveHeroCard.vue'
	import ArchiveTrendCard from './components/ArchiveTrendCard.vue'
	import ArchiveManagerCard from './components/ArchiveManagerCard.vue'
	import AIJobGapCard from './components/AIJobGapCard.vue'
	import ResumeWorkshop from './components/ResumeWorkshop.vue'
	import AISelfImage from './components/AISelfImage.vue'
	import themeMixin from '@/utils/themeMixin.js'
	import { request } from '@/api/request.js'

	export default {
		mixins: [themeMixin],
		components: {
			GrowthTopBar,
			ArchiveHeroCard,
			ArchiveTrendCard,
			ArchiveManagerCard,
			AIJobGapCard,
			ResumeWorkshop,
			AISelfImage
		},
		data() {
			return {
				// 当前顶部 tab，下标分别对应成长档案 / 简历工坊 / AI画像。
				activeIndex: 0,
				// 问卷引导弹窗显示状态及其交互模式。
				showAssessmentModal: false,
				showAssessmentCancel: false,
				assessmentSeenKey: '',
				// 雷达测评数据会透传给多个子组件共用。
				radarData: null
			}
		},
		onShow() {
			// 每次回到页面都尝试恢复目标滚动位置和最新测评数据。
			this.handlePendingScroll()
			this.checkFirstTimeRadar()
			// 先尝试从全局数据加载（APK中setStorageSync跨页面不可靠）
			const user = uni.getStorageSync('user_v2') || {}
			const userId = user.userId || user.id
			if (userId) {
				const app = getApp()
				if (app && app.globalData && app.globalData.radarDataCache && app.globalData.radarDataCache[userId]) {
					this.radarData = app.globalData.radarDataCache[userId]
				}
			}
			// 然后异步拉取最新数据
			this.fetchRadarData()
		},
		methods: {
			async fetchRadarData() {
				// 页面优先拉取最新测评结果，并同步写入全局缓存供其他页面复用。
				const user = uni.getStorageSync('user_v2') || {}
				const userId = user.userId || user.id
				if (!userId) return
				try {
					const res = await request({
						url: '/api/radar-chart/my-evaluation',
						method: 'GET',
						data: { studentId: userId }
					})
					// 兼容不同封装的响应结构
					const realData = res.data || res
					if (realData && realData.totalScore !== undefined) {
						this.radarData = realData
						// 同时缓存到全局，供后续使用
						const app = getApp()
						if (app && app.globalData) {
							app.globalData.radarDataCache = app.globalData.radarDataCache || {}
							app.globalData.radarDataCache[userId] = realData
						}
					} else {
						// 后端没有查到数据，尝试使用全局缓存
						const app = getApp()
						if (app && app.globalData && app.globalData.radarDataCache && app.globalData.radarDataCache[userId]) {
							this.radarData = app.globalData.radarDataCache[userId]
						} else {
							// 清除 has_submitted_radar flag，以便下次可以重新弹窗引导
							uni.removeStorageSync('has_submitted_radar_' + userId)
							this.checkFirstTimeRadar()
						}
					}
				} catch (e) {
					// 查询失败时，尝试使用全局缓存
					const app = getApp()
					if (app && app.globalData && app.globalData.radarDataCache && app.globalData.radarDataCache[userId]) {
						this.radarData = app.globalData.radarDataCache[userId]
					} else {
						uni.showModal({
							title: '档案数据同步失败',
							content: `请检查网络连接后重试。\n错误详情: ${e.message}`,
							showCancel: false
						});
					}
					console.error('获取雷达数据失败', e)
				}
			},
			checkFirstTimeRadar() {
				// 未完成问卷时弹出引导弹窗，二次进入后才允许暂时跳过。
				const user = uni.getStorageSync('user_v2') || {}
				const userId = user.userId || user.id
				if (!userId) return
				
				const storageKey = 'has_submitted_radar_' + userId
				const hasSubmitted = uni.getStorageSync(storageKey)
				
				if (!hasSubmitted) {
					const seenKey = 'has_seen_radar_modal_' + userId
					const hasSeen = uni.getStorageSync(seenKey)
					
					this.assessmentSeenKey = seenKey
					this.showAssessmentCancel = !!hasSeen
					this.showAssessmentModal = true
				}
			},
			handleAssessmentCancel() {
				// 第一次进入必须去填写问卷，因此不允许直接关闭。
				if (!this.showAssessmentCancel) return // 第一次不能取消
				this.showAssessmentModal = false
			},
			handleAssessmentConfirm() {
				// 记录用户已看过弹窗后，跳转到问卷页面继续评估。
				if (!this.showAssessmentCancel && this.assessmentSeenKey) {
					uni.setStorageSync(this.assessmentSeenKey, true)
				}
				this.showAssessmentModal = false
				uni.navigateTo({
					url: '/subPages/searchTest/searchTest'
				})
			},
			onTabChange(index) {
				// 切换 tab 时回到页面顶部，避免保留上一个模块的滚动位置。
				this.activeIndex = index
				uni.pageScrollTo({ scrollTop: 0, duration: 0 })
			},
			handlePendingScroll() {
				// 支持从其他页面带着目标锚点返回到指定 tab 或趋势模块。
				const target = uni.getStorageSync('growth_archive_scroll_target')
				if (target !== 'trend') {
					if (target === 'resume') {
						uni.removeStorageSync('growth_archive_scroll_target')
						this.activeIndex = 1
						uni.pageScrollTo({ scrollTop: 0, duration: 0 })
					}
					return
				}

				uni.removeStorageSync('growth_archive_scroll_target')
				this.activeIndex = 0
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this)
					query.select('#growth-trend-section').boundingClientRect(rect => {
						if (!rect) {
							return
						}

						const top = Math.max(0, rect.top - 16)
						uni.pageScrollTo({
							scrollTop: top,
							duration: 250
						})
					}).exec()
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f7fb;
	}

	.growth-page {
		min-height: 100vh;
		background:
			radial-gradient(circle at top right, rgba(255, 196, 176, 0.18) 0%, rgba(255, 196, 176, 0) 24%),
			linear-gradient(180deg, #ffffff 0%, #f7f8fb 24%, #f5f7fb 100%);
	}

	.topbar-spacer {
		/* 加上顶部状态栏和环境安全区，确保真机不遮挡 */
		height: calc(env(safe-area-inset-top) + var(--status-bar-height) + 130rpx);
	}

	.page {
		padding: 20rpx 18rpx calc(40rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 22rpx;
	}

	.growth-page.theme-dark {
		background:
			radial-gradient(circle at top right, rgba(74, 103, 247, 0.22) 0%, rgba(74, 103, 247, 0) 24%),
			linear-gradient(180deg, #111216 0%, #17191f 24%, #111216 100%);
	}

	.animate-item {
		animation: slideUpFade 0.6s ease-out both;
	}

	@keyframes slideUpFade {
		from {
			opacity: 0;
			transform: translateY(40rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
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

	.assessment-modal-mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease-out;
	}

	.assessment-modal {
		width: 580rpx;
		background: #ffffff;
		border-radius: 32rpx;
		padding: 48rpx 40rpx 40rpx;
		box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.15);
		animation: zoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.growth-page.theme-dark .assessment-modal {
		background: #1e222d;
		box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.4);
	}

	.modal-title {
		font-size: 36rpx;
		font-weight: 600;
		color: #1a1a2e;
		text-align: center;
		margin-bottom: 24rpx;
	}

	.growth-page.theme-dark .modal-title {
		color: #f1f4fa;
	}

	.modal-desc {
		font-size: 28rpx;
		color: #666666;
		text-align: center;
		line-height: 1.6;
		margin-bottom: 48rpx;
	}

	.growth-page.theme-dark .modal-desc {
		color: #999999;
	}

	.modal-btns {
		display: flex;
		gap: 24rpx;
	}

	.modal-btn {
		flex: 1;
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
		border-radius: 42rpx;
		font-size: 30rpx;
		font-weight: 500;
		transition: all 0.2s;
	}

	.modal-btn:active {
		transform: scale(0.96);
	}

	.modal-btn.cancel {
		background: #f5f7fb;
		color: #666666;
	}

	.growth-page.theme-dark .modal-btn.cancel {
		background: #2a2f3d;
		color: #a0a5b5;
	}

	.modal-btn.confirm {
		background: #5d76bd;
		color: #ffffff;
		box-shadow: 0 8rpx 20rpx rgba(93, 118, 189, 0.3);
	}

	.growth-page.theme-dark .modal-btn.confirm {
		background: #6c88d4;
		box-shadow: 0 8rpx 20rpx rgba(108, 136, 212, 0.2);
	}

	.modal-btn.confirm.full {
		flex: none;
		width: 100%;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes zoomIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
