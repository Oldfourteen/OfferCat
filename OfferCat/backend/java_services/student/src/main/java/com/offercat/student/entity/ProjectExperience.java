package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 项目经历实体类
 * 功能：表示学生的项目经历信息
 */
@Data
public class ProjectExperience {
    // 项目经历ID
    private Long projectId;
    // 学生ID
    private Long studentId;
    // 项目名称
    private String projectName;
    // 项目技术栈
    private String techStack;
    // 项目责任
    private String responsibility;
    // 项目亮点
    private String projectHighlights;
    // 创建时间
    private LocalDateTime createTime;
}
