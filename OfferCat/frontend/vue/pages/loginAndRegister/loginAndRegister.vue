<template>
	<!-- main-box -->
	<view class="container" :class="{'shrink-anim': isShrinking}">
		<!-- wrapper -->
		<view class="wrapper">
			<!-- 品牌展示区由 logo 和标题文案组成，用于首页首屏引导。 -->
			<logoArea></logoArea>
			<titleArea></titleArea>
		</view>
		<!-- 底部按钮负责触发进入登录流程。 -->
		<view class="login-in">
			<button @click="goLogin">点击进入</button>
		</view>
	</view>
</template>

<script>
	import logoArea from './components/logoArea.vue';
	import titleArea from './components/titleArea.vue';
	import { warmApiConnection } from '@/utils/apiWarmup.js';
	export default {
		data() {
			return {
				// 进入登录页前先执行收缩动画，增强页面切换的过渡感。
				isShrinking: false
			}
		},
		onLoad() {
			void warmApiConnection()
		},
		onShow() {
			// 每次返回欢迎页时重置动画状态，避免页面保持缩小态。
			this.isShrinking = false;
		},
		methods: {
			goLogin() {
				// 先触发缩放动画，再以底部滑入方式打开登录页。
				this.isShrinking = true;
				// 延迟一点时间等动画开始后再跳转。
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/login/login",
						animationType: 'fade-in',
						animationDuration: 200
					});
				}, 100);
			}
		},
		components:{
			// 欢迎页只依赖品牌 logo 和标题两个静态展示组件。
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
