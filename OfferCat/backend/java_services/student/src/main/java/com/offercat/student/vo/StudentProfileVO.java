package com.offercat.student.vo;

import lombok.Data;

import java.util.List;

@Data
public class StudentProfileVO {
    private Long studentId;
    private Long userId;

    // 基本用户信息 (User)
    private String avatar;
    private String nickname;
    private String realName;
    private String phone;
    private String email;
    private Integer gender;

    // 学生信息 (Student)
    private String major;
    private String grade;
    private String jobStatus; // 求职状态
    private String bio; // 个人简介
    private String jobDirection; // 求职方向
    private String intentCity; // 意向城市
    private String expectedSalary; // 期望薪资

    // 档案统计信息 (GrowthRecord)
    private Integer resumeCount;
    private Integer interviewCount;
    private Integer practiceCount;
    private Integer collectionCount;
    private Integer continuousCheckinDays;

    // 打卡相关
    private Boolean checkedInToday;
    
    /**
     * 本周打卡状态，长度为7的布尔数组
     * 索引0表示周一，索引6表示周日
     * true表示已打卡，false表示未打卡
     */
    private List<Boolean> weeklyCheckinStatus;
}
