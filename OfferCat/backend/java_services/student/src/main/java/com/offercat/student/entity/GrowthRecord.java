package com.offercat.student.entity;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 成长记录实体类
 * 功能：表示学生的成长记录信息
 */
@Data
public class GrowthRecord {
    // 成长记录ID
    private Long recordId;
    // 学生ID
    private Long studentId;
    // 简历数
       private Integer resumeCount;
    // 面试数
    private Integer interviewCount;
    // 实习数
    private Integer practiceCount;
    // 收藏数
    private Integer collectionCount;
    // 连续签到天数
    private Integer continuousCheckinDays;
    // 最后签到日期
    private LocalDate lastCheckinDate;
    // 创建时间
    private LocalDateTime createTime;
    // 更新时间
    private LocalDateTime updateTime;
}
