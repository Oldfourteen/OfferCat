package com.offercat.student.vo;

import lombok.Data;

/**
 * 手写测试题目VO
 * 功能：表示手写测试题目的VO信息
 */
@Data
public class WrittenTestQuestionVO {
    private Long questionId;
    private String major;
    private String paperSet;
    private String questionType;
    private String questionContent;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
}
