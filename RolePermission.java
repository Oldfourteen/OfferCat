package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * 角色权限关联实体类
 * 对应数据库role_permission表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolePermission {
    /**
     * 主键ID
     */
    private Integer id;
    
    /**
     * 角色ID
     */
    private Integer roleId;
    
    /**
     * 权限标识符
     */
    private String permKey;
}