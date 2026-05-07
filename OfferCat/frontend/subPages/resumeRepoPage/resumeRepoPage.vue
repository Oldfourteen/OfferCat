<template>
  <view class="container" :class="themeClass">
    <view class="nav-header">
      <view class="status-bar"></view>
      <view class="nav-bar">
        <view class="back-btn" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">简历仓库</text>
        <view class="nav-right">
          <text v-if="resumeList.length > 0" class="manage-btn" @click="toggleManageMode">
            {{ isManageMode ? '完成' : '管理' }}
          </text>
        </view>
      </view>
    </view>

    <view class="content-body" :class="{ 'has-bottom-bar': isManageMode }">
      <view class="header-desc">
        <text class="desc-text">这里保存了你制作的全部简历</text>
      </view>

      <view class="resume-list" v-if="resumeList.length > 0">
        <resume-card 
          v-for="item in resumeList" 
          :key="item.resume_id" 
          :resume="item" 
          :theme="theme"
          :isManageMode="isManageMode"
          :isSelected="selectedResumes.includes(item.resume_id)"
          @clickCard="handleCardClick" 
        />
      </view>
      
      <view class="empty-state" v-else>
        <text class="empty-text">暂无保存的简历</text>
        <button class="create-btn" @click="createResume">去制作简历</button>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-action-bar" v-if="isManageMode && resumeList.length > 0">
      <view class="select-all-wrap" @click="toggleSelectAll">
        <view class="custom-checkbox" :class="{ 'is-checked': isAllSelected }">
          <view class="checkbox-inner" v-if="isAllSelected"></view>
        </view>
        <text class="select-all-text">全选</text>
      </view>
      <button class="delete-btn" :disabled="selectedResumes.length === 0" @click="handleDelete">
        删除 {{ selectedResumes.length > 0 ? `(${selectedResumes.length})` : '' }}
      </button>
    </view>
  </view>
</template>

<script>
import ResumeCard from './components/ResumeCard.vue'
import { getResumeRepoList, deleteResumes } from '../../utils/resumeRepo.js'
import themeMixin from '@/utils/themeMixin.js'

export default {
  mixins: [themeMixin],
  components: {
    ResumeCard
  },
  data() {
    return {
      resumeList: [],
      isManageMode: false,
      selectedResumes: []
    }
  },
  computed: {
    isAllSelected() {
      return this.resumeList.length > 0 && this.selectedResumes.length === this.resumeList.length;
    }
  },
  onLoad() {
    this.fetchResumeList();
  },
  onShow() {
    this.fetchResumeList();
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    fetchResumeList() {
      this.resumeList = getResumeRepoList()
      // 清理不再存在的选中项
      this.selectedResumes = this.selectedResumes.filter(id => 
        this.resumeList.some(r => r.resume_id === id)
      );
      if (this.resumeList.length === 0) {
        this.isManageMode = false;
      }
    },
    toggleManageMode() {
      this.isManageMode = !this.isManageMode;
      if (!this.isManageMode) {
        this.selectedResumes = [];
      }
    },
    handleCardClick(resume) {
      if (this.isManageMode) {
        const id = resume.resume_id;
        const index = this.selectedResumes.indexOf(id);
        if (index > -1) {
          this.selectedResumes.splice(index, 1);
        } else {
          this.selectedResumes.push(id);
        }
      } else {
        this.goToResumeMake(resume);
      }
    },
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedResumes = [];
      } else {
        this.selectedResumes = this.resumeList.map(r => r.resume_id);
      }
    },
    handleDelete() {
      if (this.selectedResumes.length === 0) return;
      
      uni.showModal({
        title: '提示',
        content: `确定要删除选中的 ${this.selectedResumes.length} 份简历吗？此操作不可恢复。`,
        success: (res) => {
          if (res.confirm) {
            deleteResumes(this.selectedResumes);
            uni.showToast({ title: '删除成功', icon: 'success' });
            this.selectedResumes = [];
            this.fetchResumeList();
          }
        }
      });
    },
    goToResumeMake(resume) {
      uni.navigateTo({
        url: `/subPages/onlineResumeMake/onlineResumeMake?resume_id=${resume.resume_id}`
      });
    },
    createResume() {
      uni.navigateTo({
        url: '/subPages/onlineResumeMake/onlineResumeMake'
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
  display: flex;
  justify-content: flex-end;
}
.manage-btn {
  font-size: 14px;
  color: #ffffff;
}
.content-body {
  padding: 20px;
  padding-top: calc(var(--status-bar-height) + 64px); 
  flex: 1;
}
.content-body.has-bottom-bar {
  padding-bottom: 80px;
}
.header-desc {
  margin-bottom: 20px;
}
.desc-text {
  font-size: 14px;
  color: #666;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
}
.empty-text {
  font-size: 16px;
  color: #999;
  margin-bottom: 20px;
}
.create-btn {
  background-color: #4AA9FE;
  color: #fff;
  border-radius: 20px;
  padding: 0 30px;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
.bottom-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 99;
}
.select-all-wrap {
  display: flex;
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
  border-color: #4AA9FE;
  background-color: #4AA9FE;
}
.checkbox-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
}
.select-all-text {
  font-size: 14px;
  color: #333;
  margin-left: 8px;
}
.delete-btn {
  margin: 0;
  background-color: #ff4d4f;
  color: #ffffff;
  border-radius: 20px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  padding: 0 24px;
}
.delete-btn[disabled] {
  background-color: #ffccc7;
  color: #ffffff;
}

/* 深色模式 */
.container.theme-dark {
  background-color: #111216;
}

.container.theme-dark .nav-header {
  background-color: #1a1c22;
}

.container.theme-dark .nav-title,
.container.theme-dark .back-icon,
.container.theme-dark .manage-btn {
  color: #f4f7fb;
}

.container.theme-dark .desc-text {
  color: rgba(255, 255, 255, 0.58);
}

.container.theme-dark .empty-text {
  color: rgba(255, 255, 255, 0.38);
}

.container.theme-dark .create-btn {
  background-color: #3165d7;
  color: #ffffff;
}

.container.theme-dark .bottom-action-bar {
  background-color: #1a1c22;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
}

.container.theme-dark .select-all-text {
  color: #f4f7fb;
}

.container.theme-dark .delete-btn {
  background-color: #d32029;
}

.container.theme-dark .delete-btn[disabled] {
  background-color: #5c2024;
  color: rgba(255, 255, 255, 0.3);
}

.container.theme-dark .custom-checkbox {
  border-color: #4c4c51;
  background-color: #1d1f24;
}

.container.theme-dark .custom-checkbox.is-checked {
  border-color: #4AA9FE;
  background-color: #4AA9FE;
}

.container.theme-dark .checkbox-inner {
  background-color: #ffffff;
}
</style>
