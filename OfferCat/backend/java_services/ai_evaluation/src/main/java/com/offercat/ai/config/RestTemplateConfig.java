package com.offercat.ai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

/**
 * RestTemplate 配置类
 */
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        // 设置连接超时时间 60s，避免因网络波动或大数据包导致连接超时
        factory.setConnectTimeout(60000);
        // 设置读取超时时间 180s
        factory.setReadTimeout(180000);
        
        // 创建并返回 RestTemplate
        return new RestTemplate(factory);
    }
}