package com.offercat.radar.controller;

import com.offercat.radar.dto.request.RadarChartRequest;
import com.offercat.radar.dto.response.RadarChartResponse;
import com.offercat.radar.dto.response.QuestionnaireResponse;
import com.offercat.radar.service.RadarChartService;
import com.offercat.radar.service.QuestionnaireService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.offercat.radar.entity.RadarEvaluation;
import com.offercat.radar.service.RadarEvaluationService;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author: Ofteen
 * @data: 2026/4/22 - 01:28
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@RestController
@RequestMapping("/api/radar-chart")
@RequiredArgsConstructor
public class RadarChartController {
    private final RadarChartService radarChartService;
    private final QuestionnaireService questionnaireService;
    private final RadarEvaluationService radarEvaluationService;

    /**
     * 提交雷达图数据
     * 输入：雷达图请求对象
     * 输出：生成的雷达图响应对象
     */
    @PostMapping("/submit")
    public ResponseEntity<RadarChartResponse> submit(@Valid @RequestBody RadarChartRequest request){
        return ResponseEntity.ok(radarChartService.generate(request));
    }

    /**
     * 获取我的雷达图评价
     * 输入：学生ID
     * 输出：我的雷达图评价对象
     */
    @GetMapping("/my-evaluation")
    public ResponseEntity<RadarEvaluation> getMyEvaluation(@RequestParam("studentId") Long studentId) {
        return ResponseEntity.ok(radarEvaluationService.getRadarEvaluation(studentId));
    }

    /**
     * 获取所有问题
     * 输出：所有问题列表
     */ 
    @GetMapping("/questions")
    public ResponseEntity<List<QuestionnaireResponse>> getQuestions() {
        return ResponseEntity.ok(questionnaireService.getAllQuestions());
    }
}
