package com.offercat.service;

import com.offercat.dao.AIMessageMapper;
import com.offercat.entity.AiConsult;
import com.offercat.infrastructure.common.MajorEnum;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: Ofteen
 * @data: 2026/4/17 - 19:42
 * @mail: oldfourteen41@gmail.com
 * @info: DeepSeekChat的服务层，进行事件处理相关内容，包括
 */

@Service
public class DeepSeekChatServices {
    @Value("${deepseek.api-key}")
    private String apiKey;
    @Value("${deepseek.base-url}")
    private String apiUrl;

    @Autowired
    private AIMessageMapper aiMessageMapper;

    private final RestTemplate restTemplate = new RestTemplate();

    //从 resources/skills 目录下读取 Markdown 格式的 Skill 定义
    private String loadSkillPrompt(String skillFileName) {
        try {
            ClassPathResource resource = new ClassPathResource("skills/" + skillFileName);
            return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            return "你是一个专业的AI助手。";
        }
    }

    public String chatWithAI(Long userId, String majorCode, String userQuestion){
        // 1. 获取专业名并从 Markdown 文件加载 Skill Prompt
        String majorName = MajorEnum.getNameByCode(majorCode);
        String skillTemplate = loadSkillPrompt("hr_consultant.md");
        String systemPrompt = String.format(skillTemplate, majorName);


        //组装发给DeepSeek的请求体
        Map<String,Object> requestBody = new HashMap<>();
        requestBody.put("model","deepseek-chat");

        List<Map<String,String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", systemPrompt));
        messages.add(Map.of("role","user","content", userQuestion));
        requestBody.put("messages",messages);

        //设置HTTP 请求头
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.setBearerAuth(apiKey);

        HttpEntity<Map<String,Object>> entity = new HttpEntity<>(requestBody, httpHeaders);

        try{
            //发送请求并接收结果
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "/v1/chat/completions",entity,Map.class);

            //解析结果 DeepSeek返回的JSON格式的结果中提取内容
            List choices = (List) response.getBody().get("choices");
            Map choice = (Map) choices.get(0);
            Map message = (Map) choice.get("message");
            String aiAnswer = (String) message.get("content");

            //使用Entity中的javabean类持久化到服务器上的MySQL数据库中永久存储数据
            AiConsult aiConsult = new AiConsult();
            aiConsult.setUserId(userId);
            aiConsult.setUserContent(userQuestion);
            aiConsult.setAiContent(aiAnswer);
            aiConsult.setCreateTime(LocalDateTime.now());
            aiMessageMapper.insertConsult(aiConsult);

            return aiAnswer;

        }catch (Exception e){
            return "AIHR 暂时无法回答：" + e.getMessage();
        }
    }
}
