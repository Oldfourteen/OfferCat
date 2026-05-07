package com.offercat.ai.controller.ocr;

import com.offercat.ai._service.deepseek.DeepSeekChatServices;
import com.offercat.ai._service.implement.OcrSpaceServiceImplement;
import com.offercat.ai.dto.response.ChatWithOcrImageResponse;
import com.offercat.ai.dto.response.OcrRecognizeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.*;

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 01:10
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@RestController
@RequestMapping("/api/ai/ocr")
@RequiredArgsConstructor
public class OcrController {

    private final OcrSpaceServiceImplement ocrService;
    private final DeepSeekChatServices deepSeekChatServices;
    private final RestTemplate restTemplate;

    @Value("${deepseek.api-key}")
    private String apiKey;

    @Value("${deepseek.base-url}")
    private String apiUrl;

    // 3) AI 配文生成
    @PostMapping(value = "/generate-caption", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> generateCaption(@RequestPart("file") MultipartFile file,
                                             @RequestParam("length") String length,
                                             @RequestParam("style") String style) {
        try {
            // 1. OCR识别图片内容
            OcrRecognizeResponse ocr = ocrService.recognize(file);
            if (ocr.getRawError() != null && !ocr.getRawError().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", ocr.getRawError()));
            }

            // 2. 构造DeepSeek Prompt
            String systemPrompt = "你是一个优秀的求职、校园、生活论坛的文案编辑。请根据提供的图片内容、要求的篇幅和风格，生成一段吸睛的论坛帖子配文。";
            String userPrompt = String.format("图片内容如下：%s\n\n要求篇幅：%s\n要求风格：%s\n请直接输出文案内容，不要有多余的解释，尽量带点合适的emoji。", ocr.getText(), length, style);

            // 3. 调用DeepSeek API
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "deepseek-chat");
            
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", systemPrompt));
            messages.add(Map.of("role", "user", "content", userPrompt));
            requestBody.put("messages", messages);
            
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
            httpHeaders.setBearerAuth(apiKey);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, httpHeaders);
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "/v1/chat/completions", entity, Map.class);
            
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null) {
                List choices = (List) responseBody.get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map choice = (Map) choices.get(0);
                    Map message = (Map) choice.get("message");
                    String caption = (String) message.get("content");
                    return ResponseEntity.ok(Map.of("caption", caption));
                }
            }
            return ResponseEntity.internalServerError().body(Map.of("error", "AI生成失败"));
        } catch (IllegalArgumentException e) {
            String msg = e.getMessage();
            return ResponseEntity.badRequest().body(Map.of("error", msg != null ? msg : "参数错误"));
        } catch (Exception e) {
            String msg = e.getMessage();
            return ResponseEntity.internalServerError().body(Map.of("error", "配文生成失败：" + (msg != null ? msg : e.getClass().getSimpleName())));
        }
    }

    // 1) 只做OCR
    @PostMapping(value = "/recognize", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> recognize(@RequestPart("file") MultipartFile file) {
        try {
            OcrRecognizeResponse ocr = ocrService.recognize(file);
            if (ocr.getRawError() != null && !ocr.getRawError().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", ocr.getRawError()));
            }
            return ResponseEntity.ok(ocr);
        } catch (IllegalArgumentException e) {
            String msg = e.getMessage();
            return ResponseEntity.badRequest().body(Map.of("error", msg != null ? msg : "参数错误"));
        } catch (Exception e) {
            String msg = e.getMessage();
            return ResponseEntity.internalServerError().body(Map.of("error", "OCR失败：" + (msg != null ? msg : e.getClass().getSimpleName())));
        }
    }

    // 2) OCR + DeepSeekChat（AIHR对话）
    @PostMapping(value = "/chat-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> chatImage(@RequestPart("file") MultipartFile file,
                                       @RequestParam("userId") Long userId,
                                       @RequestParam("majorCode") String majorCode,
                                       @RequestParam(value = "question", required = false) String question) {
        try {
            OcrRecognizeResponse ocr = ocrService.recognize(file);
            if (ocr.getRawError() != null && !ocr.getRawError().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", ocr.getRawError()));
            }

            String userQuestion = (question == null || question.isBlank())
                    ? "请根据下方图片OCR内容，回答我的问题/给出解决方案。"
                    : question;

            String merged = userQuestion + "\n\n【图片OCR内容】\n" + ocr.getText();
            String answer = deepSeekChatServices.chatWithAI(userId, majorCode, merged);

            return ResponseEntity.ok(ChatWithOcrImageResponse.builder()
                    .ocrText(ocr.getText())
                    .answer(answer)
                    .build());
        } catch (IllegalArgumentException e) {
            String msg = e.getMessage();
            return ResponseEntity.badRequest().body(Map.of("error", msg != null ? msg : "参数错误"));
        } catch (Exception e) {
            String msg = e.getMessage();
            return ResponseEntity.internalServerError().body(Map.of("error", "图片对话失败：" + (msg != null ? msg : e.getClass().getSimpleName())));
        }
    }
}