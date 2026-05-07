package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProjectExperience {
    private Long projectId;
    private Long studentId;
    private String projectName;
    private String techStack;
    private String responsibility;
    private String projectHighlights;
    private LocalDateTime createTime;
}
