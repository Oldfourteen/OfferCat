<template>
	<view class="section-wrapper">
		<view class="section-block">
			<!-- 自我评价模块标题，右侧带编辑按钮 -->
			<view class="section-header">
				<text class="section-title">自我评价</text>
				<view class="action-btn" @click="goToEdit">
					<text class="btn-text">编辑</text>
					<text class="chevron" aria-hidden="true">›</text>
				</view>
			</view>
			<view class="divider"></view>
		</view>

		<!-- 如果有自我评价内容，则在下方展示富文本内容 -->
		<view class="section-preview" v-if="htmlContent" @click="goToEdit">
			<view class="rich-text-wrap" v-html="htmlContent"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'selfEvaluationSection',
		props: {
			htmlContent: {
				type: String,
				default: ''
			}
		},
		methods: {
			toPlainText(html = '') {
				if (!html) return ''
				return String(html)
					.replace(/<br\s*\/?>/gi, '\n')
					.replace(/<\/p>/gi, '\n')
					.replace(/<[^>]+>/g, '')
					.replace(/&nbsp;/g, ' ')
					.trim()
			},
			goToEdit() {
				// 跳转到通用的富文本编辑容器，类型传入 selfEvaluation
				const initial = encodeURIComponent(JSON.stringify({
					text: this.toPlainText(this.htmlContent)
				}))
				uni.navigateTo({
					url: `/subPages/resumeEdit/editContainer?type=selfEvaluation&initial=${initial}`
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
				color: #333333;
				font-size: 15px;
				letter-spacing: 0.01em;
			}
		}
	}
</style>
