package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * @author: Ofteen
 * @data: 2026/4/23 - 09:48
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
public class TtsSpeakRequest {
    //要朗读的文本（传deepseek返回answer）
    @NotBlank(message = "文本不能为空！OWO")
    private String text;

    //可选音色, 例如: alex
    private String voice;

    //传的格式可选：mp3 wav opus pcm
    private String responseFormat;

    //语速 0.25~4.0
    private Float speed;

    //是否流式
    private Boolean stream;
}
