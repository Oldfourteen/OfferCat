<template>
	<view class="resume-card attachment-resume" :class="themeClass">
		<view class="card-header">
			<!-- 标题区说明附件简历支持上传与生成两种处理方式。 -->
			<text class="title">附件简历</text>
			<text class="subtitle">支持多种格式，一键投递</text>
		</view>
		<view class="card-body">
			<!-- 左侧主按钮根据是否有润色结果，切换为生成 PDF 的主流程入口。 -->
			<view class="action-btn make-btn" :class="{ 'has-result': polishedText }" @click="handleMake">
				<view class="icon-wrap">
					<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDEzOTUwNzc4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwOTg4MSIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik02NjcuOSA5ODQuMmMtOTQuNyAwLTE4My45LTM2LjctMjUxLjItMTAzLjVMNzguNSA1NDIuNEMyNy45IDQ5MS44IDAgNDI0LjUgMCAzNTIuOXMyNy45LTEzOC44IDc4LjUtMTg5LjRTMTk2LjQgODUgMjY3LjkgODVzMTM4LjggMjcuOSAxODkuNCA3OC41bDMzOC4yIDMzOC4yYzY4LjYgNjkuNiA2OC42IDE4Mi41IDAuMiAyNTEuOS02OS40IDcwLjQtMTgzLjEgNzEuMi0yNTMuNiAxLjhMMzE2LjUgNTI5LjhjLTE0LjctMTQuNy0xNC43LTM4LjUgMC01My4xIDE0LjctMTQuNyAzOC41LTE0LjcgNTMuMSAwbDIyNS41IDIyNS41YzQwLjcgNDAuMSAxMDYuOCAzOS43IDE0Ny4xLTEuMiAzOS44LTQwLjMgMzkuOC0xMDUuOSAwLTE0Ni4ybC0zMzgtMzM4Yy03NS4yLTc1LjItMTk3LjQtNzUuMS0yNzIuNiAwLTc1LjEgNzUuMS03NS4xIDE5Ny40IDAgMjcyLjZsMzM4LjIgMzM4LjJjNTMgNTIuNiAxMjMuMyA4MS42IDE5OC4xIDgxLjZoMWM3NS4xLTAuMyAxNDUuNy0yOS44IDE5OC42LTgzLjFDOTc2IDcxNi44IDk3NiA1MzkgODY3LjUgNDI5LjdMNTQxLjkgMTAzLjljLTE0LjctMTQuNy0xNC43LTM4LjUgMC01My4xIDE0LjctMTQuNyAzOC41LTE0LjcgNTMuMSAwbDMyNS43IDMyNS43YzEzNy42IDEzOC42IDEzNy42IDM2NCAwLjEgNTAyLjQtNjcuMSA2Ny42LTE1Ni41IDEwNS0yNTEuNyAxMDUuM2gtMS4yeiIgZmlsbD0iIzI3RDBEOCIgcC1pZD0iMjA5ODgyIj48L3BhdGg+PC9zdmc+" class="attachment-icon" mode="aspectFit" />
				</view>
				<view class="text-wrap">
					<text class="btn-title">{{ polishedText ? '生成新PDF' : '制作附件简历' }}</text>
					<text class="btn-desc">{{ polishedText ? '基于润色结果生成' : '海量模板，一键生成' }}</text>
				</view>
			</view>
			<view class="action-btn upload-btn" @click="handleUpload">
				<!-- 上传入口负责选择附件简历并交给后端进行润色。 -->
				<view class="icon-wrap">
					<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDEzOTUwNzc4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwOTg4MSIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik02NjcuOSA5ODQuMmMtOTQuNyAwLTE4My45LTM2LjctMjUxLjItMTAzLjVMNzguNSA1NDIuNEMyNy45IDQ5MS44IDAgNDI0LjUgMCAzNTIuOXMyNy45LTEzOC44IDc4LjUtMTg5LjRTMTk2LjQgODUgMjY3LjkgODVzMTM4LjggMjcuOSAxODkuNCA3OC41bDMzOC4yIDMzOC4yYzY4LjYgNjkuNiA2OC42IDE4Mi41IDAuMiAyNTEuOS02OS40IDcwLjQtMTgzLjEgNzEuMi0yNTMuNiAxLjhMMzE2LjUgNTI5LjhjLTE0LjctMTQuNy0xNC43LTM4LjUgMC01My4xIDE0LjctMTQuNyAzOC41LTE0LjcgNTMuMSAwbDIyNS41IDIyNS41YzQwLjcgNDAuMSAxMDYuOCAzOS43IDE0Ny4xLTEuMiAzOS44LTQwLjMgMzkuOC0xMDUuOSAwLTE0Ni4ybC0zMzgtMzM4Yy03NS4yLTc1LjItMTk3LjQtNzUuMS0yNzIuNiAwLTc1LjEgNzUuMS03NS4xIDE5Ny40IDAgMjcyLjZsMzM4LjIgMzM4LjJjNTMgNTIuNiAxMjMuMyA4MS42IDE5OC4xIDgxLjZoMWM3NS4xLTAuMyAxNDUuNy0yOS44IDE5OC42LTgzLjFDOTc2IDcxNi44IDk3NiA1MzkgODY3LjUgNDI5LjdMNTQxLjkgMTAzLjljLTE0LjctMTQuNy0xNC43LTM4LjUgMC01My4xIDE0LjctMTQuNyAzOC41LTE0LjcgNTMuMSAwbDMyNS43IDMyNS43YzEzNy42IDEzOC42IDEzNy42IDM2NCAwLjEgNTAyLjQtNjcuMSA2Ny42LTE1Ni41IDEwNS0yNTEuNyAxMDUuM2gtMS4yeiIgZmlsbD0iIzI3RDBEOCIgcC1pZD0iMjA5ODgyIj48L3BhdGg+PC9zdmc+" class="attachment-icon" mode="aspectFit" />
				</view>
				<view class="text-wrap">
					<text class="btn-title">上传附件简历</text>
					<text class="btn-desc">支持PDF/Word格式</text>
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
			// 暗色状态供模板和样式类切换复用。
		isDarkTheme() {
			return this.theme === 'dark' || this.theme === 'theme-dark'
		},
			themeClass() {
				// 输出根节点主题类名，统一控制整张卡片的外观。
			return this.isDarkTheme ? 'theme-dark' : ''
			}
		},
		methods: {
			handleMake() {
				// 先完成 PDF 润色，再允许用户导出新的附件简历。
				if (!this.polishedText) {
					uni.showToast({ title: '请先在右侧上传简历进行润色', icon: 'none' })
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
		margin-bottom: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.title {
		font-size: 34rpx;
		font-weight: bold;
		color: #111827;
	}

	.subtitle {
		font-size: 24rpx;
		color: #9ca3af;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		flex: 1;
		justify-content: center;
	}

	.action-btn {
		width: 100%;
		border-radius: 999rpx;
		padding: 24rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		background: #f8fafc;
		border: 2rpx solid transparent;
		transition: all 0.2s;
		
		&:active {
			transform: scale(0.98);
			background: #f1f5f9;
		}
	}

	.make-btn {
		background: #5d76bd;
		color: #ffffff;
	}

	.make-btn.has-result {
		border-color: #10b981;
		background: #10b981;
	}

	.make-btn.has-result .btn-title {
		color: #ffffff;
	}
	
	.make-btn.has-result .btn-desc {
		color: rgba(255, 255, 255, 0.8);
	}

	.upload-btn {
		background: #eff6ff;
	}

	.icon-wrap {
		display: none; /* 隐藏原有的图标 */
	}

	.text-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 16rpx;
	}

	.btn-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #5d76bd;
		margin-bottom: 0;
	}

	.make-btn .btn-title {
		color: #ffffff;
	}

	.btn-desc {
		font-size: 24rpx;
		color: #6b7280;
	}
	
	.make-btn .btn-desc {
		color: rgba(255, 255, 255, 0.8);
	}

	.resume-card.theme-dark {
		background: #1d1f24;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);

		.title {
			color: #f4f7fb;
		}

		.subtitle {
			color: rgba(255, 255, 255, 0.58);
		}

		.action-btn {
			background: #2a2c33;
			border-color: transparent;
			&:active {
				background: #31333a;
			}
		}

		.make-btn {
			background: #3165d7;
			border-color: transparent;
			
			.btn-title {
				color: #ffffff;
			}
			.btn-desc {
				color: rgba(255, 255, 255, 0.8);
			}
		}

		.upload-btn {
			background: #2a2c33;
		}

		.make-btn.has-result {
			background: #10b981;
			border-color: transparent;
			
			.btn-title {
				color: #ffffff;
			}
			.btn-desc {
				color: rgba(255, 255, 255, 0.8);
			}
		}

		.icon-wrap {
			background: rgba(93, 118, 189, 0.15);
		}

		.btn-title {
			color: #7b90cc;
		}

		.btn-desc {
			color: rgba(255, 255, 255, 0.58);
		}
	}
</style>
