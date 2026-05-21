package com.offercat.user.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

/**
 * 服务启动时预热数据库连接池，减轻首笔登录在冷池上等待。
 */
@Component
@Slf4j
public class DataSourceWarmup implements ApplicationRunner {

    private final DataSource dataSource;

    public DataSourceWarmup(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(ApplicationArguments args) {
        try (Connection ignored = dataSource.getConnection()) {
            log.info("user-service 数据源连接池预热完成");
        } catch (Exception e) {
            log.warn("user-service 数据源预热失败（不影响启动）: {}", e.getMessage());
        }
    }
}
