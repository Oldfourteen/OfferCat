package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 企业账号表
 * 对应数据库company_account表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyAccount {
    /**
     * 主键ID
     */
    private Long id;
    
    /**
     * 登录用户ID
     */
    private Long userId;
    
    /**
     * 所属企业ID
     */
    private Long companyId;
    
    /**
     * 职位：HR/招聘专员/管理员
     */
    private String position;
    
    /**
     * 是否主管理员 0否 1是（唯一）
     */
    private Integer isAdmin;
    
    /**
     * 状态 1正常 0禁用
     */
    private Integer status;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}