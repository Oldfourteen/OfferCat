package com.offercat.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * @author: blue
 * @date: 2026/4/17 - 20:03
 * @mail: 3590038173@qq.com
 * @info:
 */
@Data
public class TeacherInfoRequest {
    @NotNull(message = "用户ID不能为空")
    private Long userId;

    @NotBlank(message = "职位不能为空")
    private String position;

    @NotBlank(message = "工号不能为空")
    private String workNo;

    private String realName;

    private String school;
}