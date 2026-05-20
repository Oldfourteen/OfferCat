package com.offercat.user.infrastructure.service;

import lombok.Getter;

/**
 * 短信验证码下发结果（供认证层返回可读错误信息）。
 */
@Getter
public final class SmsSendResult {

    private final boolean success;
    private final String userMessage;

    private SmsSendResult(boolean success, String userMessage) {
        this.success = success;
        this.userMessage = userMessage;
    }

    public static SmsSendResult ok() {
        return new SmsSendResult(true, null);
    }

    public static SmsSendResult fail(String userMessage) {
        return new SmsSendResult(false, userMessage != null && !userMessage.isBlank()
                ? userMessage
                : "验证码发送失败，请稍后再试");
    }
}
