package com.offercat.user.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {

    @Value("${file.avatar-dir}")
    private String avatarDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 映射规则：网络访问 /user/avatars/xxx.png -> 物理路径 D:/offercat/avatars/xxx.png
        registry.addResourceHandler("/user/avatars/**")
                .addResourceLocations("file:" + avatarDir);
    }
}
