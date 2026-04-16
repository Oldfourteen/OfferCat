package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 企业实体类
 * 对应数据库company表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    /**
     * 企业ID
     */
    private Long companyId;
    
    /**
     * 关联登录用户ID
     */
    private Long userId;
    
    /**
     * 企业名称
     */
    private String companyName;
    
    /**
     * 负责人
     */
    private String leader;
    
    /**
     * 企业地址
     */
    private String address;
    
    /**
     * 座机号
     */
    private String telephone;
    
    /**
     * 企业状态 1-正常 0-禁用
     */
    private Integer companyStatus;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}