package com.offercat.student.vo;

import lombok.Data;

/**
 * 面试问题VO
 * 功能：表示面试问题的VO信息
 */
@Data
public class InterviewQuestionVO {
    private Long questionId;
    private String major;
    private String questionType;
    private String questionContent;
    /** 核心知识点和参考答案不应在回答前发送给学生 */
}
