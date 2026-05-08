package com.offercat.student.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 资源配置类
 * 功能：配置资源映射，将物理路径映射到网络路径
 */
@Configuration
public class ResourceConfig implements WebMvcConfigurer {
    /**
     * 论坛图片目录
     */
    @Value("${file.forum-images-dir}")
    private String forumImagesDir;
    /**
     * 简历内容目录
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /**
         * 映射规则：网络访问 /forum/images/xxx.png -> 物理路径 D:/offercat/forum-images/xxx.png
         */
        registry.addResourceHandler("/forum/images/**")
                .addResourceLocations("file:" + forumImagesDir);
    }
}
