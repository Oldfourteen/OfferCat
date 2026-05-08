package com.offercat.user.entity;

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
    // 学生ID
    private Long studentId;
    
    // 关联用户ID
    private Long userId;
    
    // 学校
    private String school;
    
    // 学院
    private String college;
    
    // 年级
    private String grade;
    
    // 班级
    private String className;
    
    // 专业
    private String major;
    
    // 实习企业ID(关联company表)
    private Long companyId;
    
    // 年龄
    private Integer age;
    
    // 学历(专科/本科/硕士)
    private String education;
    
    // 个人简介(限制25字)
    private String bio;
    
    // 求职状态(如:求职中,观望中)
    private String jobStatus;
    
    // 求职方向(限制8字)
    private String jobDirection;
    
    // 意向城市(限制4字)
    private String intentCity;
    
    // 期望薪资(限制10字)
    private String expectedSalary;
    
    // 关联雷达评估表ID
    private Long radarId;
    
    // 创建时间
    private LocalDateTime createTime;
}