<template>
	<view class="resume-card attachment-resume" :class="themeClass">
		<view class="card-header">
			<!-- 标题区说明附件简历支持上传与生成两种处理方式。 -->
			<view class="header-main">
				<text class="title">附件简历</text>
				<text class="subtitle">支持多种格式，一键投递</text>
			</view>
		</view>
		<view class="card-body">
			<!-- 主按钮根据是否有润色结果，切换为生成 PDF 的入口。 -->
			<view class="action-btn make-btn" :class="{ 'has-result': polishedText }" @click="handleMake">
				<view class="icon-wrap make-icon-wrap">
					<image :src="makeIconSrc" class="btn-icon" mode="aspectFit" />
				</view>
				<view class="text-wrap">
					<text class="btn-title">{{ polishedText ? '生成新PDF' : '制作附件简历' }}</text>
					<text class="btn-desc">{{ polishedText ? '基于润色结果生成' : '海量模板，一键生成' }}</text>
				</view>
			</view>
			<!-- 上传入口：选择附件简历并交给后端润色。 -->
			<view class="action-btn upload-btn" @click="handleUpload">
				<view class="icon-wrap upload-icon-wrap">
					<image :src="uploadIconSrc" class="btn-icon" mode="aspectFit" />
				</view>
				<view class="text-wrap">
					<text class="btn-title">上传附件简历</text>
					<text class="btn-desc">支持 PDF / Word 格式</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { BASE_URL } from '@/api/config'
	import { getToken } from '@/utils/token'

	export default {
		name: 'AttachmentResume',
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		data() {
			return {
				// 保存后端返回的润色文本，作为后续生成 PDF 的输入。
				polishedText: ''
			}
		},
		computed: {
			isDarkTheme() {
				return this.theme === 'dark' || this.theme === 'theme-dark'
			},
			themeClass() {
				return this.isDarkTheme ? 'theme-dark' : ''
			},
			makeIconSrc() {
				return '/static/png/inline/99c52c9cef65.png'
			},
			uploadIconSrc() {
				return this.isDarkTheme
					? '/static/png/inline/upload-dark.png'
					: '/static/png/inline/upload-light.png'
			}
		},
		methods: {
			handleMake() {
				// 先完成 PDF 润色，再允许用户导出新的附件简历。
				if (!this.polishedText) {
					uni.showToast({ title: '请先在下方上传简历进行润色', icon: 'none' })
					return
				}
				uni.showLoading({ title: '正在生成 PDF...', mask: true })
				uni.request({
					url: `${BASE_URL}/api/ai/resume/generate-pdf`,
					method: 'POST',
					header: {
						'Authorization': `Bearer ${getToken()}`,
						'Content-Type': 'application/json'
					},
					data: {
						text: this.polishedText
					},
					responseType: 'arraybuffer',
					success: (res) => {
						uni.hideLoading()
						if (res.statusCode === 200) {
							this.saveAndOpenPdf(res.data)
						} else {
							uni.showToast({ title: '生成失败', icon: 'none' })
						}
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({ title: '网络错误', icon: 'none' })
					}
				})
			},
			saveAndOpenPdf(data) {
				// #ifdef H5
				// H5 直接走浏览器下载能力，不依赖本地文件系统。
				const blob = new Blob([data], { type: 'application/pdf' });
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `polished_resume_${Date.now()}.pdf`;
				document.body.appendChild(a);
				a.click();
				a.remove();
				window.URL.revokeObjectURL(url);
				uni.showToast({ title: 'PDF已下载', icon: 'success' })
				// #endif

				// #ifndef H5
				// 非 H5 需要先落盘，再交给系统文档查看器打开。
				const fs = uni.getFileSystemManager ? uni.getFileSystemManager() : null;
				if (!fs) {
					uni.showToast({ title: '当前环境不支持直接打开 PDF', icon: 'none' })
					return
				}
				
				// 兼容不同环境下的本地用户目录获取
				let basePath = '_doc';
				if (typeof uni.env !== 'undefined' && uni.env.USER_DATA_PATH) {
					basePath = uni.env.USER_DATA_PATH;
				} else if (typeof wx !== 'undefined' && wx.env && wx.env.USER_DATA_PATH) {
					basePath = wx.env.USER_DATA_PATH;
				}

				const filePath = `${basePath}/polished_resume_${Date.now()}.pdf`

				// 将 arraybuffer 转换为 base64 写入，这是跨端最稳妥的二进制文件写入方式
				let base64Data = ''
				try {
					base64Data = uni.arrayBufferToBase64(data)
				} catch (e) {
					uni.showToast({ title: 'PDF 数据转换失败', icon: 'none' })
					return
				}

				fs.writeFile({
					filePath: filePath,
					data: base64Data,
					encoding: 'base64',
					success: () => {
						uni.openDocument({
							filePath: filePath,
							fileType: 'pdf',
							showMenu: true,
							success: () => {
								console.log('打开文档成功')
							},
							fail: (err) => {
								console.error('打开文档失败', err)
								uni.showToast({ title: '无法唤起阅读器，文件已保存至: ' + filePath, icon: 'none', duration: 3000 })
							}
						})
					},
					fail: (err) => {
						console.error('写入文件失败', err)
						uni.showToast({ title: '保存 PDF 失败: ' + (err.errMsg || err.message || ''), icon: 'none', duration: 3000 })
					}
				})
				// #endif
			},
			handleUpload() {
				// #ifdef MP-WEIXIN
				// 小程序优先使用消息文件选择器，用户更容易拿到 PDF 文件。
				uni.chooseMessageFile({
					count: 1,
					type: 'file',
					extension: ['.pdf'],
					success: (res) => {
						this.uploadPdfForPolish(res.tempFiles[0].path)
					}
				})
				// #endif
				
				// #ifndef MP-WEIXIN
				// 在 App 端使用 5+ API 调用原生文件选择器
				// #ifdef APP-PLUS
				const isAndroid = plus.os.name === 'Android'
				if (isAndroid) {
					const Intent = plus.android.importClass("android.content.Intent")
					const intent = new Intent(Intent.ACTION_GET_CONTENT)
					intent.setType("application/pdf")
					intent.addCategory(Intent.CATEGORY_OPENABLE)
					const main = plus.android.runtimeMainActivity()
					main.startActivityForResult(intent, 1)
					
					main.onActivityResult = (requestCode, resultCode, data) => {
						if (requestCode === 1 && resultCode === -1) {
							const uri = data.getData()
							const Uri = plus.android.importClass("android.net.Uri")
							plus.android.importClass(uri)
							
							// 转换 content:// URI 为真实路径
							let filePath = ''
							const resolver = main.getContentResolver()
							const cursor = resolver.query(uri, null, null, null, null)
							if (cursor && cursor.moveToFirst()) {
								const column_index = cursor.getColumnIndexOrThrow("_data")
								filePath = cursor.getString(column_index)
								cursor.close()
							}
							
							if (filePath) {
								this.uploadPdfForPolish(filePath)
							} else {
								uni.showToast({ title: '无法获取文件路径', icon: 'none' })
							}
						}
					}
					return
				}
				// #endif

				// H5 端后备方案
				uni.chooseFile({
					count: 1,
					extension: ['.pdf'],
					success: (res) => {
						this.uploadPdfForPolish(res.tempFilePaths[0])
					}
				})
				// #endif
			},
			uploadPdfForPolish(filePath) {
				// 上传 PDF 后将后端返回的润色文本缓存到当前组件，供生成新 PDF 复用。
				uni.showLoading({ title: 'AI 润色中...', mask: true })
				uni.uploadFile({
					url: `${BASE_URL}/api/ai/resume/polish-pdf`,
					filePath: filePath,
					name: 'file',
					header: {
						'Authorization': `Bearer ${getToken()}`
					},
					success: (uploadRes) => {
						uni.hideLoading()
						try {
							let resData = typeof uploadRes.data === 'string' ? uploadRes.data : JSON.stringify(uploadRes.data)
							if (resData.startsWith('{')) {
								const jsonObj = JSON.parse(resData)
								if (jsonObj.code !== undefined && jsonObj.code !== 200) {
									uni.showToast({ title: jsonObj.message || '润色失败', icon: 'none' })
									return
								}
								this.polishedText = jsonObj.data || jsonObj
							} else {
								this.polishedText = resData
							}
							uni.showToast({ title: '润色成功，现在可以生成 PDF 了', icon: 'none', duration: 2000 })
						} catch (e) {
							this.polishedText = typeof uploadRes.data === 'string' ? uploadRes.data : JSON.stringify(uploadRes.data)
							uni.showToast({ title: '润色成功，现在可以生成 PDF 了', icon: 'none', duration: 2000 })
						}
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({ title: '上传失败', icon: 'none' })
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.resume-card {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
	}

	.card-header {
		margin-bottom: 28rpx;
	}

	.header-main {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8rpx;
	}

	.title {
		font-size: 36rpx;
		font-weight: 700;
		color: #0f172a;
		letter-spacing: 0.5rpx;
		line-height: 1.25;
	}

	.subtitle {
		font-size: 26rpx;
		color: #64748b;
		line-height: 1.4;
		max-width: 100%;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		flex: 1;
		justify-content: center;
	}

	.action-btn {
		width: 100%;
		border-radius: 24rpx;
		padding: 28rpx 32rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		gap: 24rpx;
		box-sizing: border-box;
		background: #f8fafc;
		border: 2rpx solid transparent;
		box-shadow: 0 2rpx 8rpx rgba(15, 23, 42, 0.04);
		transition: transform 0.15s ease, box-shadow 0.15s ease;

		&:active {
			transform: scale(0.985);
		}
	}

	.make-btn {
		background: linear-gradient(135deg, #6b84c9 0%, #4f67b0 100%);
		/* 底部中性阴影 + 品牌色光晕，增强浮起感 */
		box-shadow:
			0 10rpx 22rpx rgba(15, 23, 42, 0.14),
			0 16rpx 36rpx rgba(79, 103, 176, 0.32);

		&:active {
			box-shadow:
				0 5rpx 14rpx rgba(15, 23, 42, 0.1),
				0 8rpx 22rpx rgba(79, 103, 176, 0.26);
		}
	}

	.make-btn.has-result {
		border-color: transparent;
		background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
		box-shadow:
			0 10rpx 22rpx rgba(15, 23, 42, 0.12),
			0 16rpx 36rpx rgba(16, 185, 129, 0.32);

		&:active {
			box-shadow:
				0 5rpx 14rpx rgba(15, 23, 42, 0.08),
				0 8rpx 22rpx rgba(16, 185, 129, 0.24);
		}
	}

	.make-btn.has-result .btn-title {
		color: #ffffff;
	}
	
	.make-btn.has-result .btn-desc {
		color: rgba(255, 255, 255, 0.88);
	}

	.upload-btn {
		background: #ffffff;
		border-color: rgba(93, 118, 189, 0.28);
		box-shadow:
			0 8rpx 20rpx rgba(15, 23, 42, 0.1),
			0 2rpx 8rpx rgba(93, 118, 189, 0.12);

		&:active {
			background: #f8fafc;
			box-shadow:
				0 4rpx 12rpx rgba(15, 23, 42, 0.08),
				0 1rpx 4rpx rgba(93, 118, 189, 0.1);
		}
	}

	.icon-wrap {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.make-icon-wrap {
		background: rgba(255, 255, 255, 0.22);
	}

	.upload-icon-wrap {
		background: rgba(93, 118, 189, 0.12);
	}

	.btn-icon {
		width: 44rpx;
		height: 44rpx;
	}

	.text-wrap {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 6rpx;
		flex: 1;
		min-width: 0;
		text-align: left;
	}

	.btn-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #4f67b0;
		line-height: 1.3;
	}

	.make-btn .btn-title {
		color: #ffffff;
	}

	.btn-desc {
		font-size: 24rpx;
		color: #64748b;
		line-height: 1.35;
		font-weight: 400;
	}
	
	.make-btn .btn-desc {
		color: rgba(255, 255, 255, 0.88);
	}

	.resume-card.theme-dark {
		background: #1d1f24;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);

		.title {
			color: #f4f7fb;
		}

		.subtitle {
			color: rgba(255, 255, 255, 0.55);
		}

		.action-btn {
			background: #2a2c33;
			border-color: rgba(255, 255, 255, 0.06);
			box-shadow: none;

			&:active {
				background: #31333a;
			}
		}

		.make-btn {
			background: linear-gradient(135deg, #4a6fcb 0%, #3165d7 100%);
			border-color: transparent;
			box-shadow:
				0 10rpx 22rpx rgba(0, 0, 0, 0.35),
				0 14rpx 32rpx rgba(49, 101, 215, 0.3);
			
			.btn-title {
				color: #ffffff;
			}
			.btn-desc {
				color: rgba(255, 255, 255, 0.88);
			}

			&:active {
				box-shadow:
					0 5rpx 14rpx rgba(0, 0, 0, 0.28),
					0 8rpx 22rpx rgba(49, 101, 215, 0.22);
			}
		}

		.upload-btn {
			background: #2a2c33;
			border-color: rgba(143, 164, 232, 0.25);
			box-shadow:
				0 10rpx 24rpx rgba(0, 0, 0, 0.45),
				0 2rpx 10rpx rgba(0, 0, 0, 0.25);
		}

		.upload-icon-wrap {
			background: rgba(143, 164, 232, 0.15);
		}

		.make-btn.has-result {
			background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
			border-color: transparent;
			box-shadow:
				0 10rpx 22rpx rgba(0, 0, 0, 0.32),
				0 14rpx 32rpx rgba(16, 185, 129, 0.28);
			
			.btn-title {
				color: #ffffff;
			}
			.btn-desc {
				color: rgba(255, 255, 255, 0.88);
			}
		}

		.btn-title {
			color: #a8b9ea;
		}

		.btn-desc {
			color: rgba(255, 255, 255, 0.52);
		}
	}
</style>
