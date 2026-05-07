<template>
	<view class="init-profile-page">
		<view class="header">
			<text class="title">欢迎来到 OfferCat</text>
			<text class="subtitle">请完善您的基础信息，让大家更好地认识您</text>
		</view>

		<view class="form-container">
			<view class="avatar-section">
				<view class="avatar-wrapper" @click="chooseAvatar">
					<CommonAvatar :src="avatarUrl" image-class="avatar-img" :sync-profile="false" />
					<view class="avatar-mask">
						<text class="camera-icon">📷</text>
					</view>
				</view>
				<text class="avatar-tip">点击上传头像</text>
			</view>

			<view class="input-section">
				<view class="input-label">您的昵称</view>
				<input class="nickname-input" v-model="nickname" maxlength="10" placeholder="请输入您的昵称 (2-10字)" />
			</view>

			<view class="submit-btn" :class="{ disabled: submitting }" @click="handleSubmit">
				<text>开启求职之旅</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserProfile, saveUserProfile, DEFAULT_AVATAR } from '@/utils/userProfile.js'
import CommonAvatar from '@/components/CommonAvatar.vue'
import { request } from '@/api/request'
import { BASE_URL } from '@/api/config'
import { getToken } from '@/utils/token'
import { getUser } from '@/utils/user'

const avatarUrl = ref(DEFAULT_AVATAR)
const nickname = ref('')
const submitting = ref(false)

onMounted(() => {
	const user = getUserProfile()
	if (user.avatar) avatarUrl.value = user.avatar
	if (user.nickname && user.nickname !== '王小桃同学') nickname.value = user.nickname
})

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

const handleSubmit = async () => {
	if (submitting.value) return
	
	const trimmedNickname = String(nickname.value || '').trim()
	if (trimmedNickname.length < 2 || trimmedNickname.length > 10) {
		uni.showToast({ title: '请输入2-10位的昵称', icon: 'none' })
		return
	}

	submitting.value = true
	uni.showLoading({ title: '保存中', mask: true })

	try {
		const storedUser = getUser()
		const payload = {
			userId: storedUser && storedUser.userId ? storedUser.userId : null,
			nickname: trimmedNickname,
			// 其他必填项使用默认值或原值避免报错
			gender: storedUser?.gender || 0,
		}

		const token = getToken()
		// 同步到后端
		const resp = await request({
			url: '/user/profile',
			method: 'POST',
			data: payload,
			header: token ? { Authorization: `Bearer ${token}` } : {}
		})

		const studentId = resp && resp.data && resp.data.studentId ? resp.data.studentId : null
		
		// 保存到本地
		saveUserProfile({
			avatar: avatarUrl.value,
			nickname: trimmedNickname,
			...(studentId ? { studentId } : {})
		})

		uni.hideLoading()
		uni.showToast({ title: '设置成功', icon: 'success' })
		
		setTimeout(() => {
			uni.switchTab({ url: '/pages/index/index' })
		}, 600)
	} catch (e) {
		uni.hideLoading()
		uni.showToast({ title: (e && e.message) ? e.message : '保存失败，请稍后重试', icon: 'none' })
	} finally {
		submitting.value = false
	}
}
</script>

<style lang="scss" scoped>
.init-profile-page {
	min-height: 100vh;
	background: #f7f8fa;
	display: flex;
	flex-direction: column;
	padding: 0 40rpx;
}

.header {
	margin-top: calc(var(--status-bar-height) + 120rpx);
	margin-bottom: 80rpx;
	display: flex;
	flex-direction: column;
	align-items: center;

	.title {
		font-size: 48rpx;
		font-weight: 700;
		color: #333;
		margin-bottom: 20rpx;
	}

	.subtitle {
		font-size: 28rpx;
		color: #666;
	}
}

.form-container {
	background: #fff;
	border-radius: 24rpx;
	padding: 60rpx 40rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);

	.avatar-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 60rpx;

		.avatar-wrapper {
			position: relative;
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
			
			.avatar-img {
				width: 100%;
				height: 100%;
			}

			.avatar-mask {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 40rpx;
				background: rgba(0, 0, 0, 0.5);
				display: flex;
				justify-content: center;
				align-items: center;

				.camera-icon {
					font-size: 20rpx;
					color: #fff;
				}
			}
		}

		.avatar-tip {
			margin-top: 16rpx;
			font-size: 24rpx;
			color: #999;
		}
	}

	.input-section {
		margin-bottom: 60rpx;

		.input-label {
			font-size: 28rpx;
			color: #333;
			font-weight: 600;
			margin-bottom: 20rpx;
		}

		.nickname-input {
			width: 100%;
			height: 88rpx;
			background: #f7f8fa;
			border-radius: 12rpx;
			padding: 0 24rpx;
			font-size: 28rpx;
			color: #333;
			box-sizing: border-box;
		}
	}

	.submit-btn {
		width: 100%;
		height: 96rpx;
		background: #4AA9FE;
		border-radius: 48rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 32rpx;
		font-weight: 600;
		box-shadow: 0 8rpx 16rpx rgba(74, 169, 254, 0.3);
		transition: all 0.3s;

		&:active {
			transform: scale(0.98);
			opacity: 0.9;
		}

		&.disabled {
			opacity: 0.5;
			pointer-events: none;
		}
	}
}
</style>
