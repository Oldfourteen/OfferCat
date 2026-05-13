package com.offercat.ai.controller.deepseek;

import com.offercat.ai._service.AiConsultRetentionService;
import com.offercat.ai._service.deepseek.DeepSeekChatServices;
import com.offercat.ai.dto.request.AiChatModeRequest;
import com.offercat.ai.dto.request.AiConsultRetainRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.UUID;
import java.util.Map;

/**
 * @author: Ofteen
 * @data: 2026/4/17 - 20:27
 * @mail: oldfourteen41@gmail.com
 * @info: DeepSeek Chat 控制器，按 mode 提供通用对话与各专项能力（简历、面试等）
 */
@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class DeepSeekChatController {
    /**
     * DeepSeek 对话业务服务
     */
    @Autowired
    private DeepSeekChatServices deepSeekChatServices;

    /**
     * 云端咨询保留标记与按月清理策略
     */
    @Autowired
    private AiConsultRetentionService aiConsultRetentionService;
    
    /**
     * 与 AI 对话（兼容旧客户端：不传 mode 时由服务端按通用助手处理）
     */
    @PostMapping("/chat")
    public String chat(
            @RequestParam Long userId,
            @RequestParam String majorCode,
            @RequestParam String question
    ){
        String answer = deepSeekChatServices.chatWithAI(userId, majorCode, question);
        return answer;
    }

    /**
     * 全新的的接口，支持四种不同的模式
     * 输入：用户ID、专业代码、问题、咨询模式、用户图片
     * 输出：咨询结果
     */
    @PostMapping("/chat-mode")
    public String chatMode(@Valid @RequestBody AiChatModeRequest req){
        return deepSeekChatServices.chatWithAI(req.getUserId(), req.getMajorCode(), req.getMode(), req.getQuestion(), req.getUserImages());
    }

    /**
     * 流式接口，返回 SseEmitter
     * 输入：用户ID、专业代码、问题、咨询模式、用户图片
     * 输出：咨询结果
     */
    @PostMapping(value = "/chat-stream", produces = "text/event-stream;charset=UTF-8")
    public SseEmitter chatStream(@Valid @RequestBody AiChatModeRequest req) {
        SseEmitter emitter = new SseEmitter(120000L); 
        deepSeekChatServices.streamChatWithAI(
                req.getUserId(),
                req.getMajorCode(),
                req.getMode(),
                req.getQuestion(),
                req.getUserImages(),
                Boolean.TRUE.equals(req.getHrIdleTimeout()),
                emitter);
        return emitter;
    }

    /**
     * 获取历史对话记录
     * 输入：用户ID
     * 输出：对话记录列表
     */
    @GetMapping("/history")
    public Object getHistory(@RequestParam Long userId) {
        return deepSeekChatServices.getHistoryByUserId(userId);
    }

    /**
     * 标记某条云端 AI 对话是否保留。保留的记录不参与每月 15 日的自动清理；每位用户最多保留 10 条。
     * 输入：用户ID、咨询记录ID、是否保留（JSON 请求体）
     * 输出：成功时 200 无正文；失败时 400 与 JSON message
     */
    @PutMapping("/history/retain")
    public ResponseEntity<?> setHistoryRetain(@Valid @RequestBody AiConsultRetainRequest req) {
        try {
            aiConsultRetentionService.setRetained(req.getUserId(), req.getConsultId(), Boolean.TRUE.equals(req.getRetained()));
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * 上传聊天图片
     * 输入：multipart 表单字段 file（本地图片文件）
     * 输出：JSON，含可供后续问答引用的 url
     */
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
            
            /**
             * 确保目录存在
             */
            File dir = new File("D:/offercat/photo");
            if (!dir.exists()) {
                dir.mkdirs();
            }
            
            File dest = new File(dir, fileName);
            file.transferTo(dest);
            
            /**
             * 返回可访问的 URL（假设前端可以通过 /api/ai/photo/fileName 访问）
             */
            String fileUrl = "/api/ai/photo/" + fileName;
            return ResponseEntity.ok(Map.of("url", fileUrl));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "文件上传失败：" + e.getMessage()));
        }
    }
}