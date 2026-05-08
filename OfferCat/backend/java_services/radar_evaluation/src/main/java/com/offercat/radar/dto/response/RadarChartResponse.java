package com.offercat.radar.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 *  雷达图评价智能体响应参数，包含学生ID、是否有效、消息、Top5维度、雷达图图片Base64编码
 */
@Builder
@Getter
public class RadarChartResponse {
    // 学生ID
    private long studentId;
    // 是否有效
    private boolean valid;
    // 消息
    private String message;
    // Top5维度
    private List<DimensionScore> top5;
    // 雷达图图片Base64编码
    private String ranarImageBase64;

    // 七个维度的分数，供前端直接展示
    // 专业能力
    private Integer professionalAbility;
    // 项目经验
    private Integer projectExperience;
    // 竞赛结果
    private Integer competitionResults;
    // 学历背景
    private Integer academicBackground;
    // 软技能
    private Integer softSkills;
    // 行业认知
    private Integer industryCognition;
    // 压力执行
    private Integer stressExecution;
}
