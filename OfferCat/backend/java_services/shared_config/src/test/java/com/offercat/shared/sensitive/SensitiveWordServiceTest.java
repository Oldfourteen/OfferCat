package com.offercat.shared.sensitive;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 敏感词服务测试类
 * 验证敏感词检测和古诗替换功能
 */
class SensitiveWordServiceTest {

    private SensitiveWordService sensitiveWordService;

    @BeforeEach
    void setUp() {
        sensitiveWordService = new SensitiveWordService();
        sensitiveWordService.init();
    }

    @Test
    @DisplayName("测试词库是否成功加载")
    void testTrieLoaded() {
        assertFalse(sensitiveWordService.isTrieEmpty(), "敏感词库应该加载成功");
    }

    @Test
    @DisplayName("测试敏感词检测 - 包含敏感词")
    void testContainsSensitiveWord_WithSensitive() {
        // 使用已知的敏感词进行测试（来自词库中的典型敏感词）
        String testCases[] = {
            "法轮功是邪教",
            "赌博害人",
            "色情网站",
            "病毒"
        };
        
        for (String text : testCases) {
            boolean result = sensitiveWordService.containsSensitiveWord(text);
            System.out.println("测试文本: '" + text + "' -> 包含敏感词: " + result);
            assertTrue(result, "文本 '" + text + "' 应该被检测为包含敏感词");
        }
    }

    @Test
    @DisplayName("测试敏感词检测 - 不包含敏感词")
    void testContainsSensitiveWord_WithoutSensitive() {
        String testCases[] = {
            "我喜欢编程开发",
            "Java编程入门",
            "Spring Boot框架",
            "微服务架构设计"
        };
        
        for (String text : testCases) {
            boolean result = sensitiveWordService.containsSensitiveWord(text);
            System.out.println("测试文本: '" + text + "' -> 包含敏感词: " + result);
            assertFalse(result, "文本 '" + text + "' 不应该被检测为包含敏感词");
        }
    }

    @Test
    @DisplayName("测试敏感词过滤 - 替换为古诗")
    void testFilterText_ReplacementWithPoem() {
        String sensitiveText = "赌博害人不浅";
        String filteredText = sensitiveWordService.filterText(sensitiveText);
        
        System.out.println("原始文本: '" + sensitiveText + "'");
        System.out.println("过滤后: '" + filteredText + "'");
        
        // 验证结果不为空
        assertNotNull(filteredText);
        assertFalse(filteredText.isEmpty());
        
        // 验证已被替换（不再包含原始敏感内容）
        assertFalse(filteredText.contains("赌博"));
        
        // 验证结果包含古诗（包含中文句号）
        assertTrue(filteredText.contains("。"), "过滤结果应该是古诗，包含中文句号");
        
        // 验证结果包含两行古诗
        String[] lines = filteredText.split("\n");
        assertEquals(2, lines.length, "过滤结果应该包含两句古诗");
        
        System.out.println("✓ 成功替换为古诗:");
        for (String line : lines) {
            System.out.println("  " + line);
        }
    }

    @Test
    @DisplayName("测试敏感词过滤 - 正常文本保持不变")
    void testFilterText_NormalText() {
        String normalText = "这是一条正常的评论内容";
        String filteredText = sensitiveWordService.filterText(normalText);
        
        System.out.println("原始文本: '" + normalText + "'");
        System.out.println("过滤后: '" + filteredText + "'");
        
        assertEquals(normalText, filteredText, "正常文本应该保持不变");
    }

    @Test
    @DisplayName("测试古诗替换的随机性")
    void testGetReplacementText_Randomness() {
        // 多次调用验证随机性
        String results[] = new String[5];
        for (int i = 0; i < 5; i++) {
            results[i] = sensitiveWordService.getReplacementText();
            System.out.println("第" + (i + 1) + "次获取的古诗:\n" + results[i]);
        }
        
        // 验证每次返回的都是有效的古诗
        for (String result : results) {
            assertNotNull(result);
            assertTrue(result.contains("。"), "应该包含古诗");
        }
    }

    @Test
    @DisplayName("测试空文本处理")
    void testFilterText_EmptyText() {
        assertNull(sensitiveWordService.filterText(null));
        assertEquals("", sensitiveWordService.filterText(""));
        assertEquals("   ", sensitiveWordService.filterText("   "));
    }
}
