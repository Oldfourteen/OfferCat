package com.offercat.shared.config;

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
 * RestTemplate：使用 Apache HttpClient 5 连接池，减少对外 HTTP 调用的 TCP/TLS 握手开销。
 */
@Configuration
public class RestTemplateConfig {

    /** 池化连接总数上限 */
    private static final int POOL_MAX_TOTAL = 100;
    /** 同一远程主机（路由）最大空闲连接数 */
    private static final int POOL_MAX_PER_ROUTE = 40;

    @Bean(destroyMethod = "close")
    public CloseableHttpClient pooledHttpClient() {
        PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager();
        connectionManager.setMaxTotal(POOL_MAX_TOTAL);
        connectionManager.setDefaultMaxPerRoute(POOL_MAX_PER_ROUTE);

        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectTimeout(Timeout.ofMilliseconds(5000))
                .setResponseTimeout(Timeout.ofMilliseconds(10000))
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
