package com.offercat.resume.entity.dto;

import lombok.Data;

/*
 * 简历诊断结果DTO
 * 功能：返回简历诊断结果
 */
@Data
public class ResumeDiagnoseResult {
    // 简历ID
    private Long resumeId;
    // 评分
    private Integer score;
    // 诊断结果
    private String diagnosis;
    // 建议
    private String suggestions;
}
