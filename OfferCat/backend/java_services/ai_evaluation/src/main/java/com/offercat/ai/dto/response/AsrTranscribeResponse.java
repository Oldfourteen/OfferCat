package com.offercat.ai.dto.response;

import lombok.Builder;
import lombok.Data;

/**
 * @author: Ofteen
 * @data: 2026/4/23 - 08:46
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
@Builder
public class AsrTranscribeResponse {
    //识别后的文本
    private String text;
    //SiliconFlow 返回的追踪ID
    private String traceId;
}
