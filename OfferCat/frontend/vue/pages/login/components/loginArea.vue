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
	import { completeOneClickLoginWithPhone } from '../../../utils/auth.js'

	export default {
		data() {
			return {};
		},
		methods: {
			closeAuthViewSafely() {
				if (typeof uni.closeAuthView !== 'function') {
					return
				}
				try {
					uni.closeAuthView()
				} catch (e) {
					// 忽略授权页已关闭等场景，避免影响主流程。
				}
			},
			/** 先交给父页做协议校验，通过后由父页调用 runOneClickLogin */
			onLoginClick() {
				this.$emit('login')
			},
			/**
			 * App 端 UniVerify 授权 → uniCloud phonelogin 换号 → 后端 /auth/login（oneClick）
			 */
			runOneClickLogin() {
				return new Promise((resolve, reject) => {
					if (typeof uni.preLogin !== 'function') {
						reject(new Error('一键登录仅在 App 内可用，请选其他登录方式'))
						return
					}
					if (typeof uniCloud === 'undefined' || typeof uniCloud.callFunction !== 'function') {
						reject(new Error('未初始化 uniCloud，无法换取手机号'))
						return
					}
					uni.preLogin({
						provider: 'univerify',
						success: () => {
							uni.getUniverifyManager().login({
								success: async (res) => {
									try {
										const cf = await uniCloud.callFunction({
											name: 'phonelogin',
											data: {
												access_token: res.access_token
											}
										})
										const payload = cf && cf.result ? cf.result : cf
										if (!payload || payload.code !== 0 || !payload.phone) {
											reject(new Error((payload && payload.msg) || '获取手机号失败'))
											return
										}
										const session = await completeOneClickLoginWithPhone(payload.phone)
										this.closeAuthViewSafely()
										resolve(session)
									} catch (e) {
										this.closeAuthViewSafely()
										reject(e)
									}
								},
								fail: (err) => {
									this.closeAuthViewSafely()
									reject(new Error((err && err.errMsg) || '一键登录授权失败'))
								}
							})
						},
						fail: (err) => {
							reject(new Error((err && err.errMsg) || '一键登录预校验失败'))
						}
					})
				})
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
