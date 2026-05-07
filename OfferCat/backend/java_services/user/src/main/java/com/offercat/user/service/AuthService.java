package com.offercat.user.service;

import com.offercat.user.dto.request.*;
import com.offercat.user.dto.response.AuthResponse;
import com.offercat.user.infrastructure.common.ResponseResult;

/**
 * 认证服务接口
 */
public interface AuthService {
    /**
     * 发送验证码
     */
    ResponseResult<Void> sendVerificationCode(SendCodeRequest request);

    /**
     * 注册用户
     */
    ResponseResult<AuthResponse> register(RegisterRequest request);

    /**
     * 登录
     */
    ResponseResult<AuthResponse> login(LoginRequest request);

    /**
     * 完善学生信息
     */
    ResponseResult<Void> completeStudentInfo(StudentInfoRequest studentInfoRequest);

    // 教师与企业完善接口已移除
}