package com.offercat.student.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.offercat.student.common.PageResult;
import com.offercat.student.dao.ForumFriendMapper;
import com.offercat.student.dao.ForumPostMapper;
import com.offercat.student.dto.ForumCommentDTO;
import com.offercat.student.dto.ForumPostCreateDTO;
import com.offercat.student.dto.ForumPostSearchDTO;
import com.offercat.student.service.ForumNotificationService;
import com.offercat.student.service.ForumPostService;
import com.offercat.student.vo.ForumCommentVO;
import com.offercat.student.vo.ForumPostVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

@Service
public class ForumPostServiceImpl implements ForumPostService {

    private static final int MSG_LIKE_POST = 1;
    private static final int MSG_COMMENT_POST = 2;
    private static final int MSG_REPLY_COMMENT = 3;
    private static final int MSG_MENTION = 4;
    private static final int MSG_LIKE_COMMENT = 5;
    private static final int MSG_COLLECT_POST = 6;

    @Autowired
    private ForumPostMapper forumPostMapper;

    @Autowired
    private ForumFriendMapper forumFriendMapper;

    @Autowired
    private ForumNotificationService forumNotificationService;

    @Override
    public PageResult<ForumPostVO> searchPosts(ForumPostSearchDTO searchDTO) {
        if (searchDTO == null) {
            searchDTO = new ForumPostSearchDTO();
        }
        String orderBy = "p.create_time DESC";
        if (searchDTO.getSortBy() != null) {
            String field = searchDTO.getSortBy();
            String direction = "asc".equalsIgnoreCase(searchDTO.getSortDirection()) ? "ASC" : "DESC";
            if ("like_count".equals(field)) {
                orderBy = "p.like_count " + direction;
            } else if ("comment_count".equals(field)) {
                orderBy = "p.comment_count " + direction;
            } else {
                orderBy = "p.create_time " + direction;
            }
        }

        int pageNum = searchDTO.getPageNum() != null && searchDTO.getPageNum() > 0 ? searchDTO.getPageNum() : 1;
        int pageSize = searchDTO.getPageSize() != null && searchDTO.getPageSize() > 0 ? searchDTO.getPageSize() : 10;
        int offset = (pageNum - 1) * pageSize;

        List<Long> friendIds = null;
        if ("friends".equalsIgnoreCase(String.valueOf(searchDTO.getFeedTab()))) {
            Long viewer = searchDTO.getViewerUserId();
            friendIds = viewer == null ? Collections.emptyList() : forumFriendMapper.listAcceptedFriendIds(viewer);
            if (friendIds == null) {
                friendIds = Collections.emptyList();
            }
        }

        long total = forumPostMapper.countSearchPosts(searchDTO.getKeyword(), friendIds);
        List<ForumPostVO> records = forumPostMapper.searchPosts(
                searchDTO.getKeyword(),
                orderBy,
                offset,
                pageSize,
                friendIds,
                searchDTO.getViewerUserId()
        );
        return new PageResult<>(total, records, pageNum, pageSize);
    }

    @Override
    public ForumPostVO getPostDetail(Long postId, Long viewerUserId) {
        return forumPostMapper.getPostDetail(postId, viewerUserId);
    }

    @Override
    @Transactional
    public void recordView(Long postId) {
        if (postId != null) {
            forumPostMapper.incrementViewCount(postId);
        }
    }

    @Override
    @Transactional
    public void likePost(Long postId, Long userId) {
        if (postId == null || userId == null) {
            throw new IllegalArgumentException("用户或帖子不能为空");
        }
        Integer count = forumPostMapper.findLike(postId, userId);
        if (count == null || count == 0) {
            forumPostMapper.insertLike(postId, userId);
            forumPostMapper.incrementLikeCount(postId);
            Long owner = forumPostMapper.selectPostOwnerId(postId);
            forumNotificationService.notifyIfDistinct(owner, userId, MSG_LIKE_POST, postId, postId, null);
        }
    }

    @Override
    @Transactional
    public void unlikePost(Long postId, Long userId) {
        if (postId == null || userId == null) {
            throw new IllegalArgumentException("用户或帖子不能为空");
        }
        Integer count = forumPostMapper.findLike(postId, userId);
        if (count != null && count > 0) {
            forumPostMapper.deleteLike(postId, userId);
            forumPostMapper.decrementLikeCount(postId);
        }
    }

    @Override
    @Transactional
    public void collectPost(Long postId, Long userId) {
        if (postId == null || userId == null) {
            throw new IllegalArgumentException("用户或帖子不能为空");
        }
        Integer cnt = forumPostMapper.findCollect(postId, userId);
        if (cnt == null || cnt == 0) {
            forumPostMapper.insertCollect(postId, userId);
            forumPostMapper.incrementCollectCount(postId);
            Long owner = forumPostMapper.selectPostOwnerId(postId);
            forumNotificationService.notifyIfDistinct(owner, userId, MSG_COLLECT_POST, postId, postId, null);
        }
    }

    @Override
    @Transactional
    public void uncollectPost(Long postId, Long userId) {
        if (postId == null || userId == null) {
            throw new IllegalArgumentException("用户或帖子不能为空");
        }
        Integer cnt = forumPostMapper.findCollect(postId, userId);
        if (cnt != null && cnt > 0) {
            forumPostMapper.deleteCollect(postId, userId);
            forumPostMapper.decrementCollectCount(postId);
        }
    }

    @Override
    public List<ForumCommentVO> getComments(Long postId, Long viewerUserId) {
        List<ForumCommentVO> flat = forumPostMapper.listCommentsFlat(postId, viewerUserId);
        return buildCommentTree(flat);
    }

    private List<ForumCommentVO> buildCommentTree(List<ForumCommentVO> flat) {
        if (flat == null || flat.isEmpty()) {
            return Collections.emptyList();
        }
        Map<Long, ForumCommentVO> map = new HashMap<>();
        for (ForumCommentVO c : flat) {
            if (c.getReplies() == null) {
                c.setReplies(new ArrayList<>());
            }
            if (c.getCommentId() != null) {
                map.put(c.getCommentId(), c);
            }
        }
        List<ForumCommentVO> roots = new ArrayList<>();
        for (ForumCommentVO c : flat) {
            Long pid = c.getParentId() == null ? 0L : c.getParentId();
            if (pid == 0L) {
                roots.add(c);
                continue;
            }
            ForumCommentVO parent = map.get(pid);
            if (parent != null) {
                parent.getReplies().add(c);
            } else {
                roots.add(c);
            }
        }
        return roots;
    }

    @Override
    @Transactional
    public void addComment(ForumCommentDTO dto) {
        if (dto.getUserId() == null) {
            throw new IllegalArgumentException("用户ID不能为空");
        }
        if (dto.getParentId() == null) {
            dto.setParentId(0L);
        }
        if (dto.getMentionUserIds() == null) {
            dto.setMentionUserIds(Collections.emptyList());
        }
        forumPostMapper.insertComment(dto);
        forumPostMapper.incrementCommentCount(dto.getPostId());

        Long commentId = dto.getCommentId();
        Long postId = dto.getPostId();
        Long postOwnerId = forumPostMapper.selectPostOwnerId(postId);
        Long senderId = dto.getUserId();

        boolean isTopLevel = dto.getParentId() == null || dto.getParentId() == 0L;
        if (isTopLevel) {
            forumNotificationService.notifyIfDistinct(
                    postOwnerId,
                    senderId,
                    MSG_COMMENT_POST,
                    commentId,
                    postId,
                    dto.getContent());
        } else {
            Long targetUser = dto.getReplyToUserId() != null ? dto.getReplyToUserId() : postOwnerId;
            forumNotificationService.notifyIfDistinct(
                    targetUser,
                    senderId,
                    MSG_REPLY_COMMENT,
                    commentId,
                    postId,
                    dto.getContent());
        }

        LinkedHashSet<Long> mentions = new LinkedHashSet<>(dto.getMentionUserIds());
        mentions.remove(senderId);
        mentions.remove(postOwnerId);
        if (!isTopLevel && dto.getReplyToUserId() != null) {
            mentions.remove(dto.getReplyToUserId());
        }
        for (Long uid : mentions) {
            if (uid != null && uid.longValue() > 0) {
                forumNotificationService.notifyIfDistinct(
                        uid,
                        senderId,
                        MSG_MENTION,
                        commentId,
                        postId,
                        dto.getContent());
            }
        }
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        if (commentId == null || userId == null) {
            throw new IllegalArgumentException("参数不能为空");
        }
        Long postId = forumPostMapper.selectCommentPostId(commentId);
        if (postId == null) {
            throw new IllegalArgumentException("评论不存在");
        }
        int affected = forumPostMapper.softDeleteComment(commentId, userId);
        if (affected > 0) {
            forumPostMapper.decrementCommentCount(postId);
        } else {
            throw new RuntimeException("删除失败，不是你的评论");
        }
    }

    @Override
    @Transactional
    public void likeComment(Long commentId, Long userId) {
        if (commentId == null || userId == null) {
            throw new IllegalArgumentException("参数不能为空");
        }
        Integer c = forumPostMapper.findCommentLike(commentId, userId);
        if (c == null || c == 0) {
            forumPostMapper.insertCommentLike(commentId, userId);
            forumPostMapper.incrementCommentLikeCount(commentId);

            ForumCommentVO brief = forumPostMapper.selectCommentBrief(commentId);
            if (brief != null && brief.getUserId() != null) {
                forumNotificationService.notifyIfDistinct(
                        brief.getUserId(),
                        userId,
                        MSG_LIKE_COMMENT,
                        commentId,
                        brief.getPostId(),
                        brief.getContent());
            }
        }
    }

    @Override
    @Transactional
    public void unlikeComment(Long commentId, Long userId) {
        if (commentId == null || userId == null) {
            throw new IllegalArgumentException("参数不能为空");
        }
        Integer c = forumPostMapper.findCommentLike(commentId, userId);
        if (c != null && c > 0) {
            forumPostMapper.deleteCommentLike(commentId, userId);
            forumPostMapper.decrementCommentLikeCount(commentId);
        }
    }

    @Override
    @Transactional
    public void createPost(ForumPostCreateDTO dto) {
        if (dto.getUserId() == null) {
            throw new IllegalArgumentException("用户ID不能为空");
        }
        if (dto.getMentionUserIds() == null) {
            dto.setMentionUserIds(Collections.emptyList());
        }
        if (dto.getTitle() == null || dto.getTitle().isBlank()) {
            dto.setTitle("校园动态");
        }

        String json = null;
        if (dto.getImages() != null && !dto.getImages().isEmpty()) {
            try {
                json = new ObjectMapper().writeValueAsString(dto.getImages());
            } catch (Exception e) {
                json = String.join(",", dto.getImages());
            }
        }
        dto.setImagesJson(json);
        forumPostMapper.insertPost(dto);
        Long postId = dto.getPostId();
        if (postId != null && !dto.getMentionUserIds().isEmpty()) {
            LinkedHashSet<Long> mids = new LinkedHashSet<>(dto.getMentionUserIds());
            mids.remove(dto.getUserId());
            for (Long uid : mids) {
                if (uid != null && uid > 0) {
                    forumNotificationService.notifyIfDistinct(
                            uid, dto.getUserId(), MSG_MENTION, postId, postId, dto.getContent());
                }
            }
        }
    }

    @Override
    @Transactional
    public void deletePost(Long postId, Long userId) {
        int rows = forumPostMapper.deletePost(postId, userId);
        if (rows == 0) {
            throw new RuntimeException("删除失败，帖子不存在或无权限删除");
        }
    }
}
