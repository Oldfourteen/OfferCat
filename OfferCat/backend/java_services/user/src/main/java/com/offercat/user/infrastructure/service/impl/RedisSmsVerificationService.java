package com.offercat.user.infrastructure.service.impl;

import com.offercat.user.infrastructure.config.AliyunDypnsProperties;
import com.offercat.user.infrastructure.service.SmsSendResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;

/**
 * Redis 存储短信验证码（阿里云未配置或联调/回退时使用）。
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class RedisSmsVerificationService {

    private static final String KEY_PREFIX = "offercat:sms:verify:";
    private static final SecureRandom RANDOM = new SecureRandom();

    private final StringRedisTemplate stringRedisTemplate;
    private final AliyunDypnsProperties properties;

    public SmsSendResult sendVerificationCode(String nationalPhone11) {
        if (nationalPhone11 == null || nationalPhone11.isBlank()) {
            return SmsSendResult.fail("手机号无效");
        }
        String phone = nationalPhone11.strip();
        int len = (int) Math.min(Math.max(properties.getCodeLength(), 4), 8);
        String code = randomDigits(len);
        long ttlSec = Math.max(properties.getValidTimeSeconds(), 60);
        try {
            stringRedisTemplate.opsForValue().set(
                    redisKey(phone),
                    code,
                    Duration.ofSeconds(ttlSec));
            log.warn("【Redis 短信回退】已向 {} 写入验证码（有效期 {}s）；生产环境请配置阿里云 Dypns 并查看 user 服务日志获取联调码",
                    phone, ttlSec);
            return SmsSendResult.ok();
        } catch (Exception ex) {
            log.error("Redis 写入验证码失败 phone={}", phone, ex);
            return SmsSendResult.fail("验证码服务暂不可用，请确认 Redis 已启动");
        }
    }

    public boolean verifyCode(String nationalPhone11, String userInputCode) {
        if (nationalPhone11 == null || nationalPhone11.isBlank()
                || userInputCode == null || userInputCode.isBlank()) {
            return false;
        }
        String phone = nationalPhone11.strip();
        String input = userInputCode.strip();
        try {
            String stored = stringRedisTemplate.opsForValue().get(redisKey(phone));
            if (stored == null || stored.isBlank() || !stored.equals(input)) {
                return false;
            }
            stringRedisTemplate.delete(redisKey(phone));
            return true;
        } catch (Exception ex) {
            log.error("Redis 校验验证码失败 phone={}", phone, ex);
            return false;
        }
    }

    private static String redisKey(String phone) {
        return KEY_PREFIX + phone;
    }

    private static String randomDigits(int len) {
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(RANDOM.nextInt(10));
        }
        return sb.toString();
    }
}
