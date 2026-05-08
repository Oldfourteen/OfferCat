package com.offercat.ai.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 学生问题记录实体类, 用来存储学生回答面试题的记录
 */
@Data
public class StudentQuestionRecord {
    // 主键ID
    private Long recordId;
    // 学生ID
    private Long studentId;
    // 题目ID
    private Long questionId;
    // 学生回答
    private String userAnswer;
    // AI评分
    private Integer aiScore;
    // AI反馈
    private String aiFeedback;
    // 回答时间
    private LocalDateTime answerTime;
}
