<template>
	<!-- telephone area -->
	<view class="telephone-area">
		<!-- 手机号展示区优先回显已登录用户号码，否则使用默认占位文案。 -->
		<view class="telephone">
			{{ displayPhone }}
		</view>
	</view>
</template>

<script>
	import { getUser } from '../../../utils/user'
	
	export default {
		data() {
			return {
				phone: ''
			}
		},
		computed: {
			displayPhone() {
				// 根据本地手机号决定显示脱敏号码还是品牌占位文案。
				if (!this.phone) return 'OfferCat 简历猫'
				return this.maskPhone(this.phone)
			}
		},
		onShow() {
			// 页面重新显示时同步一次本地手机号，避免登录态变更后未刷新。
			this.syncPhone()
		},
		mounted() {
			// 初次挂载即读取本地用户信息。
			this.syncPhone()
		},
		methods: {
			syncPhone() {
				// 从本地用户缓存中提取手机号，供页面展示使用。
				const user = getUser()
				this.phone = (user && user.phone) ? String(user.phone) : ''
			},
			maskPhone(phone) {
				// 将中间四位脱敏，避免完整手机号直接暴露在登录页。
				const p = String(phone || '')
				if (p.length < 7) return p
				return `${p.slice(0, 3)}****${p.slice(-4)}`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.telephone-area {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: 26px;

		.telephone {
			font-size: 26px;
			font-weight: 700;
			text-align: center;
			color: #1e2333;
			letter-spacing: 0.08em;
			text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
		}
	}
</style>
