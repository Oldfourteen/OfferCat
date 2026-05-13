package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
/**
 * 用来接收AI聊天模式的参数
 */

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 01:26
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
public class AiChatModeRequest {
    // 用户ID
    @NotNull
    private Long userId;
    
    // 专业代码
    @NotBlank
    private String majorCode;

    // 模式
    @NotBlank
    private String mode;
    // 问题
    @NotBlank
    private String question;
    
    //  用户图片
    private java.util.List<String> userImages;

    /**
     * AIHR 模拟面试：客户端因「限时内未作答」触发的自动跟进时为 true，服务端在系统提示中补充面试官情境。
     */
    private Boolean hrIdleTimeout;
}
