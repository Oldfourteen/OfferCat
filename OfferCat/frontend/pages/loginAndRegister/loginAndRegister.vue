<template>
	<!-- main-box -->
	<view class="container" :class="{'shrink-anim': isShrinking}">
		<!-- wrapper -->
		<view class="wrapper">
			<logoArea></logoArea>
			<titleArea></titleArea>
		</view>
		<!-- login in -->
		<view class="login-in">
			<button @click="goLogin">点击进入</button>
		</view>
	</view>
</template>

<script>
	import logoArea from './components/logoArea.vue';
	import titleArea from './components/titleArea.vue';
	export default {
		data() {
			return {
				isShrinking: false
			}
		},
		onShow() {
			// 每次显示页面时，恢复原状
			this.isShrinking = false;
		},
		methods: {
			goLogin() {
				this.isShrinking = true;
				// 延迟一点时间等动画开始后再跳转
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/login/login",
						animationType: 'slide-in-bottom',
						animationDuration: 300
					});
				}, 100);
			}
		},
		components:{
			logoArea,
			titleArea
		}
	}
</script>

<style lang="scss">	
	//防拖动
	page {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		overscroll-behavior: none;
		touch-action: none;
		// background-color: #000;
	}
	.container{
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding-top: 100rpx;
		height: 100vh;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
		background-color: #fff;
		transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-radius 0.3s ease;
		transform-origin: center center;
		&.shrink-anim {
			transform: scale(0.92);
			border-radius: 20px;
		}
		.wrapper{
			margin-top: 100rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.login-in{
			width: 100%;
			margin-top: 500rpx;
			button{
				width: 80%;
				border-radius: 50rpx;
				background-color: #5d76bd;
				color: white;
				transition: all 0.2s ease;
				font-weight: 300;
				&:active{
					background-color: #4b609a;
					transform: scale(0.98);
				}
			}
		}
	}
</style>
