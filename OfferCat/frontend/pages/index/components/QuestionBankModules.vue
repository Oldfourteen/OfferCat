<template>
	<view class="question-bank" :class="themeClass">
		<view class="section-head">
			<!-- 标题区说明题库模块提供笔试与面试两类刷题能力。 -->
			<view>
				<text class="section-title">题库专区</text>
				<text class="section-subtitle">面试真题和笔试真题一站式刷题</text>
			</view>
		</view>

		<view class="module-list">
			<!-- 模块列表根据配置项渲染题库入口卡片。 -->
			<view
				v-for="item in modules"
				:key="item.key"
				class="module-card"
				:class="item.cardClass"
				@click="goModule(item)"
			>
				<view class="module-copy">
					<view class="module-icon" :class="item.iconClass">
					<image v-if="item.svgIcon" :src="item.svgIcon" class="module-svg-icon" :class="{ 'module-svg-icon-interview': item.key === 'interview' }" mode="aspectFit" />
					<text v-else>{{ item.icon }}</text>
				</view>
					<text class="module-title">{{ item.title }}</text>
					<text class="module-desc">{{ item.desc }}</text>
					<view class="module-meta-chip">
						<text class="module-meta">{{ item.meta }}</text>
					</view>
				</view>
				<view class="module-arrow">→</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'QuestionBankModules',
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		computed: {
			themeClass() {
				// 题库容器按主题切换浅色/深色外观。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		data() {
			return {
				// 两类题库入口的静态配置，包含标题、文案和跳转地址。
				modules: [
					{
						key: 'written',
						title: '笔试真题',
						desc: '聚合近年校招与实习笔试套题，按公司筛选',
						meta: '36 套真题 · 热门公司持续更新',
						svgIcon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTUzMjk3NzQ4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0MTUiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMzkyLjkyIDc2MS4yN2ExNjcgMTY3IDAgMCAxLTE1My4xOS0xNTMuMTlxLTQtNDkuNS00LTk5LjE2IDAtNDkuOTIgNC05OS43N0ExNjcgMTY3IDAgMCAxIDM5Mi45MiAyNTZxNDkuNjUtNCA5OS40Ni00dDk5LjQ3IDRBMTY3IDE2NyAwIDAgMSA3NDUgNDA5LjE1YzIgMTEuODUgMiAxMy44NSAyIDEzLjg1IDAgMjQuNS03LjI5IDU3LjE0LTI0IDc1LjA2TDQ4Mi41NyA3MzQuNDFDNDY0IDc1MyA0MzIuNDYgNzYyLjY5IDQwNiA3NjNjLTAuNCAwLTIgMC0xMy4wOC0xLjczeiIgZmlsbD0iI0NBRTBGRiIgcC1pZD0iMjQxNiI+PC9wYXRoPjxwYXRoIGQ9Ik01OTYuNjQgODg1Ljg2YTI3LjUgMjcuNSAwIDAgMS0yNy41LTI3LjQ5bC0wLjA2LTEyMS42YTI3LjUyIDI3LjUyIDAgMCAxIDguMDYtMTkuNDZsMTgzLjU5LTE4My41OGEyNy40OSAyNy40OSAwIDAgMSAzOC44OSAwbDEyMS4wOSAxMjEuMDlhMjcuNSAyNy41IDAgMCAxIDAgMzguODlMNzM3LjI2IDg3Ny4xNWEyNy40NiAyNy40NiAwIDAgMS0xOS4zIDguMDZsLTEyMS4xNyAwLjY1eiBtMjcuNDUtMTM3LjcxdjgyLjU2bDgyLjIzLTAuNDQgMTU2LTE1Ni04Mi4yLTgyLjJ6IiBmaWxsPSIjMUE1RjhFIiBwLWlkPSIyNDE3Ij48L3BhdGg+PHBhdGggZD0iTTQ5Mi41NiA4ODRjLTQ1LjU4IDAtOTEuNzMtMS44NC0xMzcuMTUtNS40N2EyNTQuMTEgMjU0LjExIDAgMCAxLTIzMy4wOC0yMzMuMDZjLTMuNjItNDUuMy01LjQ2LTkxLjMtNS40Ny0xMzYuNzQgMC00NS43MSAxLjgzLTkyIDUuNDctMTM3LjU2YTI1NC4xMyAyNTQuMTMgMCAwIDEgMjMzLjA4LTIzMy4wOWM0NS40Mi0zLjYyIDkxLjU3LTUuNDcgMTM3LjE1LTUuNDdzOTEuNzIgMS44NSAxMzcuMTUgNS40N2EyNTQuMTMgMjU0LjEzIDAgMCAxIDIzMy4wOCAyMzMuMDljMy40OSA0My41OSAzLjQ4IDUwLjcxIDMuNDcgOTAuMjN2Ni45MmEyNy41IDI3LjUgMCAwIDEtNTUgMHYtNi45NGMwLTM4LjUxIDAtNDQuNDMtMy4yOS04NS44M2ExOTkuMTIgMTk5LjEyIDAgMCAwLTE4Mi42NC0xODIuNjRjLTQ0LTMuNTEtODguNjUtNS4zLTEzMi43Ny01LjNzLTg4LjggMS43OS0xMzIuNzcgNS4zYTE5OS4xMiAxOTkuMTIgMCAwIDAtMTgyLjY0IDE4Mi42NGMtMy41MiA0NC4xMS01LjMgODguOTEtNS4yOSAxMzMuMTcgMCA0NCAxLjc5IDg4LjUyIDUuMjkgMTMyLjM3YTE5OS4xMiAxOTkuMTIgMCAwIDAgMTgyLjY0IDE4Mi42NGM0NCAzLjUxIDg4LjY1IDUuMjkgMTMyLjc3IDUuMjlhMjcuNSAyNy41IDAgMCAxIDAgNTV6IiBmaWxsPSIjMUE1RjhFIiBwLWlkPSIyNDE4Ij48L3BhdGg+PHBhdGggZD0iTTY3MyA0MTIuMTZIMzA5YTI3LjUgMjcuNSAwIDAgMSAwLTU1aDM2NGEyNy41IDI3LjUgMCAwIDEgMCA1NXpNMzA5IDU1NC4yM2EyNy41IDI3LjUgMCAwIDEgMC01NWgyNjEuMzJhMjcuNSAyNy41IDAgMSAxIDAgNTV6IiBmaWxsPSIjMUE1RjhFIiBwLWlkPSIyNDE5Ij48L3BhdGg+PC9zdmc+',
						url: '/subPages/questionBank/written',
						cardClass: 'is-written',
						iconClass: 'icon-written'
					},
					{
						key: 'interview',
						title: '面试真题',
						desc: '高频岗位问法拆解，边练边复盘表达逻辑',
						meta: '28 组题单 · 含技术与综合面',
						svgIcon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTU5OTg5NzY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDExOTUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYwOTE5IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc0NC42Nzg0IDY1OC4wMzM3NzhhMjM4LjkzMzMzMyAyMzguOTMzMzMzIDAgMCAwIDEwOC44Mjg0NDQtMjAwLjQxOTU1NmMwLTEzMS42NDA4ODktMTA2LjY2NjY2Ny0yMzguNjQ4ODg5LTIzNy43Mzg2NjYtMjM4LjY0ODg4OS0yNy4zMDY2NjcgMC01My40NzU1NTYgNC42MDgtNzcuOTM3Nzc4IDEzLjE5ODIyM2EzMS42MzAyMjIgMzEuNjMwMjIyIDAgMCAwLTIuMTYxNzc4LTM2LjU3OTU1NiAyMzYuNjAwODg5IDIzNi42MDA4ODkgMCAwIDAtMTg0LjYwNDQ0NC04OC4zNDg0NDRjLTEzMS4wNzIgMC0yMzcuNzM4NjY3IDEwNy4wNjQ4ODktMjM3LjczODY2NyAyMzguNjQ4ODg4IDAgODEuNDY0ODg5IDQxLjE4NzU1NiAxNTYuNTU4MjIyIDEwOC44Mjg0NDUgMjAwLjQ3NjQ0NWEzNTAuNjA2MjIyIDM1MC42MDYyMjIgMCAwIDAtMTU0LjIyNTc3OCAxMTkuNzUxMTExQTM0OS45MjM1NTYgMzQ5LjkyMzU1NiAwIDAgMCAwLjAwMjg0NCA4NzQuMzgyMjIyYTMxLjQwMjY2NyAzMS40MDI2NjcgMCAwIDAgNjIuNTc3Nzc4LTAuMjI3NTU1YzAtMTU5Ljc0NCAxMjkuNDIyMjIyLTI4OS41NjQ0NDQgMjg4LjMxMjg4OS0yODkuNTY0NDQ1YTMxLjU3MzMzMyAzMS41NzMzMzMgMCAwIDAgMC02My4xNDY2NjYgMTc1LjUwMjIyMiAxNzUuNTAyMjIyIDAgMCAxLTE3NC45MzMzMzMtMTc1LjYxNkExNzUuNTAyMjIyIDE3NS41MDIyMjIgMCAwIDEgMzUwLjg5MzUxMSAxNzAuMDk3Nzc4YzUzLjA3NzMzMyAwIDEwMi42Mjc1NTYgMjMuNzc5NTU2IDEzNS45NjQ0NDUgNjUuMDgwODg5YTMxLjE3NTExMSAzMS4xNzUxMTEgMCAwIDAgMTguNDg4ODg4IDExLjA5MzMzMyAyMzguOTMzMzMzIDIzOC45MzMzMzMgMCAwIDAtMTguMzE4MjIyIDQxMS44NzU1NTYgMzUyLjk5NTU1NiAzNTIuOTk1NTU2IDAgMCAwLTIyMi4wMzczMzMgMzI3Ljg1MDY2NmMwIDE3LjM1MTExMSAxNC4wNTE1NTYgMzEuNDAyNjY3IDMxLjI4ODg4OSAzMS40NTk1NTYgMTcuMjk0MjIyIDAgMzEuMjg4ODg5LTE0LjEwODQ0NCAzMS4zNDU3NzgtMzEuNDU5NTU2IDAtMTU5LjY4NzExMSAxMjkuNDIyMjIyLTI4OS40NTA2NjcgMjg4LjMxMjg4OC0yODkuNDUwNjY2IDE1OC44OTA2NjcgMCAyODguMjU2IDEyOS44NzczMzMgMjg4LjI1NiAyODkuNDUwNjY2YTMxLjQwMjY2NyAzMS40MDI2NjcgMSAxIDAgNjIuOTE5MTEyIDAgMzUzLjEwOTMzMyAzNTMuMTA5MzMzIDAgMCAwLTIyMi40MzU1NTYtMzI3Ljk2NDQ0NHogbS0xMjguOTEwMjIyLTM3Ni4wMzU1NTZBMTc1LjM4ODQ0NCAxNzUuMzg4NDQ0IDAgMCAxIDc5MC43NTg0IDQ1Ny41NTczMzNhMTc1LjUwMjIyMiAxNzUuNTAyMjIyIDAgMCAxLTE3NC45MzMzMzMgMTc1LjY3Mjg4OUExNzUuNTAyMjIyIDE3NS41MDIyMjIgMCAwIDEgNDQwLjg5MTczMyA0NTcuNjE0MjIyYTE3NS41MDIyMjIgMTc1LjUwMjIyMiAwIDAgMSAxNzQuOTMzMzM0LTE3NS42NzI4ODl6IiBmaWxsPSIjRkY4RTA0IiBwLWlkPSI2MDkyMCI+PC9wYXRoPjxwYXRoIGQ9Ik0xMTYzLjgzNTczMyA1MC42MzExMTFoLTQuODkyNDQ0YTM0Ljg3Mjg4OSAzNC44NzI4ODkgMCAwIDAtNC44OTI0NDUtMC4yODQ0NDRoLTU1MC41NzA2NjZhMzQuMzA0IDM0LjMwNCAwIDAgMC0zNC41ODg0NDUgMzMuOTYyNjY2djEyNi4xMjI2NjdjMTQuMDUxNTU2LTIuNTYgMjguNTAxMzMzLTMuOTgyMjIyIDQzLjM0OTMzNC0zLjk4MjIyMiAxMzAuMDQ4IDAgMjM1LjUyIDEwMy41Mzc3NzggMjM1LjUyIDIzMS4yNTMzMzMgMCAyMi4zMDA0NDQtMy4yNDI2NjcgNDMuODA0NDQ0LTkuMjE2IDY0LjE3MDY2N2g0MS4xODc1NTVsLTExLjk0NjY2NiA4Mi42NTk1NTVhMjkuODA5Nzc4IDI5LjgwOTc3OCAwIDAgMCA3LjIyNDg4OCAyNC4xNzc3NzggMzAuODkwNjY3IDMwLjg5MDY2NyAwIDAgMCAyMy4zMjQ0NDUgMTAuNTI0NDQ1YzguMzA1Nzc4IDAgMTYuMzI3MTExLTMuNDEzMzMzIDIyLjE4NjY2Ny05LjI3Mjg4OWwxMDYuNDM5MTExLTEwOC4wODg4ODloMTI3LjA4OTc3N2EzNC45ODY2NjcgMzQuOTg2NjY3IDAgMCAwIDkuNjE0MjIzLTEuMzY1MzM0aDAuMTcwNjY2YzE3LjA2NjY2NyAwIDMwLjgzMzc3OC0xMy41Mzk1NTYgMzAuODMzNzc4LTMwLjI2NDg4OFY4MC45NTI4ODlhMzAuNjA2MjIyIDMwLjYwNjIyMiAwIDAgMC0zMC44MzM3NzgtMzAuMjY0ODg5eiIgZmlsbD0iI0ZGOEUwNCIgcC1pZD0iNjA5MjEiPjwvcGF0aD48L3N2Zz4=',
						icon: '面',
						url: '/subPages/questionBank/interview',
						cardClass: 'is-interview',
						iconClass: 'icon-interview'
					}
				]
			}
		},
		methods: {
			goModule(item) {
				// 按配置跳转到对应题库子页面。
				uni.navigateTo({
					url: item.url
				})
			}
		}
	}
</script>

<style lang="scss">
	.question-bank {
		margin-bottom: 24rpx;
		padding: 26rpx;
		border-radius: 36rpx;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, #ffffff 100%);
		box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.12);
	}

	.section-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 18rpx;
	}

	.section-title,
	.section-subtitle {
		display: block;
	}

	.section-title {
		font-size: 34rpx;
		font-weight: 800;
		color: #15305e;
	}

	.section-subtitle {
		margin-top: 10rpx;
		font-size: 22rpx;
		line-height: 1.6;
		color: #7b88a3;
	}

	.module-list {
		margin-top: 24rpx;
		display: flex;
		flex-direction: column;
		gap: 18rpx;
	}

	.module-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx;
		border-radius: 30rpx;
		border: 2rpx solid rgba(49, 101, 215, 0.08);
		box-shadow:
			0 2rpx 4rpx rgba(21, 48, 94, 0.04),
			0 8rpx 20rpx rgba(49, 101, 215, 0.08);
	}

	.module-card.is-written {
		background: linear-gradient(135deg, rgba(34, 153, 232, 0.14) 0%, rgba(255, 255, 255, 0.96) 70%);
	}

	.module-card.is-interview {
		background: linear-gradient(135deg, rgba(100, 232, 208, 0.18) 0%, rgba(255, 255, 255, 0.96) 70%);
	}

	.module-copy {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.module-icon {
			width: 58rpx;
			height: 58rpx;
			border-radius: 18rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			font-weight: 700;
		}

		.module-svg-icon {
			width: 44rpx;
			height: 44rpx;
		}

		.module-svg-icon-interview {
			filter: hue-rotate(128deg) saturate(1.15) brightness(0.88);
		}

	.icon-written {
		background: rgba(34, 153, 232, 0.14);
		color: #1d83d2;
	}

	.icon-interview {
		background: rgba(100, 232, 208, 0.18);
		color: rgba(95, 220, 197, 1.0);
	}

	.module-title,
	.module-desc {
		display: block;
	}

	.module-title {
		margin-top: 16rpx;
		font-size: 30rpx;
		font-weight: 800;
		color: #15305e;
	}

	.module-desc {
		margin-top: 8rpx;
		font-size: 23rpx;
		line-height: 1.6;
		color: #66758f;
	}

	/* 底部统计文案：半透明底透出卡片渐变；灰色描边 + 中性阴影只做凸起感 */
	.module-meta-chip {
		margin-top: 14rpx;
		align-self: flex-start;
		padding: 10rpx 22rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.38);
		border: 2rpx solid rgba(138, 146, 162, 0.42);
		box-shadow:
			inset 0 2rpx 3rpx rgba(255, 255, 255, 0.75),
			inset 0 -2rpx 4rpx rgba(72, 78, 90, 0.07),
			0 3rpx 6rpx rgba(72, 78, 90, 0.06),
			0 8rpx 18rpx rgba(72, 78, 90, 0.1);
	}

	.module-meta {
		display: block;
		font-size: 21rpx;
		font-weight: 700;
		color: #5d76bd;
		line-height: 1.35;
	}

	.module-arrow {
		width: 64rpx;
		height: 64rpx;
		margin-left: 18rpx;
		border-radius: 20rpx;
		// background: rgba(255, 255, 255, 0.84);
		// box-shadow: 0 10rpx 24rpx rgba(49, 101, 215, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #46648f;
	}

	.question-bank.theme-dark {
		background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
		box-shadow: 0 18rpx 42rpx rgba(0, 0, 0, 0.22);
	}

	.question-bank.theme-dark .section-title,
	.question-bank.theme-dark .module-title {
		color: #f4f7fb;
	}

	.question-bank.theme-dark .section-subtitle,
	.question-bank.theme-dark .module-desc {
		color: rgba(255, 255, 255, 0.58);
	}

	.question-bank.theme-dark .module-meta-chip {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(168, 174, 188, 0.38);
		box-shadow:
			inset 0 1rpx 2rpx rgba(255, 255, 255, 0.14),
			inset 0 -2rpx 6rpx rgba(0, 0, 0, 0.28),
			0 4rpx 12rpx rgba(0, 0, 0, 0.3);
	}

	.question-bank.theme-dark .module-meta {
		color: rgba(190, 210, 255, 0.88);
	}

	.question-bank.theme-dark .module-card {
		border-color: rgba(255, 255, 255, 0.06);
		box-shadow:
			0 2rpx 6rpx rgba(0, 0, 0, 0.35),
			0 10rpx 24rpx rgba(0, 0, 0, 0.22);
	}

	.question-bank.theme-dark .module-card.is-written,
	.question-bank.theme-dark .module-card.is-interview {
		background: linear-gradient(135deg, rgba(74, 103, 247, 0.2) 0%, rgba(38, 40, 46, 0.96) 70%);
	}

	.question-bank.theme-dark .module-arrow {
		background: rgba(255, 255, 255, 0.08);
		box-shadow: none;
		color: #dbe4f3;
	}
</style>
