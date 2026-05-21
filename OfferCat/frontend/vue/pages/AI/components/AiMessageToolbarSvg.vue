<template>
	<view class="ai-toolbar-wrap" :class="size === 'sm' ? 'ai-toolbar-wrap--sm' : ''">
		<image 
			class="ai-toolbar-icon" 
			:src="iconPath" 
			mode="aspectFit"
			:style="iconStyle"
		/>
	</view>
</template>

<script>
	// 图标路径映射
	const ICON_PATHS = {
		copy: '/static/ai-icons/copy.png',
		pen: '/static/ai-icons/pen-to-square.png',
		'thumbs-up': '/static/ai-icons/thumbs-up.png',
		'thumbs-up-fill': '/static/ai-icons/thumbs-up.png',
		'arrows-rotate': '/static/ai-icons/rotate-right.png',
		microphone: '/static/ai-icons/volume-high.png'
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
			iconPath() {
				return ICON_PATHS[this.name] || ICON_PATHS.copy
			},
			iconStyle() {
				// 统一图标大小，让它们更协调
				if (this.name === 'thumbs-up' || this.name === 'thumbs-up-fill') {
					return { width: '28rpx', height: '28rpx' }
				}
				if (this.name === 'microphone') {
					return { width: '26rpx', height: '26rpx' }
				}
				return { width: '28rpx', height: '28rpx' }
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
		width: 100%;
		height: 100%;
	}

	.ai-toolbar-wrap--sm {
		width: 100%;
		height: 100%;
	}

	.ai-toolbar-icon {
		display: block;
		width: 28rpx;
		height: 28rpx;
		opacity: 0.6;
		transition: opacity 0.2s ease;
	}

	.ai-toolbar-wrap:active .ai-toolbar-icon {
		opacity: 0.8;
	}
</style>