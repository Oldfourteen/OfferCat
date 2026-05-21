<template>
	<view class="question-bank" :class="themeClass">
		<view class="section-head">
			<!-- 标题区说明题库模块提供笔试与面试两类刷题能力。 -->
			<view>
				<text class="section-title">题库专区</text>
				<text class="section-subtitle">面试真题和笔试真题一站式刷题</text>
			</view>
		</view>

		<!-- 二类题库方块入口（与下方长条对应，均在题库专区内） -->
		<view class="type-tile-row">
			<view
				v-for="item in modules"
				:key="'tile-' + item.key"
				class="type-tile-wrap"
				@click.stop="goModule(item)"
			>
				<QuestionBankTypeGauge
					:ref="`gauge-${item.key}`"
					:theme="theme"
					:tone="item.key === 'interview' ? 'interview' : 'written'"
					:accuracy-percent="item.key === 'interview' ? interviewAccuracy : writtenAccuracy"
					:category-label="item.shortLabel"
				/>
			</view>
		</view>

		<view class="module-list">
			<!-- 模块列表根据配置项渲染题库入口卡片。 -->
			<view
				v-for="item in modules"
				:key="item.key"
				class="module-card"
				:class="item.cardClass"
				@click="goModule(item)"
			>
				<view class="module-copy">
					<view class="module-icon" :class="item.iconClass">
						<image
							v-if="item.svgIcon"
							:src="item.svgIcon"
							class="module-svg-icon"
							:class="{ 'module-svg-icon-interview': item.key === 'interview' }"
							mode="aspectFit"
						/>
						<text v-else>{{ item.icon }}</text>
					</view>
					<text class="module-title">{{ item.title }}</text>
					<text class="module-desc">{{ item.desc }}</text>
					<view class="module-meta-chip">
						<text class="module-meta">{{ item.meta }}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import QuestionBankTypeGauge from './QuestionBankTypeGauge.vue'
	import { getQuestionHistory, QUESTION_HISTORY_UPDATED_EVENT, syncQuestionHistoryFromServer } from '@/utils/questionHistory.js'
	import { accuracyPercentForKind } from '@/utils/growthTrendScore.js'
	import { getUser, resolveStoredStudentId, resolveStoredUserId, syncUserProfileFromServer } from '@/utils/user.js'

	export default {
		name: 'QuestionBankModules',
		components: {
			QuestionBankTypeGauge
		},
		props: {
			theme: {
				type: String,
				default: 'light'
			},
		},
		computed: {
			themeClass() {
				// 题库容器按主题切换浅色/深色外观。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		mounted() {
			this.refreshPracticeScores()
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(QUESTION_HISTORY_UPDATED_EVENT, this.refreshPracticeScores)
				uni.$on('index-page-show', this.refreshPracticeScores)
			}
		},
		beforeDestroy() {
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.refreshPracticeScores)
				uni.$off('index-page-show', this.refreshPracticeScores)
			}
		},
		beforeUnmount() {
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.refreshPracticeScores)
				uni.$off('index-page-show', this.refreshPracticeScores)
			}
		},
		data() {
			return {
				writtenAccuracy: null,
				interviewAccuracy: null,
				// 两类题库入口的静态配置，包含标题、文案和跳转地址。
				modules: [
					{
						key: 'written',
						shortLabel: '笔试题',
						shortIcon: '笔',
						title: '笔试真题',
						desc: '聚合近年校招与实习笔试套题，按公司筛选',
						meta: '36 套真题 · 热门公司持续更新',
						svgIcon: '/static/png/inline/21c07bce9fd2.png',
						url: '/subPages/questionBank/written',
						cardClass: 'is-written',
						iconClass: 'icon-written'
					},
					{
						key: 'interview',
						shortLabel: '面试题',
						shortIcon: '面',
						title: '面试真题',
						desc: '高频岗位问法拆解，边练边复盘表达逻辑',
						meta: '28 组题单 · 含技术与综合面',
						svgIcon: '/static/png/inline/6c9775204656.png',
						icon: '面',
						url: '/subPages/questionBank/interview',
						cardClass: 'is-interview',
						iconClass: 'icon-interview'
					}
				]
			}
		},
		methods: {
			applyPracticeScoresFromHistory() {
				const history = getQuestionHistory()
				this.writtenAccuracy = accuracyPercentForKind(history, 'written')
				this.interviewAccuracy = accuracyPercentForKind(history, 'interview')
			},
			async refreshPracticeScores() {
				this.applyPracticeScoresFromHistory()

				let studentId = resolveStoredStudentId()
				let userId = resolveStoredUserId(getUser())
				if (!studentId && !userId) {
					await syncUserProfileFromServer({ timeout: 8000 })
					studentId = resolveStoredStudentId()
					userId = resolveStoredUserId(getUser())
				}

				if (studentId || userId) {
					try {
						await syncQuestionHistoryFromServer()
					} catch (e) {
						console.warn('[QuestionBankModules] syncQuestionHistoryFromServer 失败', e)
					}
				}

				this.applyPracticeScoresFromHistory()
				this.$nextTick(() => this.syncGaugeDisplays())
			},
			syncGaugeDisplays() {
				this.modules.forEach((item) => {
					const ref = this.$refs[`gauge-${item.key}`]
					const gauge = Array.isArray(ref) ? ref[0] : ref
					if (gauge && typeof gauge.syncDisplayFromProps === 'function') {
						gauge.syncDisplayFromProps()
					}
				})
			},
			goModule(item) {
				// 按配置跳转到对应题库子页面。
				uni.navigateTo({
					url: item.url
				})
			}
		}
	}
</script>

<style lang="scss">
	.question-bank {
		margin-bottom: 24rpx;
		padding: 26rpx;
		border-radius: 36rpx;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, #ffffff 100%);
		box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.12);
	}

	.section-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 18rpx;
	}

	.section-title,
	.section-subtitle {
		display: block;
	}

	.section-title {
		font-size: 34rpx;
		font-weight: 800;
		color: #15305e;
	}

	.section-subtitle {
		margin-top: 10rpx;
		font-size: 22rpx;
		line-height: 1.6;
		color: #7b88a3;
	}

	.type-tile-row {
		display: flex;
		flex-direction: row;
		gap: 16rpx;
		margin-top: 22rpx;
	}

	.type-tile-wrap {
		flex: 1;
		min-width: 0;
		transition: opacity 0.15s ease;
	}

	.type-tile-wrap:active {
		opacity: 0.93;
	}

	.module-list {
		margin-top: 18rpx;
		display: flex;
		flex-direction: column;
		gap: 18rpx;
	}

	.module-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx;
		border-radius: 30rpx;
		border: 2rpx solid rgba(49, 101, 215, 0.08);
		box-shadow:
			0 10rpx 28rpx rgba(15, 23, 42, 0.1),
			0 4rpx 14rpx rgba(15, 23, 42, 0.06),
			0 2rpx 8rpx rgba(49, 101, 215, 0.08);
	}

	.module-card.is-written {
		background: linear-gradient(135deg, rgba(34, 153, 232, 0.14) 0%, rgba(255, 255, 255, 0.96) 70%);
	}

	.module-card.is-interview {
		background: linear-gradient(135deg, rgba(100, 232, 208, 0.18) 0%, rgba(255, 255, 255, 0.96) 70%);
	}

	.module-copy {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.module-icon {
			width: 58rpx;
			height: 58rpx;
			border-radius: 18rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			font-weight: 700;
		}

		.module-svg-icon {
			width: 44rpx;
			height: 44rpx;
		}

		.module-svg-icon-interview {
			filter: hue-rotate(128deg) saturate(1.15) brightness(0.88);
		}

	.icon-written {
		background: rgba(34, 153, 232, 0.14);
		color: #1d83d2;
	}

	.icon-interview {
		background: rgba(100, 232, 208, 0.18);
		color: rgba(95, 220, 197, 1.0);
	}

	.module-title,
	.module-desc {
		display: block;
	}

	.module-title {
		margin-top: 16rpx;
		font-size: 30rpx;
		font-weight: 800;
		color: #15305e;
	}

	.module-desc {
		margin-top: 8rpx;
		font-size: 23rpx;
		line-height: 1.6;
		color: #66758f;
	}

	/* 底部统计文案：半透明底透出卡片渐变；灰色描边 + 中性阴影只做凸起感 */
	.module-meta-chip {
		margin-top: 14rpx;
		align-self: flex-start;
		padding: 10rpx 22rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.38);
		border: 2rpx solid rgba(138, 146, 162, 0.42);
		box-shadow:
			inset 0 2rpx 3rpx rgba(255, 255, 255, 0.75),
			inset 0 -2rpx 4rpx rgba(72, 78, 90, 0.07),
			0 3rpx 6rpx rgba(72, 78, 90, 0.06),
			0 8rpx 18rpx rgba(72, 78, 90, 0.1);
	}

	.module-meta {
		display: block;
		font-size: 21rpx;
		font-weight: 700;
		color: #5d76bd;
		line-height: 1.35;
	}

	.question-bank.theme-dark {
		background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
		box-shadow: 0 18rpx 42rpx rgba(0, 0, 0, 0.22);
	}

	.question-bank.theme-dark .section-title,
	.question-bank.theme-dark .module-title {
		color: #f4f7fb;
	}

	.question-bank.theme-dark .section-subtitle,
	.question-bank.theme-dark .module-desc {
		color: rgba(255, 255, 255, 0.58);
	}

	.question-bank.theme-dark .module-meta-chip {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(168, 174, 188, 0.38);
		box-shadow:
			inset 0 1rpx 2rpx rgba(255, 255, 255, 0.14),
			inset 0 -2rpx 6rpx rgba(0, 0, 0, 0.28),
			0 4rpx 12rpx rgba(0, 0, 0, 0.3);
	}

	.question-bank.theme-dark .module-meta {
		color: rgba(190, 210, 255, 0.88);
	}

	.question-bank.theme-dark .module-card {
		border-color: rgba(255, 255, 255, 0.06);
		box-shadow:
			0 12rpx 32rpx rgba(0, 0, 0, 0.45),
			0 5rpx 16rpx rgba(0, 0, 0, 0.3);
	}

	.question-bank.theme-dark .module-card.is-written,
	.question-bank.theme-dark .module-card.is-interview {
		background: linear-gradient(135deg, rgba(74, 103, 247, 0.2) 0%, rgba(38, 40, 46, 0.96) 70%);
	}
</style>
