package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 学生答题记录表实体类
 * 对应数据库student_answer_record表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAnswerRecord {
    /**
     * 记录ID
     */
    private Long recordId;
    
    /**
     * 学生ID
     */
    private Long studentId;
    
    /**
     * 题目ID
     */
    private Long questionId;
    
    /**
     * 用户答案
     */
    private String userAnswer;
    
    /**
     * AI评分
     */
    private Integer aiScore;
    
    /**
     * AI反馈
     */
    private String aiFeedback;
    
    /**
     * 答题时间
     */
    private LocalDateTime answerTime;
}