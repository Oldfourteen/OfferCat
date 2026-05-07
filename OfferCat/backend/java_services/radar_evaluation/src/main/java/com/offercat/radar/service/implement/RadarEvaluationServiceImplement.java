package com.offercat.radar.service.implement;

import com.offercat.radar.dao.RadarEvaluationMapper;
import com.offercat.radar.dto.request.SurveyRequest;
import com.offercat.radar.dto.response.SurveyResponse;
import com.offercat.radar.entity.RadarEvaluation;
import com.offercat.radar.service.RadarEvaluationService;
import com.offercat.radar.service.SurveyScoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class RadarEvaluationServiceImplement implements RadarEvaluationService {

    // 雷达评估数据访问对象
    @Autowired
    private RadarEvaluationMapper radarEvaluationMapper;
    
    // 调查问卷评分服务
    @Autowired
    private SurveyScoringService surveyScoringService;

    /*
     * 获取学生的雷达评估
     * 输入：学生ID
     * 输出：雷达评估对象
     * 实现：从数据库查询评估信息
     */
    @Override
    public RadarEvaluation getRadarEvaluation(Long studentId) {
        // 根据学生ID查询评估信息
        RadarEvaluation result = radarEvaluationMapper.findByStudentId(studentId);
        System.out.println("[RadarEvaluation] 查询雷达评估, studentId=" + studentId + ", 结果=" + (result != null ? "存在" : "不存在"));
        return result;
    }

    /*
     * 保存雷达评估
     * 输入：雷达评估对象
     * 输出：保存后的雷达评估对象
     * 实现：计算总分，检查是否存在，更新或插入
     */
    @Override
    public RadarEvaluation saveRadarEvaluation(RadarEvaluation radarEvaluation) {
        // 计算总分
        calculateTotalScore(radarEvaluation);

        // 检查是否已有评估记录
        RadarEvaluation existing = radarEvaluationMapper.findByStudentId(radarEvaluation.getStudentId());

        // 如果已有记录
        if (existing != null) {
            // 设置ID
            radarEvaluation.setRadarId(existing.getRadarId());
            // 更新记录
            radarEvaluationMapper.update(radarEvaluation);
            System.out.println("[RadarEvaluation] 更新雷达评估成功, studentId=" + radarEvaluation.getStudentId());
            return radarEvaluation;
        } else {
            // 插入新记录
            int rows = radarEvaluationMapper.insert(radarEvaluation);
            System.out.println("[RadarEvaluation] 插入雷达评估成功, studentId=" + radarEvaluation.getStudentId() + ", 影响行数=" + rows);
            return radarEvaluation;
        }
    }

    /*
     * 删除雷达评估
     * 输入：雷达评估ID
     * 输出：是否删除成功
     * 实现：从数据库删除指定ID的评估记录
     */
    @Override
    @CacheEvict(value = "radarEvaluationCache", allEntries = true)
    public boolean deleteRadarEvaluation(Long radarId) {
        // 从数据库删除评估记录
        int result = radarEvaluationMapper.deleteById(radarId);
        // 返回是否删除成功
        return result > 0;
    }

    /*
     * 计算总分
     * 输入：雷达评估对象
     * 输出：无（直接修改输入对象）
     * 实现：计算各项能力的平均分
     */
    private void calculateTotalScore(RadarEvaluation radarEvaluation) {
        // 总分
        int total = 0;
        // 非空项数量
        int count = 0;

        // 专业能力
        if (radarEvaluation.getProfessionalAbility() != null) {
            total += radarEvaluation.getProfessionalAbility();
            count++;
        }
        // 项目经验
        if (radarEvaluation.getProjectExperience() != null) {
            total += radarEvaluation.getProjectExperience();
            count++;
        }
        // 竞赛成果
        if (radarEvaluation.getCompetitionResults() != null) {
            total += radarEvaluation.getCompetitionResults();
            count++;
        }
        // 学术背景
        if (radarEvaluation.getAcademicBackground() != null) {
            total += radarEvaluation.getAcademicBackground();
            count++;
        }
        // 软技能
        if (radarEvaluation.getSoftSkills() != null) {
            total += radarEvaluation.getSoftSkills();
            count++;
        }
        // 行业认知
        if (radarEvaluation.getIndustryCognition() != null) {
            total += radarEvaluation.getIndustryCognition();
            count++;
        }
        // 抗压与执行力
        if (radarEvaluation.getStressExecution() != null) {
            total += radarEvaluation.getStressExecution();
            count++;
        }

        // 如果有非空项
        if (count > 0) {
            // 计算平均分（保留两位小数）
            double score = Math.round((double) total / count * 100) / 100.0;
            // 设置总分
            radarEvaluation.setTotalScore(score);
        }
    }

    @Override
    public SurveyResponse calculateSurveyScore(SurveyRequest request) {
        return surveyScoringService.calculateScore(request);
    }
}