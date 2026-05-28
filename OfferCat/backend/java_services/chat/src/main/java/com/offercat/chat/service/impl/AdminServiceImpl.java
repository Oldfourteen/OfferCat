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
            // 尝试解析为数字（用户ID）
            Long numericKeyword = null;
            try {
                numericKeyword = Long.parseLong(trimmedKeyword);
            } catch (NumberFormatException e) {
                // 不是纯数字，继续模糊搜索
            }

            // 构建模糊搜索关键词
            String likeKeyword = "%" + trimmedKeyword + "%";

            // 使用模糊搜索方法，支持用户ID、昵称、手机号的匹配
            List<User> users = userMapper.searchUserByKeyword(trimmedKeyword, numericKeyword, likeKeyword);

            for (User user : users) {
                Map<String, Object> userMap = new HashMap<>();
                userMap.put("userId", user.getUserId());
                userMap.put("username", user.getNickname() != null ? user.getNickname() : user.getPhone());
                userMap.put("nickname", user.getNickname());
                userMap.put("phone", user.getPhone());
                userMap.put("email", user.getEmail());
                result.add(userMap);
            }
        } catch (Exception e) {
            log.error("搜索用户失败: keyword={}", trimmedKeyword, e);
        }

        log.info("搜索用户: keyword={}, resultCount={}", trimmedKeyword, result.size());
        return result;
    }

    @Override
    public List<Map<String, Object>> getMutedUsers() {
        List<Map<String, Object>> result = new ArrayList<>();

        try {
            List<UserMute> mutedList = userMuteMapper.selectAllActiveMutes();

            for (UserMute mute : mutedList) {
                User user = userMapper.selectById(mute.getUserId());
                if (user != null) {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("userId", user.getUserId());
                    userMap.put("username", user.getNickname() != null ? user.getNickname() : user.getPhone());
                    userMap.put("phone", user.getPhone());
                    userMap.put("duration", mute.getDuration());
                    userMap.put("endTime", mute.getEndTime());
                    userMap.put("startTime", mute.getStartTime());
                    userMap.put("reason", mute.getReason());
                    result.add(userMap);
                }
            }
        } catch (Exception e) {
            log.error("获取禁言用户列表失败", e);
        }

        log.info("获取禁言用户列表: count={}", result.size());
        return result;
    }
}
