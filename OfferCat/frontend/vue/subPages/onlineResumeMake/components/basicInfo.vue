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
					<text class="chevron" aria-hidden="true">›</text>
				</view>
			</view>

			<view class="user-details">
				<view class="info-row">
					<text class="info-item">{{ gender || '性别未选' }}</text>
					<text class="separator">|</text>
					<text class="info-item">{{ phone || '手机号未填写' }}</text>
				</view>
			</view>

			<view v-if="jobIntention" class="job-intention-row">
				<text class="job-intention-label">求职意向：</text>
				<text class="job-intention-value">{{ jobIntention }}</text>
			</view>

			<view v-if="certificateLines.length > 0" class="certificates-section">
				<text class="certificates-label">证书：</text>
				<view class="certificates-list">
					<text v-for="(line, index) in certificateLines" :key="index" class="cert-line">{{ line }}</text>
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
			},
			jobIntention: {
				type: String,
				default: ''
			},
			certificates: {
				type: Array,
				default: () => []
			}
		},
		computed: {
			certificateLines() {
				const list = Array.isArray(this.certificates) ? this.certificates : []
				return list.map(c => (c && String(c.name || '').trim()) || '').filter(Boolean)
			}
		},
		methods: {
			goToEdit() {
				const initial = encodeURIComponent(JSON.stringify({
					name: this.name,
					gender: this.gender,
					phone: this.phone,
					email: this.email,
					jobIntention: this.jobIntention,
					certificates: this.certificates
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
			padding: 24px 20px 4px;
			position: relative;

			/* 统一和教育背景相同的 section-header 样式 */
			.section-header {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				gap: 12px;
				margin-bottom: 12px;

				.name-row {
					display: flex;
					align-items: center;
					min-width: 0;
					flex: 1;

					.name {
						font-size: 22px;
						font-weight: 600;
						color: #333;
						letter-spacing: -0.02em;
						line-height: 1.25;
					}
				}

				.action-btn {
					padding: 6px 4px 6px 10px;
					border-radius: 8px;
					background: transparent;
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-shrink: 0;

					&:active {
						opacity: 0.72;
					}

					.btn-text {
						font-size: 14px;
						color: #5d76bd;
						font-weight: 600;
						letter-spacing: 0.02em;
					}

					.chevron {
						margin-left: 1px;
						font-size: 18px;
						line-height: 1;
						color: #5d76bd;
						font-weight: 400;
						opacity: 0.88;
					}
				}
			}

			.user-details {
				margin-bottom: 18px;

				.info-row {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					margin-bottom: 6px;
					line-height: 1.5;

					.info-item {
						font-size: 14px;
						color: #666;
						letter-spacing: 0.01em;
					}

					.separator {
						margin: 0 10px;
						color: #ccc;
						font-size: 11px;
						font-weight: 300;
						opacity: 0.85;
					}
				}
			}

			.job-intention-row {
				margin-bottom: 14px;
				display: flex;
				align-items: flex-start;
				line-height: 1.45;

				.job-intention-label {
					font-size: 14px;
					color: #666;
					flex-shrink: 0;
				}

				.job-intention-value {
					font-size: 14px;
					color: #5d76bd;
					font-weight: 500;
				}
			}

			.certificates-section {
				margin-bottom: 14px;

				.certificates-label {
					font-size: 14px;
					color: #666;
					display: block;
					margin-bottom: 8px;
				}

				.certificates-list {
					display: flex;
					flex-direction: column;
					gap: 6px;
				}

				.cert-line {
					font-size: 14px;
					color: #374151;
					line-height: 1.55;
				}
			}

			.divider {
				height: 1px;
				margin-top: 4px;
				background-color: #f3f4f6;
			}
		}
	}
</style>
