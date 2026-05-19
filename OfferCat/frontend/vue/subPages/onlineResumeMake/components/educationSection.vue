<template>
	<view class="section-wrapper">
		<view class="section-block">
			<view class="section-header">
				<text class="section-title">教育背景</text>
				<view class="action-btn" @click="goToEdit">
					<text class="btn-text">添加</text>
					<text class="chevron" aria-hidden="true">›</text>
				</view>
			</view>
			<view class="divider"></view>
		</view>

		<!-- 只有有大字段时才在组件下方单独显示预览区块 -->
		<view class="section-preview" v-if="entries && entries.length">
			<view class="preview-item" v-for="item in entries" :key="item.id" @click="goToEditEntry(item)">
				<view class="rich-text-wrap" v-html="item.html"></view>
			</view>
		</view>
		<view class="section-preview" v-else-if="htmlContent" @click="goToEdit">
			<view class="rich-text-wrap" v-html="htmlContent"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'educationSection',
		props: {
			htmlContent: {
				type: String,
				default: ''
			},
			entries: {
				type: Array,
				default: () => ([])
			}
		},
		methods: {
			goToEdit() {
				uni.navigateTo({
					url: '/subPages/resumeEdit/editContainer?type=education'
				})
			},
			goToEditEntry(entry) {
				const initial = encodeURIComponent(JSON.stringify((entry && entry.rawData) ? entry.rawData : {}))
				uni.navigateTo({
					url: `/subPages/resumeEdit/editContainer?type=education&entry_id=${encodeURIComponent(String(entry && entry.id ? entry.id : ''))}&initial=${initial}`
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
			
			.preview-item {
				padding: 10px 0;

				&:first-child {
					padding-top: 4px;
				}
			}
			
			.rich-text-wrap {
				width: 100%;
				line-height: 1.65;
				letter-spacing: 0.01em;
			}
		}
	}
</style>
