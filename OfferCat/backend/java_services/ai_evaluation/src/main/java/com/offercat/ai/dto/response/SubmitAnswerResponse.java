package com.offercat.ai.dto.response;

import lombok.Builder;
import lombok.Data;

/**
 * 提交答案响应DTO
 * 功能：返回答题结果和正确答案
 */
@Data
@Builder
public class SubmitAnswerResponse {
    private Long studentId;
    private Long questionId;
    private String selectedAnswer;
    private String correctAnswer;
    private Boolean isCorrect;
    private String explanation;
    private String message;
}
