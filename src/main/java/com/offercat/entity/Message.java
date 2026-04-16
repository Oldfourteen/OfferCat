package com.offercat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 私信表实体类
 * 对应数据库message表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    /**
     * 私信ID
     */
    private Long msgId;
    
    /**
     * 发送用户ID
     */
    private Long fromUserId;
    
    /**
     * 接收用户ID
     */
    private Long toUserId;
    
    /**
     * 私信内容
     */
    private String content;
    
    /**
     * 图片URL
     */
    private String imgUrl;
    
    /**
     * 消息状态 1-未读 2-已读
     */
    private Integer msgStatus;
    
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
}