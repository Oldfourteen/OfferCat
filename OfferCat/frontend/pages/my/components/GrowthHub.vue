<template>
	<view class="growth-hub" :class="themeClass" style="animation: fadeIn 0.6s ease-out;">
		<view class="section-head">
			<view>
				<text class="section-title">成长</text>
			</view>
			<text class="section-link" @click="navigateToTrajectory">查看趋势</text>
		</view>

		<view class="main-grid">
			<view v-for="item in primaryTools" :key="item.name" class="main-item" @click="handleToolClick(item)">
				<view class="tool-icon" :class="item.uiClass">
					<image v-if="item.icon.startsWith('data:image')" :src="item.icon" class="tool-icon-img" mode="aspectFit" />
					<text v-else>{{ item.icon }}</text>
				</view>
				<text class="tool-name">{{ item.name }}</text>
				<text class="tool-meta">{{ item.desc }}</text>
			</view>
		</view>

<!-- 		<view class="stats-row">
			<view v-for="(item, index) in stats" :key="item.label" class="stat-pill">
				<text class="stat-value">{{ dynamicStats[index] }}</text>
				<text class="stat-label">{{ item.label }}</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	import { getCheckInKey } from '@/utils/user.js'
	import { getRecruitmentSeason, getCurrentYear } from '@/utils/date.js'

	export default {
		name: 'GrowthHub',
		props: {
			theme: {
				type: String,
				default: 'light'
			}
		},
		data() {
			return {
				primaryTools: [
					{ name: '成长档案', desc: '查看阶段成果', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTkzNTc2Mzc1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MzQ1IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMG0yMDQuOCAwbDYxNC40IDBxMjA0LjggMCAyMDQuOCAyMDQuOGwwIDYxNC40cTAgMjA0LjgtMjA0LjggMjA0LjhsLTYxNC40IDBxLTIwNC44IDAtMjA0LjgtMjA0LjhsMC02MTQuNHEwLTIwNC44IDIwNC44LTIwNC44WiIgZmlsbD0iI0Y2QkQxNiIgcC1pZD0iMTQzNDYiPjwvcGF0aD48cGF0aCBkPSJNMjkzLjM3NiAyNjguOGwxNDcuMDA4IDAuMDM4NGMzOC41NjY0IDAgNTIuNzc0NCAyMi45NjMyIDU4Ljc1MiA2NC4yODE2bDAuNjQgNC44NjQgNC40MTYgMTguODkyOGgyMjYuNDcwNGMyNC43NjgtMC4xNjY0IDQ1Ljg4OCAxOS40MzA0IDQ5LjYyNTYgNDYuMDQxNmwwLjM4NCAzLjczNzYgMC4xMjggMy44NHYyOTEuMDQ2NGMtMC4xOTIgMjguMzUyLTIwLjU0NCA1MS43MTItNDYuNTkyIDUzLjUyOTZsLTMuNTg0IDAuMTI4SDI5My4zNzZjLTI2LjExMiAwLjE2NjQtNDcuOTM2LTIxLjU2OC01MC4wNDgtNDkuODE3NmwtMC4xMjgtMy44NjU2VjMyMi40NTc2YzAuMTkyLTI4LjM1MiAyMC41MDU2LTUxLjcxMiA0Ni41OTItNTMuNTI5NmwzLjU4NC0wLjEyOHogbTM5Mi43OTM2IDIxMy4zMjQ4YTI1LjYgMjUuNiAwIDAgMC0zNi4xNDcyLTEuOTk2OGwtOTcuNzUzNiA4Ny41MDA4LTU5LjgxNDQtNjAuMzY0OC0xLjY1MTItMS41MzZhMjUuNiAyNS42IDAgMCAwLTMyLjA3NjgtMC43NjhsLTExNS44Nzg0IDg4LjYwMTYtMS42MTI4IDEuMzQ0YTI1LjYgMjUuNiAwIDAgMC0zLjE3NDQgMzQuNTQ3MmwxLjM0NCAxLjYxMjhhMjUuNiAyNS42IDAgMCAwIDM0LjU0NzIgMy4xNzQ0bDk3Ljk3MTItNzQuOTQ0IDYxLjEwNzIgNjEuNjcwNCAxLjY1MTIgMS41MzZhMjUuNiAyNS42IDAgMCAwIDMzLjYxMjgtMC40NzM2bDExNS44Nzg0LTEwMy43NTY4IDEuNTc0NC0xLjUzNmEyNS42IDI1LjYgMCAwIDAgMC40MjI0LTM0LjYxMTJ6TTY5My42MzIgMjY4LjhDNzIwLjU2MzIgMjY4LjggNzQyLjQgMjg2Ljg0OCA3NDIuNCAzMDkuMDU2IDc0Mi40IDMyMi4xNzYgNzI5LjU0ODggMzMyLjggNzEzLjY1MTIgMzMyLjhhMzAuMDY3MiAzMC4wNjcyIDAgMCAxLTI1LjI5MjgtMTIuNDE2bC0xLjIxNi0yLjA3MzYtMC44OTYtMi4wNDhINTUzLjU0ODhhMjcuOTY4IDI3Ljk2OCAwIDAgMS0yOC4xNi0xOC45NDRsLTAuNDM1Mi0yLjMyOTYtMC4xNTM2LTIuNDQ0OGEyNi4wMzUyIDI2LjAzNTIgMCAwIDEgMjUuODE3Ni0yMy42MTZsMi45MzEyLTAuMTE1Mkg2OTMuNjMyeiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMTQzNDciPjwvcGF0aD48L3N2Zz4=', uiClass: 'ui-1' },
					{ name: '打卡天数', desc: '维持连续节奏', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTkzNzYyNDkzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxMzk2IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc5LjUxMzYgODIxLjg2MjRhMTMzLjQyNzIgMTMzLjQyNzIgMCAwIDAgMTMzLjM3NiAxMzMuMTJoNTk4LjIyMDhhMTMzLjQyNzIgMTMzLjQyNzIgMCAwIDAgMTMzLjM3Ni0xMzMuMTJWMzg0LjM1ODRINzkuNTEzNnpNODExLjExMDQgMTU3LjMzNzZoLTI4Ljk3OTJ2LTQ3LjEwNGE1Ny4zNDQgNTcuMzQ0IDAgMSAwLTExNC42MzY4IDB2NDcuMTA0SDM3MC4xMjQ4di00Ny4xMDRhNTcuMzQ0IDU3LjM0NCAwIDEgMC0xMTQuNjM2OCAwdjQ3LjEwNGgtNDIuNTk4NGExMzMuMzc2IDEzMy4zNzYgMCAwIDAtMTMzLjEyIDEzMy4zNzZ2MjQuMzJoODY0LjcxNjh2LTI0LjMyYTEzMy4zNzYgMTMzLjM3NiAwIDAgMC0xMzMuMzc2LTEzMy4zNzZ6IiBmaWxsPSIjQ0E2M0U0IiBwLWlkPSIyMTM5NyI+PC9wYXRoPjxwYXRoIGQ9Ik01MDcuNDQzMiA4MTUuMjA2NGgtMS4zODI0YTM1Ljg0IDM1Ljg0IDAgMCAxLTI2LjA2MDgtMTIuNzQ4OGwtMTMwLjUwODgtMTU1LjU0NTZhMzUuODQgMzUuODQgMCAxIDEgNTQuODg2NC00Ni4wOGwxMDUuMTY0OCAxMjUuMjg2NCAyMDAuNDk5Mi0yMDQuNDkyOGEzNS44NCAzNS44NCAwIDEgMSA1MS4yIDUwLjE3NmwtMjI4LjE0NzIgMjMyLjcwNGEzNS44NCAzNS44NCAwIDAgMS0yNS42NTEyIDEwLjcwMDh6IiBmaWxsPSIjRURGN0ZGIiBwLWlkPSIyMTM5OCI+PC9wYXRoPjwvc3ZnPg==', uiClass: 'ui-2' },
					{ name: '周末复盘', desc: '复盘发现问题', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTk0MTEwNzk4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI2OTU1IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTI5Ni45NiAyMDEuMzg2NjY3YzMwLjcyIDAgNTEuMi0yMC40OCA1NC42MTMzMzMtNDcuNzg2NjY3di0xMDIuNEMzNDguMTYgMjMuODkzMzMzIDMyNy42OCAwIDMwMC4zNzMzMzMgMGMtMzAuNzIgMC01MS4yIDIwLjQ4LTUxLjIgNDcuNzg2NjY3djEwMi40YzAgMjcuMzA2NjY3IDIwLjQ4IDQ3Ljc4NjY2NyA0Ny43ODY2NjcgNTEuMnpNNzE2LjggMjAxLjM4NjY2N2MzMC43MiAwIDUxLjItMjAuNDggNTQuNjEzMzMzLTQ3Ljc4NjY2N3YtMTAyLjRDNzY4IDIzLjg5MzMzMyA3NDcuNTIgMCA3MjAuMjEzMzMzIDBjLTMwLjcyIDAtNTEuMiAyMC40OC01MS4yIDQ3Ljc4NjY2N3YxMDIuNGMwIDI3LjMwNjY2NyAyMC40OCA0Ny43ODY2NjcgNDcuNzg2NjY3IDUxLjJ6IiBmaWxsPSIjNzNFNUQyIiBwLWlkPSIyNjk1NiI+PC9wYXRoPjxwYXRoIGQ9Ik04OTAuODggODUuMzMzMzMzaC00Ny43ODY2Njd2NzUuMDkzMzM0Yy02LjgyNjY2NyA2NC44NTMzMzMtNTguMDI2NjY3IDEwOS4yMjY2NjctMTIyLjg4IDEwOS4yMjY2NjZoLTYuODI2NjY2Yy02MS40NC02LjgyNjY2Ny0xMDkuMjI2NjY3LTU4LjAyNjY2Ny0xMDkuMjI2NjY3LTExOS40NjY2NjZWODUuMzMzMzMzaC0xODAuOTA2NjY3djc1LjA5MzMzNGMtNi44MjY2NjcgNjQuODUzMzMzLTU4LjAyNjY2NyAxMDkuMjI2NjY3LTEyMi44OCAxMDkuMjI2NjY2SDI5MC4xMzMzMzNjLTYxLjQ0LTYuODI2NjY3LTEwNS44MTMzMzMtNTguMDI2NjY3LTEwNS44MTMzMzMtMTE5LjQ2NjY2NlY4NS4zMzMzMzNIMTMzLjEyQzYxLjQ0IDg1LjMzMzMzMyAwIDE0My4zNiAwIDIxOC40NTMzMzN2NjcyLjQyNjY2N0MwIDk2Mi41NiA2MS40NCAxMDI0IDEzMy4xMiAxMDI0aDc1Ny43NmM3MS42OCAwIDEzMy4xMi02MS40NCAxMzMuMTItMTMzLjEyVjIxOC40NTMzMzNjMC03NS4wOTMzMzMtNjEuNDQtMTMzLjEyLTEzMy4xMi0xMzMuMTJ6TTM2OC42NCA1MTguODI2NjY3di01OC4wMjY2NjdoMTE2LjA1MzMzM3YtNDQuMzczMzMzaDY4LjI2NjY2N3Y0NC4zNzMzMzNoMTEyLjY0djU4LjAyNjY2N2gtMTEyLjY0djUxLjJoMTMzLjEydjYxLjQ0aC0zMzQuNTA2NjY3di02MS40NGgxMzMuMTJ2LTUxLjJoLTExNi4wNTMzMzN6IG0wIDMyNy42OHYtMTgwLjkwNjY2N2gyOTAuMTMzMzMzdjE4MC45MDY2NjdoLTI5MC4xMzMzMzN6IG00MTYuNDI2NjY3IDM0LjEzMzMzM2MwIDQwLjk2LTIzLjg5MzMzMyA2MS40NC03NS4wOTMzMzQgNjEuNDRoLTg1LjMzMzMzM2wtMTcuMDY2NjY3LTY4LjI2NjY2N2MzNC4xMzMzMzMgMy40MTMzMzMgNjEuNDQgMy40MTMzMzMgODEuOTIgMy40MTMzMzN2LTY4LjI2NjY2N2gtMTcuMDY2NjY3YzUxLjItMzQuMTMzMzMzIDc1LjA5MzMzMy01NC42MTMzMzMgNzUuMDkzMzM0LTYxLjQ0em0tNTEuMi0xNS4zNmMtMTMuNjUzMzMzIDEwLjI0LTMwLjcyIDE3LjA2NjY2Ny01OC4wMjY2NjcgMjMuODkzMzM0di00MC45NmMzNC4xMzMzMzMtNi44MjY2NjcgNTEuMi0xNy4wNjY2NjcgNjQuODUzMzMzLTI3LjMwNjY2N2wtNi44MjY2NjYgNDQuMzczMzMzeiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMjY5NTciPjwvcGF0aD48L3N2Zz4=', uiClass: 'ui-3' },
					{ name: 'AI冲刺营', desc: `${getCurrentYear()}${getRecruitmentSeason()}专属`, icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MTA4OTg4MTQzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyMDc2IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTkyOC43MiA1NjQuNDhjMC00Ni40Ny0yOC44LTE0OS4xOS05MS4zNC0yNTMtMS4xMSAzNC43MS0zMy4wOSAxMTguODItNTYuNjUgMTQxLjIxQzc2NSA0MTMuNDcgNzYxIDE1MS45IDM2OC43NSA2My44NyAzOTIuNjIgMzI0IDk4LjA3IDMyMC4yNiA5OC4wNyA2MDFjMCAxNDkuMTkgMTAxLjY5IDI3Ny41MiAyNDcuMjkgMzM0LjQ5IDk4LjkgMjQuMDcgMTU4LjU3IDI0LjA3IDE1OC41NyAyNC4wN3M5OS40NiAwIDE2Ni44NS0yMC4xNmMxNjIuNjItNTkuODkgMjcwLjk5LTIwOS43OCAyNTcuOTQtMzc0LjkyeiIgZmlsbD0iI0YyM0Q0RiIgcC1pZD0iMTIwNzciPjwvcGF0aD48cGF0aCBkPSJNNzc4LjM4IDcxMi42M2MwLTI5LTE4LjM3LTkzLjI0LTU4LjI1LTE1OC4xNC0wLjcxIDIxLjY5LTIxLjExIDc0LjI2LTM2LjEzIDg4LjI2LTEwLTI0LjUtMTIuNTgtMTg4LTI2Mi43NS0yNDNDNDM2LjQ4IDU2Mi4zNiAyNDguNjMgNTYwIDI0OC42MyA3MzUuNDZjMCA5My4yNCA2NC44NSAxNzMuNDUgMTU3LjcxIDIwOS4wNiA2My4wNyAxNSAxMDEuMTMgMTUgMTAxLjEzIDE1czYzLjQzIDAgMTA2LjQtMTIuNmMxMDMuNzItMzcuMzkgMTcyLjgzLTEzMS4wOCAxNjQuNTEtMjM0LjI5eiIgZmlsbD0iI0ZGNUM2NCIgcC1pZD0iMTIwNzgiPjwvcGF0aD48cGF0aCBkPSJNNjcyLjU4IDc5Mi4xOWMwLTE2Ljk0LTExLTU0LjM5LTM1LTkyLjI1LTAuMzcgMTIuNjYtMTIuNTggNDMuMzItMjEuNTggNTEuNDktNi0xNC4yOS03LjU1LTEwOS42Ni0xNTcuNjQtMTQxLjc1IDkuMTMgOTQuODYtMTAzLjU4IDkzLjQ3LTEwMy41OCAxOTUuODMgMCA1NC4zOSAzOC45MSAxMDEuMTggOTQuNjMgMTIxLjk0IDM3Ljg0IDguNzggNjAuNjggOC43OCA2MC42OCA4Ljc4czM4LjA1IDAgNjMuODQtNy4zNGM2Mi4xOC0yMS44OSAxMDMuNjUtNzYuNDkgOTguNjUtMTM2Ljd6IiBmaWxsPSIjRkY3MTZFIiBwLWlkPSIxMjA3OSI+PC9wYXRoPjwvc3ZnPg==', uiClass: 'ui-4' },
					{ name: '做题记录', desc: '查看练习历史', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MTA4NDY0MTQ4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUzMTIiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNjA0LjE2IDkyNi43MkgxNTguNzJjLTM1Ljg0IDAtNTguODgtMjUuNi01OC44OC01OC44OFYxNzEuNTJjMC0zNS44NCAyNS42LTU4Ljg4IDU4Ljg4LTU4Ljg4aDY5My43NmMzNS44NCAwIDU4Ljg4IDI1LjYgNTguODggNTguODh2NDguNjRjMCAyMC40OCAyMC40OCAzOC40IDM4LjQgMzguNCAyMC40OCAwIDM4LjQtMjAuNDggMzguNC0zOC40VjE3MS41MmMwLTc0LjI0LTY0LTEzOC4yNC0xMzguMjQtMTM4LjI0aC02OTEuMkM4NC40OCAzMy4yOCAyMC40OCA5Ny4yOCAyMC40OCAxNzEuNTJ2NjkzLjc2YzAgNzQuMjQgNjQgMTM4LjI0IDEzOC4yNCAxMzguMjRoNDQ1LjQ0YzIwLjQ4IDAgMzguNC0yMC40OCAzOC40LTM4LjQgMC0yMC40OC0xMi44LTM4LjQtMzguNC0zOC40eiBtMCAwIiBwLWlkPSI1MzEzIiBmaWxsPSIjZDQyMzdhIj48L3BhdGg+PHBhdGggZD0iTTU4My42OCA1MjkuOTJjMC0yMC40OC0yMC40OC0zOC40LTM4LjQtMzguNEgyNTAuODhjLTE1LjM2IDAtMjAuNDggNS4xMi0yNS42IDE1LjM2LTUuMTIgNS4xMi0xNS4zNiAyMC40OC0xNS4zNiAyNS42IDAgMjAuNDggMjAuNDggMzguNCAzOC40IDM4LjRoMjkxLjg0YzIzLjA0LTIuNTYgNDMuNTItMTcuOTIgNDMuNTItNDAuOTZ6IG00MTcuMjgtNzkuMzZjMC01My43Ni00OC42NC0xMTAuMDgtMTA0Ljk2LTExMC4wOGgtNjkuMTJjLTUzLjc2IDAtMTE1LjIgNTMuNzYtMTE1LjIgMTEwLjA4djQxNy4yOGMwIDE1LjM2IDEwLjI0IDMwLjcyIDI1LjYgMzguNGw3OS4zNiA3OS4zNmMxNS4zNiAyMC40OCAzMC43MiAzMC43MiA0OC42NCAzMC43MiAyMC40OCAwIDM4LjQtMTAuMjQgNDguNjQtMzAuNzJsNjkuMTItNzkuMzZjMTAuMjQtMTAuMjQgMTAuMjQtMjAuNDggMTAuMjQtMzAuNzJoNS4xMmwyLjU2LTQyNC45NnogbS04NC40OCA0MDkuNmwtNjQgNjkuMTItNjkuMTItNjkuMTJWNTU4LjA4aDEzMy4xMnYzMDIuMDh6IG0wLTM3Ni4zMmgtMTMzLjEydi0zNS44NGMwLTE1LjM2IDE1LjM2LTMwLjcyIDM1Ljg0LTMwLjcyaDY0YzIwLjQ4IDAgMzAuNzIgMjAuNDggMzAuNzIgMzAuNzJ2MzUuODRoMi41NnogbS02NjUuNiAyMTUuMDRjLTIwLjQ4IDAtMzguNCAyMC40OC0zOC40IDM4LjQgMCAyMC40OCAyMC40OCAzOC40IDM4LjQgMzguNGgxNzkuMmMyMC40OCAwIDM4LjQtMjAuNDggMzguNC0zOC40IDAtMjAuNDgtMjAuNDgtMzguNC0zOC40LTM4LjRoLTE3OS4yeiBtMzg0LTQxMi4xNmgtMzg0Yy0yMC40OCAwLTM4LjQgMjAuNDgtMzguNCAzOC40IDAgMjAuNDggMjAuNDggMzguNCAzOC40IDM4LjRoMzgxLjQ0YzIwLjQ4IDAgMzguNC0yMC40OCAzOC40LTM4LjQgMi41Ni0xNy45Mi0xNy45Mi0zOC40LTM1Ljg0LTM4LjR6IG0wIDAiIHAtaWQ9IjUzMTQiIGZpbGw9IiNkNDIzN2EiPjwvcGF0aD48L3N2Zz4=', uiClass: 'ui-5' },
					{ name: '我的收藏', desc: '查看收藏题单', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MTA5NTIxMDQ4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY2OTQiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNDUzLjEzMiAxMTEuNTA0YzI1LjMzNC00Ny4zNCA5Mi40LTQ3LjM0IDExNy43MzYgMEw2ODAuMiAzMTUuNzE2bDIyNS4xNjggNDIuOTU2YzUxLjk2OCA5LjkxNiA3Mi42MiA3NC4wOTggMzYuNCAxMTMuMTRsLTE1Ny42MDggMTY5LjgzNiAyOS40NTYgMjMxLjMwNmM2Ljc4OCA1My4zMTItNDcuNCA5My4wNzItOTUuMjkgNjkuOTFMNTEyIDg0My4wOTRsLTIwNi4zMjggOTkuNzdjLTQ3Ljg5MiAyMy4xNjItMTAyLjA3OC0xNi42LTk1LjI5LTY5LjkxbDI5LjQ1Ni0yMzEuMzA2LTE1Ny42MDgtMTY5LjgzOGMtMzYuMjItMzkuMDQyLTE1LjU2OC0xMDMuMjIgMzYuNC0xMTMuMTRMMzQzLjggMzE1LjcxOGwxMDkuMzM0LTIwNC4yMTJ6IiBmaWxsPSIjRkY5MzRBIiBwLWlkPSI2Njk1Ij48L3BhdGg+PHBhdGggZD0iTTcxOS4zMzYgNDQ3LjFjMTYuNDItMzEuODY0IDYxLjcxMi0zMS44NjQgNzguMTMyIDBsNDAuMjMgNzguMDQ0IDg2Ljc1NiAxNy4xODRjMzMuNTEyIDYuNjQyIDQ3LjA2NCA0Ny41MTIgMjQuMjE2IDczLjA3NGwtNjEuOTYgNjkuMzM2IDExLjI2OCA5MS44NzJjNC4zIDM1LjA1Ni0zMS45MiA2MC44NC02My4zNDggNDUuMDQ2bC03Ni4yMjgtMzguMjgtNzYuMjI4IDM4LjI4Yy0zMS40MjggMTUuNzkyLTY3LjY0OC05Ljk5LTYzLjM0OC00NS4wNDZsMTEuMjY4LTkxLjg3Mi02MS45Ni02OS4zMzZjLTIyLjg0OC0yNS41NjItOS4yOTYtNjYuNDMyIDI0LjIxNi03My4wNzRsODYuNzU2LTE3LjE4NCA0MC4yMy03OC4wNDJ6IiBmaWxsPSIjRkNEQTZFIiBwLWlkPSI2Njk2Ij48L3BhdGg+PC9zdmc+', uiClass: 'ui-6' }
				],
				// stats: [
				// 	{ label: '本周成长值', value: '+128' },
				// 	{ label: '连续专注', value: '14天' },
				// 	{ label: '能力提升', value: '+9%' }
				// ],
				// dynamicStats: ['+0', '0天', '+0%'],
				
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			totalCheckInDays() {
				const checkInKey = getCheckInKey()
				const checkIns = uni.getStorageSync(checkInKey) || {}
				return Object.values(checkIns).filter(Boolean).length
			}
		},
		methods: {
			navigateToTrajectory() {
				uni.setStorageSync('growth_archive_scroll_target', 'trend')
				uni.switchTab({
					url: '/pages/GrowthArchive/GrowthArchive'
				})
			},
			handleToolClick(item) {
				const actions = {
					'成长档案': () => {
						uni.switchTab({
							url: '/pages/GrowthArchive/GrowthArchive'
						})
					},
					'打卡天数': () => {
						uni.showModal({
							title: '打卡提醒',
							content: `你已经累计打卡 ${this.totalCheckInDays} 天了，继续保持这个节奏。`,
							showCancel: false,
							confirmText: '知道了'
						})
					},
					'周末复盘': () => {
						uni.navigateTo({
							url: '/subPages/questionBank/history?type=all'
						})
					},
					'AI冲刺营': () => {
						uni.navigateTo({
							url: '/subPages/springCamp/springCamp'
						})
					},
					'做题记录': () => {
						uni.navigateTo({
							url: '/subPages/questionBank/history?type=all'
						})
					},
					'我的收藏': () => {
						uni.navigateTo({
							url: '/subPages/questionBank/favorites?type=all'
						})
					}
				}

				if (actions[item.name]) {
					actions[item.name]()
				}
			}
		}
	}
</script>

<style lang="scss">
	.growth-hub {
		margin: 18rpx 15rpx 0;
		padding: 28rpx;
		border-radius: 32rpx;
		background: #ffffff;
		box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.08);
	}

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20rpx;
	}

	.section-title,
	.section-subtitle {
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

	.section-link {
		flex-shrink: 0;
		font-size: 24rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.main-grid {
		margin-top: 24rpx;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 18rpx;
	}

	.main-item {
			padding: 24rpx 18rpx;
			border-radius: 24rpx;
			background: linear-gradient(180deg, #fbfcff 0%, #f5f7ff 100%);
			border: 2rpx solid rgba(67, 76, 210, 0.1);
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			cursor: pointer;
		}

	.tool-icon {
		width: 72rpx;
		height: 72rpx;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 800;

		.tool-icon-img {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.ui-1 {
		background: rgba(238, 192, 44, 0.16);
		color: #e0a91b;
	}

	.ui-2 {
		background: rgba(169, 87, 248, 0.14);
		color: #a957f8;
	}

	.ui-3 {
		background: rgba(48, 185, 99, 0.14);
		color: #30b963;
	}

	.ui-4 {
		background: rgba(242, 61, 79, 0.14);
		color: #F23D4F;
	}

	.ui-5 {
		background: rgba(212, 35, 122, 0.14);
		color: #d4237a;
	}

	.ui-6 {
		background: rgba(255, 147, 74, 0.14);
		color: #FF934A;
	}

	.tool-name {
		margin-top: 16rpx;
		font-size: 26rpx;
		font-weight: 700;
		color: #2a385c;
	}

	.tool-meta {
		margin-top: 8rpx;
		font-size: 20rpx;
		line-height: 1.5;
		color: #8a96af;
	}

	.stats-row {
		margin-top: 20rpx;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16rpx;
	}

	.stat-pill {
			padding: 18rpx 14rpx;
			border-radius: 22rpx;
			background: linear-gradient(135deg, rgba(49, 101, 215, 0.08), rgba(1, 188, 255, 0.08));
			border: 2rpx solid rgba(67, 76, 210, 0.1);
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

	.stat-value,
	.stat-label {
		display: block;
	}

	.stat-value {
		font-size: 30rpx;
		font-weight: 800;
		color: #344b8f;
	}

	.stat-label {
		margin-top: 8rpx;
		font-size: 20rpx;
		line-height: 1.4;
		color: #7e8baa;
	}

	.sub-grid {
		margin-top: 20rpx;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 18rpx;
	}

	.sub-item {
		padding: 22rpx 12rpx 18rpx;
		border-radius: 24rpx;
		background: linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.sub-icon {
		width: 66rpx;
		height: 66rpx;
		border-radius: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		font-weight: 800;
	}

	.sub-name {
		margin-top: 14rpx;
		font-size: 22rpx;
		line-height: 1.35;
		font-weight: 700;
		color: #2a385c;
	}

	.growth-hub.theme-dark {
		background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
		box-shadow: 0 18rpx 42rpx rgba(0, 0, 0, 0.26);

		.section-title,
		.tool-name {
			color: #f4f7fb;
		}

		.section-link {
			color: #8ab7ff;
		}

		.tool-meta,
		.stat-label {
			color: rgba(255, 255, 255, 0.56);
		}

		.main-item,
		.stat-pill,
		.sub-item {
			background: linear-gradient(180deg, #2d3037 0%, #262930 100%);
		}

		.stat-value {
			color: #f2f5fa;
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
</style>
