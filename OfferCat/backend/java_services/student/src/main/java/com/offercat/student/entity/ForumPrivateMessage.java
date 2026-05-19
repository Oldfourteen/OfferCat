package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ForumPrivateMessage {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String content;
    private Integer isRead;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}