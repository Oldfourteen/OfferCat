<template>
  <!-- 简历仓库 - 管理所有保存的简历 -->
  <view class="container" :class="themeClass">
    <!-- 顶部导航栏 -->
    <view class="nav-header">
      <view class="status-bar"></view>
      <view class="nav-bar">
        <view class="nav-bar-side nav-bar-left">
          <view class="back-btn" @click="goBack">
            <image class="back-icon-img" :src="resumeRepoBackIcon" mode="aspectFit" />
          </view>
        </view>
        <text class="nav-title">在线简历仓库</text>
        <view class="nav-bar-side nav-bar-right">
          <text v-if="resumeList.length > 0" class="manage-btn" @click="toggleManageMode">
            {{ isManageMode ? '完成' : '管理' }}
          </text>
        </view>
      </view>
    </view>

    <!-- 页面主体内容 -->
    <view class="content-body" :class="{ 'has-bottom-bar': isManageMode }">
      <view class="header-desc">
        <view class="desc-card">
          <text class="desc-text">这里保存了你制作的全部简历</text>
        </view>
      </view>

      <!-- 简历列表 -->
      <view class="resume-list" v-if="resumeList.length > 0">
        <resume-card 
          v-for="item in resumeList" 
          :key="item.resume_id" 
          :resume="item" 
          :theme="theme"
          :isManageMode="isManageMode"
          :isSelected="selectedResumes.includes(item.resume_id)"
          :isSelectBlocked="isCardSelectBlocked(item.resume_id)"
          @clickCard="handleCardClick" 
        />
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-else>
        <view class="empty-visual">
          <view class="empty-doc empty-doc--back"></view>
          <view class="empty-doc empty-doc--front"></view>
        </view>
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
// 简历卡片组件
import ResumeCard from './components/ResumeCard.vue'
// 简历仓库数据工具
import { fetchResumeRepoListPreferServer, deleteResumes } from '../../utils/resumeRepo.js'
// 主题混入
import themeMixin from '@/utils/themeMixin.js'

const RESUME_REPO_BACK_ICON =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
      '<path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>'
  )

/** 管理模式下单次删除上限 */
const MAX_DELETE_PER_BATCH = 5

export default {
  mixins: [themeMixin],
  components: {
    ResumeCard
  },
  data() {
    return {
      resumeRepoBackIcon: RESUME_REPO_BACK_ICON,
      resumeList: [],
      isManageMode: false,
      selectedResumes: []
    }
  },
  computed: {
    // 是否处于「全选」状态：列表不超过上限时须全部选中；超过上限时须恰好选中列表中的前 MAX_DELETE_PER_BATCH 条
    isAllSelected() {
      const n = this.resumeList.length;
      if (n === 0) return false;
      if (n <= MAX_DELETE_PER_BATCH) {
        return this.selectedResumes.length === n;
      }
      const firstIds = this.resumeList.slice(0, MAX_DELETE_PER_BATCH).map((r) => r.resume_id);
      if (this.selectedResumes.length !== MAX_DELETE_PER_BATCH) return false;
      return firstIds.every((id) => this.selectedResumes.includes(id));
    }
  },
  onLoad() {
    void this.fetchResumeList();
  },
  onShow() {
    // 页面显示时刷新列表
    void this.fetchResumeList();
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    // 获取简历仓库列表
    async fetchResumeList() {
      this.resumeList = await fetchResumeRepoListPreferServer()
      // 清理不再存在的选中项
      this.selectedResumes = this.selectedResumes.filter(id => 
        this.resumeList.some(r => r.resume_id === id)
      );
      // 无数据时自动退出管理模式
      if (this.resumeList.length === 0) {
        this.isManageMode = false;
      }
    },
    // 切换管理模式
    toggleManageMode() {
      this.isManageMode = !this.isManageMode;
      // 退出管理时清空选中
      if (!this.isManageMode) {
        this.selectedResumes = [];
      }
    },
    isCardSelectBlocked(resumeId) {
      return (
        this.isManageMode &&
        this.selectedResumes.length >= MAX_DELETE_PER_BATCH &&
        !this.selectedResumes.includes(resumeId)
      );
    },
    // 卡片点击事件
    handleCardClick(resume) {
      if (this.isManageMode) {
        // 管理模式：切换选中状态
        const id = resume.resume_id;
        const index = this.selectedResumes.indexOf(id);
        if (index > -1) {
          this.selectedResumes.splice(index, 1);
        } else {
          if (this.selectedResumes.length >= MAX_DELETE_PER_BATCH) {
            uni.showToast({
              title: `单次最多选择${MAX_DELETE_PER_BATCH}份简历`,
              icon: 'none'
            });
            return;
          }
          this.selectedResumes.push(id);
        }
      } else {
        // 普通模式：编辑简历
        this.goToResumeMake(resume);
      }
    },
    // 全选/取消全选
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedResumes = [];
      } else {
        const ids = this.resumeList.map((r) => r.resume_id);
        if (ids.length <= MAX_DELETE_PER_BATCH) {
          this.selectedResumes = [...ids];
        } else {
          this.selectedResumes = ids.slice(0, MAX_DELETE_PER_BATCH);
          uni.showToast({
            title: `单次最多${MAX_DELETE_PER_BATCH}份，已选中列表前${MAX_DELETE_PER_BATCH}份`,
            icon: 'none',
            duration: 2200
          });
        }
      }
    },
    // 删除选中简历
    handleDelete() {
      if (this.selectedResumes.length === 0) return;
      if (this.selectedResumes.length > MAX_DELETE_PER_BATCH) {
        uni.showToast({
          title: `单次最多删除${MAX_DELETE_PER_BATCH}份，请分批操作`,
          icon: 'none'
        });
        return;
      }

      uni.showModal({
        title: '提示',
        content: `确定要删除选中的 ${this.selectedResumes.length} 份简历吗？此操作不可恢复。`,
        success: async (res) => {
          if (res.confirm) {
            await deleteResumes(this.selectedResumes);
            uni.showToast({ title: '删除成功', icon: 'success' });
            this.selectedResumes = [];
            void this.fetchResumeList();
          }
        }
      });
    },
    // 跳转到简历编辑页
    goToResumeMake(resume) {
      uni.navigateTo({
        url: `/subPages/onlineResumeMake/onlineResumeMake?resume_id=${resume.resume_id}`
      });
    },
    // 新建简历
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
  background-color: #5d76bd;
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
  padding: 0 12px;
  box-sizing: border-box;
}
.nav-bar-side {
  width: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.nav-bar-left {
  justify-content: flex-start;
}
.nav-bar-right {
  justify-content: flex-end;
}
.back-btn {
  box-sizing: border-box;
  width: 36px;
  height: 36px;
  padding: 0;
  margin-right: 6px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 3px 9px rgba(34, 97, 193, 0.14);
}
.back-icon-img {
  width: 19px;
  height: 19px;
  flex-shrink: 0;
}
.nav-title {
  flex: 1;
  min-width: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
  line-height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.manage-btn {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  padding: 6px 4px;
  line-height: 1.2;
}
.content-body {
  padding: 16px 18px 24px;
  padding-top: calc(var(--status-bar-height) + 64px);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  box-sizing: border-box;
}
.content-body.has-bottom-bar {
  padding-bottom: 80px;
}
.header-desc {
  margin-bottom: 18px;
}
.desc-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.045);
  box-sizing: border-box;
}
.desc-text {
  font-size: 14px;
  line-height: 1.65;
  color: #666;
  letter-spacing: 0.02em;
}
.resume-list {
  flex: 1;
  min-height: 0;
}
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px 32px;
  min-height: 200px;
}
.empty-visual {
  position: relative;
  width: 120px;
  height: 100px;
  margin-bottom: 28px;
}
.empty-doc {
  position: absolute;
  border-radius: 10px;
  border: 2px solid #5d76bd;
  background-color: rgba(255, 255, 255, 0.95);
  box-sizing: border-box;
}
.empty-doc--back {
  width: 72px;
  height: 88px;
  left: 8px;
  top: 8px;
  opacity: 0.35;
  transform: rotate(-8deg);
}
.empty-doc--front {
  width: 76px;
  height: 92px;
  right: 6px;
  bottom: 0;
  opacity: 0.55;
  transform: rotate(6deg);
  box-shadow: 0 8px 24px rgba(93, 118, 189, 0.18);
}
.empty-text {
  font-size: 17px;
  font-weight: 600;
  color: #999;
  letter-spacing: 0.03em;
  margin-bottom: 28px;
  text-align: center;
}
.create-btn {
  margin: 0;
  background-color: #5d76bd;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0 40px;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.08em;
  box-shadow: 0 10px 22px rgba(93, 118, 189, 0.32);
}
.create-btn::after {
  border: none;
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
  border-color: #5d76bd;
  background-color: #5d76bd;
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
.container.theme-dark .manage-btn {
  color: #f4f7fb;
}

.container.theme-dark .back-btn {
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.container.theme-dark .desc-text {
  color: rgba(255, 255, 255, 0.58);
}

.container.theme-dark .desc-card {
  background-color: #1a1c22;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.container.theme-dark .empty-text {
  color: rgba(255, 255, 255, 0.38);
}

.container.theme-dark .empty-doc {
  border-color: #5d76bd;
}

.container.theme-dark .empty-doc--back {
  background-color: rgba(26, 28, 34, 0.9);
}

.container.theme-dark .empty-doc--front {
  background-color: rgba(37, 40, 48, 0.98);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.container.theme-dark .create-btn {
  background-color: #5d76bd;
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
  border-color: #5d76bd;
  background-color: #5d76bd;
}

.container.theme-dark .checkbox-inner {
  background-color: #ffffff;
}
</style>
