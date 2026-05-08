package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 学生面试记录实体类
 * 功能：表示学生的面试记录信息
 */
@Data
public class StudentInterviewRecord {
    // 记录ID
    private Long recordId;
    // 学生ID
    private Long studentId;
    // 面试记录ID
    private Long paperRecordId;
    // 题目ID
    private Long questionId;
    // 用户回答
    private String userAnswer;
    // AI评分
    private Integer aiScore;
    // AI反馈
    private String aiFeedback;
    // 总评分
    private Integer totalScore;
    // 回答时间
    private LocalDateTime answerTime;
}
