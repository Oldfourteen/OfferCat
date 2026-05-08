package com.offercat.student.dto;

/**
 * 点赞请求DTO
 * 功能：提供点赞请求相关的数据传输对象
 */
public class LikeRequestDTO {
    // 点赞用户ID
    private Long userId; 
    // 点赞帖子ID

    public Long getUserId() {
        return userId;
    }
    // 设置用户ID
    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
