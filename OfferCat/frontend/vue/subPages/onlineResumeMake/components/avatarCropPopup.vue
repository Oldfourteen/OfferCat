<template>
	<view v-if="visible" class="crop-popup" :class="themeClass">
		<view class="crop-popup__mask" @click="handleCancel"></view>
		<view class="crop-popup__panel">
			<view class="crop-popup__header">
				<text class="crop-popup__title">裁剪简历头像</text>
				<text class="crop-popup__subtitle">拖动并缩放，生成适合简历版式的头像</text>
			</view>

			<view class="crop-popup__body">
				<view class="crop-stage">
					<view
						class="crop-box"
						:style="cropBoxStyle"
						@touchstart="handleTouchStart"
						@touchmove.stop.prevent="handleTouchMove"
						@touchend="handleTouchEnd"
					>
						<image
							v-if="imageReady"
							class="crop-image"
							:src="imageSrc"
							mode="scaleToFill"
							:style="imageStyle"
							draggable="false"
						></image>
						<view v-else class="crop-stage__placeholder">正在加载图片...</view>
						<view class="crop-box__frame"></view>
					</view>
					<text class="crop-stage__hint">双指缩放暂未接入，先支持拖动和滑杆缩放</text>
				</view>

				<view class="zoom-card">
					<view class="zoom-card__head">
						<text class="zoom-card__label">缩放</text>
						<text class="zoom-card__value">{{ zoomPercent }}%</text>
					</view>
					<slider
						class="zoom-card__slider"
						:min="100"
						:max="300"
						:step="1"
						:value="zoomPercent"
						activeColor="#5d76bd"
						backgroundColor="rgba(148, 163, 184, 0.24)"
						block-color="#5d76bd"
						:block-size="18"
						@changing="handleZoomChange"
						@change="handleZoomChange"
					/>
				</view>
			</view>

			<view class="crop-popup__actions">
				<view class="crop-popup__btn crop-popup__btn--ghost" @click="handleCancel">取消</view>
				<view
					class="crop-popup__btn crop-popup__btn--primary"
					:class="{ 'is-disabled': !imageReady || isSubmitting }"
					@click="handleConfirm"
				>
					{{ isSubmitting ? '生成中...' : '确认裁剪' }}
				</view>
			</view>

			<canvas
				canvas-id="resume-avatar-crop-canvas"
				class="crop-canvas"
				:style="{ width: `${outputWidth}px`, height: `${outputHeight}px` }"
			></canvas>
		</view>
	</view>
</template>

<script>
	const CROP_RATIO = 72 / 92

	export default {
		name: 'AvatarCropPopup',
		props: {
			visible: {
				type: Boolean,
				default: false,
			},
			imageSrc: {
				type: String,
				default: '',
			},
			theme: {
				type: String,
				default: 'light',
			},
		},
		data() {
			return {
				cropWidth: 216,
				cropHeight: 276,
				imageWidth: 0,
				imageHeight: 0,
				baseWidth: 0,
				baseHeight: 0,
				zoomFactor: 1,
				offsetX: 0,
				offsetY: 0,
				startPoint: null,
				startOffsetX: 0,
				startOffsetY: 0,
				imageReady: false,
				isSubmitting: false,
				outputWidth: 720,
				outputHeight: 920,
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			zoomPercent() {
				return Math.round(this.zoomFactor * 100)
			},
			displayWidth() {
				return this.baseWidth * this.zoomFactor
			},
			displayHeight() {
				return this.baseHeight * this.zoomFactor
			},
			cropBoxStyle() {
				return {
					width: `${this.cropWidth}px`,
					height: `${this.cropHeight}px`,
				}
			},
			imageStyle() {
				const width = this.displayWidth
				const height = this.displayHeight
				const left = (this.cropWidth - width) / 2 + this.offsetX
				const top = (this.cropHeight - height) / 2 + this.offsetY
				return {
					width: `${width}px`,
					height: `${height}px`,
					left: `${left}px`,
					top: `${top}px`,
				}
			},
		},
		watch: {
			visible: {
				immediate: true,
				handler(next) {
					if (next && this.imageSrc) {
						this.prepareCropper()
					}
					if (!next) {
						this.resetCropper()
					}
				},
			},
			imageSrc(next) {
				if (this.visible && next) {
					this.prepareCropper()
				}
			},
		},
		methods: {
			resetCropper() {
				this.imageReady = false
				this.isSubmitting = false
				this.zoomFactor = 1
				this.offsetX = 0
				this.offsetY = 0
				this.startPoint = null
			},
			async prepareCropper() {
				if (!this.imageSrc) return
				this.resetCropper()
				this.computeCropBox()
				try {
					const info = await this.getImageInfo(this.imageSrc)
					this.imageWidth = Number(info.width || 0)
					this.imageHeight = Number(info.height || 0)
					if (!this.imageWidth || !this.imageHeight) {
						throw new Error('图片尺寸无效')
					}
					const imageRatio = this.imageWidth / this.imageHeight
					if (imageRatio > CROP_RATIO) {
						this.baseHeight = this.cropHeight
						this.baseWidth = this.baseHeight * imageRatio
					} else {
						this.baseWidth = this.cropWidth
						this.baseHeight = this.baseWidth / imageRatio
					}
					this.imageReady = true
					this.clampOffsets()
				} catch (e) {
					this.imageReady = false
					uni.showToast({ title: '图片加载失败', icon: 'none' })
				}
			},
			computeCropBox() {
				const systemInfo = uni.getSystemInfoSync()
				const maxWidth = Math.max(220, Math.min(systemInfo.windowWidth - 64, 280))
				this.cropWidth = Math.round(maxWidth)
				this.cropHeight = Math.round(this.cropWidth / CROP_RATIO)
			},
			getImageInfo(src) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src,
						success: resolve,
						fail: reject,
					})
				})
			},
			getMaxOffsetX() {
				return Math.max(0, (this.displayWidth - this.cropWidth) / 2)
			},
			getMaxOffsetY() {
				return Math.max(0, (this.displayHeight - this.cropHeight) / 2)
			},
			clampOffsets() {
				const maxX = this.getMaxOffsetX()
				const maxY = this.getMaxOffsetY()
				this.offsetX = Math.min(maxX, Math.max(-maxX, this.offsetX))
				this.offsetY = Math.min(maxY, Math.max(-maxY, this.offsetY))
			},
			handleTouchStart(e) {
				if (!this.imageReady) return
				const touch = e && e.touches && e.touches[0]
				if (!touch) return
				this.startPoint = {
					x: touch.clientX,
					y: touch.clientY,
				}
				this.startOffsetX = this.offsetX
				this.startOffsetY = this.offsetY
			},
			handleTouchMove(e) {
				if (!this.imageReady || !this.startPoint) return
				const touch = e && e.touches && e.touches[0]
				if (!touch) return
				this.offsetX = this.startOffsetX + (touch.clientX - this.startPoint.x)
				this.offsetY = this.startOffsetY + (touch.clientY - this.startPoint.y)
				this.clampOffsets()
			},
			handleTouchEnd() {
				this.startPoint = null
			},
			handleZoomChange(e) {
				const next = Number((e && e.detail && e.detail.value) || 100) / 100
				this.zoomFactor = Math.min(3, Math.max(1, next))
				this.clampOffsets()
			},
			handleCancel() {
				if (this.isSubmitting) return
				this.$emit('cancel')
			},
			handleConfirm() {
				if (!this.imageReady || this.isSubmitting) return
				this.isSubmitting = true
				const ctx = uni.createCanvasContext('resume-avatar-crop-canvas', this)
				const srcX =
					((this.displayWidth - this.cropWidth) / 2 - this.offsetX) *
					(this.imageWidth / this.displayWidth)
				const srcY =
					((this.displayHeight - this.cropHeight) / 2 - this.offsetY) *
					(this.imageHeight / this.displayHeight)
				const srcW = this.cropWidth * (this.imageWidth / this.displayWidth)
				const srcH = this.cropHeight * (this.imageHeight / this.displayHeight)

				ctx.clearRect(0, 0, this.outputWidth, this.outputHeight)
				ctx.drawImage(
					this.imageSrc,
					srcX,
					srcY,
					srcW,
					srcH,
					0,
					0,
					this.outputWidth,
					this.outputHeight
				)
				ctx.draw(false, () => {
					uni.canvasToTempFilePath(
						{
							canvasId: 'resume-avatar-crop-canvas',
							width: this.outputWidth,
							height: this.outputHeight,
							destWidth: this.outputWidth,
							destHeight: this.outputHeight,
							fileType: 'jpg',
							quality: 0.92,
							success: (res) => {
								this.isSubmitting = false
								this.$emit('confirm', res.tempFilePath)
							},
							fail: () => {
								this.isSubmitting = false
								uni.showToast({ title: '裁剪失败', icon: 'none' })
							},
						},
						this
					)
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.crop-popup {
		position: fixed;
		inset: 0;
		z-index: 1200;
	}

	.crop-popup__mask {
		position: absolute;
		inset: 0;
		background: rgba(15, 23, 42, 0.56);
	}

	.crop-popup__panel {
		position: absolute;
		left: 24rpx;
		right: 24rpx;
		top: 50%;
		transform: translateY(-50%);
		border-radius: 32rpx;
		background: #ffffff;
		padding: 32rpx 28rpx 28rpx;
		box-shadow: 0 24rpx 60rpx rgba(15, 23, 42, 0.18);
	}

	.crop-popup__header {
		text-align: center;
	}

	.crop-popup__title {
		display: block;
		font-size: 34rpx;
		font-weight: 700;
		color: #1f2a44;
	}

	.crop-popup__subtitle {
		display: block;
		margin-top: 10rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #73809b;
	}

	.crop-popup__body {
		margin-top: 28rpx;
	}

	.crop-stage {
		border-radius: 28rpx;
		background: linear-gradient(180deg, #f6f8fc 0%, #eef2f9 100%);
		padding: 28rpx 20rpx 22rpx;
	}

	.crop-box {
		position: relative;
		margin: 0 auto;
		overflow: hidden;
		border-radius: 24rpx;
		background: #dbe3f0;
		box-shadow: inset 0 0 0 2rpx rgba(255, 255, 255, 0.56);
	}

	.crop-image {
		position: absolute;
		display: block;
	}

	.crop-box__frame {
		position: absolute;
		inset: 0;
		border: 2rpx solid rgba(255, 255, 255, 0.86);
		border-radius: 24rpx;
		box-shadow: inset 0 0 0 9999rpx rgba(15, 23, 42, 0.08);
		pointer-events: none;
	}

	.crop-stage__placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #64748b;
	}

	.crop-stage__hint {
		display: block;
		margin-top: 18rpx;
		text-align: center;
		font-size: 22rpx;
		color: #7c8aa5;
	}

	.zoom-card {
		margin-top: 24rpx;
		padding: 24rpx;
		border-radius: 24rpx;
		background: #f7f9fc;
	}

	.zoom-card__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.zoom-card__label,
	.zoom-card__value {
		font-size: 26rpx;
		font-weight: 600;
		color: #334155;
	}

	.zoom-card__slider {
		margin-top: 10rpx;
	}

	.crop-popup__actions {
		display: flex;
		gap: 18rpx;
		margin-top: 28rpx;
	}

	.crop-popup__btn {
		flex: 1;
		height: 88rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 700;
	}

	.crop-popup__btn--ghost {
		background: #f1f5f9;
		color: #475569;
	}

	.crop-popup__btn--primary {
		background: linear-gradient(135deg, #5d76bd 0%, #6f87d4 100%);
		color: #ffffff;
		box-shadow: 0 12rpx 30rpx rgba(93, 118, 189, 0.24);
	}

	.crop-popup__btn.is-disabled {
		opacity: 0.6;
	}

	.crop-canvas {
		position: fixed;
		left: -9999px;
		top: -9999px;
		opacity: 0;
		pointer-events: none;
	}

	.theme-dark {
		.crop-popup__panel {
			background: #1b1d23;
			box-shadow: 0 24rpx 60rpx rgba(0, 0, 0, 0.34);
		}

		.crop-popup__title {
			color: #f4f7fb;
		}

		.crop-popup__subtitle,
		.crop-stage__hint {
			color: #96a3bd;
		}

		.crop-stage {
			background: linear-gradient(180deg, #232733 0%, #1d212b 100%);
		}

		.crop-box {
			background: #2a3040;
			box-shadow: inset 0 0 0 2rpx rgba(255, 255, 255, 0.08);
		}

		.zoom-card {
			background: #23252b;
		}

		.zoom-card__label,
		.zoom-card__value,
		.crop-stage__placeholder {
			color: #d3dbeb;
		}

		.crop-popup__btn--ghost {
			background: rgba(255, 255, 255, 0.08);
			color: #d7deeb;
		}
	}
</style>
