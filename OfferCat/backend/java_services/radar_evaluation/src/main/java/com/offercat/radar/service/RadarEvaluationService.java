package com.offercat.radar.service;

import com.offercat.radar.dto.request.SurveyRequest;
import com.offercat.radar.dto.response.SurveyResponse;
import com.offercat.radar.entity.RadarEvaluation;

/*
 * 雷达评估服务接口
 * 功能：定义雷达评估相关的服务方法
 * 实现：由RadarEvaluationServiceImpl实现具体逻辑
 */
public interface RadarEvaluationService {

    /*
     * 获取学生的雷达评估
     * 输入：学生ID
     * 输出：雷达评估对象
     */
    RadarEvaluation getRadarEvaluation(Long studentId);

    /*
     * 保存雷达评估
     * 输入：雷达评估对象
     * 输出：保存后的雷达评估对象
     */
    RadarEvaluation saveRadarEvaluation(RadarEvaluation evaluation);

    /*
     * 删除雷达评估
     * 输入：雷达评估ID
     * 输出：是否删除成功
     */
    boolean deleteRadarEvaluation(Long radarId);
    
    /*
     * 计算调查问卷分数
     * 输入：调查问卷请求
     * 输出：计算后的七个维度分数
     */
    SurveyResponse calculateSurveyScore(SurveyRequest request);
}
