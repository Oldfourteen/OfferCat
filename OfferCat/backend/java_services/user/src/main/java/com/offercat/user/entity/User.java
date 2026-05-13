package com.offercat.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 用户实体类
 * 对应数据库user表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    // 用户唯一ID(主键)
    private Long userId;
    
    // 用户密码(加密存储)
    @JsonIgnore
    private String password;
    
    // 用户姓名/昵称
    private String nickname;
    
    // 用户头像URL
    private String avatar;
    
    // 性别 0-未知 1-男 2-女
    private Integer gender;
    
    // 手机号(唯一)
    private String phone;
    
    // 邮箱(唯一)
    private String email;
    
    // 真实姓名
    private String realName;
    
    // 身份证号(加密存储)
    private String idCard;
    
    // 所属学校
    private String school;
    
    // 用户角色 1-学生 2-教师 3-企业 4-管理员
    private Integer userRole;
    
    // 账号状态 1-正常 0-禁用 2-待审核
    private Integer userStatus;
    
    // 创建时间
    private LocalDateTime createTime;
    
    // 更新时间
    private LocalDateTime updateTime;

    // 学生详细信息（非数据库字段，仅作关联查询/返回用）
    private Student profile;
}