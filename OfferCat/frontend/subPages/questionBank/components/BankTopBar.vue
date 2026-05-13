<template>
	<view class="bank-topbar" :class="themeClass">
		<view class="search-row">
			<view class="back-btn" @click="goBack">
				<view class="svg-icon back-icon"></view>
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
		background: linear-gradient(180deg, rgba(0, 122, 252, 0.7) 0%,rgba(1, 188, 255, 0) 100%);
		backdrop-filter: blur(10rpx);
	}

	.search-row {
		display: flex;
		align-items: center;
		gap: 18rpx;
	}

	.back-btn {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.88);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-shadow: 0 12rpx 24rpx rgba(20, 120, 115, 0.08);
	}

	.search-box {
		flex: 1;
		display: flex;
		align-items: center;
		height: 88rpx;
		padding: 0 24rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: inset 0 0 0 2rpx rgba(20, 187, 172, 0.08);
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
		background: rgba(255, 255, 255, 0.88);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 12rpx 24rpx rgba(20, 120, 115, 0.08);
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
		background: rgba(255, 255, 255, 0.88);
		box-shadow: inset 0 0 0 2rpx rgba(0, 122, 252, 0.08);
	}

	.bank-tab.active {
		box-shadow: inset 0 0 0 2rpx rgba(49, 101, 215, 0.5);
	}

	.bank-tab.interview-tab.active {
		box-shadow: inset 0 0 0 2rpx rgba(100, 232, 208, 0.16);
	}

	.tab-label {
		margin-left: 10rpx;
		font-size: 26rpx;
		font-weight: 700;
		color: #2b354f;
	}

	.bank-tab.active .tab-label {
		color: rgba(0, 122, 252, 0.7);
	}

	.bank-tab.interview-tab.active .tab-label {
		color: #18bca6;
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

	.back-icon {
		width: 44rpx;
		height: 44rpx;
		background-color: #314658;
		mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==");
		-webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==");
	}

	.search-icon {
		width: 36rpx;
		height: 36rpx;
		background-color: #8ea3a8;
		mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCI+PC9jaXJjbGU+PGxpbmUgeDE9IjIxIiB5MT0iMjEiIHgyPSIxNi42NSIgeTI9IjE2LjY1Ij48L2xpbmU+PC9zdmc+");
		-webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCI+PC9jaXJjbGU+PGxpbmUgeDE9IjIxIiB5MT0iMjEiIHgyPSIxNi42NSIgeTI9IjE2LjY1Ij48L2xpbmU+PC9zdmc+");
	}

	.clear-icon {
		width: 36rpx;
		height: 36rpx;
		background-color: #344458;
		mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxsaW5lIHgxPSIxOCIgeTE9IjYiIHgyPSI2IiB5Mj0iMTgiPjwvbGluZT48bGluZSB4MT0iNiIgeTE9IjYiIHgyPSIxOCIgeTI9IjE4Ij48L2xpbmU+PC9zdmc+");
		-webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxsaW5lIHgxPSIxOCIgeTE9IjYiIHgyPSI2IiB5Mj0iMTgiPjwvbGluZT48bGluZSB4MT0iNiIgeTE9IjYiIHgyPSIxOCIgeTI9IjE4Ij48L2xpbmU+PC9zdmc+");
	}

	.refresh-icon {
		width: 36rpx;
		height: 36rpx;
		background-color: #344458;
		mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwb2x5bGluZSBwb2ludHM9IjIzIDQgMjMgMTAgMTcgMTAiPjwvcG9seWxpbmU+PHBhdGggZD0iTTIwLjQ5IDE1YTkgOSAwIDEgMS0yLjEyLTkuMzZMMjMgMTAiPjwvcGF0aD48L3N2Zz4=");
		-webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwb2x5bGluZSBwb2ludHM9IjIzIDQgMjMgMTAgMTcgMTAiPjwvcG9seWxpbmU+PHBhdGggZD0iTTIwLjQ5IDE1YTkgOSAwIDEgMS0yLjEyLTkuMzZMMjMgMTAiPjwvcGF0aD48L3N2Zz4=");
	}

	.tab-icon {
		width: 32rpx;
		height: 32rpx;
		background-color: #2b354f;
	}

	.bank-tab.active .tab-icon {
		background-color: rgba(0, 122, 252, 0.7);
	}

	.bank-tab.interview-tab.active .tab-icon {
		background-color: #18bca6;
	}

	.written-icon {
		mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMiAyMGg5Ij48L3BhdGg+PHBhdGggZD0iTTE2LjUgMy41YTIuMTIxIDIuMTIxIDAgMCAxIDMgM0w3IDE5bC00IDEgMS00TDE2LjUgMy41eiI+PC9wYXRoPjwvc3ZnPg==");
		-webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMiAyMGg5Ij48L3BhdGg+PHBhdGggZD0iTTE2LjUgMy41YTIuMTIxIDIuMTIxIDAgMCAxIDMgM0w3IDE5bC00IDEgMS00TDE2LjUgMy41eiI+PC9wYXRoPjwvc3ZnPg==");
	}

	.interview-icon {
		mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMSAxNWEyIDIgMCAwIDEtMiAySDdsLTQgNFY1YTIgMiAwIDAgMSAyLTJoMTRhMiAyIDAgMCAxIDIgMnoiPjwvcGF0aD48L3N2Zz4=");
		-webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMSAxNWEyIDIgMCAwIDEtMiAySDdsLTQgNFY1YTIgMiAwIDAgMSAyLTJoMTRhMiAyIDAgMCAxIDIgMnoiPjwvcGF0aD48L3N2Zz4=");
	}

	.bank-topbar.theme-dark {
		background: linear-gradient(180deg, rgba(74, 103, 247, 0.45) 0%, rgba(74, 103, 247, 0) 100%);
	}

	.bank-topbar.theme-dark .back-btn,
	.bank-topbar.theme-dark .search-box,
	.bank-topbar.theme-dark .action-btn,
	.bank-topbar.theme-dark .bank-tab {
		background: rgba(35, 37, 43, 0.96);
		box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.18);
	}

	.bank-topbar.theme-dark .search-box,
	.bank-topbar.theme-dark .bank-tab {
		box-shadow: inset 0 0 0 2rpx rgba(255, 255, 255, 0.06);
	}

	.bank-topbar.theme-dark .tab-label,
	.bank-topbar.theme-dark .search-input {
		color: #eef2f8;
	}

	.bank-topbar.theme-dark .back-icon,
	.bank-topbar.theme-dark .clear-icon,
	.bank-topbar.theme-dark .refresh-icon,
	.bank-topbar.theme-dark .tab-icon {
		background-color: #eef2f8;
	}

	.bank-topbar.theme-dark .search-icon {
		background-color: rgba(255, 255, 255, 0.4);
	}

	.bank-topbar.theme-dark .bank-tab.active {
		box-shadow: inset 0 0 0 2rpx rgba(138, 183, 255, 0.5);
	}

	.bank-topbar.theme-dark .bank-tab.interview-tab.active {
		box-shadow: inset 0 0 0 2rpx rgba(100, 232, 208, 0.16);
	}

	.bank-topbar.theme-dark .bank-tab.active .tab-label {
		color: #8ab7ff;
	}

	.bank-topbar.theme-dark .bank-tab.interview-tab.active .tab-label {
		color: #45f9de;
	}

	.bank-topbar.theme-dark .bank-tab.active .tab-icon {
		background-color: #8ab7ff;
	}

	.bank-topbar.theme-dark .bank-tab.interview-tab.active .tab-icon {
		background-color: #45f9de;
	}
</style>
