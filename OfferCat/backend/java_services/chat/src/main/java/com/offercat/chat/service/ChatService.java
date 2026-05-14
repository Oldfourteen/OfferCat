package com.offercat.chat.service;

import com.offercat.chat.entity.ChatMessage;

import java.util.List;
import java.util.Map;

/**
 * 聊天服务接口
 * 功能：提供聊天消息的业务逻辑处理
 */
public interface ChatService {

    /**
     * 保存单条消息
     *
     * @param message 消息对象
     * @return 保存后的消息对象
     */
    ChatMessage saveMessage(ChatMessage message);

    /**
     * 批量保存消息
     *
     * @param messages 消息列表
     */
    void saveMessages(List<ChatMessage> messages);

    /**
     * 根据用户ID查询聊天记录
     *
     * @param userId 用户ID
     * @return 聊天消息列表
     */
    List<ChatMessage> getChatHistory(Long userId);

    /**
     * 发送消息
     *
     * @param senderId   发送者ID
     * @param receiverId 接收者ID
     * @param content    消息内容
     * @return 发送的消息对象
     */
    ChatMessage sendMessage(Long senderId, Long receiverId, String content);

    /**
     * 检查用户是否被禁言
     *
     * @param userId 用户ID
     * @return 是否被禁言
     */
    boolean isUserMuted(Long userId);

    /**
     * 获取用户禁言剩余时间（秒）
     *
     * @param userId 用户ID
     * @return 剩余秒数，-1表示永久禁言，0表示未禁言
     */
    Long getMuteRemainingTime(Long userId);
}