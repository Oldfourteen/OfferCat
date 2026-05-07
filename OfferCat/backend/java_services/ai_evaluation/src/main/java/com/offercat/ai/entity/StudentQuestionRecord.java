package com.offercat.ai.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 学生问题记录实体
 */
@Data
public class StudentQuestionRecord {
    private Long recordId;
    private Long studentId;
    private Long questionId;
    private String userAnswer;
    private Integer aiScore;
    private String aiFeedback;
    private LocalDateTime answerTime;
}
