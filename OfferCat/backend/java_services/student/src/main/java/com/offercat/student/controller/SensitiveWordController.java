package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.shared.sensitive.SensitiveWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 敏感词检测控制器
 * 提供敏感词检测和过滤服务
 */
@RestController
@RequestMapping("/api/sensitive")
@CrossOrigin(origins = "*")
public class SensitiveWordController {

    @Autowired
    private SensitiveWordService sensitiveWordService;

    /**
     * 检测文本是否包含敏感词
     * @param text 待检测文本
     * @return 检测结果
     */
    @PostMapping("/check")
    public ResponseResult<Map<String, Object>> checkSensitiveWord(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        Map<String, Object> result = new HashMap<>();
        
        boolean containsSensitive = sensitiveWordService.containsSensitiveWord(text);
        result.put("hasSensitive", containsSensitive);
        
        if (containsSensitive) {
            List<String> foundWords = sensitiveWordService.findAllSensitiveWords(text);
            result.put("foundWords", foundWords);
            result.put("replacement", sensitiveWordService.getReplacementText());
        }
        
        return ResponseResult.success(result);
    }

    /**
     * 检测并过滤文本（直接返回过滤后的结果）
     * @param text 待过滤文本
     * @return 过滤后的文本
     */
    @PostMapping("/filter")
    public ResponseResult<Map<String, Object>> filterText(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        Map<String, Object> result = new HashMap<>();
        
        boolean containsSensitive = sensitiveWordService.containsSensitiveWord(text);
        result.put("hasSensitive", containsSensitive);
        
        if (containsSensitive) {
            String replacement = sensitiveWordService.getReplacementText();
            result.put("filteredText", replacement);
            result.put("originalLength", text.length());
        } else {
            result.put("filteredText", text);
            result.put("originalLength", text.length());
        }
        
        return ResponseResult.success(result);
    }

    /**
     * 获取替换用的古诗
     * @return 两句随机古诗
     */
    @GetMapping("/poem")
    public ResponseResult<String> getReplacementPoem() {
        return ResponseResult.success(sensitiveWordService.getReplacementText());
    }
}