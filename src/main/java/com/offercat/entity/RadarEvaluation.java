package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 雷达评估实体类
 * 对应数据库radar_evaluation表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RadarEvaluation {
    /**
     * 雷达图ID
     */
    private Long radarId;
    
    /**
     * 关联学生ID
     */
    private Long studentId;
    
    /**
     * 英语能力(0-100分)
     */
    private Integer english;
    
    /**
     * 日语能力(0-100分)
     */
    private Integer japanese;
    
    /**
     * 实习经历评分
     */
    private Integer internship;
    
    /**
     * 沟通能力评分
     */
    private Integer communication;
    
    /**
     * 性格评分
     */
    private Integer personality;
    
    /**
     * 专业能力评分
     */
    private Integer professional;
    
    /**
     * 总分
     */
    private BigDecimal totalScore;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}