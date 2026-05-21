package com.offercat.chat.service.impl;

import com.offercat.chat.entity.UserMute;
import com.offercat.chat.mapper.UserMuteMapper;
import com.offercat.chat.service.AdminService;
import com.offercat.user.dao.UserMapper;
import com.offercat.user.entity.User;
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
 * 管理员服务实现类 功能：实现管理员相关的业务逻辑处理
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserMuteMapper userMuteMapper;
    private final UserMapper userMapper;

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
        // 调用student服务的帖子删除接口
        // 这里通过HTTP调用或Feign调用student服务的删除接口
        // 暂时返回true，实际实现需要调用ForumPostService
        return true;
    }

    @Override
    public List<Map<String, Object>> searchUser(String keyword) {
        List<Map<String, Object>> result = new ArrayList<>();

        if (keyword == null || keyword.trim().isEmpty()) {
            return result;
        }

        String trimmedKeyword = keyword.trim();

        try {
            // 尝试作为用户ID搜索
            Long userId = null;
            try {
                userId = Long.parseLong(trimmedKeyword);
            } catch (NumberFormatException e) {
                // 不是数字，按用户名搜索
            }

            if (userId != null) {
                // 根据ID查询
                User user = userMapper.selectById(userId);
                if (user != null) {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("userId", user.getUserId());
                    userMap.put("username", user.getNickname() != null ? user.getNickname() : user.getPhone());
                    userMap.put("phone", user.getPhone());
                    userMap.put("email", user.getEmail());
                    result.add(userMap);
                }
            } else {
                // 根据手机号搜索
                User user = userMapper.selectByPhone(trimmedKeyword);
                if (user != null) {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("userId", user.getUserId());
                    userMap.put("username", user.getNickname() != null ? user.getNickname() : user.getPhone());
                    userMap.put("phone", user.getPhone());
                    userMap.put("email", user.getEmail());
                    result.add(userMap);
                }
            }
        } catch (Exception e) {
            log.error("搜索用户失败: keyword={}", trimmedKeyword, e);
        }

        log.info("搜索用户: keyword={}, resultCount={}", trimmedKeyword, result.size());
        return result;
    }
}
