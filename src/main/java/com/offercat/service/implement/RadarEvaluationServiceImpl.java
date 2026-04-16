package com.offercat.service.impl;

import com.offercat.Dao.RadarEvaluationMapper;
import com.offercat.entity.RadarEvaluation;
import com.offercat.service.RadarEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * 雷达评估服务实现类
 * 实现雷达评估相关的业务逻辑
 */
@Service
public class RadarEvaluationServiceImpl implements RadarEvaluationService {
    
    @Autowired
    private RadarEvaluationMapper radarEvaluationMapper;
    
    @Override
    /**
     * 获取学生雷达评估信息
     * 使用Redis缓存提高查询性能
     * @param studentId 学生ID
     * @return 雷达评估信息，如果不存在返回null
     */
    @Cacheable(value = "radarEvaluationCache", key = "#studentId")
    public RadarEvaluation getRadarEvaluation(Long studentId) {
        return radarEvaluationMapper.findByStudentId(studentId);
    }
    
    @Override
    /**
     * 创建或更新雷达评估信息
     * 实现逻辑：如果学生已存在雷达评估则更新，否则创建新记录
     * 使用CachePut更新缓存数据
     * @param radarEvaluation 雷达评估信息
     * @return 更新后的雷达评估信息
     */
    @CachePut(value = "radarEvaluationCache", key = "#radarEvaluation.studentId")
    public RadarEvaluation saveRadarEvaluation(RadarEvaluation radarEvaluation) {
        // 计算总分
        calculateTotalScore(radarEvaluation);
        
        // 查询学生是否已存在雷达评估记录
        RadarEvaluation existing = radarEvaluationMapper.findByStudentId(radarEvaluation.getStudentId());
        
        if (existing != null) {
            // 更新操作：设置现有记录的ID并更新
            radarEvaluation.setRadarId(existing.getRadarId());
            radarEvaluationMapper.update(radarEvaluation);
            return radarEvaluation;
        } else {
            // 创建操作：插入新的雷达评估记录
            radarEvaluationMapper.insert(radarEvaluation);
            return radarEvaluation;
        }
    }
    
    @Override
    /**
     * 删除雷达评估信息
     * 删除成功后清除所有缓存数据
     * @param radarId 雷达评估ID
     * @return 是否删除成功
     */
    @CacheEvict(value = "radarEvaluationCache", allEntries = true)
    public boolean deleteRadarEvaluation(Long radarId) {
        int result = radarEvaluationMapper.deleteById(radarId);
        return result > 0;
    }
    
    /**
     * 计算雷达评估总分
     * @param radarEvaluation 雷达评估信息
     */
    private void calculateTotalScore(RadarEvaluation radarEvaluation) {
        int total = 0;
        int count = 0;
        
        if (radarEvaluation.getEnglish() != null) {
            total += radarEvaluation.getEnglish();
            count++;
        }
        if (radarEvaluation.getJapanese() != null) {
            total += radarEvaluation.getJapanese();
            count++;
        }
        if (radarEvaluation.getInternship() != null) {
            total += radarEvaluation.getInternship();
            count++;
        }
        if (radarEvaluation.getCommunication() != null) {
            total += radarEvaluation.getCommunication();
            count++;
        }
        if (radarEvaluation.getPersonality() != null) {
            total += radarEvaluation.getPersonality();
            count++;
        }
        if (radarEvaluation.getProfessional() != null) {
            total += radarEvaluation.getProfessional();
            count++;
        }
        
        if (count > 0) {
            BigDecimal score = new BigDecimal(total).divide(new BigDecimal(count), 2, BigDecimal.ROUND_HALF_UP);
            radarEvaluation.setTotalScore(score);
        }
    }
}