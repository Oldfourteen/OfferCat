package com.offercat.resume.entity.dto;

import lombok.Data;

/**
 * 简历统计响应类
 * 功能：返回简历统计数据
 */
@Data
public class ResumeStatsResponse {
    // 简历完善度
    private Integer completion;
    // 总简历数
    private Integer totalResumes;
    // 近30天练习数
    private Integer recentDeliveries;
}
