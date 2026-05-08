package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 论坛帖子实体类
 * 功能：表示论坛帖子信息
 */
@Data
public class ForumPost {
    // 帖子ID
    private Long postId;
    // 用户ID
    private Long userId;
    // 帖子标题
    private String title;
    // 帖子内容
    private String content;
    // 帖子图片
    private String images;
    // 点赞数
    private Integer likeCount;
    // 收藏数
    private Integer collectCount;
    // 评论数
    private Integer commentCount;
    // 状态
    private Integer status;
    // 创建时间
    private LocalDateTime createTime;
    // 更新时间
    private LocalDateTime updateTime;
}
