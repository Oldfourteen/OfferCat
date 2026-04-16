package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * 权限实体类
 * 对应数据库permission表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Permission {
    /**
     * 权限ID
     */
    private Integer permId;
    
    /**
     * 权限名称
     */
    private String permName;
    
    /**
     * 权限标识符(如:recruit:add)
     */
    private String permKey;
    
    /**
     * 权限类型 1-菜单 2-按钮
     */
    private Integer permType;
}