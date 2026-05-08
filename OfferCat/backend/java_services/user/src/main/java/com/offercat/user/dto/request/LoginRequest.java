package com.offercat.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * 登录请求 DTO
 * 支持密码登录和验证码登录两种模式
 */
@Data
public class LoginRequest {
    // 登录目标：手机号或邮箱
    @NotBlank(message = "目标（手机号/邮箱）不能为空")
    private String target;

    // 登录密码：当 loginType 为 password 时必填
    private String password;

    // 验证码：当 loginType 为 code 时必填
    private String code;

    // 登录类型：password (密码登录) 或 code (验证码登录)
    @NotBlank(message = "登录类型不能为空（password/code）")
    @Pattern(regexp = "^(password|code)$", message = "登录类型必须是 password 或 code")
    private String loginType;
}