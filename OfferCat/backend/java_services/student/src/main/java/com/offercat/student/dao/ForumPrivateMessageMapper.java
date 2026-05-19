package com.offercat.student.dao;

import com.offercat.student.entity.ForumPrivateMessage;
import com.offercat.student.vo.PrivateConversationVO;
import com.offercat.student.vo.PrivateMessageVO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ForumPrivateMessageMapper {

    @Insert("INSERT INTO forum_private_message(sender_id, receiver_id, content, is_read) VALUES(#{senderId}, #{receiverId}, #{content}, 0)")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertMessage(ForumPrivateMessage message);

    @Select("SELECT m.id, m.sender_id as senderId, m.receiver_id as receiverId, m.content, m.is_read as isRead, m.create_time as createTime " +
            "FROM forum_private_message m " +
            "WHERE (m.sender_id = #{userId} AND m.receiver_id = #{targetUserId}) " +
            "   OR (m.sender_id = #{targetUserId} AND m.receiver_id = #{userId}) " +
            "ORDER BY m.create_time ASC")
    List<PrivateMessageVO> getChatHistory(@Param("userId") Long userId, @Param("targetUserId") Long targetUserId);

    @Select("SELECT " +
            "  t.targetUserId, " +
            "  u.nickname as targetUserName, " +
            "  u.avatar as targetUserAvatar, " +
            "  m.content as lastMessageContent, " +
            "  m.create_time as lastMessageTime, " +
            "  (SELECT COUNT(*) FROM forum_private_message sub WHERE sub.receiver_id = #{userId} AND sub.sender_id = t.targetUserId AND sub.is_read = 0) as unreadCount " +
            "FROM ( " +
            "  SELECT IF(sender_id = #{userId}, receiver_id, sender_id) as targetUserId, MAX(id) as maxId " +
            "  FROM forum_private_message " +
            "  WHERE sender_id = #{userId} OR receiver_id = #{userId} " +
            "  GROUP BY IF(sender_id = #{userId}, receiver_id, sender_id) " +
            ") t " +
            "JOIN forum_private_message m ON m.id = t.maxId " +
            "LEFT JOIN user u ON u.user_id = t.targetUserId " +
            "ORDER BY m.create_time DESC")
    List<PrivateConversationVO> getConversations(@Param("userId") Long userId);

    @Update("UPDATE forum_private_message SET is_read = 1 WHERE sender_id = #{targetUserId} AND receiver_id = #{userId} AND is_read = 0")
    int markAsRead(@Param("userId") Long userId, @Param("targetUserId") Long targetUserId);
}