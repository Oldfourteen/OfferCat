package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * AI提问答题题库表实体类
 * 对应数据库ai_question_bank表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiQuestionBank {
    /**
     * 题库ID（主键）
     */
    private Long questionId;
    
    /**
     * 题目类型 1-求职常识题 2-专业技能题 3-面试模拟题 4-职业规划题 5-AI评估附加题
     */
    private Integer questionType;
    
    /**
     * 提问内容（题干）
     */
    private String questionContent;
    
    /**
     * 要点核心（题干考察重点，用于AI评分参考）
     */
    private String corePoint;
    
    /**
     * 标准参考答案
     */
    private String answer;
    
    /**
     * 难度等级 1-简单 2-中等 3-困难（用于AI梯度出题）
     */
    private Integer difficultyLevel;
    
    /**
     * 所属科目/领域（如：计算机、会计、汉语言，适配不同专业学生）
     */
    private String subject;
    
    /**
     * 题目分值（用于AI综合评分统计）
     */
    private Integer score;
    
    /**
     * AI标签（如：简历优化、面试技巧、专业基础，用于AI精准匹配提问）
     */
    private String aiTag;
    
    /**
     * 启用状态 1-启用（可被AI调用） 0-禁用（暂不使用）
     */
    private Integer isEnable;
    
    /**
     * 题目创建时间
     */
    private LocalDateTime createTime;
    
    /**
     * 题目更新时间
     */
    private LocalDateTime updateTime;
}