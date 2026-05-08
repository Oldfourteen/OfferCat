package com.offercat.student.dto;

import lombok.Data;

/**
 * 提交笔试答案DTO
 * 功能：提供提交笔试答案相关的数据传输对象
 */
@Data
public class SubmitWrittenAnswerDTO {
    // 学生ID
    private Long studentId;
    // 笔试问题ID
    private Long questionId;
    // 笔试记录ID
    private Long paperRecordId;
    
    // 学生笔试答案
    private String selectedOption;
}
