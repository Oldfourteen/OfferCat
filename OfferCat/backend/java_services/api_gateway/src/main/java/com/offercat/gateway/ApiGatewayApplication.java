package com.offercat.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * API网关服务应用程序入口类
 * 功能：启动API网关，提供请求路由和负载均衡功能
 */
@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

    public static void main(String[] args) {
        // 启动应用
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
