package com.offercat.registry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * 注册中心服务应用程序入口类
 * 功能：启动Eureka注册中心，提供服务发现功能
 * Eureka注册中心：用于注册和发现微服务的中心服务器
 */
@SpringBootApplication
@EnableEurekaServer
public class RegistryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(RegistryServiceApplication.class, args);
    }
}
