package com.offercat.student.vo;

import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

/**
 * 论坛帖子VO
 * 功能：表示论坛帖子的VO信息
 */
@Data
public class ForumPostVO {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long postId;
    /** 帖子所属用户ID */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long userId;
    private String authorName;   // user.nickname
    private String authorAvatar; // user.avatar
    private String title;
    private String content;
    private String images;
    private Integer likeCount;
    private Integer collectCount;
    private Integer commentCount;
    private Integer viewCount;
    private Integer status;
    /** 帖子创建时间 */
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createTime;
    /** 帖子更新时间 */
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updateTime;
}
