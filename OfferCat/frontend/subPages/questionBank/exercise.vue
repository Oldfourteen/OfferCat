<template>
	<view class="exercise-page" :class="themeClass">
		<view class="exercise-topbar">
			<text class="back-btn" @click="goBack">‹</text>
			<text class="topbar-title">在线练习</text>
			<view class="progress-btn">已答 {{ answeredCount }}/{{ totalCount }}</view>
		</view>

		<scroll-view class="exercise-scroll" scroll-y :show-scrollbar="false">
			<view class="exercise-content" v-if="currentQuestion">
				<view class="hero-card">
					<text class="hero-type">{{ pageTitle }}</text>
					<text class="hero-title">{{ detail ? detail.title : '题单练习' }}</text>
					<text class="hero-subtitle">第 {{ currentIndex + 1 }} / {{ totalCount }} 题</text>
				</view>

				<view class="question-card">
					<view class="question-box">
						<text class="question-title">{{ currentQuestion.title }}</text>
					</view>
					<view class="option-list">
						<view
							v-for="(option, index) in currentQuestion.options"
							:key="index"
							class="option-item"
							:class="{ active: answers[currentIndex] === index }"
							@click="selectOption(index)"
						>
							<text class="option-mark">{{ optionLetters[index] }}</text>
							<text class="option-text">{{ option }}</text>
						</view>
					</view>
				</view>

				<view class="action-row">
					<view class="ghost-btn" :class="{ disabled: currentIndex === 0 }" @click="prevQuestion">上一题</view>
					<view v-if="!isLastQuestion" class="primary-btn" @click="nextQuestion">下一题</view>
					<view v-else class="primary-btn submit-btn" @click="submitPaper">提交并评分</view>
				</view>
			</view>

			<view v-else class="empty-state">当前题单暂无可练习题目。</view>
		</scroll-view>
	</view>
</template>

	<script>
		import { getQuestionDetail, getQuestionPaper } from './data'
		import { saveQuestionHistory } from '@/utils/questionHistory.js'
		import themeMixin from '@/utils/themeMixin.js'

	export default {
		mixins: [themeMixin],
		data() {
			return {
				detail: null,
				type: 'written',
				paperId: '',
				questions: [],
				answers: [],
				currentIndex: 0,
				optionLetters: ['A', 'B', 'C', 'D']
			}
		},
		computed: {
			pageTitle() {
				return this.type === 'interview' ? '面试真题练习' : '笔试真题练习'
			},
			currentQuestion() {
				return this.questions[this.currentIndex] || null
			},
			totalCount() {
				return this.questions.length
			},
			answeredCount() {
				return this.answers.filter(item => item !== -1).length
			},
			isLastQuestion() {
				return this.currentIndex === this.totalCount - 1
			}
		},
		onLoad(options) {
			this.paperId = options.id || ''
			this.type = options.type || 'written'
			this.detail = getQuestionDetail(this.paperId)
			this.questions = getQuestionPaper(this.paperId)
			this.answers = this.questions.map(() => -1)
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			selectOption(index) {
				this.answers.splice(this.currentIndex, 1, index)
			},
			prevQuestion() {
				if (this.currentIndex === 0) {
					return
				}
				this.currentIndex -= 1
			},
			nextQuestion() {
				if (this.currentIndex < this.totalCount - 1) {
					this.currentIndex += 1
				}
			},
			submitPaper() {
				const correctCount = this.questions.filter((item, index) => this.answers[index] === item.answer).length
				const accuracy = this.totalCount ? Math.round((correctCount / this.totalCount) * 100) : 0
				const timestamp = Date.now()
				const date = new Date(timestamp)
				const submittedAt = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
				const sessionId = `${this.paperId}_${timestamp}`
				const result = {
					sessionId,
					paperId: this.paperId,
					type: this.type,
					title: this.detail ? this.detail.title : '题单练习',
					company: this.detail ? this.detail.company : '',
					category: this.detail ? this.detail.category : '',
					totalCount: this.totalCount,
					answeredCount: this.answeredCount,
					correctCount,
					wrongCount: Math.max(this.answeredCount - correctCount, 0),
					accuracy,
					score: accuracy,
					abilityComment: accuracy >= 80 ? '你的基础稳定，已经具备较强的应试节奏。' : accuracy >= 60 ? '核心知识点基本掌握，继续补强薄弱项即可。' : '建议先回看错题解析，再做一轮针对性复盘。',
					timestamp,
					submittedAt
				}

				uni.setStorageSync(`question_result_${sessionId}`, result)
				saveQuestionHistory(result)
				const resultUrl = `/subPages/questionBank/result?session=${sessionId}`
				uni.redirectTo({
					url: resultUrl,
					fail: () => {
						uni.navigateTo({
							url: resultUrl,
							fail: () => {
								uni.showToast({
									title: '评分页打开失败',
									icon: 'none'
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.exercise-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #cbfaf5 0%, #f6fbff 18%, #f7f8fb 100%);
	}

	.exercise-topbar {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
		padding: calc(var(--status-bar-height) + 18rpx) 24rpx 18rpx;
		background: rgba(236, 252, 250, 0.94);
		backdrop-filter: blur(10rpx);
	}

	.back-btn,
	.progress-btn {
		height: 72rpx;
		padding: 0 22rpx;
		border-radius: 22rpx;
		background: rgba(255, 255, 255, 0.92);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10rpx 24rpx rgba(16, 51, 117, 0.08);
	}

	.back-btn {
		min-width: 72rpx;
		font-size: 42rpx;
		color: #30435a;
	}

	.progress-btn {
		font-size: 22rpx;
		font-weight: 700;
		color: #2b658f;
	}

	.topbar-title {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		font-weight: 800;
		color: #26334e;
	}

	.exercise-scroll {
		flex: 1;
		min-height: 0;
	}

	.exercise-content {
		padding: 16rpx 24rpx calc(40rpx + env(safe-area-inset-bottom));
	}

	.hero-card,
	.question-card {
		padding: 30rpx;
		border-radius: 34rpx;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 14rpx 32rpx rgba(16, 51, 117, 0.07);
	}

	.hero-type,
	.hero-title,
	.hero-subtitle {
		display: block;
	}

	.hero-type {
		font-size: 22rpx;
		font-weight: 700;
		color: #5d76bd;
	}

	.hero-title {
		margin-top: 16rpx;
		font-size: 36rpx;
		line-height: 1.45;
		font-weight: 900;
		color: #1d2945;
	}

	.hero-subtitle {
		margin-top: 10rpx;
		font-size: 22rpx;
		color: #7f8da7;
	}

	.question-card {
		margin-top: 20rpx;
	}

	.question-box {
		padding: 28rpx;
		border-radius: 24rpx;
		background: #f8fbff;
		border: 2rpx solid rgba(216, 230, 248, 0.6);
	}

	.question-title {
		display: block;
		font-size: 32rpx;
		line-height: 1.6;
		font-weight: 800;
		color: #22304d;
	}

	.option-list {
		margin-top: 24rpx;
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}

	.option-item {
		display: flex;
		align-items: flex-start;
		padding: 24rpx 22rpx;
		border-radius: 26rpx;
		background: #f7f9fc;
		border: 2rpx solid transparent;
	}

	.option-item.active {
		background: rgba(93, 118, 189, 0.08);
		border-color: rgba(93, 118, 189, 0.42);
	}

	.option-mark {
		width: 44rpx;
		height: 44rpx;
		margin-right: 16rpx;
		border-radius: 50%;
		background: rgba(49, 101, 215, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		font-weight: 800;
		color: #3165d7;
		flex-shrink: 0;
	}

	.option-item.active .option-mark {
		background: #5d76bd;
		color: #ffffff;
	}

	.option-text {
		flex: 1;
		font-size: 25rpx;
		line-height: 1.65;
		color: #4a5670;
	}

	.action-row {
		margin-top: 24rpx;
		display: flex;
		gap: 18rpx;
	}

	.ghost-btn,
	.primary-btn {
		flex: 1;
		height: 88rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 800;
	}

	.ghost-btn {
		background: rgba(255, 255, 255, 0.9);
		color: #5f718d;
	}

	.ghost-btn.disabled {
		opacity: 0.45;
	}

	.primary-btn {
		background: #5d76bd;
		color: #ffffff;
	}

	.submit-btn {
		box-shadow: 0 14rpx 28rpx rgba(93, 118, 189, 0.18);
	}

	.empty-state {
		padding: 160rpx 24rpx;
		text-align: center;
		font-size: 26rpx;
		color: #8d97aa;
	}

	.exercise-page.theme-dark {
		background: linear-gradient(180deg, #111216 0%, #17191f 24%, #111216 100%);
	}

	.exercise-page.theme-dark .exercise-topbar {
		background: rgba(18, 19, 24, 0.9);
	}

	.exercise-page.theme-dark .back-btn,
	.exercise-page.theme-dark .progress-btn,
	.exercise-page.theme-dark .ghost-btn {
		background: rgba(35, 37, 43, 0.96);
		color: #eef2f8;
		box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.18);
	}

	.exercise-page.theme-dark .topbar-title,
	.exercise-page.theme-dark .hero-title,
	.exercise-page.theme-dark .question-title {
		color: #f4f7fb;
	}

	.exercise-page.theme-dark .hero-subtitle,
	.exercise-page.theme-dark .option-text,
	.exercise-page.theme-dark .empty-state {
		color: rgba(255, 255, 255, 0.58);
	}

	.exercise-page.theme-dark .hero-card,
	.exercise-page.theme-dark .question-card {
		background: rgba(29, 31, 36, 0.96);
		box-shadow: 0 14rpx 32rpx rgba(0, 0, 0, 0.2);
	}

	.exercise-page.theme-dark .question-box {
		background: rgba(35, 37, 43, 0.6);
		border-color: rgba(255, 255, 255, 0.05);
	}

	.exercise-page.theme-dark .option-item {
		background: #23252b;
	}

	.exercise-page.theme-dark .option-mark {
		background: rgba(255, 255, 255, 0.08);
		color: #8ab7ff;
	}
</style>
