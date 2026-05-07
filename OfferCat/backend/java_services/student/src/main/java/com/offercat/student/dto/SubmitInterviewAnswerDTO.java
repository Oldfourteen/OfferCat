package com.offercat.student.dto;

import lombok.Data;

@Data
public class SubmitInterviewAnswerDTO {
    private Long studentId;
    private Long questionId;
    private Long paperRecordId;
    private String userAnswer;
}
