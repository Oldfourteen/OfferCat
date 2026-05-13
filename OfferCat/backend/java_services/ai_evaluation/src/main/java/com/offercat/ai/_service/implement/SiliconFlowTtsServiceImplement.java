package com.offercat.ai._service.implement;

import com.offercat.ai.dto.request.TtsSpeakRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * @author: Ofteen
 * @data: 2026/4/23 - 15:21
 * @mail: oldfourteen41@gmail.com
 * @info: 对应硅基流动文档，
 * 格式为：
 * {
 *   "model": "fnlp/MOSS-TTSD-v0.5",
 *   "input": "...",
 *   "voice": "fnlp/MOSS-TTSD-v0.5:alex",
 *   "response_format": "mp3",
 *   "stream": false
 * }
 */
@Service
@RequiredArgsConstructor
public class SiliconFlowTtsServiceImplement {
    private final RestTemplate restTemplate;

    @Value("${siliconFlow.api-key}")
    private String apiKey;

    @Value("${siliconFlow.base-url:https://api.siliconflow.cn}")
    private String baseUrl;

    @Value("${siliconFlow.tts.speech-path:/v1/audio/speech}")
    private String speachPath;

    @Value("${siliconFlow.tts.model:fnlp/MOSS-TTSD-v0.5}")
    private String defaultModel;

    @Value("${siliconFlow.tts.voice:alex}")
    private String defaultVoice;

    @Value("${siliconFlow.tts.response-format:mp3}")
    private String defaultResponseFormat;

    @Value("${siliconFlow.tts.stream:false}")
    private boolean defaultStream;

    @Value("${siliconFlow.tts.speed:1.0}")
    private float defaultSpeed;

    public ResponseEntity<byte[]> speak(TtsSpeakRequest req){
        if(req == null || req.getText() == null || req.getText().isBlank()){
            throw new IllegalArgumentException("文本不能为空");
        }

        String url = baseUrl + speachPath;

        // 组装 JSON body
        Map<String, Object> body = new HashMap<>();
        body.put("model", defaultModel);
        body.put("input", req.getText());
        // 硅基流动要求 voice 为「模型名:音色」枚举值，不能单独传 alex（见官方 /v1/audio/speech）
        body.put("voice", resolveVoice(req.getVoice()));
        body.put("response_format", (req.getResponseFormat() == null || req.getResponseFormat().isBlank()) ? defaultResponseFormat : req.getResponseFormat());
        body.put("stream", req.getStream() == null ? defaultStream : req.getStream());
        body.put("speed", req.getSpeed() == null ? defaultSpeed : req.getSpeed());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        //音频二进制
        return restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);
    }

    /**
     * 配置里可写短音色名（如 alex），自动补全为 defaultModel + ":" + voice；
     * 若已是「模型:音色」格式则原样使用。
     */
    private String resolveVoice(String requestedVoice) {
        String v = (requestedVoice == null || requestedVoice.isBlank()) ? defaultVoice : requestedVoice.trim();
        if (v.contains(":")) {
            return v;
        }
        return defaultModel + ":" + v;
    }
}
