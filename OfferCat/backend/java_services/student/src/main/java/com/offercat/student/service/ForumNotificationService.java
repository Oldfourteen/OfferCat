package com.offercat.student.service;

import com.offercat.student.dao.ForumSysMessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 论坛互动消息写入（存入 sys_message）
 */
@Service
public class ForumNotificationService {

    private static final int MAX_LEN = 220;

    @Autowired
    private ForumSysMessageMapper forumSysMessageMapper;

    /**
     * 给自己或空目标不发
     */
    public void notifyIfDistinct(Long receiverId, Long senderId, int msgType,
                                 Long targetId, Long postId, String snippet) {
        if (receiverId == null || senderId == null) {
            return;
        }
        if (receiverId.longValue() == senderId.longValue()) {
            return;
        }
        String safe = shorten(snippet == null ? null : snippet.trim(), MAX_LEN);
        forumSysMessageMapper.insert(receiverId, senderId, msgType,
                targetId == null ? 0L : targetId,
                postId == null ? null : postId,
                safe);
    }

    static String shorten(String raw, int maxChars) {
        if (raw == null || raw.isEmpty()) {
            return null;
        }
        final int cpCount = Character.codePointCount(raw, 0, raw.length());
        if (cpCount <= maxChars) {
            return raw;
        }
        int idx = Character.offsetByCodePoints(raw, 0, Math.max(0, maxChars - 1));
        return raw.substring(0, idx) + "...";
    }
}