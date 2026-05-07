package com.offercat.user.dto.response;

import com.offercat.user.entity.User;
import lombok.Builder;
import lombok.Data;

/**
 * 认证响应
 */
@Data
@Builder
public class AuthResponse {
    /**
     * 令牌
     */
    private String token;
    
    /**
     * 用户信息
     */
    private User user;
    
    /**
     * 信息是否完善
     */
    private boolean isComplete;
}