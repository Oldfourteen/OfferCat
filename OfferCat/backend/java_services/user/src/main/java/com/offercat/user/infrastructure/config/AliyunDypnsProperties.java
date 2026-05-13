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
}
