<template>
	<view class="login-button-area">
		<!-- 本机号码一键登录 -->
		<view class="btn primary-btn" @click="onLoginClick">
			本机号码一键登录
		</view>
		
		<!-- 其他登录方式 -->
		<view class="text-link" @click="onOtherLoginClick">
			其他登录方式
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			onLoginClick() {
				this.$emit('login');
			},
			onOtherLoginClick() {
				this.$emit('otherLogin');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-button-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin-top: 10px;

		.btn {
			width: 80%;
			height: 45px;
			border-radius: 25px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			margin-bottom: 20px; /* 两个按钮/文字之间的间距 */
			transition: all 0.2s ease;

			&:active {
				transform: scale(0.98);
			}
		}

		.primary-btn {
			background-color: #5d76bd;
			color: #fff;
			box-shadow: 0 4px 10px rgba(93, 118, 189, 0.3);

			&:active {
				background-color: #4b609a;
			}
		}

		.text-link {
			font-size: 14px;
			color: #666;
			padding: 10px; /* 增加点击热区 */
			transition: opacity 0.2s ease;

			&:active {
				opacity: 0.6;
			}
		}
	}
</style>
