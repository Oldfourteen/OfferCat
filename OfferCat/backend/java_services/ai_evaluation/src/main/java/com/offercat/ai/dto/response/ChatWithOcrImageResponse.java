package com.offercat.ai.dto.response;

import lombok.Builder;
import lombok.Data;
/**
 * 文本识别响应DTO
 * 用来接收文本识别的结果
 */

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 01:08
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
@Builder
public class ChatWithOcrImageResponse {
    // 文本识别结果
    private String ocrText;
    // 回答
    private String answer;
}
