package com.offercat.user.infrastructure.service.impl;

import com.offercat.user.infrastructure.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
@author: blue
@date: 2026/4/18 - 08:38
@mail: 3590038173@qq.com
@info: 邮件服务实现类
*/
@Service
@Slf4j
public class EmailServiceImplement implements EmailService {
    @Override
    public boolean sendEmail(String email, String code) {
        // 模拟邮件发送
        log.info("向 {} 发送验证码: {}", email, code);
        return true;
    }
}