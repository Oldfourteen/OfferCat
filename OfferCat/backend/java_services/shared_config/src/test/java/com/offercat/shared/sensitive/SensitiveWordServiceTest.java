package com.offercat.shared.sensitive;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

public class SensitiveWordServiceTest {
    private SensitiveWordService service;

    @BeforeEach
    public void setUp() {
        service = new SensitiveWordService();
        service.init();
    }

    @Test
    public void testStatus() {
        System.out.println("=== 敏感词服务状态测试 ===");
        var stats = service.getLoadStats();
        System.out.println("加载词数: " + stats.get("totalWords"));
        System.out.println("字典树为空: " + stats.get("trieEmpty"));
        System.out.println("词库文件数: " + stats.get("vocabularyFiles"));
    }

    @Test
    public void testContainsSensitiveWord() {
        System.out.println("\n=== 测试敏感词检测 ===");
        
        // 政治敏感词
        boolean result1 = service.containsSensitiveWord("习近平");
        System.out.println("'习近平'检测结果: " + result1);
        assertTrue(result1);
        
        boolean result2 = service.containsSensitiveWord("温家宝");
        System.out.println("'温家宝'检测结果: " + result2);
        assertTrue(result2);
    }
    
    @Test
    public void testGetReplacementText() {
        System.out.println("\n=== 测试古诗替换 ===");
        String poem = service.getReplacementText();
        System.out.println("随机古诗:");
        System.out.println(poem);
        assertNotNull(poem);
        assertFalse(poem.isEmpty());
    }
}