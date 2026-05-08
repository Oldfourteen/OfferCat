package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 诊断简历请求DTO
 * 用来接收诊断简历的参数
 */
@Data
public class DiagnoseResumeRequest {
    // 简历内容
    @NotBlank(message = "简历内容不能为空")
    private String resumeContent;
    
    // 目标岗位
    @NotBlank(message = "简历内容不能为空")
    private String targetPosition;
}