<template>
	<!-- telephone area -->
	<view class="telephone-area">
		<!-- telephone -->
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
				if (!this.phone) return '本机号码'
				return this.maskPhone(this.phone)
			}
		},
		onShow() {
			this.syncPhone()
		},
		mounted() {
			this.syncPhone()
		},
		methods: {
			syncPhone() {
				const user = getUser()
				this.phone = (user && user.phone) ? String(user.phone) : ''
			},
			maskPhone(phone) {
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
			font-weight: bold;
			text-align: center;
			color: #333;
			letter-spacing: 0.6px;
		}
	}
</style>
