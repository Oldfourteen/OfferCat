<template>
	<!-- 附件简历主页面容器 -->
	<view class="container" :class="themeClass">
		<!-- 自定义导航栏：状态栏 + 标题栏 -->
		<view class="nav-header">
			<view class="status-bar"></view>
			<view class="nav-bar">
				<!-- 返回按钮 -->
				<view class="back-btn" @click="goBack">
					<text class="back-icon">←</text>
				</view>
				<text class="nav-title">附件简历</text>
				<view class="nav-right"></view>
			</view>
		</view>

		<!-- 页面主体内容区 -->
		<view class="content-body">
			<!-- 页面说明文字 -->
			<view class="header-desc">
				<text class="desc-text">支持PDF/Word格式，一键上传投递</text>
			</view>

			<!-- 功能卡片：制作附件简历 -->
			<view class="action-card make-card">
				<view class="icon-wrap">
					<image src="/static/png/inline/aeab456dbf2e.png" class="icon-img" mode="aspectFit" />
				</view>
				<view class="text-wrap">
					<text class="card-title">制作附件简历</text>
					<text class="card-desc">海量专业模板，一键生成精美简历</text>
				</view>
				<button class="action-btn" @click="handleMake">去制作</button>
			</view>

			<!-- 功能卡片：上传附件简历 + AI润色 -->
			<view class="action-card upload-card">
				<view class="icon-wrap">
					<image src="/static/png/inline/aeab456dbf2e.png" class="icon-img" mode="aspectFit" />
				</view>
				<view class="text-wrap">
					<text class="card-title">上传附件简历</text>
					<text class="card-desc">支持 PDF, DOC, DOCX 格式，最大 10MB</text>
				</view>
				<button class="action-btn" @click="handleUpload">去上传</button>
			</view>
			
			<!-- AI润色结果展示卡片：有内容时显示 -->
			<view v-if="polishedText" class="result-card">
				<view class="result-header">
					<text class="result-title">AI 一键润色结果</text>
					<text class="copy-btn" @click="copyPolishedText">复制文本</text>
				</view>
				<scroll-view scroll-y class="result-content">
					<text class="result-text">{{ polishedText }}</text>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
// 主题样式混入
import themeMixin from '@/utils/themeMixin.js'
// 接口基础地址配置
import { BASE_URL } from '@/api/config'
// 用户登录令牌工具
import { getToken } from '@/utils/token'

export default {
	mixins: [themeMixin],
	data() {
		return {
			// AI润色后的简历文本
			polishedText: ''
		}
	},
	methods: {
		// 返回上一页
		goBack() {
			uni.navigateBack()
		},
		// 点击：制作附件简历
		handleMake() {
			uni.showToast({ title: '前往制作附件简历', icon: 'none' })
		},
		// 点击：上传附件简历（区分微信小程序/其他端）
		handleUpload() {
			// 微信小程序：选择聊天文件
			// #ifdef MP-WEIXIN
			uni.chooseMessageFile({
				count: 1,
				type: 'file',
				extension: ['.pdf'],
				success: (res) => {
					this.uploadPdfForPolish(res.tempFiles[0].path)
				},
				fail: (err) => {
					console.error('chooseMessageFile failed', err)
				}
			})
			// #endif
			
			// 非微信小程序：直接选择文件
			// #ifndef MP-WEIXIN
			uni.chooseFile({
				count: 1,
				extension: ['.pdf'],
				success: (res) => {
					this.uploadPdfForPolish(res.tempFilePaths[0])
				},
				fail: (err) => {
					console.error('chooseFile failed', err)
				}
			})
			// #endif
		},
		// 上传PDF文件并调用AI润色接口
		uploadPdfForPolish(filePath) {
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
						// 核心记忆：安全解析 JSON，防止跨端报错
						let resData = typeof uploadRes.data === 'string' ? uploadRes.data : JSON.stringify(uploadRes.data)
						
						if (resData.startsWith('{')) {
							const jsonObj = JSON.parse(resData)
							// 接口返回错误码判断
							if (jsonObj.code !== undefined && jsonObj.code !== 200) {
								uni.showToast({ title: jsonObj.message || '润色失败', icon: 'none' })
								return
							}
							this.polishedText = jsonObj.data || jsonObj
						} else {
							// 直接返回文本格式
							this.polishedText = resData
						}
						uni.showToast({ title: '润色成功', icon: 'success' })
					} catch (e) {
						// 解析异常兜底处理
						this.polishedText = typeof uploadRes.data === 'string' ? uploadRes.data : JSON.stringify(uploadRes.data)
						uni.showToast({ title: '润色成功', icon: 'success' })
					}
				},
				// 上传失败回调
				fail: (err) => {
					uni.hideLoading()
					uni.showToast({ title: '上传失败', icon: 'none' })
					console.error(err)
				}
			})
		},
		// 复制AI润色后的文本到剪贴板
		copyPolishedText() {
			uni.setClipboardData({
				data: this.polishedText,
				success: () => {
					uni.showToast({ title: '复制成功', icon: 'success' })
				}
			})
		}
	}
}
</script>

<style scoped>
.container {
	background-color: #f5f5f5;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
.nav-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background-color: #4AA9FE;
	color: #ffffff;
}
.status-bar {
	height: var(--status-bar-height);
	width: 100%;
}
.nav-bar {
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;
}
.back-btn {
	padding: 5px 10px 5px 0;
	display: flex;
	align-items: center;
}
.back-icon {
	font-size: 24px;
	font-weight: bold;
}
.nav-title {
	font-size: 16px;
	font-weight: bold;
}
.nav-right {
	width: 40px;
}
.content-body {
	padding: 20px;
	padding-top: calc(var(--status-bar-height) + 64px);
}
.header-desc {
	margin-bottom: 20px;
}
.desc-text {
	font-size: 14px;
	color: #666;
}
.action-card {
	background-color: #ffffff;
	border-radius: 12px;
	padding: 24px;
	margin-bottom: 20px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}
.icon-wrap {
	width: 64px;
	height: 64px;
	border-radius: 32px;
	background: transparent;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 16px;
}
.icon-img {
	width: 40px;
	height: 40px;
}
.text-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
}
.card-title {
	font-size: 18px;
	font-weight: bold;
	color: #333333;
	margin-bottom: 8px;
}
.card-desc {
	font-size: 13px;
	color: #999999;
}
.action-btn {
	width: 80%;
	height: 44px;
	line-height: 44px;
	border-radius: 22px;
	background-color: #5d76bd;
	color: #ffffff;
	font-size: 16px;
	font-weight: bold;
}
.result-card {
	background-color: #ffffff;
	border-radius: 12px;
	padding: 20px;
	margin-bottom: 20px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
}
.result-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
	border-bottom: 1px solid #f0f0f0;
	padding-bottom: 10px;
}
.result-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
}
.copy-btn {
	font-size: 13px;
	color: #5d76bd;
	padding: 4px 10px;
	background-color: rgba(93, 118, 189, 0.1);
	border-radius: 12px;
}
.result-content {
	max-height: 300px;
	width: 100%;
}
.result-text {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
	white-space: pre-wrap;
	word-break: break-all;
}

/* 深色模式 */
.container.theme-dark {
	background-color: #111216;
}
.container.theme-dark .nav-header {
	background-color: #1a1c22;
}
.container.theme-dark .nav-title,
.container.theme-dark .back-icon {
	color: #f4f7fb;
}
.container.theme-dark .desc-text {
	color: rgba(255, 255, 255, 0.58);
}
.container.theme-dark .action-card {
	background-color: #1d1f24;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
.container.theme-dark .icon-wrap {
	background: rgba(93, 118, 189, 0.15);
}
.container.theme-dark .card-title {
	color: #f4f7fb;
}
.container.theme-dark .card-desc {
	color: rgba(255, 255, 255, 0.48);
}
.container.theme-dark .action-btn {
	background-color: rgba(93, 118, 189, 0.8);
	color: #ffffff;
}
.container.theme-dark .result-card {
	background-color: #1d1f24;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
.container.theme-dark .result-header {
	border-bottom-color: rgba(255, 255, 255, 0.1);
}
.container.theme-dark .result-title {
	color: #f4f7fb;
}
.container.theme-dark .result-text {
	color: rgba(255, 255, 255, 0.7);
}
.container.theme-dark .copy-btn {
	background-color: rgba(93, 118, 189, 0.2);
}
</style>
