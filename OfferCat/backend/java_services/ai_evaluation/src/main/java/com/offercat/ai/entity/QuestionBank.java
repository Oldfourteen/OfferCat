package com.offercat.ai.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 题库实体类, 用来存储面试题目信息
 * 实现：使用Lombok的@Data注解生成getter/setter等方法
 */
@Data
public class QuestionBank {
    // 主键ID
    private Long questionId;
    // 题目类型
    private Integer questionType;
    // 题目内容
    private String questionContent; 
    // 核心知识点
    private String corePoint;
    // 答案
    private String answer;
    // 难度等级
    private Integer difficultyLevel;
    // 所属科目
    private String subject;
    // 题目分数
    private Integer score;
    // AI标签
    private String aiTag;
    // 是否启用
    private Integer isEnable;
    // 创建时间
    private LocalDateTime createTime;
    // 更新时间
    private LocalDateTime updateTime;
    
    // 扩展字段，用于存储选项
    // 选项A
    private String optionA;
    // 选项B
    private String optionB;
    // 选项C
    private String optionC;
    // 选项D    
    private String optionD;
}
