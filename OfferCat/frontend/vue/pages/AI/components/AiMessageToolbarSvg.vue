<template>
	<view class="ai-toolbar-wrap" :class="size === 'sm' ? 'ai-toolbar-wrap--sm' : ''">
		<text class="ai-toolbar-glyph">{{ glyph }}</text>
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
			}
		},
		computed: {
			glyph() {
				return GLYPH[this.name] || '·'
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
</style>
