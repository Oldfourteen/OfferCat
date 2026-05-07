package com.offercat.radar.service;

import com.offercat.radar.dto.request.SurveyRequest;
import com.offercat.radar.dto.response.SurveyResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 调查问卷评分服务测试
 * 功能：验证评分计算逻辑是否正确
 */
@SpringBootTest
class SurveyScoringServiceTest {

    @Autowired
    private SurveyScoringService surveyScoringService;

    @Test
    void testCalculateScore() {
        // 创建测试请求
        SurveyRequest request = new SurveyRequest();
        request.setStudentId(1L);
        
        // 创建答案映射（示例答案）
        Map<Integer, String> answers = new HashMap<>();
        // 第一部分：专业知识与学习（8题）
        answers.put(1, "A");
        answers.put(2, "A");
        answers.put(3, "A");
        answers.put(4, "A");
        answers.put(5, "A");
        answers.put(6, "A");
        answers.put(7, "A");
        answers.put(8, "A");
        // 第二部分：实践与实习（8题）
        answers.put(9, "A");
        answers.put(10, "A");
        answers.put(11, "A");
        answers.put(12, "A");
        answers.put(13, "A");
        answers.put(14, "A");
        answers.put(15, "A");
        answers.put(16, "A");
        // 第三部分：成果与荣誉（6题）
        answers.put(17, "A");
        answers.put(18, "A");
        answers.put(19, "A");
        answers.put(20, "A");
        answers.put(21, "A");
        answers.put(22, "A");
        // 第四部分：软技能与职业素养（8题）
        answers.put(23, "A");
        answers.put(24, "A");
        answers.put(25, "A");
        answers.put(26, "A");
        answers.put(27, "A");
        answers.put(28, "A");
        answers.put(29, "A");
        answers.put(30, "A");
        // 第五部分：抗压与执行力（6题）
        answers.put(31, "A");
        answers.put(32, "A");
        answers.put(33, "A");
        answers.put(34, "A");
        answers.put(35, "A");
        answers.put(36, "A");
        // 第六部分：有效性检测（4题）
        answers.put(37, "C");
        answers.put(38, "D");
        answers.put(39, "D");
        answers.put(40, "A");
        
        request.setAnswers(answers);
        
        // 计算分数
        SurveyResponse response = surveyScoringService.calculateScore(request);
        
        // 验证结果
        assertNotNull(response);
        assertEquals(1L, response.getStudentId());
        
        // 验证分数范围（0-16分）
        assertTrue(response.getD1() >= 0 && response.getD1() <= 16);
        assertTrue(response.getD2() >= 0 && response.getD2() <= 16);
        assertTrue(response.getD3() >= 0 && response.getD3() <= 16);
        assertTrue(response.getD4() >= 0 && response.getD4() <= 16);
        assertTrue(response.getD5() >= 0 && response.getD5() <= 16);
        assertTrue(response.getD6() >= 0 && response.getD6() <= 16);
        assertTrue(response.getD7() >= 0 && response.getD7() <= 16);
        
        System.out.println("测试通过！计算结果：");
        System.out.println("D1: " + response.getD1());
        System.out.println("D2: " + response.getD2());
        System.out.println("D3: " + response.getD3());
        System.out.println("D4: " + response.getD4());
        System.out.println("D5: " + response.getD5());
        System.out.println("D6: " + response.getD6());
        System.out.println("D7: " + response.getD7());
    }
}
