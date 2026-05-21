<template>
	<!-- APP 原生层不渲染 ::before/::after，使用真实子节点 + 字符图标 -->
	<view class="ai-toolbar-wrap" :class="size === 'sm' ? 'ai-toolbar-wrap--sm' : ''">
		<view v-if="useShapeIcon" class="ai-toolbar-shape" :class="`ai-toolbar-shape--${name}`">
			<template v-if="name === 'copy'">
				<view class="copy-sheet copy-sheet--back" />
				<view class="copy-sheet copy-sheet--front" />
			</template>
			<template v-else-if="name === 'pen'">
				<view class="pen-body" />
				<view class="pen-tip" />
			</template>
			<template v-else-if="name === 'thumbs-up' || name === 'thumbs-up-fill'">
				<view class="thumb-handle" :class="{ 'thumb-handle--fill': name === 'thumbs-up-fill' }" />
				<view class="thumb-top" :class="{ 'thumb-top--fill': name === 'thumbs-up-fill' }" />
			</template>
			<template v-else-if="name === 'arrows-rotate'">
				<view class="rotate-ring" />
				<view class="rotate-arrow rotate-arrow--top" />
				<view class="rotate-arrow rotate-arrow--bottom" />
			</template>
			<template v-else-if="name === 'microphone'">
				<view class="mic-head" />
				<view class="mic-stand" />
				<view class="mic-base" />
			</template>
		</view>
		<text v-else class="ai-toolbar-glyph">{{ glyph }}</text>
	</view>
</template>

<script>
	const GLYPH = {
		copy: '复制',
		pen: '编辑',
		'thumbs-up': '赞',
		'thumbs-up-fill': '已赞',
		'arrows-rotate': '重答',
		microphone: '朗读'
	}

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
			},
			// APP 端优先用文字标签，保证 APK 一定能看见可点区域
			preferTextOnApp: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			isAppPlus() {
				// #ifdef APP-PLUS
				return true
				// #endif
				// #ifndef APP-PLUS
				return false
				// #endif
			},
			useShapeIcon() {
				return !(this.preferTextOnApp && this.isAppPlus)
			},
			glyph() {
				return GLYPH[this.name] || ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ai-toolbar-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		min-width: 40rpx;
		min-height: 40rpx;
	}

	.ai-toolbar-wrap--sm {
		min-width: 56rpx;
		min-height: 32rpx;
	}

	.ai-toolbar-glyph {
		font-size: 22rpx;
		line-height: 1;
		color: inherit;
		white-space: nowrap;
	}

	.ai-toolbar-wrap--sm .ai-toolbar-glyph {
		font-size: 20rpx;
	}

	.ai-toolbar-shape {
		position: relative;
		width: 30rpx;
		height: 30rpx;
		flex-shrink: 0;
	}

	.ai-toolbar-wrap--sm .ai-toolbar-shape {
		width: 24rpx;
		height: 24rpx;
	}

	/* 复制 */
	.copy-sheet {
		position: absolute;
		width: 16rpx;
		height: 16rpx;
		border: 2rpx solid #8b9199;
		border-radius: 3rpx;
		box-sizing: border-box;
	}

	.copy-sheet--back {
		top: 2rpx;
		left: 2rpx;
	}

	.copy-sheet--front {
		right: 2rpx;
		bottom: 2rpx;
		background: #f6f8fc;
	}

	/* 编辑 */
	.pen-body {
		position: absolute;
		left: 4rpx;
		top: 14rpx;
		width: 20rpx;
		height: 3rpx;
		background: #8b9199;
		border-radius: 2rpx;
		transform: rotate(-38deg);
	}

	.pen-tip {
		position: absolute;
		right: 5rpx;
		bottom: 8rpx;
		width: 0;
		height: 0;
		border-left: 4rpx solid transparent;
		border-right: 4rpx solid transparent;
		border-top: 6rpx solid #8b9199;
		transform: rotate(-38deg);
	}

	/* 点赞 */
	.thumb-handle {
		position: absolute;
		left: 4rpx;
		bottom: 4rpx;
		width: 8rpx;
		height: 14rpx;
		border: 2rpx solid #8b9199;
		border-radius: 2rpx 0 0 2rpx;
		box-sizing: border-box;
	}

	.thumb-handle--fill {
		background: #8b9199;
	}

	.thumb-top {
		position: absolute;
		right: 4rpx;
		top: 6rpx;
		width: 14rpx;
		height: 14rpx;
		border: 2rpx solid #8b9199;
		border-bottom: none;
		border-radius: 6rpx 6rpx 2rpx 2rpx;
		box-sizing: border-box;
	}

	.thumb-top--fill {
		background: #8b9199;
	}

	/* 重答 */
	.rotate-ring {
		position: absolute;
		left: 4rpx;
		top: 4rpx;
		width: 20rpx;
		height: 20rpx;
		border: 2rpx solid #8b9199;
		border-right-color: transparent;
		border-radius: 50%;
		box-sizing: border-box;
		transform: rotate(-30deg);
	}

	.rotate-arrow {
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;
	}

	.rotate-arrow--top {
		top: 2rpx;
		left: 6rpx;
		border-width: 0 4rpx 6rpx 4rpx;
		border-color: transparent transparent #8b9199 transparent;
	}

	.rotate-arrow--bottom {
		right: 4rpx;
		bottom: 2rpx;
		border-width: 6rpx 4rpx 0 4rpx;
		border-color: #8b9199 transparent transparent transparent;
	}

	/* 朗读 */
	.mic-head {
		position: absolute;
		left: 50%;
		top: 4rpx;
		width: 10rpx;
		height: 12rpx;
		margin-left: -5rpx;
		border: 2rpx solid #8b9199;
		border-radius: 999rpx;
		box-sizing: border-box;
	}

	.mic-stand {
		position: absolute;
		left: 50%;
		top: 14rpx;
		width: 16rpx;
		height: 8rpx;
		margin-left: -8rpx;
		border: 2rpx solid #8b9199;
		border-top: none;
		border-radius: 0 0 999rpx 999rpx;
		box-sizing: border-box;
	}

	.mic-base {
		position: absolute;
		left: 50%;
		bottom: 4rpx;
		width: 14rpx;
		height: 2rpx;
		margin-left: -7rpx;
		background: #8b9199;
		border-radius: 2rpx;
	}
</style>
