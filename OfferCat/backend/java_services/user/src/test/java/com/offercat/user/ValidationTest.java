package com.offercat.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.offercat.user.dto.request.RegisterRequest;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import java.util.Set;

public class ValidationTest {
    public static void main(String[] args) throws Exception {
        String json = "{\"phone\":\"13256697439\",\"email\":\"1410146934@qq.com\",\"password\":\"Woshini88\",\"code\":\"344336\"}";
        ObjectMapper mapper = new ObjectMapper();
        RegisterRequest req = mapper.readValue(json, RegisterRequest.class);
        
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set violations = validator.validate(req);
        
        System.out.println("Violations:");
        violations.forEach(v -> System.out.println(v));
    }
}
