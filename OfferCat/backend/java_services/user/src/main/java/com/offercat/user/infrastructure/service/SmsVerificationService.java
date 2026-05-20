package com.offercat.user.infrastructure.service;

/**
 * 手机短信验证码：下发与核验（阿里云号码认证侧生成与校验，本地不再存 Redis）。
 */
public interface SmsVerificationService {

    /**
     * @param nationalPhone11 国内 11 位手机号，不含国家码
     */
    SmsSendResult sendVerificationCode(String nationalPhone11);

    /**
     * @param nationalPhone11 国内 11 位手机号
     * @param userInputCode   用户提交的验证码
     */
    boolean verifyCode(String nationalPhone11, String userInputCode);
}
