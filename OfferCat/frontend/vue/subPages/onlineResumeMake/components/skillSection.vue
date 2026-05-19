<template>
	<view class="section-wrapper">
		<view class="section-block">
			<view class="section-header">
				<text class="section-title">技能熟练度</text>
				<view class="action-btn" @click="goToEdit">
					<text class="btn-text">编辑</text>
					<text class="chevron" aria-hidden="true">›</text>
				</view>
			</view>
			<view class="divider"></view>
		</view>

		<!-- 只有有大字段时才在组件下方单独显示预览区块 -->
		<view class="section-preview" v-if="htmlContent" @click="goToEdit">
			<view class="rich-text-wrap" v-html="htmlContent"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'skillSection',
		props: {
			htmlContent: {
				type: String,
				default: ''
			},
			skillItems: {
				type: Array,
				default: () => ([])
			}
		},
		methods: {
			goToEdit() {
				const initial = encodeURIComponent(JSON.stringify({
					skills: Array.isArray(this.skillItems) ? this.skillItems : []
				}))
				uni.navigateTo({
					url: `/subPages/resumeEdit/editContainer?type=skill&initial=${initial}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.section-wrapper {
		.section-block {
			padding: 22px 20px 0;

			.section-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 12px;
				margin-bottom: 14px;

				.section-title {
					font-size: 18px;
					font-weight: 600;
					color: #111827;
					letter-spacing: -0.01em;
					line-height: 1.3;
					flex: 1;
					min-width: 0;
				}

				.action-btn {
					padding: 6px 4px 6px 10px;
					border-radius: 8px;
					background: transparent;
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-shrink: 0;

					&:active {
						opacity: 0.72;
					}

					.btn-text {
						font-size: 14px;
						color: #5d76bd;
						font-weight: 600;
						letter-spacing: 0.02em;
					}

					.chevron {
						margin-left: 1px;
						font-size: 18px;
						line-height: 1;
						color: #5d76bd;
						font-weight: 400;
						opacity: 0.88;
					}
				}
			}

			.divider {
				height: 1px;
				background-color: #f3f4f6;
			}
		}

		.section-preview {
			padding: 12px 20px 8px;
			
			.rich-text-wrap {
				width: 100%;
				line-height: 1.65;
				letter-spacing: 0.01em;
			}
		}
	}
</style>
