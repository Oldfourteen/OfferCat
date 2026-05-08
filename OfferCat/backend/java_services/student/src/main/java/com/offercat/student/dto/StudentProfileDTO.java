package com.offercat.student.dto;

import lombok.Data;

/**
 * 学生个人资料DTO
 * 功能：提供学生个人资料相关的数据传输对象
 */
@Data
public class StudentProfileDTO {
    private Long studentId;
    
    // 学生头像
    private String avatar;
    private String nickname;
    private String realName;
    private String phone;
    private String email;
    private Integer gender; // 0未知 1男 2女
    
    // 学生专业
    private String major;
    // 学生年级 
    private String grade;
    // 学生求职状态
    private String jobStatus; 
    // 学生个人简介
    private String bio; 
    // 学生求职方向
    private String jobDirection; 
    // 学生意向城市
    private String intentCity; 
    // 学生期望薪资
    private String expectedSalary; 
}
