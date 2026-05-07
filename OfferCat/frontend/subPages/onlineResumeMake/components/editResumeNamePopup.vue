<template>
	<view class="popup-mask" v-if="visible" @click="handleCancel">
		<view class="popup-content" @click.stop>
			<view class="popup-title">修改简历名称</view>
			<input class="popup-input" type="text" v-model="localName" placeholder="请输入简历名称" maxlength="100" />
			<view class="popup-actions">
				<view class="btn cancel-btn" @click="handleCancel">取消</view>
				<view class="btn confirm-btn" @click="handleConfirm">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'editResumeNamePopup',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			initialName: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				localName: ''
			}
		},
		watch: {
			visible(newVal) {
				if (newVal) {
					this.localName = this.initialName
				}
			}
		},
		methods: {
			handleCancel() {
				this.$emit('cancel')
			},
			handleConfirm() {
				if (!this.localName.trim()) {
					uni.showToast({
						title: '名称不能为空',
						icon: 'none'
					})
					return
				}
				this.$emit('confirm', this.localName.trim())
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;

		.popup-content {
			width: 300px;
			background: #fff;
			border-radius: 12px;
			padding: 24px;
			box-sizing: border-box;

			.popup-title {
				font-size: 18px;
				font-weight: bold;
				color: #111827;
				text-align: center;
				margin-bottom: 20px;
			}

			.popup-input {
				width: 100%;
				height: 40px;
				background: #f3f4f6;
				border-radius: 8px;
				padding: 0 12px;
				font-size: 16px;
				color: #111827;
				box-sizing: border-box;
				margin-bottom: 24px;
			}

			.popup-actions {
				display: flex;
				justify-content: space-between;
				gap: 16px;

				.btn {
					flex: 1;
					height: 40px;
					border-radius: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 16px;
					font-weight: bold;
				}

				.cancel-btn {
					background: #f3f4f6;
					color: #4b5563;
				}

				.confirm-btn {
					background: #1677ff;
					color: #fff;
				}
			}
		}
	}
</style>
