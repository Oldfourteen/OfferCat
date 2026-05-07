package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 生成简历请求DTO
 * 功能：接收生成简历的参数
 */
@Data
public class GenerateResumeRequest {
    /**
     * 目标岗位
     */
    @NotBlank(message = "目标岗位不能为空")
    private String targetPosition;
    
    /**
     * 学生信息
     */
    @NotBlank(message = "学生信息不能为空")
    private String studentInfo;
}