package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 实习经历实体类
 * 功能：表示学生的实习经历信息
 */
@Data
public class InternshipExperience {
    // 实习经历ID
    private Long internshipId;
    // 学生ID
    private Long studentId;
    // 公司名称
    private String company;
    // 岗位名称 
    private String positionName;
    // 实习时间周期
    private String timePeriod;
    // 实习经历描述
    private String experienceDesc;
    // 创建时间
    private LocalDateTime createTime;
}
