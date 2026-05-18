<template>
	<view class="page">
		<!-- 顶部栏提供页面标题和返回入口，兼容从独立页或流程页进入。 -->
		<view class="topbar">
			<view class="topbar-side" @click="goBack">
				<text class="topbar-back">返回</text>
			</view>
			<view class="topbar-title">信息完善</view>
			<view class="topbar-side"></view>
		</view>

		<view class="card">
			<!-- 表单卡片集中收纳必填资料项，并在字段下方给出校验提示。 -->
			<view class="card-desc">为继续使用，请完善以下信息</view>
			<view class="form">
				<view class="field">
					<!-- 昵称输入框用于采集基础展示名称。 -->
					<view class="label"><text class="req">*</text>姓名/昵称</view>
					<input class="input" type="text" placeholder="请输入 2-20 位昵称" v-model="form.nickname" @input="onInput('nickname', $event)" @blur="onBlur('nickname')" />
					<text v-if="showError('nickname')" class="error">{{ errors.nickname }}</text>
				</view>

				<view class="field">
					<!-- 性别通过 picker 选择，实际提交使用枚举值。 -->
					<view class="label"><text class="req">*</text>性别</view>
					<picker mode="selector" :range="genderOptions" range-key="label" @change="onGenderChange">
						<view class="picker">
							<text class="picker-text">{{ genderText }}</text>
						</view>
					</picker>
					<text v-if="showError('gender')" class="error">{{ errors.gender }}</text>
				</view>

				<view class="field">
					<!-- 学号字段用于绑定学生身份，限制输入格式。 -->
					<view class="label"><text class="req">*</text>学号</view>
					<input class="input" type="text" placeholder="请输入学号" v-model="form.student_id" @input="onInput('student_id', $event)" @blur="onBlur('student_id')" />
					<text v-if="showError('student_id')" class="error">{{ errors.student_id }}</text>
				</view>

				<view class="field">
					<!-- 年级通过固定选项选择，避免自由输入带来的脏数据。 -->
					<view class="label"><text class="req">*</text>年级</view>
					<picker mode="selector" :range="gradeOptions" range-key="label" @change="onGradeChange">
						<view class="picker">
							<text class="picker-text">{{ gradeText }}</text>
						</view>
					</picker>
					<text v-if="showError('grade')" class="error">{{ errors.grade }}</text>
				</view>

				<view class="field">
					<!-- 专业字段用于补齐用户画像和后续推荐能力。 -->
					<view class="label"><text class="req">*</text>专业</view>
					<input class="input" type="text" placeholder="请输入专业（2-50 字）" v-model="form.major" @input="onInput('major', $event)" @blur="onBlur('major')" />
					<text v-if="showError('major')" class="error">{{ errors.major }}</text>
				</view>

				<view class="field">
					<!-- 出生日期由日期选择器输入，并实时推导年龄展示。 -->
					<view class="label"><text class="req">*</text>出生日期</view>
					<picker mode="date" :value="form.birthday" @change="onBirthdayChange">
						<view class="picker">
							<text class="picker-text">{{ birthdayText }}</text>
						</view>
					</picker>
					<text v-if="showError('birthday')" class="error">{{ errors.birthday }}</text>
					<view class="age-row">
						<!-- 年龄为只读展示字段，始终根据出生日期重新计算。 -->
						<view class="age-label">年龄</view>
						<view class="age-value">{{ computedAgeText }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="footer">
			<!-- 底部操作区负责提交资料，并显示接口层面的提交失败信息。 -->
			<view class="btn" :class="{ disabled: submitting }" @click="handleSubmit">保存并继续</view>
			<text v-if="submitError" class="submit-error">{{ submitError }}</text>
		</view>
	</view>
</template>

<script>
	import { request } from '../../api/request'
	import { getUser, resolveStoredUserId } from '../../utils/user'
	import { saveUserProfile } from '../../utils/userProfile'
	import { getToken } from '../../utils/token'

	function safeTrim(v) {
		// 统一处理空值和前后空格，避免表单校验和提交时出现类型不一致。
		return String(v == null ? '' : v).trim()
	}

	function calcAgeFromBirthday(birthday) {
		// 仅接受 yyyy-mm-dd 格式，并在合法日期基础上计算周岁年龄。
		const v = safeTrim(birthday)
		if (!v) return null
		const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(v)
		if (!m) return null
		const y = Number(m[1])
		const mo = Number(m[2])
		const d = Number(m[3])
		if (!Number.isInteger(y) || !Number.isInteger(mo) || !Number.isInteger(d)) return null
		if (mo < 1 || mo > 12) return null
		if (d < 1 || d > 31) return null
		const birth = new Date(y, mo - 1, d)
		if (Number.isNaN(birth.getTime())) return null
		if (birth.getFullYear() !== y || birth.getMonth() !== mo - 1 || birth.getDate() !== d) return null
		const now = new Date()
		if (birth.getTime() > now.getTime()) return null
		let age = now.getFullYear() - y
		const nowMonth = now.getMonth() + 1
		const nowDay = now.getDate()
		if (nowMonth < mo || (nowMonth === mo && nowDay < d)) {
			age -= 1
		}
		return age
	}

	export default {
		data() {
			return {
				// 保存提交成功后需要跳转的目标地址。
				redirectUrl: '',
				// 提交状态用于防止重复点击和控制按钮禁用态。
				submitting: false,
				submitError: '',
				// 枚举选项统一放在本地，供 picker 文案与提交值复用。
				genderOptions: [
					{ label: '未知', value: 0 },
					{ label: '男', value: 1 },
					{ label: '女', value: 2 }
				],
				gradeOptions: [
					{ label: '大一', value: '大一' },
					{ label: '大二', value: '大二' },
					{ label: '大三', value: '大三' },
					{ label: '大四', value: '大四' }
				],
				// form 维护当前页面可编辑的全部字段。
				form: {
					nickname: '',
					gender: 0,
					student_id: '',
					grade: '大一',
					major: '',
					birthday: '',
					age: ''
				},
				// touched 用来控制错误提示只在交互后展示。
				touched: {
					nickname: false,
					gender: false,
					student_id: false,
					grade: false,
					major: false,
					birthday: false
				},
				// errors 存储每个字段的即时校验结果。
				errors: {
					nickname: '',
					gender: '',
					student_id: '',
					grade: '',
					major: '',
					birthday: ''
				}
			}
		},
		computed: {
			genderText() {
				// 根据枚举值转换出 picker 中展示的性别文案。
				const found = this.genderOptions.find((x) => x.value === Number(this.form.gender))
				return found ? found.label : '请选择'
			},
			gradeText() {
				// 根据当前年级值回显 picker 展示文案。
				const found = this.gradeOptions.find((x) => x.value === String(this.form.grade || ''))
				return found ? found.label : '请选择'
			},
			birthdayText() {
				// 生日未选择时显示占位文案，已选择时原样回显。
				return this.form.birthday ? String(this.form.birthday) : '请选择出生日期'
			},
			computedAge() {
				// 年龄只从生日推导，避免与手动输入值不一致。
				return calcAgeFromBirthday(this.form.birthday)
			},
			computedAgeText() {
				// 页面展示层将合法年龄格式化为“xx 岁”。
				const n = this.computedAge
				return Number.isInteger(n) ? `${n} 岁` : '-'
			}
		},
		onLoad(options) {
			// 接收外部传入的回跳地址，并优先尝试用本地用户资料预填表单。
			const redirect = options && options.redirect ? decodeURIComponent(String(options.redirect)) : ''
			this.redirectUrl = redirect
			this.prefillFromLocal()
		},
		methods: {
			showError(key) {
				// 仅在字段被触达且确有错误时显示错误文案。
				return Boolean(this.touched[key] && this.errors[key])
			},
			goBack() {
				// 有页面栈时回退上一页，否则回到首页兜底。
				const pages = getCurrentPages()
				if (pages && pages.length > 1) {
					uni.navigateBack()
					return
				}
				uni.switchTab({ url: '/pages/index/index' })
			},
			prefillFromLocal() {
				// 从本地用户对象回填表单，兼容 profile 嵌套和旧字段格式。
				const user = getUser() || {}
				const src = user.profile ? user.profile : user
				this.form.nickname = safeTrim(src.nickname)
				this.form.gender = (src.gender === 0 || src.gender === 1 || src.gender === 2) ? Number(src.gender) : 0
				this.form.student_id = safeTrim(src.student_id)
				const gradeRaw = src.grade
				const gradeStr = safeTrim(gradeRaw)
				const allowed = ['大一', '大二', '大三', '大四']
				if (allowed.includes(gradeStr)) {
					this.form.grade = gradeStr
				} else {
					const n = Number(gradeRaw)
					const mapped = { 1: '大一', 2: '大二', 3: '大三', 4: '大四' }[n]
					this.form.grade = mapped || '大一'
				}
				this.form.major = safeTrim(src.major)
				this.form.birthday = safeTrim(src.birthday)
				this.form.age = src.age != null ? String(src.age) : ''
			},
			onGenderChange(e) {
				// picker 选中后更新性别枚举值，并立即触发校验。
				const idx = e && e.detail ? Number(e.detail.value) : 0
				const item = this.genderOptions[idx]
				this.form.gender = item ? item.value : 0
				this.touched.gender = true
				this.onBlur('gender')
			},
			onGradeChange(e) {
				// picker 选中后更新年级值，并立即触发校验。
				const idx = e && e.detail ? Number(e.detail.value) : 0
				const item = this.gradeOptions[idx]
				this.form.grade = item ? item.value : '大一'
				this.touched.grade = true
				this.onBlur('grade')
			},
			onInput(key, e) {
				// 文本输入时同步更新表单值，并实时刷新当前字段错误状态。
				const v = e && e.detail ? String(e.detail.value || '') : ''
				if (key in this.form) this.form[key] = v
				if (key in this.touched) this.touched[key] = true
				this.errors[key] = this.validateField(key)
			},
			onBlur(key) {
				// 失焦后将字段标记为已触达，并重新执行单字段校验。
				if (key in this.touched) this.touched[key] = true
				this.errors[key] = this.validateField(key)
			},
			onBirthdayChange(e) {
				// 生日变化后同时更新生日和推导年龄，保证展示一致性。
				const v = e && e.detail ? String(e.detail.value || '') : ''
				this.form.birthday = v
				const age = calcAgeFromBirthday(v)
				this.form.age = Number.isInteger(age) ? String(age) : ''
				this.touched.birthday = true
				this.onBlur('birthday')
			},
			validateField(key) {
				// 每个字段都在这里集中校验，便于输入态和提交态复用同一规则。
				if (key === 'nickname') {
					const v = safeTrim(this.form.nickname)
					if (v.length < 2 || v.length > 20) return '请输入 2-20 位昵称'
					return ''
				}
				if (key === 'gender') {
					const g = Number(this.form.gender)
					if (![0, 1, 2].includes(g)) return '请选择性别'
					return ''
				}
				if (key === 'student_id') {
					const v = safeTrim(this.form.student_id)
					if (v.length < 4 || v.length > 32) return '请输入正确的学号（4-32 位）'
					if (!/^[A-Za-z0-9_-]+$/.test(v)) return '学号仅支持字母/数字/下划线/短横线'
					return ''
				}
				if (key === 'grade') {
					const g = String(this.form.grade || '')
					if (!['大一', '大二', '大三', '大四'].includes(g)) return '请选择年级'
					return ''
				}
				if (key === 'major') {
					const v = safeTrim(this.form.major)
					if (v.length < 2 || v.length > 50) return '请输入专业（2-50 字）'
					return ''
				}
				if (key === 'birthday') {
					const v = safeTrim(this.form.birthday)
					if (!v) return '请选择出生日期'
					const age = calcAgeFromBirthday(v)
					if (!Number.isInteger(age)) return '出生日期不合法'
					if (age < 10 || age > 100) return '年龄需在 10-100 岁'
					return ''
				}
				return ''
			},
			validateAll() {
				// 提交前批量触发所有字段校验，并统一标记为已触达。
				const keys = ['nickname', 'gender', 'student_id', 'grade', 'major', 'birthday']
				let ok = true
				keys.forEach((k) => {
					this.touched[k] = true
					const err = this.validateField(k)
					this.errors[k] = err
					if (err) ok = false
				})
				return ok
			},
			isTabUrl(url) {
				// 区分 tabBar 页面与普通页面，决定使用 switchTab 还是 redirectTo。
				const tabs = new Set([
					'/pages/index/index',
					'/pages/GrowthArchive/GrowthArchive',
					'/pages/AI/AI',
					'/pages/forum/index',
					'/pages/my/my'
				])
				return tabs.has(url)
			},
			navigateAfterSuccess() {
				// 保存成功后优先按 redirect 回跳，否则回退上一页或返回首页。
				const url = this.redirectUrl
				if (url) {
					if (this.isTabUrl(url)) {
						uni.switchTab({ url })
						return
					}
					uni.redirectTo({ url })
					return
				}
				const pages = getCurrentPages()
				if (pages && pages.length > 1) {
					uni.navigateBack()
					return
				}
				uni.switchTab({ url: '/pages/index/index' })
			},
			async handleSubmit() {
				// 提交流程：前端校验 -> 组装 payload -> 请求保存 -> 本地同步 -> 页面跳转。
				if (this.submitting) return
				this.submitError = ''
				const ok = this.validateAll()
				if (!ok) {
					uni.showToast({ title: '请完善表单信息', icon: 'none' })
					return
				}

				const storedUser = getUser()
				const resolvedUserId = resolveStoredUserId(storedUser)
				if (resolvedUserId == null) {
					uni.showToast({ title: '登录状态失效，请重新登录', icon: 'none' })
					return
				}
				// 提交给后端的字段名与本地 form 结构不完全一致，这里统一转换。
				const payload = {
					userId: resolvedUserId,
					nickname: safeTrim(this.form.nickname),
					gender: Number(this.form.gender),
					studentId: safeTrim(this.form.student_id),
					grade: safeTrim(this.form.grade),
					major: safeTrim(this.form.major),
					age: Number.isInteger(this.computedAge) ? this.computedAge : Number(safeTrim(this.form.age))
				}

				this.submitting = true
				uni.showLoading({ title: '保存中', mask: true })
				try {
					// 带 token 请求用户资料保存接口，并用返回结果补齐本地画像数据。
					const token = getToken()
					const resp = await request({
						url: '/user/profile',
						method: 'POST',
						data: payload,
						header: token ? { Authorization: `Bearer ${token}` } : {}
					})

					const studentId = resp && resp.data && resp.data.studentId ? resp.data.studentId : null
					saveUserProfile(studentId ? { ...payload, studentId } : payload)

					uni.hideLoading()
					uni.showToast({ title: '保存成功', icon: 'success' })
					setTimeout(() => {
						this.navigateAfterSuccess()
					}, 600)
				} catch (e) {
					uni.hideLoading()
					this.submitError = (e && e.message) ? e.message : '保存失败'
					uni.showToast({ title: this.submitError, icon: 'none' })
				} finally {
					this.submitting = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: #f7f8fa;
		padding-bottom: 40rpx;
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(var(--status-bar-height) + 24rpx) 24rpx 16rpx;
		background: #ffffff;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.06);
	}

	.topbar-side {
		width: 140rpx;
	}

	.topbar-back {
		font-size: 28rpx;
		color: #1677ff;
	}

	.topbar-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #111827;
	}

	.card {
		margin: 24rpx;
		background: #ffffff;
		border-radius: 16rpx;
		padding: 24rpx;
		box-shadow: 0 8rpx 24rpx rgba(16, 24, 40, 0.06);
	}

	.card-desc {
		font-size: 24rpx;
		color: #6b7280;
		margin-bottom: 16rpx;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
	}

	.field {
		display: flex;
		flex-direction: column;
	}

	.label {
		font-size: 26rpx;
		color: #111827;
		margin-bottom: 10rpx;
	}

	.req {
		color: #ff4d4f;
		margin-right: 6rpx;
	}

	.input {
		height: 88rpx;
		padding: 0 24rpx;
		border-radius: 14rpx;
		border: 1rpx solid rgba(0, 0, 0, 0.08);
		background: #ffffff;
		font-size: 28rpx;
		color: #111827;
	}

	.picker {
		height: 88rpx;
		padding: 0 24rpx;
		border-radius: 14rpx;
		border: 1rpx solid rgba(0, 0, 0, 0.08);
		background: #ffffff;
		display: flex;
		align-items: center;
	}

	.picker-text {
		font-size: 28rpx;
		color: #111827;
	}

	.error {
		margin-top: 8rpx;
		font-size: 22rpx;
		color: #ff4d4f;
	}

	.footer {
		padding: 0 24rpx;
	}

	.age-row {
		margin-top: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 8rpx;
	}

	.age-label {
		font-size: 24rpx;
		color: #6b7280;
	}

	.age-value {
		font-size: 26rpx;
		color: #111827;
		font-weight: 600;
	}

	.btn {
		height: 92rpx;
		border-radius: 46rpx;
		background: #1677ff;
		color: #ffffff;
		font-size: 30rpx;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 12rpx 24rpx rgba(22, 119, 255, 0.24);
	}

	.btn.disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	.submit-error {
		display: block;
		margin-top: 12rpx;
		font-size: 24rpx;
		color: #ff4d4f;
		text-align: center;
	}
</style>
