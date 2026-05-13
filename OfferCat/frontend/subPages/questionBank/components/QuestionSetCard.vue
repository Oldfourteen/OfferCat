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
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 14rpx 34rpx rgba(16, 51, 117, 0.08);
	}

	.company-badge {
		width: 92rpx;
		height: 92rpx;
		border-radius: 26rpx;
		background: linear-gradient(135deg, #ffffff, #f1f5ff);
		box-shadow: inset 0 0 0 2rpx rgba(49, 101, 215, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 800;
		color: #2a5fc2;
	}

	.set-card.type-interview .company-badge {
		background: linear-gradient(135deg, #ffffff, rgba(100, 232, 208, 0.16));
		box-shadow: inset 0 0 0 2rpx rgba(100, 232, 208, 0.16);
		color: #157e70;
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
		background: rgba(255, 181, 71, 0.16);
		font-size: 20rpx;
		font-weight: 700;
		color: #d2822a;
	}

	.set-meta {
		display: block;
		margin-top: 18rpx;
		font-size: 22rpx;
		font-weight: 700;
		color: #a0a8b8;
	}

	.set-card.theme-dark {
		background: rgba(29, 31, 36, 0.96);
		box-shadow: 0 14rpx 34rpx rgba(0, 0, 0, 0.2);
	}

	.set-card.theme-dark .company-badge {
		background: linear-gradient(135deg, #23252b, #2c2f37);
		box-shadow: inset 0 0 0 2rpx rgba(255, 255, 255, 0.06);
		color: #8ab7ff;
	}

	.set-card.theme-dark.type-interview .company-badge {
		background: linear-gradient(135deg, rgba(35, 37, 43, 0.96), rgba(100, 232, 208, 0.16));
		box-shadow: inset 0 0 0 2rpx rgba(100, 232, 208, 0.16);
		color: #45f9de;
	}

	.set-card.theme-dark .set-title {
		color: #f4f7fb;
	}

	.set-card.theme-dark .set-meta {
		color: rgba(255, 255, 255, 0.5);
	}

	.set-card.theme-dark .favorite-badge {
		background: rgba(255, 172, 77, 0.16);
		color: #ffd28a;
	}
</style>
