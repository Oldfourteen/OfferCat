package com.offercat.user.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
/**
 * 用户个人信息请求DTO
 * 功能：表示用户个人信息的请求DTO
 */
@Data
public class UserProfileRequest {

    @NotNull(message = "用户ID不能为空")
    // 用户ID
    private Long userId;
    // 头像URL
    private String avatar;
    // 昵称
    private String nickname;
    // 真实姓名
    private String realName;
    // 手机号
    private String phone;
    // 邮箱
    private String email;
    // 性别
    private Integer gender;
    // 学生ID
    private String studentId;
    // 年级
    private String grade;
    // 专业
    // 专业
    private String major;
    // 年龄
    private Integer age;
    // 就业状态
    private String jobStatus;
    // 个人简介
    private String bio;
    // 期望职位
    private String desiredPosition;
    // 期望城市
    private String desiredCity; 
    // 期望薪资
    private String expectedSalary;
}
