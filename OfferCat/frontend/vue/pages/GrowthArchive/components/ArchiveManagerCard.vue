<template>
	<view class="section-card" :class="themeClass">
		<view class="section-head">
			<text class="section-title">我的档案管理</text>
		</view>

		<view class="entry-grid">
			<!-- 四类档案入口展示类型说明和已录入数量。 -->
			<view v-for="item in entries" :key="item.type" class="entry-item" @click="openEntry(item)">
				<view class="entry-icon">
					<image v-if="item.iconSrc" :src="item.iconSrc" mode="aspectFit" style="width: 56rpx; height: 56rpx;" />
					<text v-else>{{ item.icon }}</text>
				</view>
				<text class="entry-title">{{ item.title }}</text>
				<text class="entry-desc">{{ item.desc }}</text>
				<view class="entry-count-badge">
					<text class="entry-count">已录入 {{ item.count }} 项</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
		import { getArchiveSummary, ARCHIVE_DATA_UPDATED_EVENT } from '@/utils/archiveData.js'
		import { BASE_URL, getApiBase } from '@/api/config.js'
		import { getUser } from '@/utils/user.js'

		export default {
			name: 'ArchiveManagerCard',
			props: {
				theme: {
					type: String,
					default: 'light'
				}
			},
			created() {
				// 进入页面先拉取四类档案数量，并监听档案更新事件。
				this.fetchEntryCounts()
				if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
					uni.$on(ARCHIVE_DATA_UPDATED_EVENT, this.fetchEntryCounts)
				}
			},
			beforeDestroy() {
				// 兼容 Vue2 生命周期，离开时移除事件监听。
				if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
					uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.fetchEntryCounts)
				}
			},
			beforeUnmount() {
				// 兼容 Vue3 生命周期，离开时移除事件监听。
				if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
					uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.fetchEntryCounts)
				}
			},
			computed: {
				themeClass() {
					// 根据主题切换档案管理模块的整体视觉风格。
					return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
				}
			},
			data() {
			return {
				// 档案入口的静态配置，数量字段会在运行时覆盖。
				entries: [
				{
					type: 'awards',
					iconSrc: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTU3NTQ5ODkwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDExMTcgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxNzQ1IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTQ4MS40MTk2MzYgNjEzLjg3ODY5MWgxMzIuNzQ3NjM3djIyNi4yMTA5MDloLTEzMi43NDc2Mzd6IiBmaWxsPSIjRkVENTJGIiBwLWlkPSIyMTc0NiI+PC9wYXRoPjxwYXRoIGQ9Ik01NDcuNzkzNDU1IDcxNC4xMTg5ODJjLTE4NC4zNTcyMzYgMC0zMzMuODk4NDczLTE0OS41NDEyMzYtMzMzLjg5ODQ3My0zMzMuODk4NDczVjEyOC45NDk1MjdoNjY3Ljc3ODMyN3YyNTEuMjcwOTgyYzAgMTg0LjM1NzIzNi0xNDkuNTQxMjM2IDMzMy44OTg0NzMtMzMzLjg3OTg1NCAzMzMuODk4NDczeiBtMjAzLjMxMDU0NSAxMzcuODg2MjU0aC00MDYuNjIxMDkxYTY5LjI5Njg3MyA2OS4yOTY4NzMgMCAwIDAtNjkuMzcxMzQ1IDY5LjM1MjcyOHY5MC4zNTQwMzZoNTQ1LjMyNjU0NXYtOTAuMzU0MDM2YTY5LjI5Njg3MyA2OS4yOTY4NzMgMCAwIDAtNjkuMzM0MTA5LTY5LjM1MjcyOHoiIGZpbGw9IiNGRUQ1MkYiIHAtaWQ9IjIxNzQ3Ij48L3BhdGg+PHBhdGggZD0iTTg3My41NTU3ODIgNTcuODQ2NjkxSDIyMi4wMTI1MDlhNTUuNjY4MzY0IDU1LjY2ODM2NCAwIDAgMC01NS42NjgzNjQgNTUuNjY4MzY0IDU1LjU1NjY1NSA1NS41NTY2NTUgMCAwIDAgNTUuNjY4MzY0IDU1LjUzODAzNkg4NzMuNTc0NGE1NS40NDQ5NDUgNTUuNDQ0OTQ1IDAgMCAwIDU1LjUzODAzNi01NS41MzgwMzYgNTUuNTU2NjU1IDU1LjU1NjY1NSAwIDAgMC01NS41MzgwMzYtNTUuNjY4MzY0ek02NTMuMDQyMDM2IDc4OS44MzkxMjdINDQyLjU0NDg3M2MtMTcuMDcyODczIDAtMzMuNjA1ODE4IDYuNzU4NC00NS42NTE3ODIgMTguOTUzMzA5YTY0LjgyODUwOSA2NC44Mjg1MDkgMCAwIDAtMTguOTcxOTI3IDQ1LjY1MTc4MmgzMzkuNzI1OTYzYzAtMzUuNzQ2OTA5LTI4Ljg1ODE4Mi02NC42MDUwOTEtNjQuNjA1MDkxLTY0LjYwNTA5MXoiIGZpbGw9IiNFRkFFMzAiIHAtaWQ9IjIxNzQ4Ij48L3BhdGg+PHBhdGggZD0iTTcxNS43NDgwNzMgMzY1LjA0NjY5MWwtODkuMjU1NTY0LTguMTE3NTI3YTIwLjY4NDggMjAuNjg0OCAwIDAgMS0xNi4zODQtMTEuMTE1MDU1bC00Ny41NTA4MzYtOTQuNjczNDU0YTIwLjM4NjkwOSAyMC4zODY5MDkgMCAxIDAtMzYuODQ1MzgyIDAuODE5MmwtNDEuNDYyNjkxIDkzLjAzNTA1NGMtMi45Nzg5MDkgNi43NzcwMTgtOS4zNDYzMjcgMTEuMzk0MzI3LTE2LjY0NDY1NSAxMi4wNjQ1ODJsLTg3LjkxNTA1NCA4LjExNzUyN2EyMC40MjQxNDUgMjAuNDI0MTQ1IDAgMCAwLTE3Ljc0MzEyNyAxNC44OTQ1NDZjLTIuMTc4MzI3IDguMTM2MTQ1IDAuOTMwOTA5IDE2Ljk0MjU0NSA3LjcwNzkyNyAyMS44MjA1MDlsNjcuODYzMjczIDQ4LjUwMDM2M2M3LjQ0NzI3MyA1LjI2ODk0NSAxMC40MjYxODIgMTUuMDI0ODczIDcuMzE2OTQ1IDIzLjU3MDYxOWwtMzEuNjg4MTQ1IDg2LjE0NjMyN2EyMC4zNDk2NzMgMjAuMzQ5NjczIDAgMSAwIDI4LjU3ODkwOSAyNS4wNjAwNzNsOTMuNTkzNi00OS4wNDAyOTFjNS44Mjc0OTEtMi45Nzg5MDkgMTIuNzM0ODM2LTMuMTA5MjM2IDE4LjU2MjMyNy0wLjEzMDMyOGw5OC44ODExNjQgNDkuODQwODczYTIwLjQwNTUyNyAyMC40MDU1MjcgMCAwIDAgMjguMTY5MzA5LTI1LjQ2OTY3M2wtMzIuOTE2OTQ2LTg2LjE0NjMyN2EyMC4yMTkzNDUgMjAuMjE5MzQ1IDAgMCAxIDcuNDQ3MjczLTIzLjk4MDIxOGw2OS45MTEyNzMtNDguNDgxNzQ2YzYuODg4NzI3LTQuODc3OTY0IDEwLjE0NjkwOS0xMy42ODQzNjQgNy45ODcyLTIxLjgyMDUwOWExOS45NTg2OTEgMTkuOTU4NjkxIDAgMCAwLTE3LjYxMjgtMTQuODk0NTQ1eiIgZmlsbD0iI0ZGRjJBMCIgcC1pZD0iMjE3NDkiPjwvcGF0aD48cGF0aCBkPSJNMjEzLjA3NTc4MiAyNDUuMDMzODkxSDEzOC4zMDUxNjRjLTE5LjM2MjkwOSAwLTM3Ljc5NDkwOSA4LjEzNjE0NS01MC45MjA3MjggMjIuMzQxODE4YTY4LjgzMTQxOCA2OC44MzE0MTggMCAwIDAtMTguMTUyNzI3IDUyLjU1OTEyN2M5Ljg2NzYzNiAxMTkuMjEyMjE4IDcxLjUxMjQzNiAxMzYuODI1MDE4IDE1Mi4xMTA1NDYgMTkxLjEzNDI1NSAxMC45ODQ3MjcgNy40NDcyNzMgMTkuNzcyNTA5IDE3LjQ4MjQ3MyAzMC4wNjgzNjMgMjUuNiA0LjIwNzcwOSA4LjAwNTgxOCAxMC43MDU0NTUgMTUuNTgzNDE4IDE1LjQ1MzA5MSAyMy4xNjEwMThoMzMuODQ3ODU1VjIzOS43NDYzMjdoLTg3LjUwNTQ1NXY1LjI4NzU2NGgtMC4xMzAzMjd6IG0tNzQuNzcwNjE4IDY5LjM1MjcyN2g3NC43NzA2MThzLTAuODAwNTgyIDk3LjkzMTYzNiA0LjQ2ODM2MyA5OS41NzAwMzdjLTI0LjkxMTEyNy03LjcyNjU0NS03NS4wMzEyNzMtMjguMDM4OTgyLTc5LjIzODk4MS05OS41NzAwMzd6IG03MzYuNjA5NzQ1LTc0LjY0MDI5MWgtODcuNTA1NDU0djMxOS45NTM0NTVoMzMuODY2NDcyYzQuNzI5MDE4LTcuNDQ3MjczIDExLjIyNjc2NC0xNS4xNzM4MTggMTUuNDM0NDczLTIzLjE2MTAxOCAxMC4yOTU4NTUtOC4xMzYxNDUgMTkuMTAyMjU1LTE4LjE1MjcyNyAzMC4wNjgzNjQtMjUuNiA4MC40Njc3ODItNTQuMTc4OTA5IDE0Mi4yNDI5MDktNzEuNzkxNzA5IDE1Mi4xMTA1NDUtMTkxLjEzNDI1NWE2OS4zMTU0OTEgNjkuMzE1NDkxIDAgMCAwLTY5LjA3MzQ1NC03NC45MDA5NDVoLTc0LjkwMDk0NnYtNS4xNTcyMzd6IG0tNC40NjgzNjQgMTc0LjIxMDMyOGM1LjEzODYxOC0xLjYzODQgNC40NjgzNjQtOTkuNTcwMDM2IDQuNDY4MzY0LTk5LjU3MDAzN2g3NC43NzA2MThjLTQuMzM4MDM2IDcxLjUzMTA1NS01NC40NTgxODIgOTEuODQzNDkxLTc5LjIzODk4MiA5OS41NzAwMzd6IiBmaWxsPSIjRkVENTJGIiBwLWlkPSIyMTc1MCI+PC9wYXRoPjxwYXRoIGQ9Ik0xNjMuNzc0ODM2IDcxOS4xMjcyNzNINzEuOTMxMzQ1YTEyLjA4MzIgMTIuMDgzMiAwIDAgMS0xMi4wNDU5NjMtMTIuMDY0NTgyYzAtNi42MjgwNzMgNS4zOTkyNzMtMTIuMDQ1OTY0IDEyLjA0NTk2My0xMi4wNDU5NjRoOTEuODQzNDkxYzYuNjI4MDczIDAgMTIuMDQ1OTY0IDUuNDE3ODkxIDEyLjA0NTk2NCAxMi4wNDU5NjRhMTIuMDgzMiAxMi4wODMyIDAgMCAxLTEyLjA0NTk2NCAxMi4wNjQ1ODJ6IiBmaWxsPSIjRjVDRjQxIiBwLWlkPSIyMTc1MSI+PC9wYXRoPjxwYXRoIGQ9Ik0xMDUuNjY3NDkxIDc1Mi44NjM0MTh2LTkxLjg0MzQ5MWMwLTYuNjQ2NjkxIDUuMzk5MjczLTEyLjA2NDU4MiAxMi4wNDU5NjQtMTIuMDY0NTgyIDYuNjQ2NjkxIDAgMTIuMDY0NTgyIDUuNDE3ODkxIDEyLjA2NDU4MSAxMi4wNjQ1ODJ2OTEuODQzNDkxYTEyLjA4MzIgMTIuMDgzMiAwIDAgMS0xMi4wNjQ1ODEgMTIuMDQ1OTY0IDExLjkxNTYzNiAxMS45MTU2MzYgMCAwIDEtMTIuMDQ1OTY0LTEyLjA0NTk2NHoiIGZpbGw9IiNGNUNGNDEiIHAtaWQ9IjIxNzUyIj48L3BhdGg+PHBhdGggZD0iTTAuMDA5MzA5IDE4MS41MDg2NTVhMzIuMjQ2NjkxIDMyLjI0NjY5MSAwIDEgMCA2NC40NzQ3NjQgMCAzMi4yNDY2OTEgMzIuMjQ2NjkxIDAgMCAwLTY0LjQ3NDc2NCAweiIgZmlsbD0iI0ZGNjgzNSIgcC1pZD0iMjE3NTMiPjwvcGF0aD48cGF0aCBkPSJNMTA3NC40MjczNDUgNzEuMTIxNDU1SDk4MS4zNzM2NzNhMTIuMzYyNDczIDEyLjM2MjQ3MyAwIDAgMS0xMi4zMjUyMzctMTIuMzI1MjM3YzAtNi43NzcwMTggNS41NDgyMTgtMTIuMzQzODU1IDEyLjMyNTIzNy0xMi4zNDM4NTRoOTMuMDUzNjcyYzYuNzc3MDE4IDAgMTIuMzI1MjM2IDUuNTY2ODM2IDEyLjMyNTIzNyAxMi4zNDM4NTRhMTIuMzYyNDczIDEyLjM2MjQ3MyAwIDAgMS0xMi4zMjUyMzcgMTIuMzI1MjM3eiIgZmlsbD0iI0Y1Q0Y0MSIgcC1pZD0iMjE3NTQiPjwvcGF0aD48cGF0aCBkPSJNMTAxNS42MzExMjcgMTA1LjI0ODU4MlYxMi4zNDM4NTVjMC02Ljc5NTYzNiA1LjU2NjgzNi0xMi4zNDM4NTUgMTIuMzQzODU1LTEyLjM0Mzg1NSA2Ljc3NzAxOCAwIDEyLjMyNTIzNiA1LjU0ODIxOCAxMi4zMjUyMzYgMTIuMzI1MjM2VjEwNS4zNzg5MDlhMTIuMzYyNDczIDEyLjM2MjQ3MyAwIDAgMS0xMi4zMjUyMzYgMTIuMzI1MjM2IDEyLjU4NTg5MSAxMi41ODU4OTEgMCAwIDEtMTIuMzI1MjM3LTEyLjQ1NTU2M3oiIGZpbGw9IiNGNUNGNDEiIHAtaWQ9IjIxNzU1Ij48L3BhdGg+PHBhdGggZD0iTTEwNjAuNzQyOTgyIDE0MC43NTM0NTVhMjguMTY5MzA5IDI4LjE2OTMwOSAwIDEgMCA1Ni4zNTcyMzYgMCAyOC4xNjkzMDkgMjguMTY5MzA5IDAgMCAwLTU2LjM1NzIzNiAweiIgZmlsbD0iI0ZGNjgzNSIgcC1pZD0iMjE3NTYiPjwvcGF0aD48L3N2Zz4=',
					title: '竞赛奖项',
					desc: '管理比赛经历，补充国家级/省级奖项',
					count: 0,
					iconClass: 'gold'
				},
					{
					type: 'certificates',
					iconSrc: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTU5NzQ5MTI0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU3MTMyIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTY3Ny4yODc3MjQgODc0LjM1NDc1OWMzNy4wMDUyNDEgMjAuODMzMTAzIDczLjcyOCAzMS4zMjAyNzYgMTEwLjEzMjk2NiAzMS4zMjAyNzUgMzYuNDA0OTY2IDAgNzMuMTI3NzI0LTEwLjUyMjQ4MyAxMTAuMTMyOTY1LTMxLjMyMDI3NXYxNDUuNzI1NzkzbC0xMDAuMDY5NTE3LTUyLjg1OTU4NmExOC41NzMyNDEgMTguNTczMjQxIDAgMCAwLTE3LjA1NDg5Ny0wLjE0MTI0MmwtMTAzLjI4Mjc1OCA1Mi44NTk1ODZ2LTE0NS41ODQ1NTFoMC4xNDEyNDF6TTgxOC4wMzQ3NTkgMGMyOC4xNDIzNDUgMCA1MC45ODgxMzggMjIuODQ1NzkzIDUwLjk4ODEzOCA1MC45ODgxMzh2MzU3LjA1ODIwN2gtMTUyLjk5OTcyNWEyMDQuMDIzMTcyIDIwNC4wMjMxNzIgMCAwIDAtMjAzLjc0MDY4OSAxOTMuNzgzMTcybC0wLjI4MjQ4MyAxMC4yNHYzNTYuOTg3NTg2SDEwMy45NTM2NTVBNTAuOTg4MTM4IDUwLjk4ODEzOCAwIDAgMSA1Mi45NjU1MTcgOTE4LjA2ODk2NlY1MC45ODgxMzhDNTIuOTY1NTE3IDIyLjg0NTc5MyA3NS44MTEzMSAwIDEwMy45NTM2NTUgMGg3MTQuMDgxMTA0ek03ODcuNDIwNjkgNTEwLjAyMjYyMWMxMDEuNDgxOTMxIDAgMTgzLjYxMzc5MyA4MS40NjA5NjYgMTgzLjYxMzc5MyAxODIuMjAxMzc5IDAgMTAwLjY2OTc5My04Mi4xMzE4NjIgMTgyLjEzMDc1OS0xODMuNjEzNzkzIDE4Mi4xMzA3NTlzLTE4My42MTM3OTMtODEuNDYwOTY2LTE4My42MTM3OTMtMTgyLjEzMDc1OWMwLTEwMC43NDA0MTQgODIuMTMxODYyLTE4Mi4yMDEzNzkgMTgzLjYxMzc5My0xODIuMjAxMzc5eiBtMCA3Mi44MDk5MzFsLTM4LjkxMiA1Ni4xNzg3NTgtNjUuNzgzMTczIDE5LjQyMDY5IDQxLjk0ODY5IDU0LjAyNDgyOC0xLjgzNjEzOCA2OC4xNDg5NjUgNjQuNTgyNjIxLTIyLjczOTg2MiA2NC43NTkxNzIgMjIuNzM5ODYyLTEuODM2MTM4LTY4LjE0ODk2NSA0Mi4wMTkzMS01NC4wMjQ4MjgtNjYuMDMwMzQ0LTE5LjQyMDY5LTM4LjkxMi01Ni4xNzg3NTh6IG0tMzUxLjkzODIwNy0yMjUuODA5NjU1SDIzMS40OTQ2MjFhMjUuNDk0MDY5IDI1LjQ5NDA2OSAwIDAgMC0yNS4xMDU2NTUgMjAuOTAzNzI0bC0wLjQyMzcyNSA0LjU5MDM0NXYyNS41MjkzNzljMCAxMi4yODggOC44Mjc1ODYgMjIuODQ1NzkzIDIwLjkzOTAzNSAyNS4wNzAzNDVsNC41OTAzNDUgMC40MjM3MjRoMjAzLjk4Nzg2MmMxMi4zNTg2MjEgMCAyMi44ODExMDMtOC44Mjc1ODYgMjUuMTA1NjU1LTIwLjkwMzcyNGwwLjQyMzcyNC00LjU5MDM0NXYtMjUuNTI5Mzc5YTI1LjQ5NDA2OSAyNS40OTQwNjkgMCAwIDAtMjUuNTI5Mzc5LTI1LjQ5NDA2OXogbTE1My4wMzUwMzQtMjA0LjAyMzE3M0gyMzEuNDk0NjIxYTI1LjQ5NDA2OSAyNS40OTQwNjkgMCAwIDAtMjUuMTA1NjU1IDIwLjkzOTAzNWwtMC40MjM3MjUgNC41OTAzNDR2MjUuNDk0MDY5YzAgMTIuMzIzMzEgOC44Mjc1ODYgMjIuODgxMTAzIDIwLjkzOTAzNSAyNS4wNzAzNDVsNC41OTAzNDUgMC40MjM3MjRoMzU2Ljk4NzU4NmMxMi4zNTg2MjEgMCAyMi45MTY0MTQtOC44Mjc1ODYgMjUuMTA1NjU1LTIwLjkwMzcyNGwwLjQyMzcyNC00LjU5MDM0NXYtMjUuNDk0MDY5YTI1LjQ5NDA2OSAyNS40OTQwNjkgMCAwIDAtMjUuNDk0MDY5LTI1LjUyOTM3OXoiIGZpbGw9IiNGN0I1MDAiIHAtaWQ9IjU3MTMzIj48L3BhdGg+PC9zdmc+',
					title: '证书资质',
					desc: '管理四六级、技能证书等',
					count: 0,
					iconClass: 'blue'
				},
					{
					type: 'projects',
					iconSrc: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTU4MzE3NjQ5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDExMjYgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM0ODA3IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTkwNC42NDM3NTQgOTUxLjYwMzkyNEgyMjcuMzc2OTI2YTM2LjQwMjgzNiAzNi40MDI4MzYgMCAwIDAgMCA3Mi4zOTYwNzZoNjc3LjQyMDQyNmEzNi40MDI4MzYgMzYuNDAyODM2IDAgMCAwIDAtNzIuMzk2MDc2ek0xMDYxLjc3NDk4MiAwLjAxMDI0SDY0LjQ2MDE1NUE2My4zODQ5NjYgNjMuMzg0OTY2IDAgMCAwIDAgNjIuMjE3NjE4djY5OS45OTk0YTYzLjM4NDk2NiA2My4zODQ5NjYgMCAwIDAgNjQuNDYwMTU1IDYyLjIwNzM3OGg5OTcuNDY4NDI2QTYzLjM4NDk2NiA2My4zODQ5NjYgMCAwIDAgMTEyNi4zODg3MzYgNzYyLjIxNzAxOFY2Mi4yMTc2MThBNjMuNDg3MzY1IDYzLjQ4NzM2NSAwIDAgMCAxMDYxLjc3NDk4MiAwLjAxMDI0eiBtLTkwLjk4MTQ5IDI3NS44NjI4NDFsLTI3OC40NzQwMTUgMjM0LjQ5MzY1NWE3NC43MDAwNTMgNzQuNzAwMDUzIDAgMCAxLTgyLjg0MDc3MiA4LjU1MDMxNWwtMTgxLjg2MDU4MS05Ny4yNzkwMjdhMTEuNjIyMjg0IDExLjYyMjI4NCAwIDAgMC0xMy43NzI2NjIgMi4wNDc5NzlsLTE3Ni4zODIyMzcgMTc5LjYwNzgwNGE0NS4wMDQzNSA0NS4wMDQzNSAwIDAgMS0zMS44OTcyODEgMTMuMTU4MjY4IDQzLjk4MDM2IDQzLjk4MDM2IDAgMCAxLTMwLjcxOTY5Mi0xMS45Mjk0OCA0MS41NzM5ODQgNDEuNTczOTg0IDAgMCAxLTEuMjc5OTg4LTYwLjIxMDU5OGwxOTAuODIwNDkyLTE5NC41NTgwNTVhNzQuMzkyODU2IDc0LjM5Mjg1NiAwIDAgMSA4Ny40OTk5MjUtMTIuNzQ4NjcybDE4My4zOTY1NjYgOTguNDA1NDE2YTExLjU3MTA4NCAxMS41NzEwODQgMCAwIDAgMTMuMDU1ODctMS4zMzExODdsMjY0LjEzODE1OC0yMjIuMzA4MTc3YTQ1LjEwNjc0OSA0NS4xMDY3NDkgMCAwIDEgNjIuMjA3Mzc4IDQuMDQ0NzYgNDEuNzI3NTgzIDQxLjcyNzU4MyAwIDAgMSAxMC44MDMwOTIgMzAuNzE5NjkzIDQwLjk1OTU5IDQwLjk1OTU5IDAgMCAxLTE0LjY5NDI1MyAyOS4zMzczMDZ6IiBmaWxsPSIjMThiYzM3IiBwLWlkPSIzNDgwOCI+PC9wYXRoPjwvc3ZnPg==',
					title: '项目经历',
					desc: '管理课程项目、个人项目、开源项目',
					count: 0,
					iconClass: 'cyan'
				},
					{
					type: 'internships',
					iconSrc: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTU5MDY4NDI1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQxNjQ1IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxOS42OCA1LjEyYzIuNTYgMi41NiA1LjYzMiA0LjYwOCA4LjE5MiA2LjY1Nmw0OTEuNTIgMzA3LjJjMi41NiAxLjUzNiA1LjYzMiAzLjU4NCA5LjIxNiA2LjE0NC0zLjA3MiAyLjU2LTUuNjMyIDQuMDk2LTguNzA0IDYuMTQ0LTE2NC4zNTIgMTAyLjkxMi0zMjguNzA0IDIwNS4zMTItNDkzLjA1NiAzMDguMjI0LTYuNjU2IDQuMDk2LTExLjI2NCA0LjYwOC0xOC40MzIgMEM0MjguMDMyIDU4OC44IDM0Ny4xMzYgNTM4LjExMiAyNjYuMjQgNDg3LjkzNmMtMi41Ni0xLjUzNi01LjYzMi0zLjU4NC05LjcyOC02LjY1NmwyNDkuODU2LTE1Ni4xNmMtMjEuNTA0LTEzLjMxMi00MS40NzItMjYuMTEyLTYxLjQ0LTM3Ljg4OC0yLjA0OC0xLjUzNi03LjE2OCAxLjAyNC0xMC4yNCAyLjU2QzM1Ny4zNzYgMzM3LjkyIDI4MC4wNjQgMzg2LjA0OCAyMDMuMjY0IDQzNC42ODhjLTguNzA0IDUuNjMyLTE0LjMzNiA1LjEyLTIyLjUyOCAwQzEyNS40NCAzOTkuMzYgNjkuNjMyIDM2NS4wNTYgMTQuMzM2IDMzMC4yNGMtMi4wNDgtMS41MzYtNC42MDgtMy4wNzItNy42OC01LjEyIDQuMDk2LTIuNTYgNy42OC01LjEyIDEwLjc1Mi03LjE2OEMxODAuNzM2IDIxNi4wNjQgMzQzLjU1MiAxMTQuMTc2IDUwNi4zNjggMTIuMjg4YzMuMDcyLTIuMDQ4IDYuMTQ0LTQuNjA4IDkuMjE2LTcuMTY4aDQuMDk2ek0xMC43NTIgOTA4LjhjMS4wMjQtMi4wNDggMS41MzYtNC4wOTYgMi4wNDgtNi4xNDQgNy42OC0zMS43NDQgMjYuNjI0LTU0Ljc4NCA1Ni44MzItNjcuNTg0IDcuMTY4LTMuMDcyIDkuMjE2LTYuNjU2IDkuMjE2LTEzLjgyNC0wLjUxMi0xMjMuMzkyLTAuNTEyLTI0Ny4yOTYgMC0zNzAuNjg4di0xNy40MDhjMTAuMjQgNi4xNDQgMTguOTQ0IDExLjc3NiAyNy42NDggMTcuNDA4IDkuNzI4IDYuMTQ0IDIzLjA0IDEwLjc1MiAyOC4xNiAxOS40NTYgNS4xMiA5LjIxNiAxLjUzNiAyMi41MjggMS41MzYgMzQuMzA0djMxNS45MDRjMCA4LjE5MiAyLjA0OCAxMi44IDEwLjI0IDE2LjM4NCAzNy44ODggMTYuODk2IDYwLjQxNiA1Ni44MzIgNTUuODA4IDk2LjI1Ni01LjYzMiA0My4wMDgtMzUuMzI4IDc1Ljc3Ni03Ni44IDgzLjk2OC0yLjA0OCAwLjUxMi00LjYwOCAxLjAyNC02LjY1NiAyLjA0OGgtMjQuMDY0Yy0yLjA0OC0wLjUxMi00LjA5Ni0xLjUzNi02LjY1Ni0yLjA0OC0zOS45MzYtOS4yMTYtNjQuNTEyLTMzLjc5Mi03NS4yNjQtNzMuNzI4LTAuNTEyLTMuMDcyLTEuNTM2LTUuNjMyLTIuNTYtOC43MDQgMC41MTIgMC41MTIgMC41MTItMjUuNiAwLjUxMi0yNS42eiIgZmlsbD0iIzBFNTZGRiIgcC1pZD0iNDE2NDYiPjwvcGF0aD48cGF0aCBkPSJNMjI1LjI4IDUxNi4wOTZjMjYuMTEyIDE1Ljg3MiA1MS4yIDMxLjIzMiA3Ni4yODggNDYuMDggNjguMDk2IDQxLjQ3MiAxMzYuMTkyIDgzLjQ1NiAyMDQuMjg4IDEyNC45MjggNS42MzIgMy41ODQgOS4yMTYgMi4wNDggMTQuMzM2LTEuMDI0bDI1Ni41MTItMTY0LjM1MmMzLjA3Mi0yLjA0OCA1LjYzMi0zLjU4NCA5LjcyOC02LjE0NCAwIDMuNTg0IDAuNTEyIDYuMTQ0IDAuNTEyIDguNzA0djE0My4zNmMwIDEyLjgtNC42MDggMjMuNTUyLTExLjI2NCAzMy43OTItMTkuNDU2IDMxLjc0NC00Ni4wOCA1NS44MDgtNzYuMjg4IDc2LjgtNjAuNDE2IDQxLjQ3Mi0xMjYuOTc2IDY0LjUxMi0yMDAuNzA0IDYwLjQxNi05NS43NDQtNS4xMi0xNzguMTc2LTQxLjQ3Mi0yNDQuNzM2LTExMS4xMDQtNy42OC04LjE5Mi0xNC4zMzYtMTYuODk2LTE5LjQ1Ni0yNy4xMzZzLTkuMjE2LTIxLjUwNC05LjcyOC0zMi4yNTZjLTEuMDI0LTQ4LjY0LTAuNTEyLTk3Ljc5Mi0wLjUxMi0xNDYuOTQ0IDAuNTEyLTEuMDI0IDEuMDI0LTIuNTYgMS4wMjQtNS4xMnoiIGZpbGw9IiMwRTU2RkYiIHAtaWQ9IjQxNjQ3Ij48L3BhdGg+PC9zdmc+',
					title: '实习经历',
					desc: '管理实习、实训、兼职工作经历',
					count: 0,
					iconClass: 'violet'
				}
				]
			}
		},
		methods: {
			applyLocalCounts() {
				// 本地汇总作为兜底，避免接口异常时计数全部为空。
				const summary = getArchiveSummary()
				const countMap = {
					awards: summary.awardsCount,
					certificates: summary.certificatesCount,
					projects: summary.projectsCount,
					internships: summary.internshipsCount
				}
				this.entries = this.entries.map(item => ({
					...item,
					count: countMap[item.type] || 0
				}))
			},
			fetchEntryCounts() {
				// 四类档案分开请求，全部返回后再一次性更新卡片数量。
				const user = getUser()
				const studentId = user && user.studentId ? user.studentId : null
				if (!studentId || !getApiBase()) {
					this.applyLocalCounts()
					return
				}
				const paths = [
					{ type: 'awards', path: '/api/student/profile/competition/list' },
					{ type: 'certificates', path: '/api/student/profile/certificate/list' },
					{ type: 'projects', path: '/api/student/profile/project/list' },
					{ type: 'internships', path: '/api/student/profile/internship/list' }
				]
				const countMap = {}
				let done = 0
				paths.forEach(({ type, path }) => {
					uni.request({
						url: `${BASE_URL}${path}`,
						method: 'GET',
						data: { studentId },
						success: (res) => {
							if (res.statusCode === 200 && res.data && Array.isArray(res.data.data)) {
								countMap[type] = res.data.data.length
							}
						},
						complete: () => {
							done++
							if (done === paths.length) {
								this.entries = this.entries.map(item => ({
									...item,
									count: countMap[item.type] !== undefined ? countMap[item.type] : item.count
								}))
							}
						}
					})
				})
			},
			openEntry(item) {
				// 根据档案类型跳转到对应管理页。
				uni.navigateTo({
					url: `/subPages/archive/manage?type=${item.type}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.section-card {
		padding: 28rpx;
		border-radius: 30rpx;
		background: #ffffff;
		box-shadow: 0 12rpx 34rpx rgba(67, 76, 210, 0.06);
	}

	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		gap: 20rpx;
	}

	.section-title {
		font-size: 40rpx;
		font-weight: 800;
		color: #1f2937;
	}

	.section-link {
		font-size: 26rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.entry-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 18rpx;
	}

	.entry-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 24rpx;
		border-radius: 24rpx;
		background: linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%);
		border: 2rpx solid rgba(49, 101, 215, 0.1);
		box-shadow:
			0 10rpx 28rpx rgba(49, 101, 215, 0.12),
			0 4rpx 14rpx rgba(15, 23, 42, 0.06),
			0 1rpx 0 rgba(255, 255, 255, 0.85) inset;
	}

	.entry-icon {
		width: 72rpx;
		height: 72rpx;
		border-radius: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
	}

	.entry-icon.cyan {
		background: #eaf8ff;
	}

	.entry-icon.violet {
		background: #f2ecff;
	}

	.entry-title {
		display: block;
		margin-top: 18rpx;
		font-size: 30rpx;
		font-weight: 800;
		color: #24345b;
	}

	.entry-desc {
		display: block;
		margin-top: 10rpx;
		font-size: 22rpx;
		line-height: 1.5;
		color: #7f8ba3;
		min-height: 66rpx;
	}

	.entry-count-badge {
		margin-top: 16rpx;
		padding: 10rpx 20rpx;
		border-radius: 14rpx;
		border: 2rpx solid rgba(49, 101, 215, 0.35);
		box-shadow:
			0 6rpx 14rpx rgba(49, 101, 215, 0.12),
			0 2rpx 6rpx rgba(15, 23, 42, 0.08);
	}

	.entry-count {
		display: block;
		font-size: 22rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.section-card.theme-dark {
		background: #1d1f24;
		box-shadow: 0 12rpx 34rpx rgba(0, 0, 0, 0.2);
	}

	.section-card.theme-dark .section-title,
	.section-card.theme-dark .entry-title {
		color: #f4f7fb;
	}

	.section-card.theme-dark .entry-item {
		background: #23252b;
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow:
			0 10rpx 32rpx rgba(0, 0, 0, 0.45),
			0 4rpx 14rpx rgba(0, 0, 0, 0.25),
			0 1rpx 0 rgba(255, 255, 255, 0.06) inset;
	}

	.section-card.theme-dark .entry-desc,
	.section-card.theme-dark .entry-count {
		color: rgba(255, 255, 255, 0.58);
	}

	.section-card.theme-dark .entry-count-badge {
		border-color: rgba(148, 176, 255, 0.45);
		box-shadow:
			0 6rpx 16rpx rgba(0, 0, 0, 0.35),
			0 2rpx 6rpx rgba(0, 0, 0, 0.25);
	}
</style>
