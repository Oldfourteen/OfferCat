package com.offercat.ai.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 映射规则：网络访问 /api/ai/photo/xxx.png -> 物理路径 D:/offercat/photo/xxx.png
        registry.addResourceHandler("/api/ai/photo/**")
                .addResourceLocations("file:D:/offercat/photo/");
                
        // 映射规则：网络访问 /api/ai/userface/xxx.png -> 物理路径 D:/offercat/userface/xxx.png
        registry.addResourceHandler("/api/ai/userface/**")
                .addResourceLocations("file:D:/offercat/userface/");
    }
}
