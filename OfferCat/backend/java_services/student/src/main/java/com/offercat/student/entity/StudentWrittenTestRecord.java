package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StudentWrittenTestRecord {
    private Long recordId;
    private Long studentId;
    private Long paperRecordId;
    private Long questionId;
    private String userAnswer;
    private Integer isCorrect;
    private Integer totalScore;
    private LocalDateTime answerTime;
}
