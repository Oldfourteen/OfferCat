package com.offercat.student.service.impl;

import com.offercat.student.dao.MessageNotificationMapper;
import com.offercat.student.entity.MessageNotification;
import com.offercat.student.service.MessageNotificationService;
import com.offercat.user.dao.UserMapper;
import com.offercat.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 消息通知服务实现类
 */
@Service
public class MessageNotificationServiceImpl implements MessageNotificationService {

    @Autowired
    private MessageNotificationMapper notificationMapper;
    
    @Autowired
    private UserMapper userMapper;

    @Override
    @Transactional
    public void sendCustomerServiceMessage(Long userId, String nickname, String phone) {
        List<User> admins = userMapper.selectAllAdmins();
        
        for (User admin : admins) {
            MessageNotification notification = MessageNotification.builder()
                    .senderId(userId)
                    .senderNickname(nickname)
                    .senderPhone(phone)
                    .receiverId(admin.getUserId())
                    .type(1)
                    .content(nickname + "@客服在吗")
                    .isRead(0)
                    .createTime(LocalDateTime.now())
                    .build();
            notificationMapper.insert(notification);
        }
    }

    @Override
    @Transactional
    public void sendFeedback(Long userId, String nickname, String phone, String feedback) {
        List<User> admins = userMapper.selectAllAdmins();
        
        for (User admin : admins) {
            MessageNotification notification = MessageNotification.builder()
                    .senderId(userId)
                    .senderNickname(nickname)
                    .senderPhone(phone)
                    .receiverId(admin.getUserId())
                    .type(2)
                    .content(nickname + "@意见反馈：" + feedback)
                    .isRead(0)
                    .createTime(LocalDateTime.now())
                    .build();
            notificationMapper.insert(notification);
        }
    }

    @Override
    @Transactional
    public void replyToUser(Long adminId, String adminNickname, Long userId, String content) {
        MessageNotification notification = MessageNotification.builder()
                .senderId(adminId)
                .senderNickname("管理员-" + adminNickname)
                .senderPhone("")
                .receiverId(userId)
                .type(3)
                .content("管理员-" + adminNickname + "@" + content)
                .isRead(0)
                .createTime(LocalDateTime.now())
                .build();
        notificationMapper.insert(notification);
    }

    @Override
    public List<MessageNotification> getUserMessages(Long userId) {
        return notificationMapper.getAllByReceiverId(userId);
    }

    @Override
    public List<MessageNotification> getUnreadMessages(Long userId) {
        return notificationMapper.getUnreadByReceiverId(userId);
    }

    @Override
    public Integer getUnreadCount(Long userId) {
        Integer count = notificationMapper.countUnread(userId);
        return count != null ? count : 0;
    }

    @Override
    @Transactional
    public void markAsRead(Long id) {
        notificationMapper.markAsRead(id);
    }

    @Override
    @Transactional
    public void markAllAsRead(Long userId) {
        notificationMapper.markAllAsRead(userId);
    }

    @Override
    @Transactional
    public void deleteMessage(Long id) {
        notificationMapper.delete(id);
    }
}
