package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ForumPost {
    private Long postId;
    private Long userId;
    private String title;
    private String content;
    private String images;
    private Integer likeCount;
    private Integer collectCount;
    private Integer commentCount;
    private Integer status;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
