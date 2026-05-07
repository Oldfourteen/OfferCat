package com.offercat.user;

import com.offercat.user.dto.request.LoginRequest;
import com.offercat.user.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LoginTest {

    @Autowired
    private AuthService authService;

    @Test
    public void testLogin() {
        try {
            LoginRequest req = new LoginRequest();
            req.setLoginType("code");
            req.setTarget("13256697439");
            req.setCode("048241"); // 假设
            System.out.println("Result: " + authService.login(req));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
