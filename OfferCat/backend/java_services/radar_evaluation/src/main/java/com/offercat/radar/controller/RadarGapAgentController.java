package com.offercat.radar.controller;

import com.offercat.radar.dto.request.RadarGapAgentRequest;
import com.offercat.radar.dto.response.RadarGapAgentResponse;
import com.offercat.radar.service.RadarGapAgentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * 雷达图评价智能体控制器
 */

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 08:37
 * @mail: oldfourteen41@gmail.com
 * @info: 雷达图评价智能体控制器
 */

@RestController
@RequestMapping("/api/radar/gap-agent")
@RequiredArgsConstructor
public class RadarGapAgentController {
    /**
     * 生成雷达图评价
     * 输入：雷达图评价请求对象
     * 输出：生成的雷达图评价响应对象
     */
    private final RadarGapAgentService radarGapAgentService;
    /**
     * 生成雷达图评价
     * 输入：雷达图评价请求对象
     * 输出：生成的雷达图评价响应对象
     */
    @PostMapping("/generate")
    public ResponseEntity<RadarGapAgentResponse> generate(@Valid @RequestBody RadarGapAgentRequest req) {
        return ResponseEntity.ok(radarGapAgentService.generate(req));
    }
}
