package com.offercat.config;

import io.seata.spring.annotation.GlobalTransactionScanner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Seata分布式事务配置类
 * 配置全局事务扫描器
 */
@Configuration
public class SeataConfig {

    /**
     * 配置全局事务扫描器
     */
    @Bean
    public GlobalTransactionScanner globalTransactionScanner() {
        return new GlobalTransactionScanner("offercat-backend", "offercat_group");
    }
}