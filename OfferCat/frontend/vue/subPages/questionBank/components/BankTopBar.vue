<template>
	<view class="bank-topbar" :class="[themeClass, pageTypeClass]">
		<view class="search-row">
			<view class="back-btn" @click="goBack">
				<image class="back-icon-img" src="/static/png/icons/chevron-left.png" mode="aspectFit" />
			</view>

			<view class="search-box">
				<view class="svg-icon search-icon"></view>
				<input
					class="search-input"
					:type="'text'"
					:placeholder="placeholder"
					:value="modelValue"
					@input="onInput"
				/>
				<view class="action-btn1" @click="$emit('clear')">
					<view class="svg-icon clear-icon"></view>
				</view>
			</view>
			<view class="search-actions">
				<view class="action-btn" @click="$emit('refresh')">
					<view class="svg-icon refresh-icon"></view>
				</view>
			</view>
		</view>

		<scroll-view class="tab-scroll" scroll-x :show-scrollbar="false">
			<view class="tab-row">
				<view
					v-for="item in tabs"
					:key="item.key"
					class="bank-tab"
					:class="[{ active: item.key === active }, item.key === 'interview' ? 'interview-tab' : 'written-tab']"
					@click="$emit('change-tab', item.key)"
				>
					<view class="svg-icon tab-icon" :class="item.icon"></view>
					<text class="tab-label">{{ item.label }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'BankTopBar',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			tabs: {
				type: Array,
				default() {
					return []
				}
			},
			active: {
				type: String,
				default: ''
			},
			pageType: {
				type: String,
				default: 'written'
			},
			modelValue: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '搜索'
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			pageTypeClass() {
				return this.pageType === 'interview' ? 'page-interview' : 'page-written'
			}
		},
		methods: {
			goBack() {
				const fallbackToHome = () => {
					uni.switchTab({
						url: '/pages/index/index',
						fail: () => {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					})
				}

				const pages = getCurrentPages()
				if (pages.length > 1) {
					uni.navigateBack({
						delta: 1,
						fail: () => {
							fallbackToHome()
						}
					})
					return
				}

				fallbackToHome()
			},
			onInput(event) {
				this.$emit('update:modelValue', event.detail.value)
			}
		}
	}
</script>

<style lang="scss">
	.bank-topbar {
		flex-shrink: 0;
		position: relative;
		z-index: 30;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background: #f4f6fc;
		box-shadow:
			0 6rpx 22rpx rgba(24, 42, 92, 0.1),
			0 1rpx 0 rgba(255, 255, 255, 0.75) inset;
		border-bottom: 1rpx solid rgba(72, 98, 165, 0.12);
	}

	.bank-topbar.page-interview {
		background: #f0f7f5;
		box-shadow:
			0 6rpx 22rpx rgba(28, 72, 68, 0.09),
			0 1rpx 0 rgba(255, 255, 255, 0.78) inset;
		border-bottom: 1rpx solid rgba(42, 130, 118, 0.16);
	}

	.bank-topbar.page-interview .back-btn {
		border-color: rgba(42, 120, 110, 0.14);
		box-shadow: 0 6rpx 16rpx rgba(28, 88, 80, 0.1), 0 2rpx 0 rgba(255, 255, 255, 0.9) inset;
	}

	.bank-topbar.page-interview .search-box {
		border-color: rgba(42, 130, 118, 0.22);
		box-shadow:
			0 4rpx 14rpx rgba(24, 80, 72, 0.08),
			0 1rpx 0 rgba(255, 255, 255, 0.88) inset;
	}

	.bank-topbar.page-interview .action-btn {
		border-color: rgba(42, 120, 110, 0.18);
		box-shadow:
			0 6rpx 16rpx rgba(28, 88, 80, 0.1),
			0 2rpx 0 rgba(255, 255, 255, 0.9) inset;
	}

	.bank-topbar.page-interview .bank-tab {
		border-color: rgba(42, 120, 110, 0.12);
		box-shadow: 0 4rpx 12rpx rgba(24, 70, 64, 0.06), 0 1rpx 0 rgba(255, 255, 255, 0.88) inset;
	}

	.bank-topbar.page-interview .search-icon {
		background-color: #5a9e94;
	}

	.search-row {
		display: flex;
		align-items: center;
		gap: 18rpx;
	}

	.back-btn {
		box-sizing: border-box;
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: #ffffff;
		border: 1rpx solid rgba(55, 78, 130, 0.12);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		flex-shrink: 0;
		box-shadow: 0 6rpx 16rpx rgba(32, 52, 110, 0.12), 0 2rpx 0 rgba(255, 255, 255, 0.9) inset;
	}

	.back-icon-img {
		width: 38rpx;
		height: 38rpx;
		flex-shrink: 0;
	}

	.search-box {
		flex: 1;
		display: flex;
		align-items: center;
		height: 88rpx;
		padding: 0 24rpx;
		border-radius: 999rpx;
		background: #ffffff;
		border: 1rpx solid rgba(72, 98, 165, 0.14);
		box-shadow:
			0 4rpx 14rpx rgba(24, 44, 90, 0.07),
			0 1rpx 0 rgba(255, 255, 255, 0.85) inset;
	}

	.search-input {
		flex: 1;
		height: 48rpx;
		margin-left: 16rpx;
		font-size: 30rpx;
		color: #33425a;
		background: transparent;
	}

	.search-actions {
		display: flex;
		gap: 12rpx;
	}

	.action-btn {
		width: 72rpx;
		height: 72rpx;
		border-radius: 22rpx;
		background: #ffffff;
		border: 1rpx solid rgba(72, 98, 165, 0.12);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:
			0 6rpx 16rpx rgba(32, 52, 110, 0.1),
			0 2rpx 0 rgba(255, 255, 255, 0.88) inset;
	}
	
	.action-btn1 {
		width: 72rpx;
		height: 72rpx;
		border-radius: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tab-scroll {
		margin-top: 18rpx;
		white-space: nowrap;
	}

	.tab-row {
		display: inline-flex;
		gap: 16rpx;
		padding-right: 24rpx;
	}

	.bank-tab {
		display: inline-flex;
		align-items: center;
		padding: 16rpx 26rpx;
		border-radius: 999rpx;
		background: #ffffff;
		border: 1rpx solid rgba(72, 98, 165, 0.1);
		box-shadow: 0 4rpx 12rpx rgba(26, 48, 100, 0.06), 0 1rpx 0 rgba(255, 255, 255, 0.85) inset;
	}

	.bank-tab.written-tab.active {
		border-color: rgba(93, 118, 189, 0.4);
		box-shadow:
			0 8rpx 20rpx rgba(73, 98, 170, 0.22),
			0 2rpx 0 rgba(255, 255, 255, 0.35) inset;
	}

	.bank-tab.interview-tab.active {
		border-color: rgba(31, 143, 126, 0.45);
		box-shadow:
			0 8rpx 22rpx rgba(28, 100, 90, 0.2),
			0 2rpx 0 rgba(255, 255, 255, 0.4) inset;
	}

	.tab-label {
		margin-left: 10rpx;
		font-size: 26rpx;
		font-weight: 700;
		color: #2b354f;
	}

	.bank-tab.written-tab.active .tab-label {
		color: #5d76bd;
	}

	.bank-tab.interview-tab.active .tab-label {
		color: #17806f;
	}

	/* SVG Icon Styles */
	.svg-icon {
		display: inline-block;
		mask-size: contain;
		-webkit-mask-size: contain;
		mask-repeat: no-repeat;
		-webkit-mask-repeat: no-repeat;
		mask-position: center;
		-webkit-mask-position: center;
	}

	.search-icon {
		width: 36rpx;
		height: 36rpx;
		background-color: #8ea3a8;
		mask-image: url("/static/png/inline/4a40ea09d416.png");
		-webkit-mask-image: url("/static/png/inline/4a40ea09d416.png");
	}

	.clear-icon {
		width: 36rpx;
		height: 36rpx;
		background-color: #344458;
		mask-image: url("/static/png/inline/7e149299b2dd.png");
		-webkit-mask-image: url("/static/png/inline/7e149299b2dd.png");
	}

	.refresh-icon {
		width: 36rpx;
		height: 36rpx;
		background-color: #344458;
		mask-image: url("/static/png/inline/89cbd7ff58a8.png");
		-webkit-mask-image: url("/static/png/inline/89cbd7ff58a8.png");
	}

	.tab-icon {
		width: 32rpx;
		height: 32rpx;
		background-color: #2b354f;
	}

	.bank-tab.written-tab.active .tab-icon {
		background-color: #5d76bd;
	}

	.bank-tab.interview-tab.active .tab-icon {
		background-color: #17806f;
	}

	.written-icon {
		mask-image: url("/static/png/inline/cea941ce2916.png");
		-webkit-mask-image: url("/static/png/inline/cea941ce2916.png");
	}

	.interview-icon {
		mask-image: url("/static/png/inline/58946124fe44.png");
		-webkit-mask-image: url("/static/png/inline/58946124fe44.png");
	}

	.bank-topbar.theme-dark {
		background: #1c1f28;
		box-shadow:
			0 6rpx 24rpx rgba(0, 0, 0, 0.35),
			0 1rpx 0 rgba(255, 255, 255, 0.06) inset;
		border-bottom-color: rgba(255, 255, 255, 0.08);
	}

	.bank-topbar.theme-dark .back-btn {
		background: #2a2e38;
		border-color: rgba(255, 255, 255, 0.12);
		box-shadow:
			0 6rpx 18rpx rgba(0, 0, 0, 0.32),
			0 1rpx 0 rgba(255, 255, 255, 0.08) inset;
	}

	.bank-topbar.theme-dark .back-icon-img {
		filter: brightness(0) invert(1);
		opacity: 0.9;
	}

	.bank-topbar.theme-dark .search-box,
	.bank-topbar.theme-dark .action-btn,
	.bank-topbar.theme-dark .bank-tab {
		background: #22262f;
		border: 1rpx solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 5rpx 14rpx rgba(0, 0, 0, 0.25), 0 1rpx 0 rgba(255, 255, 255, 0.05) inset;
	}

	.bank-topbar.theme-dark .search-box {
		box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.22), 0 1rpx 0 rgba(255, 255, 255, 0.04) inset;
	}

	.bank-topbar.theme-dark .tab-label,
	.bank-topbar.theme-dark .search-input {
		color: #eef2f8;
	}

	.bank-topbar.theme-dark .clear-icon,
	.bank-topbar.theme-dark .refresh-icon,
	.bank-topbar.theme-dark .tab-icon {
		background-color: #eef2f8;
	}

	.bank-topbar.theme-dark .search-icon {
		background-color: rgba(255, 255, 255, 0.4);
	}

	.bank-topbar.theme-dark.page-interview {
		border-bottom-color: rgba(94, 200, 180, 0.14);
	}

	.bank-topbar.theme-dark.page-interview .search-icon {
		background-color: rgba(110, 201, 184, 0.65);
	}

	.bank-topbar.theme-dark.page-written {
		border-bottom-color: rgba(138, 183, 255, 0.2);
	}

	.bank-topbar.theme-dark.page-written .search-icon {
		background-color: rgba(138, 183, 255, 0.55);
	}

	.bank-topbar.theme-dark .bank-tab.written-tab.active {
		border-color: rgba(138, 183, 255, 0.45);
		box-shadow:
			0 8rpx 22rpx rgba(0, 0, 0, 0.35),
			0 2rpx 0 rgba(255, 255, 255, 0.08) inset;
	}

	.bank-topbar.theme-dark .bank-tab.interview-tab.active {
		border-color: rgba(110, 201, 184, 0.48);
		box-shadow:
			0 8rpx 22rpx rgba(0, 0, 0, 0.35),
			0 2rpx 0 rgba(255, 255, 255, 0.08) inset;
	}

	.bank-topbar.theme-dark .bank-tab.written-tab.active .tab-label {
		color: #8ab7ff;
	}

	.bank-topbar.theme-dark .bank-tab.interview-tab.active .tab-label {
		color: #6ec9b8;
	}

	.bank-topbar.theme-dark .bank-tab.written-tab.active .tab-icon {
		background-color: #8ab7ff;
	}

	.bank-topbar.theme-dark .bank-tab.interview-tab.active .tab-icon {
		background-color: #6ec9b8;
	}
</style>
