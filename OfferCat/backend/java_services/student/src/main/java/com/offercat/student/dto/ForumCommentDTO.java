package com.offercat.student.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ForumCommentDTO {
    /** MyBatis insert 回填 */
    private Long commentId;
    private Long postId;
    private Long userId;
    /** 0 或直接评论帖子；楼中楼房时设为根评论ID */
    private Long parentId = 0L;
    /** 直接被回复的评论ID（楼中楼） */
    private Long replyToCommentId;
    /** 被回复的用户ID */
    private Long replyToUserId;
    private String content;
    /** @ 提醒的用户ID 列表（不含被回复的用户，可单独传入） */
    private List<Long> mentionUserIds = new ArrayList<>();
}
