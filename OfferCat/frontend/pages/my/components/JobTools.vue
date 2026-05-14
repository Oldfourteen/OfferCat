<template>
	<view class="job-tools" :class="themeClass" :key="animationKey">
		<view class="section-head animate-float-up">
			<view>
				<!-- 标题区概括该模块用于展示当前求职档案与行动入口。 -->
				<text class="section-title">我的档案</text>
			</view>
			<text class="section-link" @click="navigateToGrowth">查看更多</text>
		</view>

		<view class="hero-banner animate-float-up" :style="{ animationDelay: '0.04s' }">
			<!-- 顶部横幅突出今日主推任务和进入行动流的快捷按钮。 -->
			<view class="banner-copy">
				<text class="banner-title">Offer 冲刺计划</text>
				<text class="banner-desc">继续保持简历优化和AI模拟面试，优先推进一面机会。</text>
				<view class="banner-btn animate-float-up" :style="{ animationDelay: '0.1s' }" @click="startDailyTask">开始今日任务</view>
			</view>

			<view class="banner-art animate-float-up" :style="{ animationDelay: '0.1s' }">
				<image :src="bannerImageSrc" mode="aspectFit" style="width: 100%; height: 100%; border-radius: 18rpx;"></image>
			</view>
		</view>

		<view class="check-in-container animate-float-up" :style="{ animationDelay: '0.12s' }">
			<!-- 打卡区展示当周状态、累计天数和今日签到按钮。 -->
			<view class="check-in-header">
				<view class="check-in-title">
					<text>每日打卡</text>
					<text class="check-in-date">{{ currentDate }}</text>
				</view>
				<view class="check-in-stats">已累计打卡 {{ totalCheckIns }} 天</view>
			</view>
			
			<view class="check-in-week">
				<view 
					v-for="(day, index) in weekDays" 
					:key="index" 
					class="check-in-day animate-float-up"
					:class="{ 'checked': day.checked, 'today': day.isToday }"
					:style="{ animationDelay: (0.14 + index * 0.02) + 's' }"
				>
					<text class="day-name">{{ day.name }}</text>
					<view class="day-status">
						<text v-if="(day.isPast || day.isToday) && day.checked" class="status-check">✓</text>
						<text v-else-if="day.isPast || day.isToday" class="status-cross">✗</text>
					</view>
				</view>
			</view>
			
			<view class="check-in-footer">
				<text class="check-in-tip">坚持每日打卡，提升求职竞争力</text>
				<view 
					class="check-in-button" 
					:class="{ 'checked': todayChecked }"
					@click="checkIn"
				>
					<text v-if="todayChecked" class="button-text">今日已打卡</text>
					<text v-else class="button-icon">✓</text>
				</view>
			</view>
		</view>
		
		<view class="tool-grid">
			<!-- 四类档案卡片展示数量并承接对应详情页跳转。 -->
			<view v-for="(item, index) in tools" :key="item.name" class="tool-item animate-float-up" :class="{
				'resume-item': item.name === '我的简历',
				'interview-item': item.name === '面试记录',
				'certificate-item': item.name === '证书资质',
				'competition-item': item.name === '竞赛奖项'
			}" :style="{ animationDelay: (0.16 + index * 0.01) + 's' }" @click="handleToolClick(item)">
				<view class="tool-icon" :class="item.uiClass">
					<image v-if="item.icon.startsWith('data:image')" :src="item.icon" class="tool-icon-img" mode="aspectFit" />
					<text v-else>{{ item.icon }}</text>
				</view>
				<text class="tool-name">{{ item.name }}</text>
				<text class="tool-meta">{{ dynamicValues[index] }}{{ item.unit }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getDashboardMetrics, ARCHIVE_DATA_UPDATED_EVENT, saveGrowthStats } from '@/utils/archiveData.js'
	import { QUESTION_HISTORY_UPDATED_EVENT } from '@/utils/questionHistory.js'
	import { QUESTION_FAVORITES_UPDATED_EVENT } from '@/utils/questionFavorites.js'
	import { getCheckInKey } from '@/utils/user.js'
	import { getGrowthRecordStats, checkIn, getWeeklyCheckinStatus } from '@/api/growth.js'

	export default {
		name: "JobTools",
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
				// tools 定义四类档案卡片的文案、图标与展示单位。
				tools: [
				{ name: '我的简历', value: '3', unit: '份', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTYzMjIyNjEzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQxMzk0IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTY5OC4xODE4MTggMTAwMC43MjcyNzNIMTM5LjYzNjM2NGMtNzkuMTI3MjczIDAtMTM5LjYzNjM2NC02MC41MDkwOTEtMTM5LjYzNjM2NC0xMzkuNjM2MzY0VjEzOS42MzYzNjRjMC03OS4xMjcyNzMgNjAuNTA5MDkxLTEzOS42MzYzNjQgMTM5LjYzNjM2NC0xMzkuNjM2MzY0aDcxMi4xNDU0NTRjNzkuMTI3MjczIDAgMTM5LjYzNjM2NCA2MC41MDkwOTEgMTM5LjYzNjM2NCAxMzkuNjM2MzY0djU5NS43ODE4MThMNjk4LjE4MTgxOCAxMDAwLjcyNzI3M3pNMTM5LjYzNjM2NCA5My4wOTA5MDljLTI3LjkyNzI3MyAwLTQ2LjU0NTQ1NSAxOC42MTgxODItNDYuNTQ1NDU1IDQ2LjU0NTQ1NXY3MjEuNDU0NTQ1YzAgMjcuOTI3MjczIDE4LjYxODE4MiA0Ni41NDU0NTUgNDYuNTQ1NDU1IDQ2LjU0NTQ1NWg1MjEuMzA5MDkxbDIzNy4zODE4MTgtMjE0LjEwOTA5MVYxMzkuNjM2MzY0YzAtMjcuOTI3MjczLTE4LjYxODE4Mi00Ni41NDU0NTUtNDYuNTQ1NDU1LTQ2LjU0NTQ1NUgxMzkuNjM2MzY0eiIgZmlsbD0iIzRDQURGRiIgcC1pZD0iNDEzOTUiPjwvcGF0aD48cGF0aCBkPSJNNzM1LjQxODE4MiA5MDcuNjM2MzY0aC02OS44MTgxODJ2LTE4MS41MjcyNzNjMC00Ni41NDU0NTUgMzcuMjM2MzY0LTgzLjc4MTgxOCA4My43ODE4MTgtODMuNzgxODE4aDE1My42djY5LjgxODE4Mkg3NDQuNzI3MjczYy00LjY1NDU0NSAwLTkuMzA5MDkxIDQuNjU0NTQ1LTkuMzA5MDkxIDkuMzA5MDl2MTg2LjE4MTgxOXpNNDUxLjQ5MDkwOSA3MzUuNDE4MTgySDI3OS4yNzI3MjdjLTE4LjYxODE4MiAwLTM3LjIzNjM2NC0xMy45NjM2MzYtMzcuMjM2MzYzLTM3LjIzNjM2NHMxMy45NjM2MzYtMzcuMjM2MzY0IDM3LjIzNjM2My0zNy4yMzYzNjNoMTcyLjIxODE4MmMxOC42MTgxODIgMCAzNy4yMzYzNjQgMTMuOTYzNjM2IDM3LjIzNjM2NCAzNy4yMzYzNjNzLTEzLjk2MzYzNiAzNy4yMzYzNjQtMzcuMjM2MzY0IDM3LjIzNjM2NHpNNzMwLjc2MzYzNiA1MzkuOTI3MjczSDI3OS4yNzI3MjdjLTE4LjYxODE4MiAwLTM3LjIzNjM2NC0xMy45NjM2MzYtMzcuMjM2MzYzLTM3LjIzNjM2NHMxOC42MTgxODItMzIuNTgxODE4IDM3LjIzNjM2My0zMi41ODE4MThoNDUxLjQ5MDkwOWMxOC42MTgxODIgMCAzNy4yMzYzNjQgMTMuOTYzNjM2IDM3LjIzNjM2NCAzNy4yMzYzNjRzLTEzLjk2MzYzNiAzMi41ODE4MTgtMzcuMjM2MzY0IDMyLjU4MTgxOHpNNzMwLjc2MzYzNiAzNDQuNDM2MzY0SDI3OS4yNzI3MjdjLTE4LjYxODE4MiAwLTM3LjIzNjM2NC0xMy45NjM2MzYtMzcuMjM2MzYzLTM3LjIzNjM2NHMxOC42MTgxODItMzIuNTgxODE4IDM3LjIzNjM2My0zMi41ODE4MThoNDUxLjQ5MDkwOWMxOC42MTgxODIgMCAzNy4yMzYzNjQgMTMuOTYzNjM2IDM3LjIzNjM2NCAzNy4yMzYzNjNzLTEzLjk2MzYzNiAzMi41ODE4MTgtMzcuMjM2MzY0IDMyLjU4MTgxOXoiIGZpbGw9IiM0Q0FERkYiIHAtaWQ9IjQxMzk2Ij48L3BhdGg+PC9zdmc+', uiClass: 'ui-1' },
				{ name: '面试记录', value: '0', unit: '场', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTYzNTE1Njc3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYyNDQ5IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTgyOC41NTMyMDMgMjE2LjIxMjkxNUw1NTEuOTU5NDI1IDYxMi42MjQ3MzJsMi41NTE2MzQgMTE2LjYyODkxNSAxMTIuODAwNjI3LTMxLjg2NjE0NCAyNzcuMjMxMjY4LTM5Ni40MTAxNDQtMTE1Ljk4OTc1MS04NC43NjQ0NDR6IG0zMy4xNDQ0Ny00Ny4xNjI1NjJsNDUuODg5MjU1LTY2LjI4MDU3NSAxMTQuNzE0NzcxIDg1LjQwMTkzNC00NS4yNTAwOTEgNjYuMjgwNTc2LTExNS4zNTM5MzUtODUuNDAxOTM1eiBtMCAwIiBmaWxsPSIjZjg3MTI5IiBwLWlkPSI2MjQ1MCI+PC9wYXRoPjxwYXRoIGQ9Ik02OTguNTQwMzQgNzIyLjg3NTM5OWwtMTc3LjgwOTU2OSA1MC4zNTAwMTMtNS4wOTk5MjEtMTc5LjA4NjIyMiAzMzEuNDAyODc1LTQ2OS43MDE0MzhDODM0LjkyODEwNSA4Mi4zNzg0NTggNzk2LjY4MzcxMiA1NC4zMzM5MDggNzUzLjM0OTQzOCA1My42OTY0MThIMTAzLjkyNTk2MWMtNTQuMTcxNjA4IDAtOTcuNTA3NTU2IDQzLjk3NTExMS05Ny41MDc1NTYgOTcuNTA5MjI5Vjg2My4wODgxMDVjMCA1NC4xNzE2MDggNDMuOTc1MTExIDk3LjUwNzU1NiA5Ny41MDc1NTYgOTcuNTA3NTU1aDY0OC43ODc2NmM1NC4xNzE2MDggMCA5Ny41MDc1NTYtNDMuOTczNDM4IDk3LjUwNzU1NS05Ny41MDc1NTVWNTA3LjQ2ODk2N2wtMTUxLjY4MDgzNiAyMTUuNDA2NDMyek0xNTYuMTkwMTE4IDIyNS4xMzc3NzhINTQ5LjQxMjgxYzI1LjQ4OTU2OSAwIDQ1Ljg4MjU2MiAyMS4wMjcxMzcgNDUuODgyNTYzIDQ1Ljg3OTIxNSAwIDI0Ljg2MDQ0NC0yMS4wMzA0ODQgNDUuODg5MjU1LTQ1Ljg4MjU2MyA0NS44ODkyNTVIMTU2LjE5MDExOGMtMjUuNDk2MjYxIDAtNDUuODg3NTgyLTIxLjAyNzEzNy00NS44ODc1ODItNDUuODg5MjU1IDAtMjQuODUyMDc4IDIwLjM4OTY0Ny00NS44NzkyMTYgNDUuODg3NTgyLTQ1Ljg3OTIxNXogbTIwNi40ODMyNDEgNTUxLjkxMDkwMkgxNTYuMTkwMTE4YTQ1LjY5MzQ5IDQ1LjY5MzQ5IDAgMCAxLTQ1Ljg4NzU4Mi00NS44ODQyMzYgNDUuNjk1MTYzIDQ1LjY5NTE2MyAwIDAgMSA0NS44ODc1ODItNDUuODg3NTgxaDIwNi40ODQ5MTVjMjUuNDk5NjA4IDAgNDUuODg5MjU1IDIwLjM5Mjk5MyA0NS44ODkyNTUgNDUuODg3NTgxIDAuNjM3NDkgMjUuNDkyOTE1LTE5Ljc1MzgzIDQ1Ljg4NDIzNS00NS44OTA5MjkgNDUuODg0MjM2eiBtODIuMjE5NTA0LTIyOS40Mjc4N0gxNTYuMTkwMTE4Yy0yNS40OTYyNjEgMC00NS44ODc1ODItMjEuMDM4ODUtNDUuODg3NTgyLTQ1Ljg5MDkyOCAwLTI1LjQ4Nzg5NSAyMS4wMjg4MS00NS44ODc1ODIgNDUuODg3NTgyLTQ1Ljg4NzU4MWgyODguNzAyNzQ1YzI1LjQ5MTI0MiAwIDQ1Ljg4NzU4MiAyMS4wMzA0ODQgNDUuODg3NTgxIDQ1Ljg4NzU4MS0wLjAwMTY3MyAyNC44NTIwNzgtMjAuMzk4MDEzIDQ1Ljg5MDkyOC00NS44ODc1ODEgNDUuODkwOTI4eiBtMCAwIiBmaWxsPSIjZjg3MTI5IiBwLWlkPSI2MjQ1MSI+PC9wYXRoPjwvc3ZnPg==', uiClass: 'ui-2' },
				{ name: '证书资质', value: '0', unit: '项', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTYzNjgwMjc3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYzMTI2IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg0OS4xNzA3MzIgMGM5Ny40MDQ4NzggMCAxNzQuODI5MjY4IDc3LjQyNDM5IDE3NC44MjkyNjggMTc0LjgyOTI2OHY2NzQuMzQxNDY0YzAgOTcuNDA0ODc4LTc3LjQyNDM5IDE3NC44MjkyNjgtMTc0LjgyOTI2OCAxNzQuODI5MjY4SDE3NC44MjkyNjhjLTk3LjQwNDg3OCAwLTE3NC44MjkyNjgtNzcuNDI0MzktMTc0LjgyOTI2OC0xNzQuODI5MjY4VjE3NC44MjkyNjhjMC05Ny40MDQ4NzggNzcuNDI0MzktMTc0LjgyOTI2OCAxNzQuODI5MjY4LTE3NC44MjkyNjhoNjc0LjM0MTQ2NHpNMzE0LjY5MjY4MyA1NzYuOTM2NTg1bC02Mi40MzkwMjQgMTA3LjM5NTEyMmMyOS45NzA3MzIgNy40OTI2ODMgNTkuOTQxNDYzIDE0Ljk4NTM2NiA5Mi40MDk3NTYgMjIuNDc4MDQ5bDIuNDk3NTYxIDIuNDk3NTYxYzI3LjQ3MzE3MSAyNy40NzMxNzEgNTQuOTQ2MzQxIDU3LjQ0MzkwMiA1NC45NDYzNDEgNTcuNDQzOTAzbDU3LjQ0MzkwMy05OS45MDI0NGMtNTQuOTQ2MzQxLTkuOTkwMjQ0LTExMi4zOTAyNDQtNDcuNDUzNjU5LTE0NC44NTg1MzctODkuOTEyMTk1eiBtMzg5LjYxOTUxMiAwYy0zMi40NjgyOTMgNDIuNDU4NTM3LTg0LjkxNzA3MyA3OS45MjE5NTEtMTM5Ljg2MzQxNSA5Mi40MDk3NTZsNTcuNDQzOTAzIDk5LjkwMjQzOXMzNC45NjU4NTQtMzkuOTYwOTc2IDYyLjQzOTAyNC02Ny40MzQxNDZjMzkuOTYwOTc2LTkuOTkwMjQ0IDg0LjkxNzA3My0xNy40ODI5MjcgODcuNDE0NjM0LTE3LjQ4MjkyN2wtNjcuNDM0MTQ2LTEwNy4zOTUxMjJ6TTUxMiAyMzQuNzcwNzMyYy0xMDcuMzk1MTIyIDAtMjAyLjMwMjQzOSA5Ny40MDQ4NzgtMjAyLjMwMjQzOSAyMDcuMjk3NTYxczkyLjQwOTc1NiAxOTcuMzA3MzE3IDIwMi4zMDI0MzkgMTk3LjMwNzMxNyAyMDIuMzAyNDM5LTkyLjQwOTc1NiAyMDIuMzAyNDM5LTIwMi4zMDI0MzktOTQuOTA3MzE3LTIwMi4zMDI0MzktMjAyLjMwMjQzOS0yMDIuMzAyNDM5eiBtMCA3OS45MjE5NTFjOS45OTAyNDQgMCAxNy40ODI5MjcgNC45OTUxMjIgMTkuOTgwNDg4IDEyLjQ4NzgwNWwxOS45ODA0ODggNDQuOTU2MDk3YzIuNDk3NTYxIDcuNDkyNjgzIDkuOTkwMjQ0IDEyLjQ4NzgwNSAxNy40ODI5MjYgMTIuNDg3ODA1bDQ0Ljk1NjA5OCA3LjQ5MjY4M2M0Ljk5NTEyMiAwIDkuOTkwMjQ0IDIuNDk3NTYxIDEyLjQ4NzgwNSA0Ljk5NTEyMiA3LjQ5MjY4MyA5Ljk5MDI0NCA5Ljk5MDI0NCAyMi40NzgwNDkgMCAzMi40NjgyOTNsLTM0Ljk2NTg1NCAzNy40NjM0MTRjLTQuOTk1MTIyIDQuOTk1MTIyLTcuNDkyNjgzIDEyLjQ4NzgwNS00Ljk5NTEyMiAxNy40ODI5MjdsNy40OTI2ODMgNDkuOTUxMjJjMCA0Ljk5NTEyMiAwIDkuOTkwMjQ0LTIuNDk3NTYxIDE0Ljk4NTM2Ni00Ljk5NTEyMiA5Ljk5MDI0NC0xOS45ODA0ODggMTQuOTg1MzY2LTI5Ljk3MDczMSA5Ljk5MDI0NGwtMzkuOTYwOTc2LTIyLjQ3ODA0OWMtNy40OTI2ODMtMi40OTc1NjEtMTQuOTg1MzY2LTIuNDk3NTYxLTE5Ljk4MDQ4OCAwbC0zOS45NjA5NzYgMTkuOTgwNDg4Yy00Ljk5NTEyMiAyLjQ5NzU2MS05Ljk5MDI0NCAyLjQ5NzU2MS0xNC45ODUzNjUgMi40OTc1NjEtMTIuNDg3ODA1LTIuNDk3NTYxLTE5Ljk4MDQ4OC0xMi40ODc4MDUtMTcuNDgyOTI3LTI0Ljk3NTYxbDcuNDkyNjgzLTUyLjQ0ODc4MWMwLTQuOTk1MTIyIDAtMTIuNDg3ODA1LTQuOTk1MTIyLTE3LjQ4MjkyN2wtMzQuOTY1ODU0LTM3LjQ2MzQxNGMtMi40OTc1NjEtMi40OTc1NjEtNC45OTUxMjItNy40OTI2ODMtNC45OTUxMjItMTIuNDg3ODA1LTIuNDk3NTYxLTEyLjQ4NzgwNSA3LjQ5MjY4My0yMi40NzgwNDkgMTkuOTgwNDg4LTI0Ljk3NTYxbDQ0Ljk1NjA5OC03LjQ5MjY4M2M3LjQ5MjY4MyAwIDEyLjQ4NzgwNS00Ljk5NTEyMiAxNy40ODI5MjYtMTIuNDg3ODA1bDE5Ljk4MDQ4OC00NC45NTYwOTdjMC00Ljk5NTEyMiA3LjQ5MjY4My05Ljk5MDI0NCAxNy40ODI5MjctOS45OTAyNDR6IiBmaWxsPSIjQ0E2M0U0IiBwLWlkPSI2MzEyNyI+PC9wYXRoPjwvc3ZnPg==', uiClass: 'ui-3' },
				{ name: '竞赛奖项', value: '0', unit: '项', icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzc2OTY0MzMxOTYzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijc3NjcwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMG0xMTMuNzc3Nzc4IDBsNzk2LjQ0NDQ0NCAwcTExMy43Nzc3NzggMCAxMTMuNzc3Nzc4IDExMy43Nzc3NzhsMCA3OTYuNDQ0NDQ0cTAgMTEzLjc3Nzc3OC0xMTMuNzc3Nzc4IDExMy43Nzc3NzhsLTc5Ni40NDQ0NDQgMHEtMTEzLjc3Nzc3OCAwLTExMy43Nzc3NzgtMTEzLjc3Nzc3OGwwLTc5Ni40NDQ0NDRxMC0xMTMuNzc3Nzc4IDExMy43Nzc3NzgtMTEzLjc3Nzc3OFoiIGZpbGw9IiMzRUQ1QUIiIHAtaWQ9Ijc3NjcxIj48L3BhdGg+PHBhdGggZD0iTTIzNC4yNCAxOTAuMTc5NTU2YTUzLjE2MjY2NyA1My4xNjI2NjcgMCAwIDEgMzkuNDgwODg5LTE5LjQ1NmgxNy41NTAyMjJjLTAuMTQyMjIyIDQ4LjM1NTU1NiAwIDk2LjcxMTExMSAwIDE0NS4wNjY2NjZxMjMuNjk0MjIyLTE5LjIgNDcuMzMxNTU2LTM4LjQ4NTMzMyAyMy43Nzk1NTYgMTkuMjg1MzMzIDQ3LjUwMjIyMiAzOC42NTZ2LTEzNS40ODA4ODlhNzMuNjE0MjIyIDczLjYxNDIyMiAwIDAgMC0wLjMxMjg4OS05LjgxMzMzM2MxNi4wNDI2NjcgMC4xOTkxMTEgMzIuMTEzNzc4IDAgNDguMTU2NDQ0IDBoMzA3LjQyNzU1NmExMTQuNzE2NDQ0IDExNC43MTY0NDQgMCAwIDEgMTQuNjQ4ODg5IDAuNTY4ODg5IDUzLjEzNDIyMiA1My4xMzQyMjIgMCAwIDEgMzMuMzkzNzc4IDE3Ljc3Nzc3NyA1MC42MDI2NjcgNTAuNjAyNjY3IDAgMCAxIDEyLjQ1ODY2NiAzMy40MjIyMjMgOTgxLjc2IDk4MS43NiAwIDAgMS03Ljc2NTMzMyA4My4yaDQ4LjM1NTU1NmE1Ni44ODg4ODkgNTYuODg4ODg5IDAgMCAxIDE1LjU4NzU1NSAxLjEwOTMzMyAzMS4wODk3NzggMzEuMDg5Nzc4IDAgMCAxIDIyLjUyOCAyMy44MzY0NDQgMTE5Ljk3ODY2NyAxMTkuOTc4NjY3IDAgMCAxIDAuMjI3NTU2IDMxLjU0NDg4OSAxNjEuNDIyMjIyIDE2MS40MjIyMjIgMCAwIDEtMzQuNzU5MTExIDg1LjAyMDQ0NSAxNDAuNjg2MjIyIDE0MC42ODYyMjIgMCAwIDEtMTA0LjMwNTc3OCA1My40MTg2NjYgNTI2LjIyMjIyMiA1MjYuMjIyMjIyIDAgMCAxLTI5LjIxMjQ0NSA1OS4wNTA2NjcgNDA1LjUwNCA0MDUuNTA0IDAgMCAxLTUwLjIzMjg4OSA2OS41NzUxMTEgMjY2Ljg5NDIyMiAyNjYuODk0MjIyIDAgMCAxLTU3LjIzMDIyMiA0OC4zNTU1NTYgMTgyLjYxMzMzMyAxODIuNjEzMzMzIDAgMCAxLTcyLjM2MjY2NiAyNi4zMTExMTF2MTA4Ljg4NTMzM2g3My41MDA0NDRhMjAuNTkzNzc4IDIwLjU5Mzc3OCAwIDAgMSAxMi45OTkxMTEgNC4zMjM1NTYgMjAuMzA5MzMzIDIwLjMwOTMzMyAwIDAgMSAzLjYxMjQ0NSAyNy45MzI0NDQgMjIuMTg2NjY3IDIyLjE4NjY2NyAwIDAgMS0xNS4yNDYyMjMgOC4yMjA0NDVoLTE5MC41Nzc3NzdhMjEuNzMxNTU2IDIxLjczMTU1NiAwIDAgMS0xNi4zODQtOS4zMjk3NzggMjAuNzA3NTU2IDIwLjcwNzU1NiAwIDAgMS0yLjUzMTU1Ni0xNi4zODQgMjAuMDUzMzMzIDIwLjA1MzMzMyAwIDAgMSAxMy4xOTgyMjItMTMuNzY3MTExIDM0LjQ3NDY2NyAzNC40NzQ2NjcgMCAwIDEgMTEuMzc3Nzc4LTAuOTk1NTU2aDY4Ljg5MjQ0NHYtMTA4Ljk0MjIyMmExNzUuNjcyODg5IDE3NS42NzI4ODkgMCAwIDEtNTEuNTY5Nzc3LTE1LjI0NjIyMiAyMzMuNzU2NDQ0IDIzMy43NTY0NDQgMCAwIDEtNTkuNzMzMzM0LTQxLjE1OTExMSAzNTMuNzA2NjY3IDM1My43MDY2NjcgMCAwIDEtNTIuMzk0NjY2LTYyLjU3Nzc3OCA1MjUuMzY4ODg5IDUyNS4zNjg4ODkgMCAwIDEtNDUuMTk4MjIzLTg0LjQ4IDEzNi41MzMzMzMgMTM2LjUzMzMzMyAwIDAgMS02MS44MzgyMjItMTcuMDY2NjY3IDE1MC4yNzIgMTUwLjI3MiAwIDAgMS01Ny40NTc3NzgtNTcuNTQzMTExIDE2NC43Nzg2NjcgMTY0Ljc3ODY2NyAwIDAgMS0yMS4wMjA0NDQtODcuMjEwNjY3IDQ1LjAyNzU1NiA0NS4wMjc1NTYgMCAwIDEgMi44NDQ0NDQtMTMuOTk0NjY2IDMxLjI4ODg4OSAzMS4yODg4ODkgMCAwIDEgMjMuMjEwNjY3LTE4LjM0NjY2NyA1My43NiA1My43NiAwIDAgMSAxMC42MzgyMjItMC41NDA0NDRoNTEuNDI3NTU2cS01LjY4ODg4OS00MC42NDcxMTEtNy42MjMxMTEtODEuNjM1NTU2YTUwLjk0NCA1MC45NDQgMCAwIDEgMTEuMzc3Nzc4LTMzLjc5Mm0yNjEuMDM0NjY2IDc3LjczODY2N2wtMzIuNjU0MjIyIDY0LjU2ODg4OWMtMjQuNjYxMzMzIDMuNTI3MTExLTQ5LjM1MTExMSA2Ljk0MDQ0NC03My45NTU1NTYgMTAuNTI0NDQ0YTE4Ljc3MzMzMyAxOC43NzMzMzMgMCAwIDAtMTUuNTU5MTExIDE2LjY2ODQ0NCAxOC40MzIgMTguNDMyIDAgMCAwIDUuNjg4ODg5IDE0Ljk5MDIyM2MxNy42MzU1NTYgMTYuNzgyMjIyIDM1LjI5OTU1NiAzMy40NzkxMTEgNTIuOTA2NjY3IDUwLjI4OTc3N3EtNi4yODYyMjIgMzUuNjQwODg5LTEyLjUxNTU1NiA3MS4zMTAyMjNhMTguNDYwNDQ0IDE4LjQ2MDQ0NCAwIDAgMCA4LjUzMzMzNCAxOC43MTY0NDQgMTkuNDU2IDE5LjQ1NiAwIDAgMCAxOC45NDQgMC45MTAyMjJxMzIuOTEwMjIyLTE2LjgxMDY2NyA2NS43NjM1NTUtMzMuNzA2NjY2bDYyLjAzNzMzNCAzMS44MjkzMzNhMzAuMzUwMjIyIDMwLjM1MDIyMiAwIDAgMCA5LjI3Mjg4OCAzLjcyNjIyMiAxOS4xNzE1NTYgMTkuMTcxNTU2IDAgMCAwIDE3LjgzNDY2Ny02LjQgMTguMTc2IDE4LjE3NiAwIDAgMCA0LjEyNDQ0NS0xNS4wNDcxMTFsLTEyLjU0NC03MS4yODE3NzhjMTcuNjkyNDQ0LTE3LjA2NjY2NyAzNS41MjcxMTEtMzMuNzkyIDUzLjI0OC01MC43MTY0NDRhMTguMjg5Nzc4IDE4LjI4OTc3OCAwIDAgMCA0LjI5NTExMS0xOS4zOTkxMTEgMTkuMDU3Nzc4IDE5LjA1Nzc3OCAwIDAgMC0xNS4yMTc3NzgtMTIuMDAzNTU2Yy0yNC40MzM3NzgtMy40NzAyMjItNDguODk2LTYuOTEyLTczLjMyOTc3OC0xMC40MTA2NjZsLTMxLjgyOTMzMy02Mi45NzZhMTkuMzk5MTExIDE5LjM5OTExMSAwIDAgMC0yMS4wNzczMzQtMTEuOTE4MjIzIDE4LjkxNTU1NiAxOC45MTU1NTYgMCAwIDAtMTMuOTY2MjIyIDEwLjMyNTMzNHoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9Ijc3NjcyIj48L3BhdGg+PC9zdmc+', uiClass: 'ui-4' }
			],
				// dynamicValues 用于承接数字动画后的实时显示值。
				dynamicValues: [0, 0, 0, 0],
				// 当前日期、周打卡状态和累计天数共同驱动打卡组件展示。
				currentDate: '',
				weekDays: [],
				todayChecked: false,
				totalCheckIns: 0
			}
		},
		created() {
			// 监听档案和题库数据变化，实时更新卡片数量。
			if (typeof uni !== 'undefined' && typeof uni.$on === 'function') {
				uni.$on(ARCHIVE_DATA_UPDATED_EVENT, this.syncToolValues)
				uni.$on(QUESTION_HISTORY_UPDATED_EVENT, this.syncToolValues)
				uni.$on(QUESTION_FAVORITES_UPDATED_EVENT, this.syncToolValues)
			}
		},
		beforeDestroy() {
			// 兼容 Vue2 生命周期，移除全局事件监听。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.syncToolValues)
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.syncToolValues)
				uni.$off(QUESTION_FAVORITES_UPDATED_EVENT, this.syncToolValues)
			}
		},
		beforeUnmount() {
			// 兼容 Vue3 生命周期，移除全局事件监听。
			if (typeof uni !== 'undefined' && typeof uni.$off === 'function') {
				uni.$off(ARCHIVE_DATA_UPDATED_EVENT, this.syncToolValues)
				uni.$off(QUESTION_HISTORY_UPDATED_EVENT, this.syncToolValues)
				uni.$off(QUESTION_FAVORITES_UPDATED_EVENT, this.syncToolValues)
			}
		},
		mounted() {
			// 初次挂载时初始化打卡数据、同步档案数量并播放数字动画。
			this.initCheckInData()
			this.syncToolValues()
			this.animateValues()
		},
		methods: {
			startDailyTask() {
				// 今日任务入口直接带用户进入题库开始刷题。
				uni.navigateTo({
					url: '/subPages/questionBank/written'
				})
			},
			async initCheckInData() {
				// 生成本周七天的打卡视图，并同步今日状态与累计天数。
				const now = new Date()
				this.currentDate = `${now.getMonth() + 1}月${now.getDate()}日`
				
				// 生成一周的日期数据
				const weekNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				this.weekDays = []
				
				for (let i = 0; i < 7; i++) {
					const date = new Date(now)
					date.setDate(now.getDate() - (now.getDay() || 7) + i + 1)
					const dateStr = date.toISOString().split('T')[0]
					const todayStr = now.toISOString().split('T')[0]
					const isToday = dateStr === todayStr
					const isPast = dateStr < todayStr
					
					this.weekDays.push({
						name: weekNames[i],
						date: date.getDate(),
						isToday,
						isPast,
						checked: false
					})
				}
				
				// 累计打卡次数从本地存储计算
				this.calculateTotalCheckIns()
				
				// 今日状态和周打卡状态从后端获取
				await this.fetchCheckInData()
			},
			async fetchCheckInData() {
				try {
					const [statsRes, weeklyRes] = await Promise.all([
						getGrowthRecordStats(),
						getWeeklyCheckinStatus()
					])
					
					if (statsRes && statsRes.data) {
						this.todayChecked = statsRes.data.checkedInToday || false
						// 保存后端返回的连续打卡天数到本地缓存
						if (statsRes.data.consecutiveDays !== undefined) {
							saveGrowthStats({ consecutiveDays: statsRes.data.consecutiveDays })
						}
					}
					
					if (weeklyRes && weeklyRes.data) {
						const weeklyStatus = weeklyRes.data
						this.weekDays = this.weekDays.map((day, index) => ({
							...day,
							checked: weeklyStatus[index] || false
						}))
					}
				} catch (error) {
					console.error('获取打卡数据失败:', error)
				}
			},
			isChecked(dateStr) {
				// 从用户维度的本地签到缓存中读取某天是否已打卡。
				const checkInKey = getCheckInKey()
				const checkIns = uni.getStorageSync(checkInKey) || {}
				return checkIns[dateStr] || false
			},
			calculateTotalCheckIns() {
				// 统计本地所有已打卡记录数量，作为累计天数展示。
				const checkInKey = getCheckInKey()
				const checkIns = uni.getStorageSync(checkInKey) || {}
				this.totalCheckIns = Object.values(checkIns).filter(Boolean).length
			},
			async checkIn() {
				if (this.todayChecked) return
				
				try {
					uni.showLoading({ title: '打卡中...' })
					
					const res = await checkIn()
					
					if (res && res.data) {
						this.todayChecked = true
						
						const checkInKey = getCheckInKey()
						const checkIns = uni.getStorageSync(checkInKey) || {}
						const todayStr = new Date().toISOString().split('T')[0]
						checkIns[todayStr] = true
						uni.setStorageSync(checkInKey, checkIns)
						
						this.calculateTotalCheckIns()
						
						this.weekDays = this.weekDays.map(day => {
							if (day.isToday) {
								return { ...day, checked: true }
							}
							return day
						})
						
						uni.hideLoading()
						uni.showToast({
							title: '打卡成功！',
							icon: 'success'
						})
						if (typeof uni !== 'undefined' && typeof uni.$emit === 'function') {
							uni.$emit(ARCHIVE_DATA_UPDATED_EVENT)
						}
					} else {
						uni.hideLoading()
						uni.showToast({
							title: '打卡失败，请重试',
							icon: 'none'
						})
					}
				} catch (error) {
					uni.hideLoading()
					console.error('打卡失败:', error)
					const errorMsg = error.message || '打卡失败'
					if (errorMsg.includes('未获取用户信息')) {
						uni.showModal({
							title: '提示',
							content: '未获取到用户信息，请重新登录后再试',
							showCancel: false,
							confirmText: '知道了'
						})
					} else {
						uni.showToast({
							title: errorMsg || '打卡失败',
							icon: 'none',
							duration: 2000
						})
					}
				}
			},
			navigateToGrowth() {
				// 查看更多入口切到成长档案 tab。
				uni.switchTab({
					url: '/pages/GrowthArchive/GrowthArchive'
				})
			},
			syncToolValues() {
				// 从聚合指标同步四类档案数量，并写入数字动画源数据。
				const metrics = getDashboardMetrics()
				const valueMap = {
					'我的简历': metrics.resumeCount,
					'面试记录': metrics.interviewCount,
					'证书资质': metrics.archiveSummary.certificatesCount,
					'竞赛奖项': metrics.archiveSummary.awardsCount
				}
				this.tools = this.tools.map(item => ({
					...item,
					value: String(valueMap[item.name] || 0)
				}))
				this.dynamicValues = this.tools.map(item => Number(item.value) || 0)
			},
			animateValues() {
				// 为每个工具项实现数字累加动画。
				this.tools.forEach((tool, index) => {
					this.animateItemValue(index)
				})
			},
			animateItemValue(index) {
				// 单个卡片从 0 逐步递增到目标值，提升统计展示的动效感。
				const tool = this.tools[index]
				const targetValue = parseInt(tool.value)
				let currentValue = 0
				const duration = 1500 // 动画持续时间（毫秒）
				const steps = 30 // 动画步数
				const stepValue = targetValue / steps
				const interval = duration / steps

				let step = 0
				const timer = setInterval(() => {
					step++
					currentValue = Math.floor(step * stepValue)
					this.dynamicValues[index] = currentValue

					if (step >= steps) {
						this.dynamicValues[index] = targetValue
						clearInterval(timer)
					}
				}, interval)
			},
			handleToolClick(item) {
				// 根据卡片名称跳转到档案、历史记录或对应管理页。
				const routeMap = {
					'我的简历': () => {
						uni.setStorageSync('growth_archive_scroll_target', 'resume')
						uni.switchTab({
							url: '/pages/GrowthArchive/GrowthArchive'
						})
					},
					'面试记录': () => {
						uni.navigateTo({
							url: '/subPages/questionBank/history?type=interview'
						})
					},
					'证书资质': () => {
						uni.navigateTo({
							url: '/subPages/archive/manage?type=certificates'
						})
					},
					'竞赛奖项': () => {
						uni.navigateTo({
							url: '/subPages/archive/manage?type=awards'
						})
					}
				}

				const handler = routeMap[item.name]
				if (handler) {
					handler()
				}
			}
		},
		computed: {
			themeClass() {
				// 档案模块根据主题切换浅色/深色背景方案。
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			bannerImageSrc() {
				// 横幅插图按主题切换不同资源，保证深浅色对比度一致。
				return this.theme === 'dark' ? '/static/dark-offer-plan.png' : '/static/offer_plan.png'
			}
		},
	}
</script>

<style lang="scss">
	.job-tools {
		margin: 18rpx 15rpx 0;
		padding: 28rpx;
		border-radius: 32rpx;
		background: #ffffff;
		box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.08);

		.section-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 20rpx;
		}

		.section-title {
			font-size: 40rpx;
			font-weight: 800;
			color: #24345b;
		}

		.section-link {
			flex-shrink: 0;
			font-size: 24rpx;
			font-weight: 700;
			color: #3165d7;
		}

		.hero-banner {
			margin-top: 24rpx;
			padding: 26rpx;
			border-radius: 28rpx;
			background: linear-gradient(135deg, #edf6ff 0%, #f6f9ff 48%, #eaf0ff 100%);
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 18rpx;
			overflow: hidden;
		}

		.banner-copy {
			flex: 1;
			min-width: 0;
		}

		.banner-tag {
			display: block;
			width: fit-content;
			padding: 8rpx 16rpx;
			border-radius: 999rpx;
			background: rgba(49, 101, 215, 0.12);
			font-size: 20rpx;
			font-weight: 700;
			color: #3165d7;
		}

		.banner-title {
			display: block;
			margin-top: 12rpx;
			font-size: 32rpx;
			font-weight: 700;
			color: #24345b;
			line-height: 1.3;
		}

		.banner-desc {
			display: block;
			margin-top: 10rpx;
			font-size: 22rpx;
			line-height: 1.5;
			color: #6b7a99;
		}

		.banner-btn {
			margin-top: 24rpx;
			width: fit-content;
			padding: 16rpx 32rpx;
			border-radius: 999rpx;
			background: linear-gradient(135deg, #3165d7, #1e40af);
			font-size: 22rpx;
			font-weight: 700;
			color: #ffffff;
			line-height: 1.3;
			box-shadow: 0 14rpx 28rpx rgba(74, 103, 247, 0.2);
		}

		.banner-art {
			position: relative;
			width: 170rpx;
			height: 166rpx;
			flex-shrink: 0;
			animation: fadeInUp 0.8s ease-out 0.8s both;
		}

		.art-card {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			border-radius: 18rpx;
			box-shadow: 0 12rpx 28rpx rgba(74, 103, 247, 0.18);
		}

		.card-one {
			top: 0;
			width: 120rpx;
			height: 80rpx;
			background: linear-gradient(135deg, #93c5fd, #60a5fa);
		}

		.card-two {
			top: 50rpx;
			width: 140rpx;
			height: 90rpx;
			background: linear-gradient(135deg, #a78bfa, #8b5cf6);
		}

		.card-three {
			top: 100rpx;
			width: 120rpx;
			height: 80rpx;
			background: linear-gradient(135deg, #f472b6, #ec4899);
		}

		.art-dot {
			position: absolute;
			border-radius: 50%;
		}

		.dot-big {
			top: 30rpx;
			right: 0;
			width: 24rpx;
			height: 24rpx;
			background: rgba(255, 255, 255, 0.6);
		}

		.dot-small {
			top: 80rpx;
			right: 20rpx;
			width: 18rpx;
			height: 18rpx;
			background: rgba(255, 255, 255, 0.4);
		}

		.tool-grid {
			margin-top: 24rpx;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 18rpx;
			width: 100%;
			box-sizing: border-box;
		}

		.tool-item {
			padding: 22rpx 12rpx 18rpx;
			border-radius: 24rpx;
			background: linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%);
			border: 2rpx solid rgba(67, 76, 210, 0.1);
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
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
			background: rgba(59, 130, 246, 0.14);
			color: #3b82f6;
		}

		.ui-2 {
			background: rgba(249, 115, 22, 0.14);
			color: #f97316;
		}

		.ui-3 {
			background: rgba(139, 92, 246, 0.14);
			color: #8b5cf6;
		}

		.ui-4 {
			background: rgba(16, 185, 129, 0.14);
			color: #10b981;
		}

		.tool-name {
			margin-top: 16rpx;
			font-size: 24rpx;
			font-weight: 700;
			color: #24345b;
			line-height: 1.3;
		}

		.tool-meta {
			margin-top: 8rpx;
			font-size: 20rpx;
			color: #8a96af;
		}

		/* 每日打卡组件样式 */
		.check-in-container {
			margin-top: 24rpx;
			padding: 24rpx;
			border-radius: 28rpx;
			background: linear-gradient(135deg, #fff8f0 0%, #fff 100%);
			border: 2rpx solid rgba(245, 158, 11, 0.2);
		}
		
		.check-in-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
		}
		
		.check-in-title {
			display: flex;
			align-items: center;
			gap: 12rpx;
			font-size: 28rpx;
			font-weight: 700;
			color: #2a385c;
		}
		
		.check-in-date {
			padding: 6rpx 16rpx;
			background: linear-gradient(135deg, #f59e0b, #fbbf24);
			color: #fff;
			border-radius: 20rpx;
			font-size: 22rpx;
			font-weight: 600;
		}
		
		.check-in-stats {
			font-size: 22rpx;
			color: #666;
		}
		
		.check-in-week {
			display: flex;
			justify-content: space-between;
			gap: 12rpx;
			margin-bottom: 24rpx;
		}
		
		.check-in-day {
			flex: 1;
			padding: 20rpx 12rpx;
			background: #f8f9fa;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 12rpx;
			position: relative;
			transition: all 0.3s ease;
		}
		
		.check-in-day.today {
			background: rgba(245, 158, 11, 0.1);
			border: 2rpx solid rgba(245, 158, 11, 0.3);
		}
		
		.check-in-day.checked {
			background: rgba(16, 185, 129, 0.1);
		}
		
		.day-name {
			font-size: 22rpx;
			color: #333;
			font-weight: 500;
		}
		
		.day-status {
			width: 40rpx;
			height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			font-size: 24rpx;
			font-weight: bold;
		}
		
		.status-check {
			color: #10b981;
			background: rgba(16, 185, 129, 0.1);
		}
		
		.status-cross {
			color: #ef4444;
			background: rgba(239, 68, 68, 0.1);
		}
		
		.check-in-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.check-in-tip {
			font-size: 20rpx;
			color: #666;
			flex: 1;
		}
		
		.check-in-button {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background: linear-gradient(135deg, #f59e0b, #fbbf24);
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 32rpx;
			font-weight: bold;
			transition: all 0.3s ease;
			cursor: pointer;
			box-shadow: 0 8rpx 20rpx rgba(245, 158, 11, 0.3);
		}
		
		.check-in-button:hover {
			transform: scale(1.05);
			box-shadow: 0 12rpx 28rpx rgba(245, 158, 11, 0.4);
		}
		
		.check-in-button.checked {
			width: auto;
			height: 60rpx;
			padding: 0 24rpx;
			border-radius: 30rpx;
			background: linear-gradient(135deg, #10b981, #059669);
			font-size: 22rpx;
			box-shadow: 0 6rpx 16rpx rgba(16, 185, 129, 0.3);
		}
		
		.button-text {
			font-weight: 600;
		}

		/* 深色模式 */
		&.theme-dark {
			background: linear-gradient(180deg, #23252b 0%, #1d1f24 100%);
			box-shadow: 0 18rpx 42rpx rgba(0, 0, 0, 0.26);

			.section-title,
			.tool-name,
			.banner-title {
				color: #f4f7fb;
			}

			.section-link,
			.banner-tag {
				color: #8ab7ff;
			}

			.banner-desc,
			.tool-meta {
				color: rgba(255, 255, 255, 0.58);
			}

			.hero-banner,
			.tool-item {
				background: linear-gradient(180deg, #2d3037 0%, #262930 100%);
			}


			.banner-tag {
				background: rgba(90, 139, 255, 0.16);
			}
			
			/* 深色模式下的打卡组件 */
			.check-in-container {
				background: linear-gradient(135deg, #2d2a25 0%, #23211d 100%);
				border-color: rgba(245, 158, 11, 0.3);
			}
			
			.check-in-title {
				color: #f4f7fb;
			}
			
			.check-in-stats {
				color: rgba(255, 255, 255, 0.58);
			}
			
			.check-in-day {
				background: #2a2c32;
			}
			
			.check-in-day.today {
				background: rgba(245, 158, 11, 0.2);
				border-color: rgba(245, 158, 11, 0.4);
			}
			
			.check-in-day.checked {
				background: rgba(16, 185, 129, 0.2);
			}
			
			.day-name {
				color: #eef2f8;
			}
			
			.check-in-tip {
				color: rgba(255, 255, 255, 0.58);
			}
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30rpx) scale(0.8);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
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
