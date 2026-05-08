package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 面试题目库实体类
 * 功能：表示面试题目库中的题目信息
 */
@Data
public class InterviewQuestionBank {
    // 题目ID
    private Long questionId;
    // 题目所属试卷ID
    private Long paperId;
    // 专业
    private String major;
    // 题目类型
    private String questionType;
    // 题目内容
    private String questionContent;
    // 核心知识点
    private String corePoint;
    // 参考答案
    private String referenceAnswer;
    // 难度等级
    private Integer difficultyLevel;
    // 创建时间
    private LocalDateTime createTime;
    // 更新时间
    private LocalDateTime updateTime;
}
