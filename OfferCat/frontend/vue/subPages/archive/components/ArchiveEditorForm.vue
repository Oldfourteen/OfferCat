<template>
	<view class="editor-form" :class="themeClass">
		<view v-for="field in fields" :key="field.key" class="form-item">
			<view class="form-label-row">
				<text class="form-label">{{ field.label }}</text>
				<text v-if="field.maxlength" class="form-word-count">
					{{ fieldLength(field.key) }}/{{ field.maxlength }}
				</text>
			</view>
			<textarea
				v-if="field.type === 'textarea'"
				class="form-textarea"
				v-model="draft[field.key]"
				:placeholder="field.placeholder"
				placeholder-class="form-placeholder"
				:maxlength="field.maxlength || 300"
				:show-confirm-bar="false"
				:adjust-position="false"
				:cursor-spacing="24"
				:disable-default-padding="true"
				:auto-height="false"
			/>
			<input
				v-else
				class="form-input"
				v-model="draft[field.key]"
				:type="field.type || 'text'"
				:placeholder="field.placeholder"
				placeholder-class="form-placeholder"
				:maxlength="field.maxlength || 140"
				:adjust-position="false"
				:cursor-spacing="24"
				:disable-default-padding="true"
				@blur="onFieldBlur(field)"
			/>
		</view>

		<view class="form-actions">
			<view class="ghost-btn" @click="handleCancel">取消</view>
			<view class="primary-btn" @click="handleSave">保存</view>
		</view>
	</view>
</template>

<script>
	function cloneDraft(source, fields) {
		const next = {}
		fields.forEach(field => {
			next[field.key] = source && source[field.key] != null ? String(source[field.key]) : ''
		})
		return next
	}

	export default {
		name: 'ArchiveEditorForm',
		props: {
			fields: {
				type: Array,
				default: () => []
			},
			seed: {
				type: Object,
				default: () => ({})
			},
			archiveType: {
				type: String,
				default: ''
			},
			themeClass: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				draft: cloneDraft({}, this.fields)
			}
		},
		watch: {
			seed: {
				immediate: true,
				handler(value) {
					this.draft = cloneDraft(value, this.fields)
				}
			},
			fields: {
				immediate: true,
				handler(nextFields) {
					this.draft = cloneDraft(this.draft, nextFields)
				}
			}
		},
		methods: {
			fieldLength(key) {
				return (this.draft[key] || '').length
			},
			onFieldBlur(field) {
				if (this.archiveType !== 'awards' || field.key !== 'name') {
					return
				}
				const sanitized = (this.draft.name || '').replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '')
				if (sanitized !== this.draft.name) {
					this.draft.name = sanitized
				}
			},
			handleCancel() {
				this.$emit('cancel')
			},
			handleSave() {
				const payload = {}
				this.fields.forEach(field => {
					payload[field.key] = this.draft[field.key] || ''
				})
				this.$emit('save', payload)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.editor-form {
		margin-top: 22rpx;
	}

	.form-item + .form-item {
		margin-top: 18rpx;
	}

	.form-label-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.form-label,
	.form-word-count {
		display: block;
	}

	.form-label {
		font-size: 24rpx;
		font-weight: 700;
		color: #42526d;
	}

	.form-word-count {
		font-size: 22rpx;
		color: #a1aec4;
	}

	.form-input,
	.form-textarea {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 22rpx;
		border-radius: 20rpx;
		background: #f7f9fc;
		font-size: 26rpx;
		line-height: 1.5;
		color: #24345b;
		border: 2rpx solid rgba(49, 101, 215, 0.08);
	}

	.form-input {
		height: 88rpx;
	}

	.form-textarea {
		min-height: 180rpx;
		height: 180rpx;
	}

	.form-placeholder {
		color: #a1aec4;
	}

	.form-actions {
		margin-top: 24rpx;
		display: flex;
		gap: 16rpx;
	}

	.ghost-btn,
	.primary-btn {
		flex: 1;
		height: 84rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 700;
	}

	.ghost-btn {
		background: #eef2f8;
		color: #5f6f8e;
	}

	.primary-btn {
		background: linear-gradient(135deg, #4d65f7, #4151de);
		color: #ffffff;
		box-shadow: 0 14rpx 28rpx rgba(74, 103, 247, 0.18);
	}

	.editor-form.theme-dark .form-label,
	.editor-form.theme-dark .form-word-count {
		color: rgba(255, 255, 255, 0.58);
	}

	.editor-form.theme-dark .form-input,
	.editor-form.theme-dark .form-textarea {
		color: #f4f7fb;
		background: #23252b;
		border-color: rgba(255, 255, 255, 0.06);
	}

	.editor-form.theme-dark .form-placeholder {
		color: rgba(255, 255, 255, 0.34);
	}

	.editor-form.theme-dark .ghost-btn {
		background: #23252b;
		color: #dce6f8;
	}
</style>
