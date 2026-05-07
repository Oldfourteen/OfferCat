package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class WrittenTestQuestionBank {
    private Long questionId;
    private Long paperId;
    private String major;
    private String paperSet;
    private String questionType;
    private String questionContent;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
