package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class InternshipExperience {
    private Long internshipId;
    private Long studentId;
    private String company;
    private String positionName;
    private String timePeriod;
    private String experienceDesc;
    private LocalDateTime createTime;
}
