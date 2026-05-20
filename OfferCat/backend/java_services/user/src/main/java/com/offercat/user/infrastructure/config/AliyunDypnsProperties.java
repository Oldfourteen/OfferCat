package com.offercat.user.infrastructure.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 阿里云号码认证 · 短信验证码（Dypnsapi）配置，与控制台签名/模版保持一致。
 */
@Data
@ConfigurationProperties(prefix = "aliyun.dypns")
public class AliyunDypnsProperties {

    /** AccessKey ID（建议用环境变量注入，勿提交真实密钥） */
    private String accessKeyId = "";

    /** AccessKey Secret */
    private String accessKeySecret = "";

    /**
     * Region，与号码认证控制台/OpenAPI 文档一致，一般用 cn-hangzhou。
     */
    private String regionId = "cn-hangzhou";

    /**
     * 方案名称（SchemeName），控制台创建短信认证方案时填写，与 Demo 中 schemeName 一致。
     */
    private String schemeName = "";

    /** 国家码，国内为 86 */
    private String countryCode = "86";

    private String signName = "";
    private String templateCode = "";

    /**
     * 模版变量 JSON。使用 ##code## 由阿里云生成验证码时，与控制台变量 ${code}/${min} 对应。
     */
    private String templateParam = "{\"code\":\"##code##\",\"min\":\"5\"}";

    private long codeLength = 6;

    /** 验证码有效时长（秒），与 validTime 下发参数一致 */
    private long validTimeSeconds = 300;

    /** 同一号码发送间隔（秒），与 SendSmsVerifyCode 的 Interval 一致 */
    private long sendIntervalSeconds = 60;

    /**
     * 使用 ##code## 占位符时必填：1=纯数字验证码（与阿里云文档一致）。
     */
    private long codeType = 1;

    /**
     * 为 true 时接口返回验证码并在服务端日志打印（仅联调/演示，生产请保持 false）。
     */
    private boolean returnVerifyCodeForLog = false;

    /**
     * 未配置阿里云密钥时是否使用 Redis 本地验证码（开发/联调；生产应配置真实密钥走阿里云）。
     */
    private boolean redisFallbackWhenUnconfigured = true;

    /**
     * 已配置阿里云但下发/核验失败时，是否回退 Redis（需 Redis 可用；生产可按需关闭）。
     */
    private boolean redisFallbackOnAliyunFailure = true;

    /** AccessKey、Secret 与方案名均已配置时走阿里云号码认证。 */
    public boolean isConfigured() {
        return notBlank(accessKeyId) && notBlank(accessKeySecret) && notBlank(schemeName);
    }

    private static boolean notBlank(String s) {
        return s != null && !s.isBlank();
    }
}
