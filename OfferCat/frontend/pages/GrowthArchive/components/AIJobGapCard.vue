<template>
	<view class="section-card" :class="themeClass" v-if="roleProfile && roleProfile.name">
		<view class="gap-head">
			<view>
				<text class="gap-title">AI 岗位竞争力分析</text>
				<text class="gap-subtitle">基于你的档案和技能，分析与目标岗位的差距</text>
			</view>
		</view>

		<view class="role-row">
			<text class="role-label">目标岗位</text>
			<text class="role-value">当前选择：{{ roleProfile.name }}</text>
		</view>

		<view class="chart-card radar-box">
			<qiun-data-charts
				v-if="isRadarVisible"
				type="radar"
				:opts="resolvedChartOpts"
				:chartData="currentChartData"
				:inScrollView="true"
			/>
		</view>

		<view class="dimension-card">
			<text class="panel-title">维度区间说明</text>
			<view class="dimension-list">
				<view v-for="item in roleProfile.dimensions" :key="item.key" class="dimension-item">
					<view class="dimension-copy">
						<text class="dimension-name">{{ item.label }}</text>
						<text class="dimension-range">范围 {{ item.min }} ~ {{ item.max }}</text>
					</view>
					<text class="dimension-value">{{ item.value }}</text>
				</view>
			</view>
		</view>

		<view class="info-panel">
			<text class="panel-title">差距点 <text v-if="isAnalyzing" class="analyzing-text">(AI分析中...)</text></text>
			<view v-if="!isAnalyzing" v-for="item in roleProfile.gaps" :key="item" class="panel-item">
				<text class="panel-dot"></text>
				<text class="panel-text">{{ item }}</text>
			</view>
			<view v-if="isAnalyzing" class="skeleton-loading"></view>
		</view>

		<view class="info-panel suggestion-panel">
			<text class="panel-title">提升建议 <text v-if="isAnalyzing" class="analyzing-text">(AI分析中...)</text></text>
			<view v-if="!isAnalyzing" v-for="item in roleProfile.suggestions" :key="item" class="panel-item">
				<text class="panel-dot"></text>
				<text class="panel-text">{{ item }}</text>
			</view>
			<view v-if="isAnalyzing" class="skeleton-loading"></view>
		</view>
	</view>
</template>

<script>
	import { request } from '@/api/request.js'

	export default {
		name: 'AIJobGapCard',
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
						this.updateRoleProfile(newVal);
					},
					immediate: true,
					deep: true
				}
			},
			data() {
			return {
				isRadarVisible: false,
				isAnalyzing: false,
				roleProfile: {
					name: '',
					dimensions: [],
					gaps: [],
					suggestions: []
				},
				chartOpts: {
					animation: true,
					color: ['#3165D7'],
					fill: false,
					padding: [10, 12, 0, 12],
					legend: {
						show: false
					},
					extra: {
						radar: {
							gridColor: '#e5ecf8',
							gridType: 'line',
							gridCount: 5,
							opacity: 0,
							border: true,
							borderColor: '#c8d7f5',
							borderOpacity: 1,
							borderWidth: 2,
							labelShow: true,
							labelColor: '#667085',
							labelPointShow: false,
							max: 100,
						}
					}
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.observer = uni.createIntersectionObserver(this)
				this.observer.relativeToViewport().observe('.radar-box', (res) => {
					if (res.intersectionRatio > 0) {
						if (!this.isRadarVisible) {
							this.isRadarVisible = true
						}
					} else {
						if (this.isRadarVisible) {
							this.isRadarVisible = false
						}
					}
				})
			})
		},
		beforeDestroy() {
			if (this.observer) {
				this.observer.disconnect()
			}
		},
		beforeUnmount() {
			if (this.observer) {
				this.observer.disconnect()
			}
		},
		methods: {
			updateRoleProfile(data) {
      // 检查数据是否有效（至少有一个维度分数不为0）
      const hasValidData = data && (
        data.professionalAbility || data.projectExperience || data.competitionResults ||
        data.academicBackground || data.softSkills || data.industryCognition || data.stressExecution
      );

      if (!hasValidData) {
        // 只有在当前没有显示数据时才显示默认提示
        if (this.roleProfile.dimensions.length === 0) {
          this.roleProfile = {
            name: '综合能力评估',
            dimensions: [],
            gaps: ['完成问卷后，AI 将为您生成岗位差距分析。'],
            suggestions: ['请先完成调查问卷以获取专属提升建议。']
          };
        }
        return;
      }

      let allDimensions = [
        { key: 'D1', label: '专业能力', min: 0, max: 100, value: data.professionalAbility !== undefined && data.professionalAbility !== null ? data.professionalAbility : 0 },
        { key: 'D2', label: '项目经验', min: 0, max: 100, value: data.projectExperience !== undefined && data.projectExperience !== null ? data.projectExperience : 0 },
        { key: 'D3', label: '竞赛成果', min: 0, max: 100, value: data.competitionResults !== undefined && data.competitionResults !== null ? data.competitionResults : 0 },
        { key: 'D4', label: '学历背景', min: 0, max: 100, value: data.academicBackground !== undefined && data.academicBackground !== null ? data.academicBackground : 0 },
        { key: 'D5', label: '软技能', min: 0, max: 100, value: data.softSkills !== undefined && data.softSkills !== null ? data.softSkills : 0 },
        { key: 'D6', label: '行业认知', min: 0, max: 100, value: data.industryCognition !== undefined && data.industryCognition !== null ? data.industryCognition : 0 },
        { key: 'D7', label: '抗压执行', min: 0, max: 100, value: data.stressExecution !== undefined && data.stressExecution !== null ? data.stressExecution : 0 }
      ];
      
      // 降序排序并截取前五个
      allDimensions.sort((a, b) => b.value - a.value);
      let top5Dimensions = allDimensions.slice(0, 5);

      this.roleProfile = {
        name: '综合能力评估',
        dimensions: top5Dimensions,
        gaps: [],
        suggestions: []
      }
      
      this.fetchAiAnalysis(top5Dimensions);
			},
			async fetchAiAnalysis(dimensions) {
				const user = uni.getStorageSync('user_v2') || {}
				const userId = user.userId || user.id
				if (!userId) {
					console.log('[AIJobGapCard] 用户未登录，跳过AI分析');
					this.roleProfile.gaps = ['请先登录以获取AI差距分析'];
					this.roleProfile.suggestions = ['登录后可获取个性化的提升建议'];
					return
				}

				this.isAnalyzing = true
				try {
					const reqData = {
						studentId: userId,
						majorCode: user.majorCode || '',
						targetRole: '综合能力评估',
						dimensions: dimensions.map(d => ({
							name: d.label,
							score: d.value,
							min: d.min,
							max: d.max
						}))
					}

					console.log('[AIJobGapCard] 请求AI分析:', reqData);

					const res = await request({
						url: '/api/radar/gap-agent/generate',
						method: 'POST',
						data: reqData
					})
					
					const realData = res.data || res
					console.log('[AIJobGapCard] AI分析响应:', realData);

					if (realData) {
						this.roleProfile.gaps = realData.gapPoints || ['当前能力模型良好，请继续保持']
						this.roleProfile.suggestions = realData.improvementSuggestions || ['积极参与实战项目', '持续学习前沿技术']
					}
				} catch (e) {
					console.error('[AIJobGapCard] 获取AI差距分析失败:', e)
					this.roleProfile.gaps = ['AI分析服务暂时不可用', '建议稍后重试或检查网络连接']
					this.roleProfile.suggestions = ['确保网络连接正常', '如问题持续，请联系开发者']
				} finally {
					this.isAnalyzing = false
				}
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			resolvedChartOpts() {
				const isDark = this.theme === 'dark'
				return {
					...this.chartOpts,
					color: [isDark ? '#8AB7FF' : '#3165D7'],
					extra: {
						...this.chartOpts.extra,
						radar: {
							...this.chartOpts.extra.radar,
							gridColor: isDark ? 'rgba(255,255,255,0.08)' : '#e5ecf8',
							borderColor: isDark ? 'rgba(120,142,255,0.28)' : '#c8d7f5',
							labelColor: isDark ? 'rgba(255,255,255,0.62)' : '#667085',
							backgroundColor: isDark ? ['rgba(138,183,255,0.08)'] : ['rgba(49,101,215,0.08)'],
							borderLineColor: isDark ? '#8AB7FF' : '#3165D7'
						}
					}
				}
			},
			normalizedRadarData() {
				return this.roleProfile.dimensions.map(item => {
					const min = Number(item.min)
					const max = Number(item.max)
					const value = Number(item.value)

					if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) {
						return 0
					}

					const ratio = ((value - min) / (max - min)) * 100
					return Math.max(0, Math.min(100, Number(ratio.toFixed(2))))
				})
			},
			currentChartData() {
				return {
					categories: this.roleProfile.dimensions.map(item => item.label),
					series: [
						{
							name: '岗位匹配度',
							data: this.normalizedRadarData,
							color: this.theme === 'dark' ? '#8AB7FF' : '#3165D7',
							pointShape: 'circle',
							legendShape: 'circle',
						}
					]
				}
			}
		}
	}
</script>

<style lang="scss">
	.section-card {
		padding: 30rpx 28rpx;
		border-radius: 30rpx;
		background: #ffffff;
		box-shadow: 0 12rpx 34rpx rgba(67, 76, 210, 0.06);
	}

	.gap-title,
	.gap-subtitle,
	.role-label,
	.role-value,
	.panel-title,
	.panel-text {
		display: block;
	}

	.gap-title {
		font-size: 40rpx;
		font-weight: 800;
	}

	.gap-subtitle {
		margin-top: 10rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #98a2b3;
	}

	.role-row,
	.chart-card,
	.info-panel {
		margin-top: 24rpx;
	}

	.role-row {
		padding: 22rpx 24rpx;
		border-radius: 24rpx;
		background: linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%);
		border: 2rpx solid rgba(49, 101, 215, 0.06);
	}

	.role-label {
		font-size: 22rpx;
		color: #98a2b3;
	}

	.role-value {
		margin-top: 10rpx;
		font-size: 30rpx;
		font-weight: 800;
		color: #24345b;
	}

	.chart-card,
	.info-panel {
		padding: 24rpx;
		border-radius: 24rpx;
		background: linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%);
		border: 2rpx solid rgba(49, 101, 215, 0.06);
	}

	.section-card.theme-dark {
		background: #1d1f24;
		box-shadow: 0 12rpx 34rpx rgba(0, 0, 0, 0.2);
	}

	.section-card.theme-dark .gap-title,
	.section-card.theme-dark .role-value,
	.section-card.theme-dark .panel-title,
	.section-card.theme-dark .panel-text {
		color: #f4f7fb;
	}

	.section-card.theme-dark .gap-subtitle,
	.section-card.theme-dark .role-label {
		color: rgba(255, 255, 255, 0.5);
	}

	.section-card.theme-dark .role-row,
	.section-card.theme-dark .chart-card,
	.section-card.theme-dark .info-panel {
		background: #23252b;
		border-color: rgba(255, 255, 255, 0.06);
	}

	.section-card.theme-dark .dimension-card {
		background: #23252b;
		border-color: rgba(255, 255, 255, 0.06);
	}

	.chart-card {
		height: 360rpx;
		width: 100%;
		padding: 8rpx;
		box-sizing: border-box;
		background: linear-gradient(180deg, #fdfefe 0%, #f6f9ff 100%);
	}

	.dimension-card {
		margin-top: 24rpx;
		padding: 24rpx;
		border-radius: 24rpx;
		background: linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%);
		border: 2rpx solid rgba(49, 101, 215, 0.06);
	}

	.dimension-list {
		margin-top: 8rpx;
	}

	.dimension-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20rpx;
		padding: 18rpx 0;
		border-bottom: 2rpx solid rgba(49, 101, 215, 0.06);
	}

	.dimension-item:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.dimension-copy,
	.dimension-name,
	.dimension-range,
	.dimension-value {
		display: block;
	}

	.dimension-copy {
		flex: 1;
	}

	.dimension-name {
		font-size: 24rpx;
		font-weight: 700;
		color: #24345b;
	}

	.dimension-range {
		margin-top: 8rpx;
		font-size: 22rpx;
		color: #8a96af;
	}

	.dimension-value {
		font-size: 28rpx;
		font-weight: 800;
		color: #3165d7;
	}

	.section-card.theme-dark .chart-card {
		background: linear-gradient(180deg, #262931 0%, #202228 100%);
	}

	.section-card.theme-dark .dimension-name,
	.section-card.theme-dark .dimension-value {
		color: #f4f7fb;
	}

	.section-card.theme-dark .dimension-range {
		color: rgba(255, 255, 255, 0.52);
	}

	.section-card.theme-dark .dimension-item {
		border-bottom-color: rgba(255, 255, 255, 0.06);
	}

	.panel-title {
		font-size: 28rpx;
		font-weight: 800;
		color: #1f2937;
	}

	.panel-item {
		margin-top: 18rpx;
		display: flex;
		align-items: flex-start;
		gap: 14rpx;
	}

	.panel-dot {
		width: 12rpx;
		height: 12rpx;
		margin-top: 12rpx;
		border-radius: 50%;
		background: #3165d7;
		flex-shrink: 0;
	}

	.panel-text {
		flex: 1;
		font-size: 24rpx;
		line-height: 1.7;
		color: #667085;
	}

	.analyzing-text {
		font-size: 20rpx;
		color: #3165d7;
		margin-left: 12rpx;
		font-weight: normal;
		animation: blink 1.4s infinite both;
	}

	.skeleton-loading {
		margin-top: 18rpx;
		height: 32rpx;
		width: 80%;
		border-radius: 8rpx;
		background: linear-gradient(90deg, #f0f2f5 25%, #e6e8eb 37%, #f0f2f5 63%);
		background-size: 400% 100%;
		animation: skeleton-loading 1.4s ease infinite;
	}

	.section-card.theme-dark .skeleton-loading {
		background: linear-gradient(90deg, #2a2f3d 25%, #353b4d 37%, #2a2f3d 63%);
		background-size: 400% 100%;
	}

	@keyframes skeleton-loading {
		0% { background-position: 100% 50%; }
		100% { background-position: 0 50%; }
	}

	@keyframes blink {
		0% { opacity: 0.4; }
		50% { opacity: 1; }
		100% { opacity: 0.4; }
	}

	.suggestion-panel {
		margin-top: 20rpx;
	}
</style>
