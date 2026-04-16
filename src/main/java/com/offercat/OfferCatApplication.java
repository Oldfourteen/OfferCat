package com.offercat;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * OfferCat后端应用入口类
 */
@SpringBootApplication
@MapperScan("com.offercat.mapper")
@EnableCaching
@EnableTransactionManagement
public class OfferCatApplication {

    public static void main(String[] args) {
        SpringApplication.run(OfferCatApplication.class, args);
    }
    
    /**
     * 配置ObjectMapper
     * @return ObjectMapper
     */
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

}
