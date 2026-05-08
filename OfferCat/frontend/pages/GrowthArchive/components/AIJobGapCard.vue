<template>
	<view class="section-card" :class="themeClass" v-if="roleProfile && roleProfile.name">
		<view class="gap-head">
			<view>
				<!-- 标题区说明当前模块用于分析目标岗位竞争力。 -->
				<text class="gap-title">AI 岗位竞争力分析</text>
				<text class="gap-subtitle">基于你的档案和技能，分析与目标岗位的差距</text>
			</view>
		</view>

		<view class="role-row">
			<!-- 当前岗位标签展示本次分析的目标对象。 -->
			<text class="role-label">目标岗位</text>
			<text class="role-value">当前选择：{{ roleProfile.name }}</text>
		</view>

		<view class="chart-card radar-box">
			<!-- 雷达图聚焦当前最有代表性的能力维度。 -->
			<qiun-data-charts
				v-if="isRadarVisible"
				type="radar"
				:opts="resolvedChartOpts"
				:chartData="currentChartData"
				:inScrollView="true"
			/>
		</view>

		<view class="dimension-card">
			<!-- 维度列表补充每个能力项的原始分值和取值区间。 -->
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
			<!-- 差距点由 AI 接口返回，未完成时显示骨架屏。 -->
			<text class="panel-title">差距点 <text v-if="isAnalyzing" class="analyzing-text">(AI分析中...)</text></text>
			<view v-if="!isAnalyzing" v-for="item in roleProfile.gaps" :key="item" class="panel-item">
				<text class="panel-dot"></text>
				<text class="panel-text">{{ item }}</text>
			</view>
			<view v-if="isAnalyzing" class="skeleton-loading"></view>
		</view>

		<view class="info-panel suggestion-panel">
			<!-- 提升建议与差距点对应，帮助用户明确后续改进方向。 -->
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
						// 外部测评结果一旦变化，立即重新构建岗位画像与分析内容。
						this.updateRoleProfile(newVal);
					},
					immediate: true,
					deep: true
				}
			},
			data() {
			return {
				// 雷达图滚入视口后再挂载，降低首屏渲染压力。
				isRadarVisible: false,
				// AI 差距分析中的加载态，用于控制骨架屏与提示文案。
				isAnalyzing: false,
				// 统一承载岗位名称、维度、差距点和建议结果。
				roleProfile: {
					name: '',
					dimensions: [],
					gaps: [],
					suggestions: []
				},
				// 雷达图配置由主题色和公共坐标样式组成。
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
				// 雷达图进入视口后再渲染，减少首屏 canvas 开销。
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
			// 兼容 Vue2 生命周期，销毁可视区域监听器。
			if (this.observer) {
				this.observer.disconnect()
			}
		},
		beforeUnmount() {
			// 兼容 Vue3 生命周期，销毁可视区域监听器。
			if (this.observer) {
				this.observer.disconnect()
			}
		},
		methods: {
			updateRoleProfile(data) {
				// 至少命中一个非零维度时，才认为问卷结果有效。
      const hasValidData = data && (
        data.professionalAbility || data.projectExperience || data.competitionResults ||
        data.academicBackground || data.softSkills || data.industryCognition || data.stressExecution
      );

				if (!hasValidData) {
					// 没有评估结果时保留默认引导文案，避免反复覆盖已有分析。
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
      
				// 仅保留最有代表性的五个维度用于展示与 AI 分析。
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
				// 后端分析使用当前用户与维度得分生成差距点和改进建议。
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
				// 根据主题切换整张 AI 分析卡片的视觉风格。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			resolvedChartOpts() {
				// 在公共雷达图配置基础上按主题覆写颜色相关参数。
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
				// 将不同维度区间统一映射到 0~100，便于雷达图共用一套坐标轴。
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
				// 图表数据由当前维度列表与归一化得分共同拼装。
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
