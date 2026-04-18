package com.offercat.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * @author: blue
 * @date: 2026/4/17 - 20:04
 * @mail: 3590038173@qq.com
 * @info:
 */
@Data
public class CompanyInfoRequest {
    @NotNull(message = "用户ID不能为空")
    private Long userId;

    @NotBlank(message = "企业名称不能为空")
    private String companyName;

    private String creditCode;

    private String businessScope;

    private String address;

    private String contactPhone;

    private String position = "HR";  // 默认HR

    @NotNull(message = "是否主管理员不能为空")
    private Integer isAdmin;  // 0否 1是
}