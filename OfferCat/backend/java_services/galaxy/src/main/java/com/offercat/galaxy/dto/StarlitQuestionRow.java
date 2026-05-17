package com.offercat.galaxy.dto;

import lombok.Data;

@Data
public class StarlitQuestionRow {
    private Integer questionNo;
    private String stem;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;
}
