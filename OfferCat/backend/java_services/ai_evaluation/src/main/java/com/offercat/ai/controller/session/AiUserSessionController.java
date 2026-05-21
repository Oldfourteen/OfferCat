package com.offercat.ai.controller.session;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.offercat.ai.dao.AiUserSessionMapper;
import com.offercat.ai.entity.AiUserSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 前端 AI 会话列表（conversations JSON）云端同步。
 * 路径：POST/GET /api/ai/sessions/sync
 */
@RestController
@RequestMapping("/api/ai/sessions")
public class AiUserSessionController {

    @Autowired
    private AiUserSessionMapper aiUserSessionMapper;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/sync")
    public ResponseEntity<?> syncToServer(@RequestBody Map<String, Object> payload) {
        if (!payload.containsKey("userId") || !payload.containsKey("conversations")) {
            return ResponseEntity.badRequest().body(Map.of("error", "参数不完整"));
        }
        Long userId = Long.valueOf(payload.get("userId").toString());
        String conversationsJson = toConversationsJson(payload.get("conversations"));

        AiUserSession session = new AiUserSession();
        session.setUserId(userId);
        session.setConversationsJson(conversationsJson);
        aiUserSessionMapper.upsert(session);
        return ResponseEntity.ok(Map.of("success", true));
    }

    private String toConversationsJson(Object conversations) {
        if (conversations == null) {
            return "[]";
        }
        if (conversations instanceof String s) {
            return s;
        }
        try {
            return objectMapper.writeValueAsString(conversations);
        } catch (Exception e) {
            return conversations.toString();
        }
    }

    @GetMapping("/sync")
    public ResponseEntity<?> fetchFromServer(@RequestParam Long userId) {
        AiUserSession existing = aiUserSessionMapper.selectByUserId(userId);
        if (existing != null && existing.getConversationsJson() != null) {
            return ResponseEntity.ok(Map.of("conversations", existing.getConversationsJson()));
        }
        return ResponseEntity.ok(Map.of("conversations", "[]"));
    }
}
