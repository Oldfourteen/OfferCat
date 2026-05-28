package com.offercat.user;

import com.offercat.user.dao.UserMapper;
import com.offercat.user.entity.User;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * 用户服务应用程序入口类
 * 功能：启动用户服务，提供用户管理相关功能
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.offercat.user.client")
public class UserServiceApplication {

    @Bean
    public CommandLineRunner seedTeddyUser(UserMapper userMapper) {
        return (args) -> {
            final String phone = "15092730328";
            final String nickname = "Teddy";
            final String rawPassword = "Teddy123456";

            User existing = userMapper.selectByPhone(phone);
            if (existing == null) {
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                User u = new User();
                u.setPassword(encoder.encode(rawPassword));
                u.setNickname(nickname);
                u.setPhone(phone);
                u.setEmail(null);
                u.setUserRole(1);
                u.setUserStatus(1);
                u.setCreateTime(LocalDateTime.now());
                userMapper.insert(u);
                existing = u;
            }

            List<User> admins = userMapper.selectAllAdmins();
            boolean hasAdmin = admins != null && !admins.isEmpty();
            if (!hasAdmin && existing != null && existing.getUserId() != null) {
                userMapper.updateUserRole(existing.getUserId(), 4);
            }
        };
    }

    public static void main(String[] args) {
        // 启动应用
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
