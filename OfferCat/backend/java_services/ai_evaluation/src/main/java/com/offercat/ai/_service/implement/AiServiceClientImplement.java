package com.offercat.ai._service.implement;

import com.offercat.ai._service.AiServiceClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * AI服务客户端实现类
 * 功能：实现与AI服务的交互逻辑
 */
@Slf4j
@Service
public class AiServiceClientImplement implements AiServiceClient {

    @Value("${deepseek.api-key}")
    private String apiKey;
    
    @Value("${deepseek.base-url}")
    private String apiUrl;

    @Value("${deepseek.model:deepseek-chat}")
    private String deepseekModel;
    
    @Autowired
    private RestTemplate restTemplate;

    /*
     * 生成简历
     * 输入：目标岗位、学生信息
     * 输出：生成的简历内容
     * 实现：调用DeepSeek API生成简历
     */
    @Override
    public String generateResume(String targetPosition, String studentInfo) {
        log.info("生成简历 - 目标岗位: {}, 学生信息: {}", targetPosition, studentInfo);
        
        String prompt = String.format(
            "请根据以下学生信息，为%s岗位生成一份专业的简历：\n\n学生信息：%s\n\n简历应包含：个人信息、教育背景、技能、项目经历、自我评价等部分。",
            targetPosition, studentInfo
        );
        
        return callDeepSeekAPI(prompt, "你是一位专业的简历撰写专家，擅长根据学生背景和目标岗位生成针对性的简历");
    }

    /*
     * 诊断简历
     * 输入：简历内容、目标岗位
     * 输出：诊断结果
     * 实现：调用DeepSeek API诊断简历
     */
    @Override
    public String diagnoseResume(String resumeContent, String targetPosition) {
        log.info("诊断简历 - 目标岗位: {}", targetPosition);
        
        String prompt = String.format(
            "请诊断以下简历，针对%s岗位给出专业的评估和建议：\n\n简历内容：%s\n\n诊断报告应包含：评分、优势、不足、具体改进建议等部分。",
            targetPosition, resumeContent
        );
        
        return callDeepSeekAPI(prompt, "你是一位专业的简历顾问，擅长评估简历并提供针对性的改进建议");
    }

    /*
     * 润色简历
     * 输入：简历内容
     * 输出：润色后的简历文本
     * 实现：调用DeepSeek API润色简历
     */
    @Override
    public String polishResume(String resumeContent) {
        log.info("润色简历 - 开始");
        
        String prompt = String.format(
            "请仔细阅读以下简历内容，对其进行润色和优化：\n\n简历内容：%s\n\n要求：\n1. 语言表达更专业、精炼\n2. 突出成就和量化结果\n3. 结构清晰，排版规整\n4. 直接输出润色后的简历文本，不要有多余的解释和前言。",
            resumeContent
        );
        
        return callDeepSeekAPI(prompt, "你是一位资深简历优化顾问，擅长为求职者润色简历，使其更具吸引力。");
    }

    /*
     * 评估答案
     * 输入：题目、用户答案、核心要点
     * 输出：评估结果
     * 实现：调用DeepSeek API评估答案
     */
    @Override
    public String evaluateAnswer(String question, String answer, String keyPoints) {
        log.info("评估答案 - 题目: {}", question);
        
        String prompt = String.format(
            "请评估以下面试答案：\n\n面试题目：%s\n\n用户答案：%s\n\n核心要点：%s\n\n评估应包含：评分、优势、不足、改进建议等部分。",
            question, answer, keyPoints
        );
        
        return callDeepSeekAPI(prompt, "你是一位专业的面试评估专家，擅长评估面试答案并提供详细的反馈");
    }

    /*
     * 生成面试报告
     * 输入：会话ID、答案记录
     * 输出：面试报告内容
     * 实现：调用DeepSeek API生成面试报告
     */
    @Override
    public String generateInterviewReport(Long sessionId, Object answerRecords) {
        log.info("生成面试报告 - 会话ID: {}", sessionId);
        
        String prompt = String.format(
            "请根据面试会话ID %d的答题记录，生成一份详细的面试评估报告。\n\n答题记录：%s\n\n报告应包含：综合评分、优势分析、不足之处、职业建议等部分。",
            sessionId, answerRecords != null ? answerRecords.toString() : "无"
        );
        
        return callDeepSeekAPI(prompt, "你是一位专业的面试评估专家，擅长分析面试表现并生成详细的评估报告");
    }
    
    /*
     * 生成面试题目
     * 输入：目标岗位、题目数量
     * 输出：题目列表
     */
    public String generateQuestions(String prompt) {
        return callDeepSeekAPI(prompt, "你是一位专业的面试官，擅长根据岗位需求生成针对性的面试题目");
    }
    
    /*
     * 生成练习建议
     * 输入：练习数据（包含练习次数、平均分、最高分等）
     * 输出：练习建议内容
     * 实现：调用DeepSeek API生成练习建议
     */
    @Override
    public String generatePracticeAdvice(String practiceData) {
        log.info("生成练习建议 - 数据: {}", practiceData);
        
        String prompt = String.format(
            "请根据以下用户的做题数据情况，给出一段针对性的复盘和练习建议：\n\n做题数据：%s\n\n要求：\n1. 字数在100字到200字之间\n2. 语气鼓励且专业\n3. 包含对目前状态的分析和后续改进的方向\n4. 直接输出建议文本，不要有多余的解释和前言。",
            practiceData
        );
        
        return callDeepSeekAPI(prompt, "你是一位专业的学习规划师，擅长根据用户的做题数据提供复盘分析和学习建议。");
    }
    
    /*
     * 调用DeepSeek API
     * 输入：用户提示、系统提示
     * 输出：API响应结果
     */
    private String callDeepSeekAPI(String userPrompt, String systemPrompt) {
        try {
            // 组装请求体
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", deepseekModel);
            
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", systemPrompt));
            messages.add(Map.of("role", "user", "content", userPrompt));
            requestBody.put("messages", messages);
            
            // 设置HTTP请求头
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
            httpHeaders.setBearerAuth(apiKey);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, httpHeaders);
            
            // 发送请求并接收结果
            ResponseEntity<Map> response = restTemplate.postForEntity(
                apiUrl + "/v1/chat/completions", 
                entity, 
                Map.class
            );
            
            // 解析结果
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null) {
                List choices = (List) responseBody.get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map choice = (Map) choices.get(0);
                    Map message = (Map) choice.get("message");
                    return (String) message.get("content");
                }
            }
            
            return "API响应解析失败";
            
        } catch (Exception e) {
            log.error("调用DeepSeek API失败", e);
            return "AI服务暂时不可用：" + e.getMessage();
        }
    }
}