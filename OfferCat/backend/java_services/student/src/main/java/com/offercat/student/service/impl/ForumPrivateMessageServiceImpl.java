package com.offercat.student.service.impl;

import com.offercat.student.dao.ForumPrivateMessageMapper;
import com.offercat.student.dto.SendPrivateMessageDTO;
import com.offercat.student.entity.ForumPrivateMessage;
import com.offercat.student.service.ForumPrivateMessageService;
import com.offercat.student.vo.PrivateConversationVO;
import com.offercat.student.vo.PrivateMessageVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumPrivateMessageServiceImpl implements ForumPrivateMessageService {

    @Autowired
    private ForumPrivateMessageMapper privateMessageMapper;

    @Override
    public List<PrivateConversationVO> getConversations(Long userId) {
        return privateMessageMapper.getConversations(userId);
    }

    @Override
    public List<PrivateMessageVO> getChatHistory(Long userId, Long targetUserId) {
        return privateMessageMapper.getChatHistory(userId, targetUserId);
    }

    @Override
    public void sendMessage(SendPrivateMessageDTO dto) {
        ForumPrivateMessage message = new ForumPrivateMessage();
        message.setSenderId(dto.getSenderId());
        message.setReceiverId(dto.getReceiverId());
        message.setContent(dto.getContent());
        privateMessageMapper.insertMessage(message);
    }

    @Override
    public void markAsRead(Long userId, Long targetUserId) {
        privateMessageMapper.markAsRead(userId, targetUserId);
    }
}