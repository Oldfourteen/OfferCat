<template>
	<view class="section-wrapper">
		<view class="section-block">
			<view class="section-header">
				<text class="section-title">工作经历</text>
				<view class="action-btn" @click="goToEdit">
					<text class="btn-text">添加</text>
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
		name: 'workExperienceSection',
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
					url: '/subPages/resumeEdit/editContainer?type=workExperience'
				})
			},
			goToEditEntry(entry) {
				const initial = encodeURIComponent(JSON.stringify((entry && entry.rawData) ? entry.rawData : {}))
				uni.navigateTo({
					url: `/subPages/resumeEdit/editContainer?type=workExperience&entry_id=${encodeURIComponent(String(entry && entry.id ? entry.id : ''))}&initial=${initial}`
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
			
			.preview-item {
				padding: 8px 0;
			}
			
			.rich-text-wrap {
				width: 100%;
			}
		}
	}
</style>
