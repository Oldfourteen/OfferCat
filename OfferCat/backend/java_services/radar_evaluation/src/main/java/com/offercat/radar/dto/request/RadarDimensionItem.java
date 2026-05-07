package com.offercat.radar.dto.request;

import lombok.Data;

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 08:31
 * @mail: oldfourteen41@gmail.com
 * @info: 这个request请求是基于top5五个维度来实现的模块
 */

@Data
public class RadarDimensionItem {
    // 维度名称：如“竞赛成果/学历背景/软技能/行业认知...”
    private String name;

    // 当前分数
    private Double score;

    // 展示范围（可选，但强烈建议传，AI更好判断差距）
    private Double min;
    private Double max;
}
