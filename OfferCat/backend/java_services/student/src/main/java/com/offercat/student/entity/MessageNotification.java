package com.offercat.student.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

/**
 * 消息通知实体类
 * 用于存储用户与管理员之间的消息通知
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageNotification {
    
    /** 通知ID */
    private Long id;
    
    /** 发送者ID */
    private Long senderId;
    
    /** 发送者昵称 */
    private String senderNickname;
    
    /** 发送者手机号 */
    private String senderPhone;
    
    /** 接收者ID（0表示广播给所有管理员） */
    private Long receiverId;
    
    /** 通知类型：1-客服消息 2-意见反馈 3-管理员回复 */
    private Integer type;
    
    /** 消息内容 */
    private String content;
    
    /** 是否已读 */
    private Integer isRead;
    
    /** 创建时间 */
    private LocalDateTime createTime;
}
