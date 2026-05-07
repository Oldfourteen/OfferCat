package com.offercat.radar.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 08:32
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
public class RadarGapAgentRequest {

    @NotNull
    private Long studentId;

    /**
     * 专业code（你项目里有 MajorEnum，可选传）
     * 不传也能跑，但建议传，提示词能更贴近专业
     */
    private String majorCode;

    /**
     * 目标岗位（可选），如：前端开发/测试/产品 等
     */
    private String targetRole;

    /**
     * 维度数据（页面展示的那些）
     */
    @NotEmpty
    private List<RadarDimensionItem> dimensions;

    /**
     * 可选：额外上下文（简历要点/实习经历/竞赛/项目），越多越准
     */
    private String extraContext;
}
