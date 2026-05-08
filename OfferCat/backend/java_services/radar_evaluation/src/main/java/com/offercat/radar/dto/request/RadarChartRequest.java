package com.offercat.radar.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

/**
 * @author: Ofteen
 * @data: 2026/4/22 - 00:51
 * @mail: oldfourteen41@gmail.com
 * @info: 雷达评估图表请求参数
 */

@Data
public class RadarChartRequest {
    @NotNull(message = "学生ID不能为空")
    // 学生ID
    private Long studentId;
    // 答案列表，顺序为1到40题
    @NotEmpty(message = "答案不能为空")
    private List<String> answers;
}
