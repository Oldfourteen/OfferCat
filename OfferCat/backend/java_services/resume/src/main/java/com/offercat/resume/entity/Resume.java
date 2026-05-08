package com.offercat.resume.entity;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 简历实体类
 * 功能：存储简历信息
 * 对应数据库表：resume
 */
@Data
public class Resume {
    // 简历ID
    private Long resumeId;
    // 简历名称
    private String resumeName;
    // 用户ID
    private Long userId;
    // 姓名
    private String realName;
    // 性别 0未知 1男 2女
    private Integer gender;
    // 手机号
    private String phone;
    // 邮箱
    private String email;
    // 照片URL
    private String photo;
    // 在校经历
    private String campusExperience;
    // 工作经历
    private String workExperience;
    // 项目经验
    private String projectExperience;
    // 自我评价
    private String selfEvaluation;
    // AI评分
    private Double aiScore;
    // AI评估内容
    private String aiEvaluation;
    // 简历状态 1正常 0禁用
    private Integer resumeStatus;
    // 创建时间
    private LocalDateTime createTime;
    // 更新时间
    private LocalDateTime updateTime;
}
