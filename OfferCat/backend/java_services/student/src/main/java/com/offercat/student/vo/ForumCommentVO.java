package com.offercat.student.vo;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Data
public class ForumCommentVO {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long commentId;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long postId;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long userId;
    private String authorName;
    private String authorAvatar;
    private String content;

    @JsonSerialize(using = ToStringSerializer.class)
    private Long parentId;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long replyToCommentId;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long replyToUserId;
    /** 与被回复昵称展示对齐 */
    private String replyToUserName;

    private Integer likeCount;
    private Boolean isLiked;

    private List<ForumCommentVO> replies = new ArrayList<>();

    /** 前端兼容别名 */
    @JsonSerialize(using = ToStringSerializer.class)
    public Long getReplyId() {
        return commentId;
    }

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createTime;
}
