package com.offercat.student.dto;

import lombok.Data;

@Data
public class SendPrivateMessageDTO {
    private Long senderId;
    private Long receiverId;
    private String content;
}