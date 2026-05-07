package com.offercat.student.dto;

import lombok.Data;

@Data
public class StudentProfileDTO {
    private Long studentId;
    
    // User info fields
    private String avatar;
    private String nickname;
    private String realName;
    private String phone;
    private String email;
    private Integer gender; // 0未知 1男 2女
    
    // Student info fields
    private String major;
    private String grade;
    private String jobStatus; // 求职状态
    private String bio; // 个人简介
    private String jobDirection; // 求职方向
    private String intentCity; // 意向城市
    private String expectedSalary; // 期望薪资
}
