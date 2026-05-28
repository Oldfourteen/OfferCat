package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.service.ForumMuteService;
import com.offercat.user.dao.UserMapper;
import com.offercat.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * 论坛管理（用户搜索、禁言）— 挂在 /forum/admin 下，走 forum 网关路由，不依赖 chat-service。
 */
@RestController
@RequestMapping("/forum/admin")
@CrossOrigin(origins = "*")
public class ForumAdminController {

  @Autowired
  private UserMapper userMapper;

  @Autowired
  private ForumMuteService forumMuteService;

  private void assertAdmin(Long operatorUserId) {
    if (operatorUserId == null) {
      throw new IllegalArgumentException("缺少operatorUserId");
    }
    User op = userMapper.selectById(operatorUserId);
    if (op == null) {
      throw new IllegalArgumentException("操作者不存在");
    }
    if (op.getUserStatus() != null && op.getUserStatus() != 1) {
      throw new IllegalStateException("操作者账号不可用");
    }
    if (op.getUserRole() == null || op.getUserRole() != 4) {
      throw new IllegalStateException("无管理员权限");
    }
  }

  @GetMapping("/user-suggest")
  public ResponseResult<List<User>> userSuggest(
      @RequestParam("operatorUserId") Long operatorUserId,
      @RequestParam(value = "keyword", required = false) String keyword,
      @RequestParam(value = "role", required = false) Integer role,
      @RequestParam(value = "limit", required = false, defaultValue = "10") Integer limit) {
    try {
      assertAdmin(operatorUserId);
      String k = keyword == null ? "" : keyword.trim();
      if (k.isEmpty()) {
        return ResponseResult.success(Collections.emptyList());
      }
      int l = Math.min(Math.max(limit != null ? limit : 10, 1), 20);
      Long numeric = null;
      if (k.length() <= 18 && k.chars().allMatch(Character::isDigit)) {
        try {
          numeric = Long.parseLong(k);
        } catch (NumberFormatException ignored) {
          numeric = null;
        }
      }
      String prefix = k + "%";
      String contains = "%" + k + "%";
      List<User> list = userMapper.searchUserSuggestions(k, numeric, prefix, contains, l, role);
      return ResponseResult.success(list);
    } catch (IllegalArgumentException e) {
      return ResponseResult.error(401, e.getMessage());
    } catch (IllegalStateException e) {
      return ResponseResult.error(403, e.getMessage());
    } catch (Exception e) {
      return ResponseResult.error(500, "查询失败: " + e.getMessage());
    }
  }

  @GetMapping("/mute/list")
  public ResponseResult<List<Map<String, Object>>> listMutedUsers(
      @RequestParam("operatorUserId") Long operatorUserId) {
    try {
      assertAdmin(operatorUserId);
      return ResponseResult.success(forumMuteService.listActiveMutedUsers());
    } catch (IllegalArgumentException e) {
      return ResponseResult.error(401, e.getMessage());
    } catch (IllegalStateException e) {
      return ResponseResult.error(403, e.getMessage());
    } catch (Exception e) {
      return ResponseResult.error(500, "查询失败: " + e.getMessage());
    }
  }

  @PostMapping("/mute")
  public ResponseResult<Void> muteUser(@RequestBody Map<String, Object> body) {
    try {
      Long operatorUserId = body.get("operatorUserId") != null
          ? Long.parseLong(body.get("operatorUserId").toString()) : null;
      assertAdmin(operatorUserId);
      Long userId = Long.parseLong(body.get("userId").toString());
      Long duration = Long.parseLong(body.get("duration").toString());
      Long operatorId = body.get("operatorId") != null
          ? Long.parseLong(body.get("operatorId").toString()) : operatorUserId;
      String reason = body.get("reason") != null ? body.get("reason").toString() : "违反社区规定";
      forumMuteService.muteUser(userId, duration, operatorId, reason);
      return ResponseResult.success();
    } catch (IllegalArgumentException e) {
      return ResponseResult.error(401, e.getMessage());
    } catch (IllegalStateException e) {
      return ResponseResult.error(403, e.getMessage());
    } catch (Exception e) {
      return ResponseResult.error(500, "禁言失败: " + e.getMessage());
    }
  }

  @PostMapping("/unmute/{userId}")
  public ResponseResult<Void> unmuteUser(
      @RequestParam("operatorUserId") Long operatorUserId,
      @PathVariable("userId") Long userId) {
    try {
      assertAdmin(operatorUserId);
      forumMuteService.unmuteUser(userId);
      return ResponseResult.success();
    } catch (IllegalArgumentException e) {
      return ResponseResult.error(401, e.getMessage());
    } catch (IllegalStateException e) {
      return ResponseResult.error(403, e.getMessage());
    } catch (Exception e) {
      return ResponseResult.error(500, "解禁失败: " + e.getMessage());
    }
  }
}
