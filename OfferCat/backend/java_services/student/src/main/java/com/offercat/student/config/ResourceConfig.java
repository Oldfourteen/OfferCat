package com.offercat.student.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {

    @Value("${file.forum-images-dir}")
    private String forumImagesDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 映射规则：网络访问 /forum/images/xxx.png -> 物理路径 D:/offercat/forum-images/xxx.png
        registry.addResourceHandler("/forum/images/**")
                .addResourceLocations("file:" + forumImagesDir);
    }
}
