package com.offercat.chat.service.impl;

import com.offercat.chat.entity.UserMute;
import com.offercat.chat.mapper.UserMuteMapper;
import com.offercat.chat.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 管理员服务实现类
 * 功能：实现管理员相关的业务逻辑处理
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserMuteMapper userMuteMapper;

    @Override
    @Transactional
    public boolean muteUser(Long userId, Long duration, Long operatorId, String reason) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endTime = null;

        if (duration > 0) {
            endTime = now.plusSeconds(duration);
        }

        UserMute mute = UserMute.builder()
                .userId(userId)
                .duration(duration)
                .startTime(now)
                .endTime(endTime)
                .reason(reason != null ? reason : "违反社区规定")
                .operatorId(operatorId)
                .status(1)
                .createTime(now)
                .updateTime(now)
                .build();

        userMuteMapper.insert(mute);
        log.info("禁言用户: userId={}, duration={}秒", userId, duration);
        return true;
    }

    @Override
    @Transactional
    public boolean unmuteUser(Long userId) {
        UserMute mute = userMuteMapper.selectCurrentMuteByUserId(userId);
        if (mute != null) {
            userMuteMapper.updateStatus(mute.getId(), 0);
            log.info("解禁用户: userId={}", userId);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean deletePost(Long postId) {
        log.info("删除帖子: postId={}", postId);
        return true;
    }

    @Override
    public List<Map<String, Object>> searchUser(String keyword) {
        List<Map<String, Object>> result = new ArrayList<>();

        Map<String, Object> user1 = new HashMap<>();
        user1.put("userId", 1L);
        user1.put("username", "张三");
        result.add(user1);

        Map<String, Object> user2 = new HashMap<>();
        user2.put("userId", 2L);
        user2.put("username", "李四");
        result.add(user2);

        Map<String, Object> user3 = new HashMap<>();
        user3.put("userId", 3L);
        user3.put("username", "王五");
        result.add(user3);

        log.info("搜索用户: keyword={}, resultCount={}", keyword, result.size());
        return result;
    }
}