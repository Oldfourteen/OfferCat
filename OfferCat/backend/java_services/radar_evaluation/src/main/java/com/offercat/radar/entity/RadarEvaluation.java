package com.offercat.radar.entity;

import lombok.Data;

import java.math.BigDecimal;

/**
 * 雷达评估实体类
 * 功能：存储学生能力雷达评估信息
 * 实现：使用Lombok的@Data注解生成getter/setter等方法
 */
@Data
public class RadarEvaluation {
    // 雷达评估ID
    private Long radarId;
    // 学生ID
    private Long studentId;

    // 专业能力
    private Integer professionalAbility;
    // 项目经验
    private Integer projectExperience;
    // 竞赛成果
    private Integer competitionResults;
    // 学历背景
    private Integer academicBackground;
    // 软技能
    private Integer softSkills;
    // 行业认知
    private Integer industryCognition;
    // 抗压与执行力
    private Integer stressExecution;

    private Double totalScore;
    // 创建时间
    private java.time.LocalDateTime createTime;
}
