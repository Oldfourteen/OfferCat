<template>
	<!-- 个人信息编辑主页面 -->
	<view class="profile-page" :class="themeClass">
		<!-- 顶部导航栏：与「我的」页同源双层渐变 + 绝对居中标题 -->
		<view class="header">
			<view class="header-inner">
				<view class="header-side header-left">
					<view class="back-btn" @click="goBack">
						<image class="back-icon-img" src="/static/icons/chevron-left.svg" mode="aspectFit" />
					</view>
				</view>
				<text class="header-title">编辑个人信息</text>
				<view class="header-side header-right">
					<view class="save-btn" @click="saveProfile">
						<text class="save-text">保存</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 导航栏占位，避免内容被遮挡 -->
		<view class="header-placeholder"></view>

		<!-- 头像区域：点击更换头像 -->
		<view class="avatar-section">
			<view class="avatar-ring">
				<view
					class="profile-avatar-circle"
					:class="{ 'is-default-avatar': isDefaultAvatarView }"
					@click="chooseAvatar"
				>
					<view class="avatar-bed" />
					<CommonAvatar
						:src="avatarUrl"
						:mode="avatarImageMode"
						image-class="avatar-img"
						:sync-profile="false"
					/>
					<view class="avatar-mask">
						<view class="avatar-mask-inner">
							<view class="change-text">更换头像</view>
						</view>
					</view>
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
				<view class="input-with-count">
					<input class="form-input" v-model="major" maxlength="10" placeholder="请输入专业，如数字媒体技术" />
					<view class="word-count">{{ (major || '').length }}/10</view>
				</view>
			</view>

			<view class="form-item">
				<view class="form-label">年级</view>
				<picker mode="selector" :range="gradeOptions" :value="gradeIndex" @change="onGradeChange">
					<view class="form-input picker-input">
						<text :class="['picker-value', { 'is-placeholder': !graduationYear }]">{{ graduationYear || '请选择年级' }}</text>
						<text class="picker-chevron">›</text>
					</view>
				</picker>
			</view>

			<view class="form-item">
				<view class="form-label">求职状态</view>
				<picker mode="selector" :range="jobStatusOptions" :value="jobStatusIndex" @change="onJobStatusChange">
					<view class="form-input picker-input">
						<text :class="['picker-value', { 'is-placeholder': !jobStatus }]">{{ jobStatus || '请选择求职状态' }}</text>
						<text class="picker-chevron">›</text>
					</view>
				</picker>
			</view>
			
			<view class="form-item">
				<view class="form-label">真实姓名</view>
				<input class="form-input" v-model="realName" maxlength="10" placeholder="请输入真实姓名" />
			</view>

			<view class="form-item">
				<view class="form-label">学校</view>
				<input class="form-input" v-model="school" maxlength="20" placeholder="请输入学校" />
			</view>

			<view class="form-item">
				<view class="form-label">学号</view>
				<input class="form-input" v-model="idCard" maxlength="20" placeholder="请输入学号" />
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
				<view class="input-with-count">
					<input class="form-input" v-model="desiredPosition" maxlength="15" placeholder="请输入求职方向，如前端开发" />
					<view class="word-count">{{ (desiredPosition || '').length }}/15</view>
				</view>
			</view>

			<view class="form-item">
				<view class="form-label">意向城市</view>
				<view class="input-with-count">
					<input class="form-input" v-model="desiredCity" maxlength="15" placeholder="请输入意向城市，如青岛" />
					<view class="word-count">{{ (desiredCity || '').length }}/15</view>
				</view>
			</view>

			<view class="form-item">
				<view class="form-label">期望薪资</view>
				<view class="input-with-count">
					<input class="form-input" v-model="expectedSalary" maxlength="10" placeholder="请输入期望薪资，如7K-12K" />
					<view class="word-count">{{ (expectedSalary || '').length }}/10</view>
				</view>
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
import { getUser, resolveStoredUserId, syncUserProfileFromServer } from '@/utils/user'

//响应式数据
const avatarUrl = ref(DEFAULT_AVATAR)
const nickname = ref('王小桃同学')
const major = ref('计算机科学与技术')
const graduationYear = ref('大四')
const jobStatus = ref('求职中')
const realName = ref('')
const school = ref('')
const idCard = ref('')
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

/** 默认占位用 aspectFill 铺满（比 aspectFit 更显大）；用户照片同样 aspectFill */
const avatarImageMode = computed(() => 'aspectFill')

/** 是否展示默认占位资源（用于样式：仅默认图加 scale，避免用户照片被放大） */
const isDefaultAvatarView = computed(() => {
	const u = avatarUrl.value
	if (u == null || u === '' || u === DEFAULT_AVATAR) return true
	const s = String(u)
	if (s.includes('asset/image/avatar')) return true
	const lower = s.toLowerCase()
	// 打包后本地路径 /assets/avatar-xxxxx.png
	if (!/^https?:\/\//i.test(s)) {
		if ((lower.includes('/asset') || lower.includes('/assets/')) && lower.includes('avatar') && lower.includes('.png')) {
			return true
		}
	}
	if (lower.includes('default-avatar')) return true
	return false
})

// 加载用户本地资料
const loadUserInfo = () => {
	const user = getUserProfile()
	avatarUrl.value = user.avatar || DEFAULT_AVATAR
	nickname.value = user.nickname || ''
	major.value = String(user.major || '').slice(0, 10)
	graduationYear.value = user.graduationYear || ''
	jobStatus.value = user.jobStatus || ''
	realName.value = user.realName || ''
	school.value = user.school || ''
	idCard.value = user.idCard || ''
	phone.value = user.phone || ''
	email.value = user.email || ''
	gender.value = user.gender || 'male'
	bio.value = user.bio || ''
	desiredPosition.value = String(user.desiredPosition || '').slice(0, 15)
	desiredCity.value = String(user.desiredCity || '').slice(0, 15)
	expectedSalary.value = String(user.expectedSalary || '').slice(0, 10)
}

const refreshUserInfo = async () => {
	await syncUserProfileFromServer({ timeout: 12000 })
	loadUserInfo()
}

// 保存个人信息（校验 + 上传服务器 + 本地存储）
const saveProfile = async () => {
	// 前端表单校验
	if (String(nickname.value || '').length > 10) {
		uni.showToast({ title: '昵称最多10个字', icon: 'none' })
		return
	}
	if (String(major.value || '').length > 10) {
		uni.showToast({ title: '专业最多10个字', icon: 'none' })
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
	if (String(school.value || '').length > 20) {
		uni.showToast({ title: '学校最多20个字', icon: 'none' })
		return
	}
	if (String(idCard.value || '').length > 20) {
		uni.showToast({ title: '学号最多20个字符', icon: 'none' })
		return
	}
	if ((school.value && !idCard.value) || (!school.value && idCard.value)) {
		uni.showToast({ title: '学校与学号需同时填写', icon: 'none' })
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
	if (String(desiredPosition.value || '').length > 15) {
		uni.showToast({ title: '求职方向最多15个字', icon: 'none' })
		return
	}
	if (String(desiredCity.value || '').length > 15) {
		uni.showToast({ title: '意向城市最多15个字', icon: 'none' })
		return
	}

	const resolvedUserId = resolveStoredUserId(getUser())
	if (resolvedUserId == null) {
		uni.showToast({ title: '登录状态失效，请重新登录后再保存', icon: 'none' })
		return
	}
	
	uni.showLoading({ title: '保存中', mask: true })
	try {
		// 组装提交给后端的数据
		const user = {
			userId: resolvedUserId,
			avatar: avatarUrl.value,
			nickname: nickname.value,
			major: major.value,
			graduationYear: graduationYear.value,
			grade: graduationYear.value,
			jobStatus: jobStatus.value,
			realName: realName.value,
			school: school.value,
			idCard: idCard.value,
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
		const serverUserInfo = resp && resp.data && resp.data.userInfo ? resp.data.userInfo : null

		// 对于前端状态，仍使用字符串 gender
		const localUser = serverUserInfo && typeof serverUserInfo === 'object'
			? {
				...serverUserInfo,
				gender: gender.value,
				...(studentId ? { studentId } : {})
			}
			: {
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
	void refreshUserInfo()
})

onShow(() => {
	theme.value = applyTheme()
	void refreshUserInfo()
})
</script>

<style lang="scss" scoped>
/* 与「我的」页 UserInfoCard 一致的品牌蓝双层渐变 */
$grad-blue-a: rgba(1, 188, 255, 0.1) 0%, rgba(49, 101, 215, 0.4) 45%, rgba(0, 123, 255, 0.05) 100%;
$grad-blue-b: rgba(0, 122, 252, 0.7) 0%, rgba(1, 188, 255, 0) 100%;

.profile-page {
	min-height: 100vh;
	background: #f8fafd;
	box-sizing: border-box;
}

.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	padding-top: var(--status-bar-height);
	background:
		linear-gradient(180deg, $grad-blue-a),
		linear-gradient(180deg, $grad-blue-b);
	border-bottom: 2rpx solid rgba(243, 253, 255, 0.6);
}

.header-inner {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 88rpx;
	padding: 12rpx 24rpx 20rpx;
}

.header-side {
	width: 160rpx;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	z-index: 2;
}

.header-left {
	justify-content: flex-start;
}

.header-right {
	justify-content: flex-end;
}

.header-title {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	max-width: 62%;
	text-align: center;
	font-size: 34rpx;
	font-weight: 700;
	color: #fff;
	letter-spacing: 0.5rpx;
	text-shadow: 0 4rpx 16rpx rgba(38, 96, 189, 0.25);
	pointer-events: none;
	z-index: 1;
}

.back-btn {
	box-sizing: border-box;
	height: 72rpx;
	width: 72rpx;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.92);
	padding: 0;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon-img {
	width: 38rpx;
	height: 38rpx;
	flex-shrink: 0;
}

.save-btn {
	min-height: 56rpx;
	padding: 0 28rpx;
	border-radius: 999rpx;
	background: rgba(255, 255, 255, 0.96);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 14rpx rgba(34, 97, 193, 0.18);
}

.save-text {
	color: #3165d7;
	font-size: 27rpx;
	font-weight: 600;
	line-height: 1;
}

.header-placeholder {
	height: calc(var(--status-bar-height) + 120rpx);
}

.avatar-section {
	display: flex;
	justify-content: center;
	padding: 8rpx 0 32rpx;
	margin-top: -8rpx;
}

.avatar-ring {
	padding: 10rpx;
	border-radius: 50%;
	background: linear-gradient(180deg, #dce0e8 0%, #cdd3de 100%);
	box-shadow: 0 16rpx 36rpx rgba(34, 97, 193, 0.12);
}

.profile-avatar-circle {
	position: relative;
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
	overflow: hidden;
	border: 6rpx solid #c8ced9;
	box-shadow: 0 8rpx 28rpx rgba(34, 97, 193, 0.18);

	.avatar-bed {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
		border-radius: 50%;
		background: linear-gradient(165deg, #e4e8ef 0%, #d5dae4 55%, #ccd2de 100%);
	}

	:deep(.avatar-wrapper) {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 100%;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		display: block;
	}

	/* 默认图：铺满后再微放大，圆角 overflow 裁切边缘（仅占位） */
	&.is-default-avatar :deep(.common-avatar-image) {
		width: 100% !important;
		height: 100% !important;
		left: 0 !important;
		top: 0 !important;
		transform: scale(1.48) !important;
		transform-origin: center center;
	}

	.avatar-mask {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 92rpx;
		padding: 0 16rpx;
		box-sizing: border-box;
		z-index: 4;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.25) 28%,
			rgba(0, 0, 0, 0.78) 100%
		);
	}

	.avatar-mask-inner {
		position: absolute;
		left: 50%;
		top: 50%;
		max-width: calc(100% - 24rpx);
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
	}

	.change-text {
		color: #fff;
		font-size: 24rpx;
		font-weight: 500;
		line-height: 32rpx;
		height: 32rpx;
		letter-spacing: 0;
		flex-shrink: 0;
		overflow: visible;
	}
}

.form-section {
	padding: 0 30rpx 48rpx;
}

.form-item {
	background: #fff;
	border-radius: 24rpx;
	padding: 32rpx 32rpx 34rpx;
	margin-bottom: 24rpx;
	border: 1rpx solid rgba(74, 121, 254, 0.06);
	box-shadow: 0 10rpx 36rpx rgba(34, 97, 193, 0.07), 0 2rpx 8rpx rgba(0, 0, 0, 0.03);

	.form-label {
		font-size: 26rpx;
		font-weight: 500;
		color: #8a94a6;
		margin-bottom: 18rpx;
		letter-spacing: 0.3rpx;
	}

	.form-input {
		font-size: 32rpx;
		color: #2c3340;
		min-height: 72rpx;
		line-height: 44rpx;
	}

	.picker-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
		min-height: 72rpx;
		box-sizing: border-box;
	}

	.picker-value {
		flex: 1;
		min-width: 0;
		font-size: 32rpx;
		line-height: 44rpx;
		color: #2c3340;
	}

	.picker-value.is-placeholder {
		color: #b4bcc8;
	}

	.picker-chevron {
		flex-shrink: 0;
		color: #c5ced9;
		font-size: 40rpx;
		font-weight: 300;
		line-height: 1;
		margin-top: -4rpx;
	}

	.input-with-count {
		position: relative;
		width: 100%;

		.form-input {
			padding-bottom: 40rpx;
		}

		.word-count {
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 24rpx;
			color: #9aa3b2;
		}
	}

	.textarea-container {
		position: relative;
		width: 100%;

		.form-textarea {
			font-size: 32rpx;
			color: #2c3340;
			height: 150rpx;
			width: 100%;
			box-sizing: border-box;
			padding-bottom: 40rpx;
			line-height: 1.45;
		}

		.word-count {
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 24rpx;
			color: #9aa3b2;
		}
	}

	.tag-container {
		margin-top: 10rpx;

		.tag-item {
			display: inline-block;
			padding: 10rpx 20rpx;
			margin: 0 10rpx 10rpx 0;
			background: #f0f4f8;
			border-radius: 20rpx;
			font-size: 24rpx;
			color: #5c6678;
			position: relative;

			.tag-delete {
				margin-left: 10rpx;
				color: #9aa3b2;
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
				color: #2c3340;
				padding: 0 15rpx;
				background: #eef2f7;
				border-radius: 30rpx;
				margin-right: 10rpx;
			}

			.tag-add-btn {
				padding: 0 30rpx;
				height: 60rpx;
				background: linear-gradient(135deg, #4aa9fe, #3165d7);
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
			height: 76rpx;
			background: #eef2f7;
			border-radius: 38rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #5c6678;
			transition: all 0.25s ease;

			&.active {
				color: #fff;
			}
		}

		.male-option.active,
		.female-option.active {
			background: #647CBF;
			box-shadow: 0 6rpx 16rpx rgba(100, 124, 191, 0.38);
		}
	}
}

.profile-page.theme-dark {
	background: linear-gradient(180deg, #111216 0%, #17191f 28%, #111216 100%);

	.header {
		background:
			linear-gradient(180deg, rgba(77, 108, 182, 0.38) 0%, rgba(35, 42, 63, 0.55) 50%, rgba(17, 18, 22, 0.3) 100%),
			linear-gradient(180deg, rgba(74, 103, 247, 0.55) 0%, rgba(74, 103, 247, 0) 100%);
		border-bottom-color: rgba(255, 255, 255, 0.06);
	}

	.save-btn {
		background: rgba(35, 37, 43, 0.96);
		box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.35);
	}

	.save-text {
		color: #8ab7ff;
	}

	.avatar-ring {
		background: linear-gradient(180deg, #2a2e37 0%, #1f232b 100%);
		box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.35);
	}

	.profile-avatar-circle {
		border-color: rgba(255, 255, 255, 0.14);
		box-shadow: 0 10rpx 32rpx rgba(0, 0, 0, 0.4);

		.avatar-bed {
			background: linear-gradient(165deg, #343a47 0%, #2a2f3a 52%, #23272f 100%);
		}
	}

	.form-item {
		background: rgba(29, 31, 36, 0.96);
		border-color: rgba(255, 255, 255, 0.06);
		box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.22);

		.form-label {
			color: rgba(255, 255, 255, 0.52);
		}

		.form-input,
		.form-textarea {
			color: #f4f7fb;
		}

		.picker-value {
			color: #f4f7fb;
		}

		.picker-value.is-placeholder {
			color: rgba(255, 255, 255, 0.35);
		}

		.picker-chevron {
			color: rgba(255, 255, 255, 0.28);
		}

		.textarea-container .word-count,
		.input-with-count .word-count {
			color: rgba(255, 255, 255, 0.4);
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
			background: linear-gradient(135deg, #4aa9fe, #3165d7);
		}

		.gender-option {
			background: #23252b;
			color: rgba(255, 255, 255, 0.62);
		}

		.male-option.active,
		.female-option.active {
			background: #647CBF;
			box-shadow: 0 6rpx 16rpx rgba(100, 124, 191, 0.38);
		}
	}
}
</style>
