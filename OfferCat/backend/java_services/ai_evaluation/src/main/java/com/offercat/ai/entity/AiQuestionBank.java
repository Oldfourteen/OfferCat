package com.offercat.ai.entity;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * AI题库实体类, 用来存储面试题目信息
 * 实现：使用Lombok的@Data注解生成getter/setter等方法
 */
@Data
public class AiQuestionBank {
    // 题目ID
    private Long questionId;
    // 题目类型 1-求职常识题 2-专业技能题 3-面试模拟题 4-职业规划题 5-AI评估附加题
    private Integer questionType;
    // 题目内容
    private String questionContent;
    // 要点核心
    private String corePoint;
    // 标准参考答案
    private String answer;
    // 难度等级 1-简单 2-中等 3-困难
    private Integer difficultyLevel;
    // 所属科目/领域
    private String subject;
    // 题目分值
    private Integer score;
    // AI标签
    private String aiTag;
    // 启用状态 1-启用 0-禁用
    private Integer isEnable;
    // 创建时间
    private LocalDateTime createTime;
    // 更新时间
    private LocalDateTime updateTime;
}
