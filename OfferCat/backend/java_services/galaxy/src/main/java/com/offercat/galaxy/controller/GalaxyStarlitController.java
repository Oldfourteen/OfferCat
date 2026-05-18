package com.offercat.galaxy.controller;

import com.offercat.galaxy.common.ResponseResult;
import com.offercat.galaxy.dto.StarlitLeaderboardResponse;
import com.offercat.galaxy.dto.StarlitProgressRowDto;
import com.offercat.galaxy.dto.StarlitProgressUpsertRequest;
import com.offercat.galaxy.dto.StarlitQuestionDto;
import com.offercat.galaxy.service.StarlitService;
import jakarta.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/galaxy/starlit")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class GalaxyStarlitController {

    private final StarlitService starlitService;

    /**
     * 点亮排行榜：按用户汇总 stars_lit。
     * packKeys 可选，逗号分隔，仅统计当前展示星图上的题库包（本图合计）。
     */
    @GetMapping("/leaderboard")
    public ResponseResult<StarlitLeaderboardResponse> leaderboard(
            @RequestParam long userId,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(required = false) String packKeys) {
        List<String> keys = parsePackKeys(packKeys);
        return ResponseResult.success(starlitService.leaderboard(userId, limit, keys));
    }

    @GetMapping("/progress")
    public ResponseResult<List<StarlitProgressRowDto>> progress(@RequestParam long userId) {
        return ResponseResult.success(starlitService.progressByUser(userId));
    }

    /** 推荐：query 传 packKey，避免路径中 `:` 被网关/容器误解析 */
    @GetMapping(value = "/questions", params = "packKey")
    public ResponseResult<List<StarlitQuestionDto>> questionsByQuery(@RequestParam String packKey) {
        return questionsInternal(packKey);
    }

    @GetMapping("/pack/{packKey}/questions")
    public ResponseResult<List<StarlitQuestionDto>> questions(@PathVariable String packKey) {
        return questionsInternal(packKey);
    }

    private ResponseResult<List<StarlitQuestionDto>> questionsInternal(String packKey) {
        try {
            return ResponseResult.success(starlitService.questionsByPackKey(packKey));
        } catch (IllegalArgumentException ex) {
            return ResponseResult.error(404, ex.getMessage());
        }
    }

    @PutMapping("/progress")
    public ResponseResult<Void> upsertProgress(@Valid @RequestBody StarlitProgressUpsertRequest req) {
        try {
            starlitService.upsertProgress(req);
            return ResponseResult.success(null);
        } catch (IllegalArgumentException ex) {
            return ResponseResult.error(400, ex.getMessage());
        }
    }

    private static List<String> parsePackKeys(String raw) {
        if (raw == null || raw.isBlank()) {
            return List.of();
        }
        return Arrays.stream(raw.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }
}
