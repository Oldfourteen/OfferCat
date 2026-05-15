package com.offercat.ai._service.implement;

import com.offercat.ai.dto.response.OcrRecognizeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 01:08
 * @mail: oldfourteen41@gmail.com
 * @info: 现已使用 SiliconFlow 视觉语言模型（默认可通过配置切换）代替原有的 OCR.space
 */

@Service
@RequiredArgsConstructor
public class OcrSpaceServiceImplement {

    private final RestTemplate restTemplate;

    @Value("${siliconFlow.base-url:https://api.siliconflow.cn}")
    private String sfBaseUrl;

    @Value("${siliconFlow.api-key}")
    private String sfApiKey;

    /** 72B 等旧模型可能在平台侧被禁用（403 Model disabled），默认使用当前可用的 Qwen3-VL。 */
    @Value("${siliconFlow.ocr.model:Qwen/Qwen3-VL-32B-Instruct}")
    private String ocrVlModel;

    public OcrRecognizeResponse recognize(MultipartFile file) {
        if (file == null || file.isEmpty()) throw new IllegalArgumentException("图片不能为空");

        try {
            // 1. 将图片转换为 Base64
            String base64Image = Base64.getEncoder().encodeToString(file.getBytes());
            String mimeType = file.getContentType() != null ? file.getContentType() : "image/jpeg";
            String imageUrl = "data:" + mimeType + ";base64," + base64Image;

            return recognizeByBase64(imageUrl);
        } catch (Exception e) {
            return OcrRecognizeResponse.builder().text("").rawError("图片提取文字失败：" + e.getMessage()).build();
        }
    }

    public OcrRecognizeResponse recognizeByBase64(String imageUrl) {
        try {
            // 2. 构造请求头
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(sfApiKey);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", ocrVlModel);
            requestBody.put("stream", false);

            List<Map<String, Object>> messages = new ArrayList<>();
            Map<String, Object> userMessage = new HashMap<>();
            userMessage.put("role", "user");

            List<Map<String, Object>> contentList = new ArrayList<>();
            contentList.add(Map.of("type", "text", "text", "请提取这张图片中的所有文字内容。不要有任何多余的解释或格式，只输出文字本身。"));
            contentList.add(Map.of("type", "image_url", "image_url", Map.of("url", imageUrl)));

            userMessage.put("content", contentList);
            messages.add(userMessage);

            requestBody.put("messages", messages);

            // 4. 发送请求
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(sfBaseUrl + "/v1/chat/completions", entity, Map.class);

            // 5. 解析返回结果
            Map body = response.getBody();
            if (body != null) {
                List choices = (List) body.get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map choice = (Map) choices.get(0);
                    Map message = (Map) choice.get("message");
                    String parsedText = (String) message.get("content");
                    return OcrRecognizeResponse.builder().text(parsedText).rawError(null).build();
                }
            }

            return OcrRecognizeResponse.builder().text("").rawError("视觉模型返回空响应").build();
        } catch (Exception e) {
            return OcrRecognizeResponse.builder().text("").rawError("图片提取文字失败：" + e.getMessage()).build();
        }
    }
}
