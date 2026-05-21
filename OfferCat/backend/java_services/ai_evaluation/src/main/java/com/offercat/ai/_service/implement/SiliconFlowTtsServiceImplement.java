package com.offercat.ai._service.implement;

import com.offercat.ai.dto.request.TtsSpeakRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
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
@Slf4j
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

        // 检查API密钥是否配置
        if (apiKey == null || apiKey.isBlank()) {
            log.error("硅基流动API密钥未配置");
            throw new IllegalArgumentException("TTS服务未配置，请联系管理员");
        }

        String url = baseUrl + speachPath;
        log.info("TTS请求URL: {}", url);
        log.info("TTS请求文本长度: {}", req.getText().length());

        // 组装 JSON body
        Map<String, Object> body = new HashMap<>();
        body.put("model", defaultModel);
        body.put("input", req.getText());
        // 硅基流动要求 voice 为「模型名:音色」枚举值，不能单独传 alex（见官方 /v1/audio/speech）
        String resolvedVoice = resolveVoice(req.getVoice());
        body.put("voice", resolvedVoice);
        body.put("response_format", (req.getResponseFormat() == null || req.getResponseFormat().isBlank()) ? defaultResponseFormat : req.getResponseFormat());
        body.put("stream", req.getStream() == null ? defaultStream : req.getStream());
        body.put("speed", req.getSpeed() == null ? defaultSpeed : req.getSpeed());

        log.info("TTS请求参数: model={}, voice={}, format={}, speed={}", 
                defaultModel, resolvedVoice, 
                (req.getResponseFormat() == null || req.getResponseFormat().isBlank()) ? defaultResponseFormat : req.getResponseFormat(),
                req.getSpeed() == null ? defaultSpeed : req.getSpeed());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            //音频二进制
            log.info("开始发送TTS请求到硅基流动...");
            ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);
            log.info("TTS请求成功，响应状态: {}, 数据长度: {}", 
                    response.getStatusCode(), 
                    response.getBody() != null ? response.getBody().length : 0);
            return response;
        } catch (RestClientException e) {
            log.error("TTS请求失败: {}", e.getMessage(), e);
            throw new RuntimeException("TTS服务请求失败: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("TTS请求发生未知错误: {}", e.getMessage(), e);
            throw new RuntimeException("TTS服务异常: " + e.getMessage(), e);
        }
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
        String resolved = defaultModel + ":" + v;
        log.debug("音色名转换: {} -> {}", requestedVoice, resolved);
        return resolved;
    }
}
