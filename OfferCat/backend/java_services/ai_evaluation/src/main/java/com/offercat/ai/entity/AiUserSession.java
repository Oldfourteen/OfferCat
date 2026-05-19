package com.offercat.ai.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiUserSession {
    private Long userId;
    private String conversationsJson;
    private LocalDateTime updateTime;
}