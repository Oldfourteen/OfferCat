package com.offercat.infrastructure.service.impl;

import com.offercat.infrastructure.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
@author: blue
@date: 2026/4/18 - 08:38
@mail: 3590038173@qq.com
@info:
*/
@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Override
    public boolean sendEmail(String email, String code) {
        // TODO: [填写位置] 在此处编写调用邮件发送接口的代码
        // 例如使用 JavaMailSender：
        // SimpleMailMessage message = new SimpleMailMessage();
        // message.setFrom("your-email@example.com");
        // message.setTo(email);
        // message.setSubject("验证码");
        // message.setText("您的验证码是：" + code);
        // mailSender.send(message);

        log.info("【模拟发送邮件】目标邮箱: {}, 验证码: {}", email, code);

        // 返回发送结果
        return true;
    }
}
