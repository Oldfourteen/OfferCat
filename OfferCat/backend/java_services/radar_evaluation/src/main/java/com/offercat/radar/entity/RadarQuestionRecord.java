package com.offercat.radar.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 雷达图评估问卷答题记录表实体类
 * 对应数据库radar_question_record表
 */
@Data
public class RadarQuestionRecord {
    /**
     * 记录ID
     */
    private Long recordId;
    
    /**
     * 答题学生ID
     */
    private Long studentId;
    
    /**
     * 题目ID
     */
    private Long questionId;
    
    /**
     * 用户选择的选项(A/B/C/D)
     */
    private String selectedOption;
    
    /**
     * 该题实际获得的"专业能力"分值
     */
    private Integer scoreGainedProf;
    
    /**
     * 该题实际获得的"项目经验"分值
     */
    private Integer scoreGainedProj;
    
    /**
     * 该题实际获得的"竞赛成果"分值
     */
    private Integer scoreGainedComp;
    
    /**
     * 该题实际获得的"学历背景"分值
     */
    private Integer scoreGainedAcad;
    
    /**
     * 该题实际获得的"软技能"分值
     */
    private Integer scoreGainedSoft;
    
    /**
     * 该题实际获得的"行业认知"分值
     */
    private Integer scoreGainedIndu;
    
    /**
     * 答题时间
     */
    private LocalDateTime createTime;
}