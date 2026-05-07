<template>
	<view class="captcha-container" @click="handleVerify">
		<view class="left-section">
			<view class="checkbox" :class="{'verified': isVerified, 'loading': isVerifying}">
				<view v-if="isVerified" class="check-icon"></view>
				<view v-else-if="isVerifying" class="spinner"></view>
			</view>
			<text class="text">进行人机身份验证</text>
		</view>
		<view class="right-section">
			<image class="recaptcha-logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj4KICA8cGF0aCBmaWxsPSIjNDI4NUY0IiBkPSJNMTIgMi41YTkuNSA5LjUgMCAwIDAtOS41IDkuNUgwbDMuNSAzLjVMNyAxMkg0LjVhNy41IDcuNSAwIDEgMSAyLjIgNS4zbC0xLjQgMS40QTkuNSA5LjUgMCAxIDAgMTIgMi41eiIvPgo8L3N2Zz4=" mode="aspectFit"></image>
			<view class="privacy-text">reCAPTCHA</view>
			<view class="privacy-links">隐私权 - 使用条款</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isVerified: false,
				isVerifying: false
			}
		},
		methods: {
			handleVerify() {
				if (this.isVerified || this.isVerifying) return;
				
				this.isVerifying = true;
				// Simulate network request delay
				setTimeout(() => {
					this.isVerifying = false;
					this.isVerified = true;
					this.$emit('verify', true);
				}, 1000);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.captcha-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 74px;
		background-color: #f9f9f9;
		border: 1px solid #d3d3d3;
		border-radius: 3px;
		padding: 0 12px;
		box-sizing: border-box;
		margin-bottom: 20px;
		box-shadow: 0 0 4px rgba(0,0,0,0.08);
		
		.left-section {
			display: flex;
			align-items: center;
			
			.checkbox {
				width: 28px;
				height: 28px;
				background-color: #fff;
				border: 2px solid #c1c1c1;
				border-radius: 2px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 12px;
				transition: all 0.3s;
				box-sizing: border-box;
				
				&.verified {
					border-color: #fff;
					background-color: #fff;
				}
				
				.check-icon {
					width: 8px;
					height: 16px;
					border-bottom: 3px solid #009e5f;
					border-right: 3px solid #009e5f;
					transform: rotate(45deg);
					margin-bottom: 4px;
				}
				
				.spinner {
					width: 16px;
					height: 16px;
					border: 2px solid #f3f3f3;
					border-top: 2px solid #4b609a;
					border-radius: 50%;
					animation: spin 1s linear infinite;
				}
			}
			
			.text {
				font-size: 14px;
				color: #222;
			}
		}
		
		.right-section {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			.recaptcha-logo {
				width: 28px;
				height: 28px;
				margin-bottom: 2px;
			}
			
			.privacy-text {
				font-size: 11px;
				color: #555;
				margin-bottom: 2px;
			}
			
			.privacy-links {
				font-size: 9px;
				color: #555;
			}
		}
	}
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>