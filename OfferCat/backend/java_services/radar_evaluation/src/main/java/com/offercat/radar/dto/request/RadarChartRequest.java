package com.offercat.radar.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

/**
 * @author: Ofteen
 * @data: 2026/4/22 - 00:51
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
public class RadarChartRequest {
    @NotNull(message = "学生ID不能为空")
    private Long studentId;

    //顺序为1到40题
    @NotEmpty(message = "答案不能为空")
    private List<String> answers;
}
