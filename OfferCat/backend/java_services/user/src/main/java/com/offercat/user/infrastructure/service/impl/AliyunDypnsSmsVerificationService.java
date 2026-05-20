package com.offercat.user.infrastructure.service.impl;

import com.aliyuncs.IAcsClient;
import com.aliyuncs.dypnsapi.model.v20170525.CheckSmsVerifyCodeRequest;
import com.aliyuncs.dypnsapi.model.v20170525.CheckSmsVerifyCodeResponse;
import com.aliyuncs.dypnsapi.model.v20170525.SendSmsVerifyCodeRequest;
import com.aliyuncs.dypnsapi.model.v20170525.SendSmsVerifyCodeResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.offercat.user.infrastructure.config.AliyunDypnsProperties;
import com.offercat.user.infrastructure.service.SmsSendResult;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.UUID;

/**
 * 阿里云号码认证：SendSmsVerifyCode / CheckSmsVerifyCode
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class AliyunDypnsSmsVerificationService {

    private final IAcsClient dypnsAcsClient;
    private final AliyunDypnsProperties properties;

    @PostConstruct
    void logDypnsConfigStatus() {
        if (!isCredentialConfigured()) {
            log.warn("阿里云号码认证未配置 AccessKey（环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID/SECRET 或 "
                    + "secrets/application-dypns.yml、config/application-dypns.yml）；/auth/send-code 将失败");
            return;
        }
        if (!StringUtils.hasText(properties.getSchemeName())) {
            log.warn("阿里云号码认证 scheme-name 为空，请与控制台短信认证方案名称一致");
        }
        log.info("阿里云号码认证已加载 region={} scheme={} sign={} template={}",
                properties.getRegionId(), properties.getSchemeName(),
                properties.getSignName(), properties.getTemplateCode());
    }

    public SmsSendResult sendVerificationCode(String nationalPhone11) {
        if (!isCredentialConfigured()) {
            log.error("SendSmsVerifyCode 跳过：AccessKey 未配置 phone={}", nationalPhone11);
            return SmsSendResult.fail("短信服务未配置，请联系管理员配置阿里云 AccessKey");
        }
        if (!StringUtils.hasText(properties.getSchemeName())) {
            log.error("SendSmsVerifyCode 跳过：scheme-name 未配置 phone={}", nationalPhone11);
            return SmsSendResult.fail("短信认证方案未配置，请联系管理员检查 scheme-name");
        }

        SendSmsVerifyCodeRequest request = new SendSmsVerifyCodeRequest();
        request.setSchemeName(properties.getSchemeName());
        request.setCountryCode(properties.getCountryCode());
        request.setPhoneNumber(nationalPhone11);
        request.setSignName(properties.getSignName());
        request.setTemplateCode(properties.getTemplateCode());
        request.setTemplateParam(properties.getTemplateParam());
        request.setCodeLength(properties.getCodeLength());
        request.setValidTime(properties.getValidTimeSeconds());
        request.setInterval(properties.getSendIntervalSeconds());
        request.setOutId(UUID.randomUUID().toString());

        try {
            SendSmsVerifyCodeResponse response = dypnsAcsClient.getAcsResponse(request);
            boolean ok = Boolean.TRUE.equals(response.getSuccess()) && "OK".equalsIgnoreCase(response.getCode());
            if (ok) {
                log.info("阿里云短信验证码已发起: phone={}", nationalPhone11);
                return SmsSendResult.ok();
            }
            log.warn("阿里云 SendSmsVerifyCode 未成功 phone={} respCode={} success={} msg={}",
                    nationalPhone11, response.getCode(), response.getSuccess(), response.getMessage());
            return SmsSendResult.fail(mapBizResponseMessage(response.getCode(), response.getMessage()));
        } catch (ServerException e) {
            log.error("阿里云 SendSmsVerifyCode 服务端异常 phone={} errCode={} errMsg={}",
                    nationalPhone11, e.getErrCode(), e.getErrMsg(), e);
            return SmsSendResult.fail(mapOpenApiExceptionMessage(e.getErrCode(), e.getErrMsg()));
        } catch (ClientException e) {
            log.error("阿里云 SendSmsVerifyCode 客户端异常 phone={} errCode={} errMsg={}",
                    nationalPhone11, e.getErrCode(), e.getErrMsg(), e);
            return SmsSendResult.fail(mapOpenApiExceptionMessage(e.getErrCode(), e.getErrMsg()));
        }
    }

    public boolean verifyCode(String nationalPhone11, String userInputCode) {
        if (userInputCode == null || userInputCode.isBlank()) {
            return false;
        }
        if (!isCredentialConfigured()) {
            log.error("CheckSmsVerifyCode 跳过：AccessKey 未配置 phone={}", nationalPhone11);
            return false;
        }
        CheckSmsVerifyCodeRequest request = new CheckSmsVerifyCodeRequest();
        request.setSchemeName(properties.getSchemeName());
        request.setCountryCode(properties.getCountryCode());
        request.setPhoneNumber(nationalPhone11);
        request.setVerifyCode(userInputCode.strip());
        request.setCaseAuthPolicy(1L);

        try {
            CheckSmsVerifyCodeResponse response = dypnsAcsClient.getAcsResponse(request);
            if (!(Boolean.TRUE.equals(response.getSuccess()) && "OK".equalsIgnoreCase(response.getCode()))) {
                log.warn("阿里云 CheckSmsVerifyCode 请求未成功 phone={} respCode={} success={} msg={}",
                        nationalPhone11, response.getCode(), response.getSuccess(), response.getMessage());
                return false;
            }
            CheckSmsVerifyCodeResponse.Model model = response.getModel();
            boolean pass = model != null && "PASS".equalsIgnoreCase(model.getVerifyResult());
            if (!pass) {
                log.info("阿里云验证码校验未通过 phone={} verifyResult={}",
                        nationalPhone11, model != null ? model.getVerifyResult() : "null");
            }
            return pass;
        } catch (ServerException e) {
            log.error("阿里云 CheckSmsVerifyCode 服务端异常 phone={} errCode={} errMsg={}",
                    nationalPhone11, e.getErrCode(), e.getErrMsg(), e);
            return false;
        } catch (ClientException e) {
            log.error("阿里云 CheckSmsVerifyCode 客户端异常 phone={} errCode={} errMsg={}",
                    nationalPhone11, e.getErrCode(), e.getErrMsg(), e);
            return false;
        }
    }

    private boolean isCredentialConfigured() {
        return StringUtils.hasText(properties.getAccessKeyId())
                && StringUtils.hasText(properties.getAccessKeySecret());
    }

    private String mapBizResponseMessage(String respCode, String respMessage) {
        if (respCode == null) {
            return "验证码发送失败，请稍后再试";
        }
        String code = respCode.trim();
        if ("isv.BUSINESS_LIMIT_CONTROL".equalsIgnoreCase(code)
                || code.toLowerCase().contains("frequency")
                || code.toLowerCase().contains("limit")) {
            return "发送过于频繁，请稍后再试";
        }
        if ("InvalidSchemeName".equalsIgnoreCase(code) || code.toLowerCase().contains("scheme")) {
            return "短信认证方案配置错误，请联系管理员";
        }
        if (code.toLowerCase().contains("sign") || "InvalidSignName".equalsIgnoreCase(code)) {
            return "短信签名配置错误，请联系管理员";
        }
        if (code.toLowerCase().contains("template")) {
            return "短信模板配置错误，请联系管理员";
        }
        if (StringUtils.hasText(respMessage)) {
            return "验证码发送失败：" + respMessage;
        }
        return "验证码发送失败，请稍后再试";
    }

    private String mapOpenApiExceptionMessage(String errCode, String errMsg) {
        if (errCode == null) {
            return "验证码发送失败，请稍后再试";
        }
        String code = errCode.trim();
        if ("InvalidAccessKeyId.NotFound".equalsIgnoreCase(code)
                || "InvalidAccessKeyId".equalsIgnoreCase(code)
                || "SignatureDoesNotMatch".equalsIgnoreCase(code)
                || code.toLowerCase().contains("accesskey")) {
            return "短信服务密钥无效，请联系管理员检查阿里云 AccessKey";
        }
        if ("Forbidden.RAM".equalsIgnoreCase(code) || code.toLowerCase().contains("ram")
                || code.toLowerCase().contains("denied") || code.toLowerCase().contains("permission")) {
            return "短信服务权限不足，请为 AccessKey 开通号码认证（Dypnsapi）权限";
        }
        if (StringUtils.hasText(errMsg)) {
            return "验证码发送失败：" + errMsg;
        }
        return "验证码发送失败，请稍后再试";
    }
}
