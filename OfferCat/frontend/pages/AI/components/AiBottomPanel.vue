<template>
	<view class="bottom-panel" :class="[{ compact: compact }, themeClass, { 'recording-lock': recording }]" @click="handleRootClick">
		<scroll-view class="actions-scroll" scroll-x :show-scrollbar="false">
			<view class="actions-row">
				<view
					v-for="item in items"
					:key="item.id"
					class="action-chip"
					:class="{ 'is-active': activeMode && item.mode === activeMode }"
					@click="handleSelect(item.text)"
				>
					<view class="action-icon">{{ item.icon }}</view>
					<text class="action-text">{{ item.text }}</text>
				</view>
			</view>
		</scroll-view>

		<view class="composer-shell">
			<view v-if="images && images.length" class="composer-images">
				<view v-for="(img, index) in images" :key="index" class="composer-image-item">
					<image :src="img" mode="aspectFill" class="img-content" />
					<view class="img-delete-hitbox" @tap.stop="handleRemoveImage(index)">
						<view class="img-delete">×</view>
					</view>
				</view>
			</view>
			<view class="composer-row" :class="{ 'is-disabled': disabledInput }">
				<view class="composer-add" @click.stop="toggleMore">+</view>
				<textarea
					class="composer-input text-wrap-safe"
					:style="{ height: inputHeight + 'rpx' }"
					:maxlength="300"
					:show-confirm-bar="false"
					:adjust-position="false"
					:cursor-spacing="0"
					:disabled="recording || disabledInput"
					confirm-type="send"
					:placeholder="disabledInput ? '该面试已结束' : '向 AI 顾问发送消息'"
					placeholder-class="composer-placeholder"
					:value="modelValue"
					@input="onInput"
					@confirm="emitSend"
					@linechange="onLineChange"
				/>
				<view class="composer-send" :class="{ active: canSend, 'is-sending': sending }" @click="emitSend">
					<text v-if="!sending">发送</text>
					<image v-else class="sending-icon" src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzc3MTE4NDE4OTEzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUxNjMiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTEyIDEwMjRhNTEyLjU2ODg4OSA1MTIuNTY4ODg5IDAgMCAxLTUxMi01MTIgNTEyLjYyNTc3OCA1MTIuNjI1Nzc4IDAgMCAxIDUxMi01MTIgNTEyLjU2ODg4OSA1MTIuNTY4ODg5IDAgMCAxIDUxMiA1MTIgNTEyLjU2ODg4OSA1MTIuNTY4ODg5IDAgMCAxLTUxMiA1MTJ6TTUxMiA3My4zMjk3NzhjLTI0MS45NDg0NDQgMC00MzguNjcwMjIyIDE5Ni44MzU1NTYtNDM4LjY3MDIyMiA0MzguNjcwMjIyUzI3MC4wNTE1NTYgOTUwLjY3MDIyMiA1MTIgOTUwLjY3MDIyMnM0MzguNjcwMjIyLTE5Ni44MzU1NTYgNDM4LjY3MDIyMi00MzguNjcwMjIyUzc1My45NDg0NDQgNzMuMzI5Nzc4IDUxMiA3My4zMjk3Nzh6IG0wIDY4Ni41OTJhMjQ1LjE5MTExMSAyNDUuMTkxMTExIDAgMSAxIDAtNDkwLjM4MjIyMiAyNDUuMTkxMTExIDI0NS4xOTExMTEgMCAwIDEgMCA0OTAuMzgyMjIyeiIgZmlsbD0iI2Q4MWUwNiIgcC1pZD0iNTE2NCI+PC9wYXRoPjwvc3ZnPg==" mode="aspectFit" />
				</view>
			</view>
		</view>

		<view v-if="moreVisible" class="more-mask" @tap="closeMore"></view>

		<view class="more-panel" :class="{ open: moreVisible }" @click.stop>
			<view class="more-grid">
				<view class="more-item album-item" @click="pickAlbum">
					<view class="more-icon">图</view>
					<text class="more-text">相册</text>
				</view>
				<view
					class="more-item voice-item"
					:class="{ recording: recording }"
					@touchstart="startVoice"
					@touchend="stopVoice"
					@touchcancel="stopVoice"
				>
					<view class="more-icon">音</view>
					<text class="more-text">{{ recording ? '松开结束' : '按住说话' }}</text>
				</view>
			</view>
		</view>

		<view v-if="recording" class="voice-hint">
			<view class="voice-wave">
				<view class="voice-bar b1"></view>
				<view class="voice-bar b2"></view>
				<view class="voice-bar b3"></view>
				<view class="voice-bar b4"></view>
				<view class="voice-bar b5"></view>
				<view class="voice-bar b6"></view>
				<view class="voice-bar b7"></view>
			</view>
		</view>
	</view>
</template>

<script>
		export default {
			name: 'AiBottomPanel',
			props: {
			theme: {
				type: String,
				default: 'light'
			},
			interviewLock: {
				type: Boolean,
				default: false
			},
			disabledInput: {
				type: Boolean,
				default: false
			},
			activeMode: {
				type: String,
				default: ''
			},
			items: {
				type: Array,
				default() {
					return []
				}
			},
			images: {
				type: Array,
				default() {
					return []
				}
			},
			compact: Boolean,
			sending: {
				type: Boolean,
				default: false
			},
			modelValue: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				moreVisible: false,
				recording: false,
				recorderManager: null,
				inputHeight: 44
			}
		},
		watch: {
			modelValue(newVal) {
				if (!newVal) {
					this.inputHeight = 44
				}
			},
			moreVisible() {
				this.$emit('height-change')
			},
			recording() {
				this.$emit('height-change')
			}
		},
		computed: {
			themeClass() {
				return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
			},
			canSend() {
				return !this.recording && !this.disabledInput && (String(this.modelValue || '').trim().length > 0 || (this.images && this.images.length > 0))
			}
		},
		methods: {
			showInterviewLockedToast() {
				// 将子组件的 Toast 改为触发父组件的方法以显示弹窗
				this.$parent.showGiveUpModal = true
			},
			handleRemoveImage(index) {
				if (this.recording || this.disabledInput) return
				this.$emit('remove-image', index)
			},
			handleRootClick() {
				if (this.moreVisible) {
					this.moreVisible = false
				}
			},
			handleSelect(text) {
				if (this.interviewLock) {
					this.showInterviewLockedToast()
					return
				}
				if (this.recording) {
					return
				}
				this.moreVisible = false
				this.$emit('select', text)
			},
			toggleMore() {
				if (this.recording || this.disabledInput) {
					return
				}
				this.moreVisible = !this.moreVisible
			},
			closeMore() {
				if (this.recording) {
					return
				}
				this.moreVisible = false
			},
			pickAlbum() {
				if (this.recording) {
					return
				}
				this.$emit('before-pick')
				uni.chooseImage({
					count: 3,
					sourceType: ['album'],
					success: res => {
						const filePaths = (res.tempFilePaths || []).slice(0, 3)
						if (!filePaths.length) {
							return
						}
						this.moreVisible = false
						this.$emit('pick-image', filePaths)
					}
				})
			},
			getRecorderManager() {
				if (this.recorderManager) {
					return this.recorderManager
				}
				if (typeof uni.getRecorderManager !== 'function') {
					return null
				}
				const manager = uni.getRecorderManager()
				manager.onStop(res => {
					const filePath = res && res.tempFilePath
					this.recording = false
					this.moreVisible = false
					if (filePath) {
						if (res.duration < 500) {
							uni.showToast({ title: '录音时间太短', icon: 'none' })
							return
						}
						this.$emit('voice-input', { filePath, duration: res.duration || 0 })
					}
				})
				manager.onError(() => {
					this.recording = false
					uni.showToast({ title: '录音失败', icon: 'none' })
				})
				this.recorderManager = manager
				return manager
			},
			startVoice() {
				const manager = this.getRecorderManager()
				if (!manager) {
					uni.showToast({ title: '当前平台不支持语音', icon: 'none' })
					return
				}
				if (this.recording) {
					return
				}
				this.recording = true
				try {
					manager.start({ format: 'mp3' })
				} catch (error) {
					this.recording = false
				}
			},
			stopVoice() {
				if (!this.recording) {
					return
				}
				const manager = this.getRecorderManager()
				if (!manager) {
					this.recording = false
					return
				}
				try {
					manager.stop()
				} catch (error) {
					this.recording = false
				}
			},
			toggleVoice() {
				if (this.recording) {
					this.stopVoice()
					return
				}
				this.startVoice()
			},
			onInput(event) {
				if (this.recording) {
					return
				}
				this.$emit('update:modelValue', event.detail.value)
			},
			onLineChange(e) {
				const lineCount = e.detail.lineCount || 1;
				const lines = Math.min(lineCount, 5);
				this.inputHeight = lines * 44;
			},
			emitSend() {
				if (this.recording || this.sending || this.disabledInput) {
					return
				}
				if (!this.canSend) {
					return
				}
				this.moreVisible = false
				this.$emit('send')
			}
		}
	}
</script>

<style lang="scss">
	.bottom-panel {
		padding: 16rpx 18rpx calc(18rpx + env(safe-area-inset-bottom));
		background: linear-gradient(180deg, rgba(249, 250, 253, 0.92) 0%, #f9fafd 22%, #f9fafd 100%);
		backdrop-filter: blur(12rpx);
	}

	.bottom-panel.compact {
		padding-top: 10rpx;
	}

	.actions-scroll {
		white-space: nowrap;
		margin-bottom: 14rpx;

		&::-webkit-scrollbar {
			display: none;
			width: 0;
			height: 0;
		}
	}

	.bottom-panel.compact .actions-scroll {
		margin-bottom: 10rpx;
	}

	.actions-row {
		display: inline-flex;
		gap: 16rpx;
		padding-bottom: 8rpx;
	}

	.action-chip {
		min-width: 260rpx;
		max-width: 300rpx;
		padding: 18rpx 20rpx;
		background: rgba(255, 255, 255, 0.94);
		border: 2rpx solid rgba(49, 101, 215, 0.08);
		border-radius: 26rpx;
		box-shadow: 0 10rpx 24rpx rgba(49, 101, 215, 0.06);
		display: inline-flex;
		align-items: center;
		transition: all 0.2s ease;
	}

	.action-chip.is-active {
		background: #3165d7;
		border-color: #3165d7;
		box-shadow: 0 12rpx 28rpx rgba(49, 101, 215, 0.25);
	}

	.action-icon {
		width: 44rpx;
		height: 44rpx;
		border-radius: 14rpx;
		background: rgba(49, 101, 215, 0.1);
		color: #3165d7;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		font-weight: 700;
		margin-right: 14rpx;
		flex-shrink: 0;
	}

	.action-text {
		font-size: 24rpx;
		line-height: 1.4;
		color: #334666;
		white-space: normal;
	}

	.action-chip.is-active .action-icon {
		background: rgba(255, 255, 255, 0.2);
		color: #ffffff;
	}

	.action-chip.is-active .action-text {
		color: #ffffff;
	}

	.composer-shell {
		display: flex;
		flex-direction: column;
		padding: 16rpx 18rpx;
		border-radius: 34rpx;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 18rpx 36rpx rgba(21, 48, 94, 0.08);
		border: 2rpx solid rgba(49, 101, 215, 0.08);
	}

	.composer-row {
		display: flex;
		align-items: flex-end;
		width: 100%;
	}

	.composer-row.is-disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	.composer-images {
		display: flex;
		flex-wrap: wrap;
		gap: 24rpx;
		padding: 12rpx 12rpx 16rpx 12rpx;
	}

	.composer-image-item {
		position: relative;
		width: 120rpx;
		height: 120rpx;
		border-radius: 16rpx;
		background: #f0f4f8;
		overflow: visible;
	}

	.img-content {
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
	}

	.img-delete-hitbox {
		position: absolute;
		top: -16rpx;
		right: -16rpx;
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.img-delete {
		width: 36rpx;
		height: 36rpx;
		background: rgba(0, 0, 0, 0.5);
		color: #ffffff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		pointer-events: none;
	}

	.composer-add,
	.composer-send {
		flex-shrink: 0;
	}

	.composer-add {
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 3rpx;
		border-radius: 16rpx;
		color: #51698f;
		font-size: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.composer-input {
		flex: 1;
		min-height: 44rpx;
		max-height: 220rpx;
		margin: 0 12rpx 6rpx 12rpx;
		font-size: 28rpx;
		line-height: 44rpx;
		color: #21365f;
		background: transparent;
		padding: 0;
		resize: none;
		transition: height 0.1s ease;
	}
	
	.composer-input:focus {
		outline: none;
	}

	.composer-placeholder {
		color: #a4aec1;
	}

	.composer-send {
		padding: 12rpx 22rpx;
		border-radius: 999rpx;
		background: #4f6ea8;
		color: #ffffff;
		font-size: 24rpx;
		font-weight: 700;
		transition: background 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease, opacity 0.16s ease;
		opacity: 0.92;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 92rpx;
		box-sizing: border-box;
	}

	.sending-icon {
		width: 32rpx;
		height: 32rpx;
		animation: pulse-scale 0.8s infinite alternate ease-in-out;
	}

	@keyframes pulse-scale {
		0% { transform: scale(0.7); }
		100% { transform: scale(1.1); }
	}

	.composer-send.active,
	.composer-send.is-sending {
		background: #3165d7;
		box-shadow: 0 12rpx 26rpx rgba(49, 101, 215, 0.28);
		opacity: 1;
	}

	.more-panel {
		position: relative;
		z-index: 6;
		margin-top: 16rpx;
		overflow: hidden;
		max-height: 0;
		opacity: 0;
		transform: translateY(10rpx);
		transition: max-height 0.18s ease, opacity 0.18s ease, transform 0.18s ease;
	}

	.more-mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 5;
		background: transparent;
	}

	.more-panel.open {
		max-height: 240rpx;
		opacity: 1;
		transform: translateY(0);
	}

	.more-grid {
		display: flex;
		gap: 26rpx;
		padding: 6rpx 6rpx 0;
	}

	.more-item {
		width: 200rpx;
		height: 170rpx;
		border-radius: 26rpx;
		background: rgba(255, 255, 255, 0.94);
		border: 2rpx solid rgba(49, 101, 215, 0.08);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 14rpx;
	}

	.more-item.recording {
		border-color: rgba(49, 101, 215, 0.4);
		box-shadow: 0 16rpx 34rpx rgba(49, 101, 215, 0.18);
	}

	.recording-lock .action-chip,
	.recording-lock .composer-add,
	.recording-lock .composer-send,
	.recording-lock .album-item,
	.recording-lock .more-mask {
		pointer-events: none;
		opacity: 0.55;
	}

	.recording-lock .voice-item {
		pointer-events: auto;
		opacity: 1;
	}

	.voice-hint {
		position: fixed;
		left: 50%;
		bottom: calc(260rpx + env(safe-area-inset-bottom));
		transform: translateX(-50%);
		z-index: 99;
		width: 520rpx;
		height: 140rpx;
		border-radius: 32rpx;
		background: #3165d7;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 24rpx 70rpx rgba(49, 101, 215, 0.3);
		pointer-events: none;
	}

	.voice-wave {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.voice-bar {
		width: 10rpx;
		height: 28rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.95);
		animation: voiceWave 0.9s ease-in-out infinite;
	}

	.voice-bar.b1 { animation-delay: 0s; }
	.voice-bar.b2 { animation-delay: 0.08s; }
	.voice-bar.b3 { animation-delay: 0.16s; }
	.voice-bar.b4 { animation-delay: 0.24s; }
	.voice-bar.b5 { animation-delay: 0.16s; }
	.voice-bar.b6 { animation-delay: 0.08s; }
	.voice-bar.b7 { animation-delay: 0s; }

	@keyframes voiceWave {
		0% { height: 22rpx; opacity: 0.7; }
		30% { height: 72rpx; opacity: 1; }
		60% { height: 34rpx; opacity: 0.85; }
		100% { height: 22rpx; opacity: 0.7; }
	}

	.more-icon {
		width: 72rpx;
		height: 72rpx;
		border-radius: 22rpx;
		background: rgba(49, 101, 215, 0.1);
		color: #3165d7;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 800;
	}

	.more-text {
		font-size: 26rpx;
		color: #334666;
	}

	.bottom-panel.theme-dark {
		background: linear-gradient(180deg, rgba(18, 19, 24, 0.92) 0%, #181a1f 22%, #181a1f 100%);

		.action-chip,
		.composer-shell {
			background: rgba(35, 37, 43, 0.96);
			border-color: rgba(255, 255, 255, 0.06);
			box-shadow: 0 18rpx 36rpx rgba(0, 0, 0, 0.2);
		}

		.action-chip.is-active {
			background: #4a67f7;
			border-color: #4a67f7;
		}

		.action-text,
		.composer-input {
			color: #eef2f8;
		}
		
		.composer-input:focus {
			outline: none;
		}

		.action-icon,
		.composer-add {
			background: rgba(255, 255, 255, 0.08);
			color: #d7e1f5;
		}

		.composer-placeholder {
			color: rgba(255, 255, 255, 0.36);
		}

		.more-item {
			background: rgba(35, 37, 43, 0.96);
			border-color: rgba(255, 255, 255, 0.06);
		}

		.more-icon {
			background: rgba(255, 255, 255, 0.08);
			color: #d7e1f5;
		}

		.more-text {
			color: #eef2f8;
		}
	}
</style>
<!-- /*
//                            _ooOoo_  
//                           o8888888o  
//                           88" . "88  
//                           (| -_- |)  
//                            O\ = /O  
//                        ____/`---'\____  
//                      .   ' \\| |// `.  
//                       / \\||| : |||// \  
//                     / _||||| -:- |||||- \  
//                       | | \\\ - /// | |  
//                     | \_| ''\---/'' | |  
//                      \ .-\__ `-` ___/-. /  
//                   ___`. .' /--.--\ `. . __  
//                ."" '< `.___\_<|>_/___.' >'"".  
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |  
//                 \ \ `-. \_ __\ /__ _/ .-` / /  
//         ======`-.____`-.___\_____/___.-`____.-'======  
//                            `=---='  
//  
//         .............................................  
//                  佛祖保佑             永无BUG 
//          佛曰:  
//                  写字楼里写字间，写字间里程序员；  
//                  程序人员写程序，又拿程序换酒钱。  
//                  酒醒只在网上坐，酒醉还来网下眠；  
//                  酒醉酒醒日复日，网上网下年复年。  
//                  但愿老死电脑间，不愿鞠躬老板前；  
//                  奔驰宝马贵者趣，公交自行程序员。  
//                  别人笑我忒疯癫，我笑自己命太贱；  
//                  不见满街漂亮妹，哪个归得程序员？
*/ -->
