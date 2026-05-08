package com.offercat.student.vo;

import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
/**
 * 论坛评论VO
 * 功能：表示论坛评论的VO信息
 */
@Data
public class ForumCommentVO {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long commentId;
    /** 评论所属帖子ID */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long postId;
    /** 评论所属用户ID */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long userId;
    private String authorName;
    private String authorAvatar;
    private String content;
    /** 评论创建时间 */
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createTime;
}
