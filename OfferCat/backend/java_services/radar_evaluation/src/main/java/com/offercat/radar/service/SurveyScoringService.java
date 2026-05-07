package com.offercat.radar.service;

import com.offercat.radar.dto.request.SurveyRequest;
import com.offercat.radar.dto.response.SurveyResponse;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * 调查问卷评分服务
 * 功能：根据用户答案计算七个维度的分数
 * 实现：使用评分映射表计算分数，并应用0-16分的范围限制
 */
@Service
public class SurveyScoringService {

    // 评分映射表：题目编号 -> 选项 -> 分数数组[d1, d2, d3, d4, d5, d6, d7]
    private final Map<Integer, Map<String, int[]>> scoringMap;

    public SurveyScoringService() {
        scoringMap = new HashMap<>();
        initializeScoringMap();
    }

    /**
     * 初始化评分映射表
     */
    private void initializeScoringMap() {
        // 第一部分：专业知识与学习（8题）
        scoringMap.put(1, Map.of(
                "A", new int[]{8, 4, 2, 6, 0, 2, 2},
                "B", new int[]{4, 2, 0, 3, 0, 0, 0},
                "C", new int[]{0, 0, 0, -2, -1, -2, -2},
                "D", new int[]{-6, -4, -2, -5, -2, -4, -3}
        ));
        scoringMap.put(2, Map.of(
                "A", new int[]{6, 4, 2, 2, 3, 3, 4},
                "B", new int[]{3, 2, 1, 1, 1, 1, 2},
                "C", new int[]{0, 0, 0, 0, -1, 0, -1},
                "D", new int[]{-5, -3, -2, -2, -3, -2, -4}
        ));
        scoringMap.put(3, Map.of(
                "A", new int[]{5, 2, 1, 0, 2, 6, 2},
                "B", new int[]{2, 0, 0, 0, 0, 3, 0},
                "C", new int[]{0, -1, 0, 0, -1, -1, -2},
                "D", new int[]{-3, -2, -2, -1, -2, -5, -3}
        ));
        scoringMap.put(4, Map.of(
                "A", new int[]{3, 2, 0, 1, 5, 2, 1},
                "B", new int[]{1, 0, 0, 0, 2, 0, 0},
                "C", new int[]{0, -1, 0, 0, -1, -1, -1},
                "D", new int[]{-2, -2, 0, -1, -4, -2, -2}
        ));
        scoringMap.put(5, Map.of(
                "A", new int[]{2, 2, 0, 0, 3, 6, 1},
                "B", new int[]{1, 0, 0, 0, 1, 3, 0},
                "C", new int[]{0, 0, 0, 0, 0, 1, 0},
                "D", new int[]{-2, -1, -1, 0, -2, -4, -2}
        ));
        scoringMap.put(6, Map.of(
                "A", new int[]{4, 1, 2, 8, 0, 1, 2},
                "B", new int[]{2, 0, 0, 4, 0, 0, 0},
                "C", new int[]{0, 0, 0, 0, -1, -1, -1},
                "D", new int[]{-4, -2, -2, -6, -2, -2, -3}
        ));
        scoringMap.put(7, Map.of(
                "A", new int[]{2, 1, 0, 3, 1, 0, 2},
                "B", new int[]{-2, -1, 0, -2, -1, -1, -1},
                "C", new int[]{-5, -2, -1, -4, -2, -2, -3},
                "D", new int[]{-8, -4, -2, -6, -3, -3, -5}
        ));
        scoringMap.put(8, Map.of(
                "A", new int[]{5, 2, 6, 4, 1, 2, 2},
                "B", new int[]{3, 1, 4, 2, 0, 1, 1},
                "C", new int[]{1, 0, 2, 1, 0, 0, 0},
                "D", new int[]{0, 0, 0, -1, -1, -1, -1}
        ));

        // 第二部分：实践与实习（8题）
        scoringMap.put(9, Map.of(
                "A", new int[]{3, 8, 1, 2, 4, 6, 4},
                "B", new int[]{2, 6, 0, 1, 2, 4, 2},
                "C", new int[]{0, 2, 0, 0, 1, 1, 0},
                "D", new int[]{-3, -6, -2, -2, -3, -5, -3}
        ));
        scoringMap.put(10, Map.of(
                "A", new int[]{4, 6, 2, 0, 2, 2, 3},
                "B", new int[]{2, 4, 1, 0, 1, 1, 2},
                "C", new int[]{0, 2, 0, 0, 0, 0, 0},
                "D", new int[]{-4, -6, -2, -1, -2, -2, -3}
        ));
        scoringMap.put(11, Map.of(
                "A", new int[]{2, 6, 1, 0, 6, 2, 5},
                "B", new int[]{3, 4, 0, 0, 2, 1, 3},
                "C", new int[]{0, 2, 0, 0, 0, 0, 0},
                "D", new int[]{-2, -4, -2, 0, -3, -2, -3}
        ));
        scoringMap.put(12, Map.of(
                "A", new int[]{2, 7, 1, 0, 2, 5, 3},
                "B", new int[]{1, 4, 0, 0, 1, 2, 1},
                "C", new int[]{0, 1, 0, 0, 0, 0, 0},
                "D", new int[]{-2, -4, -1, 0, -2, -3, -2}
        ));
        scoringMap.put(13, Map.of(
                "A", new int[]{1, 4, 0, 0, 6, 2, 3},
                "B", new int[]{0, 2, 0, 0, 3, 1, 1},
                "C", new int[]{0, 0, 0, 0, 1, 0, 0},
                "D", new int[]{-2, -2, -1, 0, -4, -1, -2}
        ));
        scoringMap.put(14, Map.of(
                "A", new int[]{4, 7, 3, 1, 2, 3, 4},
                "B", new int[]{2, 4, 1, 0, 1, 1, 2},
                "C", new int[]{0, 2, 0, 0, 0, 0, 0},
                "D", new int[]{-3, -5, -2, -1, -2, -2, -3}
        ));
        scoringMap.put(15, Map.of(
                "A", new int[]{5, 6, 1, 0, 1, 4, 2},
                "B", new int[]{2, 3, 0, 0, 0, 2, 1},
                "C", new int[]{0, 0, 0, 0, 0, 0, 0},
                "D", new int[]{-3, -4, -1, 0, -1, -3, -2}
        ));
        scoringMap.put(16, Map.of(
                "A", new int[]{2, 5, 0, 0, 3, 5, 4},
                "B", new int[]{1, 1, 0, 0, 1, 2, 2},
                "C", new int[]{0, -1, 0, 0, -1, -1, -1},
                "D", new int[]{-2, -4, -1, 0, -3, -4, -3}
        ));

        // 第三部分：成果与荣誉（6题）
        scoringMap.put(17, Map.of(
                "A", new int[]{4, 3, 8, 2, 2, 3, 3},
                "B", new int[]{2, 2, 5, 1, 1, 2, 2},
                "C", new int[]{1, 1, 2, 0, 0, 1, 1},
                "D", new int[]{-2, -2, -4, -1, -2, -2, -2}
        ));
        scoringMap.put(18, Map.of(
                "A", new int[]{5, 4, 7, 2, 0, 5, 3},
                "B", new int[]{3, 2, 4, 1, 0, 3, 2},
                "C", new int[]{1, 1, 2, 0, 0, 1, 1},
                "D", new int[]{-2, -2, -3, -1, -1, -3, -2}
        ));
        scoringMap.put(19, Map.of(
                "A", new int[]{4, 5, 7, 3, 2, 4, 4},
                "B", new int[]{2, 3, 4, 1, 1, 2, 2},
                "C", new int[]{0, 1, 1, 0, 0, 1, 1},
                "D", new int[]{-2, -3, -3, -1, -2, -2, -2}
        ));
        scoringMap.put(20, Map.of(
                "A", new int[]{1, 2, 4, 1, 5, 2, 3},
                "B", new int[]{0, 1, 2, 0, 3, 1, 2},
                "C", new int[]{0, 0, 1, 0, 1, 0, 1},
                "D", new int[]{-1, -1, -2, 0, -3, -1, -2}
        ));
        scoringMap.put(21, Map.of(
                "A", new int[]{3, 3, 2, 0, 1, 3, 2},
                "B", new int[]{1, 1, 1, 0, 0, 1, 1},
                "C", new int[]{0, 0, 0, 0, 0, 0, 0},
                "D", new int[]{-2, -2, -1, 0, -1, -2, -2}
        ));
        scoringMap.put(22, Map.of(
                "A", new int[]{4, 5, 8, 2, 1, 3, 3},
                "B", new int[]{2, 3, 5, 1, 0, 2, 2},
                "C", new int[]{1, 1, 2, 0, 0, 1, 1},
                "D", new int[]{-2, -2, -3, -1, -1, -2, -2}
        ));

        // 第四部分：软技能与职业素养（8题）
        scoringMap.put(23, Map.of(
                "A", new int[]{1, 2, 0, 0, 8, 2, 2},
                "B", new int[]{0, 1, 0, 0, 4, 0, 1},
                "C", new int[]{-1, 0, 0, 0, -2, -1, -2},
                "D", new int[]{-3, -2, 0, 0, -6, -2, -4}
        ));
        scoringMap.put(24, Map.of(
                "A", new int[]{1, 3, 2, 0, 7, 2, 4},
                "B", new int[]{0, 1, 1, 0, 4, 0, 2},
                "C", new int[]{0, 0, 0, 0, 1, 0, 0},
                "D", new int[]{-1, -1, -1, 0, -3, -1, -2}
        ));
        scoringMap.put(25, Map.of(
                "A", new int[]{1, 2, 0, 0, 7, 2, 1},
                "B", new int[]{0, 0, 0, 0, 3, 0, 0},
                "C", new int[]{-1, -1, 0, 0, -1, -1, -1},
                "D", new int[]{-3, -3, -1, 0, -5, -3, -2}
        ));
        scoringMap.put(26, Map.of(
                "A", new int[]{1, 1, 0, 0, 6, 0, 1},
                "B", new int[]{0, 0, 0, 0, 2, 0, 0},
                "C", new int[]{0, 0, 0, 0, -1, 0, -1},
                "D", new int[]{-1, -1, 0, 0, -4, -1, -2}
        ));
        scoringMap.put(27, Map.of(
                "A", new int[]{2, 3, 1, 0, 2, 8, 2},
                "B", new int[]{0, 1, 0, 0, 0, 4, 0},
                "C", new int[]{-1, 0, 0, 0, -1, 0, -1},
                "D", new int[]{-3, -2, -1, 0, -2, -6, -2}
        ));
        scoringMap.put(28, Map.of(
                "A", new int[]{1, 2, 0, 0, 2, 7, 4},
                "B", new int[]{0, 0, 0, 0, 0, 3, 1},
                "C", new int[]{-1, -1, 0, 0, -1, -1, -1},
                "D", new int[]{-3, -2, -1, 0, -2, -5, -3}
        ));
        scoringMap.put(29, Map.of(
                "A", new int[]{1, 3, 0, 0, 2, 6, 5},
                "B", new int[]{0, 1, 0, 0, 0, 2, 2},
                "C", new int[]{-1, 0, 0, 0, -1, -1, -1},
                "D", new int[]{-3, -2, -1, 0, -3, -5, -4}
        ));
        scoringMap.put(30, Map.of(
                "A", new int[]{5, 3, 2, 0, 3, 3, 4},
                "B", new int[]{2, 1, 1, 0, 1, 1, 2},
                "C", new int[]{0, -1, 0, 0, -1, -1, -1},
                "D", new int[]{-5, -4, -2, -1, -4, -4, -5}
        ));

        // 第五部分：抗压与执行力（6题）
        scoringMap.put(31, Map.of(
                "A", new int[]{2, 2, 0, 0, 2, 0, 7},
                "B", new int[]{0, 0, 0, 0, 0, 0, 3},
                "C", new int[]{-1, -1, 0, 0, -1, 0, -2},
                "D", new int[]{-3, -3, -1, 0, -3, -1, -6}
        ));
        scoringMap.put(32, Map.of(
                "A", new int[]{2, 2, 1, 0, 2, 1, 6},
                "B", new int[]{0, 0, 0, 0, 0, 0, 2},
                "C", new int[]{-1, -1, -1, 0, -2, 0, -2},
                "D", new int[]{-3, -3, -2, 0, -4, -2, -7}
        ));
        scoringMap.put(33, Map.of(
                "A", new int[]{3, 3, 2, 1, 2, 2, 7},
                "B", new int[]{1, 1, 0, 0, 0, 0, 3},
                "C", new int[]{-1, -1, -1, 0, -1, -1, -2},
                "D", new int[]{-2, -2, -1, 0, -2, -2, -4}
        ));
        scoringMap.put(34, Map.of(
                "A", new int[]{0, 0, 0, 0, 2, 0, 6},
                "B", new int[]{0, 0, 0, 0, 0, 0, 2},
                "C", new int[]{0, 0, 0, 0, -1, 0, -1},
                "D", new int[]{-1, -1, 0, 0, -2, 0, -4}
        ));
        scoringMap.put(35, Map.of(
                "A", new int[]{1, 2, 0, 0, 0, 0, 5},
                "B", new int[]{0, 1, 0, 0, 0, 0, 2},
                "C", new int[]{-1, -1, 0, 0, -1, 0, -2},
                "D", new int[]{-2, -2, 0, 0, -1, 0, -3}
        ));
        scoringMap.put(36, Map.of(
                "A", new int[]{1, 2, 0, 0, 2, 0, 6},
                "B", new int[]{0, 0, 0, 0, 0, 0, 2},
                "C", new int[]{-1, -1, 0, 0, -1, 0, -1},
                "D", new int[]{-2, -2, 0, 0, -2, 0, -4}
        ));

        // 第六部分：有效性检测（4题）- 这些题目不影响分数
        scoringMap.put(37, Map.of(
                "A", new int[]{0, 0, 0, 0, 0, 0, 0},
                "B", new int[]{0, 0, 0, 0, 0, 0, 0},
                "C", new int[]{0, 0, 0, 0, 0, 0, 0},
                "D", new int[]{0, 0, 0, 0, 0, 0, 0}
        ));
        scoringMap.put(38, Map.of(
                "A", new int[]{0, 0, 0, 0, 0, 0, 0},
                "B", new int[]{0, 0, 0, 0, 0, 0, 0},
                "C", new int[]{0, 0, 0, 0, 0, 0, 0},
                "D", new int[]{0, 0, 0, 0, 0, 0, 0}
        ));
        scoringMap.put(39, Map.of(
                "A", new int[]{-3, -2, -2, -4, -2, -2, -3},
                "B", new int[]{-1, -1, -1, -2, -1, -1, -1},
                "C", new int[]{1, 0, 0, 1, 0, 0, 0},
                "D", new int[]{2, 1, 1, 2, 1, 1, 1}
        ));
        scoringMap.put(40, Map.of(
                "A", new int[]{0, 0, 0, 0, 0, 0, 0},
                "B", new int[]{0, 0, 0, 0, 0, 0, 0},
                "C", new int[]{0, 0, 0, 0, 0, 0, 0},
                "D", new int[]{0, 0, 0, 0, 0, 0, 0}
        ));
    }

    /**
     * 计算调查问卷分数
     * @param request 调查问卷请求
     * @return 计算后的七个维度分数
     */
    public SurveyResponse calculateScore(SurveyRequest request) {
        // 初始化七个维度的分数
        int[] scores = new int[7];

        // 遍历用户答案，计算分数
        for (Map.Entry<Integer, String> entry : request.getAnswers().entrySet()) {
            int questionNumber = entry.getKey();
            String option = entry.getValue();

            // 获取该题目的评分映射
            Map<String, int[]> questionScores = scoringMap.get(questionNumber);
            if (questionScores != null) {
                // 获取该选项的分数
                int[] optionScores = questionScores.get(option);
                if (optionScores != null) {
                    // 累加分数
                    for (int i = 0; i < 7; i++) {
                        scores[i] += optionScores[i];
                    }
                }
            }
        }

        // 应用0-16分的范围限制
        for (int i = 0; i < 7; i++) {
            scores[i] = Math.max(0, Math.min(16, scores[i]));
        }

        // 构建响应
        return SurveyResponse.builder()
                .studentId(request.getStudentId())
                .d1(scores[0])
                .d2(scores[1])
                .d3(scores[2])
                .d4(scores[3])
                .d5(scores[4])
                .d6(scores[5])
                .d7(scores[6])
                .message("问卷提交成功，评分计算完成")
                .build();
    }
}
