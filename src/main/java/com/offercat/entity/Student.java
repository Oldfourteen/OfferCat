package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 学生实体类
 * 对应数据库student表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    /**
     * 学生ID
     */
    private Long studentId;
    
    /**
     * 关联用户ID
     */
    private Long userId;
    
    /**
     * 年级(如：2022级)
     */
    private String grade;
    
    /**
     * 班级
     */
    private String className;
    
    /**
     * 专业
     */
    private String major;
    
    /**
     * 实习企业ID(关联company表)
     */
    private Long companyId;
    
    /**
     * 年龄
     */
    private Integer age;
    
    /**
     * 学历(专科/本科/硕士)
     */
    private String education;
    
    /**
     * 关联雷达评估表ID
     */
    private Long radarId;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}