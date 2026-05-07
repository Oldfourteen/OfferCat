package com.offercat.student.dto;

import lombok.Data;

@Data
public class SubmitWrittenAnswerDTO {
    private Long studentId;
    private Long questionId;
    private Long paperRecordId;
    
    // The option selected by the user from the shuffled choices (A, B, C, or D).
    private String selectedOption;
}
