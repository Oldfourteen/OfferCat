package com.offercat.student.entity;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class GrowthRecord {
    private Long recordId;
    private Long studentId;
    private Integer resumeCount;
    private Integer interviewCount;
    private Integer practiceCount;
    private Integer collectionCount;
    private Integer continuousCheckinDays;
    private LocalDate lastCheckinDate;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
