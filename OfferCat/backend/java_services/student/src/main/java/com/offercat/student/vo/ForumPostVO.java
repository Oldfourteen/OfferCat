package com.offercat.student.vo;

import lombok.Data;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Data
public class ForumPostVO {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long postId;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long userId;
    private String authorName;
    private String authorAvatar;
    private String title;
    private String content;
    private String images;
    private Integer likeCount;
    private Integer collectCount;
    private Integer commentCount;
    private Integer viewCount;
    private Integer status;

    /** 列表/详情会话状态（未登录或未传 viewer 时为 false） */
    private Boolean isLiked;
    private Boolean isCollected;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updateTime;

    /** 兼容前端字段名 */
    public Integer getViews() {
        return viewCount == null ? 0 : viewCount;
    }

    /** 前端收藏数展示 */
    public Integer getFavoriteCount() {
        return collectCount == null ? 0 : collectCount;
    }
}
