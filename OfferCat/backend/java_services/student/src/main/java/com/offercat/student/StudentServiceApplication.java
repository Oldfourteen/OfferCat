package com.offercat.student;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.ComponentScan;

/*
 * 学生服务应用程序入口类
 * 功能：启动学生服务，提供学生管理相关功能
 */
@SpringBootApplication
@EnableDiscoveryClient
@MapperScan({"com.offercat.student.dao", "com.offercat.user.dao"})
@ComponentScan({"com.offercat.student", "com.offercat.shared"})
public class StudentServiceApplication {

 
    public static void main(String[] args) {
       
        SpringApplication.run(StudentServiceApplication.class, args);
    }
}
