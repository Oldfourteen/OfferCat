package com.offercat.resume.entity.dto;

import lombok.Data;

/*
 * 简历诊断请求DTO
 * 功能：接收简历诊断请求参数
 */
@Data
public class ResumeDiagnoseRequest {
    // 简历ID
    private Long resumeId;
    // 目标岗位
    private String targetPosition;
}
