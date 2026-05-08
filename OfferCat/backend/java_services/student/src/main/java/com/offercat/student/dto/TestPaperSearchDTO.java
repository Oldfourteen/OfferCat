package com.offercat.student.dto;

import lombok.Data;

/**
 * 测试试卷搜索DTO
 * 功能：提供测试试卷搜索相关的数据传输对象
 */
@Data
public class TestPaperSearchDTO {
    // 搜索关键字（如 "小米"）
    private String keyword;

    // 套卷类型：1-笔试题，2-面试题
    private Integer paperType;

    private Integer pageNum = 1;
    private Integer pageSize = 10;
}
