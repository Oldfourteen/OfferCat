package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 简历投递记录表实体类
 * 对应数据库resume_apply表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeApply {
    /**
     * 投递ID
     */
    private Long applyId;
    
    /**
     * 学生ID
     */
    private Long studentId;
    
    /**
     * 招聘ID
     */
    private Long recruitId;
    
    /**
     * 简历ID
     */
    private Long resumeId;
    
    /**
     * 投递状态 1-待处理 2-已通过 3-已拒绝
     */
    private Integer applyStatus;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}