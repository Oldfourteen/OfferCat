package com.offercat.student.service.impl;

import com.offercat.student.common.PageResult;
import com.offercat.student.dao.ForumPostMapper;
import com.offercat.student.dto.ForumPostSearchDTO;
import com.offercat.student.service.ForumPostService;
import com.offercat.student.vo.ForumPostVO;
import com.offercat.student.dto.ForumPostCreateDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.offercat.student.dto.ForumCommentDTO;
import com.offercat.student.vo.ForumCommentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ForumPostServiceImpl implements ForumPostService {

    @Autowired
    private ForumPostMapper forumPostMapper;

    @Override
    public PageResult<ForumPostVO> searchPosts(ForumPostSearchDTO searchDTO) {
        // 构建 orderBy
        String orderBy = "p.create_time DESC";
        if (searchDTO.getSortBy() != null) {
            String field = searchDTO.getSortBy();
            String direction = "asc".equalsIgnoreCase(searchDTO.getSortDirection()) ? "ASC" : "DESC";
            // 防注入：只允许特定字段排序
            if ("like_count".equals(field)) {
                orderBy = "p.like_count " + direction;
            } else if ("comment_count".equals(field)) {
                orderBy = "p.comment_count " + direction;
            } else {
                orderBy = "p.create_time " + direction;
            }
        }

        // 处理分页
        int pageNum = searchDTO.getPageNum() != null && searchDTO.getPageNum() > 0 ? searchDTO.getPageNum() : 1;
        int pageSize = searchDTO.getPageSize() != null && searchDTO.getPageSize() > 0 ? searchDTO.getPageSize() : 10;
        int offset = (pageNum - 1) * pageSize;

        // 查询总数
        long total = forumPostMapper.countSearchPosts(searchDTO.getKeyword());

        // 查询数据
        List<ForumPostVO> records = forumPostMapper.searchPosts(
                searchDTO.getKeyword(),
                orderBy,
                offset,
                pageSize
        );

        return new PageResult<>(total, records, pageNum, pageSize);
    }

    @Override
    public ForumPostVO getPostDetail(Long postId) {
        return forumPostMapper.getPostDetail(postId);
    }

    @Override
    @Transactional
    public void likePost(Long postId, Integer userId) {
        if (userId == null) {
            throw new IllegalArgumentException("用户ID不能为空");
        }
        Integer count = forumPostMapper.findLike(postId, userId);
        if (count == null || count == 0) {
            forumPostMapper.insertLike(postId, userId);
        }
    }

    @Override
    @Transactional
    public void unlikePost(Long postId, Integer userId) {
        if (userId == null) {
            throw new IllegalArgumentException("用户ID不能为空");
        }
        Integer count = forumPostMapper.findLike(postId, userId);
        if (count != null && count > 0) {
            forumPostMapper.deleteLike(postId, userId);
        }
    }

    @Override
    public List<ForumCommentVO> getComments(Long postId) {
        return forumPostMapper.getCommentsByPostId(postId);
    }

    @Override
    public void addComment(ForumCommentDTO dto) {
        // userId 默认给个1如果是空的话，方便测试
        if (dto.getUserId() == null) {
            dto.setUserId(1L);
        }
        forumPostMapper.insertComment(dto);
        // 增加帖子评论数
        forumPostMapper.incrementCommentCount(dto.getPostId());
    }

    @Override
    public void createPost(ForumPostCreateDTO dto) {
        if (dto.getUserId() == null) {
            dto.setUserId(1L);
        }
        String imagesStr = null;
        if (dto.getImages() != null && !dto.getImages().isEmpty()) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                imagesStr = mapper.writeValueAsString(dto.getImages());
            } catch (Exception e) {
                imagesStr = String.join(",", dto.getImages());
            }
        }
        forumPostMapper.insertPost(dto.getUserId(), dto.getTitle(), dto.getContent(), imagesStr);
    }

    @Override
    public void deletePost(Long postId, Long userId) {
        int rows = forumPostMapper.deletePost(postId, userId);
        if (rows == 0) {
            throw new RuntimeException("删除失败，帖子不存在或无权限删除");
        }
    }
}
