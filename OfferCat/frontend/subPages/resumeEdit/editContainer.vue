<template>
	<view class="edit-container-page" :class="themeClass">
		<topNavBar :title="pageTitle" :titleStyle="{ color: isDarkTheme ? '#f4f7fb' : '#000', fontSize: '18px' }" :customStyle="{ backgroundColor: isDarkTheme ? '#1a1c22' : '#fff' }" />
		
		<view class="page-content">
			<!-- 动态组件渲染，根据传入的 type 显示对应的表单 -->
			<component :is="currentComponent" ref="formRef" v-bind="componentProps"></component>
		</view>

		<view class="bottom-actions-wrap">
			<view class="bottom-actions">
				<view class="action-btn cancel-btn" @click="handleCancel">取消</view>
				<view v-if="isEditingEntry" class="action-btn danger-btn" @click="handleDelete">删除</view>
				<view class="action-btn save-btn" @click="handleSave(isEditingEntry ? 'overwrite' : 'default')">{{ isEditingEntry ? '保存修改' : '保存' }}</view>
				<view v-if="isEditingEntry" class="action-btn secondary-btn" @click="handleSave('createNew')">另存为</view>
			</view>
			<!-- 底部安全区 -->
			<view class="safe-area-inset-bottom"></view>
		</view>
	</view>
</template>

<script>
	import topNavBar from '../onlineResumeMake/components/topNavBar.vue'
	import basicInfoForm from './components/basicInfoForm.vue'
	import selfEvaluationForm from './components/selfEvaluationForm.vue'
	import educationForm from './components/educationForm.vue'
	import schoolExperienceForm from './components/schoolExperienceForm.vue'
	import workExperienceForm from './components/workExperienceForm.vue'
	import projectExperienceForm from './components/projectExperienceForm.vue'
	import skillForm from './components/skillForm.vue'
	import themeMixin from '@/utils/themeMixin.js'

	const titleMap = {
		basicInfo: '编辑基本信息',
		selfEvaluation: '编辑自我评价',
		education: '编辑教育背景',
		schoolExperience: '编辑在校经历',
		workExperience: '编辑工作经历',
		projectExperience: '编辑项目经历',
		skill: '编辑技能熟练度'
	}

	const componentMap = {
		basicInfo: basicInfoForm,
		selfEvaluation: selfEvaluationForm,
		education: educationForm,
		schoolExperience: schoolExperienceForm,
		workExperience: workExperienceForm,
		projectExperience: projectExperienceForm,
		skill: skillForm
	}

	export default {
		mixins: [themeMixin],
		components: {
			topNavBar,
			basicInfoForm,
			selfEvaluationForm,
			educationForm,
			schoolExperienceForm,
			workExperienceForm,
			projectExperienceForm,
			skillForm
		},
		data() {
			return {
				type: '', // 从参数获取当前编辑的模块类型
				initialPayload: null,
				entryId: null
			}
		},
		computed: {
			isEditingEntry() {
				return !!this.entryId
			},
			pageTitle() {
				return titleMap[this.type] || '编辑简历'
			},
			currentComponent() {
				return componentMap[this.type] || null
			},
			componentProps() {
				if (this.type === 'basicInfo') {
					return { initialData: this.initialPayload || {} }
				}
				if (this.type === 'selfEvaluation') {
					return { initialText: (this.initialPayload && this.initialPayload.text) ? this.initialPayload.text : '' }
				}
				if (this.type === 'skill') {
					const skills = (this.initialPayload && Array.isArray(this.initialPayload.skills))
						? this.initialPayload.skills
						: (Array.isArray(this.initialPayload) ? this.initialPayload : [])
					return { initialSkills: skills }
				}
				return { initialData: this.initialPayload || {} }
			}
		},
		onLoad(options) {
			if (options.type) {
				this.type = options.type
			}
			if (options.entry_id) {
				this.entryId = String(options.entry_id)
			}
			if (options.initial) {
				try {
					this.initialPayload = JSON.parse(decodeURIComponent(options.initial))
				} catch (e) {
					this.initialPayload = null
				}
			}
		},
		methods: {
			isMultiAppendType(type) {
				return ['education', 'schoolExperience', 'workExperience', 'projectExperience'].includes(type)
			},
			extractRawData(formComponent) {
				if (!formComponent) return null
				if (this.type === 'selfEvaluation') {
					return { text: String(formComponent.formData && formComponent.formData.content ? formComponent.formData.content : '') }
				}
				if (this.type === 'skill') {
					if (typeof formComponent.normalizeSkillsForDatabase === 'function') {
						return { skills: formComponent.normalizeSkillsForDatabase() }
					}
					return { skills: Array.isArray(formComponent.skills) ? formComponent.skills : [] }
				}
				if (formComponent.formData && typeof formComponent.formData === 'object') {
					return { ...formComponent.formData }
				}
				return null
			},
			handleCancel() {
				uni.navigateBack()
			},
			handleDelete() {
				if (!this.entryId) return
				uni.showModal({
					title: '确认删除',
					content: '删除后将从预览中移除，且不可恢复。',
					success: (res) => {
						if (!res.confirm) return
						uni.$emit('refreshResume', {
							type: this.type,
							action: 'delete',
							entryId: this.entryId
						})
						uni.showToast({ title: '已删除', icon: 'success' })
						setTimeout(() => {
							uni.navigateBack()
						}, 500)
					}
				})
			},
			handleSave(mode = 'default') {
				// 获取当前表单组件实例
				const formComponent = this.$refs.formRef
				if (formComponent) {
					// 增加保存前的表单验证（必填项为空则拦截）
					if (typeof formComponent.validate === 'function') {
						if (!formComponent.validate()) {
							return
						}
					}
					
					if (typeof formComponent.generateFormattedText === 'function') {
						// 获取拼装好的富文本字符串或者对象
						const formattedHtml = formComponent.generateFormattedText()
						const rawData = this.extractRawData(formComponent)
						const action = (() => {
							if (mode === 'createNew') return 'create'
							if (this.entryId) return 'update'
							return this.isMultiAppendType(this.type) ? 'create' : 'set'
						})()

						uni.$emit('refreshResume', {
							type: this.type,
							action,
							entryId: this.entryId,
							htmlContent: formattedHtml,
							rawData
						})
					}
				}

				uni.showToast({
					title: '保存成功',
					icon: 'success'
				})
				
				// 返回上一页
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit-container-page {
		height: 100vh;
		background-color: #f5f7fb;
		display: flex;
		flex-direction: column;
		overflow: hidden; /* 防止外层被拖拽拉伸 */

		.page-content {
			/* topNavBar 高度占位后，允许内容在内部独立滑动 */
			flex: 1;
			margin-top: calc(44px + var(--status-bar-height));
			margin-bottom: calc(80px + env(safe-area-inset-bottom));
			overflow-y: auto; /* 内容超出时可内部滑动 */
			-webkit-overflow-scrolling: touch;
		}

		.bottom-actions-wrap {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.04);
			z-index: 100;

			.bottom-actions {
				display: flex;
				flex-wrap: wrap;
				padding: 10px 20px;
				gap: 12px;

				.action-btn {
					flex: 1 1 calc(50% - 6px);
					height: 44px;
					border-radius: 22px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 16px;
					font-weight: bold;
					transition: all 0.2s;
					
					&:active {
						transform: scale(0.98);
					}
				}

				.cancel-btn {
					background-color: #f3f4f6;
					color: #4b5563;
				}

				.save-btn {
					background-color: #1677ff;
					color: #fff;
				}

				.secondary-btn {
					background-color: #111827;
					color: #fff;
				}

				.danger-btn {
					background-color: #fee2e2;
					color: #b91c1c;
				}
			}

			.safe-area-inset-bottom {
				height: env(safe-area-inset-bottom);
			}
		}

		&.theme-dark {
			background-color: #111216;

			.bottom-actions-wrap {
				background-color: rgba(17, 18, 22, 0.95);
				box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.2);

				.bottom-actions {
					.cancel-btn {
						background-color: #23252b;
						color: #f4f7fb;
					}

					.save-btn {
						background-color: #3165d7;
						color: #fff;
					}

					.secondary-btn {
						background-color: #f4f7fb;
						color: #111216;
					}

					.danger-btn {
						background-color: rgba(239, 68, 68, 0.15);
						color: #ef4444;
					}
				}
			}
		}
	}
</style>
