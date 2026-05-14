<template>
	<view class="avatar-wrapper">
		<image
			class="common-avatar-image prev"
			:class="imageClass"
			:src="prevSrc"
			:mode="mode"
			@error="handlePrevError"
		/>
		<image
			class="common-avatar-image current"
			:class="imageClass"
			:src="currentSrc"
			:mode="mode"
			@load="handleLoad"
			@error="handleError"
		/>
	</view>
</template>
<script>
	import { DEFAULT_AVATAR, saveUserProfile } from '@/utils/userProfile.js'

	export default {
		name: 'CommonAvatar',
		props: {
			src: {
				type: String,
				default: DEFAULT_AVATAR
			},
			mode: {
				type: String,
				default: 'aspectFill'
			},
			imageClass: {
				type: String,
				default: ''
			},
			syncProfile: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				currentSrc: this.src || DEFAULT_AVATAR,
				prevSrc: this.src || DEFAULT_AVATAR,
				isLoading: false
			}
		},
		watch: {
			src: {
				immediate: false,
				handler(value) {
					if (value && value !== this.currentSrc) {
						this.isLoading = true
						this.currentSrc = value
					}
				}
			}
		},
		methods: {
			handleLoad() {
				this.isLoading = false
				this.prevSrc = this.currentSrc
			},
			handlePrevError() {
				if (this.prevSrc !== DEFAULT_AVATAR) {
					this.prevSrc = DEFAULT_AVATAR
				}
			},
			handleError() {
				if (this.currentSrc === DEFAULT_AVATAR) {
					return
				}

				this.currentSrc = DEFAULT_AVATAR
				this.prevSrc = DEFAULT_AVATAR
				this.isLoading = false
				if (this.syncProfile) {
					saveUserProfile({ avatar: DEFAULT_AVATAR })
				}
				this.$emit('error', DEFAULT_AVATAR)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.avatar-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.common-avatar-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
		transition: opacity 0.3s ease;
	}

	.common-avatar-image.prev {
		opacity: 1;
	}

	.common-avatar-image.current {
		opacity: 0;
	}

	.common-avatar-image.current:not([src=""]) {
		opacity: 1;
	}
</style>
