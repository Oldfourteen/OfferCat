package com.offercat.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * AI评估服务应用程序入口类
 * 功能：启动AI评估服务，提供面试和简历评估相关功能
 * 实现：使用Spring Boot自动配置，启用服务发现客户端
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.offercat.ai._service")
@EnableScheduling
public class AiEvaluationServiceApplication {

    /**
     * 主方法
     * 输入：命令行参数
     * 实现：启动Spring Boot应用
     */
    public static void main(String[] args) {
        // 启动应用
        SpringApplication.run(AiEvaluationServiceApplication.class, args);
    }
}