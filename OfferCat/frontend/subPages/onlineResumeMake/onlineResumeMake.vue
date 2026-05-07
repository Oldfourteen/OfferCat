<template>
	<view class="online-resume-page" :class="themeClass">
		<topNavBar title="在线简历" rightText="保存" :titleStyle="topNavBarTitleStyle" :customStyle="topNavBarCustomStyle" @rightClick="handleSaveResume" />
		<view class="page-content">
			<resumeHeader 
				:resumeName="resumeData.resumeName"
				:photoUrl="resumeData.photo"
				:resumeData="resumeData"
				@updatePhoto="handleUpdatePhoto"
				@updateResumeName="handleUpdateResumeName"
				:theme="theme"
			/>
			<basicInfo 
				:name="resumeData.name"
				:gender="resumeData.gender"
				:phone="resumeData.phone"
				:email="resumeData.email"
				:theme="theme"
			/>
			<selfEvaluationSection :htmlContent="resumeData.selfEvaluation" :theme="theme" />
			<educationSection :htmlContent="resumeData.education" :entries="resumeData.educationEntries" :theme="theme" />
			<schoolExperienceSection :htmlContent="resumeData.schoolExperience" :entries="resumeData.schoolExperienceEntries" :theme="theme" />
			<workExperienceSection :htmlContent="resumeData.workExperience" :entries="resumeData.workExperienceEntries" :theme="theme" />
			<projectExperienceSection :htmlContent="resumeData.projectExperience" :entries="resumeData.projectExperienceEntries" :theme="theme" />
			<skillSection :htmlContent="resumeData.skill" :skillItems="resumeData.skillItems" :theme="theme" />
		</view>
		<bottomActions :theme="theme" @preview="handlePreviewResume" @exportPdf="handleExportPdf" />
	</view>
</template>

<script>
	import topNavBar from './components/topNavBar.vue'
	import resumeHeader from './components/resumeHeader.vue'
	import basicInfo from './components/basicInfo.vue'
	import selfEvaluationSection from './components/selfEvaluationSection.vue'
	import educationSection from './components/educationSection.vue'
	import schoolExperienceSection from './components/schoolExperienceSection.vue'
	import workExperienceSection from './components/workExperienceSection.vue'
	import projectExperienceSection from './components/projectExperienceSection.vue'
	import skillSection from './components/skillSection.vue'
	import bottomActions from './components/bottomActions.vue'
	import { getResumeById, saveResumeRecord } from '../../utils/resumeRepo.js'
	import themeMixin from '@/utils/themeMixin.js'
	import { request } from '@/api/request.js'
	import { BASE_URL } from '@/api/config.js'
	import { getUser } from '@/utils/user.js'

	export default {
		mixins: [themeMixin],
		components: {
			topNavBar,
			resumeHeader,
			basicInfo,
			selfEvaluationSection,
			educationSection,
			schoolExperienceSection,
			workExperienceSection,
			projectExperienceSection,
			skillSection,
			bottomActions
		},
		data() {
			return {
				resumeData: {
					resumeName: '在线简历',
					name: '',
					gender: '',
					phone: '',
					email: '',
					photo: '',
					selfEvaluation: '',
					education: '',
					educationEntries: [],
					schoolExperience: '',
					schoolExperienceEntries: [],
					workExperience: '',
					workExperienceEntries: [],
					projectExperience: '',
					projectExperienceEntries: [],
					skill: '',
					skillItems: []
				},
				// 保存从简历仓库传过来的整条简历记录（如果有的话）
				currentResumeId: null,
				fullResumeRecord: null
			}
		},
		computed: {
			topNavBarTitleStyle() {
				return { color: this.theme === 'dark' ? '#f4f7fb' : '#000', fontSize: '18px' }
			},
			topNavBarCustomStyle() {
				return { backgroundColor: this.theme === 'dark' ? '#1a1c22' : '#fff' }
			}
		},
		onLoad(options) {
			// 监听子页面（编辑页）保存后触发的事件
			uni.$on('refreshResume', this.updateResumeData)

			if (options.resume_id) {
				const resume = getResumeById(options.resume_id)
				if (resume) {
					this.currentResumeId = resume.resume_id
					this.fullResumeRecord = resume
					this.mapDatabaseToView(resume)
					return
				}
			}

			if (options.resume_data) {
				try {
					const resume = JSON.parse(decodeURIComponent(options.resume_data))
					this.currentResumeId = resume.resume_id
					this.fullResumeRecord = resume
					this.mapDatabaseToView(resume)
				} catch (e) {
					console.error('解析简历数据失败:', e)
				}
			}
		},
		onUnload() {
			// 移除监听
			uni.$off('refreshResume', this.updateResumeData)
		},
		methods: {
			isMultiAppendType(type) {
				return ['education', 'schoolExperience', 'workExperience', 'projectExperience'].includes(type)
			},
			makeEntry(rawData, html) {
				return {
					id: `${Date.now()}_${Math.floor(Math.random() * 100000)}`,
					rawData: rawData && typeof rawData === 'object' ? rawData : null,
					html: html || '',
					createdAt: Date.now(),
					updatedAt: Date.now()
				}
			},
			getEntriesKeyByType(type) {
				const map = {
					education: 'educationEntries',
					schoolExperience: 'schoolExperienceEntries',
					workExperience: 'workExperienceEntries',
					projectExperience: 'projectExperienceEntries'
				}
				return map[type] || ''
			},
			rebuildHtmlFromEntries(type) {
				const key = this.getEntriesKeyByType(type)
				if (!key) return
				const entries = Array.isArray(this.resumeData[key]) ? this.resumeData[key] : []
				this.resumeData[type] = entries.map(e => e && e.html ? e.html : '').join('')
			},
			normalizeSkillItems(input) {
				if (!input) return []
				let raw = input
				if (typeof raw === 'string') {
					const trimmed = raw.trim()
					if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
						try {
							raw = JSON.parse(trimmed)
						} catch (e) {
							return []
						}
					} else {
						return []
					}
				}
				if (!Array.isArray(raw)) return []
				return raw
					.map(item => ({
						skill_name: String((item && (item.skill_name || item.name)) || '').trim(),
						proficiency: Number(item && item.proficiency) || 3
					}))
					.filter(item => item.skill_name)
			},
			buildSkillsHtml(skillItems = []) {
				if (!Array.isArray(skillItems) || skillItems.length === 0) return ''
				const colorMap = {
					1: '#6b7280',
					2: '#374151',
					3: '#1677ff',
					4: '#10b981',
					5: '#059669'
				}
				const textMap = {
					1: '初学',
					2: '一般',
					3: '掌握',
					4: '熟练',
					5: '精通'
				}
				const skillsHtml = skillItems.map(skill => {
					const level = Number(skill.proficiency) || 3
					const profText = textMap[level] || '掌握'
					const color = colorMap[level] || '#1677ff'
					return `<div class="resume-skill-box" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 12px 16px; background: #f9fafb; border-radius: 8px;">
						<span class="resume-title" style="font-size: 16px; font-weight: 500; color: #111827; letter-spacing: 0.5px;">${skill.skill_name}</span>
						<span style="font-size: 13px; color: ${color}; background: rgba(22, 119, 255, 0.08); padding: 4px 10px; border-radius: 12px; font-weight: bold;">${profText}</span>
					</div>`
				}).join('')
				return `<div class="resume-block-skill" style="margin-bottom: 20px;">${skillsHtml}</div>`
			},
			appendHtml(oldHtml = '', newHtml = '') {
				if (!newHtml) return oldHtml || ''
				if (!oldHtml) return newHtml
				return `${oldHtml}${newHtml}`
			},
			updateResumeData(payload) {
				if (payload && payload.type) {
					const action = payload.action || ''
					const entryId = payload.entryId ? String(payload.entryId) : ''
					// 这里的 payload.type 对应 resumeEdit 里传入的参数
					if (payload.type === 'basicInfo') {
						// basicInfo 传过来的是个对象
						const data = payload.htmlContent;
						if (data.name) this.resumeData.name = data.name;
						if (data.gender) this.resumeData.gender = data.gender;
						if (data.phone) this.resumeData.phone = data.phone;
						if (data.email) this.resumeData.email = data.email;
						if (!this.resumeData.resumeName) {
							this.resumeData.resumeName = this.resumeData.name || '在线简历'
						}
					} else {
						if (payload.type === 'skill') {
							const content = payload.htmlContent
							if (content && typeof content === 'object') {
								this.resumeData.skillItems = this.normalizeSkillItems(content.skills)
								this.resumeData.skill = content.html || ''
							} else {
								this.resumeData.skillItems = []
								this.resumeData.skill = content || ''
							}
							return
						}
						if (this.isMultiAppendType(payload.type)) {
							const entriesKey = this.getEntriesKeyByType(payload.type)
							if (!entriesKey) return
							if (!Array.isArray(this.resumeData[entriesKey])) {
								this.resumeData[entriesKey] = []
							}
							if (action === 'delete' && entryId) {
								this.resumeData[entriesKey] = this.resumeData[entriesKey].filter(e => String(e && e.id) !== entryId)
								this.rebuildHtmlFromEntries(payload.type)
								return
							}
							if (action === 'update' && entryId) {
								const idx = this.resumeData[entriesKey].findIndex(e => String(e && e.id) === entryId)
								if (idx !== -1) {
									const old = this.resumeData[entriesKey][idx] || {}
									this.resumeData[entriesKey].splice(idx, 1, {
										...old,
										rawData: payload.rawData && typeof payload.rawData === 'object' ? payload.rawData : old.rawData || null,
										html: payload.htmlContent || old.html || '',
										updatedAt: Date.now()
									})
									this.rebuildHtmlFromEntries(payload.type)
									return
								}
							}
							if (action === 'create' || !action) {
								const entry = this.makeEntry(payload.rawData, payload.htmlContent)
								this.resumeData[entriesKey].push(entry)
								this.rebuildHtmlFromEntries(payload.type)
								return
							}
							return
						}
						this.resumeData[payload.type] = payload.htmlContent
					}
				}
			},
			handleUpdatePhoto(newPhotoUrl) {
				this.resumeData.photo = newPhotoUrl;
			},
			handleUpdateResumeName(newName) {
				this.resumeData.resumeName = newName || '在线简历'
			},
			handleSaveResume() {
				const resumeName = (this.resumeData.resumeName || '').trim() || '未命名简历'
				const now = Date.now()
				const nextId = this.currentResumeId ? Number(this.currentResumeId) : now
				
				// 性别映射：1男 2女 0未知
				let genderCode = 0
				if (this.resumeData.gender === '男') genderCode = 1
				else if (this.resumeData.gender === '女') genderCode = 2

				const record = {
					resume_id: nextId,
					resume_name: resumeName,
					real_name: this.resumeData.name,
					photo: this.resumeData.photo,
					gender: genderCode,
					phone: this.resumeData.phone,
					email: this.resumeData.email,
					education: this.resumeData.education,
					education_entries: this.resumeData.educationEntries,
					skills: this.resumeData.skill,
					skills_items: this.resumeData.skillItems,
					campus_experience: this.resumeData.schoolExperience,
					campus_experience_entries: this.resumeData.schoolExperienceEntries,
					work_experience: this.resumeData.workExperience,
					work_experience_entries: this.resumeData.workExperienceEntries,
					project_experience: this.resumeData.projectExperience,
					project_experience_entries: this.resumeData.projectExperienceEntries,
					self_evaluation: this.resumeData.selfEvaluation,
					timestamp: now
				}
				saveResumeRecord(record)
				this.currentResumeId = nextId
				uni.showToast({ title: '已保存到简历仓库', icon: 'success' })
				return record
			},
			handlePreviewResume() {
				// 先执行一次自动保存，保证预览的是最新内容
				const record = this.handleSaveResume()
				const dataStr = encodeURIComponent(JSON.stringify(record))
				uni.navigateTo({
					url: `/subPages/onlineResumeMake/previewResume?resume_data=${dataStr}`
				})
			},
			async handleExportPdf() {
				// 导出前先保存
				const record = this.handleSaveResume()
				
				uni.showLoading({ title: '正在生成PDF...' })
				
				try {
					const stripHtml = (html) => {
						if (!html) return '';
						let text = String(html).replace(/<br\s*\/?>/gi, '\n');
						text = text.replace(/<\/p>/gi, '\n');
						text = text.replace(/<[^>]+>/g, '');
						text = text.replace(/&nbsp;/g, ' ');
						return text.replace(/\n\s*\n/g, '\n').trim();
					};

					const storedUser = getUser() || {}
					const userId = storedUser.userId || null

					const res = await request({
						url: '/api/resume/create',
						method: 'POST',
						data: {
							userId: userId,
							resumeName: record.resume_name,
							realName: record.real_name,
							gender: record.gender,
							phone: record.phone,
							email: record.email,
							photo: record.photo,
							campusExperience: stripHtml(record.campus_experience),
							workExperience: stripHtml(record.work_experience),
							projectExperience: stripHtml(record.project_experience),
							selfEvaluation: stripHtml(record.self_evaluation),
							aiScore: 0.0,
							aiEvaluation: '',
							resumeStatus: 1
						}
					})
					
					uni.hideLoading()
					uni.showToast({ title: 'PDF导出成功', icon: 'success' })
					
					const realPdfUrl = `${BASE_URL}/api/resume/export/pdf/${res.resumeId}`
					
					uni.showModal({
						title: '导出成功',
						content: 'PDF 已生成，是否复制下载链接？\n\n' + realPdfUrl,
						confirmText: '复制链接',
						cancelText: '关闭',
						success: (resModal) => {
							if (resModal.confirm) {
								uni.setClipboardData({
									data: realPdfUrl,
									success: () => {
										uni.showToast({ title: '链接已复制', icon: 'none' })
									}
								})
							}
						}
					})
				} catch (e) {
					console.error('PDF导出失败:', e)
					uni.hideLoading()
					uni.showToast({ title: 'PDF导出失败', icon: 'none' })
				}
			},
			normalizeEntries(input) {
				if (!Array.isArray(input)) return []
				return input
					.map(item => {
						const id = item && (item.id || item.entry_id) ? String(item.id || item.entry_id) : `${Date.now()}_${Math.floor(Math.random() * 100000)}`
						const html = item && item.html ? String(item.html) : ''
						const rawData = item && item.rawData && typeof item.rawData === 'object' ? item.rawData : (item && item.data && typeof item.data === 'object' ? item.data : null)
						return { id, html, rawData, createdAt: item && item.createdAt ? item.createdAt : Date.now(), updatedAt: item && item.updatedAt ? item.updatedAt : Date.now() }
					})
					.filter(e => e.html)
			},
			mapDatabaseToView(resume) {
				// 注意：这里需要根据你之前的各个 Section 组件所期望的 HTML 格式进行拼装
				// 目前先做简单的文本/段落映射，后续如果组件有特定的类名要求可以再完善
				
				if (resume.resume_name) {
					this.resumeData.resumeName = resume.resume_name
				}

				// 解析名字：优先取 real_name，如果没有则尝试从 resume_name 拆分
				if (resume.real_name) {
					this.resumeData.name = resume.real_name
				} else if (resume.resume_name) {
					const nameParts = resume.resume_name.split('-');
					this.resumeData.name = nameParts.length > 1 ? nameParts[1] : resume.resume_name;
				}
				
				if (resume.self_evaluation) {
					this.resumeData.selfEvaluation = resume.self_evaluation.includes('<') ? resume.self_evaluation : `<p>${resume.self_evaluation.replace(/\n/g, '<br>')}</p>`;
				}
				
				// 2. 在校经历 -> schoolExperience
				if (Array.isArray(resume.campus_experience_entries)) {
					this.resumeData.schoolExperienceEntries = this.normalizeEntries(resume.campus_experience_entries)
					this.rebuildHtmlFromEntries('schoolExperience')
				} else if (resume.campus_experience) {
					const html = resume.campus_experience.includes('<') ? resume.campus_experience : `<p>${resume.campus_experience.replace(/\n/g, '<br>')}</p>`
					this.resumeData.schoolExperienceEntries = [this.makeEntry(null, html)]
					this.rebuildHtmlFromEntries('schoolExperience')
				}
				
				// 3. 工作经历 -> workExperience
				if (Array.isArray(resume.work_experience_entries)) {
					this.resumeData.workExperienceEntries = this.normalizeEntries(resume.work_experience_entries)
					this.rebuildHtmlFromEntries('workExperience')
				} else if (resume.work_experience) {
					const html = resume.work_experience.includes('<') ? resume.work_experience : `<p>${resume.work_experience.replace(/\n/g, '<br>')}</p>`
					this.resumeData.workExperienceEntries = [this.makeEntry(null, html)]
					this.rebuildHtmlFromEntries('workExperience')
				}
				
				// 4. 项目经验 -> projectExperience
				if (Array.isArray(resume.project_experience_entries)) {
					this.resumeData.projectExperienceEntries = this.normalizeEntries(resume.project_experience_entries)
					this.rebuildHtmlFromEntries('projectExperience')
				} else if (resume.project_experience) {
					const html = resume.project_experience.includes('<') ? resume.project_experience : `<p>${resume.project_experience.replace(/\n/g, '<br>')}</p>`
					this.resumeData.projectExperienceEntries = [this.makeEntry(null, html)]
					this.rebuildHtmlFromEntries('projectExperience')
				}
				
				// 5. 技能特长 -> skill
				const skillsItems = this.normalizeSkillItems(resume.skills_items || resume.skillsItems || resume.skills)
				if (skillsItems.length > 0) {
					this.resumeData.skillItems = skillsItems
					this.resumeData.skill = this.buildSkillsHtml(skillsItems)
				} else if (resume.skills) {
					this.resumeData.skillItems = []
					this.resumeData.skill = resume.skills.includes('<') ? resume.skills : `<p>${resume.skills.replace(/\n/g, '<br>')}</p>`;
				}
				
				// 6. 教育经历 -> education
				if (Array.isArray(resume.education_entries)) {
					this.resumeData.educationEntries = this.normalizeEntries(resume.education_entries)
					this.rebuildHtmlFromEntries('education')
				} else if (resume.education) {
					const html = resume.education.includes('<') ? resume.education : `<p>${resume.education.replace(/\n/g, '<br>')}</p>`
					this.resumeData.educationEntries = [this.makeEntry(null, html)]
					this.rebuildHtmlFromEntries('education')
				}
				
				// 其他个人信息
				if (resume.gender !== undefined) {
					if (Number(resume.gender) === 1) this.resumeData.gender = '男';
					else if (Number(resume.gender) === 2) this.resumeData.gender = '女';
					else this.resumeData.gender = ''; // 0 或其他未知情况
				}
				if (resume.phone) this.resumeData.phone = resume.phone;
				if (resume.email) this.resumeData.email = resume.email;
				if (resume.photo) this.resumeData.photo = resume.photo;
				
				// 如果后续有 AI 评分和 AI 评估，也可以考虑在页面某个地方展示
				if (resume.ai_score || resume.ai_evaluation) {
					console.log('该简历拥有 AI 评估数据:', resume.ai_score, resume.ai_evaluation);
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.online-resume-page {
		min-height: 100vh;
		background-color: #ffffff;
		padding-bottom: calc(80px + env(safe-area-inset-bottom)); /* Add space for bottom actions */

		.page-content {
			/* Assuming top nav bar takes approx 88px (44px + statusbar) */
			padding-top: calc(44px + var(--status-bar-height));
		}
		
		&.theme-dark {
			background-color: #111216;

			:deep(.resume-header) {
				.title-row .title {
					color: #f4f7fb;
				}
				.edit-icon-placeholder {
					background-color: rgba(22, 119, 255, 0.15);
				}
				.completion-card {
					background: linear-gradient(to right, #1a2c3f, #1e3a5f);
				}
				.completion-rate .label {
					color: rgba(255, 255, 255, 0.58);
				}
				.completion-rate .value {
					color: #8ab7ff;
				}
				.hint {
					color: #69b1ff;
				}
				.avatar-wrap .avatar-tag {
					background: rgba(0, 0, 0, 0.7);
				}
			}

			:deep(.basic-info-wrapper) {
				.name-row .name {
					color: #f4f7fb;
				}
				.action-btn {
					background: rgba(16, 185, 129, 0.15);
				}
				.user-details .info-row .info-item {
					color: rgba(255, 255, 255, 0.58);
				}
				.user-details .info-row .separator {
					color: rgba(255, 255, 255, 0.2);
				}
				.divider {
					background-color: rgba(255, 255, 255, 0.06);
				}
			}

			:deep(.section-wrapper) {
				.section-header .section-title {
					color: #f4f7fb;
				}
				.section-header .action-btn {
					background: rgba(16, 185, 129, 0.15);
				}
				.section-block .divider {
					background-color: rgba(255, 255, 255, 0.06);
				}
				.section-preview .rich-text-wrap {
					color: rgba(255, 255, 255, 0.72);
					
					// 适配深色模式：覆盖旧数据中硬编码的亮色内联样式
					span[style*="#111827"], span[style*="rgb(17, 24, 39)"] {
						color: #f4f7fb !important;
					}
					div[style*="#4b5563"], div[style*="rgb(75, 85, 99)"], div[style*="#374151"], div[style*="rgb(55, 65, 81)"] {
						color: rgba(255, 255, 255, 0.72) !important;
					}
					span[style*="#f3f4f6"], span[style*="rgb(243, 244, 246)"] {
						background: rgba(255, 255, 255, 0.1) !important;
						color: rgba(255, 255, 255, 0.72) !important;
					}
					div[style*="#f9fafb"], div[style*="rgb(249, 250, 251)"] {
						background: rgba(255, 255, 255, 0.05) !important;
						color: rgba(255, 255, 255, 0.72) !important;
					}
					div[style*="dashed #f3f4f6"], div[style*="dashed rgb(243, 244, 246)"] {
						border-bottom-color: rgba(255, 255, 255, 0.1) !important;
					}
					
					// 适配深色模式：为新生成的数据使用类名控制
					.resume-title {
						color: #f4f7fb !important;
					}
					.resume-subtitle {
						color: rgba(255, 255, 255, 0.72) !important;
					}
					.resume-time {
						background: rgba(255, 255, 255, 0.1) !important;
						color: rgba(255, 255, 255, 0.72) !important;
					}
					.resume-content-box {
						background: rgba(255, 255, 255, 0.05) !important;
						color: rgba(255, 255, 255, 0.72) !important;
					}
					.resume-block-item {
						border-bottom-color: rgba(255, 255, 255, 0.1) !important;
					}
					.resume-skill-box {
						background: rgba(255, 255, 255, 0.05) !important;
					}
				}
			}

			:deep(.bottom-actions-wrap) {
				background-color: rgba(17, 18, 22, 0.9);
				
				.bottom-actions .action-btn {
					background-color: #23252b;
					color: #f4f7fb;
				}
			}
		}
	}
</style>
