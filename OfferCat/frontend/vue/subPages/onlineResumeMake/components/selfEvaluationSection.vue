<template>
	<view class="section-wrapper">
		<view class="section-block">
			<!-- 自我评价模块标题，右侧带编辑按钮 -->
			<view class="section-header">
				<text class="section-title">自我评价</text>
				<view class="action-btn" @click="goToEdit">
					<text class="btn-text">编辑</text>
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
					background: #f0f2f9;
					display: flex;
					align-items: center;
					justify-content: center;

					.btn-text {
						font-size: 13px;
						color: #5d76bd;
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
				line-height: 1.6;
				color: #333333;
				font-size: 15px;
			}
		}
	}
</style>
