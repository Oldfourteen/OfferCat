<template>
	<view class="manager-page" :class="themeClass">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-left" @click="goBack">
				<view class="back-btn">
					<text class="back-icon">&lt;</text>
				</view>
			</view>
			<text class="nav-title">管理者中心</text>
			<view class="nav-right"></view>
		</view>

		<!-- 页面内容 -->
		<scroll-view class="page-content" scroll-y @scrolltolower="loadMore" refresher-enabled @refresherrefresh="onRefresh" :refresher-triggered="refreshing">
			<!-- 1. 管理员展示模块 -->
			<view class="section-card">
				<view class="section-header">
					<text class="section-title">系统管理员</text>
					<text class="admin-count">共 {{ staticAdminAvatars.length }} 位</text>
				</view>
				<view class="admin-list-row">
					<view class="admin-item" v-for="(avatar, idx) in staticAdminAvatars.slice(0, 4)" :key="idx">
						<view class="admin-avatar admin-avatar-image">
							<image class="admin-avatar-img" :src="avatar.src" mode="aspectFill" />
						</view>
					</view>
				</view>
				<view class="admin-list-row">
					<view class="admin-item" v-for="(avatar, idx) in staticAdminAvatars.slice(4)" :key="idx">
						<view class="admin-avatar admin-avatar-image">
							<image class="admin-avatar-img" :src="avatar.src" mode="aspectFill" />
						</view>
					</view>
					<view class="admin-item admin-add" @click="openAdminPicker">
						<view class="admin-avatar admin-add-avatar">
							<text class="admin-add-plus">+</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 0. 用户搜索模块 -->
			<view class="section-card">
				<view class="section-header">
					<text class="section-title">用户搜索</text>
				</view>
				<view class="search-container">
					<view class="search-input-wrap">
						<text class="search-icon">🔍</text>
						<input 
							class="search-input" 
							v-model="searchKeyword" 
							placeholder="输入用户名或手机号"
							confirm-type="search"
							@input="onSearchInput"
							@focus="onSearchFocus"
							@blur="onSearchBlur"
							@confirm="searchUser"
						/>
					</view>
					<view class="search-btn" @click="searchUser">
						<text class="search-btn-text">搜索</text>
					</view>
				</view>
				<view class="suggest-dropdown" v-if="showSuggestDropdown">
					<view class="suggest-item" v-for="u in searchSuggestions" :key="u.userId" @click="selectSuggestedUser(u)">
						<view class="suggest-avatar">
							<text class="avatar-text">{{ getAvatarText(u.username || u.nickname || '用户') }}</text>
						</view>
						<view class="suggest-info">
							<text class="suggest-name">{{ u.nickname || u.username || u.phone || '用户' }}</text>
							<text class="suggest-meta">ID: {{ u.userId }}<text v-if="u.phone"> · {{ u.phone }}</text></text>
						</view>
					</view>
					<view class="suggest-empty" v-if="searchKeyword.trim() !== '' && !suggestLoading && searchSuggestions.length === 0">
						<text class="suggest-empty-text">暂无匹配用户</text>
					</view>
					<view class="suggest-loading" v-if="suggestLoading">
						<text class="suggest-loading-text">搜索中…</text>
					</view>
				</view>
				<view class="search-result" v-if="searchResult.length > 0">
					<text class="result-title">搜索结果 ({{ searchResult.length }})</text>
					<view class="result-list">
						<view class="result-item" v-for="user in searchResult" :key="user.userId" @click="showMuteActionPanel(user)">
							<view class="result-avatar">
								<text class="avatar-text">{{ getAvatarText(user.username || '用户') }}</text>
							</view>
							<view class="result-info">
								<text class="result-name">{{ user.username }}</text>
								<text class="result-id">ID: {{ user.userId }}</text>
								<text class="result-phone" v-if="user.phone">手机号: {{ user.phone }}</text>
							</view>
							<view class="result-action">
								<text class="action-text">禁言</text>
							</view>
						</view>
					</view>
				</view>
				<view class="search-hint" v-if="!hasSearched && searchKeyword === ''">
					<text class="hint-text">输入昵称、手机号或用户ID，自动模糊匹配</text>
				</view>
				<view class="empty-state" v-if="hasSearched && searchResult.length === 0">
					<text class="empty-text">未找到匹配的用户</text>
				</view>
			</view>

			<!-- 2. 禁言管理模块 -->
			<view class="section-card">
				<view class="section-header">
					<text class="section-title">用户禁言管理</text>
					<view class="refresh-btn" @click="loadMutedUsers">
						<text class="refresh-icon">⟳</text>
					</view>
				</view>
				<view class="muted-dropdown" :class="{ 'dropdown-open': showMutedDropdown }">
					<view class="dropdown-header" @click="toggleMutedDropdown">
						<text class="dropdown-label">已禁言用户</text>
						<text class="dropdown-count">{{ mutedUserList.length }} 人</text>
						<text class="dropdown-arrow" :class="{ rotated: showMutedDropdown }">▼</text>
					</view>
					<view class="dropdown-content" v-if="showMutedDropdown">
						<view class="muted-list" v-if="mutedUserList.length > 0">
							<view class="muted-item" v-for="user in mutedUserList" :key="user.userId">
								<view class="muted-user-info">
									<view class="muted-avatar">
										<text class="avatar-text">{{ getAvatarText(user.username || '用户') }}</text>
									</view>
									<view class="muted-detail">
										<text class="muted-name">{{ user.username }}</text>
										<text class="muted-id">ID: {{ user.userId }}</text>
										<text class="muted-time" :class="{ 'permanent': user.isPermanent }">
											{{ user.isPermanent ? '永久禁言' : '剩余: ' + formatRemainingTime(user.endTime) }}
										</text>
									</view>
								</view>
								<view class="muted-actions">
									<view class="action-btn modify-btn" @click="showMuteActionPanel(user)">
										<text class="btn-text">修改</text>
									</view>
								</view>
							</view>
						</view>
						<view class="empty-state" v-else>
							<text class="empty-text">暂无禁言用户</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 3. 帖子管理模块 -->
			<view class="section-card">
				<view class="section-header">
					<text class="section-title">帖子管理</text>
					<view class="refresh-btn" @click="loadPostList">
						<text class="refresh-icon">⟳</text>
					</view>
				</view>
				<view class="post-dropdown" :class="{ 'dropdown-open': showPostDropdown }">
					<view class="dropdown-header" @click="togglePostDropdown">
						<text class="dropdown-label">帖子列表</text>
						<text class="dropdown-count">{{ postList.length }} 条</text>
						<text class="dropdown-arrow" :class="{ rotated: showPostDropdown }">▼</text>
					</view>
					<view class="dropdown-content" v-if="showPostDropdown">
						<view class="post-list" v-if="postList.length > 0">
							<view class="post-item" v-for="post in postList" :key="post.postId">
								<view class="post-content">
									<text class="post-title">{{ post.title || '无标题' }}</text>
									<text class="post-author">作者: {{ post.authorName || '未知用户' }} · {{ formatTime(post.createTime) }}</text>
									<text class="post-preview">{{ post.content }}</text>
								</view>
								<view class="post-actions">
									<view class="action-btn delete-btn" @click="confirmDeletePost(post)">
										<text class="btn-text">删除</text>
									</view>
								</view>
							</view>
						</view>
						<view class="empty-state" v-else>
							<text class="empty-text">暂无帖子</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 禁言操作面板弹窗 -->
		<view class="action-panel-overlay" v-if="showActionPanel" @click="closeActionPanel">
			<view class="action-panel" @click.stop>
				<view class="panel-header">
					<text class="panel-title">禁言操作</text>
					<view class="panel-close" @click="closeActionPanel">
						<text class="close-icon">×</text>
					</view>
				</view>
				<view class="panel-content">
					<view class="panel-user-info" v-if="currentMutedUser">
						<view class="panel-avatar">
							<text class="avatar-text">{{ getAvatarText(currentMutedUser.username || '用户') }}</text>
						</view>
						<view class="panel-user-detail">
							<text class="panel-username">{{ currentMutedUser.username }}</text>
							<text class="panel-userid">ID: {{ currentMutedUser.userId }}</text>
						</view>
					</view>
					<view class="panel-actions">
						<view class="panel-action-btn unmute-btn" @click="confirmUnmute">
							<text class="action-icon">○</text>
							<text class="action-text">解除禁言</text>
						</view>
						<view class="panel-action-btn extend-btn" @click="showTimePicker">
							<text class="action-icon">⏱</text>
							<text class="action-text">新增/延长禁言</text>
						</view>
					</view>
					<view class="time-picker-section" v-if="showTimePickerPanel">
						<text class="picker-label">选择禁言时长（滑动选择）</text>
						<picker-view
							class="duration-picker-view"
							:value="durationPickerIndex"
							@change="onDurationPickerChange"
							indicator-style="height: 44px;"
						>
							<picker-view-column>
								<view class="duration-picker-item" v-for="option in muteDurationOptions" :key="option.value">
									<text class="duration-picker-text">{{ option.label }}</text>
								</view>
							</picker-view-column>
						</picker-view>
						<text class="picker-preview">已选：{{ selectedDurationLabel }}</text>
						<view class="picker-confirm" @click="confirmMuteDuration">
							<text class="confirm-text">确认禁言</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="action-panel-overlay" v-if="showAdminPicker" @click="closeAdminPicker">
			<view class="action-panel admin-picker" @click.stop>
				<view class="panel-header">
					<text class="panel-title">添加管理员</text>
					<view class="panel-close" @click="closeAdminPicker">
						<text class="close-icon">×</text>
					</view>
				</view>
				<view class="panel-content">
					<view class="picker-search">
						<view class="search-input-wrap picker-input">
							<text class="search-icon">🔍</text>
							<input class="search-input" v-model="adminPickerKeyword" placeholder="输入用户名或手机号" @input="onAdminPickerInput" />
						</view>
					</view>
					<view class="picker-list" v-if="adminPickerList.length > 0">
						<view class="picker-item" v-for="u in adminPickerList" :key="u.userId" @click="confirmPromote(u)">
							<view class="suggest-avatar">
								<text class="avatar-text">{{ getAvatarText(u.nickname || u.username || '用户') }}</text>
							</view>
							<view class="suggest-info">
								<text class="suggest-name">{{ u.nickname || u.username || u.phone || '用户' }}</text>
								<text class="suggest-meta">ID: {{ u.userId }}<text v-if="u.phone"> · {{ u.phone }}</text></text>
							</view>
						</view>
					</view>
					<view class="suggest-loading" v-if="adminPickerLoading">
						<text class="suggest-loading-text">加载中…</text>
					</view>
					<view class="suggest-empty" v-if="!adminPickerLoading && adminPickerKeyword.trim() !== '' && adminPickerList.length === 0">
						<text class="suggest-empty-text">暂无匹配用户</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 加载状态提示 -->
		<view class="loading-toast" v-if="loading">
			<view class="loading-spinner"></view>
			<text class="loading-text">加载中...</text>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { getApiBase } from '@/api/config.js'
	import { getToken } from '@/utils/token.js'
	import { getUser, resolveStoredUserId, syncUserProfileFromServer } from '@/utils/user.js'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				adminList: [],
				mutedUserList: [],
				postList: [],
				searchKeyword: '',
				searchResult: [],
				searchSuggestions: [],
				showSuggestDropdown: false,
				suggestLoading: false,
				suggestSeq: 0,
				suggestTimer: null,
				suggestHideTimer: null,
				suggestAuthWarned: false,
				operatorUserId: null,
				staticAdminAvatars: [
					{ src: '/static/admin-avatars/b_07fd36d5bdd3cb7538e7f905863a2ee6.jpg', name: '系统管理员' },
					{ src: '/static/admin-avatars/b_2f1809da100a08380609c334bdd6e68e.jpg', name: '系统管理员' },
					{ src: '/static/admin-avatars/b_4fff4095e74eb095fff09dc2e4208b80.jpg', name: '系统管理员' },
					{ src: '/static/admin-avatars/b_64f428dba014b897c78f91f775229f6f.jpg', name: '系统管理员' },
					{ src: '/static/admin-avatars/b_9622b5bf4b33ebcd75f2523a9ea1f6f8.jpg', name: '系统管理员' },
					{ src: '/static/admin-avatars/b_d1e72e74c3566d23300e10f279771597.jpg', name: '系统管理员' },
					{ src: '/static/admin-avatars/b_e60b3feeae90e497c7fe8698ee4b8f6b.jpg', name: '系统管理员' },
				],
				hasSearched: false,
				showMutedDropdown: true,
				showPostDropdown: true,
				showActionPanel: false,
				showTimePickerPanel: false,
				showAdminPicker: false,
				adminPickerKeyword: '',
				adminPickerList: [],
				adminPickerLoading: false,
				adminPickerSeq: 0,
				adminPickerTimer: null,
				adminPickerAuthWarned: false,
				loading: false,
				refreshing: false,
				currentMutedUser: null,
				selectedDuration: null,
				durationPickerIndex: [3],
				muteDurationOptions: [
					{ label: '15分钟', value: 900 },
					{ label: '1小时', value: 3600 },
					{ label: '6小时', value: 21600 },
					{ label: '1天', value: 86400 },
					{ label: '7天', value: 604800 },
					{ label: '30天', value: 2592000 },
					{ label: '永久', value: -1 }
				]
			}
		},
		onLoad() {
			this.bootstrap()
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			selectedDurationLabel() {
				const idx = this.durationPickerIndex && this.durationPickerIndex[0]
				const opt = this.muteDurationOptions[idx != null ? idx : 0]
				return opt ? opt.label : '请选择'
			}
		},
		methods: {
			async bootstrap() {
				await this.ensureOperatorUserId()
				this.loadAdminList()
				this.loadMutedUsers()
				this.loadPostList()
				this.prefetchAdminPicker()
			},
			async ensureOperatorUserId() {
				let u = getUser() || uni.getStorageSync('user') || null
				let uid = resolveStoredUserId(u)
				if (uid == null && getToken()) {
					await syncUserProfileFromServer({ timeout: 8000 })
					u = getUser() || uni.getStorageSync('user') || null
					uid = resolveStoredUserId(u)
				}
				this.operatorUserId = uid
				if (this.operatorUserId == null) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					uni.navigateTo({ url: '/pages/login/login' })
				}
			},
			goBack() {
				uni.navigateBack()
			},
			getAvatarText(name) {
				if (!name) return '?'
				return name.charAt(0).toUpperCase()
			},
			formatTime(timeStr) {
				if (!timeStr) return ''
				const date = new Date(timeStr)
				const now = new Date()
				const diff = now - date
				if (diff < 60000) return '刚刚'
				if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
				if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
				if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
			},
			formatRemainingTime(expireTime) {
				if (!expireTime) return '未知'
				const now = new Date().getTime()
				const expire = new Date(expireTime).getTime()
				const remaining = expire - now
				if (remaining <= 0) return '已到期'
				if (remaining < 60000) return `${Math.ceil(remaining / 1000)}秒`
				if (remaining < 3600000) return `${Math.ceil(remaining / 60000)}分钟`
				if (remaining < 86400000) return `${Math.ceil(remaining / 3600000)}小时`
				return `${Math.ceil(remaining / 86400000)}天`
			},
			toggleMutedDropdown() {
				this.showMutedDropdown = !this.showMutedDropdown
			},
			togglePostDropdown() {
				this.showPostDropdown = !this.showPostDropdown
			},
			getOperatorUserId() {
				if (this.operatorUserId) return this.operatorUserId
				const u = getUser() || uni.getStorageSync('user') || null
				return resolveStoredUserId(u)
			},
			onSearchFocus() {
				if (this.searchKeyword.trim() !== '' && (this.searchSuggestions.length > 0 || this.suggestLoading)) {
					this.showSuggestDropdown = true
				}
			},
			onSearchBlur() {
				if (this.suggestHideTimer) clearTimeout(this.suggestHideTimer)
				this.suggestHideTimer = setTimeout(() => {
					this.showSuggestDropdown = false
				}, 120)
			},
			onSearchInput(e) {
				if (e && e.detail && typeof e.detail.value === 'string') {
					this.searchKeyword = e.detail.value
				}
				const k = this.searchKeyword.trim()
				this.hasSearched = false
				if (!k) {
					this.searchSuggestions = []
					this.showSuggestDropdown = false
					return
				}
				this.showSuggestDropdown = true
				this.scheduleSuggest(k, 'search')
			},
			scheduleSuggest(keyword, mode) {
				if (mode === 'search') {
					if (this.suggestTimer) clearTimeout(this.suggestTimer)
					this.suggestTimer = setTimeout(() => this.fetchSuggest(keyword), 180)
					return
				}
				if (mode === 'picker') {
					if (this.adminPickerTimer) clearTimeout(this.adminPickerTimer)
					this.adminPickerTimer = setTimeout(() => this.fetchStudentSuggest(keyword), 180)
				}
			},
			forumAdminUrl(path) {
				return `${getApiBase()}/api/forum/admin${path}`
			},
			mapUserSuggestList(list, limit) {
				return (list || [])
					.map((u) => ({
						userId: u.userId,
						nickname: u.nickname,
						username: u.username || u.nickname,
						phone: u.phone,
						email: u.email,
					}))
					.filter((u) => u.userId != null)
					.slice(0, limit)
			},
			fetchSuggest(keyword) {
				const operatorUserId = this.getOperatorUserId()
				if (!operatorUserId) {
					this.suggestLoading = false
					this.searchSuggestions = []
					this.showSuggestDropdown = false
					uni.showToast({ title: '请先登录管理员账号', icon: 'none' })
					return
				}
				const seq = ++this.suggestSeq
				this.suggestLoading = true
				const hdr = this.getAuthHeader()
				uni.request({
					url: this.forumAdminUrl('/user-suggest'),
					method: 'GET',
					header: hdr,
					data: { operatorUserId, keyword, limit: 8 },
					success: (res) => {
						if (seq !== this.suggestSeq) return
						if (res.statusCode === 200 && res.data && res.data.code === 200 && Array.isArray(res.data.data)) {
							this.searchSuggestions = this.mapUserSuggestList(res.data.data, 8)
							return
						}
						this.fetchSuggestLegacy(operatorUserId, keyword, 8, seq)
					},
					fail: () => {
						if (seq !== this.suggestSeq) return
						this.fetchSuggestLegacy(operatorUserId, keyword, 8, seq)
					},
					complete: () => {
						if (seq !== this.suggestSeq) return
						this.suggestLoading = false
					}
				})
			},
			fetchSuggestLegacy(operatorUserId, keyword, limit, seq) {
				const hdr = this.getAuthHeader()
				uni.request({
					url: `${getApiBase()}/api/admin/forum/user-suggest`,
					method: 'GET',
					header: hdr,
					data: { operatorUserId, keyword, limit },
					success: (res) => {
						if (seq !== this.suggestSeq) return
						if (res.statusCode === 200 && res.data && res.data.code === 200 && Array.isArray(res.data.data)) {
							this.searchSuggestions = this.mapUserSuggestList(res.data.data, limit)
							return
						}
						this.searchSuggestions = []
					},
					fail: () => {
						if (seq !== this.suggestSeq) return
						this.searchSuggestions = []
					},
				})
			},
			selectSuggestedUser(u) {
				if (!u) return
				const selected = this.normalizeUserForActions(u)
				this.searchKeyword = (selected.username || '').trim()
				this.hasSearched = true
				this.showSuggestDropdown = false
				this.searchResult = [selected]
				this.showMuteActionPanel(selected)
			},
			searchUser() {
				const keyword = this.searchKeyword.trim()
				if (!keyword) {
					uni.showToast({ title: '请输入搜索关键词', icon: 'none' })
					return
				}
				this.hasSearched = true
				if (this.searchSuggestions.length > 0) {
					this.searchResult = this.searchSuggestions.map((u) => this.normalizeUserForActions(u))
					this.showSuggestDropdown = false
					return
				}
				this.loading = true
				const operatorUserId = this.getOperatorUserId()
				if (!operatorUserId) {
					this.loading = false
					uni.showToast({ title: '缺少登录信息', icon: 'none' })
					return
				}
				const seq = ++this.suggestSeq
				this.suggestLoading = true
				const hdr = this.getAuthHeader()
				uni.request({
					url: this.forumAdminUrl('/user-suggest'),
					method: 'GET',
					header: hdr,
					data: { operatorUserId, keyword, limit: 10 },
					success: (res) => {
						if (seq !== this.suggestSeq) return
						if (res.statusCode === 200 && res.data && res.data.code === 200 && Array.isArray(res.data.data)) {
							const list = this.mapUserSuggestList(res.data.data, 10)
							this.searchSuggestions = list
							this.searchResult = list.map((u) => this.normalizeUserForActions(u))
							if (list.length > 0) return
						}
						this.searchSuggestions = []
						this.searchResult = []
						this.searchUserLegacy(operatorUserId, keyword, seq)
					},
					fail: () => {
						if (seq !== this.suggestSeq) return
						this.searchSuggestions = []
						this.searchResult = []
						this.searchUserLegacy(operatorUserId, keyword, seq)
					},
					complete: () => {
						if (seq !== this.suggestSeq) return
						this.suggestLoading = false
						this.loading = false
						this.showSuggestDropdown = false
					}
				})
			},
			searchUserLegacy(operatorUserId, keyword, seq) {
				const hdr = this.getAuthHeader()
				uni.request({
					url: `${getApiBase()}/api/admin/forum/user-suggest`,
					method: 'GET',
					header: hdr,
					data: { operatorUserId, keyword, limit: 10 },
					success: (res) => {
						if (seq !== this.suggestSeq) return
						if (res.statusCode === 200 && res.data && res.data.code === 200 && Array.isArray(res.data.data)) {
							const list = this.mapUserSuggestList(res.data.data, 10)
							this.searchSuggestions = list
							this.searchResult = list.map((u) => this.normalizeUserForActions(u))
						}
					},
				})
			},
			loadAdminList() {
				const hdr = this.getAuthHeader()
				const operatorUserId = this.getOperatorUserId()
				if (!operatorUserId) {
					this.adminList = []
					uni.showToast({ title: '请先登录管理员账号', icon: 'none' })
					return
				}
				uni.request({
					url: `${getApiBase()}/api/admin/forum/admins`,
					method: 'GET',
					header: hdr,
					data: { operatorUserId },
					success: (res) => {
						if (res.statusCode === 200 && res.data && res.data.code === 200) {
							this.adminList = Array.isArray(res.data.data) ? res.data.data : []
							return
						}
						this.adminList = []
						const c = res && res.data && res.data.code
						if ((c === 401 || c === 403) && !this.adminPickerAuthWarned) {
							this.adminPickerAuthWarned = true
							uni.showToast({ title: res.data?.msg || '无管理员权限', icon: 'none' })
						}
					},
					fail: () => {
						this.adminList = []
					}
				})
			},
			loadMutedUsers() {
				this.loading = true
				const operatorUserId = this.getOperatorUserId()
				const hdr = this.getAuthHeader()
				const applyList = (raw) => {
					this.mutedUserList = (raw || []).map(u => ({
						...u,
						isPermanent: u.isPermanent === true || u.endTime === null || u.endTime === undefined || u.duration === -1
					}))
				}
				if (!operatorUserId) {
					this.mutedUserList = []
					this.loading = false
					return
				}
				uni.request({
					url: this.forumAdminUrl('/mute/list'),
					method: 'GET',
					header: hdr,
					data: { operatorUserId },
					success: (res) => {
						if (res.statusCode === 200 && res.data && res.data.code === 200 && Array.isArray(res.data.data)) {
							applyList(res.data.data)
							return
						}
						uni.request({
							url: `${getApiBase()}/api/admin/mute/list`,
							method: 'GET',
							header: hdr,
							success: (r2) => {
								if (r2.statusCode === 200 && r2.data && r2.data.code === 200 && Array.isArray(r2.data.data)) {
									applyList(r2.data.data)
								} else if (Array.isArray(r2.data)) {
									applyList(r2.data)
								} else {
									this.mutedUserList = []
								}
							},
							fail: () => { this.mutedUserList = [] }
						})
					},
					fail: () => { this.mutedUserList = [] },
					complete: () => { this.loading = false }
				})
			},
			loadPostList() {
				this.loading = true
				const hdr = this.getAuthHeader()
				const operatorUserId = this.getOperatorUserId()
				if (!operatorUserId) {
					this.postList = []
					this.loading = false
					return
				}
				uni.request({
					url: `${getApiBase()}/api/admin/forum/search-all?operatorUserId=${encodeURIComponent(String(operatorUserId))}`,
					method: 'POST',
					header: hdr,
					data: {},
					success: (res) => {
						if (res.statusCode === 200 && res.data) {
							if (res.data.code === 200 && Array.isArray(res.data.data)) {
								this.postList = res.data.data.map(post => ({
									postId: post.postId,
									userId: post.userId,
									title: post.title || '无标题',
									authorName: post.authorName || '未知用户',
									content: post.content || '',
									createTime: post.createTime
								}))
							} else if (Array.isArray(res.data)) {
								this.postList = res.data.map(post => ({
									postId: post.postId,
									userId: post.userId,
									title: post.title || '无标题',
									authorName: post.authorName || '未知用户',
									content: post.content || '',
									createTime: post.createTime
								}))
							} else {
								this.postList = []
							}
						} else {
							this.postList = []
						}
					},
					fail: () => { this.postList = [] },
					complete: () => { this.loading = false }
				})
			},
			onRefresh() {
				this.refreshing = true
				this.loadAdminList()
				this.loadMutedUsers()
				this.loadPostList()
				setTimeout(() => { this.refreshing = false }, 500)
			},
			loadMore() {},
			getAuthHeader() {
				const hdr = { 'Content-Type': 'application/json' }
				const t = getToken()
				if (t) { hdr['Authorization'] = `Bearer ${t}` }
				return hdr
			},
			showMuteActionPanel(user) {
				this.currentMutedUser = user
				this.showActionPanel = true
				this.showTimePickerPanel = false
				this.selectedDuration = null
			},
			closeActionPanel() {
				this.showActionPanel = false
				this.showTimePickerPanel = false
				this.currentMutedUser = null
				this.selectedDuration = null
			},
			showTimePicker() {
				this.showTimePickerPanel = true
				const idx = this.durationPickerIndex && this.durationPickerIndex[0]
				const opt = this.muteDurationOptions[idx != null ? idx : 0]
				this.selectedDuration = opt ? opt.value : null
			},
			onDurationPickerChange(e) {
				const idx = e.detail.value
				this.durationPickerIndex = idx
				const i = idx && idx[0] != null ? idx[0] : 0
				const opt = this.muteDurationOptions[i]
				this.selectedDuration = opt ? opt.value : null
			},
			confirmMuteDuration() {
				if (!this.currentMutedUser) {
					uni.showToast({ title: '请先选择用户', icon: 'none' })
					return
				}
				const idx = this.durationPickerIndex && this.durationPickerIndex[0]
				const opt = this.muteDurationOptions[idx != null ? idx : 0]
				this.selectedDuration = opt ? opt.value : null
				if (this.selectedDuration === null) {
					uni.showToast({ title: '请选择禁言时长', icon: 'none' })
					return
				}
				const operatorUserId = this.getOperatorUserId()
				if (!operatorUserId) {
					uni.showToast({ title: '缺少登录信息', icon: 'none' })
					return
				}
				const hdr = this.getAuthHeader()
				const payload = {
					userId: this.currentMutedUser.userId,
					duration: this.selectedDuration,
					operatorId: operatorUserId,
					operatorUserId
				}
				const onOk = () => {
					uni.showToast({ title: '禁言设置成功', icon: 'success' })
					this.closeActionPanel()
					this.loadMutedUsers()
				}
				uni.request({
					url: this.forumAdminUrl('/mute'),
					method: 'POST',
					header: hdr,
					data: payload,
					success: (res) => {
						if (res.data && (res.data.success === true || res.data.code === 200)) {
							onOk()
							return
						}
						uni.request({
							url: `${getApiBase()}/api/admin/mute`,
							method: 'POST',
							header: hdr,
							data: { userId: payload.userId, duration: payload.duration, operatorId: operatorUserId },
							success: (r2) => {
								if (r2.data && (r2.data.success === true || r2.data.code === 200)) onOk()
								else uni.showToast({ title: r2.data?.message || r2.data?.msg || '设置失败', icon: 'none' })
							},
							fail: () => { uni.showToast({ title: '网络错误', icon: 'none' }) }
						})
					},
					fail: () => { uni.showToast({ title: '网络错误', icon: 'none' }) }
				})
			},
			confirmUnmute() {
				if (!this.currentMutedUser) return
				uni.showModal({
					title: '确认解除禁言',
					content: `确定要解除用户 ${this.currentMutedUser.username} (ID: ${this.currentMutedUser.userId}) 的禁言状态吗？`,
					confirmColor: '#5d76bd',
					success: (res) => { if (res.confirm) this.executeUnmute() }
				})
			},
			executeUnmute() {
				const operatorUserId = this.getOperatorUserId()
				if (!operatorUserId) {
					uni.showToast({ title: '缺少登录信息', icon: 'none' })
					return
				}
				const hdr = this.getAuthHeader()
				const userId = this.currentMutedUser.userId
				const onOk = () => {
					uni.showToast({ title: '已解除禁言', icon: 'success' })
					this.closeActionPanel()
					this.loadMutedUsers()
				}
				uni.request({
					url: this.forumAdminUrl(`/unmute/${userId}?operatorUserId=${encodeURIComponent(String(operatorUserId))}`),
					method: 'POST',
					header: hdr,
					success: (res) => {
						if (res.data && (res.data.success === true || res.data.code === 200)) {
							onOk()
							return
						}
						uni.request({
							url: `${getApiBase()}/api/admin/unmute/${userId}`,
							method: 'POST',
							header: hdr,
							success: (r2) => {
								if (r2.data && (r2.data.success === true || r2.data.code === 200)) onOk()
								else uni.showToast({ title: r2.data?.message || r2.data?.msg || '操作失败', icon: 'none' })
							},
							fail: () => { uni.showToast({ title: '网络错误', icon: 'none' }) }
						})
					},
					fail: () => { uni.showToast({ title: '网络错误', icon: 'none' }) }
				})
			},
			confirmDeletePost(post) {
				uni.showModal({
					title: '确认删除',
					content: `确定要删除帖子"${post.title}"吗？此操作不可恢复。`,
					confirmColor: '#ff4d4f',
					success: (res) => { if (res.confirm) this.executeDeletePost(post) }
				})
			},
			normalizeUserForActions(u) {
				if (!u) return null
				const username = (u.nickname || u.username || u.phone || '用户') + ''
				return {
					userId: u.userId,
					username,
					phone: u.phone,
					email: u.email
				}
			},
			executeDeletePost(post) {
				const hdr = this.getAuthHeader()
				const operatorUserId = this.getOperatorUserId()
				if (!operatorUserId) {
					uni.showToast({ title: '缺少登录信息', icon: 'none' })
					return
				}
				const postId = post && (post.postId != null ? post.postId : post)
				const authorUserId = post && post.userId != null ? post.userId : null
				if (postId == null || postId === '') {
					uni.showToast({ title: '帖子信息无效', icon: 'none' })
					return
				}
				const onDeleteSuccess = () => {
					uni.showToast({ title: '删除成功', icon: 'success' })
					const idStr = String(postId)
					this.postList = this.postList.filter(p => String(p.postId) !== idStr)
				}
				const showDeleteError = (res) => {
					const msg = res?.data?.message || res?.data?.msg || '删除失败'
					uni.showToast({ title: msg, icon: 'none' })
				}
				const isDeleteOk = (res) => {
					if (!res || res.statusCode !== 200 || !res.data) return false
					return res.data.success === true || res.data.code === 200
				}
				const requestForumDelete = () => {
					if (authorUserId == null || authorUserId === '') {
						uni.showToast({ title: '缺少作者信息，请刷新列表后重试', icon: 'none' })
						return
					}
					uni.request({
						url: `${getApiBase()}/api/forum/post/delete/${encodeURIComponent(String(postId))}?userId=${encodeURIComponent(String(authorUserId))}`,
						method: 'DELETE',
						header: hdr,
						success: (res) => {
							if (isDeleteOk(res)) onDeleteSuccess()
							else showDeleteError(res)
						},
						fail: () => { uni.showToast({ title: '网络错误', icon: 'none' }) }
					})
				}
				const tryAdminDelete = (adminUrl) => {
					uni.request({
						url: adminUrl,
						method: 'DELETE',
						header: hdr,
						success: (res) => {
							if (isDeleteOk(res)) onDeleteSuccess()
							else requestForumDelete()
						},
						fail: () => { requestForumDelete() }
					})
				}
				const base = getApiBase()
				const op = encodeURIComponent(String(operatorUserId))
				const pid = encodeURIComponent(String(postId))
				tryAdminDelete(`${base}/api/admin/forum/delete-post?operatorUserId=${op}&postId=${pid}`)
			},
			openAdminAction(admin) {
				if (!admin || !admin.userId) return
				uni.showActionSheet({
					itemList: ['降级为普通用户'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.confirmDemote(admin)
						}
					}
				})
			},
			confirmDemote(admin) {
				const operatorUserId = this.getOperatorUserId()
				if (!operatorUserId) {
					uni.showToast({ title: '缺少登录信息', icon: 'none' })
					return
				}
				uni.showModal({
					title: '确认降级',
					content: `确定将「${admin.nickname || admin.username || '管理员'}」降级为普通用户吗？`,
					confirmColor: '#ff4d4f',
					success: (res) => {
						if (res.confirm) {
							this.executeDemote(admin.userId, operatorUserId)
						}
					}
				})
			},
			executeDemote(userId, operatorUserId) {
				const hdr = this.getAuthHeader()
				uni.request({
					url: `${getApiBase()}/api/admin/forum/demote/${encodeURIComponent(String(userId))}?operatorUserId=${encodeURIComponent(String(operatorUserId))}`,
					method: 'POST',
					header: hdr,
					success: (res) => {
						if (res.statusCode === 200 && res.data && res.data.code === 200) {
							uni.showToast({ title: '已降级', icon: 'success' })
							this.loadAdminList()
						} else {
							uni.showToast({ title: res.data?.msg || '操作失败', icon: 'none' })
						}
					},
					fail: () => uni.showToast({ title: '网络错误', icon: 'none' }),
				})
			},
			openAdminPicker() {
				this.showAdminPicker = true
				this.adminPickerKeyword = ''
				this.adminPickerList = []
				this.adminPickerLoading = false
			},
			closeAdminPicker() {
				this.showAdminPicker = false
				this.adminPickerKeyword = ''
				this.adminPickerList = []
				this.adminPickerLoading = false
			},
			prefetchAdminPicker() {
				this.adminPickerKeyword = ''
				this.adminPickerList = []
			},
			onAdminPickerInput(e) {
				if (e && e.detail && typeof e.detail.value === 'string') {
					this.adminPickerKeyword = e.detail.value
				}
				const k = this.adminPickerKeyword.trim()
				if (!k) {
					this.adminPickerList = []
					return
				}
				this.scheduleSuggest(k, 'picker')
			},
			fetchStudentSuggest(keyword) {
				const operatorUserId = this.getOperatorUserId()
				if (!operatorUserId) {
					this.adminPickerLoading = false
					this.adminPickerList = []
					uni.showToast({ title: '请先登录管理员账号', icon: 'none' })
					return
				}
				const seq = ++this.adminPickerSeq
				this.adminPickerLoading = true
				const hdr = this.getAuthHeader()
				uni.request({
					url: this.forumAdminUrl('/user-suggest'),
					method: 'GET',
					header: hdr,
					data: { operatorUserId, keyword, limit: 12, role: 1 },
					success: (res) => {
						if (seq !== this.adminPickerSeq) return
						if (res.statusCode === 200 && res.data && res.data.code === 200 && Array.isArray(res.data.data)) {
							this.adminPickerList = this.mapUserSuggestList(res.data.data, 12)
							return
						}
						this.adminPickerList = []
						const c = res && res.data && res.data.code
						if ((c === 401 || c === 403) && !this.adminPickerAuthWarned) {
							this.adminPickerAuthWarned = true
							uni.showToast({ title: res.data?.msg || '无管理员权限', icon: 'none' })
						}
					},
					fail: () => {
						if (seq !== this.adminPickerSeq) return
						this.adminPickerList = []
					},
					complete: () => {
						if (seq !== this.adminPickerSeq) return
						this.adminPickerLoading = false
					}
				})
			},
			confirmPromote(u) {
				if (!u || !u.userId) return
				const operatorUserId = this.getOperatorUserId()
				if (!operatorUserId) {
					uni.showToast({ title: '缺少登录信息', icon: 'none' })
					return
				}
				uni.showModal({
					title: '确认添加管理员',
					content: `确定将「${u.nickname || u.username || u.phone || '用户'}」升级为管理员吗？`,
					confirmColor: '#5d76bd',
					success: (res) => {
						if (res.confirm) this.executePromote(u.userId, operatorUserId)
					}
				})
			},
			executePromote(userId, operatorUserId) {
				const hdr = this.getAuthHeader()
				uni.request({
					url: `${getApiBase()}/api/admin/forum/promote/${encodeURIComponent(String(userId))}?operatorUserId=${encodeURIComponent(String(operatorUserId))}`,
					method: 'POST',
					header: hdr,
					success: (res) => {
						if (res.statusCode === 200 && res.data && res.data.code === 200) {
							uni.showToast({ title: '已添加', icon: 'success' })
							this.closeAdminPicker()
							this.loadAdminList()
						} else {
							uni.showToast({ title: res.data?.msg || '操作失败', icon: 'none' })
						}
					},
					fail: () => uni.showToast({ title: '网络错误', icon: 'none' }),
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.manager-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f0f3f9;
	}

	.nav-bar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 22rpx;
		background: #ffffff;
		box-shadow: 0 4rpx 20rpx rgba(93, 118, 189, 0.12), 0 2rpx 8rpx rgba(93, 118, 189, 0.06);

		.nav-left {
			flex-shrink: 0;

			.back-btn {
				box-sizing: border-box;
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				background: rgba(240, 242, 245, 0.8);
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s ease;

				&:active {
					transform: scale(0.95);
					background: rgba(230, 232, 235, 0.9);
				}
			}

			.back-icon {
				font-size: 32rpx;
				font-weight: 600;
				color: #333333;
				margin-right: 4rpx;
			}
		}

		.nav-title {
			flex: 1;
			text-align: center;
			font-size: 34rpx;
			font-weight: 700;
			color: #2d3748;
		}

		.nav-right {
			width: 72rpx;
			height: 72rpx;
			flex-shrink: 0;
		}
	}

	.page-content {
		flex: 1;
		min-height: 0;
		box-sizing: border-box;
		padding: 28rpx;
		padding-bottom: calc(28rpx + env(safe-area-inset-bottom));
	}

	.section-card {
		background: #ffffff;
		border-radius: 28rpx;
		padding: 28rpx 24rpx 48rpx;
		margin-bottom: 28rpx;
		box-shadow: 0 8rpx 32rpx rgba(93, 118, 189, 0.1), 0 2rpx 8rpx rgba(93, 118, 189, 0.05), inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 24rpx;
			right: 24rpx;
			height: 1rpx;
			background: rgba(255, 255, 255, 0.5);
		}
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid rgba(93, 118, 189, 0.1);

		.section-title {
			font-size: 30rpx;
			font-weight: 700;
			color: #2d3748;
		}

		.admin-count {
			font-size: 24rpx;
			color: #718096;
			font-weight: 500;
		}
	}

	.refresh-btn {
		width: 56rpx;
		height: 56rpx;
		border-radius: 50%;
		background: #f0f4fa;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;

		&:active {
			transform: rotate(180deg);
			background: #e0e4f0;
		}

		.refresh-icon {
			font-size: 28rpx;
			color: #5d76bd;
			font-weight: 600;
		}
	}

	.search-container {
		display: flex;
		gap: 16rpx;
		margin-bottom: 24rpx;
		position: relative;
	}

	.suggest-dropdown {
		margin-top: -8rpx;
		background: #ffffff;
		border-radius: 18rpx;
		border: 1rpx solid rgba(93, 118, 189, 0.12);
		box-shadow: 0 10rpx 26rpx rgba(93, 118, 189, 0.16);
		overflow: hidden;
	}

	.suggest-item {
		display: flex;
		align-items: center;
		padding: 18rpx 18rpx;
		transition: background 0.2s ease;

		&:active {
			background: #f0f4fa;
		}
	}

	.suggest-avatar {
		width: 56rpx;
		height: 56rpx;
		background: #5d76bd;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;

		.avatar-text {
			font-size: 24rpx;
			color: #ffffff;
			font-weight: 700;
		}
	}

	.suggest-info {
		flex: 1;
		margin-left: 14rpx;
		min-width: 0;
	}

	.suggest-name {
		display: block;
		font-size: 26rpx;
		font-weight: 600;
		color: #2d3748;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.suggest-meta {
		display: block;
		margin-top: 4rpx;
		font-size: 22rpx;
		color: #718096;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.suggest-empty,
	.suggest-loading {
		padding: 18rpx 18rpx;
		text-align: center;
	}

	.suggest-empty-text,
	.suggest-loading-text {
		font-size: 24rpx;
		color: #a0aec0;
	}

	.search-input-wrap {
		flex: 1;
		display: flex;
		align-items: center;
		background: #f7f9fc;
		border-radius: 16rpx;
		padding: 0 24rpx;
		border: 2rpx solid rgba(93, 118, 189, 0.1);
		transition: all 0.2s ease;

		&:focus-within {
			border-color: #5d76bd;
			background: #ffffff;
		}

		.search-icon {
			font-size: 32rpx;
			margin-right: 12rpx;
		}

		.search-input {
			flex: 1;
			height: 80rpx;
			font-size: 28rpx;
			color: #2d3748;
			background: transparent;
		}
	}

	.search-btn {
		padding: 0 32rpx;
		height: 80rpx;
		background: linear-gradient(135deg, #5d76bd 0%, #7c8fd6 100%);
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 6rpx 16rpx rgba(93, 118, 189, 0.35);
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.98);
			box-shadow: 0 4rpx 12rpx rgba(93, 118, 189, 0.25);
		}

		.search-btn-text {
			font-size: 28rpx;
			font-weight: 600;
			color: #ffffff;
		}
	}

	.search-result {
		margin-top: 16rpx;
	}

	.result-title {
		font-size: 26rpx;
		font-weight: 600;
		color: #4a5568;
		display: block;
		margin-bottom: 16rpx;
	}

	.result-list {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}

	.result-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		background: #fafbfd;
		border-radius: 16rpx;
		border: 1rpx solid rgba(93, 118, 189, 0.08);
		transition: all 0.2s ease;

		&:active {
			background: #f0f4fa;
		}
	}

	.result-avatar {
		width: 64rpx;
		height: 64rpx;
		background: #5d76bd;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;

		.avatar-text {
			font-size: 26rpx;
			color: #ffffff;
			font-weight: 700;
		}
	}

	.result-info {
		flex: 1;
		margin-left: 16rpx;
		min-width: 0;

		.result-name {
			font-size: 28rpx;
			color: #2d3748;
			font-weight: 600;
			display: block;
		}

		.result-id {
			font-size: 22rpx;
			color: #718096;
			display: block;
			margin-top: 4rpx;
		}

		.result-phone {
			font-size: 22rpx;
			color: #718096;
			display: block;
			margin-top: 4rpx;
		}
	}

	.result-action {
		padding: 12rpx 24rpx;
		background: #fff5e6;
		border-radius: 14rpx;
		border: 1rpx solid #ffd591;
		flex-shrink: 0;

		.action-text {
			font-size: 24rpx;
			font-weight: 600;
			color: #fa8c16;
		}
	}

	.search-hint {
		padding: 40rpx 20rpx;
		text-align: center;
	}

	.hint-text {
		font-size: 26rpx;
		color: #a0aec0;
	}

	.admin-list-row {
		display: flex;
		gap: 16rpx;
		justify-content: space-between;
		margin-bottom: 24rpx;
	}

	.admin-list-row:last-child {
		margin-bottom: 0;
	}

	.admin-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.admin-avatar {
		width: 96rpx;
		height: 96rpx;
		background: linear-gradient(135deg, #5d76bd 0%, #7c8fd6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 20rpx rgba(93, 118, 189, 0.35), inset 0 2rpx 0 rgba(255, 255, 255, 0.25);
		overflow: hidden;

		.avatar-text {
			font-size: 32rpx;
			color: #ffffff;
			font-weight: 700;
		}
	}

	.admin-avatar-img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.admin-name {
		font-size: 22rpx;
		color: #4a5568;
		text-align: center;
		max-width: 100rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.admin-add-avatar {
		background: #f7f9fc;
		border: 2rpx dashed rgba(93, 118, 189, 0.4);
		box-shadow: none;
	}

	.admin-add-plus {
		font-size: 44rpx;
		font-weight: 600;
		color: #5d76bd;
		margin-top: -6rpx;
	}

	.admin-picker {
		max-height: 72vh;
	}

	.picker-search {
		margin-bottom: 16rpx;
	}

	.picker-input {
		margin-bottom: 0;
	}

	.picker-list {
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.picker-item {
		display: flex;
		align-items: center;
		padding: 16rpx 12rpx;
		border-radius: 14rpx;
		background: #fafbfd;
		border: 1rpx solid rgba(93, 118, 189, 0.08);

		&:active {
			background: #f0f4fa;
		}
	}

	.muted-dropdown, .post-dropdown {
		border-radius: 20rpx;
		overflow: hidden;
	}

	.dropdown-header {
		display: flex;
		align-items: center;
		padding: 20rpx 24rpx;
		background: #f7f9fc;
		border-radius: 20rpx;
		transition: all 0.2s ease;

		&:active {
			background: #eef1f7;
		}

		.dropdown-label {
			flex: 1;
			font-size: 28rpx;
			font-weight: 600;
			color: #2d3748;
		}

		.dropdown-count {
			font-size: 24rpx;
			color: #718096;
			margin-right: 12rpx;
		}

		.dropdown-arrow {
			font-size: 22rpx;
			color: #718096;
			transition: transform 0.2s ease;

			&.rotated {
				transform: rotate(180deg);
			}
		}
	}

	.dropdown-content {
		margin-top: 16rpx;
	}

	.muted-list {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}

	.muted-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		background: #fafbfd;
		border-radius: 16rpx;
		border: 1rpx solid rgba(93, 118, 189, 0.08);
		transition: all 0.2s ease;

		&:active {
			background: #f0f4fa;
		}
	}

	.muted-user-info {
		display: flex;
		align-items: center;
		gap: 16rpx;
		flex: 1;
		min-width: 0;
	}

	.muted-avatar {
		width: 64rpx;
		height: 64rpx;
		background: #5d76bd;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;

		.avatar-text {
			font-size: 26rpx;
			color: #ffffff;
			font-weight: 700;
		}
	}

	.muted-detail {
		display: flex;
		flex-direction: column;
		min-width: 0;

		.muted-name {
			font-size: 28rpx;
			color: #2d3748;
			font-weight: 600;
		}

		.muted-id {
			font-size: 22rpx;
			color: #718096;
			margin-top: 4rpx;
		}

		.muted-time {
			font-size: 22rpx;
			color: #fa8c16;
			margin-top: 4rpx;

			&.permanent {
				color: #ff4d4f;
			}
		}
	}

	.muted-actions {
		flex-shrink: 0;
		margin-left: 16rpx;
	}

	.action-btn {
		padding: 12rpx 24rpx;
		border-radius: 14rpx;
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.95);
		}

		.btn-text {
			font-size: 24rpx;
			font-weight: 600;
		}

		&.modify-btn {
			background: #fff5e6;
			border: 1rpx solid #ffd591;

			.btn-text {
				color: #fa8c16;
			}

			&:active {
				background: #ffe7ba;
			}
		}

		&.delete-btn {
			background: #fff1f0;
			border: 1rpx solid #ffccc7;

			.btn-text {
				color: #ff4d4f;
			}

			&:active {
				background: #ffdede;
			}
		}
	}

	.post-list {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}

	.post-item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		background: #fafbfd;
		border-radius: 16rpx;
		border: 1rpx solid rgba(93, 118, 189, 0.08);
		transition: all 0.2s ease;

		&:active {
			background: #f0f4fa;
		}
	}

	.post-content {
		flex: 1;
		margin-right: 16rpx;
		min-width: 0;

		.post-title {
			font-size: 28rpx;
			font-weight: 600;
			color: #2d3748;
			display: block;
			margin-bottom: 8rpx;
		}

		.post-author {
			font-size: 22rpx;
			color: #718096;
			display: block;
			margin-bottom: 8rpx;
		}

		.post-preview {
			font-size: 24rpx;
			color: #4a5568;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			line-height: 1.5;
		}
	}

	.post-actions {
		flex-shrink: 0;
		display: flex;
		align-items: flex-start;
	}

	.empty-state {
		padding: 40rpx 20rpx;
		text-align: center;
	}

	.empty-text {
		font-size: 26rpx;
		color: #a0aec0;
	}

	.action-panel-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.action-panel {
		width: 600rpx;
		max-height: 80vh;
		background: #ffffff;
		border-radius: 28rpx;
		overflow: hidden;
		box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.3);
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 32rpx;
		border-bottom: 1rpx solid rgba(93, 118, 189, 0.1);

		.panel-title {
			font-size: 32rpx;
			font-weight: 700;
			color: #2d3748;
		}

		.panel-close {
			width: 56rpx;
			height: 56rpx;
			border-radius: 50%;
			background: #f0f4fa;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.2s ease;

			&:active {
				background: #e0e4f0;
				transform: scale(0.95);
			}

			.close-icon {
				font-size: 36rpx;
				color: #718096;
				font-weight: 400;
				line-height: 1;
			}
		}
	}

	.panel-content {
		padding: 28rpx 32rpx;
		overflow-y: auto;
		max-height: calc(80vh - 120rpx);
	}

	.panel-user-info {
		display: flex;
		align-items: center;
		gap: 20rpx;
		padding: 20rpx;
		background: #f7f9fc;
		border-radius: 16rpx;
		margin-bottom: 24rpx;

		.panel-avatar {
			width: 72rpx;
			height: 72rpx;
			background: #5d76bd;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;

			.avatar-text {
				font-size: 28rpx;
				color: #ffffff;
				font-weight: 700;
			}
		}

		.panel-user-detail {
			display: flex;
			flex-direction: column;

			.panel-username {
				font-size: 30rpx;
				color: #2d3748;
				font-weight: 600;
			}

			.panel-userid {
				font-size: 24rpx;
				color: #718096;
				margin-top: 4rpx;
			}
		}
	}

	.panel-actions {
		display: flex;
		gap: 16rpx;
		margin-bottom: 24rpx;
	}

	.panel-action-btn {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 28rpx 20rpx;
		border-radius: 20rpx;
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.98);
		}

		.action-icon {
			font-size: 40rpx;
			margin-bottom: 8rpx;
		}

		.action-text {
			font-size: 26rpx;
			font-weight: 600;
		}

		&.unmute-btn {
			background: #f0f9f0;
			border: 1rpx solid #b7eb8f;

			.action-icon {
				color: #52c41a;
			}

			.action-text {
				color: #52c41a;
			}
		}

		&.extend-btn {
			background: #fff5e6;
			border: 1rpx solid #ffd591;

			.action-icon {
				color: #fa8c16;
			}

			.action-text {
				color: #fa8c16;
			}
		}
	}

	.time-picker-section {
		padding-top: 20rpx;
		border-top: 1rpx solid rgba(93, 118, 189, 0.1);

		.picker-label {
			font-size: 26rpx;
			font-weight: 600;
			color: #2d3748;
			display: block;
			margin-bottom: 16rpx;
		}

		.duration-picker-view {
			width: 100%;
			height: 360rpx;
			margin-bottom: 12rpx;
		}

		.duration-picker-item {
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.duration-picker-text {
			font-size: 30rpx;
			color: #2d3748;
		}

		.picker-preview {
			display: block;
			text-align: center;
			font-size: 26rpx;
			color: #5d76bd;
			margin-bottom: 16rpx;
		}
	}

	.quick-options {
		display: flex;
		flex-wrap: wrap;
		gap: 12rpx;
		margin-bottom: 20rpx;
	}

	.quick-option {
		padding: 16rpx 24rpx;
		background: #f7f9fc;
		border-radius: 14rpx;
		border: 2rpx solid transparent;
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.98);
		}

		&.selected {
			background: #e8edf8;
			border-color: #5d76bd;

			.option-text {
				color: #5d76bd;
				font-weight: 600;
			}
		}

		.option-text {
			font-size: 24rpx;
			color: #4a5568;
		}
	}

	.picker-confirm {
		padding: 20rpx;
		background: #5d76bd;
		border-radius: 16rpx;
		text-align: center;
		transition: all 0.2s ease;
		box-shadow: 0 6rpx 20rpx rgba(93, 118, 189, 0.35), inset 0 1rpx 0 rgba(255, 255, 255, 0.25);

		&:active {
			transform: scale(0.98);
			box-shadow: 0 4rpx 12rpx rgba(93, 118, 189, 0.25), inset 0 1rpx 0 rgba(255, 255, 255, 0.15);
		}

		.confirm-text {
			font-size: 28rpx;
			font-weight: 600;
			color: #ffffff;
		}
	}

	.loading-toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(0, 0, 0, 0.7);
		padding: 32rpx 48rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 2000;

		.loading-spinner {
			width: 48rpx;
			height: 48rpx;
			border: 4rpx solid rgba(255, 255, 255, 0.3);
			border-top-color: #ffffff;
			border-radius: 50%;
			animation: spin 0.8s linear infinite;
			margin-bottom: 16rpx;
		}

		.loading-text {
			font-size: 26rpx;
			color: #ffffff;
		}
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.theme-dark {
		background: #1a1c23;

		.nav-bar {
			background: #252830;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.3);

			.nav-title { color: #f0f2f8; }

			.back-btn {
				background: rgba(60, 64, 72, 0.8);
				.back-icon { color: #e0e0e0; }
			}
		}

		.section-card {
			background: #252830;
			box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.25), 0 2rpx 8rpx rgba(0, 0, 0, 0.15), inset 0 1rpx 0 rgba(255, 255, 255, 0.03);
		}

		.section-header {
			border-bottom-color: rgba(255, 255, 255, 0.08);
			.section-title { color: #f0f2f8; }
			.admin-count { color: #8a92a8; }
		}

		.refresh-btn {
			background: #2e323c;
			&:active { background: #363b47; }
			.refresh-icon { color: #8ea9ff; }
		}

		.search-input-wrap {
			background: #2e323c;
			border-color: rgba(255, 255, 255, 0.08);
			&:focus-within {
				border-color: #8ea9ff;
				background: #252830;
			}
			.search-input { color: #f0f2f8; }
		}

		.search-btn {
			background: linear-gradient(135deg, #5d76bd 0%, #7c8fd6 100%);
		}

		.result-title { color: #a0aec0; }

		.result-item {
			background: #2e323c;
			border-color: rgba(255, 255, 255, 0.06);
			&:active { background: #363b47; }
		}

		.result-name { color: #f0f2f8; }
		.result-id, .result-phone { color: #8a92a8; }

		.result-action {
			background: rgba(250, 140, 22, 0.15);
			border-color: rgba(255, 181, 107, 0.3);
			.action-text { color: #ffb56b; }
		}

		.hint-text { color: #5a6270; }

		.admin-name { color: #a0aec0; }

		.dropdown-header {
			background: #2e323c;
			&:active { background: #363b47; }
			.dropdown-label { color: #f0f2f8; }
			.dropdown-count, .dropdown-arrow { color: #8a92a8; }
		}

		.muted-item, .post-item {
			background: #2e323c;
			border-color: rgba(255, 255, 255, 0.06);
			&:active { background: #363b47; }
		}

		.muted-name, .post-title { color: #f0f2f8; }
		.muted-id, .muted-time, .post-author, .post-preview { color: #8a92a8; }

		.muted-time {
			color: #ffb56b;
			&.permanent { color: #ff9696; }
		}

		.action-btn {
			&.modify-btn {
				background: rgba(250, 140, 22, 0.15);
				border-color: rgba(255, 181, 107, 0.3);
				&:active { background: rgba(250, 140, 22, 0.25); }
				.btn-text { color: #ffb56b; }
			}
			&.delete-btn {
				background: rgba(255, 77, 79, 0.15);
				border-color: rgba(255, 150, 150, 0.3);
				&:active { background: rgba(255, 77, 79, 0.25); }
				.btn-text { color: #ff9696; }
			}
		}

		.empty-text { color: #5a6270; }

		.action-panel { background: #252830; }

		.panel-header {
			border-bottom-color: rgba(255, 255, 255, 0.08);
			.panel-title { color: #f0f2f8; }
			.panel-close {
				background: #2e323c;
				&:active { background: #363b47; }
				.close-icon { color: #8a92a8; }
			}
		}

		.panel-user-info {
			background: #2e323c;
			.panel-username { color: #f0f2f8; }
			.panel-userid { color: #8a92a8; }
		}

		.panel-action-btn {
			&.unmute-btn {
				background: rgba(82, 196, 26, 0.15);
				border-color: rgba(82, 196, 26, 0.3);
				.action-icon, .action-text { color: #73d13d; }
			}
			&.extend-btn {
				background: rgba(250, 140, 22, 0.15);
				border-color: rgba(255, 181, 107, 0.3);
				.action-icon, .action-text { color: #ffb56b; }
			}
		}

		.picker-label { color: #a0aec0; }

		.quick-option {
			background: #2e323c;
			&.selected {
				background: rgba(93, 118, 189, 0.3);
				border-color: #8ea9ff;
				.option-text { color: #8ea9ff; }
			}
			.option-text { color: #a0aec0; }
		}

		.picker-confirm { background: #5d76bd; }
	}
</style>
