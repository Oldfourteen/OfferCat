package com.offercat.ai._service.deepseek;

import com.offercat.ai._service.baidu.BaiduSearchService;
import com.offercat.ai._service.implement.OcrSpaceServiceImplement;
import com.offercat.ai.dao.AIMessageMapper;
import com.offercat.ai.dto.response.OcrRecognizeResponse;
import com.offercat.ai.entity.AiConsult;
import com.offercat.ai.infrastructure.common.AiChatMode;
import com.offercat.ai.infrastructure.common.MajorEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import okhttp3.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DeepSeekChatServices {

    @Value("${deepseek.api-key}")
    private String apiKey;

    @Value("${deepseek.base-url}")
    private String apiUrl;

    @Autowired
    private AIMessageMapper aiMessageMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private BaiduSearchService baiduSearchService;

    @Autowired
    private OcrSpaceServiceImplement ocrService;

    private final ExecutorService executor = Executors.newCachedThreadPool();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final OkHttpClient okHttpClient = new OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(120, TimeUnit.SECONDS)
            .build();

    // 从 resources/skills 目录下读取 Markdown prompt
    private String loadSkillPrompt(String skillFileName) {
        try {
            ClassPathResource resource = new ClassPathResource("skills/" + skillFileName);
            return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            return "你是一个专业的AI助手。";
        }
    }

    private String loadHRKnowledgeBase(String majorName) {
        StringBuilder sb = new StringBuilder();
        sb.append(loadSkillPrompt("skills/base/base-hr.md")).append("\n\n");
        sb.append(loadSkillPrompt("skills/base/interview-flow.md")).append("\n\n");
        sb.append(loadSkillPrompt("skills/policies/safety-policy.md")).append("\n\n");
        
        // 根据专业映射到具体的专业技能文件
        String majorFile = "skills/majors/major-software-engineering.md"; // 默认
        if (majorName != null) {
            if (majorName.contains("计算机")) majorFile = "skills/majors/major-cs.md";
            else if (majorName.contains("软件")) majorFile = "skills/majors/major-software-engineering.md";
            else if (majorName.contains("数据") || majorName.contains("大数据")) majorFile = "skills/majors/major-data-science-bigdata.md";
            else if (majorName.contains("会计")) majorFile = "skills/majors/major-accounting.md";
            else if (majorName.contains("营销")) majorFile = "skills/majors/major-marketing.md";
            else if (majorName.contains("法学")) majorFile = "skills/majors/major-law.md";
            else if (majorName.contains("电气")) majorFile = "skills/majors/major-ee.md";
            else if (majorName.contains("英语")) majorFile = "skills/majors/major-english.md";
            else if (majorName.contains("临床") || majorName.contains("医学")) majorFile = "skills/majors/major-clinical-medicine.md";
            else if (majorName.contains("金融")) majorFile = "skills/majors/major-finance.md";
        }
        
        sb.append(loadSkillPrompt(majorFile)).append("\n\n");
        
        // 追加阶段性规则和输出模板
        sb.append(loadSkillPrompt("skills/stages/stage-hr.md")).append("\n\n");
        sb.append(loadSkillPrompt("skills/stages/stage-project-deepdive.md")).append("\n\n");
        sb.append(loadSkillPrompt("skills/stages/stage-star-behavior.md")).append("\n\n");
        sb.append(loadSkillPrompt("skills/outputs/output-scorecard.md")).append("\n\n");

        return sb.toString().replace("{{majorName}}", majorName != null ? majorName : "通用");
    }

    // 兼容旧接口：默认 AIHR
    public String chatWithAI(Long userId, String majorCode, String userQuestion){
        return chatWithAI(userId, majorCode, "AIHR", userQuestion, null);
    }

    // 新接口：按 mode 切换 prompt
    public String chatWithAI(Long userId, String majorCode, String modeStr, String userQuestion, List<String> userImages){
        String majorName = MajorEnum.getNameByCode(majorCode);

        AiChatMode mode = AiChatMode.from(modeStr);
        String systemPrompt;
        
        if (mode == AiChatMode.AIHR) {
            systemPrompt = loadHRKnowledgeBase(majorName);
        } else {
            String skillFile = switch (mode) {
                case RESUME_POLISH -> "resume_polish.md";
                case GROUP_INTERVIEW -> "group_interview.md";
                case JOB_MATCH -> "job_match.md";
                case SPRING_CAMP -> "spring_camp.md";
                default -> "hr_consultant.md";
            };
            String skillTemplate = loadSkillPrompt(skillFile);
            systemPrompt = skillTemplate.replace("{{majorName}}", majorName);
        }

        // 如果是 SPRING_CAMP 模式，调用百度联网搜索获取实时背景
        if (mode == AiChatMode.SPRING_CAMP) {
                    String searchQuery = "2026年 招聘 冲刺 备考 建议 " + majorName + "专业";
                    String searchContext = baiduSearchService.searchForContext(searchQuery);
                    systemPrompt = systemPrompt.replace("{{searchContext}}", searchContext);
                }

                String finalUserQuestion = userQuestion;
                // 处理 OCR 逻辑
                if (userImages != null && !userImages.isEmpty()) {
                    StringBuilder ocrTextBuilder = new StringBuilder();
                    for (String imageUrl : userImages) {
                        try {
                            String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
                            File file = new File("D:/offercat/photo", fileName);
                            if (file.exists()) {
                                String mimeType = "image/jpeg";
                                if (fileName.endsWith(".png")) mimeType = "image/png";
                                else if (fileName.endsWith(".webp")) mimeType = "image/webp";
                                
                                String base64Image = Base64.getEncoder().encodeToString(Files.readAllBytes(file.toPath()));
                                String fullImageUrl = "data:" + mimeType + ";base64," + base64Image;
                                
                                OcrRecognizeResponse ocrRes = ocrService.recognizeByBase64(fullImageUrl);
                                if (ocrRes != null) {
                                    if (ocrRes.getText() != null && !ocrRes.getText().isEmpty()) {
                                        ocrTextBuilder.append(ocrRes.getText()).append("\\n");
                                    } else if (ocrRes.getRawError() != null) {
                                        log.error("OCR API 错误: {}", ocrRes.getRawError());
                                        ocrTextBuilder.append("图片识别失败: ").append(ocrRes.getRawError()).append("\\n");
                                    }
                                }
                            }
                        } catch (Exception e) {
                            log.error("OCR 处理图片失败", e);
                        }
                    }
                    
                    if (ocrTextBuilder.length() > 0) {
                        String baseQuestion = userQuestion;
                        if (baseQuestion != null && baseQuestion.contains("[图片]")) {
                            baseQuestion = baseQuestion.replace("[图片]", "请帮我分析和润色以下图片中的简历内容：");
                        }
                        finalUserQuestion = baseQuestion + "\n\n【系统已自动通过OCR提取图片文字，内容如下】：\n" + ocrTextBuilder.toString().replace("\\n", "\n");
                    }
                }

                Map<String, Object> requestBody = new HashMap<>();
                requestBody.put("model", "deepseek-chat");

                List<Map<String, String>> messages = new ArrayList<>();
                messages.add(Map.of("role", "system", "content", systemPrompt != null ? systemPrompt : ""));
                messages.add(Map.of("role", "user", "content", finalUserQuestion != null ? finalUserQuestion : ""));
        requestBody.put("messages",messages);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
        httpHeaders.setBearerAuth(apiKey);

        HttpEntity<Map<String,Object>> entity = new HttpEntity<>(requestBody, httpHeaders);

        try{
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "/v1/chat/completions",entity,Map.class);

            List choices = (List) response.getBody().get("choices");
            Map choice = (Map) choices.get(0);
            Map message = (Map) choice.get("message");
            String aiAnswer = (String) message.get("content");

            // 持久化（你原逻辑保留）
            AiConsult aiConsult = new AiConsult();
            aiConsult.setUserId(userId);
            aiConsult.setUserContent("[" + mode.name() + "] " + userQuestion);
            aiConsult.setAiContent(aiAnswer);
            if (userImages != null && !userImages.isEmpty()) {
                aiConsult.setUserImages(objectMapper.writeValueAsString(userImages));
            }
            aiConsult.setCreateTime(LocalDateTime.now());
            aiMessageMapper.insertConsult(aiConsult);

            return aiAnswer;
        }catch (Exception e){
            return "AI 暂时无法回答：" + e.getMessage();
        }
    }

    public void streamChatWithAI(Long userId, String majorCode, String modeStr, String userQuestion, List<String> userImages, SseEmitter emitter) {
        executor.submit(() -> {
            StringBuilder fullAnswer = new StringBuilder();
            try {
                String majorName = MajorEnum.getNameByCode(majorCode);
                AiChatMode mode = AiChatMode.from(modeStr);
                String systemPrompt;
                
                if (mode == AiChatMode.AIHR) {
                    systemPrompt = loadHRKnowledgeBase(majorName);
                } else {
                    String skillFile = switch (mode) {
                        case RESUME_POLISH -> "resume_polish.md";
                        case GROUP_INTERVIEW -> "group_interview.md";
                        case JOB_MATCH -> "job_match.md";
                        case SPRING_CAMP -> "spring_camp.md";
                        default -> "hr_consultant.md";
                    };
                    String skillTemplate = loadSkillPrompt(skillFile);
                    systemPrompt = skillTemplate.replace("{{majorName}}", majorName);
                }

                // 流式请求中如果是 SPRING_CAMP 模式，调用百度联网搜索获取实时背景
                if (mode == AiChatMode.SPRING_CAMP) {
                    // 通知前端正在搜索（可选，部分前端如果没做特殊处理，直接显示字即可）
                    try {
                        emitter.send(SseEmitter.event().data("正在为你联网搜索最新的" + majorName + "专业招聘资讯...\\n\\n"));
                    } catch (Exception ignored) {}
                    
                    String searchQuery = "2026年 招聘 冲刺 备考 建议 " + majorName + "专业";
                    String searchContext = baiduSearchService.searchForContext(searchQuery);
                    systemPrompt = systemPrompt.replace("{{searchContext}}", searchContext);
                }

                String finalUserQuestion = userQuestion;
                // 处理 OCR 逻辑
                if (userImages != null && !userImages.isEmpty()) {
                    try {
                        emitter.send(SseEmitter.event().data("正在提取图片内容，请稍候...\\n\\n"));
                    } catch (Exception ignored) {}
                    
                    StringBuilder ocrTextBuilder = new StringBuilder();
                    for (String imageUrl : userImages) {
                        try {
                            String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
                            File file = new File("D:/offercat/photo", fileName);
                            if (file.exists()) {
                                String mimeType = "image/jpeg";
                                if (fileName.endsWith(".png")) mimeType = "image/png";
                                else if (fileName.endsWith(".webp")) mimeType = "image/webp";
                                
                                String base64Image = Base64.getEncoder().encodeToString(Files.readAllBytes(file.toPath()));
                                String fullImageUrl = "data:" + mimeType + ";base64," + base64Image;
                                
                                OcrRecognizeResponse ocrRes = ocrService.recognizeByBase64(fullImageUrl);
                                if (ocrRes != null) {
                                    if (ocrRes.getText() != null && !ocrRes.getText().isEmpty()) {
                                        ocrTextBuilder.append(ocrRes.getText()).append("\\n");
                                    } else if (ocrRes.getRawError() != null) {
                                        log.error("OCR API 错误: {}", ocrRes.getRawError());
                                        ocrTextBuilder.append("图片识别失败: ").append(ocrRes.getRawError()).append("\\n");
                                    }
                                }
                            }
                        } catch (Exception e) {
                            log.error("OCR 处理图片失败", e);
                        }
                    }
                    
                    if (ocrTextBuilder.length() > 0) {
                        String baseQuestion = userQuestion;
                        if (baseQuestion != null && baseQuestion.contains("[图片]")) {
                            baseQuestion = baseQuestion.replace("[图片]", "请帮我分析和润色以下图片中的简历内容：");
                        }
                        finalUserQuestion = baseQuestion + "\n\n【系统已自动通过OCR提取图片文字，内容如下】：\n" + ocrTextBuilder.toString().replace("\\n", "\n");
                    }
                }

                Map<String, Object> requestBody = new HashMap<>();
                requestBody.put("model", "deepseek-chat");
                requestBody.put("stream", true);

                String currentSystemPrompt = systemPrompt;
                String currentUserQuestion = finalUserQuestion;

                List<Map<String, String>> messages = new ArrayList<>();
                messages.add(Map.of("role", "system", "content", currentSystemPrompt != null ? currentSystemPrompt : ""));
                messages.add(Map.of("role", "user", "content", currentUserQuestion != null ? currentUserQuestion : ""));
                requestBody.put("messages", messages);

                String jsonBody = objectMapper.writeValueAsString(requestBody);
                RequestBody okhttpBody = RequestBody.create(jsonBody, okhttp3.MediaType.parse("application/json"));

                Request request = new Request.Builder()
                        .url(apiUrl + "/v1/chat/completions")
                        .addHeader("Authorization", "Bearer " + apiKey)
                        .addHeader("Accept", "text/event-stream")
                        .post(okhttpBody)
                        .build();

                try (Response response = okHttpClient.newCall(request).execute()) {
                    if (!response.isSuccessful()) {
                        emitter.send(SseEmitter.event().data("[ERROR] API请求失败: " + response.code()));
                        emitter.complete();
                        return;
                    }

                    if (response.body() == null) {
                        emitter.send(SseEmitter.event().data("[ERROR] API返回为空"));
                        emitter.complete();
                        return;
                    }

                    try (BufferedReader reader = new BufferedReader(new InputStreamReader(response.body().byteStream(), StandardCharsets.UTF_8))) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                            if (line.isEmpty()) {
                                continue;
                            }
                            if (line.startsWith("data: ")) {
                                String data = line.substring(6);
                                if ("[DONE]".equals(data)) {
                                    break;
                                }
                                try {
                                    JsonNode jsonNode = objectMapper.readTree(data);
                                    JsonNode choicesNode = jsonNode.path("choices");
                                    if (choicesNode.isArray() && !choicesNode.isEmpty()) {
                                        JsonNode deltaNode = choicesNode.get(0).path("delta");
                                        if (deltaNode.has("content")) {
                                            String content = deltaNode.get("content").asText();
                                            fullAnswer.append(content);
                                            // 替换换行为特定的标识或者转义，避免SSE截断
                                            String safeContent = content.replace("\n", "\\n");
                                            emitter.send(SseEmitter.event().data(safeContent));
                                        }
                                    }
                                } catch (Exception e) {
                                    // ignore parse error
                                }
                            }
                        }
                    }
                }

                try {
                    AiConsult aiConsult = new AiConsult();
                    aiConsult.setUserId(userId);
                    aiConsult.setUserContent("[" + mode.name() + "] " + userQuestion);
                    aiConsult.setAiContent(fullAnswer.toString());
                    if (userImages != null && !userImages.isEmpty()) {
                        aiConsult.setUserImages(objectMapper.writeValueAsString(userImages));
                    }
                    aiConsult.setCreateTime(LocalDateTime.now());
                    aiMessageMapper.insertConsult(aiConsult);
                } catch (Exception dbEx) {
                    System.err.println("记录对话到数据库失败: " + dbEx.getMessage());
                }

                emitter.send(SseEmitter.event().data("[DONE]"));
                emitter.complete();
            } catch (Exception e) {
                try {
                    emitter.send(SseEmitter.event().data("[ERROR] 发生异常: " + e.getMessage()));
                    emitter.completeWithError(e);
                } catch (Exception ignored) {
                }
            }
        });
    }

    public List<AiConsult> getHistoryByUserId(Long userId) {
        return aiMessageMapper.selectHistoryByUserId(userId);
    }
}