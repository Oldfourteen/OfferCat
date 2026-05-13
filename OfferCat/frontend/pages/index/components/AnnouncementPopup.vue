<template>
  <view v-if="visible" class="announcement-mask" :class="themeClass" @tap.stop="close">
    <view class="announcement-content" @tap.stop>
      <view class="announcement-header">
        <text class="title">系统公告</text>
        <image class="close-icon" src="/static/close.png" @tap="close"></image>
      </view>
      <scroll-view scroll-y class="announcement-body">
        <text class="text-content">
          欢迎来到 OfferCat！\n\n
          最新更新：\n
          1. 完善了个人资料编辑功能\n
          2. 修复了部分已知问题\n\n
          祝您求职顺利，早日拿到心仪的 Offer！
        </text>
      </scroll-view>
      <view class="announcement-footer">
        <button class="btn-confirm" @tap="close">我知道了</button>
      </view>
    </view>
  </view>
</template>

<script>
import { getToken } from '@/utils/token.js'
import themeMixin from '@/utils/themeMixin.js'

export default {
  name: 'AnnouncementPopup',
  mixins: [themeMixin],
  data() {
    return {
      visible: false
    }
  },
  methods: {
    checkAndShow() {
      // 检查是否登录，未登录则不弹出
      const token = getToken()
      if (!token) return

      // 检查今天是否已经显示过，每天只弹出一次
      const today = new Date().toLocaleDateString()
      const lastShowDate = uni.getStorageSync('announcement_last_show_date')

      if (lastShowDate !== today) {
        this.visible = true
        // 记录今天已弹出
        uni.setStorageSync('announcement_last_show_date', today)
      }
    },
    close() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.announcement-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.announcement-content {
  width: 600rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
}

.announcement-header {
  position: relative;
  padding: 30rpx 0;
  text-align: center;
  border-bottom: 1rpx solid #eeeeee;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
  }
  
  .close-icon {
    position: absolute;
    right: 30rpx;
    top: 50%;
    transform: translateY(-50%);
    width: 40rpx;
    height: 40rpx;
    opacity: 0.5;
  }
}

.announcement-body {
  padding: 40rpx 30rpx;
  max-height: 500rpx;
  box-sizing: border-box;
  
  .text-content {
    font-size: 28rpx;
    color: #666666;
    line-height: 1.6;
  }
}

.announcement-footer {
  padding: 30rpx;
  
  .btn-confirm {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    background: linear-gradient(90deg, #007bfc, #01bcff);
    color: #ffffff;
    font-size: 32rpx;
    border-radius: 40rpx;
    border: none;
    
    &::after {
      border: none;
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(50rpx); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* 暗黑模式适配 */
.theme-dark {
  &.announcement-mask {
    background-color: rgba(0, 0, 0, 0.8);
  }
  .announcement-content {
    background-color: #232a3f;
  }
  .announcement-header {
    border-bottom-color: #333333;
    .title {
      color: #ffffff;
    }
  }
  .announcement-body {
    .text-content {
      color: #cccccc;
    }
  }
}
</style>