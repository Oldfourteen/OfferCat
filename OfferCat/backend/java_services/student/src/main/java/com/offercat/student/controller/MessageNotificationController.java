package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.entity.MessageNotification;
import com.offercat.student.service.MessageNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 消息通知控制器
 */
@RestController
@RequestMapping("/api/notification")
@CrossOrigin(origins = "*")
public class MessageNotificationController {

    @Autowired
    private MessageNotificationService notificationService;

    /**
     * 发送客服消息（用户调用）
     */
    @PostMapping("/customer-service")
    public ResponseResult<Void> sendCustomerService(@RequestBody Map<String, Object> request) {
        Long userId = ((Number) request.get("userId")).longValue();
        String nickname = (String) request.get("nickname");
        String phone = (String) request.get("phone");
        
        notificationService.sendCustomerServiceMessage(userId, nickname, phone);
        return ResponseResult.success();
    }

    /**
     * 发送意见反馈（用户调用）
     */
    @PostMapping("/feedback")
    public ResponseResult<Void> sendFeedback(@RequestBody Map<String, Object> request) {
        Long userId = ((Number) request.get("userId")).longValue();
        String nickname = (String) request.get("nickname");
        String phone = (String) request.get("phone");
        String feedback = (String) request.get("feedback");
        
        notificationService.sendFeedback(userId, nickname, phone, feedback);
        return ResponseResult.success();
    }

    /**
     * 管理员回复用户消息
     */
    @PostMapping("/reply")
    public ResponseResult<Void> replyToUser(@RequestBody Map<String, Object> request) {
        Long adminId = ((Number) request.get("adminId")).longValue();
        String adminNickname = (String) request.get("adminNickname");
        Long userId = ((Number) request.get("userId")).longValue();
        String content = (String) request.get("content");
        
        notificationService.replyToUser(adminId, adminNickname, userId, content);
        return ResponseResult.success();
    }

    /**
     * 获取用户消息列表
     */
    @GetMapping("/list/{userId}")
    public ResponseResult<List<MessageNotification>> getUserMessages(@PathVariable Long userId) {
        List<MessageNotification> messages = notificationService.getUserMessages(userId);
        return ResponseResult.success(messages);
    }

    /**
     * 获取未读消息数量
     */
    @GetMapping("/unread-count/{userId}")
    public ResponseResult<Map<String, Integer>> getUnreadCount(@PathVariable Long userId) {
        Integer count = notificationService.getUnreadCount(userId);
        Map<String, Integer> result = new HashMap<>();
        result.put("count", count);
        return ResponseResult.success(result);
    }

    /**
     * 标记消息为已读
     */
    @PostMapping("/read/{id}")
    public ResponseResult<Void> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseResult.success();
    }

    /**
     * 标记所有消息为已读
     */
    @PostMapping("/read-all/{userId}")
    public ResponseResult<Void> markAllAsRead(@PathVariable Long userId) {
        notificationService.markAllAsRead(userId);
        return ResponseResult.success();
    }

    /**
     * 删除消息
     */
    @DeleteMapping("/{id}")
    public ResponseResult<Void> deleteMessage(@PathVariable Long id) {
        notificationService.deleteMessage(id);
        return ResponseResult.success();
    }
}
