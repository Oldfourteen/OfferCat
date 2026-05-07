<template>
	<view class="basic-info-wrapper">
		<view class="basic-info">
			<!-- 统一的头部结构，右侧放编辑按钮，和 educationSection 等组件保持一致 -->
			<view class="section-header">
				<view class="name-row">
					<text class="name">{{ name || '默认用户' }}</text>
				</view>
				<view class="action-btn" @click="goToEdit">
					<text class="btn-text">编辑</text>
				</view>
			</view>
			
			<view class="user-details">
				<view class="info-row">
					<text class="info-item">{{ gender || '性别未选' }}</text>
					<text class="separator">|</text>
					<text class="info-item">{{ phone || '手机号未填写' }}</text>
				</view>
			</view>
			<view class="divider"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'basicInfo',
		props: {
			name: {
				type: String,
				default: '默认用户'
			},
			gender: {
				type: String,
				default: '性别未选'
			},
			phone: {
				type: String,
				default: '手机号未填写'
			},
			email: {
				type: String,
				default: '未填写邮箱'
			}
		},
		methods: {
			goToEdit() {
				const initial = encodeURIComponent(JSON.stringify({
					name: this.name,
					gender: this.gender,
					phone: this.phone,
					email: this.email
				}))
				uni.navigateTo({
					url: `/subPages/resumeEdit/editContainer?type=basicInfo&initial=${initial}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.basic-info-wrapper {
		.basic-info {
			padding: 20px 20px 0;
			position: relative;

			/* 统一和教育背景相同的 section-header 样式 */
			.section-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10px;

				.name-row {
					display: flex;
					align-items: center;

					.name {
						font-size: 24px;
						font-weight: bold;
						color: #333;
					}
				}

				.action-btn {
					padding: 4px 12px;
					border-radius: 14px;
					background: #ebfef6;
					display: flex;
					align-items: center;
					justify-content: center;

					.btn-text {
						font-size: 13px;
						color: #10b981;
						font-weight: 500;
					}
				}
			}

			.user-details {
				margin-bottom: 15px;

				.info-row {
					display: flex;
					align-items: center;
					margin-bottom: 6px;

					.info-item {
						font-size: 14px;
						color: #666;
					}

					.separator {
						margin: 0 8px;
						color: #ccc;
						font-size: 12px;
					}
				}
			}

			.divider {
				height: 1px;
				background-color: #f3f4f6;
			}
		}
	}
</style>
