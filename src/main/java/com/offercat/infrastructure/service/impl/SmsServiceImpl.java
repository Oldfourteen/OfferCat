package com.offercat.infrastructure.service.impl;

/**
@author: blue
@date: 2026/4/18 - 08:40
@mail: 3590038173@qq.com
@info:
*/

import com.offercat.infrastructure.service.SmsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * 短信服务实现类 - 对接短信宝平台
 */
@Service
@Slf4j
public class SmsServiceImpl implements SmsService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${smsbao.username}")
    private String username;

    @Value("${smsbao.api-key}")
    private String apiKey;

    @Value("${smsbao.api-url}")
    private String apiUrl;

    @Value("${smsbao.sign}")
    private String sign;

    @Override
    public boolean sendSms(String phone, String code) {
        try {
            // 1. 准备短信内容 (包含签名)
            String content = sign + "您的验证码是：" + code + "，有效期5分钟。如非本人操作请忽略。";

            // 2. 准备请求参数
            // 短信宝密码字段 p 需要是 API Key 的 MD5 加密值 (32位小写)
            String md5ApiKey = DigestUtils.md5DigestAsHex(apiKey.getBytes(StandardCharsets.UTF_8));

            // 对内容进行 URL 编码
            String encodedContent = URLEncoder.encode(content, StandardCharsets.UTF_8.name());

            // 3. 拼接请求 URL
            // 格式: http://api.smsbao.com/sms?u=USERNAME&p=PASSWORD&m=PHONE&c=CONTENT
            String url = String.format("%s?u=%s&p=%s&m=%s&c=%s",
                    apiUrl, username, md5ApiKey, phone, encodedContent);

            log.info("正在向短信宝请求发送短信: target={}, url={}", phone, apiUrl);

            // 4. 执行请求
            String result = restTemplate.getForObject(url, String.class);

            // 5. 解析响应结果
            // 0: 成功, 其他均为失败
            if ("0".equals(result)) {
                log.info("短信发送成功: phone={}", phone);
                return true;
            } else {
                String errorMsg = getSmsBaoError(result);
                log.error("短信发送失败: phone={}, 错误代码={}, 错误原因={}", phone, result, errorMsg);
                return false;
            }

        } catch (Exception e) {
            log.error("调用短信宝接口发生异常", e);
            return false;
        }
    }

    /**
     * 短信宝错误码对照
     */
    private String getSmsBaoError(String code) {
        return switch (code) {
            case "30" -> "密码错误 (API Key 填写有误)";
            case "40" -> "账号不存在";
            case "41" -> "余额不足";
            case "42" -> "帐号过期";
            case "43" -> "IP地址限制";
            case "50" -> "内容含有敏感词";
            case "51" -> "手机号码不正确";
            default -> "未知错误 (" + code + ")";
        };
    }
}
