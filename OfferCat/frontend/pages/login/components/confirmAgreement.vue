<template>
	<view class="agreement-area">
		<view class="radio-label">
			<view class="radio-wrapper" @click.stop="toggleAgree">
				<view class="radio-icon" :class="{'is-checked': agreed}">
					<view class="radio-inner" v-if="agreed"></view>
				</view>
			</view>
			<text class="agreement-text">
				我已阅读并同意
				<text class="link" @click.stop="goToAgreement">《用户服务协议》</text>
				和
				<text class="link" @click.stop="goToPrivacy">《隐私政策》</text>
			</text>
		</view>

		<!-- 自定义协议弹窗 -->
		<view class="custom-modal" v-if="showAgreementModal">
			<view class="modal-mask" @click="showAgreementModal = false"></view>
			<view class="modal-content">
				<view class="modal-title">服务协议与隐私政策</view>
				<view class="modal-text">
					为了保障您的合法权益，请您在登录前仔细阅读并同意<text class="link" @click.stop="goToAgreement">《用户服务协议》</text>和<text class="link" @click.stop="goToPrivacy">《隐私政策》</text>。
				</view>
				<view class="modal-btns">
					<view class="btn-box cancel-box" @click="handleDisagree">不同意</view>
					<view class="btn-box confirm-box" @click="handleAgree">同意</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			agreed: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				showAgreementModal: false
			};
		},
		methods: {
			toggleAgree() {
				this.$emit('change', !this.agreed);
			},
			showModal() {
				this.showAgreementModal = true;
			},
			handleAgree() {
				this.showAgreementModal = false;
				this.$emit('change', true);
				this.$emit('agreed-login'); // 通知父组件继续执行登录
			},
			handleDisagree() {
				this.showAgreementModal = false;
			},
			goToAgreement() {
				uni.navigateTo({
					url: '/subPages/settings/agreement'
				});
			},
			goToPrivacy() {
				uni.navigateTo({
					url: '/subPages/settings/privacy'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.agreement-area {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 40px;

		.radio-label {
			display: flex;
			align-items: flex-start; /* 保持顶部对齐以应对多行文本 */

			.radio-wrapper {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 5px 0 0; /* 调整内边距 */
				height: 18px; /* 给一个固定高度以便与文字第一行对齐 */
				transform: translateY(1px); /* 微调单选框向下，以使其在视觉上更完美对齐文字中心 */
				position: relative; /* 相对定位供 mask 使用 */

				.radio-icon {
					width: 14px;
					height: 14px;
					border: 1px solid #ccc;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: all 0.2s;
					box-sizing: border-box;

					&.is-checked {
						border-color: #5d76bd;
						background-color: #5d76bd;
					}

					.radio-inner {
						width: 6px;
						height: 6px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}

			.agreement-text {
				font-size: 12px;
				color: #999;
				line-height: 18px; /* 设置行高与复选框高度一致 */
				display: inline; /* 恢复为inline，以便正常换行 */

				.link {
					color: #5d76bd;
				}
			}
		}
	}

	/* 自定义协议弹窗样式 */
	.custom-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;

		.modal-mask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			animation: fadeIn 0.2s ease;
		}

		.modal-content {
			position: relative;
			width: 75%;
			background-color: #fff;
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: hidden;
			animation: scaleIn 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

			.modal-title {
				font-size: 18px;
				font-weight: bold;
				color: #333;
				margin-top: 25px;
				margin-bottom: 15px;
			}

			.modal-text {
				width: 100%;
				box-sizing: border-box;
				padding: 0 20px;
				font-size: 14px;
				color: #666;
				line-height: 1.6;
				text-align: center;
				margin-bottom: 25px;

				.link {
					color: #5d76bd;
				}
			}

			.modal-btns {
				width: 100%;
				display: flex;
				height: 45px;

				.btn-box {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 15px;
					transition: all 0.2s ease;

					&:active {
						opacity: 0.8;
					}
				}

				.cancel-box {
					background-color: #f5f5f5;
					color: #666;
				}

				.confirm-box {
					background-color: #5d76bd;
					color: #fff;
				}
			}
		}
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes scaleIn {
		from { transform: scale(0.9); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}
</style>
