package com.offercat.radar.dto.response;

import lombok.Builder;
import lombok.Data;

/**
 * 调查问卷响应DTO
 * 功能：返回计算后的七个维度分数
 * 实现：包含d1-d7七个维度的分数，范围0-16分
 */
@Data
@Builder
public class SurveyResponse {
    // 学生ID
    private Long studentId;
    // 专业知识掌握（0-16分）
    private Integer d1;
    // 实践应用能力（0-16分）
    private Integer d2;
    // 成果与荣誉（0-16分）
    private Integer d3;
    // 学历与学术背景（0-16分）
    private Integer d4;
    // 软技能（0-16分）
    private Integer d5;
    // 行业认知与职业规划（0-16分）
    private Integer d6;
    // 抗压与执行力（0-16分）
    private Integer d7;
    // 提示信息
    private String message;
}
