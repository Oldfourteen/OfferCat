<template>
	<view class="spring-camp-container" :class="themeClass">
		<!-- 页面级几何装饰（象征连接、生长） -->
		<view class="page-decor" aria-hidden="true">
			<view class="pd-blob pd-blob-1"></view>
			<view class="pd-blob pd-blob-2"></view>
			<view class="pd-plus pd-plus-1">
				<view class="pd-plus-bar pd-plus-h"></view>
				<view class="pd-plus-bar pd-plus-v"></view>
			</view>
			<view class="pd-plus pd-plus-2">
				<view class="pd-plus-bar pd-plus-h"></view>
				<view class="pd-plus-bar pd-plus-v"></view>
			</view>
			<view class="pd-ring-soft"></view>
		</view>

		<!-- 自定义顶部导航栏 -->
		<view class="custom-nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="nav-content">
				<view class="nav-left">
					<view class="back-btn" @click="goBack">
						<image class="back-icon-img" :src="springCampBackIcon" mode="aspectFit" />
					</view>
				</view>
				<text class="nav-title">{{ currentYear }}{{ seasonText }}AI冲刺营</text>
				<view class="nav-right"></view>
			</view>
		</view>
		
		<!-- 占位元素，防止内容被 fixed 的导航栏遮挡，并预留适当的间距 -->
		<view class="spring-camp-body">
			<view :style="{ height: (statusBarHeight + 64) + 'px' }"></view>

			<!-- 顶部横幅 -->
			<view class="hero-section">
				<view class="hero-decor" aria-hidden="true">
					<!-- 神经网络式节点连线（右上） -->
					<view class="hero-net">
						<view class="hn-line hn-l1"></view>
						<view class="hn-line hn-l2"></view>
						<view class="hn-line hn-l3"></view>
						<view class="hn-node hn-n1"></view>
						<view class="hn-node hn-n2"></view>
						<view class="hn-node hn-n3"></view>
						<view class="hn-node hn-n4"></view>
					</view>
					<view class="hero-ring hero-ring-1"></view>
					<view class="hero-ring hero-ring-2"></view>
					<view class="hero-triangle"></view>
					<view class="hero-spark hero-spark-1"></view>
					<view class="hero-spark hero-spark-2"></view>
				</view>
				<view class="hero-text-wrap">
					<text class="title">{{ currentYear }}{{ seasonText }}AI冲刺营</text>
					<text class="subtitle">AI 帮你做规划，拿下心仪 Offer</text>
				</view>
			</view>

			<!-- 交互区域 -->
			<view class="action-section">
				<view class="action-decor" aria-hidden="true">
					<view class="ad-orb ad-orb-1"></view>
					<view class="ad-orb ad-orb-2"></view>
					<view class="ad-corner-accent"></view>
				</view>
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
	</view>
</template>

<script>
	import { requestAiChatStream } from '@/utils/ai.js'
	import { getRecruitmentSeason, getCurrentYear } from '@/utils/date.js'
	import themeMixin from '@/utils/themeMixin.js'

	const SPRING_CAMP_BACK_ICON =
		'data:image/svg+xml;charset=utf-8,' +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
				'<path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/>' +
				'</svg>'
		)

	// 如果需要解析 markdown，可以使用类似 marked 或者自行简单处理，这里我们用基础的替换
	export default {
		mixins: [themeMixin],
		data() {
			return {
				loading: false,
				resultText: '',
				userMajor: '',
				statusBarHeight: 20,
				springCampBackIcon: SPRING_CAMP_BACK_ICON
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
		position: relative;
		overflow-x: hidden;
	}

	.spring-camp-body {
		position: relative;
		z-index: 1;
	}

	/* —— 页面背景装饰 —— */
	.page-decor {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}

	.pd-blob {
		position: absolute;
		border-radius: 50%;
	}

	.pd-blob-1 {
		width: 340rpx;
		height: 340rpx;
		top: -100rpx;
		right: -120rpx;
		background: radial-gradient(circle, rgba(74, 169, 254, 0.18) 0%, transparent 68%);
	}

	.pd-blob-2 {
		width: 260rpx;
		height: 260rpx;
		bottom: 8%;
		left: -100rpx;
		background: radial-gradient(circle, rgba(65, 91, 156, 0.14) 0%, transparent 70%);
	}

	.pd-plus {
		position: absolute;
		width: 36rpx;
		height: 36rpx;
	}

	.pd-plus-bar {
		position: absolute;
		background: rgba(65, 91, 156, 0.14);
		border-radius: 3rpx;
	}

	.pd-plus-h {
		width: 100%;
		height: 7rpx;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.pd-plus-v {
		width: 7rpx;
		height: 100%;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
	}

	.pd-plus-1 {
		top: 26%;
		left: 6%;
		opacity: 0.85;
		transform: rotate(12deg);
	}

	.pd-plus-2 {
		top: 62%;
		right: 8%;
		opacity: 0.7;
		transform: rotate(-8deg);
	}

	.pd-ring-soft {
		position: absolute;
		width: 520rpx;
		height: 520rpx;
		left: 50%;
		bottom: -280rpx;
		transform: translateX(-50%);
		border-radius: 50%;
		border: 2rpx solid rgba(74, 169, 254, 0.08);
	}

	.custom-nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background: linear-gradient(90deg, #4AA9FE, #415b9c);
		
		.nav-content {
			height: 60px;
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
					background: rgba(255, 255, 255, 0.92);
					display: flex;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
					box-shadow: 0 6rpx 18rpx rgba(34, 97, 193, 0.14);
				}

				.back-icon-img {
					width: 38rpx;
					height: 38rpx;
					flex-shrink: 0;
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
		position: relative;
		overflow: hidden;
		background: linear-gradient(135deg, #4AA9FE, #415b9c);
		border-radius: 24rpx;
		padding: 60rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10rpx 30rpx rgba(74, 169, 254, 0.3);
		margin-bottom: 40rpx;

		.hero-decor {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			pointer-events: none;
			z-index: 1;
		}

		.hero-text-wrap {
			position: relative;
			z-index: 2;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.hero-net {
			position: absolute;
			top: 0;
			right: 0;
			width: 280rpx;
			height: 240rpx;
		}

		.hn-node {
			position: absolute;
			width: 12rpx;
			height: 12rpx;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.55);
			box-shadow: 0 0 0 2rpx rgba(255, 255, 255, 0.15);
		}

		.hn-n1 {
			top: 36rpx;
			right: 48rpx;
		}

		.hn-n2 {
			top: 100rpx;
			right: 110rpx;
		}

		.hn-n3 {
			top: 158rpx;
			right: 56rpx;
		}

		.hn-n4 {
			top: 72rpx;
			right: 188rpx;
		}

		.hn-line {
			position: absolute;
			height: 2rpx;
			background: rgba(255, 255, 255, 0.22);
			transform-origin: center center;
			border-radius: 2rpx;
		}

		.hn-l1 {
			top: 52rpx;
			right: 92rpx;
			width: 88rpx;
			transform: rotate(52deg);
		}

		.hn-l2 {
			top: 118rpx;
			right: 78rpx;
			width: 72rpx;
			transform: rotate(-38deg);
		}

		.hn-l3 {
			top: 88rpx;
			right: 136rpx;
			width: 96rpx;
			transform: rotate(18deg);
		}

		.hero-ring {
			position: absolute;
			border-radius: 50%;
			border: 2rpx solid rgba(255, 255, 255, 0.2);
		}

		.hero-ring-1 {
			width: 200rpx;
			height: 200rpx;
			top: -70rpx;
			right: -50rpx;
		}

		.hero-ring-2 {
			width: 120rpx;
			height: 120rpx;
			bottom: -36rpx;
			left: -24rpx;
			opacity: 0.65;
		}

		.hero-triangle {
			position: absolute;
			bottom: 16rpx;
			left: 48rpx;
			width: 0;
			height: 0;
			border-left: 22rpx solid transparent;
			border-right: 22rpx solid transparent;
			border-bottom: 38rpx solid rgba(255, 255, 255, 0.14);
			transform: rotate(-8deg);
		}

		.hero-spark {
			position: absolute;
			border-radius: 50%;
			background: rgba(255, 200, 87, 0.42);
			box-shadow: 0 0 28rpx rgba(255, 200, 87, 0.22);
		}

		.hero-spark-1 {
			width: 14rpx;
			height: 14rpx;
			bottom: 32%;
			left: 14%;
		}

		.hero-spark-2 {
			width: 10rpx;
			height: 10rpx;
			top: 22%;
			right: 26%;
			opacity: 0.75;
		}

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
		position: relative;
		overflow: hidden;
		background: #ffffff;
		border-radius: 24rpx;
		padding: 40rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
		margin-bottom: 40rpx;

		.action-decor {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			pointer-events: none;
			z-index: 0;
		}

		.ad-orb {
			position: absolute;
			border-radius: 50%;
		}

		.ad-orb-1 {
			width: 200rpx;
			height: 200rpx;
			top: -56rpx;
			right: -40rpx;
			background: radial-gradient(circle at 28% 32%, rgba(74, 169, 254, 0.14), transparent 62%);
		}

		.ad-orb-2 {
			width: 140rpx;
			height: 140rpx;
			bottom: 80rpx;
			left: -50rpx;
			background: radial-gradient(circle at 60% 40%, rgba(65, 91, 156, 0.08), transparent 65%);
		}

		.ad-corner-accent {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 140rpx;
			height: 140rpx;
			background: linear-gradient(315deg, transparent 52%, rgba(255, 200, 87, 0.07) 52%);
			border-radius: 0 0 24rpx 0;
		}

		.instruction,
		.input-group,
		.generate-btn {
			position: relative;
			z-index: 1;
		}

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

		.pd-blob-1 {
			background: radial-gradient(circle, rgba(138, 183, 255, 0.12) 0%, transparent 68%);
		}

		.pd-blob-2 {
			background: radial-gradient(circle, rgba(58, 74, 115, 0.35) 0%, transparent 70%);
		}

		.pd-plus-bar {
			background: rgba(138, 183, 255, 0.12);
		}

		.pd-ring-soft {
			border-color: rgba(138, 183, 255, 0.06);
		}

		.custom-nav-bar {
			background: linear-gradient(135deg, #1e2638, #2a3550);

			.nav-content .nav-left .back-btn {
				background: rgba(255, 255, 255, 0.92);
				box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.2);
			}
		}

		.hero-section {
			background: linear-gradient(135deg, #1e2638, #2a3550);
			box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);

			.hn-node {
				background: rgba(138, 183, 255, 0.45);
				box-shadow: 0 0 0 2rpx rgba(138, 183, 255, 0.12);
			}

			.hn-line {
				background: rgba(138, 183, 255, 0.2);
			}

			.hero-ring {
				border-color: rgba(138, 183, 255, 0.18);
			}

			.hero-triangle {
				border-bottom-color: rgba(138, 183, 255, 0.12);
			}

			.hero-spark {
				background: rgba(255, 200, 87, 0.28);
				box-shadow: 0 0 24rpx rgba(255, 200, 87, 0.15);
			}

			.subtitle {
				color: rgba(255, 255, 255, 0.6);
			}
		}

		.action-section {
			background: #242730;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.2);

			.ad-orb-1 {
				background: radial-gradient(circle at 28% 32%, rgba(138, 183, 255, 0.1), transparent 62%);
			}

			.ad-orb-2 {
				background: radial-gradient(circle at 60% 40%, rgba(58, 74, 115, 0.25), transparent 65%);
			}

			.ad-corner-accent {
				background: linear-gradient(315deg, transparent 52%, rgba(255, 200, 87, 0.06) 52%);
			}

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
