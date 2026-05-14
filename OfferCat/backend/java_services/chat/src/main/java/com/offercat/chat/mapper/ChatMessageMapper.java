package com.offercat.chat.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.offercat.chat.entity.ChatMessage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 聊天消息Mapper接口
 * 功能：提供聊天消息的数据库操作
 */
@Mapper
public interface ChatMessageMapper extends BaseMapper<ChatMessage> {

    /**
     * 根据用户ID查询聊天记录
     *
     * @param userId 用户ID
     * @return 聊天消息列表
     */
    List<ChatMessage> selectByUserId(@Param("userId") Long userId);

    /**
     * 查询用户与客服之间的对话记录
     *
     * @param userId 用户ID
     * @return 聊天消息列表
     */
    List<ChatMessage> selectChatHistory(@Param("userId") Long userId);

    /**
     * 批量插入消息
     *
     * @param messages 消息列表
     * @return 插入成功数量
     */
    int batchInsert(@Param("messages") List<ChatMessage> messages);
}