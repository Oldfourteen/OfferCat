package com.offercat.chat.service.impl;

import com.offercat.chat.entity.ChatMessage;
import com.offercat.chat.entity.UserMute;
import com.offercat.chat.mapper.ChatMessageMapper;
import com.offercat.chat.mapper.UserMuteMapper;
import com.offercat.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * 聊天服务实现类
 * 功能：实现聊天消息的业务逻辑处理
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatMessageMapper chatMessageMapper;
    private final UserMuteMapper userMuteMapper;

    @Override
    @Transactional
    public ChatMessage saveMessage(ChatMessage message) {
        message.setCreateTime(LocalDateTime.now());
        message.setUpdateTime(LocalDateTime.now());
        message.setIsRead(0);
        chatMessageMapper.insert(message);
        log.info("保存消息: userId={}, content={}", message.getSenderId(), message.getContent());
        return message;
    }

    @Override
    @Transactional
    public void saveMessages(List<ChatMessage> messages) {
        if (messages == null || messages.isEmpty()) {
            return;
        }
        LocalDateTime now = LocalDateTime.now();
        messages.forEach(msg -> {
            msg.setCreateTime(now);
            msg.setUpdateTime(now);
            msg.setIsRead(0);
        });
        chatMessageMapper.batchInsert(messages);
        log.info("批量保存消息: count={}", messages.size());
    }

    @Override
    public List<ChatMessage> getChatHistory(Long userId) {
        return chatMessageMapper.selectChatHistory(userId);
    }

    @Override
    @Transactional
    public ChatMessage sendMessage(Long senderId, Long receiverId, String content) {
        if (isUserMuted(senderId)) {
            throw new IllegalStateException("用户已被禁言");
        }

        ChatMessage message = ChatMessage.builder()
                .senderId(senderId)
                .receiverId(receiverId)
                .content(content)
                .messageType(0)
                .isRead(0)
                .createTime(LocalDateTime.now())
                .updateTime(LocalDateTime.now())
                .build();

        chatMessageMapper.insert(message);
        log.info("发送消息: senderId={}, receiverId={}, content={}", senderId, receiverId, content);
        return message;
    }

    @Override
    public boolean isUserMuted(Long userId) {
        UserMute mute = userMuteMapper.selectCurrentMuteByUserId(userId);
        if (mute == null) {
            return false;
        }

        if (mute.getEndTime() == null) {
            return true;
        }

        return mute.getEndTime().isAfter(LocalDateTime.now());
    }

    @Override
    public Long getMuteRemainingTime(Long userId) {
        UserMute mute = userMuteMapper.selectCurrentMuteByUserId(userId);
        if (mute == null) {
            return 0L;
        }

        if (mute.getEndTime() == null) {
            return -1L;
        }

        LocalDateTime now = LocalDateTime.now();
        if (mute.getEndTime().isBefore(now)) {
            return 0L;
        }

        return ChronoUnit.SECONDS.between(now, mute.getEndTime());
    }
}