package com.offercat.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
@author: blue
@date: 2026/4/17 - 20:02
@mail: 3590038173@qq.com
@info:
*/
@Data
public class StudentInfoRequest {
    @NotNull(message = "用户ID不能为空")
    private Long userId;

    @NotBlank(message = "年级不能为空")
    private String grade;

    private String className;

    @NotBlank(message = "专业不能为空")
    private String major;

    private Integer age;

    private String education;

    private String realName;  // 真实姓名

    private String idCard;    // 身份证号

    private String school;    // 学校
}