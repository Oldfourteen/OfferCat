package com.offercat.ai.entity;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 面试会话实体类, 用来存储面试会话信息
 * 实现：使用Lombok的@Data注解生成getter/setter等方法
 */
@Data
public class InterviewSession {
    // 会话ID
    private Long sessionId;
    // 学生ID
    private Long studentId;
    // 目标岗位
    private String targetPosition;
    // 面试模式（1：模拟面试，2：真题练习，3：专项训练）
    private Integer interviewMode;
    // 总题目数
    private Integer totalQuestions;
    // 已答题数
    private Integer answeredQuestions;
    // 难度级别（1：简单，2：中等，3：困难）
    private Integer difficultyLevel;
    // 会话状态（0：已结束，1：进行中）
    private Integer sessionStatus;
    // 当前面试阶段（WRITTEN：笔试，TECH_1：技术一面，TECH_2：技术二面，TECH_3_OR_MANAGER：技术三面/主管面，HR：HR面，OFFER：发offer）
    private String currentStage;
    // 开始时间
    private LocalDateTime startTime;
    // 结束时间
    private LocalDateTime endTime;
    // 创建时间
    private LocalDateTime createTime;
    // 更新时间
    private LocalDateTime updateTime;
}
