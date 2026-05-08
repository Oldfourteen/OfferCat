package com.offercat.ai.dto.response;

import lombok.Builder;
import lombok.Data;
import java.util.List;

/**
 * 题库响应DTO
 * 用来返回题目列表
 */
@Data
@Builder
public class QuestionBankResponse {
    // 学生ID
    private Long studentId;
    // 学科
    private String subject;
    // 题目类型
    private Integer questionType;
    // 总题目数
    private Integer totalQuestions;
    // 题目列表
    private List<QuestionItem> questions;
    // 消息
    private String message;
    
    @Data
    @Builder
    public static class QuestionItem {
        // 题目ID
        private Long questionId;
        // 题目内容
        private String questionContent;
        // 选项A
        private String optionA;
        // 选项B
        private String optionB;
        // 选项C
        private String optionC;
        // 选项D
        private String optionD;
    }
}
