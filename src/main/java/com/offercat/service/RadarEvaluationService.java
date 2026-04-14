package com.offercat.service;

import com.offercat.entity.RadarEvaluation;

/**
 * 雷达评估服务接口
 * 提供雷达评估相关的业务逻辑处理
 */
public interface RadarEvaluationService {
    
    /**
     * 获取学生雷达评估
     * @param studentId 学生ID
     * @return 雷达评估信息
     */
    RadarEvaluation getRadarEvaluation(Long studentId);
    
    /**
     * 创建或更新雷达评估
     * @param radarEvaluation 雷达评估信息
     * @return 更新后的雷达评估
     */
    RadarEvaluation saveRadarEvaluation(RadarEvaluation radarEvaluation);
    
    /**
     * 删除雷达评估
     * @param radarId 雷达评估ID
     * @return 是否删除成功
     */
    boolean deleteRadarEvaluation(Long radarId);
}