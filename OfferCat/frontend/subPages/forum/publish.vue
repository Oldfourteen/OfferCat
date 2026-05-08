<template>
	<view class="publish-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<text class="back-btn" @click="goBack">‹</text>
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

				<view class="toolbar">
					<view class="tool-btn ai-btn" @click="openAiPopup">
						<text class="tool-icon">✨</text>
						<text class="tool-text">AI配文</text>
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
				小Tip：上传一张图片后点击上方 AI 配文按钮，可一键生成精彩文案哦~ 嘿嘿嘿 awa
			</view>
		</view>

		<!-- AI 配文弹窗 -->
		<uni-popup ref="aiPopup" type="bottom" :background-color="isDarkTheme ? '#1d1f24' : '#fff'">
			<view class="ai-popup-content" :class="themeClass">
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
					<view class="action-btn cancel" @click="closeAiPopup">取消</view>
					<view class="action-btn confirm" :class="{ disabled: isGenerating }" @click="generateCaption">
						{{ isGenerating ? '生成中...' : '开始生成' }}
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { request } from '@/api/request.js'
	import { BASE_URL } from '@/api/config.js'
	import themeMixin from '@/utils/themeMixin.js'
	import { getUserProfile } from '@/utils/userProfile.js'
	import { checkContent, getRandomPoemPair } from '@/utils/sensitiveWords.js'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				content: '',
				images: [], // { url: 'local_path', remoteUrl: 'backend_path' }
				aiForm: {
					length: '50字',
					style: '职场日常'
				},
				styleOptions: ['职场日常', '校园生活', '求职心得', '干货分享', '情感共鸣'],
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
						// 直接显示本地图片，上传动作可以这里做或者发布时一起做。
						// 为了AI配文和体验，我们在选择图片后直接上传
						tempFilePaths.forEach(path => {
							const imgObj = { url: path, remoteUrl: '', uploading: true }
							this.images.push(imgObj)
							this.uploadImage(imgObj)
						})
					}
				})
			},
			uploadImage(imgObj) {
				uni.uploadFile({
					url: BASE_URL + '/api/forum/post/uploadImage',
					filePath: imgObj.url,
					name: 'file',
					success: (uploadRes) => {
						try {
							const data = JSON.parse(uploadRes.data)
							if (data.code === 200) {
								imgObj.remoteUrl = data.data
							} else {
								uni.showToast({ title: '图片上传失败', icon: 'none' })
							}
						} catch (e) {
							uni.showToast({ title: '解析失败', icon: 'none' })
						}
					},
					fail: () => {
						uni.showToast({ title: '网络错误', icon: 'none' })
					},
					complete: () => {
						imgObj.uploading = false
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
			openAiPopup() {
				if (this.images.length === 0) {
					uni.showToast({ title: '请先添加一张图片作为配文参考', icon: 'none' })
					return
				}
				this.$refs.aiPopup.open()
			},
			closeAiPopup() {
				if (!this.isGenerating) {
					this.$refs.aiPopup.close()
				}
			},
			generateCaption() {
				if (this.isGenerating) return
				if (this.images.length === 0) return
				
				this.isGenerating = true
				
				const filePath = this.images[0].url;
				
				// 检查图片大小，如果超过 1MB (1048576 bytes) 则进行压缩
				uni.getFileInfo({
					filePath: filePath,
					success: (infoRes) => {
						if (infoRes.size > 1024 * 1024) {
							// 大于 1MB，进行压缩
							uni.compressImage({
								src: filePath,
								quality: 60, // 压缩质量
								success: (compressRes) => {
									this.doGenerateCaptionUpload(compressRes.tempFilePath);
								},
								fail: () => {
									// 压缩失败则尝试原图上传（后端会抛出超过1MB异常）
									this.doGenerateCaptionUpload(filePath);
								}
							});
						} else {
							this.doGenerateCaptionUpload(filePath);
						}
					},
					fail: () => {
						this.doGenerateCaptionUpload(filePath);
					}
				});
			},
			doGenerateCaptionUpload(filePath) {
				uni.uploadFile({
					url: BASE_URL + '/api/ai/ocr/generate-caption',
					filePath: filePath,
					name: 'file',
					formData: {
						length: this.aiForm.length,
						style: this.aiForm.style
					},
					success: (res) => {
						try {
							const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
							if (res.statusCode === 200 && data.caption) {
								// 如果内容不为空，可以选择追加或者替换，这里选择追加
								this.content = this.content ? this.content + '\n' + data.caption : data.caption
								this.closeAiPopup()
								uni.showToast({ title: '配文生成成功', icon: 'success' })
							} else {
								uni.showToast({ title: data.error || '生成失败', icon: 'none' })
							}
						} catch (e) {
							uni.showToast({ title: '解析响应失败', icon: 'none' })
						}
					},
					fail: () => {
						uni.showToast({ title: '网络错误', icon: 'none' })
					},
					complete: () => {
						this.isGenerating = false
					}
				})
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
				
				uni.showLoading({ title: '发布中...' })
				
				const user = uni.getStorageSync('user') || {}
				const userId = user.userId || user.id || 1

				request({
					url: '/api/forum/post/create',
					method: 'POST',
					data: {
						userId: userId,
						title: title || '无标题分享',
						content: this.content,
						images: remoteImages
					}
				}).then(res => {
					uni.hideLoading()
					if (res.code === 200) {
						uni.showToast({ title: '发布成功', icon: 'success' })
						uni.$emit('refresh')
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					} else {
						uni.showToast({ title: res.msg || '发布失败', icon: 'none' })
					}
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({ title: err.message || '网络错误', icon: 'none' })
				})
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
		border-radius: 22rpx;
		background: rgba(255, 255, 255, 0.92);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-btn {
		font-size: 42rpx;
		color: #30435a;
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
			margin-bottom: 40rpx;
			
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
		
		.toolbar {
			display: flex;
			gap: 20rpx;
			
			.tool-btn {
				display: flex;
				align-items: center;
				gap: 8rpx;
				padding: 12rpx 24rpx;
				background: #f8f8f8;
				border-radius: 30rpx;
				
				.tool-icon {
					font-size: 28rpx;
				}
				
				.tool-text {
					font-size: 26rpx;
					color: #666;
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
				background: #4AA9FE;
				color: #fff;
			}
		}
	}

	.tip-text {
		text-align: center;
		font-size: 24rpx;
		color: #999;
		line-height: 1.6;
		padding: 0 40rpx;
	}

	/* AI 弹窗样式 */
	.ai-popup-content {
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		padding: 40rpx 30rpx calc(40rpx + env(safe-area-inset-bottom));
		
		.popup-title {
			text-align: center;
			font-size: 34rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 40rpx;
		}
		
		.section {
			margin-bottom: 40rpx;
			
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
						background: rgba(74, 169, 254, 0.1);
						color: #4AA9FE;
						border-color: #4AA9FE;
					}
				}
			}
		}
		
		.popup-actions {
			display: flex;
			gap: 30rpx;
			margin-top: 60rpx;
			
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
					background: #4AA9FE;
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
			.back-btn, .placeholder { background: #2a2c33; }
			.back-btn, .topbar-title { color: #f4f7fb; }
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
			.tool-btn { background: #2a2c33; .tool-text { color: #aaa; } }
		}

		.publish-btn-wrap .publish-btn {
			background: #2a2c33;
			color: #666;
			&.active {
				background: #5d76bd;
				color: #fff;
			}
		}

		&.ai-popup-content {
			background: #1d1f24;
			.popup-title, .section .section-title { color: #f4f7fb; }
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
</style>