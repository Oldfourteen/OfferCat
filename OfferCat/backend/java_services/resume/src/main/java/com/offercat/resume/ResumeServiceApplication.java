package com.offercat.resume;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/*
 * 简历服务应用程序入口类
 * 功能：启动简历服务，提供简历管理相关功能
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.offercat.resume.client")
public class ResumeServiceApplication {


    public static void main(String[] args) {
        // 启动应用
        SpringApplication.run(ResumeServiceApplication.class, args);
    }
}
