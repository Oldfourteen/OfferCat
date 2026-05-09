<template>
	<!-- 简历预览主页面 -->
	<view class="preview-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<topNavBar title="简历预览" :titleStyle="topNavBarTitleStyle" :customStyle="topNavBarCustomStyle" />
		
		<!-- 页面内容区 -->
		<view class="page-content">
			<!-- 简历纸张容器（模拟A4纸） -->
			<view class="resume-paper" id="resume-paper-view">
				<!-- 头部区域：姓名 + 基本信息 + 头像 -->
				<view class="header-section">
					<view class="header-left">
						<view class="name">{{ resume.real_name || resume.resume_name || '未命名' }}</view>
						<view class="base-info">
							<text v-if="resume.gender">{{ getGenderText(resume.gender) }}</text>
							<text class="separator" v-if="resume.gender && resume.phone">|</text>
							<text v-if="resume.phone">{{ resume.phone }}</text>
							<text class="separator" v-if="(resume.gender || resume.phone) && resume.email">|</text>
							<text v-if="resume.email">{{ resume.email }}</text>
						</view>
					</view>
					<view class="header-right" v-if="resume.photo">
						<image class="photo" :src="resume.photo" mode="aspectFill"></image>
					</view>
				</view>

				<!-- 自我评价 -->
				<view class="section" v-if="resume.self_evaluation">
					<view class="section-title">自我评价</view>
					<view class="section-content" v-html="resume.self_evaluation"></view>
				</view>

				<!-- 教育背景 -->
				<view class="section" v-if="resume.education">
					<view class="section-title">教育背景</view>
					<view class="section-content" v-html="resume.education"></view>
				</view>

				<!-- 在校经历 -->
				<view class="section" v-if="resume.campus_experience">
					<view class="section-title">在校经历</view>
					<view class="section-content" v-html="resume.campus_experience"></view>
				</view>

				<!-- 工作经历 -->
				<view class="section" v-if="resume.work_experience">
					<view class="section-title">工作经历</view>
					<view class="section-content" v-html="resume.work_experience"></view>
				</view>

				<!-- 项目经历 -->
				<view class="section" v-if="resume.project_experience">
					<view class="section-title">项目经历</view>
					<view class="section-content" v-html="resume.project_experience"></view>
				</view>

				<!-- 技能熟练度 -->
				<view class="section" v-if="resume.skills">
					<view class="section-title">技能熟练度</view>
					<view class="section-content" v-html="resume.skills"></view>
				</view>
			</view>
		</view>

		<!-- 底部操作栏：继续编辑 + 导出PDF -->
		<view class="bottom-actions-wrap">
			<view class="bottom-actions">
				<view class="action-btn cancel-btn" @click="handleBack">继续编辑</view>
				<view class="action-btn export-btn" @click="handleExportPdf">导出PDF</view>
			</view>
			<view class="safe-area-inset-bottom"></view>
		</view>
	</view>
</template>

<script>
	// 顶部导航组件
	import topNavBar from './components/topNavBar.vue'
	// 主题切换混入
	import themeMixin from '@/utils/themeMixin.js'
	// 网络请求工具
	import { request } from '@/api/request.js'
	// 接口基础地址
	import { BASE_URL } from '@/api/config.js'
	// 获取用户信息
	import { getUser } from '@/utils/user.js'

	export default {
		mixins: [themeMixin],
		components: {
			topNavBar
		},
		data() {
			return {
				// 简历完整数据
				resume: {}
			}
		},
		computed: {
			// 导航栏标题样式（适配深色/浅色模式）
			topNavBarTitleStyle() {
				return { color: this.theme === 'dark' ? '#f4f7fb' : '#000', fontSize: '18px' }
			},
			// 导航栏背景样式
			topNavBarCustomStyle() {
				return { backgroundColor: this.theme === 'dark' ? '#1a1c22' : '#fff' }
			}
		},
		onLoad(options) {
			// 页面加载：解析传入的简历数据
			if (options.resume_data) {
				try {
					this.resume = JSON.parse(decodeURIComponent(options.resume_data))
				} catch (e) {
					console.error('解析简历数据失败:', e)
				}
			}
		},
		methods: {
			// 性别编码转文字：1=男 2=女
			getGenderText(genderCode) {
				if (Number(genderCode) === 1) return '男'
				if (Number(genderCode) === 2) return '女'
				return ''
			},
			// 返回编辑页面
			handleBack() {
				uni.navigateBack()
			},
			// 调用后端接口导出PDF
			async handleExportPdf() {
				uni.showLoading({ title: '正在生成PDF...' })
				
				try {
					// 去除 HTML 标签，提取纯文本
					const stripHtml = (html) => {
						if (!html) return '';
						let text = String(html).replace(/<br\s*\/?>/gi, '\n');
						text = text.replace(/<\/p>/gi, '\n');
						text = text.replace(/<[^>]+>/g, '');
						text = text.replace(/&nbsp;/g, ' ');
						return text.replace(/\n\s*\n/g, '\n').trim();
					};

					// 获取当前用户ID
					const storedUser = getUser() || {}
					const userId = storedUser.userId || null

					// 请求后端生成简历PDF
					const res = await request({
						url: '/api/resume/create',
						method: 'POST',
						data: {
							userId: userId,
							resumeName: this.resume.resume_name,
							realName: this.resume.real_name,
							gender: this.resume.gender,
							phone: this.resume.phone,
							email: this.resume.email,
							photo: this.resume.photo,
							campusExperience: stripHtml(this.resume.campus_experience),
							workExperience: stripHtml(this.resume.work_experience),
							projectExperience: stripHtml(this.resume.project_experience),
							selfEvaluation: stripHtml(this.resume.self_evaluation),
							aiScore: 0.0,
							aiEvaluation: '',
							resumeStatus: 1
						}
					})
					
					uni.hideLoading()
					uni.showToast({ title: 'PDF导出成功', icon: 'success' })
					
					// 拼接PDF下载链接
					const realPdfUrl = `${BASE_URL}/api/resume/export/pdf/${res.resumeId}`
					
					// 弹出复制链接确认框
					uni.showModal({
						title: '导出成功',
						content: 'PDF 已生成，是否复制下载链接？\n\n' + realPdfUrl,
						confirmText: '复制链接',
						cancelText: '关闭',
						success: (resModal) => {
							if (resModal.confirm) {
								uni.setClipboardData({
									data: realPdfUrl,
									success: () => {
										uni.showToast({ title: '链接已复制', icon: 'none' })
									}
								})
							}
						}
					})
				} catch (e) {
					console.error('PDF导出失败:', e)
					uni.hideLoading()
					uni.showToast({ title: 'PDF导出失败', icon: 'none' })
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.preview-page {
		min-height: 100vh;
		background-color: #f3f4f6;
		display: flex;
		flex-direction: column;
		
		&.theme-dark {
			background-color: #111216;
			
			.resume-paper {
				background-color: #1f2128;
				box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
				
				.header-section .name {
					color: #f4f7fb;
				}
				.header-section .base-info {
					color: rgba(255, 255, 255, 0.7);
				}
				.section-title {
					color: #f4f7fb;
					border-bottom-color: rgba(255, 255, 255, 0.1);
				}
				.section-content {
					color: rgba(255, 255, 255, 0.8);
				}
			}
			
			.bottom-actions-wrap {
				background-color: rgba(17, 18, 22, 0.9);
				
				.cancel-btn {
					background-color: #2b2d35;
					color: #f4f7fb;
				}
			}
		}

		.page-content {
			flex: 1;
			margin-top: calc(44px + var(--status-bar-height));
			margin-bottom: calc(80px + env(safe-area-inset-bottom));
			padding: 20px 16px;
			overflow-y: auto;
		}

		.resume-paper {
			background-color: #ffffff;
			border-radius: 12px;
			padding: 24px;
			box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
			min-height: 800px;
			
			.header-section {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				margin-bottom: 30px;
				
				.header-left {
					flex: 1;
					
					.name {
						font-size: 28px;
						font-weight: bold;
						color: #111827;
						margin-bottom: 12px;
					}
					
					.base-info {
						font-size: 15px;
						color: #4b5563;
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						
						.separator {
							margin: 0 8px;
							color: #d1d5db;
						}
					}
				}
				
				.header-right {
					margin-left: 20px;
					
					.photo {
						width: 80px;
						height: 104px;
						border-radius: 6px;
						background-color: #f3f4f6;
						object-fit: cover;
					}
				}
			}
			
			.section {
				margin-bottom: 24px;
				
				.section-title {
					font-size: 18px;
					font-weight: bold;
					color: #111827;
					padding-bottom: 8px;
					margin-bottom: 16px;
					border-bottom: 1px solid #e5e7eb;
				}
				
				.section-content {
					font-size: 14px;
					color: #374151;
					line-height: 1.6;
					
					/* 穿透富文本内部样式 */
					:deep(div), :deep(span), :deep(p) {
						max-width: 100%;
						word-break: break-all;
					}
				}
			}
		}

		.bottom-actions-wrap {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(10px);
			z-index: 100;
			box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.04);

			.bottom-actions {
				display: flex;
				padding: 10px 20px;
				gap: 15px;

				.action-btn {
					flex: 1;
					height: 44px;
					border-radius: 22px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 16px;
					font-weight: bold;
					transition: all 0.2s;
					
					&:active {
						transform: scale(0.98);
					}
				}

				.cancel-btn {
					background-color: #f3f4f6;
					color: #4b5563;
				}

				.export-btn {
					background-color: #1677ff;
					color: #fff;
				}
			}

			.safe-area-inset-bottom {
				height: env(safe-area-inset-bottom);
			}
		}
	}
</style>