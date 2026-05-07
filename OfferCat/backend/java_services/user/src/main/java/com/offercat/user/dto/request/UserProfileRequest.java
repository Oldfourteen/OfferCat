package com.offercat.user.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserProfileRequest {

    @NotNull(message = "用户ID不能为空")
    private Long userId;

    private String avatar;
    private String nickname;
    private String realName;
    private String phone;
    private String email;
    private Integer gender;

    private String studentId;
    private String grade;
    private String major;
    private Integer age;
    private String jobStatus;
    private String bio;
    private String desiredPosition;
    private String desiredCity;
    private String expectedSalary;
}
