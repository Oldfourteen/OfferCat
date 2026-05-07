package com.offercat.radar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/*
 * 雷达评估服务应用程序入口类
 * 功能：启动雷达评估服务，提供学生能力评估相关功能
 * 实现：使用Spring Boot自动配置，启用服务发现
 */
@SpringBootApplication(scanBasePackages = "com.offercat")
@EnableDiscoveryClient
@EnableFeignClients
public class RadarEvaluationServiceApplication {

   
    
    public static void main(String[] args) {
        // 启动应用
        SpringApplication.run(RadarEvaluationServiceApplication.class, args);
    }
}
