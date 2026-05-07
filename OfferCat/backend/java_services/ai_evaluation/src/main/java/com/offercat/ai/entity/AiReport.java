package com.offercat.ai.entity;

import lombok.Data;

import java.time.LocalDateTime;

/*
 * AI评估报告实体类
 * 功能：存储面试评估报告信息
 * 实现：使用Lombok的@Data注解生成getter/setter等方法
 */
@Data
public class AiReport {
    // 报告ID
    private Long reportId;
    // 学生ID
    private Long studentId;
    // 总分
    private Integer totalScore;
    // 优势
    private String advantage;
    // 不足
    private String disadvantage;
    // 职业建议
    private String careerSuggest;
    // 创建时间
    private LocalDateTime createTime;
}
