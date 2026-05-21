<template>
  <view class="container" :class="themeClass">
    <!-- 顶部安全区域和自定义导航栏 -->
    <view class="nav-header">
      <!-- 占位状态栏，避免和手机顶部时间信号栏冲突 -->
      <view class="status-bar"></view>
      <view class="nav-bar">
        <view class="back-btn" @click="goBack">
          <image
            class="back-icon-img"
            src="/static/png/icons/chevron-left.png"
            mode="aspectFit"
          />
        </view>
        <text class="nav-title">题库测试</text>
        <view class="nav-right"></view>
      </view>
    </view>

    <view class="content-body">
      <view class="header animate-fade-down">
        <text class="title">调查问卷</text>
        <text class="subtitle">共 40 题，请认真作答</text>
      </view>

      <!-- 增加答题进度和未答题目提示卡片 -->
      <view class="progress-card animate-item" style="animation-delay: 0.1s;">
        <view class="progress-info" @click="toggleUnanswered">
          <text>已答: <text class="count-text">{{ answeredCount }}</text> / {{ questions.length }}</text>
          <text class="toggle-text">
            {{ showUnanswered ? '收起题号面板 ▲' : '查看所有题号 ▼' }}
          </text>
        </view>
        
        <view class="unanswered-section" v-show="showUnanswered">
          <text class="unanswered-label">题号面板 (点击跳转，蓝色为已答，红色为未答)：</text>
          <view class="unanswered-list">
            <text 
              class="unanswered-item" 
              :class="{ 'answered-item': answers[index] !== '' }"
              v-for="(item, index) in questions" 
              :key="item.id"
              @click.stop="scrollToQuestion(index + 1)"
            >{{ index + 1 }}</text>
          </view>
        </view>
        
        <view class="all-done" v-show="unansweredQuestions.length === 0">
          <text>全部作答完毕，可以提交啦！</text>
        </view>
      </view>

      <view class="question-list animate-item" style="animation-delay: 0.2s;">
        <!-- 统一添加一层包裹来承载id，因为子组件如果是根元素可能无法被uni.pageScrollTo的selector正确识别 -->
        <view 
          v-for="(item, index) in questions" 
          :key="item.id"
          :id="'question-' + item.id"
          class="question-wrapper"
        >
          <question-item 
            :question="item"
            :index="index"
            :value="answers[index]"
            :theme="theme"
            @input="handleInput(index, $event)"
          />
        </view>
      </view>

      <view class="footer animate-item" style="animation-delay: 0.3s;">
        <button class="submit-btn" :class="{ 'btn-disabled': unansweredQuestions.length > 0 }" @click="submit">提交问卷</button>
      </view>
    </view>
  </view>
</template>

<script>
import QuestionItem from './components/QuestionItem.vue'
import { request } from '@/api/request.js'
import themeMixin from '@/utils/themeMixin.js'
import {
	resolveStoredStudentId,
	resolveStoredUserId,
	syncUserProfileFromServer
} from '@/utils/user.js'

export default {
  mixins: [themeMixin],
  components: {
    QuestionItem
  },
  data() {
    return {
      questions: [],
      answers: [],
      showUnanswered: false
    }
  },
  computed: {
    // 已经回答的题目数量
    answeredCount() {
      return this.answers.filter(ans => ans !== '').length;
    },
    // 未作答的题目序号集合（题号为 index + 1）
    unansweredQuestions() {
      const list = [];
      this.answers.forEach((ans, index) => {
        if (!ans) {
          list.push(index + 1);
        }
      });
      return list;
    }
  },
  created() {
    this.initQuestions();
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    async initQuestions() {
      uni.showLoading({ title: '加载中...' });
      try {
        const res = await request({
          url: '/api/radar-chart/questions',
          method: 'GET'
        });
        
        const data = res.data || res;
        if (data && Array.isArray(data)) {
          this.questions = data;
          this.answers = new Array(this.questions.length).fill('');
        } else {
          uni.showToast({ title: '题目加载失败', icon: 'none' });
        }
      } catch (error) {
        console.error(error);
        uni.showToast({ title: '网络错误，请稍后再试', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },
    toggleUnanswered() {
      this.showUnanswered = !this.showUnanswered;
    },
    scrollToQuestion(num) {
      // 获取目标题目的 id
      const targetId = `#question-${num}`;
      
      // 为了防止被顶部遮挡，使用 createSelectorQuery
      const query = uni.createSelectorQuery().in(this);
      query.select(targetId).boundingClientRect(data => {
        if (data) {
          // 获取当前页面的滚动位置，结合目标元素的相对视口位置计算绝对滚动高度
          uni.createSelectorQuery().selectViewport().scrollOffset(res => {
            const scrollTop = res.scrollTop + data.top - 120; // 减去 120px 左右的高度（导航栏+吸顶卡片）
            uni.pageScrollTo({
              scrollTop: scrollTop,
              duration: 300
            });
          }).exec();
        }
      }).exec();
      
      // 点击跳转后自动收起列表，体验更好
      this.showUnanswered = false;
    },
    handleInput(index, val) {
      // 为了兼容 Vue2 和 Vue3 的响应式更新数组，采用这种方式
      const newAnswers = [...this.answers];
      newAnswers[index] = val;
      this.answers = newAnswers;
    },
    async submit() {
      // 检查是否全部答完
      if (this.unansweredQuestions.length > 0) {
        uni.showToast({
          title: `还有 ${this.unansweredQuestions.length} 题未作答，请检查`,
          icon: 'none'
        });
        return;
      }

      let userInfo = uni.getStorageSync('user_v2') || {};
      const userId = resolveStoredUserId(userInfo);
      let studentId = resolveStoredStudentId(userInfo);

      if (!userId) {
        uni.showToast({ title: '未获取到用户信息，请重新登录', icon: 'none' });
        return;
      }
      if (!studentId) {
        await syncUserProfileFromServer();
        userInfo = uni.getStorageSync('user_v2') || {};
        studentId = resolveStoredStudentId(userInfo);
      }
      if (!studentId) {
        uni.showToast({ title: '未获取学生档案 ID，请先完善资料后再提交问卷', icon: 'none' });
        return;
      }

      uni.showLoading({
        title: '分析中...'
      });

      // 新增：获取旧数据的时间戳，用于后续轮询判断
      let oldTimestamp = null;
      try {
        const oldEvalRes = await request({
          url: `/api/radar-chart/my-evaluation?studentId=${encodeURIComponent(String(studentId))}`,
          method: 'GET',
        });
        const oldData = oldEvalRes.data || oldEvalRes;
        if (oldData && oldData.createTime) {
          oldTimestamp = oldData.createTime;
        }
      } catch (e) {
        console.log("获取旧时间戳失败，将继续提交", e);
      }

      try {
        const res = await request({
          url: '/api/radar-chart/submit',
          method: 'POST',
          data: {
            studentId,
            answers: this.answers
          }
        });

        uni.hideLoading();
        
        const data = res; 

        if (!data.valid) {
          uni.showModal({
            title: '提示',
            content: data.message || '问卷有问题，请重新答题再次测试',
            showCancel: false,
            confirmText: '重新答题',
            success: (modalRes) => {
              if (modalRes.confirm) {
                this.answers = new Array(this.questions.length).fill('');
                this.scrollToQuestion(1);
              }
            }
          });
        } else {
          uni.setStorageSync('has_submitted_radar_' + userId, true); // 按账号 userId 记本地标记
          
          uni.showToast({
            title: '答题成功',
            icon: 'success'
          });

          // 提交成功后，将结果数据缓存并传递给结果页面
          const resultData = {
            professionalAbility: data.professionalAbility || 0,
            projectExperience: data.projectExperience || 0,
            competitionResults: data.competitionResults || 0,
            academicBackground: data.academicBackground || 0,
            softSkills: data.softSkills || 0,
            industryCognition: data.industryCognition || 0,
            stressExecution: data.stressExecution || 0,
            totalScore: data.totalScore || 0,
            top5: data.top5 || [],
            createTime: new Date().toISOString()
          };
          
          // 将数据缓存到全局，供结果页面和档案页面读取（APK中setStorageSync跨页面不可靠）
          const app = getApp();
          app.globalData = app.globalData || {};
          app.globalData.lastRadarData = resultData;
          app.globalData.radarDataCache = app.globalData.radarDataCache || {};
          app.globalData.radarDataCache[userId] = resultData;
          
          setTimeout(() => {
            uni.navigateTo({
              url: '/subPages/searchTest/searchTestResult'
            });
          }, 1000);
        }
      } catch (err) {
        uni.hideLoading();
        const errorMsg = err && err.message ? err.message : (typeof err === 'string' ? err : JSON.stringify(err));
        uni.showModal({
          title: '提交失败',
          content: `请截图联系开发者。\n错误详情: ${errorMsg}`,
          showCancel: false
        });
      }
    }
  }
}
</script>

<style scoped>
.container {
  background: linear-gradient(180deg, #3165D7 0%, #f7f7f7 75%, #f3f3f3 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.container.theme-dark {
  background: radial-gradient(circle at top right, rgba(74, 103, 247, 0.22) 0%, rgba(74, 103, 247, 0) 24%),
              linear-gradient(180deg, #111216 0%, #17191f 28%, #111216 100%);
}

/* 自定义导航栏样式 */
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(180deg, #3165D7 0%, rgba(49, 101, 215, 0) 100%);
  backdrop-filter: blur(10px);
  color: #ffffff;
}
.theme-dark .nav-header {
  background: linear-gradient(180deg, rgba(18, 19, 24, 0.96) 0%, rgba(18, 19, 24, 0) 100%);
  color: #f5f7fb;
}
.status-bar {
  /* 使用系统状态栏高度变量，兼容不同手机的刘海屏/挖孔屏 */
  height: var(--status-bar-height);
  width: 100%;
}
.nav-bar {
  height: 44px; /* 常规导航栏高度 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}
.back-btn {
  box-sizing: border-box;
  height: 72rpx;
  width: 72rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  padding: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back-icon-img {
  width: 38rpx;
  height: 38rpx;
  flex-shrink: 0;
}
.nav-title {
  font-size: 16px;
  font-weight: bold;
}
.nav-right {
  width: 40px; /* 占位，保持标题居中 */
}

/* 内容区，需要向下偏移出导航栏的高度 */
.content-body {
  padding: 20px;
  /* 加上状态栏高度和导航栏高度，避免被遮挡 */
  padding-top: calc(var(--status-bar-height) + 64px); 
}

.header {
  text-align: center;
  margin-bottom: 24px;
}
.title {
  font-size: 24px;
  font-weight: 900;
  color: #ffffff;
  display: block;
}
.theme-dark .title {
  color: #f5f7fb;
}
.subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 8px;
  display: block;
}
.theme-dark .subtitle {
  color: rgba(255, 255, 255, 0.6);
}

/* 进度和未答题提示卡片样式 */
.progress-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  /* 悬浮吸顶，因为自定义导航栏的存在，top 必须计算出导航栏的高度 */
  position: sticky;
  top: calc(var(--status-bar-height) + 44px);
  z-index: 10;
}
.theme-dark .progress-card {
  background-color: #1c1e24;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
.progress-info {
  font-size: 16px;
  color: #333;
  margin-bottom: 0;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.theme-dark .progress-info {
  color: #f5f7fb;
}
.count-text {
  color: #3165D7;
  font-size: 18px;
}
.toggle-text {
  font-size: 14px;
  color: #3165D7;
  font-weight: normal;
}
.unanswered-section {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
  margin-top: 12px;
}
.theme-dark .unanswered-section {
  border-top-color: #2a2c33;
}
.unanswered-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}
.theme-dark .unanswered-label {
  color: #a0a5b5;
}
.unanswered-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.unanswered-item {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: #fff1f0;
  color: #ff4d4f;
  border: 1px solid #ffa39e;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
}
.theme-dark .unanswered-item {
  background-color: rgba(255, 77, 79, 0.1);
  border-color: rgba(255, 77, 79, 0.3);
}
.answered-item {
  background-color: #e6f7ff;
  color: #3165D7;
  border: 1px solid #91d5ff;
}
.theme-dark .answered-item {
  background-color: rgba(49, 101, 215, 0.1);
  border-color: rgba(49, 101, 215, 0.3);
}
.all-done {
  color: #52c41a;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  padding: 8px 0;
}

.question-list {
  padding-bottom: 20px;
}
.footer {
  margin-top: 10px;
  padding-bottom: 40px;
}
.submit-btn {
  background-color: #3165D7;
  color: #fff;
  border-radius: 24px;
  font-size: 16px;
  height: 48px;
  line-height: 48px;
  box-shadow: 0 4px 12px rgba(49, 101, 215, 0.3);
}
.theme-dark .submit-btn {
  background-color: #3165D7;
  box-shadow: 0 4px 12px rgba(49, 101, 215, 0.3);
}
.submit-btn:active {
  opacity: 0.8;
}
.btn-disabled {
  background-color: #d9d9d9 !important;
  color: rgba(0, 0, 0, 0.25) !important;
  box-shadow: none !important;
}
.theme-dark .btn-disabled {
  background-color: #2a2c33 !important;
  color: #6c748a !important;
}

/* Animations */
.animate-fade-down {
  animation: fadeDown 0.6s ease-out both;
}
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-item {
  animation: slideUpFade 0.6s ease-out both;
}
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
