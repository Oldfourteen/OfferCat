package com.offercat.galaxy.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class GalaxyHttpConfig {

    @Bean
    public RestTemplate galaxyRestTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}
