package com.offercat.user;

import com.offercat.user.dto.request.RegisterRequest;
import com.offercat.user.controller.AuthController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RegisterTest {

    @Autowired
    private AuthController authController;

    @Test
    public void testRegister() {
        try {
            RegisterRequest req = new RegisterRequest();
            req.setPhone("13256697439");
            req.setPassword("Woshini88");
            req.setConfirmPassword("Woshini88");
            req.setCode("344336");
            System.out.println("Result: " + authController.register(req));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
