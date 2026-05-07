package com.offercat.student.vo;

import lombok.Data;

@Data
public class WrittenTestQuestionVO {
    private Long questionId;
    private String major;
    private String paperSet;
    private String questionType;
    private String questionContent;
    
    // These are the options sent to the frontend after shuffling.
    // So "optionA" here might actually be the original option C from the database.
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
}
