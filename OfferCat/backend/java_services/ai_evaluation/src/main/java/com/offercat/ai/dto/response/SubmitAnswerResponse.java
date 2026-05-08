package com.offercat.ai.dto.response;

import lombok.Builder;
import lombok.Data;

/**
 * 提交答案响应DTO
 * 用来返回答题结果和正确答案
 */
@Data
@Builder
public class SubmitAnswerResponse {
    // 学生ID
    private Long studentId;
    // 题目ID
    private Long questionId;
    // 选择的答案
    private String selectedAnswer;
    // 正确答案
    private String correctAnswer;
    // 是否正确
    private Boolean isCorrect;
    // 解释
    private String explanation;
    // 消息
    private String message;
}
