package com.offercat.chat.controller;

import com.offercat.chat.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 管理员控制器
 * 功能：处理管理员相关的HTTP请求
 */
@Slf4j
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    /**
     * 禁言用户
     *
     * @param request 请求体，包含userId、duration、operatorId、reason
     * @return 禁言结果
     */
    @PostMapping("/mute")
    public ResponseEntity<Map<String, Object>> muteUser(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            Long userId = Long.parseLong(request.get("userId").toString());
            Long duration = Long.parseLong(request.get("duration").toString());
            Long operatorId = request.containsKey("operatorId") ? 
                    Long.parseLong(request.get("operatorId").toString()) : 0L;
            String reason = (String) request.getOrDefault("reason", "违反社区规定");

            boolean success = adminService.muteUser(userId, duration, operatorId, reason);
            response.put("success", success);
            response.put("message", success ? "禁言成功" : "禁言失败");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("禁言用户失败", e);
            response.put("success", false);
            response.put("message", "禁言失败");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * 解禁用户
     *
     * @param userId 用户ID
     * @return 解禁结果
     */
    @PostMapping("/unmute/{userId}")
    public ResponseEntity<Map<String, Object>> unmuteUser(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean success = adminService.unmuteUser(userId);
            response.put("success", success);
            response.put("message", success ? "解禁成功" : "解禁失败");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("解禁用户失败", e);
            response.put("success", false);
            response.put("message", "解禁失败");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * 删除帖子
     *
     * @param postId 帖子ID
     * @return 删除结果
     */
    @DeleteMapping("/post/{postId}")
    public ResponseEntity<Map<String, Object>> deletePost(@PathVariable Long postId) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean success = adminService.deletePost(postId);
            response.put("success", success);
            response.put("message", success ? "删除成功" : "删除失败");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("删除帖子失败", e);
            response.put("success", false);
            response.put("message", "删除失败");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * 搜索用户
     *
     * @param keyword 关键词
     * @return 用户列表
     */
    @GetMapping("/search/user")
    public ResponseEntity<List<Map<String, Object>>> searchUser(@RequestParam String keyword) {
        List<Map<String, Object>> users = adminService.searchUser(keyword);
        return ResponseEntity.ok(users);
    }
}