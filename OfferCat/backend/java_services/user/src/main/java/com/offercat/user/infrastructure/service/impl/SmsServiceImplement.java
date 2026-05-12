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
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
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

    /** 对应短信宝模版中的 {user_name}；验证码场景暂无昵称时使用默认称呼 */
    @Value("${smsbao.verification-user-default:用户}")
    private String verificationUserDefault;

    /** 对应模版中的 {time}，应与 AuthServiceImplement 验证码 Redis TTL 文案一致 */
    @Value("${smsbao.verification-validity:5分钟}")
    private String verificationValidity;

    @Override
    public boolean sendSms(String phone, String code) {
        try {
            // 与报备模版一致：【签名】亲爱的{user_name}，您的验证码是{code}。有效期为{time}，请尽快验证
            String content = sign + "亲爱的" + verificationUserDefault + "，您的验证码是" + code
                    + "。有效期为" + verificationValidity + "，请尽快验证";

            log.info("正在向短信宝请求发送短信: target={}, content={}", phone, content);

            // 2. 官方文档示例为 GET（非 POST）：http://api.smsbao.com/sms?u=...&p=...&m=...&c=...(urlencode)
            // URL 仅用 queryParam 编码一次即可，避免出现「手动 encode + Form 编码器」的双重编码。
            String passMd5 = md5(apiKey);
            URI uri = UriComponentsBuilder.fromHttpUrl(apiUrl)
                    .queryParam("u", username)
                    .queryParam("p", passMd5)
                    .queryParam("m", phone)
                    .queryParam("c", content)
                    .encode(StandardCharsets.UTF_8)
                    .build()
                    .toUri();

            // 3. 执行 GET
            String result = restTemplate.getForObject(uri, String.class);

            // 4. 解析响应结果
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
            case "-1" -> "参数不全或未按 GET 拼接 URL（常见原因是旧版用 POST）";
            case "-2" -> "服务器不支持或网络不可用";
            case "30" -> "密码错误：p 应为「登录密码」一次 MD5，勿将已是 MD5 的串再哈希";
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