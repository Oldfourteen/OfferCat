package com.offercat.user.infrastructure.service.impl;

import com.aliyuncs.IAcsClient;
import com.aliyuncs.dypnsapi.model.v20170525.CheckSmsVerifyCodeRequest;
import com.aliyuncs.dypnsapi.model.v20170525.CheckSmsVerifyCodeResponse;
import com.aliyuncs.dypnsapi.model.v20170525.SendSmsVerifyCodeRequest;
import com.aliyuncs.dypnsapi.model.v20170525.SendSmsVerifyCodeResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.offercat.user.infrastructure.config.AliyunDypnsProperties;
import com.offercat.user.infrastructure.service.SmsVerificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * 阿里云号码认证：SendSmsVerifyCode / CheckSmsVerifyCode
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class AliyunDypnsSmsVerificationService implements SmsVerificationService {

    private final IAcsClient dypnsAcsClient;
    private final AliyunDypnsProperties properties;

    @Override
    public boolean sendVerificationCode(String nationalPhone11) {
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
                return true;
            }
            log.warn("阿里云 SendSmsVerifyCode 未成功 phone={} respCode={} success={} msg={}",
                    nationalPhone11, response.getCode(), response.getSuccess(), response.getMessage());
            return false;
        } catch (ServerException e) {
            log.error("阿里云 SendSmsVerifyCode 服务端异常 phone={} errCode={} errMsg={}",
                    nationalPhone11, e.getErrCode(), e.getErrMsg(), e);
            return false;
        } catch (ClientException e) {
            log.error("阿里云 SendSmsVerifyCode 客户端异常 phone={} errCode={} errMsg={}",
                    nationalPhone11, e.getErrCode(), e.getErrMsg(), e);
            return false;
        }
    }

    @Override
    public boolean verifyCode(String nationalPhone11, String userInputCode) {
        if (userInputCode == null || userInputCode.isBlank()) {
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
}
