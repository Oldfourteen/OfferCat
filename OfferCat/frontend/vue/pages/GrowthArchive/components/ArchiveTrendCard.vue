<template>
	<view class="section-card" :class="themeClass">
		<view class="section-head">
			<!-- 标题区配合时间范围切换，控制趋势图展示粒度。 -->
			<text class="section-title">能力成长轨迹</text>
			<view class="range-tabs">
				<view
					v-for="item in ranges"
					:key="item.value"
					class="range-tab"
					:class="{ active: activeRange === item.value }"
					@click="handleRangeChange(item.value)"
				>{{ item.label }}</view>
			</view>
		</view>

		<!-- 折线图统一读取当前选中区间的数据源。 -->
		<qiun-data-charts
			v-if="showChart"
			type="line"
			:opts="chartOpts"
			:chartData="currentChartData"
			canvas2d
			:canvasId="'growthTrend_' + canvasKey"
		/>

		<view class="trend-intro" :class="{ 'trend-intro--no-chart': !showChart }">
			<text class="trend-intro-title">数据说明</text>
			<text class="trend-intro-line">综合能力（50～100）由两项各半加权：档案侧能力分与题库练习表现。</text>
			<text class="trend-intro-line">档案侧：测评七个维度中取分数最高的五个维度，计算平均分。</text>
			<text class="trend-intro-line">题库侧：根据本机保存的练习记录，按答题数量加权汇总正确率，映射到 50～100；若某一时间段尚未做题，该项取中性值 50。</text>
			<text class="trend-intro-line">周视图按周一至周日统计，仅绘制到今天为止；未到日期暂无数据故不连线。月、季视图同理按分段累积统计。</text>
			<text class="trend-intro-line muted">重新测评或提交新的题单练习后，曲线会随之更新。</text>
		</view>
	</view>
</template>

<script>
	import { getQuestionHistory, QUESTION_HISTORY_UPDATED_EVENT } from '@/utils/questionHistory.js'
	import {
		buildWeekTrend,
		buildMonthTrend,
		buildQuarterTrend,
		collectNumericPoints
	} from '@/utils/growthTrendScore.js'

	export default {
		name: 'ArchiveTrendCard',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			radarData: {
				type: Object,
				default: null
			}
		},
		watch: {
			radarData: {
				handler() {
					this.refreshTrendChart()
				},
				immediate: true,
				deep: true
			}
		},
		created() {
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(QUESTION_HISTORY_UPDATED_EVENT, this.refreshTrendChart)
			}
		},
		beforeDestroy() {
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.refreshTrendChart)
			}
		},
		beforeUnmount() {
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.refreshTrendChart)
			}
		},
		data() {
			return {
				// 通过显隐控制图表重建，避免 canvas 在切换时出现残影或串台。
				showChart: true,
				activeRange: 'week',
				canvasKey: 1,
				ranges: [
					{ label: '周', value: 'week' },
					{ label: '月', value: 'month' },
					{ label: '季', value: 'quarter' }
				],
				dynamicChartDataMap: {
					week: {
						categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
						series: [
							{ name: '综合能力', data: [], color: '#4A67F7' }
						]
					},
					month: {
						categories: ['第1周', '第2周', '第3周', '第4周'],
						series: [
							{ name: '综合能力', data: [], color: '#4A67F7' }
						]
					},
					quarter: {
						categories: ['1月', '2月', '3月'],
						series: [
							{ name: '综合能力', data: [], color: '#4A67F7' }
						]
					}
				},
				// 图表基础配置在不同时间粒度下复用。
				chartOpts: {
					color: ['#3165D7', '#68C7FF'],
					padding: [12, 12, 10, 34],
					enableScroll: false,
					legend: {
						show: true,
						position: 'top',
						float: 'center',
						fontSize: 11,
						fontColor: '#667085',
						lineHeight: 20
					},
					xAxis: {
						disableGrid: true,
						fontSize: 11,
						fontColor: '#98A2B3',
						marginTop: 10,
						boundaryGap: 'center'
					},
					yAxis: {
						disabled: false,
						disableGrid: false,
						splitNumber: 5,
						gridType: 'dash',
						dashLength: 4,
						gridColor: '#EAEFF7',
						padding: 8,
						showTitle: false,
						data: [
							{
								position: 'left',
								min: 50,
								max: 100,
								fontSize: 10,
								fontColor: '#98A2B3',
								axisLineColor: '#EAEFF7',
								textAlign: 'right'
							}
						]
					},
					toolTip: {
						show: true,
						bgColor: '#ffffff',
						bgOpacity: 1,
						fontColor: '#344054'
					},
					extra: {
						line: {
							type: 'curve',
							width: 2,
							activeType: 'hollow',
							linearType: 'custom',
							onShadow: false,
							addLine: true,
							animation: 'horizontal',
							pointShape: 'circle'
						}
					}
				}
			}
		},
		computed: {
			themeClass() {
				// 趋势卡片按主题切换根节点类名。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			currentChartData() {
				// 返回当前时间范围的独立副本，避免图表组件内部修改源数据。
				return JSON.parse(JSON.stringify(this.dynamicChartDataMap[this.activeRange]))
			}
		},
		methods: {
			refreshTrendChart() {
				const radar = this.radarData
				const history = getQuestionHistory()
				const now = new Date()
				const weekPayload = buildWeekTrend(radar, history, now)
				const monthPayload = buildMonthTrend(radar, history, now)
				const quarterPayload = buildQuarterTrend(radar, history, now)

				this.dynamicChartDataMap.week = weekPayload
				this.dynamicChartDataMap.month = monthPayload
				this.dynamicChartDataMap.quarter = quarterPayload

				const numericPoints = collectNumericPoints([weekPayload, monthPayload, quarterPayload])
				if (!numericPoints.length) {
					this.chartOpts.yAxis.data[0].min = 50
					this.chartOpts.yAxis.data[0].max = 100
				} else {
					let minVal = Math.min(...numericPoints)
					let maxVal = Math.max(...numericPoints)
					let newMin = Math.max(0, Math.floor(minVal / 10) * 10)
					let newMax = Math.min(100, Math.ceil(maxVal / 10) * 10)
					if (newMax <= newMin) newMax = Math.min(100, newMin + 10)
					this.chartOpts.yAxis.data[0].min = newMin < 50 ? newMin : 50
					this.chartOpts.yAxis.data[0].max = newMax >= 100 ? 100 : newMax
				}

				this.showChart = false
				this.$nextTick(() => {
					this.showChart = true
				})
			},
			handleRangeChange(range) {
				if (this.activeRange === range) return
				
				// 先隐藏图表，避免直接修改数据时产生默认的位移抽搐动画
				this.showChart = false
				
				// 切换数据并生成新的 canvasId
				this.activeRange = range
				this.canvasKey++
				
				// 使用 setTimeout 确保上一个 canvas 实例在微信底层被完全销毁
				// 从而避免和其他组件（如雷达图）发生 canvas context 串台污染
				setTimeout(() => {
					this.showChart = true
				}, 100) // 适当延长延迟时间确保安全回收
			}
		}
	}
</script>

<style lang="scss">
	.section-card {
		padding: 28rpx;
		border-radius: 30rpx;
		background: #ffffff;
		box-shadow: 0 12rpx 34rpx rgba(67, 76, 210, 0.06);

		.section-head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 14rpx;

			.section-title {
				font-size: 40rpx;
				font-weight: 800;
				color: #1f2937;
			}

			.range-tabs {
				display: flex;
				gap: 12rpx;

				.range-tab {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					min-width: 72rpx;
					height: 52rpx;
					padding: 0 22rpx;
					border-radius: 999rpx;
					border: 1rpx solid transparent;
					background: #f2f4f7;
					font-size: 22rpx;
					color: #667085;
					line-height: 1;

					&.active {
						background: rgba(74, 103, 247, 0.12);
						border-color: rgba(74, 103, 247, 0.35);
						color: #3165D7;
						font-weight: 700;
						box-shadow: 0 4rpx 10rpx rgba(74, 103, 247, 0.1);
					}
				}
			}
		}
	}

	.section-card.theme-dark {
		background: #1d1f24;
		box-shadow: 0 12rpx 34rpx rgba(0, 0, 0, 0.2);
	}

	.section-card.theme-dark .section-title {
		color: #f4f7fb;
	}

	.trend-intro--no-chart {
		margin-top: 8rpx;
		padding-top: 0;
		border-top: none;
	}

	.section-card.theme-dark .trend-intro--no-chart {
		border-top: none;
	}

	.section-card.theme-dark .range-tab {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.7);
		font-weight: 600;
	}

	.section-card.theme-dark .range-tab.active {
		background: rgba(74, 103, 247, 0.22);
		border-color: rgba(119, 146, 255, 0.55);
		color: #afc3ff;
		box-shadow: 0 4rpx 12rpx rgba(74, 103, 247, 0.22);
	}

	.trend-intro {
		margin-top: 18rpx;
		padding-top: 18rpx;
		border-top: 1rpx solid rgba(148, 163, 184, 0.25);
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.trend-intro-title {
		font-size: 24rpx;
		font-weight: 700;
		color: #475467;
		margin-bottom: 4rpx;
	}

	.trend-intro-line {
		font-size: 22rpx;
		line-height: 1.55;
		color: #667085;
		display: block;
	}

	.trend-intro-line.muted {
		color: #98a2b3;
		font-size: 21rpx;
		margin-top: 4rpx;
	}

	.section-card.theme-dark .trend-intro {
		border-top-color: rgba(255, 255, 255, 0.08);
	}

	.section-card.theme-dark .trend-intro-title {
		color: rgba(244, 247, 251, 0.85);
	}

	.section-card.theme-dark .trend-intro-line {
		color: rgba(255, 255, 255, 0.58);
	}

	.section-card.theme-dark .trend-intro-line.muted {
		color: rgba(255, 255, 255, 0.42);
	}
</style>
