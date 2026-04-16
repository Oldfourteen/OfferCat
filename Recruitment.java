package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 招聘信息实体类
 * 对应数据库recruitment表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recruitment {
    /**
     * 招聘信息ID
     */
    private Long recruitId;
    
    /**
     * 企业ID
     */
    private Long companyId;
    
    /**
     * 发布人HR用户ID
     */
    private Long publishUserId;
    
    /**
     * 岗位名称
     */
    private String jobName;
    
    /**
     * 状态 1-招聘中 2-已结束
     */
    private Integer recruitStatus;
    
    /**
     * 招聘人数
     */
    private Integer needCount;
    
    /**
     * 工作地址
     */
    private String workAddress;
    
    /**
     * 薪资(如：8k-12k)
     */
    private String salary;
    
    /**
     * 福利待遇
     */
    private String welfare;
    
    /**
     * 岗位描述
     */
    private String jobDesc;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}