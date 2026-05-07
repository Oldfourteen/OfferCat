package com.offercat.student;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.mybatis.spring.annotation.MapperScan;

/*
 * 学生服务应用程序入口类
 * 功能：启动学生服务，提供学生管理相关功能
 */
@SpringBootApplication
@EnableDiscoveryClient
@MapperScan("com.offercat.student.dao")
public class StudentServiceApplication {

 
    public static void main(String[] args) {
        // 启动应用
        SpringApplication.run(StudentServiceApplication.class, args);
    }
}
