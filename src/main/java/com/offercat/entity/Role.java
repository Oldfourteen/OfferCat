package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * 角色实体类
 * 对应数据库role表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    /**
     * 角色ID
     */
    private Integer roleId;
    
    /**
     * 角色名称(学生/教师/企业/管理员/超级管理员)
     */
    private String roleName;
    
    /**
     * 角色描述
     */
    private String roleDesc;
    
    /**
     * 状态
     */
    private Integer status;
}