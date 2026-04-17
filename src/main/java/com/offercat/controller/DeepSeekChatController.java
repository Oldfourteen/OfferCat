package com.offercat.controller;

import com.offercat.infrastructure.common.ResponseResult;
import com.offercat.service.DeepSeekChatServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author: Ofteen
 * @data: 2026/4/17 - 20:27
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@RestController
@RequestMapping("/api/ai")
public class DeepSeekChatController {
    @Autowired
    private DeepSeekChatServices deepSeekChatServices;

    @PostMapping("/chat")
    public ResponseResult<String> chat(
            @RequestParam Long userId,
            @RequestParam String majorCode,
            @RequestParam String question
    ){
        String answer = deepSeekChatServices.chatWithAI(userId, majorCode, question);

        return ResponseResult.success(answer);
    }
}
