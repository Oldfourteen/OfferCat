package com.offercat.student.dao;

import com.offercat.student.vo.ForumPostVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

import com.offercat.student.dto.ForumCommentDTO;
import com.offercat.student.vo.ForumCommentVO;

@Mapper
public interface ForumPostMapper {

    /**
     * 根据关键字搜索帖子并关联用户信息
     * @param keyword 搜索关键字 (模糊匹配标题或内容)
     * @param orderBy 排序的字段 (e.g. "create_time DESC")
     * @param offset  分页偏移量
     * @param limit   每页数量
     * @return 帖子VO列表
     */
    List<ForumPostVO> searchPosts(
            @Param("keyword") String keyword,
            @Param("orderBy") String orderBy,
            @Param("offset") Integer offset,
            @Param("limit") Integer limit
    );

    /**
     * 统计满足搜索条件的帖子总数
     * @param keyword 搜索关键字
     * @return 总数
     */
    long countSearchPosts(@Param("keyword") String keyword);

    /**
     * 获取帖子详情
     * @param postId 帖子ID
     * @return 帖子详情
     */
    ForumPostVO getPostDetail(@Param("postId") Long postId);

    /**
     * 增加浏览量
     * @param postId 帖子ID
     */
    void incrementViewCount(@Param("postId") Long postId);

    /**
     * 查找用户是否点赞
     * @param postId 帖子ID
     * @param userId 用户ID
     * @return 匹配的记录数
     */
    Integer findLike(@Param("postId") Long postId, @Param("userId") Integer userId);

    /**
     * 插入点赞记录
     * @param postId 帖子ID
     * @param userId 用户ID
     */
    void insertLike(@Param("postId") Long postId, @Param("userId") Integer userId);

    /**
     * 删除点赞记录
     * @param postId 帖子ID
     * @param userId 用户ID
     */
    void deleteLike(@Param("postId") Long postId, @Param("userId") Integer userId);

    /**
     * 增加评论数
     * @param postId 帖子ID
     */
    void incrementCommentCount(@Param("postId") Long postId);

    /**
     * 根据帖子ID获取评论
     */
    List<ForumCommentVO> getCommentsByPostId(@Param("postId") Long postId);

    /**
     * 插入评论
     */
    void insertComment(ForumCommentDTO dto);

    /**
     * 插入帖子
     */
    void insertPost(@Param("userId") Long userId, 
                    @Param("title") String title, 
                    @Param("content") String content, 
                    @Param("images") String images);

    /**
     * 删除帖子 (软删除)
     * @param postId 帖子ID
     * @param userId 用户ID (用于校验是否为本人的帖子)
     * @return 影响的行数
     */
    int deletePost(@Param("postId") Long postId, @Param("userId") Long userId);
}
