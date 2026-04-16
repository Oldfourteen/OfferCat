package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 系统公告表实体类
 * 对应数据库notice表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notice {
    /**
     * 公告ID
     */
    private Long noticeId;
    
    /**
     * 标题
     */
    private String title;
    
    /**
     * 内容
     */
    private String content;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}