package com.offercat.radar.integration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.offercat.radar.dto.response.DimensionScore;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: Ofteen
 * @data: 2026/4/22 - 01:06
 * @mail: oldfourteen41@gmail.com
 * @info:
 */
@Component
@RequiredArgsConstructor
public class PythonRadarChartClient {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${radar.python.base-url:http://localhost:5000}")
    private String baseUrl;

    @Value("${radar.python.path:/radar-chart}")
    private String path;

    public PythonRadarResponse generateChart(List<Integer> fullScores){
        String url = baseUrl + path;

        Map<String, Object> body = new HashMap<>();
        body.put("full_scores", fullScores);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String,Object>> entity = new HttpEntity<>(body,headers);

        ResponseEntity<byte[]> resp = restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);
        MediaType contentType = resp.getHeaders().getContentType();
        byte[] bytes = resp.getBody() == null? new byte[0] : resp.getBody();

        // Python返回JSON 包含 ImageBase64 和 top5
        try{
            String json = new String(bytes, StandardCharsets.UTF_8);
            return objectMapper.readValue(json, PythonRadarResponse.class);
        }catch (Exception e){
            return null;
        }
    }

    @lombok.Data
    public static class PythonRadarResponse {
        @com.fasterxml.jackson.annotation.JsonProperty("imageBase64")
        private String imageBase64;
        
        @com.fasterxml.jackson.annotation.JsonProperty("top5")
        private List<DimensionScore> top5;
    }
}
