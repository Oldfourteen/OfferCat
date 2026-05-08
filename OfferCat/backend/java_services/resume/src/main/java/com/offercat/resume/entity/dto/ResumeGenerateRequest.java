package com.offercat.resume.entity.dto;

import lombok.Data;

/**
 * 简历生成请求DTO
 * 功能：接收简历生成请求参数
 */
@Data
public class ResumeGenerateRequest {
    // 学生ID
    private Long studentId;
    // 目标岗位
    private String targetPosition;
    // 学生信息
    private String studentInfo;
}
