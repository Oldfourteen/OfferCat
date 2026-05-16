<template>
	<view class="publish-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="back-btn" @click="goBack">
				<image class="back-icon-img" :src="publishBackIcon" mode="aspectFit" style="width: 38rpx; height: 38rpx" />
			</view>
			<text class="topbar-title">发布动态</text>
			<text class="placeholder"></text>
		</view>

		<!-- 主体内容 -->
		<view class="main-content">
			<view class="editor-card">
				<!-- 文本输入区 -->
				<view class="textarea-wrap">
					<textarea class="content-input text-wrap-safe" v-model="content" placeholder="分享你的新鲜事... (5-200字)" placeholder-class="placeholder-style" :maxlength="200"></textarea>
					<view class="char-counter" :class="{ 'error-text': content.length < 5 }">{{ content.length }}/200</view>
				</view>

				<!-- 图片上传区 -->
				<view class="image-grid">
					<view class="image-item" v-for="(img, index) in images" :key="index">
						<image class="uploaded-img" :src="img.url" mode="aspectFill" @click="previewImage(index)"></image>
						<view class="delete-btn" @click.stop="deleteImage(index)">
							<text class="delete-icon">×</text>
						</view>
					</view>
					
					<view class="upload-btn" @click="chooseImage" v-if="images.length < 1">
						<text class="plus-icon">+</text>
						<text class="upload-text">添加图片</text>
					</view>
				</view>
			</view>

			<!-- 发布按钮 -->
			<view class="publish-btn-wrap">
				<view class="publish-btn" :class="{ active: canPublish }" @click="publishPost">
					发布
				</view>
			</view>
			
			<view class="tip-text">
				小Tip：上传一张图片后点击下方「AI配文」悬浮按钮，从底部拉出面板一键生成文案~ awa
			</view>
		</view>

		<!-- 悬浮入口：独立于编辑卡片，点开从底部拉出抽屉 -->
		<view class="ai-fab-trigger" @click="openAiDrawer">
			<text class="ai-fab-icon">✨</text>
			<text class="ai-fab-text">AI配文</text>
		</view>

		<!-- 底部抽屉：全页独立遮罩 + 内容上滑 -->
		<transition name="ai-drawer">
			<view v-if="aiDrawerVisible" class="ai-drawer-mask" @click="closeAiDrawer" @touchmove.stop.prevent>
				<view class="ai-drawer-sheet" :class="themeClass" @click.stop>
					<view class="ai-drawer-handle" aria-hidden="true"></view>
					<view class="ai-drawer-inner">
						<view class="popup-title">AI 智能配文</view>

						<view class="section">
							<view class="section-title">1. 选择篇幅</view>
							<view class="options-wrap">
								<view class="option-item" :class="{ active: aiForm.length === '50字' }" @click="aiForm.length = '50字'">
									极简 (50字)
								</view>
								<view class="option-item" :class="{ active: aiForm.length === '100字' }" @click="aiForm.length = '100字'">
									适中 (100字)
								</view>
								<view class="option-item" :class="{ active: aiForm.length === '150字' }" @click="aiForm.length = '150字'">
									详细 (150字)
								</view>
							</view>
						</view>

						<view class="section">
							<view class="section-title">2. 选择风格</view>
							<view class="options-wrap">
								<view class="option-item" v-for="style in styleOptions" :key="style"
									  :class="{ active: aiForm.style === style }" @click="aiForm.style = style">
									{{ style }}
								</view>
							</view>
						</view>

						<view class="popup-actions">
							<view class="action-btn cancel" @click="closeAiDrawer">取消</view>
							<view class="action-btn confirm" :class="{ disabled: isGenerating }" @click="generateCaption">
								{{ isGenerating ? '生成中...' : '开始生成' }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</transition>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { getUserProfile } from '@/utils/userProfile.js'
	import { checkContent, getRandomPoemPair } from '@/utils/sensitiveWords.js'
	import { createForumMockPost } from '@/utils/forumLocalData.js'

	const PUBLISH_BACK_ICON =
		'data:image/svg+xml;charset=utf-8,' +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
				'<path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/>' +
				'</svg>'
		)

	export default {
		mixins: [themeMixin],
		data() {
			return {
				publishBackIcon: PUBLISH_BACK_ICON,
				content: '',
				images: [], // { url: 'local_path', remoteUrl: 'backend_path' }
				aiForm: {
					length: '50字',
					style: '职场日常'
				},
				styleOptions: ['职场日常', '校园生活', '求职心得', '干货分享', '情感共鸣'],
				aiDrawerVisible: false,
				isGenerating: false,
				userProfile: {}
			}
		},
		computed: {
			canPublish() {
				const len = this.content.trim().length
				return len >= 5 && len <= 200
			}
		},
		onLoad() {
			this.userProfile = getUserProfile()
		},
		methods: {
			buildLocalCaption() {
				const snippets = {
					'职场日常': ['今天也在慢慢升级自己', '记录一下此刻的小成就', '把日常过成喜欢的样子'],
					'校园生活': ['今天校园里的风都很温柔', '普通一天也值得认真收藏', '把学生时代过得热气腾腾'],
					'求职心得': ['先行动，再慢慢打磨细节', '每次尝试都算数', '求职路上，耐心和坚持一样重要'],
					'干货分享': ['顺手记下一点经验，留给后面的自己', '把踩过的坑整理成经验', '希望这条能帮你少绕一点路'],
					'情感共鸣': ['总会有人理解你此刻的情绪', '认真生活的人会被温柔看见', '允许自己偶尔慢一点也没关系']
				}
				const style = this.aiForm.style
				const candidates = snippets[style] || snippets['职场日常']
				const targetLength = Number((this.aiForm.length || '').replace(/\D/g, '')) || 50
				let sentence = candidates[Math.floor(Math.random() * candidates.length)]
				while (sentence.length < targetLength) {
					sentence += `，${candidates[(sentence.length / 3) % candidates.length | 0]}`
				}
				return sentence.slice(0, targetLength)
			},
			goBack() {
				uni.navigateBack()
			},
			chooseImage() {
				const count = 1 - this.images.length
				if (count <= 0) return
				
				uni.chooseImage({
					count: count,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						tempFilePaths.forEach(path => {
							const imgObj = { url: path, remoteUrl: path, uploading: false }
							this.images.push(imgObj)
						})
					}
				})
			},
			deleteImage(index) {
				this.images.splice(index, 1)
			},
			previewImage(index) {
				const urls = this.images.map(img => img.url)
				uni.previewImage({
					current: index,
					urls: urls
				})
			},
			openAiDrawer() {
				if (this.images.length === 0) {
					uni.showToast({ title: '请先添加一张图片作为配文参考', icon: 'none' })
					return
				}
				this.aiDrawerVisible = true
			},
			closeAiDrawer() {
				if (!this.isGenerating) {
					this.aiDrawerVisible = false
				}
			},
			generateCaption() {
				if (this.isGenerating) return
				if (this.images.length === 0) return
				
				this.isGenerating = true
				setTimeout(() => {
					const caption = this.buildLocalCaption()
					this.content = this.content ? `${this.content}\n${caption}` : caption
					this.closeAiDrawer()
					this.isGenerating = false
					uni.showToast({ title: '本地配文生成成功', icon: 'success' })
				}, 300)
			},
			async publishPost() {
				const len = this.content.trim().length;
				if (len < 5) {
					uni.showToast({ title: '帖子内容最少需要5个字哦', icon: 'none' })
					return
				}
				if (len > 200) {
					uni.showToast({ title: '帖子内容最多不能超过200字哦', icon: 'none' })
					return
				}
				
				const isUploading = this.images.some(img => img.uploading)
				if (isUploading) {
					uni.showToast({ title: '图片正在上传中，请稍候', icon: 'none' })
					return
				}
				
				uni.showLoading({ title: '检测中...' })
				
				const sensitiveResult = await checkContent(this.content)
				if (sensitiveResult.hasSensitive) {
					uni.hideLoading()
					uni.showToast({ title: '内容包含敏感词，已自动替换为古诗', icon: 'none' })
					this.content = sensitiveResult.replacement || getRandomPoemPair()
				}
				
				const title = this.content.substring(0, 20) + (this.content.length > 20 ? '...' : '')
				const remoteImages = this.images.filter(img => img.remoteUrl).map(img => img.remoteUrl)
				const user = uni.getStorageSync('user') || {}
				const userId = user.userId || user.id || 1
				createForumMockPost({
					userId: userId,
					title: title || '无标题分享',
					content: this.content,
					images: remoteImages
				})
				uni.hideLoading()
				uni.showToast({ title: '发布成功', icon: 'success' })
				uni.$emit('refresh')
				uni.$emit('refreshForumList')
				setTimeout(() => {
					uni.navigateBack()
				}, 800)
			}
		}
	}
</script>

<style lang="scss">
	.publish-page {
		min-height: 100vh;
		background: linear-gradient(180deg, #cbfaf5 0%, #f6fbff 18%, #f7f8fb 100%);
		display: flex;
		flex-direction: column;
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background: rgba(236, 252, 250, 0.94);
		backdrop-filter: blur(10rpx);
	}

	.back-btn,
	.placeholder {
		width: 72rpx;
		height: 72rpx;
		flex-shrink: 0;
		box-sizing: border-box;
	}

	.back-btn {
		border-radius: 50%;
		padding: 0;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 6rpx 18rpx rgba(93, 118, 189, 0.14);
	}

	.back-icon-img {
		width: 38rpx;
		height: 38rpx;
		max-width: 38rpx;
		max-height: 38rpx;
		display: block;
		flex-shrink: 0;
	}

	.placeholder {
		opacity: 0;
		pointer-events: none;
	}

	.topbar-title {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		font-weight: 800;
		color: #26334e;
	}

	.placeholder {
		opacity: 0;
	}

	.main-content {
		padding: 30rpx;
	}

	.editor-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 60rpx;
		
		.textarea-wrap {
			position: relative;
			margin-bottom: 30rpx;
			
			.content-input {
				width: 100%;
				height: 240rpx;
				font-size: 30rpx;
				color: #333;
				line-height: 1.5;
			}
			
			.char-counter {
				position: absolute;
				bottom: 0;
				right: 0;
				font-size: 24rpx;
				color: #999;
				
				&.error-text {
					color: #ff6b6b;
				}
			}
		}
		
		.placeholder-style {
			color: #999;
			font-style: italic;
		}
		
		.image-grid {
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
			margin-bottom: 0;
			
			.image-item {
				width: 190rpx;
				height: 190rpx;
				border-radius: 12rpx;
				position: relative;
				
				.uploaded-img {
					width: 100%;
					height: 100%;
					border-radius: 12rpx;
				}
				
				.delete-btn {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
					width: 40rpx;
					height: 40rpx;
					background: rgba(0, 0, 0, 0.5);
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					
					.delete-icon {
						color: #fff;
						font-size: 28rpx;
						line-height: 1;
					}
				}
			}
			
			.upload-btn {
				width: 190rpx;
				height: 190rpx;
				background: #f5f5f5;
				border: 2rpx dashed #ddd;
				border-radius: 12rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				
				.plus-icon {
					font-size: 60rpx;
					color: #999;
					font-weight: 300;
					margin-bottom: 10rpx;
				}
				
				.upload-text {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}

	.publish-btn-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 40rpx;
		
		.publish-btn {
			width: 320rpx;
			height: 88rpx;
			background: #e0e0e0;
			color: #999;
			border-radius: 44rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			font-weight: bold;
			transition: all 0.3s;
			
			&.active {
				background: #5d76bd;
				color: #fff;
			}
		}
	}

	.tip-text {
		text-align: center;
		font-size: 24rpx;
		color: #999;
		line-height: 1.6;
		padding: 0 40rpx 140rpx;
	}

	/* 图二样式：独立于编辑卡片外的悬浮胶囊入口 */
	.ai-fab-trigger {
		position: fixed;
		right: 28rpx;
		bottom: calc(210rpx + env(safe-area-inset-bottom));
		z-index: 80;
		display: flex;
		align-items: center;
		gap: 10rpx;
		padding: 14rpx 28rpx;
		border-radius: 999rpx;
		background: #f4f6f9;
		box-shadow: 0 8rpx 32rpx rgba(38, 51, 78, 0.12);
		
		.ai-fab-icon {
			font-size: 30rpx;
			line-height: 1;
		}
		
		.ai-fab-text {
			font-size: 26rpx;
			color: #6b7588;
			font-weight: 600;
		}
		
		&:active {
			opacity: 0.88;
			transform: scale(0.98);
		}
	}

	/* 底部抽屉：独立全屏遮罩层 + 内容上滑（不依赖 uni-popup） */
	.ai-drawer-mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999;
		background: rgba(15, 22, 36, 0.45);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.ai-drawer-sheet {
		background: #fff;
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		max-height: 85vh;
		overflow-y: auto;
		box-shadow: 0 -12rpx 48rpx rgba(0, 0, 0, 0.12);
		
		.ai-drawer-handle {
			width: 72rpx;
			height: 8rpx;
			border-radius: 8rpx;
			background: #dbe0ea;
			margin: 18rpx auto 8rpx;
		}
	}

	.ai-drawer-enter-active,
	.ai-drawer-leave-active {
		transition: opacity 0.28s ease;
		
		.ai-drawer-sheet {
			transition: transform 0.32s cubic-bezier(0.32, 0.72, 0, 1);
		}
	}

	.ai-drawer-enter,
	.ai-drawer-leave-to {
		opacity: 0;
		
		.ai-drawer-sheet {
			transform: translateY(110%);
		}
	}

	.ai-drawer-inner {
		padding: 12rpx 30rpx calc(36rpx + env(safe-area-inset-bottom));
		
		.popup-title {
			text-align: center;
			font-size: 34rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 36rpx;
		}
		
		.section {
			margin-bottom: 36rpx;
			
			.section-title {
				font-size: 28rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 20rpx;
			}
			
			.options-wrap {
				display: flex;
				flex-wrap: wrap;
				gap: 20rpx;
				
				.option-item {
					padding: 12rpx 30rpx;
					background: #f5f5f5;
					color: #666;
					font-size: 26rpx;
					border-radius: 30rpx;
					border: 2rpx solid transparent;
					
					&.active {
						background: rgba(93, 118, 189, 0.12);
						color: #5d76bd;
						border-color: #5d76bd;
					}
				}
			}
		}
		
		.popup-actions {
			display: flex;
			gap: 30rpx;
			margin-top: 48rpx;
			
			.action-btn {
				flex: 1;
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				font-weight: bold;
				border-radius: 44rpx;
				
				&.cancel {
					background: #f5f5f5;
					color: #666;
				}
				
				&.confirm {
					background: #5d76bd;
					color: #fff;
					
					&.disabled {
						opacity: 0.6;
					}
				}
			}
		}
	}

	/* Dark Theme 适配 */
	.theme-dark {
		background: #111216;
		
		.nav-bar {
			background: #23252b;
			.back-btn {
				background: rgba(255, 255, 255, 0.92);
				box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.2);
			}
			.topbar-title {
				color: #f4f7fb;
			}
		}

		.editor-card {
			background: #1d1f24;
			.textarea-wrap {
				.content-input { color: #f4f7fb; }
				.char-counter { color: #888; &.error-text { color: #ff6b6b; } }
			}
			.upload-btn {
				background: #2a2c33;
				border-color: #444;
			}
		}

		.tip-text {
			color: #888;
		}

		.ai-fab-trigger {
			background: #2a2c33;
			box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.45);
			
			.ai-fab-text {
				color: #b4bac8;
			}
		}

		.publish-btn-wrap .publish-btn {
			background: #2a2c33;
			color: #666;
			&.active {
				background: #5d76bd;
				color: #fff;
			}
		}

		.ai-drawer-sheet.theme-dark {
			background: #1d1f24;
			
			.ai-drawer-handle {
				background: #3a3d46;
			}
			
			.ai-drawer-inner {
				.popup-title,
				.section .section-title {
					color: #f4f7fb;
				}
				.section .options-wrap .option-item {
					background: #2a2c33;
					color: #aaa;
					&.active {
						background: rgba(93, 118, 189, 0.2);
						color: #5d76bd;
						border-color: #5d76bd;
					}
				}
				.popup-actions .action-btn.cancel {
					background: #2a2c33;
					color: #aaa;
				}
				.popup-actions .action-btn.confirm {
					background: #5d76bd;
					color: #fff;
				}
			}
		}

		.ai-drawer-mask {
			background: rgba(0, 0, 0, 0.55);
		}
	}
</style>
