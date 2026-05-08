package com.offercat.student.dto;

import lombok.Data;

/**
 * 提交面试答案DTO
 * 功能：提供提交面试答案相关的数据传输对象
 */
@Data
public class SubmitInterviewAnswerDTO {
    // 学生ID
    private Long studentId;
    // 面试问题ID
    private Long questionId;
    // 面试记录ID
    private Long paperRecordId;
    // 学生面试答案
    private String userAnswer;
}
