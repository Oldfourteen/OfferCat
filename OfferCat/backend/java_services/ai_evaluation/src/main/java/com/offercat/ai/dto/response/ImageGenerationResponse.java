package com.offercat.ai.dto.response;

/**
 * @author: Ofteen
 * @data: 2026/4/21 - 20:07
 * @mail: oldfourteen41@gmail.com
 * @info: 模型和数据的相关传参内容 （回应）
 */

import lombok.Data;

import java.util.List;

@Data
public class ImageGenerationResponse {
    // 硅基流动返回的限期有效图片 通常限期为1小时内
    private List<String> urls;

    // time.inference 推理耗时
    private Long inferenceMs;

    private Long seed;

    // 响应头 x-siliconcloud-trace-id
    private String traceId;

    // 非空表示失败
    private String error;
}
