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
        IClientProfile profile = DefaultProfile.getProfile(
                properties.getRegionId(),
                properties.getAccessKeyId(),
                properties.getAccessKeySecret());
        return new DefaultAcsClient(profile);
    }
}
