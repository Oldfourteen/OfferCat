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
 * @author: Ofteen
 * @data: 2026/4/24 - 08:37
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@RestController
@RequestMapping("/api/radar/gap-agent")
@RequiredArgsConstructor
public class RadarGapAgentController {

    private final RadarGapAgentService radarGapAgentService;

    @PostMapping("/generate")
    public ResponseEntity<RadarGapAgentResponse> generate(@Valid @RequestBody RadarGapAgentRequest req) {
        return ResponseEntity.ok(radarGapAgentService.generate(req));
    }
}
