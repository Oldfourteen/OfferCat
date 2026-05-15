<template>
	<view class="resume-workshop" :class="themeClass">
		<!-- 简历工坊由三个能力入口组成，按权重分配纵向空间。 -->
		<view class="section-wrap attachment-wrap">
			<!-- 附件简历：负责上传 PDF 润色与重新导出。 -->
			<attachmentResume :theme="theme" />
		</view>
		<view class="section-wrap online-wrap">
			<!-- 在线简历：跳转到在线编辑器继续完善。 -->
			<onlineResume :theme="theme" />
		</view>
		<view class="section-wrap repo-wrap">
			<!-- 简历仓库：管理当前用户已生成或已上传的简历。 -->
			<resumeRepo :theme="theme" />
		</view>
	</view>
</template>

<script>
	import attachmentResume from './attachmentResume.vue'
	import onlineResume from './onlineResume.vue'
	import resumeRepo from './resumeRepo.vue'

	export default {
		name: 'ResumeWorkshop',
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		computed: {
			// 统一透传暗色主题，避免子组件各自判断父级状态。
		isDarkTheme() {
			return this.theme === 'dark' || this.theme === 'theme-dark'
		},
			themeClass() {
				// 工坊容器只暴露一个主题类，内部子卡片继续透传原始 theme。
			return this.isDarkTheme ? 'theme-dark' : ''
			}
		},
		components: {
			// 子卡片统一在工坊容器中编排，避免父页面直接拼接多个入口。
			attachmentResume,
			onlineResume,
			resumeRepo
		}
	}
</script>

<style lang="scss" scoped>
	/* max-height 对齐 GrowthArchive .page：扣顶栏占位 + 页面上边距 + 下边距（含底栏 116rpx），否则「幕布」比真实可视区高，滚到底仍像差一截 */
	.resume-workshop {
		width: 100%;
		max-height: calc(
			100vh - env(safe-area-inset-top) - var(--status-bar-height) - 130rpx - 20rpx - 40rpx - 116rpx -
				env(safe-area-inset-bottom)
		);
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		overflow-x: hidden;
		overflow-y: auto;
		overscroll-behavior-y: contain;
		box-sizing: border-box;
		padding-bottom: calc(48rpx + env(safe-area-inset-bottom));
	}

	.section-wrap {
		flex: 0 0 auto;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	/* 透传：子卡片不再强制 height:100% 撑满 flex 格，避免文案被父级「幕布」裁切 */
	.resume-workshop :deep(.resume-card) {
		height: auto;
		min-height: 0;
	}
</style>
