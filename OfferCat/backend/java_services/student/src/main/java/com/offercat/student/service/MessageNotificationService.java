package com.offercat.student.service;

import com.offercat.student.entity.MessageNotification;
import java.util.List;

/**
 * 消息通知服务接口
 */
public interface MessageNotificationService {
    
    /**
     * 发送客服消息（用户 -> 所有管理员）
     */
    void sendCustomerServiceMessage(Long userId, String nickname, String phone);
    
    /**
     * 发送意见反馈（用户 -> 所有管理员）
     */
    void sendFeedback(Long userId, String nickname, String phone, String feedback);
    
    /**
     * 管理员回复用户消息
     */
    void replyToUser(Long adminId, String adminNickname, Long userId, String content);
    
    /**
     * 获取用户消息列表
     */
    List<MessageNotification> getUserMessages(Long userId);
    
    /**
     * 获取用户未读消息
     */
    List<MessageNotification> getUnreadMessages(Long userId);
    
    /**
     * 获取未读消息数量
     */
    Integer getUnreadCount(Long userId);
    
    /**
     * 标记消息为已读
     */
    void markAsRead(Long id);
    
    /**
     * 标记所有消息为已读
     */
    void markAllAsRead(Long userId);
    
    /**
     * 删除消息
     */
    void deleteMessage(Long id);
}
