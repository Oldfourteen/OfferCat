<template>
	<view class="feature-card card shadow-soft" :class="themeClass" @click="goAI">
		<view class="feature-cover">
			<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTYwMzI4NjQ0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDExOTUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY5ODg5IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc0NC42Nzg0IDY1OC4wMzM3NzhhMjM4LjkzMzMzMyAyMzguOTMzMzMzIDAgMCAwIDEwOC44Mjg0NDQtMjAwLjQxOTU1NmMwLTEzMS42NDA4ODktMTA2LjY2NjY2Ny0yMzguNjQ4ODg5LTIzNy43Mzg2NjYtMjM4LjY0ODg4OS0yNy4zMDY2NjcgMC01My40NzU1NTYgNC42MDgtNzcuOTM3Nzc4IDEzLjE5ODIyM2EzMS42MzAyMjIgMzEuNjMwMjIyIDAgMCAwLTIuMTYxNzc4LTM2LjU3OTU1NiAyMzYuNjAwODg5IDIzNi42MDA4ODkgMCAwIDAtMTg0LjYwNDQ0NC04OC4zNDg0NDRjLTEzMS4wNzIgMC0yMzcuNzM4NjY3IDEwNy4wNjQ4ODktMjM3LjczODY2NyAyMzguNjQ4ODg4IDAgODEuNDY0ODg5IDQxLjE4NzU1NiAxNTYuNTU4MjIyIDEwOC44Mjg0NDUgMjAwLjQ3NjQ0NWEzNTAuNjA2MjIyIDM1MC42MDYyMjIgMCAwIDAtMTU0LjIyNTc3OCAxMTkuNzUxMTExQTM0OS45MjM1NTYgMzQ5LjkyMzU1NiAwIDAgMCAwLjAwMjg0NCA4NzQuMzgyMjIyYTMxLjQwMjY2NyAzMS40MDI2NjcgMCAwIDAgNjIuNTc3Nzc4LTAuMjI3NTU1YzAtMTU5Ljc0NCAxMjkuNDIyMjIyLTI4OS41NjQ0NDQgMjg4LjMxMjg4OS0yODkuNTY0NDQ1YTMxLjU3MzMzMyAzMS41NzMzMzMgMCAwIDAgMC02My4xNDY2NjYgMTc1LjUwMjIyMiAxNzUuNTAyMjIyIDAgMCAxLTE3NC45MzMzMzMtMTc1LjYxNkExNzUuNTAyMjIyIDE3NS41MDIyMjIgMCAwIDEgMzUwLjg5MzUxMSAxNzAuMDk3Nzc4YzUzLjA3NzMzMyAwIDEwMi42Mjc1NTYgMjMuNzc5NTU2IDEzNS45NjQ0NDUgNjUuMDgwODg5YTMxLjE3NTExMSAzMS4xNzUxMTEgMCAwIDAgMTguNDg4ODg4IDExLjA5MzMzMyAyMzguOTMzMzMzIDIzOC45MzMzMzMgMCAwIDAtMTguMzE4MjIyIDQxMS44NzU1NTYgMzUyLjk5NTU1NiAzNTIuOTk1NTU2IDAgMCAwLTIyMi4wMzczMzMgMzI3Ljg1MDY2NmMwIDE3LjM1MTExMSAxNC4wNTE1NTYgMzEuNDAyNjY3IDMxLjI4ODg4OSAzMS40NTk1NTYgMTcuMjk0MjIyIDAgMzEuMjg4ODg5LTE0LjEwODQ0NCAzMS4zNDU3NzgtMzEuNDU5NTU2IDAtMTU5LjY4NzExMSAxMjkuNDIyMjIyLTI4OS40NTA2NjcgMjg4LjMxMjg4OC0yODkuNDUwNjY2IDE1OC44OTA2NjcgMCAyODguMjU2IDEyOS44NzczMzMgMjg4LjI1NiAyODkuNDUwNjY2YTMxLjQwMjY2NyAzMS40MDI2NjcgMSAxIDAgNjIuOTE5MTEyIDAgMzUzLjEwOTMzMyAzNTMuMTA5MzMzIDAgMCAwLTIyMi40MzU1NTYtMzI3Ljk2NDQ0NHogbS0xMjguOTEwMjIyLTM3Ni4wMzU1NTZBMTc1LjM4ODQ0NCAxNzUuMzg4NDQ0IDAgMCAxIDc5MC43NTg0IDQ1Ny41NTczMzNhMTc1LjUwMjIyMiAxNzUuNTAyMjIyIDAgMCAxLTE3NC45MzMzMzMgMTc1LjY3Mjg4OUExNzUuNTAyMjIyIDE3NS41MDIyMjIgMCAwIDEgNDQwLjg5MTczMyA0NTcuNjE0MjIyYTE3NS41MDIyMjIgMTc1LjUwMjIyMiAwIDAgMSAxNzQuOTMzMzM0LTE3NS42NzI4ODl6IiBmaWxsPSIjRkY4RTA0IiBwLWlkPSI2OTg5MCI+PC9wYXRoPjxwYXRoIGQ9Ik0xMTYzLjgzNTczMyA1MC42MzExMTFoLTQuODkyNDQ0YTM0Ljg3Mjg4OSAzNC44NzI4ODkgMCAwIDAtNC44OTI0NDUtMC4yODQ0NDRoLTU1MC41NzA2NjZhMzQuMzA0IDM0LjMwNCAwIDAgMC0zNC41ODg0NDUgMzMuOTYyNjY2djEyNi4xMjI2NjdjMTQuMDUxNTU2LTIuNTYgMjguNTAxMzMzLTMuOTgyMjIyIDQzLjM0OTMzNC0zLjk4MjIyMiAxMzAuMDQ4IDAgMjM1LjUyIDEwMy41Mzc3NzggMjM1LjUyIDIzMS4yNTMzMzMgMCAyMi4zMDA0NDQtMy4yNDI2NjcgNDMuODA0NDQ0LTkuMjE2IDY0LjE3MDY2N2g0MS4xODc1NTVsLTExLjk0NjY2NiA4Mi42NTk1NTVhMjkuODA5Nzc4IDI5LjgwOTc3OCAwIDAgMCA3LjIyNDg4OCAyNC4xNzc3NzggMzAuODkwNjY3IDMwLjg5MDY2NyAwIDAgMCAyMy4zMjQ0NDUgMTAuNTI0NDQ1YzguMzA1Nzc4IDAgMTYuMzI3MTExLTMuNDEzMzMzIDIyLjE4NjY2Ny05LjI3Mjg4OWwxMDYuNDM5MTExLTEwOC4wODg4ODloMTI3LjA4OTc3N2EzNC45ODY2NjcgMzQuOTg2NjY3IDAgMCAwIDkuNjE0MjIzLTEuMzY1MzM0aDAuMTcwNjY2YzE3LjA2NjY2NyAwIDMwLjgzMzc3OC0xMy41Mzk1NTYgMzAuODMzNzc4LTMwLjI2NDg4OFY4MC45NTI4ODlhMzAuNjA2MjIyIDMwLjYwNjIyMiAwIDAgMC0zMC44MzM3NzgtMzAuMjY0ODg5eiIgZmlsbD0iI0ZGOEUwNCIgcC1pZD0iNjk4OTEiPjwvcGF0aD48L3N2Zz4=" class="feature-icon" />
		</view>
		<view class="feature-copy">
			<view class="feature-title-row">
				<text class="feature-title">AI 模拟面试</text>
				<text class="feature-tag">Hot</text>
			</view>
			<text class="feature-desc">真实大厂题库，AI 面试官全方位追问表达与拆解能力。</text>
		</view>
		<view class="feature-arrow">→</view>
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
		methods:{
			goAI(){
				uni.switchTab({
					url:"/pages/AI/AI"
				})
			}
		}
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

	
	.feature-card {
		display: flex;
		align-items: center;
		padding: 24rpx;
		margin-bottom: 24rpx;
	}
	
	.feature-cover {
		width: 96rpx;
		height: 96rpx;
		border-radius: 24rpx;
		background: linear-gradient(135deg, #fff2d9, #ffe3b7);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 54rpx;
		margin-right: 22rpx;
	}
	
	.feature-cover .feature-icon {
		width: 64rpx;
		height: 64rpx;
	}
	
	.feature-copy {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	
	.feature-title-row {
		display: flex;
		align-items: center;
	}
	
	.feature-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #15305e;
	}
	
	.feature-tag {
		margin-left: 12rpx;
		padding: 4rpx 14rpx;
		border-radius: 999rpx;
		background: #ffe6ea;
		font-size: 20rpx;
		font-weight: 700;
		color: #ff6f83;
	}
	
	.feature-desc {
		margin-top: 10rpx;
		font-size: 24rpx;
		line-height: 1.5;
		color: #7a877d;
	}
	
	.feature-arrow {
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

	.feature-card.theme-dark {
		background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
		border-color: rgba(255, 255, 255, 0.06);
	}

	.feature-card.theme-dark .feature-title {
		color: #f4f7fb;
	}

	.feature-card.theme-dark .feature-desc {
		color: rgba(255, 255, 255, 0.58);
	}

	.feature-card.theme-dark .feature-arrow {
		background: rgba(255, 255, 255, 0.08);
		color: #dbe4f3;
	}
</style>
