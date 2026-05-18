<template>
	<view class="bottom-actions-wrap">
		<view class="bottom-actions">
			<view class="action-btn" @click="handlePreview">预览简历</view>
			<view class="action-btn export-btn" @click="handleExportPdf">简历导出</view>
		</view>
		<!-- safe area spacing -->
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script>
	export default {
		name: 'BottomActions',
		methods: {
			handlePreview() {
				this.$emit('preview')
			},
			handleExportPdf() {
				this.$emit('exportPdf')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-actions-wrap {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		z-index: 100;

		.bottom-actions {
			display: flex;
			justify-content: space-between;
			padding: 12px 20px 10px;
			gap: 14px;

			.action-btn {
				flex: 1;
				height: 48px;
				border-radius: 24px;
				background-color: #f3f4f6;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 15px;
				color: #374151;
				font-weight: 600;
				letter-spacing: 0.02em;
				transition: all 0.2s;

				&:active {
					transform: scale(0.98);
				}
			}

			.export-btn {
				background-color: #5d76bd;
				color: #fff;
			}
		}

		.safe-area-inset-bottom {
			height: env(safe-area-inset-bottom);
		}
	}
</style>
