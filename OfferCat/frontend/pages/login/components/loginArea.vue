<template>
	<view class="login-button-area">
		<!-- 主按钮触发一键登录，由父组件决定是否可继续执行。 -->
		<view class="btn primary-btn" @click="onLoginClick">
			本机号码一键登录
		</view>
		
		<!-- 文本入口跳转到其他登录方式页。 -->
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
				// 将一键登录点击事件抛给父页面处理协议校验和登录逻辑。
				this.$emit('login');
			},
			onOtherLoginClick() {
				// 将其他登录方式入口点击事件抛给父页面做页面跳转。
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
