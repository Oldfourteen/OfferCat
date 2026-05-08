package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 面试阶段请求DTO
 * 用来接收面试阶段相关的参数
 */
@Data
public class InterviewStageRequest {
    // 会话ID
    @NotNull(message = "会话ID不能为空")
    private Long sessionId;
    
    // 面试阶段
    @NotBlank(message = "面试阶段不能为空")
    private String stage;
}
