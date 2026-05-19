<template>
	<!-- logo-area -->
	<view class="logo-area">
		<!-- Logo 图片作为欢迎页品牌识别的核心视觉元素。 -->
		<image class="logo" src="/static/logo-nobg.png" mode="aspectFit"></image>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.logo-area {
		width: 100%;
		margin-bottom: 26px;
		display: flex;
		justify-content: center;
		animation: fadeInUp 0.8s ease-out 0.1s both;
	}

	.logo-area .logo {
		height: 180px;
		width: 180px;
		display: block;
		border: none;
		animation: scaleIn 0.6s ease-out 0.3s both;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
