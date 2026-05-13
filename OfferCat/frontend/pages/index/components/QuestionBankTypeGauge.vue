<template>
	<!-- 纯色底 + 单色进度弧 + 外发光 -->
	<view class="qbg-card" :class="[toneClazz, themeClazz]" @tap.stop>
		<view class="qbg-inner">
			<view class="qbg-chart">
				<svg class="qbg-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(50 50) rotate(135)">
						<circle
							cx="0"
							cy="0"
							:r="radius"
							fill="none"
							:stroke="trackColor"
							:stroke-width="strokeW"
							stroke-linecap="round"
							:stroke-dasharray="trackDash"
						/>
						<circle
							class="qbg-prog"
							cx="0"
							cy="0"
							:r="radius"
							fill="none"
							:stroke="progColor"
							:stroke-width="strokeW"
							:stroke-linecap="progressLinecap"
							:stroke-dasharray="progDash"
						/>
					</g>
				</svg>
				<view class="qbg-center" :class="{ 'has-hint': !hasValue }">
					<view class="qbg-metric-row" :class="{ 'is-untracked': !hasValue }">
						<text class="qbg-num">{{ mainNumber }}</text>
						<text class="qbg-pct-suffix">%</text>
					</view>
					<text v-if="!hasValue" class="qbg-metric-hint">暂未统计</text>
				</view>
				<!-- 弧底留空处放类目名，不占卡片下方额外高度 -->
				<text class="qbg-foot">{{ categoryLabel }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'QuestionBankTypeGauge',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			tone: {
				type: String,
				default: 'written'
			},
			accuracyPercent: {
				type: [Number, String],
				default: null
			},
			categoryLabel: {
				type: String,
				default: ''
			}
		},
		computed: {
			themeClazz() {
				return this.theme === 'dark' ? 'is-theme-dark' : 'is-theme-light'
			},
			toneClazz() {
				return this.tone === 'interview' ? 'is-tone-interview' : 'is-tone-written'
			},
			radius() {
				return 40
			},
			strokeW() {
				return 10
			},
			C() {
				return 2 * Math.PI * this.radius
			},
			arcLen() {
				return this.C * 0.75
			},
			trackDash() {
				return `${this.arcLen} ${this.C}`
			},
			trackColor() {
				return this.tone === 'interview'
					? 'rgba(255, 255, 255, 0.34)'
					: 'rgba(255, 255, 255, 0.36)'
			},
			progColor() {
				return this.tone === 'interview' ? '#34d399' : '#38bdf8'
			},
			numericPct() {
				const v = this.accuracyPercent
				if (v === null || v === undefined || v === '') return null
				const n = Number(v)
				return Number.isFinite(n) ? n : null
			},
			hasValue() {
				return this.numericPct !== null
			},
			progress01() {
				if (!this.hasValue) return 0
				return Math.max(0, Math.min(1, this.numericPct / 100))
			},
			progressLinecap() {
				return this.progress01 > 0.004 ? 'round' : 'butt'
			},
			progDash() {
				return `${this.arcLen * this.progress01} ${this.C}`
			},
			mainNumber() {
				if (!this.hasValue) return '0'
				const n = this.numericPct
				return Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qbg-card {
		position: relative;
		width: 100%;
		border-radius: 22rpx;
		overflow: hidden;
		box-sizing: border-box;
		border: 1rpx solid rgba(255, 255, 255, 0.35);
	}

	.qbg-card.is-tone-written {
		background-color: #5793e8;
		box-shadow:
			inset 0 1rpx 0 rgba(255, 255, 255, 0.38),
			0 14rpx 28rpx rgba(45, 110, 200, 0.22),
			0 4rpx 10rpx rgba(25, 80, 170, 0.12);
	}

	.qbg-card.is-tone-interview {
		background-color: #4cc79a;
		box-shadow:
			inset 0 1rpx 0 rgba(255, 255, 255, 0.35),
			0 14rpx 28rpx rgba(25, 120, 82, 0.2),
			0 4rpx 10rpx rgba(12, 90, 60, 0.12);
	}

	.qbg-card.is-theme-dark.is-tone-written {
		background-color: #4d7fba;
		box-shadow:
			inset 0 1rpx 0 rgba(255, 255, 255, 0.2),
			0 12rpx 26rpx rgba(0, 0, 0, 0.22);
	}

	.qbg-card.is-theme-dark.is-tone-interview {
		background-color: #429e7e;
		box-shadow:
			inset 0 1rpx 0 rgba(255, 255, 255, 0.16),
			0 12rpx 26rpx rgba(0, 0, 0, 0.2);
	}

	.qbg-inner {
		position: relative;
		z-index: 1;
		padding: 12rpx 10rpx 14rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.qbg-chart {
		position: relative;
		width: 208rpx;
		height: 208rpx;
	}

	.qbg-svg {
		width: 208rpx;
		height: 208rpx;
		display: block;
		overflow: visible;
	}

	.qbg-center {
		position: absolute;
		left: 0;
		right: 0;
		top: 41%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		pointer-events: none;
		z-index: 1;
	}

	.qbg-center.has-hint {
		top: 39%;
	}

	.qbg-metric-row {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: baseline;
		justify-content: center;
	}

	.qbg-num {
		font-size: 34rpx;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: rgba(255, 255, 255, 0.95);
		line-height: 1.1;
		letter-spacing: -0.02em;
		text-shadow:
			0 1rpx 2rpx rgba(30, 60, 100, 0.12),
			0 0 16rpx rgba(255, 255, 255, 0.12);
	}

	.qbg-pct-suffix {
		margin-left: 2rpx;
		font-size: 20rpx;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.55);
		line-height: 1;
		transform: translateY(-3rpx);
	}

	.qbg-metric-row.is-untracked .qbg-num {
		font-weight: 600;
		color: rgba(255, 255, 255, 0.72);
	}

	.qbg-metric-row.is-untracked .qbg-pct-suffix {
		color: rgba(255, 255, 255, 0.42);
	}

	.qbg-metric-hint {
		margin-top: 6rpx;
		font-size: 18rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.42);
		line-height: 1.2;
		letter-spacing: 0.06em;
	}

	.qbg-foot {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 10rpx;
		z-index: 2;
		margin-top: 0;
		text-align: center;
		font-size: 26rpx;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.98);
		letter-spacing: 0.08em;
		line-height: 1.2;
		text-shadow:
			0 1rpx 3rpx rgba(0, 40, 70, 0.25),
			0 2rpx 8rpx rgba(0, 30, 55, 0.12);
		pointer-events: none;
	}

	.qbg-card.is-tone-written :deep(.qbg-prog) {
		filter:
			drop-shadow(0 0 14rpx rgba(56, 189, 248, 0.55))
			drop-shadow(0 0 6rpx rgba(255, 255, 255, 0.45));
	}

	.qbg-card.is-tone-interview :deep(.qbg-prog) {
		filter:
			drop-shadow(0 0 14rpx rgba(52, 211, 153, 0.5))
			drop-shadow(0 0 6rpx rgba(240, 253, 244, 0.4));
	}
</style>
