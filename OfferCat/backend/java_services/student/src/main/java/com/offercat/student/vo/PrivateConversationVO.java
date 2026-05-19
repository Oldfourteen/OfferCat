package com.offercat.student.vo;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PrivateConversationVO {
    private Long targetUserId;
    private String targetUserName;
    private String targetUserAvatar;
    private String lastMessageContent;
    private LocalDateTime lastMessageTime;
    private Integer unreadCount;
}