package com.offercat.ai.entity;

import lombok.Data;

import java.time.LocalDateTime;

/*
 * 学生答题记录实体类
 * 功能：存储学生答题记录信息
 * 实现：使用Lombok的@Data注解生成getter/setter等方法
 */
@Data
public class StudentAnswerRecord {
    // 记录ID
    private Long recordId;
    // 学生ID
    private Long studentId;
    // 题目ID
    private Long questionId;
    // 用户答案
    private String userAnswer;
    // AI评分
    private Integer aiScore;
    // AI反馈
    private String aiFeedback;
    // 答题时间
    private LocalDateTime answerTime;
}
