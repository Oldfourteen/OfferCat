package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 企业信息本体类
 * 对应数据库company_info表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyInfo {
    /**
     * 企业唯一ID
     */
    private Long companyId;
    
    /**
     * 企业名称
     */
    private String companyName;
    
    /**
     * 统一社会信用代码
     */
    private String creditCode;
    
    /**
     * 经营范围
     */
    private String businessScope;
    
    /**
     * 企业地址
     */
    private String address;
    
    /**
     * 企业联系电话
     */
    private String contactPhone;
    
    /**
     * 企业LOGO
     */
    private String logo;
    
    /**
     * 审核状态 0待审核 1审核通过 2审核拒绝
     */
    private Integer auditStatus;
    
    /**
     * 企业状态 1正常 0禁用
     */
    private Integer companyStatus;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
    
    /**
     * 更新时间
     */
    private LocalDateTime updateTime;
}