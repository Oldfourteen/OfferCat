package com.offercat.student.dto;

import lombok.Data;

/**
 * 提交练习会话 DTO
 */
@Data
public class SubmitPracticeDTO {
    
    /** 学生ID */
    private Long studentId;
    
    /** 用户ID（用于解析学生ID） */
    private Long userId;
    
    /** 试卷ID */
    private String paperId;
    
    /** 试卷类型 */
    private Integer paperType;
    
    /** 总题数 */
    private Integer totalCount;
    
    /** 已答题数 */
    private Integer answeredCount;
    
    /** 正确题数 */
    private Integer correctCount;
}
