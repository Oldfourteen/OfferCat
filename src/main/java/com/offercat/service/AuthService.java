package com.offercat.service;

import com.offercat.dto.request.*;
import com.offercat.dto.response.AuthResponse;
import com.offercat.infrastructure.common.ResponseResult;

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

    /**
     * 完善教师信息
     */
    ResponseResult<Void> completeTeacherInfo(TeacherInfoRequest teacherInfoRequest);

    /**
     * 完善企业信息
     */
    ResponseResult<Void> completeCompanyInfo(CompanyInfoRequest companyInfoRequest);
}
