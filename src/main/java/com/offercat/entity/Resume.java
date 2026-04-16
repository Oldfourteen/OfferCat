package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.math.BigDecimal;

/**
 * 简历实体类
 * 对应数据库resume表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resume {
    /**
     * 简历ID
     */
    private Long resumeId;
    
    /**
     * 关联学生ID
     */
    private Long studentId;
    
    /**
     * 学生真实照片URL
     */
    private String photo;
    
    /**
     * 专业技能
     */
    private String skills;
    
    /**
     * 项目经历
     */
    private String projectExperience;
    
    /**
     * 综合评价
     */
    private String selfEvaluation;
    
    /**
     * AI评估分数
     */
    private BigDecimal aiScore;
    
    /**
     * AI评估意见
     */
    private String aiEvaluation;
    
    /**
     * 状态 1-草稿 2-已发布
     */
    private Integer resumeStatus;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
    
    /**
     * 更新时间
     */
    private LocalDateTime updateTime;
}