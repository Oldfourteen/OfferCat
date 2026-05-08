package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;
/**
 * 书面测试题目库实体类
 * 功能：表示书面测试题目库信息
 */
@Data
public class WrittenTestQuestionBank {
    // 题目ID
    private Long questionId;
    // 测试试卷ID
    private Long paperId;
    // 专业
    private String major;
    // 测试试卷集
    private String paperSet;
    // 题目类型
    private String questionType;
    // 题目内容
    private String questionContent;
    // 选项A
    private String optionA;
    // 选项B
    private String optionB;
    // 选项C
    private String optionC;
    // 选项D
    private String optionD;
    // 正确答案
    private String correctAnswer;
    // 创建时间
    private LocalDateTime createTime;
    // 更新时间
    private LocalDateTime updateTime;
}
