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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

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
            // 1. 准备短信内容 (使用配置文件中已备案的签名)
            // 注意：签名必须与短信宝平台备案的签名完全一致，否则短信会被拦截
            String content = sign + "亲爱的用户，您的验证码是" + code + "。有效期为5分钟，请尽快验证";

            log.info("正在向短信宝请求发送短信: target={}, content={}", phone, content);

            // 2. 构建 POST 请求参数
            // 短信宝 API 参数说明：
            // u: 用户名（短信宝账号）
            // p: 密码的 MD5 值（32位小写）
            // m: 目标手机号（多个手机号用英文逗号分隔）
            // c: 短信内容（需要 URL 编码）
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("u", username);
            params.add("p", md5(apiKey)); // 短信宝密码需要 MD5 加密
            params.add("m", phone);
            params.add("c", URLEncoder.encode(content, StandardCharsets.UTF_8));

            // 3. 设置请求头
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            // 4. 构建请求实体
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

            // 5. 执行 POST 请求
            String result = restTemplate.postForObject(apiUrl, request, String.class);

            // 6. 解析响应结果
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
     * MD5 加密方法
     * @param input 输入字符串
     * @return MD5 加密后的 32 位小写字符串
     */
    private String md5(String input) {
        if (input == null) {
            return null;
        }
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : messageDigest) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            log.error("MD5 加密失败", e);
            return null;
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