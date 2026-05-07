package com.offercat.ai.controller;

import com.offercat.ai.dto.request.QuestionBankRequest;
import com.offercat.ai.dto.request.SubmitAnswerRequest;
import com.offercat.ai.dto.response.QuestionBankResponse;
import com.offercat.ai.dto.response.SubmitAnswerResponse;
import com.offercat.ai.service.QuestionBankService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 题库控制器
 */
@RestController
@RequestMapping("/api/question-bank")
@RequiredArgsConstructor
public class QuestionBankController {

    private final QuestionBankService questionBankService;

    /**
     * 获取所有专业
     */
    @GetMapping("/subjects")
    public ResponseEntity<Map<String, Object>> getAllSubjects() {
        List<String> subjects = questionBankService.getAllSubjects();
        Map<String, Object> result = new HashMap<>();
        result.put("data", subjects);
        result.put("message", "获取专业列表成功");
        return ResponseEntity.ok(result);
    }
    /**
     * 获取题目
     */
    @PostMapping("/questions")
    public ResponseEntity<QuestionBankResponse> getQuestions(@RequestBody QuestionBankRequest request) {
        QuestionBankResponse response = questionBankService.getQuestions(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 提交答案
     */
    @PostMapping("/submit")
    public ResponseEntity<SubmitAnswerResponse> submitAnswer(@RequestBody SubmitAnswerRequest request) {
        SubmitAnswerResponse response = questionBankService.submitAnswer(request);
        return ResponseEntity.ok(response);
    }
    /**
     * 生成PDF
     */
    @PostMapping("/pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody QuestionBankRequest request) {
        byte[] pdfBytes = questionBankService.generatePdf(request);
        if (pdfBytes != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            String fileName = (request.getSubject() != null ? request.getSubject() : "通用") + 
                    "_题库" + (request.getQuestionType() != null ? "-类型" + request.getQuestionType() : "") + ".pdf";
            headers.setContentDispositionFormData("attachment", fileName);
            headers.setContentLength(pdfBytes.length);
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    /**
     * 初始化题库
     */
    @PostMapping("/init")
    public ResponseEntity<Map<String, Object>> initializeQuestionBank() {
        questionBankService.initializeQuestionBank();
        Map<String, Object> result = new HashMap<>();
        result.put("message", "题库初始化完成");
        return ResponseEntity.ok(result);
    }
}
