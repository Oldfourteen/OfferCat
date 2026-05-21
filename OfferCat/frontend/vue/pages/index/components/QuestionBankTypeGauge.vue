<template>
	<view class="qbg-card" :class="[toneClazz, themeClazz]" @tap.stop>
		<view class="qbg-inner">
			<view class="qbg-chart">
				<canvas
					:canvas-id="canvasId"
					:id="canvasId"
					class="qbg-canvas"
					:style="{ width: canvasPx + 'px', height: canvasPx + 'px' }"
				/>
				<view class="qbg-center" :class="{ 'has-hint': !hasValue }">
					<view class="qbg-metric-row" :class="{ 'is-untracked': !hasValue }">
						<text class="qbg-num">{{ displayPercentText }}</text>
						<text class="qbg-pct-suffix">%</text>
					</view>
					<text v-if="!hasValue" class="qbg-metric-hint">暂未统计</text>
				</view>
				<text class="qbg-foot">{{ categoryLabel }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const CANVAS_UPX = 208
	const ARC_START = 0.75 * Math.PI
	const ARC_SPAN = 1.5 * Math.PI

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
		data() {
			return {
				canvasId: `qbg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
				canvasPx: 104,
				animatedProgress: 0,
				animatedNum: 0,
				animationTriggered: false,
				drawPending: false
			}
		},
		computed: {
			themeClazz() {
				return this.theme === 'dark' ? 'is-theme-dark' : 'is-theme-light'
			},
			toneClazz() {
				return this.tone === 'interview' ? 'is-tone-interview' : 'is-tone-written'
			},
			trackColor() {
				return this.tone === 'interview'
					? 'rgba(255, 255, 255, 0.34)'
					: 'rgba(255, 255, 255, 0.36)'
			},
			progColor() {
				return '#d6deeb'
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
			targetProgress() {
				if (!this.hasValue) return 0
				return Math.max(0, Math.min(1, this.numericPct / 100))
			},
			progress01() {
				if (!this.hasValue) return 0
				if (this.animationTriggered) return this.animatedProgress
				return this.targetProgress
			},
			displayPercentText() {
				if (!this.hasValue) return '0'
				const n = this.animationTriggered ? this.animatedNum : this.numericPct
				return Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10)
			}
		},
		watch: {
			accuracyPercent: {
				handler() {
					this.applyStaticMetrics()
					this.scheduleDraw()
				},
				immediate: true
			},
			progress01() {
				this.scheduleDraw()
			},
			tone() {
				this.scheduleDraw()
			}
		},
		mounted() {
			this.canvasPx = typeof uni !== 'undefined' && uni.upx2px
				? uni.upx2px(CANVAS_UPX)
				: CANVAS_UPX / 2
			this.$nextTick(() => {
				this.applyStaticMetrics()
				this.scheduleDraw(true)
				// App 端 canvas 首帧偶发空白，延迟重绘确保圆环可见
				setTimeout(() => this.scheduleDraw(true), 80)
				setTimeout(() => this.scheduleDraw(true), 320)
				if (this.hasValue) {
					this.triggerAnimation()
				}
			})
		},
		methods: {
			syncDisplayFromProps() {
				this.applyStaticMetrics()
				this.scheduleDraw(true)
			},
			applyStaticMetrics() {
				if (!this.hasValue) {
					this.animatedNum = 0
					this.animatedProgress = 0
					return
				}
				this.animatedNum = this.numericPct
				this.animatedProgress = this.targetProgress
			},
			scheduleDraw(immediate = false) {
				if (this.drawPending && !immediate) return
				this.drawPending = true
				const run = () => {
					this.drawPending = false
					this.paintRing()
				}
				if (immediate) {
					this.$nextTick(run)
				} else {
					this.$nextTick(run)
				}
			},
			paintRing() {
				if (typeof uni === 'undefined' || typeof uni.createCanvasContext !== 'function') {
					return
				}
				const size = this.canvasPx
				const cx = size / 2
				const cy = size / 2
				const r = size * 0.384
				const lineWidth = size * 0.096
				const trackEnd = ARC_START + ARC_SPAN
				const progEnd = ARC_START + ARC_SPAN * this.progress01

				const ctx = uni.createCanvasContext(this.canvasId, this)
				ctx.clearRect(0, 0, size, size)
				ctx.setLineWidth(lineWidth)
				ctx.setLineCap('round')

				ctx.setStrokeStyle(this.trackColor)
				ctx.beginPath()
				ctx.arc(cx, cy, r, ARC_START, trackEnd, false)
				ctx.stroke()

				if (this.progress01 > 0.004) {
					ctx.setStrokeStyle(this.progColor)
					ctx.beginPath()
					ctx.arc(cx, cy, r, ARC_START, progEnd, false)
					ctx.stroke()
				}

				ctx.draw(false, () => {})
			},
			triggerAnimation() {
				if (this.animationTriggered) return
				this.animationTriggered = true
				if (!this.hasValue) {
					this.scheduleDraw(true)
					return
				}
				const duration = 500
				const startTime = Date.now()
				const startValue = 0
				const endValue = this.numericPct
				const startProgress = 0
				const targetProg = this.targetProgress
				const step = () => {
					const elapsed = Date.now() - startTime
					const t = Math.min(elapsed / duration, 1)
					const eased = 1 - Math.pow(1 - t, 3)
					this.animatedNum = startValue + (endValue - startValue) * eased
					this.animatedProgress = startProgress + (targetProg - startProgress) * eased
					this.scheduleDraw(true)
					if (t < 1) {
						if (typeof requestAnimationFrame === 'function') {
							requestAnimationFrame(step)
						} else {
							setTimeout(step, 16)
						}
					}
				}
				if (typeof requestAnimationFrame === 'function') {
					requestAnimationFrame(step)
				} else {
					step()
				}
			},
			resetAnimation() {
				this.animationTriggered = false
				this.applyStaticMetrics()
				this.scheduleDraw(true)
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
			0 4rpx 10rpx rgba(15, 23, 42, 0.08),
			0 8rpx 18rpx rgba(45, 110, 200, 0.2),
			0 2rpx 6rpx rgba(25, 80, 170, 0.1);
	}

	.qbg-card.is-tone-interview {
		background-color: #4cc79a;
		box-shadow:
			inset 0 1rpx 0 rgba(255, 255, 255, 0.35),
			0 4rpx 10rpx rgba(15, 23, 42, 0.07),
			0 8rpx 18rpx rgba(25, 120, 82, 0.18),
			0 2rpx 6rpx rgba(12, 90, 60, 0.09);
	}

	.qbg-card.is-theme-dark.is-tone-written {
		background-color: #4d7fba;
		box-shadow:
			inset 0 1rpx 0 rgba(255, 255, 255, 0.2),
			0 6rpx 14rpx rgba(0, 0, 0, 0.28),
			0 10rpx 22rpx rgba(20, 50, 100, 0.2);
	}

	.qbg-card.is-theme-dark.is-tone-interview {
		background-color: #429e7e;
		box-shadow:
			inset 0 1rpx 0 rgba(255, 255, 255, 0.16),
			0 6rpx 14rpx rgba(0, 0, 0, 0.26),
			0 10rpx 22rpx rgba(10, 60, 45, 0.18);
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

	.qbg-canvas {
		position: absolute;
		left: 0;
		top: 0;
		width: 208rpx;
		height: 208rpx;
		z-index: 0;
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
		z-index: 2;
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
</style>
