package com.offercat.user.infrastructure.service.impl;

import com.offercat.user.infrastructure.config.AliyunDypnsProperties;
import com.offercat.user.infrastructure.service.SmsSendResult;
import com.offercat.user.infrastructure.service.SmsVerificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * 短信验证码：优先阿里云号码认证；未配置或失败时回退 Redis。
 */
@Service
@Primary
@Slf4j
@RequiredArgsConstructor
public class CompositeSmsVerificationService implements SmsVerificationService {

    private final AliyunDypnsProperties properties;
    private final AliyunDypnsSmsVerificationService aliyunSms;
    private final RedisSmsVerificationService redisSms;

    @Override
    public SmsSendResult sendVerificationCode(String nationalPhone11) {
        boolean credOk = StringUtils.hasText(properties.getAccessKeyId())
                && StringUtils.hasText(properties.getAccessKeySecret());
        if (credOk && StringUtils.hasText(properties.getSchemeName())) {
            SmsSendResult aliyun = aliyunSms.sendVerificationCode(nationalPhone11);
            if (aliyun.isSuccess()) {
                return aliyun;
            }
            if (properties.isRedisFallbackOnAliyunFailure()) {
                log.warn("阿里云下发失败，回退 Redis phone={} reason={}",
                        nationalPhone11, aliyun.getUserMessage());
                return redisSms.sendVerificationCode(nationalPhone11);
            }
            return aliyun;
        }
        if (!properties.isRedisFallbackWhenUnconfigured()) {
            if (!credOk) {
                return SmsSendResult.fail("短信服务未配置，请联系管理员配置阿里云 AccessKey");
            }
            return SmsSendResult.fail("短信认证方案未配置，请联系管理员检查 scheme-name");
        }
        log.warn("阿里云短信未完整配置，使用 Redis 验证码回退 phone={}（accessKey配置={} scheme={}；"
                        + "请确认 deploy/config/application-dypns.yml 或 dist/secrets/ 已加载且 prod 未覆盖空密钥）",
                nationalPhone11,
                credOk ? "有" : "无",
                StringUtils.hasText(properties.getSchemeName()) ? properties.getSchemeName() : "无");
        return redisSms.sendVerificationCode(nationalPhone11);
    }

    @Override
    public boolean verifyCode(String nationalPhone11, String userInputCode) {
        boolean credOk = StringUtils.hasText(properties.getAccessKeyId())
                && StringUtils.hasText(properties.getAccessKeySecret());
        if (credOk && StringUtils.hasText(properties.getSchemeName())) {
            if (aliyunSms.verifyCode(nationalPhone11, userInputCode)) {
                return true;
            }
            if (properties.isRedisFallbackOnAliyunFailure()) {
                return redisSms.verifyCode(nationalPhone11, userInputCode);
            }
            return false;
        }
        if (!properties.isRedisFallbackWhenUnconfigured()) {
            return false;
        }
        return redisSms.verifyCode(nationalPhone11, userInputCode);
    }
}
