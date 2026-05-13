package com.offercat.ai.config;

import org.apache.hc.client5.http.classic.HttpClient;
import org.apache.hc.client5.http.config.RequestConfig;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManager;
import org.apache.hc.core5.util.Timeout;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

/**
 * AI 服务对外 HTTP 调用较多，使用连接池复用 DeepSeek / 硅基流动等长连接。
 */
@Configuration
public class RestTemplateConfig {

    private static final int POOL_MAX_TOTAL = 200;
    private static final int POOL_MAX_PER_ROUTE = 64;

    /** 与历史 SimpleClientHttpRequestFactory 设置一致 */
    private static final int CONNECT_TIMEOUT_MS = 60_000;
    private static final int READ_TIMEOUT_MS = 180_000;

    @Bean(destroyMethod = "close")
    public CloseableHttpClient aiPooledHttpClient() {
        PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager();
        connectionManager.setMaxTotal(POOL_MAX_TOTAL);
        connectionManager.setDefaultMaxPerRoute(POOL_MAX_PER_ROUTE);

        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectTimeout(Timeout.ofMilliseconds(CONNECT_TIMEOUT_MS))
                .setResponseTimeout(Timeout.ofMilliseconds(READ_TIMEOUT_MS))
                .build();

        return HttpClients.custom()
                .setConnectionManager(connectionManager)
                .setDefaultRequestConfig(requestConfig)
                .build();
    }

    @Bean
    public RestTemplate restTemplate(HttpClient httpClient) {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory(httpClient);
        return new RestTemplate(factory);
    }
}
