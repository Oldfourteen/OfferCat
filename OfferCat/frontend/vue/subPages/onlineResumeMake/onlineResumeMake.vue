<template>
	<!-- 在线简历编辑主页面 -->
	<view class="online-resume-page" :class="themeClass">
		<!-- 顶部导航栏：标题 + 保存按钮 -->
		<topNavBar title="在线简历" rightText="保存" :titleStyle="topNavBarTitleStyle" :customStyle="topNavBarCustomStyle" @rightClick="handleSaveResume" />
		<!-- 简历内容主体：所有模块子组件 -->
		<view class="page-content">
			<!-- 简历头部：头像 + 简历名称 -->
			<resumeHeader 
				:resumeName="resumeData.resumeName"
				:photoUrl="resumeData.photo"
				:resumeData="resumeData"
				:resumeId="currentResumeId"
				@updatePhoto="handleUpdatePhoto"
				@updateResumeName="handleUpdateResumeName"
				:theme="theme"
			/>
			<!-- 基本信息：姓名、性别、电话、邮箱 -->
			<basicInfo 
				:name="resumeData.name"
				:gender="resumeData.gender"
				:phone="resumeData.phone"
				:email="resumeData.email"
				:jobIntention="resumeData.jobIntention"
				:certificates="resumeData.certificates"
				:theme="theme"
			/>
			<!-- 自我评价模块 -->
			<selfEvaluationSection :htmlContent="resumeData.selfEvaluation" :theme="theme" />
			<!-- 教育经历模块 -->
			<educationSection :htmlContent="resumeData.education" :entries="resumeData.educationEntries" :theme="theme" />
			<!-- 在校经历模块 -->
			<schoolExperienceSection :htmlContent="resumeData.schoolExperience" :entries="resumeData.schoolExperienceEntries" :theme="theme" />
			<!-- 工作经历模块 -->
			<workExperienceSection :htmlContent="resumeData.workExperience" :entries="resumeData.workExperienceEntries" :theme="theme" />
			<!-- 项目经历模块 -->
			<projectExperienceSection :htmlContent="resumeData.projectExperience" :entries="resumeData.projectExperienceEntries" :theme="theme" />
			<!-- 技能特长模块 -->
			<skillSection :htmlContent="resumeData.skill" :skillItems="resumeData.skillItems" :theme="theme" />
		</view>
		<bottomActions :theme="theme" @preview="handlePreviewResume" @exportPdf="handleExportPdf" />

		<view v-if="showExportModePopup" class="export-mode-popup" @touchmove.stop.prevent>
			<view class="export-mode-popup__mask" @click="closeExportModePopup"></view>
			<view class="export-mode-popup__panel">
				<view class="export-mode-popup__header">
					<text class="export-mode-popup__title">选择导出方式</text>
					<text class="export-mode-popup__desc">朴素版稳定排版；智能版增强排版（不可用时自动回退）</text>
				</view>
				<view class="export-mode-popup__actions">
					<view class="export-mode-card" @click="handleSelectExportMode('plain')">
						<text class="export-mode-card__title">朴素生成 PDF</text>
						<text class="export-mode-card__desc">稳定简洁，适合常规排版导出</text>
					</view>
					<view class="export-mode-card export-mode-card--primary" @click="handleSelectExportMode('smart')">
						<text class="export-mode-card__badge">Beta</text>
						<text class="export-mode-card__title">智能生成 PDF</text>
						<text class="export-mode-card__desc">C++ 服务增强排版，不可用则自动回退朴素版</text>
					</view>
				</view>
				<view class="export-mode-popup__footer" @click="closeExportModePopup">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
// 导入页面组件
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
	// 工具类导入
	import { getResumeById, saveResumeRecord } from '../../utils/resumeRepo.js'
	import themeMixin from '@/utils/themeMixin.js'
	import { exportResumePdf } from '@/utils/resumePdfExport.js'

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
				// 简历渲染全量数据（页面展示用）
				resumeData: {
					resumeName: '在线简历',
					name: '',
					gender: '',
					phone: '',
					email: '',
					photo: '',
					jobIntention: '',
					certificates: [
						{ name: '', url: '' },
						{ name: '', url: '' },
						{ name: '', url: '' }
					],
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
				fullResumeRecord: null,
				showExportModePopup: false,
				backendResumeId: null
			}
		},
		computed: {
			// 顶部导航标题样式（适配深色/浅色模式
			topNavBarTitleStyle() {
				return { color: this.theme === 'dark' ? '#f4f7fb' : '#000', fontSize: '18px' }
			},
			// 顶部导航栏背景样式
			topNavBarCustomStyle() {
				return { backgroundColor: this.theme === 'dark' ? '#1a1c22' : '#fff' }
			}
		},
		onLoad(options) {
			// 监听子页面（编辑页）保存后触发的事件
			uni.$on('refreshResume', this.updateResumeData)

			// 从简历仓库加载（携带 resume_id）
			if (options.resume_id) {
				const resume = getResumeById(options.resume_id)
				if (resume) {
					this.currentResumeId = resume.resume_id
					this.fullResumeRecord = resume
					this.mapDatabaseToView(resume)
					return
				}
			}

			// 直接携带简历数据跳转
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
			// 页面卸载时移除全局事件监听
			uni.$off('refreshResume', this.updateResumeData)
		},
		methods: {
			// 判断是否为多条目模块（教育/在校/工作/项目）
			isMultiAppendType(type) {
				return ['education', 'schoolExperience', 'workExperience', 'projectExperience'].includes(type)
			},
			normalizeCertificatesThree(raw) {
				const emptySlot = () => ({ name: '', url: '' })
				let list = []
				if (Array.isArray(raw) && raw.length > 0) {
					list = raw.map(item => {
						const o = item && typeof item === 'object' ? item : {}
						return {
							name: String(o.name != null ? o.name : '').trim(),
							url: String(o.url != null ? o.url : '').trim()
						}
					})
				}
				while (list.length < 3) list.push(emptySlot())
				if (list.length > 3) list = list.slice(0, 3)
				return list
			},
			// 创建单条条目结构（带ID、原始数据、HTML、时间）
			makeEntry(rawData, html) {
				return {
					id: `${Date.now()}_${Math.floor(Math.random() * 100000)}`,
					rawData: rawData && typeof rawData === 'object' ? rawData : null,
					html: html || '',
					createdAt: Date.now(),
					updatedAt: Date.now()
				}
			},
			// 根据类型获取对应的 entries 数组键名
			getEntriesKeyByType(type) {
				const map = {
					education: 'educationEntries',
					schoolExperience: 'schoolExperienceEntries',
					workExperience: 'workExperienceEntries',
					projectExperience: 'projectExperienceEntries'
				}
				return map[type] || ''
			},
			// 从条目数组重新拼接 HTML（用于删除/更新后刷新）
			rebuildHtmlFromEntries(type) {
				const key = this.getEntriesKeyByType(type)
				if (!key) return
				const entries = Array.isArray(this.resumeData[key]) ? this.resumeData[key] : []
				this.resumeData[type] = entries.map(e => e && e.html ? e.html : '').join('')
			},
			// 标准化技能数组（兼容字符串/对象/JSON 多种格式）
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
			// 根据技能数组自动生成带样式的 HTML
			buildSkillsHtml(skillItems = []) {
				if (!Array.isArray(skillItems) || skillItems.length === 0) return ''
				const colorMap = {
					1: '#6b7280',
					2: '#374151',
					3: '#5d76bd',
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
					const color = colorMap[level] || '#5d76bd'
					return `<div class="resume-skill-box" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 12px 16px; background: #f9fafb; border-radius: 8px;">
						<span class="resume-title" style="font-size: 16px; font-weight: 500; color: #111827; letter-spacing: 0.5px;">${skill.skill_name}</span>
						<span style="font-size: 13px; color: ${color}; background: rgba(93, 118, 189, 0.08); padding: 4px 10px; border-radius: 12px; font-weight: bold;">${profText}</span>
					</div>`
				}).join('')
				return `<div class="resume-block-skill" style="margin-bottom: 20px;">${skillsHtml}</div>`
			},
			appendHtml(oldHtml = '', newHtml = '') {
				if (!newHtml) return oldHtml || ''
				if (!oldHtml) return newHtml
				return `${oldHtml}${newHtml}`
			},
			// 接收子编辑页面的更新事件，统一更新简历数据
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
						if (data.jobIntention !== undefined) this.resumeData.jobIntention = data.jobIntention;
						if (data.certificates !== undefined) {
							this.resumeData.certificates = this.normalizeCertificatesThree(data.certificates)
						}
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
						// 多条目模块：教育/在校/工作/项目（增删改）
						if (this.isMultiAppendType(payload.type)) {
							const entriesKey = this.getEntriesKeyByType(payload.type)
							if (!entriesKey) return
							if (!Array.isArray(this.resumeData[entriesKey])) {
								this.resumeData[entriesKey] = []
							}
							// 删除条目
							if (action === 'delete' && entryId) {
								this.resumeData[entriesKey] = this.resumeData[entriesKey].filter(e => String(e && e.id) !== entryId)
								this.rebuildHtmlFromEntries(payload.type)
								return
							}
							// 更新条目
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
							// 新增条目
							if (action === 'create' || !action) {
								const entry = this.makeEntry(payload.rawData, payload.htmlContent)
								this.resumeData[entriesKey].push(entry)
								this.rebuildHtmlFromEntries(payload.type)
								return
							}
							return
						}
						// 普通单文本模块直接赋值
						this.resumeData[payload.type] = payload.htmlContent
					}
				}
			},
			// 更新头像
			handleUpdatePhoto(newPhotoUrl) {
				this.resumeData.photo = newPhotoUrl;
			},
			// 更新简历名称
			handleUpdateResumeName(newName) {
				this.resumeData.resumeName = newName || '在线简历'
			},
			// 保存简历到本地仓库
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
					job_intention: this.resumeData.jobIntention,
					certificates: this.resumeData.certificates,
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
			// 预览简历
			handlePreviewResume() {
				// 先执行一次自动保存，保证预览的是最新内容
				const record = this.handleSaveResume()
				const dataStr = encodeURIComponent(JSON.stringify(record))
				uni.navigateTo({
					url: `/subPages/onlineResumeMake/previewResume?resume_data=${dataStr}`
				})
			},
			handleExportPdf() {
				this.handleSaveResume()
				this.showExportModePopup = true
			},
			closeExportModePopup() {
				this.showExportModePopup = false
			},
			handleSelectExportMode(mode) {
				this.closeExportModePopup()
				this.performExportPdf(mode === 'smart' ? 'smart' : 'plain')
			},
			async performExportPdf(mode = 'plain') {
				const record = this.handleSaveResume()
				uni.showLoading({ title: '正在同步并生成 PDF...', mask: true })
				try {
					const result = await exportResumePdf(record, mode, this.backendResumeId)
					this.backendResumeId = result.backendResumeId
					uni.hideLoading()
					if (result.usedFallback) {
						uni.showToast({
							title: '智能服务不可用，已用朴素方式生成',
							icon: 'none',
							duration: 2800
						})
					} else {
						uni.showToast({ title: 'PDF 导出成功', icon: 'success' })
					}
				} catch (e) {
					console.error('PDF导出失败:', e)
					uni.hideLoading()
					uni.showToast({
						title: (e && e.message) ? e.message : 'PDF导出失败',
						icon: 'none',
						duration: 3000
					})
				}
			},
			// 标准化条目结构（兼容旧版数据）
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
			// 数据库结构 → 页面渲染结构
			mapDatabaseToView(resume) {
				
				// 姓名解析
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
				
				// 自我评价
				if (resume.self_evaluation) {
					this.resumeData.selfEvaluation = resume.self_evaluation.includes('<') ? resume.self_evaluation : `<p>${resume.self_evaluation.replace(/\n/g, '<br>')}</p>`;
				}
				
				// 在校经历
				if (Array.isArray(resume.campus_experience_entries)) {
					this.resumeData.schoolExperienceEntries = this.normalizeEntries(resume.campus_experience_entries)
					this.rebuildHtmlFromEntries('schoolExperience')
				} else if (resume.campus_experience) {
					const html = resume.campus_experience.includes('<') ? resume.campus_experience : `<p>${resume.campus_experience.replace(/\n/g, '<br>')}</p>`
					this.resumeData.schoolExperienceEntries = [this.makeEntry(null, html)]
					this.rebuildHtmlFromEntries('schoolExperience')
				}
				
				// 工作经历
				if (Array.isArray(resume.work_experience_entries)) {
					this.resumeData.workExperienceEntries = this.normalizeEntries(resume.work_experience_entries)
					this.rebuildHtmlFromEntries('workExperience')
				} else if (resume.work_experience) {
					const html = resume.work_experience.includes('<') ? resume.work_experience : `<p>${resume.work_experience.replace(/\n/g, '<br>')}</p>`
					this.resumeData.workExperienceEntries = [this.makeEntry(null, html)]
					this.rebuildHtmlFromEntries('workExperience')
				}
				
				// 项目经验
				if (Array.isArray(resume.project_experience_entries)) {
					this.resumeData.projectExperienceEntries = this.normalizeEntries(resume.project_experience_entries)
					this.rebuildHtmlFromEntries('projectExperience')
				} else if (resume.project_experience) {
					const html = resume.project_experience.includes('<') ? resume.project_experience : `<p>${resume.project_experience.replace(/\n/g, '<br>')}</p>`
					this.resumeData.projectExperienceEntries = [this.makeEntry(null, html)]
					this.rebuildHtmlFromEntries('projectExperience')
				}
				
				// 技能特长
				const skillsItems = this.normalizeSkillItems(resume.skills_items || resume.skillsItems || resume.skills)
				if (skillsItems.length > 0) {
					this.resumeData.skillItems = skillsItems
					this.resumeData.skill = this.buildSkillsHtml(skillsItems)
				} else if (resume.skills) {
					this.resumeData.skillItems = []
					this.resumeData.skill = resume.skills.includes('<') ? resume.skills : `<p>${resume.skills.replace(/\n/g, '<br>')}</p>`;
				}
				
				// 教育经历
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
				if (resume.job_intention) this.resumeData.jobIntention = resume.job_intention;
				if (resume.certificates !== undefined && resume.certificates !== null) {
					this.resumeData.certificates = this.normalizeCertificatesThree(resume.certificates)
				}

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
		padding-bottom: calc(88px + env(safe-area-inset-bottom)); /* Add space for bottom actions */

		.page-content {
			/* Assuming top nav bar takes approx 88px (44px + statusbar) */
			padding-top: calc(44px + var(--status-bar-height));
			padding-bottom: 12px;
		}
		
		&.theme-dark {
			background-color: #111216;

			:deep(.resume-header) {
				.title-row .title {
					color: #f4f7fb;
				}
				.edit-icon-placeholder {
					background-color: rgba(93, 118, 189, 0.2);
				}
				.edit-icon-placeholder .btn-text {
					color: #c5cde8;
				}
				.completion-card {
					background: linear-gradient(to right, #1e2438, #2a3352);
					box-shadow:
						0 12px 32px -8px rgba(0, 0, 0, 0.5),
						0 4px 12px rgba(0, 0, 0, 0.28);
				}
				.completion-top .label {
					color: rgba(255, 255, 255, 0.58);
				}
				.completion-top .value {
					color: #a8b4e8;
				}
				.progress-track {
					background: rgba(255, 255, 255, 0.12);
				}
				.progress-fill {
					background: #5d76bd;
				}
				.hint {
					color: #8f9fd4;
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
					background: transparent;
				}
				.action-btn .btn-text,
				.action-btn .chevron {
					color: #c5cde8;
				}
				.user-details .info-row .info-item {
					color: rgba(255, 255, 255, 0.58);
				}
				.user-details .info-row .separator {
					color: rgba(255, 255, 255, 0.2);
				}
				.job-intention-row {
					.job-intention-label {
						color: rgba(255, 255, 255, 0.58);
					}
					.job-intention-value {
						color: #a8b4e8;
					}
				}
				.certificates-section {
					.certificates-label {
						color: rgba(255, 255, 255, 0.58);
					}
					.cert-line {
						color: rgba(255, 255, 255, 0.72);
					}
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
					background: transparent;
				}
				.section-header .action-btn .btn-text,
				.section-header .action-btn .chevron {
					color: #c5cde8;
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
				.bottom-actions .export-btn {
					background-color: #5d76bd;
					color: #fff;
				}
			}
		}
	}

	.export-mode-popup {
		position: fixed;
		inset: 0;
		z-index: 1200;
	}

	.export-mode-popup__mask {
		position: absolute;
		inset: 0;
		background: rgba(15, 23, 42, 0.48);
	}

	.export-mode-popup__panel {
		position: absolute;
		left: 24rpx;
		right: 24rpx;
		bottom: calc(28rpx + env(safe-area-inset-bottom));
		border-radius: 32rpx;
		background: #ffffff;
		padding: 30rpx 26rpx 24rpx;
		box-shadow: 0 24rpx 64rpx rgba(15, 23, 42, 0.18);
	}

	.export-mode-popup__header {
		text-align: center;
	}

	.export-mode-popup__title {
		display: block;
		font-size: 34rpx;
		font-weight: 700;
		color: #1f2a44;
	}

	.export-mode-popup__desc {
		display: block;
		margin-top: 10rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #73809b;
	}

	.export-mode-popup__actions {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
		margin-top: 28rpx;
	}

	.export-mode-card {
		position: relative;
		padding: 28rpx 26rpx;
		border-radius: 28rpx;
		background: linear-gradient(180deg, #f8faff 0%, #eef2fb 100%);
		border: 2rpx solid rgba(93, 118, 189, 0.08);
	}

	.export-mode-card--primary {
		background: linear-gradient(135deg, #5d76bd 0%, #6f87d4 100%);
		box-shadow: 0 16rpx 36rpx rgba(93, 118, 189, 0.24);
	}

	.export-mode-card__badge {
		position: absolute;
		top: 22rpx;
		right: 22rpx;
		padding: 6rpx 14rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.18);
		font-size: 20rpx;
		font-weight: 700;
		color: #ffffff;
	}

	.export-mode-card__title {
		display: block;
		font-size: 30rpx;
		font-weight: 700;
		color: #334155;
	}

	.export-mode-card__desc {
		display: block;
		margin-top: 10rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #64748b;
	}

	.export-mode-card--primary .export-mode-card__title,
	.export-mode-card--primary .export-mode-card__desc {
		color: #ffffff;
	}

	.export-mode-popup__footer {
		height: 88rpx;
		border-radius: 999rpx;
		margin-top: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f1f5f9;
		font-size: 28rpx;
		font-weight: 700;
		color: #475569;
	}

	.online-resume-page.theme-dark {
		.export-mode-popup__panel {
			background: #1b1d23;
			box-shadow: 0 24rpx 64rpx rgba(0, 0, 0, 0.34);
		}

		.export-mode-popup__title {
			color: #f4f7fb;
		}

		.export-mode-popup__desc {
			color: #95a3be;
		}

		.export-mode-card {
			background: linear-gradient(180deg, #242835 0%, #1f2330 100%);
			border-color: rgba(255, 255, 255, 0.06);
		}

		.export-mode-card__title {
			color: #f4f7fb;
		}

		.export-mode-card__desc {
			color: #a6b2ca;
		}

		.export-mode-card--primary {
			background: linear-gradient(135deg, #5d76bd 0%, #7a92df 100%);
		}

		.export-mode-popup__footer {
			background: #23252b;
			color: #d3dceb;
		}
	}
</style>
