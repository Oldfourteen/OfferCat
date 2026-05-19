<template>
	<view class="set-card" :class="[themeClass, cardTypeClass]" @click="$emit('select', item)">
		<view class="company-badge">{{ item.companyShort }}</view>
		<view class="set-main">
			<view class="set-title-row">
				<text class="set-title">{{ item.title }}</text>
				<text v-if="item.isFavorite" class="favorite-badge">已收藏</text>
			</view>
			<text class="set-meta">题目数量：{{ item.total }} 题</text>
		</view>
	</view>
</template>

<script>
		export default {
			name: 'QuestionSetCard',
			props: {
				theme: {
					type: String,
					default: 'light'
				},
				item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			cardTypeClass() {
				return this.item && this.item.type === 'interview' ? 'type-interview' : 'type-written'
			}
		}
	}
</script>

<style lang="scss">
	.set-card {
		display: flex;
		align-items: flex-start;
		padding: 26rpx 28rpx;
		border-radius: 30rpx;
		background: #ffffff;
		border: 1rpx solid rgba(72, 98, 165, 0.11);
		box-shadow:
			0 14rpx 32rpx rgba(20, 40, 95, 0.1),
			0 4rpx 12rpx rgba(20, 40, 95, 0.05),
			0 1rpx 0 rgba(255, 255, 255, 0.85) inset;
	}

	.company-badge {
		width: 92rpx;
		height: 92rpx;
		border-radius: 26rpx;
		background: linear-gradient(135deg, #ffffff, #eef2fa);
		box-shadow:
			0 6rpx 14rpx rgba(45, 75, 140, 0.12),
			inset 0 0 0 1rpx rgba(93, 118, 189, 0.14);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 800;
		color: #2a5fc2;
	}

	.set-card.type-interview {
		border-color: rgba(42, 130, 118, 0.14);
		box-shadow:
			0 14rpx 32rpx rgba(24, 72, 64, 0.09),
			0 4rpx 12rpx rgba(24, 72, 64, 0.05),
			0 1rpx 0 rgba(255, 255, 255, 0.85) inset;
	}

	.set-card.type-interview .company-badge {
		background: linear-gradient(135deg, #ffffff, rgba(72, 190, 170, 0.22));
		box-shadow:
			0 6rpx 14rpx rgba(28, 88, 78, 0.12),
			inset 0 0 0 1rpx rgba(31, 143, 126, 0.22);
		color: #15796a;
	}

	.set-card.type-interview .favorite-badge {
		background: rgba(31, 143, 126, 0.14);
		color: #17806f;
		border-color: rgba(31, 143, 126, 0.28);
		box-shadow: 0 2rpx 6rpx rgba(24, 72, 64, 0.06);
	}

	.set-main {
		flex: 1;
		margin-left: 24rpx;
	}

	.set-title-row {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 12rpx;
	}

	.set-title {
		font-size: 34rpx;
		line-height: 1.38;
		font-weight: 800;
		color: #232d45;
	}

	.verified-badge {
		padding: 8rpx 12rpx;
		border-radius: 999rpx;
		background: rgba(34, 153, 232, 0.1);
		font-size: 20rpx;
		font-weight: 700;
		color: #2299e8;
	}

	.favorite-badge {
		padding: 8rpx 14rpx;
		border-radius: 999rpx;
		background: rgba(93, 118, 189, 0.14);
		font-size: 20rpx;
		font-weight: 700;
		color: #5d76bd;
		border: 1rpx solid rgba(93, 118, 189, 0.22);
		box-shadow: 0 2rpx 6rpx rgba(28, 48, 88, 0.06);
	}

	.set-meta {
		display: block;
		margin-top: 18rpx;
		font-size: 22rpx;
		font-weight: 700;
		color: #a0a8b8;
	}

	.set-card.theme-dark {
		background: #1f232c;
		border-color: rgba(255, 255, 255, 0.09);
		box-shadow:
			0 16rpx 36rpx rgba(0, 0, 0, 0.35),
			0 4rpx 12rpx rgba(0, 0, 0, 0.22),
			0 1rpx 0 rgba(255, 255, 255, 0.06) inset;
	}

	.set-card.theme-dark .company-badge {
		background: linear-gradient(135deg, #262a33, #323743);
		box-shadow:
			0 4rpx 12rpx rgba(0, 0, 0, 0.25),
			inset 0 0 0 1rpx rgba(138, 183, 255, 0.12);
		color: #8ab7ff;
	}

	.set-card.theme-dark.type-interview {
		border-color: rgba(110, 201, 184, 0.12);
	}

	.set-card.theme-dark.type-interview .company-badge {
		background: linear-gradient(135deg, rgba(35, 37, 43, 0.96), rgba(69, 249, 222, 0.12));
		box-shadow:
			0 4rpx 12rpx rgba(0, 0, 0, 0.25),
			inset 0 0 0 1rpx rgba(110, 201, 184, 0.22);
		color: #6ec9b8;
	}

	.set-card.theme-dark.type-interview .favorite-badge {
		background: rgba(110, 201, 184, 0.18);
		color: #9ee8d8;
		border-color: rgba(110, 201, 184, 0.28);
	}

	.set-card.theme-dark .set-title {
		color: #f4f7fb;
	}

	.set-card.theme-dark .set-meta {
		color: rgba(255, 255, 255, 0.5);
	}

	.set-card.theme-dark .favorite-badge {
		background: rgba(93, 118, 189, 0.2);
		color: #9eb8ff;
		border-color: rgba(138, 183, 255, 0.22);
	}
</style>
