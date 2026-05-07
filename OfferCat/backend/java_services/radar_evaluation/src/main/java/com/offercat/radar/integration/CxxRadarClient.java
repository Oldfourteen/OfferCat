package com.offercat.radar.integration;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.offercat.radar.dto.response.DimensionScore;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: Ofteen
 * @data: 2026/4/22 - 00:57
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Component
@RequiredArgsConstructor
public class CxxRadarClient {
    private final RestTemplate restTemplate;

    @Value("${radar.cpp.base-url:http://localhost:22565}")
    private String baseUrl;

    public CxxRadarResponse score(List<String> answers){
        String url = baseUrl + "/radar";

        Map<String,Object> body = new HashMap<>();
        body.put("answers",answers);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body,headers);

        return restTemplate.postForObject(url, entity, CxxRadarResponse.class);
    }

    @Data
    public static class CxxRadarResponse {
        @JsonProperty("valid")
        private boolean valid;
        @JsonProperty("full_scores")
        private List<Integer> fullScores;
    }
}
