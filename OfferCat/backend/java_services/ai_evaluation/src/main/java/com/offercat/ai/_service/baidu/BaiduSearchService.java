package com.offercat.ai._service.baidu;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * @author: OfferCat
 * @info: 百度智能云 AppBuilder 联网搜索服务
 */
@Service
public class BaiduSearchService {

    @Value("${baidu.app-builder.api-key}")
    private String apiKey;

    @Value("${baidu.app-builder.base-url}")
    private String apiUrl;

    @Autowired
    private RestTemplate restTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 调用百度智能云搜索获取参考信息
     * @param query 搜索关键词
     * @return 提取的搜索结果上下文（拼接成字符串）
     */
    public String searchForContext(String query) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("query", query);
            requestBody.put("search_type", "pro");

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, entity, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode rootNode = objectMapper.readTree(response.getBody());
                JsonNode resultsNode = rootNode.path("results");
                
                if (resultsNode.isArray() && !resultsNode.isEmpty()) {
                    StringBuilder contextBuilder = new StringBuilder();
                    int count = 0;
                    for (JsonNode node : resultsNode) {
                        if (count >= 5) break; // 取前5条
                        String title = node.path("title").asText("");
                        String content = node.path("content").asText("");
                        if (!title.isEmpty() && !content.isEmpty()) {
                            contextBuilder.append("【").append(title).append("】: ").append(content).append("\n");
                            count++;
                        }
                    }
                    return contextBuilder.toString();
                }
            }
        } catch (Exception e) {
            System.err.println("百度搜索API调用失败: " + e.getMessage());
        }
        return "暂无最新联网搜索结果。";
    }
}
