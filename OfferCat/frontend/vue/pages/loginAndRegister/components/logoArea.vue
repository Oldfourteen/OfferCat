<template>
	<!-- logo-area -->
	<view class="logo-area">
		<!-- 柔和渐变衬底保留，不使用描边与外阴影，避免像套了一层白框 -->
		<view class="logo-backdrop">
			<image class="logo" src="/static/logo-nobg.png" mode="aspectFit"></image>
		</view>
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

	.logo-backdrop {
		padding: 14px 18px;
		border-radius: 36px;
		border: none;
		box-shadow: none;
		background: linear-gradient(
			165deg,
			rgba(93, 118, 189, 0.1) 0%,
			rgba(255, 255, 255, 0.65) 55%,
			rgba(255, 255, 255, 0.35) 100%
		);
	}

	.logo-area .logo {
		height: 160px;
		width: 160px;
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
