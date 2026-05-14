package com.offercat.chat.controller;

import com.offercat.chat.entity.ChatMessage;
import com.offercat.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 聊天控制器
 * 功能：处理聊天相关的HTTP请求
 */
@Slf4j
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    /**
     * 获取聊天历史记录
     *
     * @param userId 用户ID
     * @return 聊天消息列表
     */
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable Long userId) {
        List<ChatMessage> history = chatService.getChatHistory(userId);
        return ResponseEntity.ok(history);
    }

    /**
     * 发送消息
     *
     * @param request 请求体，包含senderId、receiverId、content
     * @return 发送的消息对象
     */
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, Object> request) {
        try {
            Long senderId = Long.parseLong(request.get("senderId").toString());
            Long receiverId = Long.parseLong(request.get("receiverId").toString());
            String content = request.get("content").toString();

            ChatMessage message = chatService.sendMessage(senderId, receiverId, content);
            return ResponseEntity.ok(message);
        } catch (IllegalStateException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            log.error("发送消息失败", e);
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "发送失败");
            return ResponseEntity.internalServerError().body(error);
        }
    }

    /**
     * 保存聊天记录
     *
     * @param request 请求体，包含messages数组
     * @return 保存结果
     */
    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveMessages(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Map<String, Object>> messages = (List<Map<String, Object>>) request.get("messages");
            if (messages != null && !messages.isEmpty()) {
                List<ChatMessage> chatMessages = messages.stream()
                        .map(msg -> ChatMessage.builder()
                                .senderId(((Number) msg.get("senderId")).longValue())
                                .receiverId(((Number) msg.get("receiverId")).longValue())
                                .content((String) msg.get("content"))
                                .messageType(((Number) msg.getOrDefault("messageType", 0)).intValue())
                                .isRead(((Number) msg.getOrDefault("isRead", 0)).intValue())
                                .build())
                        .toList();
                chatService.saveMessages(chatMessages);
            }
            response.put("success", true);
            response.put("message", "保存成功");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("保存消息失败", e);
            response.put("success", false);
            response.put("message", "保存失败");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * 检查用户是否被禁言
     *
     * @param userId 用户ID
     * @return 禁言状态
     */
    @GetMapping("/mute/check/{userId}")
    public ResponseEntity<Map<String, Object>> checkMuteStatus(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        boolean isMuted = chatService.isUserMuted(userId);
        response.put("isMuted", isMuted);
        if (isMuted) {
            Long remainingTime = chatService.getMuteRemainingTime(userId);
            response.put("remainingTime", remainingTime);
            response.put("isPermanent", remainingTime == -1);
        }
        return ResponseEntity.ok(response);
    }
}