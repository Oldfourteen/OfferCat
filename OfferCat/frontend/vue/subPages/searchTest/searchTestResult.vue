<template>
  <view class="container">
    <!-- 顶部安全区域和自定义导航栏 -->
    <view class="nav-header">
      <view class="status-bar"></view>
      <view class="nav-bar">
        <view class="back-btn" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">测试结果</text>
        <view class="nav-right"></view>
      </view>
    </view>

    <view class="content-body">
      <view class="result-header">
        <view class="success-icon">
          <text class="check-mark">✓</text>
        </view>
        <text class="result-title">答题分析成功</text>
        <text class="result-subtitle">以下是您的核心能力维度说明与雷达图呈现</text>
      </view>

      <view class="radar-chart-section">
        <text class="section-title">能力雷达图</text>
        <view class="chart-card radar-box">
          <qiun-data-charts
            type="radar"
            :opts="chartOpts"
            :chartData="chartData"
            :inScrollView="true"
          />
        </view>
      </view>

      <view class="score-list">
        <text class="section-title">维度区间说明 (Top 5)</text>
        <view class="score-item" v-for="(item, index) in top5" :key="index">
          <view class="rank-badge" :class="'rank-' + (index + 1)">{{ index + 1 }}</view>
          <text class="dimension-name">{{ getDimensionName(item.dimension) }}</text>
          <text class="dimension-score">{{ item.score }} 分</text>
        </view>
      </view>

      <view class="footer">
        <button class="primary-btn" @click="goHome">返回首页</button>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '@/api/request.js'

export default {
  data() {
    return {
      top5: [],
      // 这里可以配置所有维度的映射表，或者如果后端直接返回维度名称，可以在 getDimensionName 中直接返回
      dimensionMap: {
        'D1': '专业能力',
        'D2': '项目经验',
        'D3': '竞赛成果',
        'D4': '学历背景',
        'D5': '软技能',
        'D6': '行业认知',
        'D7': '抗压执行'
      },
      chartData: {},
      chartOpts: {
        animation: true,
        color: ['#3165D7'],
        fill: false,
        padding: [10, 12, 0, 12],
        legend: {
          show: false
        },
        extra: {
          radar: {
            gridColor: '#e5ecf8',
            gridType: 'line',
            gridCount: 5,
            opacity: 0,
            border: true,
            borderColor: '#c8d7f5',
            borderOpacity: 1,
            borderWidth: 2,
            labelShow: true,
            labelColor: '#667085',
            labelPointShow: false,
            max: 100,
            backgroundColor: ['rgba(49,101,215,0.08)'],
            borderLineColor: '#3165D7'
          }
        }
      }
    }
  },
  onLoad(options) {
    // 阻止所有弹窗显示（APK中可能有缓存的旧代码弹窗）
    this.blockAllModals();
    
    let dataReceived = false;
    
    // 方法1：从全局数据读取（APK中最可靠）
    const app = getApp();
    if (app && app.globalData && app.globalData.lastRadarData) {
      const data = app.globalData.lastRadarData;
      dataReceived = true;
      this.top5 = this.calculateTop5(data);
      this.processData(data);
      // 读取后清除，避免影响下次
      app.globalData.lastRadarData = null;
    }
    
    // 方法2：通过 eventChannel 接收数据
    if (!dataReceived) {
      const eventChannel = this.getOpenerEventChannel();
      if (eventChannel && eventChannel.on) {
        eventChannel.on('radarData', (data) => {
          if (data) {
            dataReceived = true;
            this.top5 = this.calculateTop5(data);
            this.processData(data);
          }
        });
      }
    }
    
    // 方法3：通过全局事件接收数据
    if (!dataReceived) {
      uni.$once('radarDataSubmitted', (data) => {
        if (data && !dataReceived) {
          dataReceived = true;
          this.top5 = this.calculateTop5(data);
          this.processData(data);
        }
      });
    }
    
    // 方法4：从本地缓存读取（备用）
    setTimeout(() => {
      if (!dataReceived) {
        const userId = this.getUserId();
        if (userId) {
          const cachedData = uni.getStorageSync('radar_data_' + userId);
          if (cachedData) {
            this.top5 = this.calculateTop5(cachedData);
            this.processData(cachedData);
          }
        }
      }
    }, 200);
    
    // 同时拉取数据库最新数据（如果有的话）
    this.fetchRadarData();
  },
  methods: {
    blockAllModals() {
      // 重写 uni.showModal 方法，阻止显示特定弹窗
      const originalShowModal = uni.showModal;
      uni.showModal = (options) => {
        if (options && options.title && options.title.includes('暂无评估')) {
          console.log('[BlockModal] 阻止了弹窗:', options.title);
          return;
        }
        return originalShowModal(options);
      };
    },
    getUserId() {
      const user = uni.getStorageSync('user_v2') || {}; // 修正为 user_v2
      return user.userId || user.id;
    },
    calculateTop5(data) {
      if (!data) return [];
      const allDimensions = [
        { dimension: 'D1', score: data.professionalAbility || 0 },
        { dimension: 'D2', score: data.projectExperience || 0 },
        { dimension: 'D3', score: data.competitionResults || 0 },
        { dimension: 'D4', score: data.academicBackground || 0 },
        { dimension: 'D5', score: data.softSkills || 0 },
        { dimension: 'D6', score: data.industryCognition || 0 },
        { dimension: 'D7', score: data.stressExecution || 0 }
      ];
      allDimensions.sort((a, b) => b.score - a.score);
      return allDimensions.slice(0, 5);
    },
    async pollForNewResult(oldTimestamp, retries = 10, interval = 2000) {
      const userId = this.getUserId();
      if (!userId) {
        uni.showToast({ title: '用户未登录', icon: 'none' });
        return;
      }
      
      uni.showLoading({ title: '正在获取最新结果...' });

      for (let i = 0; i < retries; i++) {
        try {
          const res = await request({
            url: '/api/radar-chart/my-evaluation',
            method: 'GET',
            data: { studentId: userId }
          });
          
          const data = res.data || res;

          if (data && data.createTime && (!oldTimestamp || new Date(data.createTime) > new Date(oldTimestamp))) {
            uni.hideLoading();
            this.top5 = this.calculateTop5(data);
            this.processData(data);
            return;
          }
        } catch (e) {
          console.error(`Polling attempt ${i+1} failed:`, e);
        }
        
        await new Promise(resolve => setTimeout(resolve, interval));
      }

      uni.hideLoading();
      uni.showModal({
        title: '获取结果超时',
        content: '无法获取最新的评估结果，请稍后在“成长档案”页面查看。',
        showCancel: false,
        confirmText: '我知道了',
        success: () => {
          uni.navigateBack();
        }
      });
    },
    async fetchRadarData() {
      const userId = this.getUserId();
      if (!userId) return;

      try {
        const res = await request({
          url: '/api/radar-chart/my-evaluation',
          method: 'GET',
          data: { studentId: userId }
        });

        const data = res.data || res;
        if (data && data.radarId !== undefined) {
          this.top5 = this.calculateTop5(data);
          this.processData(data);
        }
        // 如果数据库没有数据，不做任何提示（数据已通过页面间传递）
      } catch (e) {
        console.error('获取雷达图数据失败', e);
        // 查询失败也不提示，避免影响用户体验
      }
    },
    processData(data) {
      if (!data) {
        this.chartData = {};
        return;
      }

      // 使用 Top 5 维度生成雷达图
      const top5Dimensions = this.calculateTop5(data);
      const categories = top5Dimensions.map(item => this.getDimensionName(item.dimension));
      const seriesData = top5Dimensions.map(item => item.score);

      this.chartData = {
        categories: categories,
        series: [{
          name: '能力评估',
          data: seriesData
        }]
      };
    },
    getDimensionName(dimension) {
      // 如果后端返回的就是真实的模块名称（比如“沟通能力”），那么可以直接返回 dimension
      // 如果后端返回的是编号（比如“D1”），可以通过映射表转换
      return this.dimensionMap[dimension] || dimension;
    },
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    goHome() {
      uni.switchTab({
        url: '/pages/index/index'
      });
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 自定义导航栏样式 */
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #4AA9FE;
  color: #ffffff;
}
.status-bar {
  height: var(--status-bar-height);
  width: 100%;
}
.nav-bar {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}
.back-btn {
  padding: 5px 10px 5px 0;
  display: flex;
  align-items: center;
}
.back-icon {
  font-size: 24px;
  font-weight: bold;
}
.nav-title {
  font-size: 16px;
  font-weight: bold;
}
.nav-right {
  width: 40px;
}

/* 内容区 */
.content-body {
  padding: 20px;
  padding-top: calc(var(--status-bar-height) + 64px); 
}

.result-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.success-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
  background-color: #52c41a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.3);
}

.check-mark {
  color: #fff;
  font-size: 48px;
  font-weight: bold;
}

.result-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.result-subtitle {
  font-size: 14px;
  color: #666;
}

.radar-chart-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-card {
  height: 240px;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  background: linear-gradient(180deg, #fdfefe 0%, #f6f9ff 100%);
  border-radius: 8px;
}

.radar-img {
  width: 100%;
  margin-top: 16px;
  border-radius: 8px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  display: block;
  align-self: flex-start;
}

.score-list {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}

.score-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}
.score-item:last-child {
  border-bottom: none;
}

.rank-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #e6f7ff;
  color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 16px;
}
.rank-1 {
  background-color: #fff1f0;
  color: #ff4d4f;
}
.rank-2 {
  background-color: #fff7e6;
  color: #fa8c16;
}
.rank-3 {
  background-color: #fffbe6;
  color: #faad14;
}

.dimension-name {
  flex: 1;
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.dimension-score {
  font-size: 18px;
  font-weight: bold;
  color: #4AA9FE;
}

.footer {
  margin-top: 20px;
}

.primary-btn {
  background-color: #4AA9FE;
  color: #fff;
  border-radius: 24px;
  font-size: 16px;
  height: 48px;
  line-height: 48px;
}
.primary-btn:active {
  opacity: 0.8;
}
</style>