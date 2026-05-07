package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class InterviewQuestionBank {
    private Long questionId;
    private Long paperId;
    private String major;
    private String questionType;
    private String questionContent;
    private String corePoint;
    private String referenceAnswer;
    private Integer difficultyLevel;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
