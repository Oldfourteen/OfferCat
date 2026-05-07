<template>
	<!-- back -->
	<view class="custom-nav">
		<!-- back button -->
	    <view class="back-btn" @click="goBack">
			<!-- back image -->
			<image class="back" src="/static/close.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			goBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.custom-nav {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;

		.back-btn {
			padding: 60px 20px 20px 23px; /* 增加点击区域并调整位置 */

			.back {
				height: 20px;
				width: 20px;
				display: block;
			}
		}
	}
</style>
