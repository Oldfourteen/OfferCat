<template>
	<!-- APP-PLUS 不支持内联 svg，改用纯 CSS 绘制，与 AiTopBar 一致 -->
	<view
		class="ai-toolbar-icon"
		:class="[
			`ai-toolbar-icon--${name}`,
			size === 'sm' ? 'ai-toolbar-icon--sm' : ''
		]"
	/>
</template>

<script>
	export default {
		name: 'AiMessageToolbarSvg',
		props: {
			name: {
				type: String,
				required: true
			},
			size: {
				type: String,
				default: 'md'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ai-toolbar-icon {
		position: relative;
		flex-shrink: 0;
		width: 26rpx;
		height: 26rpx;
		color: inherit;
		box-sizing: border-box;
	}

	.ai-toolbar-icon--sm {
		width: 20rpx;
		height: 20rpx;
	}

	/* 复制 */
	.ai-toolbar-icon--copy::before,
	.ai-toolbar-icon--copy::after {
		content: '';
		position: absolute;
		border: 2rpx solid currentColor;
		border-radius: 4rpx;
		box-sizing: border-box;
	}

	.ai-toolbar-icon--copy::before {
		width: 58%;
		height: 58%;
		top: 18%;
		left: 18%;
	}

	.ai-toolbar-icon--copy::after {
		width: 58%;
		height: 58%;
		bottom: 10%;
		right: 10%;
	}

	/* 编辑 */
	.ai-toolbar-icon--pen::before {
		content: '';
		position: absolute;
		width: 70%;
		height: 2rpx;
		top: 50%;
		left: 8%;
		background: currentColor;
		border-radius: 2rpx;
		transform: rotate(-38deg);
		transform-origin: left center;
	}

	.ai-toolbar-icon--pen::after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		right: 10%;
		bottom: 22%;
		border-left: 5rpx solid transparent;
		border-right: 5rpx solid transparent;
		border-top: 8rpx solid currentColor;
		transform: rotate(-38deg);
	}

	/* 点赞（描边） */
	.ai-toolbar-icon--thumbs-up::before {
		content: '';
		position: absolute;
		left: 14%;
		bottom: 8%;
		width: 28%;
		height: 52%;
		border: 2rpx solid currentColor;
		border-radius: 4rpx 0 0 4rpx;
		box-sizing: border-box;
	}

	.ai-toolbar-icon--thumbs-up::after {
		content: '';
		position: absolute;
		right: 8%;
		top: 18%;
		width: 52%;
		height: 58%;
		border: 2rpx solid currentColor;
		border-radius: 8rpx 8rpx 4rpx 4rpx;
		border-bottom: none;
		box-sizing: border-box;
	}

	/* 已赞（填充） */
	.ai-toolbar-icon--thumbs-up-fill::before {
		content: '';
		position: absolute;
		left: 14%;
		bottom: 8%;
		width: 28%;
		height: 52%;
		background: currentColor;
		border-radius: 4rpx 0 0 4rpx;
	}

	.ai-toolbar-icon--thumbs-up-fill::after {
		content: '';
		position: absolute;
		right: 8%;
		top: 18%;
		width: 52%;
		height: 58%;
		background: currentColor;
		border-radius: 8rpx 8rpx 4rpx 4rpx;
	}

	/* 重新生成 */
	.ai-toolbar-icon--arrows-rotate {
		border: 2rpx solid transparent;
		border-top-color: currentColor;
		border-right-color: currentColor;
		border-radius: 50%;
		transform: rotate(-30deg);
	}

	.ai-toolbar-icon--arrows-rotate::before,
	.ai-toolbar-icon--arrows-rotate::after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;
	}

	.ai-toolbar-icon--arrows-rotate::before {
		top: -2rpx;
		left: 2rpx;
		border-width: 0 5rpx 7rpx 5rpx;
		border-color: transparent transparent currentColor transparent;
		transform: rotate(-18deg);
	}

	.ai-toolbar-icon--arrows-rotate::after {
		bottom: -2rpx;
		right: 2rpx;
		border-width: 7rpx 5rpx 0 5rpx;
		border-color: currentColor transparent transparent transparent;
		transform: rotate(-18deg);
	}

	/* 语音播报 */
	.ai-toolbar-icon--microphone::before {
		content: '';
		position: absolute;
		left: 50%;
		top: 10%;
		width: 34%;
		height: 46%;
		transform: translateX(-50%);
		border: 2rpx solid currentColor;
		border-radius: 999rpx;
		box-sizing: border-box;
	}

	.ai-toolbar-icon--microphone::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 8%;
		width: 58%;
		height: 34%;
		transform: translateX(-50%);
		border: 2rpx solid currentColor;
		border-top: none;
		border-radius: 0 0 999rpx 999rpx;
		box-sizing: border-box;
	}

</style>
