// pages/comment/comment.js
const app = getApp()
const { checkUnread } = require('../../utils/badge.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: 20, // 默认值
    navBarHeight: 44, // 默认导航栏高度
    totalHeaderHeight: 64,
    tabs: ['全部', '热点', '好友', '签到', '礼品兑换'],
    currentTab: 0,
    posts: [],
    allPosts: [], // 存储所有帖子数据，用于搜索过滤
    friendIds: [], // 好友ID列表
    searchQuery: '', // 搜索关键词
    // 评论相关
    showCommentInput: false,
    commentFocus: false,
    commentContent: '',
    currentPostIndex: -1,
    isFabExpanded: false, // 悬浮按钮展开状态
    showBackToTop: false, // 是否显示返回顶部按钮
    scrollTop: 0, // 滚动条位置
    currentPage: 1, // 分页：当前页码
    pageSize: 10, // 分页：每页数量
    hasMore: false, // 分页：是否有更多
    isLoading: false, // 分页：是否正在加载
    filteredPosts: [], // 过滤后的完整数据
    quickActions: [
      { name: '频道助手', icon: '/image/bullhorn-solid-full.svg' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const sysInfo = wx.getSystemInfoSync();
    const statusBarHeight = sysInfo.statusBarHeight;
    const isIOS = sysInfo.system.indexOf('iOS') > -1;
    const navBarHeight = isIOS ? 44 : 48;
    
    this.setData({
      statusBarHeight: statusBarHeight,
      navBarHeight: navBarHeight,
      totalHeaderHeight: statusBarHeight + navBarHeight + 10 // 额外加一点padding
    });
    this.preloadPostPrivateSubpackage();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1, // 论坛索引为 1
        show: false,
        isSwitching: false // 确保清除切换状态
      })
    }

    // 检查用户是否已切换，如果切换了则清空旧数据，防止看到上个账号的私密贴
    const currentUserId = app.globalData.userInfo?.user_id || '';
    if (this._lastUserId !== currentUserId) {
      console.log('检测到用户切换，清空论坛列表数据');
      this._lastUserId = currentUserId;
      this.setData({
        posts: [],
        allPosts: [],
        filteredPosts: [],
        currentPage: 1,
        hasMore: false
      });
    }

    // 将耗时操作放入 setTimeout 中，避免阻塞页面切换动画
    setTimeout(() => {
      // 检查未读消息并更新红点
      checkUnread();

      // Check for new post from publish page (Optimistic Update)
      if (app.globalData.newPost) {
        const newPost = app.globalData.newPost;
        const currentUserId = app.globalData.userInfo?.user_id || '';
        
        // 只有当帖子属于当前用户时才展示（防止跨账号泄露）
        if (currentUserId && String(newPost.user_id) === String(currentUserId)) {
          // 检查是否已经在列表中，防止重复 prepending 导致 duplicate key 错误
          const alreadyPrepended = this.data.posts.some(p => p.id === newPost.id);
          
          if (!alreadyPrepended) {
            this.processAndPrependPost(newPost);
          }
        }
         
        // 处理完后必须清除，防止重复进入页面时再次处理，也防止泄露给下一个登录用户
        app.globalData.newPost = null;

         // 注意：这里已经清除了 newPost，但为了解决“帖子不存在”的问题（temp_id 无法在详情页加载），
        // 同时也为了确保最终能拿到服务器生成的真实 ID，
        // 在乐观更新后延迟一段时间自动刷新列表。
        if (!this._hasAutoRefreshed) {
          this._hasAutoRefreshed = true;
          setTimeout(() => {
            this.fetchPosts();
            this._hasAutoRefreshed = false;
          }, 2000);
        }
        return;
      }

      this.fetchPosts();
    }, 50);
  },

  /**
   * 处理并插入新帖子到列表头部
   */
  processAndPrependPost(post) {
    // Reuse the formatting logic from fetchPosts
    // This is a simplified version of the logic inside fetchPosts map
    let rawContent = post.content || '';
    
    let plainText = rawContent
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/div>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/ig, " ")
      .replace(/&lt;/ig, "<")
      .replace(/&gt;/ig, ">")
      .replace(/&amp;/ig, "&")
      .replace(/&quot;/ig, '"')
      .replace(/&apos;/ig, "'")
      .trim();

    // 重新生成干净的 HTML，仅对 @昵称 应用高亮
    let cleanHtml = plainText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>")
      .replace(/(@[\w\u4e00-\u9fa5_-]+)/g, '<span style="color: #1E90FF;">$1</span>');

    const limit = 200;
    const isLong = plainText.length > limit;
    
    let collapsedPlainText = plainText;
    if (isLong) {
        collapsedPlainText = plainText.substring(0, limit) + '...';
    }
    
    let collapsedHtml = collapsedPlainText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>")
      .replace(/(@[\w\u4e00-\u9fa5_-]+)/g, '<span style="color: #1E90FF;">$1</span>');
    
    const displayContent = cleanHtml;
    const collapsedContent = collapsedHtml;

    // Handle images
    let img = post.image || post.image_url;
    let images = [];
    
    if (img) {
      if (typeof img === 'string' && img.includes(',')) {
        images = img.split(',').map(url => app.api.resolveImageUrl(url.trim()));
        img = images[0]; 
      } else {
        img = app.api.resolveImageUrl(img);
        images = [img];
      }
    } else if (post.images && post.images.length > 0) {
      images = post.images.map(url => app.api.resolveImageUrl(url));
      img = images[0];
    }

    const formattedPost = {
      ...post,
      image: img,
      images: images,
      avatar: app.api.resolveImageUrl(post.avatar),
      frame_url: post.frame_url ? app.api.resolveImageUrl(post.frame_url) : '',
      frame_style: post.frame_style || '',
      level: post.level || 1,
      time: '刚刚', // Special time for new post
      isLiked: false,
      isCollected: false,
      likes: [],
      comments: [],
      displayContent,
      isLong,
      isExpanded: false,
      plainText,
      collapsedContent
    };

    const newPosts = [formattedPost, ...this.data.posts];
    const newAllPosts = [formattedPost, ...this.data.allPosts];
    const newFilteredPosts = [formattedPost, ...this.data.filteredPosts];

    this.setData({
      posts: newPosts,
      allPosts: newAllPosts,
      filteredPosts: newFilteredPosts
    });
    
    // Scroll to top
    this.scrollToTop();
  },

  /**
   * 搜索输入
   */
  onSearchInput(e) {
    const query = e.detail.value.trim().toLowerCase();
    this.setData({
      searchQuery: query
    }, () => {
      this.updateDisplayPosts();
    });
  },

  /**
   * 获取帖子列表
   */
  async fetchPosts() {
    try {
      const userInfo = app.globalData.userInfo || {};
      const userId = userInfo.user_id || '';

      // 同时获取帖子和好友列表（如果已登录）
      const promises = [app.api.getForumPosts(userId)];
      if (userId) {
        promises.push(app.api.getFriendList(userId));
      }

      const [posts, friends] = await Promise.all(promises);

      // 处理好友ID列表
      let friendIds = [];
      if (friends && Array.isArray(friends)) {
        friendIds = friends.map(f => f.id);
      }
      
      // 获取本地收藏列表
      const favorites = wx.getStorageSync('favorites') || [];

      const formattedPosts = posts.map(post => {
        let rawContent = post.content || '';
        
        // 优化 HTML 转纯文本逻辑，保留换行
        let plainText = rawContent
          .replace(/<br\s*\/?>/gi, "\n") // 替换 <br> 为换行
          .replace(/<\/p>/gi, "\n")      // 替换 </p> 为换行
          .replace(/<\/div>/gi, "\n")    // 替换 </div> 为换行
          .replace(/<[^>]+>/g, "")       // 去除其他标签
          .replace(/&nbsp;/ig, " ")       // 替换空格
          .replace(/&lt;/ig, "<")
          .replace(/&gt;/ig, ">")
          .replace(/&amp;/ig, "&")
          .replace(/&quot;/ig, '"')
          .replace(/&apos;/ig, "'")
          .trim();                       // 去除首尾空白

        // 重新生成干净的 HTML，仅对 @昵称 应用高亮
        let cleanHtml = plainText
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\n/g, "<br/>")
          .replace(/(@[\w\u4e00-\u9fa5_-]+)/g, '<span style="color: #1E90FF;">$1</span>');

        // 限制最大行数或字数
        // 这里简单用字数截断模拟，约 200 字
        const limit = 200;
        const isLong = plainText.length > limit;
        
        // 生成收起时的显示内容，并应用高亮
        let collapsedPlainText = plainText;
        if (isLong) {
            collapsedPlainText = plainText.substring(0, limit) + '...';
        }
        
        let collapsedHtml = collapsedPlainText
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\n/g, "<br/>")
          .replace(/(@[\w\u4e00-\u9fa5_-]+)/g, '<span style="color: #1E90FF;">$1</span>');
        
        const displayContent = cleanHtml;
        const collapsedContent = collapsedHtml;

        // 解析图片
        let img = post.image || post.image_url;
        let images = [];
        
        if (img) {
          if (typeof img === 'string' && img.includes(',')) {
            images = img.split(',').map(url => app.api.resolveImageUrl(url.trim()));
            img = images[0]; 
          } else {
            img = app.api.resolveImageUrl(img);
            images = [img];
          }
        } else if (post.images && post.images.length > 0) {
          images = post.images.map(url => app.api.resolveImageUrl(url));
          img = images[0];
        }

        // 检查是否已收藏
        const isCollected = favorites.some(item => item.isForumPost && String(item.id) === String(post.id));

        return {
          ...post,
          image: img,
          images: images,
          avatar: app.api.resolveImageUrl(post.avatar),
          frame_url: post.frame_url ? app.api.resolveImageUrl(post.frame_url) : '',
          frame_style: post.frame_style || '',
          level: post.level || 1, // 确保有 level
          // Simple time formatting logic if needed
          time: this.formatTime(post.time),
          isLiked: post.isLiked || false,
          isCollected: isCollected, // 初始化收藏状态
          likes: post.likes || [],
          comments: post.comments || [], // 确保有评论数组
          displayContent,
          isLong,
          isExpanded: false, // 默认收起
          plainText,         // 完整纯文本
          collapsedContent   // 收起后的截断文本
        };
      });

      this.setData({
        allPosts: formattedPosts, // 备份所有数据
        friendIds: friendIds
      }, () => {
        this.updateDisplayPosts();
      });
    } catch (err) {
      console.error('Fetch posts failed', err);
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      });
    }
  },

  formatTime(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    // Within 24 hours, show time
    if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    
    // Otherwise show date
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  },

  /**
   * 跳转到帖子详情
   */
  goToPostDetail(e) {
    const postId = e.currentTarget.dataset.id;

    // 如果是临时 ID，说明后台还在发布中或者列表尚未同步真实 ID
    if (String(postId).startsWith('temp_')) {
      wx.showToast({
        title: '帖子正在同步到服务器，请稍候',
        icon: 'none'
      });
      // 触发一次静默刷新，尝试获取真实 ID
      this.fetchPosts();
      return;
    }

    wx.navigateTo({
      url: `/subpkg/postDetail/postDetail?id=${postId}`,
    });
  },

  goToUserPostPrivate(e) {
    const userId = e.currentTarget.dataset.userid;
    const name = e.currentTarget.dataset.name || '';
    const avatar = e.currentTarget.dataset.avatar || '';
    if (!userId) {
      wx.showToast({
        title: '用户信息不存在',
        icon: 'none'
      });
      return;
    }

    // --- 性能优化：在导航前提前异步获取数据 ---
    const currentUserId = app.globalData.userInfo?.user_id || '';
    const fetchPromise = Promise.all([
      // 1. 获取用户信息
      app.api.getUserInfo(userId).catch(e => {
          console.warn('预加载用户信息失败', e);
          return {};
      }),
      // 2. 获取帖子列表 (已优化为按目标用户过滤)
      app.api.getForumPosts(currentUserId, userId).catch(e => {
          console.warn('预加载帖子列表失败', e);
          return [];
      }),
      // 3. 获取好友列表
      app.api.getFriendList(userId).catch(e => {
          console.warn('预加载好友列表失败', e);
          return [];
      }),
      // 4. 检查是否是好友
      (currentUserId && currentUserId != userId) ? 
          app.api.checkIsFriend(currentUserId, userId).catch(() => ({ isFriend: false })) : 
          Promise.resolve({ isFriend: false })
    ]);
    
    // 将 Promise 存入全局，供 postPrivate 页面取出使用
    app.setPreloadPromise(`postPrivate_${userId}`, fetchPromise);

    // --- 极速优化：预加载页面 ---
    if (wx.canIUse('preloadPage')) {
      wx.preloadPage({
        url: `/subpkg/postPrivate/postPrivate?userId=${userId}&nickname=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}`
      });
    }

    wx.navigateTo({
      url: `/subpkg/postPrivate/postPrivate?userId=${userId}&nickname=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}`
    });
  },

  preloadPostPrivateSubpackage() {
    if (this._postPrivateSubpkgLoaded || this._postPrivateSubpkgLoading) return;
    if (typeof wx.loadSubpackage !== 'function') {
      this._postPrivateSubpkgLoaded = true;
      return;
    }
    this._postPrivateSubpkgLoading = true;
    wx.loadSubpackage({
      name: 'subpkg',
      success: () => {
        this._postPrivateSubpkgLoaded = true;
      },
      complete: () => {
        this._postPrivateSubpkgLoading = false;
      }
    });
  },

  /**
   * 显示更多操作
   */
  showMoreActions(e) {
    const index = e.currentTarget.dataset.index;
    const posts = this.data.posts;
    const post = posts[index];
    
    if (!post) return;

    const userInfo = app.globalData.userInfo || {};
    const isOwner = userInfo.user_id && String(userInfo.user_id) === String(post.user_id);
    const isAdmin = userInfo.role === 'admin';
    const isDeveloper = userInfo.role === 'developer';
    const canDelete = isOwner || isAdmin || isDeveloper;

    const itemList = canDelete ? ['删除帖子', '收藏'] : ['收藏', '举报', '不感兴趣'];

    wx.showActionSheet({
      itemList: itemList,
      success: (res) => {
        if (canDelete) {
          if (res.tapIndex === 0) {
            // 删除帖子
            this.handleDeletePost(post, index);
          } else if (res.tapIndex === 1) {
            // 收藏
            this.handleCollectPost(post);
          }
        } else {
          if (res.tapIndex === 0) {
            // 收藏
            this.handleCollectPost(post);
          } else if (res.tapIndex === 1) {
            this.reportPost(post);
          } else if (res.tapIndex === 2) {
            // 不感兴趣
            wx.showToast({ title: '将减少此类推荐', icon: 'none' });
          }
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  reportPost(post) {
    const userInfo = app.globalData.userInfo || wx.getStorageSync('userInfo') || {};
    if (!userInfo.user_id) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.showActionSheet({
      itemList: ['垃圾广告', '不友善内容', '违法违规', '其他'],
      success: (res) => {
        const reasonList = ['垃圾广告', '不友善内容', '违法违规', '其他'];
        const reason = reasonList[res.tapIndex] || '其他';
        app.api.createReport({
          reporter_id: userInfo.user_id,
          target_type: 'forum_post',
          target_id: post.id,
          reason
        }).then((msg) => {
          wx.showToast({ title: msg || '举报已提交', icon: 'none' });
        }).catch((err) => {
          wx.showToast({ title: typeof err === 'string' ? err : '举报失败，请重试', icon: 'none' });
        });
      }
    });
  },

  /**
   * 点击星星收藏/取消收藏
   */
  toggleCollect(e) {
    const index = e.currentTarget.dataset.index;
    const post = this.data.posts[index];
    
    // 直接处理收藏逻辑，移除 JS 动画
    this.handleCollectPost(post, index);
  },

  /**
   * 处理收藏逻辑
   */
  handleCollectPost(post, index) {
    if (!post) return;

    // 1. 获取当前收藏列表
    let favorites = wx.getStorageSync('favorites') || [];

    // 2. 检查是否已收藏
    // 论坛帖子使用 'forum_' 前缀ID或通过 isForumPost 标记区分
    const isCollected = favorites.some(item => item.isForumPost && String(item.id) === String(post.id));

    if (isCollected) {
      // 取消收藏
      favorites = favorites.filter(item => !(item.isForumPost && String(item.id) === String(post.id)));
      wx.setStorageSync('favorites', favorites);
      
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      });

      // 更新状态
      post.isCollected = false;
    } else {
      // 收藏
      // 3. 构造收藏对象
    let content = post.content || '';
    // 移除HTML标签
    let plainText = content.replace(/<[^>]+>/g, "");
    // 移除常见HTML实体
    plainText = plainText.replace(/&nbsp;/g, " ")
                         .replace(/&lt;/g, "<")
                         .replace(/&gt;/g, ">")
                         .replace(/&amp;/g, "&")
                         .replace(/&quot;/g, '"')
                         .replace(/&apos;/g, "'");
    
    let title = plainText || '分享内容';
     if (title.length > 12) {
       title = title.substring(0, 12) + '...';
     }

    const favoriteItem = {
        id: post.id,
        isForumPost: true, // 标记为论坛帖子
        type: '论坛',      // 显示类型
        title: title,      // 对应失物招领的 title
        image: post.image || '', // 对应失物招领的 image/images[0]
        user_avatar: post.avatar, // 发布者头像
        user_name: post.name,     // 发布者昵称
        time: post.time,          // 发布时间
        place: '小程序论坛',       // 对应失物招领的 place
        desc: post.content,       // 完整内容
        create_time: new Date().getTime() // 收藏时间
      };
  
      // 4. 添加到收藏列表
      favorites.unshift(favoriteItem);
      wx.setStorageSync('favorites', favorites);
  
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      });

      // 更新状态
      post.isCollected = true;
    }

    // 更新 posts 列表
    if (typeof index !== 'undefined' && index !== -1) {
      this.setData({
        [`posts[${index}].isCollected`]: post.isCollected
      });
    } else {
      // 如果没有传入 index，尝试查找
      const idx = this.data.posts.findIndex(p => p.id === post.id);
      if (idx > -1) {
        this.setData({
          [`posts[${idx}].isCollected`]: post.isCollected
        });
      }
    }

    // 同步更新 allPosts (用于搜索过滤后的数据一致性)
    const allPosts = this.data.allPosts;
    const allIdx = allPosts.findIndex(p => p.id === post.id);
    if (allIdx > -1) {
      allPosts[allIdx].isCollected = post.isCollected;
      // 注意：这里不需要 setData allPosts，除非需要持久化 allPosts 的改变到视图
      // 但为了下次过滤时状态正确，内存中的 allPosts 必须更新
      this.data.allPosts = allPosts; 
    }
  },

  /**
   * 删除帖子
   */
  handleDeletePost(post, index) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这条帖子吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中...' });
          
          app.api.deleteForumPost(post.id, app.globalData.userInfo.user_id)
            .then(() => {
              wx.hideLoading();
              wx.showToast({ title: '删除成功', icon: 'success' });
              
              // 从 posts 中移除
              const newPosts = [...this.data.posts];
              newPosts.splice(index, 1);
              
              // 从 allPosts 中移除
              const allPosts = this.data.allPosts.filter(p => p.id !== post.id);
              
              // 从 filteredPosts 中移除
              const filteredPosts = this.data.filteredPosts.filter(p => p.id !== post.id);
              
              this.setData({
                posts: newPosts,
                allPosts: allPosts,
                filteredPosts: filteredPosts
              });
            })
            .catch(err => {
              wx.hideLoading();
              console.error('删除失败', err);
              wx.showToast({ title: '删除失败，请重试', icon: 'none' });
            });
        }
      }
    });
  },

  /**
   * 隐藏评论输入框
   */
  hideCommentInput() {
    this.setData({
      showCommentInput: false,
      commentFocus: false,
      commentContent: ''
    });
  },

  /**
   * 监听评论输入
   */
  onCommentInput(e) {
    this.setData({
      commentContent: e.detail.value
    });
  },

  /**
   * 提交评论
   */
  submitComment() {
    const content = this.data.commentContent.trim();
    if (!content) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }

    const index = this.data.currentPostIndex;
    const posts = this.data.posts;
    const post = posts[index];
    
    // 获取用户信息
    const userInfo = app.globalData.userInfo || {};
    if (!userInfo.user_id) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: '提交中...' });

    // 调用后端接口
    app.api.publishForumComment({
      post_id: post.id,
      user_id: userInfo.user_id,
      content: content
    }).then(res => {
      wx.hideLoading();
      
      // 更新本地视图
      const nickname = userInfo.nickname || userInfo.nickName || '匿名用户';
      const avatar = userInfo.avatar_url || userInfo.avatarUrl || userInfo.avatar || '/image/user-graduate-solid-full.svg';
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeStr = `${hours}:${minutes}`;

      const newComment = {
        id: res.comment_id || Date.now(), // 优先使用后端返回的ID
        nickname: nickname,
        avatar: avatar,
        content: content,
        time: timeStr
      };

      if (!post.comments) {
        post.comments = [];
      }
      post.comments.push(newComment);

      // 更新 allPosts 中的对应帖子
      const allPosts = this.data.allPosts;
      const allPostsIndex = allPosts.findIndex(p => p.id === post.id);
      if (allPostsIndex > -1) {
        this.setData({
          [`allPosts[${allPostsIndex}]`]: post
        });
      }

      this.setData({
        [`posts[${index}]`]: post,
        showCommentInput: false,
        commentContent: ''
      });

      wx.showToast({
        title: '评论成功',
        icon: 'success'
      });
    }).catch(err => {
      wx.hideLoading();
      console.error('评论失败', err);
      const msg = typeof err === 'string' ? err : (err.msg || '评论失败');
      if (typeof msg === 'string' && msg.includes('禁言')) {
          wx.showModal({
              title: '评论失败',
              content: msg,
              showCancel: false
          });
      } else {
          wx.showToast({
            title: msg,
            icon: 'none'
          });
      }
    });
  },

  /**
   * 点赞/取消点赞
   */
  toggleLike(e) {
    const index = e.currentTarget.dataset.index;
    const posts = this.data.posts;
    const post = posts[index];
    const userInfo = app.globalData.userInfo;
    
    if (!userInfo || !userInfo.user_id) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    // 乐观更新：先更新UI，再请求后端
    const nickname = userInfo.nickname || userInfo.nickName || '匿名用户';
    const originalIsLiked = post.isLiked;
    // 确保 post.likes 是一个数组，如果不是，则初始化为空数组
    const originalLikes = Array.isArray(post.likes) ? [...post.likes] : [];
    const originalLikeCount = post.like_count || 0;

    if (post.isLiked) {
      // 取消点赞
      post.isLiked = false;
      post.likes = originalLikes.filter(user => user.nickname !== nickname);
      post.like_count = originalLikeCount > 0 ? originalLikeCount - 1 : 0;
    } else {
      // 点赞
      post.isLiked = true;
      // 确保 post.likes 是一个数组
      post.likes = Array.isArray(post.likes) ? post.likes : [];
      post.likes.unshift({ nickname: nickname });
      post.like_count = originalLikeCount + 1;
    }

    // 更新 allPosts 中的对应帖子
    const allPosts = this.data.allPosts;
    const allPostsIndex = allPosts.findIndex(p => p.id === post.id);
    if (allPostsIndex > -1) {
      this.setData({
        [`allPosts[${allPostsIndex}]`]: post
      });
    }

    this.setData({
      [`posts[${index}]`]: post
    });

    // 调用后端接口
    app.api.toggleForumPostLike({
      post_id: post.id,
      user_id: userInfo.user_id
    }).then(res => {
      // 请求成功，不需要额外操作，因为已经乐观更新了
      console.log('点赞操作成功', res);
    }).catch(err => {
      console.error('点赞操作失败', err);
      // 如果失败，回滚状态
      post.isLiked = originalIsLiked;
      post.likes = originalLikes;
      post.like_count = originalLikeCount;

      // 回滚 allPosts
      const allPosts = this.data.allPosts;
      const allPostsIndex = allPosts.findIndex(p => p.id === post.id);
      if (allPostsIndex > -1) {
        this.setData({
          [`allPosts[${allPostsIndex}]`]: post
        });
      }

      this.setData({
        [`posts[${index}]`]: post
      });
      wx.showToast({
        title: '操作失败',
        icon: 'none'
      });
    });
  },

  /**
   * 监听滚动
   */
  onScroll(e) {
    const currentScrollTop = e.detail.scrollTop;
    // 降低阈值到 100，让按钮更容易出现
    if (currentScrollTop > 100 && !this.data.showBackToTop) {
      this.setData({ showBackToTop: true });
    } else if (currentScrollTop <= 100 && this.data.showBackToTop) {
      this.setData({ showBackToTop: false });
    }
  },

  /**
   * 返回顶部
   */
  scrollToTop() {
    this.setData({
      scrollTop: this.data.scrollTop === 0 ? 0.1 : 0
    });
  },

  /**
   * 切换悬浮按钮状态
   */
  toggleFab() {
    this.setData({
      isFabExpanded: !this.data.isFabExpanded
    });
  },

  /**
   * 跳转发布页
   */
  goToPublish() {
    wx.navigateTo({
      url: '/subpkg/publish-post/publish-post'
    });
  },

  /**
   * 跳转到好友申请页
   */
  goToFriendPage() {
    wx.navigateTo({
      url: '/subpkg/friend/friend?from=comment'
    });
  },

  /**
   * 跳转到个人主页
   */
  goToPostPrivate() {
    const userInfo = app.globalData.userInfo;
    if (!userInfo || !userInfo.user_id) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    
    wx.navigateTo({
      url: `/subpkg/postPrivate/postPrivate?userId=${userInfo.user_id}`
    });
  },

  /**
   * 更新显示的帖子列表（根据标签和搜索词）
   */
  updateDisplayPosts(reset = true) {
    let posts = this.data.allPosts;
    
    if (this.data.searchQuery) {
      const query = this.data.searchQuery.toLowerCase();
      posts = posts.filter(post => {
        const content = (post.content || '').toLowerCase();
        const name = (post.name || '').toLowerCase();
        return content.includes(query) || name.includes(query);
      });
    } else if (this.data.currentTab === 1) {
      // 热点 - 浏览量+点赞数 前三
      posts = [...posts]
        .map(post => {
          const views = parseInt(post.views) || 0;
          const likes = parseInt(post.like_count) || 0;
          return {
            ...post,
            hotScore: views + likes
          };
        })
        .sort((a, b) => b.hotScore - a.hotScore)
        .slice(0, 3);
    } else if (this.data.currentTab === 2) {
      // 好友 - 只显示好友发表的帖子
      const friendIds = this.data.friendIds || [];
      const userInfo = app.globalData.userInfo || {};
      
      if (!userInfo.user_id) {
        // 未登录提示
        wx.showToast({
          title: '请先登录查看好友动态',
          icon: 'none'
        });
        posts = [];
      } else {
        posts = posts.filter(post => {
          // 确保 ID 类型一致进行比较
          return friendIds.some(fid => String(fid) === String(post.user_id));
        });
      }
    }
    
    // 分页处理
    const isHotTab = this.data.currentTab === 1;
    let currentPage = reset ? 1 : this.data.currentPage;
    const pageSize = this.data.pageSize || 10;
    
    let displayPosts = [];
    let hasMore = false;

    if (isHotTab) {
      displayPosts = posts;
      hasMore = false; // 热点只有3条，不分页
    } else {
      const endIndex = currentPage * pageSize;
      displayPosts = posts.slice(0, endIndex);
      hasMore = endIndex < posts.length;
    }

    this.setData({ 
      filteredPosts: posts,
      posts: displayPosts,
      currentPage,
      hasMore
    });
  },

  /**
   * 滚动到底部加载更多
   */
  loadMorePosts() {
    if (!this.data.hasMore || this.data.isLoading) return;
    
    this.setData({ isLoading: true });
    
    const nextPage = this.data.currentPage + 1;
    const pageSize = this.data.pageSize || 10;
    const startIndex = this.data.currentPage * pageSize;
    const endIndex = nextPage * pageSize;
    
    const newPosts = this.data.filteredPosts.slice(startIndex, endIndex);
    const hasMore = endIndex < this.data.filteredPosts.length;
    
    if (newPosts.length > 0) {
      // 使用局部渲染追加数据，避免全量 setData
      const updateData = {};
      newPosts.forEach((post, index) => {
        updateData[`posts[${startIndex + index}]`] = post;
      });
      updateData.currentPage = nextPage;
      updateData.hasMore = hasMore;
      updateData.isLoading = false;
      
      this.setData(updateData);
    } else {
      this.setData({
        hasMore: false,
        isLoading: false
      });
    }
  },

  /**
   * 切换标签
   */
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    
    // 如果点击的是“签到”，则跳转到签到页面
    if (index === 3) {
      wx.navigateTo({
        url: '/subpkg/checkin/checkin',
      });
      return;
    }

    // 如果点击的是“礼品兑换”，则跳转到礼品兑换页面
    if (index === 4) {
      wx.navigateTo({
        url: '/subpkg/gift/gift',
      });
      return;
    }

    this.setData({
      currentTab: index
    }, () => {
      this.updateDisplayPosts();
    });
  },

  /**
   * 展开/收起全文
   */
  toggleContent(e) {
    const index = e.currentTarget.dataset.index;
    if (typeof index !== 'undefined') {
      this.setData({
        [`posts[${index}].isExpanded`]: !this.data.posts[index].isExpanded
      });
    }
  },

  /**
   * 点击图片预览
   */
  previewImage(e) {
    const src = e.currentTarget.dataset.src;
    if (src) {
      wx.previewImage({
        urls: [src],
      });
    }
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      fail: () => {
        wx.switchTab({
          url: '/pages/lostAndFound/lostAndFound',
        })
      }
    });
  },

  onImageError(e) {
    const postIndex = e.currentTarget.dataset.postIndex;
    const imgIndex = e.currentTarget.dataset.imgIndex;
    
    if (typeof postIndex !== 'undefined' && typeof imgIndex !== 'undefined') {
        const post = this.data.posts[postIndex];
        if (post && post.images && post.images[imgIndex]) {
            this.setData({
                [`posts[${postIndex}].images[${imgIndex}]`]: '/images/default_picture.png'
            });
        }
    }
  },

  /**
   * 生成分享卡片
   */
  async generateShareCard(e) {
    const item = e.currentTarget.dataset.item;
    if (!item) return;

    wx.showLoading({ title: '生成海报中...', mask: true });

    try {
      const query = wx.createSelectorQuery().in(this);
      const canvasObj = await new Promise((resolve, reject) => {
        query.select('#shareCanvas').fields({ node: true, size: true }).exec((res) => {
          if (res[0] && res[0].node) {
            resolve(res[0].node);
          } else {
            reject(new Error('Canvas node not found'));
          }
        });
      });

      const canvas = canvasObj;
      const ctx = canvas.getContext('2d');
      const dpr = wx.getSystemInfoSync().pixelRatio;
      const width = 600;
      const maxHeight = 1365;
      const padding = 40;
      let currentY = padding;

      canvas.width = width * dpr;
      canvas.height = maxHeight * dpr; // 预设高度，避免安卓崩溃
      ctx.scale(dpr, dpr);

      // 1. 绘制背景
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, maxHeight); // 先填充一个足够大的背景

      // 2. 准备图片资源
      const avatarSrc = item.avatar || '/images/avatar.png';
      const postImageSrc = item.image || '';

      const loadImg = (src) => new Promise((resolve) => {
        if (!src) return resolve(null);
        const img = canvas.createImage();
        img.onload = () => resolve(img);
        img.onerror = () => {
          wx.getImageInfo({
            src: src,
            success: (res) => {
              const localImg = canvas.createImage();
              localImg.onload = () => resolve(localImg);
              localImg.onerror = () => resolve(null);
              localImg.src = res.path;
            },
            fail: () => resolve(null)
          });
        };
        img.src = src;
      });

      const [avatarInfo, postImageInfo] = await Promise.all([
        loadImg(avatarSrc),
        loadImg(postImageSrc)
      ]);

      // 3. 绘制用户信息
      // 头像
      const avatarSize = 80;
      const avatarX = padding;
      const avatarY = currentY;

      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, 2 * Math.PI);
      ctx.clip();
      if (avatarInfo) {
        ctx.drawImage(avatarInfo, avatarX, avatarY, avatarSize, avatarSize);
      } else {
        // 默认灰色圆形
        ctx.fillStyle = '#eeeeee';
        ctx.fill();
      }
      ctx.restore();

      // 昵称
      ctx.fillStyle = '#333333';
      ctx.font = '32px sans-serif';
      ctx.fillText(item.name || '匿名用户', avatarX + avatarSize + 20, avatarY + 35);

      // 时间
      ctx.fillStyle = '#999999';
      ctx.font = '24px sans-serif';
      ctx.fillText(item.time || '', avatarX + avatarSize + 20, avatarY + 75);

      currentY += avatarSize + 30;

      // 4. 绘制文本内容
      let content = item.content || '';
      // 去除HTML标签
      content = content.replace(/<[^>]+>/g, "");
      // 处理常见实体
      content = content.replace(/&nbsp;/g, " ")
                       .replace(/&lt;/g, "<")
                       .replace(/&gt;/g, ">")
                       .replace(/&amp;/g, "&")
                       .replace(/&quot;/g, '"')
                       .replace(/&apos;/g, "'");

      ctx.fillStyle = '#333333';
      ctx.font = '28px sans-serif';
      const contentWidth = width - padding * 2;
      const lineHeight = 40;

      let line = '';
      for (let i = 0; i < content.length; i++) {
        const testLine = line + content[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > contentWidth && i > 0) {
          ctx.fillText(line, padding, currentY);
          line = content[i];
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, padding, currentY);
      currentY += lineHeight + 20;

      // 5. 绘制帖子图片（如果有）
      if (postImageInfo) {
        const imgW = postImageInfo.width;
        const imgH = postImageInfo.height;
        // 计算缩放后的高度，保持比例，宽度填满 contentWidth
        const drawW = contentWidth;
        const drawH = (imgH / imgW) * drawW;

        ctx.drawImage(postImageInfo, padding, currentY, drawW, drawH);
        currentY += drawH + 30;
      }

      // 6. 底部信息
      ctx.beginPath();
      ctx.strokeStyle = '#eeeeee';
      ctx.moveTo(padding, currentY);
      ctx.lineTo(width - padding, currentY);
      ctx.stroke();
      
      currentY += 30;
      ctx.fillStyle = '#999999';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('加入我们，一起分享有趣瞬间', width / 2, currentY);
      currentY += 40;

      // 7. 生成图片并保存
      setTimeout(() => {
        const finalHeight = Math.min(Math.ceil(Math.max(currentY, 100)), maxHeight);
        
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: width,
          height: finalHeight,
          destWidth: width,
          destHeight: finalHeight,
          canvas: canvas,
          success: (res) => {
            this.saveToAlbum(res.tempFilePath);
          },
          fail: (err) => {
            console.error('canvasToTempFilePath fail:', err);
            wx.hideLoading();
            wx.showToast({ title: '生成图片失败，请重试', icon: 'none' });
          }
        }, this);
      }, 500);

    } catch (err) {
      console.error(err);
      wx.hideLoading();
      wx.showToast({ title: '生成失败', icon: 'none' });
    }
  },

  saveToAlbum(filePath) {
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success: () => {
        wx.hideLoading();
        wx.showToast({ title: '已保存到相册', icon: 'success' });
      },
      fail: (err) => {
        wx.hideLoading();
        if (err.errMsg.includes('auth deny') || err.errMsg.includes('auth denied')) {
          wx.showModal({
            title: '提示',
            content: '需要您授权保存图片到相册',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success: (settingRes) => {
                    if (settingRes.authSetting['scope.writePhotosAlbum']) {
                      wx.showToast({ title: '授权成功，请重试', icon: 'none' });
                    }
                  }
                });
              }
            }
          });
        } else {
          wx.showToast({ title: '保存失败', icon: 'none' });
        }
      }
    });
  }
})
