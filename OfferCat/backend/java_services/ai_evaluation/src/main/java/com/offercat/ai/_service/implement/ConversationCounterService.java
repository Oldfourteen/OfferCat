package com.offercat.ai._service.implement;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 对话计数器服务
 * 功能：统计面试会话的对话次数
 * 实现：使用ConcurrentHashMap存储每个会话的对话计数
 */
@Service
public class ConversationCounterService {

    // 存储会话ID到对话计数的映射
    private final Map<Long, Integer> conversationCounters = new ConcurrentHashMap<>();

    /**
     * 初始化会话计数器
     * 输入：会话ID
     * 输出：无
     */
    public void initCounter(Long sessionId) {
        conversationCounters.put(sessionId, 0);
    }

    /**
     * 增加对话计数
     * 输入：会话ID
     * 输出：增加后的计数
     */
    public int incrementCounter(Long sessionId) {
        return conversationCounters.compute(sessionId, (key, value) -> {
            if (value == null) {
                return 1;
            }
            return value + 1;
        });
    }

    /**
     * 获取当前对话计数
     * 输入：会话ID
     * 输出：当前计数，未初始化返回0
     */
    public int getCounter(Long sessionId) {
        return conversationCounters.getOrDefault(sessionId, 0);
    }

    /**
     * 重置对话计数
     * 输入：会话ID
     * 输出：无
     */
    public void resetCounter(Long sessionId) {
        conversationCounters.put(sessionId, 0);
    }

    /**
     * 移除会话计数器（会话结束时）
     * 输入：会话ID
     * 输出：无
     */
    public void removeCounter(Long sessionId) {
        conversationCounters.remove(sessionId);
    }
}