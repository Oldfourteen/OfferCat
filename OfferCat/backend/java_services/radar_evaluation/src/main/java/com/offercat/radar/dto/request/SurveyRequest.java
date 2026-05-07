package com.offercat.radar.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;

/**
 * 调查问卷请求DTO
 * 功能：接收用户的40题答案
 * 实现：使用Map存储题目编号和选择的选项
 */
@Data
public class SurveyRequest {
    @NotNull(message = "学生ID不能为空")
    private Long studentId;
    
    @NotNull(message = "答案不能为空")
    private Map<Integer, String> answers; // 题目编号 -> 选项(A/B/C/D)
}
