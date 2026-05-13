<template>
  <view class="question-item" :class="theme === 'dark' ? 'theme-dark' : ''">
    <view class="question-title">{{ index + 1 }}. {{ question.title }}</view>
    <view class="options-list">
      <view 
        class="option-item" 
        :class="{ active: value === option.label }"
        v-for="(option, idx) in question.options" 
        :key="idx"
        @click="selectOption(option.label)"
      >
        <text class="option-label">{{ option.label }}.</text>
        <text class="option-text">{{ option.text }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'QuestionItem',
  props: {
    question: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  methods: {
    selectOption(label) {
      this.$emit('input', label);
    }
  }
}
</script>

<style scoped>
.question-item {
  margin-bottom: 20px;
  padding: 18px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}
.question-title {
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 14px;
  color: #333333;
}
.options-list {
  display: flex;
  flex-direction: column;
}
.option-item {
  display: flex;
  align-items: center;
  padding: 14px;
  margin-bottom: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background-color: #fcfcfc;
  transition: all 0.2s ease;
}
.option-item:last-child {
  margin-bottom: 0;
}
.option-item.active {
  background-color: #e6f7ff;
  border-color: #4AA9FE;
  color: #4AA9FE;
}
.option-label {
  margin-right: 10px;
  font-weight: bold;
}
.option-text {
  flex: 1;
  font-size: 15px;
}
</style>
