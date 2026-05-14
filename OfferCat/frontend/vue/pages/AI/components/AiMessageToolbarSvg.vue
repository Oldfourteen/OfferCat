<template>
	<!-- 离线内联 SVG（currentColor），不依赖外链字体或 CDN -->
	<view class="ai-toolbar-svg-wrap" :class="size === 'sm' ? 'ai-toolbar-svg-wrap--sm' : ''">
		<!-- 复制 -->
		<svg
			v-if="name === 'copy'"
			class="ai-toolbar-svg"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="8"
				y="8"
				width="14"
				height="14"
				rx="2"
				ry="2"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<!-- 修改 -->
		<svg
			v-else-if="name === 'pen'"
			class="ai-toolbar-svg"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="m15 5 4 4"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<!-- 点赞（描边） -->
		<svg
			v-else-if="name === 'thumbs-up'"
			class="ai-toolbar-svg"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<!-- 已赞（填充轮廓） -->
		<svg
			v-else-if="name === 'thumbs-up-fill'"
			class="ai-toolbar-svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3v11z"
			/>
		</svg>
		<!-- 重新生成 -->
		<svg
			v-else-if="name === 'arrows-rotate'"
			class="ai-toolbar-svg"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M3 3v5h5"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M16 16h5v5"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<!-- 语音播报 -->
		<svg
			v-else-if="name === 'microphone'"
			class="ai-toolbar-svg"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M19 10v2a7 7 0 0 1-14 0v-2"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M12 19v3M8 22h8"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</view>
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
	.ai-toolbar-svg-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		color: inherit;
		flex-shrink: 0;
	}

	.ai-toolbar-svg {
		display: block;
		width: 26rpx;
		height: 26rpx;
	}

	.ai-toolbar-svg-wrap--sm .ai-toolbar-svg {
		width: 20rpx;
		height: 20rpx;
	}
</style>
