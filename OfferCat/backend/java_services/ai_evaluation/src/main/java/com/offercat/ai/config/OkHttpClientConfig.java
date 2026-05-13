package com.offercat.ai.config;

import okhttp3.ConnectionPool;
import okhttp3.OkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * 流式 SSE、multipart 等场景使用的 OkHttp，单例 + 连接池。
 */
@Configuration
public class OkHttpClientConfig {

    private static final int POOL_MAX_IDLE = 32;
    private static final int POOL_KEEP_ALIVE_MINUTES = 5;

    @Bean
    public OkHttpClient okHttpClient() {
        ConnectionPool pool = new ConnectionPool(POOL_MAX_IDLE, POOL_KEEP_ALIVE_MINUTES, TimeUnit.MINUTES);
        return new OkHttpClient.Builder()
                .connectionPool(pool)
                .connectTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .readTimeout(120, TimeUnit.SECONDS)
                .retryOnConnectionFailure(true)
                .build();
    }
}
