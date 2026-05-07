<template>
	<view class="form-wrapper" :class="themeClass">
		<view class="form-body">
			
			<!-- 技能名称输入区 -->
			<view class="section-label">技能名称</view>
			<view class="input-area">
				<input 
					class="tag-input" 
					type="text" 
					v-model="inputValue" 
					placeholder="请输入与工作相关的技能" 
					@confirm="addSkill" 
					maxlength="20"
				/>
				<view 
					class="add-btn" 
					:class="{ 'btn-disabled': !inputValue.trim() }" 
					@click="addSkill"
				>添加</view>
			</view>

			<!-- 技能列表区 -->
			<view class="section-label" v-if="skills.length > 0">技能</view>
			<view class="skills-list" v-if="skills.length > 0">
				<view class="skill-item" v-for="(item, index) in skills" :key="item.id">
					<!-- 最左侧：删除按钮（透明背景，独立） -->
					<view class="delete-btn" @click="removeSkill(index)">
						<uni-icons type="minus" size="18" color="#6b7280"></uni-icons>
					</view>
					
					<!-- 中间统一的带阴影胶囊容器 -->
					<view class="skill-capsule-wrap">
						<!-- 技能名称区块 -->
						<view class="skill-name-wrap">
							<text class="skill-name">{{ item.name }}</text>
						</view>
						
						<!-- 中间分割线 -->
						<view class="divider"></view>
						
						<!-- 熟练度区块 -->
						<view class="proficiency-wrap" @click="openProficiencyPopup(index)">
							<text :style="getProficiencyTextStyle(item.proficiency)">{{ getProficiencyText(item.proficiency) }}</text>
							<uni-icons type="right" size="14" color="#9ca3af"></uni-icons>
						</view>
					</view>

					<!-- 最右侧拖拽图标（已根据要求删除） -->
				</view>
			</view>
			
		</view>

		<!-- 自定义底部选项表单 (无取消按钮，左上右上圆角) -->
		<view class="custom-popup-mask" v-if="popupVisible" @click="closePopup">
			<view class="custom-popup-content" @click.stop>
				<view class="popup-header">
					<text>选择熟练度</text>
				</view>
				<view class="popup-list">
					<view 
						class="popup-item" 
						v-for="opt in proficiencyOptions" 
						:key="opt.value"
						@click="selectProficiency(opt.value)"
						:class="{ active: skills[editingIndex] && skills[editingIndex].proficiency === opt.value }"
					>
						<text>{{ opt.text }}</text>
						<uni-icons 
							v-if="skills[editingIndex] && skills[editingIndex].proficiency === opt.value" 
							type="checkmarkempty" 
							size="18" 
							color="#1677ff" 
							class="check-icon"
						></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import themeMixin from '@/utils/themeMixin.js'

	export default {
		name: 'skillForm',
		mixins: [themeMixin],
		props: {
			initialSkills: {
				type: Array,
				default: () => ([])
			}
		},
		data() {
			return {
				inputValue: '',
				skills: [], // 结构: { id: Date.now(), name: 'Vue', proficiency: 3 }
				// 对应数据库 proficiency: 1-初学，2-一般，3-掌握，4-熟练，5-精通
				proficiencyOptions: [
					{ value: 1, text: '初学' },
					{ value: 2, text: '一般' },
					{ value: 3, text: '掌握' },
					{ value: 4, text: '熟练' },
					{ value: 5, text: '精通' }
				],
				popupVisible: false,
				editingIndex: -1
			}
		},
		watch: {
			initialSkills: {
				handler(val) {
					if (!Array.isArray(val) || val.length === 0) return
					if (Array.isArray(this.skills) && this.skills.length > 0) return
					this.skills = val
						.map(item => ({
							id: Date.now() + Math.floor(Math.random() * 100000),
							name: String((item && (item.skill_name || item.name)) || '').trim(),
							proficiency: Number(item && item.proficiency) || 3
						}))
						.filter(item => item.name)
				},
				immediate: true
			}
		},
		methods: {
			validate() {
				if (this.skills.length === 0) {
					uni.showToast({ title: '请至少添加一项技能', icon: 'none' })
					return false
				}
				if (this.inputValue.trim()) {
					uni.showToast({ title: '您有未添加的技能，请先点击添加或清空输入框', icon: 'none' })
					return false
				}
				return true
			},
			// 添加技能
			addSkill() {
				const name = this.inputValue.trim()
				if (!name) {
					uni.showToast({ title: '请输入技能名称', icon: 'none' })
					return
				}
				const exists = this.skills.some(item => String(item.name || '').trim().toLowerCase() === name.toLowerCase())
				if (exists) {
					uni.showToast({ title: '技能已存在', icon: 'none' })
					return
				}
				
				this.skills.push({
					id: Date.now(),
					name: name,
					proficiency: 3 // 默认给定 3-掌握
				})
				
				// 清空输入框
				this.inputValue = ''
			},
			
			// 删除技能
			removeSkill(index) {
				this.skills.splice(index, 1)
			},
			
			// 根据 proficiency (1~5) 获取在 picker options 里的索引
			getPickerIndex(val) {
				const index = this.proficiencyOptions.findIndex(opt => opt.value === val)
				return index === -1 ? 0 : index
			},
			
			// 根据 proficiency 获取显示的文本
			getProficiencyText(val) {
				const opt = this.proficiencyOptions.find(o => o.value === val)
				return opt ? opt.text : '请选择'
			},
			getProficiencyTextStyle(val) {
				const level = Number(val) || 0
				const colorMap = {
					1: '#6b7280',
					2: '#374151',
					3: '#1677ff',
					4: '#10b981',
					5: '#059669'
				}
				return {
					color: colorMap[level] || '#374151',
					fontSize: '15px',
					fontWeight: '600'
				}
			},
			normalizeSkillsForDatabase() {
				return (this.skills || [])
					.map(item => ({
						skill_name: String(item.name || '').trim(),
						proficiency: Number(item.proficiency) || 3
					}))
					.filter(item => item.skill_name)
			},
			
			// 打开自定义选项弹窗
			openProficiencyPopup(index) {
				this.editingIndex = index
				this.popupVisible = true
			},
			
			// 关闭弹窗
			closePopup() {
				this.popupVisible = false
			},
			
			// 选择熟练度
			selectProficiency(val) {
				if (this.editingIndex !== -1) {
					this.skills[this.editingIndex].proficiency = val
				}
				this.closePopup()
			},
			// 生成带样式的大字段 HTML 字符串
			generateFormattedText() {
				const skillItems = this.normalizeSkillsForDatabase()
				if (!skillItems.length) {
					return { skills: [], html: '' }
				}
				
				let skillsHtml = skillItems.map(skill => {
					const profText = this.getProficiencyText(skill.proficiency)
					const profStyle = this.getProficiencyTextStyle(skill.proficiency)
					const color = profStyle && profStyle.color ? profStyle.color : '#10b981'
					// 使用不同深浅的绿色表示熟练度，这里简单统一使用带背景的小标签
					return `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 12px 16px; background: #f9fafb; border-radius: 8px;">
						<span style="font-size: 16px; font-weight: 500; color: #111827; letter-spacing: 0.5px;">${skill.skill_name}</span>
						<span style="font-size: 13px; color: ${color}; background: rgba(22, 119, 255, 0.08); padding: 4px 10px; border-radius: 12px; font-weight: bold;">${profText}</span>
					</div>`
				}).join('')

				return {
					skills: skillItems,
					html: `<div class="resume-block-skill" style="margin-bottom: 20px;">${skillsHtml}</div>`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-wrapper {
		padding: 20px;

		.form-body {
			background: transparent;
			padding: 0;
			min-height: auto;
			display: flex;
			flex-direction: column;
			
			.section-label {
				font-size: 16px;
				color: #374151;
				font-weight: 500;
				margin-bottom: 12px;
				margin-top: 10px;
			}
			
			.input-area {
				display: flex;
				align-items: center;
				margin-bottom: 30px;
				
				.tag-input {
					flex: 1;
					height: 48px;
					background: #f9fafb;
					border-radius: 8px;
					padding: 0 16px;
					font-size: 15px;
					color: #111827;
					
					&::placeholder {
						color: #d1d5db;
					}
				}
				
				.add-btn {
					margin-left: 12px;
					height: 48px;
					padding: 0 20px;
					background: #1677ff;
					color: #fff;
					font-size: 15px;
					font-weight: bold;
					border-radius: 8px;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: all 0.2s;
					
					&:active {
						opacity: 0.8;
					}
					
					&.btn-disabled {
						background: #e5e7eb;
						color: #9ca3af;
						pointer-events: none; /* 禁用点击 */
					}
				}
			}

			.skills-list {
				display: flex;
				flex-direction: column;
				gap: 12px;
				
				.skill-item {
					display: flex;
					align-items: center;
					background: transparent;
					
					.delete-btn {
						width: 24px;
						height: 24px;
						border: 1px solid #d1d5db;
						border-radius: 4px;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 12px;
						background: transparent;
						flex-shrink: 0;
						
						&:active {
							background: #f3f4f6;
						}
					}

					.skill-capsule-wrap {
						flex: 1;
						display: flex;
						align-items: stretch;
						background: #fff;
						border-radius: 8px;
						margin-right: 12px;
						/* 添加柔和且明显的阴影 */
						box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);

						.skill-name-wrap {
							flex: 1;
							padding: 14px 16px;
							display: flex;
							align-items: center;
						justify-content: flex-start;

							.skill-name {
								font-size: 15px;
								color: #374151;
								word-break: break-all;
							text-align: left;
							}
						}
						
						.divider {
							width: 1px;
							background-color: #f3f4f6; /* 内部浅色分割线 */
							margin: 10px 0; /* 让分割线上下留点空隙，更显精致 */
						}

						.proficiency-wrap {
						min-width: 120px;
							padding: 14px 16px;
							display: flex;
							align-items: center;
							justify-content: center;
						gap: 8px;
							border-radius: 0 8px 8px 0; /* 仅让点击区域贴合右侧圆角 */
							
							text {
								font-size: 15px;
								color: #374151;
							}
							
							&:active {
								background: #f9fafb;
							}
						}
					}
				}
			}
		}

		/* 自定义底部弹窗样式 */
		.custom-popup-mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 1000;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			
			.custom-popup-content {
				background: #fff;
				border-top-left-radius: 16px;
				border-top-right-radius: 16px;
				padding-bottom: env(safe-area-inset-bottom);
				animation: slideUp 0.3s ease-out;
				
				.popup-header {
					padding: 16px;
					text-align: center;
					font-size: 16px;
					font-weight: bold;
					color: #111827;
					border-bottom: 1px solid #f3f4f6;
				}
				
				.popup-list {
					display: flex;
					flex-direction: column;
					
					.popup-item {
						padding: 16px 0;
						text-align: center;
						font-size: 16px;
						color: #374151;
						border-bottom: 1px solid #f3f4f6;
						position: relative;
						
						&:last-child {
							border-bottom: none;
						}
						
						&:active {
							background: #f9fafb;
						}
						
						&.active {
							color: #1677ff;
							font-weight: bold;
						}
						
						.check-icon {
							position: absolute;
							right: 24px;
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}
			}
		}
		&.theme-dark {
			.form-body {
				.section-label {
					color: #f4f7fb;
				}

				.input-area {
					.tag-input {
						background: #23252b;
						color: #f4f7fb;

						&::placeholder {
							color: rgba(255, 255, 255, 0.38);
						}
					}

					.add-btn {
						background: #3165d7;
						
						&.btn-disabled {
							background: #23252b;
							color: rgba(255, 255, 255, 0.38);
						}
					}
				}

				.skills-list {
					.skill-item {
						.delete-btn {
							border-color: rgba(255, 255, 255, 0.2);
							
							&:active {
								background: rgba(255, 255, 255, 0.05);
							}
						}

						.skill-capsule-wrap {
							background: #1d1f24;
							box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);

							.skill-name-wrap {
								.skill-name {
									color: #f4f7fb;
								}
							}
							
							.divider {
								background-color: rgba(255, 255, 255, 0.1);
							}

							.proficiency-wrap {
								text {
									color: #f4f7fb;
								}
								
								&:active {
									background: #23252b;
								}
							}
						}
					}
				}
			}

			.custom-popup-mask {
				.custom-popup-content {
					background: #1d1f24;
					
					.popup-header {
						color: #f4f7fb;
						border-bottom-color: rgba(255, 255, 255, 0.1);
					}
					
					.popup-list {
						.popup-item {
							color: rgba(255, 255, 255, 0.72);
							border-bottom-color: rgba(255, 255, 255, 0.1);
							
							&:active {
								background: #23252b;
							}
							
							&.active {
								color: #3165d7;
							}
						}
					}
				}
			}
		}
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
