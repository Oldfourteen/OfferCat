/**
 * 成长轨迹「综合能力」计算：
 * - 依据1：雷达七维中取分值最高的 5 维，算术平均（与雷达 Top5 逻辑一致）。
 * - 依据2：题库练习在时间窗内的「按做题数加权」正确率，映射到 [50, 100]（无练习则取中性 50）。
 * - 综合能力：两者各占 50% 加权，结果 clamp 到 [50, 100]。
 */

const RADAR_DIM_KEYS = [
	'professionalAbility',
	'projectExperience',
	'competitionResults',
	'academicBackground',
	'softSkills',
	'industryCognition',
	'stressExecution'
]

export function getRadarTop5Average(radarData) {
	if (!radarData) return null
	const vals = RADAR_DIM_KEYS.map(k => {
		const v = radarData[k]
		if (v === undefined || v === null || v === '') return null
		const n = Number(v)
		if (!Number.isFinite(n)) return null
		return Math.min(100, Math.max(0, n))
	}).filter(v => v !== null)
	if (!vals.length) return null
	const sorted = [...vals].sort((a, b) => b - a)
	const top = sorted.slice(0, Math.min(5, sorted.length))
	const sum = top.reduce((a, b) => a + b, 0)
	return sum / top.length
}

/**
 * 聚合时间窗 [startMs, endMs] 内做题记录（按作答题目数加权，而非按场次）。
 * @param practiceType 可选：`written` | `interview`，与 questionHistory 归一化后的 type 一致。
 */
export function aggregateQuestionAttempts(history, startMs, endMs, practiceType = null) {
	let correct = 0
	let attempted = 0
	if (!Array.isArray(history)) return { correct, attempted }
	const lo = Number(startMs)
	const hi = Number(endMs)
	for (const item of history) {
		if (practiceType && item.type !== practiceType) continue
		const ts = Number(item.timestamp)
		if (!Number.isFinite(ts) || ts < lo || ts > hi) continue
		const ac = Number(item.correctCount) || 0
		const ans = Number(item.answeredCount) || Number(item.totalCount) || 0
		if (ans <= 0) continue
		correct += ac
		attempted += ans
	}
	return { correct, attempted }
}

/** 依据2：正确率 p∈[0,1] → 50 + 50*p */
export function basis2FromAttempts(correct, attempted) {
	if (!attempted || attempted <= 0) return 50
	const p = Math.min(1, Math.max(0, correct / attempted))
	return 50 + p * 50
}

/** 综合能力（50–100），保留一位小数 */
export function comprehensiveAbility(basis1, basis2) {
	if (basis1 == null || !Number.isFinite(basis1)) return null
	const b2 = Number.isFinite(basis2) ? basis2 : 50
	const raw = 0.5 * basis1 + 0.5 * b2
	const clamped = Math.min(100, Math.max(50, raw))
	return Math.round(clamped * 10) / 10
}

/** 单类题库累加正确率（0～100%，保留一位小数），无作答返回 null */
export function cumulativeAccuracyPercentForKind(history, practiceType) {
	const { correct, attempted } = aggregateQuestionAttempts(history, 0, Date.now(), practiceType)
	if (!attempted) return null
	return Math.round((correct / attempted) * 1000) / 10
}

function startOfDayMs(d) {
	const x = new Date(d)
	x.setHours(0, 0, 0, 0)
	return x.getTime()
}

export function endOfDayMs(d) {
	const x = new Date(d)
	x.setHours(23, 59, 59, 999)
	return x.getTime()
}

/** 自然周：周一为一周起始（常见于中文场景） */
export function startOfWeekMondayMs(now = new Date()) {
	const x = new Date(now)
	x.setHours(0, 0, 0, 0)
	const day = x.getDay()
	const diff = day === 0 ? -6 : 1 - day
	x.setDate(x.getDate() + diff)
	return x.getTime()
}

function seriesColor() {
	return '#4A67F7'
}

/**
 * 本周：周一至周日；未到之日数据为 null，折线断开。
 * 每个数据点：从当周周一 0 点累积到该日结束（不超过当前时刻），便于周内练习带动曲线变化。
 */
export function buildWeekTrend(radarData, history, now = new Date()) {
	const basis1 = getRadarTop5Average(radarData)
	const categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
	if (basis1 == null) {
		return {
			categories,
			series: [{ name: '综合能力', data: categories.map(() => null), color: seriesColor() }]
		}
	}
	const weekStart = startOfWeekMondayMs(now)
	const todayEnd = endOfDayMs(now)
	const data = []
	for (let i = 0; i < 7; i++) {
		const dayStart = weekStart + i * 86400000
		if (dayStart > todayEnd) {
			data.push(null)
			continue
		}
		const dayEnd = Math.min(endOfDayMs(dayStart), todayEnd)
		const { correct, attempted } = aggregateQuestionAttempts(history, weekStart, dayEnd)
		const b2 = basis2FromAttempts(correct, attempted)
		data.push(comprehensiveAbility(basis1, b2))
	}
	return {
		categories,
		series: [{ name: '综合能力', data, color: seriesColor() }]
	}
}

/**
 * 当月四周分段（每段最多 7 天）；尚未到来的分段为 null。
 */
export function buildMonthTrend(radarData, history, now = new Date()) {
	const basis1 = getRadarTop5Average(radarData)
	const categories = ['第1周', '第2周', '第3周', '第4周']
	if (basis1 == null) {
		return {
			categories,
			series: [{ name: '综合能力', data: categories.map(() => null), color: seriesColor() }]
		}
	}
	const y = now.getFullYear()
	const m = now.getMonth()
	const daysInMonth = new Date(y, m + 1, 0).getDate()
	const monthStart = startOfDayMs(new Date(y, m, 1))
	const todayEnd = endOfDayMs(now)
	const data = []
	for (let w = 0; w < 4; w++) {
		const startDay = w * 7 + 1
		if (startDay > daysInMonth) {
			data.push(null)
			continue
		}
		const endDay = Math.min(startDay + 6, daysInMonth)
		const segStart = startOfDayMs(new Date(y, m, startDay))
		if (segStart > todayEnd) {
			data.push(null)
			continue
		}
		const segEnd = Math.min(endOfDayMs(new Date(y, m, endDay)), todayEnd)
		const { correct, attempted } = aggregateQuestionAttempts(history, monthStart, segEnd)
		const b2 = basis2FromAttempts(correct, attempted)
		data.push(comprehensiveAbility(basis1, b2))
	}
	return {
		categories,
		series: [{ name: '综合能力', data, color: seriesColor() }]
	}
}

/**
 * 当季三个月：标签为当季真实月份；未到月份为 null。
 */
export function buildQuarterTrend(radarData, history, now = new Date()) {
	const basis1 = getRadarTop5Average(radarData)
	const y = now.getFullYear()
	const m = now.getMonth()
	const qStartMonth = Math.floor(m / 3) * 3
	const categories = [`${qStartMonth + 1}月`, `${qStartMonth + 2}月`, `${qStartMonth + 3}月`]
	if (basis1 == null) {
		return {
			categories,
			series: [{ name: '综合能力', data: categories.map(() => null), color: seriesColor() }]
		}
	}
	const quarterStart = startOfDayMs(new Date(y, qStartMonth, 1))
	const todayEnd = endOfDayMs(now)
	const data = []
	for (let i = 0; i < 3; i++) {
		const ms = qStartMonth + i
		const monthStart = startOfDayMs(new Date(y, ms, 1))
		if (monthStart > todayEnd) {
			data.push(null)
			continue
		}
		const monthEnd = endOfDayMs(new Date(y, ms + 1, 0))
		const windowEnd = Math.min(monthEnd, todayEnd)
		const { correct, attempted } = aggregateQuestionAttempts(history, quarterStart, windowEnd)
		const b2 = basis2FromAttempts(correct, attempted)
		data.push(comprehensiveAbility(basis1, b2))
	}
	return {
		categories,
		series: [{ name: '综合能力', data, color: seriesColor() }]
	}
}

/** 从多条序列中提取数值型数据点，用于动态 Y 轴范围 */
export function collectNumericPoints(chartPayloads) {
	const out = []
	for (const payload of chartPayloads) {
		const series = payload && payload.series && payload.series[0]
		if (!series || !Array.isArray(series.data)) continue
		for (const v of series.data) {
			if (v !== null && v !== undefined && Number.isFinite(Number(v))) out.push(Number(v))
		}
	}
	return out
}
