package com.offercat.ai.dto.response;

import lombok.Builder;
import lombok.Data;

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 01:07
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
@Builder
public class OcrRecognizeResponse {
    private String text;
    private String rawError;
}
