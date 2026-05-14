<template>
	<view class="ai-image-container" :class="themeClass">
		<view class="header-area">
			<!-- 模块说明区：介绍 AI 形象照的用途和上传要求。 -->
			<text class="title">AI职业形象——简历照一键式生成</text>
			<text class="subtitle">上传你的照片，AI为你生成专业的职业形象照，让你的简历更出众。</text>
		</view>

		<view class="main-card">
			<!-- Upload Section -->
			<view class="upload-section" v-if="!originalImage" @click="chooseImage">
				<view class="upload-placeholder">
					<text class="upload-camera-icon">📷</text>
					<text class="upload-text">点击上传正面照片</text>
					<text class="upload-tip">支持 JPG、PNG 格式，清晰的面部有助于生成更好的效果</text>
				</view>
			</view>

			<!-- Preview & Generate Section -->
			<view class="preview-section" v-else>
				<view class="images-display">
					<!-- Original Image -->
					<view class="image-box" @click="previewImg(originalImage)">
						<image :src="originalImage" mode="aspectFit" class="preview-img"></image>
						<view class="tag">原图</view>
						<view class="delete-btn" @click.stop="clearImage" v-if="!isGenerating && !generatedImage">
							<text class="delete-icon-x">×</text>
						</view>
						<view class="zoom-hint">
							<view class="zoom-hint-icon"></view>
						</view>
					</view>

					<!-- Arrow -->
					<view class="arrow-icon" v-if="generatedImage || isGenerating">
						<text class="arrow-between">→</text>
					</view>

					<!-- Generated Image -->
					<view class="image-box result-box" v-if="generatedImage || isGenerating" @click="previewImg(generatedImage)">
						<view class="generating-mask" v-if="isGenerating">
							<view class="spinner"></view>
							<text class="generating-text">AI 正在绘制中...</text>
						</view>
						<image v-if="generatedImage" :src="generatedImage" mode="aspectFit" class="preview-img"></image>
						<view class="tag result-tag" v-if="generatedImage">AI 生成图</view>
						<view class="zoom-hint" v-if="generatedImage">
							<view class="zoom-hint-icon"></view>
						</view>
					</view>
				</view>

				<!-- Controls -->
				<view class="controls-area" v-if="!generatedImage">
					<!-- 风格选择与自定义提示词用于拼接后端生成参数。 -->
					<view class="style-selector">
						<text class="section-label">选择生成风格</text>
						<view class="style-list">
							<view 
								class="style-item" 
								v-for="item in styles" 
								:key="item.id"
								:class="{ active: selectedStyle === item.id }"
								@click="selectedStyle = item.id"
							>
								{{ item.name }}
							</view>
							<view 
								class="style-item"
								:class="{ active: selectedStyle === 'custom' }"
								@click="selectedStyle = 'custom'"
							>
								自定义
							</view>
						</view>
					</view>

					<view class="prompt-input-area" v-if="selectedStyle === 'custom'">
						<text class="section-label">自定义提示词</text>
						<textarea
							class="prompt-textarea"
							v-model="customPrompt"
							placeholder="输入额外要求，例如：换成黑色西装，蓝色背景，面带微笑..."
							:maxlength="200"
							:disabled="isGenerating"
						/>
					</view>

					<button class="generate-btn" @click="generateImage" :disabled="isGenerating">
						<text v-if="!isGenerating" class="btn-icon generate-gear">⚙</text>
						{{ isGenerating ? '正在生成...' : '开始生成职业形象' }}
					</button>
					<text class="generate-disclaimer">
						请慎重使用AI生图，AI生图可能会对个人面部出现失真的问题
					</text>
				</view>

				<!-- Result Actions -->
				<view class="result-actions" v-if="generatedImage">
					<!-- 生成成功后可以重新制作，或将结果保存到系统相册。 -->
					<button class="action-btn outline" @click="resetAll">重新制作</button>
					<button class="action-btn primary" @click="saveImage">保存到相册</button>
				</view>
			</view>
		</view>

		<view class="page-footer-note">
			<text class="footer-note-text">
				该项目更推荐作为预设方案，以及美术参考，真实的面试证件照更推荐使用真实的照片，本项目可以参考个人形象美化，如何以更适合自己的形象去参与到面试中
			</text>
		</view>
	</view>
</template>

<script>
import { BASE_URL } from '@/api/config';
import { request } from '@/api/request';

export default {
	props: {
		theme: {
			type: String,
			default: 'light'
		}
	},
	data() {
		return {
			// 原图、生成图和生成状态共同驱动整个交互流程。
			originalImage: '',
			generatedImage: '',
			isGenerating: false,
			selectedStyle: 'professional',
			customPrompt: '',
			styles: [
				{ id: 'professional', name: '商务正装' },
				{ id: 'casual', name: '职场休闲' },
				{ id: 'tech', name: '科技极客' },
				{ id: 'art', name: '艺术创意' }
			],
			// 与后端表结构保持一致的数据，便于后续接入持久化保存。
			careerPortrait: {
				portrait_id: null,
				user_id: null,
				image_url: '',
				create_time: ''
			}
		}
	},
	computed: {
		themeClass() {
			// 根节点主题类用于统一切换整套配色与输入区样式。
			return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
		}
	},
	methods: {
		chooseImage() {
			// 每次重新选图时，顺带清空旧结果与自定义提示词。
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.originalImage = res.tempFilePaths[0];
					this.generatedImage = '';
					this.customPrompt = '';
				}
			});
		},
		clearImage() {
			// 删除原图时同步清理生成结果，回到初始上传态。
			this.originalImage = '';
			this.generatedImage = '';
			this.customPrompt = '';
		},
		previewImg(url) {
			// 任意预览图都复用系统图片预览能力放大查看细节。
			if (!url) return;
			uni.previewImage({
				urls: [url],
				current: url
			});
		},
		async generateImage() {
			// 核心流程：压缩原图 -> 上传生成 -> 解析返回结果 -> 更新展示态。
			if (!this.originalImage || this.isGenerating) return;
			
			this.isGenerating = true;
			
			try {
				const prompt = this.customPrompt.trim();
				console.log('Selected Style:', this.selectedStyle, 'Custom Prompt:', prompt);
				
				// 先压缩图片，降低上传体积并减少生成等待时间。
				const compressRes = await new Promise((resolve) => {
					uni.compressImage({
						src: this.originalImage,
						quality: 80,
						success: res => resolve(res.tempFilePath),
						fail: () => resolve(this.originalImage)
					});
				});
				
				// 调用后端接口
				const resData = await new Promise((resolve, reject) => {
					uni.uploadFile({
						url: `${BASE_URL}/api/ai/images/job-avatar`,
						filePath: compressRes,
						name: 'image',
						formData: {
							style: this.selectedStyle,
							customPrompt: prompt
						},
						timeout: 60000,
						success: (res) => {
							if (res.statusCode >= 200 && res.statusCode < 300) {
								try {
									const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
									resolve(data);
								} catch (e) {
									reject(new Error('返回数据格式错误'));
								}
							} else {
								reject(new Error(`生成失败(${res.statusCode})`));
							}
						},
						fail: (err) => reject(new Error(err.errMsg || '网络错误'))
					});
				});
				
				// 同时兼容统一响应壳与直接返回结果两种接口格式。
				const res = resData.code !== undefined ? resData.data : resData;
				
				if (!res || res.error) {
					throw new Error((res && res.error) || (resData && resData.message) || '生成失败，请重试');
				}
				
				if (res.urls && res.urls.length > 0) {
					let imgUrl = res.urls[0];
					if (imgUrl.startsWith('/')) {
						imgUrl = BASE_URL + imgUrl;
					}
					this.generatedImage = imgUrl;
					
					this.careerPortrait = {
						portrait_id: null,
						user_id: 1, 
						image_url: this.generatedImage,
						create_time: new Date().toISOString()
					};
					
					uni.showToast({
						title: '生成成功',
						icon: 'success'
					});
				} else {
					throw new Error('返回的图片数据为空');
				}
			} catch (err) {
				console.error('Generate image failed:', err);
				uni.showToast({
					title: err.message || '生成失败，请重试',
					icon: 'none',
					duration: 3000
				});
			} finally {
				this.isGenerating = false;
			}
		},
		saveToDatabase(data) {
			// 预留数据库持久化入口，当前仅保留调试说明。
			// 模拟发送数据到后端 career_portrait 表的 API 请求
			console.log('保存到数据库的数据：', data);
			// uni.request({
			// 	url: '/api/career-portrait',
			// 	method: 'POST',
			// 	data: {
			// 		user_id: data.user_id,
			// 		image_url: data.image_url
			// 	}
			// })
		},
		resetAll() {
			// 重新制作会清空本次上传和生成过程中的全部中间状态。
			this.originalImage = '';
			this.generatedImage = '';
			this.isGenerating = false;
			this.customPrompt = '';
		},
		saveImage() {
			if (!this.generatedImage) return;
			
			// 网络地址需先下载到本地临时目录，才能调用系统相册保存能力。
			if (this.generatedImage.startsWith('http')) {
				uni.showLoading({ title: '保存中...' });
				uni.downloadFile({
					url: this.generatedImage,
					success: (res) => {
						if (res.statusCode === 200) {
							this.doSave(res.tempFilePath);
						} else {
							uni.hideLoading();
							uni.showToast({ title: '下载图片失败', icon: 'none' });
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({ title: '网络错误', icon: 'none' });
					}
				});
			} else {
				this.doSave(this.generatedImage);
			}
		},
		doSave(filePath) {
			// 实际保存动作统一封装，兼容本地路径和下载后的临时路径。
			uni.saveImageToPhotosAlbum({
				filePath: filePath,
				success: () => {
					uni.hideLoading();
					uni.showToast({
						title: '已保存到相册',
						icon: 'success'
					});
				},
				fail: (err) => {
					uni.hideLoading();
					console.error('Save image failed', err);
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					});
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.ai-image-container {
	padding: 10rpx 0;
}

.header-area {
	margin-bottom: 24rpx;
	padding: 0 10rpx;
	
	.title {
		display: block;
		font-size: 36rpx;
		font-weight: 800;
		color: #111827;
		margin-bottom: 12rpx;
	}
	
	.subtitle {
		display: block;
		font-size: 26rpx;
		color: #6B7280;
		line-height: 1.5;
	}
}

.main-card {
	background: #FFFFFF;
	border-radius: 24rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);
}

.page-footer-note {
	margin-top: 28rpx;
	padding: 0 10rpx 8rpx;
}

.footer-note-text {
	display: block;
	font-size: 22rpx;
	line-height: 1.55;
	color: #9CA3AF;
	text-align: justify;
}

.upload-section {
	width: 100%;
	height: 400rpx;
	background: #F9FAFB;
	border: 3rpx dashed #D1D5DB;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
	
	&:active {
		background: #F3F4F6;
	}
	
	.upload-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;

		.upload-camera-icon {
			font-size: 96rpx;
			line-height: 1;
		}
		
		.upload-text {
			margin-top: 20rpx;
			font-size: 30rpx;
			font-weight: 600;
			color: #374151;
		}
		
		.upload-tip {
			margin-top: 12rpx;
			font-size: 24rpx;
			color: #9CA3AF;
			text-align: center;
			max-width: 80%;
		}
	}
}

.preview-section {
	display: flex;
	flex-direction: column;
	gap: 40rpx;
}

.images-display {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20rpx;
}

.image-box {
	position: relative;
	width: 48%;
	aspect-ratio: 3/4;
	border-radius: 16rpx;
	overflow: hidden;
	background: #F3F4F6;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
	border: 2rpx solid #F3F4F6;
	transition: transform 0.2s ease;
	
	&:active {
		transform: scale(0.98);
	}
	
	.preview-img {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.tag {
		position: absolute;
		top: 16rpx;
		left: 16rpx;
		background: rgba(0, 0, 0, 0.6);
		color: #FFF;
		font-size: 22rpx;
		padding: 4rpx 16rpx;
		border-radius: 20rpx;
		backdrop-filter: blur(4px);
		pointer-events: none;
	}
	
	.result-tag {
		background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
	}
	
	.delete-btn {
		position: absolute;
		top: 16rpx;
		right: 16rpx;
		width: 50rpx;
		height: 50rpx;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(4px);
		z-index: 10;
		
		&:active {
			background: rgba(0, 0, 0, 0.7);
		}

		.delete-icon-x {
			color: #fff;
			font-size: 40rpx;
			line-height: 1;
			font-weight: 300;
		}
	}
	
	.zoom-hint {
		position: absolute;
		bottom: 14rpx;
		right: 14rpx;
		width: 52rpx;
		height: 52rpx;
		background: rgba(30, 30, 30, 0.55);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1rpx solid rgba(255, 255, 255, 0.14);
		box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.22);
		pointer-events: none;

		/* SVG 放大镜：避免 text + 字符宽度在各端基线偏移导致视觉不居中 */
		.zoom-hint-icon {
			width: 28rpx;
			height: 28rpx;
			flex-shrink: 0;
			background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='M16.65 16.65 21 21'/%3E%3C/svg%3E");
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 26rpx 26rpx;
		}
	}
}

.arrow-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	.arrow-between {
		font-size: 48rpx;
		line-height: 1;
		color: #9CA3AF;
	}
}

.generating-mask {
	position: absolute;
	inset: 0;
	background: rgba(255, 255, 255, 0.9);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 10;
	
	.spinner {
		width: 60rpx;
		height: 60rpx;
		border: 6rpx solid #E5E7EB;
		border-top-color: #3B82F6;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 20rpx;
	}
	
	.generating-text {
		font-size: 26rpx;
		color: #3B82F6;
		font-weight: 500;
	}
}

@keyframes spin {
	to { transform: rotate(360deg); }
}

.controls-area {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.section-label {
	display: block;
	font-size: 28rpx;
	font-weight: 600;
	color: #374151;
	margin-bottom: 16rpx;
	
	.optional {
		font-size: 24rpx;
		font-weight: 400;
		color: #9CA3AF;
		margin-left: 8rpx;
	}
}

.style-selector {
	.style-list {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
		
		.style-item {
			padding: 12rpx 28rpx;
			background: #F3F4F6;
			color: #4B5563;
			font-size: 26rpx;
			border-radius: 100rpx;
			border: 2rpx solid transparent;
			transition: all 0.2s ease;
			
			&.active {
				background: #EFF6FF;
				color: #3B82F6;
				border-color: #3B82F6;
				font-weight: 500;
			}
		}
	}
}

.prompt-input-area {
	.prompt-textarea {
		width: 100%;
		height: 160rpx;
		background: #F9FAFB;
		border: 2rpx solid #E5E7EB;
		border-radius: 16rpx;
		padding: 24rpx;
		font-size: 28rpx;
		color: #111827;
		box-sizing: border-box;
		transition: border-color 0.2s ease;
		line-height: 1.5;
		
		&:focus {
			border-color: #3B82F6;
			background: #FFFFFF;
		}
		
		&[disabled] {
			background: #F3F4F6;
			color: #9CA3AF;
		}
	}
}

.generate-btn {
	background: #6479C1;
	color: #FFF;
	border-radius: 100rpx;
	font-size: 32rpx;
	font-weight: 600;
	height: 96rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	box-shadow: 0 8rpx 20rpx rgba(100, 121, 193, 0.35);
	margin-top: 8rpx;
	
	&::after {
		border: none;
	}
	
	&[disabled] {
		background: #9CA3AF;
		box-shadow: none;
		color: #F3F4F6;
	}
	
	.btn-icon {
		margin-right: 12rpx;
	}

	.generate-gear {
		font-size: 36rpx;
		line-height: 1;
		color: #fff;
	}
}

.generate-disclaimer {
	display: block;
	margin-top: 20rpx;
	padding: 0 8rpx;
	font-size: 20rpx;
	line-height: 1.55;
	color: #9CA3AF;
	text-align: center;
}

.result-actions {
	display: flex;
	gap: 24rpx;
	
	.action-btn {
		flex: 1;
		height: 88rpx;
		border-radius: 100rpx;
		font-size: 30rpx;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		
		&::after {
			border: none;
		}
		
		&.outline {
			background: #FFF;
			color: #4B5563;
			border: 2rpx solid #D1D5DB;
		}
		
		&.primary {
			background: #3B82F6;
			color: #FFF;
			box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.2);
		}
	}
}

/* Dark Theme Styles */
.theme-dark {
	.header-area {
		.title { color: #F9FAFB; }
		.subtitle { color: #9CA3AF; }
	}
	
	.main-card {
		background: #1F2937;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.2);
	}
	
	.upload-section {
		background: #374151;
		border-color: #4B5563;
		
		&:active { background: #4B5563; }
		
		.upload-placeholder {
			.upload-text { color: #E5E7EB; }
			.upload-tip { color: #9CA3AF; }
		}
	}
	
	.image-box {
		background: #374151;
		border-color: #4B5563;
	}
	
	.generating-mask {
		background: rgba(31, 41, 55, 0.9);
		
		.spinner { border-color: #4B5563; border-top-color: #60A5FA; }
		.generating-text { color: #60A5FA; }
	}
	
	.section-label { color: #E5E7EB; }
	
	.style-selector {
		.style-list .style-item {
			background: #374151;
			color: #D1D5DB;
			
			&.active {
				background: rgba(59, 130, 246, 0.2);
				color: #60A5FA;
				border-color: #60A5FA;
			}
		}
	}
	
	.prompt-input-area {
		.prompt-textarea {
			background: #374151;
			border-color: #4B5563;
			color: #F9FAFB;
			
			&:focus {
				border-color: #60A5FA;
				background: #1F2937;
			}
			
			&[disabled] {
				background: #1F2937;
				color: #6B7280;
			}
		}
	}
	
	.result-actions .action-btn.outline {
		background: #374151;
		color: #E5E7EB;
		border-color: #4B5563;
	}

	.footer-note-text {
		color: #9CA3AF;
	}
}
</style>
