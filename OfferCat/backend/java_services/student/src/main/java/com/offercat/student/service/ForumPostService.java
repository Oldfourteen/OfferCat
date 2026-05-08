package com.offercat.student.service;

import com.offercat.student.common.PageResult;
import com.offercat.student.dto.ForumPostSearchDTO;
import com.offercat.student.vo.ForumPostVO;

import com.offercat.student.dto.ForumCommentDTO;
import com.offercat.student.vo.ForumCommentVO;
import java.util.List;

import com.offercat.student.dto.ForumPostCreateDTO;
/**
 * 论坛帖子服务接口
 * 功能：提供论坛帖子的增删改查操作
 */
public interface ForumPostService {
    /**
     * 分页搜索论坛帖子
     * @param searchDTO 搜索参数
     * @return 分页结果
     */
    PageResult<ForumPostVO> searchPosts(ForumPostSearchDTO searchDTO);

    /**
     * 获取帖子详情
     * @param postId 帖子ID
     * @return 帖子详情
     */
    ForumPostVO getPostDetail(Long postId);

    /**
     * 点赞帖子
     * @param postId 帖子ID
     * @param userId 用户ID
     */
    void likePost(Long postId, Integer userId);

    /**
     * 取消点赞帖子
     * @param postId 帖子ID
     * @param userId 用户ID
     */
    void unlikePost(Long postId, Integer userId);

    /**
     * 获取评论列表
     */
    List<ForumCommentVO> getComments(Long postId);

    /**
     * 添加评论
     */
    void addComment(ForumCommentDTO dto);

    /**
     * 发布帖子
     */
    void createPost(ForumPostCreateDTO dto);

    /**
     * 删除帖子
     */
    void deletePost(Long postId, Long userId);
}
