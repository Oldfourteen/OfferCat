<template>
	<view class="friend-page" :class="themeClass">
		<view class="top-bar">
			<view class="back-btn" @click="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="page-title">好友</text>
			<view class="top-bar-placeholder"></view>
		</view>

		<scroll-view class="page-scroll" scroll-y :show-scrollbar="false">
			<view class="section-card">
				<view class="section-head">
					<text class="section-title">好友申请</text>
				</view>
				<view
					v-for="item in pendingFriends"
					:key="item.requestId"
					class="request-item"
				>
					<image class="avatar" :src="avatarUrl(item.fromAvatar)" mode="aspectFill"></image>
					<view class="item-main">
						<view class="item-head">
							<text class="user-name">{{ item.fromNickname }}</text>
							<text class="time-text">{{ formatTime(item.createTime) }}</text>
						</view>
						<text class="item-desc text-wrap-safe">{{ item.desc }}</text>
					</view>
					<view class="pill-actions">
						<view class="pill-btn muted" @click.stop="respondIncoming(item, false)">忽略</view>
						<view class="pill-btn" @click.stop="respondIncoming(item, true)">通过</view>
					</view>
				</view>
			</view>

			<view class="section-card">
				<view class="section-head">
					<text class="section-title">我的好友</text>
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
								<text class="user-name">{{ item.nickname }}</text>
								<text class="tag-text" v-if="item.tagText">{{ item.tagText }}</text>
							</view>
							<text class="time-text">{{ item.lastSeen }}</text>
						</view>
						<text class="item-desc text-wrap-safe">{{ item.bio }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { BASE_URL } from '@/api/config.js'
	import {
		getForumIncomingFriendRequests,
		getForumAcceptedFriends,
		respondForumFriendRequest,
	} from '@/api/forum.js'

	const DEFAULT_AVATAR = '/static/default-avatar.jpg'
	const DEFAULT_REQ_DESC = '在论坛发来好友申请。'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				pendingFriends: [],
				friends: [],
			}
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
			formatTime(t) {
				if (typeof t === 'string') return t.substring(0, 16).replace('T', ' ')
				return ''
			},
			setOfflineMock() {
				this.pendingFriends = [
					{
						requestId: 'mock_p1',
						fromNickname: '朝阳',
						fromAvatar: DEFAULT_AVATAR,
						createTime: '',
						desc: DEFAULT_REQ_DESC,
					},
				]
				this.friends = [
					{
						userId: 'mock_f1',
						name: '小橘同学',
						nickname: '小橘同学',
						avatar: DEFAULT_AVATAR,
						tagText: '',
						lastSeen: '',
						bio: '离线模式示例数据。',
					},
				]
			},
			async reload() {
				const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = u.userId || u.id
				if (!uid) {
					this.setOfflineMock()
					return
				}
				try {
					const [incRes, accRes] = await Promise.all([
						getForumIncomingFriendRequests(uid),
						getForumAcceptedFriends(uid),
					])
					const inList = (incRes && incRes.data) || []
					const okList = (accRes && accRes.data) || []
					this.pendingFriends = Array.isArray(inList)
						? inList.map((r) => ({
							...r,
							desc: DEFAULT_REQ_DESC,
						}))
						: []
					this.friends = Array.isArray(okList)
						? okList.map((f) => ({
							...f,
							nickname: f.nickname || f.name || '用户',
						}))
						: []
				} catch (_) {
					this.pendingFriends = []
					this.friends = []
				}
			},
			async respondIncoming(item, accept) {
				const u = uni.getStorageSync('user_v2') || uni.getStorageSync('user') || {}
				const uid = u.userId || u.id
				if (!uid || !item || item.requestId == null) return
				if (String(item.requestId).startsWith('mock_')) {
					const next = this.pendingFriends.filter((p) => p.requestId !== item.requestId)
					this.pendingFriends = next
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
				uni.navigateTo({
					url: `/subPages/forum/privateChat?name=${nameParam}`,
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
		background: #f7f8fb;
	}

	.top-bar {
		padding: calc(var(--status-bar-height) + 20rpx) 30rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(20px);
		border-bottom: 1rpx solid rgba(15, 23, 42, 0.06);
	}

	.back-btn,
	.top-bar-placeholder {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
	}

	.back-icon {
		font-size: 56rpx;
		line-height: 1;
		color: #24345b;
		margin-top: -8rpx;
	}

	.page-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #15305e;
	}

	.page-scroll {
		flex: 1;
		min-height: 0;
	}

	.section-card {
		background: #ffffff;
		box-shadow: 0 10rpx 28rpx rgba(15, 23, 42, 0.06);
	}

	.section-card {
		margin: 28rpx 30rpx 0;
		padding: 10rpx 24rpx;
	}

	.section-head {
		padding: 20rpx 6rpx 10rpx;
	}

	.section-title {
		display: block;
		font-size: 30rpx;
		font-weight: 700;
		color: #24345b;
	}

	.request-item,
	.friend-item {
		display: flex;
		align-items: center;
		gap: 18rpx;
		padding: 24rpx 6rpx;
		border-top: 1rpx solid rgba(15, 23, 42, 0.06);
	}

	.avatar {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background: #e8edf5;
		flex-shrink: 0;
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
		color: #24345b;
	}

	.tag-text {
		padding: 6rpx 12rpx;
		border-radius: 999rpx;
		background: rgba(91, 121, 255, 0.12);
		font-size: 20rpx;
		color: #5b79ff;
	}

	.time-text {
		font-size: 22rpx;
		color: #98a2b3;
		flex-shrink: 0;
	}

	.item-desc {
		display: block;
		margin-top: 10rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #667085;
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
		background: linear-gradient(135deg, #5b79ff, #7c5cff);
		font-size: 22rpx;
		font-weight: 700;
		color: #ffffff;
		flex-shrink: 0;
	}

	.pill-btn.muted {
		background: rgba(148, 163, 184, 0.22);
		color: #64748b;
	}

	.theme-dark .pill-btn.muted {
		background: rgba(255, 255, 255, 0.08);
		color: #aeb8ca;
	}

	.theme-dark.friend-page {
		background: #111216;
	}

	.theme-dark {
		.top-bar {
			background: rgba(17, 18, 22, 0.92);
			border-bottom-color: rgba(255, 255, 255, 0.06);
		}

		.back-icon,
		.page-title,
		.section-title,
		.user-name {
			color: #f4f7fb;
		}

		.section-card {
			background: #1b1d23;
			box-shadow: 0 10rpx 28rpx rgba(0, 0, 0, 0.22);
		}

		.time-text,
		.item-desc {
			color: #8090ad;
		}

		.request-item,
		.friend-item {
			border-top-color: rgba(255, 255, 255, 0.08);
		}

		.avatar {
			background: #23252b;
		}

		.tag-text {
			background: rgba(141, 164, 230, 0.18);
			color: #a9bbf0;
		}
	}
</style>
