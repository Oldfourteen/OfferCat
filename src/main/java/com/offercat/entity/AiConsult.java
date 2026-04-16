package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * AI顾问对话表实体类
 * 对应数据库ai_consult表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiConsult {
    /**
     * 主键ID
     */
    private Long id;
    
    /**
     * 用户ID
     */
    private Long userId;
    
    /**
     * 用户内容
     */
    private String userContent;
    
    /**
     * AI内容
     */
    private String aiContent;
    
    /**
     * AI头像
     */
    private String aiAvatar;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}