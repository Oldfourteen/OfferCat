<template>
	<!-- 档案管理主页面 -->
	<view class="manage-page" :class="themeClass">
		<!-- 顶部导航栏：返回 + 标题 -->
		<view class="manage-topbar">
			<view class="back-btn" @click="goBack">
				<image
					class="back-icon-img"
					:src="archiveManageBackIcon"
					mode="aspectFit"
					style="width: 42rpx; height: 42rpx"
				/>
			</view>
			<view class="topbar-copy">
				<text class="topbar-title">{{ pageTitle }}</text>
				<text class="topbar-subtitle">{{ pageSubtitle }}</text>
			</view>
		</view>

		<scroll-view class="manage-scroll" scroll-y :show-scrollbar="false" :enable-back-to-top="false">
			<view class="manage-scroll-inner">
				<!-- 数据统计卡片：显示当前录入总数 -->
				<view class="summary-card">
					<text class="summary-label">当前已录入</text>
					<text class="summary-value">{{ itemCount }} 项</text>
					<text class="summary-desc">{{ pageHint }}</text>
				</view>

				<!-- 编辑区域：新增 / 编辑档案表单 -->
				<view class="section-card editor-card">
					<view class="section-head">
						<text class="section-title">{{ isEditing ? '编辑档案' : '新增档案' }}</text>
						<text class="section-link" @click="toggleEditor">{{ editorVisible ? '收起' : '+ 新增' }}</text>
					</view>

					<archive-editor-form
						v-if="editorVisible"
						:key="editorSessionKey"
						:fields="fields"
						:seed="formSeed"
						:archive-type="type"
						:theme-class="themeClass"
						@save="saveRecord"
						@cancel="cancelEdit"
					/>
				</view>

				<!-- 历史记录列表：展示所有已保存档案 -->
				<view class="section-card">
					<view class="section-head">
						<text class="section-title">历史记录</text>
						<text class="section-link">共 {{ itemCount }} 项</text>
					</view>

					<view v-if="records.length">
						<!-- 列表项循环渲染 -->
						<view v-for="(item, index) in records" :key="item.id" class="record-item">
							<view class="record-copy">
								<text class="record-title">{{ item.title }}</text>
								<text class="record-desc">{{ item.desc }}</text>
							</view>
							<view class="record-actions">
								<text class="record-action" @click="startEdit(index)">编辑</text>
								<text class="record-action delete-action" @click="removeRecord(index)">删除</text>
							</view>
						</view>
					</view>

					<!-- 空数据状态 -->
					<view v-else class="empty-state">
						<text class="empty-title">还没有档案记录</text>
						<text class="empty-desc">先新增一条内容，后续 AI 会基于这些资料做更准确的分析。</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

	<script>
		import { PNG_ICONS } from '@/utils/staticIcons.js'
// 主题样式混入
		import themeMixin from '@/utils/themeMixin.js'
		import ArchiveEditorForm from './components/ArchiveEditorForm.vue'
		import { getApiBase } from '@/api/config.js'
		import { getUser, resolveStoredStudentId } from '@/utils/user.js'

	/*
	页面类型配置映射表
	包含：竞赛奖项、证书资质、项目经历、实习经历 4 种档案类型
	每个类型独立配置：标题、字段、格式化方法、默认数据
	*/
	const PAGE_MAP = {
		// 竞赛奖项
		awards: {
			title: '竞赛奖项',
			subtitle: '管理比赛经历与国家级、省级奖项信息',
			hint: '把竞赛名称、等级、获奖时间补充完整，简历更有说服力。',
			fields: [
				{ key: 'name', label: '竞赛名称', placeholder: '例如：全国大学生数学建模竞赛', maxlength: 15 },
				{ key: 'level', label: '获奖等级', placeholder: '例如：省一等奖' },
				{ key: 'period', label: '获奖时间', placeholder: '例如：2023-09' },
				{ key: 'detail', label: '成果说明', type: 'textarea', placeholder: '补充赛事方向、个人分工、成绩亮点', maxlength: 200 }
			],
			// 表单数据 => 列表展示数据
			toRecord(form, id) {
				return {
					id,
					title: form.name,
					desc: `${form.level || '待补充等级'} · ${form.period || '待补充时间'}${form.detail ? ' · ' + form.detail : ''}`
				}
			},
			// 列表数据 => 编辑表单回填数据
			toForm(record) {
				const parts = (record.desc || '').split(' · ')
				return {
					name: record.title || '',
					level: parts[0] || '',
					period: parts[1] || '',
					detail: parts.slice(2).join(' · ') || ''
				}
			},
			// 默认示例数据
			initialRecords: [
				{ id: 1, title: '全国大学生数学建模竞赛', desc: '省一等奖 · 2023-09 · 负责数据建模与报告撰写' },
				{ id: 2, title: '蓝桥杯软件赛', desc: '省二等奖 · 2023-04 · Java 方向' }
			]
		},
		// 证书资质
		certificates: {
			title: '证书资质',
			subtitle: '管理四六级、职业技能和资格证书',
			hint: '建议补全证书编号、分数和获取时间，方便投递时快速筛选。',
			fields: [
				{ key: 'name', label: '证书名称', placeholder: '例如：英语六级' },
				{ key: 'score', label: '分数/等级', placeholder: '例如：562 分 / 已通过' },
				{ key: 'period', label: '获取时间', placeholder: '例如：2022-12' },
				{ key: 'detail', label: '补充说明', type: 'textarea', placeholder: '补充证书编号、技能方向、证书用途' }
			],
			toRecord(form, id) {
				return {
					id,
					title: form.name,
					desc: `${form.score || '待补充分数'} · ${form.period || '待补充时间'}${form.detail ? ' · ' + form.detail : ''}`
				}
			},
			toForm(record) {
				const parts = (record.desc || '').split(' · ')
				return {
					name: record.title || '',
					score: parts[0] || '',
					period: parts[1] || '',
					detail: parts.slice(2).join(' · ') || ''
				}
			},
			initialRecords: [
				{ id: 1, title: '英语六级', desc: '562 分 · 2022-12 · 听说读写能力较强' },
				{ id: 2, title: '计算机二级', desc: 'Python · 2022-03 · 已通过' }
			]
		},
		// 项目经历
		projects: {
			title: '项目经历',
			subtitle: '管理课程项目、个人项目和开源项目',
			hint: '建议把技术栈、项目亮点、个人职责写得更量化。',
			fields: [
				{ key: 'name', label: '项目名称', placeholder: '例如：校园求职助手小程序' },
				{ key: 'stack', label: '技术栈', placeholder: '例如：uni-app + Node.js' },
				{ key: 'role', label: '你的职责', placeholder: '例如：负责前端开发与交互实现' },
				{ key: 'detail', label: '项目亮点', type: 'textarea', placeholder: '补充性能优化、难点突破、结果数据' }
			],
			toRecord(form, id) {
				return {
					id,
					title: form.name,
					desc: `${form.stack || '待补充技术栈'} · ${form.role || '待补充职责'}${form.detail ? ' · ' + form.detail : ''}`
				}
			},
			toForm(record) {
				const parts = (record.desc || '').split(' · ')
				return {
					name: record.title || '',
					stack: parts[0] || '',
					role: parts[1] || '',
					detail: parts.slice(2).join(' · ') || ''
				}
			},
			initialRecords: [
				{ id: 1, title: '校园求职助手小程序', desc: 'uni-app + Node.js · 负责前端开发 · 完成投递跟踪与成长档案模块' },
				{ id: 2, title: '开源组件库重构', desc: 'Vue3 + TypeScript · 个人项目 · 优化组件结构与文档体验' }
			]
		},
		// 实习经历
		internships: {
			title: '实习经历',
			subtitle: '管理实习、实训和兼职工作经历',
			hint: '把岗位职责和产出结果写清楚，方便后续生成简历内容。',
			fields: [
				{ key: 'company', label: '公司/组织', placeholder: '例如：青川科技' },
				{ key: 'position', label: '岗位名称', placeholder: '例如：前端开发实习生' },
				{ key: 'period', label: '时间区间', placeholder: '例如：2024.06 - 2024.09' },
				{ key: 'detail', label: '经历说明', type: 'textarea', placeholder: '补充业务方向、产出结果、参与内容' }
			],
			toRecord(form, id) {
				return {
					id,
					title: form.position,
					desc: `${form.company || '待补充公司'} · ${form.period || '待补充时间'}${form.detail ? ' · ' + form.detail : ''}`
				}
			},
			toForm(record) {
				const parts = (record.desc || '').split(' · ')
				return {
					company: parts[0] || '',
					position: record.title || '',
					period: parts[1] || '',
					detail: parts.slice(2).join(' · ') || ''
				}
			},
			initialRecords: [
				{ id: 1, title: '前端开发实习生', desc: '青川科技 · 2024.06 - 2024.09 · 负责中后台页面开发与联调' },
				{ id: 2, title: '校内创新实验室助理', desc: '创新实验室 · 2023.09 - 2024.01 · 负责活动官网维护与数据整理' }
			]
		}
	}

	/*
	根据字段配置生成空表单对象
	@param {Array} fields - 字段数组
	@returns {Object} 空表单数据
	*/
	function createEmptyForm(fields) {
		return fields.reduce((result, field) => {
			result[field.key] = ''
			return result
		}, {})
	}

	const ARCHIVE_MANAGE_BACK_ICON = PNG_ICONS.chevronLeft

	// API配置映射
	const API_CONFIG = {
		awards: {
			list: '/api/student/profile/competition/list',
			add: '/api/student/profile/competition/add',
			update: '/api/student/profile/competition/update',
			delete: '/api/student/profile/competition/delete',
			// 后端数据字段映射到前端显示
			mapBackendToFrontend: (item) => ({
				id: item.awardId,
				title: item.competitionName,
				desc: `${item.awardGrade || '待补充等级'} · ${item.awardTime || '待补充时间'}${item.achievementDesc ? ' · ' + item.achievementDesc : ''}`
			}),
			// 前端表单数据映射到后端
			mapFrontendToBackend: (form, studentId, id) => ({
				awardId: id || undefined,
				studentId: studentId,
				competitionName: form.name,
				awardGrade: form.level,
				awardTime: form.period,
				achievementDesc: form.detail
			})
		},
		certificates: {
			list: '/api/student/profile/certificate/list',
			add: '/api/student/profile/certificate/add',
			update: '/api/student/profile/certificate/update',
			delete: '/api/student/profile/certificate/delete',
			mapBackendToFrontend: (item) => ({
				id: item.certId,
				title: item.certName,
				desc: `${item.scoreOrGrade || '待补充分数'} · ${item.obtainTime || '待补充时间'}${item.supplementaryDesc ? ' · ' + item.supplementaryDesc : ''}`
			}),
			mapFrontendToBackend: (form, studentId, id) => ({
				certId: id || undefined,
				studentId: studentId,
				certName: form.name,
				scoreOrGrade: form.score,
				obtainTime: form.period,
				supplementaryDesc: form.detail
			})
		},
		projects: {
			list: '/api/student/profile/project/list',
			add: '/api/student/profile/project/add',
			update: '/api/student/profile/project/update',
			delete: '/api/student/profile/project/delete',
			mapBackendToFrontend: (item) => ({
				id: item.projectId,
				title: item.projectName,
				desc: `${item.techStack || '待补充技术栈'} · ${item.responsibility || '待补充职责'}${item.projectHighlights ? ' · ' + item.projectHighlights : ''}`
			}),
			mapFrontendToBackend: (form, studentId, id) => ({
				projectId: id || undefined,
				studentId: studentId,
				projectName: form.name,
				techStack: form.stack,
				responsibility: form.role,
				projectHighlights: form.detail
			})
		},
		internships: {
			list: '/api/student/profile/internship/list',
			add: '/api/student/profile/internship/add',
			update: '/api/student/profile/internship/update',
			delete: '/api/student/profile/internship/delete',
			mapBackendToFrontend: (item) => ({
				id: item.internshipId,
				title: item.positionName,
				desc: `${item.company || '待补充公司'} · ${item.timePeriod || '待补充时间'}${item.experienceDesc ? ' · ' + item.experienceDesc : ''}`
			}),
			mapFrontendToBackend: (form, studentId, id) => ({
				internshipId: id || undefined,
				studentId: studentId,
				company: form.company,
				positionName: form.position,
				timePeriod: form.period,
				experienceDesc: form.detail
			})
		}
	}

	export default {
		components: {
			ArchiveEditorForm
		},
		mixins: [themeMixin],
		data() {
			return {
				type: 'awards', // 当前档案类型，默认奖项
				recordsState: [], // 档案列表数据
				editorVisible: false, // 编辑面板显隐
				editingIndex: -1, // 正在编辑的索引，-1=新增
				formSeed: {}, // 打开编辑器时的初始表单快照
				editorSessionKey: 0, // 每次打开编辑器递增，隔离输入状态
				archiveManageBackIcon: ARCHIVE_MANAGE_BACK_ICON,
				studentId: null, // 当前学生ID
				loading: false // 加载状态
			}
		},
		computed: {
			// 当前页面配置（根据type自动匹配PAGE_MAP）
			pageConfig() {
				return PAGE_MAP[this.type] || PAGE_MAP.awards
			},
			// 页面主标题
			pageTitle() {
				return this.pageConfig.title
			},
			// 页面副标题
			pageSubtitle() {
				return this.pageConfig.subtitle
			},
			// 页面提示语
			pageHint() {
				return this.pageConfig.hint
			},
			// 档案总数
			itemCount() {
				return this.records.length
			},
			// 表单字段配置
			fields() {
				return this.pageConfig.fields
			},
			// 档案列表（别名）
			records() {
				return this.recordsState
			},
			// 是否处于编辑状态
			isEditing() {
				return this.editingIndex > -1
			}
		},
		onLoad(query) {
			// 页面加载时获取路由参数中的类型
			if (query && query.type) {
				this.type = query.type
			}

			// 获取学生ID
			const user = getUser()
			this.studentId = resolveStoredStudentId(user)

			// 从后端加载数据
			this.loadRecordsFromBackend()
			this.resetFormSeed()
		},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack()
			},
			// 从后端加载档案列表
			loadRecordsFromBackend() {
				if (!this.studentId) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}

				const apiConfig = API_CONFIG[this.type]
				if (!apiConfig) {
					console.error('[manage] 未知的档案类型:', this.type)
					return
				}

				this.loading = true
				uni.request({
					url: `${getApiBase()}${apiConfig.list}`,
					method: 'GET',
					data: { studentId: this.studentId },
					success: (res) => {
						if (res.statusCode === 200 && res.data && res.data.code === 200 && Array.isArray(res.data.data)) {
							// 将后端数据转换为前端格式
							this.recordsState = res.data.data.map(item => apiConfig.mapBackendToFrontend(item))
							console.log(`[manage] ${this.type} 加载成功:`, this.recordsState.length, '条记录')
						} else {
							console.warn(`[manage] ${this.type} 加载失败:`, res.statusCode, res.data)
							uni.showToast({ title: '加载失败', icon: 'none' })
						}
					},
					fail: (err) => {
						console.error(`[manage] ${this.type} 请求失败:`, err)
						uni.showToast({ title: '网络错误', icon: 'none' })
					},
					complete: () => {
						this.loading = false
					}
				})
			},
			// 重置表单种子数据
			resetFormSeed() {
				this.formSeed = createEmptyForm(this.fields)
				this.editingIndex = -1
			},
			// 打开编辑器并刷新子组件会话
			openEditor(seed) {
				this.formSeed = seed || createEmptyForm(this.fields)
				this.editorSessionKey += 1
				this.editorVisible = true
			},
			// 切换编辑面板显隐
			toggleEditor() {
				if (this.editorVisible) {
					this.cancelEdit()
					return
				}
				this.resetFormSeed()
				this.openEditor(this.formSeed)
			},
			// 开始编辑某条记录
			startEdit(index) {
				const record = this.records[index]
				this.editingIndex = index
				this.openEditor(this.pageConfig.toForm(record))
			},
			// 取消编辑
			cancelEdit() {
				this.resetFormSeed()
				this.editorVisible = false
			},
			// 保存档案（新增/编辑）
			saveRecord(formData) {
				// 校验第一个必填字段
				const primaryField = this.fields[0]
				const primaryValue = (formData[primaryField.key] || '').trim()

				if (!primaryValue) {
					uni.showToast({
						title: `请先填写${primaryField.label}`,
						icon: 'none'
					})
					return
				}

				if (!this.studentId) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}

				const apiConfig = API_CONFIG[this.type]
				const isEdit = this.isEditing
				const recordId = isEdit ? this.records[this.editingIndex].id : null

				// 准备后端数据
				const backendData = apiConfig.mapFrontendToBackend(formData, this.studentId, recordId)

				uni.request({
					url: `${getApiBase()}${isEdit ? apiConfig.update : apiConfig.add}`,
					method: isEdit ? 'PUT' : 'POST',
					data: backendData,
					success: (res) => {
						if (res.statusCode === 200 && res.data && res.data.code === 200) {
							uni.showToast({
								title: isEdit ? '已更新' : '已新增',
								icon: 'success'
							})
							// 重新加载数据以获取最新状态
							this.loadRecordsFromBackend()
							this.cancelEdit()
						} else {
							console.error('[manage] 保存失败:', res.data)
							uni.showToast({ title: '保存失败', icon: 'none' })
						}
					},
					fail: (err) => {
						console.error('[manage] 保存请求失败:', err)
						uni.showToast({ title: '网络错误', icon: 'none' })
					}
				})
			},
			// 删除单条记录
			removeRecord(index) {
				if (!this.studentId) {
					uni.showToast({ title: '请先登录', icon: 'none' })
					return
				}

				const record = this.records[index]
				const apiConfig = API_CONFIG[this.type]

				// 根据类型准备删除参数
				let deleteParams = { studentId: this.studentId }
				if (this.type === 'awards') deleteParams.awardId = record.id
				else if (this.type === 'certificates') deleteParams.certId = record.id
				else if (this.type === 'projects') deleteParams.projectId = record.id
				else if (this.type === 'internships') deleteParams.internshipId = record.id

				uni.request({
					url: `${getApiBase()}${apiConfig.delete}`,
					method: 'DELETE',
					data: deleteParams,
					success: (res) => {
						if (res.statusCode === 200 && res.data && res.data.code === 200) {
							uni.showToast({ title: '已删除', icon: 'success' })
							// 重新加载数据
							this.loadRecordsFromBackend()
							if (this.editingIndex === index) {
								this.cancelEdit()
							}
						} else {
							console.error('[manage] 删除失败:', res.data)
							uni.showToast({ title: '删除失败', icon: 'none' })
						}
					},
					fail: (err) => {
						console.error('[manage] 删除请求失败:', err)
						uni.showToast({ title: '网络错误', icon: 'none' })
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f7fb;
	}

	.manage-page {
		height: 100vh;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding: calc(var(--status-bar-height) + 16rpx) 0 0;
		box-sizing: border-box;
		background:
			radial-gradient(circle at top right, rgba(255, 196, 176, 0.18) 0%, rgba(255, 196, 176, 0) 24%),
			linear-gradient(180deg, #ffffff 0%, #f7f8fb 24%, #f5f7fb 100%);
	}

	.manage-topbar {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		gap: 18rpx;
		width: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;
		flex-shrink: 0;
	}

	.manage-scroll {
		flex: 1;
		height: 0;
		width: 100%;
	}

	.manage-scroll-inner {
		padding: 0 24rpx calc(32rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
	}

	.back-btn {
		box-sizing: border-box;
		width: 72rpx;
		height: 72rpx;
		min-width: 72rpx;
		max-width: 72rpx;
		padding: 0;
		border-radius: 50%;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		flex-grow: 0;
		overflow: hidden;
		box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.08);
	}

	.back-icon-img {
		width: 42rpx;
		height: 42rpx;
		max-width: 42rpx;
		max-height: 42rpx;
		display: block;
		flex-shrink: 0;
	}

	.topbar-copy {
		flex: 1;
		min-width: 0;
	}

	.topbar-title,
	.topbar-subtitle,
	.summary-label,
	.summary-value,
	.summary-desc,
	.section-title,
	.section-link,
	.record-title,
	.record-desc,
	.record-action,
	.empty-title,
	.empty-desc {
		display: block;
	}

	.topbar-title {
		font-size: 56rpx;
		font-weight: 900;
		line-height: 1.12;
		color: #111111;
	}

	.topbar-subtitle {
		margin-top: 14rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #6c748a;
	}

	.summary-card,
	.section-card {
		margin-top: 24rpx;
		padding: 28rpx;
		border-radius: 30rpx;
		background: #ffffff;
		box-shadow: 0 12rpx 34rpx rgba(67, 76, 210, 0.06);
	}

	.summary-label {
		font-size: 24rpx;
		font-weight: 700;
		color: #6c748a;
	}

	.summary-value {
		margin-top: 14rpx;
		font-size: 56rpx;
		font-weight: 900;
		color: #24345b;
	}

	.summary-desc {
		margin-top: 12rpx;
		font-size: 24rpx;
		line-height: 1.6;
		color: #7f8ba3;
	}

	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20rpx;
	}

	.section-title {
		font-size: 36rpx;
		font-weight: 800;
		color: #1f2937;
	}

	.section-link {
		font-size: 26rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.record-item {
		margin-top: 18rpx;
		padding: 22rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20rpx;
	}

	.record-item + .record-item {
		border-top: 2rpx solid #f2f4f7;
	}

	.record-copy {
		flex: 1;
	}

	.record-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #24345b;
	}

	.record-desc {
		margin-top: 10rpx;
		font-size: 22rpx;
		line-height: 1.6;
		color: #7f8ba3;
	}

	.record-actions {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 10rpx;
	}

	.record-action {
		font-size: 24rpx;
		font-weight: 700;
		color: #3165d7;
	}

	.delete-action {
		color: #f97316;
	}

	.empty-state {
		margin-top: 18rpx;
		padding: 26rpx 0 8rpx;
		text-align: center;
	}

	.empty-title {
		font-size: 28rpx;
		font-weight: 700;
		color: #42526d;
	}

	.empty-desc {
		margin-top: 12rpx;
		font-size: 22rpx;
		line-height: 1.6;
		color: #8a96af;
	}

	.manage-page.theme-dark {
		background:
			radial-gradient(circle at top right, rgba(74, 103, 247, 0.2) 0%, rgba(74, 103, 247, 0) 24%),
			linear-gradient(180deg, #111216 0%, #17191f 24%, #111216 100%);
	}

	.manage-page.theme-dark .back-btn {
		background: rgba(255, 255, 255, 0.92);
		box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.2);
	}

	.manage-page.theme-dark .topbar-title,
	.manage-page.theme-dark .summary-value,
	.manage-page.theme-dark .section-title,
	.manage-page.theme-dark .record-title {
		color: #f4f7fb;
	}

	.manage-page.theme-dark .topbar-subtitle,
	.manage-page.theme-dark .summary-label,
	.manage-page.theme-dark .summary-desc,
	.manage-page.theme-dark .record-desc,
	.manage-page.theme-dark .empty-title,
	.manage-page.theme-dark .empty-desc {
		color: rgba(255, 255, 255, 0.58);
	}

	.manage-page.theme-dark .summary-card,
	.manage-page.theme-dark .section-card {
		background: rgba(29, 31, 36, 0.96);
		box-shadow: 0 12rpx 34rpx rgba(0, 0, 0, 0.2);
	}

	.manage-page.theme-dark .record-item + .record-item {
		border-top-color: rgba(255, 255, 255, 0.06);
	}
</style>
