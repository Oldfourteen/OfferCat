package com.offercat.ai.dto.response;

import lombok.Builder;
import lombok.Data;

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 01:08
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
@Builder
public class ChatWithOcrImageResponse {
    private String ocrText;
    private String answer;
}
