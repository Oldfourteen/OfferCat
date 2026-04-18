package com.offercat.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * 发送验证码请求 DTO
 */
@Data
public class SendCodeRequest {
    /**
     * 发送目标：手机号或邮箱地址
     */
    @NotBlank(message = "目标（手机号/邮箱）不能为空")
    private String target;

    /**
     * 发送类型：phone (手机) 或 email (邮箱)
     */
    @NotBlank(message = "类型不能为空（phone/email）")
    @Pattern(regexp = "^(phone|email)$", message = "类型必须是 phone 或 email")
    private String type;
}
