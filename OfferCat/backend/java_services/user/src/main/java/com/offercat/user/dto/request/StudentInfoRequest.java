package com.offercat.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
@author: blue
@date: 2026/4/17 - 20:02
@mail: 3590038173@qq.com
@info: 学生信息完善请求
*/
@Data
public class StudentInfoRequest {
    /**
     * 用户ID
     */
    @NotNull(message = "用户ID不能为空")
    private Long userId;
    
    /**
     * 真实姓名
     */
    @NotBlank(message = "真实姓名不能为空")
    private String realName;
    
    /**
     * 身份证号
     */
    @NotBlank(message = "身份证号不能为空")
    private String idCard;
    
    /**
     * 学校
     */
    @NotBlank(message = "学校不能为空")
    private String school;
    
    /**
     * 年级
     */
    @NotBlank(message = "年级不能为空")
    private String grade;
    
    /**
     * 班级
     */
    @NotBlank(message = "班级不能为空")
    private String className;
    
    /**
     * 专业
     */
    @NotBlank(message = "专业不能为空")
    private String major;
    
    /**
     * 年龄
     */
    @NotNull(message = "年龄不能为空")
    private Integer age;
    
    /**
     * 学历
     */
    @NotBlank(message = "学历不能为空")
    private String education;
}