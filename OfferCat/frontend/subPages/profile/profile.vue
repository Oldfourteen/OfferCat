<template>
	<!-- 个人信息编辑主页面 -->
	<view class="profile-page" :class="themeClass">
		<!-- 顶部导航栏：返回 + 标题 + 保存 -->
		<view class="header">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">←</text>
			</view>
			<text class="header-title">编辑个人信息</text>
			<view class="save-btn" @click="saveProfile">
				<text class="save-text">保存</text>
			</view>
		</view>
		
		<!-- 导航栏占位，避免内容被遮挡 -->
		<view class="header-placeholder"></view>
		
		<!-- 头像区域：点击更换头像 -->
		<view class="avatar-section">
			<view class="avatar-wrapper" @click="chooseAvatar">
				<CommonAvatar :src="avatarUrl" image-class="avatar-img" :sync-profile="false" />
				<view class="avatar-mask">
					<text class="camera-icon">📷</text>
					<text class="change-text">更换头像</text>
				</view>
			</view>
		</view>
		
		<!-- 表单区域：所有个人信息项 -->
		<view class="form-section">
			<view class="form-item">
				<view class="form-label">昵称</view>
				<input class="form-input" v-model="nickname" maxlength="10" placeholder="请输入昵称" />
			</view>

			<view class="form-item">
				<view class="form-label">专业</view>
				<input class="form-input" v-model="major" maxlength="15" placeholder="请输入专业，如计算机科学与技术" />
			</view>

			<view class="form-item">
				<view class="form-label">年级</view>
				<picker mode="selector" :range="gradeOptions" :value="gradeIndex" @change="onGradeChange">
					<view class="form-input picker-input">{{ graduationYear || '请选择年级' }}</view>
				</picker>
			</view>

			<view class="form-item">
				<view class="form-label">求职状态</view>
				<picker mode="selector" :range="jobStatusOptions" :value="jobStatusIndex" @change="onJobStatusChange">
					<view class="form-input picker-input">{{ jobStatus || '请选择求职状态' }}</view>
				</picker>
			</view>
			
			<view class="form-item">
				<view class="form-label">真实姓名</view>
				<input class="form-input" v-model="realName" maxlength="10" placeholder="请输入真实姓名" />
			</view>
			
			<view class="form-item">
				<view class="form-label">手机号</view>
				<input class="form-input" :value="phone" type="number" maxlength="11" placeholder="请输入手机号" @input="onPhoneInput" />
			</view>
			
			<view class="form-item">
				<view class="form-label">邮箱</view>
				<input class="form-input" v-model="email" placeholder="请输入邮箱" />
			</view>
			
			<view class="form-item">
				<view class="form-label">性别</view>
				<view class="gender-select">
					<view 
							class="gender-option male-option" 
							:class="{ active: gender === 'male' }"
							@click="gender = 'male'"
						>
							<text>男</text>
						</view>
						<view 
							class="gender-option female-option" 
							:class="{ active: gender === 'female' }"
							@click="gender = 'female'"
						>
							<text>女</text>
						</view>
				</view>
			</view>
			
			<view class="form-item">
				<view class="form-label">个人简介</view>
				<view class="textarea-container">
					<textarea class="form-textarea" v-model="bio" maxlength="25" placeholder="请输入个人简介" />
					<view class="word-count">{{ bio ? bio.length : 0 }}/25</view>
				</view>
			</view>

			<view class="form-item">
				<view class="form-label">求职方向</view>
				<input class="form-input" v-model="desiredPosition" maxlength="8" placeholder="请输入求职方向，如前端开发" />
			</view>

			<view class="form-item">
				<view class="form-label">意向城市</view>
				<input class="form-input" v-model="desiredCity" maxlength="4" placeholder="请输入意向城市，如青岛" />
			</view>

			<view class="form-item">
				<view class="form-label">期望薪资</view>
				<input class="form-input" v-model="expectedSalary" maxlength="10" placeholder="请输入期望薪资，如7K-12K" />
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 工具导入
import { getUserProfile, saveUserProfile, DEFAULT_AVATAR } from '@/utils/userProfile.js'
import { applyTheme } from '@/utils/theme.js'
import CommonAvatar from '@/components/CommonAvatar.vue'
import { request } from '@/api/request'
import { BASE_URL } from '@/api/config'
import { getToken } from '@/utils/token'
import { getUser } from '@/utils/user'

//响应式数据
const avatarUrl = ref(DEFAULT_AVATAR)
const nickname = ref('王小桃同学')
const major = ref('计算机科学与技术')
const graduationYear = ref('大四')
const jobStatus = ref('求职中')
const realName = ref('')
const phone = ref('')
const email = ref('')
const gender = ref('male')
const bio = ref('')
const desiredPosition = ref('')
const desiredCity = ref('')
const expectedSalary = ref('')
const theme = ref('light')
const gradeOptions = ['大一', '大二', '大三', '大四', '大五']
const jobStatusOptions = ['求职中', '未求职', '已就业']

// 选择器选项
const themeClass = computed(() => (theme.value === 'dark' ? 'theme-dark' : 'theme-light'))
// 年级选择器索引
const gradeIndex = computed(() => {
	const idx = gradeOptions.indexOf(graduationYear.value || '')
	return idx >= 0 ? idx : 0
})
// 求职状态选择器索引
const jobStatusIndex = computed(() => {
	const idx = jobStatusOptions.indexOf(jobStatus.value || '')
	return idx >= 0 ? idx : 0
})

// 加载用户本地资料
const loadUserInfo = () => {
	const user = getUserProfile()
	avatarUrl.value = user.avatar || DEFAULT_AVATAR
	nickname.value = user.nickname || ''
	major.value = user.major || ''
	graduationYear.value = user.graduationYear || ''
	jobStatus.value = user.jobStatus || ''
	realName.value = user.realName || ''
	phone.value = user.phone || ''
	email.value = user.email || ''
	gender.value = user.gender || 'male'
	bio.value = user.bio || ''
	desiredPosition.value = user.desiredPosition || ''
	desiredCity.value = user.desiredCity || ''
	expectedSalary.value = user.expectedSalary || ''
}

// 保存个人信息（校验 + 上传服务器 + 本地存储）
const saveProfile = async () => {
	// 前端表单校验
	if (String(nickname.value || '').length > 10) {
		uni.showToast({ title: '昵称最多10个字', icon: 'none' })
		return
	}
	if (String(major.value || '').length > 15) {
		uni.showToast({ title: '专业最多15个字', icon: 'none' })
		return
	}
	if (!gradeOptions.includes(graduationYear.value)) {
		uni.showToast({ title: '请选择年级', icon: 'none' })
		return
	}
	if (!jobStatusOptions.includes(jobStatus.value)) {
		uni.showToast({ title: '请选择求职状态', icon: 'none' })
		return
	}
	if (String(realName.value || '').length > 10) {
		uni.showToast({ title: '真实姓名最多10个字', icon: 'none' })
		return
	}
	if (phone.value && !/^\d{11}$/.test(phone.value)) {
		uni.showToast({ title: '手机号需为11位数字', icon: 'none' })
		return
	}
	if (String(expectedSalary.value || '').length > 10) {
		uni.showToast({ title: '期望薪资最多10个字', icon: 'none' })
		return
	}
	if (String(bio.value || '').length > 25) {
		uni.showToast({ title: '个人简介最多25个字', icon: 'none' })
		return
	}
	if (String(desiredPosition.value || '').length > 8) {
		uni.showToast({ title: '求职方向最多8个字', icon: 'none' })
		return
	}
	if (String(desiredCity.value || '').length > 4) {
		uni.showToast({ title: '意向城市最多4个字', icon: 'none' })
		return
	}
	
	uni.showLoading({ title: '保存中', mask: true })
	try {
		const storedUser = getUser()
		// 组装提交给后端的数据
		const user = {
			userId: storedUser && storedUser.userId ? storedUser.userId : null,
			avatar: avatarUrl.value,
			nickname: nickname.value,
			major: major.value,
			graduationYear: graduationYear.value,
			grade: graduationYear.value,
			jobStatus: jobStatus.value,
			realName: realName.value,
			phone: phone.value,
			email: email.value,
			gender: gender.value === 'male' ? 1 : (gender.value === 'female' ? 2 : 0),
			bio: bio.value,
			desiredPosition: desiredPosition.value,
			desiredCity: desiredCity.value,
			expectedSalary: expectedSalary.value
		}
		
		const token = getToken()
		const resp = await request({
			url: '/user/profile',
			method: 'POST',
			data: user,
			header: token ? { Authorization: `Bearer ${token}` } : {}
		})

		const studentId = resp && resp.data && resp.data.studentId ? resp.data.studentId : null

		// 对于前端状态，仍使用字符串 gender
		const localUser = {
			...user,
			gender: gender.value,
			...(studentId ? { studentId } : {})
		}
		
		saveUserProfile(localUser)
		uni.hideLoading()
		uni.showToast({
			title: '保存成功',
			icon: 'success'
		})
		setTimeout(() => {
			goBack()
		}, 1500)
	} catch (e) {
		uni.hideLoading()
		uni.showToast({ title: (e && e.message) ? e.message : '保存失败，请稍后重试', icon: 'none' })
	}
}

// 年级选择
const onGradeChange = (event) => {
	const idx = Number(event.detail.value)
	graduationYear.value = gradeOptions[idx] || gradeOptions[0]
}

// 求职状态选择
const onJobStatusChange = (event) => {
	const idx = Number(event.detail.value)
	jobStatus.value = jobStatusOptions[idx] || jobStatusOptions[0]
}

// 手机号输入过滤（只允许数字）
const onPhoneInput = (event) => {
	const next = String(event.detail.value || '').replace(/\D/g, '').slice(0, 11)
	phone.value = next
}

const goBack = () => {
	uni.navigateBack()
}

// 上传头像文件到服务器
const persistAvatarFile = (tempFilePath) => new Promise((resolve) => {
	if (!tempFilePath) {
		resolve(DEFAULT_AVATAR)
		return
	}

	uni.showLoading({ title: '上传中...', mask: true })
	uni.uploadFile({
		url: `${BASE_URL}/user/uploadAvatar`,
		filePath: tempFilePath,
		name: 'file',
		header: {
			'Authorization': `Bearer ${getToken()}`
		},
		success: (uploadRes) => {
			uni.hideLoading()
			try {
				const data = JSON.parse(uploadRes.data)
				if (data.code === 200) {
					// data.data 返回的是 /user/avatars/xxxxx.png
					resolve(`${BASE_URL}${data.data}`)
				} else {
					uni.showToast({ title: data.message || '上传失败', icon: 'none' })
					resolve(DEFAULT_AVATAR)
				}
			} catch (e) {
				uni.showToast({ title: '服务器响应异常', icon: 'none' })
				resolve(DEFAULT_AVATAR)
			}
		},
		fail: () => {
			uni.hideLoading()
			uni.showToast({ title: '网络或上传异常', icon: 'none' })
			resolve(DEFAULT_AVATAR)
		}
	})
})

// 选择头像（拍照 / 相册）
const chooseAvatar = () => {
	uni.showActionSheet({
		itemList: ['从相册选择', '拍照'],
		success: (res) => {
			const sourceType = res.tapIndex === 0 ? ['album'] : ['camera']
			uni.chooseImage({
				count: 1,
				sourceType: sourceType,
				sizeType: ['compressed'],
				success: async (chooseRes) => {
					const nextAvatar = await persistAvatarFile(chooseRes.tempFilePaths[0])
					avatarUrl.value = nextAvatar || DEFAULT_AVATAR
				}
			})
		}
	})
}

onMounted(() => {
	theme.value = applyTheme()
	loadUserInfo()
})

onShow(() => {
	theme.value = applyTheme()
	loadUserInfo()
})
</script>

<style lang="scss" scoped>
.profile-page {
	min-height: 100vh;
	background: #F8FAFD;
}

.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 20rpx) 30rpx 20rpx;
		background: linear-gradient(180deg, rgba(0, 122, 252, 0.7) 0%, rgba(1, 188, 255, 0) 100%);
	
	.back-btn {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		
		.back-icon {
			color: #fff;
			font-size: 32rpx;
		}
	}
	
	.header-title {
		color: #fff;
		font-size: 34rpx;
		font-weight: 600;
	}
	
	.save-btn {
				padding: 10rpx 30rpx;
				background: #fff;
				border-radius: 30rpx;
				
				.save-text {
					color: #4AA9FE;
					font-size: 26rpx;
					font-weight: 600;
				}
			}
		}

		.header-placeholder {
			height: calc(var(--status-bar-height) + 120rpx);
		}

.avatar-section {
	display: flex;
	justify-content: center;
	padding: 40rpx 0;
	
	.avatar-wrapper {
		position: relative;
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		overflow: hidden;
		border: 6rpx solid #fff;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
		
		.avatar-img {
			width: 100%;
			height: 100%;
		}
		
		.avatar-mask {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 60rpx;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			.camera-icon {
				font-size: 24rpx;
			}
			
			.change-text {
				color: #fff;
				font-size: 20rpx;
			}
		}
	}
}

.form-section {
	padding: 20rpx 30rpx;
	
	.form-item {
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.form-label {
			font-size: 28rpx;
			color: #666;
			margin-bottom: 15rpx;
		}
		
		.form-input {
			font-size: 32rpx;
			color: #333;
			height: 60rpx;
		}
		
		.textarea-container {
			position: relative;
			width: 100%;

			.form-textarea {
				font-size: 32rpx;
				color: #333;
				height: 150rpx;
				width: 100%;
				box-sizing: border-box;
				padding-bottom: 40rpx;
			}

			.word-count {
				position: absolute;
				right: 0;
				bottom: 0;
				font-size: 24rpx;
				color: #999;
			}
		}
					
					.tag-container {
						margin-top: 10rpx;
						
						.tag-item {
							display: inline-block;
							padding: 10rpx 20rpx;
							margin: 0 10rpx 10rpx 0;
							background: #f0f0f0;
							border-radius: 20rpx;
							font-size: 24rpx;
							color: #666;
							position: relative;
							
							.tag-delete {
								margin-left: 10rpx;
								color: #999;
								font-size: 28rpx;
								cursor: pointer;
								line-height: 1;
							}
						}
						
						.tag-input-wrapper {
							display: flex;
							margin-top: 10rpx;
							
							.tag-input {
								flex: 1;
								height: 60rpx;
								font-size: 28rpx;
								color: #333;
								padding: 0 15rpx;
								background: #f0f0f0;
								border-radius: 30rpx;
								margin-right: 10rpx;
							}
							
							.tag-add-btn {
								padding: 0 30rpx;
								height: 60rpx;
								background: #4AA9FE;
								color: #fff;
								border-radius: 30rpx;
								font-size: 24rpx;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
					}
		
		.gender-select {
			display: flex;
			gap: 20rpx;
			
			.gender-option {
								flex: 1;
								height: 70rpx;
								background: #F0F0F0;
								border-radius: 35rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: 28rpx;
								color: #666;
								transition: all 0.3s ease;
								
								&.active {
									color: #fff;
								}
							}
							
							.male-option.active {
								background: linear-gradient(135deg, #4AA9FE, #3165D7);
							}
							
							.female-option.active {
								background: linear-gradient(135deg, #FF6B8B, #FF8E53);
							}
		}
	}
}

.profile-page.theme-dark {
	background: linear-gradient(180deg, #111216 0%, #17191f 28%, #111216 100%);

	.header {
		background: linear-gradient(180deg, rgba(74, 103, 247, 0.58) 0%, rgba(74, 103, 247, 0) 100%);

		.back-btn {
			background: rgba(255, 255, 255, 0.12);
		}

		.save-btn {
			background: rgba(35, 37, 43, 0.96);

			.save-text {
				color: #8ab7ff;
			}
		}
	}

	.avatar-wrapper {
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 8rpx 26rpx rgba(0, 0, 0, 0.24);
	}

	.form-item {
		background: rgba(29, 31, 36, 0.96);
		box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.18);

		.form-label {
			color: rgba(255, 255, 255, 0.56);
		}

		.form-input,
		.form-textarea {
			color: #f4f7fb;
		}

		.textarea-container {
			.word-count {
				color: rgba(255, 255, 255, 0.4);
			}
		}
						
						.tag-item {
							background: #23252b;
							color: rgba(255, 255, 255, 0.62);
							
							.tag-delete {
								color: rgba(255, 255, 255, 0.4);
							}
						}
						
						.tag-input {
							background: #23252b;
							color: #f4f7fb;
						}
						
						.tag-add-btn {
							background: linear-gradient(135deg, #4AA9FE, #3165D7);
						}

		.gender-option {
									background: #23252b;
									color: rgba(255, 255, 255, 0.62);
								}
								
								.male-option.active {
									background: linear-gradient(135deg, #4AA9FE, #3165D7);
								}
								
								.female-option.active {
									background: linear-gradient(135deg, #FF6B8B, #FF8E53);
								}
	}
}
</style>
