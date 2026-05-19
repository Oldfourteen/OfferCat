package com.offercat.ai.controller.session;

import com.offercat.ai.dao.AiUserSessionMapper;
import com.offercat.ai.entity.AiUserSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai/sessions")
public class AiUserSessionController {

    @Autowired
    private AiUserSessionMapper aiUserSessionMapper;

    @PostMapping("/sync")
    public Map<String, Object> syncToServer(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        String conversationsJson = (String) payload.get("conversations");

        AiUserSession existing = aiUserSessionMapper.selectByUserId(userId);
        if (existing == null) {
            AiUserSession newSession = new AiUserSession();
            newSession.setUserId(userId);
            newSession.setConversationsJson(conversationsJson);
            aiUserSessionMapper.insert(newSession);
        } else {
            existing.setConversationsJson(conversationsJson);
            aiUserSessionMapper.update(existing);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("message", "success");
        return result;
    }

    @GetMapping("/sync")
    public Map<String, Object> fetchFromServer(@RequestParam("userId") Long userId) {
        AiUserSession existing = aiUserSessionMapper.selectByUserId(userId);
        Map<String, Object> result = new HashMap<>();
        if (existing != null) {
            result.put("conversations", existing.getConversationsJson());
        }
        return result;
    }
}
