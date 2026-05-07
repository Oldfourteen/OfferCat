package com.offercat.ai.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 题库实体
 */
@Data
public class QuestionBank {
    private Long questionId;
    private Integer questionType;
    private String questionContent;
    private String corePoint;
    private String answer;
    private Integer difficultyLevel;
    private String subject;
    private Integer score;
    private String aiTag;
    private Integer isEnable;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    
    // 扩展字段，用于存储选项
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
}
