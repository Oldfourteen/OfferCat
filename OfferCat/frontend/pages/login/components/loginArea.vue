<template>
	<view class="login-button-area">
		<!-- 主按钮触发一键登录，由父组件决定是否可继续执行。 -->
		<view class="btn primary-btn" @click="onLoginClick">
			本机号码一键登录
		</view>
		
		<!-- 文本入口跳转到其他登录方式页。 -->
		<view class="text-link" @click="onOtherLoginClick">
			其他登录方式
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			onLoginClick() {
			  // 一键登录依赖 App 端 Univerify；H5 / 小程序等无 uni.preLogin，直接调用会报错。
			  if (typeof uni.preLogin !== 'function') {
			    uni.showToast({
			      title: '一键登录仅在 App 内可用，请选其他登录方式',
			      icon: 'none',
			      duration: 2500
			    });
			    return;
			  }

			  // 预登录（提升速度）
			  uni.preLogin({
			    provider: 'univerify',
			    success: () => {
			      console.log("预登录成功");
			
			      // 调用一键登录
			      uni.getUniverifyManager().login({
			        success: async (res) => {
			          console.log("授权成功", res);
			          
			          // 调用云函数换取真实手机号
			          const result = await uniCloud.callFunction({
			            name: "phoneLogin",
			            data: {
			              access_token: res.access_token
			            }
			          });
			
			          // 拿到手机号！
			          const phone = result.result.phone;
			          console.log("本机号码 =", phone);
			
			          // 成功后你想干嘛就写这里
			          uni.showToast({
			            title: "登录成功：" + phone,
			            icon: "none"
			          });
			
			          // 跳首页示例
			          // uni.switchTab({ url: "/pages/index/index" });
			        },
			        fail: (err) => {
			          console.error("登录失败", err);
			          uni.showToast({
			            title: "登录失败，请重试",
			            icon: "none"
			          });
			        }
			      });
			    },
			    fail: (err) => {
			      console.error("预登录失败", err);
			    }
			  });
			},
			onOtherLoginClick() {
				// 将其他登录方式入口点击事件抛给父页面做页面跳转。
				this.$emit('otherLogin');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-button-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin-top: 10px;

		.btn {
			width: 80%;
			height: 45px;
			border-radius: 25px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			margin-bottom: 16px;
			transition: all 0.2s ease;

			&:active {
				transform: scale(0.98);
			}
		}

		.primary-btn {
			background-color: #5d76bd;
			color: #fff;
			box-shadow: 0 4px 10px rgba(93, 118, 189, 0.3);

			&:active {
				background-color: #4b609a;
			}
		}

		.text-link {
			font-size: 14px;
			color: #666;
			padding: 8px 16px;
			transition: opacity 0.2s ease;

			&:active {
				opacity: 0.6;
			}
		}
	}
</style>
