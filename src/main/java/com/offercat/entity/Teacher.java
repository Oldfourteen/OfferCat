package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 教师实体类
 * 对应数据库teacher表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {
    /**
     * 教师ID
     */
    private Long teacherId;
    
    /**
     * 关联用户ID
     */
    private Long userId;
    
    /**
     * 职位(讲师/副教授等)
     */
    private String position;
    
    /**
     * 工号
     */
    private String workNo;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}