package com.offercat.infrastructure.service;

/**
@author: blue
@date: 2026/4/18 - 08:31
@mail: 3590038173@qq.com
@info:
*/
public interface EmailService {
    /**
     * 发送邮件验证码
     * @param email 邮箱地址
     * @param code 验证码
     * @return 是否发送成功
     */
    boolean sendEmail(String email, String code);
}