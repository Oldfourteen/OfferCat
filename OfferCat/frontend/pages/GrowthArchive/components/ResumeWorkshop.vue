<template>
	<view class="resume-workshop" :class="themeClass">
		<view class="section-wrap attachment-wrap">
			<attachmentResume :theme="theme" />
		</view>
		<view class="section-wrap online-wrap">
			<onlineResume :theme="theme" />
		</view>
		<view class="section-wrap repo-wrap">
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
		isDarkTheme() {
			return this.theme === 'dark' || this.theme === 'theme-dark'
		},
			themeClass() {
			return this.isDarkTheme ? 'theme-dark' : ''
			}
		},
		components: {
			attachmentResume,
			onlineResume,
			resumeRepo
		}
	}
</script>

<style lang="scss" scoped>
	.resume-workshop {
		width: 100%;
		/* 减去顶部栏和页面 padding 的高度，使其占满一屏且不能滑动拖动 */
		height: calc(100vh - env(safe-area-inset-top) - var(--status-bar-height) - 130rpx - 60rpx - env(safe-area-inset-bottom));
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		overflow: hidden; /* 禁止滑动拖动 */
		box-sizing: border-box;
	}

	.section-wrap {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	/* 附件简历占比最大 */
	.attachment-wrap {
		flex: 5;
	}

	.online-wrap {
		flex: 3;
	}

	.repo-wrap {
		flex: 3;
	}
	
	/* 透传高度给组件内部 */
	:deep(.resume-card) {
		height: 100%;
		flex: 1;
	}
</style>
