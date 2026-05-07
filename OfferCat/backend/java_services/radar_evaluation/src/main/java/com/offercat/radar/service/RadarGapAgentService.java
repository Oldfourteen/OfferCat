package com.offercat.radar.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.offercat.radar.dto.request.RadarGapAgentRequest;
import com.offercat.radar.dto.response.RadarGapAgentResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 08:34
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Service
@RequiredArgsConstructor
public class RadarGapAgentService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${deepseek.api-key}")
    private String deepseekKey;

    @Value("${deepseek.base-url}")
    private String deepseekBaseUrl;

    @Value("${deepseek.model:deepseek-chat}")
    private String model;

    private String systemPrompt;

    @PostConstruct
    public void loadPrompt() {
        try {
            ClassPathResource resource = new ClassPathResource("skills/radar_gap_agent.md");
            this.systemPrompt = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            this.systemPrompt = "你是一个职业发展顾问，请输出差距点和提升建议（JSON格式）。";
        }
    }

    public RadarGapAgentResponse generate(RadarGapAgentRequest req) {
        try {
            // 把结构化数据直接给模型，要求严格 JSON 输出
            String userContent = objectMapper.writeValueAsString(req);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);

            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", systemPrompt));
            messages.add(Map.of("role", "user", "content", userContent));
            requestBody.put("messages", messages);
            requestBody.put("stream", false);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(deepseekKey);

            ResponseEntity<Map> resp = restTemplate.postForEntity(
                    deepseekBaseUrl + "/v1/chat/completions",
                    new HttpEntity<>(requestBody, headers),
                    Map.class
            );

            String content = extractAssistantContent(resp.getBody());
            // content 必须是 JSON：{ "gapPoints": [...], "improvementSuggestions": [...] }
            return objectMapper.readValue(content, RadarGapAgentResponse.class);

        } catch (Exception e) {
            // 兜底：保证接口不崩
            return RadarGapAgentResponse.builder()
                    .gapPoints(List.of("差距点生成失败：" + e.getMessage()))
                    .improvementSuggestions(List.of("请稍后重试，或补充更多简历/岗位信息以提高建议质量"))
                    .build();
        }
    }

    @SuppressWarnings("unchecked")
    private String extractAssistantContent(Map body) {
        if (body == null) return "{}";
        List choices = (List) body.get("choices");
        if (choices == null || choices.isEmpty()) return "{}";
        Map choice0 = (Map) choices.get(0);
        Map message = (Map) choice0.get("message");
        Object content = message.get("content");
        return content == null ? "{}" : String.valueOf(content).trim();
    }
}