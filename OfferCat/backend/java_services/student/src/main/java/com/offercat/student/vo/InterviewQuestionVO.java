package com.offercat.student.vo;

import lombok.Data;

@Data
public class InterviewQuestionVO {
    private Long questionId;
    private String major;
    private String questionType;
    private String questionContent;
    // Core point and reference answer shouldn't be sent to student before answering.
}
