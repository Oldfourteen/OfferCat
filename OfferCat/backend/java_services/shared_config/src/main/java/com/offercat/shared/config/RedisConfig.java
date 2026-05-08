package com.offercat.shared.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * Redis 配置类
 * 提供统一的 Redis 模板配置，支持 JSON 序列化
 */
@Configuration
public class RedisConfig {
    /**
     * 配置 Redis 模板，设置 JSON 序列化
     * @param connectionFactory Redis 连接工厂
     * @return RedisTemplate 实例
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();// 创建 Redis 模板
        template.setConnectionFactory(connectionFactory);// 设置连接工厂

        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);// 创建 Jackson 序列化器
        ObjectMapper objectMapper = new ObjectMapper();// 创建 ObjectMapper
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);// 所有属性都可访问
        objectMapper.activateDefaultTyping(objectMapper.getPolymorphicTypeValidator(), ObjectMapper.DefaultTyping.NON_FINAL);// 启用默认类型提示，支持枚举值
        objectMapper.registerModule(new JavaTimeModule());// 注册 JavaTime 模块，支持 LocalDate、LocalDateTime 等时间类型
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        template.setKeySerializer(stringRedisSerializer);// 设置键序列化器
        template.setHashKeySerializer(stringRedisSerializer);// 设置哈希键序列化器
        template.setValueSerializer(jackson2JsonRedisSerializer);// 设置值序列化器
        template.setHashValueSerializer(jackson2JsonRedisSerializer);// 设置哈希值序列化器
        template.afterPropertiesSet();// 初始化 Redis 模板

        return template;// 返回 Redis 模板
    }
    /**
     * 配置 StringRedisTemplate 模板，用于存储字符串键值对
     * @param connectionFactory Redis 连接工厂
     * @return StringRedisTemplate 实例
     */
    @Bean
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory connectionFactory) {
        return new StringRedisTemplate(connectionFactory);// 创建 StringRedisTemplate 模板
    }
}
