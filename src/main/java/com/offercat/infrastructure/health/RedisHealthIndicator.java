package com.offercat.infrastructure.health;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

/**
 * Redis健康检查指示器
 * 用于验证Redis缓存连接状态
 */
@Component
public class RedisHealthIndicator implements HealthIndicator {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;// 注入RedisTemplate

    @Override
    public Health health() {
        try {
            // 执行简单的Redis操作验证连接
            String testKey = "health_check_" + System.currentTimeMillis();
            redisTemplate.opsForValue().set(testKey, "test");
            String result = (String) redisTemplate.opsForValue().get(testKey);
            redisTemplate.delete(testKey);
            
            if ("test".equals(result)) {
                return Health.up()
                    .withDetail("redis", "Redis")
                    .withDetail("status", "connected")
                    .build();
            } else {
                return Health.down()
                    .withDetail("redis", "Redis")
                    .withDetail("status", "connection_error")
                    .withDetail("error", "Redis operation failed")
                    .build();
            }
        } catch (Exception e) {
            return Health.down()
                .withDetail("redis", "Redis")
                .withDetail("status", "disconnected")
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}