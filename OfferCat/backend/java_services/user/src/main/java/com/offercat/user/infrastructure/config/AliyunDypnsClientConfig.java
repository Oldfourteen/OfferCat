package com.offercat.user.infrastructure.config;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 阿里云 Dypnsapi（号码认证-短信认证）OpenAPI 客户端。
 */
@Configuration
@EnableConfigurationProperties(AliyunDypnsProperties.class)
public class AliyunDypnsClientConfig {

    @Bean
    public IAcsClient dypnsAcsClient(AliyunDypnsProperties properties) {
        // 号码认证 OpenAPI 域名须为 dypnsapi.aliyuncs.com（与官方 SDK 示例一致）
        try {
            DefaultProfile.addEndpoint(
                    properties.getRegionId(),
                    "Dypnsapi",
                    "dypnsapi.aliyuncs.com");
        } catch (Exception ignored) {
            // 重复注册 endpoint 时忽略
        }
        IClientProfile profile = DefaultProfile.getProfile(
                properties.getRegionId(),
                properties.getAccessKeyId(),
                properties.getAccessKeySecret());
        return new DefaultAcsClient(profile);
    }
}
