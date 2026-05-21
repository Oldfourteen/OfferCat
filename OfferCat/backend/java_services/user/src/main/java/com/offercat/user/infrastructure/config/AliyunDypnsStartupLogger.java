package com.offercat.user.infrastructure.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * 启动时打印号码认证配置是否生效（不输出 Secret）。
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class AliyunDypnsStartupLogger {

    private final AliyunDypnsProperties properties;

    @EventListener(ApplicationReadyEvent.class)
    public void logConfigStatus() {
        boolean credOk = StringUtils.hasText(properties.getAccessKeyId())
                && StringUtils.hasText(properties.getAccessKeySecret());
        String idHint = credOk
                ? properties.getAccessKeyId().substring(0, Math.min(6, properties.getAccessKeyId().length())) + "***"
                : "(empty)";
        if (credOk && StringUtils.hasText(properties.getSchemeName())) {
            log.info("【短信】阿里云号码认证已就绪 accessKeyId={} scheme={} sign={} template={}",
                    idHint, properties.getSchemeName(), properties.getSignName(), properties.getTemplateCode());
        } else {
            log.warn("【短信】阿里云未就绪 accessKey配置={} scheme={}；请检查 application-dypns.yml 是否被 prod 配置加载",
                    credOk ? "有" : "无",
                    StringUtils.hasText(properties.getSchemeName()) ? properties.getSchemeName() : "(empty)");
        }
    }
}
