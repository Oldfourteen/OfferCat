package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 提交答案请求DTO
 * 功能：接收学生提交的答案
 */
@Data
public class SubmitAnswerRequest {
    @NotNull(message = "学生ID不能为空")
    private Long studentId;
    
    @NotNull(message = "题目ID不能为空")
    private Long questionId;
    
    @NotBlank(message = "选择的答案不能为空")
    private String selectedAnswer;
}
