package com.offercat.resume.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * C++简历PDF服务客户端
 * 功能：与C++简历处理服务进行通信
 * 说明：调用C++服务的高亮和PDF生成接口
 */
@Slf4j
@Component
public class ResumePdfClient {

    /**
     * C++服务基础URL
     */
    @Value("${resume.pdf.service.url:http://localhost:22570}")
    private String pdfServiceUrl;

    /**
     * HTTP客户端
     */
    private final RestTemplate restTemplate;

    /**
     * JSON序列化工具
     */
    private final ObjectMapper objectMapper;

    /**
     * 构造函数
     */
    public ResumePdfClient() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * 调用C++服务进行简历高亮处理
     *
     * @param resumeJson 简历JSON对象（Map格式）
     * @param keywords   关键词列表
     * @param userId     用户ID（用于加载头像）
     * @return 高亮结果Map，包含spansById和htmlById
     */
    public Map<String, Object> highlightResume(Map<String, Object> resumeJson, String[] keywords, Long userId) {
        return highlightResume(resumeJson, keywords, userId, "ac");
    }

    public Map<String, Object> highlightResume(Map<String, Object> resumeJson, String[] keywords, Long userId, String highlightEngine) {
        try {
            String url = pdfServiceUrl + "/api/v1/resume/highlight";

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("resume", resumeJson);
            requestBody.put("keywords", keywords);
            if (highlightEngine != null && !highlightEngine.isEmpty()) {
                requestBody.put("highlightEngine", highlightEngine);
            }
            if (userId != null) {
                requestBody.put("userId", userId);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                log.error("调用C++高亮服务失败: {}", response.getStatusCode());
                return null;
            }
        } catch (Exception e) {
            log.error("调用C++高亮服务异常", e);
            return null;
        }
    }

    /**
     * 调用C++服务生成简历PDF
     *
     * @param resumeJson 简历JSON对象（Map格式）
     * @param keywords   关键词列表
     * @param userId     用户ID（用于加载头像）
     * @return PDF文件字节数组
     */
    public byte[] generateResumePdf(Map<String, Object> resumeJson, String[] keywords, Long userId) {
        return generateResumePdf(resumeJson, keywords, userId, "ac");
    }

    public byte[] generateResumePdf(Map<String, Object> resumeJson, String[] keywords, Long userId, String highlightEngine) {
        try {
            String url = pdfServiceUrl + "/api/v1/resume/pdf";

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("resume", resumeJson);
            requestBody.put("keywords", keywords);
            if (highlightEngine != null && !highlightEngine.isEmpty()) {
                requestBody.put("highlightEngine", highlightEngine);
            }
            if (userId != null) {
                requestBody.put("userId", userId);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            ResponseEntity<byte[]> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    request,
                    byte[].class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("PDF生成成功，大小: {} bytes", response.getBody().length);
                return response.getBody();
            } else {
                log.error("调用C++PDF服务失败: {}", response.getStatusCode());
                return null;
            }
        } catch (Exception e) {
            log.error("调用C++PDF服务异常", e);
            return null;
        }
    }

    /**
     * 检查C++服务是否可用
     *
     * @return true表示服务可用
     */
    public boolean isServiceAvailable() {
        try {
            String url = pdfServiceUrl + "/health";
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            log.warn("C++服务不可用: {}", e.getMessage());
            return false;
        }
    }
}
