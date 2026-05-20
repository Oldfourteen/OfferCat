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

				<!-- 图片上传区 + AI配文（同行：左侧图/添加，右侧 AI） -->
				<view class="image-grid">
					<view class="image-ai-layout">
						<view class="image-slots">
							<view class="upload-btn" @click="chooseImage" v-if="images.length < 6">
								<text class="plus-icon">+</text>
								<text class="upload-text">添加图片</text>
								<text class="upload-limit">最多6张</text>
							</view>

							<view class="image-item" v-for="(img, index) in images" :key="index">
								<image class="uploaded-img" :src="img.url" mode="aspectFill" @click="previewImage(index)"></image>
								<view class="delete-btn" @click.stop="deleteImage(index)">
									<text class="delete-icon">×</text>
								</view>
							</view>
						</view>

						<view class="ai-fab-trigger ai-fab-inline" @click="openAiDrawer">
							<text class="ai-fab-text">AI配文</text>
						</view>
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
				小Tip：上传一张图片后点击右侧「AI配文」，从底部拉出面板一键生成文案~ awa
			</view>
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
	import { createForumPost, uploadForumImage, generateForumCaption } from '@/api/forum.js'
	import { checkContent, getRandomPoemPair } from '@/utils/sensitiveWords.js'

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
				const count = 6 - this.images.length
				if (count <= 0) return
				
				uni.chooseImage({
					count: Math.min(6, count),
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						tempFilePaths.forEach(path => {
							const imgObj = { url: path, remoteUrl: '', uploading: true }
							this.images.push(imgObj)
							const index = this.images.length - 1
							this.uploadImageAt(index)
						})
					}
				})
			},
			async uploadImageAt(index) {
				const target = this.images[index]
				if (!target || !target.url) return
				this.$set(this.images, index, { ...target, uploading: true })
				try {
					const remoteUrl = await uploadForumImage(target.url)
					this.$set(this.images, index, { ...target, remoteUrl: remoteUrl || '', uploading: false })
				} catch (e) {
					this.$set(this.images, index, { ...target, remoteUrl: '', uploading: false })
					uni.showToast({ title: (e && e.message) || '图片上传失败', icon: 'none' })
				}
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
			async generateCaption() {
				if (this.isGenerating) return
				if (this.images.length === 0) return
				
				this.isGenerating = true
				try {
					// 选取第一张图片进行OCR和生成配文
					const targetImage = this.images[0].url
					const length = this.aiForm.length
					const style = this.aiForm.style
					
					const caption = await generateForumCaption(targetImage, length, style)
					
					this.content = this.content ? `${this.content}\n${caption}` : caption
					this.closeAiDrawer()
					uni.showToast({ title: 'AI配文生成成功', icon: 'success' })
				} catch (e) {
					console.error('AI配文失败', e)
					uni.showToast({ title: e.message || 'AI配文生成失败，请重试', icon: 'none' })
				} finally {
					this.isGenerating = false
				}
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
				
				// 修复：OfferCat 的用户缓存键其实是 'user_v2'，或者可以用 getUser() 方法
				const user = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const userId = user.userId || user.id || user.studentId
				
				if (!userId) {
					uni.hideLoading()
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}
				
				try {
					await createForumPost({
						userId,
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
				} catch (e) {
					uni.hideLoading()
					uni.showToast({ title: '发布失败', icon: 'none' })
				}
			}
		}
	}
</script>

<style lang="scss">
	/* 与全站主色 #5d76bd / 深蓝灰文案统一 */
	.publish-page {
		min-height: 100vh;
		background: linear-gradient(
			168deg,
			#e8ecf8 0%,
			#f0f3fb 26%,
			#f6f8fc 55%,
			#fafbfe 100%
		);
		display: flex;
		flex-direction: column;
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 22rpx;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.92) 0%,
			rgba(244, 246, 252, 0.88) 100%
		);
		backdrop-filter: blur(14rpx);
		border-bottom: 1rpx solid rgba(93, 118, 189, 0.1);
		box-shadow: 0 8rpx 28rpx rgba(38, 51, 78, 0.06);
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
		border: none;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:
			0 8rpx 22rpx rgba(93, 118, 189, 0.18),
			0 2rpx 8rpx rgba(45, 58, 95, 0.06),
			inset 0 2rpx 0 rgba(255, 255, 255, 0.85);
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
		font-size: 30rpx;
		font-weight: 750;
		letter-spacing: 0.04em;
		color: #1e2638;
		text-shadow: 0 1rpx 0 rgba(255, 255, 255, 0.6);
	}

	.placeholder {
		opacity: 0;
	}

	.main-content {
		padding: 30rpx;
	}

	.editor-card {
		background: linear-gradient(
			165deg,
			#ffffff 0%,
			#fbfcfe 48%,
			#f7f9fd 100%
		);
		border-radius: 24rpx;
		padding: 32rpx 28rpx 36rpx;
		margin-bottom: 56rpx;
		border: none;
		box-shadow:
			0 16rpx 48rpx rgba(93, 118, 189, 0.12),
			0 4rpx 16rpx rgba(38, 51, 78, 0.06),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.95);
		
		.textarea-wrap {
			position: relative;
			margin-bottom: 28rpx;
			padding-bottom: 36rpx;
			border-bottom: 1rpx solid rgba(93, 118, 189, 0.08);
			
			.content-input {
				width: 100%;
				height: 240rpx;
				font-size: 30rpx;
				color: #1e2638;
				line-height: 1.55;
				background: transparent;
			}
			
			.char-counter {
				position: absolute;
				bottom: 8rpx;
				right: 0;
				font-size: 24rpx;
				font-weight: 600;
				color: #7c88a8;
				
				&.error-text {
					color: #e85555;
					font-weight: 700;
				}
			}
		}
		
		.placeholder-style {
			color: #9aa3b8;
			font-style: italic;
		}
		
		.image-grid {
			margin-bottom: 0;
		}

		.image-ai-layout {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 20rpx;
		}

		.image-slots {
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
			flex: 1;
			min-width: 0;
			
			.image-item {
				width: 190rpx;
				height: 190rpx;
				border-radius: 16rpx;
				position: relative;
				box-shadow:
					0 10rpx 28rpx rgba(93, 118, 189, 0.15),
					0 2rpx 8rpx rgba(38, 51, 78, 0.08);
				
				.uploaded-img {
					width: 100%;
					height: 100%;
					border-radius: 16rpx;
				}
				
				.delete-btn {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
					width: 40rpx;
					height: 40rpx;
					background: rgba(30, 38, 56, 0.72);
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
					
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
				background: linear-gradient(
					160deg,
					rgba(93, 118, 189, 0.1) 0%,
					rgba(93, 118, 189, 0.04) 100%
				);
				border: none;
				border-radius: 16rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				box-shadow:
					inset 0 1rpx 0 rgba(255, 255, 255, 0.7),
					0 6rpx 20rpx rgba(93, 118, 189, 0.1);
				
				.plus-icon {
					font-size: 56rpx;
					color: #5d76bd;
					font-weight: 400;
					margin-bottom: 8rpx;
					opacity: 0.85;
				}
				
				.upload-text {
					font-size: 24rpx;
					color: #5c6b8a;
					font-weight: 600;
				}
				
				&:active {
					opacity: 0.92;
					transform: scale(0.98);
				}

				.upload-limit {
					margin-top: 8rpx;
					font-size: 20rpx;
					color: #b0b7c3;
					line-height: 1;
				}
			}
		}
	}

	.publish-btn-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 40rpx;
		
		.publish-btn {
			width: 86%;
			max-width: 420rpx;
			height: 92rpx;
			background: linear-gradient(180deg, #e4e8f2 0%, #d9dee9 100%);
			color: #8b95aa;
			border-radius: 999rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			font-weight: 700;
			letter-spacing: 0.08em;
			transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
			box-shadow:
				0 4rpx 12rpx rgba(38, 51, 78, 0.08),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.65);
			
			&.active {
				background: #5d76bd;
				color: #fff;
				box-shadow:
					0 14rpx 36rpx rgba(93, 118, 189, 0.35),
					0 4rpx 12rpx rgba(45, 58, 95, 0.12),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.22);
			}
			
			&:active {
				transform: scale(0.98);
			}
		}
	}

	.tip-text {
		text-align: center;
		font-size: 24rpx;
		color: #7c88a8;
		line-height: 1.65;
		padding: 0 40rpx 48rpx;
	}

	/* 胶囊按钮样式；与添加图片并列时使用 .ai-fab-inline 取消 fixed */
	.ai-fab-trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16rpx 30rpx;
		border-radius: 999rpx;
		background: linear-gradient(165deg, #ffffff 0%, #f4f6fc 100%);
		border: none;
		box-shadow:
			0 12rpx 40rpx rgba(93, 118, 189, 0.22),
			0 4rpx 14rpx rgba(38, 51, 78, 0.1),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.9);
		
		.ai-fab-text {
			font-size: 26rpx;
			color: #4a5680;
			font-weight: 700;
		}
		
		&:active {
			opacity: 0.92;
			transform: scale(0.98);
		}
	}

	.ai-fab-inline {
		position: relative;
		flex-shrink: 0;
		z-index: 1;
		align-self: center;
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
		background: linear-gradient(180deg, #fdfdff 0%, #f8f9fd 100%);
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		max-height: 85vh;
		overflow-y: auto;
		box-shadow:
			0 -16rpx 56rpx rgba(93, 118, 189, 0.14),
			0 -4rpx 20rpx rgba(38, 51, 78, 0.08);
		
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
					background: #eef1f8;
					color: #5c6680;
					font-size: 26rpx;
					border-radius: 999rpx;
					border: none;
					box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.75);
					
					&.active {
						background: rgba(93, 118, 189, 0.16);
						color: #3d5590;
						font-weight: 700;
						box-shadow:
							0 6rpx 18rpx rgba(93, 118, 189, 0.2),
							inset 0 1rpx 0 rgba(255, 255, 255, 0.55);
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
					background: linear-gradient(180deg, #eef1f6 0%, #e3e7ef 100%);
					color: #5c6680;
					box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
				}
				
				&.confirm {
					background: #5d76bd;
					color: #fff;
					box-shadow:
						0 8rpx 24rpx rgba(93, 118, 189, 0.35),
						inset 0 2rpx 0 rgba(255, 255, 255, 0.2);
					
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
			/* 去掉浅色 inset 高光，避免深色模式下输入区顶部一圈亮线 */
			box-shadow:
				0 16rpx 48rpx rgba(0, 0, 0, 0.38),
				0 4rpx 16rpx rgba(0, 0, 0, 0.22);
			.textarea-wrap {
				.content-input { color: #f4f7fb; }
				.char-counter { color: #888; &.error-text { color: #ff6b6b; } }
			}
			.upload-btn {
				background: linear-gradient(
					160deg,
					rgba(93, 118, 189, 0.18) 0%,
					rgba(93, 118, 189, 0.08) 100%
				);
				border: none;
				box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
				
				.plus-icon {
					color: #8fa4e8;
				}
				.upload-text {
					color: #9aa6c4;
				}
				.upload-limit {
					color: #707784;
				}
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
			background: linear-gradient(180deg, #343842 0%, #2a2d35 100%);
			color: #6d7280;
			box-shadow:
				0 4rpx 12rpx rgba(0, 0, 0, 0.25),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.06);
			&.active {
				background: #5d76bd;
				color: #fff;
				box-shadow:
					0 14rpx 36rpx rgba(93, 118, 189, 0.35),
					inset 0 2rpx 0 rgba(255, 255, 255, 0.15);
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
					background: #2f323a;
					color: #a8adbc;
					box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.06);
					&.active {
						background: rgba(93, 118, 189, 0.28);
						color: #c5d0f5;
						box-shadow:
							0 6rpx 18rpx rgba(0, 0, 0, 0.25),
							inset 0 1rpx 0 rgba(255, 255, 255, 0.12);
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
