package com.offercat.student.service.impl;

import com.offercat.student.dao.ForumPrivateMessageMapper;
import com.offercat.student.dao.UserIdentityMapper;
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

    @Autowired
    private UserIdentityMapper userIdentityMapper;

    private Long normalizeUserId(Long rawId) {
        if (rawId == null) return null;
        Long exists = userIdentityMapper.findUserId(rawId);
        Long userId = exists != null ? rawId : userIdentityMapper.findUserIdByStudentId(rawId);
        if (userId == null) userId = rawId;
        Long studentId = userIdentityMapper.findStudentIdByUserId(userId);
        if (studentId != null && !studentId.equals(userId)) {
            userIdentityMapper.migrateSenderId(studentId, userId);
            userIdentityMapper.migrateReceiverId(studentId, userId);
        }
        if (exists == null && !rawId.equals(userId)) {
            userIdentityMapper.migrateSenderId(rawId, userId);
            userIdentityMapper.migrateReceiverId(rawId, userId);
        }
        return userId;
    }

    @Override
    public List<PrivateConversationVO> getConversations(Long userId) {
        Long uid = normalizeUserId(userId);
        return privateMessageMapper.getConversations(uid);
    }

    @Override
    public List<PrivateMessageVO> getChatHistory(Long userId, Long targetUserId) {
        Long uid = normalizeUserId(userId);
        Long tid = normalizeUserId(targetUserId);
        return privateMessageMapper.getChatHistory(uid, tid);
    }

    @Override
    public void sendMessage(SendPrivateMessageDTO dto) {
        Long senderId = normalizeUserId(dto.getSenderId());
        Long receiverId = normalizeUserId(dto.getReceiverId());
        ForumPrivateMessage message = new ForumPrivateMessage();
        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setContent(dto.getContent());
        privateMessageMapper.insertMessage(message);
    }

    @Override
    public void markAsRead(Long userId, Long targetUserId) {
        Long uid = normalizeUserId(userId);
        Long tid = normalizeUserId(targetUserId);
        privateMessageMapper.markAsRead(uid, tid);
    }
}
