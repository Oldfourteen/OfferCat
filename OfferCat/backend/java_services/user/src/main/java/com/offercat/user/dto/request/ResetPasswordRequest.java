package com.offercat.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * 修改密码请求 DTO
 */
@Data
public class ResetPasswordRequest {
    // 手机号
    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;

    // 验证码
    @NotBlank(message = "验证码不能为空")
    private String code;

    // 新密码
    @NotBlank(message = "新密码不能为空")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z]).{8,64}$",
            message = "密码至少8位，且同时包含大写和小写字母")
    private String newPassword;

    // 确认新密码
    private String confirmPassword;
}
