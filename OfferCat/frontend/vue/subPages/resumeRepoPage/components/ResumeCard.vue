<template>
  <view
    class="resume-card-wrapper"
    :class="[themeClass, { 'is-select-blocked': isSelectBlocked }]"
    @click="handleClick"
  >
    <view class="checkbox-wrap" v-if="isManageMode">
      <view class="custom-checkbox" :class="{ 'is-checked': isSelected }">
        <view class="checkbox-inner" v-if="isSelected"></view>
      </view>
    </view>
    <view class="resume-card" :class="{ 'in-manage-mode': isManageMode }">
      <view class="card-header">
        <view class="resume-info">
          <text class="resume-name">{{ resume.resume_name || '未命名简历' }}</text>
          <text class="resume-time">生成时间：{{ resume.create_time }}</text>
        </view>
        <view class="status-tag" :class="resume.resume_status === 1 ? 'status-normal' : 'status-disabled'">
          {{ resume.resume_status === 1 ? '正常' : '禁用' }}
        </view>
      </view>
      <view class="card-body">
        <view class="score-wrap" v-if="resume.ai_score">
          <text class="score-label">AI评分：</text>
          <text class="score-val">{{ resume.ai_score }}</text>
        </view>
        <text class="skills-preview" v-if="resume.skills">技能：{{ previewText(resume.skills) }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ResumeCard',
  props: {
    resume: {
      type: Object,
      required: true
    },
    theme: {
      type: String,
      default: 'light'
    },
    isManageMode: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isSelectBlocked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    themeClass() {
      return this.theme === 'dark' ? 'theme-dark' : ''
    }
  },
  methods: {
    handleClick() {
      // 避免 uni-app 中自定义 click 事件和原生 click 事件冲突导致触发两次，改用 clickCard
      this.$emit('clickCard', this.resume);
    },
    previewText(text) {
      if (!text) return '';
      if (Array.isArray(text)) {
        const names = text
          .map(item => (item && (item.skill_name || item.name)) ? String(item.skill_name || item.name) : '')
          .filter(Boolean)
          .join('、');
        return names.length > 20 ? names.substring(0, 20) + '...' : names;
      }
      const plain = String(text)
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<\/p>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();
      return plain.length > 20 ? plain.substring(0, 20) + '...' : plain;
    }
  }
}
</script>

<style scoped>
.resume-card-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.resume-card-wrapper.is-select-blocked {
  opacity: 0.55;
}
.checkbox-wrap {
  width: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.custom-checkbox {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  box-sizing: border-box;
}
.custom-checkbox.is-checked {
  border-color: #5d76bd;
  background-color: #5d76bd;
}
.checkbox-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
}
.resume-card {
  flex: 1;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}
.resume-card:active {
  background-color: #f9f9f9;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}
.resume-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.resume-name {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 6px;
}
.resume-time {
  font-size: 12px;
  color: #999999;
}
.status-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 10px;
}
.status-normal {
  background-color: rgba(93, 118, 189, 0.12);
  color: #5d76bd;
}
.status-disabled {
  background-color: #fff1f0;
  color: #ff4d4f;
}
.card-body {
  display: flex;
  flex-direction: column;
}
.score-wrap {
  margin-bottom: 6px;
}
.score-label {
  font-size: 13px;
  color: #666666;
}
.score-val {
  font-size: 14px;
  font-weight: bold;
  color: #10b981;
}
.skills-preview {
  font-size: 13px;
  color: #666666;
}

/* 深色模式 */
.resume-card-wrapper.theme-dark .resume-card {
  background-color: #1d1f24;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.resume-card-wrapper.theme-dark .resume-card:active {
  background-color: #23252b;
}

.resume-card-wrapper.theme-dark .card-header {
  border-bottom-color: rgba(255, 255, 255, 0.06);
}

.resume-card-wrapper.theme-dark .resume-name {
  color: #f4f7fb;
}

.resume-card-wrapper.theme-dark .resume-time,
.resume-card-wrapper.theme-dark .score-label,
.resume-card-wrapper.theme-dark .skills-preview {
  color: rgba(255, 255, 255, 0.58);
}

.resume-card-wrapper.theme-dark .status-normal {
  background-color: rgba(93, 118, 189, 0.22);
  color: #9eb0e6;
}

.resume-card-wrapper.theme-dark .status-disabled {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.38);
}

.resume-card-wrapper.theme-dark .custom-checkbox {
  border-color: #4c4c51;
  background-color: #1d1f24;
}

.resume-card-wrapper.theme-dark .custom-checkbox.is-checked {
  border-color: #5d76bd;
  background-color: #5d76bd;
}

.resume-card-wrapper.theme-dark .checkbox-inner {
  background-color: #ffffff;
}
</style>
