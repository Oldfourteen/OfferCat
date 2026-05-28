package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.shared.sensitive.SensitiveWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sensitive")
@CrossOrigin(origins = "*")
public class SensitiveWordController {

    @Autowired
    private SensitiveWordService sensitiveWordService;

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

    @GetMapping("/poem")
    public ResponseResult<String> getReplacementPoem() {
        return ResponseResult.success(sensitiveWordService.getReplacementText());
    }
    
    @PostMapping("/test")
    public ResponseResult<Map<String, Object>> testSensitiveMatch(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        Map<String, Object> result = new HashMap<>();
        
        boolean containsSensitive = sensitiveWordService.containsSensitiveWord(text);
        List<String> foundWords = sensitiveWordService.findAllSensitiveWords(text);
        
        result.put("inputText", text);
        result.put("hasSensitive", containsSensitive);
        result.put("foundWords", foundWords);
        result.put("foundCount", foundWords.size());
        
        if (containsSensitive) {
            result.put("replacement", sensitiveWordService.getReplacementText());
        }
        
        return ResponseResult.success(result);
    }
    
    @GetMapping("/status")
    public ResponseResult<Map<String, Object>> getStatus() {
        return ResponseResult.success(sensitiveWordService.getLoadStats());
    }
    
    @PostMapping("/reload")
    public ResponseResult<Map<String, Object>> reload() {
        sensitiveWordService.reload();
        return ResponseResult.success(sensitiveWordService.getLoadStats());
    }
}
