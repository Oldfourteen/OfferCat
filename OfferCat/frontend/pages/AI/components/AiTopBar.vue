<template>
	<view class="topbar" :class="themeClass">
		<view class="topbar-leading">
			<view class="toolbar-chip toolbar-chip--single">
				<view class="chip-hit chip-hit--menu" @click="$emit('menu')">
					<view class="menu-icon">
						<view class="menu-line"></view>
						<view class="menu-line short"></view>
					</view>
				</view>
			</view>
		</view>

		<view class="topbar-title-slot">
			<text class="topbar-title">{{ title }}</text>
		</view>

		<view class="topbar-trailing">
			<view class="toolbar-chip toolbar-chip--split">
				<view
					class="chip-hit chip-hit--voice"
					:class="{ 'chip-hit--voice-on': autoVoiceBroadcast }"
					@tap.stop="toggleAutoVoice"
				>
					<view class="spkr" :class="{ 'spkr--muted': !autoVoiceBroadcast }">
						<view class="spkr-body"></view>
						<view class="spkr-waves">
							<view class="spkr-bar spkr-bar--a"></view>
							<view class="spkr-bar spkr-bar--b"></view>
							<view class="spkr-bar spkr-bar--c"></view>
						</view>
					</view>
				</view>
				<view class="chip-split-line"></view>
				<view class="chip-hit chip-hit--create" @click="$emit('create')">
					<text class="create-plus">+</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AiTopBar',
		props: {
			theme: {
				type: String,
				default: 'light'
			},
			title: {
				type: String,
				default: '新对话'
			},
			autoVoiceBroadcast: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toggleAutoVoice() {
				this.$emit('auto-voice-change', !this.autoVoiceBroadcast)
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			}
		}
	}
</script>

<style lang="scss">
	.topbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		padding: calc(var(--status-bar-height) + 18rpx) 22rpx 22rpx;
		background: linear-gradient(180deg, rgba(248, 247, 245, 0.98) 0%, rgba(248, 247, 245, 0.86) 72%, rgba(248, 247, 245, 0) 100%);
		backdrop-filter: blur(12rpx);

		&::after {
			content: '';
			position: absolute;
			left: 32rpx;
			right: 32rpx;
			bottom: 8rpx;
			height: 1rpx;
			background: linear-gradient(
				90deg,
				rgba(49, 101, 215, 0),
				rgba(49, 101, 215, 0.12) 22%,
				rgba(49, 101, 215, 0.12) 78%,
				rgba(49, 101, 215, 0)
			);
			pointer-events: none;
		}

		.topbar-leading,
		.topbar-trailing {
			flex: 1 1 0;
			min-width: 0;
			display: flex;
			align-items: center;
		}

		.topbar-leading {
			justify-content: flex-start;
		}

		.topbar-trailing {
			justify-content: flex-end;
		}

		.toolbar-chip {
			display: flex;
			align-items: stretch;
			border-radius: 22rpx;
			overflow: hidden;
			border: 1rpx solid rgba(49, 101, 215, 0.11);
			background: rgba(255, 255, 255, 0.78);
			box-shadow:
				0 4rpx 14rpx rgba(49, 101, 215, 0.06),
				0 12rpx 28rpx rgba(36, 59, 104, 0.05);
		}

		.toolbar-chip--single {
			min-height: 66rpx;
			min-width: 66rpx;
			justify-content: center;
			align-items: center;
		}

		.toolbar-chip--split {
			flex-direction: row;
			align-items: stretch;
			min-height: 66rpx;
		}

		.chip-hit {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 74rpx;
			padding: 0 8rpx;
			transition: background-color 0.18s ease;
		}

		.chip-hit--menu {
			min-width: 66rpx;
			min-height: 66rpx;
			padding: 0;
		}

		.chip-hit--voice:active,
		.chip-hit--create:active,
		.chip-hit--menu:active {
			background: rgba(49, 101, 215, 0.06);
		}

		.chip-hit--voice-on {
			background: rgba(49, 101, 215, 0.1);
		}

		.chip-split-line {
			align-self: stretch;
			width: 1rpx;
			background: rgba(49, 101, 215, 0.14);
			margin: 14rpx 0;
			flex-shrink: 0;
		}

		.menu-icon {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			gap: 10rpx;
		}

		.menu-line {
			width: 26rpx;
			height: 4rpx;
			border-radius: 999rpx;
			background: #2c4678;
			position: relative;
		}

		.menu-line.short {
			width: 16rpx;
		}

		.create-plus {
			font-size: 38rpx;
			line-height: 1;
			font-weight: 400;
			color: #3165d7;
			margin-top: -4rpx;
		}

		.spkr {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 6rpx;
			height: 34rpx;
		}

		.spkr-body {
			width: 11rpx;
			height: 14rpx;
			border-radius: 3rpx;
			background: linear-gradient(180deg, #3d6fd8 0%, #3165d7 100%);
		}

		.spkr-waves {
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			justify-content: flex-start;
			gap: 3rpx;
			height: 26rpx;
			padding-bottom: 2rpx;
		}

		.spkr-bar {
			width: 4rpx;
			border-radius: 99rpx;
			background: #3165d7;
			opacity: 1;
			transition: opacity 0.18s ease, transform 0.18s ease;
		}

		.spkr-bar--a {
			height: 9rpx;
		}

		.spkr-bar--b {
			height: 15rpx;
		}

		.spkr-bar--c {
			height: 23rpx;
		}

		.spkr--muted .spkr-body,
		.spkr--muted .spkr-bar {
			opacity: 0.38;
			background: #6b7aa3;
		}

		.spkr--muted .spkr-bar--c {
			transform: scaleY(0.65);
			transform-origin: bottom;
		}

		.spkr--muted .spkr-bar--b {
			transform: scaleY(0.72);
			transform-origin: bottom;
		}

		.topbar-title-slot {
			flex: 0 1 auto;
			min-width: 0;
			max-width: 52%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 12rpx;
		}

		.topbar-title {
			width: 100%;
			font-size: 28rpx;
			font-weight: 600;
			color: #1f335e;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: center;
			letter-spacing: 0.6rpx;
		}
	}

	.topbar.theme-dark {
		background: linear-gradient(180deg, rgba(18, 19, 24, 0.98) 0%, rgba(18, 19, 24, 0.88) 72%, rgba(18, 19, 24, 0) 100%);

		&::after {
			background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 0),
				rgba(255, 255, 255, 0.1) 22%,
				rgba(255, 255, 255, 0.1) 78%,
				rgba(255, 255, 255, 0)
			);
		}

		.toolbar-chip {
			background: rgba(36, 38, 46, 0.94);
			border-color: rgba(255, 255, 255, 0.09);
			box-shadow:
				0 4rpx 16rpx rgba(0, 0, 0, 0.22),
				inset 0 1rpx 0 rgba(255, 255, 255, 0.04);
		}

		.chip-split-line {
			background: rgba(255, 255, 255, 0.12);
		}

		.chip-hit--voice:active,
		.chip-hit--create:active,
		.chip-hit--menu:active {
			background: rgba(255, 255, 255, 0.06);
		}

		.chip-hit--voice-on {
			background: rgba(74, 103, 247, 0.22);
		}

		.menu-line {
			background: #e8ecf5;
		}

		.create-plus {
			color: #8ea9ff;
		}

		.spkr-body {
			background: linear-gradient(180deg, #8ea9ff 0%, #6b86f0 100%);
		}

		.spkr-bar {
			background: #8ea9ff;
		}

		.spkr--muted .spkr-body,
		.spkr--muted .spkr-bar {
			background: #6d7388;
		}

		.topbar-title {
			color: #eef1f8;
		}
	}
</style>
