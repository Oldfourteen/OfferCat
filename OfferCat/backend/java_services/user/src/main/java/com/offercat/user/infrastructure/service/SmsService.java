package com.offercat.user.infrastructure.service;

/**
 * @author: blue
 * @date: 2026/4/18 - 08:29
 * @mail: 3590038173@qq.com
 * @info: 短信服务接口
 */
public interface SmsService {
    /**
     * 发送短信验证码
     * @param phone 手机号
     * @param code 验证码
     * @return 是否发送成功
     */
    boolean sendSms(String phone, String code);
}