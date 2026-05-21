package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.dto.SendPrivateMessageDTO;
import com.offercat.student.service.ForumPrivateMessageService;
import com.offercat.student.vo.PrivateConversationVO;
import com.offercat.student.vo.PrivateMessageVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/forum/private-message")
public class ForumPrivateMessageController {

    @Autowired
    private ForumPrivateMessageService privateMessageService;

    @GetMapping("/conversations")
    public ResponseResult<List<PrivateConversationVO>> getConversations(@RequestParam("userId") Long userId) {
        return ResponseResult.success(privateMessageService.getConversations(userId));
    }

    @GetMapping("/history")
    public ResponseResult<List<PrivateMessageVO>> getChatHistory(@RequestParam("userId") Long userId, @RequestParam("targetUserId") Long targetUserId) {
        privateMessageService.markAsRead(userId, targetUserId);
        return ResponseResult.success(privateMessageService.getChatHistory(userId, targetUserId));
    }

    @PostMapping("/send")
    public ResponseResult<Void> sendMessage(@RequestBody SendPrivateMessageDTO dto) {
        privateMessageService.sendMessage(dto);
        return ResponseResult.success(null);
    }
}
