package com.offercat.student.service;

import com.offercat.student.entity.UserMute;

import java.util.List;
import java.util.Map;

public interface ForumMuteService {

    boolean isUserMuted(Long userId);

    String getMuteBlockMessage(Long userId);

    void assertUserCanPost(Long userId);

    boolean muteUser(Long userId, Long durationSeconds, Long operatorId, String reason);

    boolean unmuteUser(Long userId);

    List<Map<String, Object>> listActiveMutedUsers();
}
