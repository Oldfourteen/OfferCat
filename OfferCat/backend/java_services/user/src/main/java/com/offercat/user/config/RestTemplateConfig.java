package com.offercat.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

/**
 * RestTemplate 配置类
 * 配置 RestTemplate 实例
 */
@Configuration
public class RestTemplateConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        /** 创建 SimpleClientHttpRequestFactory */
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        /** 设置连接超时时间 */
        factory.setConnectTimeout(5000);
        /** 设置读取超时时间 */
        factory.setReadTimeout(10000);
        /** 创建并返回 RestTemplate */
        return new RestTemplate(factory);
    }
}