<template>
	<view class="friend-page" :class="themeClass">
		<view class="top-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="page-title">好友</text>
			<view class="top-bar-placeholder"></view>
		</view>

		<view class="tab-bar">
			<view
				v-for="tab in tabs"
				:key="tab.key"
				class="tab-pill"
				:class="{ active: activeTab === tab.key }"
				@click="activeTab = tab.key"
			>
				<text class="tab-pill__text">{{ tab.label }}</text>
				<text class="tab-pill__badge" v-if="tab.count > 0">{{ tab.count }}</text>
			</view>
		</view>

		<scroll-view class="page-scroll" scroll-y :show-scrollbar="false">
			<template v-if="activeTab === 'requests'">
				<view class="section-card">
					<view class="section-head">
						<text class="section-title">收到的申请</text>
						<text class="section-subtitle">{{ incomingRequests.length }} 条</text>
					</view>
					<view
						v-for="item in incomingRequests"
						:key="`incoming_${item.requestId}`"
						class="request-item"
					>
						<image class="avatar" :src="avatarUrl(item.fromAvatar)" mode="aspectFill"></image>
						<view class="item-main">
							<view class="item-head">
								<text class="user-name">{{ item.fromNickname || '用户' }}</text>
								<text class="time-text">{{ formatTime(item.createTime) }}</text>
							</view>
							<text class="item-desc text-wrap-safe">申请添加你为好友</text>
						</view>
						<view class="pill-actions">
							<view class="pill-btn muted" @click.stop="respondIncoming(item, false)">忽略</view>
							<view class="pill-btn" @click.stop="respondIncoming(item, true)">通过</view>
						</view>
					</view>
					<view class="empty-state" v-if="incomingRequests.length === 0">
						<text class="empty-title">还没有收到新的好友申请</text>
						<text class="empty-desc">别人申请加你好友后，会显示在这里。</text>
					</view>
				</view>

				<view class="section-card">
					<view class="section-head">
						<text class="section-title">发出的申请</text>
						<text class="section-subtitle">{{ outgoingRequests.length }} 条</text>
					</view>
					<view
						v-for="item in outgoingRequests"
						:key="`outgoing_${item.requestId}`"
						class="request-item"
					>
						<image class="avatar" :src="avatarUrl(item.toAvatar)" mode="aspectFill"></image>
						<view class="item-main">
							<view class="item-head">
								<text class="user-name">{{ item.toNickname || '用户' }}</text>
								<text class="time-text">{{ formatTime(item.createTime) }}</text>
							</view>
							<text class="item-desc text-wrap-safe">已向对方发出好友申请，等待通过</text>
						</view>
						<view class="single-status">
							<text class="single-status__text">等待通过</text>
						</view>
					</view>
					<view class="empty-state" v-if="outgoingRequests.length === 0">
						<text class="empty-title">你还没有发出好友申请</text>
						<text class="empty-desc">去论坛逛逛，遇到想联系的人就可以添加好友。</text>
					</view>
				</view>
			</template>

			<template v-else>
				<view class="section-card">
					<view class="section-head">
						<text class="section-title">好友列表</text>
						<text class="section-subtitle">{{ friends.length }} 位好友</text>
					</view>
					<view
						v-for="item in friends"
						:key="item.userId"
						class="friend-item"
						@click="goPrivateChat(item)"
					>
						<image class="avatar" :src="avatarUrl(item.avatar)" mode="aspectFill"></image>
						<view class="item-main">
							<view class="item-head">
								<view class="name-row">
									<text class="user-name">{{ item.nickname || '用户' }}</text>
									<text class="tag-text" v-if="item.tagText">{{ item.tagText }}</text>
								</view>
							</view>
							<text class="item-desc text-wrap-safe">ID: {{ item.userId || item.id }}</text>
						</view>
					</view>
					<view class="empty-state" v-if="friends.length === 0">
						<text class="empty-title">你还没有好友</text>
						<text class="empty-desc">通过好友申请或从个人名片页添加好友后，会出现在这里。</text>
					</view>
				</view>
			</template>
		</scroll-view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { BASE_URL } from '@/api/config.js'
	import {
		getForumIncomingFriendRequests,
		getForumOutgoingFriendRequests,
		getForumAcceptedFriends,
		respondForumFriendRequest,
	} from '@/api/forum.js'

	const DEFAULT_AVATAR = '/static/default-avatar.jpg'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				activeTab: 'requests',
				incomingRequests: [],
				outgoingRequests: [],
				friends: [],
			}
		},
		computed: {
			tabs() {
				return [
					{
						key: 'requests',
						label: '好友申请',
						count: this.incomingRequests.length + this.outgoingRequests.length,
					},
					{
						key: 'friends',
						label: '好友列表',
						count: this.friends.length,
					},
				]
			},
		},
		onShow() {
			this.reload()
		},
		methods: {
			avatarUrl(raw) {
				if (!raw) return DEFAULT_AVATAR
				const s = String(raw)
				if (s.startsWith('http') || s.startsWith('data:') || s.startsWith('/static')) return s
				const base = String(BASE_URL || '').replace(/\/$/, '')
				const path = s.startsWith('/') ? s : `/${s}`
				return base + path
			},
			formatNickname(nickname) {
				if (!nickname) return '用户'
				const s = String(nickname)
				if (s.length > 4) {
					return s.substring(0, 4) + '...'
				}
				return s
			},
			formatTime(t) {
				if (typeof t === 'string') return t.substring(0, 16).replace('T', ' ')
				return ''
			},
			async reload() {
				const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = u.userId || u.id
				if (!uid) {
					return
				}
				try {
					const [incRes, outRes, accRes] = await Promise.all([
						getForumIncomingFriendRequests(uid),
						getForumOutgoingFriendRequests(uid),
						getForumAcceptedFriends(uid),
					])
					const inList = (incRes && incRes.data) || []
					const outList = (outRes && outRes.data) || []
					const okList = (accRes && accRes.data) || []
					this.incomingRequests = Array.isArray(inList)
						? inList
						: []
					this.outgoingRequests = Array.isArray(outList)
						? outList
						: []
					this.friends = Array.isArray(okList)
						? okList.map((f) => ({
							...f,
							nickname: f.nickname || f.name || '用户',
						}))
						: []
				} catch (_) {
					this.incomingRequests = []
					this.outgoingRequests = []
					this.friends = []
				}
			},
			async respondIncoming(item, accept) {
				const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = u.userId || u.id
				if (!uid || !item || item.requestId == null) return
				if (String(item.requestId).startsWith('mock_')) {
					const next = this.incomingRequests.filter((p) => p.requestId !== item.requestId)
					this.incomingRequests = next
					uni.showToast({ title: accept ? '已通过（离线）' : '已忽略（离线）', icon: 'none' })
					return
				}
				try {
					await respondForumFriendRequest(Number(item.requestId), Number(uid), accept)
					uni.showToast({ title: accept ? '已添加好友' : '已忽略', icon: 'none' })
					await this.reload()
				} catch (e) {
					const msg = (e && (e.message || e.errMsg)) || '操作失败'
					uni.showToast({ title: String(msg), icon: 'none' })
				}
			},
			goBack() {
				uni.navigateBack({
					animationType: 'slide-out-right',
					animationDuration: 300,
				})
			},
			goPrivateChat(item) {
				const nameParam = encodeURIComponent(item.name || item.nickname || '')
				const userIdParam = encodeURIComponent(String(item.userId || item.id || ''))
				const avatarParam = encodeURIComponent(this.avatarUrl(item.avatar))
				uni.navigateTo({
					url: `/subPages/forum/privateChat?userId=${userIdParam}&name=${nameParam}&avatar=${avatarParam}`,
					animationType: 'slide-in-right',
					animationDuration: 300,
				})
			},
		},
	}
</script>

<style lang="scss">
	.friend-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f8f9fc;
	}

	.top-bar {
		padding: calc(var(--status-bar-height) + 20rpx) 30rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20rpx);
		box-shadow:
			0 2rpx 12rpx rgba(93, 118, 189, 0.08),
			0 4rpx 20rpx rgba(93, 118, 189, 0.05);
		border-bottom: 1rpx solid rgba(93, 118, 189, 0.08);
	}

	.back-btn,
	.top-bar-placeholder {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-btn {
		background: #ffffff;
		border-radius: 50%;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.back-icon {
		font-size: 40rpx;
		line-height: 1;
		color: #4a5568;
		font-weight: 600;
	}

	.page-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #4a5568;
	}

	.page-scroll {
		flex: 1;
		min-height: 0;
	}

	.tab-bar {
		display: flex;
		gap: 18rpx;
		padding: 24rpx 30rpx 8rpx;
	}

	.tab-pill {
		flex: 1;
		height: 82rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.96);
		box-shadow:
			0 2rpx 8rpx rgba(93, 118, 189, 0.08),
			0 8rpx 24rpx rgba(93, 118, 189, 0.1),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
		border: 2rpx solid rgba(93, 118, 189, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
		transition: all 0.2s ease;
	}

	.tab-pill.active {
		background: #5d76bd;
		border-color: #5d76bd;
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.35),
			0 12rpx 32rpx rgba(93, 118, 189, 0.25),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.25);
	}

	.tab-pill__text {
		font-size: 28rpx;
		font-weight: 700;
		color: #4a5568;
	}

	.tab-pill.active .tab-pill__text {
		color: #ffffff;
	}

	.tab-pill__badge {
		min-width: 34rpx;
		height: 34rpx;
		padding: 0 10rpx;
		border-radius: 999rpx;
		background: rgba(93, 118, 189, 0.12);
		font-size: 20rpx;
		font-weight: 700;
		color: #5d76bd;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.5);
	}

	.tab-pill.active .tab-pill__badge {
		background: rgba(255, 255, 255, 0.25);
		color: #ffffff;
		box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.4);
	}

	.section-card {
		background: #ffffff;
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.08),
			0 12rpx 32rpx rgba(93, 118, 189, 0.1);
		border-radius: 24rpx;
		border: 1rpx solid rgba(93, 118, 189, 0.08);
	}

	.section-card {
		margin: 28rpx 30rpx 0;
		padding: 10rpx 24rpx;
	}

	.section-head {
		padding: 20rpx 6rpx 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.section-title {
		display: block;
		font-size: 30rpx;
		font-weight: 700;
		color: #4a5568;
	}

	.section-subtitle {
		font-size: 22rpx;
		color: #8a92a8;
	}

	.request-item,
	.friend-item {
		display: flex;
		align-items: center;
		gap: 18rpx;
		padding: 24rpx 6rpx;
		border-top: 1rpx solid rgba(93, 118, 189, 0.1);
	}

	.avatar {
		width: 88rpx;
		height: 88rpx;
		border-radius: 28rpx;
		background: #ffffff;
		flex-shrink: 0;
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.35),
			0 8rpx 24rpx rgba(93, 118, 189, 0.2),
			inset 0 2rpx 4rpx rgba(255, 255, 255, 0.25),
			inset 0 -2rpx 4rpx rgba(0, 0, 0, 0.08);
		border: 2rpx solid rgba(255, 255, 255, 0.4);
	}

	.item-main {
		flex: 1;
		min-width: 0;
	}

	.item-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
	}

	.name-row {
		display: flex;
		align-items: center;
		gap: 10rpx;
		min-width: 0;
	}

	.user-name {
		font-size: 30rpx;
		font-weight: 700;
		color: #2d3748;
	}

	.tag-text {
		padding: 6rpx 14rpx;
		border-radius: 999rpx;
		background: rgba(93, 118, 189, 0.12);
		font-size: 20rpx;
		color: #5d76bd;
		font-weight: 500;
		box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.5);
	}

	.time-text {
		font-size: 22rpx;
		color: #8a92a8;
		flex-shrink: 0;
	}

	.item-desc {
		display: block;
		margin-top: 10rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #64748b;
	}

	.pill-actions {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
		flex-shrink: 0;
		align-items: flex-end;
	}

	.pill-btn {
		padding: 14rpx 24rpx;
		border-radius: 999rpx;
		background: #5d76bd;
		font-size: 22rpx;
		font-weight: 700;
		color: #ffffff;
		flex-shrink: 0;
		box-shadow:
			0 4rpx 12rpx rgba(93, 118, 189, 0.35),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.25);
	}

	.pill-btn.muted {
		background: rgba(148, 163, 184, 0.2);
		color: #64748b;
		box-shadow:
			0 2rpx 6rpx rgba(0, 0, 0, 0.08),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.4);
	}

	.single-status {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 8rpx;
	}

	.single-status__text {
		padding: 12rpx 20rpx;
		border-radius: 999rpx;
		background: rgba(93, 118, 189, 0.12);
		font-size: 22rpx;
		font-weight: 700;
		color: #5d76bd;
		box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.5);
	}

	.empty-state {
		padding: 50rpx 10rpx 42rpx;
		text-align: center;
		border-top: 1rpx solid rgba(93, 118, 189, 0.1);
	}

	.empty-title {
		display: block;
		font-size: 28rpx;
		font-weight: 700;
		color: #4a5568;
	}

	.empty-desc {
		display: block;
		margin-top: 10rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #8a92a8;
	}

	.theme-dark .pill-btn.muted {
		background: rgba(255, 255, 255, 0.08);
		color: #aeb8ca;
		box-shadow:
			0 2rpx 6rpx rgba(0, 0, 0, 0.2),
			inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
	}

	.theme-dark.friend-page {
		background: #1a1c23;
	}

	.theme-dark {
		.top-bar {
			background: rgba(26, 28, 35, 0.95);
			border-bottom-color: rgba(255, 255, 255, 0.06);
			box-shadow:
				0 2rpx 12rpx rgba(0, 0, 0, 0.2);
		}

		.tab-pill {
			background: #252830;
			box-shadow:
				0 2rpx 8rpx rgba(0, 0, 0, 0.25),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
			border-color: rgba(255, 255, 255, 0.08);
		}

		.tab-pill.active {
			background: #5d76bd;
			border-color: #5d76bd;
			box-shadow:
				0 4rpx 12rpx rgba(93, 118, 189, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.15);
		}

		.tab-pill__text,
		.empty-title,
		.section-subtitle {
			color: #eef1f8;
		}

		.tab-pill__badge {
			background: rgba(93, 118, 189, 0.2);
			color: #8ea9ff;
			box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
		}

		.tab-pill.active .tab-pill__badge {
			background: rgba(255, 255, 255, 0.25);
			color: #ffffff;
		}

		.back-icon,
		.page-title,
		.section-title,
		.user-name {
			color: #eef1f8;
		}

		.section-card {
			background: #252830;
			box-shadow:
				0 4rpx 12rpx rgba(0, 0, 0, 0.25),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
			border-color: rgba(255, 255, 255, 0.08);
		}

		.time-text,
		.item-desc,
		.empty-desc {
			color: #8a92a8;
		}

		.request-item,
		.friend-item,
		.empty-state {
			border-top-color: rgba(255, 255, 255, 0.08);
		}

		.avatar {
			background: #ffffff;
			box-shadow:
				0 4rpx 12rpx rgba(93, 118, 189, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.15);
			border-color: rgba(255, 255, 255, 0.15);
		}

		.tag-text {
			background: rgba(93, 118, 189, 0.2);
			color: #8ea9ff;
			box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
		}

		.single-status__text {
			background: rgba(93, 118, 189, 0.2);
			color: #8ea9ff;
			box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
		}

		.pill-btn {
			background: #5d76bd;
			box-shadow:
				0 4rpx 12rpx rgba(93, 118, 189, 0.3),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.15);
		}
	}
</style>
