package com.offercat.shared.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC 配置类
 * 提供统一的 Web 相关配置，包括跨域、拦截器等
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    /**
     * 配置跨域映射，允许所有来源的跨域请求
     * @param registry 跨域注册器
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")// 添加跨域映射，匹配所有路径
                .allowedOriginPatterns("*")// 允许所有来源
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")// 允许的 HTTP 方法
                .allowedHeaders("*")// 允许的请求头
                .allowCredentials(false)// 允许跨域请求携带凭证
                .maxAge(3600);// 跨域请求最大缓存时间，单位秒
    }
    /**
     * 配置拦截器，用于全局拦截 Web 请求
     * @param registry 拦截器注册器
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 可以在这里添加统一的拦截器
        // 例如：登录拦截、权限拦截、日志拦截等
    }
}
