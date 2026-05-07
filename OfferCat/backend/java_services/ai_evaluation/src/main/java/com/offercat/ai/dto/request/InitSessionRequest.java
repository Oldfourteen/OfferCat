package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 初始化面试会话请求DTO
 * 功能：接收初始化面试会话的参数
 */
@Data
public class InitSessionRequest {
    /**
     * 学生ID
     */
    @NotNull(message = "学生ID不能为空")
    private Long studentId;
    
    /**
     * 目标岗位
     */
    @NotBlank(message = "目标岗位不能为空")
    private String targetPosition;
    
    /**
     * 面试模式（1-模拟面试 2-真题练习 3-专项训练）
     */
    private Integer mode;
    
    /**
     * 总题目数
     */
    private Integer totalQuestions;
}