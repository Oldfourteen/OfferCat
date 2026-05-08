package com.offercat.radar.entity;

import lombok.Data;
/**
 * 题目实体类
 */

@Data
public class QuestionnaireQuestion {
    // 主键ID
    private Integer id;
    // 题目类型
    private String section;
    // 题目顺序
    private Integer questionOrder;
    // 题目文本
    private String questionText;
    // 选项A
    private String optionA;
    // 选项B
    private String optionB;
    // 选项C
    private String optionC;
    // 选项D
    private String optionD;
    // 选项A的分数
    private String scoresA;
    // 选项B的分数
    private String scoresB;
    // 选项C的分数
    private String scoresC;
    // 选项D的分数
    private String scoresD;
}
