package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 测试试卷实体类
 * 功能：表示测试试卷信息
 */
@Data
public class TestPaper {
    // 测试试卷ID
    private Long paperId;
    // 测试试卷名称
    private String paperName;
    // 公司名称
    private String company;
    // 测试试卷类型
    private Integer paperType; // 1-笔试 2-面试
    // 题目数量
    private Integer questionCount;
    // 创建时间
    private LocalDateTime createTime;
    // 更新时间
    private LocalDateTime updateTime;
}
