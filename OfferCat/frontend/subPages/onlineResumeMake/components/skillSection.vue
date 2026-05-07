<template>
	<view class="section-wrapper">
		<view class="section-block">
			<view class="section-header">
				<text class="section-title">技能熟练度</text>
				<view class="action-btn" @click="goToEdit">
					<text class="btn-text">编辑</text>
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
			padding: 20px 20px 0;

			.section-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 15px;

				.section-title {
					font-size: 20px;
					font-weight: bold;
					color: #111827;
				}

				.action-btn {
					padding: 4px 12px;
					border-radius: 14px;
					background: #ebfef6;
					display: flex;
					align-items: center;
					justify-content: center;

					.btn-text {
						font-size: 13px;
						color: #10b981;
						font-weight: 500;
					}
				}
			}

			.divider {
				height: 1px;
				background-color: #f3f4f6;
			}
		}

		.section-preview {
			padding: 15px 20px 0;
			
			.rich-text-wrap {
				width: 100%;
			}
		}
	}
</style>
