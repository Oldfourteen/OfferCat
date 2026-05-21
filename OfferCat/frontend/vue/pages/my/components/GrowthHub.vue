<template>
	<view class="growth-hub" :class="themeClass" :key="animationKey">
		<view class="section-head animate-float-up">
			<view>
				<!-- 标题区说明该模块承接成长相关入口与复盘内容。 -->
				<text class="section-title">成长</text>
			</view>
		</view>

		<view class="main-grid">
			<!-- 主功能网格聚合成长档案、打卡、冲刺营和收藏等入口。 -->
			<view v-for="(item, index) in primaryTools" :key="item.name" class="main-item animate-float-up" :style="{ animationDelay: (0.05 + index * 0.033) + 's' }" @click="handleToolClick(item)">
				<view class="tool-icon" :class="item.uiClass">
					<image v-if="item.icon.startsWith('data:image')" :src="item.icon" class="tool-icon-img" mode="aspectFit" />
					<text v-else>{{ item.icon }}</text>
				</view>
				<text class="tool-name">{{ item.name }}</text>
				<text class="tool-meta">{{ item.desc }}</text>
			</view>
		</view>

<!-- 		<view class="stats-row">
			<view v-for="(item, index) in stats" :key="item.label" class="stat-pill">
				<text class="stat-value">{{ dynamicStats[index] }}</text>
				<text class="stat-label">{{ item.label }}</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	import { getRecruitmentSeason, getCurrentYear } from '@/utils/date.js'
	import { getGrowthRecordStats } from '@/api/growth.js'
	import { getUser, resolveStoredStudentId, resolveStoredUserId, syncUserProfileFromServer } from '@/utils/user.js'

	export default {
		name: 'GrowthHub',
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
				// primaryTools 定义成长区各入口的文案、图标与描述信息。
				primaryTools: [
					{ name: '成长档案', desc: '查看阶段成果', icon: '/static/png/inline/d535b1270941.png', uiClass: 'ui-1' },
					{ name: '打卡天数', desc: '维持连续节奏', icon: '/static/png/inline/de4e18d127c1.png', uiClass: 'ui-2' },
					{ name: '周末复盘', desc: '复盘发现问题', icon: '/static/png/inline/1e91ff0d131d.png', uiClass: 'ui-3' },
					{ name: 'AI冲刺营', desc: `${getCurrentYear()}${getRecruitmentSeason()}专属`, icon: '/static/png/inline/0ed50fe76d46.png', uiClass: 'ui-4' },
					{ name: '做题记录', desc: '查看练习历史', icon: '/static/png/inline/960a79dfeb91.png', uiClass: 'ui-5' },
					{ name: '我的收藏', desc: '查看收藏题单', icon: '/static/png/inline/78e445c0f1c2.png', uiClass: 'ui-6' }
				],
				// stats: [
				// 	{ label: '本周成长值', value: '+128' },
				// 	{ label: '连续专注', value: '14天' },
				// 	{ label: '能力提升', value: '+9%' }
				// ],
				// dynamicStats: ['+0', '0天', '+0%'],
				
			}
		},
		computed: {
			themeClass() {
				// 成长区按主题切换模块底色与文字配色。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		methods: {
			async handleToolClick(item) {
				// 不同成长入口分发到成长档案、历史记录、收藏和冲刺营等页面。
				const actions = {
					'成长档案': () => {
						uni.switchTab({
							url: '/pages/GrowthArchive/GrowthArchive'
						})
					},
					'打卡天数': async () => {
						let studentId = resolveStoredStudentId()
						let userId = resolveStoredUserId(getUser())
						if (!studentId && !userId) {
							await syncUserProfileFromServer()
							studentId = resolveStoredStudentId()
							userId = resolveStoredUserId(getUser())
						}
						if (!studentId && !userId) {
							uni.showModal({
								title: '打卡提醒',
								content: '未获取用户信息，请重新登录后再试。',
								showCancel: false,
								confirmText: '知道了'
							})
							return
						}
						try {
							const res = await getGrowthRecordStats()
							const d = res && res.data
							const total = Number(d && d.totalCheckinDays) || 0
							uni.showModal({
								title: '打卡提醒',
								content: `你已经累计打卡 ${total} 天了，继续保持这个节奏。`,
								showCancel: false,
								confirmText: '知道了'
							})
						} catch (e) {
							uni.showModal({
								title: '打卡提醒',
								content: '暂无法获取打卡数据，请稍后再试。',
								showCancel: false,
								confirmText: '知道了'
							})
						}
					},
					'周末复盘': () => {
						uni.navigateTo({
							url: '/subPages/questionBank/history?type=all'
						})
					},
					'AI冲刺营': () => {
						uni.navigateTo({
							url: '/subPages/springCamp/springCamp'
						})
					},
					'做题记录': () => {
						uni.navigateTo({
							url: '/subPages/questionBank/history?type=all'
						})
					},
					'我的收藏': () => {
						uni.navigateTo({
							url: '/subPages/questionBank/favorites?type=all'
						})
					}
				}

				if (actions[item.name]) {
					await actions[item.name]()
				}
			}
		}
	}
</script>

<style lang="scss">
	.growth-hub {
		margin: 18rpx 15rpx 0;
		padding: 28rpx;
		border-radius: 32rpx;
		background: #ffffff;
		border: 1rpx solid rgba(67, 76, 210, 0.06);
		box-shadow:
			0 2rpx 10rpx rgba(15, 23, 42, 0.04),
			0 18rpx 42rpx rgba(67, 76, 210, 0.08);
	}

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20rpx;
	}

	.section-title,
	.section-subtitle {
		display: block;
	}

	.section-title {
		font-size: 40rpx;
		font-weight: 800;
		color: #24345b;
	}

	.section-subtitle {
		margin-top: 8rpx;
		font-size: 22rpx;
		line-height: 1.5;
		color: #8390ad;
	}

	.section-link {
		flex-shrink: 0;
		font-size: 24rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.main-grid {
		margin-top: 34rpx;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 18rpx;
	}

	.main-item {
			padding: 8rpx 0 0;
			box-shadow:
				none;
			display: flex;
			flex-direction: column;
			align-items: center;
			cursor: pointer;
		}

	.tool-icon {
		width: 88rpx;
		height: 88rpx;
		border-radius: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 38rpx;
		font-weight: 800;

		.tool-icon-img {
			width: 58rpx;
			height: 58rpx;
		}
	}

	.ui-1 {
		background: rgba(238, 192, 44, 0.16);
		color: #e0a91b;
	}

	.ui-2 {
		background: rgba(169, 87, 248, 0.14);
		color: #a957f8;
	}

	.ui-3 {
		background: rgba(48, 185, 99, 0.14);
		color: #30b963;
	}

	.ui-4 {
		background: rgba(242, 61, 79, 0.14);
		color: #F23D4F;
	}

	.ui-5 {
		background: rgba(212, 35, 122, 0.14);
		color: #d4237a;
	}

	.ui-6 {
		background: rgba(255, 147, 74, 0.14);
		color: #FF934A;
	}

	.tool-name {
		margin-top: 14rpx;
		font-size: 24rpx;
		font-weight: 600;
		color: #24345b;
		line-height: 1.4;
		text-align: center;
	}

	.tool-meta {
		display: none;
	}

	.stats-row {
		margin-top: 20rpx;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16rpx;
	}

	.stat-pill {
			padding: 18rpx 14rpx;
			border-radius: 22rpx;
			background: linear-gradient(135deg, rgba(49, 101, 215, 0.08), rgba(1, 188, 255, 0.08));
			border: 2rpx solid rgba(67, 76, 210, 0.1);
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

	.stat-value,
	.stat-label {
		display: block;
	}

	.stat-value {
		font-size: 30rpx;
		font-weight: 800;
		color: #344b8f;
	}

	.stat-label {
		margin-top: 8rpx;
		font-size: 20rpx;
		line-height: 1.4;
		color: #7e8baa;
	}

	.sub-grid {
		margin-top: 20rpx;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 18rpx;
	}

	.sub-item {
		padding: 22rpx 12rpx 18rpx;
		border-radius: 24rpx;
		background: linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.sub-icon {
		width: 66rpx;
		height: 66rpx;
		border-radius: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		font-weight: 800;
	}

	.sub-name {
		margin-top: 14rpx;
		font-size: 22rpx;
		line-height: 1.35;
		font-weight: 700;
		color: #2a385c;
	}

	.growth-hub.theme-dark {
		background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 3rpx 12rpx rgba(0, 0, 0, 0.32),
			0 18rpx 42rpx rgba(0, 0, 0, 0.26);

		.section-title,
		.tool-name {
			color: #f4f7fb;
		}

		.section-link {
			color: #8ab7ff;
		}

		.tool-meta,
		.stat-label {
			color: rgba(255, 255, 255, 0.56);
		}

		.stat-value {
			color: #f2f5fa;
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
