package com.offercat.student.service;

import com.offercat.student.dto.SendPrivateMessageDTO;
import com.offercat.student.vo.PrivateConversationVO;
import com.offercat.student.vo.PrivateMessageVO;

import java.util.List;

public interface ForumPrivateMessageService {
    List<PrivateConversationVO> getConversations(Long userId);
    List<PrivateMessageVO> getChatHistory(Long userId, Long targetUserId);
    void sendMessage(SendPrivateMessageDTO dto);
    void markAsRead(Long userId, Long targetUserId);
}