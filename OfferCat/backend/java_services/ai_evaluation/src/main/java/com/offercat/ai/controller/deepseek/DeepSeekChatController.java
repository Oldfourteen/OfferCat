package com.offercat.ai.controller.deepseek;

import com.offercat.ai._service.deepseek.DeepSeekChatServices;
import com.offercat.ai.dto.request.AiChatModeRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.io.File;
import java.io.IOException;
import java.util.UUID;
import java.util.Map;

/**
 * @author: Ofteen
 * @data: 2026/4/17 - 20:27
 * @mail: oldfourteen41@gmail.com
 * @info: DeepSeek Chat 控制器，提供AI HR咨询功能
 */
@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class DeepSeekChatController {
    @Autowired
    private DeepSeekChatServices deepSeekChatServices;

    @PostMapping("/chat")
    public String chat(
            @RequestParam Long userId,
            @RequestParam String majorCode,
            @RequestParam String question
    ){
        String answer = deepSeekChatServices.chatWithAI(userId, majorCode, question);
        return answer;
    }

    //全新的接口，支持四种不同的模式
    @PostMapping("/chat-mode")
    public String chatMode(@Valid @RequestBody AiChatModeRequest req){
        return deepSeekChatServices.chatWithAI(req.getUserId(), req.getMajorCode(), req.getMode(), req.getQuestion(), req.getUserImages());
    }

    // 流式接口，返回 SseEmitter
    @PostMapping(value = "/chat-stream", produces = "text/event-stream;charset=UTF-8")
    public SseEmitter chatStream(@Valid @RequestBody AiChatModeRequest req) {
        SseEmitter emitter = new SseEmitter(120000L); // 2分钟超时
        deepSeekChatServices.streamChatWithAI(req.getUserId(), req.getMajorCode(), req.getMode(), req.getQuestion(), req.getUserImages(), emitter);
        return emitter;
    }

    // 获取历史对话记录
    @GetMapping("/history")
    public Object getHistory(@RequestParam Long userId) {
        return deepSeekChatServices.getHistoryByUserId(userId);
    }

    // 上传聊天图片
    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadChatImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "文件不能为空"));
        }
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.lastIndexOf(".") != -1) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String fileName = UUID.randomUUID().toString().replace("-", "") + extension;
            
            // 确保目录存在
            File dir = new File("D:/offercat/photo");
            if (!dir.exists()) {
                dir.mkdirs();
            }
            
            File dest = new File(dir, fileName);
            file.transferTo(dest);
            
            // 返回可访问的 URL（假设前端可以通过 /api/ai/photo/fileName 访问）
            String fileUrl = "/api/ai/photo/" + fileName;
            return ResponseEntity.ok(Map.of("url", fileUrl));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "文件上传失败：" + e.getMessage()));
        }
    }
}