package com.offercat.student.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PracticeSessionVO {
    private String sessionId;
    private String paperId;
    private Integer paperType;
    private String title;
    private Integer totalCount;
    private Integer answeredCount;
    private Integer correctCount;
    private Integer wrongCount;
    private Integer accuracy;
    private LocalDateTime submittedAt;
    private LocalDateTime createTime;
}

