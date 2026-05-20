package com.offercat.user;

import com.offercat.user.dto.request.LoginRequest;
import com.offercat.user.dto.request.RegisterRequest;
import com.offercat.user.dto.response.AuthResponse;
import com.offercat.user.infrastructure.common.ResponseResult;
import com.offercat.user.infrastructure.service.SmsSendResult;
import com.offercat.user.infrastructure.service.SmsVerificationService;
import com.offercat.user.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;

@SpringBootTest
public class TestSameAccount {

    @Autowired
    private AuthService authService;

    /** 阿里云短信链路在集成测试中打桩，避免真实调 OpenAPI */
    @MockBean
    private SmsVerificationService smsVerificationService;

    @BeforeEach
    public void stubSms() {
        lenient().when(smsVerificationService.sendVerificationCode(anyString())).thenReturn(SmsSendResult.ok());
        lenient().when(smsVerificationService.verifyCode(anyString(), anyString())).thenReturn(true);
    }

    @Test
    public void testLogin() {
        try {
            String phone = "13256697999";
            String email = "test12345@qq.com";
            String password = "Password123";
            String code = "123456";

            RegisterRequest regReq = new RegisterRequest();
            regReq.setPhone(phone);
            regReq.setEmail(email);
            regReq.setPassword(password);
            regReq.setConfirmPassword(password);
            regReq.setCode(code);

            ResponseResult<AuthResponse> regRes = authService.register(regReq);
            System.out.println("Register Result: " + regRes);
            if (regRes.getData() != null) {
                System.out.println("Registered User ID: " + regRes.getData().getUser().getUserId());
            }

            LoginRequest loginPhone = new LoginRequest();
            loginPhone.setLoginType("password");
            loginPhone.setTarget(phone);
            loginPhone.setPassword(password);
            ResponseResult<AuthResponse> phoneRes = authService.login(loginPhone);
            System.out.println("Login Phone Result: " + phoneRes);
            if (phoneRes.getData() != null) {
                System.out.println("Phone Login User ID: " + phoneRes.getData().getUser().getUserId());
            }

            LoginRequest loginEmail = new LoginRequest();
            loginEmail.setLoginType("password");
            loginEmail.setTarget(email);
            loginEmail.setPassword(password);
            ResponseResult<AuthResponse> emailRes = authService.login(loginEmail);
            System.out.println("Login Email Result: " + emailRes);
            if (emailRes.getData() != null) {
                System.out.println("Email Login User ID: " + emailRes.getData().getUser().getUserId());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
