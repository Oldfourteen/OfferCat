<template>
	<view class="qa-card card shadow-soft" :class="themeClass" @click="goAI">
		<view class="qa-avatar">
			<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTU2MTg2NTI5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEzNjUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI5ODgiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNjU3LjE0NjI5MyA4ODMuOTEyNTE5YTUxLjY2OTc3MSA1MS42Njk3NzEgMCAwIDAtNjcuOTc3NzgyIDBMNDEzLjUyNDU3MyAxMDE0LjIxMDIwMWE2MC45MDU0MyA2MC45MDU0MyAwIDAgMS03OS4yOTM1NDUtMTEuMzE1NzYzIDYwLjkwNTQzIDYwLjkwNTQzIDAgMCAxIDExLjMxNTc2My03OS4yOTM1NDVsMTc1LjU2MDczNC0xMzAuMjk3NjgyYTE2MS40OTkyMzUgMTYxLjQ5OTIzNSAwIDAgMSAxOTguMjc1NDY0IDBsMTc1LjY0MzkzOSAxMzAuMjk3NjgyYTU5LjkwNjk4IDU5LjkwNjk4IDAgMCAxIDExLjMxNTc2MyA3OS4yOTM1NDUgNTkuOTA2OTggNTkuOTA2OTggMCAwIDEtNzkuMjkzNTQ1IDExLjMxNTc2M3ogbTAgMCIgZmlsbD0iI0JCQkJDMCIgcC1pZD0iMjk4OSI+PC9wYXRoPjxwYXRoIGQ9Ik0xMDY1LjAxMjk4NCAwLjIwMTM1NEgxODEuMzAxODJBMTczLjA2NDYxIDE3My4wNjQ2MSAwIDAgMCAwIDE3MC4xODc0MTF2NTY2LjQ1Mzc4MWExNzYuNzI1NTkyIDE3Ni43MjU1OTIgMCAwIDAgMTgxLjMwMTgyIDE2OS45MDI4NTNoNDUuMzQ2MjU2YTgwLjU0MTYwNyA4MC41NDE2MDcgMCAwIDAgMzMuOTQ3Mjg5LTExLjMxNTc2M2wyNjYuMjUzMjQ2LTE4Ni45NTk3MDJhMTgwLjA1Mzc1OCAxODAuMDUzNzU4IDAgMCAxIDE5OC4yNzU0NjQgMGwyNjYuMjUzMjQ2IDE4Ni45NTk3MDJhODAuNjI0ODExIDgwLjYyNDgxMSAwIDAgMCAzMy45NDcyODkgMTEuMzE1NzYzaDQ1LjM0NjI1NmExNzMuMDY0NjEgMTczLjA2NDYxIDAgMCAwIDE4MS4zMDE4Mi0xNjkuOTAyODUzVjE3MC4xODc0MTFBMTgxLjU1MTQzMiAxODEuNTUxNDMyIDAgMCAwIDEwNjUuMDEyOTg0IDAuMjAxMzU0ek03MDIuNDkyNTQ5IDU4OS4zNjk4NjVhNTYuMTYyNzk0IDU2LjE2Mjc5NCAwIDAgMS03My42MzU2NjMtMjguMjg5NDA3bC0xMTguOTgxOTItMjU0LjkzNzQ4My0zNC4wMzA0OTMgNzkuMjkzNTQ0aDUuNjU3ODgyYzMzLjk0NzI4OSAwIDc1Ljg4MjE3NSA4Ljk4NjA0NyA3OS4yOTM1NDUgNTQuNDE1NTA4cy00NS4zNDYyNTYgNTguODI1MzI3LTc5LjI5MzU0NSA1OC44MjUzMjZoLTU2LjY2MjAxOWwtMzQuMDMwNDkzIDY3Ljk3Nzc4MmE0OS45MjI0ODQgNDkuOTIyNDg0IDAgMCAxLTczLjYzNTY2NCAyMi42MzE1MjYgNDkuOTIyNDg0IDQ5LjkyMjQ4NCAwIDAgMS0yMi42MzE1MjYtNzMuNjM1NjYzbDQ1LjM0NjI1Ni05Ni4yNjcxOSAxMTguOTgxOTItMjcxLjkxMTEyN2E0OS45MjI0ODQgNDkuOTIyNDg0IDAgMCAxIDUxLjAwNDEzNy0zMy45NDcyODkgNTQuNDE1NTA3IDU0LjQxNTUwNyAwIDAgMSA1MS4wMDQxMzggMzMuOTQ3Mjg5bDE2OS45MDI4NTIgMzY4LjI2MTUyMWE1Ni4xNjI3OTQgNTYuMTYyNzk0IDAgMCAxLTI4LjI4OTQwNyA3My42MzU2NjN6IG0yMDMuOTMzMzQ2LTUxLjAwNDEzN2E1My41MDAyNjIgNTMuNTAwMjYyIDAgMCAxLTU2LjY2MjAxOSA1Ni42NjIwMTkgNTMuNTAwMjYyIDUzLjUwMDI2MiAwIDAgMS01Ni42NjIwMTktNTYuNjYyMDE5VjE3MC4xODc0MTFhNTMuNTAwMjYyIDUzLjUwMDI2MiAwIDAgMSA1Ni42NjIwMTktNTYuNjYyMDE5IDUzLjUwMDI2MiA1My41MDAyNjIgMCAwIDEgNTYuNjYyMDE5IDU2LjY2MjAxOXogbTAgMCIgZmlsbD0iI0JCQkJDMCIgcC1pZD0iMjk5MCI+PC9wYXRoPjwvc3ZnPg==" mode="aspectFit" class="qa-avatar-img" />
		</view>
		<view class="qa-copy">
			<text class="qa-title">有问题找 AI 顾问</text>
			<text class="qa-desc">"帮我看看前端开发的市场前景..."</text>
		</view>
		<view class="qa-action">→</view>
	</view>
</template>

<script>
	export default {
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		methods: {
			goAI(){
				uni.switchTab({
					url: '/pages/AI/AI'
				})
			}
		},
		name: 'ChatFooter'
	}
</script>

<style lang="scss">
	.card {
		position: relative;
		background: #ffffff;
		border: 2rpx solid rgba(75, 189, 180, 0.1);
		border-radius: 32rpx;
		overflow: hidden;
	}

	.shadow-soft {
		box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.2);
	}

	.qa-card {
		display: flex;
		align-items: center;
		padding: 20rpx 22rpx;
		
		.qa-avatar {
			width: 88rpx;
			height: 88rpx;
			border-radius: 24rpx;
			background: #f6fbff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 48rpx;
			margin-right: 20rpx;
			
			.qa-avatar-img {
				width: 56rpx;
				height: 56rpx;
			}
		}
		
		.qa-copy {
			flex: 1;
			display: flex;
			flex-direction: column;
			
			.qa-title {
				font-size: 30rpx;
				font-weight: 700;
				color: #15305e;
			}
			
			.qa-desc {
				margin-top: 8rpx;
				font-size: 22rpx;
				color: #839085;
			}
		}
		
		.qa-action {
			width: 56rpx;
			height: 56rpx;
			border-radius: 50%;
			background: #f3f6f2;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			color: #87948a;
		}
	}

	.qa-card.theme-dark {
		background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
		border-color: rgba(255, 255, 255, 0.06);
	}

	.qa-card.theme-dark .qa-title {
		color: #f4f7fb;
	}

	.qa-card.theme-dark .qa-desc {
		color: rgba(255, 255, 255, 0.58);
	}

	.qa-card.theme-dark .qa-avatar {
		background: rgba(255, 255, 255, 0.08);
	}

	.qa-card.theme-dark .qa-action {
		background: rgba(255, 255, 255, 0.08);
		color: #dbe4f3;
	}
	
	
</style>
