<template>
	<image
		class="common-avatar-image"
		:class="imageClass"
		:src="resolvedSrc"
		:mode="mode"
		@error="handleError"
	/>
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
				innerSrc: this.src || DEFAULT_AVATAR
			}
		},
		computed: {
			resolvedSrc() {
				return this.innerSrc || DEFAULT_AVATAR
			}
		},
		watch: {
			src: {
				immediate: true,
				handler(value) {
					this.innerSrc = value || DEFAULT_AVATAR
				}
			}
		},
		methods: {
			handleError() {
				if (this.innerSrc === DEFAULT_AVATAR) {
					return
				}

				this.innerSrc = DEFAULT_AVATAR
				if (this.syncProfile) {
					saveUserProfile({ avatar: DEFAULT_AVATAR })
				}
				this.$emit('error', DEFAULT_AVATAR)
			}
		}
	}
</script>

<style>
	.common-avatar-image {
		display: block;
	}
</style>
