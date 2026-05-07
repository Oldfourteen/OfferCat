package com.offercat.shared.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Jackson 配置类 Jackson 是 Java 里用来处理 JSON 的工具库
 * 提供统一的 JSON 序列化/反序列化配置
 */
@Configuration// 标识这是一个配置类
public class JacksonConfig implements WebMvcConfigurer {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);// 所有属性都可访问
        objectMapper.registerModule(new JavaTimeModule());// 注册 JavaTime 模块，支持 LocalDate、LocalDateTime 等时间类型
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);// 禁用日期时间戳序列化，默认是毫秒级时间戳，这里设置为秒级时间戳
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));// 设置日期格式

        return objectMapper;
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();// 创建 Jackson 消息转换器
        converter.setObjectMapper(objectMapper());// 设置 ObjectMapper
        converters.add(0, converter);// 添加到转换器列表，优先使用 Jackson 转换器   
    }
}
