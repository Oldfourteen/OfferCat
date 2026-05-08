package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 竞赛奖励实体类
 * 功能：表示学生获得的竞赛奖励信息
 */
@Data
public class CompetitionAward {
    // 竞赛奖励ID
    private Long awardId;
    // 学生ID
    private Long studentId;
    // 竞赛名称
    private String competitionName;
    // 奖励等级
    private String awardGrade;
    // 获得奖励时间
    private String awardTime;
    // 奖励描述
    private String achievementDesc;
    // 创建时间
    private LocalDateTime createTime;
}
