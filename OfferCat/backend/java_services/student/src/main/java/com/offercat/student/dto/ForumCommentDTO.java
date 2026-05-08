package com.offercat.student.dto;

import lombok.Data;
/**
 * 论坛评论DTO
 * 功能：提供论坛评论相关的数据传输对象
 */
@Data
public class ForumCommentDTO {
    // 论坛帖子ID
    private Long postId; 
    // 评论用户ID
    private Long userId; 
    // 评论内容
    private String content; 
    
}
