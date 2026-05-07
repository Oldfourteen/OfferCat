package com.offercat.user.infrastructure.service.impl;

/**
@author: blue
@date: 2026/4/18 - 08:40
@mail: 3590038173@qq.com
@info: 短信服务实现类 - 对接短信宝平台
*/

import com.offercat.user.infrastructure.service.SmsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
@Service
@Slf4j
public class SmsServiceImplement implements SmsService {

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
            // 1. 准备短信内容 (替换为在短信宝后台申请的模板)
            // 模板：【Offer猫服务】亲爱的{user_name}，您的验证码是{code}。有效期为{time}，请尽快验证
            String content = "【Offer猫服务】亲爱的用户，您的验证码是" + code + "。有效期为5分钟，请尽快验证";

            // 2. 拼接请求 URL
            // 注意：使用 RestTemplate 的 getForObject() 传带占位符的 URL 和可变参数时，
            // Spring 会自动对可变参数进行正规的 URL 编码。
            // 因此，这里绝不能再手动使用 URLEncoder.encode，否则会导致短信宝收到二次编码的乱码。
            String url = apiUrl + "?u={username}&p={apikey}&m={phone}&c={content}";

            log.info("正在向短信宝请求发送短信: target={}, content={}", phone, content);

            // 3. 执行请求
            String result = restTemplate.getForObject(url, String.class, username, apiKey, phone, content);

            // 5. 解析响应结果
            // 0: 成功, 其他均为失败
            // 注意：短信宝返回的成功状态可能是带回车的 "0\n" 或者其他空格，所以用 trim().equals("0") 更稳妥
            if (result != null && "0".equals(result.trim())) {
                log.info("短信发送成功: phone={}", phone);
                return true;
            } else {
                String errorMsg = getSmsBaoError(result != null ? result.trim() : "null");
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