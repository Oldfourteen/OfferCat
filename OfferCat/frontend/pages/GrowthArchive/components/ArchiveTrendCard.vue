<template>
	<view class="section-card" :class="themeClass">
		<view class="section-head">
			<!-- 标题区配合时间范围切换，控制趋势图展示粒度。 -->
			<text class="section-title">能力成长轨迹</text>
			<view class="range-tabs">
				<text
					v-for="item in ranges"
					:key="item.value"
					class="range-tab"
					:class="{ active: activeRange === item.value }"
					@click="handleRangeChange(item.value)"
				>{{ item.label }}</text>
			</view>
		</view>

		<qiun-data-charts
			v-if="showChart"
			<!-- 折线图统一读取当前选中区间的数据源。 -->
			type="line"
			:opts="chartOpts"
			:chartData="currentChartData"
			canvas2d
			:canvasId="'growthTrend_' + canvasKey"
		/>
	</view>
</template>

<script>
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
				handler(newVal) {
					// 只在总分存在时刷新趋势图，避免空数据触发无意义重绘。
					if (newVal && newVal.totalScore !== undefined && newVal.totalScore !== null) {
						this.updateChartData(newVal.totalScore);
					}
				},
				immediate: true,
				deep: true
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
			updateChartData(score) {
				// 生成模拟趋势数据，最新值为当前得分，前面的逐渐降低
				const genTrend = (len, currentScore) => {
					let arr = [];
					// 基础分不再强制最低50，如果当前分很低，前面也应该低
					let base = Math.max(0, currentScore - 15);
					for (let i = 0; i < len - 1; i++) {
						arr.push(base + Math.random() * 10);
					}
					arr.push(currentScore);
					return arr.map(v => Number(v.toFixed(1)));
				};

				this.dynamicChartDataMap.week.series[0].data = genTrend(7, score);
				this.dynamicChartDataMap.month.series[0].data = genTrend(4, score);
				this.dynamicChartDataMap.quarter.series[0].data = genTrend(3, score);

				// 动态计算 Y 轴 min，防止最后数值太低导致折线掉出图表
				const allData = [
					...this.dynamicChartDataMap.week.series[0].data,
					...this.dynamicChartDataMap.month.series[0].data,
					...this.dynamicChartDataMap.quarter.series[0].data
				];
				let minVal = Math.min(...allData);
				// 如果最小数值低于50，就将Y轴min设为更低（以10为跨度向下取整，最小为0）
				let newMin = Math.max(0, Math.floor(minVal / 10) * 10);
				// 如果最小数值大于等于50，默认还是50起步，比较好看
				this.chartOpts.yAxis.data[0].min = newMin < 50 ? newMin : 50;

				// 触发图表重新渲染
				this.showChart = false;
				this.$nextTick(() => {
					this.showChart = true;
				});
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
					padding: 8rpx 18rpx;
					border-radius: 999rpx;
					background: #f2f4f7;
					font-size: 22rpx;
					color: #667085;

					&.active {
						background: rgba(74, 103, 247, 0.12);
						color: #3165D7;
						font-weight: 700;
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

	.section-card.theme-dark .range-tab {
		background: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.58);
	}
</style>
