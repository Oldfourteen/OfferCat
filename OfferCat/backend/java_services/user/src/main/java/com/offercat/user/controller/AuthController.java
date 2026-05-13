package com.offercat.user.controller;

import com.offercat.user.dto.request.*;
import com.offercat.user.dto.response.AuthResponse;
import com.offercat.user.infrastructure.common.ResponseResult;
import com.offercat.user.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 认证控制器
 * 提供用户生命周期管理接口：发送验证码 -> 注册 -> 登录 -> 完善信息
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") /** 允许 Vue 等前端应用跨域访问 */
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * 发送验证码
     * 支持手机号或邮箱，通过 SendCodeRequest.type 区分
     */
    @PostMapping("/send-code")
    public ResponseResult<Void> sendCode(@RequestBody @Valid SendCodeRequest request) {
        return authService.sendVerificationCode(request);
    }

    /**
     * 用户注册
     * 需提供目标(手机/邮箱)、验证码、密码及昵称
     */
    @PostMapping("/register")
    public ResponseResult<AuthResponse> register(@RequestBody @Valid RegisterRequest request) {
        return authService.register(request);
    }

    /**
     * 用户登录
     * 支持两种模式：
     * 1. 密码模式 (loginType="password")
     * 2. 验证码模式 (loginType="code")
     */
    @PostMapping("/login")
    public ResponseResult<AuthResponse> login(@RequestBody @Valid LoginRequest request) {
        return authService.login(request);
    }

    /**
     * 修改密码
     * 需提供手机号、验证码、新密码及确认密码
     */
    @PostMapping("/reset-password")
    public ResponseResult<Void> resetPassword(@RequestBody @Valid ResetPasswordRequest request) {
        return authService.resetPassword(request);
    }

    /**
     * 完善学生信息
     * 登录后如果 isComplete 为 false，且用户选择学生身份时调用
     */
    @PostMapping("/complete-student-info")
    public ResponseResult<Void> completeStudentInfo(@RequestBody @Valid StudentInfoRequest request) {
        return authService.completeStudentInfo(request);
    }

    /** 已移除教师和企业相关接口 */
}