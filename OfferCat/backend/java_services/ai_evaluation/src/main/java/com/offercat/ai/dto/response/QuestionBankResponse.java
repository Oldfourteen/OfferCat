package com.offercat.ai.dto.response;

import lombok.Builder;
import lombok.Data;
import java.util.List;

/**
 * 题库响应DTO
 * 功能：返回题目列表
 */
@Data
@Builder
public class QuestionBankResponse {
    private Long studentId;
    private String subject;
    private Integer questionType;
    private Integer totalQuestions;
    private List<QuestionItem> questions;
    private String message;
    
    @Data
    @Builder
    public static class QuestionItem {
        private Long questionId;
        private String questionContent;
        private String optionA;
        private String optionB;
        private String optionC;
        private String optionD;
    }
}
