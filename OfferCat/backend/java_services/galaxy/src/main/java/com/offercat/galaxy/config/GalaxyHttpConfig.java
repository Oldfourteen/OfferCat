package com.offercat.galaxy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class GalaxyHttpConfig {

    @Bean
    public RestTemplate galaxyRestTemplate(RestTemplate restTemplate) {
        return restTemplate;
    }
}
