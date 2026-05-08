package com.offercat.ai.dto.response;

import lombok.Builder;
import lombok.Data;
/**
 * 图片识别响应DTO
 * 用来接收图片识别的结果
 */

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 01:07
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
@Builder
public class OcrRecognizeResponse {
    // 图片识别结果
    private String text;
    // 原始错误信息
    private String rawError;
}
