package com.offercat.student.service.impl;

import com.offercat.student.dao.UserMuteMapper;
import com.offercat.student.entity.UserMute;
import com.offercat.student.service.ForumMuteService;
import com.offercat.user.dao.UserMapper;
import com.offercat.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ForumMuteServiceImpl implements ForumMuteService {

  public static final String MUTE_BLOCK_MESSAGE = "您已被禁言，暂时无法发帖或评论";

  @Autowired
  private UserMuteMapper userMuteMapper;

  @Autowired
  private UserMapper userMapper;

  @Override
  public boolean isUserMuted(Long userId) {
    if (userId == null) {
      return false;
    }
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
  public String getMuteBlockMessage(Long userId) {
    return isUserMuted(userId) ? MUTE_BLOCK_MESSAGE : null;
  }

  @Override
  public void assertUserCanPost(Long userId) {
    String msg = getMuteBlockMessage(userId);
    if (msg != null) {
      throw new IllegalStateException(msg);
    }
  }

  @Override
  @Transactional
  public boolean muteUser(Long userId, Long durationSeconds, Long operatorId, String reason) {
    if (userId == null) {
      return false;
    }
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime endTime = null;
    long duration = durationSeconds == null ? -1L : durationSeconds;
    if (duration > 0) {
      endTime = now.plusSeconds(duration);
    }

    UserMute existing = userMuteMapper.selectCurrentMuteByUserId(userId);
    if (existing != null) {
      userMuteMapper.updateStatus(existing.getId(), 0);
    }

    UserMute mute = UserMute.builder()
        .userId(userId)
        .duration(duration)
        .startTime(now)
        .endTime(endTime)
        .reason(reason != null ? reason : "违反社区规定")
        .operatorId(operatorId != null ? operatorId : 0L)
        .status(1)
        .createTime(now)
        .updateTime(now)
        .build();
    userMuteMapper.insert(mute);
    return true;
  }

  @Override
  @Transactional
  public boolean unmuteUser(Long userId) {
    if (userId == null) {
      return false;
    }
    UserMute mute = userMuteMapper.selectCurrentMuteByUserId(userId);
    if (mute == null) {
      return false;
    }
    userMuteMapper.updateStatus(mute.getId(), 0);
    return true;
  }

  @Override
  public List<Map<String, Object>> listActiveMutedUsers() {
    List<Map<String, Object>> result = new ArrayList<>();
    List<UserMute> mutes = userMuteMapper.selectAllActiveMutes();
    for (UserMute mute : mutes) {
      User user = userMapper.selectById(mute.getUserId());
      if (user == null) {
        continue;
      }
      Map<String, Object> row = new HashMap<>();
      row.put("userId", user.getUserId());
      row.put("username", user.getNickname() != null ? user.getNickname() : user.getPhone());
      row.put("nickname", user.getNickname());
      row.put("phone", user.getPhone());
      row.put("duration", mute.getDuration());
      row.put("startTime", mute.getStartTime());
      row.put("endTime", mute.getEndTime());
      row.put("reason", mute.getReason());
      row.put("isPermanent", mute.getEndTime() == null || (mute.getDuration() != null && mute.getDuration() == -1L));
      if (mute.getEndTime() != null) {
        row.put("remainingSeconds", Math.max(0, ChronoUnit.SECONDS.between(LocalDateTime.now(), mute.getEndTime())));
      } else {
        row.put("remainingSeconds", -1L);
      }
      result.add(row);
    }
    return result;
  }
}
