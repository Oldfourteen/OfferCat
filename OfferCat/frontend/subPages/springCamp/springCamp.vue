<template>
	<view class="spring-camp-container" :class="themeClass">
		<!-- 自定义顶部导航栏 -->
		<view class="custom-nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="nav-content">
				<view class="nav-left">
					<view class="back-btn" @click="goBack">
						<view class="svg-icon back-icon"></view>
					</view>
				</view>
				<text class="nav-title">{{ currentYear }}{{ seasonText }}AI冲刺营</text>
				<view class="nav-right"></view>
			</view>
		</view>
		
		<!-- 占位元素，防止内容被 fixed 的导航栏遮挡，并预留适当的间距 -->
		<view :style="{ height: (statusBarHeight + 64) + 'px' }"></view>

		<!-- 顶部横幅 -->
		<view class="hero-section">
			<text class="title">{{ currentYear }}{{ seasonText }}AI冲刺营</text>
			<text class="subtitle">AI 帮你做规划，拿下心仪 Offer</text>
		</view>

		<!-- 交互区域 -->
		<view class="action-section">
			<text class="instruction">AI 将为你联网搜索最新招聘资讯，并生成专属的{{ seasonText }}冲刺建议和备考时间表：</text>
			
			<view class="input-group">
				<text class="input-label">你的专业</text>
				<input 
					class="major-input" 
					v-model="userMajor" 
					type="text" 
					placeholder="例如：软件工程" 
					maxlength="25"
				/>
				<text class="word-count">{{ userMajor.length }}/25</text>
			</view>

			<button class="generate-btn" :disabled="loading || !userMajor.trim()" @click="generateAdvice">
				{{ loading ? '生成中...' : '生成我的专属冲刺建议' }}
			</button>
		</view>

		<!-- 结果展示区域 -->
		<view class="result-section" v-if="resultText || loading">
			<view class="result-card">
				<view class="card-header">
					<text class="card-title">💡 你的{{ seasonText }}专属指南</text>
				</view>
				<view class="card-content">
					<rich-text :nodes="formattedResult"></rich-text>
					<view v-if="loading" class="loading-indicator">
						<text>AI正在思考中，请稍候...</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { requestAiChatStream } from '@/utils/ai.js'
	import { getRecruitmentSeason, getCurrentYear } from '@/utils/date.js'
	import themeMixin from '@/utils/themeMixin.js'
	// 如果需要解析 markdown，可以使用类似 marked 或者自行简单处理，这里我们用基础的替换
	export default {
		mixins: [themeMixin],
		data() {
			return {
				loading: false,
				resultText: '',
				userMajor: '',
				statusBarHeight: 20
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (e) => {
					this.statusBarHeight = e.statusBarHeight;
				}
			});
		},
		computed: {
			currentYear() {
				return getCurrentYear();
			},
			seasonText() {
				return getRecruitmentSeason();
			},
			formattedResult() {
				if (!this.resultText) return '';
				// 简单的 Markdown 转 HTML 处理
				let html = this.resultText
					.replace(/\n/g, '<br/>')
					.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
					.replace(/### (.*?)(<br\/>|$)/g, '<h3>$1</h3>')
					.replace(/## (.*?)(<br\/>|$)/g, '<h2>$1</h2>')
					.replace(/# (.*?)(<br\/>|$)/g, '<h1>$1</h1>');
				return html;
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			generateAdvice() {
				if (this.loading || !this.userMajor.trim()) return;
				this.loading = true;
				this.resultText = '';
				
				const messages = [
					{ role: 'user', content: `我是【${this.userMajor.trim()}】专业的学生。请给我一份针对${this.currentYear}届${this.seasonText}的建议和冲刺时间安排表。` }
				];
				
				requestAiChatStream(
					messages,
					{ mode: 'SPRING_CAMP' },
					(chunkText) => {
						this.resultText = chunkText;
					},
					(finalText) => {
						this.resultText = finalText;
						this.loading = false;
					},
					(err) => {
						uni.showToast({ title: '生成失败，请重试', icon: 'none' });
						this.loading = false;
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.spring-camp-container {
		min-height: 100vh;
		background-color: #f4f7ff;
		padding: 0 30rpx 30rpx;
	}

	.custom-nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background: linear-gradient(135deg, #4AA9FE, #415b9c);
		
		.nav-content {
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			
			.nav-left {
				width: 120rpx;
				display: flex;
				align-items: center;

				.back-btn {
					width: 72rpx;
					height: 72rpx;
					border-radius: 50%;
					background: rgba(255, 255, 255, 0.88);
					display: flex;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
					box-shadow: 0 12rpx 24rpx rgba(20, 120, 115, 0.08);

					.svg-icon {
						display: inline-block;
						mask-size: contain;
						-webkit-mask-size: contain;
						mask-repeat: no-repeat;
						-webkit-mask-repeat: no-repeat;
						mask-position: center;
						-webkit-mask-position: center;
					}

					.back-icon {
						width: 44rpx;
						height: 44rpx;
						background-color: #314658;
						mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==");
						-webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==");
					}
				}
			}
			
			.nav-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #ffffff;
				flex: 1;
				text-align: center;
			}
			
			.nav-right {
				width: 120rpx;
			}
		}
	}

	.hero-section {
		background: linear-gradient(135deg, #4AA9FE, #415b9c);
		border-radius: 24rpx;
		padding: 60rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10rpx 30rpx rgba(74, 169, 254, 0.3);
		margin-bottom: 40rpx;

		.title {
			font-size: 48rpx;
			font-weight: bold;
			color: #ffffff;
			margin-bottom: 16rpx;
		}

		.subtitle {
			font-size: 28rpx;
			color: rgba(255, 255, 255, 0.85);
		}
	}

	.action-section {
		background: #ffffff;
		border-radius: 24rpx;
		padding: 40rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
		margin-bottom: 40rpx;

		.instruction {
			font-size: 28rpx;
			color: #555;
			margin-bottom: 40rpx;
			display: block;
			line-height: 1.6;
			text-align: center;
		}

		.input-group {
			margin-bottom: 40rpx;
			position: relative;
			background-color: #f8fafe;
			border-radius: 16rpx;
			padding: 20rpx 30rpx;
			border: 2rpx solid #e0e8f5;

			.input-label {
				font-size: 24rpx;
				color: #3165d7;
				font-weight: bold;
				margin-bottom: 12rpx;
				display: block;
			}

			.major-input {
				font-size: 32rpx;
				color: #333;
				height: 60rpx;
				line-height: 60rpx;
				width: 100%;
				background: transparent;
			}

			.word-count {
				position: absolute;
				right: 30rpx;
				bottom: 20rpx;
				font-size: 22rpx;
				color: #aaa;
			}
		}

		.generate-btn {
			background: #415b9c;
			color: #fff;
			border-radius: 50rpx;
			font-size: 32rpx;
			font-weight: bold;
			padding: 0 60rpx;
			line-height: 88rpx;
			border: none;
			box-shadow: 0 8rpx 20rpx rgba(65, 91, 156, 0.4);

			&[disabled] {
				opacity: 0.6;
				background: #415b9c;
				box-shadow: none;
			}
		}
	}

	.result-section {
		.result-card {
			background: #ffffff;
			border-radius: 24rpx;
			padding: 40rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

			.card-header {
				margin-bottom: 20rpx;
				border-bottom: 2rpx solid #eee;
				padding-bottom: 20rpx;

				.card-title {
					font-size: 36rpx;
					font-weight: bold;
					color: #3165d7;
				}
			}

			.card-content {
				font-size: 28rpx;
				color: #333;
				line-height: 1.8;

				::v-deep h1, ::v-deep h2, ::v-deep h3 {
					margin: 20rpx 0 10rpx;
					color: #24345b;
				}

				::v-deep strong {
					color: #3165d7;
					font-weight: bold;
				}

				.loading-indicator {
					margin-top: 20rpx;
					text-align: center;
					color: #888;
					font-size: 24rpx;
				}
			}
		}
	}

	.spring-camp-container.theme-dark {
		background-color: #1a1c22;

		.custom-nav-bar {
			background: linear-gradient(135deg, #1e2638, #2a3550);

			.nav-content .nav-left .back-btn {
				background: rgba(255, 255, 255, 0.1);
				box-shadow: none;

				.back-icon {
					background-color: #ffffff;
				}
			}
		}

		.hero-section {
			background: linear-gradient(135deg, #1e2638, #2a3550);
			box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);

			.subtitle {
				color: rgba(255, 255, 255, 0.6);
			}
		}

		.action-section {
			background: #242730;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.2);

			.instruction {
				color: #a0a5b5;
			}

			.input-group {
				background-color: #1a1c22;
				border-color: #2e323e;

				.input-label {
					color: #8AB7FF;
				}

				.major-input {
					color: #e4e6eb;
				}

				.word-count {
					color: #666;
				}
			}

			.generate-btn {
				background: #3a4a73;
				color: #e4e6eb;
				box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.2);

				&[disabled] {
					opacity: 0.5;
					background: #2e364f;
				}
			}
		}

		.result-section .result-card {
			background: #242730;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.2);

			.card-header {
				border-bottom-color: #2e323e;

				.card-title {
					color: #8AB7FF;
				}
			}

			.card-content {
				color: #a0a5b5;

				::v-deep h1, ::v-deep h2, ::v-deep h3 {
					color: #e4e6eb;
				}

				::v-deep strong {
					color: #8AB7FF;
				}

				.loading-indicator {
					color: #666;
				}
			}
		}
	}
</style>
