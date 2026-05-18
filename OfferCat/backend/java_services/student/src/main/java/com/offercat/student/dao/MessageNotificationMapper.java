package com.offercat.student.dao;

import com.offercat.student.entity.MessageNotification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 消息通知数据访问层
 */
@Mapper
public interface MessageNotificationMapper {
    
    /**
     * 插入通知
     */
    void insert(MessageNotification notification);
    
    /**
     * 获取用户未读消息列表
     */
    List<MessageNotification> getUnreadByReceiverId(@Param("receiverId") Long receiverId);
    
    /**
     * 获取用户所有消息列表（按时间倒序）
     */
    List<MessageNotification> getAllByReceiverId(@Param("receiverId") Long receiverId);
    
    /**
     * 标记消息为已读
     */
    void markAsRead(@Param("id") Long id);
    
    /**
     * 标记所有消息为已读
     */
    void markAllAsRead(@Param("receiverId") Long receiverId);
    
    /**
     * 获取未读消息数量
     */
    Integer countUnread(@Param("receiverId") Long receiverId);
    
    /**
     * 删除消息
     */
    void delete(@Param("id") Long id);
}
