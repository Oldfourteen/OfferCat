<template>
	<view class="hub-page" :class="themeClass">
		<view class="hub-topbar">
			<view class="back-btn" @click="goBack">
				<image class="back-icon-img" :src="hubBackIcon" mode="aspectFit" />
			</view>
			<text class="topbar-title">网关接通点</text>
			<text class="placeholder" />
		</view>

		<scroll-view class="hub-scroll" scroll-y :show-scrollbar="false">
			<view class="hub-inner">
				<view class="info-card">
					<text class="info-title">{{ portHint }}</text>
					<view class="root-block">
						<text class="root-label">当前 API 根（getApiBase）</text>
						<text class="root-value mono" selectable>{{ apiBase }}</text>
						<view class="copy-pill" @click="copyText(apiBase)">
							<text class="copy-text">复制根地址</text>
						</view>
					</view>
					<view class="root-block">
						<text class="root-label">星图数据根（galaxyApiBase）</text>
						<text class="root-value mono small" selectable>{{ galaxyBaseLine }}</text>
						<text class="root-hint">未配置时使用 App 内置 static/mock，不经网关。</text>
					</view>
				</view>

				<view v-for="grp in GATEWAY_GROUPS" :key="grp.id" class="group-wrap">
					<text class="group-title">{{ grp.title }}</text>
					<text v-if="grp.intro" class="group-intro">{{ grp.intro }}</text>
					<view
						v-for="(item, ix) in grp.items"
						:key="`${grp.id}-${ix}-${item.method}-${item.path}`"
						class="endpoint-card clickable"
						@click="onTapEndpoint(item)"
					>
						<view class="ep-head">
							<text class="ep-label">{{ item.label }}</text>
							<text v-if="item.method" class="ep-method">{{ item.method }}</text>
						</view>
						<text class="ep-path mono" selectable>{{ item.path }}</text>
						<text v-if="item.note" class="ep-note">{{ item.note }}</text>
						<view class="ep-foot">
							<text class="ep-full mono" selectable>{{ fullUrl(item.path) }}</text>
							<text v-if="item.path.indexOf('{') === -1" class="tap-hint">轻触复制完整 URL</text>
						</view>
					</view>
				</view>

				<view class="foot-note">
					<text class="foot-text">以上为代码层梳理的网关转发接通点；与线上注册中心、防火墙放行一致时才可真正访问。</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'
	import { getApiBase } from '@/api/config.js'
	import { GATEWAY_GROUPS, GATEWAY_PORT_HINT } from '@/api/gatewayHubData.js'

	const HUB_BACK_ICON =
		'data:image/svg+xml;charset=utf-8,' +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
				'<path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/>' +
				'</svg>'
		)

	export default {
		mixins: [themeMixin],
		data() {
			return {
				GATEWAY_GROUPS,
				portHint: GATEWAY_PORT_HINT,
				apiBase: getApiBase(),
				hubBackIcon: HUB_BACK_ICON
			}
		},
		computed: {
			galaxyBaseLine() {
				try {
					if (typeof getApp !== 'function') return '—'
					const app = getApp()
					const raw = app && app.globalData && app.globalData.galaxyApiBase
					const t = raw != null ? String(raw).trim() : ''
					return t !== '' ? t.replace(/\/+$/, '') : '（未配置）'
				} catch (_) {
					return '—'
				}
			}
		},
		onShow() {
			this.apiBase = getApiBase()
		},
		methods: {
			goBack() {
				const pages = getCurrentPages()
				if (pages.length > 1) {
					uni.navigateBack({ delta: 1 })
					return
				}
				uni.navigateTo({ url: '/subPages/settings/system' })
			},
			fullUrl(path) {
				if (!path) return ''
				const b = String(this.apiBase || '').replace(/\/+$/, '')
				const p = path.startsWith('/') ? path : '/' + path
				return b + p
			},
			copyText(text) {
				if (!text) return
				uni.setClipboardData({
					data: String(text),
					success: () => uni.showToast({ title: '已复制', icon: 'none', duration: 1200 }),
					fail: () => uni.showToast({ title: '复制失败', icon: 'none' })
				})
			},
			onTapEndpoint(item) {
				if (!item || !item.path) return
				if (item.path.indexOf('{') !== -1) {
					this.copyText(item.path)
					return
				}
				this.copyText(this.fullUrl(item.path))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hub-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #111318 0%, #0f1115 42%, #0c0d11 100%);
	}

	.hub-page.theme-light {
		background: linear-gradient(180deg, #edf6ff 0%, #f7f9fe 38%, #f8fafd 100%);
	}

	.hub-topbar {
		position: sticky;
		top: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(12px + env(safe-area-inset-top)) 20rpx 16rpx;
		background: linear-gradient(180deg, rgba(77, 108, 182, 0.28) 0%, rgba(17, 19, 24, 0.65) 100%);
		border-bottom: 1rpx solid rgba(255, 255, 255, 0.06);
	}

	.hub-page.theme-light .hub-topbar {
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(244, 248, 255, 0.96) 100%);
		border-bottom-color: rgba(67, 76, 210, 0.08);
	}

	.back-btn {
		width: 72rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-icon-img {
		width: 40rpx;
		height: 40rpx;
	}

	.topbar-title {
		font-size: 34rpx;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.95);
	}

	.hub-page.theme-light .topbar-title {
		color: #23345a;
	}

	.placeholder {
		width: 72rpx;
	}

	.hub-scroll {
		flex: 1;
		height: 0;
		min-height: 0;
	}

	.hub-inner {
		padding: 20rpx 24rpx 48rpx;
		box-sizing: border-box;
	}

	.info-card {
		background: rgba(255, 255, 255, 0.06);
		border: 1rpx solid rgba(255, 255, 255, 0.08);
		border-radius: 20rpx;
		padding: 28rpx 26rpx;
		margin-bottom: 28rpx;
		box-shadow: 0 22rpx 48rpx rgba(0, 0, 0, 0.22);
	}

	.hub-page.theme-light .info-card {
		background: #ffffff;
		border-color: rgba(67, 76, 210, 0.06);
		box-shadow: 0 18rpx 42rpx rgba(67, 76, 210, 0.1);
	}

	.info-title {
		font-size: 24rpx;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.74);
	}

	.hub-page.theme-light .info-title {
		color: #5b6f8f;
	}

	.root-block {
		margin-top: 22rpx;
		padding-top: 22rpx;
		border-top: 1rpx solid rgba(255, 255, 255, 0.06);
	}

	.hub-page.theme-light .root-block {
		border-top-color: rgba(125, 149, 190, 0.15);
	}

	.root-label {
		display: block;
		font-size: 24rpx;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.92);
		margin-bottom: 10rpx;
	}

	.hub-page.theme-light .root-label {
		color: #30496f;
	}

	.root-value {
		display: block;
		font-size: 24rpx;
		line-height: 1.45;
		color: rgba(255, 255, 255, 0.88);
		word-break: break-all;
	}

	.root-value.small {
		font-size: 22rpx;
	}

	.hub-page.theme-light .root-value {
		color: #23345a;
	}

	.root-hint {
		display: block;
		margin-top: 8rpx;
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.45);
	}

	.hub-page.theme-light .root-hint {
		color: #8090ad;
	}

	.mono {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
	}

	.copy-pill {
		margin-top: 16rpx;
		align-self: flex-start;
		display: inline-flex;
		padding: 10rpx 22rpx;
		border-radius: 999rpx;
		background: rgba(74, 103, 247, 0.35);
		border: 1rpx solid rgba(123, 156, 255, 0.45);
	}

	.hub-page.theme-light .copy-pill {
		background: rgba(74, 103, 247, 0.12);
		border-color: rgba(74, 103, 247, 0.28);
	}

	.copy-text {
		font-size: 24rpx;
		color: #e8ecff;
		font-weight: 600;
	}

	.hub-page.theme-light .copy-text {
		color: #3d5bd9;
	}

	.group-wrap {
		margin-bottom: 32rpx;
	}

	.group-title {
		display: block;
		font-size: 30rpx;
		font-weight: 800;
		color: rgba(255, 255, 255, 0.95);
		margin-bottom: 10rpx;
	}

	.hub-page.theme-light .group-title {
		color: #1c2b45;
	}

	.group-intro {
		display: block;
		font-size: 22rpx;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.55);
		margin-bottom: 16rpx;
	}

	.hub-page.theme-light .group-intro {
		color: #6a7b99;
	}

	.endpoint-card {
		background: rgba(255, 255, 255, 0.05);
		border: 1rpx solid rgba(255, 255, 255, 0.07);
		border-radius: 16rpx;
		padding: 22rpx 22rpx 18rpx;
		margin-bottom: 14rpx;
	}

	.endpoint-card.clickable:active {
		opacity: 0.9;
		transform: scale(0.996);
	}

	.hub-page.theme-light .endpoint-card {
		background: #ffffff;
		border-color: rgba(67, 76, 210, 0.06);
		box-shadow: 0 10rpx 28rpx rgba(67, 76, 210, 0.06);
	}

	.ep-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
		margin-bottom: 8rpx;
	}

	.ep-label {
		flex: 1;
		font-size: 28rpx;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.94);
	}

	.hub-page.theme-light .ep-label {
		color: #23345a;
	}

	.ep-method {
		flex-shrink: 0;
		font-size: 20rpx;
		font-weight: 800;
		padding: 4rpx 12rpx;
		border-radius: 8rpx;
		background: rgba(74, 103, 247, 0.25);
		color: #c8d4ff;
	}

	.hub-page.theme-light .ep-method {
		background: rgba(74, 103, 247, 0.12);
		color: #3d5bd9;
	}

	.ep-path {
		display: block;
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.68);
		word-break: break-all;
		line-height: 1.45;
	}

	.hub-page.theme-light .ep-path {
		color: #4a5f84;
	}

	.ep-note {
		display: block;
		margin-top: 8rpx;
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.45);
	}

	.hub-page.theme-light .ep-note {
		color: #8a9ab8;
	}

	.ep-foot {
		margin-top: 12rpx;
		padding-top: 12rpx;
		border-top: 1rpx dashed rgba(255, 255, 255, 0.1);
	}

	.hub-page.theme-light .ep-foot {
		border-top-color: rgba(125, 149, 190, 0.2);
	}

	.ep-full {
		display: block;
		font-size: 20rpx;
		color: rgba(255, 255, 255, 0.52);
		word-break: break-all;
		line-height: 1.45;
	}

	.hub-page.theme-light .ep-full {
		color: #6b7c9b;
	}

	.tap-hint {
		display: block;
		margin-top: 6rpx;
		font-size: 20rpx;
		color: rgba(123, 156, 255, 0.65);
	}

	.hub-page.theme-light .tap-hint {
		color: #4a6cf7;
	}

	.foot-note {
		padding: 12rpx 8rpx 40rpx;
	}

	.foot-text {
		font-size: 22rpx;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.38);
	}

	.hub-page.theme-light .foot-text {
		color: #8a9ab8;
	}
</style>
