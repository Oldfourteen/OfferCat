package com.offercat.student.dao;

import com.offercat.student.vo.ForumPostVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

import com.offercat.student.dto.ForumCommentDTO;
import com.offercat.student.dto.ForumPostCreateDTO;
import com.offercat.student.vo.ForumCommentVO;

@Mapper
public interface ForumPostMapper {

    List<ForumPostVO> searchPosts(
            @Param("keyword") String keyword,
            @Param("orderBy") String orderBy,
            @Param("offset") Integer offset,
            @Param("limit") Integer limit,
            @Param("friendIds") List<Long> friendIds,
            @Param("viewerUserId") Long viewerUserId);

    long countSearchPosts(@Param("keyword") String keyword, @Param("friendIds") List<Long> friendIds);

    ForumPostVO getPostDetail(@Param("postId") Long postId,
                              @Param("viewerUserId") Long viewerUserId);

    Long selectPostOwnerId(@Param("postId") Long postId);

    void incrementViewCount(@Param("postId") Long postId);

    Integer findLike(@Param("postId") Long postId, @Param("userId") Long userId);

    void insertLike(@Param("postId") Long postId, @Param("userId") Long userId);

    void incrementLikeCount(@Param("postId") Long postId);

    void deleteLike(@Param("postId") Long postId, @Param("userId") Long userId);

    void decrementLikeCount(@Param("postId") Long postId);

    Integer findCollect(@Param("postId") Long postId, @Param("userId") Long userId);

    void insertCollect(@Param("postId") Long postId, @Param("userId") Long userId);

    void incrementCollectCount(@Param("postId") Long postId);

    void deleteCollect(@Param("postId") Long postId, @Param("userId") Long userId);

    void decrementCollectCount(@Param("postId") Long postId);

    void incrementCommentCount(@Param("postId") Long postId);

    void decrementCommentCount(@Param("postId") Long postId);

    List<ForumCommentVO> listCommentsFlat(@Param("postId") Long postId,
                                            @Param("viewerUserId") Long viewerUserId);

    void insertComment(ForumCommentDTO dto);

    void insertPost(ForumPostCreateDTO dto);

    int deletePost(@Param("postId") Long postId, @Param("userId") Long userId);

    int softDeleteComment(@Param("commentId") Long commentId, @Param("userId") Long userId);

    Long selectCommentPostId(@Param("commentId") Long commentId);

    ForumCommentVO selectCommentBrief(@Param("commentId") Long commentId);

    Integer findCommentLike(@Param("commentId") Long commentId, @Param("userId") Long userId);

    void insertCommentLike(@Param("commentId") Long commentId, @Param("userId") Long userId);

    void incrementCommentLikeCount(@Param("commentId") Long commentId);

    void deleteCommentLike(@Param("commentId") Long commentId, @Param("userId") Long userId);

    void decrementCommentLikeCount(@Param("commentId") Long commentId);
}
