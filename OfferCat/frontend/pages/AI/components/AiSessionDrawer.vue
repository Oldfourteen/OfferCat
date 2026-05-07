<template>
	<view v-if="visible" class="drawer-wrap">
		<!-- 蒙层：点击空白处关闭会话抽屉 -->
		<view class="drawer-mask" @click="$emit('close')"></view>
		<view class="drawer-panel-wrapper">
			<view class="drawer-panel" :class="themeClass">
				<!-- 抽屉头部：标题 + 新建会话入口 -->
				<view class="drawer-head">
					<text class="drawer-title">对话列表</text>
					<view class="drawer-create" @click="$emit('create')">新建</view>
				</view>
				<!-- 会话列表：支持切换、重命名和删除单个会话 -->
				<scroll-view class="drawer-list" scroll-y>
					<view
						v-for="item in conversations"
						:key="item.id"
						class="drawer-item"
						:class="{ active: item.id === activeId }"
						@click="$emit('select', item.id)"
					>
						<!-- 重命名态：显示输入框，失焦或回车后提交 -->
						<input
							v-if="editingId === item.id"
							class="drawer-item-input"
							:value="editingTitle"
							focus
							@input="onInput"
							@blur="confirmRename(item.id)"
							@confirm="confirmRename(item.id)"
							@click.stop
						/>
						<!-- 常规展示态：显示标题、摘要、更新时间和操作按钮 -->
						<text v-else class="drawer-item-title">{{ item.title }}</text>
						<text class="drawer-item-preview">{{ item.preview }}</text>
						<text class="drawer-item-time">{{ item.updatedAt }}</text>
						<view class="drawer-item-actions" @click.stop>
							<text class="drawer-action" @click="startRename(item)">重命名</text>
							<text class="drawer-action danger" @click="$emit('remove', item.id)">删除</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
		export default {
		// 会话抽屉组件：负责展示会话列表，并把操作事件抛给父组件处理
		name: 'AiSessionDrawer',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			// 控制抽屉显示/隐藏
			visible: Boolean,
			// 父组件传入的会话数组
			conversations: {
				type: Array,
				default() {
					return []
				}
			},
			// 当前被选中的会话 id，用来高亮当前项
			activeId: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// 当前正在编辑标题的会话 id
				editingId: null,
				// 输入框里临时编辑中的标题文本
				editingTitle: ''
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		methods: {
			// 进入重命名状态，并把旧标题回填到输入框里
			startRename(item) {
				this.editingId = item.id
				this.editingTitle = item.title
			},
			// 输入时同步本地编辑值
			onInput(event) {
				this.editingTitle = event.detail.value
			},
			// 输入框失焦或回车时，通知父组件真正更新标题
			confirmRename(id) {
				if (this.editingId !== id) {
					return
				}
				this.$emit('rename', {
					id,
					title: this.editingTitle
				})
				// 提交后退出编辑状态
				this.editingId = null
				this.editingTitle = ''
			}
		}
	}
</script>

<style lang="scss">
	.drawer-wrap {
		position: fixed;
		inset: 0;
		z-index: 999;
		display: flex;

		.drawer-mask {
			position: absolute;
			inset: 0;
			background: rgba(14, 24, 49, 0.28);
			animation: fadeIn 0.3s ease-out;
		}

		.drawer-panel-wrapper {
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			width: 520rpx;
			max-width: 78vw;
			animation: slideInRight 0.3s ease-out;
		}

		.drawer-panel {
			width: 100%;
			height: 100%;
			background: #ffffff;
			box-shadow: -18rpx 0 38rpx rgba(16, 36, 86, 0.08);
			padding: calc(var(--status-bar-height) + 22rpx) 22rpx 24rpx;
			box-sizing: border-box;
		}

		.drawer-head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 22rpx;

			.drawer-title {
				font-size: 34rpx;
				font-weight: 700;
				color: #15294f;
			}

			.drawer-create {
				padding: 10rpx 20rpx;
				border-radius: 999rpx;
				background: rgba(49, 101, 215, 0.1);
				color: #3165d7;
				font-size: 22rpx;
				font-weight: 700;
			}
		}

		.drawer-list {
			height: calc(100vh - var(--status-bar-height) - 110rpx);

			.drawer-item {
				padding: 22rpx;
				border-radius: 26rpx;
				background: #f6f8fc;
				margin-bottom: 18rpx;
				border: 2rpx solid transparent;

				&.active {
					background: rgba(49, 101, 215, 0.08);
					border-color: rgba(49, 101, 215, 0.18);
				}

				&-title,
				&-preview,
				&-time {
					display: block;
				}

				&-input {
					width: 100%;
					height: 58rpx;
					line-height: 58rpx;
					font-size: 28rpx;
					font-weight: 700;
					color: #182b51;
					background: rgba(255, 255, 255, 0.72);
					border-radius: 16rpx;
					padding: 0 16rpx;
					box-sizing: border-box;
				}

				&-title {
					font-size: 28rpx;
					font-weight: 700;
					color: #182b51;
				}

				&-preview {
					margin-top: 8rpx;
					font-size: 22rpx;
					color: #7f8ca6;
				}

				&-time {
					margin-top: 12rpx;
					font-size: 20rpx;
					color: #9ba6bd;
				}

				&-actions {
					display: flex;
					gap: 18rpx;
					margin-top: 16rpx;
				}
			}

			.drawer-action {
				font-size: 22rpx;
				font-weight: 700;
				color: #3165d7;

				&.danger {
					color: #df4f5d;
				}
			}
		}
	}

	.drawer-panel.theme-dark {
		background: #181a1f;
		box-shadow: -18rpx 0 38rpx rgba(0, 0, 0, 0.22);
	}

	.drawer-panel.theme-dark .drawer-title,
	.drawer-panel.theme-dark .drawer-item-title,
	.drawer-panel.theme-dark .drawer-item-input {
		color: #eef2f8;
	}

	.drawer-panel.theme-dark .drawer-item {
		background: #23252b;
	}

	.drawer-panel.theme-dark .drawer-item.active {
		background: rgba(74, 103, 247, 0.2);
		border-color: rgba(74, 103, 247, 0.32);
	}

	.drawer-panel.theme-dark .drawer-item-preview,
	.drawer-panel.theme-dark .drawer-item-time {
		color: rgba(255, 255, 255, 0.5);
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slideInRight {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}
</style>
