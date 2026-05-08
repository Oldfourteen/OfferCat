<template>
	<!-- back -->
	<view class="custom-nav">
		<!-- 返回按钮组件可复用于登录相关子页面顶部。 -->
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
				// 点击后直接回到上一页。
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
