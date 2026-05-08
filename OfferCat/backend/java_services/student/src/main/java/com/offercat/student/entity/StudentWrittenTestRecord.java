package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 学生书面测试记录实体类
 * 功能：表示学生的书面测试记录信息
 */
@Data
public class StudentWrittenTestRecord {
    // 记录ID
    private Long recordId;
    // 学生ID
    private Long studentId;
    // 测试记录ID
    private Long paperRecordId;
    // 题目ID
    private Long questionId;
    // 用户回答
    private String userAnswer;
    // 是否正确
    private Integer isCorrect;
    // 总评分
    private Integer totalScore;
    // 回答时间
    private LocalDateTime answerTime;
}
