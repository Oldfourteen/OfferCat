package com.offercat.user.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 资源配置类
 * 功能：配置资源映射规则
 */

@Configuration
public class ResourceConfig implements WebMvcConfigurer {
    /** 头像目录 */
    @Value("${file.avatar-dir}")
    private String avatarDir;
    /**
     * 配置资源映射规则
     * @param registry 资源注册器
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /** 映射规则：网络访问 /user/avatars/xxx.png -> 物理路径 D:/offercat/avatars/xxx.png
         */
        registry.addResourceHandler("/user/avatars/**")
                .addResourceLocations("file:" + avatarDir);
    }
}
