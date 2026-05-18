<template>
	<view class="resume-header">
		<view class="title-row">
			<text class="title">{{ localResumeName || '在线简历' }}</text>
			<view class="edit-icon-placeholder" @click="openEditPopup">
				<text class="btn-text">重命名</text>
			</view>
		</view>
		<view class="completion-card">
			<view class="card-left">
				<view class="completion-rate">
					<text class="label">完善度</text>
					<text class="value">{{ completionStatus.rate }}%</text>
				</view>
				<text class="hint">{{ completionStatus.hint }}</text>
			</view>
			<view class="card-right">
				<view class="avatar-wrap" @click="handleUploadPhoto">
					<!-- 根据是否有真实照片来决定显示默认头像还是用户上传的头像 -->
					<image class="avatar" :src="photoUrl || DEFAULT_AVATAR" mode="aspectFill"></image>
					<view class="avatar-tag">
						<text>{{ photoUrl ? '更换简历照' : '添加简历照' }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	<editResumeNamePopup 
		:visible="isPopupVisible" 
		:initialName="localResumeName" 
		@confirm="onPopupConfirm" 
		@cancel="onPopupCancel" 
	/>
</template>

<script>
	import editResumeNamePopup from './editResumeNamePopup.vue'
	import { DEFAULT_AVATAR } from '@/utils/userProfile.js'
	import { request } from '@/api/request.js'
	import { BASE_URL } from '@/api/config.js'
	import { getToken } from '@/utils/token.js'
	import { getUser } from '@/utils/user.js'

	export default {
		name: 'resumeHeader',
		components: {
			editResumeNamePopup
		},
		emits: ['updatePhoto', 'updateResumeName'],
		props: {
			resumeName: {
				type: String,
				default: '在线简历'
			},
			photoUrl: {
				type: String,
				default: ''
			},
			resumeData: {
				type: Object,
				default: () => ({})
			},
			theme: {
				type: String,
				default: 'light'
			},
			resumeId: {
				type: [Number, String],
				default: null
			}
		},
		computed: {
			completionStatus() {
				// We need to access this.resumeData to trigger reactivity
				const data = this.resumeData;
				if (!data) return { rate: 0, hint: '待完善' };

				const sections = [
					{ key: 'basicInfo', name: '基本信息', isFilled: () => !!(data.name && data.gender && data.phone && data.email) },
					{ key: 'selfEvaluation', name: '自我评价', isFilled: () => !!data.selfEvaluation },
					{ key: 'education', name: '教育背景', isFilled: () => (Array.isArray(data.educationEntries) && data.educationEntries.length > 0) },
					{ key: 'schoolExperience', name: '校园经历', isFilled: () => (Array.isArray(data.schoolExperienceEntries) && data.schoolExperienceEntries.length > 0) },
					{ key: 'workExperience', name: '工作经历', isFilled: () => (Array.isArray(data.workExperienceEntries) && data.workExperienceEntries.length > 0) },
					{ key: 'projectExperience', name: '项目经历', isFilled: () => (Array.isArray(data.projectExperienceEntries) && data.projectExperienceEntries.length > 0) },
					{ key: 'skill', name: '技能特长', isFilled: () => (Array.isArray(data.skillItems) && data.skillItems.length > 0) }
				];

				let filledCount = 0;
				let missingHint = '全部完善，太棒啦！';
				let foundMissing = false;

				for (const section of sections) {
					if (section.isFilled()) {
						filledCount++;
					} else if (!foundMissing) {
						missingHint = `${section.name}待完善`;
						foundMissing = true;
					}
				}

				const rate = sections.length > 0 ? Math.round((filledCount / sections.length) * 100) : 100;

				return {
					rate,
					hint: missingHint
				};
			}
		},
		data() {
			return {
				DEFAULT_AVATAR,
				isPopupVisible: false,
				localResumeName: ''
			}
		},
		watch: {
			resumeName: {
				handler(newVal) {
					this.localResumeName = newVal;
				},
				immediate: true
			},
			resumeData: {
				handler() {
					// This empty handler forces Vue to deeply watch resumeData
					// and recalculate computed properties that depend on it
				},
				deep: true
			}
		},
		methods: {
			openEditPopup() {
				this.isPopupVisible = true
			},
			onPopupConfirm(newName) {
				this.localResumeName = newName
				this.isPopupVisible = false
				this.$emit('updateResumeName', newName)
				// TODO: 这里可以添加发送请求到后端的逻辑，更新数据库中的 resume_name 字段
				// uni.request({ ... })
			},
			onPopupCancel() {
				this.isPopupVisible = false
			},
			handleUploadPhoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						if (tempFilePaths && tempFilePaths.length > 0) {
							const selectedPhoto = tempFilePaths[0];
							
							uni.showLoading({ title: '上传中...' });
							
							this.uploadAvatarToServer(selectedPhoto);
						}
					}
				});
			},
			async uploadAvatarToServer(filePath) {
				try {
					const user = getUser();
					const userId = user && user.userId ? user.userId : '';
					
					// 先创建一个临时简历（如果没有 resumeId）
					let targetResumeId = this.resumeId;
					if (!targetResumeId) {
						const createRes = await request({
							url: '/api/resume/create',
							method: 'POST',
							data: {
								userId: userId,
								resumeName: '临时简历',
								resumeStatus: 1
							}
						});
						targetResumeId = createRes.resumeId;
					}
					
					// 上传头像
					const hdr = {}
					const tok = getToken()
					if (tok) {
						hdr['Authorization'] = `Bearer ${tok}`
					}
					uni.uploadFile({
						url: `${BASE_URL}/api/resume/${targetResumeId}/avatar`,
						filePath: filePath,
						name: 'file',
						header: hdr,
						success: (uploadRes) => {
							uni.hideLoading();
							if (!uploadRes || (uploadRes.statusCode && uploadRes.statusCode >= 400)) {
								console.error('头像上传失败:', uploadRes);
								const code = uploadRes && uploadRes.statusCode ? `(${uploadRes.statusCode})` : ''
								uni.showToast({ title: `上传失败${code}`, icon: 'none' });
								return
							}
							try {
								const parsed = typeof uploadRes.data === 'string' ? JSON.parse(uploadRes.data) : uploadRes.data
								const data =
									parsed && typeof parsed === 'object'
										? (parsed.data && typeof parsed.data === 'object' ? parsed.data : parsed)
										: null
								if (data && data.photo) {
									uni.showToast({ title: '头像上传成功', icon: 'success' });
									const avatarUrl = `${BASE_URL}/api/resume/${targetResumeId}/avatar`;
									this.$emit('updatePhoto', avatarUrl);
								} else {
									const msg = data && data.message ? String(data.message) : '上传失败'
									uni.showToast({ title: msg, icon: 'none' });
								}
							} catch (e) {
								console.error('解析上传结果失败:', e);
								uni.showToast({ title: '上传失败', icon: 'none' });
							}
						},
						fail: (err) => {
							uni.hideLoading();
							console.error('头像上传失败:', err);
							uni.showToast({ title: '上传失败', icon: 'none' });
						}
					});
				} catch (e) {
					uni.hideLoading();
					console.error('创建简历失败:', e);
					uni.showToast({ title: '操作失败', icon: 'none' });
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.resume-header {
		padding: 20px 20px 0;

		.title-row {
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			min-height: 24px;

			.title {
				font-size: 16px;
				color: #9ca3af;
				margin-right: 6px;
			}

			.edit-icon-placeholder {
				padding: 2px 8px;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: rgba(93, 118, 189, 0.12);
				border-radius: 12px;

				.btn-text {
					font-size: 12px;
					color: #5d76bd;
					font-weight: 500;
				}
			}
		}

		.completion-card {
			background: linear-gradient(to right, #eef0f8, #e2e6f4);
			border-radius: 12px;
			padding: 16px 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			/* 底部立体：主投影略偏主色，辅层收窄增强“托起”感 */
			box-shadow:
				0 10px 28px -6px rgba(93, 118, 189, 0.28),
				0 4px 14px -2px rgba(45, 60, 110, 0.14),
				0 2px 4px rgba(93, 118, 189, 0.06);

			.card-left {
				display: flex;
				flex-direction: column;

				.completion-rate {
					display: flex;
					align-items: baseline;
					margin-bottom: 4px;

					.label {
						font-size: 13px;
						color: #6b7280;
						margin-right: 6px;
					}

					.value {
						font-size: 24px;
						font-weight: bold;
						color: #5d76bd;
					}
				}

				.hint {
					font-size: 13px;
					color: #4a5f99;
				}
			}

			.card-right {
				position: relative;

				.avatar-wrap {
					width: 66px;
					height: 84px;
					border-radius: 6px;
					background: #f3f4f6;
					display: flex;
					flex-direction: column;
					overflow: hidden;
					box-shadow: 0 4px 10px rgba(0,0,0,0.05);
					position: relative;

					.avatar {
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						z-index: 1;
					}

					.avatar-tag {
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						background: rgba(0,0,0,0.5);
						color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 4px 0;
						z-index: 2;
						
						/* 在内层控制文字大小，确保背景盒子本身依然是 100% 宽度 */
						text {
							font-size: 8px;
							transform: scale(0.9);
						}
					}
				}
			}
		}
	}
</style>
