package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 岗位收藏表实体类
 * 对应数据库job_collect表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobCollect {
    /**
     * 收藏ID
     */
    private Long collectId;
    
    /**
     * 学生ID
     */
    private Long studentId;
    
    /**
     * 招聘ID
     */
    private Long recruitId;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}