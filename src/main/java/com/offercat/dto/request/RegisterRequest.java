package com.offercat.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * 注册请求 DTO (更新)
 * 用于处理用户初始注册逻辑
 */
@Data
public class RegisterRequest {
    /**
     * 注册目标：手机号或邮箱
     */
    @NotBlank(message = "目标（手机号/邮箱）不能为空")
    private String target;

    /**
     * 验证码：需先调用发送验证码接口获取
     */
    @NotBlank(message = "验证码不能为空")
    private String code;

    /**
     * 设置登录密码
     */
    @NotBlank(message = "密码不能为空")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,20}$",
            message = "密码必须包含字母和数字，长度6-20位")
    private String password;

    /**
     * 确认密码：用于前端校验一致性
     */
    @NotBlank(message = "确认密码不能为空")
    private String confirmPassword;

    /**
     * 初始昵称
     */
    @NotBlank(message = "昵称不能为空")
    private String nickname;

    /**
     * 注册类型：phone 或 email
     */
    @NotBlank(message = "注册类型不能为空（phone/email）")
    @Pattern(regexp = "^(phone|email)$", message = "注册类型必须是 phone 或 email")
    private String registerType;
}
