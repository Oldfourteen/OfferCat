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

	export default {
		name: 'resumeHeader',
		components: {
			editResumeNamePopup
		},
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
					count: 1, // 默认只选1张
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 从相册选择或拍照
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						if (tempFilePaths && tempFilePaths.length > 0) {
							// 临时图片路径
							const selectedPhoto = tempFilePaths[0];
							
							// 模拟上传成功，直接更新本地预览
							// 真实项目中需要调用 uni.uploadFile 将图片上传到服务器，然后获取真实的 url
							uni.showLoading({ title: '上传中...' });
							
							// 模拟网络请求延迟
							setTimeout(() => {
								uni.hideLoading();
								uni.showToast({ title: '上传成功', icon: 'success' });
								
								// 将新图片的URL发送给父组件 onlineResumeMake.vue
								this.$emit('updatePhoto', selectedPhoto);
							}, 800);

							/*
							// 真实的上传逻辑示例：
							uni.uploadFile({
								url: 'https://你的后端上传接口/upload', 
								filePath: selectedPhoto,
								name: 'file',
								formData: {
									'user': 'test'
								},
								success: (uploadFileRes) => {
									// 解析后端返回的数据
									const data = JSON.parse(uploadFileRes.data);
									if(data.code === 200) {
										// 将线上地址传给父组件
										this.$emit('updatePhoto', data.url);
									}
								}
							});
							*/
						}
					}
				});
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
				background-color: rgba(22, 119, 255, 0.1);
				border-radius: 12px;

				.btn-text {
					font-size: 12px;
					color: #1677ff;
					font-weight: 500;
				}
			}
		}

		.completion-card {
			background: linear-gradient(to right, #e6f4ff, #bae0ff);
			border-radius: 12px;
			padding: 16px 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;

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
						color: #1677ff;
					}
				}

				.hint {
					font-size: 13px;
					color: #69b1ff;
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
