package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 面试阶段答案请求DTO
 * 功能：接收用户在特定面试阶段的答案
 */
@Data
public class InterviewStageAnswerRequest {
    /**
     * 会话ID
     */
    @NotNull(message = "会话ID不能为空")
    private Long sessionId;
    
    /**
     * 面试阶段
     */
    @NotBlank(message = "面试阶段不能为空")
    private String stage;
    
    /**
     * 用户答案
     */
    @NotBlank(message = "答案不能为空")
    private String userAnswer;
}
