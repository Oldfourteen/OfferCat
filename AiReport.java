package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * AI综合评估报告表实体类
 * 对应数据库ai_report表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiReport {
    /**
     * 报告ID
     */
    private Long reportId;
    
    /**
     * 学生ID
     */
    private Long studentId;
    
    /**
     * 总分
     */
    private Integer totalScore;
    
    /**
     * 优势
     */
    private String advantage;
    
    /**
     * 劣势
     */
    private String disadvantage;
    
    /**
     * 职业建议
     */
    private String careerSuggest;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}