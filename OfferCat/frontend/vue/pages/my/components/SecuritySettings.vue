<template>
	<view class="security-settings" :class="themeClass" :key="animationKey">
		<view class="section-head animate-float-up">
			<view>
				<!-- 标题区说明该模块聚合设置、帮助和反馈入口。 -->
				<text class="section-title">设置与帮助</text>
				<text class="section-subtitle">账号、反馈和系统偏好统一从这里进入。</text>
			</view>
		</view>

		<view class="settings-grid">
			<!-- 两列网格渲染帮助、资料编辑、反馈和系统设置四类入口。 -->
			<view v-for="(item, index) in tools" :key="item.name" class="setting-item animate-float-up" :style="{ animationDelay: (0.05 + index * 0.05) + 's' }" @click="handleToolClick(item)">
				<view class="setting-icon" :class="item.uiClass">
					<image v-if="item.icon.startsWith('data:image')" :src="item.icon" class="setting-icon-img" mode="aspectFit" />
					<text v-else>{{ item.icon }}</text>
				</view>
				<text class="setting-name">{{ item.name }}</text>
				<text class="setting-desc">{{ item.desc }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'SecuritySettings',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			animationKey: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// tools 定义设置区各入口的图标、描述和行为类型。
				tools: [
					{ name: '帮助中心', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTk0MzcwNDgxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMwNTY4IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTE1MC41ODgyMzUgMGg3MjIuODIzNTNjODMuMTY5ODgyIDAgMTUwLjU4ODIzNSA2Ny40MTgzNTMgMTUwLjU4ODIzNSAxNTAuNTg4MjM1djcyMi44MjM1M2MwIDgzLjE2OTg4Mi02Ny40MTgzNTMgMTUwLjU4ODIzNS0xNTAuNTg4MjM1IDE1MC41ODgyMzVIMTUwLjU4ODIzNUM2Ny40MTgzNTMgMTAyNCAwIDk1Ni41ODE2NDcgMCA4NzMuNDExNzY1VjE1MC41ODgyMzVDMCA2Ny40MTgzNTMgNjcuNDE4MzUzIDAgMTUwLjU4ODIzNSAweiBtMzY4LjEyOCAzMDkuNDQzNzY1YzguNjczODgyIDEuMTI5NDEyIDE3LjQ2ODIzNSAxLjY4NjU4OCAyNi4wMDY1ODkgMy40OTM2NDcgMzguNDkwMzUzIDguMTE2NzA2IDU0LjgxNDExOCA1Ny43MDU0MTIgMjkuMzk0ODIzIDg3Ljg4MzI5NC0xNS40MjAyMzUgMTguMzExNTI5LTM0LjMwNCAzMi40NjY4MjQtNTMuMzA4MjM1IDQ2LjUzMTc2NS00OC43MDAyMzUgMzYuMDgwOTQxLTc0LjAyOTE3NiA4NC4xNDg3MDYtNzMuNzU4MTE4IDE0NS4wMTY0N2E0Ni42ODIzNTMgNDYuNjgyMzUzIDAgMCAwIDUuNDUxMjk0IDIxLjE1NzY0N2M5LjAwNTE3NiAxNi42ODUxNzYgMjQuMTI0MjM1IDIzLjY0MjM1MyA0Mi43OTcxNzcgMjUuMjIzNTMgMzMuNDAwNDcxIDIuODE2IDU5LjcyMzI5NC0yNS42NDUxNzYgNTcuNDk0NTg4LTUyLjQ2NDk0Mi0wLjgyODIzNS05Ljg3ODU4OCAwLjY2MjU4OC0yMC40NjQ5NDEgMy40MDMyOTQtMzAuMDU3NDExIDUuNDIxMTc2LTE4Ljk4OTE3NiAxOS4wNzk1MjktMzIuNTU3MTc2IDM0LjE1MzQxMi00NC4zMzMxNzcgMjAuNjMwNTg4LTE2LjA4MjgyNCA0Mi40ODA5NDEtMzAuNjc0ODI0IDYyLjUwOTE3Ni00Ny40NTAzNTMgMjAuNzA1ODgyLTE3LjM0Nzc2NSAzNC41NzUwNTktMzkuNzI1MTc2IDM5LjM3ODgyNC02Ni44NDYxMTcgNC44MTg4MjQtMjcuMDc1NzY1IDIuMzQ5MTc2LTUzLjgzNTI5NC01LjUxMTUzLTgwLjAwNzUzLTE2LjAwNzUyOS01My4zNjg0NzEtNTIuNTQwMjM1LTg1LjU2NDIzNS0xMDUuNDcyLTk5Ljc2NDcwNi0yOS45NjcwNTktOC4wMjYzNTMtNjAuNjExNzY1LTguNDAyODI0LTkxLjMwMTY0Ny00Ljg5NDExNy00Ny44NDE4ODIgNS40NjYzNTMtOTAuMDUxNzY1IDIzLjUyMTg4Mi0xMjQuODA3NTI5IDU3LjM0NC0xNC40NDE0MTIgMTQuMDM0ODI0LTI1Ljk0NjM1MyAzMC4zNTg1ODgtMzEuMzY3NTI5IDUwLjExNTc2NC0zLjc2NDcwNiAxMy43OTM4ODItNC4wMDU2NDcgMjcuNjc4MTE4IDQuNjY4MjM1IDM5Ljk4MTE3NyAxNC44NDggMjEuMDM3MTc2IDQ2LjQyNjM1MyAyNy4wMDA0NzEgNjkuNDUxMjk0IDE0LjAwNDcwNiAxMC45OTI5NDEtNi4yMTkyOTQgMTcuODI5NjQ3LTE2LjE1ODExOCAyNS4zNzQxMTgtMjUuNjE1MDU5IDEwLjE5NDgyNC0xMi44IDIxLjUzNDExOC0yNC4xODQ0NzEgMzcuMTA0OTQxLTMwLjU2OTQxMiAxNS41MTA1ODgtNi4zMzk3NjUgMzEuNzQ0LTcuNzQwMjM1IDQ4LjMzODgyMy04Ljc0OTE3NnogbTQxLjUzMjIzNiA0NDMuMTA1ODgydi04LjkxNDgyM2MtMC4wMzAxMTgtMjIuNzY4OTQxLTExLjAzODExOC0zOC43MDExNzYtMzEuMTU2NzA2LTQ4LjI3ODU4OS0xOC4yMjExNzYtOC42ODg5NDEtMzcuMzc2LTguMzEyNDcxLTU2LjA0ODk0MS0xLjkyNzUyOS0xNy4wNjE2NDcgNS44Mjc3NjUtMzAuNDE4ODI0IDE3LjA0NjU4OC0zNS4wNzIgMzUuMDQxODgyLTIuNDg0NzA2IDkuNjM3NjQ3LTEuOTcyNzA2IDIwLjE0ODcwNi0yLjEyMzI5NSAzMC4yNjgyMzYtMC4zMzEyOTQgMjIuMjU2OTQxIDExLjQxNDU4OCAzNy4yMjU0MTIgMzAuMzI4NDcxIDQ2Ljk5ODU4OCAxNC43NTc2NDcgNy42NDk4ODIgMzAuNzk1Mjk0IDguODA5NDEyIDQ2LjkzODM1MyA2LjE0NCAxNy45Mi0yLjk2NjU4OCAzMS45MjQ3MDYtMTIuMjU3ODgyIDQxLjE4NTg4Mi0yOC4xNzUwNTkgNS44ODgtMTAuMTE5NTI5IDYuMTQ0LTIxLjIzMjk0MSA1Ljk0ODIzNi0zMS4xNTY3MDZ6IiBmaWxsPSIjRjFCNjE5IiBwLWlkPSIzMDU2OSI+PC9wYXRoPjwvc3ZnPg==', uiClass: 'ui-gold', desc: '使用说明与版本信息', action: 'help' },
					{ name: '资料编辑', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTk1MzI2MTg5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUwMjU5IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTM4NC44MTkyIDc4NS42MTI4YzIwLjc4NzItMjUuODA0OCA0NS4yNjA4LTQ5LjQ1OTIgNjguNTA1Ni03My4xMTM2IDYzLjI4MzItNjQuNDA5NiAxMjYuNjY4OC0xMjguOTIxNiAxODkuOTUyLTE5My4zMzEyIDU5LjA4NDgtNjAuMTA4OCAxMTguMTY5Ni0xMjAuMjE3NiAxNzcuMTUyLTE4MC4zMjY0IDEzLjIwOTYtMTMuNDE0NCAyNS44MDQ4LTI5Ljc5ODQgNDAuNTUwNC00MS40NzIgMTUuMzYtMTIuMDgzMiAyNS42LTQuNTA1NiAzNy41ODA4IDcuNzgyNCAxMC41NDcyIDEwLjg1NDQgMjAuNzg3MiAyMi4wMTYgMzEuMTI5NiAzMi45NzI4IDIuMzU1MiAyLjU2IDE1Ljk3NDQgMTMuMjA5NiAxNS45NzQ0IDE2Ljg5NiAwIDAtMC4zMDcyLTI1OC40NTc2LTAuMzA3Mi0yNTguNDU3NiAwLTM4LjYwNDgtMzEuNDM2OC03MC4wNDE2LTcwLjA0MTYtNzAuMDQxNkwxMzUuNzgyNCAyNi41MjE2Yy0zOC42MDQ4IDAtNzAuMDQxNiAzMS40MzY4LTcwLjA0MTYgNzAuMDQxNmwwIDgxMi42NDY0YzAgMzguNjA0OCAzMS40MzY4IDcwLjA0MTYgNzAuMDQxNiA3MC4wNDE2bDE4My43MDU2IDAuOTIxNiAzNi40NTQ0LTEzNi43MDRDMzU2LjA0NDggODQzLjQ2ODggMzY0LjU0NCA4MTAuODAzMiAzODQuODE5MiA3ODUuNjEyOHpNNDYxLjIwOTYgNDMyLjIzMDQgMjA3LjM2IDQzMi4yMzA0Yy0xMS45ODA4IDAtMjEuNzA4OC05LjcyOC0yMS43MDg4LTIxLjcwODggMC0xMS45ODA4IDkuNzI4LTIxLjcwODggMjEuNzA4OC0yMS43MDg4bDI1My44NDk2IDBjMTEuOTgwOCAwIDIxLjcwODggOS43MjggMjEuNzA4OCAyMS43MDg4QzQ4My4wMjA4IDQyMi41MDI0IDQ3My4xOTA0IDQzMi4yMzA0IDQ2MS4yMDk2IDQzMi4yMzA0ek02MzcuOTUyIDMxNy42NDQ4IDIwNy4zNiAzMTcuNjQ0OGMtMTEuOTgwOCAwLTIxLjcwODgtOS43MjgtMjEuNzA4OC0yMS43MDg4IDAtMTEuOTgwOCA5LjcyOC0yMS43MDg4IDIxLjcwODgtMjEuNzA4OEw2MzcuOTUyIDI3NC4yMjcyYzExLjk4MDggMCAyMS43MDg4IDkuNzI4IDIxLjcwODggMjEuNzA4OEM2NTkuNjYwOCAzMDcuOTE2OCA2NDkuOTMyOCAzMTcuNjQ0OCA2MzcuOTUyIDMxNy42NDQ4ek03NTguMTY5NiAyMDIuOTU2OCAyMDcuMzYgMjAyLjk1NjhjLTExLjk4MDggMC0yMS43MDg4LTkuNzI4LTIxLjcwODgtMjEuNzA4OCAwLTExLjk4MDggOS43MjgtMjEuNzA4OCAyMS43MDg4LTIxLjcwODhsNTUwLjgwOTYgMGMxMS45ODA4IDAgMjEuNzA4OCA5LjcyOCAyMS43MDg4IDIxLjcwODhDNzc5Ljg3ODQgMTkzLjIyODggNzcwLjE1MDQgMjAyLjk1NjggNzU4LjE2OTYgMjAyLjk1Njh6IiBmaWxsPSIjRkY5MDAwIiBwLWlkPSI1MDI2MCI+PC9wYXRoPjxwYXRoIGQ9Ik05OTIuNTYzMiA1MDEuNDUyOCA4OTEuNDk0NCA0MDAuMzg0Yy0xMC43NTItMTAuNzUyLTI5LjU5MzYtMTAuNzUyLTQwLjM0NTYgMEw0MjguMjM2OCA4MjMuMDkxMmMtMS43NDA4IDEuNzQwOC0zLjA3MiAzLjk5MzYtMy42ODY0IDYuMzQ4OGwtNDIuMjkxMiAxNTEuNjU0NGMtMS4zMzEyIDQuODEyOC0wLjEwMjQgMTAuMDM1MiAzLjI3NjggMTMuNzIxNiAyLjc2NDggMi45Njk2IDYuNjU2IDQuNzEwNCAxMC42NDk2IDQuNzEwNCAwLjkyMTYgMCAxLjc0MDgtMC4xMDI0IDIuNjYyNC0wLjIwNDhMNTYyLjE3NiA5NjguNzA0YzIuODY3Mi0wLjUxMiA1LjUyOTYtMS45NDU2IDcuNTc3Ni0zLjk5MzZsNDIyLjkxMi00MjIuODA5NkMxMDAzLjcyNDggNTMwLjczOTIgMTAwMy43MjQ4IDUxMi42MTQ0IDk5Mi41NjMyIDUwMS40NTI4ek05MjcuMTI5NiA1ODUuMzE4NGMtNS40MjcyIDUuNDI3Mi0xMy45MjY0IDUuNzM0NC0xOS4wNDY0IDAuNjE0NGwtMTAwLjg2NC0xMDAuODY0Yy01LjEyLTUuMTItNC44MTI4LTEzLjYxOTIgMC42MTQ0LTE5LjA0NjQgNS40MjcyLTUuNDI3MiAxNC4wMjg4LTUuNzM0NCAxOS4wNDY0LTAuNjE0NGwxMDAuODY0IDEwMC44NjRDOTMyLjg2NCA1NzEuMjg5NiA5MzIuNTU2OCA1NzkuODkxMiA5MjcuMTI5NiA1ODUuMzE4NHoiIGZpbGw9IiNGRjkwMDAiIHAtaWQ9IjUwMjYxIj48L3BhdGg+PC9zdmc+', uiClass: 'ui-orange', desc: '编辑资料与头像', action: 'profile' },
					{ name: '意见反馈', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDAxMTc4MDIwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU0NzkyIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc2My4yMyAxMDI0SDI1NC40MUMxMTQuNDg0IDEwMjQgMCA5MDkuNTE2IDAgNzY5LjU5VjI2MC43N0MwIDEyMC44NDUgMTE0LjQ4NCA2LjM2IDI1NC40MSA2LjM2aDUwOC44MmMxMzkuOTI1IDAgMjU0LjQxIDExNC40ODUgMjU0LjQxIDI1NC40MXY1MDguODJjMCAxMzkuOTI2LTExNC40ODUgMjU0LjQxLTI1NC40MSAyNTQuNDF6IiBmaWxsPSIjOUY1M0U2IiBwLWlkPSI1NDc5MyI+PC9wYXRoPjxwYXRoIGQ9Ik02OTkuNjI3IDMxMS42NTJIMzE4LjAxMmMtMTYuOTYgMC0yOS42OCAxMi43Mi0yOS42OCAyOS42ODF2MzAzLjE3MmMwIDE2Ljk2IDEyLjcyIDI5LjY4MSAyOS42OCAyOS42ODFoMTQ2LjI4Nmw0NC41MjIgNDIuNDAyIDQ0LjUyMi00Mi40MDJoMTQ2LjI4NWMxNi45NjEgMCAyOS42ODEtMTIuNzIgMjkuNjgxLTI5LjY4VjM0MS4zMzJjMC0xNC44NC0xMi43Mi0yOS42OC0yOS42OC0yOS42OHpNMzk4LjU3NiA1MjEuNTRjLTE2Ljk2MSAwLTI5LjY4Mi0xMi43Mi0yOS42ODItMjkuNjggMC0xNi45NjEgMTIuNzItMjkuNjgyIDI5LjY4Mi0yOS42ODJzMjkuNjggMTIuNzIgMjkuNjggMjkuNjgxYzAgMTYuOTYtMTIuNzIgMjkuNjgxLTI5LjY4IDI5LjY4MXogbTExMC4yNDQgMGMtMTYuOTYgMC0yOS42ODEtMTIuNzItMjkuNjgxLTI5LjY4IDAtMTYuOTYxIDEyLjcyLTI5LjY4MiAyOS42OC0yOS42ODJzMjkuNjgyIDEyLjcyIDI5LjY4MiAyOS42ODFjMCAxNi45Ni0xMi43MiAyOS42ODEtMjkuNjgxIDI5LjY4MXogbTExNi42MDQgMGMtMTYuOTYgMC0yOS42OC0xMi43Mi0yOS42OC0yOS42OCAwLTE2Ljk2MSAxMi43Mi0yOS42ODIgMjkuNjgtMjkuNjgyczI5LjY4MiAxMi43MiAyOS42ODIgMjkuNjgxYzAgMTYuOTYtMTIuNzIgMjkuNjgxLTI5LjY4MiAyOS42ODF6IiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI1NDc5NCI+PC9wYXRoPjwvc3ZnPg==', uiClass: 'ui-violet', desc: '提交建议与问题', action: 'feedback' },
					{ name: '系统设置', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MDAxNDkwNDM0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg4NzY5IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTEwMTkuNjEyODQ5NSA4NTguNTUwMDkzMzdjMCA4OS4zNDU2NzM2Ny03MS45MjE5OTg1IDE2MS43ODExMjYyNi0xNjAuNjI5NjM4MjcgMTYxLjc4MTEyNjI1SDE2NS4wMTU2MjM2OGMtODguNzA2NDc1ODEgMC0xNjAuNjI5NjM4MjYtNzIuNDM1NDUyNTktMTYwLjYyOTYzODI3LTE2MS43ODExMjYyNVYxNTkuNTc4MzY2ODZjMC04OS4zNDU2NzM2NyA3MS45MjE5OTg1LTE2MS43ODExMjYyNiAxNjAuNjI5NjM4MjctMTYxLjc4MTEyNjI1aDY5My45Njc1ODc1NWM4OC43MDY0NzU4MSAwIDE2MC42Mjk2MzgyNiA3Mi40MzU0NTI1OSAxNjAuNjI5NjM4MjcgMTYxLjc4MTEyNjI1djY5OC45NzE3MjY1MXoiIGZpbGw9IiMzN0E4RDEiIHAtaWQ9Ijg4NzcwIj48L3BhdGg+PHBhdGggZD0iTTc5NC45ODMwNzY5OCA1NzkuNzU2MTUwMzNsOTkuNjg4MTA2NjctMjQuMjg2MDMwNTF2LTkyLjgwMzYyOTQ5bC05OS42ODgxMDY2Ny0yNC4yODYwMzA1MWEyOTMuMTc0MTUxMzggMjkzLjE3NDE1MTM4IDAgMCAwLTMzLjI0NTI4MDctODAuODc0MjYyNzdsNTMuNDI5NDk5NDMtODguMTYyNzUwMDEtNjUuMTQxMTQzMzItNjUuNjIwODMzODMtODcuNTI3MDQ1MSA1My44MTk1Mzg3NmEyODguNzQwNTE1ODQgMjg4Ljc0MDUxNTg0IDAgMCAwLTgwLjMxMzA3MzIzLTMzLjQ4OTc4MjM0bC0yNC4wOTUwODYzNS0xMDAuNDExMTM0ODVoLTkyLjE1ODYwOTY1bC0yNC4wOTYyNTAzMSAxMDAuNDExMTM0ODVhMjg4Ljg2NTA5NTY3IDI4OC44NjUwOTU2NyAwIDAgMC04MC4zMTE5MDkyNiAzMy40ODM5NjE0NmwtODcuNTI4MjA5MDYtNTMuODE5NTM5OTEtNjUuMTM5OTc5MzggNjUuNjI2NjU1ODYgNTMuNDI5NDk5NDQgODguMTU2OTI4MDFjLTE0Ljg4MDg1NTYxIDI0LjgwMTgxMzYyLTI2LjE2NTIwMjQ5IDUxLjk5NzQxNzI1LTMzLjI0NTI4MDcxIDgwLjg3NDI2Mjc0bC05OS43MTEzOTI0MyAyNC4yODYwMzA1MSAwLjAyMzI4NTc2IDkyLjgwNDc5NDYgOTkuNjg4MTA2NjcgMjQuMjg3MTk0NDdjNy4wODAwNzgyMiAyOC44NzY4NDU1MSAxOC4zNjQ0MjYyNCA1Ni4wNzI0NTAyNyAzMy4yNDUyODA3MSA4MC44NzMwOTg4bC01My40NTI3ODUyIDg4LjE2MzkxMzk0IDY1LjE2MjEwMTE4IDY1LjYxOTY2OTkxIDg3LjUyODIwOTA3LTUzLjgxOTUzODc2YTI4OC44MTYxOTUxMyAyODguODE2MTk1MTMgMCAwIDAgODAuMjkwOTUxNCAzMy40ODk3ODIzMWwyNC4xMTgzNzIxMiAxMDAuNDExMTMzNzQgOTIuMTM1MzIzODgtMC4wMDU4MjA4NyAyNC4xMTgzNzIxMi0xMDAuNDA1MzEyODdhMjg4LjQzNzc5ODY5IDI4OC40Mzc3OTg2OSAwIDAgMCA4MC4yOTA5NTE0LTMzLjQ4Mzk2MTQ1bDg3LjU1MDMzMDg4IDUzLjgxOTUzODc3IDY1LjE0MTE0MzMzLTY1LjYyNTQ5MDc4LTUzLjQyOTQ5OTQ2LTg4LjE1ODA5MTk0YTI5My4yMTQ5MDIwNiAyOTMuMjE0OTAyMDYgMCAwIDAgMzMuMjQ0MTE2NzctODAuODc1NDI3ODR6IG0tMjgyLjk3MTQzNDEgNzQuMDY1NDY2MDJjLTc5LjM2ODgyOTE1IDAtMTQzLjcyMjkxMDE1LTY0LjgxMDQ4NDYyLTE0My43MjI5MTAxNS0xNDQuNzU2ODA0MjZzNjQuMzU0MDgwOTktMTQ0Ljc1NjgwNDI3IDE0My43MjI5MTAxNS0xNDQuNzU2ODA0MjcgMTQzLjcyMjkxMDE1IDY0LjgxMDQ4NDYyIDE0My43MjI5MTAxNSAxNDQuNzU2ODA0MjctNjQuMzU0MDgwOTkgMTQ0Ljc1NjgwNDI3LTE0My43MjI5MTAxNSAxNDQuNzU2ODA0MjZ6IiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI4ODc3MSI+PC9wYXRoPjwvc3ZnPg==', uiClass: 'ui-green', desc: '通知、主题与通用', action: 'settings' }
				]
			}
		},
		computed: {
			themeClass() {
				// 设置模块按主题切换模块底色与文案颜色。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		},
		methods: {
			handleToolClick(item) {
				// 根据 action 类型跳转页面，或弹出帮助与反馈说明。
				if (item.action === 'settings') {
					uni.navigateTo({
						url: '/subPages/settings/system'
					})
					return
				}

				if (item.action === 'profile') {
					uni.navigateTo({
						url: '/subPages/profile/profile'
					})
					return
				}

				if (item.action === 'help') {
					uni.navigateTo({
						url: '/subPages/helpCenter/helpCenter'
					})
					return
				}

				if (item.action === 'feedback') {
					uni.navigateTo({
						url: '/subPages/helpCenter/feedback'
					})
					return
				}

				uni.showModal({
					title: '意见反馈',
					content: '当前为演示版本，你可以整理问题现象、复现步骤和截图后反馈给开发同学。',
					showCancel: false,
					confirmText: '知道了',
					...(this.theme === 'dark' && {
						confirmColor: '#8AB7FF'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.security-settings {
		margin: 18rpx 15rpx 100rpx;
		padding: 28rpx;
		border-radius: 32rpx;
		background: #ffffff;
		border: 1rpx solid rgba(67, 76, 210, 0.06);
		box-shadow:
			0 2rpx 10rpx rgba(15, 23, 42, 0.04),
			0 18rpx 42rpx rgba(67, 76, 210, 0.08);
	}

	.section-title,
	.section-subtitle,
	.setting-name,
	.setting-desc {
		display: block;
	}

	.section-title {
		font-size: 40rpx;
		font-weight: 800;
		color: #24345b;
	}

	.section-subtitle {
		margin-top: 8rpx;
		font-size: 22rpx;
		line-height: 1.5;
		color: #8390ad;
	}

	.settings-grid {
		margin-top: 24rpx;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 18rpx;
	}

	.setting-item {
			padding: 24rpx 20rpx;
			border-radius: 26rpx;
			background: linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%);
			border: 2rpx solid rgba(67, 76, 210, 0.1);
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			box-shadow:
				0 2rpx 8rpx rgba(15, 23, 42, 0.048),
				0 8rpx 20rpx rgba(67, 76, 210, 0.065),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		}

	.setting-icon {
		width: 72rpx;
		height: 72rpx;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 800;
		
		.setting-icon-img {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.ui-gold {
		background: rgba(238, 192, 44, 0.16);
		color: #e0a91b;
	}

	.ui-orange {
		background: rgba(249, 115, 22, 0.14);
		color: #f97316;
	}

	.ui-violet {
		background: rgba(169, 87, 248, 0.14);
		color: #8b5cf6;
	}

	.ui-green {
		background: rgba(48, 185, 99, 0.14);
		color: #30b963;
	}

	.setting-name {
		margin-top: 18rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: #2a385c;
	}

	.setting-desc {
		margin-top: 10rpx;
		font-size: 20rpx;
		line-height: 1.5;
		color: #8a96af;
	}

	.security-settings.theme-dark {
		background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 3rpx 12rpx rgba(0, 0, 0, 0.32),
			0 18rpx 42rpx rgba(0, 0, 0, 0.26);

		.section-title {
			color: #f4f7fb;
		}

		.section-subtitle,
		.setting-desc {
			color: rgba(255, 255, 255, 0.52);
		}

		.setting-item {
			background: linear-gradient(180deg, #2d3037 0%, #262930 100%);
			border-color: rgba(255, 255, 255, 0.08);
			box-shadow:
				0 3rpx 12rpx rgba(0, 0, 0, 0.3),
				0 10rpx 26rpx rgba(0, 0, 0, 0.16),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.04);
		}

		.setting-name {
			color: #f5f7fa;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-20rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-float-up {
		animation: floatUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		animation-fill-mode: both;
	}

	@keyframes floatUp {
		from {
			opacity: 0;
			transform: translateY(60rpx);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
