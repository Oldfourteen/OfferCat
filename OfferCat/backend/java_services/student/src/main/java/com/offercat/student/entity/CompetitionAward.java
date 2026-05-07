package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CompetitionAward {
    private Long awardId;
    private Long studentId;
    private String competitionName;
    private String awardGrade;
    private String awardTime;
    private String achievementDesc;
    private LocalDateTime createTime;
}
