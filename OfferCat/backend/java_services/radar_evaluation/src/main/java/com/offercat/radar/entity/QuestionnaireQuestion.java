package com.offercat.radar.entity;

import lombok.Data;

@Data
public class QuestionnaireQuestion {
    private Integer id;
    private String section;
    private Integer questionOrder;
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String scoresA;
    private String scoresB;
    private String scoresC;
    private String scoresD;
}
