package com.offercat.student.service;

import com.offercat.student.common.PageResult;
import com.offercat.student.dto.ForumCommentDTO;
import com.offercat.student.dto.ForumPostCreateDTO;
import com.offercat.student.dto.ForumPostSearchDTO;
import com.offercat.student.vo.ForumCommentVO;
import com.offercat.student.vo.ForumPostVO;

import java.util.List;

public interface ForumPostService {

    PageResult<ForumPostVO> searchPosts(ForumPostSearchDTO searchDTO);

    ForumPostVO getPostDetail(Long postId, Long viewerUserId);

    void recordView(Long postId);

    void likePost(Long postId, Long userId);

    void unlikePost(Long postId, Long userId);

    List<ForumCommentVO> getComments(Long postId, Long viewerUserId);

    void addComment(ForumCommentDTO dto);

    void deleteComment(Long commentId, Long userId);

    void likeComment(Long commentId, Long userId);

    void unlikeComment(Long commentId, Long userId);

    void collectPost(Long postId, Long userId);

    void uncollectPost(Long postId, Long userId);

    void createPost(ForumPostCreateDTO dto);

    void deletePost(Long postId, Long userId);
}
