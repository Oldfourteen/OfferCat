package com.offercat.radar.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class RadarChartResponse {
    private long studentId;
    private boolean valid;
    private String message;
    private List<DimensionScore> top5;
    private String ranarImageBase64;

    // 七个维度的分数，供前端直接展示
    private Integer professionalAbility;
    private Integer projectExperience;
    private Integer competitionResults;
    private Integer academicBackground;
    private Integer softSkills;
    private Integer industryCognition;
    private Integer stressExecution;
}
