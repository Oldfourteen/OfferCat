package com.offercat.radar.dto.response;

import lombok.Data;

/**
 * @author: Ofteen
 * @data: 2026/4/22 - 00:52
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
public class DimensionScore {
    // 维度名称
    private String dimension;
    // 得分
    private Integer score;
}
