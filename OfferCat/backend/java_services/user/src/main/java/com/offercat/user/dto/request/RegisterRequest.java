package com.offercat.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * 注册请求 DTO
 * 用于处理用户初始注册逻辑
 */
@Data
public class RegisterRequest {
    /**
     * 注册手机号
     */
    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;

    /**
     * 注册邮箱
     */
    private String email;

    /**
     * 验证码：需先调用发送验证码接口获取
     */
    @NotBlank(message = "验证码不能为空")
    private String code;

    /**
     * 设置登录密码
     */
    @NotBlank(message = "密码不能为空")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z]).{8,64}$",
            message = "密码至少8位，且同时包含大写和小写字母")
    private String password;

    /**
     * 确认密码：用于前端校验一致性
     */
    private String confirmPassword;
}