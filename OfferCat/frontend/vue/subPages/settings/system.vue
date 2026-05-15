<template>
	<view class="settings-page" :class="themeClass">
		<view class="settings-topbar">
			<view class="back-btn" @click="goBack">
				<image class="back-icon-img" :src="settingsTopBackIcon" mode="aspectFit" />
			</view>
			<text class="topbar-title">设置</text>
			<text class="placeholder"></text>
		</view>

		<scroll-view class="settings-scroll" scroll-y :show-scrollbar="false">
			<view class="settings-content">
				<view class="account-card" @click="openAccountSecurity">
					<view class="account-main">
						<view class="account-icon">
						<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDAzMjExNjA0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExNDUyMSIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik0zMTYuMTc3NzQ5IDcwNy44MjIyMjggMzgwLjYyMjE2NSA1MTYuNzExMTA1IDc0NS4wNjY3MjQgMTUwLjA0NDQ0NCA4NzMuOTU1NTU2IDI3OC45MzMzMzIgNTA3LjI4ODkxNyA2NDMuMzc3Nzg5IDMxNi4xNzc3NDkgNzA3LjgyMjIyOFpNOTk3LjMzMzIyIDI2LjY2NjY2N0MxMDE1LjExMTIyNSA0NC40NDQ1ODEgMTAyNCA2NS45MjU4MjUgMTAyNCA5MS4xMTExMDUgMTAyNCAxMTYuMjk2Mzg1IDEwMTUuMTExMjI1IDEzNy43Nzc2MyA5OTcuMzMzMjIgMTU1LjU1NTU2N0w5MDMuOTk5OTQzIDI0OC44ODg4ODkgNzc1LjExMTExMSAxMjAuMDAwMDExIDg2OC40NDQzODggMjYuNjY2NjY3Qzg4Ni4yMjIzOTMgOC44ODg3NTIgOTA3LjcwMzYzNyAwIDkzMi44ODg4MDQgMCA5NTguMDc0MTk3IDAgOTc5LjU1NTU0MiA4Ljg4ODc1MiA5OTcuMzMzMjIgMjYuNjY2NjY3TDk5Ny4zMzMyMiAyNi42NjY2NjdaTTcxLjExMTExMSA5OS41NTU1NTYgNTc1LjU1NTU4NCA5OS41NTU1NTYgNTA0LjQ0NDQ3MyAxNzAuNjY2NjY3IDcxLjExMTExMSAxNzAuNjY2NjY3IDcxLjExMTExMSA5NTIuODg4ODg5IDg1My4zMzMzMzMgOTUyLjg4ODg4OSA4NTMuMzMzMzMzIDUxOS41NTU1NSA5MjQuNDQ0NDQ0IDQ0OC40NDQ0MzkgOTI0LjQ0NDQ0NCA5NTIuODg4ODg5QzkyNC40NDQ0NDQgOTcyLjE0ODIzNSA5MTcuNDA3NTE2IDk4OC44MTQ3NDYgOTAzLjMzMzIwNSAxMDAyLjg4ODg5NyA4ODkuMjU5MTIyIDEwMTYuOTYzMDI2IDg3Mi41OTI3MjUgMTAyNCA4NTMuMzMzMzMzIDEwMjRMNzEuMTExMTExIDEwMjRDNTEuODUxNzE5IDEwMjQgMzUuMTg1MzIzIDEwMTYuOTYzMDI2IDIxLjExMTIzOSAxMDAyLjg4ODg5NyA3LjAzNjkyOCA5ODguODE0NzQ2IDAgOTcyLjE0ODIzNSAwIDk1Mi44ODg4ODlMMCAxNzAuNjY2NjY3QzAgMTUxLjQwNzM2NiA3LjAzNjkyOCAxMzQuNzQwNzY0IDIxLjExMTIzOSAxMjAuNjY2NzQ5IDM1LjE4NTMyMyAxMDYuNTkyNTc1IDUxLjg1MTcxOSA5OS41NTU1NTYgNzEuMTExMTExIDk5LjU1NTU1Nkw3MS4xMTExMTEgOTkuNTU1NTU2WiIgZmlsbD0iIzMwQjBFNiIgcC1pZD0iMTE0NTIyIj48L3BhdGg+PC9zdmc+" class="account-icon-img" mode="aspectFit" />
					</view>
						<view class="account-copy">
							<text class="account-title">资料编辑</text>
							<text class="account-desc">{{ accountSummary }}</text>
						</view>
					</view>
					<view class="account-side">
						<CommonAvatar :src="avatarUrl" image-class="account-avatar" />
						<text class="row-arrow">›</text>
					</view>
				</view>

				<view class="group-block">
					<text class="group-title">功能</text>
					<view class="list-card">
						<view class="setting-row clickable no-border" @click="openThemeModeSheet">
							<view class="row-main">
								<view class="row-icon icon-cyan">
									<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDAzMzc2MDI0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyNDUwNSIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik01NTIuNzUgNTYzLjIzOWM0NC40IDI2LjM0OCA5OS4xIDI2LjM0OCAxNDMuNSAwQzc0MC42NSA1MzYuODkgNzY4IDQ4OC4xOTcgNzY4IDQzNS41YzAtODEuNDYyLTY0LjI0Ny0xNDcuNS0xNDMuNS0xNDcuNVM0ODEgMzU0LjAzOCA0ODEgNDM1LjVjMCA1Mi42OTcgMjcuMzUgMTAxLjM5IDcxLjc1IDEyNy43Mzl6IiBmaWxsPSIjQTVFOEQwIiBwLWlkPSIxMjQ1MDYiPjwvcGF0aD48cGF0aCBkPSJNNDcxLjI2NCA5NTJjLTE4Ljg0MiAwLTM4LjU4MS0xLjc5Ni02MC4xMTUtNC40OWwtNS4zODQtMC44OTljLTE1Mi41MzMtMjMuMzUyLTI1Ni42MTQtMTcxLjU1LTI2MS4xLTE3Ny44MzctMTQ3LjE0OS0yMjQuNTQxLTczLjU3NC00NTEuNzc3IDY1LjUtNTc3LjUyQzM0OC4zNCA2NS41MTEgNTc4LjkzNCAxMS42MjEgNzgwLjgxNCAxNzQuMTljMTMwLjEwMiAxMDUuMDg1IDE2OS41OCAyNTAuNTg4IDE3MS4zNzUgMjU2Ljg3NXYxLjc5N2MxOC44NDMgMTAyLjM5IDMuNTkgMTc3LjgzNi00NS43NiAyMjYuMzM3LTc1LjM2OCA3Mi43NTItMjAwLjA4NiA0OS40LTIxNy4xMzQgNDUuODA3LTIzLjMyOC0yLjY5NS00MC4zNzYgNC40OS01Mi45MzggMTkuNzYtMTMuNDU4IDE3LjA2NC0xNi4xNSAzOS41MTgtMTEuNjY0IDUyLjk5MSAxMi41NjIgMzcuNzIzIDE0LjM1NiA2Ni40NjQgNS4zODQgODguMDJDNjA0LjA1OCA5MjIuMzYxIDU1MS4xMiA5NTIgNDcxLjI2NCA5NTJ6IG0tNTEuOTczLTgwLjQ4OGw1LjA4MyAwLjg0OWM4Mi4xNzkgMTIuNzIgMTMyLjE2NC0zLjM5MyAxNTIuNDk3LTQ5LjE4OCAwLTAuODQ5IDQuMjM2LTExLjg3My02Ljc3OC00NS43OTYtMTEuMDEzLTMwLjUzLTIuNTQxLTcwLjM5IDE5LjQ4Ni05Ny41MjggMjIuODc1LTI4LjgzNCA1Ni43NjMtNDEuNTU2IDk2LjU4MS0zNy4zMTVsMi41NDIgMC44NDhjMC44NDcgMCAxMDUuOSAyMi44OTggMTYwLjEyMi0yOS42ODMgMzMuMDQtMzIuMjI2IDQzLjIwNy04OC4xOTkgMjguODA1LTE2Ni4yMjEtMy4zOS0xMS4wMjUtMzkuODE5LTEzMC42MDMtMTQ0Ljg3Mi0yMTQuNTYyLTE2Ni4wNTMtMTM1LjY5LTM1Ni42NzQtOTAuNzQzLTQ3MS44OTQgMTMuNTctMTA1LjkgOTYuNjgtMTgzLjg0MyAyODAuNzEtNTMuMzc0IDQ4MC4wMDcgMC44NDggMCA4OS44MDQgMTI3LjIxIDIxMS44MDIgMTQ1LjAyeiIgZmlsbD0iIzRDQTdGRiIgcC1pZD0iMTI0NTA3Ij48L3BhdGg+PHBhdGggZD0iTTIwMyA1MjljMC0yOS44MjMgMjQuMTc3LTU0IDU0LTU0czU0IDI0LjE3NyA1NCA1NC0yNC4xNzcgNTQtNTQgNTQtNTQtMjQuMTc3LTU0LTU0eiBtOTAtMTE1LjIzNUE1NCA1NCAwIDAgMSAyNjYgMzY3YzAtMjkuODIzIDI0LjE3Ny01NCA1NC01NHM1NCAyNC4xNzcgNTQgNTRhNTQgNTQgMCAwIDEtODEgNDYuNzY1ek00MjcgMjc4YzAtMjkuODIzIDI0LjE3Ny01NCA1NC01NHM1NCAyNC4xNzcgNTQgNTQtMjQuMTc3IDU0LTU0IDU0LTU0LTI0LjE3Ny01NC01NHogbTE4MCA0NGMwLTI5LjgyMyAyNC4xNzctNTQgNTQtNTRzNTQgMjQuMTc3IDU0IDU0LTI0LjE3NyA1NC01NCA1NC01NC0yNC4xNzctNTQtNTR6IG05MCAxNDRjMC0yOS44MjMgMjQuMTc3LTU0IDU0LTU0czU0IDI0LjE3NyA1NCA1NC0yNC4xNzcgNTQtNTQgNTQtNTQtMjQuMTc3LTU0LTU0eiIgZmlsbD0iIzRDQTdGRiIgcC1pZD0iMTI0NTA4Ij48L3BhdGg+PC9zdmc+" class="row-icon-img" mode="aspectFit" />
								</view>
								<view class="row-copy">
									<text class="row-title">主题模式</text>
									<text class="row-desc">{{ themeModeLabel }} · {{ themeStatusText }}</text>
								</view>
							</view>
							<view class="row-side">
								<text class="side-meta">{{ themeModeShortLabel }}</text>
								<text class="row-arrow">›</text>
							</view>
						</view>
					</view>
				</view>

				<view class="single-action-card clickable" @click="openHelpCenter">
					<view class="row-main">
						<view class="row-icon icon-violet">
							<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDA2NTYxMjE5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3ODEyOCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik01MTMuNzcgOTY0LjU2Yy0yNDguNTggMC00NTAuOC0yMDIuMjEtNDUwLjgtNDUwLjhzMjAyLjIxLTQ1MC44IDQ1MC44LTQ1MC44YzE0Ni4wOCAwIDI4My43MSA3MS4yNSAzNjguMTggMTkwLjY3IDEyLjE4IDE3LjE3IDguMDggNDAuOTctOS4xMyA1My4xNS0xNy4xMyAxMi4xOC00MC45MyA4LjEyLTUzLjE1LTkuMTMtNzAuMTctOTkuMTktMTg0LjU2LTE1OC40MS0zMDUuOTEtMTU4LjQxLTIwNi40OSAwLTM3NC41MSAxNjguMDItMzc0LjUxIDM3NC41MXMxNjguMDIgMzc0LjUxIDM3NC41MSAzNzQuNTEgMzc0LjUxLTE2OC4wMiAzNzQuNTEtMzc0LjUxYzAtMjEuMDggMTcuMDYtMzguMTQgMzguMTQtMzguMTRzMzguMTQgMTcuMDYgMzguMTQgMzguMTRjMC4wMSAyNDguNi0yMDIuMiA0NTAuODEtNDUwLjc4IDQ1MC44MXoiIGZpbGw9IiM0Q0E3RkYiIHAtaWQ9IjE3ODEyOSI+PC9wYXRoPjxwYXRoIGQ9Ik01MzMuOTEgMjgxLjk4bS01Ny44OCAwYTU3Ljg4IDU3Ljg4IDAgMSAwIDExNS43NiAwIDU3Ljg4IDU3Ljg4IDAgMSAwLTExNS43NiAwWiIgZmlsbD0iIzRDQTdGRiIgcC1pZD0iMTc4MTMwIj48L3BhdGg+PHBhdGggZD0iTTUxMy4wOSA3MTYuMzFsMzEuMDgtMjY0LjA4YzAtMzIuODQtMjYuNjItNTkuNDYtNTkuNDYtNTkuNDZoLTE3LjYzYy0zMi44NCAwLTU5LjQ2IDI2LjYyLTU5LjQ2IDU5LjQ2aDYwLjQzbC0zMS4wOCAyNjQuMDhjMCAzMi44NCAyNi42MiA1OS40NiA1OS40NiA1OS40NmgxNy42M2MzMi44NCAwIDU5LjQ2LTI2LjYyIDU5LjQ2LTU5LjQ2aC02MC40M3oiIGZpbGw9IiM0Q0E3RkYiIHAtaWQ9IjE3ODEzMSI+PC9wYXRoPjwvc3ZnPg==" class="row-icon-img" mode="aspectFit" />
						</view>
						<view class="row-copy">
							<text class="row-title">关于与帮助</text>
							<text class="row-desc">查看使用说明、反馈入口和版本信息。</text>
						</view>
					</view>
					<text class="row-arrow">›</text>
				</view>

				<view class="single-action-card clickable" @click="openPrivacyPolicy">
					<view class="row-main">
						<view class="row-icon icon-indigo">
							<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDIwNzE3NTc5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0NjkzNyIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik04NzguNTkyIDEwMTMuODE2MzJIMTQ1LjMyNjA4YTg5LjM2OTYgODkuMzY5NiAwIDAgMS04OS4wODgtODkuNDcyVjk5LjcxMkE4OS4zNjk2IDg5LjM2OTYgMCAwIDEgMTQ1LjMyNjA4IDEwLjI0SDg3OC41OTJBODkuMzY5NiA4OS4zNjk2IDAgMCAxIDk2Ny42OCA5OS43MTJ2ODI0LjYzMjMyYTg5LjM2OTYgODkuMzY5NiAwIDAgMS04OS4wODggODkuNDcyek0xNDUuMzI2MDggNjkuODgyODhhMjkuNzg4MTYgMjkuNzg4MTYgMCAwIDAtMjkuNjk2IDI5LjgyOTEydjgyNC42MzIzMmEyOS43ODgxNiAyOS43ODgxNiAwIDAgMCAyOS42OTYgMjkuODI0SDg3OC41OTJhMjkuNzkzMjggMjkuNzkzMjggMCAwIDAgMjkuNjk2LTI5LjgyNFY5OS43MTJhMjkuNzkzMjggMjkuNzkzMjggMCAwIDAtMjkuNjk2LTI5LjgyOTEySDE0NS4zMjYwOHogbTUwNC4yMDczNiA1NjAuNDI0OTZIMzc0LjQxMDI0YTg5LjM2NDQ4IDg5LjM2NDQ4IDAgMCAxLTg5LjA1NzI4LTg5LjQ3MlYzNzEuODE0NEE4OS40NDEyOCA4OS40NDEyOCAwIDAgMSAzNjUuMDU2IDI4Mi44NDQxNnYtMTkuNzUyOTZhMTMxLjkxMTY4IDEzMS45MTE2OCAwIDAgMSAxMzEuNDYxMTItMTMyLjA2NTI4aDI5Ljg4MDMyYTEzMS45MTY4IDEzMS45MTY4IDAgMCAxIDEzMS40NjExMiAxMzIuMDY1Mjh2MTkuNjc2MTZhODkuNDE1NjggODkuNDE1NjggMCAwIDEgODAuNzMyMTYgODkuMDQ3MDR2MTY5LjAyMTQ0YTg5LjM2NDQ4IDg5LjM2NDQ4IDAgMCAxLTg5LjA2MjQgODkuNDcyeiBtLTEyMy4xMzYtNDM5LjYzMzkyaC0yOS44ODAzMkE3Mi4zMzAyNCA3Mi4zMzAyNCAwIDAgMCA0MjQuNDQ4IDI2My4wOTEydjE5LjI1MTJoMTc0LjA0NDE2di0xOS4yNTEyYTcyLjMzNTM2IDcyLjMzNTM2IDAgMCAwLTcyLjA5NDcyLTcyLjQxNzI4eiBtMTUyLjgxMTUyIDE4MS4xNDA0OGEyOS43ODgxNiAyOS43ODgxNiAwIDAgMC0yOS42OTYtMjkuODI5MTJIMzc0LjQxMDI0YTI5Ljc5MzI4IDI5Ljc5MzI4IDAgMCAwLTI5LjY5NiAyOS44MjkxMnYxNjkuMDIxNDRhMjkuNzg4MTYgMjkuNzg4MTYgMCAwIDAgMjkuNjk2IDI5LjgyNGgyNzUuMTE4MDhhMjkuNzgzMDQgMjkuNzgzMDQgMCAwIDAgMjkuNjk2LTI5LjgyNFYzNzEuODE0NHogbS0xNjcuMjQ5OTIgMTUwLjQ5NzI4YTI5Ljc1NzQ0IDI5Ljc1NzQ0IDAgMCAxLTI5LjY5Ni0yOS42MTkyTDQ4MS43OTIgNDE3LjEzNjY0YTI5Ljc1NzQ0IDI5Ljc1NzQ0IDAgMCAxIDI5LjQ5MTItMzAuMDIzNjhoMC4xOTQ1NmEyOS43NDcyIDI5Ljc0NzIgMCAwIDEgMjkuNjk2IDI5LjYxOTJsMC41MTIgNzUuNTU1ODRhMjkuNzQ3MiAyOS43NDcyIDAgMCAxLTI5LjQ4MDk2IDMwLjAyMzY4aC0wLjI0NTc2eiBtMjc1LjIzNTg0IDM4MS4xNTg0SDIzNS4wMDhhMjkuODI5MTIgMjkuODI5MTIgMCAwIDEgMC01OS42NTMxMmg1NTIuMTg2ODhhMjkuODI5MTIgMjkuODI5MTIgMCAwIDEgMCA1OS42NTMxMnogbS0yMjIuNjQ4MzItOTcuNDI4NDhIMjM1LjAwOGEyOS44MjQgMjkuODI0IDAgMCAxIDAtNTkuNjQ4aDMyOS41MjgzMmEyOS44MjQgMjkuODI0IDAgMCAxIDAuMDEwMjQgNTkuNjQ4eiIgZmlsbD0iIzRDQTdGRiIgcC1pZD0iMjQ2OTM4Ij48L3BhdGg+PC9zdmc+" class="row-icon-img" mode="aspectFit" />
						</view>
						<view class="row-copy">
							<text class="row-title">隐私政策</text>
							<text class="row-desc">查看个人信息收集、使用与保护说明。</text>
						</view>
					</view>
					<text class="row-arrow">›</text>
				</view>

				<view class="single-action-card clickable" @click="openUserAgreement">
					<view class="row-main">
						<view class="row-icon icon-emerald">
							<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDIwNjgyMzc1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0NTgyNSIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik0xNzAuNjQ5NzcxIDc2Ljc5OTk2MmEzNi45NjYzODIgMzYuOTY2MzgyIDAgMCAwLTM2Ljk2NjM4MiAzNi45NjYzODF2Nzk2LjQ2NjgwMmMwIDIwLjQyODc5IDE2LjUzNzU5MiAzNi45NjYzODIgMzYuOTY2MzgyIDM2Ljk2NjM4MWg2ODIuNzAwNDU4YTM2Ljk2NjM4MiAzNi45NjYzODIgMCAwIDAgMzYuOTY2MzgyLTM2Ljk2NjM4MVYxMTMuNzY2MzQzYTM2Ljk2NjM4MiAzNi45NjYzODIgMCAwIDAtMzYuOTY2MzgyLTM2Ljk2NjM4MUgxNzAuNjQ5NzcxeiBtMC03Ni43OTk5NjJoNjgyLjcwMDQ1OGM2Mi44MjIzNjkgMCAxMTMuNzY2MzQzIDUwLjk0Mzk3NSAxMTMuNzY2MzQzIDExMy43NjYzNDN2Nzk2LjQ2NjgwMkExMTMuNzY2MzQzIDExMy43NjYzNDMgMCAwIDEgODUzLjM1MDIyOSAxMDIzLjk5OTQ4OEgxNzAuNjQ5NzcxYTExMy43NjYzNDMgMTEzLjc2NjM0MyAwIDAgMS0xMTMuNzY2MzQzLTExMy43NjYzNDNWMTEzLjc2NjM0M0M1Ni44ODM0MjggNTAuOTQzOTc1IDEwNy44Mjc0MDIgMCAxNzAuNjQ5NzcxIDB6IiBmaWxsPSIjNENBN0ZGIiBwLWlkPSIyNDU4MjYiPjwvcGF0aD48cGF0aCBkPSJNMjI3LjUzMjk0MiAyMjcuNTMyNjg2bTM4LjM5OTk4MSAwbDQ5Mi4wODI5NTQgMHEzOC4zOTk5ODEgMCAzOC4zOTk5ODEgMzguMzk5OTgxbDAgMHEwIDM4LjM5OTk4MS0zOC4zOTk5ODEgMzguMzk5OTgxbC00OTIuMDgyOTU0IDBxLTM4LjM5OTk4MSAwLTM4LjM5OTk4MS0zOC4zOTk5ODFsMCAwcTAtMzguMzk5OTgxIDM4LjM5OTk4MS0zOC4zOTk5ODFaIiBmaWxsPSIjNENBN0ZGIiBwLWlkPSIyNDU4MjciPjwvcGF0aD48cGF0aCBkPSJNMjY1LjkzMjkyMyAzOTguMjMzNDAxaDI2NC41NTAyNjhhMzguMzk5OTgxIDM4LjM5OTk4MSAwIDEgMSAwIDc2Ljc5OTk2MUgyNjUuOTMyOTIzYTM4LjM5OTk4MSAzOC4zOTk5ODEgMCAwIDEgMC03Ni43OTk5NjF6TTYzNS45MDM5MzggNzk1LjEzNTYwMmwtOTkuODM5OTUgNTIuNTMxMTc0IDE5LjA5NzU5LTExMS4xNTUxNDQtODAuNzQyMzU5LTc4Ljc0NTU2MSAxMTEuNjE1OTQ0LTE2LjE3OTE5MiA0OS44Njg3NzUtMTAxLjExOTk0OSA0OS45MTk5NzUgMTAxLjExOTk0OSAxMTEuNjE1OTQ0IDE2LjE3OTE5Mi04MC43OTM1NTkgNzguNzQ1NTYxIDE5LjA5NzU5IDExMS4xMDM5NDR6IiBmaWxsPSIjNENBN0ZGIiBwLWlkPSIyNDU4MjgiPjwvcGF0aD48L3N2Zz4=" class="row-icon-img" mode="aspectFit" />
						</view>
						<view class="row-copy">
							<text class="row-title">用户服务协议</text>
							<text class="row-desc">查看平台使用规则、账号约定与服务说明。</text>
						</view>
					</view>
					<text class="row-arrow">›</text>
				</view>

				<view class="single-action-card clickable" @click="openAcknowledgment">
					<view class="row-main">
						<view class="row-icon icon-cyan">
							<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MTAzNjM5OTQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0ODkiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMzUxLjI1Mzg2NCA4My41NDY5NTdjMjkuOTU3OTExLTI2LjQ1OTMzIDUxLjcwMzU4My01Mi4zNzM5NyA3OS4xODk0NDItNjguNDQyMzA0IDQ1LjQzOTY1Ni0yNi41NjQwNzggMTEwLjg4NjE2OS0xNi4yNzc4MyAxNDguMjgxMTg0IDE2Ljc1OTY3IDQzLjYxNzA0MiAzOC41MjYyOTIgNTcuNzM3MDY0IDkzLjIwNDcxNyAzNy43MDkyNTggMTQ5LjAzNTM2OS01LjExMTY5OSAxNC4xNjE5MjEtMTAuMzI4MTQ3IDI5LjE4Mjc3Ni0xOS4zMzY0NjkgNDAuODUxNjk2LTE4LjE0MjM0MyAyMy41NDczMzctMTAuMjQ0MzQ5IDM2LjA3NTE5IDEzLjYxNzIzMiA0Ni44ODUxNzggNDAuNzg4ODQ4IDE4LjQ3NzUzNyA2OS4xMzM2NCA0Ny42NjAzMTMgODAuMzgzNTY5IDkyLjg2OTUyNCAyLjI2MjU1NSA5LjIzODc2OCAxMy4xNzcyOTEgMTguOTgwMzI3IDIyLjQ5OTg1NyAyMy4zNzk3NCA1NC42NTc0NzUgMjUuNzg4OTQzIDEwNy45NzQxNzYgNTEuNzQ1NDgyIDEyMC4wODMwMzggMTIwLjM3NjMzMiAxLjA4OTM3OSA2LjE1OTE3OSAxMS4zOTY1NzYgMTIuNTY5NzUzIDE4Ljc0OTg4MiAxNS40NjA3OTYgOTQuNzM0MDM3IDM2LjI0Mjc4NyAxMzAuOTM0OTI1IDE0NS44MzAwODIgOTQuMjczMTQ1IDIzMS4xMTU4NTRhNjUxLjUzMjE4NSA2NTEuNTMyMTg1IDAgMCAxLTEwOS42NTAxNDMgMTczLjY5MzAzNGMtOTUuMjc4NzI2IDEwNy4wOTQyOTQtMjY1LjE3OTg4NCAxMjguMTA2NzMtMzkwLjE0NDE3NiA1Ni43NzMzODMtODIuODU1NjItNDcuMzA0MTctMTY0LjE0MDAyMi05Ny41ODMxODEtMjQ4LjE0Nzg3LTE0Mi43NzE0NDItMTEyLjY4NzgzNC02MC42MDcxNTgtMTQ4LjU1MzUyOC0yMDkuNjAwNjI3LTg4LjMwMjUxMy0zMTYuMzM4Nzc4IDE4LjEwMDQ0NC0zMi4wOTQ3NjkgMzcuMTg1NTE5LTYzLjcwNzY5NyA1My42OTM3OTQtOTYuNjE5NDk5IDQuMzc4NDY0LTguNzE1MDI5IDQuNzU1NTU2LTIzLjU0NzMzNyAwLjIzMDQ0Ni0zMS45NDgxMjItMjcuMjM0NDY0LTUwLjc4MTgwMS01OC41MTIxOTktOTkuNDA1Nzk1LTg0LjM2Mzk5MS0xNTAuODM3MDMzLTM5LjE3NTcyOS03Ny44Mjc3MTktOS40MjczMTUtMTg2LjY4MTc3OCA4NC44ODc3My0yMTkuNjk4MzI5QzIyOC44NjYzNzEgMS42OTY5MTcgMjgzLjE4ODY1MyAxNy44OTA5NDggMzMyLjMxNTQzNyA2MC4wMjA1NjljOC40NjM2MzQgNy4yNDg1NTcgMTQuMjY2NjY5IDE3LjU5NzY1NCAxOC45Mzg0MjcgMjMuNTI2Mzg4eiBtMzMwLjIwNzQwNSAzNzUuOTgyMjU1Yy0yMC40MDQ4OTkgMzQuNTI0OTIxLTM5LjgwNDIxNyA2Ny45MTg1NjQtNTkuNzY5MTc0IDEwMS4wMTg5MTMtMTUuNjQ5MzQyIDI1LjkzNTU5LTM3Ljg3Njg1NSAzMy41MTkzNDEtNTkuMjI0NDg1IDIwLjk0OTU4OC0xOS4wNjQxMjUtMTEuMjA4MDMtMjMuNjUyMDg1LTM1LjA0ODY2MS0xMC40NzQ3OTQtNjAuNDM5NTYyIDEwLjAzNDg1My0xOS4yNTI2NzEgMjAuNzE5MTQyLTM4LjI1Mzk0OCAzMi4zODgwNjMtNTYuNTYzODg3IDUxLjA1NDE0Ni04MC4yNTc4NzEtMzkuMTU0NzgtMTAyLjAwMzU0NC00Mi41OTA1MTMtMTQxLjQzMDY2OC01LjE3NDU0OCA3LjM3NDI1NS0xMS4wNDA0MzMgMTQuNjY0NzEyLTE1Ljc1NDA5IDIyLjcwOTM1My0xOS42NTA3MTMgMzMuNTE5MzQxLTM4LjU4OTE0MSA2Ny4zOTQ4MjQtNTguNTMzMTQ4IDEwMC43MDQ2NjktMTUuMjA5NDAxIDI1LjM0OTAwMS0zNC4zNTczMjQgMzEuMjU2Nzg1LTU2Ljg1NzE4MiAxOS4wNDMxNzYtMjAuMjE2MzUyLTEwLjk3NzU4NC0yNS40OTU2NDktMzQuNjI5NjY5LTEyLjk2Nzc5NS01OS4yMjQ0ODUgMy40MTQ3ODMtNi42ODI5MTkgNy41ODM3NTEtMTIuOTg4NzQ1IDExLjMxMjc3Ny0xOS41MDQwNjcgNDMuMjM5OTUtNzUuNDE4NTE3IDg3LjI1NTAzNC0xNTAuNTY0Njg5IDEyOS4zMDA4NTctMjI2LjcxNjQ0YTUzLjg0MDQ0MSA1My44NDA0NDEgMCAwIDAtNDUuMjkzMDA5LTgwLjE5NTAyM2MtMzAuNjkxMTQ2LTEuMDY4NDI5LTQ2LjUwODA4NSAyMS42NjE4NzQtNjAuMDIwNTY5IDQ1LjA0MTYxNC04MS43MDMzOTMgMTQxLjYxOTIxNS0xNjEuNzcyNzE4IDI4NC4yNjQ5NTktMjQ1LjQwMzQ3NCA0MjQuNzczODQ1QzEzOC4yMzg0NTQgNjMyLjY3NzU1NiAxNjEuNjgxMDQzIDcyNS42OTM3MjYgMjQ1Ljg5ODM4NiA3NzMuNjA1NDM0Yzc5LjYwODQzNCA0NS4zNTU4NTggMTU4LjEyNzQ5IDkyLjk3NDI3MSAyMzguODI1MzAzIDEzNi41OTEzMTQgODkuNDMzNzkxIDQ4LjM5MzU0OCAxNzguMDcxNDk4IDQ1LjA4MzUxMyAyNjMuMTI2ODI0LTEzLjQ0OTYzNiA2NC43NzYxMjYtNDQuNjAxNjczIDk2LjM2ODEwNS0xMTMuNjkzNDE0IDEyNy4zOTQ0NDUtMTgxLjA2NzI4OSAyMC45NDk1ODgtNDUuNTAyNTA1LTMuNDM1NzMyLTkwLjQxODQyMi01My4xMDcyMDYtMTE4Ljc4NDE2My0yMC45NDk1ODggMzUuNjE0My00MS41MDExMzQgNzEuNTIxODkzLTYyLjY2MDIxNyAxMDcuMDczMzQ0LTEyLjk2Nzc5NSAyMS43NDU2NzItMzIuODQ4OTU0IDI1LjI0NDI1My01My42NzI4NDUgMTQuNjY0NzExLTIwLjAyNzgwNi0xMC4xMzk2MDEtMjguNTc1MjM4LTI3LjUwNjgwOS0xNy4xNTc3MTItNDkuNTQ1Nzc1IDEyLjU2OTc1My0yNC4yODA1NzIgMjUuMjY1MjAzLTQ4LjU2MTE0NSAzOS4zNjQyNzYtNzEuOTYxODM1IDM2LjIwMDg4OC02MC4xNDYyNjcgNTcuMzU5OTcyLTgzLjMzNzQ2MS0zNi45MzQxMjQtMTMzLjk1MTY2NS0xLjY5NjkxNy0wLjg3OTg4My0zLjU2MTQzLTEuMzQwNzc0LTkuNjE1ODYxLTMuNjQ1MjI4ek0yMTUuNzcyODc5IDMyNC43MTg2MTNsOS41OTQ5MTEtMi42MTg2OThjMjcuMzYwMTYyLTQ3LjE1NzUyMiA1NC44NjY5NzEtOTQuMjczMTQ2IDgxLjcwMzM5My0xNDEuNjE5MjE1IDIuMjQxNjA2LTMuOTU5NDcyIDIuNzIzNDQ2LTExLjU2NDE3MyAwLjM3NzA5My0xNS4wMjA4NTQtMTIuNTY5NzUzLTE4LjY0NTEzMy0yNC4wNzEwNzctMzguNzk4NjM3LTQwLjA5NzUxMi01NC4wOTE4MzYtMjIuNTYyNzA2LTIxLjU1NzEyNi01Ni41NjM4ODctMjMuMDQ0NTQ3LTgxLjMyNjMtOS4yMzg3NjlDMTU3LjI2MDY4IDExOC40MDcwNzEgMTMzLjY5MjM5MyAxNDcuMjU0NjU0IDE0Mi44MjY0MTQgMTc0Ljk3MDk1OWMxNy40NzE5NTYgNTIuMjQ4MjcyIDQ3LjkxMTcwOCAxMDAuMTE4MDgxIDcyLjk0NjQ2NSAxNDkuNzQ3NjU0eiIgcC1pZD0iNDQ5MCIgZmlsbD0iIzVkYTVkZCI+PC9wYXRoPjwvc3ZnPg==" class="row-icon-img" mode="aspectFit" />
						</view>
						<view class="row-copy">
							<text class="row-title">鸣谢</text>
							<text class="row-desc">查看制作团队名单，致敬每一位创作者。</text>
						</view>
					</view>
					<text class="row-arrow">›</text>
				</view>

				<view class="logout-card clickable" @click="handleLogout">
					<view class="row-main">
						<view class="row-icon icon-red">
							<image src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDA0MDg2ODk3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3MTk4OSIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik04MTAuNyA5MzguN0gyMTMuM2MtMTcuMyAwLTM0LTMuNC00OS45LTEwLjEtMTUuMi02LjQtMjktMTUuNy00MC43LTI3LjUtMTEuNy0xMS43LTIxLTI1LjQtMjcuNC00MC43LTYuNy0xNS44LTEwLjEtMzIuNi0xMC4xLTQ5LjhWMjEzLjNjMC0xNy4yIDMuNC0zNCAxMC4xLTQ5LjggNi40LTE1LjIgMTUuNy0yOSAyNy41LTQwLjcgMTEuNy0xMS43IDI1LjQtMjAuOSA0MC43LTI3LjQgMTUuOC02LjcgMzIuNS0xMC4xIDQ5LjgtMTAuMWg1OTcuM2MxNy4zIDAgMzQgMy40IDQ5LjkgMTAuMSAxNS4yIDYuNCAyOSAxNS43IDQwLjcgMjcuNSAxMS43IDExLjcgMjEgMjUuNCAyNy40IDQwLjcgNi43IDE1LjggMTAuMSAzMi42IDEwLjEgNDkuOFYzMjBjMCAyMy42LTE5LjEgNDIuNy00Mi43IDQyLjdzLTQyLjctMTkuMS00Mi43LTQyLjdWMjEzLjNjMC01LjgtMS4xLTExLjQtMy40LTE2LjYtMi4xLTUuMS01LjItOS42LTkuMS0xMy41LTQtNC04LjUtNy0xMy42LTkuMi01LjItMi4yLTEwLjgtMy4zLTE2LjYtMy4zSDIxMy4zYy01LjggMC0xMS40IDEuMS0xNi42IDMuMy01LjEgMi4yLTkuNyA1LjItMTMuNiA5LjEtNCA0LTcuMSA4LjUtOS4yIDEzLjYtMi4yIDUuMy0zLjQgMTAuOS0zLjQgMTYuNnY1OTcuM2MwIDUuOCAxLjEgMTEuNCAzLjQgMTYuNiAyLjEgNS4xIDUuMiA5LjYgOS4xIDEzLjUgNCA0IDguNSA3IDEzLjYgOS4yIDUuMiAyLjIgMTAuOCAzLjMgMTYuNiAzLjNoNTk3LjNjNS44IDAgMTEuNC0xLjEgMTYuNi0zLjMgNS4xLTIuMiA5LjctNS4yIDEzLjYtOS4xIDQtNCA3LjEtOC41IDkuMi0xMy42IDIuMi01LjMgMy40LTEwLjkgMy40LTE2LjZWNzA0YzAtMjMuNiAxOS4xLTQyLjcgNDIuNy00Mi43czQyLjcgMTkuMSA0Mi43IDQyLjd2MTA2LjdjMCAxNy4yLTMuNCAzNC0xMC4xIDQ5LjgtNi40IDE1LjItMTUuNyAyOS0yNy41IDQwLjctMTEuNyAxMS43LTI1LjQgMjAuOS00MC43IDI3LjQtMTUuNyA2LjctMzIuNSAxMC4xLTQ5LjcgMTAuMXoiIGZpbGw9IiM0Q0E3RkYiIHAtaWQ9IjE3MTk5MCIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pNjkuN2FjOTNhODFhR0d4MXoiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjxwYXRoIGQ9Ik03NjggNjgyLjdjLTEwLjkgMC0yMS44LTQuMi0zMC4yLTEyLjUtMTYuNy0xNi43LTE2LjctNDMuNyAwLTYwLjNsOTcuOC05Ny44LTk3LjgtOTcuOGMtMTYuNy0xNi43LTE2LjctNDMuNyAwLTYwLjMgMTYuNy0xNi43IDQzLjctMTYuNyA2MC4zIDBsMTI4IDEyOGMxNi43IDE2LjcgMTYuNyA0My43IDAgNjAuM2wtMTI4IDEyOGMtOC4zIDguMi0xOS4yIDEyLjQtMzAuMSAxMi40eiIgZmlsbD0iIzVGNjM3OSIgcC1pZD0iMTcxOTkxIj48L3BhdGg+PHBhdGggZD0iTTg5NiA1NTQuN0g1MTJjLTIzLjYgMC00Mi43LTE5LjEtNDIuNy00Mi43czE5LjEtNDIuNyA0Mi43LTQyLjdoMzg0YzIzLjYgMCA0Mi43IDE5LjEgNDIuNyA0Mi43cy0xOS4xIDQyLjctNDIuNyA0Mi43eiIgZmlsbD0iIzVGNjM3OSIgcC1pZD0iMTcxOTkyIj48L3BhdGg+PC9zdmc+" class="row-icon-img" mode="aspectFit" />
						</view>
						<view class="row-copy">
							<text class="row-title">退出当前账号</text>
							<text class="row-desc">退出后将返回登录页，已保存资料不会丢失。</text>
						</view>
					</view>
					<text class="row-arrow">›</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

	<script>
	import { clearUser } from '@/utils/user.js'
	import { clearToken } from '@/utils/token.js'
	import { getUserProfile, DEFAULT_AVATAR, DEFAULT_USER_PROFILE, USER_PROFILE_UPDATED_EVENT } from '@/utils/userProfile.js'
	import { applyTheme, getThemeMode, setTheme, THEME_CHANGE_EVENT, THEME_DARK, THEME_LIGHT } from '@/utils/theme.js'
	import CommonAvatar from '@/components/CommonAvatar.vue'

	const SETTINGS_KEY = 'my_security_settings'
	// 与同文件 static/icons/chevron-left.svg 一致；inline 以便 APK/小程序上 <image> 稳定显示
	const SETTINGS_TOP_BACK_ICON =
		'data:image/svg+xml;charset=utf-8,' +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
				'<path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/>' +
				'</svg>'
		)
	const THEME_MODE_OPTIONS = [
		{ label: '浅色模式', value: THEME_LIGHT },
		{ label: '深色模式', value: THEME_DARK }
	]

	export default {
		components: {
			CommonAvatar
		},
		data() {
			return {
				currentTheme: THEME_LIGHT,
				themeMode: THEME_LIGHT,
				themeListener: null,
				avatarUrl: DEFAULT_AVATAR,
				userInfo: {
					nickname: DEFAULT_USER_PROFILE.nickname,
					phone: ''
				},
				settings: {},
				settingsTopBackIcon: SETTINGS_TOP_BACK_ICON
			}
		},
		computed: {
			themeClass() {
				return this.currentTheme === THEME_DARK ? 'theme-dark' : 'theme-light'
			},
			isDarkTheme() {
				return this.currentTheme === THEME_DARK
			},
			themeModeLabel() {
				const current = THEME_MODE_OPTIONS.find(item => item.value === this.themeMode)
				return current ? current.label : '浅色模式'
			},
			themeModeShortLabel() {
				return this.isDarkTheme ? '深色' : '浅色'
			},
			themeStatusText() {
				return this.isDarkTheme ? '已开启深色模式' : '当前为正常白色主题'
			},
			accountSummary() {
				const nickname = this.userInfo.nickname || '当前账号'
				const phone = this.maskPhone(this.userInfo.phone)
				return phone ? `${nickname} · ${phone}` : `${nickname} · 点击管理账号资料`
			}
		},
		created() {
			if (typeof uni === 'undefined' || typeof uni.$on !== 'function') {
				return
			}

			this.themeListener = payload => {
				this.currentTheme = payload && payload.theme ? payload.theme : THEME_LIGHT
				this.themeMode = getThemeMode()
			}
			uni.$on(THEME_CHANGE_EVENT, this.themeListener)
			uni.$on(USER_PROFILE_UPDATED_EVENT, this.loadUserInfo)
		},
		beforeDestroy() {
			if (this.themeListener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(THEME_CHANGE_EVENT, this.themeListener)
			}
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.loadUserInfo)
			}
		},
		beforeUnmount() {
			if (this.themeListener && typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(THEME_CHANGE_EVENT, this.themeListener)
			}
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(USER_PROFILE_UPDATED_EVENT, this.loadUserInfo)
			}
		},
		onShow() {
			this.currentTheme = applyTheme()
			this.themeMode = getThemeMode()
			this.loadUserInfo()
			this.loadSettings()
		},
		methods: {
			goBack() {
				const pages = getCurrentPages()
				if (pages.length > 1) {
					uni.navigateBack({
						delta: 1
					})
					return
				}

				uni.switchTab({
					url: '/pages/my/my'
				})
			},
			loadUserInfo() {
				const user = getUserProfile()
				this.avatarUrl = user.avatar || DEFAULT_AVATAR
				this.userInfo.nickname = user.nickname || DEFAULT_USER_PROFILE.nickname
				this.userInfo.phone = user.phone || ''
			},
			loadSettings() {
				const localSettings = uni.getStorageSync(SETTINGS_KEY)
				if (localSettings && typeof localSettings === 'object') {
					this.settings = {
						...this.settings,
						...localSettings
					}
				}
			},
			saveSettings() {
				uni.setStorageSync(SETTINGS_KEY, this.settings)
			},
			maskPhone(phone) {
				if (!phone || phone.length < 7) {
					return ''
				}
				return `${phone.slice(0, 3)}****${phone.slice(-4)}`
			},
			openAccountSecurity() {
				uni.navigateTo({
					url: '/subPages/profile/profile'
				})
			},
			openThemeModeSheet() {
				uni.showActionSheet({
					itemList: THEME_MODE_OPTIONS.map(item => item.label),
					success: res => {
						const selected = THEME_MODE_OPTIONS[res.tapIndex]
						if (!selected || selected.value === this.themeMode) {
							return
						}

						this.themeMode = selected.value
						this.currentTheme = setTheme(selected.value)
						uni.showToast({
							title: selected.value === THEME_DARK ? '已切换深色模式' : '已切换正常白色主题',
							icon: 'none'
						})
					}
				})
			},
			toggleTheme(themeMode) {
				this.themeMode = themeMode
				this.currentTheme = setTheme(themeMode)
				uni.showToast({
					title: themeMode === THEME_DARK ? '已切换深色模式' : '已切换正常白色主题',
					icon: 'none'
				})
			},
			openHelpCenter() {
				uni.showActionSheet({
					itemList: ['使用说明', '意见反馈', '当前版本'],
					success: res => {
						const actions = [
							() => this.showHelpDetail('使用说明', '你可以在首页查看推荐任务，在题库中完成练习，在成长档案中查看评分与阶段变化。'),
							() => this.showHelpDetail('意见反馈', '当前为本地演示版本，如需反馈建议，可整理问题场景、复现步骤和截图后提交给开发同学。'),
							() => this.showHelpDetail('当前版本', '演示版 v1.0.0，已支持题库练习、成长档案和个人资料维护。')
						]
						actions[res.tapIndex]()
					}
				})
			},
			openPrivacyPolicy() {
				uni.navigateTo({
					url: '/subPages/settings/privacy'
				})
			},
			openUserAgreement() {
				uni.navigateTo({
					url: '/subPages/settings/agreement'
				})
			},
			openAcknowledgment() {
				uni.navigateTo({
					url: '/subPages/settings/acknowledgment'
				})
			},
			showHelpDetail(title, content) {
				uni.showModal({
					title,
					content,
					showCancel: false,
					confirmText: '知道了'
				})
			},
			handleLogout() {
				uni.showModal({
					title: '退出当前账号',
					content: '退出后将回到登录页，是否继续？',
					confirmColor: '#4AA9FE',
					success: res => {
						if (!res.confirm) {
							return
						}
						clearUser()
						clearToken()
						uni.removeStorageSync(SETTINGS_KEY)
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 与资料编辑页 `.header` 同源双层品牌蓝渐变 */
	$grad-blue-a: rgba(1, 188, 255, 0.1) 0%, rgba(49, 101, 215, 0.4) 45%, rgba(0, 123, 255, 0.05) 100%;
	$grad-blue-b: rgba(0, 122, 252, 0.7) 0%, rgba(1, 188, 255, 0) 100%;

	.settings-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background:
			radial-gradient(circle at top center, rgba(67, 112, 255, 0.12) 0%, rgba(67, 112, 255, 0) 24%),
			linear-gradient(180deg, #121214 0%, #151518 18%, #0f1012 100%);
	}

	.settings-topbar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 22rpx) 28rpx 18rpx;
		background:
			linear-gradient(180deg, $grad-blue-a),
			linear-gradient(180deg, $grad-blue-b);
		border-bottom: 2rpx solid rgba(243, 253, 255, 0.6);
	}

	.back-btn {
		box-sizing: border-box;
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.92);
		padding: 0;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-icon-img {
		width: 38rpx;
		height: 38rpx;
		flex-shrink: 0;
	}

	.placeholder {
		width: 72rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
	}

	.topbar-title {
		flex: 1;
		text-align: center;
		font-size: 34rpx;
		font-weight: 700;
		letter-spacing: 0.5rpx;
		color: #ffffff;
		text-shadow: 0 4rpx 16rpx rgba(38, 96, 189, 0.25);
	}

	.settings-scroll {
		flex: 1;
		min-height: 0;
	}

	.settings-content {
		padding: 20rpx 24rpx calc(56rpx + env(safe-area-inset-bottom));
	}

	.account-card,
	.list-card,
	.single-action-card,
	.logout-card {
		margin-top: 22rpx;
		border-radius: 28rpx;
		background: linear-gradient(180deg, #2a2b2f 0%, #25262a 100%);
		border: 1rpx solid rgba(255, 255, 255, 0.04);
		box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.28);
	}

	.account-card,
	.single-action-card,
	.logout-card {
		padding: 28rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18rpx;
	}

	.account-main,
	.row-main,
	.account-side,
	.row-side {
		display: flex;
		align-items: center;
	}

	.account-main,
	.row-main {
		flex: 1;
		min-width: 0;
		gap: 18rpx;
	}

	.account-copy,
	.row-copy {
		flex: 1;
		min-width: 0;
	}

	.group-title,
	.account-title,
	.account-desc,
	.row-title,
	.row-desc,
	.side-meta {
		display: block;
	}

	.group-title {
		margin-top: 40rpx;
		margin-left: 8rpx;
		font-size: 26rpx;
		font-weight: 800;
		letter-spacing: 1rpx;
		color: rgba(255, 255, 255, 0.72);
	}

	.account-icon {
		width: 68rpx;
		height: 68rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-weight: 800;
		flex-shrink: 0;
	}

	.account-icon-img {
		width: 44rpx;
		height: 44rpx;
	}

	.row-icon-img {
		width: 44rpx;
		height: 44rpx;
	}

	.account-title,
	.row-title {
		font-size: 28rpx;
		font-weight: 800;
		line-height: 1.3;
		color: #f7f8fa;
	}

	.account-desc,
	.row-desc {
		margin-top: 8rpx;
		font-size: 22rpx;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.46);
	}

	.account-side,
	.row-side {
		flex-shrink: 0;
		gap: 12rpx;
	}

	.account-avatar {
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
		border: 2rpx solid rgba(255, 255, 255, 0.08);
	}

	.list-card {
		padding: 0 24rpx;
	}

	.setting-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18rpx;
		padding: 28rpx 0;
		border-bottom: 1rpx solid rgba(255, 255, 255, 0.08);
	}

	.no-border {
		border-bottom: none;
	}

	.side-meta {
		font-size: 22rpx;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.72);
	}

	.row-arrow {
		font-size: 38rpx;
		line-height: 1;
		color: rgba(255, 255, 255, 0.38);
	}

	.icon-blue {
		background: rgba(255, 255, 255, 0.08);
		color: #f3f5f8;
	}

	.icon-cyan {
		background: transparent;
		color: #f3f5f8;
	}

	.icon-gold {
		background: rgba(255, 255, 255, 0.08);
		color: #f3f5f8;
	}

	.icon-green {
		background: rgba(255, 255, 255, 0.08);
		color: #f3f5f8;
	}

	.icon-violet {
		background: transparent;
		color: #f3f5f8;
	}

	.icon-red {
		background: transparent;
		color: #ffffffff;
	}

	.icon-indigo {
		background: transparent;
		color: #f3f5f8;
	}

	.icon-emerald {
		background: transparent;
		color: #f3f5f8;
	}

	.clickable:active {
		transform: scale(0.995);
		opacity: 0.96;
	}

	:deep(switch) {
		transform: scale(0.84);
		transform-origin: right center;
	}

	.settings-page.theme-light {
		background: linear-gradient(180deg, #edf6ff 0%, #f7f9fe 16%, #f8fafd 100%);

		.group-title {
			color: #30496f;
		}

		.account-card,
		.list-card,
		.single-action-card,
		.logout-card {
			background: #ffffff;
			border-color: rgba(67, 76, 210, 0.04);
			box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.08);
		}

		.account-icon,
		.row-icon {
			background: transparent;
			color: #3165d7;
		}

		.account-title,
		.row-title {
			color: #23345a;
		}

		.account-desc,
		.row-desc {
			color: #8090ad;
		}

		.setting-row {
			border-bottom-color: rgba(125, 149, 190, 0.12);
		}

		.side-meta {
			color: #4a89d9;
		}

		.row-arrow {
			color: #9dafcc;
		}

		.account-avatar {
			border-color: rgba(88, 117, 184, 0.1);
		}
	}

	.settings-page.theme-dark {
		.settings-topbar {
			background:
				linear-gradient(180deg, rgba(77, 108, 182, 0.38) 0%, rgba(35, 42, 63, 0.55) 50%, rgba(17, 18, 22, 0.3) 100%),
				linear-gradient(180deg, rgba(74, 103, 247, 0.55) 0%, rgba(74, 103, 247, 0) 100%);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}
	}
</style>
