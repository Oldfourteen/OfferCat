package com.offercat.ai.dto.response;

import com.offercat.ai.entity.InterviewSession;
import lombok.Builder;
import lombok.Data;

/**
 * 面试阶段响应DTO
 * 功能：返回面试阶段相关的信息
 */
@Data
@Builder
public class InterviewStageResponse {
    // 会话信息
    private InterviewSession session;
    
    // 当前面试阶段
    private String currentStage;
    
    // 下一面试阶段
    private String nextStage;
    
    // 阶段问题
    private String stageQuestion;
    
    // 评估结果
    private String evaluationResult;
    
    // 消息
    private String message;
}
