package com.offercat.student.vo;

import lombok.Data;

@Data
public class GrowthRecordVO {
    private Long studentId;
    private Integer resumeCount;
    private Integer interviewCount;
    private Integer practiceCount;
    private Integer collectionCount;
    private Integer continuousCheckinDays;
    
    // Check if user has checked in today
    private Boolean checkedInToday;
}
