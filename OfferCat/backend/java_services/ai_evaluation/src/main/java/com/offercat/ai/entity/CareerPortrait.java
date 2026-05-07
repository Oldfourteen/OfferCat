package com.offercat.ai.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * AI职业画像表实体类
 * 对应数据库career_portrait表
 */
@Data
public class CareerPortrait {
    /**
     * 画像ID
     */
    private Long portraitId;
    
    /**
     * 关联用户ID
     */
    private Long userId;
    
    /**
     * AI生成的画像图片URL
     */
    private String imageUrl;
    
    /**
     * 生成时间
     */
    private LocalDateTime createTime;
}