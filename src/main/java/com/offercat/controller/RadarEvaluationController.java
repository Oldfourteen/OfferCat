package com.offercat.controller;

import com.offercat.infrastructure.common.ResponseResult;
import com.offercat.entity.RadarEvaluation;
import com.offercat.service.RadarEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 雷达评估控制器
 * 提供雷达评估相关的RESTful API接口
 */
@RestController
@RequestMapping("/v1/radar-evaluation")
@CrossOrigin(origins = "*")
public class RadarEvaluationController {
    
    @Autowired
    private RadarEvaluationService radarEvaluationService;
    
    /**
     * 获取学生雷达评估
     * @param studentId 学生ID
     * @return 雷达评估信息
     */
    @GetMapping("/{studentId}")
    public ResponseResult<RadarEvaluation> getRadarEvaluation(@PathVariable Long studentId) {
        RadarEvaluation radarEvaluation = radarEvaluationService.getRadarEvaluation(studentId);
        if (radarEvaluation != null) {
            return ResponseResult.success(radarEvaluation);
        } else {
            return ResponseResult.notFound("雷达评估不存在");
        }
    }
    
    /**
     * 创建或更新雷达评估
     * @param radarEvaluation 雷达评估信息
     * @return 更新后的雷达评估
     */
    @PostMapping
    public ResponseResult<RadarEvaluation> saveRadarEvaluation(@RequestBody RadarEvaluation radarEvaluation) {
        try {
            RadarEvaluation saved = radarEvaluationService.saveRadarEvaluation(radarEvaluation);
            return ResponseResult.success(saved);
        } catch (Exception e) {
            return ResponseResult.internalError("保存雷达评估失败：" + e.getMessage());
        }
    }
    
    /**
     * 删除雷达评估
     * @param radarId 雷达评估ID
     * @return 删除结果
     */
    @DeleteMapping("/{radarId}")
    public ResponseResult<Void> deleteRadarEvaluation(@PathVariable Long radarId) {
        boolean success = radarEvaluationService.deleteRadarEvaluation(radarId);
        if (success) {
            return ResponseResult.success();
        } else {
            return ResponseResult.notFound("雷达评估不存在");
        }
    }
}