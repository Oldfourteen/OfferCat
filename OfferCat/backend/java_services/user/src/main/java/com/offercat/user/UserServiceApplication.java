package com.offercat.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * 用户服务应用程序入口类
 * 功能：启动用户服务，提供用户管理相关功能
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.offercat.user.client")
public class UserServiceApplication {


    public static void main(String[] args) {
        // 启动应用
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
