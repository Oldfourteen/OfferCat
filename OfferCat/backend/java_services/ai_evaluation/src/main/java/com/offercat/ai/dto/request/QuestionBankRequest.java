package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 题库请求DTO
 * 功能：接收前端选择的题库参数
 */
@Data
public class QuestionBankRequest {
    @NotNull(message = "学生ID不能为空")
    private Long studentId;
    
    private String subject;
    
    private Integer questionType;
}
