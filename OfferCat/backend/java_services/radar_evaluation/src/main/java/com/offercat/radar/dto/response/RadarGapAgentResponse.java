package com.offercat.radar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 08:33
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RadarGapAgentResponse {
    private List<String> gapPoints;               // 差距点
    private List<String> improvementSuggestions;  // 提升建议
}
